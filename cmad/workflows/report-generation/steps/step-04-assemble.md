# Step 04: Assemble Report

**Agent:** Eli Carter (Writer)
**Input:** Approved executive summary, technical report draft, findings matrix, compliance matrix
**Output:** Assembled final report document

---

## Objective

Combine all report sections into a single coherent deliverable, verify internal consistency, apply final formatting, and prepare for QA review.

---

## Assembly Checklist

### 1. Document Structure

Assemble sections in this order:
- [ ] Cover page (engagement name, client, firm, date, classification marking)
- [ ] Table of contents (with accurate page references)
- [ ] Executive Summary
- [ ] Assessment Methodology
- [ ] Environment Overview
- [ ] Findings (ordered by severity: Critical → High → Medium → Low → Informational)
- [ ] Positive Observations (if applicable)
- [ ] Compliance Matrix (or reference to standalone deliverable)
- [ ] Appendices (Asset Inventory Summary, Methodology Reference, Team Bios)
- [ ] Findings Matrix (as embedded table or reference to standalone deliverable)

### 2. Consistency Verification

Before finalizing, verify:
- [ ] Every finding in the executive summary also appears in the technical findings section
- [ ] Every finding in the findings matrix exactly matches the technical findings (ID, title, severity)
- [ ] Compliance matrix status citations reference finding IDs that exist in the report
- [ ] No finding appears in the report that is not in the findings register
- [ ] Terminology is consistent throughout (run a consistency check: "control network", "OT network", "process network" — pick one and apply globally)
- [ ] All dates in the report are consistent (assessment period, report date)
- [ ] Client name is consistent (no alternating between short name and full legal name without establishing both)

### 3. Coverage Confirmation

Verify scope coverage:
- [ ] All systems and zones listed in-scope in the SOW appear in the environment overview
- [ ] All control domains in the framework selection appear in the compliance matrix (even if Compliant or N/A)
- [ ] Any scope limitations noted in the methodology section match what is documented in the assessment artifacts

### 4. Final Review Pass

Read the complete assembled document for:
- [ ] No placeholder text remaining (no {{variable}} or [TBD] or [INSERT])
- [ ] No internal notes or draft comments visible
- [ ] No broken section references ("see Section X" where X doesn't exist)
- [ ] No boilerplate from previous engagements that references a different client

---

## Output

Save assembled report as: `deliverables/{{engagement_name}}-assessment-report.md`

Add a document header:
```yaml
---
document_type: OT/ICS Cybersecurity Assessment Report
engagement: {{engagement_name}}
client: {{client_name}}
firm: {{firm_name}}
assessment_period: [dates]
report_date: {{date}}
report_version: 1.0 DRAFT
classification: Confidential
status: Pending QA Review
---
```

Proceed to QA review (Step 05) after assembly is complete.
