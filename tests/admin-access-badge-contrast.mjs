import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = name => readFileSync(name, 'utf8');
const palette=read('assets/styles/palette-premium-20261113.css');
const admin=read('assets/styles/admin-workspace.css');
const nav=read('assets/scripts/private-navigation.js');
const pages=['admin.html','reviewer.html','connection-test.html','sync-test.html'];
assert.match(nav,/class="ac-secure"/, 'The single verified role badge remains in private navigation');
assert.match(nav,/admin\?' Admin access':' Learner space'/, 'Role label still comes from verified admin access');
assert.match(admin,/\.ac-secure\{[^}]*background:rgba\(6,20,27,\.28\)/, 'Legacy admin stylesheet must not paint a pale badge');
assert.match(admin,/\.ac-secure:before\{content:none!important;display:none!important\}/, 'Do not render a duplicate decorative status dot');
const badge=palette.match(/body\.ac-ready \.ac-topbar \.ac-secure\{([^}]+)\}/)?.[1];
assert(badge,'Final shared theme must own the topbar badge surface');
assert.match(badge,/background:rgba\(6,20,27,\.34\)!important/, 'Badge uses a dark translucent surface');
assert.match(badge,/color:#FFFFFF!important/, 'Badge text remains legible');
assert.doesNotMatch(badge,/display:inline-flex!important/, 'Do not override mobile breakpoint hiding of the badge');
const canvas=palette.match(/body\.ac-ready:is\(\.dalp-admin-page,\[data-admin-console="reviews"\],\[data-admin-console="connection"\],\[data-admin-console="sync"\]\)\{([^}]+)\}/)?.[1];
assert(canvas,'Admin-specific canvas rule exists');
assert.match(canvas,/background-color:#EAF0F3!important/, 'Admin canvas is a neutral mist, not a white page-sized panel');
assert.match(palette,/\.ac-main-frame,\.ac-page-area,\.dalp-admin-main,\.review-content,\.px-utility-main\)\{\s*background:transparent!important/, 'No white admin underlay behind content cards');
assert.match(palette,/\.ac-secure-dot\{[\s\S]*?background:#C5E384!important/, 'The single status indicator uses the current accessible accent');
for (const page of pages) {
 const html=read(page);
 assert.match(html,/palette-premium-20261113\.css\?v=20261113-theme-v3/, `${page} uses the cache-busted fix`);
}
function luminance(hex){return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0)}
function ratio(a,b){let [hi,lo]=[luminance(a),luminance(b)].sort((x,y)=>y-x);return (hi+.05)/(lo+.05)}
assert(ratio('#FFFFFF','#06141B')>=7,'White badge text on dark glass has strong contrast');
assert(ratio('#11212D','#EAF0F3')>=7,'Admin content text on neutral canvas has strong contrast');
console.log('PASS administration topbar badge contrast, no white canvas overlay, no duplicate dot, and cache-busted protected routes');
