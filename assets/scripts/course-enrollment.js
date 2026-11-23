(() => {
  'use strict';
  const slugs = new Set(['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai']);
  const slug = location.pathname.match(/\/courses\/([a-z]+)\.html$/)?.[1];
  if (!slugs.has(slug)) return;

  async function init() {
    const counter = document.getElementById('zaWeekCounter');
    if (!counter) return;
    const client = window.ZAH_DB?.client;
    const user = await window.DALP_AUTH_GATE?.whenReady;
    if (!client || !user || user.is_anonymous) return;

    const meta = document.createElement('div');
    meta.className = 'za-course-meta';
    counter.before(meta);
    const enrolment = document.createElement('div');
    enrolment.className = 'dlc-enrol';
    enrolment.innerHTML = '<div><strong>My Learning enrolment</strong><p class="dlc-enrol-status" role="status">Checking enrolment…</p></div><button type="button" class="dlc-enrol-button" hidden>Start studying</button>';
    meta.append(counter, enrolment);
    const status = enrolment.querySelector('.dlc-enrol-status');
    const button = enrolment.querySelector('button');
    const enrolled = () => {
      enrolment.dataset.enrolled = 'true';
      status.textContent = 'You’re studying this course.';
      button.hidden = true;
    };
    try {
      const {data,error} = await client.from('course_enrollments').select('course_slug')
        .eq('user_id', user.id).eq('course_slug', slug).maybeSingle();
      if (error) throw error;
      if (data) {
        enrolled();
        return;
      }
      status.textContent = 'Add this course to My Learning.';
      button.hidden = false;
    } catch {
      status.textContent = 'Enrolment unavailable. Refresh to retry.';
      return;
    }

    button.addEventListener('click', async () => {
      button.disabled = true;
      status.textContent = 'Saving enrolment…';
      try {
        const {error} = await client.from('course_enrollments').insert({user_id:user.id,course_slug:slug});
        if (error && error.code !== '23505') throw error;
        enrolled();
      } catch {
        status.textContent = 'Couldn’t add this course. Try again.';
        button.disabled = false;
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else void init();
})();
