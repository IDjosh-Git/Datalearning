/** 450 mastery items, one-at-a-time accessible assessment controls and deeper 90-week teaching. */
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const c={window:{}};vm.createContext(c);
for(const f of ['assets/scripts/academy-curriculum.js','assets/scripts/specialist-course-data.js','assets/scripts/mastery-exam-bank.js'])vm.runInContext(read(f),c);
const catalog=c.window.DALP_ACADEMY;
const bank=c.window.DALP_MASTERY_EXAMS;
assert.equal(catalog.length,9);
assert.equal(Object.keys(bank).length,9);
let total=0;
for(const path of catalog){
 const qs=bank[path.slug];assert.equal(qs.length,50,`${path.slug}: 50 mastery questions`);
 assert.equal(new Set(qs.map(q=>q.id)).size,50,`${path.slug}: duplicate question IDs`);
 assert.equal(new Set(qs.map(q=>q.q)).size,50,`${path.slug}: repeated stems`);
 for(let week=1;week<=10;week++)assert.equal(qs.filter(q=>q.week===week).length,5,`${path.slug} Week ${week}: incomplete coverage`);
 for(const q of qs){
  assert.equal(q.choices.length,4,`${q.id}: four choices`);
  assert.equal(new Set(q.choices).size,4,`${q.id}: no duplicate answers`);
  assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,`${q.id}: answer outside options`);
  for(const field of ['why','worked','validation','pitfall','practice'])assert(q[field]?.length>12,`${q.id}: missing ${field}`);
  assert(q.why.length>190,`${q.id}: insufficient explanation`);
  assert.equal(q.optionNotes.length,4,`${q.id}: each alternative requires an explanation`);
  assert(q.optionNotes.every(note=>note.length>50),`${q.id}: missing distractor reasoning`);
 }
 const course=read(`courses/${path.slug}.html`);
 assert(course.includes('academy-learning-depth.css'),`${path.slug}: in-depth lesson stylesheet missing`);
 total+=qs.length;
}
assert.equal(total,450);
const js=read('assets/scripts/academy-app.js');const html=read('quiz.html');const css=read('assets/styles/mastery-assessment.css');
for(const v of ['function masteryPage(',"const draftKey=",'check.disabled=true','check.disabled=picked===null||checked','if(finished||reviewed[index]||answers[index]===null)return','previous.disabled=index===0','next.disabled=!checked','if(!reviewed[index])return','resultFeedback(','optionNotes.map','worked','validation','score:Math.round(score/5),total:10','masteryPage(path,questions,slug);return;']){
 assert(js.includes(v),`Missing 50-question assessment behavior ${v}`);
}
for(const v of ['mastery-exam-bank.js','mastery-assessment.css','zaQuizForm','zaQuizSubmit'])assert(html.includes(v),`Missing mastery quiz asset ${v}`);
for(const v of ['.za-mastery-navigation','.za-mastery-feedback','.za-mastery-choice','.za-mastery-breakdown','@media(max-width:720px)'])assert(css.includes(v),`Missing responsive exam style ${v}`);
for(const v of ['zaDeeperLearning','za-learning-concepts','za-learning-process','za-learning-depth-worked','za-learning-interpretation','rebuiltModule.trap'])assert(js.includes(v),`Missing deeper learning casework ${v}`);
console.log(`PASS 50-question mastery × 9 courses (${total} items), explanations for all four options, safe answer gating, single-item navigation and 90 enriched weekly lessons`);
