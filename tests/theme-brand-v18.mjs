import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {root,discoverPages,pageLayout,requireAsset} from './page-assets.mjs';
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const pages=discoverPages();
assert(pages.length>0,'No HTML pages discovered');
for(const page of pages){
 const layout=pageLayout(page);
 if(layout==='catalog'){
   requireAsset(assert,page,'learning-catalog-v97.css');
   requireAsset(assert,page,'learning-catalog-v97.js','scripts');
 }else{
   requireAsset(assert,page,'theme-control-v14.js','scripts');
   if(layout==='full')requireAsset(assert,page,'theme-speed-brand-v18.css');
   else requireAsset(assert,page,'theme-foundation-v65.css');
 }
}
for(const name of ['excel','sql','powerbi']){
 const html=read(`courses/${name}.html`);
 assert.equal((html.match(/sidebar-company-logo/g)||[]).length,0,`${name}: duplicated global brand image`);
 assert.equal((html.match(/class="lp-icon small"/g)||[]).length,1,`${name}: missing/duplicated course icon`);
 assert.equal((html.match(/class="course-brand-shell"/g)||[]).length,1,`${name}: missing/duplicated course title`);
}
const theme=read('assets/theme-control-v14.js');
for(const token of ["setTheme(read())","select.addEventListener('change'","localStorage.setItem(KEY,pref)","root.dataset.theme=dark?'dark':'light'"])
 assert(theme.includes(token),`assets/theme-control-v14.js: missing immediate/persisted theme behavior ${token}`);
const css=read('assets/theme-speed-brand-v18.css');
assert(css.includes('transition-property:transform,opacity,filter'),'v18 brand transition regression');
console.log(`PASS v18: ${pages.length} discovered pages, correct layout-specific theme assets, course brands, and live theme selection`);
