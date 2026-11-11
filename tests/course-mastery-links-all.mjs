/** Nine-course mastery access and shared shell verification. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ctx={window:{}};vm.createContext(ctx);
for(const file of ['assets/scripts/academy-curriculum.js','assets/scripts/specialist-course-data.js'])vm.runInContext(read(file),ctx);
const paths=ctx.window.DALP_ACADEMY;
assert.equal(paths.length,9);
const src=read('assets/scripts/academy-app.js');
for(const fragment of ['const masteryHref = slug => quizHref(slug, \'mastery\')', 'const masteryCount = path =>', 'za-mastery-aside-card','za-mastery-aside-link','dlc-mastery-row','za-mastery-progress-link','za-btn-mastery',`const masteryWeeks=path.specialist?[1,3,5,7,10]`])assert(src.includes(fragment),`Mastery UI missing ${fragment}`);
const excel=read('courses/excel.html');
const style=read('assets/styles/course-experience-premium.css');
assert(style.includes('.za-mastery-aside-card') && style.includes('.dlc-mastery-row') && style.includes('.za-btn-mastery'));
assert(read('assets/styles/academy.css').includes('.za-mastery-progress-link'));
for(const path of paths){
 const html=read(`courses/${path.slug}.html`);
 for(const id of ['zaCourseAside','zaWeekList','zaLessonActions','dlcOverviewBar','zaLessonBody'])assert(html.includes(`id="${id}"`),`${path.slug}: shared layout missing ${id}`);
 for(const source of ['academy-app.js','course-experience-premium.css','academy.css','specialist-course-data.js'])assert(html.includes(source),`${path.slug}: shared component missing ${source}`);
 assert.equal(path.weeks.length,10);
 for(const w of path.weeks)assert(w.questions.length >= (path.specialist?5:1),`${path.slug} week ${w.week}: missing quiz questions`);
 const selected=path.specialist?[1,3,5,7,10]:path.weeks.map(w=>w.week);
 assert.equal(selected.length,path.specialist?5:10,`${path.slug}: wrong mastery count`);
 for(const n of selected){const q=path.weeks[n-1].questions[0];assert(q?.q&&q.choices.length>=3&&Number.isInteger(q.answer),`${path.slug}: bad mastery question`)}
 const stylePaths=[...html.matchAll(/href="([^"]+\.css[^\"]*)"/g)].map(m=>m[1]);
 const excelStyles=[...excel.matchAll(/href="([^"]+\.css[^\"]*)"/g)].map(m=>m[1]);
 for(const shared of ['academy.css','course-experience-premium.css']){
  assert(stylePaths.some(p=>p.includes(shared)),`${path.slug} missing ${shared}`);
  assert(excelStyles.some(p=>p.includes(shared)));
 }
}
for(const page of ['overview.html','catalog.html','index.html'])assert(read(page).includes('mastery-all-nine-20261111'),`${page}: stale academy renderer cache`);
assert(read('service-worker.js').includes('nine-course-mastery-20261111'));
console.log('PASS course mastery: all 9 courses share Academy UI; final quiz 10 core / 5 AI-Python questions; catalogue, sidebar, progress and Week 10 links');
