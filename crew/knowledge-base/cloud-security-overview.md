# Cloud Security Overview
# CREW Knowledge Base — Starter Pack: Cloud Security

---

## What Is Cloud Security

**Cloud security** is the discipline of securing workloads, data, and identities hosted on public, private, or hybrid cloud infrastructure — most commonly AWS, Microsoft Azure, and Google Cloud Platform (GCP), plus SaaS platforms layered on top of them.

Unlike traditional on-premises security, cloud security is defined by a **shared responsibility model**: the cloud provider secures the infrastructure *of* the cloud, while the customer secures what they put *in* the cloud (identities, data, configuration, workload code). Nearly every major cloud breach traces back to a failure on the customer side of that line — misconfiguration, over-permissioned identities, or exposed data — not a failure by the provider.

---

## The Shared Responsibility Model

Responsibility split shifts depending on service model. Assessors should identify which model(s) are in use before evaluating controls — the same finding ("no patching cadence") may be a customer responsibility in IaaS and a provider responsibility in SaaS.

| Layer | IaaS (e.g., EC2, Azure VMs, GCE) | PaaS (e.g., RDS, App Service, Cloud Run) | SaaS (e.g., Microsoft 365, Salesforce) |
|-------|-----------------------------------|-------------------------------------------|-------------------------------------------|
| Data & access policy | Customer | Customer | Customer |
| Identity & access management | Customer | Customer | Customer (tenant-level) |
| Application / workload | Customer | Customer | Provider |
| Runtime / middleware | Customer | Provider | Provider |
| Operating system | Customer | Provider | Provider |
| Network controls | Customer (in-VPC) | Shared | Provider |
| Physical / hypervisor / hardware | Provider | Provider | Provider |

**Key segmentation principle:** Identity is the new perimeter. In cloud environments, network segmentation still matters, but the majority of exploitable paths run through over-permissioned IAM roles, exposed credentials, and public-by-default resources — not network boundary crossings.

---

## Cloud-Native Architecture Concepts

- **Account/subscription/project boundary:** The primary isolation unit (AWS Account, Azure Subscription, GCP Project). Assessors should map the organization's account structure before anything else — a flat single-account sprawl is itself a finding.
- **IAM (Identity and Access Management):** Roles, policies, and trust relationships governing who/what can do what. Includes human identities, service accounts, and workload identities (e.g., AWS IAM roles for EC2/Lambda, Azure Managed Identities, GCP Service Accounts).
- **Landing zone / management account structure:** Multi-account governance pattern (AWS Organizations + Control Tower, Azure Management Groups, GCP Resource Hierarchy) used to apply guardrails centrally.
- **Infrastructure as Code (IaC):** Terraform, CloudFormation, ARM/Bicep, Pulumi. Misconfigurations baked into IaC templates propagate at scale — a single insecure module can create hundreds of vulnerable resources.
- **Shared VPC / peering / transit gateway:** Network connectivity patterns between accounts/projects — misconfigured peering is a common lateral movement path.

---

## Why Cloud Security Is Different From Traditional IT Security

| Factor | Traditional/On-Prem | Cloud |
|--------|---------------------|-------|
| **Perimeter** | Network boundary (firewall, DMZ) | Identity and configuration boundary |
| **Provisioning** | Manual, change-controlled, slow | API-driven, automated, can happen in seconds — including by mistake |
| **Visibility** | Centralized on-prem tooling | Fragmented across provider consoles, APIs, and third-party CSPM tools |
| **Default posture** | Often deny-by-default (physical access required) | Frequently allow-by-default (public S3/blob, 0.0.0.0/0 security groups) unless explicitly restricted |
| **Blast radius of a single mistake** | Usually contained to one system | A single leaked credential or misconfigured IAM trust can compromise an entire account/organization |
| **Asset lifecycle** | Long-lived, inventoried hardware | Ephemeral — resources are created and destroyed continuously; point-in-time inventory is often stale |
| **Shared responsibility clarity** | N/A — customer owns everything | Must be explicitly understood per service; a common source of "assumed someone else covers it" gaps |

---

## Common Cloud Attack Vectors

### 1. Exposed Credentials and Secrets
Hardcoded API keys, access keys committed to source control, or credentials embedded in IaC/CI pipeline configuration are consistently among the fastest paths to full account compromise.
- **Assessment focus:** Secret scanning in repos and CI logs, credential rotation policy, use of a secrets manager vs. hardcoded values

### 2. Over-Permissioned IAM
Roles and policies granting broader access than the workload requires — wildcard actions/resources (`"Action": "*"`, `"Resource": "*"`), unused admin roles, and long-lived access keys on human users instead of federated/short-lived credentials.
- **Assessment focus:** IAM policy review for wildcards, unused permissions (access advisor / IAM Access Analyzer equivalents), MFA enforcement on privileged accounts

