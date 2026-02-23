---
template_type: statement-of-work
version: 1.0
module: crew
---

# Statement of Work
## {{engagement_type}} Engagement

---

**Prepared by:** {{firm_name}}
**Prepared for:** {{client_name}}
**Date:** {{date}}
**SOW Version:** 1.0
**Engagement ID:** {{engagement_name}}

---

## 1. Engagement Overview

{{engagement_overview}}

> Guidance: 2-3 paragraphs. Describe the client organization, the purpose of the engagement, key drivers (regulatory requirement, internal initiative, prior incident, etc.), and the high-level value this engagement delivers. Establish context before the scope details.

---

## 2. Scope of Work

### 2.1 In Scope

{{in_scope_items}}

> Guidance: Use a bulleted list. Be specific — name control system platforms, sites, zones, and applicable framework versions. Vague scope language ("all OT systems") creates disputes. Specific scope language ("SCADA servers, historians, and engineering workstations within the Process Control Network at the [Site Name] facility") does not.

### 2.2 Out of Scope

{{out_of_scope_items}}

> Guidance: Explicitly list what is NOT included. Think about what the client might reasonably assume is included. Common exclusions: penetration testing, IT network assessment, physical security testing, cloud environment, third-party managed systems.

---

## 3. Methodology

{{methodology_description}}

> Guidance: Describe the assessment approach at a high level — document review, staff interviews, architecture analysis, passive network discovery (if applicable). Reference the applicable framework(s) and note any constraints (passive-only assessment of live OT systems). 1-2 paragraphs.

---

## 4. Deliverables

| # | Deliverable | Description | Format | Delivery Date |
|---|-------------|-------------|--------|---------------|
| 1 | {{deliverable_1_name}} | {{deliverable_1_description}} | {{deliverable_1_format}} | {{deliverable_1_date}} |
| 2 | {{deliverable_2_name}} | {{deliverable_2_description}} | {{deliverable_2_format}} | {{deliverable_2_date}} |
| 3 | {{deliverable_3_name}} | {{deliverable_3_description}} | {{deliverable_3_format}} | {{deliverable_3_date}} |

> Add rows as needed. Standard deliverables for an OT/ICS assessment:
> - Assessment Report (Executive Summary + Technical Findings)
> - Findings Matrix (sortable table of all findings)
> - Compliance Matrix (framework mapping)
> - Remediation Roadmap (optional, may be separate SOW)

---

## 5. Team Structure

| Role | Name / Resource | Responsibilities | Estimated Hours |
|------|----------------|-----------------|----------------|
| Engagement Manager | {{pm_name}} | Client communications, schedule, deliverable coordination | {{pm_hours}} |
| Lead Consultant | {{assessor_name}} | Technical discovery, gap analysis, findings classification | {{assessor_hours}} |
| Compliance Analyst | {{compliance_name}} | Framework mapping, compliance matrix | {{compliance_hours}} |
| Technical Writer | {{writer_name}} | Report drafting, deliverable production | {{writer_hours}} |
| QA Reviewer | {{reviewer_name}} | Pre-delivery QA gate | {{reviewer_hours}} |

---

## 6. Timeline and Milestones

| Milestone | Description | Target Date |
|-----------|-------------|-------------|
| Engagement Kickoff | Kickoff meeting with client; data request submitted | {{kickoff_date}} |
| Data Request Deadline | Client documentation submission deadline | {{data_deadline}} |
| Assessment Activities | On-site visits (if applicable), interviews, technical analysis | {{assessment_dates}} |
| Draft Report Delivery | Draft report delivered to client for review | {{draft_delivery_date}} |
| Client Review Period | Client review window | {{review_period}} |
| Final Report Delivery | Final report delivered | {{final_delivery_date}} |

---

## 7. Client Responsibilities

The client agrees to provide the following to enable this engagement:

{{client_responsibilities}}

> Standard items: named POC for daily coordination, documentation per data request list, interview access to named roles (IT/OT staff, operations leadership, security team), on-site escort if applicable, secure file sharing platform, timely review and response to draft deliverables.

---

## 8. Assumptions

This SOW is based on the following assumptions. Material changes to these assumptions may require a scope change and associated adjustment to timeline and pricing.

{{assumptions}}

> Examples:
> 1. Client documentation will be provided within 5 business days of engagement kickoff.
> 2. On-site assessment access will be available during normal business hours for a total of [N] days.
> 3. Staff interviews will be scheduled and conducted within the assessment period.
> 4. Assessment is documentation-based and interview-based; no active scanning of live OT systems is included unless explicitly stated in scope.

---

## 9. Exclusions

The following are explicitly excluded from this engagement:

{{exclusions}}

> Examples:
> 1. Active penetration testing or adversarial simulation
> 2. Assessment of IT network infrastructure (covered separately or out of scope)
> 3. Physical security assessment beyond documented review
> 4. Remediation implementation or project management support (separate engagement)

---

## 10. Pricing

| Item | Description | Hours / Units | Rate | Total |
|------|-------------|--------------|------|-------|
| {{line_1_description}} | | {{line_1_hours}} | {{line_1_rate}} | {{line_1_total}} |
| {{line_2_description}} | | {{line_2_hours}} | {{line_2_rate}} | {{line_2_total}} |
| **Total** | | | | **{{total_price}}** |

**Pricing model:** {{pricing_model}}
**Payment terms:** {{payment_terms}}

---

## 11. Terms and Conditions

This Statement of Work is subject to the Master Services Agreement between {{firm_name}} and {{client_name}} dated {{msa_date}}, which is incorporated herein by reference.

---

## Signatures

By signing below, both parties agree to the scope, deliverables, timeline, and terms described in this Statement of Work.

| | {{firm_name}} | {{client_name}} |
|--|--------------|----------------|
| **Name** | | |
| **Title** | | |
| **Date** | | |
| **Signature** | | |
