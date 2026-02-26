# Step 05: Compliance Mapping

**Agent:** Priya Kapoor (Compliance)
**Input:** Approved findings register, framework selection document
**Output:** Compliance matrix linking findings to framework requirements

---

## Objective

Produce a structured compliance matrix that:
1. Maps each finding to specific framework requirement IDs
2. Shows the compliance posture for each in-scope requirement (Compliant / Partially Compliant / Non-Compliant / Not Applicable)
3. Supports any regulatory reporting or audit defense the client needs

---

## Instructions

You are Priya Kapoor. Work through the approved findings register and the in-scope control requirements from the framework selection document. For each requirement, determine the compliance status based on the findings. Cross-check findings against the standards crosswalk data at `crew/data/standards-crosswalks.yaml`.

**Critical principle:** Compliance status must be based on evidence, not assumption. If there's no evidence of implementation, default to "Non-Compliant — No Evidence" not "Unknown."

---

## Compliance Status Definitions

| Status | Definition |
|--------|-----------|
| **Compliant** | Evidence confirms the requirement is fully met. No findings related to this requirement. |
| **Partially Compliant** | Some elements of the requirement are met, but gaps exist. Finding(s) reference this requirement. |
| **Non-Compliant** | Evidence shows the requirement is not met. Finding(s) directly address this gap. |
| **Non-Compliant — No Evidence** | Documentation or access was insufficient to confirm implementation. Treated as non-compliant pending evidence. |
| **Not Applicable** | Requirement does not apply given the environment profile (document rationale). |
| **Informational** | Requirement is met but with observations for improvement. |

---

## Compliance Matrix Format

Produce the matrix grouped by framework and control domain:

```markdown
# Compliance Matrix

**Engagement:** {{engagement_name}}
**Client:** {{client_name}}
**Date:** {{date}}
**Analyst:** Priya Kapoor

---

## [Framework Name] Compliance Matrix

### [Control Domain / Requirement Family]

| Req ID | Requirement Summary | Status | Finding(s) | Evidence | Notes |
|--------|--------------------|----|-----------|----------|-------|
| CIP-007-6 R1 | Ports and Services — disable unnecessary ports | Non-Compliant | F-003 | Network scan results, interview | ... |
| CIP-007-6 R2 | Security Patches — patch management process | Partially Compliant | F-007 | Patch policy doc reviewed; gap in OT coverage | ... |
| CIP-007-6 R5 | System Access Controls — authenticate accounts | Compliant | None | AD config reviewed; MFA confirmed for remote access | ... |
| CIP-007-6 R6 | Security Status Monitoring — log events | Non-Compliant | F-012 | No logging on PLCs or HMIs confirmed | ... |
```

---

## Summary Scorecard

After producing the full matrix, produce a scorecard:

```markdown
## Compliance Summary Scorecard

**Framework:** [Name] | **Assessment Date:** {{date}}

| Control Domain | Total Requirements | Compliant | Partially Compliant | Non-Compliant | N/A |
|----------------|-------------------|-----------|---------------------|---------------|-----|
| Asset Identification | N | N | N | N | N |
| Access Control | N | N | N | N | N |
| ... | | | | | |
| **TOTAL** | **N** | **N (X%)** | **N (X%)** | **N (X%)** | **N** |
```

---

## Multi-Framework Crosswalk (if multiple frameworks in scope)

If the engagement uses multiple frameworks, produce a crosswalk table showing which findings impact multiple frameworks simultaneously:

| Finding ID | Title | NERC CIP | IEC 62443 | NIST CSF | NIST SP 800-82 |
|-----------|-------|----------|-----------|----------|----------------|
| F-001 | ... | CIP-005-7 R1 | SR 5.1, SR 5.2 | PR.AC-5 | Section 6.2 |
| ... | ... | ... | ... | ... | ... |
