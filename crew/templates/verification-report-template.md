---
template_type: verification-report
version: 1.0
module: crew
---

# Remediation Verification Report

**Engagement:** {{engagement_name}}
**Client:** {{client_name}}
**Prepared by:** {{firm_name}}
**Date:** {{date}}
**Document Version:** Draft 1
**Status:** Draft
**Classification:** Confidential

---

## Purpose

This report verifies the current implementation status of remediation items from the {{engagement_name}} remediation roadmap. It confirms which findings are fully resolved, which remain partially addressed or open, and the resulting residual risk and compliance posture.

{{verification_purpose_narrative}}

---

## Summary

| Metric | Count |
|--------|-------|
| Findings in scope for this retest cycle | {{total_in_scope}} |
| Verified Closed | {{count_verified_closed}} |
| Partially Remediated | {{count_partial}} |
| Not Remediated | {{count_not_remediated}} |
| Compensating Control Applied | {{count_compensating}} |
| Cannot Verify (pending evidence) | {{count_cannot_verify}} |

**Net risk posture change:** {{risk_posture_summary}}

---

## Verification Results by Finding

| Finding ID | Original Severity | Result | Residual Severity | Evidence Reviewed | Notes |
|-----------|--------------------|--------|--------------------|--------------------|-------|
| {{f1_id}} | {{f1_orig_severity}} | {{f1_result}} | {{f1_residual_severity}} | {{f1_evidence}} | {{f1_notes}} |
| {{f2_id}} | {{f2_orig_severity}} | {{f2_result}} | {{f2_residual_severity}} | {{f2_evidence}} | {{f2_notes}} |

---

## Findings Not Fully Remediated

For each finding that is not Verified Closed, state what remains exposed in plain language — this section is the core of the report.

### {{open_finding_1_id}} — {{open_finding_1_title}}

**Residual Severity:** {{open_finding_1_severity}}
**What remains exposed:** {{open_finding_1_exposure}}
**Recommended next step:** {{open_finding_1_next_step}}

---

## Findings Requiring Additional Evidence

| Finding ID | What Was Reviewed | What Is Missing | Requested By |
|-----------|--------------------|--------------------|---------------|
| {{pending_1_id}} | {{pending_1_reviewed}} | {{pending_1_missing}} | {{pending_1_deadline}} |

---

## Compliance Matrix Impact

| Requirement | Prior Status | New Status | Rationale |
|------------|--------------|------------|-----------|
| {{req1}} | {{req1_prior}} | {{req1_new}} | {{req1_rationale}} |

---

## Out-of-Scope Findings

Findings not retested this cycle and why (deferred per roadmap phase, risk accepted, etc.):

{{out_of_scope_summary}}

---

## Recommended Next Steps

1. {{next_step_1}}
2. {{next_step_2}}
3. {{next_step_3}}

{{firm_name}} recommends a follow-up retest cycle once the items above are addressed. Please contact your engagement manager to schedule.

---

*This report reflects the verification evidence reviewed as of {{date}}. Findings marked "Cannot Verify" will be reassessed once the requested evidence is provided.*
