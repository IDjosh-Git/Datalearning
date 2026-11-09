/** Regression: Excel calculation sandbox, common formulas and safe floating AI display. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const ctx={window:{}};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('assets/scripts/formula-engine.js','utf8'),ctx);
const engine=ctx.window.DALP_EXEC_EXCEL;
const cases=[
 ['=SUM(B2:B7)',1850],['=COUNTIF(C2:C7,"East")',3],
 ['=SUMPRODUCT(B2:B7*E2:E7)',5150],
 ['=SUMIFS(B2:B7,C2:C7,"East")',1040],
 ['=IF(FALSE,1/0,42)',42],
 ['=IFERROR(1/0,"Check")','Check'],
 ['=PERCENTILE.INC(B2:B7,0.5)',255],
 ['=RANK.EQ(450,B2:B7)',2],
 ['=CORREL(B2:B7,B2:B7)',1],
 ['=COUNTIF(C2:C7,"West")',3],
 ['=TEXTBEFORE("south-east","-")','south'],
 ['=TEXTAFTER("south-east","-")','east'],
 ['=TEXT(0.25,"0%")','25%'],
 ['=EOMONTH(DATE(2026,11,12),0)',46356],
 ['=NETWORKDAYS(DATE(2026,11,2),DATE(2026,11,6))',5],
 ['=COMBIN(5,2)',10],['=FACT(5)',120],
 ['=INDEX(A2:A7,3)','Binders'],
 ['=XLOOKUP("Paper",A2:A7,B2:B7)',210],
 ['=ADDRESS(5,4)','$D$5'],
];
for(const [f,expected] of cases){const result=engine.evaluate(f);if(typeof expected==='number')assert(Math.abs(result-expected)<1e-9,`${f}: ${result} != ${expected}`);else assert.equal(result,expected,f)}
const sheet=Object.assign(Object.create(null),{B2:999,F2:'=B2*2',F3:'=F2+100',G7:'=COUNTIF(C2:C7,"East")'});
for(const [f,expected] of [['=B2+1',1000],['=F2',1998],['=F3',2098],['=SUM(F2:F3)',4096],['=G7',3]])assert.equal(engine.evaluate(f,sheet),expected,f);
sheet.A10='=B10+1';sheet.B10='=A10+1';assert.throws(()=>engine.evaluate('=A10',sheet),e=>e.code==='#CIRC!');
assert.throws(()=>engine.evaluate('=DONTEXIST(1)'),e=>e.code==='#NAME?');
// Graded challenge data must not be mutated by the independent sandbox.
assert.equal(engine.evaluate('=B2'),120);
const ide=fs.readFileSync('assets/scripts/arena-ide.js','utf8');
for(const token of ['ideSetCell','runFormula(shell)','workbook=Object.create(null)','Save to cell','Check challenge answer'])assert(ide.includes(token),`Missing Excel workspace control: ${token}`);
const coach=fs.readFileSync('assets/scripts/floating-learning-ai.js','utf8');
for(const token of ['renderAnswer','renderInline','document.createTextNode','dl-float-code-wrap','dl-float-answer','textContent=body.join'])assert(coach.includes(token),`Missing safe Markdown formatting: ${token}`);
assert(!coach.includes('body.innerHTML = sanitize(text)'), 'Never render AI text as trusted HTML');
console.log('PASS Excel formula sandbox: 20 formula cases, 5 custom-cell references, #CIRC!, #NAME?, unmodified challenge sample, safe AI renderer');
