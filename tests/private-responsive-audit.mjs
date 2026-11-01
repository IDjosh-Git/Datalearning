import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const routes=['admin','progress','reviewer','account','certificate','connection-test','sync-test'];
const nav=read('assets/scripts/private-navigation.js');
const shared=read('assets/styles/private-workspace.css');
for(const page of routes){
 const html=read(`${page}.html`);
 assert.match(html,/data-private-workspace="true"/,`${page}: should be a private workspace`);
 assert.equal((html.match(/src="assets\/scripts\/private-navigation\.js"/g)||[]).length,1,`${page}: needs exactly one shared navigation`);
 assert.ok(!/src="assets\/scripts\/learning-coach\.js"/.test(html),`${page}: no Learning Coach`);
 assert.match(html,/name="viewport"[^>]*width=device-width|content="width=device-width[^>]*"\s+name="viewport"/,`${page}: mobile viewport`);
 assert.match(html,/id="main-content"/,`${page}: main content landmark`);
}
assert.match(nav,/matchMedia\('\(min-width: 1025px\)'\)/, 'responsive drawer desktop breakpoint');
assert.match(nav,/aria-expanded/, 'menu state available to screen readers');
assert.match(nav,/e\.key==='Escape'/, 'drawer Escape dismissal');
assert.match(nav,/data-admin-only/, 'admin-only navigation stays role-gated');
assert.match(shared,/max-width:350px/, 'narrow-phone layout must be present');
assert.match(shared,/\.ip-panel \.ip-table-wrap\{width:calc\(100% - 24px\)/, 'progress table fits card inner padding');
assert.match(shared,/\.private-table-help\{display:none/, 'table scrolling help does not clutter desktop');
for(const [page,regex] of [
 ['admin',/class="dalp-admin-table-wrap"[^>]*role="region"[^>]*tabindex="0"/],
 ['progress',/class="ip-table-wrap"[^>]*role="region"[^>]*tabindex="0"/],
 ['account',/class="account-table-scroll"[^>]*role="region"[^>]*tabindex="0"/],
 ['certificate',/class="certificate-paper-wrapper"[^>]*role="region"[^>]*tabindex="0"/]
]) assert.match(read(`${page}.html`),regex, `${page}: a keyboard-scrollable data region`);
assert.match(read('assets/styles/certificate.css'),/\.cert-view-wrap\{box-sizing:border-box;width:100%!important/, 'certificate width includes its padding');
assert.match(read('assets/styles/account.css'),/max-width:480px/, 'learner account uses small-phone gutters');
console.log(`PASS protected responsive structure: ${routes.length} private pages, menu keyboard access, device gutters, accessible horizontal table/certificate scrolling`);
