import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import assert from 'node:assert/strict';
const cwd=process.cwd(); const read=p=>fs.readFileSync(path.join(cwd,p),'utf8');
const data={window:{}};vm.runInNewContext(read('assets/scripts/week-learning-resources.js'),data);const m=data.window.DALP_WEEK_MEDIA;
const slugs=['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'];
assert.deepEqual(Object.keys(m).sort(),slugs.sort());let lessons=0;
for(const slug of slugs){
 const h=read(`courses/${slug}.html`);assert.match(h,/week-learning-resources\.js/);assert.match(h,/weekly-media-premium\.css/);assert.match(h,/course-video-player\.js/);
 assert.equal(m[slug].length,10);
 for(const [i,w] of m[slug].entries()){
  assert.equal(w.week,i+1);assert.match(w.video,/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}/);assert.ok(w.why.length>75);assert.ok(w.workthrough.length>65);assert.ok(w.evidence.length>50);
  assert.ok(fs.existsSync(path.join(cwd,'downloads',w.dataset)),`${slug} ${i+1} dataset missing`);
  const worksheet=path.join(cwd,'downloads',w.worksheet);assert.ok(fs.existsSync(worksheet),worksheet);
  assert.ok(fs.statSync(worksheet).size>1250,worksheet);
  assert.match(read('downloads/'+w.worksheet),/## Independent practical challenge/);
  lessons++;
 }
}
const app=read('assets/scripts/academy-app.js');for(const token of ['${kitHtml}','${deepHtml}','data-dalp-video="true"','downloads/${encodeURIComponent(media.dataset)}','media.worksheet'])assert.ok(app.includes(token),token);
const specialist=read('assets/scripts/weekly-workspace.js');for(const token of ['weekMedia.video','weekMedia.dataset','weekMedia.worksheet'])assert.ok(specialist.includes(token));
const fakeDoc={body:{dataset:{course:'excel'}},baseURI:'https://example.com/',addEventListener(){}};
const fakeWindow={addEventListener(){}};
vm.runInNewContext(read('assets/scripts/course-video-player.js'),{window:fakeWindow,document:fakeDoc,URL,URLSearchParams});
const parse=fakeWindow.DALP_PARSE_YOUTUBE;assert.equal(typeof parse,'function');
const checks=[
 ['https://www.youtube.com/watch?v=HXV3zeQKqGY&t=1h2m3s',3723],
 ['https://youtu.be/HXV3zeQKqGY?t=78s',78],
 ['https://www.youtube.com/shorts/HXV3zeQKqGY',0],
 ['https://www.youtube.com/live/HXV3zeQKqGY',0],
 ['https://www.youtube.com/embed/HXV3zeQKqGY',0],
 ['https://www.youtube.com/playlist?list=PLUaB-1hjhk8FE_XZ87vPPSfHqb6OcM0cF',0]
];
for(const [src,start] of checks){const v=parse(src);assert.ok(v,src);assert.equal(v.start,start);assert.match(v.embed,/^https:\/\/www\.youtube-nocookie\.com\/embed\//);assert.match(v.canonical,/^https:\/\/www\.youtube\.com\//);}
assert.equal(parse('https://evil.example/watch?v=HXV3zeQKqGY'),null);assert.equal(parse('javascript:alert(1)'),null);
assert.equal(parse('https://www.youtube.com/watch?v=AAA'),null);
for(const slug of ['python','ai'])assert.match(read(`courses/${slug}.html`),/specialist-week-deep\.js/);
const guide=read('downloads/WEEKLY_PRACTICE_DATA_GUIDE.md');assert.match(guide,/synthetic/);assert.ok(fs.readdirSync('downloads').filter(s=>s.startsWith('learning_')&&s.endsWith('.csv')).length>=10);
console.log('PASS week learning resources:',lessons,'dataset links, 90 full practice briefs, verified lesson-player URL variants and all nine courses');
