import assert from 'node:assert/strict';import fs from 'node:fs';
const css=fs.readFileSync('assets/course-capstone-statement-root-fix-v64.css','utf8');
for(const theme of ['light','dark']){assert(css.includes(`html[data-theme="${theme}"] body .project`));assert(css.includes(`html[data-theme="${theme}"] body.dlp-course-v29 .project`));}
for(const name of ['introduction','python','sql','excel','powerbi','ai']){const page=fs.readFileSync(`courses/${name}.html`,'utf8');assert(page.includes('course-capstone-statement-root-fix-v64.css?v=64'),name);assert(page.indexOf('course-capstone-statement-root-fix-v64.css')>page.indexOf('course-capstone-statements-v63.css'),name);}
console.log('v64 actual project capstone statement selectors and six-course load order PASS');
