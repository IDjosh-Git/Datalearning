/** Mastery course selection, centered library hero and single Arena runner regression. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = file => fs.readFileSync(file, 'utf8');
const academy = read('assets/scripts/academy-app.js');
const quiz = read('quiz.html');
const mastery = read('assets/styles/mastery-assessment.css');
const reference = read('assets/styles/learning-libraries-premium.css');
const practice = read('practice.html');
const arena = read('assets/styles/practice-arena-premium-final.css');
for (const token of ['function masteryCourseSelection()', 'if(!slug&&rawWeek===\'mastery\'){masteryCourseSelection();return;}', 'class="za-mastery-course-card"', 'data-mastery-course=', "one('#zaQuizSubmit').hidden=true", "one('#zaQuizResult').hidden=true", 'location.href=masteryHref(button.dataset.masteryCourse)', 'Change course', 'check.disabled=picked===null||checked']) {
  assert(academy.includes(token), `Missing course-selection or exam-gating behavior: ${token}`);
}
assert(quiz.includes('mastery-exam-bank.js') && quiz.includes('mastery-assessment.css'));
for (const key of ['.za-mastery-course-grid', '.za-mastery-launch', '.za-mastery-course-card:focus-visible', '.za-mastery-switch', '@media(max-width:650px)']) assert(mastery.includes(key), `Missing premium exam style ${key}`);
for (const key of ['justify-items:center', 'grid-template-columns:minmax(0,1fr)!important', 'text-align:center', 'max-width:none!important']) assert(reference.includes(key), `Reference Library title must remain centered: ${key}`);
assert(academy.includes("${[\'python\',\'ai\'].includes(slug)?\'\':deepDive}"), 'Python/AI should not render redundant end-of-course career links');
assert(practice.includes('practice-arena-premium-final.css') && !practice.includes('arena-mobile-depth.js'));
assert(!practice.includes('practice-arena-refined.css') && !practice.includes('practice-arena-studio-premium.css'));
assert(arena.includes('#practiceDetail[data-active-editor="SQL"] #practiceCheck{display:none!important;}'), 'Duplicate SQL Run Query must be hidden');
assert(arena.includes('#ideRun{display:inline-flex!important;}'), 'The canonical editor runner must remain visible on mobile');
console.log('PASS premium mastery chooser and answer gate, nine-course exam entry, centered reference title, Python/AI cleanup and one Arena run action');
