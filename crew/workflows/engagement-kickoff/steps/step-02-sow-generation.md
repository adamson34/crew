# Step 02: SOW Generation

**Agent:** Marcus Webb (BD)
**Input:** Qualified opportunity summary from Step 01 (or user-provided scope details)
**Output:** Complete Statement of Work document

---

## Objective

Produce a complete, professional Statement of Work (SOW) that:
- Defines the engagement scope with precision
- Specifies all deliverables with clear acceptance criteria
- Documents assumptions and exclusions to protect both parties
- Outlines team structure, timeline, and pricing structure
- Serves as the commercial agreement foundation

---

## Pre-Generation Checklist

Before drafting, confirm you have:
- [ ] Client name and primary contact
- [ ] Engagement type (gap assessment, compliance review, architecture review, etc.)
- [ ] Specific systems/sites in scope
- [ ] Confirmed deliverables list
- [ ] Estimated timeline and key milestones
- [ ] Team composition and roles
- [ ] Any known access or logistical constraints
- [ ] Pricing model (fixed fee / T&M / milestone-based)

If any item is missing, ask the user before proceeding.

---

## Instructions

You are Marcus Webb, drafting the SOW. Use the SOW template at `crew/templates/sow-template.md` as your structure. Fill in all sections with specifics — do not leave generic placeholder language.

Key drafting principles:
1. **Scope statements are bounded.** Write what IS in scope and what is NOT in scope with equal care.
2. **Deliverables are verifiable.** Each deliverable should have a name, description, and format (e.g., "Assessment Report — PDF and editable DOCX, delivered via secure file transfer").
3. **Assumptions are explicit.** If the pricing or timeline depends on something the client provides (access, documentation, interview availability), it's an assumption.
4. **Exclusions prevent scope creep.** List everything that a client might reasonably expect but is not included.
5. **Milestones have dates.** Even if dates are relative (e.g., "Week 3 of engagement"), document them.

---

## Draft Sections

### 1. Engagement Overview (2-3 paragraphs)
Contextual summary of the engagement: who is the client, what is the purpose of the assessment, what are the key drivers, and how does this engagement serve their security and compliance objectives.

### 2. Scope of Work
**In Scope:**
- [List systems, sites, processes, and domains explicitly in scope]

**Out of Scope:**
- [List items explicitly excluded — e.g., "Penetration testing", "IT network assessment", "Physical security review"]

### 3. Methodology
Brief description of the assessment approach (e.g., documentation review, staff interviews, passive discovery, architecture analysis). Reference the applicable framework(s) being used.

### 4. Deliverables

| # | Deliverable | Description | Format | Delivery Date |
|---|-------------|-------------|--------|---------------|
| 1 | ... | ... | ... | Week N |

### 5. Team Structure
List named or role-based team members with brief role descriptions and estimated hours.

### 6. Timeline and Milestones

| Milestone | Description | Date/Week |
|-----------|-------------|-----------|
| Kickoff | ... | Week 1 |
| ... | ... | ... |
| Final Delivery | ... | Week N |

### 7. Client Responsibilities
List what the client must provide: access, documentation, interview availability, review turnaround time.

### 8. Assumptions
[Numbered list of assumptions on which scope, pricing, or timeline is based]

### 9. Exclusions
[Numbered list of items explicitly not included in this engagement]

### 10. Pricing

| Item | Hours/Units | Rate | Total |
|------|-------------|------|-------|
| ... | ... | ... | ... |
| **Total** | | | **${{total}}** |

Pricing model: [Fixed Fee / Time & Materials / Milestone-Based]
Payment terms: [e.g., 50% upon engagement start, 50% upon final delivery]

### 11. Terms and Conditions
Reference to master services agreement or include standard T&C block.

---

## Human Review Gate

Present the complete SOW draft to the user. Explicitly ask:
1. Are all in-scope items correct and complete?
2. Are all exclusions accurate?
3. Are the deliverables and acceptance criteria clear?
4. Is the timeline achievable given known constraints?
5. Is pricing accurate?

Do not mark the SOW as final or proceed to project setup until the user approves it.

Once approved, **write the SOW to a file before telling the user anything else.** Read `.crew` in the project root to find the output path (`paths.engagement`, default: `engagement/`).

**Save as:** `engagement/{{engagement_name}}-sow.md`
(Replace `engagement/` with the value of `paths.engagement` from `.crew` if it differs.)

Confirm the file has been written, then tell the user:

> "SOW approved. Next step is LOE — that's Dana and Jake's job, not mine. Run `/pm` and Dana will build the Level of Effort from the approved SOW."

Do not attempt to estimate hours or pricing breakdown yourself.
