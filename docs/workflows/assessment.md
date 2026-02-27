# Assessment Workflow

The core technical workflow: environment profiling, framework selection, gap analysis, findings classification, compliance mapping, and QA review.

**Use when:** Running the technical assessment phase as a standalone workflow (after scoping and setup are done).

**Agents involved:** `/consultant` (Jake Tanaka) for technical work, `/compliance` (Priya Kapoor) for framework and compliance work, `/reviewer` (Sofia Mendez) for QA.

## Steps

| Step | Agent | Prerequisites | Gate After | Produces |
|------|-------|---------------|------------|----------|
| step-01-environment-profiling | `/consultant` | — | — | `{engagement}-environment-profile.md` |
| step-02-framework-selection | `/compliance` | step-01 | — | `{engagement}-framework-selection.md` |
| step-03-gap-analysis | `/consultant` | step-02 | — | `{engagement}-gap-analysis.md` |
| step-04-findings-classification | `/consultant` | step-03 | gate-findings-classification | `{engagement}-findings-register.md` |
| step-05-compliance-mapping | `/compliance` | step-04 | — | `{engagement}-compliance-matrix.md` |
| step-06-qa-review | `/reviewer` | step-05 | gate-qa-review | — |

All assessment artifacts are written to the `assessment/` directory.

## Gates

| Gate | After Step | Blocks | Approvers | Description |
|------|-----------|--------|-----------|-------------|
| gate-findings-classification | step-04 | step-05 | Lead consultant, PM | Findings register reviewed and approved before compliance mapping |
| gate-qa-review | step-06 | — | QA reviewer | **Blocking** — QA must explicitly PASS before advancing to report generation |

The findings classification gate is the key quality checkpoint. Compliance mapping and all downstream work depends on accurate, properly rated findings. Don't rush this gate.

## Walkthrough

1. **`/crew IN`** → Select `assessment`
2. **`/consultant`** → Select **EP** (Environment Profile) — document architecture, assets, topology
3. **`/compliance`** → Select **FS** (Framework Selection) — select applicable frameworks based on environment
4. **`/consultant`** → Select **GA** (Gap Analysis) — assess controls against selected frameworks
5. **`/consultant`** → Select **FC** (Findings Classification) — classify, rate, and finalize findings
6. **`/crew GA`** → Approve `gate-findings-classification` after reviewing the findings register
7. **`/compliance`** → Select **CM** (Compliance Mapping) — map findings to framework requirements
8. **`/reviewer`** → Select **QR** (QA Review — Assessment) — validate findings register
9. **`/crew GA`** → Approve `gate-qa-review` (or `/crew GR` if QA issues FAIL)

## Input Files

This workflow assumes these exist from prior phases:

| Input | Pattern | Source |
|-------|---------|--------|
| SOW (for scope validation) | `engagement/*-sow.md` | engagement-kickoff or new-engagement |
| Client data (if available) | `assessment/client-data/**/*` | Client-provided documentation |

## Reference Data

- `crew/knowledge-base/ot-ics-overview.md` — OT/ICS domain knowledge
- `crew/knowledge-base/nerc-cip-reference.md` — NERC CIP standards
- `crew/knowledge-base/iec-62443-reference.md` — IEC 62443 series
- `crew/knowledge-base/nist-csf-reference.md` — NIST CSF 2.0
- `crew/data/severity-scales.yaml` — Five-level severity scale
- `crew/data/standards-crosswalks.yaml` — Cross-framework control mappings

---

## See Also

- [Workflow Overview](overview.md) — How workflows, steps, and gates work
- [Jake Tanaka (`/consultant`)](../agents/consultant.md) — Steps 01, 03, 04
- [Priya Kapoor (`/compliance`)](../agents/compliance.md) — Steps 02, 05
- [Sofia Mendez (`/reviewer`)](../agents/reviewer.md) — Step 06
- [Report Generation](report-generation.md) — Next workflow after assessment
