import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read = file => fs.readFileSync(path.join(base,file),'utf8');
const css=read('assets/styles/premium-unified.css');
const auth=read('auth.html');
const drawer=read('assets/scripts/course-premium-sidebar.js');
for(const token of [
  'Premium sign-in: clear paper surfaces',
  'body.auth-page::before',
  'background-image:none!important',
  'body.auth-page .auth-story::before',
  'body.auth-page .auth-forms{order:1',
  'Full-viewport course lesson index',
  'inset:0!important;top:0!important',
  'width:100vw!important;min-width:100vw!important;max-width:100vw!important',
  'height:100dvh!important',
  'border:0!important;border-radius:0!important',
  '#sidebar .dl-lesson-drawer-heading',
  'env(safe-area-inset-top)'
]) assert(css.includes(token),`Missing premium auth/full-screen drawer treatment: ${token}`);
assert(auth.includes('class="auth-layout"')&&auth.includes('id="loginForm"')&&auth.includes('id="signupForm"'),'Sign-in and registration forms must be retained');
assert(auth.includes('id="forgotForm"')&&auth.includes('id="resetForm"'),'Account recovery forms must be retained');
assert(drawer.includes('dl-lesson-drawer-dismiss')&&drawer.includes("e.key==='Escape'"),'Drawer must have close control and Escape handling');
for(const slug of ['introduction','excel','sql','powerbi','python','ai']){
 const html=read(`courses/${slug}.html`);
 assert(html.includes('dl-lesson-rail'),'Course must retain full-screen lesson navigation: '+slug);
 assert(html.includes('course-premium-sidebar.js'),'Course must retain accessible drawer controller: '+slug);
}
console.log('PASS overlay-free premium sign-in and mobile full-screen course navigation on six tracks');
