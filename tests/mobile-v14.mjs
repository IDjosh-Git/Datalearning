import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const pages=[...fs.readdirSync(root).filter(x=>x.endsWith('.html')),...fs.readdirSync(path.join(root,'courses')).filter(x=>x.endsWith('.html')).map(x=>'courses/'+x)];
assert.equal(pages.length,22);
for(const p of pages){const html=fs.readFileSync(path.join(root,p),'utf8');const prefix=p.startsWith('courses/')?'../':'';assert.equal(html.split(prefix+'assets/theme-control-v14.js?v=20261022.18').length-1,1,`Theme switch missing on ${p}`);assert.equal(html.split(prefix+'assets/mobile-finish-v14.css?v=20261022.14').length-1,1,`Responsive finishing layer missing on ${p}`)}
const js=fs.readFileSync(path.join(root,'assets/theme-control-v14.js'),'utf8');
for(const expected of ['.dl-shell-actions','.ac-top-actions','.auth-top-actions','localStorage.setItem','aria-label','theme-sun','theme-moon','storage','colorScheme'])assert(js.includes(expected));
const css=fs.readFileSync(path.join(root,'assets/mobile-finish-v14.css'),'utf8');
for(const expected of ['max-width:359px','max-width:760px','min-width:1280px','safe-area-inset-bottom','focus-visible','dlp-theme-control','ac-topbar','cw-week-context','ps-page','dalp-account-page'])assert(css.includes(expected));
console.log('PASS v14 theme and mobile consistency: all 22 pages, accessible theme controls, compact course/admin/learner layouts');
