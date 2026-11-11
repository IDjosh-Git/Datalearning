/* Learning Lab: ten results per page. Device-saved review state stays unchanged. */
(() => {
  'use strict';
  const all = window.DALP_KNOWLEDGE || [];
  const q = document.getElementById('labSearch');
  const group = document.getElementById('labGroup');
  const mode = document.getElementById('labMode');
  const cards = document.getElementById('labCards');
  const overview = document.getElementById('labOverview');
  const count = document.getElementById('labCount');
  const pager = document.getElementById('labPagination');
  const previous = document.getElementById('labPrev');
  const next = document.getElementById('labNext');
  const pages = document.getElementById('labPages');
  const pageSummary = document.getElementById('labPageSummary');
  if (![q, group, mode, cards, overview, count, pager, previous, next, pages, pageSummary].every(Boolean)) return;
  const PAGE_SIZE = 10;
  let currentPage = 1;
  let store;
  try { store = JSON.parse(window.DALP_STORAGE.getItem('dalp-learning-lab-v1') || '{}'); }
  catch { store = {}; }
  if (!store || typeof store !== 'object' || Array.isArray(store)) store = {};
  const today = () => new Date().toISOString().slice(0, 10);
  const save = () => {
    try { window.DALP_STORAGE.setItem('dalp-learning-lab-v1', JSON.stringify(store)); }
    catch { /* The library remains usable without browser storage. */ }
  };
  const groups = [...new Set(all.map(x => x.group))].sort();
  for (const name of groups) {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    group.append(option);
  }
  const due = state => !state || !state.due || state.due <= today();
  function summary() {
    const practised = Object.values(store).filter(s => s && s.last);
    const mastered = practised.filter(s => s.level >= 3).length;
    const reviews = all.filter(x => due(store[x.id]) && store[x.id]?.last).length;
    overview.textContent = `${all.length} lessons · ${practised.length} practised · ${mastered} mastered · ${reviews} due for review (saved on this device)`;
  }
  function matches() {
    const term = q.value.trim().toLowerCase();
    const category = group.value;
    const view = mode.value;
    return all.filter(x =>
      (!category || x.group === category) &&
      (!term || [x.question, x.keywords, x.explanation, x.example].join(' ').toLowerCase().includes(term)) &&
      (view !== 'due' || (store[x.id]?.last && due(store[x.id]))) &&
      (view !== 'new' || !store[x.id]?.last) &&
      (view !== 'mastered' || store[x.id]?.level >= 3)
    );
  }
  function createCard(x) {
    const state = store[x.id] || {};
    const article = document.createElement('article');
    article.className = 'lab-card';
    article.dataset.lessonId = x.id;
    const heading = document.createElement('h3');
    heading.textContent = x.question;
    const meta = document.createElement('p');
    meta.className = 'lab-muted';
    meta.textContent = `${x.group} · ${state.level >= 3 ? 'Mastered' : state.last ? 'Practising' : 'Not started'}${state.due ? ' · Next review: ' + state.due : ''}`;
    article.append(heading, meta);
    const details = document.createElement('details');
    const toggle = document.createElement('summary');
    toggle.textContent = 'Read guided explanation';
    details.append(toggle);
    for (const [label, value] of [
      ['Explanation', x.explanation], ['Worked example', x.example],
      ['Try it', x.practice], ['Avoid this mistake', x.pitfall]
    ]) {
      if (!value) continue;
      const title = document.createElement('b');
      title.textContent = label;
      const text = document.createElement('p');
      text.textContent = value;
      details.append(title, text);
    }
    article.append(details);
    const actions = document.createElement('div');
    actions.className = 'lab-actions';
    for (const [label, grade] of [['Review again', 0], ['Need practice', 1], ['Understood', 2]]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.addEventListener('click', () => {
        const old = store[x.id] || { level: 0, reps: 0 };
        const reps = grade === 2 ? (old.reps || 0) + 1 : 0;
        const days = grade === 0 ? 0 : grade === 1 ? 1 : [1, 3, 7, 14, 30, 60][Math.min(reps - 1, 5)];
        const reviewDate = new Date();
        reviewDate.setDate(reviewDate.getDate() + days);
        store[x.id] = {
          last: today(), due: reviewDate.toISOString().slice(0, 10),
          level: grade === 2 ? Math.min(3, (old.level || 0) + 1) : grade === 1 ? 1 : 0,
          reps
        };
        save();
        render();
      });
      actions.append(button);
    }
    article.append(actions);
    return article;
  }
  function updatePager(total) {
    const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
    currentPage = Math.min(Math.max(1, currentPage), pageCount);
    previous.disabled = currentPage <= 1;
    next.disabled = currentPage >= pageCount;
    previous.setAttribute('aria-disabled', String(previous.disabled));
    next.setAttribute('aria-disabled', String(next.disabled));
    pageSummary.textContent = `Page ${currentPage} of ${pageCount}`;
    pager.hidden = total === 0;
    pages.replaceChildren();
    // Compact page controls: show nearest pages with ellipses for long results.
    const candidates = new Set([1, pageCount]);
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(pageCount, currentPage + 1); i++) candidates.add(i);
    let previousNumber = 0;
    for (const number of [...candidates].sort((a, b) => a - b)) {
      if (previousNumber && number - previousNumber > 1) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'lab-pagination-ellipsis';
        ellipsis.textContent = '…';
        ellipsis.setAttribute('aria-hidden', 'true');
        pages.append(ellipsis);
      }
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'lab-page-number';
      button.textContent = String(number);
      button.setAttribute('aria-label', `Go to page ${number}`);
      if (number === currentPage) button.setAttribute('aria-current', 'page');
      button.addEventListener('click', () => gotoPage(number));
      pages.append(button);
      previousNumber = number;
    }
  }
  function render() {
    summary();
    const found = matches();
    const pageCount = Math.max(1, Math.ceil(found.length / PAGE_SIZE));
    currentPage = Math.min(Math.max(1, currentPage), pageCount);
    const start = (currentPage - 1) * PAGE_SIZE;
    cards.replaceChildren(...found.slice(start, start + PAGE_SIZE).map(createCard));
    if (!found.length) {
      const empty = document.createElement('p');
      empty.className = 'lab-empty-state';
      empty.textContent = 'No lessons match these filters. Try another subject or search term.';
      cards.append(empty);
      count.textContent = 'No matching lessons';
    } else {
      count.textContent = `Showing ${start + 1}–${Math.min(start + PAGE_SIZE, found.length)} of ${found.length} lessons`;
    }
    updatePager(found.length);
  }
  function gotoPage(page) {
    const pageCount = Math.max(1, Math.ceil(matches().length / PAGE_SIZE));
    const target = Math.min(Math.max(1, page), pageCount);
    if (target === currentPage) return;
    currentPage = target;
    render();
    count.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  }
  previous.addEventListener('click', () => gotoPage(currentPage - 1));
  next.addEventListener('click', () => gotoPage(currentPage + 1));
  for (const control of [q, group, mode]) {
    control.addEventListener(control === q ? 'input' : 'change', () => {
      currentPage = 1;
      render();
    });
  }
  document.getElementById('labReset').addEventListener('click', () => {
    if (!confirm('Erase Learning Lab progress on this browser?')) return;
    store = {};
    save();
    currentPage = 1;
    render();
  });
  render();
})();
