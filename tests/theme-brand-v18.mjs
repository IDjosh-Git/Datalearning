import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const pages=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')),...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>'courses/'+f)];
assert.equal(pages.length,23);
for(const page of pages){
 const h=read(page); const prefix=page.startsWith('courses/')?'../':'';
 assert.equal(h.split(`${prefix}assets/theme-speed-brand-v18.css?v=20261022.18`).length-1,1,`${page}: no v18 CSS`);
 assert.equal(h.split(`${prefix}assets/theme-control-v14.js?v=20261022.18`).length-1,1,`${page}: stale theme controller`);
}
for(const name of ['excel','sql','powerbi']){
 const html=read(`courses/${name}.html`);
 assert.equal((html.match(/sidebar-company-logo/g)||[]).length,0,`${name}: duplicated global brand image`);
 assert.equal((html.match(/class="lp-icon small"/g)||[]).length,1,`${name}: missing or duplicated subject icon`);
 assert.equal((html.match(/class="course-brand-shell"/g)||[]).length,1,`${name}: missing course title`);
}
const theme=read('assets/theme-control-v14.js');
assert(theme.includes('apply(mode);') && theme.includes('setTimeout(()=>{writeHandle=0;try{localStorage.setItem(KEY,mode)')); 
const css=read('assets/theme-speed-brand-v18.css');
assert(css.includes('transition-property:transform,opacity,filter'));
console.log('PASS v18: 22 current theme assets, three unique course sidebar brands, single per-course icon, immediate palette changes');
