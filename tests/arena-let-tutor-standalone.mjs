import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const base='assets/scripts/';
const context={window:{}};vm.createContext(context);
vm.runInContext(fs.readFileSync(base+'formula-engine.js','utf8'),context);
const run=context.window.DALP_EXEC_EXCEL.evaluate;
const checks=[
 ['=LET(x,2,x+3)',5],
 ['=let(revenue,SUM(B2:B7),revenue/2)',925],
 ['=LET(total,SUM(B2:B7),count,COUNT(B2:B7),total/count)',1850/6],
 ['=LET(x,10,y,x*2,y+5)',25],
 ['=LET(x,2,LET(y,x+3,y*x))',10],
 ['=LET(x,4,LET(x,8,x)+x)',12],
 ['=LET(x,5,IF(TRUE,x,1/0))',5],
 ['=LET(first,10;second,first/2;second*2)',10],
 ['=LET(x,5,x*x)',25],
 ['=LET(x,2,LET(x,3,x)+x)',5],
];
for(const [expression,expect] of checks){const actual=run(expression);assert(Math.abs(actual-expect)<1e-9,`${expression}: ${actual}`)}
const failures=[['=LET(x,1)','#VALUE!'],['=LET(x,2,x,3,x)','#VALUE!'],['=LET(A1,4,A1)','#VALUE!'],['=LET(x,1,y,1/0,x+y)','#DIV/0!'],['=LET(x,2,y+1)','#NAME?']];
for(const [f,err] of failures)assert.throws(()=>run(f),e=>e.code===err,`${f} must report ${err}`);
const html=fs.readFileSync('tutor.html','utf8');
const script=fs.readFileSync(base+'floating-learning-ai.js','utf8');
const practice=fs.readFileSync('practice.html','utf8');
const ide=fs.readFileSync(base+'arena-ide.js','utf8');
const picker=fs.readFileSync('assets/styles/practice-challenge-selector-premium.css','utf8');
assert(!html.includes('floating-learning-ai.js'),'Tutor page must not load duplicate floating assistant');
assert(script.includes('tutor\\.html'),'Floating assistant must refuse to initialize on tutor route');
assert(practice.includes('practice-challenge-selector-premium.css'),'Premium challenge selector stylesheet must be loaded');
assert(practice.includes('pc-library-stats'),'Challenge selector header includes live statistics');
assert(ide.includes('ideLetExample'),'LET starter insertion must be wired');
for(const token of ['#hubClose','.pc-card-selection','#practiceList','@media(max-width:720px)'])assert(picker.includes(token),`Missing ${token}`);
console.log(`PASS ${checks.length} LET calculations, ${failures.length} validation failures, floating tutor hidden, and premium selector wiring`);
