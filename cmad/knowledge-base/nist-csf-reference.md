# NIST Cybersecurity Framework Reference Guide
# CMAD Knowledge Base — OT/ICS Cybersecurity Starter Pack

---

## What Is NIST CSF

The **NIST Cybersecurity Framework (CSF)** is a voluntary framework developed by the National Institute of Standards and Technology for managing cybersecurity risk. First published in 2014, updated to CSF 1.1 in 2018, and significantly revised to **CSF 2.0 in February 2024**.

Unlike NERC CIP (sector-specific, mandatory) and IEC 62443 (OT-specific, voluntary), NIST CSF is **sector-agnostic** and applies to organizations of all types and sizes. It is widely used as:
- A baseline cybersecurity maturity assessment framework
- A communication tool for discussing cybersecurity risk with executives and boards
- A complement to sector-specific frameworks (many organizations use NIST CSF + NERC CIP, or NIST CSF + IEC 62443)

**NIST CSF is voluntary for most organizations** (exception: federal agencies and federal contractors may be required to align with CSF under CISA guidance and OMB memoranda).

---

## CSF 2.0 Structure

CSF 2.0 organizes cybersecurity activities into **six functions** (CSF 1.1 had five; CSF 2.0 added GOVERN):

| Function | Abbreviation | Purpose |
|---------|-------------|---------|
| **Govern** | GV | Establish and monitor the organization's cybersecurity risk management strategy, expectations, and policy |
| **Identify** | ID | Understand the organization's cybersecurity risks to systems, assets, data, and capabilities |
| **Protect** | PR | Implement safeguards to manage cybersecurity risks |
| **Detect** | DE | Find and analyze possible cybersecurity incidents |
| **Respond** | RS | Take action regarding detected cybersecurity incidents |
| **Recover** | RC | Restore capabilities impaired by a cybersecurity incident |

---

## Function Breakdown for OT/ICS Assessments

### GOVERN (GV) — New in CSF 2.0

Key categories for OT assessment:

**GV.OC — Organizational Context:**
- GV.OC-01: Mission and stakeholder expectations established
- GV.OC-02: Internal and external stakeholder dependencies understood

**GV.RM — Risk Management Strategy:**
- GV.RM-01: Risk management objectives established
- GV.RM-02: Risk appetite and risk tolerance statements established

**GV.RR — Roles, Responsibilities, and Authorities:**
- GV.RR-01: Roles and responsibilities for cybersecurity established
- GV.RR-02: Roles and responsibilities coordinated and aligned

**Common OT gap:** Organizations have IT cybersecurity governance but no OT-specific roles, responsibilities, or risk management. CISO and IT security team may not have authority or visibility into OT.

---

### IDENTIFY (ID)

**ID.AM — Asset Management:**
- ID.AM-01: Inventories of hardware assets maintained
- ID.AM-02: Inventories of software, services, and systems maintained
- ID.AM-07: Inventories of data and other assets maintained

**ID.RA — Risk Assessment:**
- ID.RA-01: Vulnerabilities in assets identified, validated, and recorded
- ID.RA-05: Threats, vulnerabilities, likelihoods, and impacts used to prioritize risk

**ID.IM — Improvement:**
- ID.IM-01: Improvements identified from evaluations
- ID.IM-02: Improvements identified from security tests and exercises

**Common OT gap:** Asset inventories are incomplete or maintained separately from IT. OT assets (PLCs, RTUs, historians) may not be in the enterprise asset management system.

---

### PROTECT (PR)

**PR.AA — Identity Management, Authentication, and Access Control:**
- PR.AA-01: Identities and credentials managed for authorized users, services, and hardware
- PR.AA-05: Access permissions and authorizations managed
- PR.AA-06: Physical access to assets managed

**PR.AT — Awareness and Training:**
- PR.AT-01: Personnel are provided awareness and training
- PR.AT-02: Individuals in specialized roles provided appropriate awareness and training

**PR.DS — Data Security:**
- PR.DS-01: Data-at-rest protected
- PR.DS-02: Data-in-transit protected
- PR.DS-10: Data-in-use protected

