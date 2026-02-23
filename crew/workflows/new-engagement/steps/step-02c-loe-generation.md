# Step 02c: Level of Effort Generation (Path B)

**Agents:** Dana Reeves (PM) + Jake Tanaka (Assessor)
**Path:** B — Vague or unscoped project
**Input:** Approved SOW from Step 02b
**Output:** Completed LOE — `loe-{{engagement_name}}.md`

---

## Objective

Translate the approved SOW scope into a defensible hour-by-hour estimate. This is the internal document that justifies the price on the SOW's pricing page. It is not a client deliverable.

The process mirrors your real engagement work session: the PM reads the SOW and identifies every phase and deliverable; the senior consultant breaks each into specific work packages and assigns technical hours; the PM adds coordination and management overhead. The result is a bottom-up cost build that can survive scrutiny if the client or leadership asks how you got to a number.

---

## Instructions

This step runs in two phases across two agents. Dana owns the session and builds the final LOE, but Jake calls the technical hours. Do not skip the handoff.

**Phase 1 (Dana):** Read the SOW and produce a work package list. Hand it to Jake.
**Phase 2 (Dana):** Take Jake's estimates back, add PM overhead, and produce the final LOE.

---

## Step 1: Read the SOW and list every deliverable

Before estimating anything, list every deliverable from the SOW as a line item. If a deliverable has multiple distinct phases of work (e.g., documentation review AND on-site interviews both feed into the gap analysis), treat each phase as a separate work package.

Do not estimate while reading. Build the list first, then estimate.

**After completing the work package list, stop and tell the user:**

> "That's my read of the scope. Before I can build the LOE, I need Jake's technical estimates.
>
> Run `/assessor` and give him this work package list. Ask him to call hours for each package — basis statement, role breakdown, and any high-uncertainty flags. Come back to me with his estimates and I'll add PM overhead and finalize the LOE."

Do not proceed to Step 2 until the user returns with Jake's estimates.

---

## Step 2: Estimate each work package

You are now in Phase 2. The user has returned with Jake's technical estimates. Review them, then work through the following for each package:

**What drives the estimate?**
State the specific basis — not "based on engagement complexity" but something concrete:
- "Based on 8-12 client documentation packages at 3-4 hours each"
- "Based on 6 stakeholder interviews at 2 hours interview + 1 hour prep + 1 hour write-up"
- "Based on 3 sites at 4 hours passive network observation per site"

If you cannot state a concrete basis, the estimate is a guess. Flag it as high-uncertainty.

**Who does the work, and how many hours?**
Assign hours by role — do not lump them. A work package that involves both an assessor and a compliance analyst should show separate hours for each. Use these role labels consistently:

| Role | Notes |
|------|-------|
| Engagement Manager (PM) | All project management, scheduling, client comms, status reports |
| Lead Assessor | Technical assessment, environment profiling, architecture review, gap analysis |
| Compliance Analyst | Framework mapping, control validation, regulatory interpretation |
| Technical Writer | Report drafting, executive summary, findings matrix |
| QA Reviewer | Peer review of findings and deliverables |

**Are there hours that depend on the client?**
If the estimate depends on the client delivering something (documentation, interview access, site access), flag it. These are the hours most likely to vary.

---

## Step 3: Add PM overhead

After all technical work packages are estimated, Dana adds project management overhead separately. PM overhead includes:

- Engagement setup (contract execution, SharePoint/folder setup, kickoff scheduling): 2-4 hours
- Weekly status calls with client: 1 hour per call × number of weeks
- Internal coordination (team stand-ups, handoff reviews): 30 min per week × number of weeks
- Deliverable review cycles (managing client feedback, revision tracking): 2 hours per deliverable
- Closeout (final invoice, lessons learned, file archival): 2-4 hours

Do not bury PM overhead inside technical work packages. It should be visible as its own line items so the client (or leadership) can see what they're paying for.

---

## Step 4: Flag high-uncertainty work packages

Any work package where the estimate range exceeds 50% of the midpoint is high-uncertainty. For each:

- State the low-end scenario: what would make this take less time?
- State the high-end scenario: what would make this take more time?
- Name the single biggest variance driver

These flags feed directly into the LOE Section 4 and tell the PM where to build schedule buffer.

---

## Output Format

Load `_bmad/crew/templates/loe-template.md` and produce a fully completed LOE. Fill every field — do not leave placeholders. If a field cannot be filled because information is genuinely unknown, document why and flag it as an open item.

Specific requirements:
- Every work package must have a written basis statement (not just a number)
- Hours must be broken out by role within each work package
- Section 3 (Total Hours by Role) must sum correctly from the work packages above
- Section 4 must include every work package flagged as high-uncertainty
- Section 5 (Out-of-Scope) must be consistent with SOW Section 9 (Exclusions)
- Section 6 (Assumptions) must match the Assumptions document from Step 02b

Save as: `{engagement_artifacts}/loe-{{engagement_name}}.md`

---

## Human Review Gate

Present the completed LOE to the user. Walk through it section by section:

**Work packages:**
1. Does the list of work packages cover everything in the SOW scope?
2. Is anything in the SOW missing from the LOE?
3. Are any work packages in the LOE that aren't in the SOW scope? (If so, remove or add to SOW.)

**Hour estimates:**
4. Are the basis statements accurate? (Is the estimate actually based on the number of documents/interviews/sites stated?)
5. Are any estimates obviously too low or too high based on your experience with similar engagements?
6. Are the role assignments correct? (Would this work actually be done by that role?)

**Totals and pricing:**
7. Does the total fee in the LOE match the price in the SOW's pricing section? If not, one of them needs to change.
8. Is the total defensible if a client or partner asks how you got to that number?

> **Do not proceed to Step 03 until the LOE is approved and the SOW pricing section is updated to match.**

When approved:
- Confirm the SOW's pricing table reflects the LOE totals
- Tell the user: "LOE approved. Handing the scoping package to Dana Reeves to build the work breakdown and task assignments."
