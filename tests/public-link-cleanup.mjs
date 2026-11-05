/** Check that public resource/action links remain clickable but not boxed CTAs. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {root} from './page-assets.mjs';
const files=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')).map(f=>f),...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>`courses/${f}`)];
const protectedFiles=new Set(['admin.html','account.html','auth.html','reviewer.html','progress.html','certificate.html','connection-test.html','sync-test.html','verify.html']);
let converted=0;
for(const f of files.filter(f=>!protectedFiles.has(f))){
 const html=fs.readFileSync(path.join(root,f),'utf8');
 converted+=(html.match(/class="[^"]*\bdalp-plain-link\b[^"]*"/g)||[]).length;
 assert(!/class="dalp-floating-link/.test(html),`${f} still includes an unused floating card link`);
 assert(!/class="dalp-global-nav[^\"]*dalp-plain-link/.test(html),`${f}: shared navigation styling changed`);
}
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(!home.includes('class="lp-quick-links"'),'Redundant quick-navigation group must be removed from Discover');
assert(!home.includes('class="lp-prompt-promo"'),'Prompt-library advertising does not belong at the end of Discover');
assert(home.includes('id="courses"') && home.includes('dlp-journey-grid'),'Detailed learning journey must replace repeated course links');
assert(readFileCatalog().includes('id="dlp97-search"') || readFileCatalog().includes('dlp97-search-row'),'Course catalogue retains genuine course filters');
function readFileCatalog(){return fs.readFileSync(path.join(root,'catalog.html'),'utf8')}
const css=fs.readFileSync(path.join(root,'assets/styles/design-system.css'),'utf8');
assert.match(css,/body a\.dalp-plain-link,/, 'Common link reset missing');
assert.match(css,/body a\.dalp-plain-link:focus-visible/, 'Visible keyboard focus missing');
assert.match(css,/body \.guide-block a\.dlp29-milestone\.dalp-plain-link/, 'Roadmap link-only cards not cleaned');
assert.match(css,/body\.lp-prompt-page \.bottom-cta/,'Prompt-library resource link must have readable background');
assert(converted>=280,`Expected public link cleanup, found ${converted}`);
console.log(`PASS unboxed public links: ${converted} action/resource links across ${files.length-protectedFiles.size} public HTML pages; no redundant quick-navigation block; catalogue filtering preserved.`);
