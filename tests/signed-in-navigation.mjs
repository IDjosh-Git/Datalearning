import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {restrictedKind} from '../lib/server-auth.js';
import session from '../api/auth/session.js';

const read = file => fs.readFileSync(new URL('../'+file, import.meta.url), 'utf8');
const asset = '/assets/scripts/academy-navigation.js';
const desktop = new Map();
const mobile = new Map();
const routes = [
  ['/', 'public-pages/landing.html', 'Home'],
  ['/start-here', 'public-pages/start-here.html', 'Start Here'],
  ['/free-lesson', 'public-pages/free-lesson.html', 'Free Lesson'],
  ['/career-paths', 'public-pages/career-paths.html', 'Career Paths'],
  ['/courses', 'course-info/catalog.html', 'Explore Courses'],
  ['/courses/excel', 'course-info/excel.html', 'Explore Courses'],
  ['/course-info/sql.html', 'course-info/sql.html', 'Explore Courses'],
  ['/courses/python.html', 'courses/python.html', 'Explore Courses'],
  ['/account.html', 'account.html', 'My Learning'],
  ['/profile.html', 'profile.html', 'My Learning'],
  ['/certificate.html', 'certificate.html', 'My Learning'],
  ['/tutor.html', 'tutor.html', 'AI Tutor'],
  ['/practice', 'practice.html', 'Practice Hub'],
  ['/study-tools.html', 'study-tools.html', 'Study Tools']
];
for (const [path, file, selected] of routes) {
  const html = read(file);
  assert.equal(html.match(/data-academy-navigation/g)?.length, 1, file);
  assert.equal(html.match(/academy-navigation\.js/g)?.length, 1, file);
  assert.doesNotMatch(html, /<header[^>]+class="(?:dlu|dlp)-header"/, file);
  const groups = Array.from({length:10}, (_, i) => ({
    toggleAttribute(name, value) {
      assert.equal(name,'data-current-group');
      if(value)(i<5?desktop:mobile).set(path,i%5);
    }
  }));
  const element = {addEventListener(){}, querySelector(){return this}};
  const visitor = html.includes('data-academy-audience="visitor"');
  const mount = {...element, dataset:visitor ? {academyAudience:'visitor'} : {}, querySelectorAll(selector) {
    return selector.includes('.academy-nav-group,') ? groups : [];
  }};
  vm.runInNewContext(read(asset.slice(1)), {
    document:{querySelector:()=>mount, querySelectorAll:()=>[], addEventListener(){}},
    location:new URL(path,'https://example.test'), URL,
    window:{addEventListener(){}, dispatchEvent(){}}, Event, matchMedia:()=>element,
    fetch:async()=>({ok:true,json:async()=>({signedIn:false})})
  });
  const destinations = [...mount.innerHTML.matchAll(/class="academy-group-link" href="([^"]+)">([^<]+)/g)];
  assert.equal(destinations.length,5);
  assert.equal(destinations[desktop.get(path)]?.[2], selected, path);
  assert.equal(mobile.get(path), desktop.get(path), path);
  assert.equal(destinations[visitor?2:1][1], visitor?'/courses':'/index.html#zaDiscoverCards');
  const suffix = visitor ? '' : '.html';
  for(const slug of ['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai']){
    assert(mount.innerHTML.includes('href="/courses/'+slug+suffix+'"'));
  }
  assert.equal((mount.innerHTML.match(/<dialog/g)||[]).length, 1);
  if (visitor){
    assert.match(mount.innerHTML, /academy-visitor-signin/);
    assert.doesNotMatch(mount.innerHTML, /href="\/(account|tutor|practice-hub|study-tools)\.html"/);
  } else assert.match(mount.innerHTML, /data-academy-profile href="\/auth.html"/);
}
for(const assetPath of [asset,'/assets/scripts/premium-search.js','/assets/scripts/public-footer.js','/assets/styles/academy-navigation.css','/api/branding']){
  assert.equal(restrictedKind(assetPath),'public');
}
for(const path of ['/account.html','/tutor.html','/courses/excel.html','/assets/scripts/tutor.js','/assets/scripts/admin-console.js']){
  assert.notEqual(restrictedKind(path),'public');
}
const headers = new Map();
const res = {setHeader:(key,value)=>headers.set(key,value),end:body=>{res.body=JSON.parse(body)}};
await session({method:'GET',url:'/api/auth/session?status=1',headers:{}},res);
assert.equal(res.statusCode,200);
assert.deepEqual(res.body,{signedIn:false});
assert.equal(headers.has('Set-Cookie'),false);
assert.match(headers.get('Cache-Control'),/no-store/);
console.log('PASS shared Academy navigation on public, generated and protected routes, selected groups and anonymous session privacy');
