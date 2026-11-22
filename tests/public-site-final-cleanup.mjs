import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const landing=read('public-pages/landing.html');
assert(!landing.includes('id="learning-paths"'),'Public homepage should not duplicate course cards');
assert(!landing.includes('class="path-grid"'),'No public homepage course grid');
const pages=['public-pages/landing.html','public-pages/start-here.html','public-pages/career-paths.html','public-pages/free-lesson.html','course-info/catalog.html','course-info/excel.html'];
for(const page of pages){const html=read(page);assert(html.includes('public-site-footer.js'),`${page}: shared footer missing`);assert(!/<footer\b/i.test(html),`${page}: duplicated static footer`);assert(html.includes('href="/courses"'),`${page}: catalogue link missing`)}
assert(read('assets/scripts/public-site-footer.js').includes("['All Courses','/courses']"));
assert(read('index.html').includes('href="/courses"'),'Academy Courses must link to canonical syllabus');
assert(read('assets/styles/private-space-optimization.css').includes('max-width:none!important'));
console.log('PASS public homepage without course grid, single footer component, canonical syllabus navigation and signed-in canvas width');
