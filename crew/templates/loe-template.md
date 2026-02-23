---
template_type: level-of-effort
version: 1.0
module: crew
---

# Level of Effort Estimate
## {{engagement_name}}

---

**Prepared by:** {{firm_name}}
**Date:** {{date}}
**Engagement:** {{engagement_name}}
**Client:** {{client_name}}
**LOE Version:** 1.0
**Classification:** Internal — Not for Client Distribution

---

## At a Glance

| Work Package | Total Hours |
|--------------|-------------|
| {{wp1_name}} | {{wp1_total}} |
| {{wp2_name}} | {{wp2_total}} |
| {{wp3_name}} | {{wp3_total}} |
| **Total** | **{{total_hours}}** |

---

## 1. Scope Summary

> Guidance: 2-3 sentences. What is being assessed or delivered? This should align precisely with the SOW scope — not a summary of the client's problem, but a summary of what we are producing.

{{scope_summary}}

---

## 2. Work Packages

Break the engagement into discrete work packages. Each work package maps to one or more SOW deliverables. For each package, state the basis for the estimate — what assumption drives the hours.

### Work Package 1: {{wp1_name}}

**Deliverable(s):** {{wp1_deliverables}}
**Basis for estimate:** {{wp1_basis}}

> Example basis: "Assumes review of 8-12 client documentation packages (network diagrams, policies, procedures, asset inventories). Based on 3-4 hours per documentation package."

| Role | Activities | Hours |
|------|-----------|-------|
| {{role_1}} | {{activities_1}} | {{hours_1}} |
| {{role_2}} | {{activities_2}} | {{hours_2}} |
| **Work Package 1 Total** | | **{{wp1_total}}** |

---

### Work Package 2: {{wp2_name}}

**Deliverable(s):** {{wp2_deliverables}}
**Basis for estimate:** {{wp2_basis}}

| Role | Activities | Hours |
|------|-----------|-------|
| {{role_1}} | {{activities_1}} | {{hours_1}} |
| {{role_2}} | {{activities_2}} | {{hours_2}} |
| **Work Package 2 Total** | | **{{wp2_total}}** |

---

### Work Package 3: {{wp3_name}}

**Deliverable(s):** {{wp3_deliverables}}
**Basis for estimate:** {{wp3_basis}}

| Role | Activities | Hours |
|------|-----------|-------|
| {{role_1}} | {{activities_1}} | {{hours_1}} |
| {{role_2}} | {{activities_2}} | {{hours_2}} |
| **Work Package 3 Total** | | **{{wp3_total}}** |

> Add work packages as needed. Standard packages for an OT/ICS assessment:
> - WP1: Engagement setup and kickoff (PM)
> - WP2: Documentation review and environment profiling (Consultant)
> - WP3: Gap analysis and findings classification (Consultant + Compliance)
> - WP4: Compliance mapping (Compliance)
> - WP5: Report writing (Writer)
> - WP6: QA review (Reviewer)
> - WP7: Project management and client communications (PM)

---

## 3. Total Hours by Role

| Role | Total Hours | Rate ($/hr) | Total Cost |
|------|------------|------------|-----------|
| Engagement Manager (PM) | {{pm_hours}} | {{pm_rate}} | {{pm_cost}} |
| Lead Consultant | {{assessor_hours}} | {{assessor_rate}} | {{assessor_cost}} |
| Compliance Analyst | {{compliance_hours}} | {{compliance_rate}} | {{compliance_cost}} |
| Technical Writer | {{writer_hours}} | {{writer_rate}} | {{writer_cost}} |
| QA Reviewer | {{reviewer_hours}} | {{reviewer_rate}} | {{reviewer_cost}} |
| **Total** | **{{total_hours}}** | | **{{total_cost}}** |

---

## 4. High-Uncertainty Work Packages

> Guidance: Flag work packages where the estimate has wide variance. For each, state the low-end and high-end scenario and what drives the variance.

| Work Package | Low Estimate | High Estimate | Variance Driver |
|--------------|-------------|---------------|----------------|
| {{wp_name}} | {{low_hrs}} hrs | {{high_hrs}} hrs | {{variance_driver}} |

> Example: "Gap Analysis — Low: 24 hrs (limited framework scope, mature documentation); High: 48 hrs (full IEC 62443 + NERC CIP, sparse documentation requiring extensive interview follow-up)"

---

## 5. Out-of-Scope Effort

The following activities are NOT included in this LOE. If required, they would be priced separately:

- {{oos_item_1}}
- {{oos_item_2}}

> Examples: penetration testing, remediation implementation support, on-site travel beyond [N] days, additional interviews beyond [N] scheduled, compliance certification support

---

## 6. Estimate Assumptions

The following assumptions underlie this LOE. If any assumption is materially wrong, the estimated hours may change:

1. {{loe_assumption_1}}
2. {{loe_assumption_2}}
3. {{loe_assumption_3}}

> Examples:
> 1. Client will provide all requested documentation within 5 business days of kickoff.
> 2. No more than 8 stakeholder interviews will be required.
> 3. Assessment is documentation-based and interview-based only; no active system scanning is included.
> 4. Consultant has intermediate-to-senior familiarity with the applicable frameworks; no significant ramp-up time required.
