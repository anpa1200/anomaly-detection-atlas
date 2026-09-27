---
title: "Detection patterns and maintained KQL examples"
description: "Anomaly Detection Atlas: detection patterns and maintained kql examples, with source evidence and implementation boundaries."
sidebar_label: "Detection patterns and maintained KQL examples"
---

import ResearchFigure from '@site/src/components/ResearchFigure';

# Detection Engineering Patterns and Logic Examples {#8-detection-engineering-patterns-and-logic-examples}

[Atlas home](https://1200km.com/anomaly-detection-atlas/) · [Research path](https://1200km.com/anomaly-detection-atlas/research/) · [Operational families](https://1200km.com/anomaly-detection-atlas/families/) · [Anomaly models](https://1200km.com/anomaly-detection-atlas/attack-statistical-anomaly-mapping/) · [Visual index](https://1200km.com/anomaly-detection-atlas/visuals/)

> Consolidated 27 September 2026 from the [revised publication](https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](https://1200km.com/anomaly-detection-atlas/research/provenance/).

<span id="8-detection-engineering-patterns-and-logic-examples"></span>

## Four Core Design Patterns {#81-four-core-design-patterns}

**Rarity in role:** compare equivalent entities and tasks rather than the entire estate. Role membership itself must be trustworthy and updated after legitimate changes.

**Rate plus shape:** combine count, distinct targets, distinct sources and ordering. A fixed time bin has boundary effects; longer or overlapping windows introduce additional cost and deduplication requirements.

**State change:** inspect a new permission, identity relationship or configuration state against policy and approved change. A deterministic condition is not the same as a deterministic malicious verdict.

**Corroboration:** combine independent evidence while measuring what each extra gate removes. If a gate intersects a candidate set, it can remove true positives as well as false positives. Do not promise improved precision without a recall trade-off.

<ResearchFigure id="analytic-contract" />

## Detection Logic Examples {#82-detection-logic-examples}

The canonical implementations are eight KQL files under `research/anomaly-validation/queries/` in the [pinned research source repository](https://github.com/anpa1200/medium-blog-navigation/tree/a94750828ed75dbce4c1e9a9f4ea1994fa785943/research/anomaly-validation). This section is generated from those files; edits belong in the files, not in duplicated snippets. The old broken SPL/KQL exports remain in an explicitly historical download, not as deployment recipes.

**Contract:** these queries use the named normalized tables in the <a href="https://1200km.com/articles/research/anomaly-validation/contracts.json" target="_self">telemetry contract</a>. They are not drop-in queries for an unspecified Sentinel connector. Fixture execution establishes syntax and selected logic behavior; live ingestion, identity enrichment, scheduling, production thresholds and analyst outcomes require separate validation. No Splunk execution is claimed by converting an SPL example to KQL.

### Distributed Password Spray — Rate and Shape {#distributed-password-spray--rate-and-shape}

The example selects result `50126` as one invalid-credential class, not every nonzero status. It joins only attempted identities within the same tenant, requires success after that identity's last failure, and uses a bounded follow-up period. `50140` is an interaction interruption, not generic completed success. [Microsoft error-code reference](https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes), [Kusto time-window joins](https://learn.microsoft.com/en-us/kusto/query/join-time-window).

The numeric thresholds are fixture parameters. Shared proxies and identity outages can create similar patterns; success afterward does not prove compromise. This analytic deliberately requires a burst and subsequent success, so failure-only spraying, unresolved identities and sufficiently low-volume activity fall outside its scope. Its fixed-bin boundary blind spot is an explicit regression test, not hidden by reporting only positive cases.

[Download this KQL example](https://1200km.com/articles/research/anomaly-validation/password-spray.kql) · [Normalized table contracts](https://1200km.com/articles/research/anomaly-validation/contracts.json).

<!-- query-source:password-spray:start -->
```kusto
// Normalized SigninEvents; illustrative parameters, not calibrated production settings.
let Window = 15m;
let Followup = 30m;
let MinFailures = 6;
let MinAccounts = 3;
let MinSources = 2;
let Events = SigninEvents
    | where isnotempty(TenantId) and isnotempty(UserId) and isnotempty(EventId)
    | summarize arg_max(TimeGenerated, *) by TenantId, EventId;
let Failures = Events
    | where ResultType == "50126" and isnotempty(IPAddress)
    | extend WindowStart = bin(TimeGenerated, Window);
let Bursts = Failures
    | summarize Failures=count(), Accounts=count_distinct(UserId), Sources=count_distinct(IPAddress)
        by TenantId, WindowStart
    | where Failures >= MinFailures and Accounts >= MinAccounts and Sources >= MinSources;
let Attempted = Failures
    | summarize FirstFailure=min(TimeGenerated), LastFailure=max(TimeGenerated)
        by TenantId, UserId, WindowStart
    | join kind=inner Bursts on TenantId, WindowStart;
Attempted
| join kind=inner (Events | where ResultType == "0"
    | project TenantId, UserId, SuccessTime=TimeGenerated, SuccessEventId=EventId, SuccessIP=IPAddress)
    on TenantId, UserId
| where SuccessTime > LastFailure and SuccessTime <= LastFailure + Followup
| project TenantId, UserId, WindowStart, FirstFailure, LastFailure,
    SuccessTime, SuccessEventId, SuccessIP, Failures, Accounts, Sources
| order by TenantId asc, UserId asc, SuccessTime asc
```
<!-- query-source:password-spray:end -->

### Kerberoasting — Service-Request Breadth {#kerberoasting--rc4-tgs-volume}

This version reports encryption types and includes AES instead of asserting that RC4 alone covers Kerberoasting. It excludes `krbtgt` from this service-breadth view without excluding all computer principals. The threshold of five distinct service identifiers is illustrative. The public single-ticket recording is deliberately not modified or repeated to make this rule fire: a volume detector can miss a real low-volume technique example.

[Download this KQL example](https://1200km.com/articles/research/anomaly-validation/kerberoasting.kql) · [Normalized table contracts](https://1200km.com/articles/research/anomaly-validation/contracts.json).

<!-- query-source:kerberoasting:start -->
```kusto
// WindowsEvents normalized as documented in contracts.json. Five is a test parameter.
WindowsEvents
| where EventID == 4769 and ResultCode == "0"
| where isnotempty(Principal) and isnotempty(ServiceName)
| extend ServiceName=tolower(ServiceName)
| where ServiceName !~ "krbtgt" and not(ServiceName startswith "krbtgt/")
| summarize arg_max(TimeGenerated, *) by Computer, EvidenceId
| extend WindowStart=bin(TimeGenerated, 15m)
| summarize Requests=count(), DistinctServices=count_distinct(ServiceName),
    Services=make_set(ServiceName, 100), EncryptionTypes=make_set(EncryptionType, 10)
    by Principal, SourceIP, WindowStart
| where DistinctServices >= 5
| order by Principal asc, WindowStart asc
```
<!-- query-source:kerberoasting:end -->

### DCSync — Replication-Right Access {#dcsync--replication-guids-from-non-dc-account}

Return each candidate access, including computer principals and separate-right events. Source enrichment is a bounded same-DC/logon-ID join; unresolved and ambiguous addresses remain visible. An approved-source review belongs after this evidence-preserving stage. The 24-hour correlation bound is a test configuration, not proof that logon IDs cannot be reused. Validate session uniqueness and stale-address handling in the actual environment.

[Download this KQL example](https://1200km.com/articles/research/anomaly-validation/dcsync.kql) · [Normalized table contracts](https://1200km.com/articles/research/anomaly-validation/contracts.json).

<!-- query-source:dcsync:start -->
```kusto
// Candidate replication-right access, NOT proof of successful credential extraction.
let Candidates = WindowsEvents
    | where EventID == 4662
    | where binary_and(AccessMask, 256) != 0
    | where ObjectType =~ "domainDNS" or ObjectType contains "19195a5b-6da0-11d0-afd3-00c04fd930c9"
    | where Properties contains "1131f6aa-9c07-11d1-f79f-00c04fc2dcd2"
        or Properties contains "1131f6ad-9c07-11d1-f79f-00c04fc2dcd2"
        or Properties contains "89e95b76-444d-4c62-991a-0facbeda640c"
    | summarize arg_max(TimeGenerated, *) by Computer, EvidenceId
    | project Computer, EvidenceId, ReplicationTime=TimeGenerated, Principal, LogonId, Properties;
let Correlation = Candidates
    | where isnotempty(LogonId)
    | join kind=inner (WindowsEvents | where EventID == 4624 and isnotempty(LogonId)
        | project Computer, LogonId, LogonTime=TimeGenerated, CorrelatedIP=SourceIP) on Computer, LogonId
    | where LogonTime <= ReplicationTime and LogonTime >= ReplicationTime - 24h
    | where isnotempty(CorrelatedIP) and CorrelatedIP != "-"
    | summarize CandidateIPs=make_set(CorrelatedIP, 100) by Computer, EvidenceId
    | extend SourceIP=iff(array_length(CandidateIPs) == 1, tostring(CandidateIPs[0]), ""),
        SourceStatus=iff(array_length(CandidateIPs) == 1, "correlated", "ambiguous");
Candidates
| join kind=leftouter Correlation on Computer, EvidenceId
| extend SourceStatus=iff(isempty(SourceStatus), "unresolved", SourceStatus)
| project Computer, EvidenceId, ReplicationTime, Principal, LogonId, Properties, SourceIP, SourceStatus
| order by Computer asc, EvidenceId asc
```
<!-- query-source:dcsync:end -->

### Pass-the-Hash — Authentication Hunting Views {#pass-the-hash--ntlm-network-logon-heuristic}

These are broad hunting outputs: source-side alternate-credential context and target-side NTLM network authentication. They intentionally include legitimate activity and do not assign a malicious verdict. Correlate them with process and identity evidence; missing one view does not exclude PtH.

[Download this KQL example](https://1200km.com/articles/research/anomaly-validation/pass-the-hash.kql) · [Normalized table contracts](https://1200km.com/articles/research/anomaly-validation/contracts.json).

<!-- query-source:pass-the-hash:start -->
```kusto
// Two hunting views, not an authentication-attack classifier.
WindowsEvents
| where EventID == 4624
| extend EvidenceClass=case(
    LogonType == 9 and LogonProcess =~ "seclogo", "source-new-credentials",
    LogonType == 3 and AuthenticationPackage =~ "NTLM", "target-ntlm-network",
    "outside-scope")
| where EvidenceClass != "outside-scope"
| summarize arg_max(TimeGenerated, *) by Computer, EvidenceId
| project TimeGenerated, Computer, EvidenceId, Principal, SourceIP, LogonId, EvidenceClass
| order by EvidenceId asc
```
<!-- query-source:pass-the-hash:end -->

### LSASS Credential Access — Sysmon Event 10 {#lsass-credential-access--sysmon-event-10}

The query identifies VM-read access to LSASS. It does not equate every matching process with a credential dumper or every nonmatching access mode with safety. Familiar paths are deliberately retained for review rather than silently allowlisted.

[Download this KQL example](https://1200km.com/articles/research/anomaly-validation/lsass-access.kql) · [Normalized table contracts](https://1200km.com/articles/research/anomaly-validation/contracts.json).

<!-- query-source:lsass-access:start -->
```kusto
// PROCESS_VM_READ candidates. No trusted-path or process-name auto-exclusion.
EndpointEvents
| where Provider == "Microsoft-Windows-Sysmon" and EventID == 10
| where TargetImage endswith "\\lsass.exe"
| where binary_and(GrantedAccess, 16) != 0
| summarize arg_max(TimeGenerated, *) by Computer, EvidenceId
| project TimeGenerated, Computer, EvidenceId, Image, TargetImage, GrantedAccess, CallTrace
| order by EvidenceId asc
```
<!-- query-source:lsass-access:end -->

### Web-Server Process Spawning Shell Interpreter {#web-server-process-spawning-shell-interpreter}

This tests a direct parent-child relationship on inventory-confirmed web servers. It does not detect every webshell, indirect descendant, module or in-process action. A legitimate application can match. Do not substitute an ancestor for a direct parent without changing and testing the analytic.

[Download this KQL example](https://1200km.com/articles/research/anomaly-validation/web-shell-lineage.kql) · [Normalized table contracts](https://1200km.com/articles/research/anomaly-validation/contracts.json).

<!-- query-source:web-shell-lineage:start -->
```kusto
// Direct child relation only; HostRole is inventory enrichment, not guessed from a filename.
EndpointEvents
| where Provider == "Microsoft-Windows-Sysmon" and EventID == 1 and HostRole == "web-server"
| where ParentImage endswith "\\w3wp.exe" or ParentImage endswith "\\UMWorkerProcess.exe"
| where Image endswith "\\cmd.exe" or Image endswith "\\powershell.exe" or Image endswith "\\pwsh.exe"
| summarize arg_max(TimeGenerated, *) by Computer, EvidenceId
| project TimeGenerated, Computer, EvidenceId, Image, ParentImage, CommandLine, HostRole
| order by EvidenceId asc
```
<!-- query-source:web-shell-lineage:end -->

### DNS Tunneling — Shannon Entropy on Subdomain {#dns-tunneling--shannon-entropy-on-subdomain}

The implementation extracts entropy from a specified ASCII label; it does not classify tunneling. Keep the raw QNAME and extraction provenance upstream. Short labels, valid encoded services, alphabet choices and internationalized names need deliberate handling. A high score on `abcdefghijklmnop` demonstrates why character entropy is not the same as unpredictable or malicious content.

[Download this KQL example](https://1200km.com/articles/research/anomaly-validation/dns-entropy.kql) · [Normalized table contracts](https://1200km.com/articles/research/anomaly-validation/contracts.json).

<!-- query-source:dns-entropy:start -->
```kusto
// Feature extraction, NOT a malicious-domain verdict. One normalized ASCII label per row.
let Labels = DnsLabels
    | where isnotempty(EvidenceId) and isnotempty(Label)
    | extend Label=tolower(Label)
    | where Label matches regex "^[a-z0-9_-]{1,63}$"
    | summarize arg_max(TimeGenerated, *) by Sensor, EvidenceId
    | extend LabelLength=strlen(Label);
Labels
| mv-expand CharacterIndex=range(0, LabelLength - 1, 1) to typeof(long)
| extend Character=substring(Label, toint(CharacterIndex), 1)
| summarize Occurrences=count() by Sensor, EvidenceId, Label, LabelLength, Character
| extend P=todouble(Occurrences) / todouble(LabelLength)
| summarize Entropy=-sum(P * log2(P)) by Sensor, EvidenceId, Label, LabelLength
| extend LengthBound=log2(todouble(LabelLength))
| order by EvidenceId asc
```
<!-- query-source:dns-entropy:end -->

### SaaS Bulk Download Anomaly (M365 SharePoint / OneDrive) {#saas-bulk-download-anomaly-m365-sharepoint--onedrive}

`DailyDownloads` contains one row per tenant, immutable user and complete UTC calendar day. Independent collection health determines `Complete`. Missing collection must not become an invented zero. Count deduplicated audit events; do not label the result bytes or unique files. Reject duplicate entity/day rows before scoring.

The caller supplies `EvaluationDay`; training excludes that day and the future. The example exposes cold starts and incomplete data instead of silently losing users in an inner join. The zero-MAD fallback and minimum excess are explicit policy parameters, not a universal improvement over z-scores. A seasonal or role-specific model may be more appropriate.

[Download this KQL example](https://1200km.com/articles/research/anomaly-validation/bulk-download.kql) · [Normalized table contracts](https://1200km.com/articles/research/anomaly-validation/contracts.json).

<!-- query-source:bulk-download:start -->
```kusto
// Complete UTC calendar days; Counts are audit events, not bytes or unique documents.
// EvaluationDay is supplied explicitly by the caller. Do not tune on the scored day.
let HistoryDays=28d;
let MinimumObservedDays=14;
let MinimumExcess=20.0;
let MadMultiplier=6.0;
let History = DailyDownloads
    | where Day >= EvaluationDay - HistoryDays and Day < EvaluationDay
    | where Complete and isnotnull(Count) and Count >= 0;
let Medians = History | summarize Median=percentile(Count, 50), ObservedDays=count() by TenantId, UserId;
let Baselines = History
    | join kind=inner Medians on TenantId, UserId
    | extend Deviation=abs(todouble(Count) - Median)
    | summarize MAD=percentile(Deviation, 50), Median=take_any(Median), ObservedDays=take_any(ObservedDays)
        by TenantId, UserId;
DailyDownloads
| where Day == EvaluationDay
| join kind=leftouter Baselines on TenantId, UserId
| extend ObservedDays=coalesce(ObservedDays, tolong(0))
| extend Threshold=Median + max_of(MinimumExcess, MadMultiplier * MAD)
| extend Status=case(
    not(Complete) or isnull(Count) or Count < 0, "missing-telemetry",
    ObservedDays < MinimumObservedDays, "insufficient-history",
    todouble(Count) > Threshold, "above-baseline",
    "within-baseline")
| project TenantId, UserId, Day, Count, ObservedDays, Median, MAD, Threshold, Status
| order by TenantId asc, UserId asc
```
<!-- query-source:bulk-download:end -->

## Reproduction and evidence levels {#83-reproduction-and-evidence-levels}

Run these commands from the root of the [pinned research repository](https://github.com/anpa1200/medium-blog-navigation/tree/a94750828ed75dbce4c1e9a9f4ea1994fa785943), following its [reproduction README](https://1200km.com/articles/research/anomaly-validation/README.md). Run the offline checks with Python 3.13 or a compatible Python 3 standard library. Public inputs are small XML log recordings, not executable samples. The downloader pins the repository commit, verifies Git LFS SHA-256 digests and file sizes, and does not execute recorded commands.

```bash
python3 research/anomaly-validation/run_validation.py
python3 research/anomaly-validation/run_validation.py --download
```

For real query-language execution, start the pinned local engine using the instructions in the research README, then run:

```bash
python3 research/anomaly-validation/run_validation.py \
  --endpoint http://127.0.0.1:18921 --public-recordings
```

The Kusto emulator is used only for development and functional tests, not throughput/latency comparisons or product benchmarking. It is not a production Sentinel environment and has no production authentication or ingestion pipeline. [Microsoft emulator limitations](https://learn.microsoft.com/en-us/azure/data-explorer/kusto-emulator-overview).

**Measured functional result:** 34/34 synthetic KQL regression cases and 8/8 offline checks passed. This is test-suite completion, not a detection-accuracy percentage.

| Public lab recording | Input records | Query output rows | Interpretation |
|---|---:|---:|---|
| dcsync | 11 | 4 | Candidate observations, not individually labeled true positives. |
| lsass-access | 32 | 24 | Candidate observations, not individually labeled true positives. |
| kerberoasting | 1 | 0 | Low-volume case falls below the breadth threshold; known blind spot. |

Full outputs, input-record hashes, query hashes, engine identity and limits are in the <a href="https://1200km.com/articles/research/anomaly-validation/functional-results.json" target="_self">functional report</a>.

The public recordings are provided by Splunk's Attack Data repository under Apache-2.0, pinned in `datasets.json`. They are lab activity, not a representative mix of labeled enterprise events. Query output rows are not a true-positive denominator. A recording can contain legitimate background behavior. Zero matches may expose an analytic's scope limitation rather than an ingestion or execution failure. [Dataset repository](https://github.com/splunk/attack_data).

<ResearchFigure id="validation-levels" />
