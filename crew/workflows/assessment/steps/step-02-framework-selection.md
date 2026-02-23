# Step 02: Framework Selection

**Agent:** Priya Kapoor (Compliance)
**Input:** Environment profile, SOW (which should specify applicable frameworks)
**Output:** Framework selection document with rationale and control scope

---

## Objective

Select and configure the compliance frameworks that will guide the gap analysis. The selection must be:
1. Anchored to the SOW (don't add frameworks not in scope without PM/BD approval)
2. Appropriate to the client's regulatory environment and industry
3. Scoped correctly — some framework requirements may not apply given the environment profile

---

## Instructions

You are Priya Kapoor. Review the SOW and environment profile to confirm which frameworks apply and how. Some clients have mandatory frameworks (NERC CIP for bulk electric system owners); others want a best-practice framework (IEC 62443, NIST CSF). Many engagements use multiple frameworks — your job is to define the mapping clearly so the gap analysis is efficient.

---

## Framework Decision Logic

Work through this decision tree:

### Is NERC CIP applicable?
- Yes if: client owns, operates, or maintains BES Cyber Systems as defined by NERC CIP-002-5.1a
- Check: Is the client a registered NERC entity? Does the environment profile include generation, transmission, or control systems that qualify as High, Medium, or Low impact BES Cyber Systems?
- If yes: NERC CIP is **mandatory** for applicable systems. Document applicable CIP standards (CIP-002 through CIP-014 as applicable).

### Is IEC 62443 applicable?
- Yes if: client is in manufacturing, oil & gas, water/wastewater, or other industrial sectors
- Yes if: client has supplier/customer requirements for IEC 62443 certification
- Yes if: SOW specifies IEC 62443 gap assessment
- If yes: Determine the applicable level — IEC 62443-2-1 (CSMS for asset owners), IEC 62443-3-3 (system requirements), IEC 62443-4-2 (component requirements)

### Is NIST CSF applicable?
- Yes if: client wants a general cybersecurity posture assessment
- Yes if: client has federal contract or grant requirements
- Yes if: SOW specifies NIST CSF alignment
- If yes: CSF version (1.1 or 2.0)? Note: CSF 2.0 added "Govern" function.

### Is NIST SP 800-82 applicable?
- Yes if: client is in a sector covered by 800-82 (industrial control systems)
- Typically used as a technical reference alongside NERC CIP or IEC 62443

---

## Output: Framework Selection Document

```markdown
# Framework Selection

**Engagement:** {{engagement_name}}
**Client:** {{client_name}}
**Date:** {{date}}
**Analyst:** Priya Kapoor

## Selected Frameworks

### Primary Framework(s)
[List primary assessment frameworks with rationale]

### Supporting References
[Standards used as technical reference but not primary assessment framework]

## Framework-Specific Scope Notes

### [Framework 1 Name]
- **Version:** [e.g., NERC CIP-007-6, IEC 62443-2-1:2010, NIST CSF 2.0]
- **Applicability:** [Which systems/zones does this apply to?]
- **Applicable requirements:** [Which specific requirement families are in scope?]
- **Not applicable:** [Which requirement families are excluded and why?]

### [Framework 2 Name]
[Same structure]

## Control Coverage Map

| Control Domain | NERC CIP Requirement | IEC 62443 Reference | NIST CSF Function/Category | In Scope? |
|----------------|---------------------|--------------------|-----------------------------|-----------|
| Asset identification | CIP-002 | IEC 62443-2-1 §4.2.3 | ID.AM | Yes |
| Access control | CIP-007 R5 | IEC 62443-3-3 SR 1.1 | PR.AC | Yes |
| Patch management | CIP-007 R2 | IEC 62443-2-1 §4.3.4.3 | PR.IP-12 | Yes |
| ... | ... | ... | ... | ... |

## Assessment Methodology Notes
[How findings will be organized — by framework requirement? By control domain? Mixed?]
```

---

## Confirm with PM

Before proceeding, confirm with Dana Reeves (PM):
- Is the framework selection consistent with the SOW?
- Are there any framework requirements the client has flagged as out of scope?
- Does the control coverage map align with the assessment timeline?
