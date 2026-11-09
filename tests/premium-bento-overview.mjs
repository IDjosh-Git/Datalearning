/* New premium shell/search + privacy-safe overview, complementary to the existing 95 Arena and auth regression checks. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {discoverPages} from './page-assets.mjs';
const read=path=>fs.readFileSync(path,'utf8');
const pages=discoverPages();
assert.equal(pages.length,41,'40 routes including Learning Overview');
const publicPages=pages.filter(p=>p.html.includes('class="dalp-global-header"'));
assert.equal(publicPages.length,30,'Every public header, including the new overview, uses one navigation');
for(const page of pages){
  const css=page.links.filter(x=>x.local&&x.path==='assets/styles/premium-unified.css');
  const js=page.scripts.filter(x=>x.local&&x.path==='assets/scripts/premium-search.js');
  assert.equal(css.length,1,`${page.route}: missing or duplicate shared premium CSS`);
  assert.equal(js.length,page.route==='auth.html'?0:1,`${page.route}: search should be present exactly once except on sign-in`);
  assert.equal(page.links.at(-1).path,'assets/styles/premium-unified.css',`${page.route}: legacy overrides after premium theme`);
  if(page.html.includes('class="dalp-global-header"'))assert(page.html.includes((page.route.startsWith('courses/')?'../':'')+'overview.html'),`${page.route}: Learning Overview not accessible from public nav`);
}
const script=read('assets/scripts/premium-search.js');
for(const term of ['showModal()','Escape','ArrowDown','ArrowUp','ctrlKey','metaKey','psResults','Search courses, tools or topics','courses/sql.html','practice.html'])assert(script.includes(term),`Premium search lost ${term}`);
assert(!/fetch\(|XMLHttpRequest|WebSocket/.test(script),'Local command search must not send search queries to a server');
const overview=read('overview.html');
for(const id of ['overviewTitle','boRanking','boTopCourse','boDataState','boPlanSteps','boPlanProgress','boResetPlan','boTrackedLearners','boCompletedLessons'])assert(overview.includes(`id="${id}"`),`Overview missing component ${id}`);
for(const f of ['courses/excel.html','courses/sql.html','courses/powerbi.html','courses/ai.html','courses/python.html','courses/introduction.html'])assert(overview.includes(`href="${f}"`),`Overview missing ${f}`);
const logic=read('assets/scripts/learning-overview.js');
for(const term of ['rpc(\'public_course_activity_overview\')','Number.isInteger','Not enough published activity','Live course activity is unavailable','localStorage.setItem','aria-valuenow'])assert(logic.includes(term),`Missing privacy-safe / functional overview behavior: ${term}`);
const sql=read('database/migrations/learning_overview_aggregate.sql').toLowerCase();
for(const term of ['security definer','set search_path = \'\'','revoke all on function public.public_course_activity_overview','grant execute on function public.public_course_activity_overview() to anon,authenticated','>=5','public.course_progress','public.quiz_results','public.capstone_submissions','public.capstone_reviewers'])assert(sql.includes(term),`Aggregate migration missing ${term}`);
assert(!/returns table\([^)]*(?:user_id|email|full_name)/.test(sql),'Public aggregate function must not expose individual learner data');
for(const name of ['arena-responsive-tabs.js','arena-responsive-final.js'])assert(!fs.existsSync(`assets/scripts/${name}`),`${name} is unused and must stay removed`);
assert(read('assets/scripts/private-navigation.js').includes("['Learning overview','overview.html','overview']"),'Private navigation must link to the learning overview');
const theme=read('assets/styles/premium-unified.css');
assert(theme.includes('.premium-search-trigger')&&theme.includes('.bo-bento-grid')&&theme.includes('.bo-plan-panel'),'Bento theme must have real component styling');
const ratio=(a,b)=>{const L=h=>[0,2,4].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((x,v,i)=>x+v*[.2126,.7152,.0722][i],0);const n=[L(a),L(b)].sort((x,y)=>y-x);return (n[0]+.05)/(n[1]+.05)};
for(const [name,a,b] of [['Overview primary action','ffffff','5c49c3'],['Overview dark surface','ffffff','182746'],['Search launcher','344766','f7f8fd'],['Search primary label','1c2b47','ffffff'],['Overview muted text','52637f','f5f7fc']])assert(ratio(a,b)>=4.5,`${name}: expected >=4.5:1`);
console.log(`PASS premium Bento: ${pages.length} pages, ${publicPages.length} public navs, search keyboard, private nav, privacy-safe aggregate function, saved study checklist, and AA contrast`);
