/* Public navigation v4: one accessible header; Course and Study tools flyouts.
   Native <details> supports touch, keyboard, and no-JS expansion. */
(() => {
  function start() {
    const header = document.querySelector('.dalp-global-header[data-public-nav="v4"]');
    if (!header) return;
    const button = header.querySelector('.dalp-global-toggle');
    const nav = header.querySelector('.dalp-global-nav');
    const scrim = header.querySelector('.dalp-menu-scrim');
    const menus = Array.from(nav.querySelectorAll('.dalp-nav-group'));
    const desktop = matchMedia('(min-width:1201px)');
    let previousFocus = null;
    function closeMenus(except) { menus.forEach(item => { if (item !== except) item.open = false; }); }
    function close(restoreFocus = false) {
      nav.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Open navigation');
      closeMenus();
      if (restoreFocus && !desktop.matches) button.focus();
      previousFocus = null;
    }
    function open() {
      previousFocus = document.activeElement;
      nav.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('aria-label', 'Close navigation');
    }
    button.addEventListener('click', () => {
      button.getAttribute('aria-expanded') === 'true' ? close() : open();
    });
    menus.forEach(item => item.addEventListener('toggle', () => {
      if (item.open) closeMenus(item);
    }));
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) close();
    });
    scrim?.addEventListener('click', () => close());
    document.addEventListener('pointerdown', event => {
      if (!header.contains(event.target)) {
        if (nav.classList.contains('is-open')) close();
        else closeMenus();
      } else if (desktop.matches && !event.target.closest('.dalp-nav-group')) closeMenus();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        if (nav.classList.contains('is-open')) { event.preventDefault(); close(true); }
        else if (menus.some(m => m.open)) { closeMenus(); button?.blur(); }
      }
    });
    desktop.addEventListener('change', () => close());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();
