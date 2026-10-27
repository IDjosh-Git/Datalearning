import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=process.cwd();
const pages=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')),...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>'courses/'+f)];
assert.equal(pages.length,22);
for(const page of pages){
 const html=fs.readFileSync(path.join(root,page),'utf8');
 const rel=page.startsWith('courses/')?'../':'';
 assert.equal(html.split(`${rel}assets/theme-navigation-v16.css?v=20261022.16`).length-1,1,`${page}: v16 final CSS missing or duplicated`);
 assert.equal(html.split(`${rel}assets/theme-control-v14.js?v=20261022.18`).length-1,1,`${page}: theme controller missing or duplicated`);
 assert(!html.includes('</link>'),`${page}: invalid legacy closing LINK tag`);
}
const theme=fs.readFileSync(path.join(root,'assets/theme-control-v14.js'),'utf8');
assert(!theme.includes('ensureReachable'),'Old theme button fallback must not move the control over other page elements');
assert(!theme.includes("classList.add('dlp-theme-floating')"),'The theme button must never float over a header');
for(const text of ['dalpThemeToggle','dlp-appearance-row','localStorage.setItem','aria-pressed','prefers-color-scheme','storage'])assert(theme.includes(text),`Missing appearance behavior: ${text}`);
const modern=fs.readFileSync(path.join(root,'assets/modern.js'),'utf8');
assert(!modern.includes('createElement(\'button\')'),'Legacy script should not generate another theme button');
const shell=fs.readFileSync(path.join(root,'assets/workspace-shell.js'),'utf8');
for(const text of ['dl-drawer-head','dl-drawer-close','dl-drawer-open','navParent.insertBefore(nav,navNext)','document.body.appendChild(nav)','aria-expanded'])assert(shell.includes(text),`Missing learner drawer behavior: ${text}`);
const admin=fs.readFileSync(path.join(root,'assets/admin-console.js'),'utf8');
for(const text of ['ac-drawer-close','drawerPreviousFocus','aria-expanded'])assert(admin.includes(text),`Missing admin drawer behavior: ${text}`);
const css=fs.readFileSync(path.join(root,'assets/theme-navigation-v16.css'),'utf8');
for(const text of ['max-width:950px','max-width:760px','max-width:359px','dl-drawer-head','auth-page:has(#loginBtn)','data-theme="dark"','ac-ready','min-width:951px'])assert(css.includes(text),`Missing v16 theme/layout rule: ${text}`);
console.log('PASS v16: 22 updated routes, a single in-flow theme switch, repaired dark sign-in, 320–2560px side navigation and legacy-script cleanup');
