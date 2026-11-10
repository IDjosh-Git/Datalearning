import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const publicFiles=[...fs.readdirSync(root).filter(n=>n.endsWith('.html')).map(n=>path.join(root,n)),...fs.readdirSync(path.join(root,'courses')).filter(n=>n.endsWith('.html')).map(n=>path.join(root,'courses',n))].filter(file=>!fs.readFileSync(file,'utf8').includes('dalp-auth-checking'));
assert.equal(publicFiles.length,31,'Page loader must cover all 31 public routes');
for(const file of publicFiles){
 const html=fs.readFileSync(file,'utf8');
 const prefix=file.includes(`${path.sep}courses${path.sep}`)?'../':'';
 for(const text of [`${prefix}assets/styles/page-loader.css`,`${prefix}assets/scripts/page-loader.js`,"classList.add('dlp-loader-pending')",'id="dlpPageLoader"','class="dlp-loader-emblem"','Preparing your learning space'])assert.ok(html.includes(text),`${path.relative(root,file)} missing ${text}`);
 assert.equal((html.match(/id="dlpPageLoader"/g)||[]).length,1,`${path.relative(root,file)} must contain only one loader`);
 assert.ok(!html.includes('assets/icons/da-logo.svg" width="61"'),`${path.relative(root,file)} uses a network-dependent loader image`);
}
const css=fs.readFileSync(path.join(root,'assets/styles/page-loader.css'),'utf8');
const js=fs.readFileSync(path.join(root,'assets/scripts/page-loader.js'),'utf8');
assert.match(css,/prefers-reduced-motion:reduce/);
assert.match(css,/html\.dlp-loader-pending #dlpPageLoader/);
assert.match(js,/DOMContentLoaded/);
assert.match(js,/MAX_VISIBLE=2800/);
assert.match(js,/root\.classList\.remove\('dlp-loader-pending'\)/);
console.log(`PASS page loader visible on ${publicFiles.length} public routes, reduced-motion support, no CDN dependency, bounded dismissal`);
