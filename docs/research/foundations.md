---
title: "Foundations: from unusual activity to evidence"
description: "Anomaly Detection Atlas: foundations: from unusual activity to evidence, with source evidence and implementation boundaries."
sidebar_label: "Foundations: from unusual activity to evidence"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# The Hypothesis — Scope and Definitions {#1-the-hypothesis--scope-and-definitions}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="1-the-hypothesis--scope-and-definitions"></span>

The claim that malicious activity creates detectable anomaly patterns underpins UEBA platforms, ML-based SIEM analytics, network traffic analysis tools, and a large portion of behavioural detection engineering practice.

The operational hypothesis is conditional: some malicious behavior differs measurably from a suitable baseline in available telemetry. This selected case series does not establish how often that holds across attacks or enterprises. Absence of an anomaly may reflect ordinary-looking malicious behavior, the wrong comparison population or missing observations.

## Definitions {#11-definitions}


**Anomaly.** NIST SP 800–94 defines anomaly-based intrusion detection as the comparison of normal activity profiles against observed events to identify significant deviations[[1]](https://csrc.nist.gov/pubs/sp/800/94/final). In operational terms, an anomaly is a measurable deviation from one or more baselines: an entity baseline (this user, this host), a peer baseline (users in this role, hosts in this class), a temporal baseline (activity at this time of day), a relationship model (who normally communicates with whom), or an event-sequence model (what normally follows what).

### Point anomaly {#anomaly-form-point}

A single data instance that is anomalous relative to the rest of the data (Chandola et al., 2009)[[2]](https://dl.acm.org/doi/10.1145/1541880.1541882).
**Synthetic example:** one observation lies far outside the rest of a fixed, explicitly defined univariate distribution. If its unusualness depends on that host's history or role, the analysis is also contextual; these interpretations need not be mutually exclusive.

<ResearchFigure id="statistical-forms" />

### Contextual anomaly {#anomaly-form-contextual}

An instance that is anomalous only in a specific context[[2]](https://dl.acm.org/doi/10.1145/1541880.1541882).
**Synthetic example:** an IFM backup operation on a domain controller outside the approved maintenance context differs from the same operation during a verified backup job. The host role, principal and purpose matter; the executable name alone is not a verdict.

<ResearchFigure id="definition-contextual" />

### Collective anomaly {#anomaly-form-collective}

A collection of related instances that is anomalous together, even if each individual instance is not[[2]](https://dl.acm.org/doi/10.1145/1541880.1541882).
**Synthetic example:** a sequence of individually ordinary authentication, permission and data-access events departs from an expected workflow when considered together. The sequence still needs benign alternatives and reliable event/entity correlation.

<ResearchFigure id="definition-collective" />

**Malicious-behaviour correlation.** The analytical step that links an observed anomaly to an attacker goal, technique, or intrusion stage. An anomaly is not a verdict — it is evidence. A detection becomes operationally useful when that evidence is correlated with asset context, identity state, companion telemetry, or known adversary tradecraft.

<ResearchFigure id="definition-correlation" />

## The Central Tension {#12-the-central-tension}

Malicious activity can be rare relative to ordinary enterprise events. **Precision and false-positive rate are different quantities:** precision is TP / (TP + FP), while false-positive rate is FP / (FP + TN). In an illustrative population of 1,000,000 benign events, a 1% false-positive rate produces 10,000 false alerts. If 100 malicious events are present and recall is 90%, the resulting 90 true alerts yield about 0.89% precision. These are explanatory numbers, not measured results. NIST SP 800–94 discusses the false positives caused by benign deviations from normal profiles[[1]](https://csrc.nist.gov/pubs/sp/800/94/final).

Operational usefulness depends on the costs of misses and false alerts, available observability, and how the output changes an analyst's decision. Stable, role-appropriate baselines can help, but their value must be measured rather than inferred from a rarity score.

<ResearchFigure id="base-rate" />
