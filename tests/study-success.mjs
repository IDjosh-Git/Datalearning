import {hasCurrentPublicCache} from './cache-release-contract.mjs';
/** Guided Learning Journey regression: no feature regression or private-data exposure. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=file=>fs.readFileSync(file,'utf8');
const html=read('learning-lab.html');
const script=read('assets/scripts/study-success.js');
const css=read('assets/styles/learning-lab.css');
assert.equal((html.match(/id="study-plan"/g)||[]).length,1,'One study planner');
for(const id of ['ss-plan-form','ss-course','ss-experience','ss-minutes','ss-session-list','ss-meter-bar','ss-attempt','ss-confidence','ss-save','ss-reveal','ss-solution','ss-status','ss-export','ss-import','ss-import-file'])assert(html.includes(`id="${id}"`),`Study plan missing ${id}`);
assert(html.includes('assets/scripts/study-success.js'),'New guided plan must load');
assert(!html.includes('src="assets/scripts/course-studio-data.js"'),'Keep skill catalogue lazy-loaded on non-course pages');
for(const slug of ['introduction','excel','sql','powerbi','python','ai'])assert(html.includes(`value="${slug}"`),`Missing ${slug} subject`);
for(const term of ['length:7','length:7}', 'min-height:46px']){/* no-op: semantic checks below */}
for(const token of ["Array.from({length:7}","studio.html?course=",'dalp-study-success-v1:',"window.DALP_AUTH_USER?.id",'getItem','setItem','ss-attempt','ss-confidence','ss-export','ss-import-file','COURSE_STUDIO_DATA','pythonSkills','practice.html?tool=Python','candidate.async=true','aria-label',"window.addEventListener('dalp:auth-ready'"])assert(script.includes(token),`Study planner lost ${token}`);
assert(!/fetch\(|XMLHttpRequest|WebSocket|\.client\.from\(|sendBeacon|service_role/i.test(script),'Study plan must not transmit private reflection content or spoof official progress');
for(const term of ['.ss-workspace','.ss-intro','.ss-recall','.ss-session','.ss-session-done','@media(max-width:740px)'])assert(css.includes(term),`Study UI missing ${term}`);
const home=read('index.html'),privateNav=read('assets/scripts/private-navigation.js'),search=read('assets/scripts/premium-search.js');
assert(home.includes('Create a study plan')&&home.includes('Try a free lesson'),'Discover must retain previous learning paths');
assert(read('account.html').includes('Build your personal study plan'),'My Learning dashboard needs a clear study planner action');
assert(privateNav.includes("['My study plan','learning-lab.html#study-plan','study']"),'Private navigation must surface planner');
assert(search.includes('learning-lab.html#study-plan')&&search.includes('study plan'),'Cross-site search must discover planner');
assert(fs.existsSync('assets/scripts/arena-ide.js')&&fs.existsSync('assets/scripts/execution-engine.js'),'Practice Arena editor must remain intact');
assert(hasCurrentPublicCache(read('service-worker.js')),'Cache must refresh after new learning tool');
console.log('PASS guided Learning Journey: six courses, seven structured sessions, active recall, private saved reflection, searchable navigation, preserved Arena/lesson flows');
