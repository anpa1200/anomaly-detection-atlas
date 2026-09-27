---
title: "Incident register and evidence boundaries"
description: "Anomaly Detection Atlas: incident register and evidence boundaries, with source evidence and implementation boundaries."
sidebar_label: "Incident register and evidence boundaries"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Incident register, tags and evidence boundaries {#anomaly-evidence-index}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="anomaly-evidence-index"></span>

This expansion covers **14 operational anomaly families plus multi-event correlation: 15 navigation tags, 30 incident-to-topic mappings and 17 distinct case/campaign records**, reviewed on 2026-09-21. A campaign record may summarize multiple victims; this is not a count of individual breaches. A repeated case is not independent evidence.

**Reading the labels:** “Observed” means reported by the named investigator, not reproduced in this research. Each anomaly interpretation and ATT&CK association is an author-derived mapping. Suggested telemetry is a collection plan, not a claim that it was available to the original victim. No new precision, recall, threshold or successful-detection result is asserted.

**Scope:** Fourteen headings describe operational feature families; the fifteenth, multi-event correlation, is a composition pattern that combines them. The companion Atlas has a broader statistical taxonomy; its linked categories explain the statistical concept and do not imply one-to-one equivalence. The existing generic example bullets remain illustrative scenarios, not extra documented incidents.

<ResearchFigure id="incident-register" />

| Case / campaign record | Attribution boundary | Crosslinked analytical views |
|---|---|---|
| UNC5537 and Snowflake customer data theft (2024) | UNC5537, as tracked by Mandiant; customer-account compromise, not a demonstrated compromise of Snowflake itself | [Volumetric](https://1200km.com/anomaly-detection-atlas/families/volumetric/#case-volumetric-unc5537-snowflake-2024) · [Geographic / ASN](https://1200km.com/anomaly-detection-atlas/families/geographic-asn/#case-geographic-asn-unc5537-snowflake-2024) · [Data Movement](https://1200km.com/anomaly-detection-atlas/families/data-movement/#case-data-movement-unc5537-snowflake-2024) |
| HTTP/2 Rapid Reset DDoS campaign (August 2023) | Operators not named in the cited report | [Volumetric](https://1200km.com/anomaly-detection-atlas/families/volumetric/#case-volumetric-rapid-reset-2023) · [Frequency / Rate](https://1200km.com/anomaly-detection-atlas/families/frequency-rate/#case-frequency-rate-rapid-reset-2023) |
| [Midnight Blizzard](https://1200km.com/threat-matrix/actors/G0016/) compromise of Microsoft (Reported January 2024) | [Midnight Blizzard](https://1200km.com/threat-matrix/actors/G0016/), as attributed by Microsoft | [Frequency / Rate](https://1200km.com/anomaly-detection-atlas/families/frequency-rate/#case-frequency-rate-midnight-blizzard-2024) · [Graph / Relationship](https://1200km.com/anomaly-detection-atlas/families/graph-relationship/#case-graph-relationship-midnight-blizzard-2024) · [Geographic / ASN](https://1200km.com/anomaly-detection-atlas/families/geographic-asn/#case-geographic-asn-midnight-blizzard-2024) |
| SUNBURST in the SolarWinds supply-chain compromise (2020) | UNC2452 in contemporaneous Mandiant reporting; a malware observation is not by itself group attribution | [Temporal](https://1200km.com/anomaly-detection-atlas/families/temporal/#case-temporal-sunburst-2020) · [Protocol / Application Usage](https://1200km.com/anomaly-detection-atlas/families/protocol-application/#case-protocol-application-sunburst-2020) |
| Industroyer2 attempted disruption of a Ukrainian energy provider (8 April 2022) | [Sandworm](https://1200km.com/threat-matrix/actors/G0034/), as assessed by ESET and CERT-UA | [Temporal](https://1200km.com/anomaly-detection-atlas/families/temporal/#case-temporal-industroyer2-2022) |
| Twitter insider access for a foreign official (Conduct addressed in the 2022 Abouammo conviction) | Ahmad Abouammo, named in the conviction report; indictment allegations about other people are not treated as convictions | [Peer-Group](https://1200km.com/anomaly-detection-atlas/families/peer-group/#case-peer-group-twitter-insider) |
| Storm-1283 OAuth-enabled cryptomining (Reported December 2023) | Storm-1283, as tracked by Microsoft | [Peer-Group](https://1200km.com/anomaly-detection-atlas/families/peer-group/#case-peer-group-storm1283-2023) · [Graph / Relationship](https://1200km.com/anomaly-detection-atlas/families/graph-relationship/#case-graph-relationship-storm1283-2023) · [State-Change](https://1200km.com/anomaly-detection-atlas/families/state-change/#case-state-change-storm1283-2023) |
| UNC3944 help-desk compromise and SaaS data theft (2023–2024 investigations reported June 2024) | UNC3944, as tracked by Mandiant; overlapping public names are not assumed to be exact aliases | [Sequence](https://1200km.com/anomaly-detection-atlas/families/sequence/#case-sequence-unc3944-saas) · [Identity / Access](https://1200km.com/anomaly-detection-atlas/families/identity-access/#case-identity-access-unc3944-saas) · [Data Movement](https://1200km.com/anomaly-detection-atlas/families/data-movement/#case-data-movement-unc3944-saas) · [Multi-Event Correlation](https://1200km.com/anomaly-detection-atlas/families/multi-event-correlation/#case-multi-event-correlation-unc3944-saas) |
| BazarCall to Conti intrusion (2021 case reported on 1 August) | Conti ransomware operators in this investigation; tools alone do not establish actor identity | [Sequence](https://1200km.com/anomaly-detection-atlas/families/sequence/#case-sequence-bazarcall-conti) · [Rare Process / Service](https://1200km.com/anomaly-detection-atlas/families/rare-process-service/#case-rare-process-service-bazarcall-conti) · [Multi-Event Correlation](https://1200km.com/anomaly-detection-atlas/families/multi-event-correlation/#case-multi-event-correlation-bazarcall-conti) |
| Storm-0558 forged-token mailbox access (2023) | Storm-0558, as attributed by Microsoft | [Identity / Access](https://1200km.com/anomaly-detection-atlas/families/identity-access/#case-identity-access-storm0558-2023) |
| MESSAGETAP on telecommunications SMS servers (2019) | [APT41](https://1200km.com/threat-matrix/actors/G0096/), as attributed by Mandiant | [Rare Process / Service](https://1200km.com/anomaly-detection-atlas/families/rare-process-service/#case-rare-process-service-messagetap-2019) |
| Lemon Duck exploitation of Exchange servers (March 2021 reporting) | Lemon Duck activity in Microsoft's report; not reassigned to [HAFNIUM](https://1200km.com/threat-matrix/actors/G0125/) | [Parent-Child Execution](https://1200km.com/anomaly-detection-atlas/families/parent-child/#case-parent-child-lemon-duck-exchange) |
| DoejoCrypt activity after Exchange exploitation (March 2021 reporting) | DoejoCrypt activity in Microsoft's report; malware label, not a proven identity of the operator | [Parent-Child Execution](https://1200km.com/anomaly-detection-atlas/families/parent-child/#case-parent-child-doejocrypt-exchange) |
| [OilRig](https://1200km.com/threat-matrix/actors/G0049/)-associated RDAT at a telecommunications organization (April 2020 activity) | [OilRig](https://1200km.com/threat-matrix/actors/G0049/) association assessed by Unit 42; not an attribution inferred from DNS entropy | [Protocol / Application Usage](https://1200km.com/anomaly-detection-atlas/families/protocol-application/#case-protocol-application-oilrig-rdat-2020) |
| SCARLETEEL cloud intrusion (2023 reporting) | SCARLETEEL is the operation label used by Sysdig, not an independently established actor identity | [Negative Anomaly (Absence)](https://1200km.com/anomaly-detection-atlas/families/negative-absence/#case-negative-absence-scarleteel-2023) |
| AuKill use before ransomware deployment (January–February 2023 incidents) | Ransomware incidents involving Medusa Locker or LockBit; no assertion that their operators are one group | [Negative Anomaly (Absence)](https://1200km.com/anomaly-detection-atlas/families/negative-absence/#case-negative-absence-aukill-2023) |
| LEMURLOOT in MOVEit data-theft intrusions (May–June 2023) | FIN11 in Mandiant's updated assessment (initially UNC4857); the separately reported CL0P data-leak claim is not an alias inferred from the account artifact | [State-Change](https://1200km.com/anomaly-detection-atlas/families/state-change/#case-state-change-moveit-lemurloot) |

## Topic tags {#anomaly-topic-tags}

These topic links open the consolidated family pages. They describe analytical relevance, not validated detection coverage.

### Cloud and SaaS {#tag-cloud}

[Volumetric](https://1200km.com/anomaly-detection-atlas/families/volumetric/#anomaly-volumetric) · [Peer-Group](https://1200km.com/anomaly-detection-atlas/families/peer-group/#anomaly-peer-group) · [Sequence](https://1200km.com/anomaly-detection-atlas/families/sequence/#anomaly-sequence) · [Graph / Relationship](https://1200km.com/anomaly-detection-atlas/families/graph-relationship/#anomaly-graph-relationship) · [Geographic / ASN](https://1200km.com/anomaly-detection-atlas/families/geographic-asn/#anomaly-geographic-asn) · [Identity / Access](https://1200km.com/anomaly-detection-atlas/families/identity-access/#anomaly-identity-access) · [Data Movement](https://1200km.com/anomaly-detection-atlas/families/data-movement/#anomaly-data-movement) · [Negative Anomaly (Absence)](https://1200km.com/anomaly-detection-atlas/families/negative-absence/#anomaly-negative-absence) · [State-Change](https://1200km.com/anomaly-detection-atlas/families/state-change/#anomaly-state-change) · [Multi-Event Correlation](https://1200km.com/anomaly-detection-atlas/families/multi-event-correlation/#anomaly-multi-event-correlation)

### Network telemetry {#tag-network}

[Volumetric](https://1200km.com/anomaly-detection-atlas/families/volumetric/#anomaly-volumetric) · [Frequency / Rate](https://1200km.com/anomaly-detection-atlas/families/frequency-rate/#anomaly-frequency-rate) · [Temporal](https://1200km.com/anomaly-detection-atlas/families/temporal/#anomaly-temporal) · [Geographic / ASN](https://1200km.com/anomaly-detection-atlas/families/geographic-asn/#anomaly-geographic-asn) · [Rare Process / Service](https://1200km.com/anomaly-detection-atlas/families/rare-process-service/#anomaly-rare-process-service) · [Protocol / Application Usage](https://1200km.com/anomaly-detection-atlas/families/protocol-application/#anomaly-protocol-application)

### Identity and access {#tag-identity}

[Frequency / Rate](https://1200km.com/anomaly-detection-atlas/families/frequency-rate/#anomaly-frequency-rate) · [Peer-Group](https://1200km.com/anomaly-detection-atlas/families/peer-group/#anomaly-peer-group) · [Sequence](https://1200km.com/anomaly-detection-atlas/families/sequence/#anomaly-sequence) · [Graph / Relationship](https://1200km.com/anomaly-detection-atlas/families/graph-relationship/#anomaly-graph-relationship) · [Geographic / ASN](https://1200km.com/anomaly-detection-atlas/families/geographic-asn/#anomaly-geographic-asn) · [Identity / Access](https://1200km.com/anomaly-detection-atlas/families/identity-access/#anomaly-identity-access) · [Data Movement](https://1200km.com/anomaly-detection-atlas/families/data-movement/#anomaly-data-movement) · [State-Change](https://1200km.com/anomaly-detection-atlas/families/state-change/#anomaly-state-change) · [Multi-Event Correlation](https://1200km.com/anomaly-detection-atlas/families/multi-event-correlation/#anomaly-multi-event-correlation)

### Endpoint telemetry {#tag-endpoint}

[Temporal](https://1200km.com/anomaly-detection-atlas/families/temporal/#anomaly-temporal) · [Sequence](https://1200km.com/anomaly-detection-atlas/families/sequence/#anomaly-sequence) · [Rare Process / Service](https://1200km.com/anomaly-detection-atlas/families/rare-process-service/#anomaly-rare-process-service) · [Parent-Child Execution](https://1200km.com/anomaly-detection-atlas/families/parent-child/#anomaly-parent-child) · [Protocol / Application Usage](https://1200km.com/anomaly-detection-atlas/families/protocol-application/#anomaly-protocol-application) · [Negative Anomaly (Absence)](https://1200km.com/anomaly-detection-atlas/families/negative-absence/#anomaly-negative-absence) · [Multi-Event Correlation](https://1200km.com/anomaly-detection-atlas/families/multi-event-correlation/#anomaly-multi-event-correlation)

### Insider risk {#tag-insider}

[Peer-Group](https://1200km.com/anomaly-detection-atlas/families/peer-group/#anomaly-peer-group)

### Operational technology {#tag-ot}

[Temporal](https://1200km.com/anomaly-detection-atlas/families/temporal/#anomaly-temporal)

### Telemetry health {#tag-telemetry-health}

[Negative Anomaly (Absence)](https://1200km.com/anomaly-detection-atlas/families/negative-absence/#anomaly-negative-absence)

### Application audit {#tag-application}

[State-Change](https://1200km.com/anomaly-detection-atlas/families/state-change/#anomaly-state-change)

## Reuse and validation {#anomaly-reuse-validation}

**ATT&CK currency:** Mappings were reviewed on 2026-09-21; the technical revision uses Enterprise ATT&CK v19.2. The former T1562.001 now points to [T1685 — Disable or Modify Tools](https://attack.mitre.org/techniques/T1685/); The former T1562.008 now points to [T1685.002 — Disable or Modify Tools: Disable or Modify Cloud Log](https://attack.mitre.org/techniques/T1685/002/). The JSON retains these identifier transitions. Vendor finding names remain their vendor-defined identifiers.

The companion machine-readable evidence register is <a href="https://1200km.com/articles/research/anomaly-incidents.json" target="_self">available as JSON</a>. It keeps source URLs and publication dates separate from incident periods, and records both the observed behavior and the inferred detection opportunity. Case identifiers support deduplication across anomaly types.

To evaluate a proposed detector, preserve the source event IDs, normalize entity identifiers and time zones, define the comparison population, and test against both attack and legitimate activity. Freeze thresholds before evaluation. Report missing telemetry, false alerts per entity-day, incident recall and alert precision separately. A high anomaly score is neither group attribution nor an automatic containment decision.

**Implementation boundary:** Incident evidence does not validate a detector. [Section 8](https://1200km.com/anomaly-detection-atlas/research/queries/) now uses maintained query files and explicit telemetry contracts; its execution report distinguishes functional tests from public-recording replay. [Section 9](https://1200km.com/anomaly-detection-atlas/research/validation/) labels synthetic statistical results separately. Neither establishes production precision, recall, connector compatibility or universal thresholds.
<!-- anomaly-evidence:index:end -->

## Technique workspaces

Follow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.

- [T1685 Disable or Modify Tools](https://1200km.com/threat-matrix/techniques/T1685/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1685/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1685/) · tools: [Brute Ratel C4](https://1200km.com/ttp-simulation/tools/S1063/), [Cobalt Strike](https://1200km.com/ttp-simulation/tools/S0154/), [DCRAT](https://1200km.com/ttp-simulation/tools/S9017/)
- [T1685.002 Disable or Modify Cloud Log](https://1200km.com/threat-matrix/techniques/T1685.002/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1685.002/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1685.002/) · tools: [Pacu](https://1200km.com/ttp-simulation/tools/S1091/)
