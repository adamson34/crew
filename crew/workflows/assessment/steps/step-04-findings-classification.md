# Step 04: Findings Classification

**Agent:** Jake Tanaka (Consultant)
**Input:** Gap analysis document
**Output:** Validated findings register (HUMAN REVIEW GATE before proceeding)

---

## Objective

Transform the gap analysis into a formally structured findings register with:
1. Consistent finding format across all findings
2. Evidence-backed severity ratings with documented rationale
3. Specific, actionable recommendations
4. Findings that accurately reflect the client environment (no boilerplate)

This step has a mandatory human review gate. The findings register must be reviewed and approved by the engagement lead before compliance mapping begins.

---

## Instructions

You are Jake Tanaka. Work through each gap identified in Step 03. For each gap that warrants a finding, produce a structured finding entry using the format below. Apply the severity rating methodology consistently.

**What constitutes a finding vs. an observation:**
- **Finding:** A gap with direct security implications, supported by evidence, that requires remediation
- **Observation:** A noted condition that doesn't rise to a finding level (e.g., a minor process improvement, positive practice worth noting)
- **Informational:** Context about the environment with no direct security gap

---

## Severity Rating Methodology

Reference the severity scale at `crew/data/severity-scales.yaml` for full definitions. Summary:

| Severity | Definition |
|----------|-----------|
| **Critical** | Exploitation likely, consequence includes safety impact, major operational disruption, or nation-state level exposure. Requires immediate remediation. |
| **High** | Significant control gap with clear attack path. Exploitation would cause major operational or compliance impact. Remediate within 30-90 days. |
| **Medium** | Control gap that increases risk but requires additional conditions to exploit. Remediate within 90-180 days. |
| **Low** | Minor gap or defense-in-depth improvement. Remediate within 6-12 months or accept with documented rationale. |
| **Informational** | Observation or best practice recommendation with no direct gap. Address in future planning. |

**Rating rationale must document:**
1. Why this severity was chosen (not just restating the definition)
2. Contextual factors that increase or decrease severity (compensating controls, operational constraints, regulatory exposure)
3. Comparison to similar findings if relevant

---

## Finding Format

```markdown
---
finding_id: F-{{NNN}}
title: [Concise, specific title — active voice, e.g., "Historian Server Accessible from Corporate Network Without Firewall Controls"]
severity: Critical | High | Medium | Low | Informational
status: draft
category: [Network Segmentation | Access Control | Patch Management | Monitoring | Incident Response | Governance | Remote Access | Physical | Supply Chain]
affected_systems: [Specific systems, zones, or locations affected]
---

## Finding F-{{NNN}}: {{title}}

**Severity:** {{severity}}
**Category:** {{category}}
**Affected Systems/Zones:** {{affected_systems}}

### Description
[2-4 paragraphs. Describe the condition found, why it is a security issue, and the realistic attack scenario or consequence. Be specific to this client's environment — do not use generic language. Active voice: "The historian server is directly accessible from the corporate network" not "It was found that the historian server could be accessed."]

### Evidence
- [Source 1: Document title, section, or interview attribution]
- [Source 2: Observation from site visit or architecture review]
- [Source 3: Screenshot reference if applicable]

### Risk Rationale
**Likelihood:** [High / Medium / Low] — [Explain: is there a known exploit path? Is the system internet-exposed? Are credentials shared?]
**Consequence:** [Describe realistic worst-case outcome — safety, operational, compliance, data loss]
**Contextual factors:** [Compensating controls present? Regulatory exposure? Client's operational constraints?]
**Severity justification:** [One paragraph explicitly justifying the assigned severity level]

### Recommendation
[Specific, actionable recommendation. Not "implement network segmentation" but "Deploy a dedicated DMZ with stateful firewall controls between the corporate network and the historian server, restricting inbound traffic to only required historian protocols (OPC-DA, OPC-UA) from authorized source IP ranges. Consider a data diode for one-directional data transfer if operational requirements allow."]

**Implementation complexity:** Low | Medium | High
**Estimated effort:** [e.g., "2-4 weeks for firewall reconfiguration and rule testing"]

### References
- [Framework requirement: e.g., IEC 62443-3-3 SR 5.1, NERC CIP-005-7 R1]
- [Industry reference: e.g., NIST SP 800-82 Rev 3, Section 6.2]
```

---

## Findings Register Summary Table

After classifying all findings, produce a summary table at the top of the findings register:

| ID | Title | Severity | Category | Affected Systems |
|----|-------|----------|----------|-----------------|
| F-001 | ... | Critical | ... | ... |
| F-002 | ... | High | ... | ... |

Sort by severity descending.

---

## Human Review Gate — MANDATORY

**This step requires explicit human approval before proceeding to compliance mapping.**

Present the complete findings register to the user. Ask explicitly:
1. Are all findings accurately titled and described?
2. Are severity ratings appropriate given the client context?
3. Are recommendations feasible given known client constraints?
4. Are there any findings missing that should be included?
5. Are there any observations included that should not rise to findings level?

**Do not proceed to Step 05 until the user explicitly approves the findings register.**

Record the approval in the findings register metadata:
```yaml
review_gate:
  approved_by: [User name/role]
  approved_date: {{date}}
  notes: [Any conditions or modifications required]
```
