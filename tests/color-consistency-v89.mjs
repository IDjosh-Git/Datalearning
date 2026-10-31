import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
const root=path.resolve('.'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
import {discoverPages,assertReferences,pageLayout,requireAsset,requireOrder} from './page-assets.mjs';
const pages=discoverPages();
assert(pages.length>0,'v89: no HTML pages discovered');
assertReferences(assert,pages);
for(const page of pages){
 requireAsset(assert,page,'premium-design-v99.css');
 requireAsset(assert,page,'text-contrast-v98.css');
 requireOrder(assert,page,'premium-design-v99.css','text-contrast-v98.css');
 assert.equal(page.links.at(-2)?.path,'assets/premium-design-v99.css',`${page.route}: premium layer must precede contrast`);
 assert.equal(page.links.at(-1)?.path,'assets/text-contrast-v98.css',`${page.route}: contrast must be last`);
 if(pageLayout(page)==='catalog'){
   requireAsset(assert,page,'learning-catalog-v97.css');
   requireOrder(assert,page,'learning-catalog-v97.css','premium-design-v99.css');
   continue;
 }
 requireAsset(assert,page,'color-system-v86.css');
 requireAsset(assert,page,'color-consistency-v89.css');
 requireOrder(assert,page,'color-system-v86.css','color-consistency-v89.css');
 requireAsset(assert,page,'learning-polish-v96.css');
 requireOrder(assert,page,'learning-polish-v96.css','premium-design-v99.css');
 assert(page.html.includes('dalp-theme-prepaint')&&page.html.includes('theme-control-v14.js'),`${page.route}: system/theme missing`);
 if(page.route.startsWith('courses/')){
   const headEnd=page.html.toLowerCase().indexOf('</head>');
   assert([...page.html.matchAll(/<link\b[^>]*?\.css[^>]*>/gi)].every(x=>x.index<headEnd),`${page.route}: CSS in body overrides palette`);
 }
}
const css=read('assets/color-consistency-v89.css');
assert(!/(?:#[0-9a-f]{3,8}\b|rgba?\(\s*\d)/i.test(css),'Bridge must contain no new literal colour values');
for(const selector of ['.pl-header','.cap-panel','.arena-code','.tutor-chat','.dalp-admin-table','.cv88-map','.mastery-code','.ip-panel','.dlp-theme-wrap','.prompt-card','.btn.primary','.lp-demo-bar'])assert(css.includes(selector),'Missing bridge coverage '+selector);
const palette=read('assets/color-system-v86.css');
for(const v of ['--background','--surface','--text-main','--text-muted','--border-subtle','--primary','--primary-hover','--on-primary','--focus-ring','--positive','--warning-text','--danger','--info','--editor-background','--code-background','--chart-1','--chart-2','--chart-3','--chart-4','--chart-5','--chart-6'])assert(palette.includes(v),'Missing semantic '+v);
for(const [file,legacy] of [['assets/brand-overrides.css','--surface:#ffffff !important'],['assets/capstone-theme-visibility-v62.css','--cap62-surface:#182338'],['assets/course-layout-theme-v57.css','--course-bg:#0d1625']])assert(!read(file).includes(legacy),'Obsolete override '+file);
const themes=Object.fromEntries(['light','dark'].map(m=>{const segment=palette.match(new RegExp((m==='light'?'\\:root,html\\[data-theme="light"\\]':'html\\[data-theme="dark"\\]')+'\\s*\\{([\\s\\S]*?)\\n\\}'))?.[1];assert(segment);return [m,Object.fromEntries([...segment.matchAll(/(--[\w-]+):\s*(#[\da-fA-F]{6})/g)].map(x=>[x[1],x[2]]))]}));
function lum(h){const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]}
function ratio(a,b){const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
let checks=0;
for(const [mode,p] of Object.entries(themes))for(const [a,b,min] of [
 ['--text-main','--surface',4.5],['--text-muted','--surface',4.5],['--learning-accent','--surface',4.5],['--on-primary','--primary',4.5],['--on-primary','--primary-hover',4.5],
 ['--focus-ring','--background',3],['--positive','--surface',4.5],['--danger','--surface',4.5],['--warning-text','--surface',4.5],['--info','--surface',4.5],
 ...Array.from({length:6},(_,i)=>['--chart-'+(i+1),'--surface',3])]){
 assert(p[a]&&p[b],mode+' '+a+'/'+b);assert(ratio(p[a],p[b])>=min,`${mode} ${a} ${b}: ${ratio(p[a],p[b]).toFixed(2)}`);checks++;
}
assert.match(read('assets/admin-dashboard.js'),/classList\.toggle\('is-error'/);
assert(!read('assets/admin-dashboard.js').includes("'#fff0eb'"));
console.log(`PASS v89: ${pages.length} HTML routes, v99 design before final v98 contrast, legacy collisions removed, ${checks} AA/graphical contrast checks, semantic component coverage`);