**PR.IR — Technology Infrastructure Resilience:**
- PR.IR-01: Networks and environments protected from unauthorized logical access
- PR.IR-02: The organization's technology assets are protected from environmental threats
- PR.IR-04: Adequate resource capacity to ensure availability

**PR.PS — Platform Security:**
- PR.PS-01: Configuration management practices established
- PR.PS-02: Software maintained, replaced, and removed
- PR.PS-06: Secure software development practices integrated

**Common OT gaps:** Password controls inconsistently applied to OT systems. OT staff not included in security awareness training. OT systems not covered by patch management processes.

---

### DETECT (DE)

**DE.AE — Adverse Event Analysis:**
- DE.AE-02: Potentially adverse events analyzed
- DE.AE-06: Information on adverse events is provided to authorized staff
- DE.AE-07: Cyber threat intelligence and other contextual information incorporated

**DE.CM — Continuous Monitoring:**
- DE.CM-01: Networks and network services monitored
- DE.CM-06: External service provider activities monitored
- DE.CM-09: Computing hardware and software monitored

**Common OT gap:** No monitoring capability for OT network. IT SIEM may not parse OT protocols. Alert thresholds and procedures don't cover OT-specific events.

---

### RESPOND (RS)

**RS.MA — Incident Management:**
- RS.MA-01: Potential incidents reported
- RS.MA-02: Incidents are investigated
- RS.MA-05: Incidents are contained

**RS.AN — Incident Analysis:**
- RS.AN-03: Analysis performed to establish what has occurred
- RS.AN-06: Actions performed during investigation documented

**RS.CO — Incident Response Reporting and Communication:**
- RS.CO-02: Internal and external stakeholders notified of incidents
- RS.CO-03: Information shared with designated authorities

**Common OT gap:** Incident response plan exists for IT but not for OT. OT operations staff not included in IR planning. NERC CEII reporting requirements not reflected in IR procedure (for applicable entities).

---

### RECOVER (RC)

**RC.RP — Incident Recovery Plan Execution:**
- RC.RP-01: Recovery plan executed once initiated
- RC.RP-03: Recovery activities and progress are communicated to stakeholders

**RC.IM — Incident Recovery Plan Improvements:**
- RC.IM-01: Recovery plans incorporate lessons learned

**Common OT gap:** Business continuity plans don't address OT-specific recovery requirements (configuration restoration, vendor support for recovery, operational restart procedures).

---

## Using NIST CSF for OT Assessment

**CSF is particularly useful for:**
1. **Board and executive reporting** — The function-based structure is accessible to non-technical audiences
2. **Baseline maturity assessment** — Many organizations use CSF maturity tiers (Partial → Risk Informed → Repeatable → Adaptive) for program benchmarking
3. **Multi-framework crosswalk** — CSF maps well to NERC CIP, IEC 62443, and NIST SP 800-82

**CSF Maturity Tiers (from CSF 2.0):**

| Tier | Label | Description |
|------|-------|-------------|
| Tier 1 | Partial | Risk practices are ad hoc; limited awareness of cybersecurity risk at organizational level |
| Tier 2 | Risk Informed | Risk management practices approved but not organization-wide policy |
| Tier 3 | Repeatable | Cybersecurity practices formally approved and expressed as policy |
| Tier 4 | Adaptive | Continuous improvement; adapts to changing threats; responds quickly |

**For most OT/ICS clients:** Assessment will typically find Tier 1-2 for OT-specific practices even if the IT program is at Tier 3. Document this differential — it's a common and important finding.

---

## NIST CSF vs. NIST SP 800-82

**NIST CSF** is a framework for organizing and communicating cybersecurity risk management activities — it tells you *what* to achieve.

**NIST SP 800-82** is a technical guide specifically for Industrial Control System Security — it tells you *how* to achieve security in OT environments, with ICS-specific implementation guidance for each control domain.

For OT assessments, use **NIST CSF as the assessment framework** and **NIST SP 800-82 as the technical implementation reference**. The current edition is NIST SP 800-82 Revision 3 (September 2023), which significantly updates guidance for modern OT architectures including cloud-connected OT and IT/OT convergence.
