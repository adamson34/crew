# Step 03: Gap Analysis

**Agent:** Jake Tanaka (Consultant) with Priya Kapoor (Compliance)
**Input:** Environment profile, framework selection document, data request responses, interview notes
**Output:** Gap analysis document (precursor to findings classification)

---

## Objective

Conduct a structured gap analysis against the selected framework controls. For each in-scope control domain, document: what the requirement calls for, what evidence exists, what the gap is (if any), and the initial risk assessment. This produces the raw material for findings classification.

---

## Instructions

You are Jake Tanaka working with Priya Kapoor. The gap analysis is not the findings report — it is the analytical work that precedes findings. At this stage, be comprehensive and analytical. Every gap gets documented; calibration of severity happens in the next step.

Work through each control domain defined in the framework selection document. For each:
1. State the control requirement (cite the specific requirement ID)
2. Document what was observed or evidenced
3. Identify the gap (difference between required and actual state)
4. Note risk factors: exploitability, potential consequence, exposure
5. Assign a preliminary severity (Critical / High / Medium / Low / Informational)

---

## Gap Analysis Structure

For each control domain, use this format:

```markdown
## Control Domain: [Name] ([Framework Requirement ID])

**Requirement:** [Exact or paraphrased requirement language]

**Evidence reviewed:**
- [Document/interview/observation that informs this assessment]

**Observed state:**
[What is actually in place — be factual, not evaluative]

**Gap identified:**
[Specific delta between the requirement and the observed state. If no gap: "No gap identified — requirement appears met."]

**Risk factors:**
- Exploitability: [Low/Medium/High — and why]
- Consequence: [Safety / Operational / Compliance / Data loss — describe worst-case]
- Exposure: [Internal only / Vendor-accessible / Internet-exposed]

**Preliminary severity:** [Critical / High / Medium / Low / Informational]

**Notes for findings classification:** [Anything the reviewer should know — ambiguity, client context, compensating controls]
```

---

## OT/ICS Control Domain Checklist

Work through these domains (adjust based on framework selection):

### Domain 1: Asset Identification and Inventory
- [ ] BES Cyber System / OT asset identification methodology
- [ ] Asset inventory completeness and accuracy
- [ ] Classification of assets by criticality/impact level
- [ ] Electronic Security Perimeter / zone definition documentation

### Domain 2: Network Segmentation and Architecture
- [ ] Zone-to-zone boundary controls (firewalls, conduits)
- [ ] DMZ implementation for IT/OT data exchange
- [ ] Inbound/outbound traffic filtering
- [ ] Network monitoring and visibility

### Domain 3: Remote Access
- [ ] Remote access authentication strength (MFA, certificate-based)
- [ ] Remote access authorization and provisioning process
- [ ] Vendor/third-party remote access controls
- [ ] Remote access session monitoring and logging
- [ ] Unmanaged remote access paths (cellular modems, direct vendor connections)

### Domain 4: Access Control and Identity Management
- [ ] Least privilege enforcement
- [ ] Privileged account management
- [ ] Account lifecycle management (provisioning, deprovisioning, review)
- [ ] Shared/generic account usage
- [ ] Authentication mechanism strength for OT systems

### Domain 5: Patch and Vulnerability Management
- [ ] Patch management process exists and is documented
- [ ] Patch applicability assessment for OT systems
- [ ] Patch testing procedure before deployment
- [ ] Compensating controls for systems that cannot be patched
- [ ] Vulnerability scanning coverage of OT network

### Domain 6: Monitoring and Detection
- [ ] Security event logging on OT systems
- [ ] Log collection and retention
- [ ] OT-specific security monitoring (e.g., Claroty, Dragos, Nozomi)
- [ ] Alert triage and response process
- [ ] Anomaly detection capability

### Domain 7: Incident Response
- [ ] OT-specific incident response plan exists
- [ ] Plan has been tested (tabletop or live exercise)
- [ ] OT team roles and responsibilities defined in IR plan
- [ ] Communication plan includes OT/operational stakeholders
- [ ] Evidence preservation procedures for OT environments

### Domain 8: Policies and Governance
- [ ] OT cybersecurity policy exists and is current
- [ ] Policy covers key OT-specific requirements
- [ ] Roles and responsibilities documented
- [ ] Risk management process for OT environments
- [ ] Security awareness training for OT staff

### Domain 9: Supply Chain and Third Parties
- [ ] Vendor/third-party access management process
- [ ] Third-party security assessment or requirements
- [ ] Software/firmware supply chain controls

### Domain 10: Physical Security
- [ ] Physical access controls to control rooms, substations, field sites
- [ ] Visitor management for OT environments
- [ ] Physical monitoring (cameras, alarms) for critical locations

---

## Preliminary Findings Summary

After completing the domain analysis, produce a summary table:

| # | Control Domain | Gap Description | Preliminary Severity | Framework Req |
|---|----------------|-----------------|----------------------|---------------|
| 1 | ... | ... | Critical/High/Med/Low | ... |

Sort by preliminary severity (Critical first). This table feeds directly into Step 04 findings classification.
