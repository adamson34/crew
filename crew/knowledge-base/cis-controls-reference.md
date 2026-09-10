# CIS Controls & Benchmarks Reference Guide
# CREW Knowledge Base — Cloud Security Starter Pack

---

## What Are the CIS Controls and CIS Benchmarks

The **Center for Internet Security (CIS)** publishes two related but distinct resources assessors will use constantly in cloud engagements:

- **CIS Critical Security Controls (CIS Controls)** — a prioritized, sector-agnostic set of 18 safeguard categories for defending against the most common attack patterns. Program-level, like NIST CSF, but more prescriptive about specific safeguards.
- **CIS Benchmarks** — configuration hardening standards for specific platforms (AWS, Azure, GCP, Kubernetes, Microsoft 365, Docker, individual OS distributions, and dozens more). Technical and directly testable — the primary reference for cloud configuration review.

**For cloud engagements: use CIS Controls as the program-level framework (comparable to how NIST CSF is used for OT/ICS) and the relevant CIS Benchmark(s) as the technical configuration standard.** This mirrors the CREW pattern already established for NIST CSF + NIST SP 800-82 in the OT/ICS starter pack.

Both are voluntary but widely used as a de facto baseline; CIS Benchmarks are also directly mapped to compliance frameworks (SOC 2, ISO 27001, PCI DSS, HIPAA) via CIS's own crosswalks, making them useful for regulatory-adjacent conversations even when the client's actual obligation is a different framework.

---

## CIS Controls v8 — 18 Control Categories

| # | Control | Cloud Relevance |
|---|---------|------------------|
| 1 | Inventory and Control of Enterprise Assets | Cloud resource inventory across accounts/subscriptions/projects |
| 2 | Inventory and Control of Software Assets | SaaS and approved-service inventory; shadow IT detection |
| 3 | Data Protection | Encryption at rest/in transit, data classification, public exposure prevention |
| 4 | Secure Configuration of Enterprise Assets and Software | Direct mapping to CIS Benchmarks for cloud platforms |
| 5 | Account Management | IAM user/role lifecycle, service account management |
| 6 | Access Control Management | Least privilege, role-based access, privileged access management |
| 7 | Continuous Vulnerability Management | Workload/container image scanning, dependency scanning |
| 8 | Audit Log Management | CloudTrail / Azure Activity Log / GCP Audit Logs — centralization and retention |
| 9 | Email and Web Browser Protections | Primarily SaaS/endpoint scope; relevant for M365/Google Workspace engagements |
| 10 | Malware Defenses | Workload/endpoint scope; less central to pure infrastructure cloud assessments |
| 11 | Data Recovery | Backup configuration, cross-region/cross-account backup isolation |
| 12 | Network Infrastructure Management | VPC/VNet architecture, security groups/NSGs, peering |
| 13 | Network Monitoring and Defense | VPC Flow Logs, GuardDuty/Defender for Cloud/Security Command Center equivalents |
| 14 | Security Awareness and Skills Training | Program-level; cloud-specific training for engineering teams |
| 15 | Service Provider Management | Third-party SaaS and sub-processor risk — highly relevant for cloud supply chain |
| 16 | Application Software Security | SDLC security for cloud-native and serverless applications |
| 17 | Incident Response Management | Cloud-specific IR playbooks (credential compromise, account takeover) |
| 18 | Penetration Testing | Cloud penetration testing — must account for provider rules of engagement |

**Implementation Groups (IG1/IG2/IG3):** CIS Controls define three implementation groups by organizational risk profile and resource maturity. IG1 (basic cyber hygiene) is the floor for every organization; IG2 and IG3 add safeguards for organizations with more sensitive data or more sophisticated threat exposure. Confirm which IG level applies to the client's risk profile before scoring maturity against the full control set.

---

## CIS Benchmarks — Common Cloud Platform Coverage

| Benchmark | Scope | Common High-Value Checks |
|-----------|-------|----------------------------|
| CIS AWS Foundations Benchmark | Account-level AWS configuration | Root account MFA and no active access keys, CloudTrail enabled in all regions, S3 public access block, IAM password policy, no wildcard IAM policies |
| CIS Microsoft Azure Foundations Benchmark | Subscription/tenant-level Azure configuration | MFA for privileged roles, Azure Defender/Defender for Cloud enabled, NSG logging, storage account public access disabled |
| CIS Google Cloud Platform Foundation Benchmark | Project/organization-level GCP configuration | Org policy constraints, service account key rotation, VPC Flow Logs enabled, Cloud Audit Logging configuration |
| CIS Kubernetes Benchmark | Cluster configuration | API server flags, RBAC configuration, network policy enforcement, etcd encryption |
| CIS Docker Benchmark | Container runtime configuration | Host hardening, image provenance, container runtime privilege restrictions |
| CIS Microsoft 365 Foundations Benchmark | M365 tenant configuration | Conditional access policies, mailbox auditing, external sharing restrictions |

**Scoring levels within each benchmark:**
- **Level 1:** Practical, minimizes operational friction — recommended baseline for all organizations
- **Level 2:** More restrictive, may impact functionality — recommended for higher-security environments (regulated data, high-value targets)

Document which level the client is being assessed against; do not silently apply Level 2 expectations to an organization that has only committed to Level 1.

---

## Using CIS Controls/Benchmarks for Cloud Assessment

**CIS Benchmarks are particularly useful for:**
1. **Configuration-level findings** — most CIS Benchmark checks map directly and unambiguously to a pass/fail technical check, which is ideal for building a findings register with clear evidence
2. **Automated baseline scanning** — most CSPM tools (native and third-party) score against CIS Benchmarks out of the box, giving a fast initial posture read that the assessor then validates and contextualizes
3. **Compliance crosswalk conversations** — CIS's own mappings to SOC 2, ISO 27001, and PCI DSS let the compliance analyst translate a CIS finding into "this is also a SOC 2 CC6.1 gap" without a separate research cycle

**CIS Controls (the 18-category framework) are particularly useful for:**
1. **Program maturity narrative** — similar role to NIST CSF functions in the OT/ICS pack; useful for executive-level "where are we, where should we be" conversations
2. **Prioritization** — CIS explicitly designs the control order around attack pattern prevalence, which supports remediation roadmap prioritization language

---

## CIS Benchmarks vs. Cloud Provider Well-Architected Frameworks

**CIS Benchmarks** are prescriptive, checklist-style, and vendor-neutral in methodology (though platform-specific in content) — they tell you *whether a specific setting is configured securely*.

**Provider Well-Architected Frameworks** (AWS Well-Architected, Azure Well-Architected Framework, Google Cloud Architecture Framework) are broader design guidance covering security as one of several pillars (alongside reliability, cost, performance, operational excellence) — they tell you *whether the overall architecture follows the provider's recommended patterns*.

For CREW engagements: use **CIS Benchmarks as the primary technical assessment standard** (specific, testable, evidence-friendly) and reference the relevant **Well-Architected Framework security pillar** when a finding is architectural rather than a single misconfigured setting (e.g., "no multi-account isolation strategy" is a Well-Architected-level finding, not a single CIS Benchmark check).
