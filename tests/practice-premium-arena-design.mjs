/** Premium Practice Arena: visual refactor without changing editor selectors/controllers. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const page=fs.readFileSync('practice.html','utf8');
const css=fs.readFileSync('assets/styles/practice-arena-modern.css','utf8');
for(const token of ['class="pc-hero dalp-themed-hero arena-modern-hero"','aria-label="How practice works"','class="arena-hero-steps"','class="arena-subject-launcher"','class="arena-subject-options"','id="practiceDetail"','id="hubOpen"','id="challengeModal"','id="practiceKind"','id="practiceList"','id="hubClose"','id="pythonLabStorage"'])
  assert(page.includes(token),`Missing existing or redesigned interactive element: ${token}`);
for(const subject of ['SQL','Excel','Python'])
  assert(page.includes(`data-arena-subject="${subject}"`),`Missing ${subject} editor launcher`);
assert(page.includes('assets/styles/practice-arena-modern.css'),'Missing route-scoped premium stylesheet');
assert(page.indexOf('assets/styles/practice-arena-modern.css')>page.indexOf('assets/styles/unified-site-v5.css'),'Practice styling must load after site-wide themes');
assert(page.indexOf('assets/styles/practice-arena-modern.css')<page.indexOf('assets/styles/public-search-premium.css'),'Shared search stylesheet must remain final on public pages');
for(const token of ['nav.arena-subject-launcher div.arena-subject-options','repeat(3,minmax(0,1fr))','height:52px','max-height:52px','@media(max-width:720px)','prefers-reduced-motion:reduce','-webkit-text-fill-color'])
  assert(css.includes(token),`Missing responsive premium design rule: ${token}`);
for(const script of ['practice.js','challenge-hub.js','arena-ide.js','arena-subject-launcher.js','arena-editor-selection.js','arena-workspace-visibility.js','formula-engine.js','python-lab.js'])
  assert(page.includes(`assets/scripts/${script}`),`Existing editor logic must remain loaded: ${script}`);
console.log('PASS: Practice Arena premium design retains SQL/Excel/Python selector, challenge modal, editor, and formula/controller wiring');
