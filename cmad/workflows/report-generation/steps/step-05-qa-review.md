# Step 05: QA Review (Final Deliverable)

**Agent:** Sofia Mendez (Reviewer)
**Input:** Assembled final report, findings matrix, compliance matrix
**Output:** QA review report with PASS or FAIL verdict (HUMAN REVIEW GATE — blocks client delivery)

---

## Objective

This is the final quality gate before the report is delivered to the client. The QA review validates:
1. Accuracy — every finding is correctly stated and rated
2. Consistency — report is internally consistent throughout
3. Completeness — scope is fully addressed, no sections missing
4. Professionalism — presentation is polished and appropriate for client delivery
5. Scope alignment — report answers what the SOW asked for

A report with any blocker-level issue does not get delivered. Period.

---

## QA Checklist

### Section A: Findings Accuracy

Cross-reference the report against the approved findings register:
- [ ] Count of findings by severity matches between executive summary, findings section, and findings matrix
- [ ] Every finding ID in the findings matrix appears in the findings section
- [ ] Every finding severity in the report matches the approved findings register exactly
- [ ] No findings appear that were not in the approved findings register
- [ ] Finding titles are consistent across executive summary, findings section, and findings matrix
- [ ] Recommendations are specific and actionable (no generic "implement best practices" language)

### Section B: Internal Consistency

- [ ] Terminology is consistent throughout (no "control network" vs "process network" inconsistency)
- [ ] The same system names are used consistently throughout (e.g., "Historian Server" not sometimes "PI Server" and sometimes "historian")
- [ ] All cross-references within the document are accurate (no broken "see Section X")
- [ ] Dates are consistent (assessment period, report date, milestone references)
- [ ] Client name is consistent

### Section C: Scope Alignment

- [ ] All in-scope systems and sites from the SOW appear in the environment overview
- [ ] No out-of-scope systems appear in findings without documentation of why they were included
- [ ] Compliance matrix covers all frameworks specified in the SOW
- [ ] Methodology section accurately describes how the assessment was conducted
- [ ] Scope limitations are documented where applicable

### Section D: Completeness

- [ ] All report sections are present (cover, TOC, exec summary, methodology, environment, findings, compliance, appendices)
- [ ] No placeholder text ([TBD], {{variable}}, [INSERT]) remains
- [ ] All appendices referenced in the body are included
- [ ] Table of contents is accurate

### Section E: Professionalism and Presentation

- [ ] No internal notes, draft comments, or revision history visible in final version
- [ ] No content from prior engagements that references a different client
- [ ] Report reads as a professional consulting deliverable (not a raw AI output)
- [ ] Classification marking is present and correct
- [ ] Cover page has correct client name, engagement name, firm name, and date

---

## QA Review Report Format

```markdown
# QA Review Report — Final Deliverable

**Engagement:** {{engagement_name}}
**Reviewer:** Sofia Mendez
**Review Date:** {{date}}
**Document Reviewed:** {{engagement_name}}-assessment-report.md (version/date)

---

## VERDICT: [PASS ✅ | FAIL ❌]

---

## Issues Found

### Blocker Issues (report CANNOT be delivered until resolved)
| # | Location | Issue | Required Fix |
|---|----------|-------|-------------|
| B-01 | Executive Summary, para 2 | States "6 Critical findings" but findings section and matrix show 5 Critical | Correct count to match findings register |
| ... | ... | ... | ... |

### Major Issues (resolve before delivery; re-review required)
| # | Location | Issue | Required Fix |
|---|----------|-------|-------------|
| M-01 | F-008 Recommendation | Says "implement firewall rules" — needs specific protocol, source/destination, and port restrictions | Rewrite recommendation with specifics |
| ... | ... | ... | ... |

### Minor Issues (resolve before delivery; no re-review required)
| # | Location | Issue | Required Fix |
|---|----------|-------|-------------|
| m-01 | Page 4 | "control network" used; "process control network" used on Page 7 | Standardize to "control network" throughout |
| ... | ... | ... | ... |

---

## Approval (if PASS)

This report is approved for client delivery.

Approved by: Sofia Mendez
Date: {{date}}
Conditions: [None / List any conditions]
```

---

## Human Review Gate — MANDATORY — BLOCKS CLIENT DELIVERY

**This is the final gate. Nothing ships without PASS.**

Present the QA review report to the user. If PASS, update the report status to "Final" and confirm it is ready for client delivery.

If FAIL, return to Eli Carter with the issues list. Re-review is required after all Blocker and Major issues are resolved. Do not deliver to the client until a PASS verdict is issued.
