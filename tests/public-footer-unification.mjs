/** Public pages have exactly one shared footer and no legacy footer markup. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {discoverPages} from './page-assets.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const restricted=new Set(['admin.html','progress.html','reviewer.html','connection-test.html','sync-test.html','account.html','profile.html','certificate.html']);
const publicPages=discoverPages().filter(page=>!restricted.has(page.route));
assert.equal(publicPages.length,32,'31 public routes, including the footer-free sign-in route');
for(const page of publicPages){
 if(page.route==='auth.html'){assert(!page.html.includes('assets/scripts/public-footer.js'),'Sign-in must not load a footer');continue;}
 const nested=page.route.startsWith('courses/');
 const tag=`<script defer src="${nested?'../':''}assets/scripts/public-footer.js"></script>`;
 assert.equal(page.html.split(tag).length-1,1,`${page.route}: load one shared footer`);
 assert.doesNotMatch(page.html,/<footer\b/i,`${page.route}: duplicate or old inline footer`);
 assert(!page.html.includes('workspace-shell.js'),`${page.route}: legacy navigation not allowed`);
}
for(const route of restricted){
 const page=read(route);
 assert(!page.includes('assets/scripts/public-footer.js'),`${route}: protected diagnostic/admin routes are separate`);
}
const css=read('assets/styles/design-system.css');
for(const selector of ['.dalp-public-footer__grid','.dalp-public-footer__bottom','.dalp-public-footer__contact','prefers-reduced-motion']){
 assert(css.includes(selector),`Missing shared footer styling: ${selector}`);
}
assert(css.includes('background:#101d33!important'),'The public footer must be dark navy');
const js=read('assets/scripts/public-footer.js');
for(const pagePath of ['index.html','courses/sql.html','reference.html']){
 const created=[];
 const scriptUrl='https://academy.example/learning-path/assets/scripts/public-footer.js';
 const doc={
  currentScript:{src:scriptUrl},readyState:'complete',
  querySelector:()=>null,
  createElement:(tag)=>({tagName:tag,setAttribute(name,value){this[name]=value;}}),
  body:{appendChild:(node)=>created.push(node)},
 };
 vm.runInNewContext(js,{document:doc,URL,Date});
 assert.equal(created.length,1,`${pagePath}: should render exactly one footer`);
 const footer=created[0];
 assert.equal(footer.className,'dalp-public-footer');
 assert(footer.innerHTML.includes('href="https://academy.example/learning-path/courses/excel.html"'),'Course link must respect site subdirectory');
 assert(footer.innerHTML.includes('href="https://academy.example/learning-path/reference.html"'),'Library link must resolve at root');
 assert(footer.innerHTML.includes('href="https://academy.example/learning-path/index.html"'),'Dashboard link must resolve at root');
 assert(footer.innerHTML.includes('mailto:esoterikjoshua@gmail.com'),'Support email must remain available');
}
const rgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);
const luminance=hex=>rgb(hex).reduce((s,n,i)=>s+[.2126,.7152,.0722][i]*n,0);
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
for(const text of ['#eef3ff','#cbd7ee','#dce6fa'])assert(contrast('#101d33',text)>=4.5,`${text} should pass WCAG AA contrast`);
console.log(`PASS unified footer: ${publicPages.length-1} public pages plus footer-free sign-in, single reusable component, no duplicate markup, nested paths, and WCAG AA contrast`);
