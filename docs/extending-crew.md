# Extending CREW

This guide covers how to add new agents, workflows, templates, task files, data files, knowledge base entries, and verticals to CREW.

## Adding a New Agent

### 1. Create the Agent Metadata

Create `crew/agents/{role}.agent.yaml`:

```yaml
name: {role}
display_name: "Agent Name"
description: "One-line role summary"
```

### 2. Create the Agent Persona

Create `crew/agents/compiled/{role}.md`:

```markdown
# CREW Agent — {Agent Name}, {Role Title}

## Identity

**Name:** {Agent Name}
**Role:** {Role Title}
**Background:** {2-3 sentences on expertise and experience}

## Principles

1. {Decision-making rule 1}
2. {Decision-making rule 2}
3. {Decision-making rule 3}

## Communication Style

{How this agent writes and speaks — formal, technical, consultative, etc.}

## Menu

| Code | Action | Description |
|------|--------|-------------|
| A | {Action Name} | {What it does} |
| B | {Action Name} | {What it does} |
| C | {Action Name} | {What it does} |

## Workflow Participation

| Workflow | Steps |
|----------|-------|
| {workflow-name} | {step-NN-description} |
```

**Key design principle:** Agents are roles, not task runners. Give them personality, opinions, and decision-making rules that shape output quality. Marcus approaches a SOW differently than Jake approaches a finding — that difference is intentional.

### 3. Register in the Installer

Edit `crew/install.js` — add the role name to the `AGENTS` array:

```javascript
const AGENTS = ['bd', 'pm', 'consultant', 'compliance', 'writer', 'reviewer', 'crew', 'new-role'];
```

The installer automatically:
- Looks for `crew/agents/compiled/{role}.md`
- Injects the preamble (for role agents, not the orchestrator)
- Stamps `{{placeholders}}`
- Installs to `.claude/commands/{role}.md`

### 4. Update Documentation

- Add the agent to the agent table in `crew/templates/claude-md-template.md`
- Create `docs/agents/{role}.md` with the agent's profile
- Update the agent-workflow mapping table in `docs/agents/overview.md`

---

## Adding a New Workflow

### 1. Create the Workflow Directory

```bash
mkdir -p crew/workflows/{workflow-name}/steps
```

### 2. Define the Workflow YAML

Create `crew/workflows/{workflow-name}/workflow.yaml`. See [Workflow Definition Reference](workflow-definition-reference.md) for the complete schema.

Minimal structure:

```yaml
name: {workflow-name}
description: "What this workflow accomplishes"

# Optional — declare if this workflow depends on artifacts from prior workflows
requires_workflows:
  - any_of: [prior-workflow-name]
    reason: "Why this workflow needs the prior one completed first"

steps:
  - id: step-01-description
    file: steps/step-01-description.md
    agent: {agent-role}
    prerequisites: []
    required_artifacts: []
    produces:
      - pattern: "{{assessment_artifacts}}/{{engagement_name}}-output.md"
        type: output-type

gates:
  - id: gate-description
    after_step: step-01-description
    blocks: []
    description: "What the reviewer should check"
```

If your workflow consumes artifacts produced by another workflow (e.g., a findings register from `assessment`), add `requires_workflows` so the orchestrator checks that the upstream workflow has been completed before allowing initialization. Use `any_of` when multiple workflows can satisfy the same dependency.

### 3. Write Step Instruction Files

Create a markdown file for each step in `steps/`:

```markdown
# Step 01 — Description

## Objective

What this step accomplishes.

## Inputs

- {Required artifact or information}

## Process

1. {What the agent should do first}
2. {What comes next}
3. {Final actions}

## Output

Produce `{{assessment_artifacts}}/{{engagement_name}}-output.md` containing:

- {Section 1}
- {Section 2}

## Quality Criteria

- {What makes this output good}
- {What to avoid}
```

Step files can use `{{placeholders}}` — they're stamped at install time.

### 4. Register the Workflow

The orchestrator (`crew/agents/compiled/crew.md`) needs to know about the workflow. Add it to the workflow selection list in the `## IN — Initialize Workflow` section.

### 5. Create a Documentation Page

Create `docs/workflows/{workflow-name}.md` with a step-by-step walkthrough.

Update the workflow table in `docs/workflows/overview.md`.

---

## Adding a New Template

Templates live in `crew/templates/` and define the structure of deliverables. Agents read templates and fill in the content.

### 1. Create the Template

Create `crew/templates/{type}-template.md`:

```markdown
# {Document Title} — {{engagement_name}}

**Client:** {{client_name}}
**Prepared by:** {{firm_name}}
**Date:** {{date}}

---

## Section 1

{Instructions or placeholder content for the agent}

## Section 2

{More sections as needed}
```

