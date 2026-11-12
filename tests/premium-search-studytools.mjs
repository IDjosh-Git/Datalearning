import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const privateRoutes=new Set(['account.html','admin.html','certificate.html','connection-test.html','profile.html','progress.html','reviewer.html','sync-test.html']);
const publicRoutes=[...fs.readdirSync(root).filter(x=>x.endsWith('.html')&&!privateRoutes.has(x)&&x!=='auth.html'),...fs.readdirSync(path.join(root,'courses')).filter(x=>x.endsWith('.html')).map(x=>'courses/'+x)];
const css='assets/styles/public-search-premium.css';
for(const page of publicRoutes){
 const html=read(page);const base=page.startsWith('courses/')?'../':'';
 assert.equal((html.match(/id="dluNavPanel"/g)||[]).length,1,`${page}: shared nav`);
 assert.equal((html.match(/premium-search\.js/g)||[]).length,1,`${page}: one search script`);
 assert.equal((html.match(/public-search-premium\.css/g)||[]).length,1,`${page}: one shared search style`);
 const head=html.split('</head>')[0];
 assert(head.includes(`<link href="${base}${css}" rel="stylesheet"/>`),`${page}: retained the shared search stylesheet`);
 assert(head.includes(`href="${base}assets/styles/access-guard.css`),`${page}: app is protected at first paint`);
}
const search=read('assets/scripts/premium-search.js');
for(const token of ['premiumSearchDialog','ps-filter-list','aria-expanded','aria-haspopup','ps-card','learning-lab.html','study-tools.html','certificate.html','account.html','Search courses and learning tools','keydown'])assert(search.includes(token),`Search behaviour missing: ${token}`);
assert(!search.includes("['progress.html'"),'Retired admin progress destination must not be advertised in search');
const styles=read(css);
const unified=read('assets/styles/navigation-search-signout.css');
assert(unified.includes('premium-search-trigger.dalp-unified-search')&&unified.includes('.dalp-public-session-card'),'Shared search and session card styles are present');
for(const token of ['dialog.premium-search-dialog','ps-result-grid','max-width:640px','dlx-tools-grid>.dlx-tools-card>a::after','focus-visible','prefers-reduced-motion'])assert(styles.includes(token),`Search style missing: ${token}`);
const hub=read('study-tools.html');
const destinations=['learning-coach.html','learning-lab.html','tutor.html','practice.html','studio.html','reference.html','prompt-library.html'];
assert.equal((hub.match(/class="dlx-tools-action"/g)||[]).length,7,'Seven clearly accessible action links');
for(const page of destinations){assert(hub.includes(`href="${page}"`),`${page}: missing tools action`);assert(fs.existsSync(path.join(root,page)),`${page}: destination file missing`)}
console.log(`PASS premium search on ${publicRoutes.length} public routes, seven entire-card Study Tools links, 7 real destinations`);
