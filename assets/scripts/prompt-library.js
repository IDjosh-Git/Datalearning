(() => {
  'use strict';

  const all = Array.isArray(window.DALP_PROMPTS) ? window.DALP_PROMPTS : [];
  const $ = (id) => document.getElementById(id);
  const grid = $('promptGrid');
  const search = $('promptSearch');
  const category = $('categorySelect');
  const level = $('levelSelect');
  const count = $('resultCount');
  const more = $('loadMore');
  const savedToggle = $('savedToggle');
  const favCount = $('favCount');
  const modal = $('promptPreviewDialog');
  const modalTitle = $('promptModalTitle');
  const modalReference = $('promptModalReference');
  const modalMeta = $('promptModalMeta');
  const modalContent = $('promptModalContent');
  const modalScroll = $('promptModalScroll');
  const modalCopy = $('promptModalCopy');
  const KEY = 'dalp:prompt-library:favorites:v1';

  let saved = new Set();
  let savedOnly = false;
  let visibleLimit = 24;
  let matching = [];
  let openPrompt = null;
  let returnFocus = null;
  let toastHandle;

  try {
    const arr = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (Array.isArray(arr)) saved = new Set(arr.filter(v => typeof v === 'string'));
  } catch {}

  [...new Set(all.map(p => p.category))].forEach((cat) => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    category.append(option);
  });

  const params = new URLSearchParams(location.search);
  if (params.has('category') && [...category.options].some(o => o.value === params.get('category'))) {
    category.value = params.get('category');
  }

  function toast(message) {
    const element = $('promptToast');
    element.textContent = message;
    element.classList.add('show');
    clearTimeout(toastHandle);
    toastHandle = setTimeout(() => element.classList.remove('show'), 2400);
  }

  function remember() {
    try { localStorage.setItem(KEY, JSON.stringify([...saved])); } catch {}
    favCount.textContent = String(saved.size);
  }

  function textNode(tag, className, value) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = value;
    return element;
  }

  async function copyPrompt(text, id) {
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(text);
    } catch {
      // The fallback must be INSIDE an open dialog; everything outside it is inert.
      const field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      (modal.open ? modal : document.body).append(field);
      field.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch {}
      field.remove();
      if (!copied) {
        toast('Copy unavailable. Select and copy the prompt text.');
        modalScroll.focus();
        return;
      }
    }
    toast(`${id} copied — customize the placeholders`);
    modalCopy.textContent = 'Copied ✓';
    modalCopy.classList.add('is-copied');
  }

  function openPreview(item, trigger) {
    if (!modal || !item) return;
    openPrompt = item;
    returnFocus = trigger;
    modalReference.textContent = `PROMPT ${item.id} · ${item.category}`;
    modalTitle.textContent = item.title;
    modalMeta.replaceChildren(textNode('span', '', item.tool), textNode('span', '', item.level));
    // Text only: prompts can contain HTML-like placeholders and must not execute markup.
    modalContent.textContent = item.prompt;
    modalCopy.textContent = 'Copy full prompt ↗';
    modalCopy.classList.remove('is-copied');
    modalScroll.scrollTop = 0;
    document.body.classList.add('pl-preview-open');
    if (!modal.open) modal.showModal();
    $('promptModalCloseIcon').focus();
  }

  function closePreview() {
    if (modal.open) modal.close();
  }

  $('promptModalClose').addEventListener('click', closePreview);
  $('promptModalCloseIcon').addEventListener('click', closePreview);
  modalCopy.addEventListener('click', () => {
    if (openPrompt) void copyPrompt(openPrompt.prompt, openPrompt.id);
  });
  modal.addEventListener('close', () => {
    document.body.classList.remove('pl-preview-open');
    openPrompt = null;
    if (returnFocus && returnFocus.isConnected) returnFocus.focus();
    returnFocus = null;
  });
  modal.addEventListener('click', (event) => {
    // Native <dialog> dispatches backdrop clicks on the element itself.
    if (event.target === modal) closePreview();
  });

  function card(item) {
    const article = document.createElement('article');
    article.className = 'prompt-card';
    const head = document.createElement('div');
    head.className = 'card-top';
    head.append(textNode('span', 'prompt-id', item.id));

    const fav = document.createElement('button');
    fav.type = 'button';
    fav.className = 'favorite' + (saved.has(item.id) ? ' is-saved' : '');
    fav.setAttribute('aria-label', saved.has(item.id) ? 'Remove saved prompt' : 'Save prompt');
    fav.setAttribute('aria-pressed', String(saved.has(item.id)));
    fav.textContent = saved.has(item.id) ? '★' : '☆';
    fav.addEventListener('click', () => {
      if (saved.has(item.id)) saved.delete(item.id);
      else saved.add(item.id);
      remember();
      render();
      toast(saved.has(item.id) ? 'Prompt saved' : 'Prompt removed');
    });
    head.append(fav);
    article.append(head);
    article.append(textNode('span', 'category-label', item.category));
    article.append(textNode('h3', '', item.title));

    const tags = document.createElement('div');
    tags.className = 'prompt-tags';
    tags.append(textNode('span', '', item.tool), textNode('span', '', item.level));
    article.append(tags);

    // Reading a prompt no longer adds any DOM content to the card.
    const actions = document.createElement('div');
    actions.className = 'card-actions';
    const read = document.createElement('button');
    read.type = 'button';
    read.className = 'prompt-preview-trigger';
    read.textContent = 'Read full prompt';
    read.setAttribute('aria-haspopup', 'dialog');
    read.setAttribute('aria-controls', 'promptPreviewDialog');
    read.addEventListener('click', () => openPreview(item, read));
    actions.append(read);
    article.append(actions);
    return article;
  }

  function render() {
    grid.replaceChildren();
    const query = search.value.trim().toLocaleLowerCase();
    matching = all.filter(p =>
      (!savedOnly || saved.has(p.id)) &&
      (!category.value || p.category === category.value) &&
      (!level.value || p.level === level.value) &&
      (!query || (p.title + ' ' + p.category + ' ' + p.tool + ' ' + p.prompt).toLocaleLowerCase().includes(query))
    );
    matching.slice(0, visibleLimit).forEach(p => grid.append(card(p)));
    count.textContent = `${matching.length} of ${all.length} prompts found · ${Math.min(matching.length, visibleLimit)} displayed`;
    more.hidden = matching.length <= visibleLimit;
    $('emptyState').hidden = matching.length !== 0;
    savedToggle.setAttribute('aria-pressed', String(savedOnly));
    savedToggle.classList.toggle('active', savedOnly);
    favCount.textContent = String(saved.size);
  }

  function resetLimit() { visibleLimit = 24; render(); }
  search.addEventListener('input', resetLimit);
  category.addEventListener('change', resetLimit);
  level.addEventListener('change', resetLimit);
  savedToggle.addEventListener('click', () => { savedOnly = !savedOnly; resetLimit(); });
  more.addEventListener('click', () => { visibleLimit += 24; render(); });
  $('clearFilters').addEventListener('click', () => {
    search.value = '';
    category.value = '';
    level.value = '';
    savedOnly = false;
    resetLimit();
  });
  $('downloadBtn').addEventListener('click', () => {
    const chosen = all.filter(p => saved.has(p.id));
    if (!chosen.length) { toast('Save one or more prompts before exporting'); return; }
    const text = chosen.map(p => `${p.id} — ${p.category}\n${p.title}\n\n${p.prompt}\n\n${'-'.repeat(72)}`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'DALP_saved_AI_prompts.txt';
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Saved prompts exported');
  });

  remember();
  render();
})();
