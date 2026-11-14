/** Optional challenge brief stays collapsed and the refactored picker is reachable. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync('practice.html','utf8');
const practice=fs.readFileSync('assets/scripts/practice.js','utf8');
const css=fs.readFileSync('assets/styles/practice-arena-premium-final.css','utf8');
const old=fs.readFileSync('assets/styles/practice.css','utf8');
assert(practice.includes('<details class="arena-learning-brief"'), 'Challenge guidance must be a native details disclosure');
assert(practice.includes('<summary class="arena-brief-header"'), 'Disclosure must have an accessible summary');
assert(!practice.includes('<details open class="arena-learning-brief"')&&!practice.includes('<details class="arena-learning-brief" open'), 'Brief should be closed by default');
assert(practice.includes('</div></details>${t.kind'), 'Challenge brief should close before dataset and editor controls');
for(const tok of ['arena-brief-body','arena-brief-show','arena-brief-hide','arena-brief-chevron','details.arena-learning-brief:not([open])','arena-editor-choice-copy','aria-pressed="true"','@media(max-width:760px)'])assert(css.includes(tok),`Missing premium brief/card contract: ${tok}`);
for(const subject of ['SQL','Excel','Python'])assert(html.includes(`arena-editor-choice--${subject.toLowerCase()}`),`${subject} missing upgraded card`);
assert.equal((html.match(/class="arena-editor-choice /g)||[]).length,3,'Exactly three tools must be displayed');
assert(!html.includes('<section class="arena-learning-brief"'), 'Obsolete always-open guidance markup retained');
assert(!old.includes('.arena-learning-brief'), 'Old brief rules should be removed from legacy practice.css');
const checked=vm.createScript(practice,{filename:'practice.js'});assert(checked);
console.log('PASS Practice Arena optional brief defaults closed, responsive premium editor cards, obsolete brief CSS removed');
