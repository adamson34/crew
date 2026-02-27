# Hooks Reference

CREW uses [Claude Code hooks](https://docs.anthropic.com/en/docs/claude-code) to enforce state integrity, track artifacts, and provide session context. Hooks are shell scripts and Node.js modules in `crew/hooks/` that fire automatically in response to Claude Code lifecycle events.

## How Hooks Work

Claude Code hooks are registered in `.claude/settings.json`. When a matching event occurs (a file write, an edit, session start, or session stop), Claude Code runs the registered command and acts on the result:

- **stdout** output is injected into Claude's context — the agent sees it and can respond
- **stderr** output is shown to the user as a warning
- **Exit code 0** — allow the operation
- **Exit code 2** — block the operation (PreToolUse and Stop hooks only)

Hooks receive a JSON payload on stdin describing the event (tool name, input parameters, etc.).

### PreToolUse vs PostToolUse

| Timing | Can Block? | Use Case |
|--------|-----------|----------|
| **PreToolUse** | Yes (exit 2) | Validate content *before* it's written — prevent bad state |
| **PostToolUse** | No (exit 0 always) | Inspect what happened *after* an operation — warn and prompt self-correction |

This is a deliberate design: pre-hooks are gatekeepers, post-hooks are advisors.

## Hook Inventory

CREW registers 5 hooks across 4 event types:

| Hook | File | Event | Matcher | Language |
|------|------|-------|---------|----------|
| State Guard | `state-guard.js` | PreToolUse | Write | Node.js |
| State Post-Validate | `state-post-validate.sh` | PostToolUse | Edit | Bash |
| Artifact Tracker | `artifact-tracker.sh` | PostToolUse | Write | Bash |
| Completion Guard | `completion-guard.sh` | Stop | *(none)* | Bash |
| Session Context | `session-context.sh` | SessionStart | *(none)* | Bash |

Plus two supporting files:

| File | Purpose |
|------|---------|
| `state-validate.js` | Shared validation module (custom YAML parser + validation logic) |
| `test-hooks.js` | Test suite for all hooks |

---

## State Guard (`state-guard.js`)

**Event:** PreToolUse (Write)
**Can block:** Yes

Intercepts every Write operation. If the target file is `.crew-state.yaml`, it parses the content and runs full validation before the write happens. Non-state-file writes pass through immediately.

**Behavior:**

1. Read JSON payload from stdin (contains `tool_input.file_path` and `tool_input.content`)
2. If `file_path` doesn't end with `.crew-state.yaml` → exit 0 (passthrough)
3. If `content` is missing or empty → exit 2 (block)
4. Run `validateStateContent(content)` from `state-validate.js`
5. If errors → write each error to stderr, exit 2 (block the write)
6. If valid → exit 0 (allow the write)

**Fail-open:** If stdin can't be read or JSON can't be parsed, the hook exits 0 (allows the write). This prevents the hook itself from blocking normal operations if something unexpected happens.

**What it validates:**
- Required top-level fields: `crew_version`, `active_workflow`, `steps`, `gates`, `artifacts`
- Step status enums: `not_started`, `in_progress`, `completed`
- Gate status enums: `pending`, `approved`, `rejected`
- Revision action enums: `submitted`, `rejected`, `approved`
- Artifact status enums: `draft`, `approved`, `superseded`
- ISO 8601 timestamp format on all `*_at` fields
- Chronological ordering (`completed_at` must be after `started_at`)
- At most one step `in_progress` at a time
- `artifacts` and `revisions` must be arrays, not maps
- `revision_count` must be a non-negative integer
- `approved_draft` must be a positive integer

**Example blocked write (stderr output):**

```
CREW State Guard: blocked invalid .crew-state.yaml write.
  - Step "step-02-framework": status "running" is invalid (must be: not_started, in_progress, completed)
  - 2 steps are in_progress simultaneously. Only one step may be in_progress at a time.
Fix the issues above and retry.
```

---

## State Post-Validate (`state-post-validate.sh`)

**Event:** PostToolUse (Edit)
**Can block:** No

Fires after every Edit operation. If the edited file is `.crew-state.yaml`, reads it from disk and validates using the same `state-validate.js` module.

**Why both a pre-hook and post-hook?** The pre-hook catches Write operations (full file replacement). The post-hook catches Edit operations (partial modifications via the Edit tool). Since PostToolUse can't block, it outputs errors to stdout so Claude sees them and self-corrects.

**Behavior:**

1. Read JSON payload from stdin (contains `tool_input.file_path`)
2. If `file_path` doesn't end with `.crew-state.yaml` → exit 0
3. Read the file from disk
4. Run `validateStateContent()` on the file contents
5. If errors → print them to stdout (Claude sees this and fixes the file)
6. Exit 0 (can't block — PostToolUse limitation)

**Example output (stdout, seen by Claude):**

```
CREW State Validator: .crew-state.yaml has errors after edit:
  - Gate "gate-findings": status "maybe" is invalid (must be: pending, approved, rejected)
Please fix these errors before proceeding.
```

---

## Artifact Tracker (`artifact-tracker.sh`)

**Event:** PostToolUse (Write)
**Can block:** No

Fires after every Write operation. If the written file is inside an artifact directory and there's an active workflow, reminds Claude to register the artifact in `.crew-state.yaml`.

**Behavior:**

1. Read JSON payload from stdin → extract `tool_input.file_path`
2. Skip writes to `.crew-state.yaml` and `.crew` config files
3. If no `.crew-state.yaml` exists → exit 0
4. Check `active_workflow.status` — if not `in_progress` → exit 0
5. Read artifact directory paths from `.crew` config (defaults: `engagement/`, `assessment/`, `deliverables/`)
6. If the written file is inside an artifact directory → print registration reminder
7. Exit 0

**Example output (stdout, seen by Claude):**

```
CREW: Artifact written — assessment/acme-findings-register.md
If this is a workflow deliverable, register it in .crew-state.yaml:
  1. Add entry to artifacts[] with path, produced_by, step, produced_at, type, draft, status
  2. Add path to the current step's artifacts_produced list
  3. If this is a rework (draft > 1), also add a 'submitted' entry to revisions[]
```

---

## Completion Guard (`completion-guard.sh`)

**Event:** Stop
**Can block:** Yes

Fires when Claude finishes responding and is about to end the turn. If any step is still `in_progress`, blocks the stop so Claude updates the state file first.

**Behavior:**

1. Read JSON payload from stdin → check `stop_hook_active` flag
2. If `stop_hook_active` is `true` → exit 0 (prevents infinite loops — if this hook already triggered a continuation, allow the stop on the next attempt)
3. If no `.crew-state.yaml` → exit 0
4. Parse the state file for steps with `status: in_progress`
5. If any found → write error to stderr listing the step IDs, exit 2 (block)
6. If none → exit 0 (allow stop)

**Example blocked stop (stderr output):**

```
CREW Completion Guard: step(s) still in_progress: step-02-framework-selection. Update .crew-state.yaml to mark them completed (or not_started if abandoning) before finishing.
```

**The `stop_hook_active` loop breaker:** Claude Code sets this flag to `true` when the Stop hook has already fired once in the current turn. Without this, a blocked stop would cause Claude to respond, which would trigger another stop, which would block again — infinite loop. On the second attempt, the hook allows the stop.

---

## Session Context (`session-context.sh`)

**Event:** SessionStart
**Can block:** No

Fires on session startup, resume, clear, and compact. Outputs a concise engagement status summary that gets injected into Claude's context window.

**Behavior:**

1. Consume stdin (not needed for this hook)
2. If no `.crew-state.yaml` → exit 0 silently (backward compatible)
3. Read engagement name, active workflow ID and status
4. Parse steps section → print each with status indicator (`[x]` completed, `[>]` in_progress, `[ ]` not_started)
5. Parse gates section → print each with status indicator (`[v]` approved, `[-]` rejected, `[ ]` pending)
6. Count artifacts and revision entries
7. Output everything to stdout

**Example output (stdout, injected into Claude's context):**

```
=== CREW Engagement State ===

Engagement: acme-assessment
Workflow: assessment (in_progress)

Steps:
  [x] step-01-environment-profiling
  [>] step-02-framework-selection
  [ ] step-03-gap-analysis
  [ ] step-04-findings-classification
  [ ] step-05-compliance-mapping
  [ ] step-06-qa-review

Gates:
  [ ] gate-findings-classification
  [ ] gate-qa-review

Artifacts registered: 1
=== End CREW State ===
```

---

## The Custom YAML Parser

`state-validate.js` includes a purpose-built YAML parser (`parseStateYaml()`) that handles only the known `.crew-state.yaml` structure. This is a deliberate design choice — zero dependencies means no `js-yaml`, no `ajv`, no npm packages.

### What It Handles

- **Top-level scalars** — `crew_version: "1.0.0"`, `engagement: "acme"`
- **Top-level maps** — `active_workflow:` with 2-space indented children
- **Maps of maps** — `steps:` and `gates:` containing named entries with nested fields
- **Top-level arrays** — `artifacts:` and `revisions:` with `- key: value` entries
- **Nested arrays** — `artifacts_produced` lists inside step entries (6-space indent)
- **Inline arrays** — `blocks: [step-05, step-06]`
- **Type coercion** — `null`/`~` → null, `true`/`false` → boolean, quoted strings → unquoted

### What It Does NOT Handle

- YAML anchors (`&` and `*`)
- Multi-line strings (`|` or `>`)
- Deep nesting beyond 3 levels (top → mid → leaf)
- Flow mappings (`{key: value}`)
- Non-ASCII keys

**Do not add these features to `.crew-state.yaml`.** If you need complex data structures, use a separate file.

---

## settings.json Registration

Hooks are registered in `.claude/settings.json` under the `hooks` key. The installer writes this automatically, but here's the exact structure for reference:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash crew/hooks/session-context.sh",
            "timeout": 10
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "node crew/hooks/state-guard.js",
            "timeout": 10
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bash crew/hooks/state-post-validate.sh",
            "timeout": 10
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash crew/hooks/artifact-tracker.sh",
            "timeout": 10
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash crew/hooks/completion-guard.sh",
            "timeout": 10
          }
        ]
      }
    ]
  }
}
```

### Registration Format

Each event type contains an array of matcher groups:

| Field | Description |
|-------|-------------|
| `matcher` | Tool name to match (e.g., `"Write"`, `"Edit"`). Empty string `""` matches all tools. Omitted for Stop/SessionStart events. |
| `hooks` | Array of hook commands to run when matched |
| `hooks[].type` | Always `"command"` |
| `hooks[].command` | Shell command to execute (relative to project root) |
| `hooks[].timeout` | Seconds before the hook is killed (default: 10) |

### Event Types

| Event | When It Fires | Can Block? |
|-------|--------------|-----------|
| `SessionStart` | Session start, resume, clear, compact | No |
| `PreToolUse` | Before a tool executes | Yes (exit 2) |
| `PostToolUse` | After a tool executes | No |
| `Stop` | When Claude finishes a response | Yes (exit 2) |

---

## Testing Hooks

Run the test suite:

```bash
node crew/hooks/test-hooks.js
```

The test suite validates:

- **State Guard (PreToolUse Write):**
  - Valid populated state → allowed
  - Valid initial skeleton → allowed
  - Non-state file writes → passthrough
  - Invalid workflow/step/gate status enums → blocked
  - Multiple `in_progress` steps → blocked
  - `completed_at` before `started_at` → blocked
  - Bad timestamp format → blocked
  - Missing required fields → blocked
  - Empty or missing content → blocked

- **Session Context (SessionStart):**
  - Outputs engagement state summary with steps and gates

- **Completion Guard (Stop):**
  - Blocks when steps are `in_progress`
  - Allows when `stop_hook_active` is `true`
  - Allows when no steps are `in_progress`

### Manual Testing

Test the state guard directly:

```bash
echo '{"tool_input":{"file_path":".crew-state.yaml","content":"crew_version: \"1.0.0\"\nsteps: {}\ngates: {}\nartifacts: []\nactive_workflow:\n  status: not_started"}}' | node crew/hooks/state-guard.js
echo $?  # 0 = allowed, 2 = blocked
```

Test session context:

```bash
echo '{}' | bash crew/hooks/session-context.sh
```

---

## Debugging

### Hook not firing

1. Check `.claude/settings.json` exists and has a `hooks` section
2. Verify the event type and matcher are correct
3. Ensure shell scripts are executable: `chmod +x crew/hooks/*.sh`
4. Re-run the installer to regenerate: `node crew/install.js`

### Hook crashes or times out

1. Run the hook manually (see Manual Testing above)
2. Check for Node.js errors: `node crew/hooks/state-guard.js < /dev/null`
3. Check the timeout — default is 10 seconds, which should be plenty
4. Verify `state-validate.js` is in the same directory as the hook scripts

### State guard blocks a valid write

1. Read the error messages on stderr — they list the exact validation failures
2. Common causes: typo in enum value, missing required field, bad timestamp format
3. The guard fails open on parse errors (if it can't read stdin or parse JSON, it allows the write)

### Post-validate shows errors but doesn't fix them

Post-hooks can't block — they can only inform. If Claude doesn't self-correct after seeing the error, manually edit `.crew-state.yaml` to fix the issue.

---

## See Also

- [State Management](state-management.md) — The state file these hooks protect
- [Installation Guide](installation-guide.md) — How hooks are registered during install
- [Architecture](architecture.md) — How hooks fit into the overall system
- [Troubleshooting](troubleshooting.md) — Common hook-related issues
