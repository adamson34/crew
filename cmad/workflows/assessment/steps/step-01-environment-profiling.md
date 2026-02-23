# Step 01: Environment Profiling

**Agent:** Jake Tanaka (Assessor)
**Input:** Data request responses, kickoff meeting notes, SOW
**Output:** Environment profile document

---

## Objective

Build a comprehensive, accurate picture of the client's OT/ICS environment that will serve as the foundation for gap analysis and findings. This is not a security assessment yet — it is structured discovery. Accuracy matters more than speed.

---

## Instructions

You are Jake Tanaka. Work through the data request responses and any interview notes to populate the environment profile. Where information is missing, document it as a gap in the discovery (not as a finding). Where information is contradictory, note the contradiction and flag for clarification.

---

## Profile Sections

### 1. Organization Context

Document:
- Organization name, industry/sector, primary operational function
- Regulatory environment (NERC CIP BES? CFATS? State requirements? Internal policy only?)
- Number of sites in scope, geographic distribution
- OT/security team structure: dedicated OT security team? IT-managed? No dedicated security?

### 2. OT/ICS Architecture Overview

Document the overall architecture based on available diagrams and documentation. Describe:
- Architecture model in use (Purdue model? IEC 62443 zones and conduits? Ad hoc?)
- Physical locations: control rooms, substations, field sites, remote locations
- Number of distinct OT networks / control domains
- How OT connects to corporate IT (if at all): air gap, data diode, firewall, direct connection
- Internet exposure (direct or indirect)

### 3. Zone and Network Segmentation

For each identified zone, document:
| Zone | Purpose | Systems Present | Network Range (if available) | Connectivity to Other Zones |
|------|---------|-----------------|------------------------------|-----------------------------|
| Control Network | ... | ... | ... | ... |
| Process Network | ... | ... | ... | ... |
| DMZ | ... | ... | ... | ... |
| Corporate/IT | ... | ... | ... | (out of scope) |

Flag: Any zones that are not separated (e.g., control and process on the same network).

### 4. Asset Inventory Summary

Summarize from available asset inventory or document why it's unavailable:

**Control Systems:**
| System Type | Vendor/Model | Count (approx.) | OS/Firmware Version | Notes |
|-------------|--------------|-----------------|---------------------|-------|
| PLC | ... | ... | ... | ... |
| RTU | ... | ... | ... | ... |
| HMI | ... | ... | ... | ... |
| DCS | ... | ... | ... | ... |
| SCADA server | ... | ... | ... | ... |

**Supporting Systems:**
| System | Purpose | Vendor | Version | Network Location |
|--------|---------|--------|---------|-----------------|
| Historian | ... | ... | ... | ... |
| Engineering workstation | ... | ... | ... | ... |
| OPC server | ... | ... | ... | ... |
| Patch management | ... | ... | ... | ... |

**Discovery gap note:** If asset inventory was not provided or is incomplete, document what is known, what is estimated, and what is unknown.

### 5. Remote Access

Document:
- Methods in use: VPN, jump host, vendor direct access, cellular modems, other
- Who has remote access: internal staff, OT vendors, SCADA vendor, integrators
- Authentication method for remote access: password only, MFA, certificate-based
- Is remote access logged and monitored?
- Are there unmanaged/undocumented remote access paths (e.g., vendor cellular modems)?

### 6. Security Controls Summary

Based on available documentation and interviews, document the presence or absence of:

| Control Area | Status | Notes |
|-------------|--------|-------|
| Network segmentation/firewalling | Present / Partial / Absent / Unknown | ... |
| Remote access controls | Present / Partial / Absent / Unknown | ... |
| Patch management | Present / Partial / Absent / Unknown | ... |
| Asset inventory | Present / Partial / Absent / Unknown | ... |
| Security monitoring | Present / Partial / Absent / Unknown | ... |
| Incident response | Present / Partial / Absent / Unknown | ... |
| Identity and access management | Present / Partial / Absent / Unknown | ... |
| Vendor/third-party access management | Present / Partial / Absent / Unknown | ... |
| Security policies | Present / Partial / Absent / Unknown | ... |
| Training and awareness | Present / Partial / Absent / Unknown | ... |

### 7. Known Issues and Prior Findings

Document:
- Prior assessment findings that are open/unresolved
- Known vulnerabilities or architectural issues the client has disclosed
- Any active incidents or recent security events disclosed during kickoff or interviews

### 8. Discovery Gaps

List information that was requested but not received, or areas where available documentation was insufficient:

| Gap | Impact on Assessment | Mitigation Plan |
|-----|----------------------|-----------------|
| Asset inventory not provided | Cannot validate full attack surface | Interview-based estimation + document as limitation |
| ... | ... | ... |

---

## Output Requirements

Save the completed environment profile as: `assessment-artifacts/environment-profile.md`

Include at the top:
```
---
engagement: {{engagement_name}}
client: {{client_name}}
date: {{date}}
status: draft | final
assessor: Jake Tanaka
---
```

Review the profile with the Lead Assessor and PM before proceeding to framework selection.
