import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {root,discoverPages,pageLayout,requireAsset,requireOrder} from './page-assets.mjs';
const pages=discoverPages();
assert(pages.length>0,'No HTML pages found');
for(const page of pages){
 const layout=pageLayout(page);
 if(layout==='catalog'){
   requireAsset(assert,page,'learning-catalog-v97.css');
   continue;
 }
 requireAsset(assert,page,'theme-control-v14.js','scripts');
 if(layout==='full'){
   requireAsset(assert,page,'responsive-system-v15.css');
   requireOrder(assert,page,'mobile-finish-v14.css','responsive-system-v15.css');
 }else requireAsset(assert,page,'responsive-v2.css');
}
const css=fs.readFileSync(path.join(root,'assets/responsive-system-v15.css'),'utf8');
for(const token of ['max-width:359px','max-width:760px','min-width:761px','min-width:1450px','safe-area-inset-bottom','dalpThemeToggle','account-studio-link','cw-weekstrip','focus-visible'])assert(css.includes(token),`assets/responsive-system-v15.css: missing adaptive rule: ${token}`);
const js=fs.readFileSync(path.join(root,'assets/theme-control-v14.js'),'utf8');
assert(js.includes('dlp-appearance-row')&&!js.includes('ensureReachable'),'assets/theme-control-v14.js: appearance control must remain in flow without floating fallback');
console.log(`PASS v15: ${pages.length} discovered pages; full-layout adaptive rules, compact-page legacy responsive CSS, standalone catalog CSS`);
