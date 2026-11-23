import fs from 'node:fs';import assert from 'node:assert/strict';
const destinations=[['My Learning','account.html'],['Explore Courses','index.html#zaDiscoverCards'],['Practice Hub','practice.html'],['AI Tutor','tutor.html'],['Study Tools','study-tools.html']];
let count=0;
for(const file of [...fs.readdirSync('.').filter(x=>x.endsWith('.html')),...fs.readdirSync('courses').filter(x=>x.endsWith('.html')).map(x=>'courses/'+x)]){
 const html=fs.readFileSync(file,'utf8');if(!html.includes('class="dlu-header"'))continue;
 const header=html.match(/<header\b[^>]*class="dlu-header"[\s\S]*?<\/header>/)?.[0];assert(header,file);
 const nav=header.match(/<nav aria-label="Main navigation" class="dlu-primary-links">([\s\S]*?)<\/nav>/)?.[1];assert(nav,file);
 const links=[...nav.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*class="dlx-nav-main"[^>]*>(.*?)<\/a>/g)];
 assert.equal(links.length,5,`${file} five primary links`);
 for(let i=0;i<5;i++){const [label,dest]=destinations[i];assert.equal(links[i][2],label,`${file} label`);const target=new URL(links[i][1],`https://example.test/${file}`);assert.equal(target.pathname,'/'+dest.split('#')[0]);assert.equal(target.hash,dest.includes('#')?'#'+dest.split('#')[1]:'');assert(fs.existsSync(dest.split('#')[0]));assert(nav.includes(`id="dlx-submenu-${i}"`));}
 assert(html.includes('dlx-drawer-group'),`${file} missing mobile groups`);assert(!html.includes('dlu-dashboard-compact'),`${file} duplicate My Learning shortcut`);count++;
}
assert.equal(count,28);console.log(`PASS ${count} shared headers, five distinct primary destinations, desktop dropdowns and mobile groups`);
