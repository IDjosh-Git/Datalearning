/* Full-viewport, accessible challenge selection for Practice Arena. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const modal = $('#challengeModal');
  const launch = $('#hubOpen');
  const close = $('#hubClose');
  const filters = $('#arenaFilterDetails');
  if (!modal || !launch || !close) return;

  let previousFocus = null;
  const compact = window.matchMedia('(max-width: 720px)');
  function syncFilters() {
    if (!filters) return;
    filters.open = !compact.matches;
  }
  syncFilters();
  if (compact.addEventListener) compact.addEventListener('change', syncFilters);
  else if (compact.addListener) compact.addListener(syncFilters);

  function show() {
    previousFocus = document.activeElement;
    // Move the dialog out of the Arena main stacking context so it covers the global header.
    // Its node and event listeners remain unchanged, preserving the practice engine.
    if (modal.parentElement !== document.body) document.body.appendChild(modal);
    modal.hidden = false;
    document.body.classList.add('hub-modal-open');
    document.documentElement.classList.add('dl-arena-modal-open');
    const search = $('#hubSearch');
    if (search) search.focus({preventScroll:true});
  }
  function hide() {
    modal.hidden = true;
    document.body.classList.remove('hub-modal-open');
    document.documentElement.classList.remove('dl-arena-modal-open');
    if (previousFocus && previousFocus.isConnected) previousFocus.focus({preventScroll:true});
    previousFocus = null;
  }
  function sync(task) {
    if (!task) return;
    const title = $('#hubActiveTitle');
    const difficulty = $('#hubActiveDifficulty');
    if (title) title.textContent = task.title;
    if (difficulty) difficulty.textContent = `${task.kind} · ${task.topic}`;
  }

  launch.addEventListener('click', show);
  close.addEventListener('click', hide);
  modal.addEventListener('click', event => {
    if (event.target.closest('[data-hub-close]')) hide();
  });
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      modal.hidden ? show() : hide();
      return;
    }
    if (modal.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      hide();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...modal.querySelectorAll('summary,button:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex="0"]')]
      .filter(element => element.getClientRects().length && (!element.closest('details:not([open])') || element.matches('summary')));
    if (!focusable.length) return;
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  window.DALP_HUB = {open:show,close:hide,sync};
  sync((window.DALP_PRACTICE || [])[0]);
})();
