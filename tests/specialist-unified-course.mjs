/** Regression: Python and AI are genuine Academy pages, not legacy HTML with CSS overrides. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const modules=JSON.parse(read('assets/data/ten-week-tool-to-report.json'));
const ctx={window:{DALP_ACADEMY:JSON.parse(read('assets/data/academy-curriculum.json'))}};
vm.runInNewContext(read('assets/scripts/specialist-course-data.js'),ctx);
const paths=ctx.window.DALP_ACADEMY;
assert.equal(paths.length,9);
for(const slug of ['ai','python']){
 const html=read(`courses/${slug}.html`);
 const reference=read('courses/excel.html');
 const course=paths.find(p=>p.slug===slug);
 assert(course,`${slug} should be in native nine-course data`);
 assert.equal(course.weeks.length,10);
 for(const [i,week] of course.weeks.entries()){
  assert.equal(week.title,modules[slug][i].title);
  assert.equal(week.outcome,modules[slug][i].goal);
  assert.equal(week.questions.length,5);
  assert(week.questions.every(q=>q.answer>=0&&q.answer<q.choices.length));
 }
 for(const marker of ['data-academy-page="lesson"','id="zaLessonBody"','id="zaWeekList"','id="dlcOverviewBar"','id="zaLessonActions"','id="dlcNextWeek"','academy-app.js','specialist-course-data.js','week-learning-resources.js','course-video-player.js','ten-week-masterclass.js'])assert(html.includes(marker),`${slug}: missing modern Academy feature ${marker}`);
 for(const marker of ['course-ai.css','course-python-overrides.css','specialist-unified-course','weekly-workspace.js','course-premium-sidebar.js','course-mastery','class="week searchable"','id="week1"'])assert(!html.includes(marker),`${slug}: legacy UI survived ${marker}`);
 assert(html.includes(`data-course="${slug}"`));
 assert(html.includes(`data-brand-course="${slug}"`));
 assert.equal((html.match(/id="zaLessonBody"/g)||[]).length,1);
 assert(html.length<24000,`${slug}: legacy monolithic source still present`);
 assert(html.includes('course-experience-premium.css'),`${slug}: does not use the same theme as Excel`);
 assert(html.includes('public-search-premium.css'));
 assert(html.indexOf('specialist-course-data.js')<html.indexOf('academy-app.js'));
 assert(reference.includes('id="zaLessonBody"'));
}
assert(read('courses/ai.html').includes('href="../prompt-library.html"'),'AI prompt links present');
assert(read('assets/scripts/ten-week-masterclass.js').includes('renderSpecialist:specialist'));
assert(read('assets/scripts/academy-app.js').includes('renderSpecialist?.(rebuiltModule,base)'));
for(const obsolete of ['assets/styles/course-ai.css','assets/styles/course-python-overrides.css','assets/styles/specialist-unified-course.css','assets/scripts/specialist-unified-course.js','assets/scripts/weekly-workspace.js','assets/scripts/week10-capstone-ai.js','assets/scripts/week10-capstone-python.js'])assert(!fs.existsSync(new URL('../'+obsolete,import.meta.url)),`obsolete ${obsolete} was not removed`);
console.log('PASS native AI/Python: one shared Academy layout, 20 weekly quizzes, 100 assessment questions, course icons, capstones, no old pages or CSS overrides');
