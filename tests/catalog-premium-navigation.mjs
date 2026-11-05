import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = p => fs.readFileSync(p, 'utf8');
const navigation = read('assets/scripts/learning-catalog.js');
const css = read('assets/styles/premium-unified.css');
const catalog = read('catalog.html');
const sw = read('service-worker.js');
assert.match(navigation, /if\(!onCatalog\)document\.body\.prepend\(holder\)/,
  'Standalone catalogue should not mount a second learning navigation');
assert.match(css, /body\.dlp97-catalog-page\.dlp97-learning-page\s*\{[^}]*padding-left:0!important/,
  'Remove the desktop sidebar offset from the catalogue');
assert.match(css, /body\.dlp97-catalog-page \.dlp97-cards\s*\{[^}]*repeat\(3,minmax\(0,1fr\)\)/,
  'Use remaining desktop space with three flexible course columns');
assert.match(css, /@media\(max-width:680px\)[\s\S]*body\.dlp97-catalog-page \.dlp97-cards\{grid-template-columns:minmax\(0,1fr\)/,
  'Course cards should stack on narrow mobile screens');
for (const area of ['dalp-course-menu', 'dalp-tools-menu', 'dalp-course-option', 'dalp-tool-option'])
  assert(css.includes(area), `Premium menu should style ${area}`);
assert.match(css, /\.dalp-menu-panel a\.dalp-menu-all\{[^}]*background:#292064!important/,
  'Menu catalogue CTA should have legible dark background');
assert.match(catalog, /assets\/scripts\/learning-catalog\.js/,
  'Course catalog filtering logic must stay loaded');
assert.match(catalog, /id="dlp97-search"/);
assert.match(catalog, /id="dlp97-clear"/);
assert.match(sw, /dalp-public-catalog-menu-v39/);
console.log('PASS catalogue fills width with no duplicate sidebar, mobile grid remains flexible, and dropdowns retain their actions');
