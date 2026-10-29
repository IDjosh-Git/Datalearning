import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('.');
const pages = fs.readdirSync(root).filter(n=>n.endsWith('.html')).map(n=>path.join(root,n)).concat(fs.readdirSync(path.join(root,'courses')).filter(n=>n.endsWith('.html')).map(n=>path.join(root,'courses',n)));
assert.equal(pages.length,23,'Expected 23 application HTML screens');
for(const p of pages){
 const html=fs.readFileSync(p,'utf8');
 const script=html.indexOf('id="dalp-theme-prepaint"');
 const css=html.indexOf('theme-foundation-v65.css');
 assert(script>0 && css>0 && script<css,`${path.relative(root,p)} missing early theme bootstrap`);
 assert(html.includes('theme-bridge-v65.js'),`${p} missing theme bridge`);
}
console.log(`PASS: ${pages.length} pages prepaint light/dark mode before theme stylesheet`);
