import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Keep the deployment package free from orphan styles/scripts and broken on-site resources.
// This is a static test; actual signed-in and dynamic-content behavior is covered elsewhere.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pagesDir = path.join(root, 'courses');
const pages = [
  ...fs.readdirSync(root).filter(f => f.endsWith('.html')).map(f => path.join(root, f)),
  ...fs.readdirSync(pagesDir).filter(f => f.endsWith('.html')).map(f => path.join(pagesDir, f)),
];
const cssDir = path.join(root, 'assets', 'styles');
const jsDir = path.join(root, 'assets', 'scripts');
const css = new Set(fs.readdirSync(cssDir).filter(f => f.endsWith('.css')));
const js = new Set(fs.readdirSync(jsDir).filter(f => f.endsWith('.js')));
const referencedStyles = new Set();
const referencedScripts = new Set();
let checked = 0;
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  // No page with the modern header should still contain an older hidden duplicate.
  if (html.includes('class="dlx-header"')) {
    assert(!/class="dalp-global-header"[^>]*style="display:none!important"/.test(html),
      `Obsolete duplicate header in ${path.relative(root, file)}`);
  }
  for (const match of html.matchAll(/\b(href|src)\s*=\s*["']([^"']+)["']/g)) {
    const [ , attr, raw] = match;
    if (/^(?:https?:|\/\/|mailto:|tel:|data:|blob:|javascript:|#)/i.test(raw)) continue;
    const pathname = raw.split('#')[0].split('?')[0];
    if (!pathname) continue;
    // Route aliases and user-entered generated values have no file extension.
    const ext = path.extname(pathname).toLowerCase();
    if (!ext) continue;
    const filePath = pathname.startsWith('/')
      ? path.resolve(root, '.' + pathname)
      : path.resolve(path.dirname(file), pathname);
    assert(filePath.startsWith(root + path.sep), `Resource outside project root: ${raw}`);
    assert(fs.existsSync(filePath), `Missing ${attr}=${raw} in ${path.relative(root, file)}`);
    checked++;
    if (filePath.startsWith(cssDir + path.sep)) referencedStyles.add(path.basename(filePath));
    if (filePath.startsWith(jsDir + path.sep)) referencedScripts.add(path.basename(filePath));
  }
}
assert.deepEqual([...css].filter(x=>!referencedStyles.has(x)).sort(), [], 'Orphaned standalone CSS files');
assert.deepEqual([...js].filter(x=>!referencedScripts.has(x)).sort(), [], 'Orphaned browser JS files');
for (const slug of ['introduction','excel','sql','powerbi','tableau','powerquery','statistics']) {
  assert(fs.existsSync(path.join(pagesDir, slug + '.html')), `Missing current course ${slug}`);
}
for (const slug of ['ai','python']) {
  assert(fs.existsSync(path.join(pagesDir, slug + '.html')), `Missing native specialist course ${slug}`);
  assert(fs.existsSync(path.join(pagesDir, slug + '-extension.html')), `Missing curriculum extension ${slug}`);
  assert(!fs.existsSync(path.join(pagesDir, slug + '-roadmap.html')), `Obsolete course roadmap must not ship: ${slug}`);
}
const config = JSON.parse(fs.readFileSync(path.join(root,'vercel.json'),'utf8'));
for(const slug of ['introduction','excel','sql','powerbi']) {
  for(const suffix of ['roadmap','extension']) {
    const old = `/courses/${slug}-${suffix}.html`;
    assert(!fs.existsSync(path.join(root, old.slice(1))), `Unreferenced old guide still shipped: ${old}`);
    assert(config.redirects?.some(x=>x.source===old && x.destination===`/courses/${slug}.html`),
      `Missing backward-compatible redirect for ${old}`);
  }
}
const legacy = JSON.parse(fs.readFileSync(path.join(root, 'docs/SITE_ROUTE_MANIFEST.json'), 'utf8'));
for(const list of Object.values(legacy.categories)) {
  for(const href of list) assert(fs.existsSync(path.join(root, href)), `Stale route manifest entry: ${href}`);
}
console.log(`PASS cleaned deploy assets: ${pages.length} pages; ${referencedStyles.size} CSS; ${referencedScripts.size} JS; ${checked} local file references; 8 legacy redirects`);
