---
title: "Sequence"
description: "Investigate sequence with source-reported cases, telemetry requirements, model links, and explicit validation limits."
sidebar_label: "Sequence"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Sequence {#anomaly-sequence}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="anomaly-sequence"></span>

An event sequence differs from an expected operational workflow.

**Telemetry contract:** Process ancestry, authentication, application actions, session identifiers and event time.

**Candidate method [unvalidated until tested]:** Use explicit sequence constraints or a validated sequence model; define allowed lateness and missing steps.

**Benign alternatives and limits:** Different legitimate workflows and timestamp disorder can produce the same apparent sequence.

<ResearchFigure id="family-sequence" />

<!-- anomaly-evidence:sequence:start -->
**Evidence tags:** [Identity and access](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-identity) · [Endpoint telemetry](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-endpoint) · [Cloud and SaaS](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-cloud). **Statistical forms:** [collective](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-collective), [contextual](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-contextual).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-sequence" target="_self">Browse articles and guides: Sequence</a>.

**Reported incidents and detection interpretations**

## UNC3944 help-desk compromise and SaaS data theft {#case-sequence-unc3944-saas}

**Period:** 2023–2024 investigations reported June 2024. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant described help-desk impersonation, MFA changes and subsequent access to privileged accounts and SaaS applications across its investigations. [Mandiant: UNC3944 Targets SaaS Applications](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications/).

**Anomaly interpretation [inferred]:** Correlate reset, new-device enrollment, sign-in and expanded access on the same identity. Preserve ordering rather than merely counting co-occurring alerts.

**Telemetry to validate:** Help-desk tickets, IdP factor events, session records and SaaS audit logs.

**Boundary / competing explanation:** The report synthesizes multiple engagements; do not invent one victim timeline containing every reported technique.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1098.005/" target="_self">T1098.005 — Account Manipulation: Device Registration</a>

## BazarCall to Conti intrusion {#case-sequence-bazarcall-conti}

**Period:** 2021 case reported on 1 August. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** The DFIR Report traced a workbook-led intrusion through Trickbot, Cobalt Strike, discovery and lateral movement to later Conti deployment. [The DFIR Report: BazarCall to Conti Ransomware via Trickbot and Cobalt Strike](https://thedfirreport.com/2021/08/01/bazarcall-to-conti-ransomware-via-trickbot-and-cobalt-strike/).

**Anomaly interpretation [inferred]:** Link execution, discovery and remote activity by host and identity. A multi-stage sequence can warrant investigation before ransomware appears.

**Telemetry to validate:** Process trees, authentication records, service creation and endpoint/network timestamps.

**Boundary / competing explanation:** A rigid sequence requiring every stage will miss partial telemetry and different attack paths; evaluate missing-stage tolerance.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1087.002/" target="_self">T1087.002 — Account Discovery: Domain Account</a>

**Crosslinks:** [Identity / Access](https://1200km.com/anomaly-detection-atlas/families/identity-access/#anomaly-identity-access) · [Parent-Child Execution](https://1200km.com/anomaly-detection-atlas/families/parent-child/#anomaly-parent-child). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#60-sequence-order-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-14-from-threat-intelligence-to-detection-a-practitioner-s-guide-2d930b168426/" target="_self">From Threat Intelligence to Detection: A Practitioner’s Guide</a>.
<!-- anomaly-evidence:sequence:end -->

**Illustrative scenarios (not additional incidents):**

- A user authenticates to a SaaS tenant, creates a new OAuth app, grants high-risk permissions, and then performs bulk data access in a sequence not seen in normal admin workflows.

- On a server, `powershell.exe` spawns `rundll32.exe`, which then launches a network connection to an external host—an execution chain that deviates from the usual parent-child order.

- A mailbox access session shows inbox rule creation before any normal interactive user activity, followed immediately by message forwarding and deletion operations.

- A cloud workflow shows snapshot creation, privilege modification, and object export in an order that does not match standard backup or maintenance procedures.

- A workstation process tree shows Office opening a script interpreter, then a credential access tool, then an archive utility — an event sequence inconsistent with normal user productivity flows.

## Apply this analytical view

These are curated conceptual links, not claims that a specific model detected the cited incidents.

**Models:** [Malicious attachment, link, or message delivery](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#phishing-delivery) · [User opens delivered content followed by execution](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#phishing-execution-sequence) · [Data staged, compressed, or archived](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#data-staging) · [Tool or payload transferred internally](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#lateral-tool-transfer) · [Unexpected serverless or cloud-workload invocation](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#serverless-execution) · [Container administration interface executes command](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#container-exec).

**Collection references:** [Process Creation](https://1200km.com/ttp-simulation/telemetry/DC0032/) · [Logon Session Creation](https://1200km.com/ttp-simulation/telemetry/DC0067/) · [Application Log Content](https://1200km.com/ttp-simulation/telemetry/DC0038/). These describe data components, not equivalent connectors or guaranteed fields.



## Technique workspaces

Follow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.

- [T1098.005 Device Registration](https://1200km.com/threat-matrix/techniques/T1098.005/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1098.005/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1098.005/) · tools: [AADInternals](https://1200km.com/ttp-simulation/tools/S0677/)
- [T1087.002 Domain Account](https://1200km.com/threat-matrix/techniques/T1087.002/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1087.002/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1087.002/) · tools: [AdFind](https://1200km.com/ttp-simulation/tools/S0552/), [BloodHound](https://1200km.com/ttp-simulation/tools/S0521/), [Brute Ratel C4](https://1200km.com/ttp-simulation/tools/S1063/)
