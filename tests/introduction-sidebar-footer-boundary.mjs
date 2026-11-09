import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync('courses/introduction.html','utf8');
const css = fs.readFileSync('assets/styles/premium-unified.css','utf8');
const packageConfig = JSON.parse(fs.readFileSync('package.json','utf8'));

const open = html.indexOf('<div class="app dl-introduction-shell">');
const sidebar = html.indexOf('<aside id="sidebar"');
const main = html.indexOf('<main id="main-content"');
const end = html.indexOf('</main></div><!-- /dl-introduction-shell -->');
assert.ok(open >= 0 && open < sidebar && sidebar < main && main < end, 'Introduction rail and main must be siblings inside one bounded course layout');
assert.equal((html.match(/id="sidebar"/g)||[]).length,1,'One and only one Introduction sidebar');
assert.equal((html.match(/id="main-content"/g)||[]).length,1,'Main lesson landmark must be preserved');
assert.match(css,/Introduction parity with the five standard course shells/,'Dedicated boundary rules must exist');
const block = css.slice(css.lastIndexOf('/* 2026-11-09 · Introduction parity with the five standard course shells.'));
assert.match(block,/position:sticky!important/,'Desktop Introduction sidebar must use bounded sticky positioning');
assert.match(block,/grid-template-columns:320px minmax\(0,1fr\)/,'Desktop sidebar should retain the requested wider 320px rail');
assert.match(block,/grid-template-columns:298px minmax\(0,1fr\)/,'Medium-desktop sidebar should adapt width');
assert.match(block,/position:fixed!important;inset:0!important/,'Mobile navigation must remain full-screen');
assert.ok(packageConfig.scripts['test:responsive'].includes('introduction-sidebar-footer-boundary.mjs'),'Regression test must run with responsive suite');
console.log('PASS Introduction: shared course shell, wider sticky desktop rail bounded before footer, full-screen mobile drawer and preserved lesson landmarks');
