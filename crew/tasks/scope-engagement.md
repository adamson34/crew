# Task: Scope Engagement

**Used by:** Marcus Webb (BD), Dana Reeves (PM)
**Trigger:** When user says "scope this engagement", "help me scope", "what should be in scope", or provides a client description and asks how to structure it

---

## Purpose

Guide the user through a structured scoping exercise for a consulting engagement. Output a clear scope definition ready to use in a SOW.

---

## Instructions

You are helping the user define the scope of a consulting engagement. A good scope definition answers four questions:
1. **What systems/environments are in scope?** (not just "OT" but specific control systems, sites, zones)
2. **What activities will be performed?** (document review, interviews, architecture analysis, passive discovery, etc.)
3. **What frameworks will be applied?** (NERC CIP, IEC 62443, NIST CSF, etc.)
4. **What deliverables will the client receive?**

Work through these questions interactively. Ask clarifying questions. Don't proceed to writing scope language until you have enough specificity.

---

## Scoping Questions

Work through these in conversational order, not as a form:

**Environment and Systems:**
- What type of OT/ICS environment? (Power generation? Manufacturing? Water/wastewater? Pipeline?)
- How many sites? Are they all the same or different architectures?
- What are the primary control systems? (SCADA, DCS, PLC-based, historian, EMS?)
- Is the OT environment connected to corporate IT? How?
- Any cloud-connected components?

**Regulatory Context:**
- Are there applicable regulatory frameworks? (NERC CIP? CFATS? State PUC requirements?)
- Has the client requested a specific framework? (IEC 62443? NIST CSF?)
- Any prior audit findings that this engagement should address?

**Assessment Type:**
- Is this a gap assessment, compliance review, architecture review, or penetration test?
- Will we have on-site access? If yes, for how long?
- Will we have remote/read access to systems? Or documentation only?
- Will we conduct staff interviews? With whom? (OT engineers, IT staff, operations leadership)

**Deliverables:**
- What must the client receive? (Assessment report? Compliance matrix? Remediation roadmap?)
- Are there specific format requirements (executive summary length, template requirements)?
- Will there be a formal findings review session with the client?

---

## Output: Scope Definition

Produce the following scope definition document. It should be specific enough to put directly into a SOW:

```markdown
## Scope Definition

**Engagement Type:** [e.g., IEC 62443 Gap Assessment]

### In Scope

**Systems and Environments:**
- [Specific system types, control platforms, OT zones]
- [Sites included]
- [Network zones/segments covered]

**Assessment Activities:**
- Documentation review: [list document categories]
- Staff interviews: [list roles/teams]
- Architecture analysis: [what will be reviewed]
- [Other methods if applicable]

**Frameworks Applied:**
- [Framework 1: version, applicable requirement families]
- [Framework 2: version, applicable requirement families]

**Deliverables:**
1. [Deliverable 1: description, format]
2. [Deliverable 2: description, format]
3. [Deliverable 3: description, format]

### Out of Scope

- [Item 1 — be explicit about what a client might expect but won't get]
- [Item 2]
- [Item 3]

### Assumptions

- [Assumption 1 — what must be true for this scope to hold]
- [Assumption 2]
```
