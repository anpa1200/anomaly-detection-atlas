---
title: "Rare Process / Service"
description: "Investigate rare process / service with source-reported cases, telemetry requirements, model links, and explicit validation limits."
sidebar_label: "Rare Process / Service"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Rare Process / Service {#anomaly-rare-process-service}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="anomaly-rare-process-service"></span>

Low observed prevalence of a process or service in a stated population.

**Telemetry contract:** Process/service creation, software inventory, signer/hash and collection coverage.

**Candidate method [unvalidated until tested]:** Measure prevalence within a role and time period; distinguish new telemetry from a genuinely new binary.

**Benign alternatives and limits:** Deployment, troubleshooting and rare authorized tools can all be legitimate.

<ResearchFigure id="family-rare-process-service" />

<!-- anomaly-evidence:rare-process-service:start -->
**Evidence tags:** [Endpoint telemetry](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-endpoint) · [Network telemetry](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-network). **Statistical forms:** [point](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-point), [contextual](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-contextual).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-rare-process-service" target="_self">Browse articles and guides: Rare Process / Service</a>.

**Reported incidents and detection interpretations**

## BazarCall to Conti intrusion {#case-rare-process-service-bazarcall-conti}

**Period:** 2021 case reported on 1 August. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** The investigators recorded AdFind deployment and execution for domain enumeration on compromised hosts. [The DFIR Report: BazarCall to Conti Ransomware via Trickbot and Cobalt Strike](https://thedfirreport.com/2021/08/01/bazarcall-to-conti-ransomware-via-trickbot-and-cobalt-strike/).

**Anomaly interpretation [inferred]:** Measure first-seen execution within the host role and inspect the associated account and discovery output. Tool presence alone cannot distinguish administration from intrusion.

**Telemetry to validate:** Process image, hash, command line, account and host-class software history.

**Boundary / competing explanation:** The report documents execution, not a measured enterprise prevalence distribution or a guaranteed rarity alert.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1087.002/" target="_self">T1087.002 — Account Discovery: Domain Account</a>

## MESSAGETAP on telecommunications SMS servers {#case-rare-process-service-messagetap-2019}

**Period:** 2019. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant found MESSAGETAP on Linux SMS-center servers, capturing network traffic with libpcap and selecting SMS data. [Mandiant: MESSAGETAP: Who's Reading Your Text Messages?](https://cloud.google.com/blog/topics/threat-intelligence/messagetap-who-is-reading-your-text-messages/).

**Anomaly interpretation [inferred]:** Compare capture-capable executables with the approved SMS-server software inventory and investigate unknown binaries in that role.

**Telemetry to validate:** Executable inventory, process execution, package integrity and packet-capture capability use.

**Boundary / competing explanation:** libpcap also supports legitimate monitoring; the proposed rarity baseline is not a result published by the investigators.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1040/" target="_self">T1040 — Network Sniffing</a>

**Crosslinks:** [Parent-Child Execution](https://1200km.com/anomaly-detection-atlas/families/parent-child/#anomaly-parent-child) · [Peer-Group](https://1200km.com/anomaly-detection-atlas/families/peer-group/#anomaly-peer-group). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#84-rare-category-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-07-11-newest-detection-engineering-techniques-from-rules-to-validated-security-telemetry-a5ccb46d5556/" target="_self">Newest Detection Engineering Techniques: From Rules to Validated Security Telemetry</a>.
<!-- anomaly-evidence:rare-process-service:end -->

**Illustrative scenarios (not additional incidents):**

- A domain controller suddenly executes `7z.exe`, a binary never before seen on that host class, shortly before large archive creation.

- A Linux web server launches `socat` for the first time, despite no prior history of that tool in its software baseline.

- A workstation starts a newly dropped unsigned binary from `%AppData%`, and that file has zero prevalence across the enterprise.

- A Windows server that normally runs only approved business services suddenly installs and starts a new service with a random-looking name and no trusted signature.

- A production database host executes `rclone`, a utility not previously observed on similar servers, followed by outbound network activity.

## Apply this analytical view

These are curated conceptual links, not claims that a specific model detected the cited incidents.

**Models:** [Command or scripting interpreter execution](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#command-interpreter-execution) · [New or modified system service](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#service-persistence) · [Object renamed to resemble trusted object](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#masquerading) · [Protected credential memory or stores accessed](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#credential-dumping).

**Collection references:** [Process Creation](https://1200km.com/ttp-simulation/telemetry/DC0032/) · [Service Creation](https://1200km.com/ttp-simulation/telemetry/DC0060/) · [Process Metadata](https://1200km.com/ttp-simulation/telemetry/DC0034/). These describe data components, not equivalent connectors or guaranteed fields.



## Technique workspaces

Follow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.

- [T1087.002 Domain Account](https://1200km.com/threat-matrix/techniques/T1087.002/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1087.002/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1087.002/) · tools: [AdFind](https://1200km.com/ttp-simulation/tools/S0552/), [BloodHound](https://1200km.com/ttp-simulation/tools/S0521/), [Brute Ratel C4](https://1200km.com/ttp-simulation/tools/S1063/)
- [T1040 Network Sniffing](https://1200km.com/threat-matrix/techniques/T1040/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1040/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1040/) · tools: [Empire](https://1200km.com/ttp-simulation/tools/S0363/), [Impacket](https://1200km.com/ttp-simulation/tools/S0357/), [NBTscan](https://1200km.com/ttp-simulation/tools/S0590/)
