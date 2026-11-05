import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const slugs=['introduction','excel','sql','powerbi','python','ai'];
for(const slug of slugs){
 const html=read(`courses/${slug}.html`);
 assert.equal((html.match(/src="\.\.\/assets\/scripts\/course-premium-sidebar\.js"/g)||[]).length,1,`${slug}: one canonical sidebar controller`);
 assert.doesNotMatch(html,/course-player-focus\.js|course-lesson-disclosure\.js|course-mobile-drawer\.js/,`${slug}: retired controller loaded`);
 assert.equal((html.match(/course-reading-tables\.js/g)||[]).length,1,`${slug}: one course table enhancer`);
 assert.equal((html.match(/id="sidebar"/g)||[]).length,1,`${slug}: one lesson rail`);
}
for(const path of ['assets/scripts/course-player-focus.js','assets/scripts/course-lesson-disclosure.js'])assert(!fs.existsSync(path),`obsolete ${path}`);
const rail=read('assets/scripts/course-premium-sidebar.js');
for(const marker of ['data-current-lesson','courseLessonIndex','sidebar.inert','setCurrent','deepLesson'])assert(rail.includes(marker),`canonical rail lacks ${marker}`);
const chapter=read('assets/scripts/course-experience.js');
assert.doesNotMatch(chapter,/scrollIntoView|classList\.remove\('open'\)|IntersectionObserver/, 'legacy chapter-navigation handler remains');
assert.doesNotMatch(read('assets/scripts/learning-catalog.js'),/protectExamples|experience-table-scroll/, 'old table enhancer remains');
assert.match(read('assets/scripts/experience.js'),/!document\.body\.matches\(/,'global accessibility enhancer must skip course pages');
assert.match(read('assets/scripts/course-reading-tables.js'),/dlp97-table-scroll/,'table enhancer should reuse existing regions');
console.log('PASS one canonical lesson controller and one teaching-table wrapper for all six courses');