Templates can use `{{placeholders}}` for engagement-specific values.

### 2. Reference from Workflow YAMLs

Add the template to the `templates` section of relevant workflow YAMLs:

```yaml
templates:
  new_template: "crew/templates/{type}-template.md"
```

### 3. Reference from Step Files

In step instruction files, tell the agent which template to use:

```markdown
Use the template at `crew/templates/{type}-template.md` as your document structure.
```

### Available Templates

| Template | Purpose | Used By |
|----------|---------|---------|
| `sow-template.md` | Statement of Work | BD |
| `loe-template.md` | Level of Effort estimate | PM |
| `assumptions-template.md` | Assumptions register | BD, PM |
| `task-assignment-template.md` | Task assignment / WBS | PM |
| `executive-summary-template.md` | Executive summary | Writer |
| `technical-report-template.md` | Technical report | Writer |
| `findings-matrix-template.md` | Findings matrix table | Writer |
| `remediation-roadmap-template.md` | Remediation roadmap | Consultant, PM |
| `claude-md-template.md` | CLAUDE.md generation | Installer (special) |

---

## Adding a New Task File

Task files are standalone guides that agents can follow outside of workflows. They're invoked conversationally — the user asks an agent to perform a task, and the agent reads the task file for structured guidance.

### 1. Create the Task File

Create `crew/tasks/{task-name}.md`:

```markdown
# {Task Name}

**Agent:** {Agent Name} ({role})

## Purpose

What this task accomplishes and when to use it.

## Process

1. {Step 1}
2. {Step 2}
3. {Step 3}

## Output Format

{What the agent should produce}

## References

- {Data files or knowledge base docs to consult}
```

### 2. Reference from Agent Files

Add the task to the agent's menu in `crew/agents/compiled/{role}.md`:

```markdown
| Code | Action | Description |
|------|--------|-------------|
| X | {Task Name} | {What it does} — uses `crew/tasks/{task-name}.md` |
```

### Available Task Files

| Task | Agent | Purpose |
|------|-------|---------|
| `asset-discovery.md` | Consultant | Document OT/ICS assets from multiple sources |
| `scope-engagement.md` | BD, PM | Structured scoping exercise with four key questions |
| `deliverable-review.md` | Reviewer | Peer review framework with severity levels |
| `findings-classification.md` | Consultant | Structure and rate security findings |

---

## Adding Data Files

Data files in `crew/data/` contain structured reference data that agents consult during work.

### 1. Create the Data File

Create `crew/data/{data-name}.yaml`:

```yaml
# {Data Name}
# {Brief description of what this contains and how agents use it}

{structured YAML content}
```

### 2. Reference from Workflow YAMLs

```yaml
data:
  new_data: "crew/data/{data-name}.yaml"
```

### 3. Reference from Agent Files or Step Files

Tell agents when and how to consult the data file in their step instructions or persona.

### Available Data Files

| File | Contents | Used By |
|------|----------|---------|
| `severity-scales.yaml` | 5-level severity scale with CVSS ranges, remediation timelines, OT-specific guidance | Consultant, Reviewer |
| `standards-crosswalks.yaml` | Control domain mappings across NERC CIP, IEC 62443, NIST CSF, NIST SP 800-82 | Compliance |
| `service-catalog.yaml` | Firm service offerings with match keywords, delivery types, team composition | BD |
| `engagement-history.yaml` | Past engagement LOE data for benchmarking estimates | PM |

---

## Adding Knowledge Base Entries

Knowledge base files in `crew/knowledge-base/` contain domain reference material that agents read during assessments.

### 1. Create the Knowledge Base File

Create `crew/knowledge-base/{topic}-reference.md`:

```markdown
# {Topic} Reference

## Overview

{High-level summary}

## {Section 1}

{Structured reference content}

## {Section 2}

{More content}
```

Knowledge base files should be 5-10KB of structured, factual reference material. They're read by agents as background knowledge — not presented to clients directly.

### 2. Reference from Workflow YAMLs

```yaml
knowledge_base:
  new_reference: "crew/knowledge-base/{topic}-reference.md"
```

### Available Knowledge Base Files

| File | Coverage |
|------|----------|
| `ot-ics-overview.md` | Purdue model, zone/conduit model, IT vs OT differences, common attack vectors |
| `nerc-cip-reference.md` | NERC CIP-002 through CIP-013, scope, common findings, evidence requirements |
| `iec-62443-reference.md` | IEC 62443 series, security levels SL1-4, foundational/system requirements |
| `nist-csf-reference.md` | NIST CSF 2.0 functions, 23 categories, OT-specific guidance, cross-framework mappings |

---

