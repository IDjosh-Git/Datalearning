import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const css=fs.readFileSync('assets/styles/burnt-wood-theme.css','utf8');
for(const selector of ['.ac-sidebar','.ac-topbar','.ac-side-link','.ac-side-icon','.ac-kpi-icon','.ac-insights-icon','.ac-mobile-menu']) assert(css.includes(selector),`Missing admin premium styling: ${selector}`);
assert(css.includes('--bw-nav-gradient') && css.includes('--bw-top-gradient'));
assert(css.includes('stroke-width:2.4'), 'Bold modern SVG icon strokes required');
const retired=/#(?:254559|F27329|06141B|11212D|253745|4A5C6A|9BA8AB|CCD0CF|6AA6DA|C5E384|164157|A65B48|A45C42|E0BBA2)(?![0-9a-f])/i;
let scanned=0;
for(const dir of ['assets','courses']){
 for(const entry of fs.readdirSync(dir,{withFileTypes:true,recursive:true})){
  if(!entry.isFile() || !/\.(css|html|js|svg)$/.test(entry.name)) continue;
  const file=path.join(entry.parentPath,entry.name);
  assert(!retired.test(fs.readFileSync(file,'utf8')),`${file} retains legacy theme color`);
  scanned++;
 }
}
console.log(`PASS Burnt Wood palette, premium admin gradients and bold icons; ${scanned} source assets audited`);
