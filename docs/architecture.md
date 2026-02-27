# Architecture

This document explains how CREW's pieces fit together: the bootstrapping flow from install to running engagement, how agents read and enforce state, the preamble protocol, and how data flows between components.

## Design Principles

1. **All enforcement is instruction-driven.** Agents read YAML and follow markdown instructions. There is no external runtime, no API server, no build step.
2. **Zero runtime dependencies.** No npm packages. YAML is handled by a custom string parser. Everything runs with Node.js and Bash.
3. **Backward compatible.** Agents work without a state file present. All state fields are optional in validation.
4. **Human-in-the-loop.** Every critical handoff has a review gate. Nothing becomes a client deliverable without explicit human approval.

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Claude Code Session                      │
│                                                              │
│  ┌──────────┐    ┌──────────┐    ┌───────────────────────┐  │
│  │ CLAUDE.md │    │  .crew   │    │   .crew-state.yaml    │  │
│  │ (context) │    │ (config) │    │      (state)          │  │
│  └─────┬─────┘    └────┬─────┘    └──────────┬────────────┘  │
│        │               │                     │               │
│        ▼               ▼                     ▼               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              Agent / Orchestrator                     │    │
│  │   Reads context, config, and state                    │    │
│  │   Follows workflow steps from crew/workflows/         │    │
│  │   Uses templates from crew/templates/                 │    │
│  │   References crew/data/ and crew/knowledge-base/      │    │
│  └───────────────────────┬──────────────────────────────┘    │
│                          │                                    │
│                          ▼                                    │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                    Hooks Layer                        │    │
│  │   SessionStart  → session-context.sh (load state)    │    │
│  │   PreToolUse    → state-guard.js (validate writes)   │    │
│  │   PostToolUse   → state-post-validate.sh (warn)      │    │
│  │   PostToolUse   → artifact-tracker.sh (track files)  │    │
│  │   Stop          → completion-guard.sh (enforce)      │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Bootstrapping Flow

Here's the complete sequence from cloning CREW to having a working engagement:

### 1. Clone & Install

```bash
git clone https://github.com/adamson34/crew.git
mkdir acme-assessment && cd acme-assessment
node /path/to/crew/crew/install.js
```

The installer:
- Collects config (9 fields via interactive prompts)
- Writes `.crew` (engagement config YAML)
- Writes `CLAUDE.md` (engagement context, stamped from template)
- Writes `.crew-state.yaml` (empty skeleton)
- Creates `engagement/`, `assessment/`, `deliverables/`
- Copies entire `crew/` module into the project
- Stamps `{{placeholders}}` in all `.md` and `.yaml` files
- Registers 5 hooks in `.claude/settings.json`
- Compiles and installs 7 agent slash commands to `.claude/commands/`

### 2. Session Start

When you open Claude Code in the engagement directory:

1. Claude Code reads `CLAUDE.md` → Claude now has engagement context, agent table, and behavioral rules
2. **SessionStart hook** fires → `session-context.sh` reads `.crew-state.yaml` and outputs the engagement status summary into Claude's context
3. Claude now knows: the engagement name, active workflow, step progress, gate statuses, and artifact count

### 3. Workflow Initialization

```
/crew → select IN → select a workflow (e.g., assessment)
```

The orchestrator:
1. Reads `crew/workflows/assessment/workflow.yaml`
2. Parses the `steps` and `gates` arrays, and `requires_workflows` if present
3. **Checks cross-workflow prerequisites** — verifies that required prior workflows (e.g., `engagement-kickoff`) are in `completed_workflows`. Warns if unmet, allows override.
4. **Preserves prior state** — carries forward `completed_workflows` and `artifacts` from existing state
5. Scaffolds all steps and gates into `.crew-state.yaml` (all `not_started`/`pending`)
6. Sets `active_workflow` to `{id: assessment, status: in_progress}`
7. **State Guard** validates the write before it happens

### 4. Step Execution

```
/crew NX → identifies next step → tells you to run /consultant
/consultant → agent checks state → marks step in_progress → does work → marks completed
```

During this:
- **State Guard** validates every write to `.crew-state.yaml`
- **State Post-Validate** checks after every edit to `.crew-state.yaml`
- **Artifact Tracker** reminds Claude to register artifacts when writing to artifact directories
- **Completion Guard** prevents session end if a step is still `in_progress`

### 5. Gate Review

```
/crew GA → approve gate → downstream steps unblocked
/crew GR → reject gate → /crew RS → reset step → agent reworks
```

Gates are the human-in-the-loop checkpoints. Nothing advances without explicit approval.

---

## The Preamble Protocol

Every role agent has the state preamble injected at install time from `crew/agents/preamble.md`. This is the protocol agents execute before, during, and after workflow work.

### The 8 Steps

**Step 1: Check for state file.**
The agent looks for `.crew-state.yaml` in the project root. If it doesn't exist, the agent proceeds normally without state tracking — this is backward-compatible mode for using agents outside of workflows.

**Step 2: Read state and identify context.**
The agent reads the state file and determines:
- What workflow is active and its status
- Which step it's being asked to perform
- Whether that step's prerequisites are `completed`
- Whether any blocking gates before this step are `approved`
- Whether required input artifacts exist on disk

**Step 3: Enforce prerequisites.**
If prerequisites aren't met, the agent stops immediately. It explains exactly what's missing — which steps, which gates, which artifacts — and suggests running `/crew` to see the full status. This prevents out-of-order execution.

**Step 4: Mark step in_progress.**
Before starting work, the agent updates `.crew-state.yaml` to set the step's status to `in_progress` and records a `started_at` timestamp. This is how the Completion Guard knows work is happening.

