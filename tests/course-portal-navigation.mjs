/** Guard against bringing back long inline roadmaps or image-dependent course navigation. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const read=p=>fs.readFileSync(path.join(process.cwd(),p),'utf8');
const courses=['introduction','excel','sql','powerbi','python','ai'];
for(const slug of courses){
 const html=read(`courses/${slug}.html`);
 const portal=html.indexOf('class="course-portal-links"');
 const hero=html.search(/<section class="(?:hero\b|intro-hero\b|ai-hero\b)/);
 assert(portal>=0&&portal<hero,`${slug}: resource links must be directly above course introduction`);
 for(const resource of ['roadmap','extension']){
  const pathName=`${slug}-${resource}.html`;
  assert(html.slice(portal,hero).includes(`href="${pathName}"`),`${slug}: missing prominent ${resource} link`);
  assert(fs.existsSync(`courses/${pathName}`),`${slug}: missing resource page ${pathName}`);
 }
 assert(!html.includes('See your 10-week capstone roadmap'),`${slug}: old long capstone roadmap still embedded`);
 const panels=(html.match(/class="course-lesson-disclosure"/g)||[]).length;
 assert.equal(panels,['excel','sql','powerbi','python'].includes(slug)?1:0,`${slug}: lesson navigation should be compact`);
 if(panels){
  assert(html.includes('id="courseLessonIndex"'),`${slug}: need accessible lesson list`);
  assert(html.includes('src="../assets/scripts/course-lesson-disclosure.js"'),`${slug}: missing course toggle behaviour`);
 }
}
const nav=read('assets/scripts/learning-catalog.js');
assert(nav.includes('navMarks=Object.freeze'), 'Navigation icons must use local monograms');
assert(nav.includes('dlp97-icon-mark'), 'Navigation icons must render as deterministic text');
assert(!nav.includes('<img alt="" src="${uri('), 'Navigation brand still depends on image URLs');
assert(!nav.includes('dalpIconSvg'), 'Old duplicate icon insertion must be removed');
assert(!nav.includes('dlp97-course-resources'), 'Duplicate course resource links must not be injected into the sidebar');
assert(!nav.includes("course+'-roadmap.html'"), 'Sidebar should not produce duplicate roadmap links');
const css=read('assets/styles/design-system.css');
assert(css.includes('.dlp97-icon-mark'), 'Navigation icon styles must load on every course and catalog page');
assert(read('assets/styles/course-page-improvements.css').includes('.course-portal-links'), 'Resource links must have visible shared styling');
console.log('PASS visible course links, standalone resource pages, collapsed lesson lists and reliable navigation icons across six tracks');
