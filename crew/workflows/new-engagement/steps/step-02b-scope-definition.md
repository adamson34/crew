# Step 02b: Scope Definition (Path B)

**Agent:** Marcus Webb (BD)
**Path:** B — Vague or unscoped project
**Input:** Completed Project Brief from Step 01b
**Output:** Three artifacts — `sow-{{engagement_name}}.md`, `loe-{{engagement_name}}.md`, `assumptions-{{engagement_name}}.md`

---

## Objective

Produce a complete scoping package from the Project Brief. The package contains three documents that together answer: *what will we do, how long will it take, and what are we assuming?*

These documents may be used to:
- Present a formal proposal to the client before engagement
- Initiate the engagement directly if the client is proceeding informally
- Serve as the PM handoff package for work breakdown

All three documents must be internally consistent. Hours in the LOE must align with the team in the SOW. Assumptions in the Assumptions document must appear in the SOW's Assumptions section.

---

## Instructions

You are Marcus Webb, building a scoping package for a project that isn't fully defined yet. Work in sequence: SOW first, then LOE, then Assumptions. The SOW sets scope; the LOE prices it; the Assumptions document makes the conditions explicit.

---

## Document 1: Statement of Work

Load `_bmad/crew/templates/sow-template.md` and complete it from the Project Brief.

**Scoping principles for Path B (where you're defining scope, not deriving it):**

1. **Scope conservatively, then expand.** When in doubt, leave something out of scope and note it as a potential follow-on. Underselling and overdelivering is better than overselling and underdelivering.

2. **Use the framework to anchor scope.** If the client needs NERC CIP compliance, scope to the applicable CIP requirements. This makes scope concrete and auditable — not "assess our OT security" but "evaluate compliance with NERC CIP-005 R1, CIP-007 R1 through R5, and CIP-010 R1."

3. **Name what you'll produce, not what you'll do.** Scope is deliverables and artifacts, not activities. "Conduct interviews" is not a scope item. "Gap analysis document based on staff interviews and documentation review" is.

4. **Write the exclusions before you finalize the inclusions.** List everything the client might assume is included, then explicitly exclude what isn't. This protects scope more than any inclusion list.

Fill all sections of the SOW template. Pay particular attention to Sections 8 (Assumptions) and 9 (Exclusions) — these are where Path B engagements most often go wrong.

Save as: `{engagement_artifacts}/sow-{{engagement_name}}.md`

---

## Document 2: Level of Effort (LOE)

Load `_bmad/crew/templates/loe-template.md` and complete it.

The LOE must:
- Break the engagement into work packages aligned with the SOW scope
- Estimate hours per role per work package
- State the basis for each estimate (e.g., "based on N systems in scope," "assumes 6 staff interviews")
- Show a total hours and total cost summary
- Flag any work packages with high uncertainty and document the range

The LOE is an internal document. It does not go to the client. It is the basis for the price in the SOW's pricing section and the input for the PM's resource planning.

**Estimate calibration:**
- Documentation review: 4-8 hours per major document set (policy, architecture, asset inventory, procedures)
- Staff interviews: 1-2 hours per interview session, plus 1 hour prep and 1 hour write-up per session
- Technical analysis: varies significantly — document your basis for each estimate
- Report writing: 8-16 hours for a typical findings-based report section
- QA review: 2-4 hours for a standard deliverable

Save as: `{engagement_artifacts}/loe-{{engagement_name}}.md`

---

## Document 3: Assumptions

Load `_bmad/crew/templates/assumptions-template.md` and complete it.

Every assumption that drove a scoping or pricing decision goes here. Include:
- Technical assumptions (client environment, access, documentation availability)
- Resource assumptions (interview availability, on-site access)
- Timeline assumptions (client response times, review turnaround)
- Regulatory assumptions (applicable requirements based on stated profile)

For each assumption: state it clearly, document what evidence or information it's based on, identify the owner responsible for validating it, and describe the impact if it's wrong.

Assumptions are not excuses — they are risk flags. Any assumption that is wrong should trigger a scope change conversation with the client.

Save as: `{engagement_artifacts}/assumptions-{{engagement_name}}.md`

---

## Consistency Check

Before presenting for review, verify:

- [ ] Every work package in the LOE maps to a deliverable in the SOW
- [ ] The total price in the SOW matches the total in the LOE
- [ ] Every assumption in the Assumptions document appears in the SOW Section 8
- [ ] No assumption in the Assumptions document contradicts the SOW scope
- [ ] Every open item from Step 01b is either resolved or documented as an assumption

---

## Human Review Gate

Present all three documents together. Ask the user:

**On the SOW:**
1. Is the scope accurate and bounded correctly?
2. Are the exclusions complete?
3. Are the deliverables described precisely enough that the client can't dispute what they receive?

**On the LOE:**
1. Are the work package estimates realistic?
2. Are the basis statements correct? (Is the estimate actually based on N systems in scope?)
3. Is the total defensible if the client asks how we got to that number?

**On the Assumptions:**
1. Are there any assumptions we've made that aren't listed here?
2. Are any of the listed assumptions likely to be wrong?

> **Do not proceed to Step 03 until all three documents are approved.**

When approved, tell the user:
> "Scoping package approved. I'll hand this to Dana Reeves to build the work breakdown and task assignments."
