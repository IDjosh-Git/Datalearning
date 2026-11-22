import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pages = [
  ...fs.readdirSync(root).filter(name => name.endsWith('.html') && name !== 'career-setup.html' && name !== 'studio.html'),
  ...fs.readdirSync('courses').filter(name => name.endsWith('.html')).map(name => `courses/${name}`)
];
assert.equal(pages.length, 37, 'All 37 active pages must share the same theme');
const themePath = 'assets/styles/palette-premium-20261113.css';
const theme = fs.readFileSync(themePath, 'utf8');
const cssFiles = fs.readdirSync('assets/styles').filter(name => name.endsWith('.css'));
assert(cssFiles.length >= 56, 'Expected baseline CSS modules to remain available');

for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const hits = html.match(/palette-premium-20261113\.css\?v=20261113-theme-v3/g) || [];
  assert.equal(hits.length, 1, `${page} must use the current theme exactly once`);
  const links = [...html.matchAll(/<link\b[^>]*?href="([^"]+\.css(?:\?[^"]*)?)"[^>]*>/gi)].map(match => match[1]);
  assert(links.length > 0, `${page} must have styles`);
  assert(links[links.length - 1].includes('premium-color-system.css'),
    `${page}: shared premium colour system must be the final stylesheet`);
  assert(!/#(?:F27329|254559|203F58|35637C|F9F7F6|6590A4|F2A675|2E4098|172848)(?![a-f\d])/i.test(html),
    `${page}: retired color remains in markup`);
}
for (const cssName of cssFiles) {
  const css = fs.readFileSync(path.join('assets/styles', cssName), 'utf8');
  assert(!/#(?:F27329|254559|203F58|35637C|F9F7F6|6590A4|F2A675|2E4098|172848)(?![a-f\d])/i.test(css),
    `${cssName}: retired brand color remains`);
}
const requiredTokens = ['#0B0909','#023048','#023048','#675D58','#AFA39A','#E2DCD3','#F0EDDE','#C58A69','#D9BFA4'];
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
assert(loader.includes('background:rgba(2,48,72,.24)') && loader.includes('backdrop-filter:blur(22px)'),
  'Loader should show a blurred view of the page beneath');

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
  ['White header text','#FFFFFF','#023048'],
  ['Muted text on canvas','#675D58','#F0EDDE'],
  ['Link text on canvas','#023048','#F0EDDE'],
  ['Pear accent on navy','#D9BFA4','#023048'],
]) assert(contrast(foreground,background)>=4.5, `${label} must meet WCAG AA`);

console.log(`PASS consistent premium theme on ${pages.length} pages, ${cssFiles.length} active stylesheets, all private gradients, 75% transparent loader and WCAG AA reference colors`);
