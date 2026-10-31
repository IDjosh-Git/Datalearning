import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {root,discoverPages,assertReferences,requireAsset,requireOrder,pageLayout} from './page-assets.mjs';

const pages=discoverPages();
assert(pages.length>0,'v99 design: no HTML pages discovered recursively');
assertReferences(assert,pages);
for (const page of pages){
  requireAsset(assert,page,'premium-design-v99.css');
  requireAsset(assert,page,'text-contrast-v98.css');
  requireOrder(assert,page,'premium-design-v99.css','text-contrast-v98.css');
  const premium=page.links.filter(x=>x.path==='assets/premium-design-v99.css');
  assert.equal(premium.length,1,`${page.route}: expected exactly one premium v99 stylesheet`);
  const contrast=page.links.filter(x=>x.path==='assets/text-contrast-v98.css');
  assert.equal(contrast.length,1,`${page.route}: expected exactly one v98 contrast stylesheet`);
  assert.equal(page.links.at(-2)?.path,'assets/premium-design-v99.css',`${page.route}: premium v99 must immediately precede contrast v98`);
  assert.equal(page.links.at(-1)?.path,'assets/text-contrast-v98.css',`${page.route}: contrast v98 must remain the final stylesheet`);
  if(pageLayout(page)==='catalog')requireAsset(assert,page,'learning-catalog-v97.css');
  else requireAsset(assert,page,'theme-foundation-v65.css');
}
const css=fs.readFileSync(path.join(root,'assets/premium-design-v99.css'),'utf8');
for(const token of [
  '--background','--surface','--text-main','--text-muted','--border-subtle',
  '--primary','--learning-accent','--focus-ring','--nav-background'
])assert(css.includes(token),`premium v99: shared semantic token ${token} missing`);
for(const group of [
  'html[data-theme="light"]','html[data-theme="dark"]',
  '.dlp97-learning-page','.dlp97-catalog-hero','.lp-pathfinder',
  '.tutor-intro','.auth-story','.page-hero','.nav-shell',
  '@media(max-width:640px)','prefers-reduced-motion:reduce','@media print'
])assert(css.includes(group),`premium v99: expected page/theme/responsive treatment ${group} missing`);
const contrast=(a,b)=>{
 const luminance=h=>{
  const rgb=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
  return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
 };
 const x=luminance(a),y=luminance(b);
 return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
};
for(const [fg,bg] of [
 ['#182f3d','#ffffff'],['#4e6573','#ffffff'],['#096860','#ffffff'],
 ['#eff7f8','#122738'],['#c0d3d9','#122738'],['#91e1d4','#122738'],
 ['#ffffff','#163e50'],['#ffffff','#184c58'],['#07655e','#f4f7f8'],
 ['#9ce6dd','#091824']
])assert(contrast(fg,bg)>=4.5,`premium v99: normal text ${fg} on ${bg} is below 4.5:1`);
console.log(`PASS premium v99 design: ${pages.length} discovered pages, 1 consistent design stylesheet per page immediately before v98, light/dark/mobile/print coverage, key contrast pairs AA`);
