---
title: "Identity / Access"
description: "Investigate identity / access with source-reported cases, telemetry requirements, model links, and explicit validation limits."
sidebar_label: "Identity / Access"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Identity / Access {#anomaly-identity-access}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="anomaly-identity-access"></span>

An unexpected authentication property, permission or identity relationship.

**Telemetry contract:** IdP, factor lifecycle, consent, token-validation and workload audit data where available.

**Candidate method [unvalidated until tested]:** Separate observed state changes, provider risk detections and inferred anomaly features.

**Benign alternatives and limits:** Recovery, legitimate consent, role changes and delegated administration require investigation context.

<ResearchFigure id="family-identity-access" />

<!-- anomaly-evidence:identity-access:start -->
**Evidence tags:** [Identity and access](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-identity) · [Cloud and SaaS](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-cloud). **Statistical forms:** [contextual](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-contextual), [collective](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-identity-access" target="_self">Browse articles and guides: Identity / Access</a>.

**Reported incidents and detection interpretations**

## UNC3944 help-desk compromise and SaaS data theft {#case-identity-access-unc3944-saas}

**Period:** 2023–2024 investigations reported June 2024. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** UNC3944 persuaded help desks to change MFA controls and used compromised privileged identities to reach protected applications. [Mandiant: UNC3944 Targets SaaS Applications](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications/).

**Anomaly interpretation [inferred]:** Prioritize factor changes followed by unfamiliar access, accounting for the support ticket and strength of identity verification.

**Telemetry to validate:** IdP factor lifecycle, device enrollment, sign-ins, application assignments and support records.

**Boundary / competing explanation:** Legitimate device replacement produces similar events; a reset alone does not establish an account takeover.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1098.005/" target="_self">T1098.005 — Account Manipulation: Device Registration</a>

## Storm-0558 forged-token mailbox access {#case-identity-access-storm0558-2023}

**Period:** 2023. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Storm-0558 used an acquired Microsoft consumer signing key to forge tokens accepted for enterprise mailbox access. [Microsoft: Microsoft mitigates China-based threat actor Storm-0558 targeting of customer email](https://www.microsoft.com/en-us/msrc/blog/2023/07/microsoft-mitigates-china-based-threat-actor-storm-0558-targeting-of-customer-email).

**Anomaly interpretation [inferred]:** Correlate mailbox access with identity and token context. Absence of an expected tenant sign-in can be a lead, not proof of token forgery.

**Telemetry to validate:** Mailbox-access audit, application/session context and provider-side token-validation evidence where available.

**Boundary / competing explanation:** The key was acquired, not forged. Tenant logs do not necessarily expose the token material or all provider validation decisions.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1550.001/" target="_self">T1550.001 — Use Alternate Authentication Material: Application Access Token</a>

**Crosslinks:** [Sequence](https://1200km.com/anomaly-detection-atlas/families/sequence/#anomaly-sequence) · [Graph / Relationship](https://1200km.com/anomaly-detection-atlas/families/graph-relationship/#anomaly-graph-relationship). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#3-contextual-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-22-detecting-malicious-insider-activity-a-technical-detection-engineering-guide-3c3b41e95e82/" target="_self">Detecting Malicious Insider Activity: A Technical Detection Engineering Guide</a>.
<!-- anomaly-evidence:identity-access:end -->

**Illustrative scenarios (not additional incidents):**

- A user who normally authenticates with MFA suddenly registers a new authentication factor and then performs privileged actions within the same session.

- An employee account that has never approved third-party apps grants OAuth consent to a new application requesting mail read, file access, and offline token permissions.

- A service principal starts authenticating to new resources or from new workload infrastructure outside its historical pattern. Distinguish application-only token flows from delegated-user refresh-token behavior.

- A privileged admin account that normally signs in with one managed device starts authenticating with a new device and a newly enrolled MFA method on the same day.

- A user with stable sign-in behavior suddenly shows unusual token reuse across multiple applications or sessions inconsistent with their normal access pattern.

## Apply this analytical view

These are curated conceptual links, not claims that a specific model detected the cited incidents.

**Models:** [Valid credentials used from an unexpected context](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#valid-account-abuse) · [New local, domain, cloud, or service account](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#account-creation) · [Credential, group, role, or account-property modification](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#account-manipulation) · [Email forwarding rule created](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#mail-forwarding-rule) · [Cloud secrets, keys, or tokens retrieved](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#secret-retrieval) · [Low-volume failures distributed across many accounts](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#password-spraying).

**Collection references:** [User Account Authentication](https://1200km.com/ttp-simulation/telemetry/DC0002/) · [User Account Modification](https://1200km.com/ttp-simulation/telemetry/DC0010/) · [Web Credential Usage](https://1200km.com/ttp-simulation/telemetry/DC0007/). These describe data components, not equivalent connectors or guaranteed fields.



## Technique workspaces

Follow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.

- [T1098.005 Device Registration](https://1200km.com/threat-matrix/techniques/T1098.005/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1098.005/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1098.005/) · tools: [AADInternals](https://1200km.com/ttp-simulation/tools/S0677/)
- [T1550.001 Application Access Token](https://1200km.com/threat-matrix/techniques/T1550.001/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1550.001/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1550.001/) · tools: [Peirates](https://1200km.com/ttp-simulation/tools/S0683/)
