---
title: "State-Change"
description: "Investigate state-change with source-reported cases, telemetry requirements, model links, and explicit validation limits."
sidebar_label: "State-Change"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# State-Change {#anomaly-state-change}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="anomaly-state-change"></span>

A change to configuration, trust, permissions or exposure that warrants contextual review.

**Telemetry contract:** Before/after state, actor, control-plane audit, object identity and approved change records.

**Candidate method [unvalidated until tested]:** Scope the object and policy; first occurrence is a feature, not a maliciousness verdict.

**Benign alternatives and limits:** Administrative changes can be legitimate, including changes to sensitive objects.

<ResearchFigure id="family-state-change" />

<!-- anomaly-evidence:state-change:start -->
**Evidence tags:** [Identity and access](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-identity) · [Cloud and SaaS](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-cloud) · [Application audit](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-application). **Statistical forms:** [point](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-point), [contextual](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-contextual).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-state-change" target="_self">Browse articles and guides: State-Change</a>.

**Reported incidents and detection interpretations**

## Storm-1283 OAuth-enabled cryptomining {#case-state-change-storm1283-2023}

**Period:** Reported December 2023. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** The actor added credentials and permissions to OAuth applications and used application access for resource deployment. [Microsoft: Threat actors misuse OAuth applications to automate financially driven attacks](https://www.microsoft.com/en-us/security/blog/2023/12/12/threat-actors-misuse-oauth-applications-to-automate-financially-driven-attacks/).

**Anomaly interpretation [inferred]:** Track changes to authentication material and authorization separately from subsequent consumption. Connect the changed application to its first unusual resource operations.

**Telemetry to validate:** Application credential additions, consent/role changes and Azure resource activity.

**Boundary / competing explanation:** Secret rotation and application provisioning are ordinary operations; ownership, approvals and deployment scope determine risk.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1098/" target="_self">T1098 — Account Manipulation</a>; <a href="https://1200km.com/threat-matrix/techniques/T1496/" target="_self">T1496 — Resource Hijacking</a>

## LEMURLOOT in MOVEit data-theft intrusions {#case-state-change-moveit-lemurloot}

**Period:** May–June 2023. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant described LEMURLOOT creating a MOVEit application account with Health Check Service names through database operations. [Mandiant: Zero-Day Vulnerability in MOVEit Transfer Exploited for Data Theft](https://cloud.google.com/blog/topics/threat-intelligence/zero-day-moveit-data-theft).

**Anomaly interpretation [inferred]:** Investigate unauthorized application-account creation and session insertion, correlating database changes with webshell access.

**Telemetry to validate:** MOVEit application/database evidence, web requests and web-root file changes.

**Boundary / competing explanation:** This is not inherently a Windows account. Windows Event 4720 is not the correct expected artifact for this application-database operation.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1505.003/" target="_self">T1505.003 — Server Software Component: Web Shell</a>

**Crosslinks:** [Graph / Relationship](https://1200km.com/anomaly-detection-atlas/families/graph-relationship/#anomaly-graph-relationship) · [Negative Anomaly (Absence)](https://1200km.com/anomaly-detection-atlas/families/negative-absence/#anomaly-negative-absence). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#75-graph-evolution-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-14-from-threat-intelligence-to-detection-a-practitioner-s-guide-2d930b168426/" target="_self">From Threat Intelligence to Detection: A Practitioner’s Guide</a>.
<!-- anomaly-evidence:state-change:end -->

**Illustrative scenarios (not additional incidents):**

- A new trust policy is added to an IAM role, allowing a previously unrelated principal to assume it for the first time.

- An Active Directory group policy or group membership change creates a new path to privileged access for a sensitive server tier.

- A SaaS administrator changes a tenant setting to allow external sharing on a repository that was previously restricted to internal users.

- An IdP admin modifies conditional access or MFA policy for a privileged group, reducing authentication requirements for high-risk accounts.

- A cloud storage bucket that was private is suddenly changed to public or cross-account accessible, materially increasing exposure.

## Apply this analytical view

These are curated conceptual links, not claims that a specific model detected the cited incidents.

**Models:** [Startup or logon configuration changed to launch code](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#autostart-change) · [New or modified system service](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#service-persistence) · [Firewall policy disabled or weakened](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#firewall-impairment) · [New local, domain, cloud, or service account](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#account-creation) · [Credential, group, role, or account-property modification](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#account-manipulation) · [Email forwarding rule created](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#mail-forwarding-rule) · [Compromised software or update installation](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#supply-chain-installation) · [Files, records, or resources deleted or destroyed](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#data-destruction).

**Collection references:** [Active Directory Object Modification](https://1200km.com/ttp-simulation/telemetry/DC0066/) · [User Account Modification](https://1200km.com/ttp-simulation/telemetry/DC0010/) · [Cloud Service Modification](https://1200km.com/ttp-simulation/telemetry/DC0069/) · [Windows Registry Key Modification](https://1200km.com/ttp-simulation/telemetry/DC0063/). These describe data components, not equivalent connectors or guaranteed fields.



## Technique workspaces

Follow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.

- [T1098 Account Manipulation](https://1200km.com/threat-matrix/techniques/T1098/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1098/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1098/) · tools: [Mimikatz](https://1200km.com/ttp-simulation/tools/S0002/)
- [T1496 Resource Hijacking](https://1200km.com/threat-matrix/techniques/T1496/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1496/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1496/)
- [T1505.003 Web Shell](https://1200km.com/threat-matrix/techniques/T1505.003/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1505.003/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1505.003/)