## Adding a New Vertical

The OT/ICS cybersecurity vertical is the starter pack. To add a new consulting domain:

### 1. Add Knowledge Base Files

Create domain-specific reference documents in `crew/knowledge-base/`. For cloud security, you might add:

- `cloud-security-overview.md` — CSP models, shared responsibility, common architectures
- `cis-benchmarks-reference.md` — CIS benchmark categories and common findings
- `aws-well-architected-reference.md` — Security pillar, best practices

### 2. Update Severity Scales

Edit `crew/data/severity-scales.yaml` if the domain has different severity considerations. The OT/ICS scales include safety impact — a cloud security vertical might emphasize data exposure scope instead.

### 3. Add Domain-Specific Standards

Edit `crew/data/standards-crosswalks.yaml` to add control mappings for the new domain's frameworks.

### 4. Extend Agent Personas

Agents have domain-generic consulting skills but OT/ICS-specific knowledge. For a new vertical, you can either:

- **Extend existing agents** — Add domain knowledge sections to `crew/agents/compiled/*.md`
- **Create domain variants** — Create `consultant-cloud.md` etc. with domain-specific expertise

### 5. Add Domain-Specific Workflow Steps

If the methodology differs significantly, create new step files in `crew/workflows/*/steps/` or create entirely new workflows.

### 6. Register the Vertical

Add the new vertical to the installer's options in `crew/install.js`:

```javascript
{
  key: 'vertical',
  options: [
    { value: 'ot-ics', label: 'OT/ICS Cybersecurity' },
    { value: 'cloud-security', label: 'Cloud Security' },
    // add new vertical here
  ],
}
```

### What Changes Per Vertical

| Component | Domain-Specific? | Notes |
|-----------|-------------------|-------|
| Agent personas | Partially | Core consulting skills are generic; domain knowledge varies |
| Workflow structure | Mostly generic | Steps and gates apply across domains |
| Step instructions | Partially | Some steps need domain-specific guidance |
| Templates | Generic | Document structure doesn't change by domain |
| Knowledge base | Fully domain-specific | Each vertical needs its own reference material |
| Data files | Partially | Severity scales and standards crosswalks vary |
| Hooks | Generic | State validation is domain-agnostic |

---

## Adding a New Orchestrator Command

The orchestrator (`crew/agents/compiled/crew.md`) has 9 subcommands. To add a new one:

### 1. Edit the Command Table

In `crew.md`, add the new command to the command table:

```markdown
| **XX** | {Command Name} | {Brief description} |
```

### 2. Add the Command Section

Add a new `## XX — {Command Name}` section with numbered steps describing what the command does.

### 3. Update Documentation

Add the command to `docs/orchestrator-reference.md`.

---

## Adding a New State Field

All new fields in `.crew-state.yaml` must be backward compatible — agents must work without the field present.

### 1. Add Validation

Edit `crew/hooks/state-validate.js`:
- Add the field to the validation logic (after existing sections)
- Use optional checks — don't error if the field is missing

### 2. Add to Initial State

Edit `crew/install.js` in `writeInitialState()` to include the new field in the skeleton.

### 3. Update the Custom YAML Parser

If the new field has a structure the parser doesn't handle, you may need to extend `parseStateYaml()` in `state-validate.js`. The parser currently handles:
- Top-level scalars
- Top-level maps with 2-indent children
- Maps of maps (3 levels deep)
- Top-level arrays with object entries
- Nested arrays at 6-indent level

**Do not** add YAML anchors, multi-line strings, or deep nesting — the parser intentionally doesn't support these.

### 4. Update the Preamble

If agents need to interact with the new field, update `crew/agents/preamble.md` with instructions.

### 5. Update Documentation

- Update the schema table in `docs/state-management.md`
- Update `CLAUDE.md` in the project root if it references the state schema

---

## Testing Changes

### Hook Tests

```bash
node crew/hooks/test-hooks.js
```

Tests state guard validation, session context output, and completion guard behavior. Add test cases for new state fields or validation rules.

### Manual Testing

1. Run the installer in a test directory
2. Open Claude Code and verify agents load (`/bd`, `/pm`, etc.)
3. Initialize a workflow (`/crew IN`) and check `.crew-state.yaml`
4. Run through a few steps to verify state updates work
5. Test gate approval and rejection
6. Verify hooks fire (session context on start, state guard on writes)

---

## See Also

- [Architecture](architecture.md) — How all pieces fit together
- [Workflow Definition Reference](workflow-definition-reference.md) — Complete YAML schema for workflows
- [Hooks Reference](hooks-reference.md) — Hook system details
- [Installation Guide](installation-guide.md) — What the installer does
- [State Management](state-management.md) — State file schema
