import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {root,discoverPages,pageLayout,requireAsset,requireOrder} from './page-assets.mjs';
const pages=discoverPages();
assert(pages.length>0,'No HTML pages discovered');
for(const page of pages){
 if(pageLayout(page)==='catalog'){
   requireAsset(assert,page,'learning-catalog-v97.css'); // Standalone responsive catalog
   continue;
 }
 requireAsset(assert,page,'mobile-experience-v13.css');
 requireAsset(assert,page,'responsive-v2.css');
 requireAsset(assert,page,'text-contrast-v98.css');
 requireOrder(assert,page,'mobile-experience-v13.css','text-contrast-v98.css');
 // v13 remains active, but newer responsive/contrast layers intentionally follow it.
 if(pageLayout(page)==='full')requireOrder(assert,page,'mobile-experience-v13.css','mobile-finish-v14.css');
 assert(page.viewport,`${page.route}: missing viewport`);
}
const css=fs.readFileSync(path.join(root,'assets/mobile-experience-v13.css'),'utf8');
for(const token of ['max-width:359px','max-width:760px','min-width:761px','min-width:1200px','safe-area-inset-bottom','dl-mobile-tabs','ac-mobile-tabs','cw-week-controls','ps-page','auth-page','data-responsive-page="certificate"','data-responsive-page="verify"','prefers-reduced-motion'])
 assert(css.includes(token),`assets/mobile-experience-v13.css: missing mobile rule: ${token}`);
const shell=fs.readFileSync(path.join(root,'assets/workspace-shell.js'),'utf8');
assert(shell.includes('aria-label\',\'Mobile learning navigation'),'Mobile learning navigation must have an accessible label');
assert(shell.includes('dl-course-actions-toggle')&&shell.includes('More learning destinations'),'Mobile course actions/menu behavior missing');
const admin=fs.readFileSync(path.join(root,'assets/admin-console.js'),'utf8');
assert(admin.includes('Mobile administration navigation')&&admin.includes('selectMobile'),'Mobile administration navigation behavior missing');
console.log(`PASS v13: ${pages.length} discovered pages; legacy responsive layer where used, mobile navigation behaviors, and standalone catalog support`);
