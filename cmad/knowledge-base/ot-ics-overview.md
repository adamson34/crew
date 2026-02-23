# OT/ICS Cybersecurity Overview
# CMAD Knowledge Base — Starter Pack: OT/ICS Cybersecurity

---

## What Is OT/ICS

**Operational Technology (OT)** refers to hardware and software that monitors and controls physical equipment, processes, and events in industrial environments. Unlike Information Technology (IT), which manages data, OT directly controls physical processes — pumps, valves, motors, turbines, and conveyor systems.

**Industrial Control Systems (ICS)** is the umbrella term for OT control systems, including:
- **SCADA (Supervisory Control and Data Acquisition):** Centralized monitoring and control of geographically distributed assets (pipelines, power grids, water systems)
- **DCS (Distributed Control System):** Process control for continuous processes (refineries, chemical plants, power generation)
- **PLC-based systems (Programmable Logic Controllers):** Automated control of discrete manufacturing processes
- **Safety Instrumented Systems (SIS):** Independent safety systems that bring processes to a safe state on demand

---

## The Purdue Model

The **Purdue Enterprise Reference Architecture** (PERA) is the traditional reference model for OT network segmentation. While modern architectures are evolving, assessors should understand it as a baseline.

| Level | Name | Description | Typical Systems |
|-------|------|-------------|-----------------|
| Level 4 | Enterprise | Corporate IT network | ERP, email, file servers |
| Level 3.5 | DMZ | IT/OT demilitarized zone | Historians (outbound replica), file transfer servers |
| Level 3 | Operations | Site-level operations management | Historian (primary), DCS engineering server, OPC server |
| Level 2 | Supervisory | Process control supervisory | SCADA servers, HMIs, engineering workstations |
| Level 1 | Control | Field controllers | PLCs, RTUs, DCS controllers |
| Level 0 | Process | Physical equipment | Sensors, actuators, motors, valves |

**Key segmentation principle:** Traffic flows should be controlled at each level boundary. Level 4 should never directly communicate with Level 2 or below. The DMZ (Level 3.5) acts as the buffer for required data exchange.

**Modern evolution:** Cloud-connected OT, vendor remote access, and digital transformation are blurring these boundaries. IEC 62443's zone-and-conduit model is becoming the preferred framework for modern OT architectures.

---

## IEC 62443 Zone and Conduit Model

**Zones:** Logical groupings of OT assets with similar security requirements. A zone has defined boundaries and is characterized by the assets it contains, the communications it requires, and the security level required.

**Conduits:** Communication paths between zones. Each conduit must be explicitly defined, secured, and monitored.

**Security Levels (SL):** IEC 62443 defines four security levels:
- **SL 1:** Protection against casual or coincidental violation
- **SL 2:** Protection against intentional violation using simple means
- **SL 3:** Protection against sophisticated intentional violation using ICS knowledge
- **SL 4:** Protection against violation using state-sponsored resources

---

## Why OT Security Is Different From IT Security

| Factor | IT Security | OT Security |
|--------|------------|-------------|
| **Primary concern** | Confidentiality → Integrity → Availability (CIA) | Availability → Integrity → Confidentiality (AIC) |
| **Patching** | Frequent automated patching acceptable | Patching requires vendor qualification, change windows; some systems cannot be patched |
| **Availability** | Planned downtime acceptable for maintenance | Production systems may run 24/7; 365-day availability required |
| **Asset lifecycle** | 3-5 year refresh cycles | 15-25+ year asset lifecycles; legacy systems common |
| **Protocols** | Standard TCP/IP protocols | Proprietary industrial protocols (Modbus, DNP3, EtherNet/IP, PROFINET, OPC-DA) |
| **Testing** | Active vulnerability scanning common | Active scanning can disrupt or crash OT systems |
| **Safety** | Generally no physical safety implications | Compromise can cause physical damage, injury, or death |
| **Vendor relationships** | IT vendors typically support security | OT vendors may resist security changes that void support contracts |
| **Environment access** | Lab environments common | OT testing environments rare; testing on production systems is high risk |

---

## Common OT/ICS Attack Vectors

Understanding common attack vectors is essential for assessors:

