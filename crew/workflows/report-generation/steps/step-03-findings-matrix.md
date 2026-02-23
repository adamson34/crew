# Step 03: Findings Matrix

**Agent:** Eli Carter (Writer)
**Input:** Approved findings register, compliance matrix
**Output:** Standalone findings matrix deliverable

---

## Objective

Produce a structured findings matrix — a summary table that gives the client's remediation team a single-page view of all findings, their severity, the framework requirements they map to, and remediation priority.

This is often the most-referenced deliverable during remediation planning. It must be accurate, consistent with the full report, and sortable/filterable (format as a table with clear column headers).

---

## Findings Matrix Columns

| Column | Description |
|--------|-------------|
| Finding ID | e.g., F-001 |
| Severity | Critical / High / Medium / Low / Informational |
| Title | Concise finding title (matches report exactly) |
| Category | Control domain category |
| Affected Systems | Impacted systems or zones |
| Framework Reference | Primary requirement ID(s) |
| Remediation Priority | Immediate (0-30 days) / Short-term (30-90 days) / Medium-term (90-180 days) / Long-term (180+ days) |
| Effort Estimate | Low / Medium / High |
| Status | Open (all should be Open at delivery) |

---

## Matrix Assembly Instructions

1. Pull all findings from the approved findings register
2. Map each to its remediation priority using this guidance:
   - Critical → Immediate (0-30 days)
   - High → Short-term (30-90 days) unless complexity warrants extension — document rationale
   - Medium → Medium-term (90-180 days)
   - Low → Long-term (180+ days)
3. Assign effort estimate (confirm with Jake Tanaka if uncertain):
   - Low: straightforward configuration change, policy update, or process change achievable by existing staff
   - Medium: requires project planning, vendor involvement, or system changes
   - High: architectural change, significant procurement, or multi-phase implementation
4. Verify every finding ID, title, and severity exactly matches the technical report

---

## Matrix Format

```markdown
# Findings Matrix

**Engagement:** {{engagement_name}}
**Client:** {{client_name}}
**Assessment Date:** {{date}}
**Report Version:** 1.0

## Summary

| Severity | Count |
|----------|-------|
| Critical | N |
| High | N |
| Medium | N |
| Low | N |
| Informational | N |
| **Total** | **N** |

## Findings

| ID | Severity | Title | Category | Affected Systems | Framework Ref | Priority | Effort | Status |
|----|----------|-------|----------|-----------------|---------------|----------|--------|--------|
| F-001 | Critical | ... | ... | ... | ... | Immediate | High | Open |
| F-002 | High | ... | ... | ... | ... | Short-term | Medium | Open |
...
```
