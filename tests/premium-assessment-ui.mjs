/** Guard the shared assessment treatment across all six learner courses. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const names=['introduction','excel','sql','powerbi','python','ai'];
for(const name of names){
  const html=read(`courses/${name}.html`);
  assert.match(html,/assets\/styles\/premium-unified\.css/,`${name}: shared styling unavailable`);
  if(name==='introduction'){
    assert.match(html,/id="introQuizQuestions"/,`Introduction question mount was removed`);
    assert.match(read('assets/scripts/introduction.js'),/fieldset\.className = 'question-card'/,'Introduction question renderer changed');
  }else{
    assert.equal((html.match(/class="quiz(?:\s|"|>)/g)||[]).length,10,`${name}: expected ten weekly quizzes`);
    assert.match(html,/class="question" data-answer=/,`${name}: original question markup missing`);
  }
}
const checkpoint=read('assets/scripts/course-checkpoints.js');
assert.match(checkpoint,/class="course-mastery-question"/,'Mastery question generation changed');
assert.match(checkpoint,/class="course-mastery-option"/,'Mastery answer controls changed');
const css=read('assets/styles/premium-unified.css');
for(const term of ['Unified Premium Assessment Experience','--assessment-surface','--assessment-card','.intro-quiz .question-card','.course-mastery-question','.quiz .question','input:checked','input:focus-visible','max-width:640px','.quiz-actions .gradeBtn','.score:empty']){
  assert(css.includes(term),`Premium quiz treatment missing ${term}`);
}
assert.match(css,/background:\s*var\(--assessment-surface\)\s*!important/,'Shared gradient backdrop missing');
assert.match(css,/background:\s*var\(--assessment-card\)\s*!important/,'Premium question-card gradient missing');
assert.match(css,/\.question-feedback\[hidden\][^\{]*\{display:none!important\}/,'Quiz feedback must remain hidden until graded');
console.log('PASS premium assessment UI: all six courses, weekly quizzes, introduction, mastery, consistent gradients, selected states and responsive controls');
