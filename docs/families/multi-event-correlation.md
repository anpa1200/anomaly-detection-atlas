---
title: "Multi-Event Correlation"
description: "Investigate multi-event correlation with source-reported cases, telemetry requirements, model links, and explicit validation limits."
sidebar_label: "Multi-Event Correlation"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Multi-Event Correlation {#anomaly-multi-event-correlation}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="anomaly-multi-event-correlation"></span>

A composition method joining related evidence, not a fifteenth independent statistical family.

**Telemetry contract:** Cross-source events with reliable tenant, identity, asset, session and time keys.

**Candidate method [unvalidated until tested]:** Specify equality keys and temporal constraints; measure the recall cost of each added gate.

**Benign alternatives and limits:** Unrelated events, duplicate observations and correlated models can inflate confidence without adding independent evidence.

<ResearchFigure id="family-multi-event-correlation" />

<!-- anomaly-evidence:multi-event-correlation:start -->
**Evidence tags:** [Identity and access](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-identity) · [Endpoint telemetry](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-endpoint) · [Cloud and SaaS](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-cloud). **Statistical forms:** [collective](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-collective), [contextual](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-contextual).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-multi-event-correlation" target="_self">Browse articles and guides: Multi-Event Correlation</a>.

**Reported incidents and detection interpretations**

## UNC3944 help-desk compromise and SaaS data theft {#case-multi-event-correlation-unc3944-saas}

**Period:** 2023–2024 investigations reported June 2024. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant reported identity manipulation, privileged SaaS access and cloud connector use for data theft across UNC3944 investigations. [Mandiant: UNC3944 Targets SaaS Applications](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications/).

**Anomaly interpretation [inferred]:** Join identity-control changes to application sessions and connector transfers where entity and timestamp evidence supports the link. Correlation combines signal families; ordered sequence analysis is one possible component.

**Telemetry to validate:** Support records, IdP factor events, application sessions, connector jobs and destination ownership.

**Boundary / competing explanation:** A campaign synthesis is not one victim's complete timeline. Do not merge unrelated users or tenants because their events share a time window.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1098.005/" target="_self">T1098.005 — Account Manipulation: Device Registration</a>; <a href="https://1200km.com/threat-matrix/techniques/T1567.002/" target="_self">T1567.002 — Exfiltration Over Web Service: Exfiltration to Cloud Storage</a>

## BazarCall to Conti intrusion {#case-multi-event-correlation-bazarcall-conti}

**Period:** 2021 case reported on 1 August. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** The DFIR Report documented an intrusion progressing from initial execution through discovery and lateral activity to Conti ransomware deployment. [The DFIR Report: BazarCall to Conti Ransomware via Trickbot and Cobalt Strike](https://thedfirreport.com/2021/08/01/bazarcall-to-conti-ransomware-via-trickbot-and-cobalt-strike/).

**Anomaly interpretation [inferred]:** Correlate endpoint execution, discovery and remote-service activity using stable host and account identifiers. Evaluate the linked evidence, not an uncalibrated sum of anomaly scores.

**Telemetry to validate:** Process trees, authenticated sessions, service events and network connections, with collection delays recorded.

**Boundary / competing explanation:** Two alerts generated from the same event are not independent corroboration. Missing sensors can break the join without making the behavior benign.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1087.002/" target="_self">T1087.002 — Account Discovery: Domain Account</a>

**Crosslinks:** [Sequence](https://1200km.com/anomaly-detection-atlas/families/sequence/#anomaly-sequence) · [State-Change](https://1200km.com/anomaly-detection-atlas/families/state-change/#anomaly-state-change) · [Data Movement](https://1200km.com/anomaly-detection-atlas/families/data-movement/#anomaly-data-movement). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#48-multivariate-combination-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-14-from-threat-intelligence-to-detection-a-practitioner-s-guide-2d930b168426/" target="_self">From Threat Intelligence to Detection: A Practitioner’s Guide</a>.
<!-- anomaly-evidence:multi-event-correlation:end -->

**Illustrative scenarios (not additional incidents):**

- A user shows a new login location, registers a new MFA factor, and then downloads an unusually large number of files in the same session.

- A workstation triggers a rare parent-child process chain, connects to a newly observed external domain, and then starts compressing many files within 20 minutes.

- A cloud admin account performs a first-time role assumption, changes bucket permissions, and initiates bulk object access shortly afterward.

- A mailbox account creates a forwarding rule, shows unusual sign-in properties, and then performs repeated message access and deletion activity.

- A server begins executing a rare binary, stops sending normal EDR heartbeats, and then generates abnormal outbound traffic to an external IP.

## Apply this analytical view

These are curated conceptual links, not claims that a specific model detected the cited incidents.

**Models:** [User opens delivered content followed by execution](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#phishing-execution-sequence) · [Process injection or in-memory execution](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#process-injection) · [Tool or payload transferred internally](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#lateral-tool-transfer) · [Unusual service-ticket requests](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#kerberoasting) · [Encoded, packed, or obfuscated content](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#obfuscated-content).

**Collection references:** [Process Creation](https://1200km.com/ttp-simulation/telemetry/DC0032/) · [Logon Session Creation](https://1200km.com/ttp-simulation/telemetry/DC0067/) · [Application Log Content](https://1200km.com/ttp-simulation/telemetry/DC0038/). These describe data components, not equivalent connectors or guaranteed fields.



## Technique workspaces

Follow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.

- [T1098.005 Device Registration](https://1200km.com/threat-matrix/techniques/T1098.005/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1098.005/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1098.005/) · tools: [AADInternals](https://1200km.com/ttp-simulation/tools/S0677/)
- [T1567.002 Exfiltration to Cloud Storage](https://1200km.com/threat-matrix/techniques/T1567.002/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1567.002/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1567.002/) · tools: [Empire](https://1200km.com/ttp-simulation/tools/S0363/), [Rclone](https://1200km.com/ttp-simulation/tools/S1040/)
- [T1087.002 Domain Account](https://1200km.com/threat-matrix/techniques/T1087.002/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1087.002/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1087.002/) · tools: [AdFind](https://1200km.com/ttp-simulation/tools/S0552/), [BloodHound](https://1200km.com/ttp-simulation/tools/S0521/), [Brute Ratel C4](https://1200km.com/ttp-simulation/tools/S1063/)
