# Workflow Definition Reference

This is the complete schema reference for `workflow.yaml` files. For how workflows fit into the system, see [Workflow Overview](workflows/overview.md). For how state tracks workflow progress, see [State Management](state-management.md).

## File Location

Each workflow lives in its own directory under `crew/workflows/`:

```
crew/workflows/{workflow-name}/
├── workflow.yaml           # Workflow definition (this reference)
└── steps/
    ├── step-01-name.md     # Step instruction files
    ├── step-02-name.md
    └── ...
```

Workflow YAMLs are **read-only** — they are never modified at runtime. The orchestrator reads them to scaffold `.crew-state.yaml`; agents read the step files for instructions.

## Top-Level Structure

```yaml
name: workflow-name
description: "What this workflow does"

# Optional — declares which workflows must be completed first
requires_workflows:
  - any_of: [prior-workflow-a, prior-workflow-b]
    reason: "Why this dependency exists"

steps:
  - id: step-01-name
    # ... step fields

gates:
  - id: gate-name
    # ... gate fields

# Optional reference sections
templates:
  key: "crew/templates/template-name.md"

knowledge_base:
  key: "crew/knowledge-base/reference-name.md"

data:
  key: "crew/data/data-file.yaml"

input_file_patterns:
  key:
    description: "What this input is"
    pattern: "path/to/expected/file"
```

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Workflow identifier (matches directory name) |
| `description` | Yes | Human-readable description |
| `steps` | Yes | Array of step definitions |
| `gates` | Yes | Array of gate definitions |
| `templates` | No | Map of template references |
| `knowledge_base` | No | Map of knowledge base file references |
| `data` | No | Map of data file references |
| `requires_workflows` | No | Cross-workflow prerequisites (see below) |
| `input_file_patterns` | No | Map of expected input files with patterns |

### Cross-Workflow Prerequisites

Workflows can declare dependencies on other completed workflows:

```yaml
requires_workflows:
  - any_of: [engagement-kickoff, new-engagement]
    reason: "SOW must exist before assessment begins"
```

| Subfield | Description |
|----------|-------------|
| `any_of` | Array of workflow IDs — at least one must be in `completed_workflows` in state |
| `reason` | Human-readable explanation shown when the prerequisite is not met |

The orchestrator checks `requires_workflows` during `/crew IN`. If any prerequisite is unmet, it warns the user and requires explicit override before initializing. This prevents starting downstream workflows before upstream artifacts exist.

`any_of` supports alternative paths — for example, `assessment` accepts either `engagement-kickoff` (modular path) or `new-engagement` (all-in-one path) as a prerequisite.

Workflows without `requires_workflows` (like `engagement-kickoff` and `new-engagement`) are entry points that can be initialized without prior workflow completion.

---

## Step Schema

### Complete Field Reference

```yaml
steps:
  - id: step-01-environment-profiling
    file: steps/step-01-environment-profiling.md
    agent: consultant
    prerequisites: [step-00-entry]
    prerequisites_any: []
    gate_after: gate-findings-classification
    required_artifacts:
      - pattern: "assessment/{{engagement_name}}-environment-profile.md"
    produces:
      - pattern: "assessment/{{engagement_name}}-gap-analysis.md"
        type: gap-analysis
    path: A
    optional: true
    note: "Human-readable note about this step"
```

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `id` | Yes | string | Unique step identifier. Convention: `step-NN-description` |
| `file` | Yes | string | Relative path to step instruction file (within the workflow directory) |
| `agent` | Yes | string | Agent that owns this step: `bd`, `pm`, `consultant`, `compliance`, `writer`, `reviewer` |
| `prerequisites` | Yes | array | Step IDs that must ALL be `completed` before this step can start |
| `prerequisites_any` | No | array | Step IDs where AT LEAST ONE must be `completed` (for convergence points) |
| `gate_after` | No | string | Gate ID that becomes `pending` after this step completes |
| `required_artifacts` | Yes | array | Files that must exist on disk before the step starts |
| `produces` | Yes | array | Artifact patterns this step creates |
| `path` | No | string | Path label (e.g., `A` or `B`) — step only applies when this path is active |
| `optional` | No | boolean | If `true`, step can be skipped without blocking downstream steps |
| `note` | No | string | Documentation note (not used programmatically) |

### Prerequisites

**`prerequisites`** — ALL listed steps must be `completed`:

```yaml
prerequisites: [step-01-profiling, step-02-framework]
```

Both `step-01-profiling` AND `step-02-framework` must be completed before this step can start.

**`prerequisites_any`** — AT LEAST ONE must be `completed`:

```yaml
prerequisites_any: [step-02c-loe-generation, step-02b-scope-definition]
```

This is used for convergence points where branching paths merge. In the `new-engagement` workflow, Path A and Path B diverge after entry and converge at `step-03-pm-breakdown` — either path's completion satisfies the prerequisite.

A step can have both `prerequisites` and `prerequisites_any`. Both conditions must be satisfied.

### Required Artifacts

