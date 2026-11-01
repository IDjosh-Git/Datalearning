/** Icons come from one maintained file set; card clicks preserve normal nested links. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const courses=[['introduction','intro'],['excel','excel'],['sql','sql'],['powerbi','powerbi'],['python','python'],['ai','ai']];
for(const page of ['catalog.html','index.html']){
 const html=read(page);
 for(const [slug,asset] of courses){
  const courseKey=page==='catalog.html'?'data-course':'data-track';
  const key=slug==='introduction'&&page==='index.html'?'intro':slug;
  const at=html.indexOf(`${courseKey}="${key}"`);
  assert(at>0,`${page}: missing ${slug} card`);
  const segment=html.slice(at,html.indexOf('</article>',at));
  assert(segment.includes(`src="assets/icons/icon-${asset}.svg"`),`${page}: ${slug} has wrong icon`);
  assert.match(segment,/<img[^>]+alt="[^"]+ icon"[^>]*>/,`${page}: ${slug} lacks accessible icon label`);
  assert.match(segment,/href="courses\/[\w-]+\.html"/,`${page}: ${slug} course destination missing`);
  assert(fs.existsSync(path.join(root,`assets/icons/icon-${asset}.svg`)),`Missing ${asset} icon asset`);
 }
 assert.equal((html.match(/<img class="(?:dlp97-course-icon|lp-icon)" src="assets\/icons\/icon-/g)||[]).length,6,`${page} must have six consistent course icons`);
}
for(const [script,cardSelector,linkClass] of [
 ['assets/scripts/learning-catalog.js','.dlp97-card','dlp97-primary'],
 ['assets/scripts/landing-search.js','.lp-course','lp-course-cta']
]){
 const code=read(script);
 assert(code.includes(cardSelector),`${script}: missing card click wiring`);
 assert(code.includes(linkClass),`${script}: missing primary link selection`);
 assert(code.includes("event.target.closest('a,button,input,select,textarea"),`${script}: must not override other links or controls`);
 assert(code.includes('window.getSelection()?.toString().trim()'),`${script}: text selection must not navigate`);
}
const js=read('assets/scripts/learner-home.js');
assert(js.includes('const courseIcons='),'Returning learner icons must use shared assets');
assert(!js.includes('courseIconSvgs'),'Old duplicated inline icon SVG map remains');
for(const [,slug] of courses)assert(js.includes(`icon-${slug}.svg`),'Returning learner icons missing '+slug);
const homeCss=read('assets/styles/home.css');
assert(homeCss.includes('.dl-resume h2{color:#ffffff!important'),'Continue Learning heading should be light on dark');
assert(homeCss.includes('.lp-smart-banner :is(.lp-smart-copy h3'),'Fallback Continue panel heading should have proper contrast');
console.log('PASS six shared icons on Learn and homepage, clickable cards, readable Continue Learning and independent action links');
