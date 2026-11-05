/** Browser-worker contract: avoid cold-starting Pyodide for each mobile challenge. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const instances=[];
let pause=false;
class FakeWorker {
 constructor(url){this.url=url;this.terminated=false;instances.push(this);}
 postMessage(message){this.last=message;if(pause)return;
  queueMicrotask(()=>this.onmessage?.({data:{id:message.id,type:'status',ready:true,message:'Python ready'}}));
  queueMicrotask(()=>this.onmessage?.({data:message.type==='grade'?{id:message.id,type:'grade',ok:true,output:'All checks passed.',error:''}:{id:message.id,type:'result',output:'Hello, learner!'}}));
 }
 terminate(){this.terminated=true;}
}
const window={};const doc={currentScript:{src:'https://example.com/assets/scripts/python-runtime-manager.js'}};
const ctx={window,document:doc,location:{href:'https://example.com/practice.html'},URL,Worker:FakeWorker,setTimeout,clearTimeout,queueMicrotask};
vm.createContext(ctx);
for(const file of ['python-runtime-manager.js','python-grader.js'])vm.runInContext(fs.readFileSync('assets/scripts/'+file,'utf8'),ctx,{filename:file});
const runtime=window.DALP_PY_RUNTIME;
assert(runtime,'Shared Python worker manager must be installed');
const first=await runtime.execute({type:'run',code:'print("Hello, learner!")'});
assert.equal(first.output,'Hello, learner!');
assert.equal(runtime.ready,true);
const grade=await window.DALP_PY_GRADE('def total_sales(numbers): return sum(numbers)',{test:'assert total_sales([1,2]) == 3'});
assert.equal(grade.ok,true);
assert.equal(instances.length,1,'Running and grading in same Arena must reuse a single Python worker');
assert.equal(instances[0].last.type,'grade');
assert.match(instances[0].url,/assets\/python-worker\.js$/);
pause=true;
const waiting=runtime.execute({type:'run',code:'while True: pass'});
await assert.rejects(runtime.execute({type:'grade',code:'print(1)',test:'assert 1'}),/already running/);
runtime.stop();
await assert.rejects(waiting,/stopped/);
assert.equal(instances[0].terminated,true);
pause=false;
await runtime.execute({type:'run',code:'print(2)'});
assert.equal(instances.length,2,'Explicit Stop must restart a fresh runtime only when needed');
assert.equal(runtime.ready,true);
console.log('PASS Python mobile performance: shared worker reused for Run and Grade, reliable busy state, Stop, and recovery');