**Step 5: Check for revision context.**
If this step has been reset for rework (the `revisions` array contains entries for this step's gate with `action: rejected`), the agent reads those entries to understand:
- What draft number to produce (from `revision_count` or the highest draft in revisions + 1)
- What specific issues the reviewer identified
- The agent must address ALL previously identified issues
- Output includes a "Changes in This Revision" section

**Step 6: Complete and register.**
After finishing work, the agent:
- Sets step status to `completed` with `completed_at` timestamp
- Registers produced artifacts in the `artifacts` array (with `draft` and `status: draft` fields)
- If this is a rework (draft > 1), appends a `submitted` entry to the `revisions` array

**Step 7: Signal gate.**
If a gate follows this step (the step has a `gate_after` field), the agent informs the user that a review gate is now pending and suggests running `/crew` for approval.

**Step 8: One workflow at a time.**
If `active_workflow.status` is `in_progress`, the agent refuses to start a different workflow. The current one must be finished or reset first.

### Interaction Style

The preamble also instructs agents to use the **AskUserQuestion tool** for menus and choices rather than printing them as plain text. This gives users clickable selections instead of numbered lists in a code block.

---

## Data Flow

### How Config Flows

```
Installer prompts → .crew file → stamped into agents, workflows, templates
                  → CLAUDE.md  → Claude reads at session start
```

The `.crew` config is the source of truth for engagement settings. It's read by:
- **Hooks** — `artifact-tracker.sh` reads artifact directory paths from `.crew`
- **Agents** — Agents can read `.crew` to understand engagement context
- **CLAUDE.md** — Generated from config at install time, read by Claude automatically

### How State Flows

```
/crew IN → scaffolds .crew-state.yaml from workflow.yaml
agents   → read state, update steps/gates/artifacts
/crew    → reads state for status, gate decisions, next-step routing
hooks    → validate state writes, load state at session start
```

The state file is the only mutable runtime data. Everything else (workflow YAMLs, agent files, templates) is read-only after installation.

### How Knowledge Flows

```
crew/knowledge-base/  → agents read domain reference material
crew/data/            → agents read severity scales, standards crosswalks, service catalog
crew/templates/       → agents use as document structure guides
crew/workflows/steps/ → agents read step-specific instructions
crew/tasks/           → agents read standalone task guides (outside workflows)
```

All of this is read-only. Agents reference these files when producing artifacts but never modify them.

---

## Component Responsibilities

### The Orchestrator (`/crew`)

- Reads workflow YAMLs and scaffolds state
- Shows status dashboards
- Handles gate approvals and rejections
- Identifies next steps and routes to agents
- Manages step resets and revision tracking
- Does NOT do consulting work

### Role Agents (`/bd`, `/pm`, `/consultant`, `/compliance`, `/writer`, `/reviewer`)

- Follow the preamble protocol (check state → enforce prerequisites → do work → update state)
- Read step instructions from `crew/workflows/*/steps/`
- Use templates from `crew/templates/`
- Reference knowledge base and data files
- Produce artifacts in configured directories
- Handle rework by reading revision context

### Hooks

- **State Guard** — Prevent invalid state writes (the gatekeeper)
- **State Post-Validate** — Warn about invalid state after edits (the advisor)
- **Artifact Tracker** — Remind agents to register artifacts (the tracker)
- **Completion Guard** — Prevent session end with incomplete work (the enforcer)
- **Session Context** — Load engagement state at session start (the initializer)

### Config Files

- **`.crew`** — Engagement settings (client, firm, vertical, paths)
- **`CLAUDE.md`** — Session context auto-read by Claude Code
- **`.crew-state.yaml`** — Mutable workflow state
- **`.claude/settings.json`** — Hook registrations

---

## File Organization

```
engagement-project/
├── CLAUDE.md                          # Auto-read by Claude Code
├── .crew                              # Engagement config
├── .crew-state.yaml                   # Workflow state (mutable)
├── .claude/
│   ├── settings.json                  # Hook registrations
│   └── commands/                      # Installed slash commands
│       ├── crew.md                    # /crew orchestrator
│       ├── bd.md                      # /bd (with preamble)
│       ├── pm.md                      # /pm (with preamble)
│       ├── consultant.md              # /consultant (with preamble)
│       ├── compliance.md              # /compliance (with preamble)
│       ├── writer.md                  # /writer (with preamble)
│       └── reviewer.md               # /reviewer (with preamble)
├── crew/
│   ├── agents/
│   │   ├── preamble.md               # State protocol (injected at install)
│   │   └── compiled/                  # Source agent personas
│   ├── data/                          # Severity scales, crosswalks, catalog, history
│   ├── hooks/                         # Hook scripts and validator
│   ├── knowledge-base/                # Domain reference docs
│   ├── tasks/                         # Standalone task guides
│   ├── templates/                     # Deliverable templates
│   └── workflows/                     # Workflow definitions and step files
├── engagement/                        # SOW, project plan, comms
├── assessment/                        # Findings, evidence, notes
└── deliverables/                      # Reports, roadmaps, presentations
```

---

## See Also

- [Installation Guide](installation-guide.md) — What the installer does step by step
- [Hooks Reference](hooks-reference.md) — Each hook's behavior, exit codes, and debugging
- [Workflow Definition Reference](workflow-definition-reference.md) — Complete YAML schema
- [State Management](state-management.md) — State file schema and lifecycle
- [Extending CREW](extending-crew.md) — Adding agents, workflows, and verticals
