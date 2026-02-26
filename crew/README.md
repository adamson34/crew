# CREW — Consulting Role Engine Workflows

CREW is an AI-powered consulting workflow framework that runs inside [Claude Code](https://docs.anthropic.com/en/docs/claude-code). It gives you a team of six AI agents — each with a distinct consulting role, personality, and methodology — that walk you through a full engagement lifecycle: from scoping and SOW generation through technical assessment, report writing, and remediation planning.

**Current vertical:** OT/ICS cybersecurity consulting, with an extensible architecture for additional verticals.

## What It Does

CREW installs six role-based AI agents as Claude Code slash commands. Each agent is a detailed persona with domain expertise, decision-making principles, and a communication style modeled after a real consulting role. You interact with them naturally in Claude Code — ask Marcus to scope an engagement, tell Jake to run a gap analysis, have Eli draft the executive summary.

The agents share a structured workflow with human review gates at every critical handoff. Nothing goes to a client without your approval.

### The Team

| Command | Agent | Role | What They Do |
|---------|-------|------|-------------|
| `/bd` | Marcus Webb | Business Development | Qualifies opportunities, generates SOWs and proposals, handles scope changes |
| `/pm` | Dana Reeves | Project Manager | Plans projects, builds timelines, tracks deliverables, manages client comms |
| `/consultant` | Jake Tanaka | Lead Consultant | Profiles environments, runs gap analysis, classifies findings, reviews architecture |
| `/compliance` | Priya Kapoor | Compliance Analyst | Selects frameworks, maps compliance, validates controls, builds crosswalks |
| `/writer` | Eli Carter | Technical Writer | Writes executive summaries, technical reports, findings matrices, remediation plans |
| `/reviewer` | Sofia Mendez | QA Reviewer | Reviews findings registers and final deliverables, audits severity ratings |

### What You Get Out

CREW produces the core deliverables of a consulting engagement:

- **Statement of Work** — scope, deliverables, timeline, team, investment
- **Level of Effort estimates** — work package breakdowns with hour ranges and uncertainty flags
- **Environment profiles** — architecture, asset inventory, network topology
- **Gap analysis** — structured control assessments against selected frameworks
- **Findings register** — classified findings with severity, evidence, and recommendations
- **Compliance mappings** — findings mapped to NERC CIP, IEC 62443, NIST CSF, or NIST SP 800-82
- **Executive summary** — client-ready assessment overview
- **Technical report** — detailed findings and analysis
- **Findings matrix** — sortable table of all findings with status tracking
- **Remediation roadmap** — phased plan with effort estimates, quick wins, and success criteria

### Engagement Lifecycle

```
BD Qualification & SOW
        |
    Kickoff & Setup
        |
   Technical Assessment
   +-------------------------------------+
   |  Environment Profiling (Consultant)  |
   |  Framework Selection (Compliance)    |
   |  Gap Analysis (Consultant+Compliance)|
   |  Findings Classification >> GATE     |
   |  Compliance Mapping (Compliance)     |
   |  QA Review >> GATE                   |
   +-------------------------------------+
        |
   Report Generation
   +-------------------------------------+
   |  Executive Summary >> GATE           |
   |  Technical Report (Writer)           |
   |  Findings Matrix (Writer)            |
   |  Assembly (Writer)                   |
   |  Final QA >> GATE (blocks delivery)  |
   +-------------------------------------+
        |
   Remediation Plan
   +-------------------------------------+
   |  Prioritization >> GATE              |
   |  Roadmap (PM + Consultant)           |
   |  Effort Estimation                   |
   |  Quick Wins                          |
   +-------------------------------------+

>> GATE = Human review required before proceeding
```

Every gate is a deliberate pause where you review AI-generated work before it moves forward. Findings can be wrong, over-stated, or under-stated — the gates exist because a human expert must validate before anything becomes a client deliverable.

---

## Installation

### Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed and working
- Node.js (for the installer script)

### Install

```bash
# 1. Clone CREW
git clone https://github.com/your-org/CREW.git

# 2. Create an engagement project directory and cd into it
mkdir acme-assessment && cd acme-assessment

# 3. Run the installer
node /path/to/CREW/crew/install.js
```

The installer prompts you for:

| Prompt | Default | Purpose |
|--------|---------|---------|
| Firm name | *(blank)* | Stamped into SOWs, proposals, and agent context |
| Your name | *(blank)* | Identifies the engagement lead |
| Engagement name | Directory name | Labels all outputs |
| Client name | "Client" | Used in deliverable templates |
| Consulting vertical | ot-ics | Selects domain knowledge and service catalog |
| Consultant skill level | intermediate | Controls how much guidance agents provide |
| Artifact paths | engagement/, assessment/, deliverables/ | Where outputs are written |

After installation, your engagement directory looks like this:

```
acme-assessment/
├── .crew                     # Engagement config (YAML)
├── .claude/
│   └── commands/
│       ├── bd.md             # /bd slash command
│       ├── pm.md             # /pm slash command
│       ├── consultant.md     # /consultant slash command
│       ├── compliance.md     # /compliance slash command
│       ├── writer.md         # /writer slash command
│       └── reviewer.md       # /reviewer slash command
├── crew/                     # Full module (workflows, templates, data, knowledge base)
├── engagement/               # SOW, project plan, comms artifacts
├── assessment/               # Findings, evidence, notes
└── deliverables/             # Reports, roadmaps, presentations
```

### Reconfigure or Uninstall

```bash
# Re-run with different config
node crew/install.js

# Remove everything CREW installed
node crew/install.js --uninstall
```

---

## How It Works

CREW agents are markdown files installed as Claude Code [slash commands](https://docs.anthropic.com/en/docs/claude-code). When you type `/consultant` in Claude Code, it loads Jake Tanaka's full persona — his background, principles, methodology, and available workflows. You then interact with him naturally.

Each agent references workflow steps, templates, and data files in the local `crew/` directory. Everything runs locally in your engagement project. There is no external service, no API beyond Claude Code itself.

**Agents are roles, not task runners.** Each has a name, personality, communication style, and decision-making principles that shape output quality. Marcus approaches a SOW differently than Jake approaches a finding — that difference is intentional.

**Workflows are engagement phases, not sprints.** They map to the consulting lifecycle (scoping, kickoff, assessment, reporting, remediation), with each phase having a clear start state, output, and handoff.

**Templates are separate from tasks.** Tasks define *how* to do something. Templates define *what the output looks like*. This makes the methodology reusable across different deliverable formats or client branding.

**Domain knowledge is modular.** The OT/ICS starter pack is the first vertical. Swap out the knowledge base and data files for a different domain and the same agent structure and workflows apply.

---

## What's Included

### Data

| File | What It Contains |
|------|-----------------|
| `data/service-catalog.yaml` | Firm service offerings with match keywords, delivery types, team composition, and typical duration. Used by BD agent to validate inbound opportunities. |
| `data/severity-scales.yaml` | Five-level severity scale (Critical through Informational) with CVSS ranges, remediation timelines, OT-specific guidance, and rating documentation requirements. |
| `data/standards-crosswalks.yaml` | Control domain mappings across NERC CIP, IEC 62443, NIST CSF, and NIST SP 800-82. Used by the compliance agent for multi-framework assessments. |

### Knowledge Base

| File | Coverage |
|------|----------|
| `knowledge-base/ot-ics-overview.md` | Purdue model, zone/conduit model, IT vs OT differences, common attack vectors and vulnerabilities |
| `knowledge-base/nerc-cip-reference.md` | NERC CIP standards (CIP-002 through CIP-013), scope, common findings, evidence requirements |
| `knowledge-base/iec-62443-reference.md` | IEC 62443 series structure, security levels (SL1-4), foundational and system requirements, common gaps |
| `knowledge-base/nist-csf-reference.md` | NIST CSF 2.0 functions, 23 categories, OT-specific guidance, cross-framework mappings |

### Templates

SOW, executive summary, technical report, findings matrix, remediation roadmap, level of effort, assumptions, and task assignment templates. Each defines the structure and sections of a deliverable — agents fill in the content.

---

## Adding a New Vertical

The OT/ICS cybersecurity vertical is the starter pack. To add a new consulting domain (cloud security, penetration testing, GRC, IT audit):

1. **Add knowledge base files** in `knowledge-base/` for the new domain
2. **Update `data/severity-scales.yaml`** if the domain has different severity considerations
3. **Add domain-specific standards** to `data/standards-crosswalks.yaml`
4. **Extend agent personas** with domain knowledge (or create domain-specific variants)
5. **Add domain-specific workflow steps** where methodology differs
6. **Update `module.yaml`** to add the new vertical to the installer options

The core agent structure, workflow phases, and review gates are domain-agnostic — only the knowledge base and reference data change per vertical.

---

## Relationship to BMAD

CREW was originally designed as an expansion module for the [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) framework, which provides agentic workflows for software development teams. CREW adapts that pattern for consulting teams.

**In practice, CREW runs independently.** The BMAD integration is a packaging convention (the `module.yaml` file and `_bmad/` path references in the source YAML definitions), but the compiled agents and installer work without BMAD installed. If you're using BMAD, CREW can be installed as a module via `npx bmad-method install`. If you're not, the standalone `node install.js` path works on its own.

What CREW borrows from BMAD:
- The concept of role-based AI agents with distinct personas
- YAML-based workflow definitions with step references
- The module packaging convention (`module.yaml`)

What CREW does independently:
- Installation, configuration, and runtime (no BMAD dependency)
- All domain knowledge, templates, data, and deliverable structures
- The consulting engagement lifecycle and review gate system

---

## Roadmap

### Current State

CREW is a working prototype with a single vertical (OT/ICS cybersecurity). It runs locally via `node install.js` and requires manually cloning the repository. The six agents, five workflow phases, and all templates and reference data are functional.

### Near-Term

- **npm distribution** — publish as a package so users can install via `npx` without cloning
- **CLAUDE.md integration** — auto-generate a project-level CLAUDE.md with engagement context so agents work better across sessions
- **Workflow orchestration** — currently agents are invoked individually; add workflow-level coordination so agents hand off to each other automatically
- **Additional templates** — client-facing presentation decks, data request checklists, closeout reports

### Medium-Term

- **Additional verticals** — cloud security, IT audit, GRC, and penetration testing knowledge packs
- **Multi-engagement management** — support multiple concurrent engagements from a single CREW install
- **Evidence management** — structured evidence collection, linking, and referencing within findings
- **Custom service catalogs** — let firms define their own service offerings and agent behavior

### Long-Term

- **Team collaboration** — multiple consultants working the same engagement with shared state
- **Client portal integration** — export deliverables to client-facing platforms
- **Engagement analytics** — track patterns across engagements (common findings, time-to-deliver, scope accuracy)

---

## Links

- BMAD-METHOD: https://github.com/bmad-code-org/BMAD-METHOD
- NERC CIP Standards: https://www.nerc.com/pa/Stand/Pages/CIPStandards.aspx
- IEC 62443 (ISA): https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards
- NIST CSF 2.0: https://www.nist.gov/cyberframework
- NIST SP 800-82 Rev 3: https://csrc.nist.gov/publications/detail/sp/800-82/rev-3/final
