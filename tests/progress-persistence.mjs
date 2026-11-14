import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('assets/scripts/progress-cloud.js','utf8');
const remote=new Map();let reads=0,failWrites=false,failReads=false,holdRead=null;
const rowKey=r=>`${r.user_id}:${r.course_slug}:${r.week_no}`;
for(const week of [1,2]){const row={user_id:'learner-a',course_slug:'excel',week_no:week,completed:true,updated_at:'2026-11-01'};remote.set(rowKey(row),row);}
function session(id){
 const memory=new Map(),events=[];let resolve;
 const ready=new Promise(r=>resolve=r);
 const client={auth:{getUser:async()=>({data:{user:{id}}})},from:()=>({
  select(){const filters={};return {eq(k,v){filters[k]=v;return this;},async order(){reads++;if(failReads)throw Error('offline');const snapshot=[...remote.values()].filter(r=>Object.entries(filters).every(([k,v])=>r[k]===v)).map(r=>({...r}));if(holdRead){const hold=holdRead;holdRead=null;await hold;}return {data:snapshot,error:null};}};},
  async upsert(rows){if(failWrites)return {error:Error('write failed')};rows.forEach(r=>remote.set(rowKey(r),{...r}));return {error:null};}
 })};
 const window={DALP_AUTH_GATE:{whenReady:ready},ZAH_DB:{configured:true,client},DALP_STORAGE:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)},addEventListener(){},dispatchEvent:e=>events.push(e)};
 vm.runInNewContext(source,{window,console:{error(){},warn(){}},Date,Map,Promise,CustomEvent:class{constructor(type,init){this.type=type;this.detail=init.detail;}}});
 return {cloud:window.ZAHProgressCloud,memory,events,release(){window.DALP_AUTH_USER={id};resolve({id});}};
}
const a=session('learner-a');const restoring=a.cloud.syncCourse('excel');
await Promise.resolve();assert.equal(reads,0,'progress must wait for restored verified identity');
a.release();assert.equal((await restoring).percent,20,'stored completions load after delayed authentication');
assert.equal((await a.cloud.saveWeek('excel',3,true)).ok,true);
assert.equal((await a.cloud.syncCourse('excel')).percent,30);
const reloaded=session('learner-a');reloaded.release();assert.equal((await reloaded.cloud.syncCourse('excel')).percent,30,'fresh page memory reads persisted progress');
const other=session('learner-b');other.release();assert.equal((await other.cloud.syncCourse('excel')).percent,0,'another learner never receives these completions');
failWrites=true;const failed=await reloaded.cloud.saveWeek('excel',4,true);assert.equal(failed.ok,false,'failed write is never reported saved');
failWrites=false;assert.equal((await reloaded.cloud.syncCourse('excel')).percent,40,'retry sends pending completion');
let releaseRead;holdRead=new Promise(resolve=>releaseRead=resolve);
const stale=reloaded.cloud.syncCourse('excel');
while(holdRead)await Promise.resolve();
assert.equal((await reloaded.cloud.saveWeek('excel',5,true)).ok,true);
releaseRead();const result=await stale;assert.equal(result.progress['5'],true,'old cloud response cannot roll back a newer completion');
assert.equal(reloaded.cloud.readLocal('excelRoadmapProgress')['5'],true);
failReads=true;await assert.rejects(()=>reloaded.cloud.syncCourse('excel'));assert.equal(reloaded.cloud.readLocal('excelRoadmapProgress')['5'],true,'failed read preserves loaded progress');failReads=false;
assert.equal((await reloaded.cloud.syncCourse('excel')).percent,50);
assert(reloaded.events.some(e=>e.type==='dalp:progress-updated'));
console.log('PASS delayed authentication, persisted completion on reload, account isolation, failed save/retry, stale-read race, failed-read preservation and progress events');
