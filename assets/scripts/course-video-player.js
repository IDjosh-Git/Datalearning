/** DataLearning course video viewer. Embeds YouTube only after an explicit learner click. */
(() => {
  'use strict';
  if (!document.body.dataset.course) return;

  let dialog = null;
  let frame = null;
  let title = null;
  let sourceLink = null;
  let opener = null;
  let previousOverflow = '';

  function youtubeId(href) {
    try {
      const url = new URL(href, document.baseURI);
      if (url.protocol !== 'https:') return null;
      const host = url.hostname.toLowerCase();
      let id = '';
      if (host === 'youtu.be' || host === 'www.youtu.be') id = url.pathname.split('/')[1] || '';
      else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(host)) {
        const paths = url.pathname.split('/').filter(Boolean);
        id = paths[0] === 'watch' ? (url.searchParams.get('v') || '') :
          ['embed', 'shorts', 'live'].includes(paths[0]) ? (paths[1] || '') : '';
      }
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    } catch { return null; }
  }

  function buildDialog() {
    const root = document.createElement('div');
    root.id = 'dalpCourseVideoDialog';
    root.className = 'dalp-video-overlay';
    root.hidden = true;
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-labelledby', 'dalpVideoTitle');
    root.setAttribute('aria-describedby', 'dalpVideoDesc');
    root.innerHTML = `
      <div class="dalp-video-backdrop" data-video-close="true"></div>
      <section class="dalp-video-panel" aria-label="Lesson video player">
        <header class="dalp-video-topbar">
          <div class="dalp-video-heading">
            <span class="dalp-video-kicker"><span class="dalp-video-live-dot" aria-hidden="true"></span> COURSE VIDEO · WATCH HERE</span>
            <h2 id="dalpVideoTitle">Video companion</h2>
          </div>
          <button class="dalp-video-close" type="button" data-video-close="true" aria-label="Close lesson video" title="Close video">
            <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </header>
        <div class="dalp-video-main">
          <div class="dalp-video-player">
            <div class="dalp-video-poster" aria-hidden="true"><span class="dalp-video-play-symbol">▶</span><span>Loading your lesson…</span></div>
            <iframe title="YouTube course video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
          </div>
          <div class="dalp-video-footer">
            <div id="dalpVideoDesc" class="dalp-video-caption">Stay on this page to continue learning. If the creator restricts embedded playback, use the YouTube link.</div>
            <div class="dalp-video-actions">
              <button class="dalp-video-fullscreen" type="button" aria-label="View video in fullscreen">
                <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"/></svg>
                Fullscreen
              </button>
              <a class="dalp-video-external" target="_blank" rel="noopener noreferrer">Open on YouTube <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </section>`;
    document.body.appendChild(root);
    frame = root.querySelector('iframe');
    title = root.querySelector('#dalpVideoTitle');
    sourceLink = root.querySelector('.dalp-video-external');
    frame.addEventListener('load', () => root.querySelector('.dalp-video-poster')?.classList.add('dalp-video-loaded'));
    root.addEventListener('click', e => {
      if (e.target.closest('[data-video-close="true"]')) { closeVideo(); return; }
      if (e.target.closest('.dalp-video-fullscreen')) {
        const player = root.querySelector('.dalp-video-player');
        if (player.requestFullscreen) player.requestFullscreen().catch(() => {});
        else if (frame.requestFullscreen) frame.requestFullscreen().catch(() => {});
      }
    });
    return root;
  }

  function openVideo(anchor, id) {
    if (!dialog) dialog = buildDialog();
    if (!dialog.hidden) closeVideo(false);
    opener = anchor;
    previousOverflow = document.body.style.overflow;
    title.textContent = anchor.textContent.replace(/[↗▶]/g, '').trim() || 'Watch course video';
    sourceLink.href = `https://www.youtube.com/watch?v=${id}`;
    dialog.querySelector('.dalp-video-poster')?.classList.remove('dalp-video-loaded');
    dialog.hidden = false;
    document.body.style.overflow = 'hidden';
    frame.title = `${title.textContent} — YouTube video`;
    // Loading starts on demand, never during the initial lesson-page render.
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`;
    dialog.querySelector('.dalp-video-close').focus();
  }

  function closeVideo(returnFocus = true) {
    if (!dialog || dialog.hidden) return;
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    // Clearing the iframe source stops YouTube playback and releases resources.
    frame.removeAttribute('src');
    dialog.hidden = true;
    document.body.style.overflow = previousOverflow;
    if (returnFocus && opener?.isConnected) opener.focus();
  }

  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    const anchor = e.target.closest?.('a[href]');
    if (!anchor || !document.body.contains(anchor) || anchor.closest('.dalp-video-overlay')) return;
    const id = youtubeId(anchor.getAttribute('href'));
    if (!id) return;
    e.preventDefault();
    openVideo(anchor, id);
  });

  document.addEventListener('keydown', e => {
    if (!dialog || dialog.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); closeVideo(); return; }
    if (e.key !== 'Tab') return;
    const all = [...dialog.querySelectorAll('button:not([disabled]), a[href], iframe')].filter(el => el.getClientRects().length);
    if (!all.length) { e.preventDefault(); return; }
    const first = all[0], last = all[all.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
  window.addEventListener('pagehide', () => closeVideo(false));
})();
