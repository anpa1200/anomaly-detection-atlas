---
title: "Frequency / Rate"
description: "Investigate frequency / rate with source-reported cases, telemetry requirements, model links, and explicit validation limits."
sidebar_label: "Frequency / Rate"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Frequency / Rate {#anomaly-frequency-rate}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="anomaly-frequency-rate"></span>

Unusual event frequency per entity and unit of observed time.

**Telemetry contract:** Authentication, API, process or DNS events, with collection completeness and event deduplication.

**Candidate method [unvalidated until tested]:** Measure count, duration, source diversity and target breadth. Check dispersion and seasonality before choosing a Poisson model.

**Benign alternatives and limits:** Retries, outages, load tests and shared gateways can resemble an attack burst.

<ResearchFigure id="family-frequency-rate" />

<!-- anomaly-evidence:frequency-rate:start -->
**Evidence tags:** [Identity and access](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-identity) · [Network telemetry](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-network). **Statistical forms:** [collective](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-frequency-rate" target="_self">Browse articles and guides: Frequency / Rate</a>.

**Reported incidents and detection interpretations**

## HTTP/2 Rapid Reset DDoS campaign {#case-frequency-rate-rapid-reset-2023}

**Period:** August 2023. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** The HTTP/2 campaign repeatedly opened and reset streams, letting relatively few connections generate exceptional request rates. [Cloudflare: HTTP/2 Rapid Reset: deconstructing the record-breaking attack](https://blog.cloudflare.com/technical-breakdown-http2-rapid-reset-ddos-attack/).

**Anomaly interpretation [inferred]:** Measure stream creation and cancellation per connection and per target, not just source-IP counts. Distribution shape complements aggregate rate.

**Telemetry to validate:** HTTP/2-aware edge telemetry, reset counters and time-aligned request rates.

**Boundary / competing explanation:** Ordinary access logs may not expose frame-level resets; encrypted packet metadata alone is insufficient for this feature.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1499/" target="_self">T1499 — Endpoint Denial of Service</a>

## [Midnight Blizzard](https://1200km.com/threat-matrix/actors/G0016/) compromise of Microsoft {#case-frequency-rate-midnight-blizzard-2024}

**Period:** Reported January 2024. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** Microsoft described low-count password attempts against selected accounts through distributed residential proxies. [Microsoft: Midnight Blizzard: Guidance for responders on nation-state attack](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/).

**Anomaly interpretation [inferred]:** This is an evasion case for simple rate thresholds. Aggregate repeated targeting across sources, retaining the affected identities and observation window.

**Telemetry to validate:** Identity sign-in results, account IDs, source networks and provider risk signals.

**Boundary / competing explanation:** Do not claim that every tenant-local detector must fail or that unrelated successful logins prove compromise.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1110.003/" target="_self">T1110.003 — Brute Force: Password Spraying</a>

**Crosslinks:** [Volumetric](https://1200km.com/anomaly-detection-atlas/families/volumetric/#anomaly-volumetric) · [Geographic / ASN](https://1200km.com/anomaly-detection-atlas/families/geographic-asn/#anomaly-geographic-asn). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#14-rate-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-14-from-threat-intelligence-to-detection-a-practitioner-s-guide-2d930b168426/" target="_self">From Threat Intelligence to Detection: A Practitioner’s Guide</a>.
<!-- anomaly-evidence:frequency-rate:end -->

**Illustrative scenarios (not additional incidents):**

- A single user account generates 45 failed VPN logins in 6 minutes, far above its normal authentication rate.

- One API client that typically makes 2–3 requests per minute suddenly sends 1,200 token validation requests in 10 minutes.

- A workstation that usually launches a browser a few times per hour suddenly starts 300 PowerShell processes in 15 minutes.

- A host that normally performs low-volume name resolution suddenly issues hundreds of DNS queries per minute to many rare domains.

- A service account that usually accesses one mailbox at a time suddenly performs repeated read operations across dozens of mailboxes in a short window.

## Apply this analytical view

These are curated conceptual links, not claims that a specific model detected the cited incidents.

**Models:** [Repeated password guessing against an account](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#password-guessing) · [Low-volume failures distributed across many accounts](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#password-spraying) · [Repeated MFA prompts and denials](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#mfa-fatigue) · [Repeated probing of public services](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#external-service-scanning) · [Internal network services or systems scanned](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#internal-service-scanning).

**Collection references:** [User Account Authentication](https://1200km.com/ttp-simulation/telemetry/DC0002/) · [Network Connection Creation](https://1200km.com/ttp-simulation/telemetry/DC0082/) · [Active Directory Credential Request](https://1200km.com/ttp-simulation/telemetry/DC0084/). These describe data components, not equivalent connectors or guaranteed fields.



## Technique workspaces

Follow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.

- [T1499 Endpoint Denial of Service](https://1200km.com/threat-matrix/techniques/T1499/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1499/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1499/)
- [T1110.003 Password Spraying](https://1200km.com/threat-matrix/techniques/T1110.003/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1110.003/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1110.003/) · tools: [CrackMapExec](https://1200km.com/ttp-simulation/tools/S0488/), [MailSniper](https://1200km.com/ttp-simulation/tools/S0413/)
