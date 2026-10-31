import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const routes=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')),...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>'courses/'+f)];
assert.equal(routes.length,25);
for(const route of routes){
 const html=read(route);
 const link=route.startsWith('courses/')?'../assets/visual-refinement-v95.css?v=95':'assets/visual-refinement-v95.css?v=95';
 assert(html.includes(link),`${route} missing v95`);
 assert(html.lastIndexOf('visual-refinement-v95.css')>html.lastIndexOf('color-consistency-v89.css'),`${route} v95 not after v89`);
 assert(html.includes('dalp-theme-prepaint'),`${route} missing system theme bootstrap`);
}
const base=read('assets/color-system-v86.css'),finish=read('assets/visual-refinement-v95.css');
const css=read('assets/theme-control-v14.js');
assert(css.includes("dark?'#0e1b28':'#f7f8f5'"));
for(const token of ['--background','--surface','--surface-alt','--text-main','--text-muted','--border-subtle','--primary','--primary-hover','--on-primary','--learning-accent','--learning-soft','--focus-ring','--positive','--warning-text','--danger','--info','--nav-background','--nav-text','--achievement']){
 assert(base.includes(token),`missing ${token}`);
}
for(const item of ['.nav-shell','.lp-course','.cv88-map','.pc-detail','.tutor-sidebar','.cap-panel','.ref-card','.prompt-card','.auth-submit','.arena-editor-pane','.lp-progress-line']){
 assert(finish.includes(item),`missing ${item} coverage`);
}
const light=base.match(/:root,html\[data-theme="light"\]\s*\{([\s\S]*?)\n\}/)?.[1];
const dark=base.match(/html\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)?.[1];
assert(light&&dark);
const parse=s=>Object.fromEntries([...s.matchAll(/(--[\w-]+):\s*(#[\da-f]{6})/gi)].map(x=>[x[1],x[2]]));
const lum=hex=>[1,3,5].map(i=>Number.parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
const contrast=(a,b)=>{let x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const pairs=[['--text-main','--background'],['--text-main','--surface'],['--text-muted','--surface'],['--text-muted','--surface-alt'],['--on-primary','--primary'],['--on-primary','--primary-hover'],['--link','--background'],['--positive','--surface'],['--warning-text','--surface'],['--danger','--surface'],['--info','--surface'],...['foundations','excel','sql','powerbi','python','ai'].map(k=>['--track-'+k,'--surface'])];
for(const [mode,data] of Object.entries({light:parse(light),dark:parse(dark)}))for(const [a,b] of pairs){
 assert(data[a]&&data[b],`${mode} missing ${a} or ${b}`);
 const x=contrast(data[a],data[b]); assert(x>=4.5,`${mode}: contrast ${a}/${b} ${x.toFixed(2)} below 4.5`);
}
assert(finish.includes('prefers-reduced-motion'));
console.log(`PASS visual-v95: ${routes.length} routes, ${pairs.length*2} AA pairs, theme/palette aliases and components`);
