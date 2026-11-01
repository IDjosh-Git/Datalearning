/** Focused regression coverage for the desktop + Practice Arena refinements. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {discoverPages} from './page-assets.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const home=read('index.html');
const arena=read('assets/scripts/arena-stability.js');
const styles=read('assets/styles/layout-tuning.css');
for(const page of discoverPages()){
 const guide=/-roadmap\.html$|-extension\.html$/.test(page.route);
 const expected=guide?'assets/styles/course-guide-pages.css':page.route.startsWith('courses/')?'assets/styles/course-page-improvements.css':'assets/styles/layout-tuning.css';
 assert.equal(page.links.at(-2)?.path,expected,`${page.route}: missing final style layer`);
}
assert.equal((home.match(/class="lp-studio-cta"/g)||[]).length,6,'Six course studio links must be retained');
assert.match(styles,/\.lp-course-footer a\.lp-studio-cta:visited/,'Standalone studio links must have accessible visited styling');
assert.match(styles,/background:transparent!important/,'Studio links must not look like cards');
assert.match(styles,/footer\.footer/,'Shared support footer must be styled');
assert.match(read('assets/styles/design-system.css'),/background:#101010!important/,'Contact Support must remain black');
assert.match(styles,/max-width:1800px!important/,'Arena needs a wider desktop canvas');
assert.match(styles,/\.ide-content:has\(>\.arena-task-panel\.is-collapsed\)/,'Collapsed brief must release desktop column space');
assert.match(styles,/@media\(max-width:767px\)/,'Mobile layout protection is required');
assert.match(arena,/aria-controls=\\?"arenaTaskBody\\?"/,'Details toggle must identify the controlled element');
assert.match(arena,/\.hidden=collapsed/,'Hide Details must toggle its content visibility');
assert.match(arena,/aria-expanded/,'Hide Details must expose state to assistive technology');
const vercel=JSON.parse(read('vercel.json'));
assert.equal(vercel.outputDirectory,'.','Static Vercel deployment must resolve the root HTML folder');
console.log('PASS layout tuning: plain studio links, dark compact footer, adaptive desktop widths, accessible collapsible details, Vercel root output');
