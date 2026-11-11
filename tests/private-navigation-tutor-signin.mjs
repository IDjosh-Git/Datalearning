/** Private workspace navigation, Tutor composer, and sign-in theme regression. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {restrictedKind} from '../lib/server-auth.js';
const read = path => fs.readFileSync(path,'utf8');
const privatePages=['admin.html','progress.html','reviewer.html','account.html','certificate.html','connection-test.html','sync-test.html'];
const adminPages=new Set(['admin.html','progress.html','reviewer.html']);
const navigation=read('assets/scripts/private-navigation.js');
const adminController=read('assets/scripts/admin-console.js');
const styles=read('assets/styles/private-workspace.css');
for(const file of privatePages){
 const html=read(file);
 assert.equal((html.match(/assets\/scripts\/private-navigation\.js/g)||[]).length,1,`${file}: exactly one shared navigation`);
 assert.equal((html.match(/assets\/styles\/(?:private|admin)-workspace\.css/g)||[]).length,1,`${file}: one private layout skin`);
 assert(!html.includes('learner-companion.js'),`${file}: no Learning Coach`);
 assert(!html.includes('public-navigation.js'),`${file}: no conflicting public menu`);
 assert(!html.includes('dalp-global-header')&&!html.includes('dalp-utility-header'),`${file}: obsolete header removed`);
 assert(html.includes('auth-gate.js'),`${file}: must verify identity`);
 assert(html.includes('data-private-workspace="true"'),`${file}: marked private`);
 if(adminPages.has(file)){
  assert(html.includes('admin-console.js'),`${file}: administrator detail handling retained`);
  assert(html.includes('admin-workspace.css'),`${file}: admin styling retains protected asset boundary`);
 }else{
  assert(!html.includes('admin-console.js'),`${file}: admin-only script should not load for learner`);
  assert(html.includes('private-workspace.css'),`${file}: public-safe nav skin required`);
 }
}
assert.equal(restrictedKind('/assets/scripts/admin-console.js'),'adminAsset');
assert.equal(restrictedKind('/assets/styles/admin-workspace.css'),'adminAsset');
assert.notEqual(restrictedKind('/assets/scripts/private-navigation.js'),'adminAsset','Learners must be able to load shared navigation');
assert.notEqual(restrictedKind('/assets/styles/private-workspace.css'),'adminAsset','Learners must be able to load shared styling');
for(const destination of ['admin.html#admin-courses','admin.html#admin-learners','reviewer.html','account.html','index.html'])assert(navigation.includes(destination),`Missing role-aware route ${destination}`);
assert(navigation.includes('wrap.hidden=true')&&navigation.includes("window.DALP_ROLE==='admin'")&&navigation.includes('group.hidden=!admin'),'Admin links hidden until verified administrator role');
assert(navigation.includes('ac-mobile-menu')&&navigation.includes('aria-expanded')&&navigation.includes("e.key==='Escape'"),'Mobile drawer keyboard handling');
assert(!navigation.includes('ac-mobile-tabs')&&!adminController.includes('ac-side-nav'),'Only shared script constructs navigation');
assert(styles.includes('.ac-sidebar')&&styles.includes('.ac-topbar')&&styles.includes('@media(max-width:760px)'),'Shared desktop/mobile presentation');
assert(styles.includes('prefers-reduced-motion:reduce'),'Protected workspace reduced motion');
const tutor=read('tutor.html'),tutorCss=read('assets/styles/tutor.css');
assert(tutor.includes('class="tutor-compose-icon"')&&tutor.includes('<svg'),'AI icon replaces visible question label');
assert(tutor.includes('rows="1"')&&tutor.includes('id="chatQuestion"')&&tutor.includes('id="sendQuestion"'),'Compact composer retains real controls');
assert(tutor.includes('class="sr-only" for="chatQuestion"'),'Composer retains accessible name');
assert(tutorCss.includes('height:42px!important')&&tutorCss.includes('flex-wrap:nowrap!important'),'Compact composer responsive styles');
const auth=read('assets/styles/auth-entry-premium.css');
assert(auth.includes('linear-gradient(')&&auth.includes('radial-gradient(')&&auth.includes('.auth-story'),'Sign-in has requested gradients and motion');
assert(auth.includes('prefers-reduced-motion:reduce'),'Sign-in respects reduced motion');
assert(auth.length < 30000,'Remove obsolete cross-page theme rules from sign-in stylesheet');
assert(!auth.includes('.auth-story::before,.auth-story::after{display:none!important'),'Decorative gradient shapes must not be hidden');
console.log(`PASS shared private navigation on ${privatePages.length} role-gated pages, no coach or duplicate headers, accessible Tutor composer and motion-aware sign-in gradient`);
