/** Unified Practice Arena: three editor modes, one existing runtime each, same responsive shell. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync('practice.html','utf8');
const ide=fs.readFileSync('assets/scripts/arena-ide.js','utf8');
const practice=fs.readFileSync('assets/scripts/practice.js','utf8');
const mobile='';
const css=fs.readFileSync('assets/styles/practice-arena-premium-final.css','utf8');
assert(html.includes('practice-arena-premium-final.css?v=20261111-mobile-sql-light-r1'), 'Unified theme must load with fresh asset revision');
assert(html.includes('arena-ide.js?v=arena-unified-20261111-r1'), 'Unified editor JS must load with fresh revision');
assert(html.includes('practice.js?v=arena-unified-20261111-r1'), 'Challenge selection controller must load with fresh revision');
assert.equal((practice.match(/class="arena-learning-brief"/g)||[]).length,1, 'Only one top challenge brief allowed');
for(const subject of ['SQL','Excel','Python']){
 assert(ide.includes(`id="ide${subject==='SQL'?'Sql':subject}Mode"`), `Missing ${subject} mode button`);
 assert(ide.includes(`subject==='${subject}'`)||ide.includes(`kind==='${subject}'`), `Missing ${subject} selection state`);
}
assert.equal((ide.match(/class="ide-brand-mark"/g)||[]).length,3, 'Each tool uses a compact icon badge');
assert(ide.includes("if(!['SQL','Excel','Python'].includes(subject))return"), 'Single IDE must support all three subjects');
for(const token of ["slot.append(lab)","runtime.append(runtimeState)","buttons.append(actions)","mount.append(output)","#pythonCode',shell", 'window.DALP_ARENA_IDE={restorePython:restorePythonLab}'])
 assert(ide.includes(token), `Missing Python editor integration or restoration: ${token}`);
assert(practice.includes('window.DALP_ARENA_IDE?.restorePython?.()'),'Python controls must be restored before changing tasks');
assert(practice.includes('gradeSource.value')&&practice.includes('source.value=e.target.value'),'Python grade source remains synced with editor');
assert(!html.includes('arena-mobile-depth.js'),'Old duplicate mobile run dock must not be loaded');
assert(css.includes('#ideRun{display:inline-flex!important;}'),'Canonical Run Query control must remain visible on mobile');
for(const token of ['--ar-v3-brand:var(--ui-primary', '#ideEditorSlot', '#ideResultsMount', '.ide-python-lab', '#pythonCode', '#pythonOutput', '.arena-mobile-action', '@media(max-width:650px)', '@media(max-width:380px)', 'prefers-reduced-motion:reduce'])
 assert(css.includes(token),`Missing shared responsive theme feature: ${token}`);
for(const file of ['assets/scripts/arena-ide.js','assets/scripts/practice.js','assets/scripts/arena-ide.js'])new vm.Script(fs.readFileSync(file,'utf8'),{filename:file});
console.log('PASS Unified Practice Arena: three modes, preserved worker and grade path, shared theme, correctly labelled mobile controls');
