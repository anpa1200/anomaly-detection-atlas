# Local research-extension validation

Date: 2026-10-01. The reviewed changes were applied to public `main` at `d47645cdc73f87022c42c4ecc8aa30a921712d73` in an isolated clone. Checks below distinguish local editorial evidence from broader application and release validation.

- `node scripts/build-research.mjs --check`: passed; generation is idempotent.
- `node scripts/check-worked-paths.mjs --archive ../medium-blog-navigation`: passed; three paths, 16 referenced fixtures, original report/contract/query hashes match.
- `python3 examples/fanout_demo.py`: passed in the prior portfolio copy; same benign script retained here (educational fixed threshold, not an anomaly engine).
- `npm run build`: passed using existing local dependencies, with dependency-cache write warnings and Docusaurus table-anchor warnings.
- `MAIN_SITE_ROOT=../anpa1200.github.io node scripts/check-research.mjs`: passed against rendered HTML: 39 pages, 55 figures, 54 original model anchors, 4398 Atlas links and 1085 ecosystem links, zero failures.
- Four immutable imported evidence-file hashes and all 54 catalog anchors remain unchanged. Source import is still pinned to a947508.

All supplemental diffs pass `git diff --check`. The initial editorial checks did not run public external URLs, browser hydration on a live site, full site release/search/deployment gates, fresh dependency installation, query-engine execution or public recording replay. Publication CI and deployment checks are recorded separately in the pull request. Eight KQL examples and 34 engine fixtures remain historical reported research results; neither is independently replicated by this editorial pass. The 2688-entity-day study remains synthetic, with FP 85→8 and TP 18→11 preserved.
