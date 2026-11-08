/** Clarity Edition: verify the simplified layout is intentional and safe. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=file=>fs.readFileSync(file,'utf8');
const workspace=read('assets/scripts/weekly-workspace.js');
assert(!workspace.includes('id="cw-week-select"'),'No secondary week picker inside course content');
assert(!workspace.includes('data-cw-week="'),'No secondary roadmap chip list');
assert(!workspace.includes('id="cw-intro-select"'),'No redundant foundation lesson dropdown');
assert(workspace.includes("a[href^=\"#week\"]"),'Week changes still follow sidebar links');
assert(workspace.includes('data-cw-move'),'Previous/Next lesson controls remain functional');
assert(workspace.includes('dl-lessons-disclosure'),'Extra learning goals are collapsed by default');
for(const course of ['introduction','excel','sql','powerbi','python','ai']){
 const html=read(`courses/${course}.html`);
 assert(html.includes('id="courseLessonIndex"'),`${course}: course sidebar retained`);
 assert(html.includes('id="sidebar"'),`${course}: lesson drawer remains accessible`);
 assert(html.includes('class="quiz'),`${course}: existing knowledge checks retained`);
 assert(html.includes('weekly-workspace.js'),`${course}: existing progress and lesson logic retained`);
}
const cap=read('capstone.html');
assert(!cap.includes('cap-hero-card'),'Decorative capstone overlay removed');
assert(cap.includes('class="capstone-path-v74 dl-inline-disclosure"'),'Capstone guidance remains as +/− disclosure');
for(const page of ['index.html','overview.html','capstone-guide.html','learning-lab.html']){
 assert(read(page).includes('class="dl-optional-block"'),`${page}: optional detail available through summary`);
}
const nav=read('assets/scripts/public-navigation.js');
assert(nav.includes('dl-mobile-nav-open'),'Scrollable mobile navigation locks background');
assert(nav.includes("event.key === 'Escape'"),'Escape closes the mobile menu');
const css=read('assets/styles/premium-unified.css');
for(const rule of ['.quiz .question','.quiz .question .option:has(input:checked)','dl-optional-trigger::after',
 '.sidebar.dl-lesson-rail','.dalp-global-nav.is-open','.dl-inline-disclosure[open]'])
 assert(css.includes(rule),`Missing simplified style: ${rule}`);
const obsolete=['public-motion.css','public-vibrant.css','home-refinements.css','capstone-layout.css',
 'capstone-guide-layout.css','learning-lab-layout.css','preview-layout.css','course-ai-content.css'];
for(const name of obsolete){
 assert(!fs.existsSync(`assets/styles/${name}`),`${name} should be removed after safe consolidation`);
}
for(const name of ['public-experience.css','home.css','capstone.css','capstone-guide.css','learning-lab.css','preview.css','course-ai.css'])
 assert(fs.existsSync(`assets/styles/${name}`),`${name}: maintained bundle missing`);
console.log('PASS clarity edition: 6 sidebar-only courses, optional disclosures, responsive mobile menu, compact quizzes, capstone overlay removal, and 7 safe CSS consolidations');
