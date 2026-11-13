import assert from 'node:assert/strict';
import fs from 'node:fs';

// Static palette and state-contract regression check. Browser pixel tests still
// belong in a deployed preview (or local browser test environment).
const root = fs.readFileSync('assets/styles/practice-arena-premium-final.css', 'utf8') + '\n' + fs.readFileSync('assets/styles/practice-arena-premium-final.css', 'utf8');
const global = fs.readFileSync('assets/styles/premium-unified.css', 'utf8');
const code = fs.readFileSync('assets/scripts/practice.js', 'utf8');
const ide = fs.readFileSync('assets/scripts/arena-ide.js', 'utf8');

function rgb(hex) {
  const full = hex.replace('#', '');
  assert.match(full, /^[a-f0-9]{6}$/i);
  return [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16) / 255);
}
function brightness(hex) {
  const [r,g,b] = rgb(hex).map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4);
  return .2126 * r + .7152 * g + .0722 * b;
}
function contrast(a, b) {
  const values = [brightness(a), brightness(b)].sort((x,y)=>y-x);
  return (values[0]+.05)/(values[1]+.05);
}
const pairs = {
  'active output tab': ['#FFFFFF', '#023048'],
  'inactive output tab': ['#023048', '#FFFFFF'],
  'hovered output tab': ['#023048', '#F6F0E8'],
  'console diagnostics': ['#F0EDDE', '#023048'],
  'selected challenge': ['#023048', '#F8EFE4'],
  'selection badge': ['#FFFFFF', '#023048'],
  'selected subject': ['#FFFFFF', '#023048'],
  'challenge filter label': ['#023048', '#FFFFFF'],
};
for (const [label,[fg,bg]] of Object.entries(pairs)) {
  assert(contrast(fg,bg) >= 4.5, `${label} contrast must meet WCAG AA normal text`);
  assert(root.includes(fg) && root.includes(bg), `${label} colours must exist in active Arena stylesheet`);
}
for (const key of ['results','schema','console','hints']) {
  assert(ide.includes(`data-ide-tab="${key}"`), `Missing ${key} output tab`);
}
assert(root.includes('button[data-ide-tab][aria-selected="true"]'), 'Selected output tab needs explicit text and fill colour');
assert(root.includes('button[data-ide-tab].is-active'), 'Selected output tab must share visual state with controller');
assert(root.includes('-webkit-text-fill-color:#FFFFFF!important'), 'WebKit selected text must remain light');
assert(root.includes('#challengeModal .pc-card-selection'), 'Selected challenge badge must be visually styled');
assert(code.includes('class="pc-card-selection">Selected</span>'), 'Currently selected challenge must have a visible badge');
assert(code.includes('aria-pressed="${selected?\'true\':\'false\'}"'), 'Accessible challenge selection must remain connected to state');
assert(root.includes('.ide-secondary .ide-panel :is(#ideConsoleMount,#arenaConsole)'), 'Console needs dark-surface contrast for both rendering paths');
assert(!global.includes(':is(.ide-results-tabs,.ide-section-heading,.ide-output-heading) :is(button,span,strong)'), 'Global rule must not darken selected output tab text');
console.log(`PASS Practice Arena contrast: ${Object.keys(pairs).length} WCAG AA colour pairs, 4 output tabs, selected states, console and filter labels`);
