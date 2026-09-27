import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';
const root=resolve(import.meta.dirname,'..'), build=resolve(root,'build');
const main=process.env.MAIN_SITE_ROOT||'/home/andrey/git-projects/1200km-unified-site';
const manifest=JSON.parse(readFileSync(root+'/static/data/research-integration.json'));
const provenance=JSON.parse(readFileSync(root+'/content/provenance.json'));
for(const f of provenance.files)assert.equal(createHash('sha256').update(readFileSync(root+'/content/'+f.dest)).digest('hex'),f.sha256,f.dest);
assert.equal(manifest.families.length,15);assert.equal(manifest.figures.length,55);assert.equal(manifest.models.length,54);assert.deepEqual(manifest.unlinked_models,[]);
const snippets=text=>[...text.matchAll(/<!-- query-source:([a-z-]+):start -->\n```kusto\n([\s\S]*?)\n```/g)].map(m=>[m[1],m[2]]);
const originalSnippets=snippets(readFileSync(root+'/content/research-source.md','utf8'));
assert.equal(originalSnippets.length,8);assert.deepEqual(snippets(readFileSync(root+'/docs/research/queries.md','utf8')),originalSnippets,'preserve all eight maintained query bodies exactly');
assert.equal([...readFileSync(root+'/docs/statistical-anomaly-taxonomy.md','utf8').matchAll(/^### \d+\. /gm)].length,118);
assert.equal([...readFileSync(root+'/docs/security-log-source-taxonomy.md','utf8').matchAll(/^### \d+\. /gm)].length,175);
const walk=p=>readdirSync(p).flatMap(n=>{const f=join(p,n);return statSync(f).isDirectory()?walk(f):f.endsWith('.html')?[f]:[];});
const htmls=new Map(walk(build).map(f=>['/anomaly-detection-atlas/'+f.slice(build.length+1).replace(/index\.html$/,''),{file:f,$:load(readFileSync(f,'utf8'))}]));
const failures=[];let localLinks=0,ecosystemLinks=0,figures=0;
for(const [route,{$}] of htmls){
 if(route.includes('/reports/'))continue;
 if(route.endsWith('/404.html'))continue;
 if($('h1').length!==1)failures.push(route+': expected one h1, got '+$('h1').length);
 const canon=$('link[rel=canonical]').attr('href');if(canon!=='https://1200km.com'+route)failures.push(route+': canonical '+canon);
 const ids=$('[id]').map((_,n)=>$(n).attr('id')).get();if(ids.length!==new Set(ids).size)failures.push(route+': duplicate IDs');
 figures+=$('[data-research-figure]').length;
 for(const n of $('a[href],img[src],source[srcset]').toArray()){
  const value=$(n).attr('href')||$(n).attr('src')||$(n).attr('srcset');if(!value||/^(mailto:|data:)/.test(value))continue;
  let u;try{u=new URL(value,'https://1200km.com'+route)}catch{failures.push('invalid URL '+value);continue;}
  if(u.origin!=='https://1200km.com')continue;
  if(u.pathname.startsWith('/anomaly-detection-atlas/')){
   const target=htmls.get(u.pathname);const path=join(build,u.pathname.slice('/anomaly-detection-atlas/'.length));
   if(!target&&!existsSync(path))failures.push(route+' -> missing '+u.pathname);
   else if(u.hash&&target&&!target.$('[id]').toArray().some(n=>target.$(n).attr('id')===decodeURIComponent(u.hash.slice(1))))failures.push(route+' -> missing anchor '+u.pathname+u.hash);
   localLinks++;
  }else if(/^\/(ttp-simulation|threat-matrix)\//.test(u.pathname)){
   const path=join(main,u.pathname,u.pathname.endsWith('/')?'index.html':'');if(!existsSync(path))failures.push(route+' -> missing ecosystem '+u.pathname);ecosystemLinks++;
  }
 }
}
assert.equal(figures,55,'each active figure appears once in the research path');
for(const m of manifest.models)assert.ok(htmls.get('/anomaly-detection-atlas/attack-statistical-anomaly-mapping/').$('[id]').toArray().some(n=>n.attribs.id===m.id),'missing original model anchor '+m.id);
for(const f of manifest.families){const p=htmls.get(new URL(f.url).pathname);assert.ok(p,f.url);assert.ok(p.$('[data-research-figure]').length===1);assert.ok(p.$('details summary').length);}
assert.deepEqual(failures,[],JSON.stringify(failures,null,2));
console.log(JSON.stringify({pages:htmls.size,figures,modelAnchors:manifest.models.length,localLinks,ecosystemLinks,failures:0}));
