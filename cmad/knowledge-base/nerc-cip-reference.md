# NERC CIP Reference Guide
# CMAD Knowledge Base — OT/ICS Cybersecurity Starter Pack

---

## What Is NERC CIP

The **North American Electric Reliability Corporation (NERC) Critical Infrastructure Protection (CIP)** standards are mandatory reliability standards for owners, operators, and users of the North American bulk electric system (BES). They are enforceable by NERC and regional entities, with violations subject to penalties up to $1 million per violation per day.

**Who must comply:** NERC-registered entities that own or operate BES Cyber Systems. This includes:
- Transmission operators and owners
- Generator operators and owners
- Load-serving entities above applicable thresholds
- Distribution providers affecting BES reliability
- Balancing authorities and reliability coordinators

**Who does not:** Generation facilities below applicable thresholds, distribution-only utilities not meeting BES criteria, non-registered entities (confirm with legal counsel — this is a compliance determination, not an assessment judgment).

---

## CIP Standards Summary

| Standard | Title | Key Focus |
|---------|-------|-----------|
| CIP-002 | BES Cyber System Categorization | Asset identification and impact classification (High/Medium/Low) |
| CIP-003 | Security Management Controls | Policies, governance, low-impact BES Cyber Systems |
| CIP-004 | Personnel and Training | Background checks, cybersecurity training, access management |
| CIP-005 | Electronic Security Perimeters | Network boundary definition, remote access controls |
| CIP-006 | Physical Security | Physical access to BES Cyber Systems and control centers |
| CIP-007 | Systems Security Management | Ports/services, patches, malicious code, access controls, logging |
| CIP-008 | Incident Reporting and Response | Incident detection, response, and reporting to NERC |
| CIP-009 | Recovery Plans | BCP/DR for BES Cyber Systems |
| CIP-010 | Configuration Change Management | Baselines, change management, vulnerability assessments |
| CIP-011 | Information Protection | BES Cyber System Information (BCSI) storage and handling |
| CIP-013 | Supply Chain Risk Management | Vendor risk management for hardware/software/services |
| CIP-014 | Physical Security (Transmission) | Transmission substation physical security risk assessments |

---

## BES Cyber System Categorization (CIP-002)

**High Impact BES Cyber Systems:** Those associated with control centers that have EMS/SCADA control over 1,500 MW or more of generation, or transmission equipment at 500 kV or higher.

**Medium Impact BES Cyber Systems:** Those associated with:
- Generation facilities 300 MW or greater in aggregate
- Transmission substations at 200 kV or higher that are "high impact" under specific criteria
- Special protection schemes
- Cranking paths
- Black start resources

**Low Impact BES Cyber Systems:** All other BES Cyber Systems that don't meet High or Medium criteria.

**Electronic Access Control or Monitoring Systems (EACMS):** Systems that control or monitor ESP access — treated with same requirements as associated BES Cyber System.

**Physical Access Control Systems (PACS):** Systems that control physical access to a Physical Security Perimeter.

**Protected Cyber Assets (PCAs):** Cyber assets within an ESP that are not BES Cyber Systems but could affect BES Cyber System operations.

---

## Common CIP Assessment Findings

### CIP-005 (Electronic Security Perimeters)

**CIP-005-7 R1 — ESP Definition:**
Common gap: Poorly defined or undocumented ESP boundaries. Many entities struggle with "unidirectional outbound-only connections" documentation.

**CIP-005-7 R2 — Remote Access:**
Common gaps:
- Lack of two-factor authentication for interactive remote access
- Vendor access not routed through an Intermediate System
- Remote access sessions not monitored or logged
- Undocumented vendor remote access paths (direct cellular modems, etc.)

### CIP-007 (Systems Security Management)

**CIP-007-6 R1 — Ports and Services:**
Common gap: No documented baseline of enabled ports/services; inability to demonstrate that only necessary ports are enabled.

**CIP-007-6 R2 — Patch Management:**
Common gaps:
- 35-day patch identification/application cycle not met
- TFE (Technical Feasibility Exception) process not properly documented for patches that can't be applied
- Patch applicability assessment not documented

**CIP-007-6 R4 — Malicious Code Prevention:**
Common gap: No malicious code prevention on applicable systems; outdated definitions; no process for systems that can't run AV software.

**CIP-007-6 R5 — System Access Controls:**
Common gaps:
- Default vendor accounts not removed or disabled
- Shared accounts in use
- Password complexity requirements not enforced
- No account review process

**CIP-007-6 R6 — Security Status Monitoring:**
Common gap: Logging not enabled on all applicable systems; log retention period (90 days online, 3 years total) not met.

### CIP-008 (Incident Reporting)

**CIP-008-6 R1 — Incident Response Plan:**
Common gaps:
- Plan not updated to reflect current BES Cyber Systems
- Plan doesn't address all required elements (identify, classify, report)
- Plan not exercised within required 15-month period
- Reporting timelines to NERC CEII portal not documented

### CIP-010 (Configuration Change Management)

**CIP-010-4 R1 — Configuration Baseline:**
Common gaps:
- No documented baseline for all applicable systems
- Baseline not updated after authorized changes
- No process to detect unauthorized changes

**CIP-010-4 R3 — Vulnerability Assessments:**
Common gap: 15-month vulnerability assessment cycle not completed; assessments not documented.

### CIP-013 (Supply Chain Risk Management)

Common gaps (this standard is frequently non-compliant, especially at smaller entities):
- No documented supply chain risk management plan
- Vendor risk assessment not conducted for new hardware/software purchases
- No process for verifying software/firmware integrity
- Transition plan from vendor end-of-life notification not documented

---

## CIP Compliance Posture Assessment Approach

When assessing NERC CIP compliance:

1. **Confirm applicability first:** Verify that the entity is NERC-registered and that the specific systems being assessed qualify as BES Cyber Systems under CIP-002.

2. **Review self-certifications and prior audits:** Request copies of recent compliance self-certifications and any audit findings or mitigation plans. These reveal the entity's own assessment of compliance gaps.

3. **Document TFEs (Technical Feasibility Exceptions):** Entities may have documented TFEs for requirements they cannot technically meet. These should be reviewed to confirm they are current and properly filed.

4. **Check NERC compliance monitoring portal data:** Violations are public record at nerc.com/pa/comp/Pages/Notices-of-Penalty.aspx.

5. **Distinguish assessment from compliance:** An assessment finding is a security observation. A compliance finding is a potential violation. Not all security gaps are CIP violations, and some CIP compliance gaps may not be significant security risks. Report both dimensions.

---

## NERC CIP Resources

- NERC CIP Standards: https://www.nerc.com/pa/Stand/Pages/CIPStandards.aspx
- NERC Reliability Standards (searchable): https://www.nerc.com/pa/Stand/Pages/ReliabilityStandards.aspx
- NERC Lessons Learned: https://www.nerc.com/pa/comp/CAOneStopShop/Pages/LessonsLearned.aspx
- E-ISAC: https://www.nerc.com/pa/CI/Pages/E-ISAC.aspx
