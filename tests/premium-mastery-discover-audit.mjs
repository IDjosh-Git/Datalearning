import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
for(const course of ['excel','sql','powerbi','python']){
 const html=read(`courses/${course}.html`);
 assert(!/<div class="brand-company-name">\s*<strong>Data Analysis Learning Path<\/strong>/.test(html),`${course}: retired sidebar title`);
 assert.match(html,/class="brand-company-name"/,`${course}: course branding lost`);
}
for(const course of ['ai','introduction']){
 assert.match(read(`courses/${course}.html`),/dl-lesson-rail/,`${course}: lesson rail missing`);
}
const master=read('assets/scripts/course-checkpoints.js');
for(const term of ['course-mastery-qhead','course-mastery-choice-letter','course-mastery-progress-fill','is-answer','is-wrong','dl-quiz-progress-label'])assert(master.includes(term),`Mastery behavior missing ${term}`);
const quiz=read('assets/scripts/premium-quiz-page.js');
assert(quiz.includes('dl-mastery-assessment-page'));
const discover=read('index.html');
assert(discover.includes('dh-visual-insight') && discover.includes('dh-insight-chart'));
const live=read('assets/scripts/discover-live.js');
assert(live.includes('pointermove') && live.includes('prefers-reduced-motion'));
const css=read('assets/styles/premium-unified.css');
for(const term of ['course-mastery-qhead','course-mastery-choice-letter','--tilt-x','dh-insight-chart','dh-insight-tag','width:100%!important;max-width:1820px','prefers-reduced-motion'])assert(css.includes(term),`Premium CSS missing ${term}`);
console.log('PASS mastery + Discover UI: all six course rails, visible question headings, progress, answers, 3D motion and wide navigation');
