# New Engagement Workflow

End-to-end workflow for a net-new consulting engagement. Two entry paths that converge at PM breakdown, then flow through consultant execution, report writing, and final QA.

**Use when:** You want the full engagement lifecycle in a single workflow rather than running individual phases separately.

**Agents involved:** All six — `/bd`, `/pm`, `/consultant`, `/writer`, `/reviewer` (and `/compliance` indirectly via consultant execution).

## Path Selection

The workflow has two entry paths determined at step-00:

### Path A — Signed Proposal

Use when the client already has a signed proposal in hand. The BD agent derives a SOW from the existing proposal, then PM generates the LOE separately.

```
step-00-entry → step-01a-proposal-intake → step-02a-sow-derivation [gate]
  → step-02c-loe-generation → (converge at step-03)
```

### Path B — Unscoped Project

Use when the project is vague or unscoped. The BD agent builds the SOW, LOE, and Assumptions together during scope definition.

```
step-00-entry → step-01b-project-brief → step-02b-scope-definition [gate]
  → (converge at step-03)
```

Both paths converge at **step-03-pm-breakdown** using `prerequisites_any` logic — at least one of `step-02c-loe-generation` or `step-02b-scope-definition` must be completed.

## Steps

| Step | Agent | Path | Prerequisites | Gate After | Produces |
|------|-------|------|---------------|------------|----------|
| step-00-entry | `/bd` | Both | — | — | — |
| step-01a-proposal-intake | `/bd` | A | step-00 | — | — |
| step-02a-sow-derivation | `/bd` | A | step-01a | gate-sow-derivation | SOW |
| step-01b-project-brief | `/bd` | B | step-00 | — | — |
| step-02b-scope-definition | `/bd` | B | step-01b | gate-scope-definition | SOW, LOE, Assumptions |
| step-02c-loe-generation | `/pm` | A | step-02a | — | LOE, Assumptions |
| step-03-pm-breakdown | `/pm` | Both | step-02c OR step-02b | gate-pm-breakdown | Task Assignment |
| step-04-consultant-execution | `/consultant` | Both | step-03 | gate-consultant-execution | Findings Register, Environment Profile, Gap Analysis |
| step-05-report-writing | `/writer` | Both | step-04 | gate-report-writing | Technical Report, Findings Matrix, Executive Summary |
| step-06-qa-review | `/reviewer` | Both | step-05 | gate-qa-review | Assessment Report |
| step-06-import-history | `/pm` | Both | step-04 | — | — (optional, LOE benchmarking) |

## Gates

| Gate | After Step | Path | Blocks | Description |
|------|-----------|------|--------|-------------|
| gate-sow-derivation | step-02a | A | step-02c | Confirm SOW reflects signed proposal |
| gate-scope-definition | step-02b | B | step-03 | Confirm SOW realistic, LOE defensible, assumptions documented |
| gate-pm-breakdown | step-03 | Both | step-04 | Confirm tasks scoped, sequenced, and assigned correctly |
| gate-consultant-execution | step-04 | Both | step-05 | Confirm all findings evidence-backed and accurately rated |
| gate-report-writing | step-05 | Both | step-06 | Confirm exec summary and report draft ready for assembly |
| gate-qa-review | step-06 | Both | — | **Blocking gate** — QA must PASS before client delivery |

## Walkthrough (Path B)

1. **`/crew IN`** → Select `new-engagement`
2. **`/bd`** → Entry decision — choose Path B (unscoped project)
3. **`/bd`** → Project brief — capture client context and objectives
4. **`/bd`** → Scope definition — produces SOW, LOE, and Assumptions
5. **`/crew GA`** → Approve `gate-scope-definition`
6. **`/pm`** → PM breakdown — task assignment from SOW and LOE
7. **`/crew GA`** → Approve `gate-pm-breakdown`
8. **`/consultant`** → Execution — environment profiling, gap analysis, findings classification
9. **`/crew GA`** → Approve `gate-consultant-execution`
10. **`/writer`** → Report writing — executive summary, technical report, findings matrix
11. **`/crew GA`** → Approve `gate-report-writing`
12. **`/reviewer`** → Final QA review — PASS/FAIL verdict
13. **`/crew GA`** → Approve `gate-qa-review` (or `/crew GR` → rework cycle)

## Templates Used

- `crew/templates/sow-template.md`
- `crew/templates/loe-template.md`
- `crew/templates/assumptions-template.md`
- `crew/templates/task-assignment-template.md`
- `crew/templates/technical-report-template.md`
- `crew/templates/findings-matrix-template.md`

## Input Files

| Input | Pattern | Path |
|-------|---------|------|
| Signed proposal | `engagement/*-proposal.{md,pdf,docx}` | A only |
| SOW (after step-02) | `engagement/{engagement}-sow.md` | Both |
| Task assignment (after step-03) | `engagement/{engagement}-task-assignment.md` | Both |
| Findings register (after step-04) | `assessment/{engagement}-findings-register.md` | Both |

---

## See Also

- [Workflow Overview](overview.md) — How workflows, steps, and gates work
- [Engagement Kickoff](engagement-kickoff.md) — Alternative: just the setup phase
- [Assessment](assessment.md) — The technical assessment as a standalone workflow
