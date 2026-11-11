/* Data Learning Path — dual-engine IDE enhancements. Native engines remain authoritative. */
(()=>{'use strict';
const $=(q,r=document)=>r.querySelector(q);const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sheetRows=[['Pens',120,'East',60,2],['Folders',450,'West',90,5],['Binders',300,'East',100,3],['Paper',210,'West',52.5,4],['Toner',620,'East',620,1],['Markers',150,'West',75,2]];
let kind='SQL',picked='F2',workbook=Object.create(null);
function activatePanel(name){document.querySelectorAll('[data-ide-tab]').forEach(b=>{const on=b.dataset.ideTab===name;b.classList.toggle('is-active',on);b.setAttribute('aria-selected',String(on))});document.querySelectorAll('[data-ide-panel]').forEach(p=>p.hidden=p.dataset.idePanel!==name);}
function syncMode(){
 for(const subject of ['SQL','Excel','Python']){
  const button=$('#ide'+subject+'Mode');if(!button)continue;
  const current=kind===subject;button.classList.toggle('is-active',current);
  button.setAttribute('aria-pressed',String(current));
 }
 const status=$('#ideModeStatus');if(status)status.textContent={SQL:'SQL query editor',Excel:'Spreadsheet formula editor',Python:'Python code editor'}[kind];
 const check=$('#practiceCheck');if(check)check.textContent=kind==='SQL'?'▶ Run Query':kind==='Python'?'✓ Check Python solution':'✓ Check challenge answer';
}
/* Restore Python's canonical controls before practice.js rebuilds a challenge.
   No worker, grading handler or editor instance is recreated here. */
function restorePythonLab(){
 const lab=$('#pythonLab');if(!lab)return;
 const heading=$('.python-lab-heading',lab),tools=$('.python-lab-tools',lab);
 const state=$('#pythonRuntimeState');if(state&&heading&&!heading.contains(state))heading.append(state);
 const actions=$('.python-lab-actions');if(actions&&tools&&!tools.contains(actions))tools.append(actions);
 const outputHeading=$('.python-output-heading');if(outputHeading&&!lab.contains(outputHeading))lab.append(outputHeading);
 const output=$('#pythonOutput');if(output&&!lab.contains(output))lab.append(output);
 lab.classList.remove('ide-python-lab');
}
window.DALP_ARENA_IDE={restorePython:restorePythonLab};
// Six source records, plus the worksheet header. Keep empty rows out of sight
// until learners request workspace room; custom-filled rows remain visible.
const SHEET_DATA_ROWS=7, SHEET_MAX_ROWS=20;
const SOURCE_ROWS=[['Product','Sales','Region','Price','Qty','Formula output','',''],...sheetRows];
function sheet(includeBar=true){
 const names='ABCDEFGH';const length=includeBar?SHEET_MAX_ROWS:SHEET_DATA_ROWS;
 const body=Array.from({length},(_,i)=>`<tr${i>=SHEET_DATA_ROWS?' class="ide-spare-row" data-sheet-extra="true" hidden':''}><th scope="row">${i+1}</th>${names.split('').map((letter,j)=>{
   const value=SOURCE_ROWS[i]?.[j]??'';return `<td data-cell="${letter}${i+1}" tabindex="0" role="gridcell" aria-label="Cell ${letter}${i+1}" class="${i===0?'ide-sheet-head':'ide-formula-cell'}">${esc(value)}</td>`
 }).join('')}</tr>`).join('');
 return `${includeBar?`<div class="ide-formula-bar"><span class="ide-name-box" id="ideCellName">${picked}</span><span class="ide-fx">ƒx</span><input id="ideFormulaBar" aria-label="Formula bar" placeholder="=LET(total,SUM(B2:B7),total/6)" spellcheck="false" autocorrect="off" autocapitalize="off" autocomplete="off" /></div><p class="ide-worksheet-hint">Use Excel-style functions including <code>LET</code> to name intermediate calculations. <button type="button" class="ide-let-example" id="ideLetExample">Insert LET example</button><br><strong>Challenge checks always use the original example data.</strong></p>`:''}${includeBar?`<div class="arena-table-disclosure"><div class="arena-table-disclosure-copy"><span class="arena-small-kicker">DATASET EXPLORER</span><strong>Practice worksheet</strong><small>Open the table only when you need to inspect or edit cells.</small></div><button type="button" id="ideTableToggle" class="arena-table-toggle" aria-expanded="false" aria-controls="ideWorksheetDataset"><span class="arena-table-toggle-icon" aria-hidden="true">▦</span><span class="arena-table-toggle-label">Show table</span><span class="arena-table-chevron" aria-hidden="true">⌄</span></button></div><div id="ideWorksheetDataset" class="arena-dataset-content" hidden>`:''}<div class="ide-grid-scroll"><table class="ide-sheet" role="grid" aria-label="${includeBar?'Editable':'Sample'} practice worksheet"><thead><tr><th class="ide-corner"></th>${names.split('').map(c=>`<th scope="col">${c}</th>`).join('')}</tr></thead><tbody${includeBar?' id="ideSheetBody"':''}>${body}</tbody></table></div>${includeBar?`<div class="ide-sheet-foot"><span class="ide-sheet-count" id="ideSheetCount" role="status">6 data rows · 13 additional rows hidden</span><button type="button" class="ide-sheet-toggle" id="ideSheetToggle" aria-expanded="false" aria-controls="ideSheetBody">+ Show 13 extra rows</button></div></div>`:''}`;
}
let sheetExpanded=false;
function updateSheetVisibility(shell){
 const spare=[...shell.querySelectorAll('.ide-sheet-editor tr[data-sheet-extra]')];
 let userRows=0;
 for(const tr of spare){const row=Number(tr.querySelector('th')?.textContent||'0');const filled=Object.keys(workbook).some(k=>Number(k.match(/\d+$/)?.[0])===row);if(filled)userRows++;tr.hidden=!sheetExpanded&&!filled;}
 const toggle=$('#ideSheetToggle',shell),label=$('#ideSheetCount',shell);
 if(toggle){toggle.setAttribute('aria-expanded',String(sheetExpanded));toggle.textContent=sheetExpanded?'− Hide unused rows':'+ Show '+spare.length+' extra rows';}
 if(label)label.textContent=sheetExpanded?`6 sample rows · ${spare.length} additional editable rows`:`6 sample rows · ${userRows} additional filled · ${spare.length-userRows} empty rows hidden`;
}
function displayValue(value){return Array.isArray(value)?value.map(x=>String(x)).join(' · '):String(value??'')}
function refreshSheet(shell){
 const engine=window.DALP_EXEC_EXCEL;if(!engine)return;
 shell.querySelectorAll('[data-cell]').forEach(el=>{
  const ref=el.dataset.cell;try{const value=engine.cellValue(ref,workbook);el.textContent=displayValue(value);el.title=Object.prototype.hasOwnProperty.call(workbook,ref)?String(workbook[ref]):'';el.classList.remove('ide-cell-error')}
  catch(e){el.textContent=e.code||'#ERROR!';el.title=e.message;el.classList.add('ide-cell-error')}
 });
}
function setCell(shell,answer){
 const input=$('#ideFormulaBar',shell),text=input?.value.trim();if(!input)return;
 if(text){const value=/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text)?Number(text):/^TRUE$/i.test(text)?true:/^FALSE$/i.test(text)?false:text;workbook[picked]=value;}
 else delete workbook[picked];
 try{window.DALP_STORAGE?.setItem('dalp:arena:excel-workbook:v1',JSON.stringify(workbook))}catch{}
 refreshSheet(shell);updateSheetVisibility(shell);answer.value=input.value;answer.dispatchEvent(new Event('input',{bubbles:true}));
 const message=$('#ideConsoleMount',shell);if(message)message.textContent=picked+' saved to the practice worksheet. Challenge sample data remain unchanged.';
}
// Keep execution values unchanged. This helper formats only the learner-facing preview.
function formatExcelPreview(value){
 if(Array.isArray(value)) return {label:'Values returned',text:value.map(displayValue).join('  ·  '),type:'array'};
 if(typeof value==='number'&&Number.isFinite(value))return {label:'Calculated value',text:new Intl.NumberFormat('en-NG',{maximumFractionDigits:8}).format(value),type:'number'};
 if(typeof value==='boolean')return {label:'Logical result',text:value?'TRUE':'FALSE',type:'boolean'};
 if(value===null||value===undefined||value==='')return {label:'Calculated value',text:'Blank',type:'empty'};
 return {label:'Calculated value',text:displayValue(value),type:'text'};
}
function runFormula(shell){
 const raw=($('#ideFormulaBar',shell)?.value||$('#practiceAnswer')?.value||'').trim();
 const mount=$('#ideResultsMount',shell),consoleEl=$('#ideConsoleMount',shell);
 if(!raw){
  if(mount)mount.innerHTML='<div class="ide-welcome">Enter a formula in the formula bar above, then select <strong>Calculate</strong> to preview its result.</div>';
  if(consoleEl)consoleEl.textContent='No formula entered. Select a cell or type a formula to continue.';
  activatePanel('results');return null;
 }
 let result,hasError=false,errorText='';
 try{result=window.DALP_EXEC_EXCEL.evaluate(raw,workbook);if(consoleEl)consoleEl.textContent='Calculation completed. Select Check challenge answer to test against the challenge criteria.'}
 catch(e){hasError=true;errorText=String(e?.message||'Check your formula and try again.');result=(e?.code||'#ERROR!');if(consoleEl)consoleEl.textContent=`Formula error: ${errorText}`;}
 const output=formatExcelPreview(result);
 if(mount)mount.innerHTML=`<section class="ide-calc-result${hasError?' is-error':''}" aria-label="Excel calculation preview" role="status" aria-live="polite">
  <div class="ide-result-top"><span class="ide-result-kicker">EXCEL · CALCULATION PREVIEW</span><span class="ide-result-status">${hasError?'Needs correction':'Calculated'}</span></div>
  <div class="ide-result-body"><span class="ide-result-label">${hasError?'Formula error':output.label}</span><output class="ide-result-value" id="ideCalculatedValue" data-result-type="${output.type}">${esc(output.text)}</output>${hasError?`<p class="ide-result-error">${esc(errorText)}</p>`:''}</div>
  <div class="ide-result-formula"><span class="ide-result-label">Formula entered</span><code>${esc(raw)}</code></div>
  <p class="ide-result-note">${hasError?'Correct the formula above and calculate again.':'This is a preview of your formula. Select Check challenge answer to validate it against the exercise.'}</p>
 </section>`;
 activatePanel('results');return result;
}
function install(){const area=$('#practiceDetail'),answer=$('#practiceAnswer');if(!area||!answer)return;const subject=area.dataset.activeEditor||area.querySelector('.pc-overline')?.textContent?.trim().split(' · ')[0];if(!['SQL','Excel','Python'].includes(subject))return;const currentShell=$('.ide-shell',area);if(currentShell?.dataset.ideSubject===subject)return;kind=subject;const original=$('.arena-workspace',area);const existing=$('.ide-shell',area);if(existing)existing.remove();workbook=Object.create(null);try{const saved=JSON.parse(window.DALP_STORAGE?.getItem('dalp:arena:excel-workbook:v1')||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved)){for(const [cell,val] of Object.entries(saved))if(/^[A-H](?:[1-9]|1[0-9]|20)$/.test(cell))workbook[cell]=val;}}catch{}picked='F2';sheetExpanded=false;const shell=document.createElement('section');shell.className='ide-shell';shell.dataset.ideSubject=kind;shell.innerHTML=`<header class="ide-topline"><div class="ide-modes" role="group" aria-label="Practice engine"><button id="ideSqlMode" type="button"><span class="ide-brand-mark" aria-hidden="true"><img class="ide-brand-img" alt="" width="23" height="23" src="assets/icons/icon-sql.svg"></span><span>SQL Lab</span></button><button id="ideExcelMode" type="button"><span class="ide-brand-mark" aria-hidden="true"><img class="ide-brand-img" alt="" width="23" height="23" src="assets/icons/icon-excel.svg"></span><span>Excel Formula Lab</span></button><button id="idePythonMode" type="button"><span class="ide-brand-mark" aria-hidden="true"><img class="ide-brand-img" alt="" width="23" height="23" src="assets/icons/icon-python.svg"></span><span>Python Lab</span></button></div><div class="ide-runtime"><span class="ide-live-dot"></span><span id="ideModeStatus"></span><span>Cloud-backed drafts · Runs in editor</span></div></header><div class="ide-content"><section class="ide-primary"><div class="ide-section-heading"><strong>Editor</strong><span>${kind==='SQL'?'query.sql':kind==='Python'?'solution.py':'worksheet.fx'}</span></div><div id="ideEditorSlot"></div><div class="ide-editor-toolbar"><span>${kind==='SQL'?'Ctrl / ⌘ + Enter to run':kind==='Python'?'Ctrl / ⌘ + Enter to run · check to grade':'Formula preview is separate from challenge grading'}</span><div>${kind==='Excel'?'<button type="button" id="ideSetCell" class="ide-set-cell">Save to cell</button>':''}${kind==='Python'?'':'<button type="button" class="ide-reset" id="ideReset">↺ Reset</button><button type="button" class="ide-run" id="ideRun">▶ '+(kind==='SQL'?'Run Query':'Calculate')+'</button>'}</div></div></section><section class="ide-secondary"><div class="ide-results-tabs" role="tablist" aria-label="Execution output"><button type="button" role="tab" data-ide-tab="results" class="is-active" aria-selected="true">${kind==='Python'?'Python Output':'Data Results'}</button><button type="button" role="tab" data-ide-tab="schema" aria-selected="false">${kind==='Python'?'Runtime Guide':'Schema Inspector'}</button><button type="button" role="tab" data-ide-tab="console" aria-selected="false">Console</button><button type="button" role="tab" data-ide-tab="hints" aria-selected="false">Hint Assistant</button></div><div class="ide-panel" data-ide-panel="results"><div id="ideResultsMount"></div></div><div class="ide-panel" data-ide-panel="schema" hidden>${kind==='Python'?'<div class="ide-inspector ide-python-guide"><h3>Python execution</h3><p>Use the example selector above the editor to load starter code.</p><p>Run Python to view printed output; check the solution separately to grade the challenge.</p><p>A reusable Python runtime initializes when you open this editor. For private data, use only approved datasets.</p></div>':kind==='SQL'?`<div class="ide-inspector"><h3>orders</h3>${['order_id · int','customer_id · int','amount · number','region · str','status · str','order_date · date'].map(s=>`<p>${s}</p>`).join('')}<h3>customers</h3>${['customer_id · int','customer_name · str','city · str','country · str'].map(s=>`<p>${s}</p>`).join('')}<h3>products</h3>${['product_id · int','product_name · str','category · str','unit_price · number'].map(s=>`<p>${s}</p>`).join('')}<h3>order_items</h3>${['item_id · int','order_id · int','product_id · int','quantity · int'].map(s=>`<p>${s}</p>`).join('')}</div>`:sheet(false)}</div><div class="ide-panel" data-ide-panel="console" hidden><div id="ideConsoleMount" class="ide-console">Ready. Execute a query or formula to view diagnostics.</div></div><div class="ide-panel" data-ide-panel="hints" hidden><div class="ide-hints"><strong>Challenge guidance</strong><p>Use the hint or worked-answer controls to review the task. Hints are based on the bundled exercise and do not call an AI service.</p><button type="button" id="ideGetHint">Show challenge hint</button><div id="ideHintText" aria-live="polite"></div></div></div></section></div>`;
area.append(shell);const slot=$('#ideEditorSlot',shell);
 if(kind==='Python'){
  // Start loading the reusable Python runtime as soon as the learner selects Python.
  window.DALP_PY_RUNTIME?.warm?.();
  const lab=$('#pythonLab'), runtime=$('.ide-runtime',shell);
  if(lab){lab.classList.add('ide-python-lab');slot.append(lab);}
  const runtimeState=$('#pythonRuntimeState');if(runtimeState&&runtime)runtime.append(runtimeState);
  const actions=$('.python-lab-actions',lab);const buttons=$('.ide-editor-toolbar > div',shell);
  if(actions&&buttons)buttons.append(actions);
  const mount=$('#ideResultsMount',shell),outputHeading=$('.python-output-heading'),output=$('#pythonOutput');
  if(mount){if(outputHeading)mount.append(outputHeading);if(output)mount.append(output);}
  area.querySelector('.python-in-challenge')?.remove();
  const grade=$('#practiceAnswer',area);if(grade){grade.hidden=true;grade.classList.add('ide-visually-hidden');}
 }
 const originalLabel=area.querySelector('label[for="practiceAnswer"]');if(originalLabel){originalLabel.classList.add('ide-visually-hidden');if(kind==='Excel'||kind==='Python')originalLabel.hidden=true;}if(kind==='Python'){/* Python Lab is the canonical editor; its output and actions are portalled above. */}
 else if(original){slot.append(original);const results=$('#arenaResults',original),console=$('#arenaConsole',original);if(results){$('#ideResultsMount',shell).append(results);results.hidden=false;}if(console){$('#ideConsoleMount',shell).replaceWith(console);console.hidden=false;}original.querySelector('.arena-output-pane')?.remove();original.querySelector('.arena-heading')?.remove();original.querySelector('.arena-shortcut')?.remove();original.querySelector('.arena-preset-bar')?.classList.add('ide-presets');}
else if(kind==='Excel'){const sheetHost=document.createElement('div');sheetHost.className='ide-sheet-editor';sheetHost.innerHTML=sheet();slot.append(sheetHost);const input=sheetHost.querySelector('#ideFormulaBar');input.value=answer.value;input.addEventListener('input',()=>{answer.value=input.value;answer.dispatchEvent(new Event('input',{bubbles:true}))});slot.append(answer);answer.classList.add('ide-visually-hidden');answer.hidden=true;answer.tabIndex=-1;answer.setAttribute('aria-hidden','true');refreshSheet(shell);updateSheetVisibility(shell);$('#ideResultsMount',shell).innerHTML='<div class="ide-welcome">Enter a formula and choose Calculate. Select a cell and save a value or formula to work with your own data.</div>';}
// Existing buttons and feedback remain in the DOM and continue handling graded submissions.
if(kind==='Excel')area.querySelector('.pc-sheet')?.classList.add('ide-sample-reference');area.querySelector('.pc-buttons')?.classList.add('ide-existing-actions');const feedback=area.querySelector('#practiceFeedback');if(feedback)shell.querySelector('.ide-secondary')?.appendChild(feedback);
const wire=(sel,fn)=>$(sel,shell)?.addEventListener('click',fn);wire('#ideRun',()=>kind==='Excel'?runFormula(shell):$('#practiceCheck')?.click());wire('#ideSetCell',()=>setCell(shell,answer));wire('#ideLetExample',()=>{const example='=LET(total,SUM(B2:B7),count,COUNT(B2:B7),total/count)';const formula=$('#ideFormulaBar',shell);if(formula){formula.value=example;formula.dispatchEvent(new Event('input',{bubbles:true}));formula.focus();}else{answer.value=example;answer.dispatchEvent(new Event('input',{bubbles:true}));}activatePanel('results')});wire('#ideReset',()=>{workbook=Object.create(null);sheetExpanded=false;const table=$('#ideWorksheetDataset',shell),tableButton=$('#ideTableToggle',shell);if(table)table.hidden=true;if(tableButton){tableButton.setAttribute('aria-expanded','false');const label=tableButton.querySelector('.arena-table-toggle-label');if(label)label.textContent='Show table';}refreshSheet(shell);updateSheetVisibility(shell);answer.value='';answer.dispatchEvent(new Event('input',{bubbles:true}));const formula=$('#ideFormulaBar',shell);if(formula)formula.value='';const sync=$('#arenaHighlight');if(sync)answer.dispatchEvent(new Event('input',{bubbles:true}));$('#ideResultsMount',shell).innerHTML='<div class="ide-welcome">Editor reset. Run your next solution when ready.</div>';$('#ideConsoleMount',shell).textContent='Editor reset.';activatePanel('results');answer.focus()});wire('#ideSheetToggle',()=>{sheetExpanded=!sheetExpanded;updateSheetVisibility(shell)});wire('#ideTableToggle',()=>{const panel=$('#ideWorksheetDataset',shell),btn=$('#ideTableToggle',shell);if(!panel||!btn)return;const show=panel.hidden;panel.hidden=!show;btn.setAttribute('aria-expanded',String(show));const label=btn.querySelector('.arena-table-toggle-label');if(label)label.textContent=show?'Hide table':'Show table';});wire('#ideGetHint',()=>{$('#practiceHint')?.click();$('#ideHintText',shell).textContent=area.querySelector('#practiceSupport')?.innerText||'Hint unavailable';});wire('#ideSqlMode',()=>{if(kind!=='SQL'){document.querySelector('#practiceKind').value='SQL';document.querySelector('#practiceKind').dispatchEvent(new Event('change'));}else answer.focus()});wire('#ideExcelMode',()=>{if(kind!=='Excel'){document.querySelector('#practiceKind').value='Excel';document.querySelector('#practiceKind').dispatchEvent(new Event('change'));}else $('#ideFormulaBar',shell)?.focus()});wire('#idePythonMode',()=>{if(kind!=='Python'){document.querySelector('#practiceKind').value='Python';document.querySelector('#practiceKind').dispatchEvent(new Event('change'));}else $('#pythonCode',shell)?.focus()});shell.querySelectorAll('[data-ide-tab]').forEach(b=>b.addEventListener('click',()=>activatePanel(b.dataset.ideTab)));
shell.querySelectorAll('[data-cell]').forEach(c=>c.addEventListener('click',()=>{shell.querySelectorAll('[data-cell]').forEach(x=>x.classList.remove('ide-selected'));c.classList.add('ide-selected');picked=c.dataset.cell;const label=$('#ideCellName',shell);if(label)label.textContent=picked;const formula=$('#ideFormulaBar',shell);if(formula){const own=Object.prototype.hasOwnProperty.call(workbook,picked);const row=Number(picked.match(/\d+$/)?.[0]);const col=picked.charCodeAt(0)-65;formula.value=own?String(workbook[picked]):String(SOURCE_ROWS[row-1]?.[col]??'');}}));
if(kind==='Excel')$('#ideFormulaBar',shell)?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();runFormula(shell)}});if(kind==='Excel')answer.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();$('#practiceCheck')?.click()}});
syncMode();}
function afterRun(){const shell=$('.ide-shell');if(!shell)return;const feedback=$('#practiceFeedback');const console=$('#arenaConsole');if(kind==='Excel'){runFormula(shell)}
else if(console){const panel=$('#ideConsoleMount',shell);if(panel&&panel!==console)panel.replaceWith(console);const result=$('#arenaResults');if(result){const mount=$('#ideResultsMount',shell);if(mount&&!mount.contains(result))mount.append(result);result.hidden=false;result.querySelectorAll('thead th').forEach(th=>{if(th.querySelector('.ide-type'))return;const name=th.textContent;const values=[...result.querySelectorAll('tbody tr')].map(row=>row.children[Array.from(th.parentNode.children).indexOf(th)]?.textContent);const dtype=/date/i.test(name)?'date':values.length&&values.every(v=>v!==''&&!isNaN(Number(v)))?'num':'str';th.innerHTML=`<span class="ide-type">[${dtype}]</span> ${esc(name)}`;});}}
const bad=feedback?.querySelector('.needs');if(bad){$('#ideConsoleMount',shell)?.insertAdjacentHTML('beforeend',`<div class="ide-validation">${esc(bad.textContent)}</div>`)}activatePanel('results')}
const observer=new MutationObserver(()=>{const node=$('#practiceFeedback');if(node&&node.dataset.ideObserved!=='yes'){node.dataset.ideObserved='yes';new MutationObserver(()=>{if($('.ide-shell'))queueMicrotask(afterRun)}).observe(node,{childList:true,subtree:true});}});observer.observe(document.querySelector('#practiceDetail'),{childList:true,subtree:false});
function boot(){const area=$('#practiceDetail');if(!area)return;install();new MutationObserver(()=>{if(!$('.ide-shell',area)&&$('#practiceAnswer',area)&&['SQL','Excel','Python'].includes(area.dataset.activeEditor))install()}).observe(area,{childList:true});} document.addEventListener('dalp:arena-editor-selected',install);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
