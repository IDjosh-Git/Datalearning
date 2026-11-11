import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = p => fs.readFileSync(p,'utf8');
const nav = read('assets/scripts/private-navigation.js');
const shared = read('assets/styles/private-workspace.css');
const sys = read('assets/styles/design-system.css');
const guard = read('assets/styles/access-guard.css');
const pages = ['admin.html','progress.html','reviewer.html'];
for (const page of pages) {
 const html=read(page);
 assert.equal((html.match(/assets\/scripts\/private-navigation\.js/g)||[]).length,1,`${page}: exactly one shared navigation initializer`);
 assert.equal((html.match(/assets\/scripts\/admin-console\.js/g)||[]).length,1,`${page}: one administrator modal controller`);
 assert.equal((html.match(/assets\/styles\/admin-workspace\.css/g)||[]).length,1,`${page}: one admin skin`);
 assert.equal((html.match(/assets\/styles\/access-guard\.css/g)||[]).length,1,`${page}: one shared fail-closed guard`);
 assert(html.includes('auth-gate.js'),`${page}: route still protected`);
 assert(!html.includes('class="nav-shell"'),`${page}: obsolete header removed`);
}
assert(nav.includes('ac-side-nav') && nav.includes('ac-mobile-menu') && nav.includes('ac-drawer-close'),'One accessible desktop/mobile sidebar');
assert(!nav.includes('ac-mobile-tabs'),'Duplicated mobile navigation removed at source');
assert(!shared.includes('.ac-mobile-tabs'),'Obsolete mobile navigation styling physically removed');
for (const href of ['admin.html','admin.html#admin-courses','admin.html#admin-learners','reviewer.html']) {
 assert(nav.includes(href),`Admin navigation target ${href} missing`);
}
assert(shared.includes('background:#203a57!important'),'Admin toolbar uses dark contrast colour');
assert(shared.includes('background:#263d5d!important'),'Admin overview has a dark coloured hero');
assert(shared.includes('.review-hero{background:#203F58!important'),'Review desk has distinct dark banner');
assert(shared.includes('background:var(--ui-nav-ink)!important'),'Progress banner has dark slate treatment');
for(const c of ['auth-entry-premium','progress','reviewer','certificate','private-utilities-premium']){
 assert(fs.statSync('assets/styles/'+c+'.css').size<45000,`${c} contains old oversized site-wide styling`);
}
for (const page of ['certificate.html','connection-test.html','sync-test.html']) {
 const html=read(page);
 assert(!html.includes('dalp-utility-header'),`${page}: duplicate utility header removed`);
 assert(html.includes('assets/scripts/private-navigation.js'),`${page}: shared private navigation`);
 if(page!=='certificate.html')assert(html.includes('private-utilities-premium.css'),`${page}: new premium diagnostic theme`);
 assert(nav.includes('account.html') && nav.includes('index.html'),`${page}: shared navigation retains account and learning portal`);
 assert(!/auth-flow\.js/.test(html),`${page}: no duplicate auth page bundle`);
}
assert(shared.includes('.ac-topbar'),'Utility pages now use the single private topbar');
assert(guard.includes('html.dalp-auth-checking body > *:not(#dalp-auth-gate):not(#dlxPageLoader)'),'Fail-closed hidden private content retained');
assert(read('assets/scripts/private-navigation.js').includes('group.hidden=!admin'),'Admin account links require verified role');
for(const type of ['admin','progress','reviewer','certificate']){
 assert(!read(`assets/styles/${type}.css`).includes('radial-gradient('),`${type}: retired decorative gradients remain`);
}
const css=read('assets/styles/account.css');
assert(css.includes('@media(max-width:680px)'),'Learner account phone layout');
assert(shared.includes('@media(max-width:760px)') && shared.includes('@media(max-width:1024px)'),'Admin mobile and tablet layout');
function lum(hex){return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0)}
function ratio(a,b){const [hi,lo]=[lum(a),lum(b)].sort((x,y)=>y-x);return (hi+.05)/(lo+.05)}
for(const [fg,bg] of [['#f4f8ff','#203a57'],['#e0eaf6','#263d5d'],['#ffffff','#3b365c'],['#3035b0','#ffffff']])assert(ratio(fg,bg)>=4.5,`Protected colour contrast ${fg}/${bg}`);
console.log('PASS protected workspace refresh: no duplicated mobile navigation, shared guard, five maintained route styles (unified premium diagnostics), distinct readable headers, responsive layouts and correct protected links');
