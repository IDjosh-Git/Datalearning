/** Unified search and public Sign Out: no legacy public/private UI divergence. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const publicRoutes=new Set(['account.html','admin.html','certificate.html','connection-test.html','profile.html','progress.html','reviewer.html','sync-test.html','career-setup.html']);
const routes=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')&&f!=='auth.html'&&f!=='landing.html'&&f!=='start-here.html'&&f!=='career-setup.html'),...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>'courses/'+f)];
const shared='assets/styles/navigation-search-signout.css';
const css=read(shared), search=read('assets/scripts/premium-search.js'),auth=read('assets/scripts/auth-gate.js');
for(const page of routes){
 const html=read(page),pre=page.startsWith('courses/')?'../':'';
 assert.equal((html.match(/navigation-search-signout\.css/g)||[]).length,1,`${page}: one shared search/signout stylesheet`);
 assert.equal((html.match(/premium-search\.js/g)||[]).length,1,`${page}: one working search controller`);
 assert(html.includes(`href="${pre}${shared}?v=20261112-unified"`),`${page}: stylesheet uses correct relative path`);
 const head=html.split('</head>')[0], lastStyle=head.lastIndexOf('navigation-search-signout.css');
 assert(lastStyle>head.indexOf('public-search-premium.css'),`${page}: shared search skin after previous search styles`);
 if(!publicRoutes.has(page)){
  assert(html.includes('class="dlu-header"'),`${page}: unified header preserved`);
 }
}
assert(!read('auth.html').includes('navigation-search-signout.css'),'Sign-in entry does not expose learning header');
for(const part of ["trigger.className='premium-search-trigger dalp-unified-search'",'Search learning','ps-result-grid','ctrlKey','metaKey','aria-expanded']){
 assert(search.includes(part),`Unified search retained ${part}`);
}
for(const part of ['dalpGlobalLogout','dalp-public-signout','dalpPublicSessionCard','dlu-nav-content','dalp-session-email','Administrator account','Learner account','dalp:auth-ready','DALP_SERVER_SESSION?.clear()']){
 assert(auth.includes(part),`Safe public sign-out retained ${part}`);
}
for(const part of ['button.premium-search-trigger.dalp-unified-search','min-width:1360px','max-width:360px','min-width:1650px','dalp-public-signout','dalp-public-session-card','dlu-nav-scroll{box-sizing:border-box','focus-visible','prefers-reduced-motion']){
 assert(css.includes(part),`Shared responsive UI missing ${part}`);
}
assert(!read('assets/styles/public-search-premium.css').includes('/* Unified search action.'),'Retired duplicate public search styling');
assert(!read('assets/styles/private-premium-rebuild.css').includes('/* Match the public search bar'),'Retired duplicate private search styling');
console.log(`PASS shared Search and premium Sign Out across ${routes.length} app pages; public/private responsive and authenticated actions`);
