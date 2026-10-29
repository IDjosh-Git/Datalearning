import fs from 'node:fs';
import assert from 'node:assert/strict';
const css=fs.readFileSync('assets/course-capstone-statements-v63.css','utf8');
for(const theme of ['light','dark'])assert.ok(css.includes(`html[data-theme="${theme}"]`));
for(const selector of ['.mastery-objective','.mastery-check summary','.mastery-check-answer','.capstone','.mastery-code'])assert.ok(css.includes(selector),selector);
for(const course of ['python','sql','powerbi','excel','ai','introduction']){
 const html=fs.readFileSync(`courses/${course}.html`,'utf8');
 assert.ok(html.includes('course-capstone-statements-v63.css?v=63'),course);
 assert.ok(html.lastIndexOf('course-capstone-statements-v63.css')>html.lastIndexOf('course-theme-checkpoint-v60.css'),course);
}
console.log('v63 capstone statement theme integration: PASS');
