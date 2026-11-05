/* Low-cost progressive enhancements. No change to authentication, learning records or grading. */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  function init() {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'light');
    root.classList.add('light');

    // A transform avoids a layout pass on every frame. Cache scroll limits until
    // the viewport or document grows rather than measuring scrollHeight on scroll.
    const progress = document.createElement('div');
    progress.className = 'experience-top-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.append(progress);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'experience-back-top';
    btn.setAttribute('aria-label', 'Back to top of page');
    btn.innerHTML = '<span>Back to top</span> ↑';
    btn.addEventListener('click', () => window.scrollTo({top:0,behavior:reduced.matches?'auto':'smooth'}));
    document.body.append(btn);
    let maxScroll = 1, pending = false;
    function measure() {
      maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
      schedule();
    }
    function paint() {
      pending = false;
      const position = window.scrollY;
      progress.style.transform = `scaleX(${Math.min(1,Math.max(0,position/maxScroll))})`;
      btn.classList.toggle('is-visible',position > 650);
    }
    function schedule() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(paint);
    }
    window.addEventListener('scroll', schedule, {passive:true});
    window.addEventListener('resize', measure, {passive:true});
    window.addEventListener('load',measure,{once:true});
    // Preserve accuracy after delayed images or dynamic course content.
    if ('ResizeObserver' in window) {
      const sizeObserver = new ResizeObserver(measure);
      sizeObserver.observe(document.body);
    }
    measure();

    // Tables are already readable before enhancement. Breaking the structural
    // upgrades into idle batches avoids a long task on large 10-week course pages.
    const tables = document.querySelectorAll('table');
    let tableIndex = 0;
    function upgradeTable(table,index) {
      if (table.closest('.learning-table-scroll,.experience-table-scroll,.dlp97-table-scroll,.dlp-table-frame')) return;
      if (!table.querySelector('caption')) {
        const caption = document.createElement('caption');
        caption.textContent = `Example data table ${index+1}`;
        table.prepend(caption);
      }
      table.querySelectorAll('thead th').forEach(th => th.setAttribute('scope','col'));
      const shell = document.createElement('div');
      shell.className = 'experience-table-scroll';
      shell.tabIndex = 0;
      shell.setAttribute('role','region');
      shell.setAttribute('aria-label',table.querySelector('caption')?.textContent||'Scrollable data table');
      table.before(shell);
      shell.append(table);
    }
    function batch(deadline) {
      let count = 0;
      while (tableIndex < tables.length && count < 5 && (!deadline || deadline.timeRemaining()>2)) {
        upgradeTable(tables[tableIndex],tableIndex);
        tableIndex++;
        count++;
      }
      if (tableIndex < tables.length) queueBatch();
    }
    function queueBatch() {
      if ('requestIdleCallback' in window) requestIdleCallback(batch,{timeout:1800});
      else setTimeout(()=>batch(null),20);
    }
    if(tables.length && !document.body.matches('[data-premium-course-v7="true"]'))queueBatch();

    // The current course guide and lesson rail are the only in-course learning UI.
    // Removed the legacy study-map that could appear after script initialization.
    // Cards are visible immediately: decorative reveal effects can feel like lag.
    document.querySelectorAll('button').forEach(button=>{
      if(!button.getAttribute('aria-label')&&!button.textContent.trim()){
        const title=button.getAttribute('title');if(title)button.setAttribute('aria-label',title);
      }
    });
  }
  if (document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
