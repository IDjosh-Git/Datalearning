import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../prompt-library.html',import.meta.url),'utf8');
for(const id of ['promptPreviewDialog','promptModalTitle','promptModalDescription','promptModalClose','promptModalCopy','promptToast']) {
 const count=[...html.matchAll(new RegExp('\\bid="'+id+'"','g'))].length;
 assert.equal(count,1,`${id} should be unique; found ${count}`);
}
assert.match(html,/<dialog[^>]+id="promptPreviewDialog"/);
console.log('PASS prompt library has one accessible dialog and one set of modal controls');
