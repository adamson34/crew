---
template_type: findings-matrix
version: 1.0
module: crew
---

# Findings Matrix

**Engagement:** {{engagement_name}}
**Client:** {{client_name}}
**Prepared by:** {{firm_name}}
**Assessment Date:** {{assessment_period}}
**Report Date:** {{date}}
**Document Version:** Draft 1
**Status:** Draft
**Classification:** Confidential

---

## How to Use This Document

This findings matrix provides a consolidated, sortable view of all findings from the {{engagement_type}} assessment. It is designed for use by the remediation team to track and prioritize remediation activities.

**Columns:**
- **ID:** Finding identifier (cross-references the technical report)
- **Severity:** Critical / High / Medium / Low / Informational
- **Title:** Brief finding title
- **Category:** Control domain category
- **Affected Systems:** Primary impacted systems or zones
- **Framework Ref:** Primary framework requirement(s) mapped to this finding
- **Priority:** Recommended remediation timeframe
- **Effort:** Estimated implementation effort
- **Status:** Current remediation status (Open at delivery)

---

## Summary

| Severity | Count | % of Total |
|----------|-------|-----------|
| 🔴 Critical | {{critical_count}} | {{critical_pct}}% |
| 🟠 High | {{high_count}} | {{high_pct}}% |
| 🟡 Medium | {{medium_count}} | {{medium_pct}}% |
| 🟢 Low | {{low_count}} | {{low_pct}}% |
| ℹ️ Informational | {{info_count}} | {{info_pct}}% |
| **Total** | **{{total_count}}** | 100% |

---

## Findings

| ID | Severity | Title | Category | Affected Systems | Framework Ref | Priority | Effort | Status |
|----|----------|-------|----------|-----------------|---------------|----------|--------|--------|
| F-001 | 🔴 Critical | {{f001_title}} | {{f001_category}} | {{f001_systems}} | {{f001_framework}} | Immediate (0-30 days) | {{f001_effort}} | Open |
| F-002 | 🟠 High | {{f002_title}} | {{f002_category}} | {{f002_systems}} | {{f002_framework}} | Short-term (30-90 days) | {{f002_effort}} | Open |
| F-003 | 🟠 High | {{f003_title}} | {{f003_category}} | {{f003_systems}} | {{f003_framework}} | Short-term (30-90 days) | {{f003_effort}} | Open |
| ... | ... | ... | ... | ... | ... | ... | ... | ... |

---

## Priority Groupings

### Immediate Actions (0-30 days) — Critical Findings
| ID | Title | Effort | Owner |
|----|-------|--------|-------|
| F-001 | {{f001_title}} | {{f001_effort}} | {{f001_owner}} |

### Short-term Actions (30-90 days) — High Findings
| ID | Title | Effort | Owner |
|----|-------|--------|-------|
| F-002 | {{f002_title}} | {{f002_effort}} | {{f002_owner}} |

### Medium-term Actions (90-180 days) — Medium Findings
| ID | Title | Effort | Owner |
|----|-------|--------|-------|
| ... | ... | ... | ... |

### Long-term Actions (180+ days) — Low Findings
| ID | Title | Effort | Owner |
|----|-------|--------|-------|
| ... | ... | ... | ... |

---

## Status Tracking

> This section is intended for client use to track remediation progress. Update Status column as items are addressed.

**Status values:**
- **Open** — Not yet started
- **In Progress** — Remediation underway
- **Resolved** — Remediation complete; pending verification
- **Accepted** — Risk formally accepted with documented rationale
- **Deferred** — Deferred with documented rationale and review date

---

*This findings matrix is derived from the {{engagement_type}} Technical Report. For full finding descriptions, evidence, and detailed recommendations, refer to the technical report.*
