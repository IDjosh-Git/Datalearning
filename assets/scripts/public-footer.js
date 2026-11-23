/* Audience-specific content rendered through the same footer layout. */
(() => {
  'use strict';
  const script = document.currentScript;
  if (!script) return;
  const root = new URL('../../', script.src);
  const url = path => new URL(path, root).href;
  const visitorColumns = [
    ['Courses', [
      ['Explore all courses', 'courses'],
      ['Introduction to Data Analysis', 'courses/introduction'],
      ['Free lesson', 'free-lesson']
    ]],
    ['Getting started', [
      ['Start Here', 'start-here'],
      ['Career paths', 'career-paths']
    ]],
    ['Account', [
      ['Sign in', 'auth.html']
    ]]
  ];
  const learnerColumns = [
    ['My Learning', [
      ['Dashboard', 'account.html'],
      ['Explore courses', 'index.html#zaDiscoverCards'],
      ['Course progress', 'account.html#course-progress-heading'],
      ['Career roadmap', 'career-setup.html']
    ]],
    ['Practice and assessment', [
      ['Practice Arena', 'practice.html'],
      ['Question Bank', 'questions.html'],
      ['Quizzes and assessments', 'quiz.html'],
      ['Capstone projects', 'capstone.html']
    ]],
    ['Study Tools', [
      ['Prompt Library', 'prompt-library.html'],
      ['Learning Lab', 'learning-lab.html'],
      ['Learning Coach', 'learning-coach.html'],
      ['Reference Lab', 'reference.html']
    ]],
    ['Account', [
      ['Profile', 'profile.html'],
      ['Certificates', 'certificate.html'],
      ['Public website', ''],
      ['Admin', 'admin.html']
    ]]
  ];

  function mount() {
    const support = document.querySelector('[data-academy-navigation]');
    const visitor = !support || support.dataset.academyAudience === 'visitor';
    const columns = visitor ? visitorColumns : learnerColumns;
    document.querySelectorAll('footer:is(.dalp-public-footer,.dlp-footer,.dlx-v5-footer,.za-footer,.site-footer)').forEach(element => element.remove());
    const footer = document.createElement('footer');
    footer.className = 'dalp-public-footer dlx-v5-footer ' + (visitor ? 'dl-footer-visitor' : 'dl-footer-learner');
    footer.setAttribute('aria-label', visitor ? 'DataLearning public footer' : 'DataLearning learner footer');
    const banner = visitor ? `
      <div class="dlx-v5-footer-banner">
        <div>
          <h2>Start learning data skills</h2>
          <p>Try a free lesson or create an account to save your progress.</p>
        </div>
        <div class="dlx-v5-footer-banner-actions">
          <a class="dlx-v5-footer-primary" href="${url('free-lesson')}">Try a free lesson</a>
          <a class="dlx-v5-footer-secondary" href="${url('auth.html?mode=create')}">Create an account</a>
        </div>
      </div>` : '';
    footer.innerHTML = `
      <div class="dlx-v5-footer-container">
        ${banner}
        <div class="dlx-v5-footer-body">
          <div class="dlx-v5-footer-identity">
            <a class="dlx-v5-footer-brand" href="${url(visitor ? '' : 'index.html')}">
              <img data-footer-logo src="${url('assets/icons/da-logo.svg')}" width="42" height="42" alt="">
              <strong data-footer-name>DataLearning</strong>
            </a>
            <p>${visitor ? 'Practical data skills, guided lessons and real-world exercises.' : 'Continue a course, practise a skill or review your progress.'}</p>
          </div>
          ${columns.map(([title, entries]) => `
            <nav class="dlx-v5-footer-col" aria-label="${title}">
              <h3>${title}</h3>
              ${entries.map(([label, path]) => `<a href="${url(path)}">${label}</a>`).join('')}
            </nav>`).join('')}
        </div>
        <div class="dlx-v5-footer-base"><span>© ${new Date().getFullYear()} <span data-footer-name>DataLearning</span></span></div>
      </div>`;
    document.body.appendChild(footer);

    const view = document.defaultView;
    const updateBrand = brand => {
      if (!brand) return;
      footer.querySelectorAll('[data-footer-name]').forEach(node => { node.textContent = brand.name || 'DataLearning'; });
      const logo = footer.querySelector('[data-footer-logo]');
      if (logo) { logo.src = brand.logo || url('assets/icons/da-logo.svg'); logo.alt = ''; }
    };
    updateBrand(view?.DataLearningBrand?.current);
    view?.addEventListener('datalearning:brand', event => updateBrand(event.detail));

  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once: true});
  else mount();
})();

