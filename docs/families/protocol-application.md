---
title: "Protocol / Application Usage"
description: "Investigate protocol / application usage with source-reported cases, telemetry requirements, model links, and explicit validation limits."
sidebar_label: "Protocol / Application Usage"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Protocol / Application Usage {#anomaly-protocol-application}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="anomaly-protocol-application"></span>

Unusual use of a protocol, application function or destination for an entity.

**Telemetry contract:** Protocol-aware sensors, endpoint attribution and application audit, with parser/version details.

**Candidate method [unvalidated until tested]:** Define the feature explicitly: record types, endpoint usage, negotiated attributes or destination novelty.

**Benign alternatives and limits:** New clients, protocol changes and legitimate encoded identifiers can invalidate a historical baseline.

<ResearchFigure id="family-protocol-application" />

<!-- anomaly-evidence:protocol-application:start -->
**Evidence tags:** [Network telemetry](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-network) · [Endpoint telemetry](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-endpoint). **Statistical forms:** [contextual](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-contextual), [collective](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-protocol-application" target="_self">Browse articles and guides: Protocol / Application Usage</a>.

**Reported incidents and detection interpretations**

## SUNBURST in the SolarWinds supply-chain compromise {#case-protocol-application-sunburst-2020}

**Period:** 2020. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant decoded SUNBURST DNS subdomain formats carrying victim information and other coordination data. [Mandiant: SUNBURST Additional Technical Details](https://cloud.google.com/blog/topics/threat-intelligence/sunburst-additional-technical-details/).

**Anomaly interpretation [inferred]:** Combine domain novelty, label structure and the originating process. DNS that is syntactically valid can still carry application data unrelated to normal resolution.

**Telemetry to validate:** Full QNAME, response details, timing and endpoint process attribution.

**Boundary / competing explanation:** Entropy alone is not a discriminator; the cited analysis does not establish the article's proposed numeric entropy range as a benchmark.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1071.004/" target="_self">T1071.004 — Application Layer Protocol: DNS</a>

## [OilRig](https://1200km.com/threat-matrix/actors/G0049/)-associated RDAT at a telecommunications organization {#case-protocol-application-oilrig-rdat-2020}

**Period:** April 2020 activity. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** Unit 42 analyzed RDAT deployed against a telecommunications organization, including variants with DNS tunneling over A and AAAA queries. [Palo Alto Networks Unit 42: OilRig Targets Middle Eastern Telecommunications Organization and Adds Novel C2 Channel with Steganography to Its Inventory](https://unit42.paloaltonetworks.com/oilrig-novel-c2-channel-steganography/).

**Anomaly interpretation [inferred]:** Inspect encoded-label structure and repeated exchanges by process and domain. Restricting detection to TXT queries would miss these documented variants.

**Telemetry to validate:** DNS queries and responses, label lengths, per-domain patterns and endpoint context.

**Boundary / competing explanation:** Different RDAT variants use different channels; do not assign one DNS signature to every [OilRig](https://1200km.com/threat-matrix/actors/G0049/) intrusion.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1071.004/" target="_self">T1071.004 — Application Layer Protocol: DNS</a>

**Crosslinks:** [Temporal](https://1200km.com/anomaly-detection-atlas/families/temporal/#anomaly-temporal) · [Data Movement](https://1200km.com/anomaly-detection-atlas/families/data-movement/#anomaly-data-movement). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#48-multivariate-combination-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-09-18-ai-agent-vs-human-with-wireshark-six-malware-pcaps-put-to-the-test-63ffeaed97de/" target="_self">AI Agent vs. Human with Wireshark: Six Malware PCAPs Put to the Test</a>.
<!-- anomaly-evidence:protocol-application:end -->

**Illustrative scenarios (not additional incidents):**

- A workstation starts making large HTTPS uploads over port 8443 to an external host, even though that port and destination are not part of its normal application profile.

- DNS traffic from a user device suddenly shifts from normal lookup behavior to long, high-entropy TXT queries consistent with tunneling or covert signaling.

- A browser session begins using an unusual user-agent string and repeatedly calls rarely used SaaS API endpoints that the user never accessed before.

- An internal host starts communicating over SSH on a non-standard port to multiple external systems, outside its normal administrative pattern.

- A cloud application account that usually performs routine API reads begins using bulk export, synchronization, or token-management features rarely seen in that application context.

## Apply this analytical view

These are curated conceptual links, not claims that a specific model detected the cited incidents.

**Models:** [DNS carries command, control, or encoded data](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#dns-c2) · [DNS enumeration or zone-transfer attempts](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#dns-enumeration) · [Endpoint communicates periodically with external destination](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#periodic-c2) · [Encrypted or obfuscated network channel](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#encrypted-channel) · [Web or collaboration service used as control channel](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#web-service-c2) · [Enumeration of public web paths and APIs](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#public-web-enumeration).

**Collection references:** [Network Traffic Content](https://1200km.com/ttp-simulation/telemetry/DC0085/) · [Network Traffic Flow](https://1200km.com/ttp-simulation/telemetry/DC0078/) · [Application Log Content](https://1200km.com/ttp-simulation/telemetry/DC0038/). These describe data components, not equivalent connectors or guaranteed fields.



## Technique workspaces

Follow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.

- [T1071.004 DNS](https://1200km.com/threat-matrix/techniques/T1071.004/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1071.004/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1071.004/) · tools: [Brute Ratel C4](https://1200km.com/ttp-simulation/tools/S1063/), [Cobalt Strike](https://1200km.com/ttp-simulation/tools/S0154/), [Mythic](https://1200km.com/ttp-simulation/tools/S0699/)
