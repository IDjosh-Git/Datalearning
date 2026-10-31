import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const ctx={window:{}};
vm.runInNewContext(read('assets/catalog-data-v97.js'),ctx);
const courses=ctx.window.DALP_COURSES_V97;
const slugs=['introduction','excel','sql','powerbi','python','ai'];
assert.deepEqual(Object.keys(courses),slugs,'Catalog must reflect six real course pages');
const catalog=read('catalog.html');
const shared=read('assets/learning-catalog-v97.js');
const styling=read('assets/learning-catalog-v97.css');
assert(catalog.includes('<h1 id="catalog-title">Explore all courses</h1>'));
assert(!catalog.includes('auth-gate.js')&&!catalog.includes('dalp-auth-checking'));
assert(catalog.includes('dlp97-empty-clear')&&catalog.includes('dlp97-category')&&catalog.includes('dlp97-search'));
assert(shared.includes("'account.html'")&&!shared.includes("'progress.html'"),'Do not link learner navigation to administrator-only progress route');
assert(shared.includes('aria-current')&&shared.includes('aria-expanded')&&shared.includes("ev.key==='Escape'"));
assert(shared.includes("search.addEventListener('input',apply)")&&shared.includes("subject.addEventListener('change',apply)"));
assert(shared.includes("'return'")&&read('assets/auth-flow.js').includes('location.replace(target)'));
assert(shared.includes('window.ZAHProgressCloud.syncCourse(course,{user})')&&shared.includes('window.ZAHProgressCloud.syncAll({user})'));
assert(shared.includes('cb.disabled=!user')&&shared.includes("new CustomEvent('dalp:auth-ready'"));
assert(styling.includes('prefers-reduced-motion')&&styling.includes(':focus-visible')&&styling.includes('html[data-theme="dark"]'));
assert(styling.includes('@media(max-width:1100px)')&&styling.includes('overflow-x:auto'));
for (const slug of slugs){
 const c=courses[slug],file=`courses/${slug}.html`,html=read(file);
 assert(c&&html.includes('catalog-data-v97.js')&&html.includes('learning-catalog-v97.js'),`missing shared shell on ${slug}`);
 assert(!html.includes('auth-gate.js')&&!html.includes("classList.add('dalp-auth-checking')"),`unexpected redirect on ${slug}`);
 assert(c.units.length===(slug==='introduction'?8:10),`incorrect number of modules: ${slug}`);
 assert(c.level&&c.duration&&c.description&&c.topics.length===3);
 for(const unit of c.units){assert(html.includes(`id="${unit.id}"`),`dead #${unit.id} link in ${slug}`);assert(unit.title,`missing module title ${slug}`);}
 assert(catalog.includes(`href="courses/${slug}.html"`),`missing catalog link ${slug}`);
 assert(fs.existsSync(path.join(root,`assets/icon-${c.icon}.svg`)),`missing course icon ${slug}`);
}
assert(read('index.html').includes('href="catalog.html"'),'Dashboard must link to public catalog');
for(const link of ['index.html','catalog.html','account.html','reference.html'])assert(fs.existsSync(path.join(root,link)),`Missing nav target ${link}`);
console.log('PASS v97: public 6-course catalog, 58 anchored units, route links, existing progress sync, mobile/keyboard semantics');
