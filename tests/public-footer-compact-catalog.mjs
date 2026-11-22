import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const catalog=read('course-info/catalog.html');
assert.equal((catalog.match(/class="card dl-compact-course"/g)||[]).length,9);
assert(!catalog.includes('class="facts"'),'Detailed metadata should remain on syllabus pages, not compact catalogue cards');
assert(catalog.includes('id="dlCourseSearch"'));
for(const route of ['public-pages/landing.html','public-pages/start-here.html','public-pages/free-lesson.html','public-pages/career-paths.html','course-info/catalog.html']){
 const html=read(route);
 assert(html.includes('public-footer-unified.css'),`${route}: missing shared footer CSS`);
 assert(html.includes('public-footer.js'),`${route}: missing shared footer script`);
}
const footer=read('assets/scripts/public-footer.js');
for(const name of ['Home','All Courses','Start Here','Career Paths','Free Lesson','Sign In'])assert(footer.includes(`'${name}'`));
const css=read('assets/styles/public-catalog-canonical.css');
for(const token of ['repeat(3,minmax(0,1fr))','repeat(2,minmax(0,1fr))','grid-template-columns:1fr'])assert(css.includes(token));
console.log('PASS canonical compact catalogue and shared footer across public pages');
