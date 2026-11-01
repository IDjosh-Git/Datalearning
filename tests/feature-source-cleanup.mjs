/** Public feature cleanup regression: preserves data, unique knowledge records,
 * public navigation and feature scripts while preventing removed legacy markup. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8');
const features={
 'practice.html':['practice.css','practice.js','practice-data.js'],
 'tutor.html':['tutor.css','tutor.js','tutor-ai.js'],
 'reference.html':['reference.css','reference.js','reference-data.js'],
 'prompt-library.html':['prompt-library.css','prompt-library.js','prompt-library-data.js'],
 'learning-lab.html':['learning-lab-layout.css','learning-lab.js','offline-knowledge.js']
};
for(const [page,assets] of Object.entries(features)){
 const html=read(page);
 assert.equal((html.match(/class="dalp-global-header"/g)||[]).length,1,`${page}: one public header`);
 assert.equal((html.match(/class="dalp-global-nav"/g)||[]).length,1,`${page}: one primary navigation`);
 for(const file of assets)assert(html.includes(file),`${page} must keep ${file}`);
 assert(html.includes('design-system.css'),`${page}: current visual system`);
 assert(!/<script\s*>\s*<\/script>/i.test(html),`${page}: empty scripts`);
}
assert(!read('practice.html').includes('arena-start-guide'),'redundant practice onboarding removed');
assert(read('practice.html').includes('id="practiceDetail"'),'live challenge workspace preserved');
assert(read('practice.html').includes('id="pythonLab"'),'Python Lab preserved');
assert(read('reference.html').includes('reference-title-accent'),'reference heading uses managed styles');
assert(!read('reference.html').includes('style="color:var(--mint)"'),'outdated inline teal title removed');
assert(!read('learning-lab.html').includes('<style>'),'Q&A styles should live in CSS, not embedded HTML');
assert(read('assets/styles/learning-lab-layout.css').includes('.lab-card'),'Q&A card layout preserved');
assert(read('assets/styles/learning-lab-layout.css').includes('background:#29476b'),'Q&A action uses slate palette');
const ctx={window:{}};vm.createContext(ctx);
for(const name of ['offline-knowledge.js','reference-data.js','prompt-library-data.js','practice-data.js','practice-extra.js']){
 vm.runInContext(read('assets/scripts/'+name),ctx,{filename:name});
}
for(const [name,arr,expected,key] of [
 ['Guided Q&A',ctx.window.DALP_KNOWLEDGE,559,'question'],
 ['Formula reference',ctx.window.IJ_REFERENCE,603,'title'],
 ['Prompt library',ctx.window.DALP_PROMPTS,300,'title'],
 ['Practice challenges',ctx.window.DALP_PRACTICE,95,'id'],
]){
 assert(Array.isArray(arr)&&arr.length===expected,`${name}: complete data preserved`);
 const seenIds=new Set();const seenTitles=new Set();
 for(const r of arr){
  if(r.id){assert(!seenIds.has(r.id),`${name}: duplicate id ${r.id}`);seenIds.add(r.id)}
  if(key==='id')continue;const t=(r[key]||'').trim().toLowerCase().replace(/\s+/g,' ');
  assert(!seenTitles.has(t),`${name}: duplicate ${key} ${t}`);seenTitles.add(t)
 }
}
console.log('PASS feature cleanup: public nav, live tools, 559 Q&A items, 603 formulas, 300 prompts, 95 challenges; legacy overlays/inline styles removed');
