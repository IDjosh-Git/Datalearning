/* Private experience regression contract: public design parity and role-safe navigation. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=file=>fs.readFileSync(file,'utf8');
const protectedPages=['admin','progress','reviewer','account','profile','certificate','connection-test','sync-test'];
const publicHome=read('index.html');
const publicLoader=publicHome.slice(publicHome.indexOf('<div id="dlxPageLoader"'),publicHome.indexOf('<script src="assets/scripts/page-loader.js?v=unified-20261110-r2"></script>')+'<script src="assets/scripts/page-loader.js?v=unified-20261110-r2"></script>'.length);
for(const page of protectedPages){
 const markup=read(`${page}.html`);
 assert.match(markup,/data-private-workspace="true"/,`${page}: protected marker`);
 for(const script of ['private-navigation.js','premium-search.js','profile-navigation.js','page-loader.js'])
   assert.equal((markup.match(new RegExp(script.replaceAll('.','\\.'),'g'))||[]).length,1,`${page}: one ${script}`);
 for(const stylesheet of ['public-search-premium.css','private-premium-rebuild.css','page-loader.css'])
   assert.equal((markup.match(new RegExp(stylesheet.replaceAll('.','\\.'),'g'))||[]).length,1,`${page}: one ${stylesheet}`);
 assert.equal((markup.match(/id="dlxPageLoader"/g)||[]).length,1,`${page}: one shared loader`);
 assert(markup.includes(publicLoader),`${page}: loader must match the public academy`);
 assert(markup.includes("classList.add('dlx-loader-pending')"),`${page}: display loader immediately`);
 const searchAt=markup.indexOf('public-search-premium.css'),premiumAt=markup.indexOf('private-premium-rebuild.css'),endHead=markup.indexOf('</head>');
 assert(searchAt>=0&&premiumAt>searchAt&&premiumAt<endHead,`${page}: finishing CSS is last`);
 assert(markup.includes('auth-gate.js'),`${page}: no authentication bypass`);
}
const nav=read('assets/scripts/private-navigation.js');
assert.match(nav,/const learnerNav=\[\s*\{caption:'ACADEMY'/,'Academy group for all authenticated roles');
assert.match(nav,/const adminNav=\[\s*\{caption:'ADMINISTRATION'/,'Admin section clearly separated');
const academy=nav.split('const learnerNav=')[1].split('const moreNav=')[0];
assert.equal((academy.match(/\['[^']+','[^']+\.html','[^']+'\]/g)||[]).length,4,'four compact core Academy routes');
const admin=nav.split('const adminNav=')[1].split('const adminMoreNav=')[0];
assert.equal((admin.match(/\['[^']+','[^']+\.html(?:#[^']+)?','[^']+'\]/g)||[]).length,4,'four purposeful admin routes (overview, unified learners, course analysis, review)');
for(const href of ['account.html','catalog.html','practice.html','tutor.html','study-tools.html','learning-coach.html','studio.html','learning-lab.html','capstone.html','admin.html#admin-courses','admin.html#admin-learners','reviewer.html','connection-test.html','sync-test.html']) assert(nav.includes(`'${href}'`),`missing accessible route ${href}`);
assert(nav.includes('ac-more-details')&&nav.includes('ac-admin-more-details'),'secondary menus collapse by default');
assert(nav.includes("window.DALP_ROLE==='admin'")&&nav.includes('group.hidden=!admin'),'admin navigation role-gated');
assert(!nav.includes('data-learner-only'),'admin still needs Academy access');
assert(!nav.includes('ac-header-profile')&&!nav.includes('ac-header-initial'),'duplicate topbar profile control removed');
assert(nav.includes('aria-expanded')&&nav.includes("e.key==='Escape'"),'accessible drawer');
const profile=read('assets/scripts/profile-navigation.js');
assert(profile.includes('if(host.querySelector(\'.dl-profile-control\'))return'),'one reusable profile control');
const css=read('assets/styles/private-premium-rebuild.css');
for(const token of ['#123d50','#f2a675','.ac-admin-more-details','.ac-top-actions .dl-profile-control','@media(max-width:740px)','prefers-reduced-motion:reduce']) assert(css.includes(token),`missing private styling: ${token}`);
assert(read('assets/styles/public-search-premium.css').includes('dialog.premium-search-dialog'),'shared search panel retained');
assert(read('assets/styles/navigation-search-signout.css').includes('premium-search-trigger.dalp-unified-search'),'shared public/private search control retained');
assert(read('assets/styles/page-loader.css').includes('html.dalp-auth-checking.dlx-loader-pending body>#dlxPageLoader'),'branded loader stays visible during private auth verification');
console.log('PASS protected workspace: 8 secure pages share the new public loader, one profile control, grouped role-safe navigation, shared search and responsive theme');
