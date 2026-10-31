import assert from 'node:assert/strict';
import {discoverPages,pageLayout,requireAsset} from './page-assets.mjs';
const pages=discoverPages();
assert(pages.length>0,'No HTML pages discovered');
for(const page of pages){
 const script=page.html.indexOf('id="dalp-theme-prepaint"');
 assert(script>=0,`${page.route}: missing early light/dark prepaint`);
 if(pageLayout(page)==='catalog'){
   requireAsset(assert,page,'learning-catalog-v97.css');
   assert(script<page.html.indexOf('learning-catalog-v97.css'),`${page.route}: prepaint must precede catalog CSS`);
 }else{
   requireAsset(assert,page,'theme-foundation-v65.css');
   const css=page.html.indexOf('theme-foundation-v65.css');
   assert(css>script,`${page.route}: theme prepaint must precede foundation CSS`);
   if(pageLayout(page)==='full'||page.route==='preview.html')
     requireAsset(assert,page,'theme-bridge-v65.js','scripts');
   else requireAsset(assert,page,'theme-control-v14.js','scripts');
 }
}
console.log(`PASS theme prepaint: ${pages.length} discovered pages bootstrap theme before their active CSS`);
