import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {root,discoverPages,pageLayout,requireAsset,requireOrder} from './page-assets.mjs';
const pages=discoverPages();
assert(pages.length>0,'No HTML pages found');
for(const page of pages){
 const layout=pageLayout(page);
 if(layout==='catalog'){
   requireAsset(assert,page,'learning-catalog-v97.css');
   requireAsset(assert,page,'learning-catalog-v97.js','scripts');
   assert(page.html.includes('id="dalp-theme-prepaint"'),`${page.route}: theme prepaint missing`);
 }else{
   requireAsset(assert,page,'theme-control-v14.js','scripts');
   if(layout==='full'){
     requireAsset(assert,page,'theme-navigation-v16.css');
     requireOrder(assert,page,'responsive-system-v15.css','theme-navigation-v16.css');
     requireOrder(assert,page,'theme-navigation-v16.css','text-contrast-v98.css');
   }else requireAsset(assert,page,'theme-foundation-v65.css');
 }
 assert(!page.html.includes('</link>'),`${page.route}: invalid closing </link> tag`);
}
const theme=fs.readFileSync(path.join(root,'assets/theme-control-v14.js'),'utf8');
assert(!theme.includes('ensureReachable')&&!theme.includes('dlp-theme-floating'),'Appearance controls must not float over content');
for(const token of ['dalpThemeSelect','dlp-appearance-row','localStorage.setItem','prefers-color-scheme','storage','colorScheme','label.htmlFor','select.addEventListener(\'change\''])
 assert(theme.includes(token),`assets/theme-control-v14.js: missing accessible appearance behavior ${token}`);
const modern=fs.readFileSync(path.join(root,'assets/modern.js'),'utf8');
assert(!modern.includes("createElement('button')"),'Legacy script should not generate an extra theme button');
const shell=fs.readFileSync(path.join(root,'assets/workspace-shell.js'),'utf8');
for(const token of ['dl-drawer-head','dl-drawer-close','dl-drawer-open','navParent.insertBefore(nav,navNext)','document.body.appendChild(nav)','aria-expanded'])
 assert(shell.includes(token),`assets/workspace-shell.js: missing drawer behavior ${token}`);
const admin=fs.readFileSync(path.join(root,'assets/admin-console.js'),'utf8');
for(const token of ['ac-drawer-close','drawerPreviousFocus','aria-expanded'])
 assert(admin.includes(token),`assets/admin-console.js: missing drawer behavior ${token}`);
const css=fs.readFileSync(path.join(root,'assets/theme-navigation-v16.css'),'utf8');
for(const token of ['max-width:950px','max-width:760px','max-width:359px','dl-drawer-head','auth-page:has(#loginBtn)','data-theme="dark"','ac-ready','min-width:951px'])
 assert(css.includes(token),`assets/theme-navigation-v16.css: missing theme/layout rule ${token}`);
const catalog=fs.readFileSync(path.join(root,'assets/learning-catalog-v97.js'),'utf8');
for(const token of ['dlp97-theme-toggle','aria-expanded',"ev.key==='Escape'",'localStorage'])
 assert(catalog.includes(token),`assets/learning-catalog-v97.js: missing standalone catalog theme/navigation behavior ${token}`);
console.log(`PASS v16 theme/nav: ${pages.length} discovered pages, in-flow appearance controls, drawer accessibility, and standalone catalog theme`);
