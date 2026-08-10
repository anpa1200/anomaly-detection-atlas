# Anomaly Detection Atlas

A vendor-neutral reference connecting statistical anomaly methods, observable security telemetry, MITRE ATT&CK activities, and practical detection rules.

[Read the published atlas](https://1200km.com/anomaly-detection-atlas/) · [Explore the broader CTI portfolio](https://1200km.com/cti.html)

## Contents

- [ATT&CK activity and log-source catalog](docs/attack-activity-log-source-catalog.md)
- [Basic detection-rule catalog](docs/attack-basic-detection-rule-catalog.md)
- [ATT&CK statistical-anomaly mapping](docs/attack-statistical-anomaly-mapping.md)
- [Statistical anomaly taxonomy](docs/statistical-anomaly-taxonomy.md)
- [Security log-source taxonomy](docs/security-log-source-taxonomy.md)

The atlas is designed for SOC analysts, threat hunters, detection engineers, and security data teams that need to translate attacker activity into measurable signals.

## Run locally

Requirements: Node.js 18 or newer and npm.

```bash
npm install
npm start
```

Create and preview a production build with:

```bash
npm run build
npm run serve
```

## Repository structure

- `docs/` — reference catalogs and mappings
- `src/` — site styling and components
- `static/` — images and other static assets
- `docusaurus.config.js` — Docusaurus and deployment configuration
- `sidebars.js` — documentation navigation

## Related work

- [AdversaryGraph](https://1200km.com/adversarygraph/) — AI-assisted CTI-to-detection workbench
- [CTI Analyst Field Manual](https://1200km.com/cti-analyst-field-manual/) — evidence-led CTI methodology
- [Threat Hunting Hypotheses](https://github.com/anpa1200/threat-hunting-hypotheses) — structured hunt library

## Author

Andrey Pautov — [1200km.com](https://1200km.com/) · [Medium](https://medium.com/@1200km) · [GitHub](https://github.com/anpa1200)

