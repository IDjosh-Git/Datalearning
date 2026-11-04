/** Restoration guard: course learning sequence, consistent footer, no loss of premium features. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {discoverPages} from './page-assets.mjs';
const read=f=>fs.readFileSync(f,'utf8');
const home=read('index.html'),catalog=read('catalog.html');
const courseJs=read('assets/scripts/learning-catalog.js');
const footer=read('assets/scripts/public-footer.js');
const css=read('assets/styles/modern-workspace-20261104.css');
const pages=discoverPages();
const slugs=['introduction','excel','sql','powerbi','python','ai'];
for(const id of ['stage-foundations','stage-core','stage-advanced']){
 assert(catalog.includes(`id="${id}"`),`Catalog stage ${id} missing`);
 assert(home.includes(`catalog.html#${id}`),`Homepage stage ${id} missing`);
}
assert.equal((catalog.match(/class="dalp-stage-heading"/g)||[]).length,3,'Three visible catalog group headings expected');
assert.equal((catalog.match(/class="dlp97-card"/g)||[]).length,6,'All six existing catalog cards must survive');
assert.equal((home.match(/class="lp-course"/g)||[]).length,6,'All six existing homepage cards must survive');
for(const slug of slugs){
 assert(catalog.includes(`data-course="${slug}"`),`Catalog lost ${slug}`);
 assert(fs.existsSync(`courses/${slug}.html`),`Core course route missing: ${slug}`);
 for(const ext of ['roadmap','extension'])assert(fs.existsSync(`courses/${slug}-${ext}.html`),`${slug} ${ext} removed`);
}
assert(courseJs.includes('const stages='),'Filter must update stage-heading visibility');
assert(courseJs.includes('dlp97-subject-nav'),'Original course-by-subject navigation must be preserved');
assert(footer.includes('if(document.body)render()'),'Footer must not wait for deferred third-party scripts');
assert(footer.includes('dalp-public-footer__support'),'Original support column must be preserved');
assert(css.includes('body.dlp97-learning-page:not(.lp-home) > .dalp-public-footer'),'Desktop footer should extend over course sidebar width');
assert(css.includes('.dalp-home-course-route'),'Home stage design missing');
assert(css.includes('.dalp-stage-heading'),'Catalog grouping style missing');
const publicPages=pages.filter(p=>p.html.includes('assets/scripts/public-footer.js'));
assert.equal(publicPages.length,30,'Expected original public footer on all 30 routes');
for(const page of publicPages)assert(page.html.includes('<script async src='),`${page.route}: footer should load non-blocking`);
assert(read('tutor.html').includes('aria-label="Tutor workspace sections"'),'Tutor workspace rail lost');
assert(read('practice.html').includes('arena-workspace-visibility.js'),'Practice Arena editor improvements lost');
assert(css.includes('.ide-shell.is-editor-expanded'),'Expanded editor styling lost');
assert((home.match(/data-gradient-public="true"/g)||[]).length>=1,'Premium gradient design missing from dashboard');
assert(read('service-worker.js').includes('dalp-public-premium-coach-arena-v27'),'Updated cache revision required');
console.log('PASS premium restoration: 3 course stages, 6 course cards, 12 study guides, full-width footer on 30 public pages, Tutor and Arena retained');
