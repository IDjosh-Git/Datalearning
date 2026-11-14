/** UI-only premium course release contract; no course, assessment or progress records modified. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const cat=read('catalog.html');
const app=read('assets/scripts/academy-app.js');
const explorer=read('assets/scripts/master-pathway.js');
const courseCSS=read('assets/styles/course-experience-premium.css');
const specialCSS=read('assets/styles/specialist-course-premium.css');
for(const marker of ['id="guidedCourses"','dlc-catalog-hero','id="zaCatalogCards"','id="zaCourseSearch"','id="dlcCatalogCount"','href="career-path.html"','data-dlc-filter="all"','data-dlc-filter="analytics"','data-dlc-filter="bi"','data-dlc-filter="technical"']) assert(cat.includes(marker),`Catalog missing ${marker}`);
assert(cat.includes('course-experience-premium.css?v=mastery-nine-20261111'));
for(const marker of ['dlc-card-progress','dlc-course-card','dlc-week-number','render();','za-week-peek','window.addEventListener(\'storage\',render)','aria-valuenow','aria-pressed']) assert(app.includes(marker),`Catalog renderer missing ${marker}`);
for(const marker of ['dlp-outcomes','dlp-outcomes-icon','dlp-table-scroll','data-level','dlp-module','modelAnswer']) assert(explorer.includes(marker),`Curriculum explorer missing ${marker}`);
for(const slug of ['introduction','excel','sql','powerbi','tableau','powerquery','statistics']){
 const html=read(`courses/${slug}.html`);
 for(const marker of ['id="zaLessonBody"','id="zaLessonActions"','id="zaWeekList"','id="dlcCurrentWeek"','id="dlcOverviewBar"','id="dlcOverviewCompleted"','id="dlcPreviousWeek"','id="dlcNextWeek"','course-experience-premium.css','academy-guided-lessons.js']) assert(html.includes(marker),`${slug} reader missing ${marker}`);
 assert.equal((html.match(/id="dlcOverviewBar"/g)||[]).length,1);
 assert(html.indexOf('id="dlcOverviewBar"')<html.indexOf('id="zaLessonTitle"'),`${slug}: progress appears ahead of lesson`);
}
for(const slug of ['python-extension','ai-extension']){
 const html=read(`courses/${slug}.html`);
 assert(html.includes('specialist-course-premium.css?v=course-ux-20261110-r1'),`${slug}: specialist premium theme missing`);
 assert(html.includes('public-search-premium.css'),`${slug}: preserve unified search styling`);
}
for(const slug of ['python','ai'])assert(read(`courses/${slug}.html`).includes('course-experience-premium.css'),`${slug}: first-class unified reader missing`);
for(const marker of ['za-course-frame','za-lesson-hero','dlc-course-overview','dlc-guided-courses','dlp-outcomes','max-width:680px','prefers-reduced-motion']) assert(courseCSS.includes(marker),`Course premium stylesheet missing ${marker}`);
for(const marker of ['dlp97-learning-page','guide-container','course-portal-links','dl-lesson-rail','max-width:520px']) assert(specialCSS.includes(marker),`Specialist stylesheet missing ${marker}`);
for(const marker of ['dlcOverviewBar','dlcOverviewCompleted','dlcCurrentWeek','dlcPreviousWeek','dlcNextWeek','saveWeek(slug,week,true)','quizHref(slug,week)']) assert(app.includes(marker),`Reader controller missing ${marker}`);
const courseData=JSON.parse(read('assets/data/academy-curriculum.json'));
assert.equal(courseData.length,7);
assert.equal(courseData.reduce((n,c)=>n+c.weeks.length,0),70);
console.log('PASS premium course experience: 7 guided courses, 70 stable lessons, 2 specialist extension resources, 4-level explorer, responsive filters/progress/navigation');
