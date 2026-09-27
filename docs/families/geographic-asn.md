---
title: "Geographic / ASN"
description: "Investigate geographic / asn with source-reported cases, telemetry requirements, model links, and explicit validation limits."
sidebar_label: "Geographic / ASN"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Geographic / ASN {#anomaly-geographic-asn}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="anomaly-geographic-asn"></span>

A change in the network/location context associated with an identity.

**Telemetry contract:** Sign-in/VPN records, device context and versioned IP/ASN/geolocation enrichment.

**Candidate method [unvalidated until tested]:** Compare the account and device history; treat geolocation as uncertain and account for VPN/proxy egress.

**Benign alternatives and limits:** Mobile networks, privacy relays, travel and shared egress can create apparent impossible travel.

<ResearchFigure id="family-geographic-asn" />

<!-- anomaly-evidence:geographic-asn:start -->
**Evidence tags:** [Identity and access](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-identity) · [Network telemetry](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-network) · [Cloud and SaaS](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-cloud). **Statistical forms:** [contextual](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-contextual).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-geographic-asn" target="_self">Browse articles and guides: Geographic / ASN</a>.

**Reported incidents and detection interpretations**

## UNC5537 and Snowflake customer data theft {#case-geographic-asn-unc5537-snowflake-2024}

**Period:** 2024. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant observed VPN-origin access and separate VPS infrastructure associated with exfiltration in the Snowflake customer campaign. [Mandiant: UNC5537 Targets Snowflake Customer Instances for Data Theft and Extortion](https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion).

**Anomaly interpretation [inferred]:** Compare source networks with each account's approved access paths and subsequent queries. ASN category is context, not an identity or maliciousness verdict.

**Telemetry to validate:** Snowflake login history, timestamped IP/ASN enrichment, query history and destination ownership.

**Boundary / competing explanation:** VPNs are common legitimate infrastructure. Neither a country nor an ASN identifies the human operator.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1078.004/" target="_self">T1078.004 — Valid Accounts: Cloud Accounts</a>

## [Midnight Blizzard](https://1200km.com/threat-matrix/actors/G0016/) compromise of Microsoft {#case-geographic-asn-midnight-blizzard-2024}

**Period:** Reported January 2024. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** [Midnight Blizzard](https://1200km.com/threat-matrix/actors/G0016/) used residential proxies also used by legitimate customers, reducing the usefulness of static IP indicators. [Microsoft: Midnight Blizzard: Guidance for responders on nation-state attack](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/).

**Anomaly interpretation [inferred]:** Evaluate unfamiliar sign-in properties and source diversity alongside the account's behavior. Residential-looking traffic can conceal an intrusion.

**Telemetry to validate:** Historical sign-in properties, IP/ASN observations, device and application context.

**Boundary / competing explanation:** Impossible-travel logic is vulnerable to VPN and proxy artifacts; no fixed travel threshold is asserted here.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1110.003/" target="_self">T1110.003 — Brute Force: Password Spraying</a>

**Crosslinks:** [Frequency / Rate](https://1200km.com/anomaly-detection-atlas/families/frequency-rate/#anomaly-frequency-rate) · [Identity / Access](https://1200km.com/anomaly-detection-atlas/families/identity-access/#anomaly-identity-access). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#80-spatial-context-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-22-detecting-malicious-insider-activity-a-technical-detection-engineering-guide-3c3b41e95e82/" target="_self">Detecting Malicious Insider Activity: A Technical Detection Engineering Guide</a>.
<!-- anomaly-evidence:geographic-asn:end -->

**Illustrative scenarios (not additional incidents):**

- A user who has only ever logged in from Israel suddenly authenticates to Microsoft 365 from Vietnam and then accesses sensitive SharePoint content minutes later.

- An administrator signs in from a residential ISP in the morning and then appears from a cloud-hosting ASN in another country 25 minutes later, triggering impossible-travel logic.

- A service account that normally uses one fixed corporate VPN egress suddenly accesses the cloud console from a consumer mobile network ASN.

- A SaaS account with a stable history of logins from one city begins showing repeated access from multiple distant countries over two days.

- A privileged user who normally connects only through a known enterprise VPN starts logging in from a newly observed anonymization provider or VPS-hosting ASN.

## Apply this analytical view

These are curated conceptual links, not claims that a specific model detected the cited incidents.

**Models:** [Valid credentials used from an unexpected context](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#valid-account-abuse) · [External remote-service session](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#external-remote-session).

**Collection references:** [User Account Authentication](https://1200km.com/ttp-simulation/telemetry/DC0002/) · [Logon Session Metadata](https://1200km.com/ttp-simulation/telemetry/DC0088/) · [Network Traffic Flow](https://1200km.com/ttp-simulation/telemetry/DC0078/). These describe data components, not equivalent connectors or guaranteed fields.



## Technique workspaces

Follow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.

- [T1078.004 Cloud Accounts](https://1200km.com/threat-matrix/techniques/T1078.004/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1078.004/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1078.004/) · tools: [Pacu](https://1200km.com/ttp-simulation/tools/S1091/), [Peirates](https://1200km.com/ttp-simulation/tools/S0683/), [ROADTools](https://1200km.com/ttp-simulation/tools/S0684/)
- [T1110.003 Password Spraying](https://1200km.com/threat-matrix/techniques/T1110.003/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1110.003/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1110.003/) · tools: [CrackMapExec](https://1200km.com/ttp-simulation/tools/S0488/), [MailSniper](https://1200km.com/ttp-simulation/tools/S0413/)
