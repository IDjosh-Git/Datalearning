import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import handler from '../api/tutor.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=x=>fs.readFileSync(path.join(root,x),'utf8');
const pages=['index.html','reference.html','tutor.html','auth.html','account.html','verify.html','progress.html','courses/excel.html','courses/sql.html','courses/powerbi.html','courses/ai.html','prompt-library.html'];
for(const p of pages){assert(read(p).includes('Data Analysis Learning Path'),'Missing rebrand '+p);assert(!read(p).includes('zen-logo.png'),'Old missing logo '+p)}
for(const p of ['courses/excel.html','courses/sql.html','courses/powerbi.html']){const s=read(p);assert.equal((s.match(/class="guided-lab"/g)||[]).length,10,`${p} labs`);assert.equal((s.match(/class="question"/g)||[]).length,50,`${p} quizzes`);assert.equal((s.match(/class="week searchable"/g)||[]).length,10,`${p} weeks`);assert(s.includes('course-refresh.css'));}
const refs=JSON.parse(read('assets/reference-data.js').replace(/^window.IJ_REFERENCE=/,'').replace(/;\s*$/,''));assert.equal(refs.length,603);for(const r of refs){assert(r.title&&r.code&&r.watch&&r.meaning)}
for(const item of ['assets/da-logo.svg','assets/site.css','assets/tutor.js','assets/reference.js','api/tutor.js','lib/tutor-context.js','downloads/retail_orders.csv','downloads/retail_practice.sqlite'])assert(fs.existsSync(path.join(root,item)),item);
assert.equal(read('downloads/retail_orders.csv').trim().split(/\r?\n/).length,361);
assert(read('index.html').includes('esoterikjoshua@gmail.com'));
assert(!read('assets/tutor.js').includes('process.env.OPENAI_API_KEY'));assert(!read('assets/supabase-config.js').includes('service_role'));
const req=(method,body)=>({method,body,headers:{host:'example.vercel.app',origin:'https://example.vercel.app','x-forwarded-for':'203.0.113.45'}});
async function run(r){return await new Promise((resolve,reject)=>{let output='',code,headers={};const res={set statusCode(v){code=v},get statusCode(){return code},setHeader(k,v){headers[k]=v},end(x){output=x;resolve({code,headers,body:JSON.parse(output)})}};Promise.resolve(handler(r,res)).catch(reject)})}
delete process.env.OPENAI_API_KEY;
let r=await run(req('GET'));assert.equal(r.code,200);assert.equal(r.body.aiEnabled,false);
r=await run(req('POST',{question:'Explain SUMIFS'}));assert.equal(r.code,503);
process.env.OPENAI_API_KEY='test-only-do-not-use';
const originalFetch=globalThis.fetch;let sent;
globalThis.fetch=async(_url,options)=>{sent=JSON.parse(options.body);assert.match(options.headers.Authorization,/test-only-do-not-use/);return {ok:true,status:200,json:async()=>({output:[{content:[{type:'output_text',text:'SUMIFS adds values matching several conditions.'}]}]})}};
try{r=await run(req('GET'));assert.equal(r.body.aiEnabled,true);r=await run(req('POST',{question:'Explain SUMIFS',history:[{role:'user',content:'I use Excel'}]}));assert.equal(r.code,200);assert.match(r.body.answer,/SUMIFS/);assert.equal(sent.store,false);assert(sent.instructions.includes('Data Analysis Learning Path'));assert.equal(sent.input.length,2);r=await run(req('POST',{question:''}));assert.equal(r.code,400);const wrong=req('POST',{question:'hello'});wrong.headers.origin='https://external.invalid';r=await run(wrong);assert.equal(r.code,403);}finally{globalThis.fetch=originalFetch;delete process.env.OPENAI_API_KEY;}
console.log('PASS Data Analysis Learning Path rebrand | 9 pages | 30 labs | 150 quiz questions | 603 references | practice CSV 360 orders');
console.log('PASS Vercel AI GET/POST: unconfigured, configured/mock response, privacy, input validation, origin check');

for (const c of ['excel','sql','powerbi','ai']){ const t=read(`courses/${c}.html`); assert(t.includes(`../capstone.html?course=${c}`),'Capstone route '+c); assert(!t.includes("localStorage.setItem(store"),'No self-issued certificate '+c); assert(t.includes(c==='ai'?'ai-course.css':'modern.css'),'Course theme '+c); }
assert(read('supabase_setup.sql').includes('DALP-(EXL|PBI|SQL|AIA)'),'Four certificate code formats supported');
assert(read('supabase_setup.sql').includes('learning_private.publish_capstone_review'),'Owner-only manual publishing');
assert(!read('vercel.json').includes('crons'),'No automated assessment schedule');
console.log('PASS manually reviewed capstone flow | 4 courses | verified completion database');

// Beginner course must remain separate from the three certificate-bearing tracks.
const intro=read('courses/introduction.html');
assert(intro.includes('Introduction to <em>Data Analysis</em>'));
for(let i=1;i<=8;i++){
  assert(intro.includes(`data-intro-check="${i}"`),`Missing foundation check ${i}`);
  assert(intro.includes(`data-lesson="${i}"`),`Missing lesson ${i}`);
}
for(const topic of ['daily life','data quality','break-even','kiosk','Excel','SQL','Power BI'])assert(intro.toLowerCase().includes(topic.toLowerCase()),'Intro topic: '+topic);
for(const course of ['excel','sql','powerbi']){
  const html=read(`courses/${course}.html`);
  assert(html.includes('href="introduction.html"'),`Missing foundation link from ${course}`);
  assert(html.includes('course-intro-callout'),`Missing foundation explanation in ${course}`);
}
const introJs=read('assets/introduction.js');
assert.equal((introJs.match(/\{q:'/g)||[]).length,12,'Twelve introductory questions');
assert(introJs.includes('ZAHProgressCloud')&&introJs.includes("const slug = 'introduction'"), 'Intro syncs through the shared cloud progress engine');
assert(read('supabase_setup.sql').includes("('introduction','excel','sql','powerbi','ai')"),'Introduction and AI allowed in course progress');
assert(read('index.html').includes('courses/introduction.html'));
const kiosk=read('downloads/kiosk_week.csv').trim().split(/\r?\n/);
assert.equal(kiosk.length,6,'five-row fictional kiosk CSV + header');
const records=kiosk.slice(1).map(line=>{
 const [date,day,units,price,variable,fixed,weather]=line.split(',');
 assert(date&&day&&weather);
 return {units:+units,price:+price,variable:+variable,fixed:+fixed};
});
const sum=key=>records.reduce((acc,row)=>acc+key(row),0);
assert.equal(sum(r=>r.units),124);
assert.equal(sum(r=>r.units*r.price),186000);
assert.equal(sum(r=>r.units*r.variable),111600);
assert.equal(sum(r=>r.fixed),30000);
assert.equal(sum(r=>r.units*(r.price-r.variable)-r.fixed),44400);
console.log('PASS introduction | 8 lessons | 12 questions | cross-device cloud progress | certificate tracks remain separate | kiosk CSV arithmetic');
