---
template_type: remediation-roadmap
version: 1.0
module: crew
---

# Remediation Roadmap

**Engagement:** {{engagement_name}}
**Client:** {{client_name}}
**Prepared by:** {{firm_name}}
**Date:** {{date}}
**Document Version:** Draft 1
**Status:** Draft
**Classification:** Confidential

---

## Introduction

This remediation roadmap translates the findings from the {{engagement_type}} assessment into a prioritized, phased action plan for improving {{client_name}}'s OT/ICS cybersecurity posture.

The roadmap is organized into three phases based on finding severity, implementation complexity, regulatory timeline requirements, and operational constraints. Quick wins — high-impact, low-effort actions — are identified separately for immediate attention.

{{roadmap_introduction}}

---

## Quick Wins (Complete Within 30 Days)

These actions can be completed immediately using existing resources and will meaningfully reduce risk exposure.

| # | Action | Finding(s) | Owner | Effort | Impact |
|---|--------|-----------|-------|--------|--------|
| QW-1 | {{qw1_action}} | {{qw1_findings}} | {{qw1_owner}} | {{qw1_effort}} | {{qw1_impact}} |
| QW-2 | {{qw2_action}} | {{qw2_findings}} | {{qw2_owner}} | {{qw2_effort}} | {{qw2_impact}} |
| QW-3 | {{qw3_action}} | {{qw3_findings}} | {{qw3_owner}} | {{qw3_effort}} | {{qw3_impact}} |

---

## Phase 1: Immediate Actions (0-90 Days)

**Objective:** Remediate Critical findings and urgent High findings. Address the highest-risk exposures before the next quarter.

{{phase1_narrative}}

### Network Architecture
| # | Action | Finding(s) | Owner | Effort | Timeline |
|---|--------|-----------|-------|--------|----------|
| 1.1 | {{p1_na_1_action}} | {{p1_na_1_findings}} | {{p1_na_1_owner}} | {{p1_na_1_effort}} | {{p1_na_1_timeline}} |

### Access Management
| # | Action | Finding(s) | Owner | Effort | Timeline |
|---|--------|-----------|-------|--------|----------|
| 1.2 | {{p1_am_1_action}} | {{p1_am_1_findings}} | {{p1_am_1_owner}} | {{p1_am_1_effort}} | {{p1_am_1_timeline}} |

> Add workstream sections as needed: Patch Management, Monitoring, Incident Response, Governance

**Phase 1 Summary:**
- Findings addressed: {{phase1_finding_count}} ({{phase1_severity_summary}})
- Total estimated effort: {{phase1_effort_range}}
- Estimated external cost: {{phase1_cost_range}}

---

## Phase 2: Near-Term Actions (90-180 Days)

**Objective:** Address remaining High and priority Medium findings. Establish foundational security program capabilities.

{{phase2_narrative}}

### Patch & Vulnerability Management
| # | Action | Finding(s) | Owner | Effort | Timeline |
|---|--------|-----------|-------|--------|----------|
| 2.1 | {{p2_pvm_1_action}} | {{p2_pvm_1_findings}} | {{p2_pvm_1_owner}} | {{p2_pvm_1_effort}} | {{p2_pvm_1_timeline}} |

### Monitoring & Detection
| # | Action | Finding(s) | Owner | Effort | Timeline |
|---|--------|-----------|-------|--------|----------|
| 2.2 | {{p2_md_1_action}} | {{p2_md_1_findings}} | {{p2_md_1_owner}} | {{p2_md_1_effort}} | {{p2_md_1_timeline}} |

**Phase 2 Summary:**
- Findings addressed: {{phase2_finding_count}}
- Total estimated effort: {{phase2_effort_range}}
- Estimated external cost: {{phase2_cost_range}}

---

## Phase 3: Strategic Actions (180+ Days)

**Objective:** Address Medium and Low findings requiring architectural changes, major procurement, or program-level initiatives.

{{phase3_narrative}}

### Governance & Policy
| # | Action | Finding(s) | Owner | Effort | Timeline |
|---|--------|-----------|-------|--------|----------|
| 3.1 | {{p3_gov_1_action}} | {{p3_gov_1_findings}} | {{p3_gov_1_owner}} | {{p3_gov_1_effort}} | {{p3_gov_1_timeline}} |

**Phase 3 Summary:**
- Findings addressed: {{phase3_finding_count}}
- Total estimated effort: {{phase3_effort_range}}
- Estimated external cost: {{phase3_cost_range}}

---

## Total Investment Summary

| Phase | Findings Addressed | Internal Hours (range) | External Cost (range) | Timeframe |
|-------|-------------------|----------------------|----------------------|-----------|
| Quick Wins | {{qw_count}} | {{qw_internal_hours}} | $0 | 0-30 days |
| Phase 1 | {{p1_count}} | {{p1_internal_hours}} | {{p1_external_cost}} | 0-90 days |
| Phase 2 | {{p2_count}} | {{p2_internal_hours}} | {{p2_external_cost}} | 90-180 days |
| Phase 3 | {{p3_count}} | {{p3_internal_hours}} | {{p3_external_cost}} | 180+ days |
| **Total** | **{{total_findings}}** | **{{total_internal_hours}}** | **{{total_external_cost}}** | **~18-24 months** |

---

## Regulatory Deadline Alignment

{{regulatory_deadline_section}}

> If regulatory deadlines apply (NERC CIP compliance cycle, state requirements, etc.), map roadmap items to those deadlines here.

---

## Assumptions and Dependencies

**Key Assumptions:**
{{roadmap_assumptions}}

**Dependencies:**
{{roadmap_dependencies}}

---

## Next Steps

To begin executing this roadmap, {{firm_name}} recommends:

1. {{next_step_1}}
2. {{next_step_2}}
3. {{next_step_3}}

{{firm_name}} is available to support remediation execution through targeted implementation projects. Please contact your engagement manager to discuss follow-on support.

---

*This roadmap was developed based on findings from the {{engagement_type}} assessment conducted [dates]. Priorities and estimates should be reviewed and adjusted as additional information becomes available or as the threat and regulatory environment changes.*
