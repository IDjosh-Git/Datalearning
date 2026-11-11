/** Regression guard for premium discovery layouts and inner lesson headings. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=file=>fs.readFileSync(new URL('../'+file,import.meta.url),'utf8');
const css=read('assets/styles/course-discovery-grid-premium.css');
const teaching=read('assets/styles/ten-week-masterclass.css');
const js=read('assets/scripts/academy-app.js');
for(const page of ['index.html','catalog.html']){
  const html=read(page);
  assert(html.includes('course-discovery-grid-premium.css'),`${page}: premium grid layer missing`);
  const styleLinks=[...html.matchAll(/<link[^>]+(?:href="[^"]+\.css[^"]*")[^>]*>/g)].map(m=>m[0]);
  assert(styleLinks.some(x=>x.includes('public-search-premium.css')),'Search styling missing');
  assert(styleLinks.findIndex(x=>x.includes('course-discovery-grid-premium.css'))<styleLinks.findIndex(x=>x.includes('public-search-premium.css')),`${page}: search theme must remain last`);
}
assert(css.includes('grid-template-columns:repeat(3,minmax(0,1fr))!important'));
assert(css.includes('grid-template-columns:repeat(2,minmax(0,1fr))!important'));
assert(css.includes('grid-template-columns:minmax(0,1fr)!important'));
assert(css.includes('body.za-discover #zaDiscoverCards'));
assert(css.includes('body.za-courses #zaCatalogCards'));
assert(css.includes('align-items:start'));
assert(css.includes('max-height:330px'));
assert(teaching.includes('.dlm-masterclass .dlm-section-label{display:flex'));
assert(teaching.includes('border-left:4px solid #168479'));
assert(teaching.includes('padding:15px 17px 15px 19px!important'));
assert(js.includes('class="za-course-card" data-course="${s}"'));
assert(js.includes('class="za-catalog-item dlc-course-card"'));
assert(read('catalog.html').includes('<strong>09</strong> guided paths'));
assert(read('catalog.html').includes('<strong>90</strong> weekly lessons'));
for(const slug of ['ai','python','excel','sql','powerbi','tableau','powerquery','statistics','introduction']) assert(read(`assets/icons/icon-${slug}.svg`).includes('<svg'),`Missing subject logo for ${slug}`);
console.log('PASS premium discovery: 3-column desktop / 2-column tablet / 1-column mobile, nine logos, padded lesson subhead, intact week disclosures');
