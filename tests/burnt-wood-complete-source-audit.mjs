import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Inspect color literals, not legacy CSS variable names. This covers embedded
// styles, generated HTML, JavaScript style strings, and SVG source assets.
const roots = ['assets/styles','assets/scripts','assets/icons','assets/images','courses'];
const files = [];
for (const dir of roots) {
  if (!fs.existsSync(dir)) continue;
  const visit = d => { for (const entry of fs.readdirSync(d,{withFileTypes:true})) {
    const p=path.join(d,entry.name);
    if (entry.isDirectory()) visit(p);
    else if (/\.(?:css|js|html|svg)$/i.test(entry.name)) files.push(p);
  }};
  visit(dir);
}
for (const entry of fs.readdirSync('.')) if (/\.html$/i.test(entry)) files.push(entry);
const palette = new Set([
  '0b0909','023048','770101','f0edde','c58a69','d9bfa4',
  // Accessible warm neutrals, borders, and white for text and data surfaces.
  'ffffff','e9ddd0','675d58','f6f0e8','f7f3ea','e8e1d8','afa39a',
  'f8efe4','f1e3d0','e2dcd3','eee7dd','f7f2ea','ead7c0'
]);
const rgb = new Set([...palette].filter(x=>x.length===6).map(x=>[
  parseInt(x.slice(0,2),16),parseInt(x.slice(2,4),16),parseInt(x.slice(4,6),16)
].join(',')));
rgb.add('0,0,0');
// Product artwork is deliberately exempt from the UI theme palette.
const productIconPalette = new Set(['107c41','185c37','21a366','33c481','e6ad10','f2c811','f8d34f','ffe78b','306998','ffd43b','e97627','1f78b4','4e79a7','217346','a9d18e','c74634','00758f','f29111','50a5b5']);
const issues=[];
let colors=0;
for (const file of files) {
  const source=fs.readFileSync(file,'utf8');
  for (const match of source.matchAll(/(?<![&\w])#([0-9a-f]{3,8})(?![0-9a-f])/gi)) {
    if (match[1].length === 3 && file.endsWith('.js')) continue; // URL fragments and JS string content
    let hex=match[1].toLowerCase();
    if (hex.length===3 || hex.length===4) hex=hex.split('').map(x=>x+x).join('');
    if (hex.length===8) hex=hex.slice(0,6);
    if (hex.length!==6) continue; // e.g. #215 is an anchor, not a color.
    colors++;
    if (!palette.has(hex) && !(file.startsWith('assets/icons/icon-') && productIconPalette.has(hex))) issues.push(`${file}: #${match[1]}`);
  }
  for (const match of source.matchAll(/\brgba?\(\s*(\d+)\s*[, ]\s*(\d+)\s*[, ]\s*(\d+)/gi)) {
    colors++;
    if (!rgb.has([match[1],match[2],match[3]].join(','))) issues.push(`${file}: ${match[0]}`);
  }
  if (/\bhsla?\s*\(/i.test(source)) issues.push(`${file}: HSL literal requires review`);
}
assert.deepEqual(issues.slice(0,30),[],`${issues.length} non-theme colors remain in source`);
const pages=files.filter(p=>p.endsWith('.html') && !p.includes('assets/') && p!=='studio.html');
for (const page of pages) {
  const html=fs.readFileSync(page,'utf8');
  assert(html.includes('burnt-wood-theme.css'),`${page}: canonical theme stylesheet missing`);
}
console.log(`PASS complete Burnt Wood audit: ${files.length} source files, ${colors} explicit color literals, ${pages.length} HTML pages, no retired brand colors`);
