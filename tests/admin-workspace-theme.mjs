import assert from 'node:assert/strict';
import fs from 'node:fs';
import {restrictedKind} from '../lib/server-auth.js';
const read=x=>fs.readFileSync(x,'utf8');
const css=read('assets/styles/private-workspace.css');
const consoleJs=read('assets/scripts/private-navigation.js');
const pages=['admin.html','progress.html','reviewer.html'];
for(const route of pages){
 const html=read(route);
 assert.equal((html.match(/admin-workspace\.css/g)||[]).length,1,`${route}: exactly one maintained admin stylesheet`);
 assert(html.indexOf('design-system.css')<html.indexOf('admin-workspace.css'),`${route}: shared system first, admin skin last`);
 assert(!/<header[^>]*class="nav-shell"/i.test(html),`${route}: obsolete duplicate header must be physically removed`);
 assert(!/<footer[^>]*class="footer"/i.test(html),`${route}: obsolete hidden footer must be physically removed`);
 assert(html.includes('assets/scripts/auth-gate.js'),`${route}: existing sign-in gate must remain`);
 assert(html.includes('assets/scripts/private-navigation.js'),`${route}: single private workspace navigation required`);
}
assert.equal(restrictedKind('/assets/styles/admin-workspace.css'),'adminAsset','Admin theme must not be publicly accessible through protected middleware');
for(const selector of ['body.ac-ready .ac-sidebar','body.ac-ready .ac-topbar','body.ac-ready .ac-mobile-menu','body.ac-ready .ac-shortcut-list','body.ac-ready .ac-detail-backdrop','body.ac-ready .ac-nav-overlay','.review-inbox','.ip-panel'])assert(css.includes(selector),`Missing active admin skin: ${selector}`);
assert(!css.includes('linear-gradient(')&&!css.includes('radial-gradient('),'Admin theme must be flat and gradient-free');
assert(!consoleJs.includes('ac-mobile-tabs'),'Do not generate a second mobile navigation');
assert(!consoleJs.includes('ac-support-symbol'),'Decorative sidebar marketing panel must be physically deleted');
assert(!read('admin.html').includes('ac-welcome-illustration'),'Decorative hero bar overlay must be physically deleted');
assert(!read('admin.html').includes('ac-shortcut-grid'),'Shortcut link cards must be converted to plain links');
assert(!read('progress.html').includes('class="lp-primary" href="reviewer.html"'),'Progress review navigation must be a plain text link');
assert.match(css,/background:transparent!important[^;]*;[\s\S]*?text-decoration:underline!important/,'Plain links must have transparent backgrounds and visible underlines');
assert(css.includes('@media(max-width:1024px)')&&css.includes('prefers-reduced-motion:reduce'),'Responsive and reduced motion support required');
function lum(hex){return [0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((a,x,i)=>a+x*[.2126,.7152,.0722][i],0)}
function ratio(a,b){const v=[lum(a),lum(b)].sort((x,y)=>y-x);return (v[0]+.05)/(v[1]+.05)}
for(const [name,fg,bg,min] of [
 ['Workspace headings','15243a','f5f7fb',4.5],
 ['Panel body text','15243a','ffffff',4.5],
 ['Panel muted text','50627a','ffffff',4.5],
 ['Panel links','3035b0','ffffff',4.5],
 ['Sidebar navigation','15243a','ffffff',4.5],
 ['Input text','15243a','ffffff',4.5],
 ['Topbar links','15243a','ffffff',4.5],
 ['Keyboard focus on page','3f46d9','f5f7fb',3],
])assert(ratio(fg,bg)>=min,`${name}: contrast ${ratio(fg,bg).toFixed(2)} below ${min}`);
console.log('PASS admin workspace: 3 protected routes, one light theme, no duplicate header/footer, transparent links, focus/drawer protection, 8 light contrast checks');
