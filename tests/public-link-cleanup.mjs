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
assert(!home.includes('class="lp-quick-card"'),'Quick access must be direct links, not four separate cards');
assert(home.includes('class="lp-quick-links"'),'Quick access plain-link group missing');
const quickLinks=home.match(/<div class="lp-quick-links"[^>]*>([\s\S]*?)<\/div>/)?.[1] || "";
assert.equal((quickLinks.match(/class="dalp-plain-link"/g)||[]).length,4,'Four quick-access links must be preserved');
const css=fs.readFileSync(path.join(root,'assets/styles/design-system.css'),'utf8');
assert.match(css,/body a\.dalp-plain-link,/, 'Common link reset missing');
assert.match(css,/body a\.dalp-plain-link:focus-visible/, 'Visible keyboard focus missing');
assert.match(css,/body \.guide-block a\.dlp29-milestone\.dalp-plain-link/, 'Roadmap link-only cards not cleaned');
assert.match(css,/body\.lp-prompt-page \.bottom-cta/,'Prompt-library resource link must have readable background');
assert(converted>=280,`Expected public link cleanup, found ${converted}`);
console.log(`PASS unboxed public links: ${converted} action/resource links across ${files.length-protectedFiles.size} public HTML pages; 4 direct quick-access links; no old floating card CTA.`);
