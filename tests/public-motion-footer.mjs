/* Public motion + footer quality: contract for progressive enhancement and responsive controls. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {discoverPages,root} from './page-assets.mjs';
import path from 'node:path';
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
assert(read('overview.html').includes('assets/scripts/public-footer.js'),'New overview page needs shared public footer');
const publicRoutes=discoverPages().filter(p=>p.html.includes('data-public-refresh="20261103"'));
assert.equal(publicRoutes.length,29);
for(const page of publicRoutes){
 assert.equal(page.links.at(-1)?.path,'assets/styles/premium-unified.css',`${page.route}: shared premium CSS must load last`);
 const scripts=page.scripts.map(x=>x.path);
 assert.equal(scripts.filter(x=>x==='assets/scripts/public-motion.js').length,1,`${page.route}: missing public motion controller`);
 assert.equal(scripts.filter(x=>x==='assets/scripts/public-footer.js').length,1,`${page.route}: shared footer missing`);
}
assert(read('verify.html').includes('assets/styles/public-experience.css'),'Certificate verification footer must match the public design');
assert(!read('auth.html').includes('public-footer.js'),'Sign-in page must stay footer-free');
const motion=read('assets/scripts/public-motion.js');
assert(motion.includes('prefers-reduced-motion: reduce'),'Respect reduced motion');
assert(motion.includes('IntersectionObserver'),'Use intersection animation without global scroll listeners');
assert(!/\.style\.opacity\s*=\s*['"]?0/.test(motion),'Never hide public content on startup');
const css=read('assets/styles/public-experience.css');
for(const selector of ['.dalp-footer-invite','.dalp-public-footer__grid','.dalp-public-footer__brand-mark','@media(max-width:480px)','prefers-reduced-motion:reduce',':focus-visible'])
 assert(css.includes(selector),`Missing footer/motion styling: ${selector}`);
assert(css.includes('body[data-public-refresh].dlp97-catalog-page'),'Public catalogue must not inherit private sidebar padding');
const footer=read('assets/scripts/public-footer.js');
assert(footer.includes('dalp-footer-invite'),'Shared footer should contain a clear invitation');
assert(footer.includes('dalp-public-footer__bottom'),'Shared footer should have final utility links');
assert(footer.includes("href('catalog.html')"),'Footer must link to catalogue');
assert(footer.includes('mailto:esoterikjoshua@gmail.com'),'Support route must remain');
const gate=read('assets/styles/access-guard.css');
assert(gate.includes('box-sizing:border-box'),'Loading card should not overflow narrow screens');
assert(gate.includes('prefers-reduced-motion:reduce'),'Loading card must avoid spinning if reduced motion requested');
console.log(`PASS public motion/footer quality: ${publicRoutes.length} public routes, shared responsive footer, safe entrance effects, reduced-motion gate and footer-free sign-in.`);
