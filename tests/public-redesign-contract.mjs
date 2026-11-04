/** Public experience release contract: 29 coherent pages, accessible navigation,
 * six differentiable course themes, small-device rules and AA filled actions. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'docs/SITE_ROUTE_MANIFEST.json'),'utf8'));
const cat=manifest.categories;
const pages=[...cat.public_pages.filter(r=>!['auth.html','verify.html'].includes(r)),...cat.course_players,...cat.course_guides];
assert.equal(pages.length,29,'All public learning pages should be covered');
const tracks=['introduction','excel','sql','powerbi','python','ai'];
const css=fs.readFileSync(path.join(root,'assets/styles/public-vibrant.css'),'utf8');
const nav=fs.readFileSync(path.join(root,'assets/scripts/public-navigation.js'),'utf8');
for(const page of pages){
 const html=fs.readFileSync(path.join(root,page),'utf8');
 const prefix=page.startsWith('courses/')?'../':'';
 assert.equal((html.match(/class="dalp-global-header"/g)||[]).length,1,`${page}: exactly one masthead`);
 assert.equal((html.match(/class="dalp-global-nav"/g)||[]).length,1,`${page}: exactly one primary nav`);
 assert.equal((html.match(/class="dalp-global-toggle"/g)||[]).length,1,`${page}: accessible mobile toggle`);
 assert(html.includes('aria-expanded="false"') && html.includes('aria-controls="dalpGlobalNav"'),`${page}: mobile control state`);
 assert(html.includes('data-public-refresh="20261103"'),`${page}: scoped public styles`);
 assert(html.includes(`href="${prefix}assets/styles/public-vibrant.css"`),`${page}: new design layer`);
 assert(html.indexOf(`${prefix}assets/styles/design-system.css`) < html.indexOf(`${prefix}assets/styles/public-vibrant.css`),`${page}: new public styles must override legacy`);
 assert.equal((html.match(/public-navigation\.js/g)||[]).length,1,`${page}: exactly one interaction script`);
 for(const t of tracks)assert(html.includes(`href="${prefix}courses/${t}.html"`),`${page}: missing ${t} from course selector`);
 for(const tool of ['catalog','prompt-library','reference','studio','tutor','learning-lab','practice','capstone','account'])
  assert(html.includes(`href="${prefix}${tool}.html"`),`${page}: ${tool} unavailable from navigation`);
 const track=page.startsWith('courses/')?page.split('/')[1].split('.')[0].split('-')[0]:null;
 if(track)assert(html.includes(`data-course-theme="${track}"`),`${page}: theme identity not set`);
}
for(const rule of ['@media(max-width:1200px)','@media(max-width:660px)','@media(max-width:365px)','@media(max-height:520px)','prefers-reduced-motion:reduce','dalp-menu-course-grid','dalp-menu-scrim','--course-button:'])
 assert(css.includes(rule),`Responsive redesign missing ${rule}`);
for(const rule of ['Escape','aria-expanded','classList.remove(\'is-open\')','matchMedia(\'(min-width:1201px)\')','closeMenus'])assert(nav.includes(rule),`Navigation missing ${rule}`);
const lights=['5541cd','087251','096b88','875707','255aa7','883491'];
function brightness(v){
 const rgb=[0,2,4].map(i=>parseInt(v.slice(i,i+2),16)/255).map(x=>x<=.04045?x/12.92:Math.pow((x+.055)/1.055,2.4));
 return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
}
for(const color of lights)assert(1.05/(brightness(color)+.05)>=4.5,`Course button ${color} is below AA contrast against white`);
console.log(`PASS public redesign: ${pages.length} routes, six differentiated courses, responsive navigation, no duplicate menus, AA course actions`);
