# CREW Development Guide

CREW (Consulting Role Engine Workflows) is an AI consulting workflow framework for Claude Code. Six role agents + a `/crew` orchestrator, currently targeting OT/ICS cybersecurity.

## Architecture

All enforcement is instruction-driven — agents read YAML and follow rules. There is no external runtime, no API server, no build step.

- **Agents** (`crew/agents/compiled/*.md`) — Markdown persona files installed as Claude Code slash commands. Each has identity, principles, rules, and a menu.
- **Preamble** (`crew/agents/preamble.md`) — State protocol prepended to all role agents at install time. Defines the 8-step check-before-act protocol.
- **Orchestrator** (`crew/agents/compiled/crew.md`) — `/crew` command with ST/NX/GA/GR/IN/RS/AF/RH/RC subcommands. Read-only of workflow YAMLs, read-write of state file.
- **Workflows** (`crew/workflows/*/workflow.yaml`) — Structured step/gate arrays defining engagement phases. These are read-only definitions — never modified at runtime.
- **State file** (`.crew-state.yaml`) — Single source of truth for engagement progress. Tracked fields: steps, gates, artifacts, revisions, completed_workflows.
- **Hooks** (`crew/hooks/`) — Claude Code lifecycle hooks: state validation (PreToolUse/PostToolUse), artifact tracking (PostToolUse), session context (SessionStart).
- **Installer** (`crew/install.js`) — Interactive setup that scaffolds config, state, CLAUDE.md, directories, and copies the crew module into target projects.

## Key Constraints

- **Zero runtime dependencies.** No npm packages. YAML is handled by a custom string parser in `state-validate.js`. Do not add `js-yaml`, `ajv`, or similar.
- **Custom YAML parser** (`crew/hooks/state-validate.js:parseStateYaml`) handles only the known `.crew-state.yaml` structure: top-level scalars, maps-of-maps (steps/gates), and top-level arrays (artifacts/revisions). It does NOT handle anchors, multi-line strings, or deep nesting. New state fields must fit this structure.
- **Backward compatible.** Agents must work without a state file present. All new state fields must be optional in validation.
- **One workflow at a time.** At most one step can be `in_progress` simultaneously.
- **Agents are instruction-only.** They cannot execute code, call APIs, or access external services. All behavior comes from their markdown instructions.

## File Naming Conventions

- Agent files: `{role}.md` in `crew/agents/compiled/`, with matching `{role}.agent.yaml` metadata
- Workflow steps: `step-NN-description.md` in `crew/workflows/{workflow}/steps/`
- Templates: `{type}-template.md` in `crew/templates/`
- Engagement artifacts (at runtime): `{engagement_name}-{type}.md` — engagement name first, then document type

## State File Schema

```yaml
crew_version: "1.0.0"
engagement: "name"
active_workflow: { id, started_at, status }
steps:
  step-id: { status, started_at, completed_at, artifacts_produced }
gates:
  gate-id: { status, reviewed_at, notes, revision_count, approved_draft }
artifacts:
  - { path, produced_by, step, produced_at, draft, status }
revisions:
  - { artifact, gate, draft, action, agent, at, notes }
completed_workflows: []
```

Valid enums:
- Step status: `not_started | in_progress | completed`
- Gate status: `pending | approved | rejected`
- Revision action: `submitted | rejected | approved`
- Artifact status: `draft | approved | superseded`

## Testing

Run validation tests:
```bash
node -e "const {validateStateContent} = require('./crew/hooks/state-validate.js'); console.log(validateStateContent('...'))"
```

Hook test utilities: `crew/hooks/test-hooks.js`

## Common Tasks

**Adding a new orchestrator command:** Edit `crew/agents/compiled/crew.md`. Add to the command table and create a new `## XX — Name` section with numbered steps.

**Adding a new state field:** Must be optional (backward compat). Add validation in `state-validate.js` after existing sections. Add to `writeInitialState()` in `install.js`. Update preamble if agents need to interact with it.

**Adding a new agent:** Create `{role}.agent.yaml` and `compiled/{role}.md`. Add to the agent install loop in `install.js` (the `agentFiles` array). Preamble is prepended automatically.

**Adding a new workflow:** Create `crew/workflows/{name}/workflow.yaml` with `steps` and `gates` arrays, plus step files in `steps/` subdirectory.
