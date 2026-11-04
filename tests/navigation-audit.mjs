import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {discoverPages} from './page-assets.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const pages=discoverPages();
const source=new Map(pages.map(p=>[p.route,p.html]));
const expected=[['Dashboard','index.html'],['Courses','catalog.html'],['AI Course','courses/ai.html'],['Practice Arena','practice.html'],['My Learning','account.html']];
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
for(const page of ['index.html','catalog.html','prompt-library.html','reference.html','tutor.html','capstone.html','practice.html','learning-lab.html','studio.html']){
 const html=source.get(page);
 const nav=html.match(/<header\b[\s\S]*?<nav\b[^>]*class=["'][^"']*dalp-global-nav[^"']*["'][^>]*>([\s\S]*?)<\/nav>/i)?.[1];
 assert(nav,`${page}: missing shared primary nav`);
 const direct=nav.replace(/<details\b[\s\S]*?<\/details>/i,'');
 const actual=[...direct.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].map(m=>[m[2].replace(/<[^>]+>/g,'').trim(),m[1]]);
 assert.deepEqual(actual,expected,`${page}: direct primary navigation mismatch`);
 assert.match(nav,/<details class="dalp-study-tools">\s*<summary>/,`${page}: accessible Study tools disclosure missing`);
 const submenu=nav.match(/<div class="dalp-study-panel">([\s\S]*?)<\/div>/)?.[1] || '';
 const studyExpected=[['Learning Lab','learning-lab.html'],['Prompt Library','prompt-library.html'],['Reference Library','reference.html'],['Capstone Studio','capstone.html'],['AI Tutor','tutor.html']];
 const studyActual=[...submenu.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].map(m=>[m[2].replace(/<span class="dalp-menu-symbol"[^>]*>.*?<\/span>/g,'').replace(/<[^>]+>/g,'').trim(),m[1]]);
 assert.deepEqual(studyActual,studyExpected,`${page}: study resource links mismatch`);
 assert.equal((html.match(/<nav\b[^>]*class=["'][^"']*dalp-global-nav/g)||[]).length,1,`${page}: duplicate primary navigation`);
 assert.match(html,/assets\/scripts\/public-navigation\.js/,`${page}: no responsive menu handler`);
}
console.log(`PASS navigation audit: ${pages.length} pages, ${total} local HTML links, ${dynamic} dynamically generated checkpoint anchors, shared primary navigation consistent.`);
