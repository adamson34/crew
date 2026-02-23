# Step 01: Findings Prioritization

**Agent:** Jake Tanaka (Assessor) with Priya Kapoor (Compliance)
**Input:** Approved findings register, compliance matrix
**Output:** Prioritization rationale document (HUMAN REVIEW GATE — confirm client context before roadmap)

---

## Objective

Establish the remediation priority order for all findings, balancing:
1. Severity (Critical items first, generally)
2. Regulatory deadlines (NERC CIP violations may have mandatory timelines)
3. Quick wins (high impact, low effort items that build momentum)
4. Dependencies (some remediation items must precede others)
5. Client constraints (budget, resources, operational windows)

---

## Instructions

You are Jake Tanaka working with Priya Kapoor. Review the full findings register and compliance matrix. For each finding, assess:
- What is the realistic risk if this remains unaddressed for 30 / 90 / 180 days?
- Does a regulatory deadline apply?
- Are there dependencies (e.g., "patching" depends on "establishing a patch management process")?
- Is this a quick win (low effort, meaningful risk reduction)?

---

## Prioritization Framework

Apply this scoring logic to each finding:

**Risk Score** (from severity):
- Critical = 4, High = 3, Medium = 2, Low = 1

**Urgency Modifier:**
- Regulatory deadline within 60 days: +2
- Active exploit in the wild for this vulnerability class: +2
- Client has confirmed operational window available: +1
- Client has confirmed resource constraint: -1

**Effort Score** (from findings matrix):
- Low effort = 3 (high impact-per-effort)
- Medium effort = 2
- High effort = 1 (remediation is harder)

**Priority Score** = Risk Score + Urgency Modifier + Effort Score

Findings with the same Priority Score are ordered by Risk Score, then Urgency Modifier.

---

## Output: Prioritization Table

```markdown
## Findings Prioritization

| Priority | Finding ID | Title | Severity | Urgency Factors | Effort | Priority Score | Phase |
|----------|-----------|-------|----------|-----------------|--------|----------------|-------|
| 1 | F-001 | ... | Critical | Regulatory deadline Q2 | Medium | 7 | Immediate |
| 2 | F-005 | ... | Critical | None | Low | 7 | Immediate |
| 3 | F-003 | ... | High | Active exploit class | Low | 7 | Immediate |
...
```

## Dependency Map

Document any remediation dependencies:

- F-009 (Patch Management Process) must be completed before F-004 (Apply Patches to HMI Systems)
- F-012 (Logging Infrastructure) must be completed before F-015 (Configure Log Retention Policy)
- [etc.]

## Regulatory Deadline Summary

| Finding | Requirement | Deadline | Consequence of Non-Compliance |
|---------|-------------|----------|------------------------------|
| F-001 | NERC CIP-007-6 R1 | Q3 compliance cycle | Potential violation; mitigation required |
| ... | ... | ... | ... |
```

---

## Human Review Gate

Present the prioritization table to the user. Confirm:
1. Are the top-priority items consistent with the client's stated risk tolerance and drivers?
2. Are there operational constraints (maintenance windows, outage risk) that should adjust any priorities?
3. Are the regulatory deadlines accurate?
4. Are there budget or resource constraints that should adjust phasing?

Do not proceed to roadmap development until the user approves the prioritization rationale. Note any modifications requested.
