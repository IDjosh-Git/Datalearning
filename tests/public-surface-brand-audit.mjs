import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const pages=[...fs.readdirSync(root).filter(n=>n.endsWith('.html')),...fs.readdirSync(path.join(root,'courses')).filter(n=>n.endsWith('.html')).map(n=>'courses/'+n)];
const shared=pages.filter(p=>read(p).includes('dalp-global-header'));
assert.equal(shared.length,28,'28 pages use the unified public header');
for(const page of shared){
 const html=read(page),rel=page.startsWith('courses/')?'../':'';
 assert.equal((html.match(/class="dalp-brand-logo"/g)||[]).length,1,`${page}: one brand mark`);
 assert(html.includes(`src="${rel}assets/icons/da-logo.svg"`),`${page}: correct nested logo path`);
 assert.equal((html.match(/learner-companion\.js/g)||[]).length,1,`${page}: one Learning Coach script`);
 assert.equal((html.match(/class="dalp-global-header"/g)||[]).length,1,`${page}: one public header`);
 const nav=(html.match(/<nav[^>]+class="dalp-global-nav"[^>]*>([\s\S]*?)<\/nav>/)||[])[1]||'';
 assert(nav.includes('My Learning')&&nav.includes('Reference Library'),`${page}: intact nav`);
}
const coach=read('assets/scripts/learner-companion.js');
assert(coach.includes("document.querySelector('.dalp-global-header .dalp-global-nav')"),'Coach must be moved inside shared navigation');
assert(coach.includes('publicNav.appendChild(launch)'),'Coach must be last navigation action');
const css=read('assets/styles/design-system.css');
for(const str of ['--dalp-header-height:56px','.dalp-public-footer','background:#101d33!important','body.lp-home .lp-trust-strip','body .dalp-global-nav .lc-launch','main a[href]:not(.dalp-themed-hero a):not(.account-text-link):not(.card)'])assert(css.includes(str),`theme must contain ${str}`);
const logo=read('assets/icons/da-logo.svg');
assert(logo.includes('viewBox="0 0 96 96"')&&logo.includes('#15243A')&&logo.includes('#FFBD7A'),'Brand mark uses vector dark-slate palette');
assert(!logo.includes('#176B53'),'Old green logo removed');
console.log(`PASS public surface and brand audit: ${shared.length} shared headers, consistent logos and Coach, dark dashboard footer, plain content links`);
