/** Nine-course mastery access and shared shell verification. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ctx={window:{}};vm.createContext(ctx);
for(const file of ['assets/scripts/academy-curriculum.js','assets/scripts/specialist-course-data.js','assets/scripts/mastery-exam-bank.js'])vm.runInContext(read(file),ctx);
const paths=ctx.window.DALP_ACADEMY;
assert.equal(paths.length,9);
const src=read('assets/scripts/academy-app.js');
for(const fragment of ['const masteryHref = slug => quizHref(slug, \'mastery\')', 'const masteryCount = path =>', 'za-mastery-aside-card','za-mastery-aside-link','dlc-mastery-row','za-mastery-progress-link','za-btn-mastery',`window.DALP_MASTERY_EXAMS?.[slug]`])assert(src.includes(fragment),`Mastery UI missing ${fragment}`);
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
 const bank=ctx.window.DALP_MASTERY_EXAMS[path.slug];
 assert(Array.isArray(bank) && bank.length===50,`${path.slug}: exactly 50 mastery items required`);
 for(let i=1;i<=10;i++)assert.equal(bank.filter(q=>q.week===i).length,5,`${path.slug} week ${i} mastery coverage missing`);
 for(const q of bank)assert(q.q && q.choices.length===4 && Number.isInteger(q.answer) && q.optionNotes.length===4 && q.why && q.worked && q.validation,`${path.slug}: incomplete exam question`);
 const stylePaths=[...html.matchAll(/href="([^"]+\.css[^\"]*)"/g)].map(m=>m[1]);
 const excelStyles=[...excel.matchAll(/href="([^"]+\.css[^\"]*)"/g)].map(m=>m[1]);
 for(const shared of ['academy.css','course-experience-premium.css']){
  assert(stylePaths.some(p=>p.includes(shared)),`${path.slug} missing ${shared}`);
  assert(excelStyles.some(p=>p.includes(shared)));
 }
}
for(const page of ['overview.html','catalog.html','index.html'])assert(read(page).includes('mastery-premium-20261111-r3'),`${page}: stale academy renderer cache`);
assert(read('service-worker.js').includes('offline caching retired'), 'Offline cache must stay disabled');
console.log('PASS course mastery: all 9 courses share Academy UI; 50 mastery questions per course, across every week; catalogue, sidebar, progress and Week 10 links');
