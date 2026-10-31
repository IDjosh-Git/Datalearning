import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {root,discoverPages,pageLayout,requireAsset} from './page-assets.mjs';
const pages=discoverPages();
assert(pages.length>0,'No HTML pages found');
for(const page of pages){
 if(pageLayout(page)==='catalog'){
   requireAsset(assert,page,'learning-catalog-v97.js','scripts');
   requireAsset(assert,page,'learning-catalog-v97.css');
 }else{
   requireAsset(assert,page,'theme-control-v14.js','scripts');
   if(pageLayout(page)==='full')requireAsset(assert,page,'theme-navigation-v16.css');
   else requireAsset(assert,page,'theme-foundation-v65.css');
 }
}
const theme=fs.readFileSync(path.join(root,'assets/theme-control-v14.js'),'utf8');
for(const token of ["select.id='dalpThemeSelect'","localStorage.setItem(KEY,pref)",".auth-top-actions",".ac-top-actions",".dl-shell-actions", "label.htmlFor='dalpThemeSelect'", "root.dataset.theme=dark?'dark':'light'"])
 assert(theme.includes(token),`assets/theme-control-v14.js: missing ${token}`);
assert(!theme.includes('dlp-theme-floating'),'The theme control must not float over content');
const shell=fs.readFileSync(path.join(root,'assets/workspace-shell.js'),'utf8');
for(const token of ['Explore learning','More tools','dalp:auth-ready','.dl-drawer-close'])
 assert(shell.includes(token),`assets/workspace-shell.js: missing ${token}`);
const admin=fs.readFileSync(path.join(root,'assets/admin-console.js'),'utf8');
for(const token of ['ac-drawer-close','ac-menu-open'])
 assert(admin.includes(token),`assets/admin-console.js: missing ${token}`);
const css=fs.readFileSync(path.join(root,'assets/theme-navigation-v16.css'),'utf8');
for(const token of ['@media(max-width:950px)','body.dl-workspace .dl-shell-nav','html[data-theme="dark"]','dlp-appearance-brand'])
 assert(css.includes(token),`assets/theme-navigation-v16.css: missing ${token}`);
console.log(`PASS v16 theme/nav structure: ${pages.length} discovered pages; current select-based appearance control and responsive drawers`);