Files that must exist on disk before the step starts. Agents check these as part of the preamble protocol.

```yaml
required_artifacts:
  - pattern: "{{assessment_artifacts}}/{{engagement_name}}-environment-profile.md"
  - pattern: "{{assessment_artifacts}}/{{engagement_name}}-framework-selection.md"
```

Patterns use `{{placeholders}}` that are stamped at install time. At runtime, these are literal file paths.

### Produces

Artifacts this step is expected to create:

```yaml
produces:
  - pattern: "{{assessment_artifacts}}/{{engagement_name}}-findings-register.md"
    type: findings-register
  - pattern: "{{assessment_artifacts}}/{{engagement_name}}-environment-profile.md"
    type: environment-profile
```

| Subfield | Description |
|----------|-------------|
| `pattern` | Expected file path (with `{{placeholders}}` stamped at install) |
| `type` | Artifact type label (used in state file artifact entries) |

These patterns guide agents on what to produce and where to write it. Agents register actual artifacts in `.crew-state.yaml` after writing them.

### Path Branching

Steps with a `path` field only apply when that path is active:

```yaml
# Path A steps
- id: step-01a-proposal-intake
  path: A
  # ...

# Path B steps
- id: step-01b-project-brief
  path: B
  # ...

# Convergence — accepts either path
- id: step-03-pm-breakdown
  prerequisites_any: [step-02c-loe-generation, step-02b-scope-definition]
  # ...
```

Path selection happens at an entry step (e.g., `step-00-entry`). The orchestrator and agents skip steps on the inactive path.

### Optional Steps

```yaml
- id: step-06-import-history
  optional: true
  note: "Import engagement cost data for LOE benchmarking. Can run anytime after execution."
```

Optional steps don't block downstream steps. They can be run at any point or skipped entirely.

---

## Gate Schema

### Complete Field Reference

```yaml
gates:
  - id: gate-findings-classification
    after_step: step-04-findings-classification
    blocks: [step-05-compliance-mapping]
    description: "Findings register must be reviewed and approved before compliance mapping"
    required_approvers: [lead-consultant, engagement-pm]
    blocking: true
    condition: new-service-opportunity
    path: A
    notes: "Client constraints should be confirmed at this gate"
```

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `id` | Yes | string | Unique gate identifier. Convention: `gate-description` |
| `after_step` | Yes | string | Step ID that triggers this gate when completed |
| `blocks` | Yes | array | Step IDs that cannot start until this gate is `approved` |
| `description` | Yes | string | What the reviewer should check |
| `required_approvers` | No | array | Roles that must approve (informational — not enforced programmatically) |
| `blocking` | No | boolean | If `true`, this is a hard stop — nothing proceeds until approval |
| `condition` | No | string | Gate only triggers under this condition (e.g., `new-service-opportunity`) |
| `path` | No | string | Gate only applies when this path is active |
| `notes` | No | string | Additional guidance for reviewers |

### Gate Blocking

The `blocks` array lists downstream steps held until approval:

```yaml
gates:
  - id: gate-sow-derivation
    after_step: step-02a-sow-derivation
    blocks: [step-02c-loe-generation]
```

When this gate is `pending` or `rejected`, `step-02c-loe-generation` cannot start. When approved, it unblocks.

An empty `blocks` array means the gate is a review checkpoint that doesn't hold anything:

```yaml
- id: gate-qa-review
  after_step: step-06-qa-review
  blocks: []
  description: "QA must PASS before client delivery"
  blocking: true
```

Even with `blocks: []`, `blocking: true` signals this is a hard stop — the workflow shouldn't be considered complete until this gate passes.

### Conditional Gates

```yaml
- id: gate-service-check
  condition: new-service-opportunity
```

Conditional gates only activate when the specified condition applies. The condition is evaluated by the orchestrator based on the step's output or user input.

### Gate Lifecycle in State

When the orchestrator scaffolds a workflow, gates start as `pending` in `.crew-state.yaml`. The lifecycle:

```
pending → approved (via /crew GA) — downstream steps unblock
pending → rejected (via /crew GR) — step reset needed (/crew RS)
```

See [State Management](state-management.md) for the full gate schema in the state file.

---

## Reference Sections

### Templates

Maps template keys to file paths. Used by agents to find document templates:

```yaml
templates:
  sow_template: "crew/templates/sow-template.md"
  loe_template: "crew/templates/loe-template.md"
  findings_matrix_template: "crew/templates/findings-matrix-template.md"
```

### Knowledge Base

Maps knowledge base keys to reference documents:

```yaml
knowledge_base:
  ot_ics_overview: "crew/knowledge-base/ot-ics-overview.md"
  nerc_cip_ref: "crew/knowledge-base/nerc-cip-reference.md"
  iec_62443_ref: "crew/knowledge-base/iec-62443-reference.md"
  nist_csf_ref: "crew/knowledge-base/nist-csf-reference.md"
```

### Data

Maps data file keys to structured data files:

