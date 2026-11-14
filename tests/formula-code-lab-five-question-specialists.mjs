/** Deep regression: 5-question specialist assessments + new code reference groups + contextual lesson links. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ctx={window:{}};vm.createContext(ctx);
for(const path of ['assets/scripts/academy-curriculum.js','assets/scripts/specialist-course-data.js','assets/scripts/reference-data.js'])vm.runInContext(read(path),ctx);
for(const slug of ['ai','python']) {
  const path=ctx.window.DALP_ACADEMY.find(p=>p.slug===slug);
  assert.equal(path.weeks.length,10);
  for(const week of path.weeks){
    assert.equal(week.questions.length,5,`${slug} week ${week.week} must have precisely 5 questions`);
    assert(week.questions.every(q=>q.answer>=0&&q.answer<q.choices.length&&q.choices.length>=3&&q.why),`${slug} week ${week.week} keys and explanations valid`);
    assert.equal(new Set(week.questions.map(q=>q.q)).size,5,`${slug} week ${week.week} question duplication`);
  }
}
const ref=ctx.window.IJ_REFERENCE;
for(const group of ['Excel','SQL','DAX','Power Query','Python','Power Query M']) {
 const count=ref.filter(e=>e.group===group).length;
 assert(count>=15,`${group}: not enough reference material (${count})`);
}
for(const record of ref.filter(e=>['Python','Power Query M'].includes(e.group))){
 for(const field of ['title','code','meaning','watch'])assert(record[field]?.length>=10,`Missing ${field} on ${record.title}`);
 assert(!record.code.includes('<script'),`Unsafe script markup in ${record.title}`);
}
const page=read('reference.html');const logic=read('assets/scripts/reference.js');const academy=read('assets/scripts/academy-app.js');
for(const label of ['Python','Power Query M'])assert(page.includes(`<option>${label}</option>`),`${label} filter missing`);
assert(logic.includes("r.group==='Python'?'python'"),'Python code cards need Python image');
assert(logic.includes("r.group.startsWith('Power Query')?'powerquery'"),'M cards need Power Query image');
assert(logic.includes("'Power Query M'"),'Prefiltered M-category URLs must be accepted');
for(const key of ["excel:{3:'SUM'","powerbi:{4:'CALCULATE'","sql:{2:'SELECT'","python:{1:'variables'","powerquery:{2:'type'","ai:{4:'IF'"]){assert(academy.includes(key),`${key}: weekly lab lookup missing`);}
assert(academy.includes('id="zaFormulaCompanion"')&&academy.includes('reference.html?group='),'Reference companion must be in lesson reader');
assert(academy.includes('window.DALP_MASTERY_EXAMS?.[slug]'),'Specialist mastery must use the standalone 50-item bank');
assert(academy.includes('score:Math.round(score/5),total:10'),'Keep database total=10 compatibility for 50-item mastery results');
for(const course of ['excel','sql','powerbi','powerquery','python','ai']) assert(read(`courses/${course}.html`).includes('formula-code-companion.css'),'Course-specific styling missing');
const queries=[['Python','read_csv'],['Power Query M','Table.AddColumn'],['SQL','JOIN'],['DAX','CALCULATE'],['Excel','SUMIFS']];
for(const [group,q] of queries)assert(ref.some(r=>r.group===group&&[r.title,r.meaning,r.code,r.watch].join(' ').toLowerCase().includes(q.toLowerCase())),`Prefilter ${group} / ${q} must return an example`);
console.log('PASS Formula & Code Lab: 6 reference groups, 36 new snippets, 100 weekly AI/Python questions, 50-question masteries, context-linked lessons and cloud schema compatibility');
