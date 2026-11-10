/** Contract against reintroducing hard-coded Practice Arena editor/output heights.
 * Legacy public-experience rules are deliberately overridden at #practiceDetail specificity. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const stylesheet=fs.readFileSync('assets/styles/practice-arena-studio-premium.css','utf8');
const editor=fs.readFileSync('assets/scripts/arena-ide.js','utf8');
const page=fs.readFileSync('practice.html','utf8');
const rules=[
  '#practiceDetail .ide-content {', 'grid-template-rows:auto!important',
  'align-items:start!important', '#practiceDetail .ide-content > :is(.ide-primary,.ide-secondary)',
  '#practiceDetail .ide-primary #ideEditorSlot',
  '#practiceDetail[data-active-editor="Excel"] .ide-sheet-editor',
  '#practiceDetail[data-active-editor="Excel"] .arena-dataset-content[hidden]',
  '#practiceDetail[data-active-editor="SQL"] .ide-primary .arena-editor',
  '--ap-editor-height:250px', '--ap-editor-height:210px',
  '#practiceDetail .ide-secondary .ide-panel:not([hidden])',
  '#practiceDetail .ide-secondary .ide-panel[hidden]',
  '#practiceDetail .ide-secondary #practiceFeedback:empty',
  '#practiceDetail .arena-worked-code',
  '#practiceDetail[data-active-editor="Python"] #pythonCode',
  '@media(max-width:1060px)',
];
for(const token of rules)assert(stylesheet.includes(token),`Required compact style absent: ${token}`);
assert(editor.includes("shell.querySelector('.ide-secondary')?.appendChild(feedback)"),'Assessment must be in visible results card, not hidden Console tab');
assert(!editor.includes("$('#ideConsoleMount',shell)?.after(feedback)"),'Old hidden grading location returned');
assert(page.includes('practice-arena-studio-premium.css?v=arena-brief-editor-20261110-r1'),'Compact styles need an updated cache revision');
assert(page.includes('arena-ide.js?v=arena-compact-20261110-r2'),'Editor layout controller needs an updated cache revision');
assert(editor.includes('id="ideTableToggle"')&&editor.includes('aria-expanded="false"'),'Table must remain collapsed by default');
assert(editor.includes("label.textContent=show?'Hide table':'Show table'"),'Table disclosure behavior must remain active');
console.log('PASS Practice Arena: compact editors, zero forced results-card height, reachable assessment feedback, responsive worksheet disclosure');
