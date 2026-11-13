import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pages = [
  ...fs.readdirSync(root).filter(name => name.endsWith('.html')),
  ...fs.readdirSync('courses').filter(name => name.endsWith('.html')).map(name => `courses/${name}`)
];
assert.equal(pages.length, 38, 'All 38 pages must share the same theme');
const themePath = 'assets/styles/palette-premium-20261113.css';
const theme = fs.readFileSync(themePath, 'utf8');
const cssFiles = fs.readdirSync('assets/styles').filter(name => name.endsWith('.css'));
assert.equal(cssFiles.length, 54, 'All active CSS modules remain available');

for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const hits = html.match(/palette-premium-20261113\.css\?v=20261113-theme-v2/g) || [];
  assert.equal(hits.length, 1, `${page} must use the current theme exactly once`);
  const links = [...html.matchAll(/<link\b[^>]*?href="([^"]+\.css(?:\?[^"]*)?)"[^>]*>/gi)].map(match => match[1]);
  assert(links.length > 0, `${page} must have styles`);
  assert(links[links.length - 1].includes('palette-premium-20261113.css') ||
    (page === 'tutor.html' && links[links.length - 1].includes('ai-response-premium.css')),
    `${page}: canonical theme must be the final general-purpose stylesheet`);
  assert(!/#(?:F27329|254559|203F58|35637C|F9F7F6|6590A4|F2A675|2E4098|172848)(?![a-f\d])/i.test(html),
    `${page}: retired color remains in markup`);
}
for (const cssName of cssFiles) {
  const css = fs.readFileSync(path.join('assets/styles', cssName), 'utf8');
  assert(!/#(?:F27329|254559|203F58|35637C|F9F7F6|6590A4|F2A675|2E4098|172848)(?![a-f\d])/i.test(css),
    `${cssName}: retired brand color remains`);
}
const requiredTokens = ['#06141B','#11212D','#253745','#4A5C6A','#9BA8AB','#CCD0CF','#FBFBF8','#6AA6DA','#C5E384'];
for (const token of requiredTokens) assert(theme.includes(token), `Missing theme token ${token}`);
for (const selector of [
  '.account-overview.mld-hero','.profile-hero','.ip-hero','.review-hero',
  '.px-utility-hero','.cert-view-header','.ac-welcome.ac-command-hero',
  '#admin-courses .ac-courses-heading','.ac-roster>.ac-section-header',
  '.chat-head.tutor-toolbar','.ac-topbar'
]) assert(theme.includes(selector), `Missing private header gradient for ${selector}`);
assert(theme.includes('background:var(--dl-gradient-hero)!important'), 'Private page headers need the canonical gradient');
assert(theme.includes('body[data-private-workspace="true"].ac-ready'), 'Private page canvas must not retain old ambient overlays');
assert(theme.includes('prefers-reduced-motion:reduce'), 'Reduced-motion styling must be retained');

const loader = fs.readFileSync('assets/styles/page-loader.css','utf8');
assert(loader.includes('rgba(6,20,27,.27)') && loader.includes('rgba(37,55,69,.22)'),
  'Loader backdrop must remain approximately 75% transparent');

function luminance(hex) {
  return [1,3,5].map(i => parseInt(hex.slice(i,i+2),16)/255)
    .map(v => v <= .04045 ? v / 12.92 : ((v+.055)/1.055)**2.4)
    .reduce((sum,v,i) => sum + v * [.2126,.7152,.0722][i], 0);
}
function contrast(a,b) {
  const [high,low] = [luminance(a),luminance(b)].sort((a,b)=>b-a);
  return (high+.05)/(low+.05);
}
for (const [label,foreground,background] of [
  ['White header text','#FFFFFF','#11212D'],
  ['Muted text on canvas','#4A5C6A','#FBFBF8'],
  ['Link text on canvas','#235A83','#FBFBF8'],
  ['Pear accent on navy','#C5E384','#11212D'],
]) assert(contrast(foreground,background)>=4.5, `${label} must meet WCAG AA`);

console.log(`PASS consistent premium theme on ${pages.length} pages, ${cssFiles.length} active stylesheets, all private gradients, 75% transparent loader and WCAG AA reference colors`);
