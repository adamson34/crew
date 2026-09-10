# Retest & Verification Workflow

Closes the loop on a remediation roadmap: retests closed findings, verifies controls were actually implemented as claimed, assesses residual risk on anything not fully remediated, and produces a verification report.

**Use when:** The client has reported progress against the remediation roadmap and you need to confirm what's actually fixed before telling them their risk posture has changed.

**Agents involved:** `/pm` (Dana Reeves) for retest scoping; `/consultant` (Jake Tanaka) for control verification; `/compliance` (Priya Kapoor) for residual risk assessment; `/writer` (Eli Carter) for the verification report; `/reviewer` (Sofia Mendez) for QA sign-off.

**Requires:** A remediation roadmap from `remediation-plan`.

## Steps

| Step | Agent | Prerequisites | Gate After | Produces |
|------|-------|----------------|------------|----------|
| step-01-retest-scoping | `/pm` | — | — | `{engagement}-retest-scope.md` |
| step-02-control-verification | `/consultant` | step-01 | gate-verification-results | `{engagement}-verification-results.md` |
| step-03-residual-risk-assessment | `/compliance` | step-02 | — | `{engagement}-verification-results.md` (updated with residual risk) |
| step-04-verification-report | `/writer` | step-03 | gate-qa-review | `{engagement}-verification-report.md` |

## Gates

| Gate | After Step | Blocks | Description |
|------|-----------|--------|-------------|
| gate-verification-results | step-02 | step-03 | Raw retest results and evidence reviewed by the engagement lead before residual risk is assessed — confirms the retest methodology and evidence are sound. |
| gate-qa-review | step-04 | — | QA reviewer must explicitly PASS the verification report before client delivery. Blocking — cannot deliver a report that overstates remediation progress. |

## Walkthrough

1. **`/crew IN`** → Select `retest-verification`
2. **`/pm`** → Determine what's in scope: which findings the client claims are remediated, what evidence to expect, and the verification method for each
3. **`/consultant`** → Review evidence and rate each in-scope finding: Verified Closed, Partially Remediated, Not Remediated, Compensating Control Applied, or Cannot Verify
4. **`/crew GA`** → Approve `gate-verification-results` (confirm the evidence actually supports each verdict)
5. **`/compliance`** → Re-rate severity for anything not Verified Closed, and update the compliance matrix
6. **`/writer`** → Draft the client-facing verification report — lead with the headline numbers, then finding-by-finding detail
7. **`/reviewer`** → QA review; `/crew GA` on `gate-qa-review` to approve for delivery

## Input Files

| Input | Pattern | Source |
|-------|---------|--------|
| Remediation roadmap | `deliverables/{engagement}-remediation-roadmap.md` | Remediation Plan workflow |
| Findings register | `assessment/{engagement}-findings-register.md` | Assessment workflow |
| Compliance matrix | `assessment/{engagement}-compliance-matrix.md` | Assessment workflow |

## Templates Used

- `crew/templates/verification-report-template.md`

---

## See Also

- [Workflow Overview](overview.md) — How workflows, steps, and gates work
- [Dana Reeves (`/pm`)](../agents/pm.md) — Step 01
- [Jake Tanaka (`/consultant`)](../agents/consultant.md) — Step 02
- [Priya Kapoor (`/compliance`)](../agents/compliance.md) — Step 03
- [Eli Carter (`/writer`)](../agents/writer.md) — Step 04
- [Remediation Plan](remediation-plan.md) — Produces the roadmap this workflow verifies
