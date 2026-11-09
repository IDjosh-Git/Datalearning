import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(source('assets/scripts/weekly-quiz-bank.js'), sandbox);
vm.runInNewContext(source('assets/scripts/premium-lesson-data.js'), sandbox);
const bank = sandbox.window.DALP_WEEKLY_QUIZZES;
const guides = sandbox.window.DALP_LESSON_GUIDES;
const primary = ['excel', 'sql', 'powerbi', 'python', 'ai'];
for (const course of primary) {
  assert.equal(Object.keys(bank[course]).length, 10, `${course}: expected ten weekly question sets`);
  assert.equal(Object.keys(guides[course]).length, 10, `${course}: expected ten guided lessons`);
  const html = source(`courses/${course}.html`);
  assert.match(html, /weekly-workspace\.js/, `${course}: weekly workspace should mount`);
  assert.match(html, /premium-lesson-upgrade\.js/, `${course}: study UX should mount`);
  assert.match(html, /premium-lesson-data\.js/, `${course}: study guides should load`);
  for (let week=1; week<=10; week++) {
    const questions = bank[course][String(week)];
    assert.ok(Array.isArray(questions) && questions.length>=3, `${course}: week ${week} question count`);
    for (const q of questions) {
      assert.ok(q.question?.length, `${course}: question text required`);
      assert.ok(q.options.length>=2, `${course}: answer options required`);
      assert.ok(q.options.some(opt=>opt.value === q.answer), `${course}: correct key must remain in options`);
    }
    const guide = guides[course][String(week)];
    for (const field of ['goal','reason','model','practice','insight'])
      assert.ok(guide[field]?.trim(), `${course}: week ${week} ${field}`);
    assert.equal(guide.steps.length,3, `${course}: week ${week} 3-step teaching flow`);
  }
}
assert.equal(bank.introduction.final.length,12,'Introduction should retain all original final questions');
assert.equal(Object.keys(guides.introduction).length,8,'Introduction should retain eight guided lessons');
for (const guide of Object.values(guides.introduction)) {
  assert.ok(guide.model?.length>40,'Introduction requires concrete explanatory example');
  assert.equal(guide.steps.length,3,'Introduction needs three learning steps');
}
const intro=source('courses/introduction.html');
assert.match(intro,/premium-lesson-upgrade\.js/);
const quiz=source('quiz.html');
for(const src of ['weekly-quiz-bank.js','premium-quiz-page.js','course-checkpoints.js'])assert.ok(quiz.includes(src));
assert.match(source('assets/scripts/premium-lesson-upgrade.js'),/\.\.\/quiz\.html\?course=/,'Weekly quiz links should navigate to separate page');
assert.match(source('assets/scripts/premium-lesson-upgrade.js'),/classList\.add\('dl-hidden-quiz-source'\)/,'Inline quiz should not duplicate standalone quiz in lesson');
assert.match(source('assets/scripts/course-checkpoints.js'),/dl-master-mount/,'Mastery remains available in standalone quiz');
assert.match(source('assets/styles/premium-unified.css'),/dl-standalone-quiz/,'Standalone responsive visual styling required');
console.log('PASS premium weekly learning and standalone assessment route: 50 weekly sets, 8 foundation lessons, introduction final, mastery and navigation.');
