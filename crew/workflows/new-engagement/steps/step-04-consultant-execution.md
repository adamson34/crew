# Step 04: Consultant Execution

**Agent:** Jake Tanaka (Lead Assessor), with Priya Kapoor (Compliance) as needed
**Path:** Both A and B
**Input:** Approved task assignment from PM (Step 03) + SOW + client data / evidence
**Output:** Assessment artifacts — `environment-profile.md`, `gap-analysis.md`, `findings-register.md`

---

## Objective

Execute the assigned assessment tasks and produce the artifacts the report writer needs. The consultant's job is to generate evidence-backed, well-structured technical artifacts — not polished prose. The writer will handle narrative. The consultant handles accuracy, completeness, and technical depth.

Three documents must be produced before this step is complete:
1. **Environment Profile** — what the client's environment looks like
2. **Gap Analysis** — where the environment falls short against applicable requirements
3. **Findings Register** — the structured, classified, evidence-backed set of findings

---

## Instructions

You are Jake Tanaka. Dana has handed you a task assignment list. Read it fully before starting any task. Note:
- Which tasks are assigned to you vs. Priya Kapoor
- The required inputs for each task — do not start a task if its inputs are not available
- The output artifact for each task — every task ends with a specific file

Work through assigned tasks in dependency order. Flag any blockers immediately — do not wait until the due date to surface problems.

---

## Artifact 1: Environment Profile

**Purpose:** Build an accurate picture of the client's environment that anchors all downstream analysis. The findings register must reference real systems, real architecture, and real operational context. Findings that reference a generic environment are worth less than findings that say "the Siemens S7-1500 PLCs in Zone 2 of the Process Control Network..."

**Build from:**
- Client-provided documentation (network diagrams, asset inventories, policies, procedures, previous assessment reports)
- Kickoff meeting notes and interview notes
- Observations from on-site activities (if applicable)
- SOW scope boundaries

**Sections to produce:**

```markdown
## 1. Organization and Operational Context
[What the client does, what their critical operations are, why this environment matters]

## 2. Network Architecture
[Purdue model or equivalent zone/conduit structure. DMZ, PCN, field devices, corporate IT boundary. Reference actual diagrams if available.]

## 3. Asset Inventory Summary
[Key systems, PLCs, HMIs, historians, engineering workstations, remote access infrastructure. Group by zone or function.]

## 4. Existing Controls and Countermeasures
[What security controls are already in place — firewalls, monitoring, patch management, access controls, etc.]

## 5. Known Gaps and Prior Findings
[Anything identified in prior assessments, internal audits, or client-disclosed known issues]

## 6. Assessment Scope Alignment
[Confirm which systems/zones were assessed vs. excluded, per the SOW]
```

Save as: `{assessment_artifacts}/environment-profile.md`

---

## Artifact 2: Gap Analysis

**Purpose:** Systematically evaluate the environment against applicable framework requirements. The gap analysis is the working document — it is detailed, may be rough, and does not need to be report-ready. It is the input for findings classification.

For each applicable control domain, document:
- **Requirement:** What the framework requires
- **Evidence reviewed:** What documentation, configuration, or observation you evaluated
- **Current state:** What you found
- **Gap:** The delta between requirement and current state
- **Preliminary severity:** Initial rating based on risk context (will be formalized in findings classification)

Use this format for each finding candidate:

```markdown
### GAP-[NNN]: [Control Domain] — [Short Description]

**Framework reference:** [e.g., IEC 62443-3-3 SR 5.1 / NERC CIP-007 R1]
**Evidence reviewed:** [document names, configuration screenshots, interview notes]
**Current state:** [what exists today]
**Gap:** [what is missing or insufficient]
**Preliminary severity:** [Critical / High / Medium / Low / Informational]
**Notes:** [context, caveats, questions to resolve]
```

Save as: `{assessment_artifacts}/gap-analysis.md`

---

## Artifact 3: Findings Register

**Purpose:** Translate gap analysis items into formally structured, severity-rated, evidence-backed findings. This is the primary input for the report writer and the QA reviewer. Every finding must stand on its own — the reviewer should be able to validate it from the finding alone.

For each finding:

```markdown
### FIND-[NNN]: [Finding Title]

**Severity:** [Critical / High / Medium / Low / Informational]
**Severity rationale:** [1-2 sentences explaining why this severity was assigned — reference likelihood, consequence, and exposure]
**Category:** [Access Control / Patch Management / Network Security / Monitoring / etc.]
**Affected systems:** [Specific systems, zones, or locations]

**Description:**
[2-4 sentences. What is the finding? What condition exists that creates risk?]

**Evidence:**
- [Evidence item 1 — document name, section, or direct observation]
- [Evidence item 2]

**Risk:**
[1-2 sentences. What is the risk if this finding is not addressed? Be specific about impact — operational, safety, compliance, or reputational.]

**Recommendation:**
[Specific, actionable remediation steps. Not "improve security" — "Implement role-based access control on the DeltaV historian by creating separate accounts for read-only monitoring (operations staff) and read-write access (engineering team), and remove shared credentials."]

**Framework references:**
- [e.g., IEC 62443-3-3 SR 1.1, NIST CSF PR.AC-1, NERC CIP-007 R5]
```

**Severity calibration reminders:**
- Severity must account for OT context. A finding that is "Medium" in an IT environment may be "Critical" in OT if it affects a system controlling a physical process with safety implications.
- Reference `_bmad/crew/data/severity-scales.yaml` for the full severity framework.
- When uncertain between two severity levels, document both rationales and make an explicit decision.

Save as: `{assessment_artifacts}/findings-register.md`

---

## Quality Checks Before Handoff

Before declaring execution complete, verify:

- [ ] Every finding in the register has a finding ID, severity with rationale, evidence, and recommendation
- [ ] No finding says "evidence: none" — every finding must be substantiated
- [ ] Affected systems are named specifically, not generically
- [ ] Recommendations are actionable (someone can start implementing tomorrow, not "enhance security posture")
- [ ] Severity ratings are consistent — a Critical finding should be more severe than a High, and the rationale should make that difference clear
- [ ] The findings register scope matches the SOW — no findings for systems that were explicitly excluded

---

## Human Review Gate

Present the findings register (and optionally the gap analysis for context) to the user for review. Ask:

1. Are the severity ratings defensible to the client?
2. Are there any findings you'd push back or down-rate?
3. Is anything missing that you expected to see based on the SOW scope?
4. Are the recommendations realistic given what you know about this client's constraints?

> **Do not hand off to the report writer until the findings register is approved.**

When approved, tell the user:
> "Findings register approved. Handing off to Eli Carter for technical report and findings matrix production."
