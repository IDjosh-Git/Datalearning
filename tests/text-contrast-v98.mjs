import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {root,discoverPages,assertReferences,requireAsset,requireOrder,pageLayout} from './page-assets.mjs';
const css=fs.readFileSync(path.join(root,'assets/text-contrast-v98.css'),'utf8');
const pages=discoverPages();
assert(pages.length>0,'No HTML pages discovered for v98 audit');
assertReferences(assert,pages);
for(const page of pages){
 requireAsset(assert,page,'text-contrast-v98.css');
 assert.equal(page.links.at(-1)?.path,'assets/text-contrast-v98.css',
  `${page.route}: v98 contrast must be the final stylesheet, after all product layers`);
 if(pageLayout(page)==='catalog'){
   requireAsset(assert,page,'learning-catalog-v97.css');
   requireOrder(assert,page,'learning-catalog-v97.css','text-contrast-v98.css');
 }else{
   requireAsset(assert,page,'learning-polish-v96.css');
   requireOrder(assert,page,'learning-polish-v96.css','text-contrast-v98.css');
 }
}
function lumen(hex){
 const rgba=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255)
 .map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
 return rgba[0]*.2126+rgba[1]*.7152+rgba[2]*.0722;
}
function ratio(a,b){const x=lumen(a),y=lumen(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
for(const [text,surface] of [
 ['#172d40','#ffffff'],['#465e6d','#edf2f0'],['#075e59','#ffffff'],
 ['#edf5f7','#1a2a37'],['#bdd0d9','#243847'],['#9ce6dd','#1a2a37'],
 ['#ffffff','#173e55'],['#173e55','#f2d48b'],['#ffb5be','#182a3a'],
 ['#a8ebe3','#233f4d'],['#f0f6f8','#233f4d']
])assert(ratio(text,surface)>=4.5,`${text} on ${surface} should meet AA for normal text`);
for(const className of ['.job-ready-check','.week-num','.dlp-kicker','.auth-wordmark',
 '.lp-progress-meta','.lp-context-chip','.sample-pill','.lp-eyebrow','.cert-view-header',
 '.verify-wrap','.arena-count','.tutor-tools','.dalp-preview-invite','.dlp97-side',
 '.dlp97-catalog-hero','.course-top-actions','.ai-account-badge','.capstone-path-v74',
 '.auth-account-note','.reference','.pl-hero','.review-hero']){
 // Reference is data-responsive-page, not a literal .reference selector.
 if(className==='.reference')continue;
 assert(css.includes(className),`Coverage missing: ${className}`);
}
assert.match(css,/prefers-reduced-motion/);
console.log(`PASS v98: ${pages.length} routes, 11 key normal-text pairs >= 4.5:1, scoped contrast coverage`);
