/** Release guard: compact Studio courses and paginated Learning Lab while preserving controllers. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const base = path.resolve(import.meta.dirname, '..');
const read = name => fs.readFileSync(path.join(base, name), 'utf8');
const lab = read('learning-lab.html');
const style = read('assets/styles/study-tools-refined.css');
const logic = read('assets/scripts/learning-lab.js');
for(const id of ['labPagination','labPrev','labNext','labPages','labPageSummary','labCards','labSearch','labGroup','labMode','labReset'])
  assert(lab.includes(`id="${id}"`), `Missing Learning Lab control ${id}`);
assert.match(style, /\.lab-pagination\[hidden\]\{display:none!important/);
assert.match(logic, /const PAGE_SIZE = 10/);
assert.match(logic, /found\.slice\(start, start \+ PAGE_SIZE\)/);
assert.match(logic, /currentPage = 1/);
assert.match(logic, /previous\.addEventListener\('click'/);
assert.match(logic, /next\.addEventListener\('click'/);
assert.match(logic, /window\.DALP_STORAGE\.setItem\('dalp-learning-lab-v1'/);
console.log('PASS ten-item Learning Lab paging and saved progress');
