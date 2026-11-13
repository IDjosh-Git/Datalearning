(() => {
  'use strict';

  const ICONS = {
    upRight: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 17 17 7"/><path d="M9 7h8v8"/></svg>',
    right: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
    left: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 12H5"/><path d="m11 6-6 6 6 6"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m12 2 2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2z"/><path d="m18 2 .9 2.1L21 5l-2.1.9L18 8l-.9-2.1L15 5l2.1-.9z"/><path d="m5 15 .9 2.1L8 18l-2.1.9L5 21l-.9-2.1L2 18l2.1-.9z"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m5 12 4.2 4.2L19 6.5"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 6.5v11l9-5.5z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5c-1.1 0-2.2-.2-3.2-.7L4 20l1.7-4.5A7.5 7.5 0 1 1 20 11.5Z"/><path d="M8.5 10h7"/><path d="M8.5 13.5h4.5"/></svg>',
    book: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21z"/><path d="M5 5.5V21a2.5 2.5 0 0 1 2.5-2.5H19"/><path d="M9 8h6"/><path d="M9 11h6"/></svg>'
  };

  const STYLE_ID = 'dl-premium-icon-style';
  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .dl-icon-inline,.dl-icon-badge,.dl-icon-chip{display:inline-grid;place-items:center;vertical-align:middle;line-height:1;flex:0 0 auto}
      .dl-icon-inline{width:1.05em;height:1.05em;color:currentColor}
      .dl-icon-inline svg,.dl-icon-badge svg,.dl-icon-chip svg{width:100%;height:100%;display:block;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
      .dl-icon-trailing{margin-left:.45em}
      .dl-icon-leading{margin-right:.5em}
      .dl-icon-badge{width:2rem;height:2rem;border-radius:.8rem;background:linear-gradient(145deg, rgba(255,255,255,.92), rgba(246,240,232,.9)); color:#023048; box-shadow:0 8px 24px rgba(2,48,72,.12), inset 0 1px 0 rgba(255,255,255,.85); border:1px solid rgba(175,163,154,.18)}
      .dl-icon-chip{width:2.5rem;height:2.5rem;border-radius:1rem;background:linear-gradient(145deg, #F0EDDE, #F6F0E8); color:#023048; box-shadow:0 10px 28px rgba(2,48,72,.14), inset 0 1px 0 rgba(255,255,255,.82); border:1px solid rgba(175,163,154,.18)}
      .dalp-global-header .dalp-option-arrow,.dalp-global-header .dalp-tool-option > span:last-child,.dalp-global-header .dalp-account-icon{font-size:0 !important}
      .dalp-global-header .dalp-option-arrow .dl-icon-inline,.dalp-global-header .dalp-tool-option > span:last-child .dl-icon-inline,.dalp-global-header .dalp-account-icon .dl-icon-inline{font-size:16px}
      .dlp-callout-symbol,.dlp-outcome-icon{font-size:0 !important}
      .dlp-callout-symbol .dl-icon-chip{width:58px;height:58px;border-radius:18px;background:linear-gradient(145deg, #770101, #023048); color:#FFFFFF; border-color:rgba(255,255,255,.16); box-shadow:0 18px 36px rgba(2,48,72,.22), inset 0 1px 0 rgba(255,255,255,.18)}
      .dlp-outcome-icon .dl-icon-chip{width:52px;height:52px;border-radius:16px}
      .dlp-outcome-article:nth-child(2) .dl-icon-chip{background:linear-gradient(145deg, #F8EFE4, #F1E3D0); color:#770101}
      .dlp-outcome-article:nth-child(3) .dl-icon-chip{background:linear-gradient(145deg, #F8EFE4, #EAD7C0); color:#770101}
      .dl-inline-link-icon,.dl-inline-leading-icon{display:inline-grid;place-items:center;vertical-align:text-bottom}
      .dl-inline-link-icon{width:1em;height:1em;margin-left:.35em}
      .dl-inline-leading-icon{width:1em;height:1em;margin-right:.45em}
      .dl-inline-link-icon svg,.dl-inline-leading-icon svg{width:100%;height:100%;display:block;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
    `;
    document.head.appendChild(style);
  }

  function makeSpan(iconName, cls='dl-icon-inline', label='') {
    const span = document.createElement('span');
    span.className = cls;
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = ICONS[iconName] || ICONS.right;
    if (label) span.dataset.iconLabel = label;
    return span;
  }

  function replaceIfExact(el, textMap, cls='dl-icon-inline') {
    if (!el) return;
    const text = (el.textContent || '').trim();
    const key = textMap[text];
    if (!key) return;
    el.textContent = '';
    el.appendChild(makeSpan(key, cls));
    el.dataset.iconUpgraded = 'true';
  }

  function convertTextNode(parent, textNode) {
    if (!textNode || !textNode.nodeValue) return;
    const original = textNode.nodeValue;
    let text = original;
    let changed = false;

    const leadingMap = {'←':'left','✦':'sparkle','✓':'check'};
    const trailingMap = {'↗':'upRight','→':'right'};

    const leadingMatch = text.match(/^\s*([←✦✓])\s*/);
    if (leadingMatch) {
      const symbol = leadingMatch[1];
      text = text.replace(/^\s*[←✦✓]\s*/, '');
      const icon = makeSpan(leadingMap[symbol], 'dl-inline-leading-icon');
      parent.insertBefore(icon, textNode);
      changed = true;
    }

    const trailingMatch = text.match(/\s*([↗→])\s*$/);
    if (trailingMatch) {
      const symbol = trailingMatch[1];
      text = text.replace(/\s*[↗→]\s*$/, '');
      changed = true;
      textNode.nodeValue = text;
      const icon = makeSpan(trailingMap[symbol], 'dl-inline-link-icon');
      parent.insertBefore(icon, textNode.nextSibling);
      return;
    }

    if (changed) textNode.nodeValue = text;
  }

  function shouldSkip(node) {
    return node.closest('script,style,svg,code,pre,textarea');
  }

  function process(root=document) {
    ensureStyle();

    root.querySelectorAll('.dalp-option-arrow, .dalp-tool-option > span:last-child, .dalp-account-icon').forEach(el => replaceIfExact(el, {'↗':'upRight'}, 'dl-icon-inline'));
    root.querySelectorAll('.dlp-callout-symbol').forEach(el => replaceIfExact(el, {'✦':'sparkle'}, 'dl-icon-chip'));
    root.querySelectorAll('.dlp-outcome-icon').forEach(el => replaceIfExact(el, {'✓':'check','↗':'upRight','✦':'sparkle'}, 'dl-icon-chip'));

    root.querySelectorAll('a,button,summary,.button,[role="button"],.dalp-plain-link,.dlp-action-link,.dlp-text-link').forEach(el => {
      if (shouldSkip(el) || el.dataset.iconScanned === 'true') return;
      const childNodes = Array.from(el.childNodes).filter(n => n.nodeType === Node.TEXT_NODE && n.nodeValue && n.nodeValue.trim());
      childNodes.forEach(textNode => convertTextNode(el, textNode));
      el.dataset.iconScanned = 'true';
    });
  }

  function init() {
    process(document);
    const observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        m.addedNodes.forEach(node => {
          if (node.nodeType === 1) process(node);
        });
      }
    });
    observer.observe(document.body, {childList: true, subtree: true});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {once: true});
  } else {
    init();
  }
})();
