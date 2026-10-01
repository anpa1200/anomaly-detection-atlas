---
title: "Kerberoasting: retain the real zero-match result"
---

# Kerberoasting: retain the real zero-match result

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Maintained entry path added 1 October 2026. Results below are preserved reports dated 21 September 2026, not independent replication or new engine execution. [Evidence provenance](https://1200km.com/anomaly-detection-atlas/research/provenance/).

## Hypothesis

A principal requests successful service tickets for an unusually broad set of service identifiers in a bounded window. This breadth hypothesis cannot cover every Kerberoasting execution.

## Required fields and collection

Normalized table: **WindowsEvents**. These are adapter contracts, not vendor-native connector guarantees.

```text
TimeGenerated:datetime,Computer:string,EvidenceId:string,EventID:int,Principal:string,SourceIP:string,LogonId:string,AccessMask:long,ObjectType:string,Properties:string,ServiceName:string,EncryptionType:string,ResultCode:string,LogonType:int,LogonProcess:string,AuthenticationPackage:string
```

[Full normalized contracts](https://1200km.com/articles/research/anomaly-validation/contracts.json) · [Collection requirements](https://1200km.com/anomaly-detection-atlas/research/telemetry/).

## Existing query and model

The existing query filters successful 4769 events, deduplicates evidence, includes AES, excludes krbtgt and requires five distinct services in 15 minutes.

[Read the maintained query in context](https://1200km.com/anomaly-detection-atlas/research/queries/#kerberoasting--rc4-tgs-volume) · [Download unchanged KQL](https://1200km.com/articles/research/anomaly-validation/kerberoasting.kql).

## Positive and benign or boundary fixtures

These rows come from the existing functional report. Expected and actual values describe selected logic behavior, not real-world accuracy.

| Existing fixture | Expected output | Reported observed output | Status |
|---|---|---|---|
| `kerberoast-aes-breadth` | `[["user",5]]` | `[["user",5]]` | Reported pass |
| `kerberoast-machine-principal-not-hidden` | `[["computer$",5]]` | `[["computer$",5]]` | Reported pass |
| `kerberoast-low-volume-known-blind-spot` | `[]` | `[]` | Reported pass |
| `kerberoast-krbtgt-not-counted` | `[]` | `[]` | Reported pass |
| `kerberoast-repeated-service-not-breadth` | `[]` | `[]` | Reported pass |

**Reported public-recording observation:** one input 4769 record, zero query output rows. The recording is not repeated or modified to force a match. See the [pinned recording manifest](https://github.com/anpa1200/medium-blog-navigation/blob/a94750828ed75dbce4c1e9a9f4ea1994fa785943/research/anomaly-validation/datasets.json).

[Original functional report](https://1200km.com/articles/research/anomaly-validation/functional-results.json) · [Exact fixture construction](https://github.com/anpa1200/medium-blog-navigation/blob/a94750828ed75dbce4c1e9a9f4ea1994fa785943/research/anomaly-validation/run_validation.py).

## Safe reproduction and limits

Start with the [offline reproduction README](https://1200km.com/articles/research/anomaly-validation/README.md). Its standard-library checks parse fixtures and recorded data; they do not execute attack commands. An engine replay is a separate opt-in workflow and was not run in this change.

The pinned public recording has one input record and zero output rows: it is below the breadth threshold. That is a known miss, not evidence of benignness. Repeated requests for one service and low-volume activity remain outside the rule; machine principals are not automatically excluded.

The existing seeded 2688-entity-day study is synthetic. Its gate reduced FP 85→8 and TP 18→11. This is a constructed trade-off, not an enterprise benchmark. Eight reported KQL examples and 34 functional cases do not make the 54 catalog rows validated detectors. [Full validation boundaries](https://1200km.com/anomaly-detection-atlas/research/validation/).
