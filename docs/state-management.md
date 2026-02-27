# State Management

`.crew-state.yaml` is the single source of truth for engagement progress. It tracks which workflow is active, which steps are done, which gates are pending, what artifacts have been produced, and the full revision history.

Created by the installer (empty skeleton), populated by `/crew IN` (workflow scaffolding), and updated by agents (step progress) and the orchestrator (gate decisions).

The file is human-readable YAML and can be manually edited when needed.

## Schema Reference

### Top-Level Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `crew_version` | string | Yes | Always `"1.0.0"` |
| `engagement` | string | Yes | Engagement name from `.crew` config |
| `initialized_at` | ISO 8601 | Yes | When state was first created |
| `active_workflow` | object | Yes | Current workflow info |
| `steps` | map | Yes | Step ID → status object |
| `gates` | map | Yes | Gate ID → status object |
| `artifacts` | array | Yes | Produced artifact records |
| `revisions` | array | No | Revision/review history |
| `completed_workflows` | array | No | Finished workflow IDs |

### active_workflow

| Field | Values |
|-------|--------|
| `id` | Workflow name (e.g., `assessment`) or `null` |
| `started_at` | ISO 8601 timestamp or `null` |
| `status` | `not_started`, `in_progress`, `completed` |

### Step Object

Each key in `steps` is a step ID (e.g., `step-01-environment-profiling`):

| Field | Values |
|-------|--------|
| `status` | `not_started`, `in_progress`, `completed` |
| `agent` | Agent name (e.g., `consultant`) |
| `started_at` | ISO 8601 or `null` |
| `completed_at` | ISO 8601 or `null` |
| `artifacts_produced` | Array of file paths |

### Gate Object

Each key in `gates` is a gate ID (e.g., `gate-findings-classification`):

| Field | Values |
|-------|--------|
| `status` | `pending`, `approved`, `rejected` |
| `after_step` | Step ID this gate follows |
| `blocks` | Array of step IDs held until approval |
| `reviewed_at` | ISO 8601 or `null` |
| `notes` | Rejection notes (string) |
| `revision_count` | Integer — current draft number |
| `approved_draft` | Integer — which draft was approved |

### Artifact Entry

Each entry in the `artifacts` array:

| Field | Description |
|-------|-------------|
| `path` | Relative file path (e.g., `assessment/acme-findings-register.md`) |
| `produced_by` | Agent name |
| `step` | Step ID that produced it |
| `produced_at` | ISO 8601 timestamp |
| `draft` | Integer draft number |
| `status` | `draft`, `approved`, `superseded` |

### Revision Entry

Each entry in the `revisions` array:

| Field | Description |
|-------|-------------|
| `artifact` | File path |
| `gate` | Gate ID |
| `draft` | Integer draft number |
| `action` | `submitted`, `rejected`, `approved` |
| `agent` | Agent name |
| `at` | ISO 8601 timestamp |
| `notes` | Description of changes or rejection feedback |

## Valid Enums

| Field | Valid Values |
|-------|-------------|
| Step status | `not_started`, `in_progress`, `completed` |
| Gate status | `pending`, `approved`, `rejected` |
| Revision action | `submitted`, `rejected`, `approved` |
| Artifact status | `draft`, `approved`, `superseded` |

## Step Lifecycle

```
not_started
     |
     v  agent marks in_progress, records started_at
in_progress
     |
     v  agent completes work, registers artifacts
completed
```

**Constraint:** Only one step can be `in_progress` at a time across the entire engagement.

## Gate Lifecycle

```
pending
     |
     +---> approved  (/crew GA)
     |       Records: reviewed_at, approved_draft
     |       Appends: revision entry (action: approved)
     |       Effect: downstream steps unblocked
     |
     +---> rejected  (/crew GR)
             Records: reviewed_at, notes, revision_count
             Appends: revision entry (action: rejected)
             Effect: downstream steps stay blocked
                |
                v  /crew RS resets the step
             pending  (revision_count incremented, ready for rework)
```

## Revision Tracking

Revisions create an auditable trail from initial draft through each review cycle to final approval.

**Draft numbering:**
- Draft 1 is the initial submission
- When draft 1 is rejected and the step is reset, `revision_count` becomes `2`
- The agent produces draft 2, addressing all rejection feedback
- This continues until the gate is approved

**Revision entries are append-only.** The `revisions` array grows with each action:

```yaml
revisions:
  - artifact: "deliverables/acme-executive-summary.md"
    gate: gate-executive-summary
    draft: 1
    action: submitted
    agent: writer
    at: "2026-02-26T10:00:00Z"
    notes: "Initial draft"

  - artifact: "deliverables/acme-executive-summary.md"
    gate: gate-executive-summary
    draft: 1
    action: rejected
    agent: reviewer
    at: "2026-02-26T11:30:00Z"
    notes: "B-01: Finding count mismatch; M-01: Rec for F-008 too vague"

  - artifact: "deliverables/acme-executive-summary.md"
    gate: gate-executive-summary
    draft: 2
    action: submitted
    agent: writer
    at: "2026-02-26T14:00:00Z"
    notes: "Fixed finding count, rewrote F-008 recommendation"

  - artifact: "deliverables/acme-executive-summary.md"
    gate: gate-executive-summary
    draft: 2
    action: approved
    agent: reviewer
    at: "2026-02-26T15:00:00Z"
    notes: "All issues resolved. PASS."
```

The gate's `approved_draft` field records which draft number finally passed.

## Validation

State is validated by hooks registered in `.claude/settings.json`:

| Hook | Event | What It Does |
|------|-------|-------------|
| `state-guard.js` | PreToolUse (Write) | Validates state before any write to `.crew-state.yaml` |
| `state-post-validate.sh` | PostToolUse (Edit) | Validates state after any edit |
| `completion-guard.sh` | Stop | Blocks session end if steps are `in_progress` |
| `artifact-tracker.sh` | PostToolUse (Write) | Tracks new artifacts |
| `session-context.sh` | SessionStart | Loads engagement context |

The state validator checks:
- All required top-level fields are present
- Step status values are valid enums
- Gate status values are valid enums
- Revision action values are valid enums
- Artifact status values are valid enums
- Timestamps are ISO 8601 format

**Note:** The validator uses a custom YAML parser (`crew/hooks/state-validate.js`) that handles only the known `.crew-state.yaml` structure — no YAML anchors, no multi-line strings, no deep nesting. Do not add complex YAML features to the state file.

## Manual Editing

Sometimes you need to fix the state file directly. Open `.crew-state.yaml` in any editor.

**Safe edits:**
- Reset a stuck `in_progress` step: change `status` to `not_started`, clear `started_at`
- Clear a bad gate: change `status` to `pending`, remove `reviewed_at` and `notes`
- Remove a duplicate artifact entry
- Fix a typo in a timestamp

**Preserve:** All existing data outside the field you're changing. Don't remove sections or reorder top-level keys.

**Don't:** Add new top-level keys (the custom parser only handles the known structure). Don't use YAML anchors, multi-line strings (`|` or `>`), or deeply nested objects.

Validation runs automatically on the next Claude write operation, so you'll get feedback if your edit breaks anything.

---

## See Also

- [Hooks Reference](hooks-reference.md) — The hooks that validate and protect state
- [Orchestrator Reference](orchestrator-reference.md) — Commands that read and write state
- [Agent Overview](agents/overview.md) — The state preamble protocol agents follow
- [Architecture](architecture.md) — How state fits into the overall system
- [Troubleshooting](troubleshooting.md) — Common state issues and fixes
