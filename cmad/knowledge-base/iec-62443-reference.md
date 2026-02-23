# IEC 62443 Reference Guide
# CMAD Knowledge Base — OT/ICS Cybersecurity Starter Pack

---

## What Is IEC 62443

The **IEC 62443** series is a family of international standards addressing cybersecurity for Industrial Automation and Control Systems (IACS). Unlike NERC CIP, which is mandatory only for the North American bulk electric system, IEC 62443 applies to any industrial sector and is increasingly referenced in contracts, procurement requirements, and regulatory frameworks globally.

The standards are organized into four series:
- **Series 1:** General (concepts, terms, security lifecycle)
- **Series 2:** Policies and Procedures (for asset owners and operators)
- **Series 3:** System (for system integrators)
- **Series 4:** Components (for product suppliers)

---

## Standards Hierarchy

| Standard | Title | Primary Audience |
|---------|-------|-----------------|
| IEC 62443-1-1 | Models and concepts | All |
| IEC 62443-2-1 | Requirements for CSMS (Cybersecurity Management System) | Asset owners |
| IEC 62443-2-3 | Patch management in the IACS environment | Asset owners + integrators |
| IEC 62443-2-4 | Requirements for IACS service providers | Service providers/integrators |
| IEC 62443-3-2 | Security risk assessment for system design | Integrators + asset owners |
| IEC 62443-3-3 | System security requirements and Security Levels | Integrators |
| IEC 62443-4-1 | Secure product development lifecycle | Product suppliers |
| IEC 62443-4-2 | Technical security requirements for IACS components | Product suppliers |

**For OT/ICS consulting assessments, the most commonly applied standards are:**
- **IEC 62443-2-1:** For assessing an asset owner's security management program
- **IEC 62443-3-3:** For assessing system-level security requirements

---

## IEC 62443-2-1: Cybersecurity Management System (CSMS)

IEC 62443-2-1 defines requirements for establishing, operating, and improving a Cybersecurity Management System for IACS. It uses a plan-do-check-act (PDCA) cycle.

### Key CSMS Elements

**§4.2.3 — Business Risk Assessment:**
- Identify and prioritize OT assets based on business impact
- Conduct risk assessment using defined methodology
- Maintain risk register for OT environment

**§4.3.2 — Addressing Identified Risks (Security Policies):**
- Documented OT security policy
- Roles and responsibilities defined
- Personnel security (training, background checks)

**§4.3.3 — Security Countermeasures:**
- **§4.3.3.1 — Personnel:** Training, awareness, and competency requirements
- **§4.3.3.2 — Physical and environmental security:** Physical access controls
- **§4.3.3.3 — Network segmentation:** Zone and conduit implementation
- **§4.3.3.4 — Access control:** Authentication and authorization
- **§4.3.3.5 — Application security:** Secure configuration of control system software
- **§4.3.3.6 — Communication integrity and confidentiality:** Secure communications
- **§4.3.3.7 — Event processing, monitoring, and logging:** Detection and monitoring
- **§4.3.3.8 — Malware protection:** Endpoint protection
- **§4.3.3.9 — Portable devices:** Removable media controls

**§4.3.4 — Security Programs:**
- **§4.3.4.2 — Configuration management:** Baselines and change control
- **§4.3.4.3 — Patch management:** Patch identification and application process
- **§4.3.4.4 — Backup and restore:** Data backup and recovery testing
- **§4.3.4.5 — Incident response:** IR planning and execution
- **§4.3.4.6 — Disaster recovery:** BCP/DR for OT environments

---

## IEC 62443-3-3: System Security Requirements and Security Levels

IEC 62443-3-3 defines Foundational Requirements (FRs) and Security Requirements (SRs) for IACS systems. It is the most commonly referenced standard for system-level security assessment.

### Foundational Requirements (FRs)

