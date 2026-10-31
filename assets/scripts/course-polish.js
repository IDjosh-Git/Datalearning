/* Accessible, optional enhancement: if the script fails, every panel remains readable. */
(() => {
  'use strict';
  for (const host of document.querySelectorAll('[data-course-tabs]')) {
    const list = host.querySelector('[data-course-tablist]');
    const tabs = [...host.querySelectorAll('[data-tab]')];
    const panels = [...host.querySelectorAll('[data-panel]')];
    if (!list || tabs.length !== 3 || panels.length !== tabs.length) continue;
    if (!tabs.every(tab => panels.some(panel => panel.dataset.panel === tab.dataset.tab))) continue;

    list.setAttribute('role', 'tablist');
    tabs.forEach(tab => {
      const panel = panels.find(item => item.dataset.panel === tab.dataset.tab);
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panel.id);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.tabIndex = 0;
    });

    function activate(tab, focus = false) {
      for (const item of tabs) {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
      }
      for (const panel of panels) panel.hidden = panel.dataset.panel !== tab.dataset.tab;
      if (focus) tab.focus();
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', event => {
        const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
        if (!keys.includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        activate(tabs[next], true);
      });
    });
    host.classList.add('is-enhanced');
    activate(tabs[0]);
  }
})();
