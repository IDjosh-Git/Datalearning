/** Regression coverage for route-isolated library rebuild and 12-item paging. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root = path.resolve(import.meta.dirname, '..');
const read = filename => fs.readFileSync(path.join(root,filename),'utf8');
const style = 'assets/styles/learning-libraries-premium.css';
assert(fs.existsSync(path.join(root,style)));
assert(!fs.existsSync(path.join(root,'assets/styles/reference.css')));
assert(!fs.existsSync(path.join(root,'assets/styles/prompt-library.css')));
const css = read(style);
for(const key of ['body[data-library-page]','.dl-lib-grid','.dl-lib-pagination','grid-template-columns:repeat(4','grid-template-columns:repeat(3','grid-template-columns:repeat(2','@media (max-width:700px)','@media (max-width:390px)','prefers-reduced-motion']) assert(css.includes(key),`Missing premium style ${key}`);
const scenarios = [
 {page:'reference.html', script:'assets/scripts/reference.js', data:'assets/scripts/reference-data.js', global:'IJ_REFERENCE',count:639,prev:'referencePrev',next:'referenceNext',modal:'referenceDialog',grid:'referenceResults'},
 {page:'prompt-library.html',script:'assets/scripts/prompt-library.js',data:'assets/scripts/prompt-library-data.js',global:'DALP_PROMPTS',count:300,prev:'promptPrev',next:'promptNext',modal:'promptPreviewDialog',grid:'promptGrid'}
];
for(const s of scenarios){
 const html=read(s.page),logic=read(s.script),context={window:{}};
 vm.runInNewContext(read(s.data),context);
 assert.equal(context.window[s.global].length,s.count,`Data unexpectedly changed for ${s.page}`);
 assert(html.includes('data-library-page="')&&html.includes(style),'New isolated stylesheet must load');
 assert(!/assets\/styles\/(?:reference|prompt-library)\.css/.test(html),'Legacy stylesheet still linked');
 for(const target of [s.prev,s.next,s.modal,s.grid])assert(html.includes(`id="${target}"`),`Missing ${target}`);
 assert(logic.includes('PAGE_SIZE = 12'),`Incorrect page size: ${s.script}`);
 assert(logic.includes('slice(')&&logic.includes('previous.disabled')&&logic.includes('next.disabled'),'Page navigation must be bounded');
 assert(logic.includes('modal.showModal()')||logic.includes('dialog.showModal()'),'Modal must use native dialog');
 assert(logic.includes('localStorage')&&logic.includes('clipboard')&&logic.includes('aria-pressed'),'Saved/copy/accessibility regression');
 assert(html.includes('public-search-premium.css'),'Maintain application header styling');
 assert(html.includes('href="study-tools.html"'),'Keep Study Tools navigation');
}
assert(read('reference.html').includes('id="categoryFilter"'));
assert(read('prompt-library.html').includes('id="categorySelect"'));
assert(!read('prompt-library.html').includes('id="loadMore"'),'Obsolete load-more control must be removed');
assert(read('assets/scripts/academy-app.js').includes('reference.html?group='),'Week-specific reference links must remain intact');
assert(read('courses/ai.html').includes('href="../prompt-library.html"'),'AI course must still link to Prompt Library');
console.log('PASS libraries: 639 references + 300 prompts, 12-item paging, premium isolated CSS, search/bookmarks/dialogs and course links');
