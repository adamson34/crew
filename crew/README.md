# CREW — Consulting Role Engine Workflows

CREW is an open-source expansion module for the [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) framework that adapts BMAD's agentic development workflow for **consulting engagements**.

Where BMAD provides agents for software teams (Developer, Scrum Master, Architect), CREW provides agents that mirror real consulting roles: Business Development, Project Manager, Lead Consultant, Compliance Analyst, Technical Writer, and QA Reviewer.

**Current vertical:** OT/ICS cybersecurity consulting. Additional verticals (cloud security, IT audit, penetration testing, GRC) can be added as expansion packs.

---

## Quick Start

```bash
# 1. Clone CREW
git clone https://github.com/your-org/CREW.git

# 2. Create an engagement project directory and navigate into it
mkdir acme-assessment && cd acme-assessment

# 3. Run the installer from your engagement directory
node /path/to/CREW/crew/install.js
```

The installer will prompt you for:
- Firm name, your name, client name
- Consulting vertical (OT/ICS, cloud security, IT audit, GRC, pentest)
- Consultant skill level
- Output paths for engagement artifacts, assessment artifacts, and deliverables

It then writes a `.crew` config file, creates the artifact directories, copies the `crew/` module, and installs agents as Claude Code slash commands in `.claude/commands/`.

```bash
# Activate agents in Claude Code
/bd          # Marcus Webb — Business Development
/pm          # Dana Reeves — Project Manager
/consultant    # Jake Tanaka — Lead Consultant
/compliance  # Priya Kapoor — Compliance Analyst
/writer      # Eli Carter — Technical Writer
/reviewer    # Sofia Mendez — QA Reviewer

# Re-run with different config
node crew/install.js

# Uninstall
node crew/install.js --uninstall
```

**Using BMAD-METHOD?** CREW ships a `module.yaml` compatible with the BMAD installer. Run `npx bmad-method install` and select the CREW module.

---

## Agent Roster

| Agent | Name | Role | Key Capabilities |
|-------|------|------|-----------------|
| `@bd` | Marcus Webb | Business Development | Opportunity qualification, SOW generation, proposals, scope changes |
| `@pm` | Dana Reeves | Engagement Project Manager | Project setup, kickoff prep, status reporting, data requests, closeout |
| `@consultant` | Jake Tanaka | Lead Consultant / Consultant | Environment profiling, gap analysis, findings classification, architecture review |
| `@compliance` | Priya Kapoor | Compliance & Standards Analyst | Framework selection, compliance mapping, control validation, crosswalks |
| `@writer` | Eli Carter | Technical Report Writer | Executive summary, technical report, findings matrix, remediation plan |
| `@reviewer` | Sofia Mendez | QA / Peer Reviewer | QA review of findings register and final deliverables, severity audit |

---

## Engagement Lifecycle

```
BD Qualification & SOW
        ↓
    Kickoff & Setup
        ↓
   Technical Assessment
   ┌─────────────────────────────────────┐
   │  Environment Profiling (Consultant)   │
   │  Framework Selection (Compliance)   │
   │  Gap Analysis (Consultant+Compliance) │
   │  Findings Classification ⚠️ GATE   │
   │  Compliance Mapping (Compliance)    │
   │  QA Review ⚠️ GATE                 │
   └─────────────────────────────────────┘
        ↓
   Report Generation
   ┌─────────────────────────────────────┐
   │  Executive Summary ⚠️ GATE         │
   │  Technical Report (Writer)          │
   │  Findings Matrix (Writer)           │
   │  Assembly (Writer)                  │
   │  Final QA ⚠️ GATE                  │
   └─────────────────────────────────────┘
        ↓
   Remediation Plan
   ┌─────────────────────────────────────┐
   │  Prioritization ⚠️ GATE            │
   │  Roadmap (PM + Consultant)            │
   │  Effort Estimation                  │
   │  Quick Wins                         │
   └─────────────────────────────────────┘

⚠️ = Human review gate (mandatory)
```

---

## Module Structure

