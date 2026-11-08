import fs from 'node:fs';
import assert from 'node:assert/strict';
const player = fs.readFileSync('assets/scripts/course-video-player.js', 'utf8');
const workspace = fs.readFileSync('assets/scripts/weekly-workspace.js','utf8');
const styles = fs.readFileSync('assets/styles/premium-unified.css','utf8');
const courses = ['introduction','excel','sql','powerbi','python','ai'];
for (const course of courses) {
  const page = fs.readFileSync(`courses/${course}.html`, 'utf8');
  assert(page.includes('course-video-player.js'),`${course}: video modal script not installed`);
  assert(workspace.includes(` ${course}:{`) || workspace.includes(`  ${course}:{`) || workspace.includes(` ${course}:{`),`${course}: video resource missing`);
}
for (const id of ['LgXzzu68j7M','HXV3zeQKqGY','VaOhNqNtGGE','rfscVS0vtbw','tchN4xa4pfg'])
  assert(workspace.includes(id),`verified teaching video ${id} missing`);
assert(player.includes('www.youtube-nocookie.com/embed/'),'privacy-enhanced player missing');
assert(player.includes("e.preventDefault()"),'video links should stay within course');
assert(player.includes("frame.removeAttribute('src')"),'closing video must stop playback');
assert(player.includes('aria-modal'),'accessible dialog missing');
assert(player.includes('requestFullscreen'),'fullscreen support missing');
assert(player.includes("e.key === 'Escape'"),'keyboard Close support missing');
assert(player.includes("anchor.closest('.dalp-video-overlay')"),'YouTube fallback must remain external');
assert(styles.includes('.dalp-video-overlay[hidden]'),'modal hidden CSS missing');
assert(styles.includes('@media(max-width:600px)'),'mobile styling missing');
assert(workspace.includes('db.reading?toLink'),'former non-video reading resources must be retained');
console.log('PASS in-app course video modal: six courses, player security, accessibility, mobile and fallback');
