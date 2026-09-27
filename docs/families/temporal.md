---
title: "Temporal"
description: "Investigate temporal with source-reported cases, telemetry requirements, model links, and explicit validation limits."
sidebar_label: "Temporal"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Temporal {#anomaly-temporal}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="anomaly-temporal"></span>

Activity inconsistent with a defined time-of-day, shift or seasonal context.

**Telemetry contract:** Event-time identity, administration and workload logs plus time-zone and schedule context.

**Candidate method [unvalidated until tested]:** Compare like calendar periods; handle travel, daylight-saving changes and ingestion delay.

**Benign alternatives and limits:** On-call work, international teams and scheduled maintenance are legitimate alternatives.

<ResearchFigure id="family-temporal" />

<!-- anomaly-evidence:temporal:start -->
**Evidence tags:** [Network telemetry](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-network) · [Endpoint telemetry](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-endpoint) · [Operational technology](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-ot). **Statistical forms:** [contextual](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-contextual), [collective](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-temporal" target="_self">Browse articles and guides: Temporal</a>.

**Reported incidents and detection interpretations**

## SUNBURST in the SolarWinds supply-chain compromise {#case-temporal-sunburst-2020}

**Period:** 2020. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** SUNBURST delayed activation and subsequently used DNS coordination and command-and-control traffic. [Mandiant: SUNBURST Additional Technical Details](https://cloud.google.com/blog/topics/threat-intelligence/sunburst-additional-technical-details/).

**Anomaly interpretation [inferred]:** Relate software installation, delayed first contact and later callbacks. The delay is an event-sequence feature, not an observable DNS anomaly while the implant is silent.

**Telemetry to validate:** Software deployment records, process-attributed network events and DNS timestamps.

**Boundary / competing explanation:** Dormancy without emitted telemetry cannot be scored from network traffic; normal update delays can look similar.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1071.004/" target="_self">T1071.004 — Application Layer Protocol: DNS</a>

## Industroyer2 attempted disruption of a Ukrainian energy provider {#case-temporal-industroyer2-2022}

**Period:** 8 April 2022. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** ESET documented Industroyer2 execution scheduled for 8 April 2022 at 16:10 UTC in an attempted attack on a Ukrainian energy provider. [ESET: Industroyer2: Industroyer reloaded](https://www.welivesecurity.com/2022/04/12/industroyer2-industroyer-reloaded/).

**Anomaly interpretation [inferred]:** Correlate the task's creation and scheduled execution with approved OT work and operational commands. Clock time alone does not make an event anomalous.

**Telemetry to validate:** Scheduled-task records, engineering-host process logs, OT commands and maintenance approvals.

**Boundary / competing explanation:** The public report establishes the scheduled time, not the site's full maintenance baseline or a successful temporal detection.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1053.005/" target="_self">T1053.005 — Scheduled Task/Job: Scheduled Task</a>

**Crosslinks:** [Sequence](https://1200km.com/anomaly-detection-atlas/families/sequence/#anomaly-sequence) · [Protocol / Application Usage](https://1200km.com/anomaly-detection-atlas/families/protocol-application/#anomaly-protocol-application). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#21-temporal-context-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-07-11-newest-detection-engineering-techniques-from-rules-to-validated-security-telemetry-a5ccb46d5556/" target="_self">Newest Detection Engineering Techniques: From Rules to Validated Security Telemetry</a>.
<!-- anomaly-evidence:temporal:end -->

**Illustrative scenarios (not additional incidents):**

- An HR employee who normally logs in between 08:00–17:00 starts downloading sensitive employee records at 02:43 on a Sunday.

- A SaaS admin account that is typically active only during local business hours performs privilege changes at 03:10.

- A developer laptop that usually shows weekday activity suddenly initiates code repository access and cloud console actions during a national holiday.

- A server management account that normally runs scheduled maintenance at 01:00–02:00 begins executing admin actions at an unusual afternoon hour outside its normal service window.

- A user with a stable daytime pattern starts authenticating from the same device every night for several consecutive days, outside their historical baseline.

## Apply this analytical view

These are curated conceptual links, not claims that a specific model detected the cited incidents.

**Models:** [Scheduled job, service, or automation executes payload](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#scheduled-execution) · [Endpoint communicates periodically with external destination](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#periodic-c2) · [External remote-service session](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#external-remote-session) · [Transfers deliberately limited to evade controls](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#low-and-slow-exfiltration).

**Collection references:** [Scheduled Job Creation](https://1200km.com/ttp-simulation/telemetry/DC0001/) · [Process Creation](https://1200km.com/ttp-simulation/telemetry/DC0032/) · [Network Traffic Flow](https://1200km.com/ttp-simulation/telemetry/DC0078/). These describe data components, not equivalent connectors or guaranteed fields.



## Technique workspaces

Follow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.

- [T1071.004 DNS](https://1200km.com/threat-matrix/techniques/T1071.004/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1071.004/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1071.004/) · tools: [Brute Ratel C4](https://1200km.com/ttp-simulation/tools/S1063/), [Cobalt Strike](https://1200km.com/ttp-simulation/tools/S0154/), [Mythic](https://1200km.com/ttp-simulation/tools/S0699/)
- [T1053.005 Scheduled Task](https://1200km.com/threat-matrix/techniques/T1053.005/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1053.005/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1053.005/) · tools: [AsyncRAT](https://1200km.com/ttp-simulation/tools/S1087/), [CSPY Downloader](https://1200km.com/ttp-simulation/tools/S0527/), [Empire](https://1200km.com/ttp-simulation/tools/S0363/)
