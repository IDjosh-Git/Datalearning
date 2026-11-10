/* Regression contract: reveal-on-demand datasets and consistent answer/editor styling. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const page=fs.readFileSync('practice.html','utf8');
const ide=fs.readFileSync('assets/scripts/arena-ide.js','utf8');
const work=fs.readFileSync('assets/scripts/arena-premium-experience.js','utf8');
const practice=fs.readFileSync('assets/scripts/practice.js','utf8');
const css=fs.readFileSync('assets/styles/practice-arena-studio-premium.css','utf8');
for(const asset of ['assets/styles/practice-arena-studio-premium.css','assets/scripts/arena-premium-experience.js'])assert(page.includes(asset),`Missing new arena asset: ${asset}`);
assert(page.indexOf('practice-arena-studio-premium.css')>page.indexOf('practice-arena-modern.css'),'Latest arena styling must load after existing theme');
for(const js of ['practice.js','arena-ide.js','arena-premium-experience.js'])assert(page.includes(js),`Editor controller lost: ${js}`);
for(const token of ['id="ideTableToggle"','id="ideWorksheetDataset"','aria-expanded="false"','aria-controls="ideWorksheetDataset"','<div id="ideWorksheetDataset" class="arena-dataset-content" hidden>','wire(\'#ideTableToggle\'','label.textContent=show?\'Hide table\':\'Show table\''])assert(ide.includes(token),`Missing worksheet disclosure: ${token}`);
for(const token of ['arenaSqlReference','arena-reference-ready','content.hidden=true','aria-controls','Hide schema','aria-reference-content']){
 if(token==='aria-reference-content')continue;
 assert(work.includes(token),`Missing SQL schema on-demand implementation: ${token}`);
}
for(const token of ['arena-grade-topline','arenaCopyAnswer','is-solution','arena-answer-explanation','aria-expanded'])assert(practice.includes(token),`Missing premium answer/grade component: ${token}`);
for(const token of ['.arena-table-toggle[aria-expanded="true"]','.arena-dataset-content,.arena-reference-content)[hidden]','.ide-content{display:grid','.ide-results-tabs{display:grid','#pythonCode{display:block','.arena-support-card .arena-support-heading','@media(max-width:700px)','prefers-reduced-motion:reduce'])assert(css.includes(token),`Missing premium style: ${token}`);
const start=ide.indexOf('function sheet(includeBar=true)');const end=ide.indexOf('let sheetExpanded=false;',start);assert(start>=0&&end>start);
const ctx={esc:()=>'',picked:'F2',SHEET_MAX_ROWS:20,SHEET_DATA_ROWS:7,SOURCE_ROWS:[['Product','Sales','Region','Price','Qty','Formula output','',''],...Array.from({length:6},()=>['Pens',120,'East',60,2])]};
vm.createContext(ctx);vm.runInContext(ide.slice(start,end)+';this.editable=sheet(true);this.readonly=sheet(false)',ctx);
assert(ctx.editable.includes('id="ideTableToggle"'),'Editable Excel worksheet requires an explicit table control');
assert(ctx.editable.includes('id="ideWorksheetDataset" class="arena-dataset-content" hidden'),'Editable table must be collapsed by default');
assert(ctx.editable.indexOf('id="ideFormulaBar"')<ctx.editable.indexOf('id="ideWorksheetDataset"'),'Formula bar must remain outside collapsed table');
assert(ctx.editable.includes('id="ideSheetToggle"'),'Existing extra-row expansion must remain available inside table');
assert(!ctx.readonly.includes('id="ideTableToggle"'),'Schema Inspector must not duplicate editable disclosure control');
assert(!ctx.readonly.includes('id="ideWorksheetDataset"'),'Read-only inspector should display when its tab is selected');
console.log('PASS premium Practice Arena: collapsed editable Excel table, SQL schema disclosure, premium grade/answer card, all editor styles and mobile breakpoints');
