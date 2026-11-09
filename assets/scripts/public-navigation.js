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
// Full-viewport mobile menu: real close control inside the overlay.
let mobileHead = typeof nav.querySelector === 'function' ? nav.querySelector('.dl-mobile-navigation-header') : null;
if (!mobileHead && typeof document.createElement === 'function') {
  mobileHead = document.createElement('div');
  mobileHead.className = 'dl-mobile-navigation-header';
  const label = document.createElement('div');
  label.className = 'dl-mobile-navigation-title';
  const brand = document.createElement('strong');brand.textContent = 'DataLearning';
  const subtitle = document.createElement('small');subtitle.textContent = 'Explore the learning platform';
  label.append(brand, subtitle);
  const closeButton = document.createElement('button');
  closeButton.type = 'button';closeButton.className = 'dl-mobile-navigation-close';
  closeButton.setAttribute('aria-label', 'Close navigation menu');
  closeButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  mobileHead.append(label, closeButton);
  nav.prepend(mobileHead);
}
const mobileClose = mobileHead?.querySelector?.('.dl-mobile-navigation-close');
    const desktop = matchMedia('(min-width:1201px)');
    // Keep the off-canvas menu exactly below the rendered header, including
    // phones with larger system text or a signed-in profile avatar.
    let headerHeightFrame = 0;
    const updateHeaderHeight = () => {
      headerHeightFrame = 0;
      const height = Math.round(typeof header.getBoundingClientRect === 'function'
        ? header.getBoundingClientRect().height : (header.offsetHeight || 66));
      if (height > 0 && height < 180 && document.documentElement?.style?.setProperty)
        document.documentElement.style.setProperty('--dl-premium-header-height', `${height}px`);
    };
    const queueHeaderHeight = () => {
      if (typeof requestAnimationFrame !== 'function') {updateHeaderHeight();return;}
      if (!headerHeightFrame) headerHeightFrame = requestAnimationFrame(updateHeaderHeight);
    };
    updateHeaderHeight();
    if (typeof addEventListener === 'function') addEventListener('resize', queueHeaderHeight, {passive:true});
    if (typeof ResizeObserver === 'function') new ResizeObserver(queueHeaderHeight).observe(header);
    let previousFocus = null;
    function closeMenus(except) { menus.forEach(item => { if (item !== except) item.open = false; }); }
    function close(restoreFocus = false) {
      nav.classList.remove('is-open');
      nav.removeAttribute?.('aria-modal');nav.removeAttribute?.('role');
      document.body?.classList?.remove('dl-mobile-nav-open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Open navigation');
      closeMenus();
      if (restoreFocus && !desktop.matches) button.focus();
      previousFocus = null;
    }
    function open() {
      previousFocus = document.activeElement;
      updateHeaderHeight();
      nav.classList.add('is-open');
      if (!desktop.matches) {nav.setAttribute?.('role', 'dialog');nav.setAttribute?.('aria-modal','true');}
      if (!desktop.matches) document.body?.classList?.add('dl-mobile-nav-open');
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('aria-label', 'Close navigation');
      if (!desktop.matches) mobileClose?.focus();
    }
    mobileClose?.addEventListener('click', () => close(true));
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
      if (event.key === 'Tab' && nav.classList.contains('is-open') && !desktop.matches) {
        const focusable = [...nav.querySelectorAll('a[href],button:not([disabled]),summary,[tabindex]:not([tabindex="-1"])')]
          .filter(el => el.getClientRects().length && !el.closest('[hidden]'));
        if (focusable.length) {
          const first = focusable[0], last = focusable.at(-1);
          if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
          else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
        }
      }
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
