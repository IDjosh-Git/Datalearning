import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {root,discoverPages,pageLayout,requireAsset} from './page-assets.mjs';
import {join} from 'node:path';
const read=p=>readFileSync(join(root,p),'utf8');
const pages=discoverPages();
assert(pages.length>0,'No HTML pages discovered');
for(const page of pages){
 if(pageLayout(page)==='catalog'){
  // v97 catalog has its own focus/skip-link/navigation rules and scripts.
  requireAsset(assert,page,'learning-catalog-v97.css');
  requireAsset(assert,page,'learning-catalog-v97.js','scripts');
  assert(page.html.includes('id="main-content"'),`${page.route}: missing skip-link target`);
 }else{
  requireAsset(assert,page,'accessibility-v23.css');
  requireAsset(assert,page,'accessibility-v23.js','scripts');
 }
}
const css=read('assets/accessibility-v23.css'), js=read('assets/accessibility-v23.js'), sw=read('service-worker-v23.js');
assert.match(css,/min-height: 48px/);
assert.match(css,/:focus-visible/);
assert.match(css,/prefers-reduced-motion/);
assert.match(js,/Skip to main content/);
const catalogCSS=read('assets/learning-catalog-v97.css'),catalogJS=read('assets/learning-catalog-v97.js');
assert(catalogCSS.includes(':focus-visible')&&catalogCSS.includes('prefers-reduced-motion'), 'Catalog requires focus and reduced-motion safeguards');
assert(catalogJS.includes('dlp97-skip')&&catalogJS.includes("ev.key==='Escape'"), 'Catalog requires a skip link and keyboard-close behavior');
assert.match(sw,/PRIVATE\.test\(url\.pathname\)/);
assert.match(sw,/req\.method!=='GET'/);
assert.match(read('api/auth/session.js'),/Session verification is temporarily unavailable/);
assert.match(read('assets/progress-cloud.js'),/Invalid course unit/);
console.log(`PASS accessibility v23/v97: ${pages.length} discovered pages, shared and catalog-specific focus/keyboard/skip support, cache and progress guards`);
