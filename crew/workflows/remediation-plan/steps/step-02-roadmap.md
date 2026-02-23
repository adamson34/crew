# Step 02: Remediation Roadmap

**Agent:** Dana Reeves (PM) with Jake Tanaka (Consultant)
**Input:** Approved prioritization rationale
**Output:** Phased remediation roadmap

---

## Objective

Translate the prioritized findings into a phased, actionable remediation roadmap that:
1. Groups related remediation items into logical workstreams
2. Sequences phases based on priority, dependencies, and realistic implementation timelines
3. Identifies who owns each item (internal IT/OT team, vendor, third-party)
4. Provides enough detail for the client to begin planning without being a project plan (that's a follow-on engagement)

---

## Instructions

You are Dana Reeves structuring the roadmap, with Jake Tanaka advising on technical sequencing. Work from the approved prioritization table. Group findings into three phases and identify workstreams within each phase.

---

## Roadmap Phases

**Phase 1 — Immediate Actions (0-90 days)**
Items that address Critical and urgent High findings. These are the "stop the bleeding" actions.
Typical characteristics: configuration changes, access control tightening, quick architectural fixes.

**Phase 2 — Near-Term Actions (90-180 days)**
Items that address remaining High and priority Medium findings. Requires project planning but not major capital investment.
Typical characteristics: process establishment, policy documentation, monitoring deployment, patch management rollout.

**Phase 3 — Strategic Actions (180+ days)**
Items that address Medium and Low findings requiring architectural changes, major procurement, or program-level work.
Typical characteristics: architecture redesign, enterprise tooling deployment, training programs, long-term compliance programs.

---

## Workstream Categories

Group remediation items into these workstreams (use only those that apply):

- **Network Architecture** — segmentation, firewall rule changes, DMZ implementation
- **Access Management** — IAM, MFA, privileged access, vendor access
- **Patch & Vulnerability Management** — patching program, vulnerability scanning
- **Monitoring & Detection** — SIEM, OT monitoring tools, logging
- **Incident Response** — IR plan development, tabletop exercises
- **Governance & Policy** — policy documentation, roles, training
- **Supply Chain** — vendor management, third-party access controls

---

## Roadmap Output Format

```markdown
# Remediation Roadmap

**Engagement:** {{engagement_name}}
**Client:** {{client_name}}
**Date:** {{date}}

---

## Phase 1: Immediate Actions (0-90 Days)

### Workstream: Network Architecture
| # | Action | Finding(s) | Owner | Effort | Notes |
|---|--------|-----------|-------|--------|-------|
| 1.1 | Implement firewall controls between corporate network and historian | F-001 | IT/OT Team | Medium | Requires change window coordination |
| ... | | | | | |

### Workstream: Access Management
| # | Action | Finding(s) | Owner | Effort | Notes |
|---|--------|-----------|-------|--------|-------|
| 1.2 | Enforce MFA for all remote access to OT environment | F-003 | IT Team | Low | Policy change + configuration |
| ... | | | | | |

---

## Phase 2: Near-Term Actions (90-180 Days)

### Workstream: Patch & Vulnerability Management
...

### Workstream: Monitoring & Detection
...

---

## Phase 3: Strategic Actions (180+ Days)

### Workstream: Governance & Policy
...

---

## Dependency Notes

[Document any sequencing dependencies between roadmap items]

## Resource Considerations

[Note any significant resource requirements: dedicated FTE, vendor procurement, capital budget approval needed]

## Regulatory Milestone Alignment

[Map roadmap phases to any regulatory deadlines confirmed during prioritization]
```
