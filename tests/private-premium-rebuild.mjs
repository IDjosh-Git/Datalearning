/* Private-v5 release invariants: one premium theme, lean nav, same search system. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=file=>fs.readFileSync(file,'utf8');
const protectedPages=['admin','progress','reviewer','account','profile','certificate','connection-test','sync-test'];
for(const page of protectedPages){
 const markup=read(`${page}.html`);
 assert.match(markup,/data-private-workspace="true"/,`${page}: retains protection marker`);
 assert.equal((markup.match(/private-navigation\.js/g)||[]).length,1,`${page}: one private navigation`);
 assert.equal((markup.match(/premium-search\.js/g)||[]).length,1,`${page}: one functional search controller`);
 assert.equal((markup.match(/public-search-premium\.css/g)||[]).length,1,`${page}: public search panel styling`);
 assert.equal((markup.match(/private-premium-rebuild\.css/g)||[]).length,1,`${page}: private premium finish`);
 const searchAt=markup.indexOf('public-search-premium.css'),premiumAt=markup.indexOf('private-premium-rebuild.css'),endHead=markup.indexOf('</head>');
 assert(searchAt>=0&&premiumAt>searchAt&&premiumAt<endHead,`${page}: private finishing layer must be last`);
 assert(markup.includes('auth-gate.js'),`${page}: no auth bypass`);
}
const nav=read('assets/scripts/private-navigation.js');
for(const href of ['account.html','catalog.html','practice.html','study-tools.html','tutor.html','profile.html','learning-coach.html','studio.html','learning-lab.html','capstone.html','admin.html#admin-learners','admin.html#admin-courses','progress.html','reviewer.html'])assert(nav.includes(`'${href}'`),`missing accessible destination ${href}`);
assert.match(nav,/const learnerNav=\[\s*\{caption:'LEARNING SPACE'/,'five learner primary destinations');
const primaryBlock=nav.split('const learnerNav=')[1].split('const moreNav=')[0];
assert.equal((primaryBlock.match(/\['[^']+','[^']+\.html','[^']+'\]/g)||[]).length,5,'sidebar should show only five core learner links');
assert(nav.includes('ac-more-details')&&nav.includes('ac-more-links'),'secondary links collapsed');
assert(nav.includes("window.DALP_ROLE==='admin'")&&nav.includes('group.hidden=!admin')&&nav.includes('group.hidden=admin'),'strict role-aware menus');
assert(nav.includes('aria-expanded')&&nav.includes("e.key==='Escape'"),'accessible mobile drawer');
const css=read('assets/styles/private-premium-rebuild.css');
for(const token of ['#123d50','#f2a675','.ac-top-actions .premium-search-trigger','.ac-more-details','@media(max-width:740px)','prefers-reduced-motion:reduce'])assert(css.includes(token),`missing premium UI contract: ${token}`);
const publicSearch=read('assets/styles/public-search-premium.css');
assert(publicSearch.includes('dialog.premium-search-dialog')&&publicSearch.includes('.ps-result-grid'),'shared search panel retained');
console.log('PASS private rebuild: eight protected pages, shared search panel, five primary learner routes, compact admin menu, role separation and responsive theme');
