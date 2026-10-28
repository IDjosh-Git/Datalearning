import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = f => readFileSync(new URL(`../${f}`,import.meta.url),'utf8');
const html=read('practice.html');
const css=read('assets/arena-scroll-and-theme-v54.css');
for(const part of ['pc-wrap','pc-layout','practiceDetail','ide-shell','ide-content','hub-cards','pythonCode']) {
  assert.ok(css.includes(part),`${part} must be covered by the scroll rules`);
}
assert.match(html,/arena-scroll-and-theme-v54\.css\?v=20261028\.54/);
assert.match(css,/overflow-y:\s*auto\s*!important/);
assert.match(css,/max-height:\s*none\s*!important/);
assert.match(css,/#challengeModal \.hub-cards/);
assert.match(css,/hub-modal-open/);
assert.match(css,/backdrop-filter:\s*none\s*!important/);
assert.match(css,/120ms ease/);
assert.match(css,/prefers-reduced-motion:\s*reduce/);
assert.match(html,/data-arena-subject="SQL"/);
assert.match(html,/data-arena-subject="Excel"/);
assert.match(html,/data-arena-subject="Python"/);
console.log('PASS Arena v54: document scrolling, internal modal/editor scrolling, theme rendering optimization, editor isolation references');
