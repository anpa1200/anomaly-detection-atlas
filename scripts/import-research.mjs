// Explicit import of the author's pinned publication; never executes article code.
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const archive=resolve(process.argv[2]||'');
const site=resolve(process.argv[3]||'');
if(!process.argv[2]||!process.argv[3])throw Error('Usage: node scripts/import-research.mjs ARCHIVE SITE');
const root=resolve(import.meta.dirname,'..');
const article='docs/articles/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12.md';
mkdirSync(root+'/content',{recursive:true});
const files=[[article,'research-source.md'],['static/research/anomaly-visuals/manifest.json','visuals.json'],['static/research/anomaly-visuals/uploaded-cover-provenance.json','cover.json'],['static/research/anomaly-incidents.json','incidents.json']];
const provenance={imported:'2026-09-27',source_repository:'https://github.com/anpa1200/medium-blog-navigation',source_commit:execFileSync('git',['rev-parse','HEAD'],{cwd:archive,encoding:'utf8'}).trim(),files:[]};
for(const [source,dest] of files){const bytes=readFileSync(resolve(archive,source));writeFileSync(root+'/content/'+dest,bytes);provenance.files.push({source,dest,sha256:createHash('sha256').update(bytes).digest('hex')});}
const read=p=>JSON.parse(readFileSync(resolve(site,p)));
const matrix=read('threat-matrix/mitre-data.json');
const ecosystem={source_commit:execFileSync('git',['rev-parse','HEAD'],{cwd:site,encoding:'utf8'}).trim(),techniques:read('ttp-simulation/data/catalog.json').records.map(({id,key,name,page,telemetry_references,tool_references})=>({id,key,name,page,telemetry_references,tool_references})),telemetry:read('ttp-simulation/data/telemetry.json').records.map(({id,name,page})=>({id,name,page})),actors:matrix.groups.map(({id,name,aliases})=>({id,name,aliases}))};
writeFileSync(root+'/content/ecosystem.json',JSON.stringify(ecosystem,null,2)+'\n');
writeFileSync(root+'/content/provenance.json',JSON.stringify(provenance,null,2)+'\n');
console.log('Imported pinned research and ecosystem identities. Visual binaries remain at their preserved publication URLs.');
