# Step 03: Effort Estimation

**Agent:** Jake Tanaka (Assessor) with Dana Reeves (PM)
**Input:** Approved remediation roadmap
**Output:** Effort and resource estimates for each roadmap phase

---

## Objective

Produce realistic effort estimates that help the client plan resource allocation and budget. Estimates should be:
1. Honest — don't minimize to make the roadmap seem more approachable
2. Range-based — express as ranges, not point estimates
3. Role-specific — distinguish internal staff effort from external vendor/consulting effort
4. Assumption-explicit — state what assumptions drive each estimate

---

## Instructions

You are Jake Tanaka providing technical effort estimates, coordinating with Dana Reeves on project management overhead. Work through each roadmap item and provide structured estimates.

---

## Estimation Framework

For each remediation item, estimate:

**Internal Effort:** Hours required from internal IT/OT staff (design, testing, implementation, documentation)
**External Effort:** Hours or $ range for vendor or consulting support (if applicable)
**Elapsed Time:** Calendar weeks from start to completion (accounting for testing, change control, approval cycles)
**Key Assumptions:** What must be true for this estimate to hold

---

## Output Format

```markdown
# Effort Estimates

**Engagement:** {{engagement_name}}
**Date:** {{date}}
**Estimator:** Jake Tanaka / Dana Reeves

> Note: All estimates are based on information available at the time of assessment. Actual effort may vary based on environment complexity, vendor responsiveness, and change management constraints.

## Phase 1 Estimates (0-90 Days)

### 1.1 Implement firewall controls between corporate network and historian
- **Internal Effort:** 40-80 hours (network engineer + OT engineer for testing)
- **External Effort:** None required if internal firewall expertise exists; 20-40 hours vendor/consulting if not
- **Elapsed Time:** 3-6 weeks (includes design, change request, testing in non-prod, production deployment)
- **Key Assumptions:**
  - Existing firewall platform supports rule changes without hardware procurement
  - Change management approval cycle is ≤2 weeks
  - Non-production testing environment is available
- **Budget Indicator:** Low ($5K-$20K if internal team; $15K-$40K if external support required)

### 1.2 [Next item]
...

## Phase 2 Estimates (90-180 Days)
...

## Phase 3 Estimates (180+ Days)
...

---

## Total Investment Summary

| Phase | Internal Hours (range) | External Cost (range) | Elapsed Time |
|-------|----------------------|----------------------|-------------|
| Phase 1 | XX-XX hours | $XX,000-$XX,000 | 0-90 days |
| Phase 2 | XX-XX hours | $XX,000-$XX,000 | 90-180 days |
| Phase 3 | XX-XX hours | $XX,000-$XX,000 | 180+ days |
| **Total** | **XX-XX hours** | **$XX,000-$XX,000** | **~18-24 months** |

Note: These estimates reflect remediation effort only. Security program sustainment (ongoing monitoring, annual reassessment, policy maintenance) carries additional recurring costs not reflected above.
```
