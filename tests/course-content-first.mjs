/** Regression checks for readable, compact, content-first lessons. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const css=fs.readFileSync('assets/styles/premium-unified.css','utf8');
const sync=fs.readFileSync('assets/scripts/course-sync.js','utf8');
const intro=fs.readFileSync('assets/scripts/introduction.js','utf8');
for(const course of ['introduction','excel','sql','powerbi','python','ai']){
 const page=fs.readFileSync(`courses/${course}.html`,'utf8');
 assert(page.includes(`data-ui-course="${course}"`),`${course}: expected current course template`);
 assert(page.includes('premium-unified.css'),`${course}: optimized reading styles missing`);
 assert(page.includes('course-premium-sidebar.js'),`${course}: lesson sidebar must remain`);
}
assert(css.includes('DATALEARNING COURSE READING OPTIMIZATIONS'),'Current course whitespace/contrast rules missing');
assert(css.includes('content-visibility:auto'),'Offscreen content should defer costly layout/paint');
assert(css.includes('contain-intrinsic-size:none!important'),'Print must render all course content');
assert(css.includes('.learning-grid'),'Teaching rows should fill the canvas');
assert(css.includes('data-learning-subject] .dalp-themed-hero :is(h1,h1 em)'),'Hero contrast rule missing');
assert(sync.includes("document.querySelector('.sidebar-progress') || document.querySelector('.progress-card')"),'Sync badge belongs near progress, not page start');
assert(!sync.includes('host.prepend(b)'),'Old top-of-page badge placement must remain removed');
assert(intro.includes('statusHome.appendChild(syncStatus)'),'Foundation course status should leave the top progress panel');
console.log('PASS six course content-first layouts, contrast, offscreen rendering, print and progress placement');
