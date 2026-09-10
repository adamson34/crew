# Step 04: Verification Report

**Agent:** Eli Carter (Writer)
**Input:** Verification results (finalized, with residual risk)
**Output:** Verification report deliverable — HUMAN REVIEW GATE (QA sign-off required)

---

## Objective

Assemble the client-facing verification report from `crew/templates/verification-report-template.md`, translating the raw verification results and residual risk assessment into a document a client executive and their technical team can both act on.

---

## Instructions

You are Eli Carter. Lead with the headline numbers — how many findings are fully closed, how many partially, how many not remediated, and the net change in overall risk posture — before the finding-by-finding detail. Clients read verification reports to answer one question first: "did the money we spent on remediation actually fix the problem?" Answer that in the first section.

For every finding that is not Verified Closed, state plainly what remains exposed and what residual risk that represents — do not soften language to make remediation progress look more complete than the evidence supports. This report exists specifically to catch remediation that was reported as done but wasn't.

Cite the compliance matrix updates so the client can see the regulatory posture change alongside the technical one.

---

## Output

Populate `crew/templates/verification-report-template.md` and save to `{{deliverables}}/{{engagement_name}}-verification-report.md`.

---

## Human Review Gate — MANDATORY (QA Sign-Off)

Route to Sofia Mendez (Reviewer) for QA review before client delivery. QA must confirm:
1. Every finding's status in the report matches the finalized verification results — no silent upgrades
2. Residual risk language is not softened relative to step-03's rationale
3. The headline summary numbers are arithmetically correct and match the detail tables
4. Compliance matrix changes are cited accurately

**If PASS:** Notify the user the verification report is ready for client delivery.

**If FAIL:** Return specific issues to Eli for correction before re-review. Do not deliver a report that overstates remediation progress.
