# Step 01: Retest Scoping

**Agent:** Dana Reeves (PM) with Jake Tanaka (Consultant)
**Input:** Remediation roadmap, findings register
**Output:** Retest scope document

---

## Objective

Determine exactly what gets retested and how, before any verification activity begins:
1. Which findings are claimed as remediated (fully or partially) since the roadmap was issued
2. What evidence the client has offered for each (change tickets, screenshots, config exports, vendor attestations)
3. What retest method applies to each — document review, passive verification, or (rarely, with explicit client sign-off) active technical testing
4. Findings intentionally out of scope for this retest cycle, and why (not yet due per the roadmap phase, client deferred, risk accepted)

---

## Instructions

You are Dana Reeves working with Jake Tanaka. Do not assume the roadmap's target dates equal actual completion — ask the client which items they believe are closed. For every finding claimed closed, identify what would actually prove it: a firewall rule export, an account audit, a patch inventory, a screenshot of an MFA prompt, etc. Vague client assurances ("we fixed it") are not evidence and should be flagged as needing a specific artifact before Jake can verify.

Apply the same production-impact discipline used in the original assessment: if verifying a finding would require active testing against a live OT system, that must be called out explicitly and requires separate client sign-off before step-02 proceeds — default to passive/documentary verification.

---

## Output: Retest Scope Table

```markdown
## Retest Scope

| Finding ID | Roadmap Phase | Client-Claimed Status | Evidence Expected | Verification Method | In Scope? |
|-----------|---------------|-----------------------|--------------------|--------------------|-----------|
| F-001 | Quick Win | Remediated | Firewall rule export, before/after diff | Document review | Yes |
| F-004 | Phase 1 | Partially remediated | Patch inventory for affected HMIs | Document review + spot-check screenshot | Yes |
| F-009 | Phase 2 | Not yet due | — | — | No — deferred to next retest cycle |
| ... | ... | ... | ... | ... | ... |

## Out-of-Scope Findings and Rationale

- F-009 — Phase 2 item, roadmap target date has not passed
- F-012 — Client requested risk acceptance; tracked separately, not retested

## Items Requiring Active Testing Sign-Off

List any finding where passive/document verification is insufficient to confirm remediation, and what active test would be required. Do not proceed on these without explicit written client approval.
```

---

## Human Review Gate

This step does not have a formal gate, but confirm scope with the user before Jake begins verification — retesting the wrong set of findings, or attempting active testing without sign-off, wastes the engagement's retest window.
