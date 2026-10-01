// Verify editorial references against preserved evidence; never runs an engine.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
const root=resolve(import.meta.dirname,'..');
const option=process.argv.indexOf('--archive');
assert.ok(option>=0,'Pass --archive /path/to/preserved-article-source');
const archive=resolve(process.argv[option+1]);
const bytes=p=>readFileSync(p);
const hash=p=>createHash('sha256').update(bytes(p)).digest('hex');
const json=p=>JSON.parse(bytes(p));
const paths=json(root+'/content/worked-paths.json');
const folder=archive+'/research/anomaly-validation/';
assert.equal(hash(folder+'results/functional-results.json'),paths.functional_report_sha256);
assert.equal(hash(folder+'contracts.json'),paths.contracts_sha256);
const report=json(folder+'results/functional-results.json');
const contracts=json(folder+'contracts.json');
assert.equal(report.synthetic_tests.length,34);
assert.equal(Object.keys(report.query_sha256).length,8);
let fixtures=0;
for(const entry of paths.entries){
 assert.equal(entry.fields,contracts.tables[entry.table]);
 assert.equal(hash(folder+'queries/'+entry.query+'.kql'),report.query_sha256[entry.query+'.kql']);
 const expected=report.synthetic_tests.filter(f=>entry.fixtures.includes(f.name)).map(f=>Object.fromEntries(['name','expected','actual','passed'].map(key=>[key,f[key]])));
 assert.equal(expected.length,entry.fixtures.length);
 assert.deepEqual(entry.observed_fixtures,expected);
 fixtures+=expected.length;
 assert.ok(readFileSync(root+'/docs/research/queries.md','utf8').includes('{#'+entry.anchor+'}'));
 if(entry.recording){
  const recording=report.public_recordings.find(r=>r.id===entry.recording);
  assert.equal(recording.input_records,1);
  assert.equal(recording.output_rows,0);
 }
}
const study=json(folder+'results/synthetic-study.json');
assert.equal(study.dataset_rows,2688);
const before=study.models.find(m=>m.model==='entity-mad').test;
const after=study.models.find(m=>m.model==='entity-mad-gated').test;
assert.deepEqual([before.fp,after.fp,before.tp,after.tp],[85,8,18,11]);
console.log(JSON.stringify({paths:paths.entries.length,referencedFixtures:fixtures,reportedQueryCount:8,reportedFixtureCount:34,sourceHashes:'matched',kerberoasting:[1,0],syntheticTradeoff:{fp:[85,8],tp:[18,11]},engineExecution:'not-run'}));
