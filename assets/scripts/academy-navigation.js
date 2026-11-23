/* Shared across public outlines and signed-in learner pages. */
(() => {
  'use strict';
  const mount = document.querySelector('[data-academy-navigation]');
  if (!mount) return;
  const groups = [
    ["My Learning", "account.html", [
      ["My Learning", "account.html"],
      ["Learning Progress", "account.html#course-progress-heading"],
      ["Certificates", "certificate.html"],
      ["Career Roadmap", "career-setup.html"]
    ]],
    ["Explore Courses", "/courses", [
      ["Start Here", "/start-here"],
      ["Free Lesson", "/free-lesson"],
      ["Career Paths", "/career-paths"],
      ["Course Previews", "preview.html"],
      ["Data Analysis", "/courses/introduction"],
      ["Excel", "/courses/excel"],
      ["SQL", "/courses/sql"],
      ["Power BI", "/courses/powerbi"],
      ["Tableau", "/courses/tableau"],
      ["Power Query", "/courses/powerquery"],
      ["Statistics", "/courses/statistics"],
      ["Python", "/courses/python"],
      ["AI for Data Analysis", "/courses/ai"]
    ]],
    ["Practice Hub", "practice-hub.html", [
      ["Practice Arena", "practice.html"],
      ["Question Bank", "questions.html"],
      ["Quizzes &amp; Assessments", "quiz.html"],
      ["Capstone Projects", "capstone.html"],
      ["Capstone Guide", "capstone-guide.html"]
    ]],
    ["AI Tutor", "tutor.html", [
      ["AI Tutor Workspace", "tutor.html"],
      ["Learning Coach", "learning-coach.html"]
    ]],
    ["Study Tools", "study-tools.html", [
      ["Study Tools Overview", "study-tools.html"],
      ["Prompt Library", "prompt-library.html"],
      ["Reference Lab", "reference.html"],
      ["Learning Lab", "learning-lab.html"]
    ]]
  ];
  const route = href => {
    const url = new URL(href, location.origin);
    const path = url.pathname.replace(/\/$/, '') || '/';
    if (/^\/(course-info|courses)\//.test(path)) {
      return path.replace('/course-info/', '/courses/').replace(/\.html$/, '').replace(/-(extension|roadmap)$/, '').replace('/courses/catalog', '/courses');
    }
    return ({
      '/': '/courses', '/index.html': '/courses', '/dashboard': '/courses',
      '/landing.html': '/courses', '/catalog.html': '/courses', '/overview': '/account', '/overview.html': '/account',
      '/studio': '/practice', '/studio.html': '/practice', '/career-path': '/career-paths', '/career-path.html': '/career-paths', '/verify': '/certificate', '/verify.html': '/certificate'
    })[path.replace(/^\/public-pages\//, '/')] || path.replace(/^\/public-pages\//, '/').replace(/\.html$/, '');
  };
  const link = (label, href, className = '') => {
    const url = new URL(href, location.origin);
    return '<a class="' + className + '" href="' + url.pathname + url.hash + '">' + label + '</a>';
  };
  const brand = '<a href="/" class="academy-brand"><img data-academy-logo src="/assets/icons/da-logo.svg" width="36" height="36" alt=""><span data-academy-name>DataLearning</span></a>';
  const account = '<div class="academy-account"><a data-academy-profile href="/auth.html">Sign in</a><button type="button" data-academy-signout hidden>Sign out</button></div>';
  const groupLinks = items => items.map(([label, href]) => link(label, href)).join('');
  const desktop = groups.map(([label, href, items], i) =>
    '<div class="academy-nav-group">' + link(label, href, 'academy-group-link') +
    '<button type="button" class="academy-disclosure" aria-label="' + label + ' options" aria-expanded="false" aria-controls="academy-section-' + i + '">⌄</button>' +
    '<div class="academy-dropdown" id="academy-section-' + i + '" hidden>' +
    groupLinks(items.filter(([, target]) => target !== href)) + '</div></div>').join('');
  const mobile = groups.map(([label, href, items]) =>
    '<details><summary>' + label + '</summary>' + link('Open ' + label, href) +
    groupLinks(items.filter(([, target]) => target !== href)) + '</details>').join('');
  mount.innerHTML = '<header class="academy-header" aria-label="DataLearning site navigation">' +
    '<div class="academy-header-row">' + brand + '<nav class="academy-primary" aria-label="Academy">' + desktop +
    '</nav><div class="academy-actions">' + account + '</div>' +
    '<button type="button" class="academy-menu-button" aria-haspopup="dialog" aria-expanded="false" aria-controls="academy-menu" aria-label="Open navigation">☰</button></div></header>' +
    '<dialog class="academy-menu" id="academy-menu" aria-label="Academy navigation"><div class="academy-menu-head">' + brand +
    '<button type="button" class="academy-menu-close" autofocus>Close</button></div><nav aria-label="Academy">' + mobile +
    '</nav>' + account + '</dialog>';

  const menu = mount.querySelector('dialog');
  const open = mount.querySelector('.academy-menu-button');
  const disclosures = [...mount.querySelectorAll('.academy-disclosure')];
  const panel = button => document.getElementById(button.getAttribute('aria-controls'));
  function closeDropdowns() {
    for (const button of disclosures) {
      button.setAttribute('aria-expanded', 'false');
      panel(button).hidden = true;
    }
  }
  for (const button of disclosures) {
    button.addEventListener('click', () => {
      const show = panel(button).hidden;
      closeDropdowns();
      panel(button).hidden = !show;
      button.setAttribute('aria-expanded', String(show));
    });
    button.parentElement.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' && event.target === button) {
        event.preventDefault();
        if (panel(button).hidden) button.click();
        panel(button).querySelector('a')?.focus();
      }
      if (event.key === 'Escape' && !panel(button).hidden) {
        closeDropdowns();
        button.focus();
      }
    });
  }
  document.addEventListener('click', event => {
    if (!event.target.closest('.academy-nav-group')) closeDropdowns();
  });
  open.addEventListener('click', () => {
    closeDropdowns();
    menu.showModal();
    open.setAttribute('aria-expanded', 'true');
  });
  menu.querySelector('.academy-menu-close').addEventListener('click', () => menu.close());
  menu.addEventListener('click', event => { if (event.target.closest('a')) menu.close(); });
  menu.addEventListener('close', () => {
    open.setAttribute('aria-expanded', 'false');
    if (open.getClientRects().length) open.focus();
  });
  matchMedia('(min-width: 1181px)').addEventListener('change', event => {
    if (event.matches && menu.open) menu.close();
  });

  function markCurrent() {
    const current = route(location.pathname);
    const section = current === '/profile' ? 0 : groups.findIndex(([, href, items]) => [href, ...items.map(([, target]) => target)].some(target => route(target) === current));
    mount.querySelectorAll('.academy-nav-group, .academy-menu details').forEach((group, i) => {
      group.toggleAttribute('data-current-group', i % groups.length === section);
    });
    mount.querySelectorAll('nav a').forEach(anchor => {
      const target = new URL(anchor.href);
      if (route(target.pathname) === current && (!target.hash || target.hash === location.hash)) {
        anchor.setAttribute('aria-current', target.hash ? 'location' : 'page');
      } else anchor.removeAttribute('aria-current');
    });
  }
  function markLearningSection() {
    const legacy = '#course-progress-heading';
    const active = location.hash === legacy ? '#my-learning-courses' : (location.hash || '#my-learning-overview');
    document.querySelectorAll('.my-learning-tabs a').forEach(anchor => {
      if (anchor.hash === active) anchor.setAttribute('aria-current', 'location');
      else anchor.removeAttribute('aria-current');
    });
  }
  markCurrent();
  markLearningSection();
  window.addEventListener('hashchange', () => {
    markCurrent();
    markLearningSection();
  });
  function updateAccount(signedIn) {
    mount.dataset.academySignedIn = String(signedIn);
    mount.querySelectorAll('[data-academy-profile]').forEach(anchor => {
      anchor.href = signedIn ? '/profile.html' : '/auth.html';
      anchor.textContent = signedIn ? 'Profile' : 'Sign in';
      if (signedIn && route(location.pathname) === '/profile') anchor.setAttribute('aria-current', 'page');
      else anchor.removeAttribute('aria-current');
    });
    mount.querySelectorAll('[data-academy-signout]').forEach(button => { button.hidden = !signedIn; });
    window.dispatchEvent(new Event('datalearning:navigation-session'));
  }
  if (window.DALP_AUTH_GATE) {
    void window.DALP_AUTH_GATE.whenReady.then(user => updateAccount(Boolean(user)));
  } else {
    fetch('/api/auth/session?status=1', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : null)
      .then(status => updateAccount(status?.signedIn === true))
      .catch(() => {});
  }
  mount.querySelectorAll('[data-academy-signout]').forEach(button => {
    button.addEventListener('click', async () => {
      const controls = [...mount.querySelectorAll('[data-academy-signout]')];
      controls.forEach(control => { control.disabled = true; control.textContent = 'Signing out…'; });
      try {
        const response = await fetch('/api/auth/session', { method: 'DELETE', cache: 'no-store' });
        if (!response.ok) throw Error('Sign-out failed');
        await window.ZAH_DB?.client?.auth.signOut();
        window.DALP_AUTH_GATE?.clearLocalCourseCache();
        location.assign('/');
      } catch {
        controls.forEach(control => { control.disabled = false; control.textContent = 'Retry sign out'; });
      }
    });
  });

  function updateBrand(brand) {
    if (!brand) return;
    mount.querySelectorAll('[data-academy-name]').forEach(node => { node.textContent = brand.name || 'DataLearning'; });
    mount.querySelectorAll('[data-academy-logo]').forEach(node => { node.src = brand.logo || '/assets/icons/da-logo.svg'; node.alt = ''; });
  }
  updateBrand(window.DataLearningBrand?.current);
  window.addEventListener('datalearning:brand', event => updateBrand(event.detail));
})();
