/** DataLearning weekly syllabus explorer regression contracts.
 * Course and quiz destinations must come from real existing pages, not fake data. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read = x => fs.readFileSync(x,'utf8');
const ctx={window:{}};
vm.runInNewContext(read('assets/scripts/catalog-data.js'),ctx);
const courses=ctx.window.DALP_COURSES_V97;
const slugs=['introduction','excel','sql','powerbi','python','ai'];
const quiz=read('assets/scripts/premium-quiz-page.js');
const source=read('assets/scripts/course-module-explorer.js');
const catalog=read('catalog.html');
const style=read('assets/styles/premium-unified.css');
assert.match(catalog,/id="dlmx-explorer"/,'Catalogue must contain the weekly explorer');
assert.match(catalog,/id="dlmx-subjects"/);
assert.match(catalog,/id="dlmx-active-course"/);
assert.match(catalog,/course-module-explorer\.js/);
assert.match(source,/quiz\.html\?course=/,'Link into the existing assessment page');
assert.match(style,/\.dlmx-week-grid/);
assert.match(style,/@media\(max-width:680px\)/);
for(const slug of slugs){
 const c=courses[slug];
 assert(c,`Missing ${slug} metadata`);
 assert.equal(c.units.length,slug==='introduction'?8:10,`${slug}: expected existing curriculum length`);
 const page=read(`courses/${slug}.html`);
 assert.match(page,/course-module-explorer\.js/,`${slug}: module navigator must be available`);
 for (const unit of c.units) {
  assert(page.includes(`id="${unit.id}"`),`${slug}: missing lesson anchor ${unit.id}`);
  assert(unit.title && unit.title.length>5,`${slug}: missing curriculum title`);
 }
 if(slug!=='introduction'){
  assert(quiz.includes("const week=params.get('week')"),'Standalone assessment must accept week number');
 } else {
  assert(quiz.includes("slug==='introduction'&&week==='final'"),'Intro must use final knowledge check, not fabricated weekly quizzes');
 }
}
console.log('PASS weekly-module catalogue: six canonical courses, 50 weekly modules, 8 foundation lessons, valid anchors, dedicated assessment URLs and responsive layout');
