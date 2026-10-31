import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const routes=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')&&f!=='catalog.html'),...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>'courses/'+f)];
assert.equal(routes.length,25,'Expected all 25 existing routes');
for(const route of routes){
 const html=read(route),cssHref=route.startsWith('courses/')?'../assets/color-system-v86.css':'assets/color-system-v86.css';
 assert(html.includes(cssHref),`Missing semantic CSS on ${route}`);
 assert(html.indexOf(cssHref)>html.indexOf('learning-experience-v84.css'),`Token overrides must load after v84 on ${route}`);
 assert(html.includes('id="dalp-theme-prepaint"'),`Missing prepaint on ${route}`);
 assert(html.includes('theme-control-v14.js'),`Missing system/light/dark control on ${route}`);
}
for(const page of ['admin.html','certificate.html','studio.html','practice.html']){
 const html=read(page);
 const bootstrap=html.match(/<script id="dalp-theme-prepaint">([\s\S]*?)<\/script>/)?.[1];
 assert(bootstrap,`${page} missing prepaint`);
 const after=html.replace(bootstrap,'');
 assert(!/localStorage\.getItem\(['"]dalp-theme['"]\)/.test(after),`${page} has an obsolete theme override`);
 if(page!=='practice.html')assert(html.includes("document.documentElement.classList.add('dalp-auth-checking')"),`${page} lost auth cover`);
}
const css=read('assets/color-system-v86.css');
const light=css.match(/:root,html\[data-theme="light"\]\s*\{([\s\S]*?)\n\}/)?.[1];
const dark=css.match(/html\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)?.[1];
assert(light&&dark,'Missing both colour-mode token sets');
const parse=text=>Object.fromEntries([...text.matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map(v=>[v[1],v[2]]));
const sets={light:parse(light),dark:parse(dark)};
const luminance=hex=>{
 const values=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
 return values[0]*.2126+values[1]*.7152+values[2]*.0722;
};
const ratio=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const pairs=[['--text-main','--background'],['--text-main','--surface'],['--text-muted','--surface'],['--text-muted','--surface-alt'],['--learning-accent','--background'],['--on-primary','--primary'],['--on-primary','--primary-hover'],['--focus-ring','--background'],['--positive','--surface'],['--warning-text','--surface'],['--danger','--surface'],['--info','--surface'],...['foundations','excel','sql','powerbi','python','ai'].map(k=>[`--track-${k}`,'--surface'])];
for(const [theme,colors] of Object.entries(sets))for(const [a,b] of pairs){
 assert(colors[a]&&colors[b],`${theme}: missing ${a} or ${b}`);
 assert(ratio(colors[a],colors[b])>=4.5,`${theme} ${a} on ${b} ${ratio(colors[a],colors[b]).toFixed(2)}:1 below AA`);
}
for(const part of ['--brand-heritage','--surface-raised','--surface-alt','--surface-overlay','--editor-background','--code-background','--primary-soft','--focus-ring','--positive-soft','--warning-soft','--danger-soft','--disabled-surface']){
 assert(css.includes(part),`Missing semantic ${part}`);
}
for(const segment of ['.lp-course[data-track="excel"]','body[data-responsive-page="practice"]','.cap-pill.approved','.tutor-chat','.ref-card','.lp-progress-line>div','.lp-pathfinder','.lp-context-nav','.job-ready-banner']){
 assert(css.includes(segment),`Missing colour-system component coverage: ${segment}`);
}
const themeScript=read('assets/theme-control-v14.js');
assert(themeScript.includes("['system','System']"),'No System preference');
assert(themeScript.includes('media?.addEventListener'),'No OS preference change observer');
assert(themeScript.includes("'#0e1b28':'#f7f8f5'"),'Browser theme-colour must track canvas');
const prepaint=read('index.html').match(/<script id="dalp-theme-prepaint">([\s\S]*?)<\/script>/)[1];
for(const [value,osDark,expected] of [[null,false,'light'],[null,true,'dark'],['light',true,'light'],['dark',false,'dark'],['system',true,'dark']]){
 const rootElement={dataset:{},style:{},classList:{toggle(){}}};
 vm.runInNewContext(prepaint,{document:{documentElement:rootElement},localStorage:{getItem:()=>value},window:{matchMedia:()=>({matches:osDark})}},{timeout:1000});
 assert.equal(rootElement.dataset.theme,expected,`First paint theme ${value}/${osDark}`);
}
console.log(`PASS colour system v86: ${routes.length} routes, ${pairs.length*2} AA contrast pairs, course identities, themes, app components and auth prepaint`);
