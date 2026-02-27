# Orchestrator Reference — `/crew`

The `/crew` command is the workflow management hub. It doesn't do consulting work — it manages state, routes you between agents, and handles review gates.

It reads two things:
1. **`.crew-state.yaml`** — the engagement's current progress
2. **`crew/workflows/{workflow}/workflow.yaml`** — the workflow definition (read-only)

If `.crew-state.yaml` doesn't exist, it offers to initialize one.

## Command Summary

| Code | Command | What It Does |
|------|---------|-------------|
| **ST** | Status | Dashboard: steps, gates, artifact count |
| **NX** | Next Step | Identifies next actionable step and which agent to invoke |
| **IN** | Initialize | Picks a workflow, scaffolds steps and gates into state |
| **GA** | Gate Approval | Approves a pending gate, unblocks downstream steps |
| **GR** | Gate Rejection | Rejects a gate with structured notes |
| **RS** | Reset Step | Resets a step to `not_started` for rework |
| **AF** | Artifacts | Lists all produced artifacts with provenance |
| **RH** | Revision History | Full revision trail for an artifact or gate |
| **RC** | Revision Context | Latest rejection feedback for rework preview |

---

## ST — Status

Reads `.crew-state.yaml` and displays a dashboard of the current engagement.

**When to use:** Anytime you want to see where things stand.

**Reads:** All sections of `.crew-state.yaml`
**Writes:** Nothing

**Example output:**

```
Engagement: acme-assessment
Workflow:   assessment (in_progress)
Started:    2026-02-26T10:00:00Z

Steps:
  [x] step-01-environment-profiling    (consultant)    completed 2026-02-26
  [>] step-02-framework-selection      (compliance)    in_progress
  [ ] step-03-gap-analysis             (consultant)    not_started
  [ ] step-04-findings-classification  (consultant)    not_started
  [ ] step-05-compliance-mapping       (compliance)    not_started
  [ ] step-06-qa-review                (reviewer)      not_started

Gates:
  [ ] gate-findings-classification     pending    (blocks: step-05)
  [ ] gate-qa-review                   pending

Artifacts: 1 produced
```

Markers: `[x]` completed, `[>]` in_progress, `[ ]` not_started/pending, `[-]` rejected.

---

## NX — Next Step

Finds the first step that's ready to work on — prerequisites completed and blocking gates approved.

**When to use:** After completing a step, after gate approval, or whenever you're not sure what to do next.

**Reads:** `.crew-state.yaml` (steps, gates), `workflow.yaml` (prerequisites)
**Writes:** Nothing

**Five possible outcomes:**

1. **Step found** — "Next: `step-03-gap-analysis`. Run `/consultant` and select gap analysis. Required input: `assessment/acme-environment-profile.md`"
2. **Gate pending** — "Gate `gate-findings-classification` is pending. Review the findings register and run `/crew GA` to approve."
3. **Step in progress** — "`step-02-framework-selection` is currently in progress with `/compliance`."
4. **All complete** — "All steps completed! Consider starting the next workflow with `/crew IN`."
5. **Prerequisites unmet** — "Cannot proceed — `step-02-framework-selection` requires `step-01-environment-profiling` to be completed first."

---

## IN — Initialize Workflow

Scaffolds a workflow into the state file so you can start working through its steps.

**When to use:** At the start of each workflow phase.

**Reads:** `crew/workflows/` directory listing, chosen `workflow.yaml`
**Writes:** `.crew-state.yaml` (overwrites steps, gates, active_workflow)

**Available workflows:**

| Workflow | Steps | Gates | Description |
|----------|-------|-------|-------------|
| engagement-kickoff | 6 | 3 | Qualification, SOW, project setup, kickoff |
| new-engagement | 10+ | 6 | Full lifecycle (two entry paths) |
| assessment | 6 | 2 | Environment profiling through QA review |
| report-generation | 5 | 2 | Executive summary through final QA |
| remediation-plan | 4 | 1 | Prioritization through quick wins |

**Process:**
1. Lists available workflows
2. You pick one
3. Reads the workflow's YAML and scaffolds all steps as `not_started` and gates as `pending`
4. Records `active_workflow` with the workflow ID, start time, and `status: in_progress`

If a workflow is already active, warns before overwriting.

---

## GA — Gate Approval

Approves a pending gate, recording your sign-off and unblocking downstream steps.

**When to use:** After reviewing agent output at a review checkpoint.

**Reads:** `.crew-state.yaml` (gates)
**Writes:** `.crew-state.yaml` (gate status, `reviewed_at`, `approved_draft`, revisions[])

