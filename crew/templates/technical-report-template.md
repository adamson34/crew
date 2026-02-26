---
template_type: technical-report
version: 1.0
module: crew
---

# {{engagement_type}} — Technical Report

**Prepared for:** {{client_name}}
**Prepared by:** {{firm_name}}
**Assessment Period:** {{assessment_period}}
**Report Date:** {{date}}
**Report Version:** {{report_version}}
**Status:** Draft
**Classification:** Confidential

---

## Table of Contents

1. [Assessment Methodology](#assessment-methodology)
2. [Environment Overview](#environment-overview)
3. [Findings](#findings)
4. [Positive Observations](#positive-observations)
5. [Appendices](#appendices)

---

## 1. Assessment Methodology

### 1.1 Engagement Type and Scope

{{methodology_scope}}

> Document the engagement type, what was in scope, what was out of scope, and the assessment period.

### 1.2 Frameworks Applied

{{frameworks_applied}}

> List each framework with version and applicable requirement families.

### 1.3 Assessment Methods

The assessment was conducted using the following methods:

{{assessment_methods}}

> Examples:
> - **Documentation Review:** Review of provided policies, procedures, architecture diagrams, and prior assessment reports
> - **Staff Interviews:** Structured interviews with [N] staff across OT operations, IT/OT security, and operations management roles
> - **Architecture Analysis:** Analysis of network topology diagrams, firewall configurations, and system architecture documentation
> - **Passive Network Discovery:** [Include only if performed]

### 1.4 Limitations

{{limitations}}

> Note material limitations: access restrictions, documentation gaps, systems not covered. Example: "Production PLC configurations were not directly accessible; findings related to PLC security are based on vendor documentation, interview accounts, and available network documentation. Active network scanning of the OT environment was not performed consistent with the passive assessment constraint."

---

## 2. Environment Overview

### 2.1 Organizational Context

{{org_context}}

> Client organization, industry/sector, primary operational function, regulatory environment.

### 2.2 OT/ICS Architecture

{{architecture_overview}}

> Describe the overall architecture: Purdue model alignment (or lack thereof), zones, key systems, IT/OT connectivity. Include a simplified diagram reference if available.

### 2.3 Asset Summary

{{asset_summary}}

> Summary table of key asset categories with counts and notes. Reference full inventory in Appendix A if applicable.

### 2.4 Existing Security Controls

{{existing_controls_summary}}

> Brief description of what security controls are currently in place. This establishes context for findings — readers should know what the client has before learning what they're missing.

---

## 3. Findings

### Summary

{{findings_summary_paragraph}}

> 1 paragraph summarizing the overall findings pattern. Example: "The assessment identified [N] findings across [N] control domains. The most pervasive issues relate to [theme 1] and [theme 2]. [N] findings are rated Critical or High and require prioritized remediation."

| ID | Severity | Title | Category |
|----|----------|-------|----------|
| F-001 | Critical | {{f001_title}} | {{f001_category}} |
| ... | ... | ... | ... |

---

### F-001: {{f001_title}}

**Severity:** Critical
**Category:** {{f001_category}}
**Affected Systems:** {{f001_systems}}

#### Description

{{f001_description}}

#### Evidence

- {{f001_evidence_1}}
- {{f001_evidence_2}}

#### Risk Rationale

{{f001_risk_rationale}}

#### Recommendation

{{f001_recommendation}}

**Implementation complexity:** {{f001_complexity}}

#### References

- {{f001_framework_ref}}

---

> Repeat finding block for each finding. Order by severity: Critical → High → Medium → Low → Informational.

---

## 4. Positive Observations

{{positive_observations}}

> Note 3-5 genuine security strengths. These should be specific and real — not filler. Examples: mature change management process, active investment in OT security monitoring, experienced OT security staff. Keep this section brief.

---

## 5. Appendices

### Appendix A: Asset Inventory Summary

{{asset_inventory_appendix}}

> Summary table of assessed assets by type. Full detail if volume is manageable; aggregated counts if large.

### Appendix B: Methodology References

{{methodology_references}}

> Brief descriptions of assessment methods and standards referenced. Include framework version citations.

### Appendix C: Assessment Team

{{team_bios}}

> Brief professional biography for each team member (2-3 sentences each).

### Appendix D: Glossary

| Term | Definition |
|------|-----------|
| BES | Bulk Electric System |
| DCS | Distributed Control System |
| DMZ | Demilitarized Zone |
| EWS | Engineering Workstation |
| HMI | Human-Machine Interface |
| ICS | Industrial Control System |
| OT | Operational Technology |
| PLC | Programmable Logic Controller |
| RTU | Remote Terminal Unit |
| SCADA | Supervisory Control and Data Acquisition |

---

*End of Technical Report*
