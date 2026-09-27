// Apply exact active-ID crosslinks from the main site's versioned module manifest.
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
const input = process.argv[2];
if (!input) throw Error('Usage: node scripts/sync-ttp-links.mjs /path/to/ttp-simulation/data/integration.json');
const manifest = JSON.parse(readFileSync(resolve(input), 'utf8'));
const base = 'https://1200km.com/ttp-simulation/';
const active = new Set(manifest.pages.filter(p => p.kind === 'simulation' && p.page.startsWith('techniques/enterprise/')).map(p => p.page.split('/')[2]));
function patch(path, transform) {
  const old = readFileSync(path, 'utf8'), next = transform(old);
  if (old === next) return;
  execFileSync('apply_patch', [], {input: `*** Begin Patch\n*** Update File: ${path}\n@@\n${old.trimEnd().split('\n').map(l=>'-'+l).join('\n')}\n${next.trimEnd().split('\n').map(l=>'+'+l).join('\n')}\n*** End Patch\n`});
}
const start = '<!-- ttp-modules:start -->', end = '<!-- ttp-modules:end -->';
for (const name of ['attack-basic-detection-rule-catalog','attack-statistical-anomaly-mapping','attack-activity-log-source-catalog','security-log-source-taxonomy','statistical-anomaly-taxonomy']) {
  patch(`docs/${name}.md`, text => {
    const links = manifest.backlinks.find(row => row.path === `/anomaly-detection-atlas/${name}/index.html`)?.links || [];
    const block = `${start}\n## Connected attack and detection workspaces\n\n[Attack Tools](${base}tools/) · [Attack Simulations](${base}) · [Detection Rules](${base}detections/) · [Telemetry Library](${base}telemetry/) · [Linked Tags](${base}tags/)\n\nThese links follow exact active technique IDs or the published model's taxonomy references. They are navigation context, not proof of live simulation, sensor equivalence or detection effectiveness. Retired IDs are not silently migrated.\n\n${links.map(r=>`- [${r.title}](${base}${r.target}) — ${r.basis}`).join('\n')}\n${end}`;
    text = text.includes(start) ? text.replace(new RegExp(`${start}[\\s\\S]*?${end}`), block) : text.trimEnd() + '\n\n' + block + '\n';
    // Preserve the original MITRE links and append two explicit internal destinations.
    return text.replace(/(\[(T\d{4}(?:\.\d{3})?) [^\]]+\]\(https:\/\/attack\.mitre\.org\/techniques\/[^)]+\))(?! · \[simulation\])/g, (match, original, id) => active.has(id) ? `${original} · [simulation](${base}techniques/enterprise/${id}/) · [detections](${base}detections/enterprise/${id}/)` : match);
  });
}
patch('src/pages/index.js', text => text.includes('id="ttp-modules"') ? text : text.replace('      <main>', `      <main>
        <section className="atlas-section atlas-section--surface" id="ttp-modules">
          <div className="container">
            <h2>Connect models to tools, simulations and detection rules</h2>
            <p>Follow exact technique mappings into the reference workspaces. Published concepts and documented procedures are not live-validated detectors or simulations.</p>
            <p><a href="${base}tools/">Attack Tools</a> · <a href="${base}">Attack Simulations</a> · <a href="${base}detections/">Detection Rules</a> · <a href="${base}telemetry/">Telemetry Library</a></p>
          </div>
        </section>`));
console.log('Atlas reciprocal module links synchronized from exact main-site manifest.');