```yaml
data:
  severity_scales: "crew/data/severity-scales.yaml"
  standards_crosswalks: "crew/data/standards-crosswalks.yaml"
  service_catalog: "crew/data/service-catalog.yaml"
```

### Input File Patterns

Documents what external inputs the workflow expects:

```yaml
input_file_patterns:
  signed_proposal:
    description: "Signed client proposal (Path A only)"
    pattern: "{{engagement_artifacts}}/*-proposal.{md,pdf,docx}"
    path: A
  sow:
    description: "Approved Statement of Work"
    pattern: "{{engagement_artifacts}}/{{engagement_name}}-sow.md"
```

| Subfield | Description |
|----------|-------------|
| `description` | What this input is |
| `pattern` | Expected file path or glob pattern |
| `path` | (Optional) Only relevant for a specific path |

---

## Step Instruction Files

Each step's `file` field points to a markdown file in the `steps/` subdirectory:

```yaml
- id: step-01-environment-profiling
  file: steps/step-01-environment-profiling.md
```

Step files contain detailed instructions for the agent: what to do, what to reference, what to produce, quality criteria, and examples. These are read by agents at runtime — they're the "how" while the workflow YAML is the "what and when."

Step files may contain `{{placeholders}}` that are stamped at install time.

---

## Existing Workflows

| Workflow | Directory | Steps | Gates | Branching | Requires |
|----------|-----------|-------|-------|-----------|----------|
| engagement-kickoff | `crew/workflows/engagement-kickoff/` | 6 | 3 | No | — |
| new-engagement | `crew/workflows/new-engagement/` | 10+ | 6 | Yes (Path A/B) | — |
| assessment | `crew/workflows/assessment/` | 6 | 2 | No | engagement-kickoff OR new-engagement |
| report-generation | `crew/workflows/report-generation/` | 5 | 2 | No | assessment OR new-engagement |
| remediation-plan | `crew/workflows/remediation-plan/` | 4 | 1 | No | assessment OR new-engagement |

For walkthroughs of each workflow, see the individual docs in [docs/workflows/](workflows/).

---

## Complete Example

Here's a minimal but complete workflow YAML showing all features:

```yaml
name: example-workflow
description: "A minimal workflow demonstrating all schema features"

requires_workflows:
  - any_of: [setup-workflow]
    reason: "Setup artifacts must exist before this workflow begins"

steps:
  - id: step-00-entry
    file: steps/step-00-entry.md
    agent: bd
    prerequisites: []
    required_artifacts: []
    produces: []
    note: "Determines whether Path A or Path B applies"

  - id: step-01a-fast-track
    file: steps/step-01a-fast-track.md
    agent: bd
    path: A
    prerequisites: [step-00-entry]
    gate_after: gate-fast-track
    required_artifacts:
      - pattern: "{{engagement_artifacts}}/*-proposal.md"
    produces:
      - pattern: "{{engagement_artifacts}}/{{engagement_name}}-sow.md"
        type: sow

  - id: step-01b-full-scope
    file: steps/step-01b-full-scope.md
    agent: bd
    path: B
    prerequisites: [step-00-entry]
    gate_after: gate-full-scope
    required_artifacts: []
    produces:
      - pattern: "{{engagement_artifacts}}/{{engagement_name}}-sow.md"
        type: sow
      - pattern: "{{engagement_artifacts}}/{{engagement_name}}-loe.md"
        type: loe

  - id: step-02-execution
    file: steps/step-02-execution.md
    agent: consultant
    prerequisites_any: [step-01a-fast-track, step-01b-full-scope]
    gate_after: gate-execution
    required_artifacts:
      - pattern: "{{engagement_artifacts}}/{{engagement_name}}-sow.md"
    produces:
      - pattern: "{{assessment_artifacts}}/{{engagement_name}}-findings.md"
        type: findings

  - id: step-03-optional-history
    file: steps/step-03-optional-history.md
    agent: pm
    prerequisites: [step-02-execution]
    optional: true
    required_artifacts: []
    produces: []

gates:
  - id: gate-fast-track
    after_step: step-01a-fast-track
    blocks: [step-02-execution]
    path: A
    description: "SOW derived from proposal must be reviewed"

  - id: gate-full-scope
    after_step: step-01b-full-scope
    blocks: [step-02-execution]
    path: B
    description: "SOW and LOE must be reviewed before execution"

  - id: gate-execution
    after_step: step-02-execution
    blocks: []
    description: "Findings must be reviewed before delivery"
    required_approvers: [qa-reviewer]
    blocking: true

templates:
  sow_template: "crew/templates/sow-template.md"

knowledge_base:
  ot_ics_overview: "crew/knowledge-base/ot-ics-overview.md"

data:
  severity_scales: "crew/data/severity-scales.yaml"
```

---

## See Also

- [Workflow Overview](workflows/overview.md) — How workflows, steps, and gates fit together
- [State Management](state-management.md) — How workflow state is tracked
- [Architecture](architecture.md) — How workflows integrate with the rest of CREW
- [Extending CREW](extending-crew.md) — How to create new workflows
