---
title: "Visibility limits and competing explanations"
description: "Anomaly Detection Atlas: visibility limits and competing explanations, with source evidence and implementation boundaries."
sidebar_label: "Visibility limits and competing explanations"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# How Attackers Suppress Anomaly Visibility {#7-how-attackers-suppress-anomaly-visibility}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="7-how-attackers-suppress-anomaly-visibility"></span>

Separate reported tradecraft from untested claims about defeating a specific detector.

| Mechanism | Evidence or analytical implication | What this research does not establish |
|---|---|---|
| Distributed activity | [Midnight Blizzard](https://1200km.com/threat-matrix/actors/G0016/)'s residential proxies motivate identity-level correlation alongside source-level counts. | That all tenant-local analytics failed or that every source stayed below every threshold. |
| Valid accounts and native tools | [Volt Typhoon](https://1200km.com/threat-matrix/actors/G1017/) motivates role, actor and change-context analysis. | That native commands are indistinguishable in every available source, or command lines are the only evidence. |
| In-process behavior | A detector requiring a child process misses activity that does not create one. | That Sysmon image-load or remote-thread events cover every injection mechanism. |
| Low-rate collection | Small transfers can avoid a large-transfer rule; longer windows may expose accumulation. | A measured recall advantage without replay and representative benign traffic. |
| Provider-side activity | Some SaaS transfers bypass a customer's endpoint/perimeter sensors. | That no identity, application, provider or destination evidence exists. |
| Baseline contamination | Including the scored event in training or accepting attacker activity as normal can mask deviations. | That a specific historical actor poisoned a particular model unless a source documents it. |
| Collection interruption | Missing logs reduce observability and may distort statistical denominators. | That a missing event proves deliberate evasion rather than outage, filtering, retention or parser failure. |

The campaign-specific sources and boundaries are in [Section 4](https://1200km.com/anomaly-detection-atlas/research/cases/). For an operational analytic, publish its expected blind spots next to the query—not only in a distant disclaimer.

<ResearchFigure id="visibility-limits" />
