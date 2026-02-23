# Step 05: Data Request List

**Agent:** Dana Reeves (PM) with Jake Tanaka (Assessor)
**Input:** Approved SOW, framework selection (if available), engagement vertical
**Output:** Structured data request list for client submission

---

## Objective

Produce a prioritized, organized data request list that:
1. Tells the client exactly what documentation and access we need
2. Groups requests logically to minimize client coordination burden
3. Distinguishes required items from preferred/optional items
4. Sets a clear submission deadline

---

## Instructions

You are Dana Reeves coordinating with Jake Tanaka. The data request is sent to the client before or at kickoff. An incomplete or disorganized data request wastes time for both parties. Be specific — "network diagrams" is not specific; "network topology diagrams for OT/ICS zones including DMZ, control network, and process network, as-built if available" is specific.

Tailor the request to the engagement scope and vertical. For an OT/ICS engagement, use the categories below. Remove categories not applicable to the scope.

---

## Data Request Categories

### Category 1: Network Architecture and Topology
| # | Item | Priority | Notes |
|---|------|----------|-------|
| 1.1 | OT/ICS network topology diagrams (as-built preferred, current design acceptable) | Required | Include all zones: control network, process network, DMZ, corporate/IT connection points |
| 1.2 | Firewall rulesets for OT/ICS network boundaries | Required | Include IT/OT boundary firewall, DMZ firewalls |
| 1.3 | Network segmentation documentation | Required | Zone definitions, VLAN assignments |
| 1.4 | Remote access architecture documentation | Required | VPN configs, jump host design, vendor remote access methods |
| 1.5 | Wireless network documentation | Preferred | SSIDs, encryption, access controls |

### Category 2: Asset Inventory
| # | Item | Priority | Notes |
|---|------|----------|-------|
| 2.1 | OT/ICS asset inventory (PLCs, RTUs, HMIs, historians, engineering workstations) | Required | Include make, model, firmware version if available |
| 2.2 | SCADA/DCS system inventory | Required | Application versions, server OS versions |
| 2.3 | Vendor/third-party systems inventory | Preferred | Any vendor-managed or vendor-accessed systems |

### Category 3: Policies and Procedures
| # | Item | Priority | Notes |
|---|------|----------|-------|
| 3.1 | OT cybersecurity policy | Required | Or IT security policy if no OT-specific policy exists |
| 3.2 | Patch management procedure | Required | OT-specific if available |
| 3.3 | Change management procedure | Required | |
| 3.4 | Incident response plan | Required | OT-specific or general IRP |
| 3.5 | Acceptable use policy | Preferred | |
| 3.6 | Vendor/third-party access management procedure | Preferred | |
| 3.7 | Business continuity / disaster recovery plan | Preferred | OT-relevant sections |

### Category 4: Identity and Access Management
| # | Item | Priority | Notes |
|---|------|----------|-------|
| 4.1 | User account management procedures | Required | |
| 4.2 | Privileged access management documentation | Required | Admin account controls |
| 4.3 | Active Directory or OT identity store structure | Preferred | |
| 4.4 | Multi-factor authentication documentation | Preferred | What MFA is used, where applied |

### Category 5: Monitoring and Detection
| # | Item | Priority | Notes |
|---|------|----------|-------|
| 5.1 | OT security monitoring solution documentation | Required | What tools are in place (if any) |
| 5.2 | Log management and SIEM documentation | Preferred | What logs are collected, retention period |
| 5.3 | Security incident log (past 12 months) | Preferred | Anonymized or summarized acceptable |

### Category 6: Prior Assessments and Audit Results
| # | Item | Priority | Notes |
|---|------|----------|-------|
| 6.1 | Prior OT/ICS security assessments (past 3 years) | Required | Including any open remediation items |
| 6.2 | NERC CIP audit results (if applicable) | Required | Self-certifications, audit findings |
| 6.3 | Vulnerability scan results (past 12 months) | Preferred | OT-specific scan results |
| 6.4 | Penetration test results (past 3 years) | Optional | If previously conducted |

### Category 7: Personnel and Training
| # | Item | Priority | Notes |
|---|------|----------|-------|
| 7.1 | OT security team org chart and staffing | Preferred | Roles and responsibilities |
| 7.2 | Security awareness training records | Preferred | Completion rates, OT-specific training |
| 7.3 | List of key personnel for interviews | Required | OT engineers, IT/security staff, operations leadership |

---

## Cover Note Template

```
Subject: {{engagement_name}} — Data Request for Assessment

Dear [Client Contact],

As we prepare for the [engagement type] engagement commencing [start date], please find below our initial data request. This documentation will help our team understand your current environment and prepare for our assessment activities.

**Submission Deadline:** [Date — typically 5 business days before assessment start]
**Submission Method:** [Secure portal link / Encrypted email / SharePoint — specify]

Items marked "Required" are essential to completing the assessment as scoped. "Preferred" items improve assessment depth and accuracy. "Optional" items are useful where available but will not block assessment execution.

If any item does not exist, is unavailable, or is restricted, please let us know so we can adjust our approach accordingly.

We look forward to a productive engagement. Please reach out with any questions.

[PM Name]
[Contact Information]
```
