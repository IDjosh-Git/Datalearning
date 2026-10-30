/** Tests first paint, actual course matching, static links and no-account preview. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const routes=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')), ...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>'courses/'+f)];
assert.equal(routes.length,25,'25 pages including capstone guide and public sample lesson');
for(const p of routes){
 const html=read(p);assert(html.includes('id="dalp-theme-prepaint"'),`${p} missing theme bootstrap`);
 assert(html.indexOf('id="dalp-theme-prepaint"')<html.indexOf('.css'),`${p} theme prepaint too late`);
 assert(html.includes('learning-experience-v84.css'),`${p} missing shared v84 CSS`);
 assert(html.includes('learning-experience-v84.js'),`${p} missing shared experience JS`);
}
const rootDoc=(preference,osDark)=>{
 const classes=new Set();const r={dataset:{},style:{},classList:{toggle:(key,on)=>{if(on)classes.add(key);else classes.delete(key)}}};
 const document={documentElement:r};
 const window={matchMedia:()=>({matches:osDark})};
 const localStorage={getItem:()=>preference};
 return {r,document,window,localStorage,classes};
};
for(const p of ['index.html','courses/introduction.html','preview.html','capstone-guide.html']){
 const match=read(p).match(/<script id="dalp-theme-prepaint">([\s\S]*?)<\/script>/);assert(match,`No prepaint for ${p}`);
 for(const [stored,os,expected] of [[null,true,'dark'],[null,false,'light'],['dark',false,'dark'],['light',true,'light'],['system',true,'dark']]){
  const ctx=rootDoc(stored,os);vm.runInNewContext(match[1],ctx,{timeout:1000});assert.equal(ctx.r.dataset.theme,expected,`${p}: preference ${stored} / OS ${os}`);
 }
}
const sample=read('preview.html');
assert(sample.includes('What is data analysis?')&&sample.includes('One-minute example'),'Real foundation material copied to preview');
assert(!sample.includes('auth-gate.js'),'Public sample must not require login');
assert(!sample.includes('data-intro-check="1"'),'Sample does not pretend to save progress');
assert(read('auth.html').includes('href="preview.html"'),'Sign-in provides a preview escape hatch');
const home=read('index.html');assert(home.includes('id="lp-pathfinder-form"'));
assert.equal((home.match(/class="lp-course-outcome"/g)||[]).length,6,'Six meaningful course outcomes');
assert(home.includes('6</b><span>Learning paths'),'Accurate track count');
assert(read('assets/landing.js').includes("pythonRoadmapProgress"),'Python included in progress aggregation');
assert(read('assets/landing-search.js').includes("c.dataset.level==='intermediate'"),'Python is included in the specialist filter');
assert(read('assets/theme-control-v14.js').includes("['system','System']"),'System theme is selectable');
assert(read('assets/theme-control-v14.js').includes("['dark','Dark']"),'Dark theme is selectable');
const broken=[];
for(const p of routes){
 const html=read(p);
 for(const match of html.matchAll(/\bhref\s*=\s*['"]([^'"<>]+)['"]/g)){
  const uri=match[1].split(/[?#]/)[0];
  if(!uri||/^(?:https?:|mailto:|tel:|data:|\/\/)/i.test(uri))continue;
  if(uri.startsWith('/'))continue; // handled by hosting rewrites
  if(!fs.existsSync(path.resolve(root,path.dirname(p),uri)))broken.push(p+' → '+uri);
 }
}
assert.deepEqual(broken,[],'All relative links must exist');
// Execute the actual course recommendation against a tiny event/DOM harness.
const code=read('assets/learning-experience-v84.js');
function recommend(experience,goal,tool,time='steady'){
 const values={experience,goal,tool,time};const nodes={};
 const form={elements:Object.fromEntries(Object.entries(values).map(([key,value])=>[key,{value}])),addEventListener:(name,callback)=>{form[name]=callback}};
 for(const id of ['path-result-title','path-result-desc','path-result-plan','path-result-link','path-result'])nodes[id]={textContent:'',hidden:true,href:'',scrollIntoView:()=>{}};
 nodes['lp-pathfinder-form']=form;
 const body={classList:{contains:value=>value==='lp-home'}};
 const document={body,readyState:'loading',addEventListener:(name,fn)=>{document[name]=fn},getElementById:id=>nodes[id],querySelectorAll:()=>[],querySelector:()=>null};
 const ctx={document,location:{pathname:'/index.html'},localStorage:{getItem:()=>null},matchMedia:()=>({matches:true})};
 vm.runInNewContext(code,ctx,{timeout:1000});document.DOMContentLoaded();
 form.submit({preventDefault(){}});
 return nodes;
}
let result=recommend('new','code','python');assert.equal(result['path-result-title'].textContent,'Introduction to Data Analysis');
assert.match(result['path-result-desc'].textContent,/After Foundations, explore Python/);
result=recommend('some','dash','unsure','short');assert.equal(result['path-result-title'].textContent,'Power BI & DAX');
assert.match(result['path-result-plan'].textContent,/up to 2 hours/i);
result=recommend('confident','explore','sql','deep');assert.equal(result['path-result-title'].textContent,'SQL for Data Analysis');
console.log('PASS learning v84: 25 routes, system/light/dark first paint, public authentic preview, six course outcomes, valid local links, real recommendations and Python progress');
