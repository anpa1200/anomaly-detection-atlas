---
title: "Validation, baselines, and operational decisions"
description: "Anomaly Detection Atlas: validation, baselines, and operational decisions, with source evidence and implementation boundaries."
sidebar_label: "Validation, baselines, and operational decisions"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Implementation Guidance {#9-implementation-guidance}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="9-implementation-guidance"></span>

## Instrument Before Modelling {#91-instrument-before-modelling}

Start with a threat hypothesis and a collection test. Confirm event generation, forwarding, parsing, identity normalization, retention and clock behavior. Record the data that is absent as well as the data that arrives. A valid query over an empty or misparsed table is not detection coverage.

Treat event time and ingestion time separately. Define allowed lateness, query overlap and stable alert identifiers so retries do not create duplicate incidents. Preserve raw evidence and adapter versions. Host-role or identity enrichment can be wrong; its provenance belongs in the investigation output.

## Prioritise by Baseline Stability {#92-prioritise-by-baseline-stability}

Choose a baseline only after examining the feature distribution. Counts can be sparse, seasonal and overdispersed. A Poisson model assumes a particular relationship between mean and variance; do not assume it fits authentication or API counts. A z-score can still be a feature, but a normal-tail probability is not justified merely by computing it.

Median and median absolute deviation (MAD) are candidates for robust location and scale, not universal replacements. A zero MAD is common with sparse counts. Define what happens then; do not divide by zero, discard the entity or pretend a small constant is scientifically calibrated. Consider empirical quantiles, appropriate count models, categorical novelty and seasonal residuals according to the feature and sample size.

Remove unsupported High/Medium/Low false-positive and fidelity ratings. Until measured, describe anticipated benign explanations and operational requirements. Deterministic rules still require validation: a process relationship, named pipe or snapshot deletion is not structurally equivalent to malicious intent.

## Baseline by Role, Not by Estate {#93-baseline-by-role-not-by-estate}

Specify the entity, comparison population, observation window and feature units. A user's uploads must not become the baseline for their downloads. A daily total should not be compared directly with a rolling 40-minute count. Different roles, shift patterns, automation and newly onboarded systems can require different treatment.

TF-IDF is feature weighting, not a clustering algorithm. If using it with clustering, document the representation, normalization, distance function and clustering method separately. Peer membership and model outputs can also expose sensitive personnel information; minimize access and avoid equating deviations with employee misconduct.

## Accumulate Weak Signals via Entity Risk Scoring {#94-accumulate-weak-signals-via-entity-risk-scoring}

Use entity and causal context, not mere temporal coincidence. Joining every tenant success to every failure burst invents relationships. Correlated sources may duplicate the same underlying event, so adding their scores is not independent corroboration. Calibrate score interpretation and avoid labeling an arbitrary risk score as a probability of maliciousness.

Separate **investigation priority**, **incident declaration** and **automatic containment**. One reliable, consequential observation may justify immediate investigation. Conversely, several weak or duplicated observations may not justify disruptive action. Record competing explanations and why the next action is proportionate.

## Validate with Purple-Team Exercises {#95-validate-with-purple-team-exercises}

Use only authorized, isolated test identities and systems. This revision replays recorded logs; it does not launch password sprays, credential extraction or live exploitation. Exercise results should document what ran, what was collected, what matched, what did not, and whether the alert contained usable evidence.

Positive cases are necessary but insufficient. Include approved replication, alternate-credential administration, software deployment, backups, browser/DNS diversity, scheduled downloads, missing logs, duplicate events and parser changes. A successful lab exercise does not estimate a production false-positive rate.

<ResearchFigure id="operational-workflow" />

## A reproducible statistical study {#96-a-reproducible-statistical-study}

<ResearchFigure id="study-splits" />

For a real deployment study, predeclare the target population, prediction unit, labels, costs and evaluation period. Separate chronological training, validation and testing; keep future observations out of every feature and baseline. Where relevant, separate campaigns or entities to test generalization. Do not tune on the held-out test or retrospectively select only incidents the detector catches.

Report confusion counts, alert precision, incident recall, false alerts per observed entity-day, detection delay and investigation workload. Use precision-recall analysis alongside, rather than being reassured solely by, ROC curves in rare-event settings. Labels must distinguish benign, malicious and unresolved; an unlabeled event is not automatically a true negative. Uncertainty should respect clustered entities/incidents rather than treating every log line as independent.

This revision includes a **seeded synthetic sensitivity experiment** to expose baseline and gate trade-offs. Its numbers describe the generated world, not enterprise performance. The public-recording replay in [Section 8](https://1200km.com/anomaly-detection-atlas/research/queries/) is a separate evidence class. Neither supplies a representative production negative corpus.

**Synthetic experiment, not enterprise performance:** 2688 entity-days across 48 generated entities. Training uses days 0–27, validation 28–41 and the frozen test 42–55. The test contains 26 labeled generated attack entity-days and 646 generated benign entity-days. Parameters are selected on validation, not the test; gated MAD reuses the ungated threshold to isolate the gate's effect.

| Model | TP | FP | FN | TN | Precision | Recall |
|---|---:|---:|---:|---:|---:|---:|
| global-z | 8 | 12 | 18 | 634 | 40.0% | 30.8% |
| entity-z | 14 | 45 | 12 | 601 | 23.7% | 53.8% |
| entity-mad | 18 | 85 | 8 | 561 | 17.5% | 69.2% |
| entity-mad-gated | 11 | 8 | 15 | 638 | 57.9% | 42.3% |

In this constructed example, robust scale is not a free improvement: role variation, sparse counts, scheduled work and legitimate test-period drift affect the results. Corroboration removes both benign alerts and generated attacks. The generator deliberately makes the corroborating signal more likely for attacks; its apparent usefulness is therefore an assumption of this toy world, not a discovery about real telemetry. Read the <a href="https://1200km.com/articles/research/anomaly-validation/synthetic-study.json" target="_self">study specification and results</a> and <a href="https://1200km.com/articles/research/anomaly-validation/synthetic-study.csv" target="_self">generated dataset</a>. Reproduce with `python3 research/anomaly-validation/statistical_study.py`.

LANL's public authentication data could support a larger, carefully scoped follow-up. Its anonymized DNS relationship data is not suitable for raw-label entropy evaluation, and its red-team labels do not exhaust all behavior. Dataset suitability must be checked per analytic. [LANL dataset specification](https://csr.lanl.gov/data/cyber1/).

<ResearchFigure id="study-results" />

## Revision, reproducibility and remaining work {#97-revision-reproducibility-and-remaining-work}

The machine-readable issue ledger distinguishes textual correction, functional execution, unresolved external evidence and production validation. It reconciles the earlier audit and external review rather than claiming their counts are independent. Download the <a href="https://1200km.com/articles/research/anomaly-fact-audit.md" target="_self">audit</a>, <a href="https://1200km.com/articles/research/anomaly-validation/bundle.json" target="_self">validation bundle</a> and <a href="https://1200km.com/articles/research/anomaly-incidents.json" target="_self">incident register</a>.

The original publication URL and its anchors remain available as a publication snapshot. The Atlas now provides the integrated research chapters and family pages. Tags indicate relevance, not factual certification. The original Medium edition is not automatically synchronized; publication access is required to update its text and correction notice. No claim of a live Medium correction follows from changing this repository.

## Conclusion {#10-conclusion}

Documented intrusions show that malicious activity can produce observable deviations. Some investigations, including Storm-0558 and 3CX, report detections that contributed to discovery. Other incident-to-anomaly mappings in this article are retrospective hypotheses, not demonstrations that a proposed rule would have caught the intrusion.

The useful question is not whether an action looks unusual in isolation. It is whether the available telemetry, comparison population and analytic produce evidence that improves an analyst's decision at an acceptable operational cost. A high anomaly score does not establish maliciousness, actor identity or permission to contain a system.

This revision separates source facts, proposed detection logic, functional tests, public lab-recording observations and a synthetic statistical experiment. It preserves negative results and known blind spots. None of those evidence classes alone establishes production precision, incident recall or universal thresholds.

The practical sequence is: **verify collection, define the feature, choose and test the baseline, preserve evidence, evaluate benign alternatives, and measure the decision outcome**. Correlation can improve an investigation, but it must not turn unrelated events into a story or conceal what the detector misses.
