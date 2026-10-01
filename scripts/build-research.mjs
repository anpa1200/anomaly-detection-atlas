// Deterministic consolidation. Imported evidence is never executed or upgraded.
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import GithubSlugger from 'github-slugger';
const root=resolve(import.meta.dirname,'..');
const check=process.argv.includes('--check');
const read=p=>readFileSync(resolve(root,p),'utf8');
const json=p=>JSON.parse(read(p));
const base='https://1200km.com/anomaly-detection-atlas/';
const original='https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/';
const source=read('content/research-source.md');
const visuals=json('content/visuals.json');
const eco=json('content/ecosystem.json');
const links=json('content/family-links.json');
const workedPaths=json('content/worked-paths.json');
const output=(p,s)=>{const path=resolve(root,p);if(existsSync(path)&&readFileSync(path,'utf8')===s)return;if(check)throw Error('Stale generated file: '+p);mkdirSync(dirname(path),{recursive:true});writeFileSync(path,s);};
const lines=source.split('\n');
const section=(from,to)=>lines.slice(from-1,to).join('\n').trim();
const familyHeads=[...source.matchAll(/^### 2\.(\d+) (.+) \{#anomaly-([^}]+)\}/gm)].filter(m=>Number(m[1])<=15);
const sections=[{id:'foundations',title:'Foundations: from unusual activity to evidence',body:section(73,116)}];
for(const [i,m] of familyHeads.entries())sections.push({id:'families/'+m[3],family:m[3],title:m[2],body:source.slice(m.index,familyHeads[i+1]?.index??source.indexOf('<!-- anomaly-evidence:index:start -->')).trim()});
for(const [id,title,start,end] of [
 ['incidents','Incident register and evidence boundaries',1068,1144],
 ['attack-mapping','ATT&CK mapping and version boundaries',1145,1174],
 ['cases','Documented campaigns and detection interpretations',1175,1286],
 ['telemetry','Telemetry contracts and collection requirements',1287,1396],
 ['credentials','Credential-access detection engineering',1397,1438],
 ['visibility','Visibility limits and competing explanations',1439,1456],
 ['queries','Detection patterns and maintained KQL examples',1457,1718],
 ['validation','Validation, baselines, and operational decisions',1719,1785],
 ['references','Sources, provenance, and further research',2001,2058]
])sections.push({id,title,body:section(start,end)});
sections.find(s=>s.id==='validation').body+='\n\n'+section(1991,2000);
const url=s=>base+(s.family?s.id:'research/'+s.id)+'/';
// Keep source-heading identifiers even when heading levels/titles are improved.
const slugger=new GithubSlugger();const headingIds=new Map();let fenced=false;
for(const line of lines){if(/^```/.test(line)){fenced=!fenced;continue;}if(fenced)continue;const m=line.match(/^(#{1,6}) (.+)$/);if(!m)continue;const explicit=m[2].match(/\{#([^}]+)\}/)?.[1];const id=explicit||slugger.slug(m[2].replace(/<[^>]*>/g,''));headingIds.set(line,id);}
const anchors=new Map();
for(const s of sections){for(const line of s.body.split('\n'))if(headingIds.has(line))anchors.set(headingIds.get(line),url(s));for(const m of s.body.matchAll(/\bid="([^"]+)"/g))anchors.set(m[1],url(s));for(const m of s.body.matchAll(/<ResearchFigure id="([^"]+)"/g))anchors.set('figure-'+m[1],url(s));}
anchors.set('figure-research-map',base+'research/');
const plain=t=>t.replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/<[^>]+>/g,'');
const actorNames={'OilRig':'G0049','APT34':'G0049','APT41':'G0096','HAFNIUM':'G0125','Volt Typhoon':'G1017','Midnight Blizzard':'G0016','Lazarus Group':'G0032','Sandworm':'G0034'};
function actorLinks(text){return text.split(/(\[[^\]]*\]\([^)]*\)|<[^>]*>|`[^`]+`|https?:\/\/[^\s)]+)/g).map((piece,i)=>i%2?piece:piece.replace(/\b(OilRig|APT34|APT41|HAFNIUM|Volt Typhoon|Midnight Blizzard|Lazarus Group|Sandworm)\b/g,name=>`[${name}](https://1200km.com/threat-matrix/actors/${actorNames[name]}/)`)).join('');}
const modelText=read('docs/attack-statistical-anomaly-mapping.md');
const models=[...modelText.matchAll(/^\| <a id="([^"]+)"><\/a>([^\n]+)/gm)].map(m=>({id:m[1],title:plain(m[2].split(' — ')[0]),technique:m[2].match(/\[(T\d{4}(?:\.\d{3})?)/)?.[1]}));
const byModel=new Map(models.map(m=>[m.id,m]));
const pages=[];
const modelFamilies=new Map();
for(const [id,l] of Object.entries(links))for(const model of l.models){if(!byModel.has(model))throw Error('Unknown model '+model);const fs=modelFamilies.get(model)||[];fs.push(id);modelFamilies.set(model,fs);}
const nav='[Atlas home]('+base+') · [Research path]('+base+'research/) · [Operational families]('+base+'families/) · [Anomaly models]('+base+'attack-statistical-anomaly-mapping/) · [Visual index]('+base+'visuals/)';
function normalize(body,s){let fence=false,seenHeading=false;const firstLevel=body.match(/^(#+) /)?.[1].length||2;return body.split('\n').map(line=>{if(/^```/.test(line)){fence=!fence;return line;}if(fence)return line;const h=line.match(/^(#{1,6}) (.+)$/);if(h){const id=headingIds.get(line);const title=h[2].replace(/\s*\{#[^}]+\}/,'').replace(/^\d+(?:\.\d+)*\.?(?: |$)/,'');line='#'.repeat(seenHeading?Math.max(2,h[1].length-firstLevel+1):1)+' '+title+(id?' {#'+id+'}':'');seenHeading=true;}line=line.replace(/\]\(#([^)]*)\)/g,(_,id)=>`](${anchors.get(id)||original}#${id})`);return actorLinks(line);}).join('\n');}
const familyRows=[];
for(const s of sections){
 let body=normalize(s.body,s);
 if(s.id==='queries'){
  body=body.replace('in the companion repository','in the [pinned research source repository](https://github.com/anpa1200/medium-blog-navigation/tree/a94750828ed75dbce4c1e9a9f4ea1994fa785943/research/anomaly-validation)');
  body=body.replace(/<!-- query-source:([a-z-]+):start -->/g,(_,id)=>`[Download this KQL example](https://1200km.com/articles/research/anomaly-validation/${id}.kql) · [Normalized table contracts](https://1200km.com/articles/research/anomaly-validation/contracts.json).\n\n<!-- query-source:${id}:start -->`);
  body=body.replace('Run the offline checks with Python 3.13','Run these commands from the root of the [pinned research repository](https://github.com/anpa1200/medium-blog-navigation/tree/a94750828ed75dbce4c1e9a9f4ea1994fa785943), following its [reproduction README](https://1200km.com/articles/research/anomaly-validation/README.md). Run the offline checks with Python 3.13');
 }
 // Narrative section references should remain useful outside the long article.
 body=body.replace(/\bSection (4|8|9)\b/g,(_,n)=>`[Section ${n}](${base}research/${({4:'cases',8:'queries',9:'validation'})[n]}/)`);
 body=body.replace('These tags link to the relevant sections of this existing article; they do not create new tag landing pages.','These topic links open the consolidated family pages. They describe analytical relevance, not validated detection coverage.');
 body=body.replace('The canonical URL, case anchors and topic tags are retained.','The original publication URL and its anchors remain available as a publication snapshot. The Atlas now provides the integrated research chapters and family pages.');
 const techniqueIds=[...new Set([...body.matchAll(/techniques\/(T\d{4})(?:[/.](\d{3}))?\//g)].map(m=>m[1]+(m[2]?'.'+m[2]:'')))];
 const topAnchor=body.split('\n')[0].match(/\{#([^}]+)\}/)?.[1];
 if(topAnchor)body=body.replace('\n',`\n\n<span id="${topAnchor}"></span>\n`);
 let integration='';
 if(s.family){const l=links[s.family];const ms=l.models.map(m=>byModel.get(m));
  integration+='\n\n## Apply this analytical view\n\nThese are curated conceptual links, not claims that a specific model detected the cited incidents.\n\n';
  integration+='**Models:** '+ms.map(m=>`[${m.title}](${base}attack-statistical-anomaly-mapping/#${m.id})`).join(' · ')+'.\n\n';
  integration+='**Collection references:** '+l.telemetry.map(id=>{const t=eco.telemetry.find(t=>t.id===id);if(!t)throw Error('Missing telemetry '+id);return `[${t.name}](https://1200km.com/ttp-simulation/${t.page})`;}).join(' · ')+'. These describe data components, not equivalent connectors or guaranteed fields.\n\n';
  familyRows.push({id:s.family,title:s.title,url:url(s),tag:'anomaly-'+s.family,models:l.models,telemetry:l.telemetry,techniques:techniqueIds});
 }
 const ts=techniqueIds.map(id=>eco.techniques.find(t=>t.key==='enterprise/'+id)).filter(Boolean);
 if(ts.length){integration+='\n\n## Technique workspaces\n\nFollow the exact technique ID to source rules, associated tools, collection references, and documented lab candidates. A navigation association is not live validation.\n\n'+ts.map(t=>`- [${t.id} ${t.name}](https://1200km.com/threat-matrix/techniques/${t.id}/): [detection workspace](https://1200km.com/ttp-simulation/detections/enterprise/${t.id}/) · [simulation](https://1200km.com/ttp-simulation/${t.page})`+(t.tool_references?.length?' · tools: '+t.tool_references.slice(0,3).map(tool=>`[${tool.name}](https://1200km.com/ttp-simulation/${tool.page})`).join(', '):'')).join('\n');}
 // Footer remains last on the references chapter.
 if(s.id==='references')integration='';
 const figs=[...body.matchAll(/<ResearchFigure id="([^"]+)"/g)].map(m=>m[1]);
 const desc=s.family?`Investigate ${s.title.toLowerCase()} with source-reported cases, telemetry requirements, model links, and explicit validation limits.`:`Anomaly Detection Atlas: ${s.title.toLowerCase()}, with source evidence and implementation boundaries.`;
 output(`docs/${s.family?s.id:'research/'+s.id}.md`, `---\ntitle: ${JSON.stringify(s.title)}\ndescription: ${JSON.stringify(desc)}\nsidebar_label: ${JSON.stringify(s.title)}\n---\n\nimport ResearchFigure from '@site/src/components/ResearchFigure';\n\n${body.split('\n')[0]}\n\n${nav}\n\n> Consolidated 27 September 2026 from the [revised publication](${original}). Source-reported incidents, proposed models, functional tests, and synthetic results remain separate evidence classes. [Provenance and review scope](${base}research/provenance/).\n\n${body.split('\n').slice(1).join('\n').trim()}${integration}\n`);
 pages.push({id:s.id,title:s.title,url:url(s),figures:figs,techniques:ts.map(t=>t.id),tags:s.family?['anomaly-'+s.family]:[]});
}
const pathRows=[];
for(const entry of workedPaths.entries){
 const resultRows=entry.observed_fixtures.map(f=>`| \`${f.name}\` | \`${JSON.stringify(f.expected)}\` | \`${JSON.stringify(f.actual)}\` | Reported ${f.passed?'pass':'failure'} |`).join('\n');
 const recording=entry.recording?'\n\n**Reported public-recording observation:** one input 4769 record, zero query output rows. The recording is not repeated or modified to force a match. See the [pinned recording manifest](https://github.com/anpa1200/medium-blog-navigation/blob/'+workedPaths.source_commit+'/research/anomaly-validation/datasets.json).':'';
 output('docs/research/worked-'+entry.id+'.md',`---\ntitle: ${JSON.stringify(entry.title)}\n---\n\n# ${entry.title}\n\n${nav}\n\n> Maintained entry path added 1 October 2026. Results below are preserved reports dated 21 September 2026, not independent replication or new engine execution. [Evidence provenance](${base}research/provenance/).\n\n## Hypothesis\n\n${entry.hypothesis}\n\n## Required fields and collection\n\nNormalized table: **${entry.table}**. These are adapter contracts, not vendor-native connector guarantees.\n\n\`\`\`text\n${entry.fields}\n\`\`\`\n\n[Full normalized contracts](https://1200km.com/articles/research/anomaly-validation/contracts.json) · [Collection requirements](${base}research/telemetry/).\n\n## Existing query and model\n\n${entry.model}\n\n[Read the maintained query in context](${base}research/queries/#${entry.anchor}) · [Download unchanged KQL](https://1200km.com/articles/research/anomaly-validation/${entry.query}.kql).\n\n## Positive and benign or boundary fixtures\n\nThese rows come from the existing functional report. Expected and actual values describe selected logic behavior, not real-world accuracy.\n\n| Existing fixture | Expected output | Reported observed output | Status |\n|---|---|---|---|\n${resultRows}${recording}\n\n[Original functional report](https://1200km.com/articles/research/anomaly-validation/functional-results.json) · [Exact fixture construction](https://github.com/anpa1200/medium-blog-navigation/blob/${workedPaths.source_commit}/research/anomaly-validation/run_validation.py).\n\n## Safe reproduction and limits\n\nStart with the [offline reproduction README](https://1200km.com/articles/research/anomaly-validation/README.md). Its standard-library checks parse fixtures and recorded data; they do not execute attack commands. An engine replay is a separate opt-in workflow and was not run in this change.\n\n${entry.limitations}\n\nThe existing seeded 2688-entity-day study is synthetic. Its gate reduced FP 85→8 and TP 18→11. This is a constructed trade-off, not an enterprise benchmark. Eight reported KQL examples and 34 functional cases do not make the 54 catalog rows validated detectors. [Full validation boundaries](${base}research/validation/).\n`);
 pathRows.push({id:'worked-'+entry.id,title:entry.title,url:base+'research/worked-'+entry.id+'/',figures:[],techniques:[],tags:entry.tags});
}
pages.push(...pathRows);
const researchSections=pages.filter(p=>!p.id.startsWith('families/'));
output('docs/research/index.md',`---\ntitle: Anomaly detection research and engineering\ndescription: One research path from statistical foundations and documented incidents to telemetry contracts, detection models, and scoped validation.\nslug: /research\n---\n\nimport ResearchFigure from '@site/src/components/ResearchFigure';\nimport ResearchCover from '@site/src/components/ResearchCover';\n\n# Anomaly detection research and engineering\n\n*Malicious Activity as a Statistical Signal, integrated with the Anomaly Detection Atlas.*\n\n${nav}\n\n<ResearchCover />\n\nUse the research to decide what a deviation means, the catalogs to select a measurable model, and the linked workspaces to inspect collection and validation requirements. An unusual observation is a lead—not proof of compromise, attribution, or permission to contain a system.\n\n## Three evidence-led entry paths\n\n${pathRows.map(p=>`- [${p.title}](${p.url})`).join('\n')}\n\nEach follows hypothesis → required fields → unchanged query/model → positive and benign/boundary fixtures → reported result → limitations.\n\n## Start with a question\n\n- **What looks unusual?** Choose one of the [14 operational families and the correlation pattern](${base}families/).\n- **What should be measured?** Inspect the [activity-to-anomaly models](${base}attack-statistical-anomaly-mapping/), [118 statistical concepts](${base}statistical-anomaly-taxonomy/), and [175 source categories](${base}security-log-source-taxonomy/). These are different, overlapping taxonomies.\n- **Can I collect it?** Verify the [telemetry contracts](${base}research/telemetry/) and the [configuration-oriented Telemetry Library](https://1200km.com/ttp-simulation/telemetry/).\n- **Can I test it?** Read the [maintained queries](${base}research/queries/) and [validation limits](${base}research/validation/), then open an authorized [simulation workspace](https://1200km.com/ttp-simulation/).\n\n<ResearchFigure id="research-map" />\n\n## Research chapters\n\n${researchSections.map(p=>`- [${p.title}](${p.url})`).join('\n')}\n\n## Evidence and publication history\n\nThe 55 active figures retain their original captions, source links, text equivalents, evidence labels, and full-size assets. [Browse every figure in context](${base}visuals/). Superseded original illustrations remain only in the [historical publication appendix](${original}#98-historical-illustrations-and-corrected-navigation), not as current guidance.\n\n**Maintained version:** the Atlas is the current reference. The [full-length article](${original}) remains a publication snapshot for citations and old anchors. The Atlas is the integrated navigation and engineering reference. [Read import provenance and the bounded consolidation audit](${base}research/provenance/). This consolidation does not claim new incident fact-checking or new detector execution.\n`);
output('docs/families/index.md',`---\ntitle: Operational anomaly families\nslug: /families\n---\n\n# Operational anomaly families\n\n${nav}\n\nFourteen overlapping operational views, plus multi-event correlation as a composition pattern. They are not replacements for the [118 statistical concepts](${base}statistical-anomaly-taxonomy/) and do not measure detection coverage. Each page connects an infographic, source-reported cases, benign alternatives, required collection, model ideas, and exact technique workspaces.\n\n${familyRows.map(f=>`- [${f.title}](${f.url}) — [related ecosystem research](https://1200km.com/search.html?f.anomaly=${f.tag})`).join('\n')}\n`);
const allFigures=[{id:'research-map',url:base+'research/'},...pages.flatMap(p=>p.figures.map(id=>({id,url:p.url})))];
if(allFigures.length!==55||new Set(allFigures.map(f=>f.id)).size!==55)throw Error('All 55 current figures must occur once in the research path');
output('docs/visuals.md',`---\ntitle: Anomaly detection visual index\n---\n\n# Anomaly detection visual index\n\n${nav}\n\nAll 55 current diagrams and infographics are integrated beside their explanations. Each contextual view includes source links, an evidence label, an accessible text equivalent, and the unchanged full-size file. This index does not load 55 large images at once. Historical illustrations are not current guidance.\n\n${allFigures.map(({id,url})=>{const f=visuals.figures.find(f=>f.id===id);return `- **[Figure ${f.number}: ${f.title}](${url}#figure-${id})** — ${f.evidence}. [Full-size asset](https://1200km.com/articles/research/anomaly-visuals/${f.assets.desktop.name}).`;}).join('\n')}\n\n[Original visual manifest](https://1200km.com/articles/research/anomaly-visuals/manifest.json) · [Import provenance](${base}research/provenance/)\n`);
// Preserve every existing model ID and technique association; add contextual research.
let mapping=modelText.replace(/\n<!-- unified-research:start -->[\s\S]*?<!-- unified-research:end -->\n/g,'\n');
mapping=mapping.replace('## Mapping Model',`<!-- unified-research:start -->\n## Integrated research path\n\n[Research foundations](${base}research/foundations/) · [Operational families](${base}families/) · [Telemetry contracts](${base}research/telemetry/) · [Maintained query examples](${base}research/queries/) · [Validation limits](${base}research/validation/).\n\nEach row below retains its original model anchor. Family links are editorial conceptual associations, not a one-to-one taxonomy or proof of a successful detector. The retained CTI report associations are context, not newly re-audited per-row incident evidence. For explicit observed-versus-inferred case statements, use the [incident register](${base}research/incidents/). Historical ATT&CK IDs remain visible where the old catalog used them; the [version boundary](${base}research/attack-mapping/) explains why identifiers must not be silently treated as current.\n<!-- unified-research:end -->\n\n## Mapping Model`);
mapping=mapping.replace('**CTI/IR evidence** links to a downloaded report copy and its original publisher. The report documents the observed or investigated behavior and its threat context; the statistical anomaly interpretation is the analysis made in this catalog.','**Contextual report** links to a retained report reference and its original publisher. Per-row support was not re-audited in this review; a link alone does not verify the behavior-to-report association. Statistical interpretation remains the catalog author’s proposal.');
mapping=mapping.replace('The same report may support multiple mappings when the investigation documented a multi-stage intrusion. A report link establishes that the behavior occurred in a real investigation or threat campaign; it does not imply that the report authors used the same statistical terminology or detection model.','A report may provide useful context for multiple mappings. Unless an exact supporting page/section is recorded and checked, treat the row association as contextual, not established incident evidence. This status does not assert that the report is false or that no support exists.');
mapping=mapping.replaceAll('| CTI/IR evidence |','| Contextual report and support status |');
mapping=mapping.replace(/^\| <a id="[^\"]+"><\/a>.*$/gm,line=>line.includes('Support: contextual')?line:line.replace(/ \|$/, '<br />Support: contextual; per-row association not re-audited; page/section not recorded. |'));
mapping=mapping.replace(/^\| <a id="(tool-disablement|firewall-impairment)"><\/a>.*$/gm,line=>line.includes('Historical identifier retained')?line:line.replace(' | **Unit:**','<br />Historical identifier retained from the older catalog; absent from the imported current enterprise crosswalk. Verify version before operational mapping; no replacement ID is inferred. | **Unit:**'));
mapping=mapping.replace(/pathname:\/\/\/reports\//g,'https://1200km.com/anomaly-detection-atlas/reports/');
mapping=mapping.replace(/^\| <a id="([^"]+)"><\/a>.*$/gm,line=>{const id=line.match(/id="([^"]+)"/)[1];const fs=modelFamilies.get(id)||[];const cells=line.split(' | ');cells[1]=cells[1].replace(/<br \/>Research: .*$/,'');if(fs.length)cells[1]+='<br />Research: '+fs.map(id=>`[${familyRows.find(f=>f.id===id).title}](${base}families/${id}/)`).join(' · ');return cells.join(' | ');});
output('docs/attack-statistical-anomaly-mapping.md',mapping.replace(/\n{3,}/g,'\n\n'));
// Place reciprocal conceptual links immediately after taxonomy definitions.
for(const doc of ['statistical-anomaly-taxonomy','security-log-source-taxonomy','attack-activity-log-source-catalog','attack-basic-detection-rule-catalog']){
 let text=read(`docs/${doc}.md`).replace(/\n<!-- unified-research:start -->[\s\S]*?<!-- unified-research:end -->\n/g,'\n').replace(/\n<!-- atlas-context:start -->[\s\S]*?<!-- atlas-context:end -->\n/g,'\n');
 const intro=`\n<!-- unified-research:start -->\n**Unified Atlas:** [research and illustrated explanations](${base}research/) · [operational families](${base}families/) · [model catalog](${base}attack-statistical-anomaly-mapping/) · [telemetry contracts](${base}research/telemetry/) · [validation boundaries](${base}research/validation/). A taxonomy reference is not proof of a configured sensor or an effective detector.\n<!-- unified-research:end -->\n`;
 text=text.replace('aligned to the current MITRE ATT&CK Enterprise tactics and techniques','retaining the original MITRE ATT&CK Enterprise tactic and technique labels');
 text=text.replace(/^(# .+\n)/,`$1${intro}`);
 text=text.replace(/\n\*\*Historical grouping retained:\*\* [^\n]+\n/g,'\n');
 text=text.replace(/(## Defense Evasion\n)/, '$1\n**Historical grouping retained:** the maintained research edition uses Enterprise ATT&CK v19.2 and explains the April 2026 split into Stealth and Defense Impairment. These catalog rows and old identifiers are preserved for compatibility, not asserted as current taxonomy. [Version context]('+base+'research/attack-mapping/).\n');text=text.replace(/pathname:\/\/\/reports\//g,'https://1200km.com/anomaly-detection-atlas/reports/');
 if(['statistical-anomaly-taxonomy','security-log-source-taxonomy'].includes(doc)){
  const definitions=new GithubSlugger();
  text=text.replace(/(^### (\d+)\. ([^\n]+)\n)/gm,(heading,whole,number,title)=>{
   const anchor=definitions.slug(number+' '+title);
   const applicable=[...modelText.matchAll(/^\| <a id="([^"]+)"><\/a>[^\n]+/gm)].filter(m=>m[0].includes(doc+'.md#'+anchor+')')).flatMap(m=>modelFamilies.get(m[1])||[]);
   const related=[...new Set(applicable)].slice(0,5);
   if(!related.length)return heading;
   return heading+'\n<!-- atlas-context:start -->\n**Research in context:** '+related.map(id=>`[${familyRows.find(f=>f.id===id).title}](${base}families/${id}/)`).join(' · ')+'. Linked through catalog models that reference this definition; not a one-to-one taxonomy or sensor-equivalence claim.\n<!-- atlas-context:end -->\n';
  });
 }
 output(`docs/${doc}.md`,text.replace(/\n{3,}/g,'\n\n'));
}
const manifest={schema_version:1,consolidated_at:'2026-09-27',publication_snapshot:original,source:json('content/provenance.json'),evidence_boundary:'Source preservation and integration review; not a fresh full incident audit or detector execution.',counts:{operational_families:14,correlation_patterns:1,figures:allFigures.length,models:models.length},families:familyRows,pages,models,figures:allFigures,anchors:Object.fromEntries(anchors),unlinked_models:models.filter(m=>!modelFamilies.has(m.id)).map(m=>m.id)};
output('static/data/research-integration.json',JSON.stringify(manifest,null,2)+'\n');
output('src/data/research-index.json',JSON.stringify({families:familyRows,chapters:researchSections},null,2)+'\n');
console.log(JSON.stringify({pages:pages.length+3,figures:allFigures.length,families:familyRows.length,models:models.length,unlinked_models:manifest.unlinked_models}));
