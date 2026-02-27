# Report Generation Workflow

Assembles the full client assessment report: executive summary, technical findings, findings matrix, report assembly, and final QA review.

**Use when:** The assessment phase is complete and QA-approved. You're ready to produce client deliverables.

**Agents involved:** `/writer` (Eli Carter) for all report sections, `/reviewer` (Sofia Mendez) for final QA.

**Requires:** Completed, QA-approved findings register and environment profile from the assessment workflow.

## Steps

| Step | Agent | Prerequisites | Gate After | Produces |
|------|-------|---------------|------------|----------|
| step-01-executive-summary | `/writer` | — | gate-executive-summary | `{engagement}-executive-summary.md` |
| step-02-technical-report | `/writer` | step-01 | — | `{engagement}-technical-report.md` |
| step-03-findings-matrix | `/writer` | step-02 | — | `{engagement}-findings-matrix.md` |
| step-04-assemble | `/writer` | step-03 | — | `{engagement}-assessment-report.md` |
| step-05-qa-review | `/reviewer` | step-04 | gate-qa-review | — |

All deliverables are written to the `deliverables/` directory.

## Gates

| Gate | After Step | Blocks | Description |
|------|-----------|--------|-------------|
| gate-executive-summary | step-01 | step-02 | Executive summary reviewed by engagement lead before technical report |
| gate-qa-review | step-05 | — | **Blocking** — QA must PASS before client delivery |

## Walkthrough

1. **`/crew IN`** → Select `report-generation`
2. **`/writer`** → Select **ES** (Executive Summary) — draft the exec summary
3. **`/crew GA`** → Approve `gate-executive-summary`
4. **`/writer`** → Select **TR** (Technical Report) — draft technical findings
5. **`/writer`** → Select **FM** (Findings Matrix) — produce the findings table
6. **`/writer`** → Select **AS** (Assemble Report) — combine all sections
7. **`/reviewer`** → Select **QD** (QA Review — Deliverable) — final quality gate
8. **`/crew GA`** → Approve `gate-qa-review` (or `/crew GR` → rework cycle)

## Input Files

| Input | Pattern | Source |
|-------|---------|--------|
| Findings register | `assessment/{engagement}-findings-register.md` | Assessment workflow |
| Compliance matrix | `assessment/{engagement}-compliance-matrix.md` | Assessment workflow |
| Environment profile | `assessment/{engagement}-environment-profile.md` | Assessment workflow |
| SOW | `engagement/*-sow.md` | For scope alignment validation |

## Templates Used

- `crew/templates/executive-summary-template.md`
- `crew/templates/technical-report-template.md`
- `crew/templates/findings-matrix-template.md`

---

## See Also

- [Workflow Overview](overview.md) — How workflows, steps, and gates work
- [Eli Carter (`/writer`)](../agents/writer.md) — Steps 01–04
- [Sofia Mendez (`/reviewer`)](../agents/reviewer.md) — Step 05
- [Assessment](assessment.md) — Prior workflow that produces input artifacts
- [Remediation Plan](remediation-plan.md) — Typically follows report generation
