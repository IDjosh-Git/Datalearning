import {hasCurrentPublicCache} from './cache-release-contract.mjs';
/* Regression check for the final homepage contrast and overlay correction. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'assets/styles/public-experience.css'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const ratio=(a,b)=>{
 const luminance=hex=>{
  const rgb=hex.match(/[\da-f]{2}/gi).map(v=>parseInt(v,16)/255);
  const linear=rgb.map(n=>n<=0.04045?n/12.92:((n+0.055)/1.055)**2.4);
  return linear[0]*.2126+linear[1]*.7152+linear[2]*.0722;
 };
 const vals=[luminance(a),luminance(b)].sort((x,y)=>x-y);
 return (vals[1]+.05)/(vals[0]+.05);
};
assert.match(html,/class="dalp-brand-name">data<span class="dalp-brand-accent">learning<\/span>/,'Keep the recognizable DataLearning wordmark');
assert(html.includes('class="dalp-plain-link lp-primary"') && html.includes('class="dalp-plain-link lp-secondary"'),'Keep two working homepage CTAs');
assert.match(html,/id="courses"/,'Course section must stay present');
assert.match(html,/id="pathfinder"/,'Start-point selector must stay present');
assert(css.includes('DataLearning — homepage finishing pass'),'Homepage final corrections must be appended to the last-loaded theme');
const finishing=css.slice(css.indexOf('DataLearning — homepage finishing pass'));
for (const pattern of [
 /section\.lp-hero\.dalp-themed-hero\s*\{[\s\S]*?background:#142443!important;[\s\S]*?background-image:none!important;/,
 /main#main-content \.lp-demo\s*\{[\s\S]*?background:#fff!important;[\s\S]*?background-image:none!important;/,
 /main#main-content \.lp-feature,[\s\S]*?main#main-content \.lp-step\s*\{[\s\S]*?background:#fff!important;[\s\S]*?background-image:none!important;/,
 /section\.lp-hero \.lp-hero-actions > a\.lp-primary\.dalp-plain-link,[\s\S]*?background:#35637C!important;/,
 /main#main-content > section::before,[\s\S]*?main#main-content > section::after\s*\{[\s\S]*?content:none!important;/
])assert.match(finishing,pattern,'A high-specificity homepage visual fix is missing');
assert(ratio('14243f','ffffff')>=7,'Primary DataLearning brand text should meet AAA contrast');
assert(ratio('35637C','ffffff')>=4.5,'Blueprint brand accent should meet AA contrast');
assert(ratio('ffffff','35637C')>=4.5,'Primary CTA must meet AA contrast');
assert(hasCurrentPublicCache(sw),'Visitors must receive the latest CSS after release');
console.log('PASS final homepage: DataLearning AAA wordmark, visible AA CTAs, solid hero/dashboard, overlay removal, course navigation and cache revision');