### 3. Publicly Exposed Storage and Services
Object storage (S3 buckets, Azure Blob containers, GCS buckets) or databases left publicly accessible, often due to a misunderstood default or a deliberate-but-undocumented exception that was never reverted.
- **Assessment focus:** Public access block settings, bucket/container ACLs and policies, database public endpoint exposure

### 4. Misconfigured Network Boundaries
Security groups/NSGs allowing inbound access from 0.0.0.0/0 on sensitive ports (SSH, RDP, database ports), flat VPC architectures with no segmentation between tiers or environments (prod/non-prod).
- **Assessment focus:** Security group and NSG rule review, VPC/subnet architecture, environment segregation

### 5. Insecure CI/CD Pipelines
Pipeline service accounts with broad cloud permissions, unreviewed third-party GitHub Actions/pipeline plugins, and secrets accessible to any pipeline stage rather than scoped per job.
- **Assessment focus:** Pipeline identity permission scope, secret injection method, third-party action/plugin vetting

### 6. Identity Federation and Trust Relationship Abuse
Overly permissive cross-account trust policies or misconfigured OIDC/SAML federation that allows an attacker who compromises one account or identity provider to assume roles in another.
- **Assessment focus:** Trust policy conditions (external ID, source account restrictions), federation configuration review

---

## Common Cloud Vulnerabilities

| Vulnerability Class | Prevalence | Typical Root Cause |
|---------------------|-----------|---------------------|
| Publicly exposed storage | High | Default settings misunderstood, "temporary" exception never reverted |
| Over-permissioned IAM roles/policies | Very high | Convenience during initial build-out; permissions rarely right-sized afterward |
| Long-lived access keys on human users | High | Legacy habits carried over from on-prem service accounts |
| No MFA on privileged/root accounts | Medium-High | Root/owner accounts treated as "break glass only" and neglected |
| Unencrypted data at rest or in transit | Medium | Encryption available but not enabled by default in all services |
| Missing or fragmented logging (CloudTrail/Activity Log/Audit Logs) | High | Logging enabled per-account but not centralized or retained long enough |
| Insecure IaC modules reused at scale | Medium-High | Shared modules copied without security review; one flaw replicates broadly |
| No tagging/ownership on resources | High | Ownership drift as teams create resources ad hoc; complicates incident response and cost/risk attribution |
| Shadow IT / unsanctioned SaaS or cloud accounts | Medium | Business units provisioning outside central governance |

---

## Key Cloud-Targeted Incidents

| Incident | Year | Vector | Impact |
|---------|------|--------|--------|
| Capital One | 2019 | SSRF against misconfigured WAF role → over-permissioned IAM role → S3 access | 100M+ customer records exposed |
| Uber (2016 breach, disclosed 2017) | 2016 | Credentials in private GitHub repo → AWS access | 57M user/driver records exposed |
| Codecov supply chain | 2021 | CI script tampering → exfiltrated CI secrets across customer environments | Downstream secret exposure at numerous customers |
| Microsoft Storm-0558 | 2023 | Stolen signing key → forged authentication tokens | Access to Exchange Online mailboxes of government agencies |
| MOVEit / Cl0p campaign | 2023 | SQL injection in SaaS-hosted file transfer product | Data exposure across hundreds of downstream customers |

---

## Cloud Security Assessment Approach Principles

1. **Identity first:** Start with IAM — who and what can do what, across every account/subscription/project in scope. Network review comes after, not before.

2. **Configuration over code, most of the time:** Most cloud findings are configuration gaps (public buckets, open security groups, missing MFA), not application vulnerabilities. Prioritize CSPM-style configuration review before source-level testing unless the engagement is explicitly scoped as an application security assessment.

3. **Multi-account/multi-cloud reality:** Assume sprawl. Confirm the full account/subscription/project inventory with the client rather than trusting a provided list — shadow accounts are common and are themselves a finding.

4. **Least privilege is aspirational, not assumed:** Treat every "this role needs broad access" justification as a hypothesis to verify, not a fact. Cross-check against actual usage where access-analysis tooling is available.

5. **Shared responsibility must be explicit:** For every finding, confirm whether the control in question is actually the customer's responsibility under the specific service model in use — do not flag a provider-managed control as a customer gap.

6. **Blast radius framing:** Rate findings partly on blast radius — a misconfiguration in a single dev S3 bucket is not equivalent to an over-permissioned role trusted by the entire organization's identity provider. Document the realistic scope of compromise, not just the technical gap.
