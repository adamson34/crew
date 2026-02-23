---
template_type: executive-summary
version: 1.0
module: cmad
---

# {{engagement_type}} — Executive Summary

**Prepared for:** {{client_name}}
**Prepared by:** {{firm_name}}
**Assessment Period:** {{assessment_period}}
**Report Date:** {{date}}
**Classification:** Confidential

---

## Engagement Overview

{{engagement_overview}}

> Guidance: 1 paragraph. State who engaged the firm, the type of assessment, the period of assessment, the systems/sites covered, and the frameworks applied. This is a factual statement — not persuasive. Example: "[Firm] conducted an IEC 62443 gap assessment of [Client]'s operational technology (OT) environment at the [Site] facility between [dates]. The assessment covered [scope summary] and evaluated the organization's cybersecurity posture against [frameworks]."

---

## Overall Risk Assessment

{{overall_risk_narrative}}

> Guidance: 2 paragraphs. State the risk posture directly. Include finding counts by severity. Connect findings to business/operational/regulatory consequence. Avoid hedging language — if the risk is significant, say so. Example: "The assessment identified [N] findings: [N] Critical, [N] High, [N] Medium, and [N] Low severity. The most significant risks relate to [theme], which [consequence]. Without remediation of the Critical and High findings, the organization faces elevated risk of [outcome]."

**Findings Summary:**

| Severity | Count |
|----------|-------|
| 🔴 Critical | {{critical_count}} |
| 🟠 High | {{high_count}} |
| 🟡 Medium | {{medium_count}} |
| 🟢 Low | {{low_count}} |
| ℹ️ Informational | {{info_count}} |
| **Total** | **{{total_count}}** |

---

## Key Findings

The following findings represent the highest-priority risks identified during this assessment:

**{{finding_1_title}}** — {{finding_1_summary}}. If unaddressed, {{finding_1_consequence}}.

**{{finding_2_title}}** — {{finding_2_summary}}. If unaddressed, {{finding_2_consequence}}.

**{{finding_3_title}}** — {{finding_3_summary}}. If unaddressed, {{finding_3_consequence}}.

> Guidance: List 3-5 findings maximum. These should be the highest-severity, highest-impact items. Write each as 2 sentences: what the gap is, and what happens if it's not fixed. Plain language — no acronyms without definition, no technical details (save those for the technical report). Do not list all findings here.

---

## Priority Recommendations

{{priority_recommendations}}

> Guidance: 1 paragraph + short bulleted list. Frame as advice to the executive — "what should you do first and why?" Organize into immediate actions (0-90 days) and near-term actions. This is not a project plan; it is a strategic call to action. Example: "We recommend the organization prioritize [action 1] and [action 2] in the next 90 days, as these actions address the most significant risk exposure with relatively low implementation complexity. Over the following six months, [action 3] and [action 4] should be completed to address the remaining High and priority Medium findings."

**Immediate Actions (0-90 days):**
- {{immediate_action_1}}
- {{immediate_action_2}}
- {{immediate_action_3}}

**Near-Term Actions (90-180 days):**
- {{near_term_action_1}}
- {{near_term_action_2}}

---

## Compliance Posture

{{compliance_summary}}

> Guidance: 1 paragraph. Summarize the compliance posture against applicable frameworks. Identify the most significant compliance gaps and their regulatory consequence. Example: "The organization has [N] open Non-Compliant items against NERC CIP, with the most critical gaps in [requirement area]. These gaps require remediation prior to the [Q/Year] compliance cycle to avoid potential violation. Against IEC 62443-2-1, the organization meets [X]% of requirements and partially meets an additional [Y]%."

---

## About This Assessment

{{assessment_limitations}}

> Guidance: 1 short paragraph. Note scope boundaries and any material limitations. Example: "This assessment was conducted through documentation review and staff interviews. Active scanning of production OT systems was not performed. Findings and recommendations are based on the documentation provided, architecture diagrams as-built as of [date], and information provided by client staff. The assessment covered [N] sites; [other sites] were not in scope for this engagement."

---

*This executive summary is an excerpt from the full {{engagement_type}} report. The complete technical findings, evidence, and detailed recommendations are contained in the accompanying technical report.*
