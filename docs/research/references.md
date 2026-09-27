---
title: "Sources, provenance, and further research"
description: "Anomaly Detection Atlas: sources, provenance, and further research, with source evidence and implementation boundaries."
sidebar_label: "Sources, provenance, and further research"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# References {#11-references}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="11-references"></span>

<!-- anomaly-evidence:sources:start -->
## Incident-source register (September 2026 expansion) {#incident-primary-sources}

- Mandiant. [UNC5537 Targets Snowflake Customer Instances for Data Theft and Extortion](https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion). Published 2024-06-10; reviewed 2026-09-21.
- Cloudflare. [HTTP/2 Rapid Reset: deconstructing the record-breaking attack](https://blog.cloudflare.com/technical-breakdown-http2-rapid-reset-ddos-attack/). Published 2023-10-10; reviewed 2026-09-21.
- Microsoft. [Midnight Blizzard: Guidance for responders on nation-state attack](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/). Published 2024-01-25; reviewed 2026-09-21.
- Mandiant. [SUNBURST Additional Technical Details](https://cloud.google.com/blog/topics/threat-intelligence/sunburst-additional-technical-details/). Published 2020-12-24; reviewed 2026-09-21.
- ESET. [Industroyer2: Industroyer reloaded](https://www.welivesecurity.com/2022/04/12/industroyer2-industroyer-reloaded/). Published 2022-04-12; reviewed 2026-09-21.
- US Department of Justice. [Former Twitter Employee Found Guilty of Acting as an Agent of a Foreign Government and Unlawfully Sharing Twitter User Information](https://www.justice.gov/archives/opa/pr/former-twitter-employee-found-guilty-acting-agent-foreign-government-and-unlawfully-sharing). Published 2022-08-10; reviewed 2026-09-21.
- US Department of Justice. [Superseding indictment, United States v. Abouammo et al., filed July 28, 2020](https://www.justice.gov/usao-ndca/page/file/1299331/dl?inline=). Published 2020-07-28; reviewed 2026-09-21.
- Microsoft. [Threat actors misuse OAuth applications to automate financially driven attacks](https://www.microsoft.com/en-us/security/blog/2023/12/12/threat-actors-misuse-oauth-applications-to-automate-financially-driven-attacks/). Published 2023-12-12; reviewed 2026-09-21.
- Mandiant. [UNC3944 Targets SaaS Applications](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications/). Published 2024-06-13; reviewed 2026-09-21.
- The DFIR Report. [BazarCall to Conti Ransomware via Trickbot and Cobalt Strike](https://thedfirreport.com/2021/08/01/bazarcall-to-conti-ransomware-via-trickbot-and-cobalt-strike/). Published 2021-08-01; reviewed 2026-09-21.
- Microsoft. [Microsoft mitigates China-based threat actor Storm-0558 targeting of customer email](https://www.microsoft.com/en-us/msrc/blog/2023/07/microsoft-mitigates-china-based-threat-actor-storm-0558-targeting-of-customer-email). Published 2023-07-11; reviewed 2026-09-21.
- Mandiant. [MESSAGETAP: Who's Reading Your Text Messages?](https://cloud.google.com/blog/topics/threat-intelligence/messagetap-who-is-reading-your-text-messages/). Published 2019-10-31; reviewed 2026-09-21.
- Microsoft. [Analyzing attacks taking advantage of the Exchange Server vulnerabilities](https://www.microsoft.com/en-us/security/blog/2021/03/25/analyzing-attacks-taking-advantage-of-the-exchange-server-vulnerabilities/). Published 2021-03-25; reviewed 2026-09-21.
- Palo Alto Networks Unit 42. [OilRig Targets Middle Eastern Telecommunications Organization and Adds Novel C2 Channel with Steganography to Its Inventory](https://unit42.paloaltonetworks.com/oilrig-novel-c2-channel-steganography/). Published 2020-07-22; reviewed 2026-09-21.
- Sysdig. [How to Detect SCARLETEEL with Sysdig Secure](https://www.sysdig.com/blog/detect-scarleteel-sysdig-secure). Published 2023-03-29; reviewed 2026-09-21.
- Sophos. [AuKill EDR killer malware abuses Process Explorer driver](https://www.sophos.com/en-us/blog/aukill-edr-killer-malware-abuses-process-explorer-driver). Published 2023-04-19; reviewed 2026-09-21.
- Mandiant. [Zero-Day Vulnerability in MOVEit Transfer Exploited for Data Theft](https://cloud.google.com/blog/topics/threat-intelligence/zero-day-moveit-data-theft). Published 2023-06-02; reviewed 2026-09-21.
<!-- anomaly-evidence:sources:end -->

## Statistical and implementation references {#statistical-and-implementation-references}

- NIST. [Guide to Intrusion Detection and Prevention Systems, SP 800–94](https://csrc.nist.gov/pubs/sp/800/94/final), 2007.
- Chandola, Banerjee and Kumar. [Anomaly Detection: A Survey](https://dl.acm.org/doi/10.1145/1541880.1541882), 2009; [author technical-report version hosted by the University of Minnesota](https://conservancy.umn.edu/server/api/core/bitstreams/108030d3-3bf3-4c58-bd60-77d0644f8359/content). The publisher endpoint restricted automated access during this revision; the university copy was accessible.
- MITRE. [ATT&CK version history](https://attack.mitre.org/resources/versions/) and [April 2026 changes](https://attack.mitre.org/resources/updates/updates-april-2026/). Mapping edition: Enterprise v19.2.
- Microsoft. [Sysmon reference](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon), [Security event 4662](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4662), [Kusto time-window joins](https://learn.microsoft.com/en-us/kusto/query/join-time-window), and [Kusto emulator limitations](https://learn.microsoft.com/en-us/azure/data-explorer/kusto-emulator-overview).
- Splunk. [Attack Data repository](https://github.com/splunk/attack_data/tree/6bc794b7f65562148c872fde1e7412ab3c173f4c). Exact recording paths, SHA-256 hashes and license are in the downloadable dataset manifest.
- LANL. [Comprehensive, Multi-Source Cyber-Security Events](https://csr.lanl.gov/data/cyber1/). Proposed follow-up source; not used to generate this revision's results.

## Additional incident and correction references {#additional-incident-and-correction-references}

- CSRB. [Review of the Summer 2023 Microsoft Exchange Online Intrusion](https://www.cisa.gov/sites/default/files/2024-03/CSRB%20Review%20of%20the%20Summer%202023%20MEO%20Intrusion%20Final_508c.pdf), 2024.
- Microsoft. [Volt Typhoon investigation](https://www.microsoft.com/en-us/security/blog/2023/05/24/volt-typhoon-targets-us-critical-infrastructure-with-living-off-the-land-techniques/), May 2023.
- Mandiant. [APT41 Has Arisen From the DUST](https://cloud.google.com/blog/topics/threat-intelligence/apt41-arisen-from-dust), July 2024.
- SentinelOne. [SmoothOperator / 3CX investigation](https://www.sentinelone.com/blog/smoothoperator-ongoing-campaign-trojanizes-3cx-software-in-software-supply-chain-attack/), March 2023.
- AWS. [GuardDuty IAM findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-iam.html) and [RDS IAM authentication limitations](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html). The token-generation observability discrepancy remains unresolved.

## Companion research {#companion-research}

- <a href="https://1200km.com/anomaly-detection-atlas/" target="_self">Anomaly Detection Atlas — statistical definitions and detection design</a>.
- <a href="https://1200km.com/threat-matrix/" target="_self">Threat Matrix — behavior-oriented ATT&CK exploration</a>.
- <a href="https://1200km.com/adversarygraph/" target="_self">AdversaryGraph — evidence and investigation workflows</a>. Enrichment and correlation support investigation; they do not validate attribution automatically.

<span id="follow-for-practical-cybersecurity-research"></span>

## Follow My Work {#follow-my-work}

I publish practical cybersecurity research, CTI workflows, detection engineering notes, malware-analysis projects, AI-security research, open-source tools, labs, and technical guides.

- <a href="https://1200km.com/" target="_self">Website — 1200km.com</a>
- [Medium — @1200km](https://medium.com/@1200km)
- [LinkedIn — Andrey Pautov](https://www.linkedin.com/in/andrey-pautov/)
- [GitHub — tools and labs](https://github.com/anpa1200)
- [Contact — 1200km@gmail.com](mailto:1200km@gmail.com)
