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
   assert.match(page.html,/id="dalp-theme-prepaint"/,`${page.route}: system/light/dark prepaint missing`);
   continue;
 }
 requireAsset(assert,page,'theme-control-v14.js','scripts');
 if(layout==='full'){
   requireAsset(assert,page,'mobile-finish-v14.css');
   requireOrder(assert,page,'mobile-experience-v13.css','mobile-finish-v14.css');
 }else{
   requireAsset(assert,page,'mobile-experience-v13.css');
 }
}
const js=fs.readFileSync(path.join(root,'assets/theme-control-v14.js'),'utf8');
for(const expected of ['.dl-shell-actions','.ac-top-actions','.auth-top-actions','localStorage.setItem','aria-label','dalpThemeSelect','dlp-theme-select','storage','colorScheme'])assert(js.includes(expected),`assets/theme-control-v14.js: missing ${expected}`);
const css=fs.readFileSync(path.join(root,'assets/mobile-finish-v14.css'),'utf8');
for(const expected of ['max-width:359px','max-width:760px','min-width:1280px','safe-area-inset-bottom','focus-visible','dlp-theme-control','ac-topbar','cw-week-context','ps-page','dalp-account-page'])assert(css.includes(expected),`assets/mobile-finish-v14.css: missing ${expected}`);
console.log(`PASS v14: ${pages.length} discovered pages; theme controllers on shared pages and v14 mobile finish on full-layout pages`);
