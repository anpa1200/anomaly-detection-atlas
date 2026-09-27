---
title: "Graph / Relationship"
description: "Investigate graph / relationship with source-reported cases, telemetry requirements, model links, and explicit validation limits."
sidebar_label: "Graph / Relationship"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Graph / Relationship {#anomaly-graph-relationship}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="anomaly-graph-relationship"></span>

A new or unusual edge, path or community relationship.

**Telemetry contract:** Verified identities, effective permissions, resource ownership, authentication and network observations.

**Candidate method [unvalidated until tested]:** Define graph direction, edge meaning, observation window and novelty against a past-only graph.

**Benign alternatives and limits:** Migrations, new projects and automated infrastructure can legitimately create many edges.

<ResearchFigure id="family-graph-relationship" />

<!-- anomaly-evidence:graph-relationship:start -->
**Evidence tags:** [Identity and access](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-identity) · [Cloud and SaaS](https://1200km.com/anomaly-detection-atlas/research/incidents/#tag-cloud). **Statistical forms:** [contextual](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-contextual), [collective](https://1200km.com/anomaly-detection-atlas/research/foundations/#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-graph-relationship" target="_self">Browse articles and guides: Graph / Relationship</a>.

**Reported incidents and detection interpretations**

## [Midnight Blizzard](https://1200km.com/threat-matrix/actors/G0016/) compromise of Microsoft {#case-graph-relationship-midnight-blizzard-2024}

**Period:** Reported January 2024. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** Microsoft described a compromised legacy OAuth application being used to grant malicious applications Exchange full_access_as_app access. [Microsoft: Midnight Blizzard: Guidance for responders on nation-state attack](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/).

**Anomaly interpretation [inferred]:** Model principal, application, consent and mailbox-access edges. Investigate a new privileged path rather than treating each grant as an isolated event.

**Telemetry to validate:** Application credentials, consent and role-assignment audit history; EWS access.

**Boundary / competing explanation:** A new graph edge is not proof of abuse, and the report does not establish that graph analytics detected the intrusion.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1098/" target="_self">T1098 — Account Manipulation</a>

## Storm-1283 OAuth-enabled cryptomining {#case-graph-relationship-storm1283-2023}

**Period:** Reported December 2023. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** The compromised subscription owner granted the attacker-created application Contributor permissions, enabling subsequent VM deployment. [Microsoft: Threat actors misuse OAuth applications to automate financially driven attacks](https://www.microsoft.com/en-us/security/blog/2023/12/12/threat-actors-misuse-oauth-applications-to-automate-financially-driven-attacks/).

**Anomaly interpretation [inferred]:** Trace the new user-to-application-to-subscription path and its first resource actions. Link authorization changes to what the newly authorized principal actually did.

**Telemetry to validate:** Directory audit, Azure role assignments and resource deployment activity.

**Boundary / competing explanation:** Infrastructure-as-code can produce similar edges; compare ownership, approval and expected resource scope.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1098/" target="_self">T1098 — Account Manipulation</a>

**Crosslinks:** [State-Change](https://1200km.com/anomaly-detection-atlas/families/state-change/#anomaly-state-change) · [Identity / Access](https://1200km.com/anomaly-detection-atlas/families/identity-access/#anomaly-identity-access). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#75-graph-evolution-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-14-from-threat-intelligence-to-detection-a-practitioner-s-guide-2d930b168426/" target="_self">From Threat Intelligence to Detection: A Practitioner’s Guide</a>.
<!-- anomaly-evidence:graph-relationship:end -->

**Illustrative scenarios (not additional incidents):**

- A low-privilege user is suddenly added to a group that creates a new privilege path to domain admin through nested Active Directory memberships.

- An IAM role that normally accesses only one application is granted trust relationships that connect it to multiple high-value cloud resources it never touched before.

- A workstation begins communicating with a server segment that is normally reachable only by backup or management systems, creating a new network edge outside its usual community.

- A SaaS account that historically had no relationship to executive mailboxes suddenly gains delegated access to several senior leadership accounts.

- A service account becomes the bridge between two previously separate environments by authenticating to both the on-prem domain and cloud admin plane, creating an unusual cross-environment path.

## Apply this analytical view

These are curated conceptual links, not claims that a specific model detected the cited incidents.

**Models:** [Credential, group, role, or account-property modification](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#account-manipulation) · [Remote administrative service used between systems](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#remote-service-lateral-movement) · [Process injection or in-memory execution](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#process-injection) · [Accounts, groups, roles, or permissions enumerated](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/#account-enumeration).

**Collection references:** [Active Directory Object Modification](https://1200km.com/ttp-simulation/telemetry/DC0066/) · [Logon Session Creation](https://1200km.com/ttp-simulation/telemetry/DC0067/) · [Network Connection Creation](https://1200km.com/ttp-simulation/telemetry/DC0082/). These describe data components, not equivalent connectors or guaranteed fields.



## Technique workspaces

Follow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.

- [T1098 Account Manipulation](https://1200km.com/threat-matrix/techniques/T1098/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/T1098/) · [simulation](https://1200km.com/ttp-simulation/techniques/enterprise/T1098/) · tools: [Mimikatz](https://1200km.com/ttp-simulation/tools/S0002/)
