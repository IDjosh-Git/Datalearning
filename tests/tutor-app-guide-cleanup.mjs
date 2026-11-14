/* Release guarantees: only current dependencies, grounded Tutor links and offline/live app help. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {findAppGuide,appContextFor,appResourceFor} from '../lib/tutor-app-knowledge.js';
import {allowedTopics} from '../lib/tutor-context.js';

const read=p=>fs.readFileSync(p,'utf8');
const data=JSON.parse(read('assets/data/tutor-app-guide.json'));
assert.equal(data.entries.length,26,'Exactly 17 app-help flows and 9 course guides');
const allIds=new Set(data.entries.map(x=>x.id));assert.equal(allIds.size,data.entries.length);
for(const e of data.entries){
 assert(e.answer.length>45&&e.steps.length>=2,`Weak guidance ${e.id}`);
 assert(e.href.startsWith('/')&&!e.href.startsWith('//'),`Internal route only: ${e.id}`);
 assert(fs.existsSync(e.href.slice(1).split('#')[0]),`Missing guide link ${e.href}`);
 if(e.id.startsWith('course-')){
  assert.equal(e.weeks.length,10,`${e.id} must cover all 10 weeks`);
  for(let i=0;i<10;i++){
   const w=e.weeks[i];assert.equal(w.week,i+1);
   assert(w.where&&w.worked&&w.task&&w.check&&w.business);
  }
 }
}
assert.deepEqual(allowedTopics.filter(x=>['tableau','powerquery'].includes(x)),['tableau','powerquery']);
const cases=[
 ['How can I submit my capstone?','capstone','/capstone-guide.html'],
 ['How do I get the practice datasets?','datasets','/index.html#zaDiscoverCards'],
 ['Where is the Prompt Library?','prompt-library','/prompt-library.html'],
 ['Can I watch YouTube without leaving the app?','videos','/index.html#zaDiscoverCards'],
 ['What is the complete data career path?','career-path','/career-path.html'],
 ['Where is the Practice Arena?','practice-arena','/practice.html'],
 ['Where do I see my learning progress?','progress','/account.html'],
 ['What do we learn in Excel Week 8?','weekly-excel-8','/courses/excel.html#week8'],
 ['What does Python Week 10 teach?','weekly-python-10','/courses/python.html#week10']
];
for(const [question,id,href] of cases){const item=findAppGuide(question);assert(item,question);assert.equal(item.id,id,question);assert.equal(item.href,href,question);assert(appContextFor(question).includes(href));assert.equal(appResourceFor(question).href,href);}
assert.equal(findAppGuide('How do I calculate SUMIFS in Excel?'),null,'Concept Qs must still use the regular knowledge tutor');
assert.equal(findAppGuide('Can you access my private grades?'),null,'Unverified personal account questions must not fake access');
assert(!JSON.stringify(data).includes('GROQ_API_KEY')&&!JSON.stringify(data).includes('OPENAI_API_KEY'));
const offline={window:{},fetch:async()=>({ok:true,json:async()=>data})};
vm.runInNewContext(read('assets/scripts/tutor-app-guide.js'),offline,{filename:'tutor-app-guide.js'});
for(const [question,,href] of cases){const item=await offline.window.DALP_APP_HELP.find(question);assert(item,question);assert.equal(item.href,href,question);assert(offline.window.DALP_APP_HELP.format(item).includes('Open the verified page: '));}
assert.equal(await offline.window.DALP_APP_HELP.find('How do I calculate SUMIFS in Excel?'),null);
assert(read('tutor.html').includes('tutor-app-guide.js')&&read('tutor.html').includes('Where is the AI Prompt Library?'));
assert(read('assets/scripts/tutor.js').includes('await window.DALP_APP_HELP?.find'));
assert(read('api/tutor.js').includes('appContextFor(question,topic)')||read('api/tutor.js').includes('appContextFor'));
for(const path of ['assets/icons/data-network.svg','curriculum/build_curriculum.py','docs/UNIFIED_ACADEMY_V3.md'])assert(!fs.existsSync(path),`Old release artifact still present: ${path}`);
const packageFile=JSON.parse(read('package.json'));
for(const [name,cmd] of Object.entries(packageFile.scripts)){
 for(const match of cmd.matchAll(/node\s+(tests\/[^\s&]+\.mjs)/g))assert(fs.existsSync(match[1]),`Package script ${name} invokes missing test ${match[1]}`);
}
console.log('PASS lean release: 26 current app-guide flows, 90 verified course weeks, 9 route-specific questions, offline help matching, secure context and no broken test scripts');

