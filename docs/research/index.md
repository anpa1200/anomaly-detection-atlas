---
title: Anomaly detection research and engineering
description: One research path from statistical foundations and documented incidents to telemetry contracts, detection models, and scoped validation.
slug: /research
---

import ResearchFigure from '@site/src/components/ResearchFigure';
import ResearchCover from '@site/src/components/ResearchCover';

# Anomaly detection research and engineering

*Malicious Activity as a Statistical Signal, integrated with the Anomaly Detection Atlas.*

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

<ResearchCover />

Use the research to decide what a deviation means, the catalogs to select a measurable model, and the linked workspaces to inspect collection and validation requirements. An unusual observation is a lead—not proof of compromise, attribution, or permission to contain a system.

## Three evidence-led entry paths

- [Password spraying: correlate attempted identities, then success](https://1200km.com/anomaly-detection-atlas/research/worked-password-spray/)
- [SaaS downloads: distinguish a spike from missing collection](https://1200km.com/anomaly-detection-atlas/research/worked-saas-downloads/)
- [Kerberoasting: retain the real zero-match result](https://1200km.com/anomaly-detection-atlas/research/worked-kerberoasting/)

Each follows hypothesis → required fields → unchanged query/model → positive and benign/boundary fixtures → reported result → limitations.

## Start with a question

- **What looks unusual?** Choose one of the [14 operational families and the correlation pattern](https://1200km.com/anomaly-detection-atlas/families/).
- **What should be measured?** Inspect the [activity-to-anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/), [118 statistical concepts](https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/), and [175 source categories](https://1200km.com/anomaly-detection-atlas/security-log-source-taxonomy/). These are different, overlapping taxonomies.
- **Can I collect it?** Verify the [telemetry contracts](https://1200km.com/anomaly-detection-atlas/research/telemetry/) and the [configuration-oriented Telemetry Library](https://1200km.com/ttp-simulation/telemetry/).
- **Can I test it?** Read the [maintained queries](https://1200km.com/anomaly-detection-atlas/research/queries/) and [validation limits](https://1200km.com/anomaly-detection-atlas/research/validation/), then open an authorized [simulation workspace](https://1200km.com/ttp-simulation/).

<ResearchFigure id="research-map" />

## Research chapters

- [Foundations: from unusual activity to evidence](https://1200km.com/anomaly-detection-atlas/research/foundations/)
- [Incident register and evidence boundaries](https://1200km.com/anomaly-detection-atlas/research/incidents/)
- [ATT&CK mapping and version boundaries](https://1200km.com/anomaly-detection-atlas/research/attack-mapping/)
- [Documented campaigns and detection interpretations](https://1200km.com/anomaly-detection-atlas/research/cases/)
- [Telemetry contracts and collection requirements](https://1200km.com/anomaly-detection-atlas/research/telemetry/)
- [Credential-access detection engineering](https://1200km.com/anomaly-detection-atlas/research/credentials/)
- [Visibility limits and competing explanations](https://1200km.com/anomaly-detection-atlas/research/visibility/)
- [Detection patterns and maintained KQL examples](https://1200km.com/anomaly-detection-atlas/research/queries/)
- [Validation, baselines, and operational decisions](https://1200km.com/anomaly-detection-atlas/research/validation/)
- [Sources, provenance, and further research](https://1200km.com/anomaly-detection-atlas/research/references/)
- [Password spraying: correlate attempted identities, then success](https://1200km.com/anomaly-detection-atlas/research/worked-password-spray/)
- [SaaS downloads: distinguish a spike from missing collection](https://1200km.com/anomaly-detection-atlas/research/worked-saas-downloads/)
- [Kerberoasting: retain the real zero-match result](https://1200km.com/anomaly-detection-atlas/research/worked-kerberoasting/)

## Evidence and publication history

The 55 active figures retain their original captions, source links, text equivalents, evidence labels, and full-size assets. [Browse every figure in context](https://1200km.com/anomaly-detection-atlas/visuals/). Superseded original illustrations remain only in the [historical publication appendix](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/#98-historical-illustrations-and-corrected-navigation), not as current guidance.

**Maintained version:** the Atlas is the current reference. The [full-length article](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/) remains a publication snapshot for citations and old anchors. The Atlas is the integrated navigation and engineering reference. [Read import provenance and the bounded consolidation audit](https://1200km.com/anomaly-detection-atlas/research/provenance/). This consolidation does not claim new incident fact-checking or new detector execution.
