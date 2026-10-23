import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const root=new URL('../',import.meta.url);
const read=(p)=>readFileSync(new URL(p,root),'utf8');
const paths=['.', 'courses'];
let pages=0;
for(const path of paths){
 const dir=new URL(path+'/',root);
 for(const name of readdirSync(dir).filter(n=>n.endsWith('.html'))){
  const s=read(path==='.'?name:`${path}/${name}`);
  assert.match(s,/accessibility-v23\.css\?v=/,name);
  assert.match(s,/accessibility-v23\.js\?v=/,name);
  pages++;
 }
}
const css=read('assets/accessibility-v23.css'), js=read('assets/accessibility-v23.js'), sw=read('service-worker-v23.js');
assert.match(css,/min-height: 48px/);
assert.match(css,/:focus-visible/);
assert.match(css,/prefers-reduced-motion/);
assert.match(js,/Skip to main content/);
assert.match(sw,/PRIVATE\.test\(url\.pathname\)/);
assert.match(sw,/req\.method!=='GET'/);
assert.match(read('api/auth/session.js'),/Session verification is temporarily unavailable/);
assert.match(read('assets/progress-cloud.js'),/Invalid course unit/);
console.log(`PASS accessibility v23 static coverage | ${pages} pages | protected cache routes | resilient progress guards`);
