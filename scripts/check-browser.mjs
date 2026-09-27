import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync,mkdtempSync,existsSync,statSync} from 'node:fs';
import {createServer} from 'node:http';
import {spawn} from 'node:child_process';
import {resolve,extname,sep} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const main=process.env.MAIN_SITE_ROOT||'/home/andrey/git-projects/1200km-unified-site';
const reports=process.env.REPORT_DIR||'/tmp/unified-atlas-browser';mkdirSync(reports,{recursive:true});
const manifest=JSON.parse(readFileSync(root+'/static/data/research-integration.json'));
const routes=['','research/','families/','visuals/','research/provenance/',...manifest.pages.map(p=>new URL(p.url).pathname.replace('/anomaly-detection-atlas/','')),'attack-statistical-anomaly-mapping/','statistical-anomaly-taxonomy/','security-log-source-taxonomy/','attack-basic-detection-rule-catalog/','attack-activity-log-source-catalog/'];
const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
const server=createServer((req,res)=>{const path=new URL(req.url,'http://localhost').pathname;const targetRoot=path.startsWith('/anomaly-detection-atlas/')?root+'/build':main;const rel=targetRoot===main?path:path.slice('/anomaly-detection-atlas'.length);const f=resolve(targetRoot,'.'+decodeURIComponent(rel)+(rel.endsWith('/')?'index.html':''));if(!f.startsWith(targetRoot+sep)||!existsSync(f)||!statSync(f).isFile()){res.writeHead(404);res.end();return;}res.setHeader('Content-Type',mime[extname(f)]||'application/octet-stream');res.end(readFileSync(f));});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
const base=process.env.LIVE_ORIGIN||`http://127.0.0.1:${server.address().port}`;
const chrome=spawn('google-chrome',['--headless=new','--no-sandbox','--disable-gpu',`--user-data-dir=${mkdtempSync('/tmp/unified-atlas-chrome-')}`,'--remote-debugging-port=0','about:blank'],{stdio:['ignore','ignore','pipe']});
let socket;const results=[],errors=[];
try{
 const endpoint=await new Promise((done,reject)=>{let out='';const timer=setTimeout(()=>reject(Error('Chrome startup timeout')),15000);chrome.stderr.on('data',data=>{out+=data;const m=out.match(/DevTools listening on (ws:\/\/\S+)/);if(m){clearTimeout(timer);done(m[1]);}});chrome.on('error',reject);});
 socket=new WebSocket(endpoint);await new Promise(done=>socket.addEventListener('open',done,{once:true}));let next=0;const pending=new Map();
 socket.addEventListener('message',event=>{const msg=JSON.parse(event.data);if(msg.method==='Runtime.exceptionThrown')errors.push(msg.params.exceptionDetails);const p=pending.get(msg.id);if(p){pending.delete(msg.id);msg.error?p.reject(Error(JSON.stringify(msg.error))):p.done(msg.result);}});
 const send=(method,params={},sessionId)=>new Promise((done,reject)=>{const id=++next;pending.set(id,{done,reject});socket.send(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})}));});
 const {targetId}=await send('Target.createTarget',{url:'about:blank'});const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true});const call=(m,p={})=>send(m,p,sessionId);
 const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 const waitFor=async expression=>{const start=Date.now();while(!await evaluate(expression)){assert.ok(Date.now()-start<30000,expression);await new Promise(done=>setTimeout(done,100));}};
 await call('Page.enable');await call('Runtime.enable');
 for(const width of [390,1440])for(const route of (process.env.QUICK?['','families/parent-child/']:routes)){
  await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
  await call('Page.navigate',{url:base+'/anomaly-detection-atlas/'+route});
  await waitFor("document.readyState==='complete' && !!document.querySelector('main h1')");
  await evaluate(readFileSync(main+'/node_modules/axe-core/axe.min.js','utf8'));
  const result=await evaluate(`(async()=>({h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth+1,figures:document.querySelectorAll('[data-research-figure]').length,violations:(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))}))()`);
  results.push({width,route,...result});writeFileSync(reports+'/results.json',JSON.stringify({results,errors},null,2));
  assert.equal(result.h1,1,route);assert.equal(result.overflow,false,route);assert.deepEqual(result.violations,[],route);
  if(route.startsWith('families/')&&route!=='families/'){
   await evaluate("document.querySelector('.anomaly-figure-transcript').open=true");
   assert.ok(await evaluate("document.querySelector('.anomaly-figure-transcript').textContent.length>150"));
  }
  if(['','families/parent-child/','research/telemetry/','attack-statistical-anomaly-mapping/'].includes(route)){
   const shot=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${reports}/${width}-${route.replaceAll('/','-')||'home'}.png`,Buffer.from(shot.data,'base64'));
  }
 }
 // Check light theme and narrow navigation on real hydrated pages.
 await call('Page.navigate',{url:base+'/anomaly-detection-atlas/'});await waitFor("document.readyState==='complete'");
 await call('Emulation.setDeviceMetricsOverride',{width:390,height:1000,deviceScaleFactor:1,mobile:false});
 await waitFor("!!document.querySelector('.navbar__toggle') && getComputedStyle(document.querySelector('.navbar__toggle')).display!=='none'");
 await evaluate("document.querySelector('.navbar__toggle').click()");await waitFor("document.querySelector('.navbar-sidebar')?.getBoundingClientRect().x>=0");
 assert.ok(await evaluate("[...document.querySelectorAll('.navbar-sidebar a')].some(a=>a.textContent==='Research')"));
 await call('Page.navigate',{url:base+'/anomaly-detection-atlas/families/parent-child/'});await waitFor("document.readyState==='complete'");
 await evaluate("document.documentElement.setAttribute('data-theme','light')");
 await evaluate("new Promise(done=>setTimeout(done,500))");
 await evaluate(readFileSync(main+'/node_modules/axe-core/axe.min.js','utf8'));
 const light=await evaluate("(async()=>({violations:(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))}))()");results.push({mode:'light',...light});writeFileSync(reports+'/results.json',JSON.stringify({results,errors},null,2));assert.deepEqual(light.violations,[]);
 // Static evidence and navigation remain usable without JavaScript.
 await call('Emulation.setScriptExecutionDisabled',{value:true});
 for(const route of ['','families/volumetric/','research/queries/']){await call('Page.navigate',{url:base+'/anomaly-detection-atlas/'+route});await waitFor("document.readyState==='complete'");const count=await evaluate("document.querySelectorAll('main a[href]').length");assert.ok(count>10);results.push({mode:'no-js',route,links:count});}
 assert.deepEqual(errors,[],'uncaught page errors');
 writeFileSync(reports+'/results.json',JSON.stringify({results,errors},null,2));console.log(JSON.stringify({checks:results.length,errors:errors.length,reports}));
}finally{socket?.close();chrome.kill();server.close();}
