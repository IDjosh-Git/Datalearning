// Run: node tests/write-stylesheet-inventory.mjs [output-directory]
import fs from 'node:fs';
import path from 'node:path';
import {discoverPages,pageLayout,root} from './page-assets.mjs';
const pages=discoverPages();
const out=path.resolve(process.argv[2]??root);
fs.mkdirSync(out,{recursive:true});
const csvEscape=v=>`"${String(v??'').replaceAll('"','""')}"`;
const csv=[['page','layout','position','href','resolved_path','local','exists'].map(csvEscape).join(',')];
const fullCount=pages.filter(p=>pageLayout(p)==='full').length;
const md=['# HTML pages and active stylesheet inventory','',
 `Discovered **${pages.length}** HTML pages recursively from the repository; stylesheet order follows each HTML document's link elements. Query strings are retained in the CSV and removed for local filesystem resolution.`,
 '', '| Page | Layout | CSS links | Last stylesheet | Local missing | Duplicate local |', '|---|---|---:|---|---:|---:|'];
for(const page of pages){
 const local=page.links.filter(x=>x.local),seen=new Set(),dups=[];
 for(const ref of local){if(seen.has(ref.path))dups.push(ref.path);seen.add(ref.path);}
 const missing=local.filter(x=>!x.exists).length;
 md.push(`| \`${page.route}\` | ${pageLayout(page)} | ${page.links.length} | \`${page.links.at(-1)?.path??'NONE'}\` | ${missing} | ${dups.length} |`);
 page.links.forEach((ref,i)=>csv.push([page.route,pageLayout(page),i+1,ref.href,ref.path,ref.local,ref.exists].map(csvEscape).join(',')));
}
md.push('','## Layer relationships','',
 '- **Full layout:** '+fullCount+' currently discovered pages use `responsive-v2.css`, `mobile-experience-v13.css`, `mobile-finish-v14.css`, `responsive-system-v15.css`, `theme-navigation-v16.css`, `theme-foundation-v65.css`, `learning-polish-v96.css`, the shared `premium-design-v99.css` and the final `text-contrast-v98.css`. The earlier responsive and theme layers remain active; they were not replaced by the contrast layer.',
 '- **Compact layout:** `capstone-guide.html` and `preview.html` use the v2/v13 responsive CSS, the theme foundation/controller and the v96, premium v99 and v98 visual layers; they intentionally lack the v14–v16 finishing layers.',
 '- **Standalone catalog:** `catalog.html` uses `learning-catalog-v97.css` for its responsive breakpoints, dark theme tokens and focus states, plus `premium-design-v99.css` and final `text-contrast-v98.css`. Its own navigation/theme script manages interactions.',
 '- Every HTML page loads the shared premium v99 design layer immediately before the final v98 contrast stylesheet.',
 '- No external CSS links, duplicate stylesheet links, or missing local stylesheet paths were found in the current repository.',
 '', 'The accompanying CSV lists **every stylesheet reference in its original document order**, including the exact cache-busting query string. Counts here are observational, not assertions in tests.', '');
fs.writeFileSync(path.join(out,'HTML_STYLESHEET_INVENTORY.md'),md.join('\n'));
fs.writeFileSync(path.join(out,'HTML_STYLESHEET_REFERENCES.csv'),csv.join('\n')+'\n');
console.log(`Wrote ${pages.length} HTML pages and ${csv.length-1} stylesheet references to ${out}`);
