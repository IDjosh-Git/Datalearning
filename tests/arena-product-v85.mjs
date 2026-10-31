import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read = f=>fs.readFileSync(f,'utf8');
const html=read('practice.html'),core=read('assets/practice.js'),ux=read('assets/arena-product-v85.js'),css=read('assets/arena-product-v85.css'),course=read('assets/learning-experience-v84.js');
const data={window:{}};vm.createContext(data);
for(const file of ['assets/practice-data.js','assets/practice-extra.js','assets/python-challenges-v42.js']) vm.runInContext(read(file),data,{filename:file});
const tasks=[...data.window.DALP_PRACTICE,...data.window.DALP_PY_CHALLENGES];
assert.equal(tasks.length,149);
for(const [kind,count] of [['SQL',45],['Excel',50],['Python',54]]){
  assert.equal(tasks.filter(t=>t.kind===kind).length,count);
  assert.match(html,new RegExp(`data-arena-subject="${kind}"`));
  assert.match(html,new RegExp(`${count} challenges`));
  assert(tasks.filter(t=>t.kind===kind).every(t=>t.id&&t.title&&t.topic&&t.prompt&&t.hint&&t.answer));
}
assert.equal(new Set(tasks.map(t=>t.id)).size,tasks.length);
for(const id of ['practiceTopic','practiceLevel','practiceKind','practiceStatus','arenaFilterCount','practiceList','practiceDetail','hubOpen','challengeModal'])assert.match(html,new RegExp(`id="${id}"`));
for(const key of ['new URLSearchParams(location.search)','params.get(\'challenge\')','subjectTopic(filter)','topicFilter','levelFilter','gradeFeedback','practiceSupport','hintStage','state.__activeId','localStorage.setItem(storeKey'])assert(core.includes(key),`Missing ${key}`);
for(const key of ['sampleMatched','sampleActual','sampleExpected','hiddenPassed','checked.ok','runError','JSON.stringify(expected)','JSON.stringify(actual)'])assert(core.includes(key),`Missing grading evidence ${key}`);
assert(!core.includes('result={ok:true,errors:[]},'), 'Do not fake challenge passing');
assert.match(ux,/after the workspace/);
assert.match(ux,/previousElementSibling!==shell/);
assert.match(css,/prefers-reduced-motion/);
assert.match(css,/focus-visible/);
assert.match(css,/data-theme="dark"/);
assert.match(html,/offline evaluator/);
assert.match(html,/status are stored locally on this device/);
assert.match(html,/Execution is not the same as passing/i);
assert.match(html,/script defer="" src="assets\/practice.js\?v=(?:20261030\.85|20261031\.90)"/);
assert.match(html,/assets\/arena-product-v85.css\?v=85/);
assert.match(html,/assets\/arena-product-v85.js\?v=85/);
for(const [f,track] of [['index.html',''],['courses/excel.html','excel'],['courses/sql.html','sql'],['courses/python.html','python']]){
  assert.match(read(f),/arena-course-links-v85.css\?v=85/);
  assert.match(read(f),/learning-experience-v84.js/);
}
for(const id of [...course.slice(course.indexOf('const recommended={')).matchAll(/\['(?:week\d+|lesson-\d+)',\s*'([^']+)',/g)].map(m=>m[1]))assert(tasks.some(t=>t.id===id),`Missing deep-linked challenge ${id}`);
for(const kind of ['excel','sql','python'])assert.match(course,new RegExp(`practice\\.html\\?tool=|practice\\.html\\?challenge=`));
console.log('PASS Arena v85: 149 unchanged challenges, honest grading, topic/level filters, staged hints, link integrity, a11y/theme contracts');