| FR | Name | Description |
|----|------|-------------|
| FR 1 | Identification and Authentication Control (IAC) | Identify and authenticate all users, devices, and software |
| FR 2 | Use Control (UC) | Enforce authorized use of system resources |
| FR 3 | System Integrity (SI) | Ensure integrity of systems and communications |
| FR 4 | Data Confidentiality (DC) | Protect confidentiality of information |
| FR 5 | Restricted Data Flow (RDF) | Segment networks and restrict unauthorized flows |
| FR 6 | Timely Response to Events (TRE) | Respond to security incidents |
| FR 7 | Resource Availability (RA) | Maintain availability of system resources |

### Key Security Requirements

**FR 1 — Identification and Authentication:**
- **SR 1.1:** Human user identification and authentication
- **SR 1.2:** Software process and device identification and authentication
- **SR 1.3:** Account management
- **SR 1.4:** Identifier management
- **SR 1.5:** Authenticator management
- **SR 1.6:** Wireless access management
- **SR 1.7:** Strength of password-based authentication
- **SR 1.8:** Public Key Infrastructure (PKI) — RE for SL 3+
- **SR 1.9:** Strength of PKI authentication — RE for SL 3+
- **SR 1.10:** Authenticator feedback
- **SR 1.11:** Unsuccessful login attempts
- **SR 1.12:** System use notification
- **SR 1.13:** Access via untrusted networks

**FR 5 — Restricted Data Flow:**
- **SR 5.1:** Network segmentation
- **SR 5.2:** Zone boundary protection
- **SR 5.3:** General purpose person-to-person communication restrictions
- **SR 5.4:** Application partitioning

**FR 6 — Timely Response to Events:**
- **SR 6.1:** Audit log accessibility
- **SR 6.2:** Continuous monitoring

---

## Security Levels Explained

IEC 62443 uses Security Levels (SL) to describe the required and achieved security posture:

| Level | Protection Against | Capability Required |
|-------|-------------------|-------------------|
| SL 1 | Casual or unintentional violation | Basic cybersecurity hygiene |
| SL 2 | Intentional violation with simple means and general motivation | Intermediate controls |
| SL 3 | Sophisticated intentional violation using IACS-specific knowledge | Advanced controls; applicable to most industrial environments |
| SL 4 | Sophisticated violation using state-sponsored resources | Hardest to achieve; applicable to nation-state threat environments |

**For most OT/ICS assessments:** Clients should target SL 2 for their OT environment baseline, SL 3 for critical systems (historian, SCADA, safety systems). SL 4 is relevant for critical national infrastructure.

**Target SL vs. Achieved SL vs. Capability SL:**
- **Target SL (SL-T):** What the asset owner decides is required based on risk assessment
- **Achieved SL (SL-A):** What the system actually achieves
- **Capability SL (SL-C):** What the product/system can achieve if properly configured

---

## IEC 62443 Gap Assessment Approach

When conducting an IEC 62443-2-1 assessment:

1. **CSMS maturity model:** Evaluate whether a CSMS exists and how mature it is. Many organizations have no formal CSMS — start with policy, risk assessment, and organizational structure.

2. **Zone identification:** Confirm or develop the zone-and-conduit model. Are zones defined? Are zone boundaries enforced?

3. **Target SL determination:** Has the organization defined target security levels for their zones? This is the starting point for SL-T vs SL-A gap analysis.

4. **SR-by-SR assessment:** For each applicable Security Requirement, evaluate current implementation against the target SL. Document evidence.

5. **Compensating controls:** IEC 62443 allows compensating controls to be documented where specific SRs cannot be met. These must be formally documented and approved.

---

## IEC 62443 Certification Context

Organizations may pursue IEC 62443 **certification** through accredited certification bodies. Most assessment engagements are **gap assessments against the standard**, not formal certification assessments. Note this distinction clearly in deliverables.

- **ISA/IEC 62443:** The ISA Security Compliance Institute (ISCI) provides certification against IEC 62443 standards.
- **Component certification:** IEC 62443-4-2 certification for control system components is increasingly required in procurement.
