/** Regression for the prompt preview overlay, which must never resize grid cards. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=(path)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const html=read('prompt-library.html');
const js=read('assets/scripts/prompt-library.js');
const css=read('assets/styles/premium-unified.css');
assert.match(html, /<dialog\s+class="pl-prompt-modal"[^>]+id="promptPreviewDialog"[^>]+aria-labelledby="promptModalTitle"/);
for (const id of ['promptModalTitle','promptModalContent','promptModalCopy','promptModalClose','promptModalCloseIcon']) {
  assert.match(html, new RegExp('id="'+id+'"'), `Missing dialog control: ${id}`);
}
assert.match(js, /read\.className = 'prompt-preview-trigger'/);
assert.match(js, /read\.setAttribute\('aria-haspopup', 'dialog'\)/);
assert.match(js, /modal\.showModal\(\)/);
assert.match(js, /modal\.close\(\)/);
assert.match(js, /modalContent\.textContent = item\.prompt/, 'Prompt text must be safely displayed as text');
assert.match(js, /navigator\.clipboard\.writeText\(text\)/, 'Copy must work from the popup');
assert.doesNotMatch(js, /createElement\('details'\)/, 'Prompt cards must not expand in place');
assert.match(css, /dialog\.pl-prompt-modal/);
assert.match(css, /\.pl-modal-content[\s\S]*?overflow-y:auto/);
assert.match(css, /\.pl-modal-footer[\s\S]*?flex:none/);
assert.match(read('service-worker.js'), /dalp-public-prompt-preview-v41/);
console.log('PASS AI prompt library: non-expanding cards, accessible popup, copy/close controls and refreshed assets');
