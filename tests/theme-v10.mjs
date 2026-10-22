import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const pages=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')).map(f=>path.join(root,f)),...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>path.join(root,'courses',f))];
assert.equal(pages.length,22,'Expected 22 existing HTML pages');
for(const file of pages){
 const html=fs.readFileSync(file,'utf8');
 const cssName='theme-unified-v10.css';
 assert.equal(html.split(cssName).length-1,1,`${file} must load the shared theme once`);
 const rel=path.relative(root,file).startsWith('courses')?'../assets/':'assets/';
 assert.ok(html.includes(rel+cssName),`Expected correct asset path in ${file}`);
 for (const match of html.matchAll(/<link\s+[^>]*href="([^"]+\.css(?:\?[^"<>]*)?)"[^>]*>/gi)) {
  const href=match[1].split('?')[0];
  if(/^(?:https?:|\/\/)/.test(href)) continue;
  assert.ok(fs.existsSync(path.resolve(path.dirname(file),href)),`Missing ${href} on ${file}`);
 }
}
const s=fs.readFileSync(path.join(root,'assets/theme-unified-v10.css'),'utf8');
for(const token of ['html[data-theme="dark"]','--app-text','--app-muted','--app-surface','--app-line','--ui-course-max','cw-resources','cw-week-chip','cw-module','guided-lab','study-studio','intro-lesson','.badge'])assert.ok(s.includes(token),`Missing ${token} override`);
for(const file of ['excel','sql','powerbi','ai','introduction']){
 const text=fs.readFileSync(path.join(root,'courses',file+'.html'),'utf8');
 assert.ok(text.includes('weekly-workspace.css'),`Missing course navigator: ${file}`);
}
console.log('PASS V10 semantic theme and large-screen layout: 22 HTML pages, 5 courses, shared styles, dataset panels and print-safe asset references');
