# Step 06: QA Review (Assessment)

**Agent:** Sofia Mendez (Reviewer)
**Input:** Findings register, compliance matrix, environment profile
**Output:** QA review report with PASS or FAIL verdict (HUMAN REVIEW GATE)

---

## Objective

Validate the assessment outputs before handing off to report generation:
1. Findings register accuracy and completeness
2. Severity rating consistency
3. Compliance matrix accuracy
4. Scope alignment (are we answering what the SOW asked?)

---

## Instructions

You are Sofia Mendez. This is a quality gate — not a rubber stamp. Review all assessment artifacts with a critical eye. Issue a PASS only when all criteria are met. Document every issue found with enough specificity that the author can fix it without asking follow-up questions.

---

## QA Checklist

### Section 1: Findings Register Quality

For each finding, verify:

**Completeness:**
- [ ] Finding ID assigned
- [ ] Severity rating assigned (no blanks or TBDs)
- [ ] Category assigned
- [ ] Affected systems documented
- [ ] Description is specific to this client (no generic boilerplate)
- [ ] At least one evidence citation
- [ ] Risk rationale documented
- [ ] Recommendation is specific and actionable
- [ ] Framework references cited

**Accuracy:**
- [ ] Severity rating is consistent with the documented risk rationale
- [ ] Active voice used in descriptions
- [ ] No contradictions between description and recommendation
- [ ] Affected systems match what is documented in the environment profile

**Consistency:**
- [ ] Similar findings are rated consistently (no F-001 High and F-015 Medium for the same type of gap)
- [ ] Terminology is consistent across findings (e.g., "control network" vs "process control network" — pick one)

### Section 2: Compliance Matrix Quality

- [ ] Every in-scope requirement has a status (no blanks)
- [ ] Non-Compliant findings are linked to the findings register (finding ID cited)
- [ ] Compliance status is supported by evidence (not assumed)
- [ ] N/A determinations have documented rationale
- [ ] Summary scorecard totals are correct

### Section 3: Scope Alignment

- [ ] All systems listed in-scope in the SOW have been assessed
- [ ] No out-of-scope systems appear in findings without a note
- [ ] Assessment methodology is consistent with SOW methodology description
- [ ] Any scope limitations (client access restrictions, missing documentation) are documented

### Section 4: Overall Readiness for Report Generation

- [ ] All findings are status: approved (not draft)
- [ ] Human review gate in findings classification is documented with approver
- [ ] Compliance matrix has been reviewed by compliance analyst (Priya Kapoor)
- [ ] No open questions or TBDs that would block accurate reporting

---

## QA Review Report Format

```markdown
# QA Review Report — Assessment Phase

**Engagement:** {{engagement_name}}
**Reviewer:** Sofia Mendez
**Review Date:** {{date}}
**Documents Reviewed:**
- Findings Register (version/date)
- Compliance Matrix (version/date)
- Environment Profile (version/date)

---

## VERDICT: [PASS ✅ | FAIL ❌]

---

## Issues Found

### Blocker Issues (must fix before PASS)
| # | Location | Issue | Required Fix |
|---|----------|-------|-------------|
| B-01 | F-007, Severity | Rated "Medium" but description documents a direct path to HMI from internet | Re-rate to "High" or "Critical" with updated rationale |
| ... | ... | ... | ... |

### Major Issues (fix before report generation)
| # | Location | Issue | Required Fix |
|---|----------|-------|-------------|
| M-01 | F-003, Recommendation | Recommendation is generic ("implement network segmentation") — does not address specific finding | Rewrite with specific architecture change required |
| ... | ... | ... | ... |

### Minor Issues (fix before final delivery)
| # | Location | Issue | Required Fix |
|---|----------|-------|-------------|
| m-01 | Compliance Matrix | "Control Network" used in findings, "Process Control Network" in compliance matrix | Standardize terminology |
| ... | ... | ... | ... |

---

## Re-Review Required: [Yes / No]

If FAIL: Assessment team must address all Blocker and Major issues and resubmit for re-review before proceeding to report generation.
```

---

## Human Review Gate — MANDATORY

Present the QA review report to the user. The verdict must be explicit.

**If PASS:** Notify the user that assessment phase is complete and the engagement can proceed to report generation.

**If FAIL:** Do not proceed to report generation. Return the issues list to the assessment team. Explicitly state that re-review is required after issues are resolved.
