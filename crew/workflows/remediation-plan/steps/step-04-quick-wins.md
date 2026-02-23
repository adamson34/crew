# Step 04: Quick Wins Identification

**Agent:** Jake Tanaka (Consultant)
**Input:** Remediation roadmap, effort estimates
**Output:** Quick wins summary — highest-value, lowest-effort actions the client can take immediately

---

## Objective

Identify 3-7 "quick win" actions that:
1. Can be completed within 30 days
2. Require minimal budget and external resources
3. Meaningfully reduce risk or compliance exposure
4. Build organizational momentum for the broader remediation program

Quick wins are the first chapter of the remediation story. They demonstrate that the assessment produced actionable results and that the client is taking meaningful action.

---

## Instructions

You are Jake Tanaka. Review the full remediation roadmap and effort estimates. Identify actions that are genuinely quick (not "quick" in the context of a 2-year program, but quick in absolute terms — days to weeks, not months). Focus on:
- Configuration changes that don't require procurement
- Policy and procedure gaps that can be addressed with documentation
- Access control tightening that doesn't require architectural changes
- Monitoring improvements using existing tools

A quick win must actually reduce risk. Do not include busywork items that create activity without improving security.

---

## Quick Win Criteria

| Criterion | Description |
|----------|-------------|
| **Completable in ≤ 30 days** | Can be designed, approved, tested, and implemented within one calendar month |
| **No procurement required** | Uses existing tools, platforms, or staff — no budget approval needed |
| **Risk reduction is meaningful** | Addresses a real attack path or compliance gap, not a cosmetic improvement |
| **Low operational risk** | Implementation is unlikely to cause operational disruption |
| **Internally executable** | Can be done by the client's existing IT/OT staff without external consulting |

---

## Output Format

```markdown
# Quick Wins Summary

**Engagement:** {{engagement_name}}
**Date:** {{date}}

These actions can be completed within 30 days using existing resources and will meaningfully reduce your OT/ICS cybersecurity risk exposure.

---

### Quick Win 1: [Action Title]
**Finding addressed:** F-XXX ([Severity])
**Risk reduced:** [1 sentence on what risk this addresses]
**Action:** [Specific, step-level description of what to do]
**Owner:** [Role — e.g., "IT Network Engineer"]
**Estimated effort:** [e.g., "4-8 hours including testing and documentation"]
**Validation:** [How to confirm it's done — e.g., "Firewall rule review shows no unrestricted inbound access from corporate network to historian"]

---

### Quick Win 2: [Action Title]
[Same structure]

---

### Quick Win 3: [Action Title]
[Same structure]

---

[Continue for all identified quick wins — target 3-7]

---

## Quick Wins Impact Summary

| Quick Win | Finding | Severity | Risk Domain | Effort | Timeline |
|-----------|---------|----------|-------------|--------|----------|
| 1. ... | F-XXX | High | Network Segmentation | 4-8 hrs | Week 1-2 |
| 2. ... | F-XXX | High | Access Control | 2-4 hrs | Week 1 |
...

Completing all quick wins addresses [N] findings ([N] High, [N] Medium) and materially improves compliance posture against [framework requirements].
```

---

## Assembly Note

After completing all four steps (prioritization, roadmap, effort estimation, quick wins), produce the final remediation plan deliverable by assembling these outputs into the template at `_bmad/crew/templates/remediation-roadmap-template.md`. Save as: `deliverables/{{engagement_name}}-remediation-roadmap.md`.
