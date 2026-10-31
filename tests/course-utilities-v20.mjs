import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';
import {root,discoverPages,pageLayout,requireAsset} from './page-assets.mjs';
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const pages=discoverPages();
assert(pages.length>0,'No HTML pages discovered');
const script=read('assets/course-utilities-v20.js');
const coach=read('assets/learner-companion.js');
const sync=read('assets/course-sync.js');
const css=read('assets/course-utilities-v20.css');
for(const page of pages){
 const {route,html}=page;
 if(pageLayout(page)==='full')requireAsset(assert,page,'course-utilities-v20.css');
 else requireAsset(assert,page,pageLayout(page)==='catalog'?'learning-catalog-v97.css':'responsive-v2.css');
 assert(!/<a\b[^>]*style="position:fixed;[^">]*"[^>]*>⚡ Practice Arena<\/a>/.test(html),`${route}: floating Practice Arena remains`);
 if(route.startsWith('courses/')){
   requireAsset(assert,page,'course-utilities-v20.js','scripts');
   requireAsset(assert,page,'learner-companion.js','scripts');
 }
}
assert(script.includes("first.insertAdjacentElement('beforebegin',strip)"),'Course toolbar should be in page flow, before course hero');
assert(coach.includes("strip.prepend(launch)"),'Coach not in course toolbar');
assert(coach.includes("head.insertAdjacentElement('afterend',launch)"),'Coach not at top of mobile drawer');
assert(coach.includes('backdrop.addEventListener'),'Backdrop dismissal missing');
assert(coach.includes("e.key==='Escape'"),'Keyboard dismissal missing');
assert(sync.includes("slot.className='dlp-sync-slot'"),'Save status is not in toolbar');
assert(!sync.includes('position:fixed;right:18px'),'Legacy fixed save badge remains');
assert(css.includes('position:static!important')&&css.includes('html[data-theme="dark"]'),'Toolbar position or dark mode not covered');
console.log(`PASS v20 course utilities: ${pages.length} discovered pages, toolbar on full layouts, inline learner coach and sync`);
