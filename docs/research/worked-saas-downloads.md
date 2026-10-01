---
title: "SaaS downloads: distinguish a spike from missing collection"
description: "Compare a SaaS download spike with collection gaps using unchanged volume queries, normalized fields, preserved fixture observations and suppression limits."
---

# SaaS downloads: distinguish a spike from missing collection

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Maintained entry path added 1 October 2026. Results below are preserved reports dated 21 September 2026, not independent replication or new engine execution. [Evidence provenance](https://1200km.com/anomaly-detection-atlas/research/provenance/).

## Hypothesis

A user’s complete observed UTC-day download count differs materially from that same tenant/user’s historical daily counts. Missing collection must remain missing, not become an observed zero.

## Required fields and collection

Normalized table: **DailyDownloads**. These are adapter contracts, not vendor-native connector guarantees.

```text
TenantId:string,UserId:string,Day:datetime,Count:long,Complete:bool
```

[Full normalized contracts](https://1200km.com/articles/research/anomaly-validation/contracts.json) · [Collection requirements](https://1200km.com/anomaly-detection-atlas/research/telemetry/).

## Existing query and model

Use the existing median/MAD example and explicit zero-MAD policy over comparable complete daily rows; preserve insufficient-history and missing-telemetry states instead of dropping the entity. Counts are audit events, not unique files or bytes.

[Read the maintained query in context](https://1200km.com/anomaly-detection-atlas/research/queries/#saas-bulk-download-anomaly-m365-sharepoint--onedrive) · [Download unchanged KQL](https://1200km.com/articles/research/anomaly-validation/bulk-download.kql).

## Positive and benign or boundary fixtures

These rows come from the existing functional report. Expected and actual values describe selected logic behavior, not real-world accuracy.

| Existing fixture | Expected output | Reported observed output | Status |
|---|---|---|---|
| `bulk-zero-mad-spike` | `[["above-baseline"]]` | `[["above-baseline"]]` | Reported pass |
| `bulk-zero-mad-small-change` | `[["within-baseline"]]` | `[["within-baseline"]]` | Reported pass |
| `bulk-cold-start` | `[["insufficient-history"]]` | `[["insufficient-history"]]` | Reported pass |
| `bulk-missing-history-not-zero` | `[["insufficient-history"]]` | `[["insufficient-history"]]` | Reported pass |
| `bulk-current-outage` | `[["missing-telemetry"]]` | `[["missing-telemetry"]]` | Reported pass |
| `bulk-current-null-count` | `[["missing-telemetry"]]` | `[["missing-telemetry"]]` | Reported pass |

[Original functional report](https://1200km.com/articles/research/anomaly-validation/functional-results.json) · [Exact fixture construction](https://github.com/anpa1200/medium-blog-navigation/blob/a94750828ed75dbce4c1e9a9f4ea1994fa785943/research/anomaly-validation/run_validation.py).

## Safe reproduction and limits

Start with the [offline reproduction README](https://1200km.com/articles/research/anomaly-validation/README.md). Its standard-library checks parse fixtures and recorded data; they do not execute attack commands. An engine replay is a separate opt-in workflow and was not run in this change.

Approved migrations, backups and workload changes can explain a spike. The fixture threshold is illustrative. Independent completeness monitoring and a native connector adapter are required; no SaaS production negative corpus or connector is validated.

The existing seeded 2688-entity-day study is synthetic. Its gate reduced FP 85→8 and TP 18→11. This is a constructed trade-off, not an enterprise benchmark. Eight reported KQL examples and 34 functional cases do not make the 54 catalog rows validated detectors. [Full validation boundaries](https://1200km.com/anomaly-detection-atlas/research/validation/).
