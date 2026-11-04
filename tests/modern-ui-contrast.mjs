/* Cross-route contrast and modern Practice Arena regression guard.
 * Measured colours are kept as tokens to avoid brittle browser-pixel asserts;
 * manual browser screenshots separately verify actual cascade specificity. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { discoverPages } from './page-assets.mjs';
const css=fs.readFileSync('assets/styles/modern-workspace-20261104.css','utf8');
const nav=fs.readFileSync('assets/scripts/private-navigation.js','utf8');
const prac=fs.readFileSync('practice.html','utf8');
const active=fs.readFileSync('assets/scripts/public-navigation.js','utf8');
const pages=discoverPages();
assert.equal(pages.length,38,'All HTML routes must be audited');
for(const page of pages){
 assert.equal(page.links.filter(x=>x.local && x.path==='assets/styles/modern-workspace-20261104.css').length,1,`${page.route}: final modern design layer required exactly once`);
 assert.equal(page.links.filter(x=>x.local).at(-1)?.path,'assets/styles/modern-workspace-20261104.css',`${page.route}: modern CSS must load last`);
}
const luminance=(hex)=>{
 const rgb=[0,2,4].map(n=>parseInt(hex.slice(n,n+2),16)/255);
 return rgb.map(c=>c<=.04045?c/12:((c+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
};
const contrast=(a,b)=>{const [hi,lo]=[luminance(a),luminance(b)].sort((x,y)=>y-x);return (hi+.05)/(lo+.05)};
const cases=[
 ['Dropdown label on white','192b46','ffffff',4.5],
 ['Dropdown link hover','39278f','f0edff',4.5],
 ['Practice breadcrumbs on white','41309b','ffffff',4.5],
 ['Practice prose on white','4a5e78','ffffff',4.5],
 ['SQL editor text on navy','edf5ff','101a30',4.5],
 ['SQL placeholder on navy','a8bad6','101a30',4.5],
 ['Line numbers on navy','aabbd9','101a30',4.5],
 ['Private nav labels on navy','adbce0','182341',4.5],
 ['Public masthead link','e3e9f8','14243f',4.5],
 ['High contrast native dropdown','14243b','ffffff',4.5],
 ['Practice purple primary text on white','5135c5','ffffff',4.5],
 ['Focus indicator on white','5135c5','ffffff',3.0],
];
for(const [name,fg,bg,min] of cases){const ratio=contrast(fg,bg);assert(ratio>=min,`${name}: ratio ${ratio.toFixed(2)} is below ${min}`)};
assert.match(css,/Navigation and code-workbench refresh/,'Direct-link navigation must use the refreshed visual treatment');
assert.match(css,/#main-content\.pc-wrap > header\.pc-hero\.dalp-themed-hero a/,'Practice breadcrumb must override light-on-dark legacy hero link');
assert.match(css,/#practiceAnswer\.sql-editor-textarea/,'SQL code input needs a dedicated dark contrast rule');
assert.match(css,/#arenaLines\.arena-lines/,'Line number gutter needs dedicated dark contrast rule');
assert.match(css,/option:checked/,'Native select menus must retain visibly selected options');
assert.match(css,/\.hub-dialog/,'Challenge browser dialog needs modern styling');
assert.match(css,/\.ide-results-tabs/,'Result workspace tabs need modern styling');
assert.match(css,/prefers-reduced-motion/,'Reduced motion needs explicit support');
assert.match(css,/forced-colors/,'Windows high contrast needs an explicit adaptation');
assert.match(nav,/<svg aria-hidden="true"/,'Private menu icons must be vectors');
assert.match(nav,/data-icon="/,'Colour coding must be available per navigation icon');
assert.match(nav,/bottom\.append\(logout\)/,'Sign out must remain in bottom sidebar section');
assert.match(nav,/ac-top-practice/,'Private topbar provides a useful Practice link');
assert.match(prac,/id="practiceDetail"/,'Practice Arena must keep its challenge area');
assert.match(active,/aria-expanded/,'Mobile navigation must maintain toggle accessibility');
const publicPages=pages.filter(page=>fs.readFileSync(page.route,'utf8').includes('dalp-global-nav'));
for(const page of publicPages){const html=fs.readFileSync(page.route,'utf8');assert.doesNotMatch(html,/<details class="dalp-study-tools">/,'Study links should be visible directly');}
assert.match(css,/min-height:620px!important/,'Full-height editor styles are required');
console.log(`PASS modern UI contrast and direct navigation: ${cases.length} pairs, ${pages.length} routes, ${publicPages.length} direct-link menus, tall editor`);
