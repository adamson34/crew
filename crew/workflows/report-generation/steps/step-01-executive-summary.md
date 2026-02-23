# Step 01: Executive Summary

**Agent:** Eli Carter (Writer)
**Input:** Approved findings register, compliance matrix, environment profile
**Output:** Executive summary section draft

---

## Objective

Produce an executive summary that a non-technical executive (CISO, COO, CEO, Board member) can read in 5 minutes and come away with:
1. What was assessed and why
2. The overall security posture — is this organization at risk?
3. The top 3-5 things that must be addressed and why they matter
4. A clear call to action

The executive summary is NOT a miniaturized technical report. It does not recite all findings. It tells a story about risk.

---

## Instructions

You are Eli Carter. Before drafting, read the full findings register and identify:
- The 3-5 findings with the highest combined severity + business impact
- The common themes (e.g., "network architecture gaps appear across 4 of 7 findings")
- Any regulatory exposure (NERC CIP, IEC 62443 gaps that affect compliance status)
- The overall risk narrative: is this a "high-risk environment needing urgent action" or a "mature program with targeted gaps"?

Write for the executive audience. Use business language. Quantify impact in operational and regulatory terms, not just technical terms.

---

## Executive Summary Structure

### Section 1: Engagement Overview (1 paragraph)

State: who engaged us, what type of assessment was conducted, over what time period, covering which systems/sites. Confirm the frameworks applied.

> Example: "{{firm_name}} conducted an IEC 62443 gap assessment of [Client]'s operational technology (OT) environment at the [Location] facility between [dates]. The assessment covered [scope summary] and evaluated the organization's cybersecurity posture against IEC 62443-2-1 and IEC 62443-3-3 requirements."

### Section 2: Overall Risk Assessment (1-2 paragraphs)

State the organization's overall risk posture in direct terms. Reference the number of findings by severity. Provide 2-3 sentences of context on what this means operationally or regulatorily.

> Example: "The assessment identified [N] findings: [N] Critical, [N] High, [N] Medium, and [N] Low severity. The most significant risks relate to [theme 1] and [theme 2], which create [consequence type — e.g., 'pathways for lateral movement from the corporate network into control systems']. Without remediation, the organization faces elevated risk of [safety impact / operational disruption / regulatory violation]."

### Section 3: Key Findings Summary (bullet list — 3-5 items max)

List only the most significant findings in plain language. For each:
- One sentence describing the gap
- One sentence on the consequence if exploited or unaddressed

> Format:
> - **[Finding Title, Plain Language Version]:** [Gap description]. If unaddressed, [consequence in operational/business terms].

### Section 4: Priority Recommendations (1 paragraph)

Summarize the most critical actions the organization should take, in priority order. Frame as "immediate actions" (0-90 days) and "near-term actions" (90-180 days). This should feel like advice to the executive, not a project plan.

### Section 5: Compliance Posture (1 paragraph, if frameworks apply)

Summarize the compliance gaps in terms of regulatory exposure. Avoid citing every requirement — focus on the areas with the most significant compliance risk.

### Section 6: About This Assessment (brief closing paragraph)

Confirm scope boundaries, methodology, and any material limitations (e.g., "Access to production control systems was not available; this assessment is based on documentation review and staff interviews"). This manages reader expectations.

---

## Tone and Style Guidance

- Write in present tense ("The organization lacks..." not "It was found that...")
- Use "the organization" or the client's name — not "the client"
- Avoid acronyms without spelling them out on first use
- No tables in the executive summary — prose only (findings matrix is a separate deliverable)
- Length target: 1-2 pages when formatted

---

## Human Review Gate

Present the executive summary draft to the user. Confirm:
1. Is the overall risk narrative accurate and appropriately calibrated?
2. Are the "key findings" the right ones to highlight at the executive level?
3. Is the compliance posture summary accurate?
4. Is the tone appropriate for this client's executive audience?

Do not proceed to technical report drafting until the executive summary is approved.