```
crew/
├── README.md                          # This file
├── module.yaml                        # BMAD module configuration
│
├── agents/                            # Role-based AI personas
│   ├── bd.agent.yaml                  # Marcus Webb — Business Development
│   ├── pm.agent.yaml                  # Dana Reeves — Project Manager
│   ├── consultant.agent.yaml            # Jake Tanaka — Lead Consultant
│   ├── compliance.agent.yaml          # Priya Kapoor — Compliance Analyst
│   ├── writer.agent.yaml              # Eli Carter — Technical Writer
│   └── reviewer.agent.yaml            # Sofia Mendez — QA Reviewer
│
├── workflows/
│   ├── engagement-kickoff/
│   │   ├── workflow.yaml
│   │   └── steps/
│   │       ├── step-01-qualify-opportunity.md
│   │       ├── step-02-sow-generation.md
│   │       ├── step-03-project-setup.md
│   │       ├── step-04-kickoff-prep.md
│   │       └── step-05-data-request.md
│   │
│   ├── assessment/
│   │   ├── workflow.yaml
│   │   └── steps/
│   │       ├── step-01-environment-profiling.md
│   │       ├── step-02-framework-selection.md
│   │       ├── step-03-gap-analysis.md
│   │       ├── step-04-findings-classification.md    # ⚠️ Human gate
│   │       ├── step-05-compliance-mapping.md
│   │       └── step-06-qa-review.md                  # ⚠️ Human gate
│   │
│   ├── report-generation/
│   │   ├── workflow.yaml
│   │   └── steps/
│   │       ├── step-01-executive-summary.md          # ⚠️ Human gate
│   │       ├── step-02-technical-report.md
│   │       ├── step-03-findings-matrix.md
│   │       ├── step-04-assemble.md
│   │       └── step-05-qa-review.md                  # ⚠️ Human gate — blocks delivery
│   │
│   └── remediation-plan/
│       ├── workflow.yaml
│       └── steps/
│           ├── step-01-prioritization.md             # ⚠️ Human gate
│           ├── step-02-roadmap.md
│           ├── step-03-effort-estimation.md
│           └── step-04-quick-wins.md
│
├── tasks/                             # Standalone task instructions
│   ├── scope-engagement.md            # Scoping helper
│   ├── asset-discovery.md             # OT asset inventory
│   ├── findings-classification.md     # Finding rating helper
│   └── deliverable-review.md          # Peer review task
│
├── templates/                         # Deliverable structure templates
│   ├── sow-template.md
│   ├── executive-summary-template.md
│   ├── technical-report-template.md
│   ├── findings-matrix-template.md
│   └── remediation-roadmap-template.md
│
├── data/                              # Reference data
│   ├── severity-scales.yaml           # OT/ICS-contextualized severity definitions
│   └── standards-crosswalks.yaml     # NERC CIP ↔ IEC 62443 ↔ NIST CSF mapping
│
└── knowledge-base/                    # OT/ICS domain knowledge
    ├── ot-ics-overview.md             # Purdue model, common vectors, assessment approach
    ├── nerc-cip-reference.md          # NERC CIP standards summary and common findings
    ├── iec-62443-reference.md         # IEC 62443 structure and security requirements
    └── nist-csf-reference.md          # NIST CSF 2.0 function breakdown for OT
```

---

## Design Decisions

**Agents are roles, not task runners.** Each agent has a name, personality, communication style, and principles that shape how they think and respond — not just what they do. Marcus Webb approaches business development differently than Jake Tanaka approaches a technical finding. That difference matters for output quality.

**Workflows are engagement phases, not sprints.** Consulting workflows map to the engagement lifecycle (scoping → kickoff → assessment → reporting → remediation planning), not to software development sprints. Each phase has a clear start state, a clear output, and a clear handoff.

**Human review gates are mandatory at critical handoffs.** Findings classification, scope alignment, and final deliverable QA all require human approval before proceeding. These gates exist because AI-generated findings can be wrong, over-stated, or under-stated. A human expert must validate before the work product becomes a client deliverable.

**Domain knowledge is modular.** The OT/ICS starter pack (knowledge base + standards crosswalks + severity scales) is the first vertical. The core agent structure and workflow patterns work for any consulting domain — swap out the knowledge base and data files for a different vertical.

**Templates are separate from tasks.** Tasks define *how* to do something. Templates define *what the output looks like*. Keeping them separate makes the methodology reusable across different deliverable formats or client branding requirements.

---

## Adding a New Vertical

To add a new consulting vertical (e.g., cloud security, penetration testing):

1. **Add knowledge base files** in `knowledge-base/` for the new domain
2. **Update or extend `data/severity-scales.yaml`** if the domain has different severity considerations
3. **Add domain-specific standards** to `data/standards-crosswalks.yaml`
4. **Extend agent personas** with domain-specific knowledge (or create domain-specific agent variants)
5. **Add domain-specific workflow steps** for methodology differences
6. **Update `module.yaml`** to add the new vertical to the single-select options

---

## Links

- BMAD-METHOD: https://github.com/bmad-code-org/BMAD-METHOD
- BMAD agent schema reference: https://deepwiki.com/bmadcode/BMAD-METHOD/5.2-creating-custom-agents-with-bmb
- NERC CIP Standards: https://www.nerc.com/pa/Stand/Pages/CIPStandards.aspx
- IEC 62443 (ISA): https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards
- NIST CSF 2.0: https://www.nist.gov/cyberframework
- NIST SP 800-82 Rev 3: https://csrc.nist.gov/publications/detail/sp/800-82/rev-3/final
