import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';
const pages=['index.html','account.html','catalog.html','discover.html','auth.html'];
const report=[];
for(const page of pages){
 if(!fs.existsSync(page))continue;
 const html=fs.readFileSync(page,'utf8');
 assert.match(html,/<meta[^>]*name="viewport"|<meta[^>]*name='viewport'/i,`${page}: mobile viewport missing`);
 const assets=[...html.matchAll(/(?:src|href)=["']([^"']+\.(?:js|css)(?:\?[^"']*)?)["']/gi)].map(x=>x[1].split('?')[0].replace(/^\//,''));
 const local=assets.filter(x=>!/^https?:/.test(x));
 const missing=local.filter(x=>!fs.existsSync(x));
 assert.deepEqual(missing,[],`${page}: missing local assets`);
 const bytes=local.reduce((sum,x)=>sum+fs.statSync(x).size,0);
 report.push({page,assetCount:local.length,uncompressedKB:Math.round(bytes/1024)});
}
assert(report.length>=3,'expected public and authenticated entry points');
fs.mkdirSync('reports',{recursive:true});
fs.writeFileSync('reports/release-quality-budget.json',JSON.stringify({generatedAt:new Date().toISOString(),note:'Referenced local CSS/JS uncompressed sizes; not network transfer or Core Web Vitals.',pages:report},null,2)+'\n');
console.table(report);
console.log('PASS release entry points have mobile viewport and valid local CSS/JS references');
