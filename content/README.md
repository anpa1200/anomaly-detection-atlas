# Unified research source contract

`research-source.md`, `visuals.json`, `cover.json`, and `incidents.json` are immutable imported publication inputs. `provenance.json` records the pinned archive commit and hashes. `ecosystem.json` records existing main-site entity identities. `family-links.json` is the reviewed editorial model/collection crosswalk; its relationships are conceptual navigation, not incident detection claims.

`node scripts/build-research.mjs` generates the research chapters, family pages, visual index, and integration manifest. It also updates bounded integration blocks in the existing catalogs without changing model anchors. Run it twice and `--check` must remain clean. Do not hand-edit the generated chapters. The current extractor uses reviewed line boundaries in the pinned publication; a future source import requires reviewing those boundaries and all preservation assertions.

All 55 active figures must occur once in the research path. Large visual files remain served at the original `/articles/research/anomaly-visuals/` URLs; they are not rewritten or duplicated. Their inherited review date remains 2026-09-21. The cover is separate. Historical illustrations remain in the original article only.

Validation: `npm run build`, `MAIN_SITE_ROOT=/path/to/site npm run check:research`, and `MAIN_SITE_ROOT=/path/to/site node scripts/check-browser.mjs`. The source repository is published through the existing `gh-pages` branch only after these gates pass. Preserve old hashed assets during deployment to keep open browser sessions functional.

The main-site `data/anomaly-atlas.json` is a copied integration manifest. Update it whenever the Atlas integration manifest changes, regenerate main-site TTP pages/tags/discovery, and pass the full main-site release gate. Deploy Atlas first, then rebuild main-site search; the main-site pipeline requires all current research routes to be indexed.
