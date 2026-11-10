/** Release guard: compact Studio courses and paginated Learning Lab while preserving controllers. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const base = path.resolve(import.meta.dirname, '..');
const read = name => fs.readFileSync(path.join(base, name), 'utf8');
const studio = read('studio.html');
const lab = read('learning-lab.html');
const style = read('assets/styles/study-tools-refined.css');
const logic = read('assets/scripts/learning-lab.js');
for(const id of ['ps-course-nav','ps-rail','ps-skill-list','ps-browse-mobile','ps-answer','ps-complete','ps-restore'])
  assert(studio.includes(`id="${id}"`), `Missing Studio control ${id}`);
for(const id of ['labPagination','labPrev','labNext','labPages','labPageSummary','labCards','labSearch','labGroup','labMode','labReset'])
  assert(lab.includes(`id="${id}"`), `Missing Learning Lab control ${id}`);
assert.match(style, /#ps-course-nav\.ps-course-nav[\s\S]*?grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
assert.match(style, /#ps-rail\.ps-rail\{[\s\S]*?max-height:none!important;[\s\S]*?overflow:visible!important/);
assert.match(style, /#ps-skill-list\.ps-skill-list\{[\s\S]*?overflow:visible!important/);
assert.match(style, /\.lab-pagination\[hidden\]\{display:none!important/);
assert.match(logic, /const PAGE_SIZE = 10/);
assert.match(logic, /found\.slice\(start, start \+ PAGE_SIZE\)/);
assert.match(logic, /currentPage = 1/);
assert.match(logic, /previous\.addEventListener\('click'/);
assert.match(logic, /next\.addEventListener\('click'/);
assert.match(logic, /localStorage\.setItem\('dalp-learning-lab-v1'/);
assert(read('assets/scripts/course-studio.js').includes('data-learning-studio-v3'), 'Studio save key changed');
console.log('PASS compact eight-course Studio selector, non-scrolling skill rail, ten-item Lab paging and saved progress');
