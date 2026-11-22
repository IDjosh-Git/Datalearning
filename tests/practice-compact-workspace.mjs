/** Practice Arena 2026-11-10 — compact Excel worksheet & unified workspace contract. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const ide=fs.readFileSync('assets/scripts/arena-ide.js','utf8');
const start=ide.indexOf('const sheetRows=');
const end=ide.indexOf('function displayValue(value)',start);
assert(start>=0&&end>start,'Cannot inspect actual worksheet template');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(`const esc=s=>String(s??''); const $=()=>null;\n${ide.slice(start,end)}\nwindow.template=sheet;`,ctx);
const html=ctx.window.template(true);
const visibleRows=[...html.matchAll(/<tr(?:[^>]*)><th scope="row">(\d+)<\/th>/g)];
assert.equal(visibleRows.length,20,'The worksheet must retain 20 editable row positions');
const hiddenRows=[...html.matchAll(/<tr class="ide-spare-row" data-sheet-extra="true" hidden>/g)];
assert.equal(hiddenRows.length,13,'Only seven initial rows may be visible');
assert(html.includes('id="ideSheetToggle"')&&html.includes('aria-expanded="false"'),'Expandable rows need an accessible control');
assert(html.includes('aria-controls="ideSheetBody"'),'Expansion must reference its own worksheet body');
assert(!ctx.window.template(false).includes('ideSheetToggle'),'Read-only inspector must remain compact');
for(const token of ['sheetExpanded=!sheetExpanded','updateSheetVisibility(shell)','Object.keys(workbook).some','tr.hidden=!sheetExpanded&&!filled','sheetExpanded=false'])assert(ide.includes(token),`Missing worksheet expansion behavior: ${token}`);
const pages=['practice','tutor','learning-lab','account','profile','progress','capstone','certificate','admin','reviewer'];
for(const page of pages){
  const markup=fs.readFileSync(`${page}.html`,'utf8');
  const required=page==='practice'?'assets/styles/practice-arena-premium-final.css':'assets/styles/premium-unified.css';
  assert(markup.includes(required),`Missing applicable workspace styles: ${page}`);
  assert(!markup.includes('assets/styles/practice-workspace-premium.css'),`${page}: retired Studio CSS still loaded`);
}
assert(fs.readFileSync('practice.html','utf8').includes('arena-hero-steps'),'Missing practice guide');
console.log('PASS compact worksheet and active Arena workspace styles, retired Studio styles absent');
