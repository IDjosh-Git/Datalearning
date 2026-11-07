/** Regression: concurrent lesson actions must reach Supabase in order and not erase pending changes. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const code=fs.readFileSync('assets/scripts/progress-cloud.js','utf8');
const values=new Map();
const localStorage={getItem:k=>values.has(k)?values.get(k):null,setItem:(k,v)=>values.set(k,String(v)),removeItem:k=>values.delete(k)};
const transmitted=[];
let active=0,maxActive=0;
const client={from(name){assert.equal(name,'course_progress');return {upsert:async rows=>{
  active++;maxActive=Math.max(maxActive,active);
  await new Promise(r=>setTimeout(r,rows[0]?.completed?35:2));
  transmitted.push({slug:rows[0].course_slug,completed:rows[0].completed});
  active--;return {error:null};
}}}};
const window={ZAH_DB:{configured:true,client},addEventListener:()=>{}};
vm.runInNewContext(code,{window,localStorage,console,Date,Promise,Map,setTimeout,clearTimeout},{timeout:1500});
const cloud=window.ZAHProgressCloud;
const u={id:'00000000-0000-4000-a000-000000000001'};
const first=cloud.saveWeek('excel',2,true,u);
const second=cloud.saveWeek('excel',2,false,u);
const results=await Promise.all([first,second]);
assert.equal(results.every(r=>r.ok),true);
assert.deepEqual(transmitted.map(x=>x.completed),[true,false], 'Most recent user click must be the last saved value');
assert.equal(maxActive,1,'Writes to the same course must not overlap');
assert.equal(JSON.parse(localStorage.getItem('excelRoadmapProgress'))['2'],false);
assert.equal(localStorage.getItem('zahPending:'+u.id+':excel'),null,'Completed changes should clear the queue');
console.log('PASS Supabase per-course write ordering and pending-change reconciliation');
