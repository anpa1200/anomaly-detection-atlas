---
title: "Password spraying: correlate attempted identities, then success"
---

# Password spraying: correlate attempted identities, then success

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Maintained entry path added 1 October 2026. Results below are preserved reports dated 21 September 2026, not independent replication or new engine execution. [Evidence provenance](https://1200km.com/anomaly-detection-atlas/research/provenance/).

## Hypothesis

A tenant-local failure burst across multiple identities and sources is followed by success for an identity actually attempted in that burst. This is an investigation candidate, not proof that the successful account was compromised.

## Required fields and collection

Normalized table: **SigninEvents**. These are adapter contracts, not vendor-native connector guarantees.

```text
TimeGenerated:datetime,TenantId:string,UserId:string,EventId:string,IPAddress:string,ResultType:string
```

[Full normalized contracts](https://1200km.com/articles/research/anomaly-validation/contracts.json) · [Collection requirements](https://1200km.com/anomaly-detection-atlas/research/telemetry/).

## Existing query and model

The existing fixed 15-minute bin requires at least six 50126 failures, three accounts and two sources, then completed success (0) after that identity’s last failure within 30 minutes.

[Read the maintained query in context](https://1200km.com/anomaly-detection-atlas/research/queries/#distributed-password-spray--rate-and-shape) · [Download unchanged KQL](https://1200km.com/articles/research/anomaly-validation/password-spray.kql).

## Positive and benign or boundary fixtures

These rows come from the existing functional report. Expected and actual values describe selected logic behavior, not real-world accuracy.

| Existing fixture | Expected output | Reported observed output | Status |
|---|---|---|---|
| `spray-success-after-own-failures` | `[["tenant1","u0","s1"]]` | `[["tenant1","u0","s1"]]` | Reported pass |
| `spray-unrelated-user` | `[]` | `[]` | Reported pass |
| `spray-other-tenant` | `[]` | `[]` | Reported pass |
| `spray-50140-not-success` | `[]` | `[]` | Reported pass |
| `spray-fixed-bin-boundary-known-blind-spot` | `[]` | `[]` | Reported pass |

[Original functional report](https://1200km.com/articles/research/anomaly-validation/functional-results.json) · [Exact fixture construction](https://github.com/anpa1200/medium-blog-navigation/blob/a94750828ed75dbce4c1e9a9f4ea1994fa785943/research/anomaly-validation/run_validation.py).

## Safe reproduction and limits

Start with the [offline reproduction README](https://1200km.com/articles/research/anomaly-validation/README.md). Its standard-library checks parse fixtures and recorded data; they do not execute attack commands. An engine replay is a separate opt-in workflow and was not run in this change.

Shared proxies and outages can resemble a burst. Failure-only, low-volume, unresolved-identity and cross-bin activity can be missed. The boundary fixture deliberately expects no result; a passing regression does not mean the attack was detected.

The existing seeded 2688-entity-day study is synthetic. Its gate reduced FP 85→8 and TP 18→11. This is a constructed trade-off, not an enterprise benchmark. Eight reported KQL examples and 34 functional cases do not make the 54 catalog rows validated detectors. [Full validation boundaries](https://1200km.com/anomaly-detection-atlas/research/validation/).
