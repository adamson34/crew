---
template_type: task-assignment
version: 1.0
module: crew
---

# Task Assignment
## {{engagement_name}}

---

**Engagement:** {{engagement_name}}
**Client:** {{client_name}}
**Prepared by:** Dana Reeves (PM)
**Date:** {{date}}
**Version:** 1.0

---

## How to Use This Document

This document is your work order. Each task tells you:
- Exactly what to produce
- What you need before you can start (your inputs)
- What the expected output artifact is (filename and location)
- When it's due
- What must be done before you can start (dependencies)

Do not start a task if its inputs are not available. Flag blockers to the PM immediately — do not wait until the due date.

If a task is ambiguous or you discover during execution that the scope is different from what's described, stop and consult the PM before proceeding.

---

## Engagement Overview

**Start date:** {{start_date}}
**Target delivery date:** {{delivery_date}}
**Total duration:** {{duration}}
**Applicable frameworks:** {{frameworks}}

---

## Task Assignments by Agent

---

### Jake Tanaka — Lead Consultant

| Task ID | Description | Inputs Required | Expected Output | Due | Dependencies | Notes |
|---------|-------------|-----------------|----------------|-----|--------------|-------|
| T-{{id}} | {{description}} | {{inputs}} | `{{output_file}}` | {{due}} | {{deps}} | {{notes}} |

> Standard consultant tasks:
> - Environment profiling from client documentation → `environment-profile.md`
> - Gap analysis against applicable frameworks → `gap-analysis.md`
> - Findings classification and register production → `findings-register.md`
> - Effort estimation for remediation roadmap (if in scope) → input to `remediation-roadmap.md`

---

### Priya Kapoor — Compliance Analyst

| Task ID | Description | Inputs Required | Expected Output | Due | Dependencies | Notes |
|---------|-------------|-----------------|----------------|-----|--------------|-------|
| T-{{id}} | {{description}} | {{inputs}} | `{{output_file}}` | {{due}} | {{deps}} | {{notes}} |

> Standard compliance analyst tasks:
> - Framework selection and applicability determination → `framework-selection.md`
> - Compliance mapping of approved findings → `compliance-matrix.md`

---

### Eli Carter — Technical Writer

| Task ID | Description | Inputs Required | Expected Output | Due | Dependencies | Notes |
|---------|-------------|-----------------|----------------|-----|--------------|-------|
| T-{{id}} | {{description}} | {{inputs}} | `{{output_file}}` | {{due}} | {{deps}} | {{notes}} |

> Standard writer tasks:
> - Executive summary draft → `{{engagement_name}}-executive-summary.md`
> - Technical report → `{{engagement_name}}-technical-report.md`
> - Findings matrix → `{{engagement_name}}-findings-matrix.md`
> - Report assembly → `{{engagement_name}}-assessment-report.md`

---

### Sofia Mendez — QA Reviewer

| Task ID | Description | Inputs Required | Expected Output | Due | Dependencies | Notes |
|---------|-------------|-----------------|----------------|-----|--------------|-------|
| T-{{id}} | {{description}} | {{inputs}} | `QA review report` | {{due}} | {{deps}} | {{notes}} |

> Standard QA tasks:
> - Assessment findings QA review → verdict (PASS/FAIL) before report writing
> - Final deliverable QA review → BLOCKING verdict before client delivery

---

## Complete Task List (All Agents)

| Task ID | Assigned To | Description | Due | Status |
|---------|-------------|-------------|-----|--------|
| T-001 | PM | Send data request list to client | Week 1 | Open |
| T-002 | PM | Schedule and conduct kickoff meeting | Week 1 | Open |
| T-003 | Consultant | Environment profiling | Week 2 | Open |
| T-004 | Compliance | Framework selection | Week 2 | Open |
| T-005 | Consultant | Gap analysis | Week 3 | Open |
| T-006 | Consultant | Findings classification | Week 3 | Open |
| T-007 | Compliance | Compliance mapping | Week 4 | Open |
| T-008 | Reviewer | Assessment QA review | Week 4 | Open |
| T-009 | Writer | Executive summary | Week 5 | Open |
| T-010 | Writer | Technical report and findings matrix | Week 5 | Open |
| T-011 | Writer | Report assembly | Week 5 | Open |
| T-012 | Reviewer | Final deliverable QA | Week 6 | Open |

> Adjust task IDs, descriptions, and timelines for this specific engagement. Add or remove tasks to match the approved SOW deliverables.

---

## Artifact Dependency Map

```
Client data received
  → T-003: Environment Profiling → environment-profile.md
  → T-004: Framework Selection → framework-selection.md
       ↓
  → T-005: Gap Analysis → gap-analysis.md
       ↓
  → T-006: Findings Classification → findings-register.md  ← [Human Gate]
       ↓
  → T-007: Compliance Mapping → compliance-matrix.md
  → T-008: Assessment QA → PASS required                   ← [Human Gate]
       ↓
  → T-009: Executive Summary                               ← [Human Gate]
  → T-010: Technical Report + Findings Matrix
       ↓
  → T-011: Report Assembly → {{engagement_name}}-assessment-report.md
       ↓
  → T-012: Final QA → PASS required                        ← [BLOCKING Gate]
       ↓
  Client delivery
```

---

## Status Definitions

- **Open** — Not yet started
- **In Progress** — Actively being worked
- **Blocked** — Cannot proceed; blocker flagged to PM
- **In Review** — Submitted for human review gate
- **Complete** — Artifact produced and (if required) approved

---

## Escalation

If blocked:
1. Stop work on the blocked task
2. Document the blocker in the Notes column
3. Notify PM immediately — do not absorb the delay silently
4. Continue any other tasks that are not blocked

If you discover during execution that the task scope is materially different from what's described:
1. Do not expand scope to accommodate
2. Document what you found
3. Consult PM before proceeding — this may require a scope change conversation with the client
