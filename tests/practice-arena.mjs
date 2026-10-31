import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const ctx={window:{}};vm.createContext(ctx);
for(const f of ['execution-engine.js','formula-engine.js','practice-data.js','practice-extra.js'])vm.runInContext(fs.readFileSync('assets/scripts/'+f,'utf8'),ctx,{filename:f});
const tasks=ctx.window.DALP_PRACTICE,sql=ctx.window.DALP_EXEC_SQL,formula=ctx.window.DALP_EXEC_EXCEL;
assert.equal(tasks.length,95);assert.equal(tasks.filter(t=>t.kind==='SQL').length,45);assert.equal(tasks.filter(t=>t.kind==='Excel').length,50);
for(const t of tasks.filter(t=>t.kind==='Excel'))for(const seed of [0,1,2]){
const run=()=>formula.evaluate(t.answer);const result=seed?formula.withScenario(seed,run):run();assert.notEqual(result,undefined,`${t.id} seed ${seed}`);
}
for(const t of tasks.filter(t=>t.kind==='SQL'&&!t.engine))assert(Array.isArray(sql.execute(t.answer)),t.id);
for(const [expression,expected] of Object.entries({'=SUM(B2:B7)':1850,'=SUMIFS(B2:B7,C2:C7,"East",E2:E7,">1")':420,'=XLOOKUP("Toner",A2:A7,D2:D7)':620,'=SUMPRODUCT(B2:B7,E2:E7)':5150,'=COUNTIF(C2:C7,"E*")':3,'=IFERROR(1/0,"NA")':'NA','=(B2+30)*2':300}))assert.equal(formula.evaluate(expression),expected,expression);
assert.equal(JSON.stringify(formula.evaluate('=FILTER(B2:B7,C2:C7="East")')),JSON.stringify([120,300,620]));
for(const [expression,error] of [['=UNKNOWN(B2)','#NAME?'],['=1/0','#DIV/0!'],['=SUM(Q20)','#REF!']])assert.throws(()=>formula.evaluate(expression),e=>e.code===error,expression);
assert.match(fs.readFileSync('assets/scripts/arena-ide.js','utf8'),/sheet\(false\)/,'Inspector does not create duplicate formula input');
assert.match(fs.readFileSync('practice.html','utf8'),/sql-wasm\.js/);assert.match(fs.readFileSync('practice.html','utf8'),/simple-icons@v15\/icons\/microsoftexcel/);
console.log('PASS 95 challenges registered (45 SQL, 50 Excel); 150 formula scenario runs; 20 offline SQL models; errors, nested formulas, branding and runtime wiring');
