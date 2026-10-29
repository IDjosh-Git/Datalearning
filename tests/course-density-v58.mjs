import fs from 'node:fs';
import assert from 'node:assert/strict';
const css=fs.readFileSync('assets/course-density-v58.css','utf8');
for(const course of ['python','sql','powerbi','excel','ai','introduction']){
 const html=fs.readFileSync(`courses/${course}.html`,'utf8');
 assert.match(html,/course-density-v58\.css\?v=58/);
 assert.ok(html.indexOf('course-density-v58.css')>html.indexOf('course-layout-theme-v57.css'));
}
for(const selector of ['.v34-guided-lab','.v34-action-steps','.v34-python-quiz','.quiz-actions','.option','.mastery-deep-dive'])assert.ok(css.includes(selector),selector);
assert.match(css,/grid-template-columns:minmax\(0,1fr\)/);
assert.match(css,/min-height:44px/);
assert.match(css,/clamp\(/);
console.log('PASS v58: all 6 course pages include compact responsive assessment styling');
