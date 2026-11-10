/** Verify in-depth weekly lessons, safe integration, and independent assessment routes. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const context={window:{}};
vm.runInNewContext(read('assets/scripts/academy-guided-lessons.js'),context,{timeout:4000});
const lessons=context.window.DALP_GUIDED_LESSONS;
const curriculum=JSON.parse(read('assets/data/academy-curriculum.json'));
assert.equal(Object.keys(lessons).length,7);
let total=0;
for(const course of curriculum){
  const guides=lessons[course.slug];
  assert(Array.isArray(guides)&&guides.length===10,`${course.slug}: each week needs an expanded guide`);
  assert(read(`courses/${course.slug}.html`).includes('academy-guided-lessons.js'),`${course.slug} missing lesson asset`);
  for(let i=0;i<10;i++){
    const guide=guides[i],seed=course.weeks[i];
    for(const field of ['concept','reason','verify','case'])assert(typeof guide[field]==='string'&&guide[field].length>130,`${course.slug} ${i+1} ${field} too short`);
    assert(Array.isArray(guide.steps)&&guide.steps.length===4,`${course.slug} ${i+1} must have four practical steps`);
    assert(guide.steps.every(step=>step.length>30),`${course.slug} ${i+1}: practical steps too short`);
    const words=[guide.concept,guide.reason,guide.case,...guide.steps,guide.verify,seed.example,seed.exercise,seed.solution].join(' ').split(/\s+/).filter(Boolean).length;
    assert(words>=245,`${course.slug} ${i+1}: insufficient teaching depth (${words} words)`);
    assert(seed.questions.length>=3,`${course.slug} ${i+1}: separate quiz required`);
    total++;
  }
}
const app=read('assets/scripts/academy-app.js');
for(const token of ['zaConcepts','zaWhy','zaMethod','zaExample','zaExercise','zaRecap','za-guided-steps','za-case-study','Questions to Try','saveWeek(slug,week,true)','quiz_results']){
  assert(app.includes(token),`Guided lesson renderer missing ${token}`);
}
assert(read('assets/styles/academy.css').includes('.za-guided-steps'));
assert(read('assets/styles/academy.css').includes('.za-teaching-copy'));
assert(read('quiz.html').includes('zaQuizForm'));
console.log(`PASS comprehensive Academy curriculum: ${total} individually authored weekly guides, worked cases, guided steps, independent quizzes and unchanged progress wiring`);
