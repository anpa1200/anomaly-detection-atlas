---
title: "Volumetric"
description: "Investigate volumetric with source-reported cases, telemetry requirements, model links, and explicit validation limits."
sidebar_label: "Volumetric"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Volumetric {#anomaly-volumetric}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="anomaly-volumetric"></span>

Unusual amount of data or events over a defined observation window.

**Telemetry contract:** Directional flow counters, exports, object access or audit events; record whether units are bytes, objects, rows or events.

**Candidate method [unvalidated until tested]:** Compare aligned windows within a workload/role. Evaluate empirical quantiles or an appropriate location/scale model.

**Benign alternatives and limits:** Backups, reporting, synchronization and incident recovery can create large legitimate volumes.

<ResearchFigure id="family-volumetric" />

<!-- anomaly-evidence:volumetric:start -->
**Evidence tags:** [Cloud and SaaS](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-cloud) · [Network telemetry](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-network). **Statistical forms:** [point](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-point), [collective](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-volumetric" target="_self">Browse articles and guides: Volumetric</a>.

**Reported incidents and detection interpretations**

## UNC5537 and Snowflake customer data theft {#case-volumetric-unc5537-snowflake-2024}

**Period:** 2024. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant investigated stolen customer credentials used to access Snowflake instances and exfiltrate database records. [Mandiant: UNC5537 Targets Snowflake Customer Instances for Data Theft and Extortion](https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion).

**Anomaly interpretation [inferred]:** Compare exported rows or bytes with that account's job and warehouse workload. A large legitimate reporting job remains a competing explanation.

**Telemetry to validate:** Snowflake query and access history; export destinations; identity and warehouse context.

**Boundary / competing explanation:** The report does not provide a universal per-account volume threshold or a measured anomaly-detector success rate.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1078.004/" target="_self">T1078.004 — Valid Accounts: Cloud Accounts</a>

## HTTP/2 Rapid Reset DDoS campaign {#case-volumetric-rapid-reset-2023}

**Period:** August 2023. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Cloudflare reported HTTP/2 attacks reaching just above 201 million requests per second and automatic detection and mitigation. [Cloudflare: HTTP/2 Rapid Reset: deconstructing the record-breaking attack](https://blog.cloudflare.com/technical-breakdown-http2-rapid-reset-ddos-attack/).

**Anomaly interpretation [inferred]:** This is a documented extreme-load event. Separate total resource load from rate and compare it with service capacity and normal demand.

**Telemetry to validate:** Edge request counters, connection statistics, origin saturation and mitigation events.

**Boundary / competing explanation:** This is Cloudflare's measurement, not a generic enterprise threshold or independent validation of a particular model.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1499/" target="_self">T1499 — Endpoint Denial of Service</a>

**Crosslinks:** [Frequency / Rate](https://1200km.com/anomaly-detection-atlas/families/frequency-rate/#anomaly-frequency-rate) · [Data Movement](https://1200km.com/anomaly-detection-atlas/families/data-movement/#anomaly-data-movement). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#12-magnitude-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-09-18-ai-agent-vs-human-with-wireshark-six-malware-pcaps-put-to-the-test-63ffeaed97de/" target="_self">AI Agent vs. Human with Wireshark: Six Malware PCAPs Put to the Test</a>.
<!-- anomaly-evidence:volumetric:end -->

**Illustrative scenarios (not additional incidents):**

- A finance user whose historical complete 40-minute windows contain 20–50 download events produces 8,000 download events in a comparable window. Audit-event counts are not necessarily unique documents.

- A database server with stable nightly replication begins sending 12 GB of outbound traffic to an external IP at 03:12, far above its normal egress baseline.

- A workstation that usually makes fewer than 200 DNS requests per hour suddenly generates 9,000 queries, including many high-entropy subdomains.

- A cloud service account that typically reads a few dozen objects per day suddenly accesses 30,000 S3 objects in one session.

- A file server that normally changes 1–2 GB of data daily suddenly shows mass file modifications and deletions consistent with ransomware impact.

## Apply this analytical view

These are curated conceptual links, not claims that a specific model detected the cited incidents.

**Models:** [Files, records, messages, or objects accessed in bulk](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#bulk-data-access) · [Large outbound transfer](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#large-outbound-transfer) · [Files encrypted for impact](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#ransomware-encryption) · [Service or system availability disrupted](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#service-disruption).

**Collection references:** [Network Traffic Flow](https://1200km.com/ttp-simulation/telemetry/DC0078/) · [Cloud Storage Access](https://1200km.com/ttp-simulation/telemetry/DC0025/) · [File Access](https://1200km.com/ttp-simulation/telemetry/DC0055/). These describe data components, not equivalent connectors or guaranteed fields.



## Technique workspaces

Follow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.

- [T1078.004 Cloud Accounts](https://1200km.com/threat-matrix/techniques/T1078.004/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1078.004/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1078.004/) · tools: [Pacu](https://1200km.com/ttp-simulation/tools/S1091/), [Peirates](https://1200km.com/ttp-simulation/tools/S0683/), [ROADTools](https://1200km.com/ttp-simulation/tools/S0684/)
- [T1499 Endpoint Denial of Service](https://1200km.com/threat-matrix/techniques/T1499/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1499/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1499/)
