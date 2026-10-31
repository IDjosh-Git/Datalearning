/* v100 targeted regressions for reproduced small-screen layout defects. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {root,discoverPages,assertReferences,requireAsset,requireOrder} from './page-assets.mjs';
const pages=discoverPages();
assert(pages.length>0,'v100: no HTML pages discovered');
assertReferences(assert,pages);
for(const page of pages){
 requireAsset(assert,page,'premium-design-v99.css');
 requireAsset(assert,page,'text-contrast-v98.css');
 requireOrder(assert,page,'premium-design-v99.css','text-contrast-v98.css');
}
const premium=fs.readFileSync(path.join(root,'assets/premium-design-v99.css'),'utf8');
const catalog=fs.readFileSync(path.join(root,'assets/learning-catalog-v97.css'),'utf8');
for(const token of ['.pc-hero h1','.pc-brand-strip','.pc-brand-pill','grid-template-columns:repeat(2,minmax(0,1fr))','.dl-mobile-tabs .dl-tab.is-active','.dl-shell-actions .dlp-theme-select','safe-area-inset-bottom','max-height:480px']){
 assert(premium.includes(token),`v100: expected Practice/mobile-navigation treatment ${token}`);
}
for(const token of ['max-width:600px','.dlp97-search-row>input','.dlp97-search-row>label','.dlp97-search-row>select']){
 assert(catalog.includes(token),`v100 catalog: expected mobile filter relationship ${token}`);
}
assert.match(fs.readFileSync(path.join(root,'practice.html'),'utf8'),/class="pc-brand-strip"/, 'v100: Practice Arena heading/badge layout markup changed unexpectedly');
assert.match(fs.readFileSync(path.join(root,'catalog.html'),'utf8'),/id="dlp97-category"/, 'v100: catalog Subject control missing');
console.log(`PASS v100 targeted responsive source checks: ${pages.length} discovered pages, practice hero, catalog filters, jade navigation, responsive theme selector`);
