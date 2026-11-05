/** Maintained design-system regression checks. Functional and visual CSS are
 * separate concerns; run this with the page and responsive verification suite. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {discoverPages} from './page-assets.mjs';
const read=p=>fs.readFileSync(p,'utf8');
const global=read('assets/styles/design-system.css');
const privateCss=read('assets/styles/private-workspace.css');
const adminCss=read('assets/styles/admin-workspace.css');
const auth=read('auth.html');
const nav=read('assets/scripts/private-navigation.js');
const sw=read('service-worker.js');
const routes=discoverPages();
assert.equal(routes.length,39,'Full site layout must be covered');
assert.equal((global.match(/BEGIN PREMIUM EXPERIENCE 20261103/g)||[]).length,1,'One global premium stylesheet');
assert(!privateCss.includes('BEGIN PREMIUM EXPERIENCE 20261103'),'Do not duplicate global theme in private navigation');
assert(!adminCss.includes('BEGIN PREMIUM EXPERIENCE 20261103'),'Admin skin inherits private navigation rather than duplicating all CSS');
assert(adminCss.includes('@import url("./private-workspace.css")'),'Admin must reuse the private layout');
assert(privateCss.includes('PREMIUM PRIVATE WORKSPACE'),'Private nav gets only focused component overrides');
assert(global.includes("font-family:'DM Sans'"),'Body font must use modern UI typography');
assert(global.includes("font-family:'Plus Jakarta Sans'"),'Headings must use the display face');
assert(global.includes('--ui-control-stroke:#8595ae'),'Input boundaries must have accessible contrast');
assert(global.includes('linear-gradient(135deg,#6651e4,#4933bf)'),'Accessible premium primary gradient');
assert(global.includes('html[data-theme="light"] body.auth-page .auth-submit'),'Auth premium button must beat legacy specificity');
assert(global.includes('html[data-theme="light"] body.auth-page .auth-layout'),'Auth layout must beat old auth CSS');
assert(global.includes('body.auth-page footer{display:none!important}'),'No auth footer');
assert(privateCss.includes('flex:1 1 0!important;min-height:0!important;overflow-y:auto!important'),'Side navigation should scroll separately');
assert(privateCss.includes('.ac-side-bottom{flex:0 0 auto!important'),'Sign out must stay outside scrolling links');
assert(nav.includes('bottom.append(logout)'),'Sign out control must be under fixed sidebar bottom section');
assert(nav.includes('aria-expanded'),'Accessible mobile menu state');
assert(sw.includes('dalp-public-premium-editorial-v38'),'CSS cache version must be refreshed');
assert(!/<footer\b/i.test(auth),'Sign-in page should not contain a footer');
assert(!/<style\b/i.test(auth),'No embedded sign-in CSS');
for(const route of routes){
 const styles=route.links.filter(x=>x.local).map(x=>x.path);
 assert.equal(styles.filter(x=>x==='assets/styles/design-system.css').length,1,`${route.route}: one global theme required`);
}
function luminance(color){
 const rgb=[0,2,4].map(n=>parseInt(color.substring(n,n+2),16)/255);
 return rgb.map(c=>c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4).reduce((sum,c,i)=>sum+c*[.2126,.7152,.0722][i],0);
}
function contrast(a,b){const vals=[luminance(a),luminance(b)].sort((x,y)=>y-x);return (vals[0]+0.05)/(vals[1]+0.05);}
for(const [name,foreground,background,minRatio] of [
 ['Primary gradient start','6651e4','ffffff',4.5],
 ['Primary gradient end','4933bf','ffffff',4.5],
 ['Primary token on white','6553e9','ffffff',4.5],
 ['Muted body copy','596783','ffffff',4.5],
 ['Input stroke','8595ae','ffffff',3.0],
 ['Focus outline','5847d9','ffffff',3.0],
 ['Sidebar text','f7f6ff','171a43',4.5],
 ['Sidebar muted','c6c6e4','171a43',4.5],
 ['Sidebar keyboard focus','c3b8ff','171a43',3.0],
])assert(contrast(foreground,background)>=minRatio,`${name}: insufficient contrast`);
console.log(`PASS premium design contract: ${routes.length} routes, accessible gradient/text/inputs/focus, consolidated CSS, sign-in footer-free, mobile Sign out fixed`);
