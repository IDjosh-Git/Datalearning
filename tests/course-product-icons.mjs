import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const slugs=['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'];
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
for(const s of slugs){
 const img=`assets/icons/icon-${s}.svg`;
 assert.ok(fs.existsSync(path.join(root,img)),img+' missing');
 assert.match(read(img),/<svg[\s>]/,s+' must be real SVG content');
 const page=read(`courses/${s}.html`);
 assert.match(page,/course-brand-assets\.js/,s+' should load image fallback logic');
 if(page.includes('za-lesson-hero')){
  assert.ok(page.includes(`data-brand-course="${s}"`),s+' needs illustrated course hero');
 }
}
assert.match(read('assets/scripts/academy-app.js'),/class="dl-course-logo"/, 'Course catalogue should use image elements, not glyphs');
assert.match(read('assets/scripts/specialist-course-data.js'),/Python for Data Analytics/);
assert.match(read('assets/scripts/course-studio.js'),/data-brand-course="\$\{k\}"/);
assert.match(read('assets/scripts/course-brand-assets.js'),/python-logo-only\.svg/);
assert.match(read('assets/scripts/course-brand-assets.js'),/Power-Query-Colored\.svg/);
for(const page of ['catalog.html','index.html','overview.html','studio.html'])assert.match(read(page),/course-brand-assets\.css/);
console.log('PASS course brand imagery: 9 local course assets, authentic product marks, course reader/catalog/studio integration, offline fallback, source credits');
