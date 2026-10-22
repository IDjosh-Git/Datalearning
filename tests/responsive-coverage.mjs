import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function paths(folder){return fs.readdirSync(folder,{withFileTypes:true}).flatMap(item=>{
  const f=path.join(folder,item.name);
  return item.isDirectory()?paths(f):f.endsWith('.html')?[f]:[];
});}
const pages=paths(root).filter(f=>!f.includes(`${path.sep}node_modules${path.sep}`));
assert.equal(pages.length,22,'Every route must be covered');
for(const file of pages){
  const html=fs.readFileSync(file,'utf8');
  const page=path.relative(root,file).replaceAll('\\','/').replace(/\.html$/,'');
  assert.match(html,/<meta[^>]*name=["']viewport["'][^>]*>/i,`No mobile viewport: ${page}`);
  assert(html.includes(`data-responsive-page="${page}"`),`Missing page marker: ${page}`);
  assert(html.includes('assets/responsive-v2.css?v='),`Responsive styles missing: ${page}`);
  assert(html.includes('assets/responsive-v2.js?v='),`Responsive nav JS missing: ${page}`);
}
const css=fs.readFileSync(path.join(root,'assets/responsive-v2.css'),'utf8');
for(const rule of ['max-width:1100px','max-width:900px','max-width:760px','max-width:600px','max-width:370px','max-height:500px','prefers-reduced-motion'])assert(css.includes(rule),`Missing layout condition: ${rule}`);
for(const section of ['.lp-hero','.tutor-grid','.pc-layout','.auth-layout','.review-shell','.cap-layout','.studio-content','.ip-stats','.lp-ai-page'])assert(css.includes(section),`Missing page adaptation: ${section}`);
const nav=fs.readFileSync(path.join(root,'assets/responsive-v2.js'),'utf8');
assert(nav.includes('Escape')&&nav.includes('aria-expanded'),'Missing keyboard nav support');
console.log(`PASS responsive coverage: ${pages.length} HTML pages | 320-1440+ layouts | navigation, course, practice, library, tutor, forms`);
