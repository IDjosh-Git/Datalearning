/** Public theme regression gate. Checks source architecture and the palette's WCAG contrast.
 * This is not a substitute for rendered visual/browser accessibility testing. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const htmlPages=[];
const collect=(dir='')=>{
  for(const entry of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){
    const rel=path.join(dir,entry.name);
    if(entry.isDirectory()&&rel==='courses')collect(rel);
    else if(entry.isFile()&&rel.endsWith('.html'))htmlPages.push(rel);
  }
};
collect();
assert.equal(htmlPages.length,38,'All published HTML pages must participate in the shared theme');
const globalNavPages=['index.html','catalog.html','reference.html','prompt-library.html','capstone.html','tutor.html','practice.html','studio.html','learning-lab.html','account.html',...['excel','sql','powerbi','python','introduction','ai'].flatMap(n=>[`courses/${n}.html`,`courses/${n}-roadmap.html`,`courses/${n}-extension.html`])];
for(const route of htmlPages){
 const source=read(route);
 const css=[...source.matchAll(/<link\b[^>]*>/gi)].filter(x=>/\brel=["']stylesheet["']/.test(x[0])).map(x=>x[0].match(/\bhref=["']([^"']+)["']/)?.[1]).filter(Boolean);
 assert.equal(css.filter(x=>x.endsWith('/design-system.css')).length,1,`${route}: theme must load exactly once`);
 assert(css.at(-1)?.endsWith('/design-system.css'),`${route}: theme must load after other page styles`);
 const absolute=path.resolve(root,path.dirname(route),css.at(-1));
 assert.equal(absolute,path.join(root,'assets/styles/design-system.css'),`${route}: bad nested stylesheet path`);
}
for(const route of globalNavPages){
 const source=read(route);
 assert.equal((source.match(/class="dalp-global-header"/g)||[]).length,1,`${route}: missing/duplicate global header`);
 assert.equal((source.match(/class="dalp-global-nav"/g)||[]).length,1,`${route}: missing/duplicate global navigation`);
 assert.equal((source.match(/public-navigation\.js/g)||[]).length,1,`${route}: duplicate menu initializer`);
}
const css=read('assets/styles/design-system.css');
for(const required of ['.dalp-global-header','.dalp-global-nav a[aria-current="page"]','.dalp-global-toggle','.page-hero','.pl-hero','.guide-hero','.guide-bottom','.guide-footer','.footer','.ref-card','.lp-studio-cta',':focus-visible','prefers-reduced-motion']){
 assert(css.includes(required),`Missing expected accessible theme rule: ${required}`);
}
assert(!css.includes('h1,h2,h3,h4,p,span,strong,small'), 'Broad hero text override would recolour button labels');
assert(css.includes('--ui-accent:#29476b'), 'Shared secondary accent should be deep slate blue');
assert(css.includes('--ui-accent-soft:#eaf0f8'), 'Accent soft surface should use the updated neutral blue');
assert(css.includes('--ui-radius:14px'), 'Shared cards should use a consistent 14px corner radius');
assert(!/--ui-teal|--dlp97-teal|#087c79|#a5e8df/i.test(css), 'Outdated teal theme rules should not remain');
function luminance(hex){
 const rgb=hex.replace('#','').match(/../g).map(h=>parseInt(h,16)/255);
 const [r,g,b]=rgb.map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
 return .2126*r+.7152*g+.0722*b;
}
function contrast(a,b){
 const l1=luminance(a),l2=luminance(b);return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);
}
const pairs=[
 ['Body text','15243a','f5f7fb',4.5],
 ['Muted text on cards','516178','ffffff',4.5],
 ['Muted text on canvas','516178','f5f7fb',4.5],
 ['Headings in pale heroes','15243a','edf1ff',4.5],
 ['Highlighted headings in pale heroes','3035b0','edf1ff',4.5],
 ['Primary buttons','ffffff','3f46d9',4.5],
 ['Hovered primary buttons','ffffff','3035b0',4.5],
 ['Slate-blue secondary accent on white','29476b','ffffff',4.5],
 ['Slate-blue accent on canvas','29476b','f5f7fb',4.5],
 ['Slate-blue accent on soft surface','29476b','eaf0f8',4.5],
 ['White on slate-blue filled states','ffffff','29476b',4.5],
 ['White on darker slate-blue','ffffff','1d3657',4.5],
 ['Control border against white (non-text)','798ba2','ffffff',3],
 ['Public navigation','e1e9f6','15243a',4.5],
 ['Navigation active item','ffffff','344869',4.5],
 ['Navigation brand','e1eafe','15243a',4.5],
 ['Keyboard focus against dark nav','f7b95b','15243a',3],
 ['Guide callout text','ffffff','15243a',4.5],
 ['Guide callout link','e1eafe','15243a',4.5],
 ['Footer links','3035b0','edf1f8',4.5],
 ['Support button','ffffff','101010',4.5],
];
for(const [name,text,bg,limit] of pairs){
 const actual=contrast(text,bg);
 assert(actual>=limit,`${name}: contrast ${actual.toFixed(2)}:1 below ${limit}:1`);
}
console.log(`PASS public theme audit: ${htmlPages.length} themed pages, ${globalNavPages.length} shared headers, ${pairs.length} contrast pairs meet their 4.5:1 text / 3:1 non-text targets`);