**Process:**
1. Lists all gates with status `pending`
2. You select a gate
3. Confirms: "You are approving **gate-sow-generation** which unblocks step-03-project-setup. Have you reviewed the outputs?"
4. Sets gate status to `approved`, records timestamp
5. Sets `approved_draft` to the current draft number
6. Appends an `approved` entry to the `revisions` array

---

## GR — Gate Rejection

Rejects a gate with structured feedback. Downstream steps stay blocked.

**When to use:** When agent output needs rework before it can move forward.

**Reads:** `.crew-state.yaml` (gates)
**Writes:** `.crew-state.yaml` (gate status, notes, `reviewed_at`, `revision_count`, revisions[])

**Process:**
1. Lists all gates with status `pending`
2. You select a gate
3. Asks for rejection notes — use semicolon-separated issue IDs:
   ```
   B-01: Finding count mismatch in section 3; M-01: Recommendation for F-008 too vague
   ```
4. Sets gate status to `rejected`, records notes and timestamp
5. Sets `revision_count` to `1` if not already set (this is draft 1 being rejected)
6. Appends a `rejected` entry to the `revisions` array
7. Suggests: "Run `/crew RS` to reset the step for rework."

---

## RS — Reset Step

Resets a completed or in-progress step back to `not_started` so the agent can rework it.

**When to use:** After gate rejection, or anytime a step needs to be redone.

**Reads:** `.crew-state.yaml` (steps, gates)
**Writes:** `.crew-state.yaml` (step status, gate status, `revision_count`)

**Process:**
1. Lists all steps that are `completed` or `in_progress`
2. You select a step
3. Resets step to `not_started`, clears `started_at`, `completed_at`, and `artifacts_produced`
4. If the step had a `gate_after`, resets that gate to `pending`
5. Increments `revision_count` on the gate (or sets to `2` — going from draft 1 rejection to starting draft 2)
6. Tells you revision context is available for the agent

When you re-invoke the agent, it reads the revision context automatically via the state preamble protocol.

---

## AF — Artifacts

Lists all produced artifacts with their provenance and status.

**When to use:** To see what's been produced, check draft numbers, or verify artifact status.

**Reads:** `.crew-state.yaml` (artifacts[])
**Writes:** Nothing

**Example output:**

```
Artifacts (3 produced):
  assessment/acme-environment-profile.md
    produced by: consultant | step: step-01-environment-profiling | 2026-02-26

  assessment/acme-framework-selection.md
    produced by: compliance | step: step-02-framework-selection | 2026-02-26

  deliverables/acme-executive-summary.md  [draft 2, approved]
    produced by: writer | step: step-01-executive-summary | 2026-02-26
```

---

## RH — Revision History

Shows the full revision trail for an artifact or gate, grouped by draft number.

**When to use:** To understand the review history of a deliverable.

**Reads:** `.crew-state.yaml` (revisions[])
**Writes:** Nothing

**Example output:**

```
Revision History: deliverables/acme-executive-summary.md
  Gate: gate-executive-summary

  Draft 1:
    submitted  2026-02-26T10:00:00Z  writer    Initial draft
    rejected   2026-02-26T11:30:00Z  reviewer  B-01: Finding count mismatch; M-01: Rec too vague

  Draft 2:
    submitted  2026-02-26T14:00:00Z  writer    Fixed finding count, rewrote F-008 recommendation
    approved   2026-02-26T15:00:00Z  reviewer  All issues resolved. PASS.

  Result: Approved at draft 2 (1 revision cycle)
```

You can filter by artifact path or gate ID. If no revisions exist, it reports "No revision history recorded."

---

## RC — Revision Context

Shows the latest rejection feedback, so you (or an agent) can see what to fix.

**When to use:** Before re-invoking an agent for rework, or to preview rejection feedback.

**Reads:** `.crew-state.yaml` (revisions[])
**Writes:** Nothing

**Example output:**

```
Revision Context for gate-executive-summary:
  Last rejection (draft 1):
    B-01: Finding count mismatch in para 2
    M-01: Recommendation for F-008 too vague

  Next draft will be: draft 2. Address all issues above.
```

Agents read this automatically via the state preamble — this command is for human preview.

---

## See Also

- [Getting Started](getting-started.md) — Tutorial walkthrough using the orchestrator
- [State Management](state-management.md) — Deep dive into `.crew-state.yaml` schema
- [Workflow Overview](workflows/overview.md) — How workflows, steps, and gates are defined
