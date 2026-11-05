/** Discover is an editorial learning hub, not a duplicate course catalogue. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=f=>readFileSync(new URL('../'+f,import.meta.url),'utf8');
const home=read('index.html'), catalog=read('catalog.html'),css=read('assets/styles/premium-unified.css');
assert.equal((home.match(/class="[^"]*\blp-course(?=[\s"])/g)||[]).length,0,'Do not bring back home course cards');
assert(!home.includes('id="resumeCourseLink"'),'Personal resume dashboard stays in My Learning');
assert(!home.includes('id="courseSearch"'),'Course filtering belongs on Explore all courses');
assert(home.includes('id="lp-pathfinder-form"') && home.includes('id="path-result-link"'),'Maintain the interactive starting-point guide');
assert.equal((catalog.match(/class="dlp97-card"/g)||[]).length,6,'Catalogue retains six navigable course cards');
for(const slug of ['introduction','excel','sql','powerbi','python','ai'])assert(catalog.includes(`href="courses/${slug}.html"`),`Missing ${slug} course`);
assert(home.includes('href="catalog.html"'),'Discover must lead to the course catalogue');
assert(css.includes('.dlp-journey-grid') && css.includes('.dlp-session-flow'),'Editorial content needs maintained premium styling');
console.log('PASS: Discover has no duplicate course cards, preserves pathfinder, and links to six complete catalogued courses');
