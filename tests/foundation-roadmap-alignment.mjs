import assert from 'node:assert/strict';
import fs from 'node:fs';
const player = fs.readFileSync('assets/scripts/weekly-workspace.js','utf8');
const course = fs.readFileSync('assets/styles/course-page-improvements.css','utf8');
const roadmap = fs.readFileSync('courses/introduction-roadmap.html','utf8');
const guide = fs.readFileSync('assets/styles/course-guide-pages.css','utf8');
assert(player.includes('cw-intro-title'), 'Current foundation lesson heading must remain');
assert(!player.includes('data-ci-scroll'), 'Obsolete foundation arrow scroll controls must be removed');
for(const token of ['data-ci-move','cw-intro-current','intro-side a[href^="#"]','cw-intro-title'])
  assert(player.includes(token),`Foundation lesson navigation remains operational: ${token}`);
assert(!player.includes('id="cw-intro-select"'),'Duplicate foundation lesson selector must not return');
for(const token of ['.cw-intro-weekstrip','repeat(3,minmax(0,1fr))','repeat(4,minmax(0,1fr))','.dalp-quick-guide-intro','.dalp-quick-guide-bottom'])
  assert(course.includes(token),`Foundation or course guide geometry missing: ${token}`);
assert(roadmap.includes('class="guide-foundation-page"'));
assert(guide.includes('body.guide-foundation-page .guide-container'));
assert(guide.includes('body.guide-foundation-page .guide-lessons'));
for(const anchor of ['#lesson-1','#lesson-4','#case-study','#knowledge-check'])
  assert(roadmap.includes(anchor),`Roadmap lesson target retained: ${anchor}`);
console.log('PASS foundation arrow removal, responsive full-width roadmap, course-at-a-glance alignment, and lesson navigation preservation');
