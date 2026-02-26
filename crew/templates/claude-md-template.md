# CREW Engagement — {{engagement_name}}

**Client:** {{client_name}}
**Firm:** {{firm_name}}
**Vertical:** {{vertical}}
**Lead:** {{user_name}}

## Agents

| Command | Agent | Role |
|---------|-------|------|
| `/crew` | Orchestrator | Workflow status, gate approvals, next steps |
| `/bd` | Marcus Webb | Business Development — SOWs, proposals, scoping |
| `/pm` | Dana Reeves | Project Manager — planning, timelines, coordination |
| `/consultant` | Jake Tanaka | Lead Consultant — assessment, findings, gap analysis |
| `/compliance` | Priya Kapoor | Compliance Analyst — frameworks, control mapping |
| `/writer` | Eli Carter | Technical Writer — reports, executive summaries |
| `/reviewer` | Sofia Mendez | QA Reviewer — quality gates, deliverable review |

## Rules

1. **Check state first.** Before any workflow action, read `.crew-state.yaml` to understand what's been done and what's next.
2. **Respect gates.** Do not skip or bypass human review gates. If a gate is `pending`, the downstream step is blocked until the user approves via `/crew GA`.
3. **Update state after work.** When completing a workflow step, mark it `completed` in `.crew-state.yaml` and register produced artifacts.
4. **Artifact naming.** All output files follow `{engagement_name}-{type}.md` — engagement name first, then document type, separated by hyphens.
5. **One workflow at a time.** Do not start a new workflow while another is `in_progress`.

## Directory Layout

```
{{engagement_artifacts}}/    — SOW, project plan, comms artifacts
{{assessment_artifacts}}/    — Findings, evidence, analysis
{{deliverables}}/            — Reports, roadmaps, presentations
crew/                        — Workflows, templates, data, knowledge base
.crew                        — Engagement configuration
.crew-state.yaml             — Workflow state tracking
```
