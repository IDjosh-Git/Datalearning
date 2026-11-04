import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {discoverPages} from './page-assets.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const pages=discoverPages();
const source=new Map(pages.map(p=>[p.route,p.html]));
const expectedTop=['Home','Overview','Courses','Study tools','Capstone','My learning'];
const expectedCourses=['introduction','excel','sql','powerbi','python','ai'];
let total=0, dynamic=0;
for (const page of pages) {
  for(const match of page.html.matchAll(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi)) {
    const href=match[1];if (/^(?:https?:|mailto:|tel:|javascript:|\/\/)/i.test(href))continue;
    const uri=new URL(href,'https://example.test/'+page.route);
    const target=decodeURIComponent(uri.pathname).replace(/^\//,'') || page.route;
    if(!target.endsWith('.html'))continue;
    assert(source.has(target),`${page.route}: missing destination ${href}`);
    if(uri.hash) {
      const id=decodeURIComponent(uri.hash.slice(1));
      const html=source.get(target);
      const found=new RegExp(`\\bid=["']${id.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}["']`).test(html);
      if(!found){
        // The mastery checkpoint is dynamically created by course-checkpoints.js.
        assert.equal(id,'course-mastery-checkpoint',`${page.route}: broken anchor ${href}`);
        assert.match(html,/course-checkpoints\.js/,`${target}: missing dynamic checkpoint script`);
        dynamic++;
      }
    }
    total++;
  }
}
for(const page of ['index.html','catalog.html','prompt-library.html','reference.html','tutor.html','capstone.html','practice.html','learning-lab.html','studio.html', 'courses/introduction.html','courses/excel.html','courses/sql.html','courses/powerbi.html','courses/python.html','courses/ai.html']){
 const html=source.get(page),prefix=page.startsWith('courses/')?'../':'';
 const nav=html.match(/<nav\b[^>]*class=["'][^"']*dalp-global-nav[^"']*["'][^>]*>([\s\S]*?)<\/nav>/i)?.[1];
 assert(nav,`${page}: missing primary navigation`);
 for(const term of expectedTop)assert(nav.includes(term),`${page}: missing ${term} top-level navigation`);
 assert.equal((nav.match(/class="dalp-nav-link(?: dalp-overview-nav)?"/g)||[]).length,5,`${page}: unexpected top-level nav repetition`);
 for(const slug of expectedCourses)assert(nav.includes(`href="${prefix}courses/${slug}.html"`),`${page}: ${slug} course not discoverable`);
 for(const target of ['reference.html','prompt-library.html','tutor.html','studio.html','learning-lab.html','practice.html','capstone.html','account.html'])
   assert(nav.includes(`href="${prefix}${target}"`),`${page}: missing ${target}`);
 assert.equal((html.match(/<nav\b[^>]*class=["'][^"']*dalp-global-nav/g)||[]).length,1,`${page}: duplicate primary nav`);
 assert.match(html,/assets\/scripts\/public-navigation\.js/,`${page}: no responsive menu handler`);
}
console.log(`PASS navigation audit: ${pages.length} pages, ${total} local HTML links, ${dynamic} dynamically generated checkpoint anchors, shared primary navigation consistent.`);
