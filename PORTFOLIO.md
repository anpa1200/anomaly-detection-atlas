# Review guide: Telemetry and detection methodology atlas

Andrey Pautov authored and organized the vendor-neutral taxonomy and mappings connecting statistical anomaly concepts, ATT&CK activity, telemetry and basic detection logic. The reference reports and MITRE knowledge base belong to their original publishers; Docusaurus provides the website framework.

## Architecture and contribution

Markdown catalogs → cross-linked methodology and log-source mappings → Docusaurus reference site. This is a research/reference deliverable, not an anomaly detection engine.

The Atlas and related statistical-anomaly publication form one integrated research/reference project; the original article is a publication snapshot, not a second independent portfolio achievement. The maintained entry paths expose the original query and fixture evidence alongside a small educational demo. Existing chapters, family pages and catalogs remain intact.

Role relevance: Detection engineering methodology, telemetry requirements, technical writing and customer enablement.

## Safe reproducible quickstart

Run from the repository root. Python 3; no extra packages or service credentials required.

```bash
python3 examples/fanout_demo.py
```

Expected result:

```text
approved-scanner: distinct_ports=6 review=false
fanout: distinct_ports=6 review=true
ordinary: distinct_ports=2 review=false
PASS: synthetic threshold and allowlist example; no network activity
```

These commands use committed or generated benign/synthetic input. They do not execute malware, invoke a hosted provider, scan a target or require credentials.

## Maintained research entry paths

Start with [password spraying](docs/research/worked-password-spray.md), [SaaS downloads](docs/research/worked-saas-downloads.md) or [Kerberoasting zero-match](docs/research/worked-kerberoasting.md). Each exposes the hypothesis, normalized fields, unchanged query, original fixture observations and limits. [Import provenance](docs/research/provenance.md) identifies immutable research inputs.

The content inventory is 54 catalog rows, 118 overlapping concepts, 175 telemetry categories, 14 operational families plus correlation, and 55 active figures. Those counts describe reference content, not validated detectors. The preserved research reports eight KQL examples and 34 engine fixture cases; this task has not independently rerun them.

## Evidence to inspect

[Fan-out mapping](docs/attack-statistical-anomaly-mapping.md#external-service-scanning) · [Rule conventions](docs/attack-basic-detection-rule-catalog.md)



## Validation and limitations

The new example illustrates distinct-count logic and approved-scanner suppression. Its threshold is arbitrary, not learned or tuned. A statistical anomaly model needs an explicit population, baseline and evaluation; this example does not establish detection accuracy.

See [validation.md](validation.md) for checks performed on the exact source snapshot, verified results and capabilities not run. Existing release/CI claims remain historical repository statements, not fresh certification.

Preserve the full [README](README.md) and original technical documentation for installation, deployment and capability details.
