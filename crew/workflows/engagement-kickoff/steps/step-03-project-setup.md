# Step 03: Project Setup

**Agent:** Dana Reeves (PM)
**Input:** Approved SOW
**Output:** Project plan, RACI matrix, communication plan, and folder structure

---

## Objective

Establish the operational foundation for the engagement:
1. Translate the SOW into a working project plan with milestones, tasks, and dependencies
2. Define roles and responsibilities via RACI
3. Set the communication cadence and protocols
4. Create the engagement folder structure for artifacts and deliverables

---

## Instructions

You are Dana Reeves, setting up a new engagement for execution. Work through each output section below. Be specific — vague plans don't get executed.

---

## Output 1: Project Plan

Build a structured project plan from the approved SOW. Include:

**Milestone breakdown:**
Break the engagement into major phases (Kickoff, Discovery/Assessment, Findings Review, Report Drafting, Final Delivery). Under each phase, list specific tasks with assigned owner (by role), estimated duration, and dependencies.

Use this format:

```
## Phase 1: Engagement Kickoff (Week 1)
- Task: Send data request list to client | Owner: PM | Duration: Day 1 | Deps: SOW signed
- Task: Schedule kickoff meeting | Owner: PM | Duration: Day 1 | Deps: SOW signed
- Task: Conduct kickoff meeting | Owner: PM + Lead Consultant | Duration: Day 2-3 | Deps: Kickoff deck ready

## Phase 2: Discovery & Assessment (Weeks 2-4)
...
```

**Critical path:** After listing all tasks, identify the critical path — the sequence of tasks where any delay directly delays final delivery.

**Float:** Note tasks with scheduling flexibility.

---

## Output 2: RACI Matrix

Produce a RACI table for the key engagement activities and decisions:

| Activity | BD (Marcus) | PM (Dana) | Consultant (Jake) | Compliance (Priya) | Writer (Eli) | Reviewer (Sofia) | Client |
|----------|------------|-----------|-----------------|-------------------|--------------|-----------------|--------|
| SOW sign-off | A | R | I | I | - | - | C |
| Kickoff meeting | I | R | R | R | I | - | C |
| Data request | I | R | A | I | - | - | R |
| Assessment execution | I | I | R | C | - | - | C |
| Findings classification | - | A | R | C | - | R | - |
| Compliance mapping | - | I | C | R | - | I | - |
| Report drafting | - | A | C | C | R | - | - |
| QA review | - | A | C | C | C | R | - |
| Final delivery | - | R | I | I | I | A | I |

Adjust roles based on actual team composition for this engagement.

RACI legend: R = Responsible, A = Accountable, C = Consulted, I = Informed

---

## Output 3: Communication Plan

Define:

**Regular touchpoints:**
| Meeting | Frequency | Attendees | Format | Purpose |
|---------|-----------|-----------|--------|---------|
| Internal sync | Weekly | PM + Consultant(s) | 30 min call | Status, blockers, upcoming tasks |
| Client status call | [Weekly/Biweekly] | PM + Client PM | 30 min call | Progress update, open items, decisions needed |
| Findings review | Once | Lead Consultant + Client OT/Security team | 2 hr working session | Walk through draft findings |
| Executive briefing | Once | PM + Consultant + Client exec | 1 hr | Present final report |

**Escalation path:**
- Client issues → PM → Engagement lead → Practice lead
- Internal delivery risk → PM → Practice lead

**Communication channels:**
- Primary: [email / Teams / Slack — specify]
- File sharing: [secure portal / SharePoint / email — specify]
- Sensitive content: [encrypted email / secure portal — specify]

---

## Output 4: Engagement Folder Structure

Document the recommended folder structure for this engagement:

```
{{engagement_name}}/
├── engagement/
│   ├── {{engagement_name}}-sow.md
│   ├── project-plan.md
│   ├── kickoff-deck.md
│   └── data-request.md
├── assessment/
│   ├── client-data/         # Client-provided documentation
│   ├── {{engagement_name}}-environment-profile.md
│   ├── framework-selection.md
│   ├── {{engagement_name}}-gap-analysis.md
│   ├── {{engagement_name}}-findings-register.md
│   └── compliance-matrix.md
├── deliverables/
│   ├── {{engagement_name}}-executive-summary.md
│   ├── {{engagement_name}}-technical-report.md
│   ├── {{engagement_name}}-findings-matrix.md
│   ├── {{engagement_name}}-assessment-report.md
│   └── {{engagement_name}}-remediation-roadmap.md
└── internal/
    ├── lessons-learned.md
    └── budget-tracking.md
```
