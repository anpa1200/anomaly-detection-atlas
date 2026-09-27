---
title: "Parent-Child Execution"
description: "Investigate parent-child execution with source-reported cases, telemetry requirements, model links, and explicit validation limits."
sidebar_label: "Parent-Child Execution"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Parent-Child Execution {#anomaly-parent-child}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="anomaly-parent-child"></span>

An unusual direct process relationship or explicitly defined ancestry path.

**Telemetry contract:** Stable process identifiers, parent identifiers, command lines, user and asset role.

**Candidate method [unvalidated until tested]:** Specify direct child versus ancestor matching and test process-ID reuse and incomplete ancestry.

**Benign alternatives and limits:** Application automation can launch shells; in-process activity can evade child-process rules.

<ResearchFigure id="family-parent-child" />

<!-- anomaly-evidence:parent-child:start -->
**Evidence tags:** [Endpoint telemetry](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-endpoint). **Statistical forms:** [contextual](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-contextual), [collective](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-parent-child" target="_self">Browse articles and guides: Parent-Child Execution</a>.

**Reported incidents and detection interpretations**

## Lemon Duck exploitation of Exchange servers {#case-parent-child-lemon-duck-exchange}

**Period:** March 2021 reporting. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Microsoft associated Exchange IIS-worker spawning of PowerShell with observed Lemon Duck activity and supplied a corresponding hunting query. [Microsoft: Analyzing attacks taking advantage of the Exchange Server vulnerabilities](https://www.microsoft.com/en-us/security/blog/2021/03/25/analyzing-attacks-taking-advantage-of-the-exchange-server-vulnerabilities/).

**Anomaly interpretation [inferred]:** Investigate w3wp.exe to powershell.exe lineage in the Exchange context, then inspect the command, deployment history and network activity.

**Telemetry to validate:** MDE DeviceProcessEvents or equivalent parent/child process events with command lines.

**Boundary / competing explanation:** Microsoft's query is a hunting starting point, not proof that every matching parent-child pair is malicious.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1059.001/" target="_self">T1059.001 — Command and Scripting Interpreter: PowerShell</a>

## DoejoCrypt activity after Exchange exploitation {#case-parent-child-doejocrypt-exchange}

**Period:** March 2021 reporting. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Microsoft described DoejoCrypt-associated batch-script credential theft and published lineage-oriented queries for post-exploitation activity. [Microsoft: Analyzing attacks taking advantage of the Exchange Server vulnerabilities](https://www.microsoft.com/en-us/security/blog/2021/03/25/analyzing-attacks-taking-advantage-of-the-exchange-server-vulnerabilities/).

**Anomaly interpretation [inferred]:** Follow the web-server, command-shell and credential-access chain instead of alerting on cmd.exe globally. Corroborate with script content and resulting files.

**Telemetry to validate:** Process ancestry, batch command lines, sensitive-registry access and file creation.

**Boundary / competing explanation:** The report covers several exploiting actors; do not attribute every Exchange child process to [HAFNIUM](https://1200km.com/threat-matrix/actors/G0125/) or DoejoCrypt.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1059.003/" target="_self">T1059.003 — Command and Scripting Interpreter: Windows Command Shell</a>

**Crosslinks:** [Rare Process / Service](https://1200km.com/anomaly-detection-atlas/families/rare-process-service/#anomaly-rare-process-service) · [Sequence](https://1200km.com/anomaly-detection-atlas/families/sequence/#anomaly-sequence). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#60-sequence-order-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-07-11-newest-detection-engineering-techniques-from-rules-to-validated-security-telemetry-a5ccb46d5556/" target="_self">Newest Detection Engineering Techniques: From Rules to Validated Security Telemetry</a>.
<!-- anomaly-evidence:parent-child:end -->

**Illustrative scenarios (not additional incidents):**

- `winword.exe` spawns `powershell.exe`, even though Office applications on that workstation normally never launch script interpreters.

- `w3wp.exe` (IIS worker process) starts `cmd.exe`, an uncommon parent-child relationship that can indicate web shell activity.

- `excel.exe` launches `rundll32.exe` and then a network connection follows, which is not part of normal spreadsheet usage.

- An SSH session has `curl` or `wget` in its descendant process tree, although such downloads are unusual for the host role. A shell may be the direct parent; record actual ancestry instead of assuming `sshd` is the direct parent.

- A business application service suddenly spawns `7z.exe` or `rar.exe`, an unusual child process for that parent and host role.

## Apply this analytical view

These are curated conceptual links, not claims that a specific model detected the cited incidents.

**Models:** [PowerShell script, encoded content, or remote command execution](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#powershell-abuse) · [Trusted system binary launches unexpected content](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#trusted-binary-proxy-execution) · [Public-facing application exploitation](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#public-app-exploitation) · [User opens delivered content followed by execution](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#phishing-execution-sequence).

**Collection references:** [Process Creation](https://1200km.com/ttp-simulation/telemetry/DC0032/) · [Script Execution](https://1200km.com/ttp-simulation/telemetry/DC0029/). These describe data components, not equivalent connectors or guaranteed fields.



## Technique workspaces

Follow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.

- [T1059.001 PowerShell](https://1200km.com/threat-matrix/techniques/T1059.001/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1059.001/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1059.001/) · tools: [AADInternals](https://1200km.com/ttp-simulation/tools/S0677/), [BloodHound](https://1200km.com/ttp-simulation/tools/S0521/), [Cobalt Strike](https://1200km.com/ttp-simulation/tools/S0154/)
- [T1059.003 Windows Command Shell](https://1200km.com/threat-matrix/techniques/T1059.003/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1059.003/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1059.003/) · tools: [AsyncRAT](https://1200km.com/ttp-simulation/tools/S1087/), [Brute Ratel C4](https://1200km.com/ttp-simulation/tools/S1063/), [cmd](https://1200km.com/ttp-simulation/tools/S0106/)
