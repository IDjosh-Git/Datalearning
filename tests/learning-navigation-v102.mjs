/* v102: prevent mobile duplicate nav on homepage and six course pages. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {root,discoverPages,assertReferences} from './page-assets.mjs';
const pages=discoverPages();
assertReferences(assert,pages);
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
// Keep the v97 module on the dashboard: its account() flow dispatches
// auth-ready and syncs existing learner progress. Only its UI is redundant.
for(const asset of ['assets/learning-catalog-v97.js','assets/catalog-data-v97.js','assets/learning-catalog-v97.css']){
 assert(home.includes(asset),`index.html: required v97 account/progress module missing (${asset})`);
}
for(const asset of ['assets/workspace-shell.js','assets/workspace-shell.css'])
 assert(home.includes(asset),`index.html: shared workspace navigation missing ${asset}`);
const css=fs.readFileSync(path.join(root,'assets/learning-catalog-v97.css'),'utf8');
assert(css.includes('body.lp-home.dlp97-learning-page .dlp97-navigation{display:none}'),
 'Dashboard must visually suppress its redundant v97 sidebar without changing v97 auth or progress code');
assert(css.includes('body.lp-home.dlp97-learning-page{padding-left:0!important}'),
 'Homepage must reclaim desktop width from its suppressed sidebar');
assert.match(css,/@media\(max-width:1100px\)\s*\{[\s\S]*?body\.dl-workspace\.dlp97-learning-page\s+\.dlp97-navigation\s*\{display:none\}/,
 'Course mobile views must hide the redundant v97 navigation only when shared workspace navigation is present');
const js=fs.readFileSync(path.join(root,'assets/workspace-shell.js'),'utf8');
for(const title of ['Introduction','Excel','SQL','Power BI','Python','AI Integration']){
 assert(js.includes(`'${title}'`),`Workspace More menu is missing course destination ${title}`);
}
for(const slug of ['introduction','excel','sql','powerbi','python','ai']){
 const page=pages.find(p=>p.route===`courses/${slug}.html`);
 assert(page,`Course page missing: ${slug}`);
 for(const asset of ['assets/workspace-shell.js','assets/learning-catalog-v97.js','assets/learning-catalog-v97.css']){
  const link=page.links.some(x=>x.path===asset)||page.scripts?.some(x=>x.path===asset);
  assert(link,`${page.route}: expected course navigation/roadmap asset ${asset}`);
 }
}
const catalog=pages.find(p=>p.route==='catalog.html');
assert(catalog,'Standalone catalog missing');
assert(catalog.html.includes('learning-catalog-v97.js')&&!catalog.html.includes('workspace-shell.js'),
 'Standalone catalog must retain its own accessible drawer without a duplicate workspace header');
console.log(`PASS v102 mobile navigation scope: homepage keeps auth sync but only workspace navigation visible, catalog standalone, 6 courses retain roadmap and single mobile menu; ${pages.length} discovered pages`);
