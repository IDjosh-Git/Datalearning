import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {root,discoverPages,pageLayout,requireAsset,assertReferences} from './page-assets.mjs';
const pages=discoverPages();
assert(pages.length>0,'No HTML pages discovered');
assertReferences(assert,pages);
for(const page of pages){
 if(pageLayout(page)==='full')requireAsset(assert,page,'theme-unified-v10.css');
 else if(pageLayout(page)==='compact')requireAsset(assert,page,'theme-foundation-v65.css');
 else requireAsset(assert,page,'learning-catalog-v97.css');
}
const s=fs.readFileSync(path.join(root,'assets/theme-unified-v10.css'),'utf8');
for(const token of ['html[data-theme="dark"]','--app-text','--app-muted','--app-surface','--app-line','--ui-course-max','cw-resources','cw-week-chip','cw-module','guided-lab','study-studio','intro-lesson','.badge'])
 assert(s.includes(token),`assets/theme-unified-v10.css: missing ${token}`);
for(const file of ['excel','sql','powerbi','ai','introduction']){
 const page=pages.find(p=>p.route===`courses/${file}.html`);
 assert(page&&page.html.includes('weekly-workspace.css'),`${file}: missing course navigator`);
}
console.log(`PASS v10 semantic theme: ${pages.length} discovered pages, shared/compact/catalog theme stacks, dark tokens, course workspace assets`);
