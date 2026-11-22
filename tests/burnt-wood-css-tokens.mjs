import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const cssDir='assets/styles';
const styles=fs.readdirSync(cssDir).filter(x=>x.endsWith('.css'));
const theme=fs.readFileSync(path.join(cssDir,'burnt-wood-theme.css'),'utf8');
const tokens=['--bw-charcoal','--bw-midnight','--bw-burgundy','--bw-ivory','--bw-copper','--bw-sand'];
for(const token of tokens) assert(new RegExp(`${token}:\\s*#[0-9a-f]{6}`,'i').test(theme),`Missing canonical ${token}`);
let refs=0;
for(const name of styles){
 const source=fs.readFileSync(path.join(cssDir,name),'utf8');
 for(const m of source.matchAll(/var\((--bw-[\w-]+)\)/g)){
  assert(new RegExp(`${m[1]}\\s*:`).test(theme),`${name} uses an undefined Burnt Wood token: ${m[1]}`);
  refs++;
 }
}
assert(refs>5000,`Expected shared CSS tokens throughout the app, found ${refs}`);
const pages=fs.readdirSync('.').filter(x=>x.endsWith('.html')&&x!=='studio.html'&&x!=='career-paths.html'&&x!=='free-lesson.html'&&x!=='landing.html');
for(const page of pages){
 const html=fs.readFileSync(page,'utf8');
 assert(html.includes('burnt-wood-theme.css'),`${page}: missing final theme definitions`);
}
console.log(`PASS CSS token audit: ${styles.length} stylesheets, ${refs} canonical variable uses, ${pages.length} top-level pages`);
