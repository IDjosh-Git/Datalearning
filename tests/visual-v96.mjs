import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const get=file=>fs.readFileSync(path.join(root,file),'utf8');
import {discoverPages,assertReferences,pageLayout,requireAsset,requireOrder} from './page-assets.mjs';
const pages=discoverPages();
assert(pages.length>0,'No published HTML pages discovered for v96 visual checks');
assertReferences(assert,pages);
for(const page of pages){
  requireAsset(assert,page,'premium-design-v99.css');
  requireAsset(assert,page,'text-contrast-v98.css');
  requireOrder(assert,page,'premium-design-v99.css','text-contrast-v98.css');
  assert.equal(page.links.at(-2)?.path,'assets/premium-design-v99.css',`${page.route}: premium design layer must precede final contrast`);
  assert.equal(page.links.at(-1)?.path,'assets/text-contrast-v98.css',`${page.route}: missing final contrast audit layer`);
  if(pageLayout(page)==='catalog'){
    requireAsset(assert,page,'learning-catalog-v97.css');
    requireOrder(assert,page,'learning-catalog-v97.css','premium-design-v99.css');
    continue;
  }
  requireAsset(assert,page,'learning-polish-v96.css');
  requireAsset(assert,page,'color-system-v86.css');
  requireAsset(assert,page,'visual-refinement-v95.css');
  requireOrder(assert,page,'learning-polish-v96.css','premium-design-v99.css');
  assert(page.html.includes('theme-control-v14.js')&&page.html.includes('dalp-theme-prepaint'),`${page.route}: missing theme support`);
}
const css=get('assets/learning-polish-v96.css');
for(const selector of ['.sample-lesson','.idea-card','.try-card','.three-points','.auth-story',
  '.auth-account-note','.auth-benefit','.auth-field input','.auth-msg','.intro-hero',
  '.dlp29-guide','.ac-welcome','.dalp-admin-notice','[aria-invalid="true"]',
  ':focus-visible','prefers-reduced-motion']){
  // focus-visible is in the shared v95 foundation.
  assert((css+get('assets/visual-refinement-v95.css')).includes(selector),`Missing ${selector} coverage`);
}
for(const token of ['--background','--surface','--surface-alt','--text-main','--text-muted',
  '--primary','--learning-accent','--border-strong','--focus-ring']){
  assert((css+get('assets/visual-refinement-v95.css')).includes(`var(${token})`),`Visual system must reuse ${token}`);
}
assert.match(get('assets/auth-flow.js'),/ArrowLeft.*ArrowRight.*Home.*End/);
assert.match(get('assets/auth-flow.js'),/flagInvalid/);
assert.match(get('assets/auth-flow.js'),/aria-invalid/);
assert.equal(get('preview.html').match(/class="sample-lesson"/g)?.length,1);
for(const content of ['What is data analysis?','One-minute example','Try it (2 minutes)',
  'Ready to continue?'])assert(get('preview.html').includes(content),`Existing preview copy changed: ${content}`);
console.log(`PASS visual-v96: ${pages.length} routes, dual-theme semantic styling, preview, auth and admin coverage`);
