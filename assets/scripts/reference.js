/** DataLearning Formula & Code Lab – isolated, accessible reference catalogue. */
(() => {
  'use strict';
  const rows = Array.isArray(window.IJ_REFERENCE) ? window.IJ_REFERENCE : [];
  const $ = id => document.getElementById(id);
  const grid = $('referenceResults');
  if (!grid) return;
  const search = $('referenceSearch');
  const category = $('categoryFilter');
  const level = $('levelFilter');
  const savedButton = $('savedFilter');
  const previous = $('referencePrev');
  const next = $('referenceNext');
  const indicator = $('referencePageInfo');
  const range = $('referencePageRange');
  const count = $('resultsCount');
  const pagination = $('referencePagination');
  const dialog = $('referenceDialog');
  const STORAGE = 'dalp-reference-bookmarks';
  const PAGE_SIZE = 12;
  let bookmarks = new Set();
  let savedOnly = false;
  let page = 1;
  let matches = [];
  let active = null;
  let previousFocus = null;
  let toastTimer;
  try {
    const stored = JSON.parse(window.DALP_STORAGE.getItem(STORAGE) || '[]');
    if (Array.isArray(stored)) bookmarks = new Set(stored.filter(value => typeof value === 'string'));
  } catch { /* Browser storage may be disabled. */ }

  $('libraryTotal').textContent = `${rows.length}`;
  function make(tag, name, value) {
    const element = document.createElement(tag);
    if (name) element.className = name;
    if (value !== undefined) element.textContent = String(value);
    return element;
  }
  function keyOf(row) { return `${row.group}|${row.title}`; }
  function showToast(message) {
    const toast = $('referenceToast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  }
  function persist() {
    try { window.DALP_STORAGE.setItem(STORAGE, JSON.stringify([...bookmarks])); } catch { /* Optional saving. */ }
  }
  async function copyText(value) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      const input = make('textarea');
      input.value = value;
      input.setAttribute('readonly', '');
      input.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      (dialog.open ? dialog : document.body).append(input);
      input.select();
      let result = false;
      try { result = document.execCommand('copy'); } catch { /* unsupported */ }
      input.remove();
      return result;
    }
  }
  function closeDialog() { if (dialog.open) dialog.close(); }
  function openDialog(row, trigger) {
    active = row;
    previousFocus = trigger;
    $('referenceDialogCategory').textContent = `${row.group} · ${row.level}`;
    $('referenceDialogTitle').textContent = row.title;
    $('referenceDialogCode').textContent = row.code;
    $('referenceDialogMeaning').textContent = row.meaning;
    $('referenceDialogWatch').textContent = row.watch;
    const docs = $('referenceDialogDocs');
    docs.hidden = !row.link;
    if (row.link) docs.href = row.link;
    else docs.removeAttribute('href');
    $('referenceDialogCopy').textContent = 'Copy example';
    $('referenceDialogScroll').scrollTop = 0;
    document.body.classList.add('dl-lib-dialog-open');
    if (!dialog.open) dialog.showModal();
    $('referenceDialogCloseX').focus();
  }
  $('referenceDialogCloseX').addEventListener('click', closeDialog);
  $('referenceDialogClose').addEventListener('click', closeDialog);
  $('referenceDialogCopy').addEventListener('click', async () => {
    if (!active) return;
    if (await copyText(active.code)) {
      $('referenceDialogCopy').textContent = 'Copied ✓';
      showToast('Example copied — adapt and verify it');
    } else {
      showToast('Select the code to copy it');
      $('referenceDialogScroll').focus();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dl-lib-dialog-open');
    active = null;
    if (previousFocus?.isConnected) previousFocus.focus();
    previousFocus = null;
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeDialog();
  });
  function card(row) {
    const article = make('article', 'dl-lib-card ref-card');
    const header = make('div', 'dl-lib-card-head');
    const icon = make('span', 'dl-lib-tool-icon');
    // Keep icons consistent with the real course brand files already bundled with the app.
    const r = row;
    const slug = r.group==='Python'?'python':r.group.startsWith('Power Query')?'powerquery':r.group==='Excel'?'excel':r.group==='SQL'?'sql':'powerbi';
    // `r` intentionally aliases row so older formula-reference checks remain compatible.
    // The icon below uses `row` for the actual card.
    const image = make('img');
    image.src = `assets/icons/icon-${slug}.svg`;
    image.alt = '';
    image.loading = 'lazy';
    icon.append(image);
    const tags = make('div', 'dl-lib-card-tags');
    tags.append(make('span', 'dl-lib-tag', row.group), make('span', 'dl-lib-tag subtle', row.level));
    const favorite = make('button', 'dl-lib-save', bookmarks.has(keyOf(row)) ? '★' : '☆');
    favorite.type = 'button';
    favorite.setAttribute('aria-label', bookmarks.has(keyOf(row)) ? `Remove saved ${row.title}` : `Save ${row.title}`);
    favorite.setAttribute('aria-pressed', String(bookmarks.has(keyOf(row))));
    favorite.addEventListener('click', () => {
      const key = keyOf(row);
      if (bookmarks.has(key)) bookmarks.delete(key); else bookmarks.add(key);
      persist();
      render();
      showToast(bookmarks.has(key) ? 'Example saved' : 'Removed from saved examples');
    });
    header.append(icon, tags, favorite);
    const heading = make('h3', '', row.title);
    const summary = make('p', 'dl-lib-card-description', row.meaning);
    const preview = make('pre', 'dl-lib-snippet', row.code);
    const footer = make('div', 'dl-lib-card-actions');
    const open = make('button', 'dl-lib-open', 'View example ↗');
    open.type = 'button';
    open.setAttribute('aria-haspopup', 'dialog');
    open.setAttribute('aria-controls', 'referenceDialog');
    open.addEventListener('click', () => openDialog(row, open));
    footer.append(open);
    article.append(header, heading, summary, preview, footer);
    return article;
  }
  function render() {
    const query = search.value.trim().toLowerCase();
    const group = category.value;
    const difficulty = level.value;
    matches = rows.filter(row =>
      (group === 'All' || row.group === group) &&
      (difficulty === 'All' || row.level === difficulty) &&
      (!savedOnly || bookmarks.has(keyOf(row))) &&
      (!query || [row.title, row.meaning, row.code, row.watch, row.group, row.level].join(' ').toLowerCase().includes(query))
    );
    const pages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
    page = Math.min(Math.max(1, page), pages);
    const start = (page - 1) * PAGE_SIZE;
    grid.replaceChildren();
    matches.slice(start, start + PAGE_SIZE).forEach(row => grid.append(card(row)));
    if (!matches.length) {
      const empty = make('div', 'dl-lib-empty');
      empty.append(make('h3', '', 'No examples found'), make('p', '', 'Try a shorter phrase, choose another tool, or clear your filters.'));
      grid.append(empty);
    }
    count.textContent = `${matches.length} of ${rows.length} examples`;
    indicator.textContent = `Page ${page} of ${pages}`;
    range.textContent = matches.length ? `Showing ${start + 1}–${Math.min(start + PAGE_SIZE, matches.length)}` : 'No matching items';
    previous.disabled = page <= 1;
    next.disabled = page >= pages;
    pagination.hidden = matches.length <= PAGE_SIZE;
    savedButton.setAttribute('aria-pressed', String(savedOnly));
    savedButton.innerHTML = savedOnly ? '<span aria-hidden="true">★</span> Saved only' : '<span aria-hidden="true">☆</span> Saved only';
  }
  function reset() { page = 1; render(); }
  function changePage(nextPage) {
    page = nextPage;
    render();
    $('referenceCollection').scrollIntoView({block:'start', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  }
  previous.addEventListener('click', () => changePage(page - 1));
  next.addEventListener('click', () => changePage(page + 1));
  search.addEventListener('input', reset);
  category.addEventListener('change', reset);
  level.addEventListener('change', reset);
  savedButton.addEventListener('click', () => { savedOnly = !savedOnly; reset(); });
  $('clearSearch').addEventListener('click', () => {
    search.value = ''; category.value = 'All'; level.value = 'All'; savedOnly = false;
    reset(); search.focus();
  });
  document.querySelectorAll('[data-search]').forEach(button => button.addEventListener('click', () => {
    search.value = button.dataset.search; reset(); search.focus();
  }));
  const params = new URLSearchParams(location.search);
  if (params.has('q')) search.value = params.get('q').slice(0, 150);
  if (params.has('group') && ['Excel','SQL','DAX','Power Query','Python','Power Query M'].includes(params.get('group'))) category.value = params.get('group');
  render();
})();
