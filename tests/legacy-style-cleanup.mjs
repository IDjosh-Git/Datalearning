/** Static regression guard against retired style layers re-entering the site. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {discoverPages,root} from './page-assets.mjs';

const pages=discoverPages();
const styleDir=path.join(root,'assets/styles');
const styles=fs.readdirSync(styleDir).filter(f=>f.endsWith('.css'));
const loaded=new Set();
const forbiddenColors=['#713a55','#a24d6e','#a45c7c','#ad6488','#824765','#eec7dc','#f27329','#254559','#f8f7fa'];
let fileCount=0;
for(const page of pages){
 const html=fs.readFileSync(path.join(root,page.route),'utf8');
 assert(!/<style\b/i.test(html),`${page.route}: embedded style block; move it into the maintained CSS`);
 assert(!/<html\b[^>]*style="color-scheme:\s*light"/i.test(html),`${page.route}: redundant inline root theme`);
 const keys=page.links.filter(x=>x.path.includes('assets/styles/') && x.path.endsWith('.css')).map(x=>x.path);
 assert.equal(new Set(keys).size,keys.length,`${page.route}: duplicated stylesheet reference`);
 assert.equal(keys.filter(x=>x==='assets/styles/design-system.css').length,1,`${page.route}: one shared theme required`);
 for(const key of keys)loaded.add(path.basename(key));
 fileCount++;
}
for(const f of styles){
 assert(loaded.has(f),`Orphan CSS ${f} should be deleted or linked intentionally`);
 const src=fs.readFileSync(path.join(styleDir,f),'utf8');
 assert(!/\b(?:Manrope|Poppins|Montserrat)\b/i.test(src),`${f}: retired UI font`);
 assert(!/(?:-webkit-)?backdrop-filter\s*:/i.test(src),`${f}: decorative glass effect`);
 for(const col of forbiddenColors)assert(!src.toLowerCase().includes(col),`${f}: retired palette colour ${col}`);
 // Page-specific CSS remains intentional; do not ban responsive breakpoints or stateful overlays.
}
const worker=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
assert(/const CACHE = 'dalp-public-[a-z0-9-]+-v\d+'/.test(worker),'Stylesheet cache version must match this cleanup');
console.log(`PASS style hygiene: ${fileCount} routes, ${styles.length} referenced stylesheets, 0 embedded style blocks, no retired fonts/palette/glass filters`);
