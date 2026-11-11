/** DataLearning Prompt Library – responsive, paginated, accessible 300-prompt catalogue. */
(() => {
  'use strict';
  const all = Array.isArray(window.DALP_PROMPTS) ? window.DALP_PROMPTS : [];
  const $ = id => document.getElementById(id);
  const grid = $('promptGrid');
  if (!grid) return;
  const search = $('promptSearch');
  const category = $('categorySelect');
  const level = $('levelSelect');
  const count = $('resultCount');
  const savedToggle = $('savedToggle');
  const favCount = $('favCount');
  const modal = $('promptPreviewDialog');
  const modalTitle = $('promptModalTitle');
  const modalReference = $('promptModalReference');
  const modalMeta = $('promptModalMeta');
  const modalContent = $('promptModalContent');
  const modalScroll = $('promptModalScroll');
  const modalCopy = $('promptModalCopy');
  const previous = $('promptPrev');
  const next = $('promptNext');
  const pageInfo = $('promptPageInfo');
  const pageRange = $('promptPageRange');
  const pager = $('promptPagination');
  const KEY = 'dalp:prompt-library:favorites:v1';
  const PAGE_SIZE = 12;
  let saved = new Set();
  let savedOnly = false;
  let page = 1;
  let matching = [];
  let openPrompt = null;
  let returnFocus = null;
  let toastHandle;

  try {
    const arr = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (Array.isArray(arr)) saved = new Set(arr.filter(v => typeof v === 'string'));
  } catch { /* Storage optional. */ }

  [...new Set(all.map(prompt => prompt.category))].sort().forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    category.append(option);
  });

  function make(tag, className, value) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (value !== undefined) element.textContent = String(value);
    return element;
  }
  function toast(message) {
    const element = $('promptToast');
    element.textContent = message;
    element.classList.add('show');
    clearTimeout(toastHandle);
    toastHandle = setTimeout(() => element.classList.remove('show'), 2400);
  }
  function remember() {
    try { localStorage.setItem(KEY, JSON.stringify([...saved])); } catch { /* Storage optional. */ }
    favCount.textContent = String(saved.size);
  }
  async function copyPrompt(value) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      const input = make('textarea');
      input.value = value;
      input.setAttribute('readonly', '');
      input.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      (modal.open ? modal : document.body).append(input);
      input.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch { /* Clipboard unavailable. */ }
      input.remove();
      return copied;
    }
  }
  function openPreview(item, trigger) {
    openPrompt = item;
    returnFocus = trigger;
    modalReference.textContent = `PROMPT ${item.id} · ${item.category}`;
    modalTitle.textContent = item.title;
    modalMeta.replaceChildren(make('span', '', item.tool), make('span', '', item.level));
    // Use textContent. Prompt data may contain markup-like placeholders and must never execute.
    modalContent.textContent = item.prompt;
    modalCopy.textContent = 'Copy full prompt ↗';
    modalScroll.scrollTop = 0;
    document.body.classList.add('dl-lib-dialog-open');
    if (!modal.open) modal.showModal();
    $('promptModalCloseIcon').focus();
  }
  function closePreview() { if (modal.open) modal.close(); }
  $('promptModalClose').addEventListener('click', closePreview);
  $('promptModalCloseIcon').addEventListener('click', closePreview);
  modalCopy.addEventListener('click', async () => {
    if (!openPrompt) return;
    if (await copyPrompt(openPrompt.prompt)) {
      modalCopy.textContent = 'Copied ✓';
      toast(`${openPrompt.id} copied — customise and verify the output`);
    } else {
      toast('Select the full prompt text to copy');
      modalScroll.focus();
    }
  });
  modal.addEventListener('close', () => {
    document.body.classList.remove('dl-lib-dialog-open');
    openPrompt = null;
    if (returnFocus?.isConnected) returnFocus.focus();
    returnFocus = null;
  });
  modal.addEventListener('click', event => { if (event.target === modal) closePreview(); });

  function card(item) {
    const article = make('article', 'dl-lib-card prompt-card');
    const head = make('div', 'dl-lib-card-head');
    const id = make('span', 'dl-lib-prompt-id', item.id);
    const favorite = make('button', 'dl-lib-save', saved.has(item.id) ? '★' : '☆');
    favorite.type = 'button';
    favorite.setAttribute('aria-label', saved.has(item.id) ? `Remove saved prompt ${item.id}` : `Save prompt ${item.id}`);
    favorite.setAttribute('aria-pressed', String(saved.has(item.id)));
    favorite.addEventListener('click', () => {
      if (saved.has(item.id)) saved.delete(item.id); else saved.add(item.id);
      remember(); render();
      toast(saved.has(item.id) ? 'Prompt saved' : 'Prompt removed');
    });
    const topic = make('span', 'dl-lib-tag', item.category);
    head.append(id, topic, favorite);
    const heading = make('h3', '', item.title);
    const summary = make('p', 'dl-lib-card-description', item.prompt);
    const tags = make('div', 'dl-lib-card-tags');
    tags.append(make('span', 'dl-lib-tag subtle', item.tool), make('span', 'dl-lib-tag subtle', item.level));
    const footer = make('div', 'dl-lib-card-actions');
    const open = make('button', 'dl-lib-open', 'Read full prompt ↗');
    open.type = 'button';
    open.setAttribute('aria-haspopup', 'dialog');
    open.setAttribute('aria-controls', 'promptPreviewDialog');
    open.addEventListener('click', () => openPreview(item, open));
    footer.append(open);
    article.append(head, heading, summary, tags, footer);
    return article;
  }
  function render() {
    const query = search.value.trim().toLowerCase();
    matching = all.filter(item =>
      (!savedOnly || saved.has(item.id)) &&
      (!category.value || item.category === category.value) &&
      (!level.value || item.level === level.value) &&
      (!query || [item.id, item.title, item.category, item.tool, item.prompt].join(' ').toLowerCase().includes(query))
    );
    const totalPages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
    page = Math.min(Math.max(1, page), totalPages);
    const offset = (page - 1) * PAGE_SIZE;
    grid.replaceChildren();
    matching.slice(offset, offset + PAGE_SIZE).forEach(item => grid.append(card(item)));
    count.textContent = `${matching.length} of ${all.length} prompts`;
    $('emptyState').hidden = matching.length !== 0;
    pageInfo.textContent = `Page ${page} of ${totalPages}`;
    pageRange.textContent = matching.length ? `Showing ${offset + 1}–${Math.min(offset + PAGE_SIZE, matching.length)}` : 'No matching items';
    previous.disabled = page <= 1;
    next.disabled = page >= totalPages;
    pager.hidden = matching.length <= PAGE_SIZE;
    savedToggle.setAttribute('aria-pressed', String(savedOnly));
    savedToggle.classList.toggle('active', savedOnly);
    savedToggle.firstChild.textContent = savedOnly ? '★ Saved ' : '☆ Saved ';
    favCount.textContent = String(saved.size);
  }
  function resetPage() { page = 1; render(); }
  function goToPage(target) {
    page = target; render();
    $('results').scrollIntoView({block:'start', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  }
  previous.addEventListener('click', () => goToPage(page - 1));
  next.addEventListener('click', () => goToPage(page + 1));
  search.addEventListener('input', resetPage);
  category.addEventListener('change', resetPage);
  level.addEventListener('change', resetPage);
  savedToggle.addEventListener('click', () => { savedOnly = !savedOnly; resetPage(); });
  $('clearFilters').addEventListener('click', () => {
    search.value = ''; category.value = ''; level.value = ''; savedOnly = false;
    resetPage(); search.focus();
  });
  $('downloadBtn').addEventListener('click', () => {
    const chosen = all.filter(prompt => saved.has(prompt.id));
    if (!chosen.length) { toast('Save a prompt before exporting'); return; }
    const text = chosen.map(item => `${item.id} — ${item.category}\n${item.title}\n\n${item.prompt}\n\n${'-'.repeat(72)}`).join('\n\n');
    const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const anchor = make('a'); anchor.href = url; anchor.download = 'DataLearning_saved_AI_prompts.txt';
    document.body.append(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Saved prompts exported');
  });
  const params = new URLSearchParams(location.search);
  if (params.has('category') && [...category.options].some(opt => opt.value === params.get('category'))) category.value = params.get('category');
  if (params.has('q')) search.value = params.get('q').slice(0, 150);
  remember();
  render();
})();
