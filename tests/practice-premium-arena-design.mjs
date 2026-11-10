/** The Arena now owns a single modern editor chooser design layer. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const page=fs.readFileSync('practice.html','utf8');
const css=fs.readFileSync('assets/styles/practice-arena-refined.css','utf8');
for(const token of ['class="pc-hero dalp-themed-hero arena-modern-hero"','aria-label="How practice works"','class="arena-hero-steps"','class="arena-subject-launcher"','class="arena-subject-options"','id="practiceDetail"','id="hubOpen"','id="challengeModal"','id="practiceKind"','id="practiceList"','id="hubClose"','id="pythonLabStorage"'])
  assert(page.includes(token),`Missing existing or redesigned interactive element: ${token}`);
for(const subject of ['SQL','Excel','Python']) {
  assert(page.includes(`data-arena-subject="${subject}"`),`Missing ${subject} editor launcher`);
  assert(page.includes(`arena-editor-choice--${subject.toLowerCase()}`),`Missing premium ${subject} class`);
}
assert(page.includes('assets/styles/practice-arena-refined.css'),'Missing canonical Arena picker + brief stylesheet');
assert(page.indexOf('practice-arena-refined.css')>page.indexOf('practice-arena-studio-premium.css'),'Refined picker and brief must supersede older Arena styles');
assert(page.indexOf('practice-arena-refined.css')<page.indexOf('public-search-premium.css'),'Public search stylesheet should remain last');
for(const token of ['nav.arena-subject-launcher div.arena-subject-options','repeat(3,minmax(0,1fr))','min-height:128px','@media(max-width:760px)','prefers-reduced-motion:reduce','-webkit-text-fill-color','aria-pressed="true"'])
  assert(css.includes(token),`Missing responsive or selected-editor styling: ${token}`);
for(const script of ['practice.js','challenge-hub.js','arena-ide.js','arena-subject-launcher.js','arena-editor-selection.js','arena-workspace-visibility.js','formula-engine.js','python-lab.js'])
  assert(page.includes(`assets/scripts/${script}`),`Existing editor logic must remain loaded: ${script}`);
console.log('PASS: premium SQL, Excel, Python chooser and original challenge/editor wiring retained');
