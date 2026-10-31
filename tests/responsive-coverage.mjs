import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {root,discoverPages,assertReferences,pageLayout,has,requireAsset,requireOrder} from './page-assets.mjs';
const pages=discoverPages();
assert(pages.length>0,'No HTML pages found recursively');
assertReferences(assert,pages);
for(const page of pages){
  const layout=pageLayout(page);
  requireAsset(assert,page,'text-contrast-v98.css');
  assert.equal(page.links.at(-1)?.path,'assets/text-contrast-v98.css',
    `${page.route}: v98 contrast layer must be the final stylesheet (document order)`);
  if(layout==='catalog'){
    assert.match(page.html,/<body\b[^>]*\bdlp97-catalog-page\b/i,`${page.route}: catalog layout landmark missing`);
    assert.match(page.html,/<h1\s+id="catalog-title">/i,`${page.route}: catalog heading missing`);
    requireAsset(assert,page,'learning-catalog-v97.css');
    requireAsset(assert,page,'learning-catalog-v97.js','scripts');
    requireOrder(assert,page,'learning-catalog-v97.css','text-contrast-v98.css');
  }else{
    assert.equal(page.body['data-responsive-page'],page.route.replace(/\.html$/,''),
      `${page.route}: shared responsive layout identifier must match its route`);
    for(const asset of ['responsive-v2.css','mobile-experience-v13.css','theme-foundation-v65.css','accessibility-v23.css','learning-polish-v96.css'])
      requireAsset(assert,page,asset);
    requireAsset(assert,page,'responsive-v2.js','scripts');
    requireAsset(assert,page,'theme-control-v14.js','scripts');
    requireOrder(assert,page,'theme-foundation-v65.css','text-contrast-v98.css');
    requireOrder(assert,page,'learning-polish-v96.css','text-contrast-v98.css');
    if(layout==='full'){
      for(const asset of ['mobile-finish-v14.css','responsive-system-v15.css','theme-navigation-v16.css'])requireAsset(assert,page,asset);
      requireOrder(assert,page,'mobile-experience-v13.css','mobile-finish-v14.css');
      requireOrder(assert,page,'mobile-finish-v14.css','responsive-system-v15.css');
      requireOrder(assert,page,'responsive-system-v15.css','theme-navigation-v16.css');
    }
  }
}
const css=fs.readFileSync(path.join(root,'assets/responsive-v2.css'),'utf8');
for(const rule of ['max-width:1100px','max-width:900px','max-width:760px','max-width:600px','max-width:370px','max-height:500px','prefers-reduced-motion'])
  assert(css.includes(rule),`assets/responsive-v2.css: missing layout condition ${rule}`);
for(const section of ['.lp-hero','.tutor-grid','.pc-layout','.auth-layout','.review-shell','.cap-layout','.studio-content','.ip-stats','.lp-ai-page'])
  assert(css.includes(section),`assets/responsive-v2.css: missing page adaptation ${section}`);
const nav=fs.readFileSync(path.join(root,'assets/responsive-v2.js'),'utf8');
assert(nav.includes('Escape')&&nav.includes('aria-expanded'),'assets/responsive-v2.js: keyboard navigation must expose Escape handling and aria-expanded');
const catalogCSS=fs.readFileSync(path.join(root,'assets/learning-catalog-v97.css'),'utf8');
for(const token of ['@media(max-width:1100px)','@media(max-width:720px)','@media(prefers-reduced-motion:reduce)','html[data-theme="dark"]',':focus-visible'])
  assert(catalogCSS.includes(token),`assets/learning-catalog-v97.css: catalog responsive/theme/a11y rule missing: ${token}`);
console.log(`PASS responsive relationships: ${pages.length} discovered HTML pages; every CSS URL resolves; shared, compact, and standalone catalog responsive/theme/contrast stacks checked`);
