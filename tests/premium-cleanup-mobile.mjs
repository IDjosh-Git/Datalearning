/** Durable source contracts for the clean mobile release. */
import fs from 'node:fs';import assert from 'node:assert/strict';
const read=p=>fs.readFileSync(p,'utf8');
const practice=read('practice.html');const grader=read('assets/scripts/python-grader.js');const lab=read('assets/scripts/python-lab.js');const runner=read('assets/scripts/python-runtime-manager.js');const css=read('assets/styles/premium-unified.css');
assert(!fs.existsSync('assets/scripts/learner-home.js'),'Orphaned legacy dashboard JS returned');
assert(practice.includes('python-runtime-manager.js')&&practice.indexOf('python-runtime-manager.js')<practice.indexOf('python-grader.js'),'Manager must load before Python grader');
assert(grader.includes('DALP_PY_RUNTIME')&&lab.includes('DALP_PY_RUNTIME'),'Editor and grading must reuse runtime');
assert(!grader.includes('new Worker(')&&!lab.includes('new Worker('),'Never cold-start another worker for every attempt');
assert(runner.includes('180000')&&runner.includes('60000')&&runner.includes('dispose'),'Worker must support slower first load, subsequent timeouts and cancellation');
assert(read('assets/scripts/practice.js').includes("tasks.filter(task=>task.kind===kind).length"),'Arena challenge counts must come from the catalogue');
assert(css.includes('Premium component consistency')&&css.includes('html[data-theme="light"] body textarea'),'Premium mobile form styles must remain');
assert(read('service-worker.js').includes('dalp-public-catalog-menu-v39'),'Fresh cache revision required');
console.log('PASS source cleanup: shared Python worker, derived challenge counts, premium mobile forms and updated cache');
