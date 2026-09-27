---
title: "Data Movement"
description: "Investigate data movement with source-reported cases, telemetry requirements, model links, and explicit validation limits."
sidebar_label: "Data Movement"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Data Movement {#anomaly-data-movement}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="anomaly-data-movement"></span>

Unexpected access, export, copy or synchronization involving a source and destination.

**Telemetry contract:** Application/storage audit, destination account, object sensitivity and transfer counters where available.

**Candidate method [unvalidated until tested]:** Keep event counts, distinct objects, bytes and records separate; evaluate destination and authorization context.

**Benign alternatives and limits:** Approved export, backup, migration and collaboration can resemble exfiltration.

<ResearchFigure id="family-data-movement" />

<!-- anomaly-evidence:data-movement:start -->
**Evidence tags:** [Cloud and SaaS](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-cloud) · [Identity and access](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-identity). **Statistical forms:** [contextual](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-contextual), [collective](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-data-movement" target="_self">Browse articles and guides: Data Movement</a>.

**Reported incidents and detection interpretations**

## UNC5537 and Snowflake customer data theft {#case-data-movement-unc5537-snowflake-2024}

**Period:** 2024. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** The campaign moved stolen database content out of customer environments and used external hosting or storage infrastructure. [Mandiant: UNC5537 Targets Snowflake Customer Instances for Data Theft and Extortion](https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion).

**Anomaly interpretation [inferred]:** Compare source data, export operation and destination ownership with normal business flows. An authorized account can execute an unauthorized transfer.

**Telemetry to validate:** Database queries, export commands, storage destinations and identity-to-session correlation.

**Boundary / competing explanation:** A dataset's sensitivity and the destination's authorization must come from customer context, not its public hostname alone.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1078.004/" target="_self">T1078.004 — Valid Accounts: Cloud Accounts</a>

## UNC3944 help-desk compromise and SaaS data theft {#case-data-movement-unc3944-saas}

**Period:** 2023–2024 investigations reported June 2024. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant obtained victim Airbyte logs and described Airbyte/Fivetran transfers from SaaS data sources to attacker-owned storage. [Mandiant: UNC3944 Targets SaaS Applications](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications/).

**Anomaly interpretation [inferred]:** Join connector creation and authorization to source objects, destination account ownership and transfer activity, even when the transport is normal cloud traffic.

**Telemetry to validate:** Connector job logs, SaaS audit, consent records and cloud-storage access history.

**Boundary / competing explanation:** A legitimate sync product is not an IOC. Visibility depends on where the connector runs and which logs are collected.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1567.002/" target="_self">T1567.002 — Exfiltration Over Web Service: Exfiltration to Cloud Storage</a>

**Crosslinks:** [Volumetric](https://1200km.com/anomaly-detection-atlas/families/volumetric/#anomaly-volumetric) · [Peer-Group](https://1200km.com/anomaly-detection-atlas/families/peer-group/#anomaly-peer-group). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#48-multivariate-combination-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-22-detecting-malicious-insider-activity-a-technical-detection-engineering-guide-3c3b41e95e82/" target="_self">Detecting Malicious Insider Activity: A Technical Detection Engineering Guide</a>.
<!-- anomaly-evidence:data-movement:end -->

**Illustrative scenarios (not additional incidents):**

- A user who usually views a few HR documents per week suddenly exports entire employee folders to a ZIP archive and syncs them to a personal cloud storage destination.

- A service account that normally reads small sets of objects begins copying thousands of customer records from one S3 bucket to an external account.

- A SaaS user who typically works inside dashboards suddenly performs multiple CSV exports of high-value reports in one session.

- A workstation that normally accesses Office files locally starts reading large numbers of engineering documents and copying them to a removable device or network share.

- A cloud admin account that usually performs management actions begins bulk snapshot export or cross-region object replication involving sensitive data classes.

## Apply this analytical view

These are curated conceptual links, not claims that a specific model detected the cited incidents.

**Models:** [Files, records, messages, or objects accessed in bulk](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#bulk-data-access) · [Email content collected](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#mailbox-collection) · [Data staged, compressed, or archived](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#data-staging) · [Large outbound transfer](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#large-outbound-transfer) · [Data uploaded to cloud or web service](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#web-service-exfiltration) · [Transfers deliberately limited to evade controls](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#low-and-slow-exfiltration).

**Collection references:** [Cloud Storage Access](https://1200km.com/ttp-simulation/telemetry/DC0025/) · [File Access](https://1200km.com/ttp-simulation/telemetry/DC0055/) · [Network Traffic Flow](https://1200km.com/ttp-simulation/telemetry/DC0078/). These describe data components, not equivalent connectors or guaranteed fields.



## Technique workspaces

Follow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.

- [T1078.004 Cloud Accounts](https://1200km.com/threat-matrix/techniques/T1078.004/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1078.004/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1078.004/) · tools: [Pacu](https://1200km.com/ttp-simulation/tools/S1091/), [Peirates](https://1200km.com/ttp-simulation/tools/S0683/), [ROADTools](https://1200km.com/ttp-simulation/tools/S0684/)
- [T1567.002 Exfiltration to Cloud Storage](https://1200km.com/threat-matrix/techniques/T1567.002/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1567.002/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1567.002/) · tools: [Empire](https://1200km.com/ttp-simulation/tools/S0363/), [Rclone](https://1200km.com/ttp-simulation/tools/S1040/)