### 1. IT/OT Boundary Exploitation
The most common path into OT environments runs through the IT network. Attackers compromise an IT system, then pivot through insufficient IT/OT boundary controls.
- **Assessment focus:** Firewall rule analysis, DMZ architecture, historian network placement

### 2. Remote Access Compromise
Remote access points (VPN, vendor remote desktop, cellular modems) are frequently targeted because they provide direct entry to OT networks.
- **Assessment focus:** Authentication requirements, MFA, logging, unmanaged vendor access paths

### 3. Engineering Workstation Compromise
Engineering workstations (EWS) are high-value targets: they connect to both corporate networks (for email, internet) and directly to control systems via programming software.
- **Assessment focus:** Network segmentation of EWS, USB controls, internet access, antivirus

### 4. Supply Chain and Vendor Access
Vendors and integrators with legitimate access to OT systems can be exploited (or compromise systems inadvertently through uncontrolled remote access).
- **Assessment focus:** Third-party access controls, vendor credentialing, session monitoring

### 5. Removable Media
USB drives and portable engineering laptops are a persistent vector for introducing malware into air-gapped or semi-isolated OT environments.
- **Assessment focus:** USB policies, media sanitization procedures

### 6. Default and Shared Credentials
Many OT systems ship with default vendor credentials. Legacy systems may share credentials across many devices or operators.
- **Assessment focus:** Default credential auditing, account management procedures

---

## Common OT/ICS Vulnerabilities

| Vulnerability Class | Prevalence | Typical Root Cause |
|--------------------|-----------|-------------------|
| Unpatched systems | Very high | Patching complexity, vendor support requirements, operational availability |
| Default or weak credentials | High | Legacy system installations, lack of IAM processes for OT |
| Insufficient IT/OT segmentation | High | Technical debt, network complexity, historical connectivity |
| Lack of OT network monitoring | High | Cost, complexity, lack of OT-aware security tools |
| Missing or outdated security policies | High | OT teams often not covered by IT security policies |
| Insecure remote access | Medium-High | Convenience-driven implementation without security controls |
| Uncontrolled vendor access | Medium-High | Operational necessity without security process |
| Missing or inadequate logging | High | OT systems have limited logging capabilities; logs not integrated with SIEM |
| No incident response plan for OT | Medium-High | IR planning typically focused on IT; OT not included |
| Safety system exposure | Low-Medium | SIS/ESD systems improperly isolated from control network |

---

## Key OT/ICS Threat Actors and Incidents

Assessors should be aware of significant OT-targeted incidents to contextualize risk discussions:

| Incident | Year | Vector | Impact |
|---------|------|--------|--------|
| Stuxnet | 2010 | Removable media → air-gap jump | Destroyed Iranian nuclear centrifuges |
| Ukraine Power Grid | 2015, 2016 | Spear phishing → IT pivot to OT | Power outages affecting hundreds of thousands |
| TRITON/TRISIS | 2017 | IT/OT pivot → SIS attack | Safety system attack on petrochemical facility |
| Colonial Pipeline | 2021 | Ransomware (IT) → OT shutdown (precautionary) | Major US fuel pipeline shutdown |
| Oldsmar Water Treatment | 2021 | TeamViewer compromise | Chemical dosing manipulation attempt |
| Volt Typhoon | 2023-present | Living-off-the-land → persistent OT access | US critical infrastructure prepositioning |

---

## OT Security Assessment Approach Principles

1. **Passive over active:** In live OT environments, active scanning can crash PLCs and disrupt processes. Default to passive assessment methods (documentation review, architecture analysis, passive network monitoring if tools are available).

2. **Production impact awareness:** Every assessment activity should be evaluated for production impact risk. Engage OT operations staff — they know what can and cannot tolerate interference.

3. **Physical safety first:** Always consider physical safety implications of findings and recommendations. A remediation that requires a production shutdown needs to be scoped to a maintenance window.

4. **Operational context matters:** A "High" finding in IT context may be "Critical" in OT if a physical process is at risk. Rate findings in operational context.

5. **Vendor constraints are real:** Many OT patch limitations and configuration restrictions are legitimately constrained by vendor support requirements. Document these as constraints, not excuses — they inform remediation planning.

6. **Document the unknown:** Undocumented systems, missing asset inventories, and unknown network topology are themselves findings (or at minimum discovery gaps that limit assessment confidence). Document what is unknown.
