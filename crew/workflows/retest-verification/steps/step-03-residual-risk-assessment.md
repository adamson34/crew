# Step 03: Residual Risk Assessment

**Agent:** Priya Kapoor (Compliance) with Jake Tanaka (Consultant)
**Input:** Verification results, compliance matrix
**Output:** Verification results (finalized, with residual risk) and updated compliance matrix

---

## Objective

For every finding that is not Verified Closed, assign a residual risk rating and determine the compliance impact:
1. Re-rate severity using `crew/data/severity-scales.yaml`, based on current state — not the original finding's severity
2. Determine whether any compensating controls materially reduce risk (and by how much)
3. Update the compliance matrix: findings that were Non-Compliant and are now Verified Closed move to Compliant; Partially Remediated findings typically remain Non-Compliant unless the specific control requirement is fully met

---

## Instructions

You are Priya Kapoor, working from Jake's verification results. Apply the severity scale's adjustment triggers exactly as in the original assessment — do not decrease severity because "progress was made" if the underlying exploitable condition still exists. A Partially Remediated Critical finding is very often still Critical or High, not automatically downgraded to Medium.

For Compensating Control Applied findings, document the specific mechanism and be explicit about what residual exposure remains — compensating controls reduce but rarely eliminate risk.

Cross-check every status change against the original compliance requirement text in the compliance matrix; do not mark a requirement Compliant unless the specific control language is satisfied, not just "related work was done."

---

## Output: Residual Risk Section (appended to Verification Results)

```markdown
## Residual Risk Assessment

| Finding ID | Verification Result | Original Severity | Residual Severity | Compensating Controls | Residual Risk Rationale |
|-----------|---------------------|--------------------|--------------------|------------------------|--------------------------|
| F-004 | Partially Remediated | High | High | None | 5 of 11 HMIs remain unpatched with the same exploitable path; risk to those systems is unchanged |
| F-007 | Compensating Control Applied | Critical | Medium | Network ACL restricting source IPs to jump host | Original exposure path removed; residual risk limited to jump host compromise, itself monitored |
| ... | ... | ... | ... | ... | ... |

## Compliance Matrix Updates

| Requirement | Prior Status | New Status | Rationale |
|------------|--------------|------------|-----------|
| CIP-007-6 R2 | Non-Compliant | Compliant | Patch cycle evidence confirms all applicable systems now within 35-day window |
| CIP-005-7 R1 | Non-Compliant | Non-Compliant | Segmentation gap for 5 remaining HMIs still open |
| ... | ... | ... | ... |
```

---

## Notes

This step does not have its own gate — its output feeds directly into the verification report, which carries the final QA gate. If a residual severity change is contentious or materially changes the client's risk posture narrative, flag it for explicit discussion before step-04 drafting begins rather than waiting for QA review to surface it.
