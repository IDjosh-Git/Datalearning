/** Learner account regression: clean styles, plain links, functional progress/auth. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8');
const html=read('account.html');
const css=read('assets/styles/account.css');
const shared=read('assets/styles/design-system.css');
assert(html.includes('assets/styles/account.css'),'Account uses maintained styling');
assert.equal((html.match(/<style\b/g)||[]).length,0,'No embedded legacy style blocks');
for(const old of ['account-foundation.css','account-layout.css']) {
 assert(!fs.existsSync(new URL(`../assets/styles/${old}`,import.meta.url)),`${old} must be deleted`);
 assert(!html.includes(old),`${old} must not be referenced`);
}
for(const required of ['dalp-global-header','id="who"','id="logout"','id="accountSyncStatus"','id="instructorAccess" hidden','id="quizBody"','id="certBody"','id="accountCapstones"','auth-gate.js','ZAHProgressCloud.syncAll()'])
 assert(html.includes(required),`Preserved learner feature: ${required}`);
assert.equal((html.match(/class="card progress-card" data-track=/g)||[]).length,6,'Six non-clickable progress cards retained');
assert.equal((html.match(/class="bar" role="progressbar"/g)||[]).length,6,'Accessible numeric progressbar retained per course');
for(const slug of ['introduction','excel','sql','powerbi','python','ai']){
 assert(html.includes(`id="${slug}Bar"`),`${slug} progress fill remains`);
 assert(html.includes(`href="courses/${slug}.html"`),`${slug} direct link remains`);
}
assert(html.includes("setAttribute('aria-valuenow'"),'Dynamic progress aria-value synchronized');
assert(!html.includes('class="btn" href='),'No obsolete filled navigation links in account');
assert(!html.includes('class="card ai-account-course-card"'),'Old clickable AI card removed');
assert(!html.includes('Learning Portal</a>'),'Repeated dashboard link removed');
assert(!/linear-gradient\(|radial-gradient\(|backdrop-filter|::before\s*\{\s*background/.test(css),'No decorative account backgrounds or gradients');
assert(css.includes('.account-studio-link') && css.includes('background:transparent!important'),'Practice Studio remains a plain link');
assert(shared.includes('main a[href]:not(.dalp-themed-hero a):not(.account-text-link)'),'Dark hero links must be exempt from the global indigo plain-link rule');
assert(css.includes('@media(max-width:680px)')&&css.includes('prefers-reduced-motion'),'Mobile and reduced-motion coverage');
console.log('PASS learner account: consolidated theme, plain course links, six accessible progress cards, guarded data and mobile layouts');
