import fs from 'node:fs';
import assert from 'node:assert/strict';
const js=fs.readFileSync('assets/weekly-workspace.js','utf8');
const css=fs.readFileSync('assets/course-mobile-v21.css','utf8');
for(const course of ['excel','sql','powerbi','ai','introduction']){
 const html=fs.readFileSync(`courses/${course}.html`,'utf8');
 for(const suffix of ['css','js'])assert.equal((html.match(new RegExp(`course-mobile-v21\\.${suffix}\\?v=20261022\\.(?:21|22)`,'g'))||[]).length,1,`${course} missing mobile asset ${suffix}`);
}
for(const target of ['cw-mobile-week-head','cw-mobile-week-title','cw-mobile-choose','cw-week-nav-open','aria-expanded','cw-mobile-progress'])assert(js.includes(target),`No mobile control: ${target}`);
for(const sel of ['.cw-weekstrip{display:none!important}', '.cw-mobile-week-head', '.cw-mobile-week-actions', '.dl-course-actions-toggle:after', '.cw-intro-ready .intro-side{display:none!important}'])assert(css.includes(sel),`Missing rule: ${sel}`);
assert(!js.includes("document.querySelector('.cw-weekstrip').remove()"),'Do not destroy navigation links used on desktop');
console.log('PASS v21 compact course navigation and mobile actions on all five courses');
