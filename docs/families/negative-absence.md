---
title: "Negative Anomaly (Absence)"
description: "Investigate negative anomaly (absence) with source-reported cases, telemetry requirements, model links, and explicit validation limits."
sidebar_label: "Negative Anomaly (Absence)"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Negative Anomaly (Absence) {#anomaly-negative-absence}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="anomaly-negative-absence"></span>

An expected observation is absent during a period where it should be observable.

**Telemetry contract:** Independent collector health, source heartbeat, delivery status, asset state and expected workload.

**Candidate method [unvalidated until tested]:** Model expected presence and detection delay separately from actual zero activity.

**Benign alternatives and limits:** Outage, retirement, filtering, permissions and retention are alternatives to deliberate impairment.

<ResearchFigure id="family-negative-absence" />

<!-- anomaly-evidence:negative-absence:start -->
**Evidence tags:** [Cloud and SaaS](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-cloud) · [Endpoint telemetry](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-endpoint) · [Telemetry health](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-telemetry-health). **Statistical forms:** [contextual](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-contextual), [collective](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-negative-absence" target="_self">Browse articles and guides: Negative Anomaly (Absence)</a>.

**Reported incidents and detection interpretations**

## SCARLETEEL cloud intrusion {#case-negative-absence-scarleteel-2023}

**Period:** 2023 reporting. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** Sysdig reported attackers disabling CloudTrail logging during SCARLETEEL and described StopLogging-based detection. [Sysdig: How to Detect SCARLETEEL with Sysdig Secure](https://www.sysdig.com/blog/detect-scarleteel-sysdig-secure).

**Anomaly interpretation [inferred]:** Combine an explicit logging change with loss of an otherwise expected event stream. Monitor the collection path independently of the source being disabled.

**Telemetry to validate:** CloudTrail control-plane changes, trail configuration, delivery health and downstream ingestion counters.

**Boundary / competing explanation:** StopLogging is a positive state-change event; missing logs are a separate inferred signal. Outages and configuration changes are competing explanations.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1685.002/" target="_self">T1685.002 — Disable or Modify Tools: Disable or Modify Cloud Log</a>

## AuKill use before ransomware deployment {#case-negative-absence-aukill-2023}

**Period:** January–February 2023 incidents. **Evidence:** incident series reported by the cited source.

**Observed [source-reported]:** Sophos investigated ransomware incidents where AuKill abused a Process Explorer driver to disable EDR processes before payload deployment. [Sophos: AuKill EDR killer malware abuses Process Explorer driver](https://www.sophos.com/en-us/blog/aukill-edr-killer-malware-abuses-process-explorer-driver).

**Anomaly interpretation [inferred]:** Correlate unexpected security-service loss with driver installation and other independent host activity. A running host with a silent agent deserves investigation.

**Telemetry to validate:** EDR health, service state, driver-load events and independent management/network heartbeats.

**Boundary / competing explanation:** The source documents defense impairment, not a demonstrated heartbeat detector. Agent maintenance and host shutdown must be distinguished.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1685/" target="_self">T1685 — Disable or Modify Tools</a>

**Crosslinks:** [State-Change](https://1200km.com/anomaly-detection-atlas/families/state-change/#anomaly-state-change) · [Temporal](https://1200km.com/anomaly-detection-atlas/families/temporal/#anomaly-temporal). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#101-missingness-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-07-11-newest-detection-engineering-techniques-from-rules-to-validated-security-telemetry-a5ccb46d5556/" target="_self">Newest Detection Engineering Techniques: From Rules to Validated Security Telemetry</a>.
<!-- anomaly-evidence:negative-absence:end -->

**Illustrative scenarios (not additional incidents):**

- An EDR agent on a critical server that normally checks in every few minutes stops reporting immediately before suspicious outbound activity begins.

- A domain controller that consistently produces Windows security events suddenly goes silent, with no expected authentication logs during business hours.

- A Linux host that normally sends steady `auditd` records stops emitting process and file-access telemetry after a privileged session starts.

- A firewall or proxy log source with a stable event stream abruptly drops to near zero, even though the protected segment remains active.

- A backup service process that is normally always present on a server is no longer running, followed by unexpected file encryption or deletion activity.

## Apply this analytical view

These are curated conceptual links, not claims that a specific model detected the cited incidents.

**Models:** [Security tool, sensor, or logging disabled](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#tool-disablement) · [File timestamps, metadata, logs, or indicators modified](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#indicator-removal) · [Backup, snapshot, or recovery capability impaired](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#recovery-impairment).

**Collection references:** [Host Status](https://1200km.com/ttp-simulation/telemetry/DC0018/) · [Cloud Service Disable](https://1200km.com/ttp-simulation/telemetry/DC0090/) · [Cloud Service Modification](https://1200km.com/ttp-simulation/telemetry/DC0069/). These describe data components, not equivalent connectors or guaranteed fields.



## Technique workspaces

Follow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.

- [T1685.002 Disable or Modify Cloud Log](https://1200km.com/threat-matrix/techniques/T1685.002/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1685.002/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1685.002/) · tools: [Pacu](https://1200km.com/ttp-simulation/tools/S1091/)
- [T1685 Disable or Modify Tools](https://1200km.com/threat-matrix/techniques/T1685/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1685/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1685/) · tools: [Brute Ratel C4](https://1200km.com/ttp-simulation/tools/S1063/), [Cobalt Strike](https://1200km.com/ttp-simulation/tools/S0154/), [DCRAT](https://1200km.com/ttp-simulation/tools/S9017/)
