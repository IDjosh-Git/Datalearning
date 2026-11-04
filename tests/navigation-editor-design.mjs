import assert from 'node:assert/strict';
import fs from 'node:fs';
import {discoverPages} from './page-assets.mjs';
const css=fs.readFileSync('assets/styles/modern-workspace-20261104.css','utf8');
const pages=discoverPages();
let publicCount=0;
for(const page of pages){
 const txt=fs.readFileSync(page.route,'utf8');
 const nav=txt.match(/<nav[^>]+class="dalp-global-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
 if(!nav)continue; publicCount++;
 assert.equal((nav.match(/<a /g)||[]).length,10,`${page.route}: all ten destinations must remain reachable`);
 assert.match(nav,/<details class="dalp-study-tools"/);
 assert.match(nav,/<summary[^>]*>.*?Study tools/s);
 assert.match(nav,/Practice Arena/);assert.match(nav,/Learning Lab/);assert.match(nav,/AI Tutor/);
}
assert.match(css,/min-height:620px!important/);
assert.match(css,/height:clamp\(620px,72vh,820px\)!important/);
assert.match(css,/max-width:1130px/);
console.log(`PASS grouped navigation and full-height editor on ${publicCount} public routes`);
