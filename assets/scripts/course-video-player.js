/** DataLearning lesson theatre. Public YouTube videos, Shorts, live streams and playlists. */
(() => {
  'use strict';
  if (!document.body?.dataset?.course && !document.body?.dataset?.uiCourse) return;
  let overlay, frame, heading, externalLink, address, status, opener, previousOverflow='';
  const allowed = new Set(['youtube.com','www.youtube.com','m.youtube.com','music.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com','youtu.be','www.youtu.be']);
  const videoPattern = /^[A-Za-z0-9_-]{11}$/;
  const playlistPattern = /^[A-Za-z0-9_-]{10,80}$/;
  function timeInSeconds(value) {
    if (!value) return 0;
    if (/^\d+$/.test(value)) return Math.min(86400,Number(value));
    const parts=value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
    return parts ? Math.min(86400,(Number(parts[1]||0)*3600)+(Number(parts[2]||0)*60)+Number(parts[3]||0)) : 0;
  }
  function parseYouTube(value) {
    try {
      const url=new URL(String(value).trim(), document.baseURI);
      if (url.protocol!=='https:' || !allowed.has(url.hostname.toLowerCase())) return null;
      const host=url.hostname.toLowerCase();
      const path=url.pathname.split('/').filter(Boolean);
      let id='';
      if (host==='youtu.be'||host==='www.youtu.be') id=path[0]||'';
      else if (path[0]==='watch') id=url.searchParams.get('v')||'';
      else if (['shorts','live','embed','v'].includes(path[0])) id=path[1]||'';
      const list=url.searchParams.get('list')||'';
      const validList=playlistPattern.test(list)?list:'';
      const start=timeInSeconds(url.searchParams.get('t')||url.searchParams.get('start')||url.searchParams.get('time_continue')||url.hash.replace(/^#t=?/,'').replace(/^#/,'')||'');
      if (!videoPattern.test(id) && !validList) return null;
      let embed = videoPattern.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : 'https://www.youtube-nocookie.com/embed/videoseries';
      const opts=new URLSearchParams({autoplay:'1',playsinline:'1',rel:'0'});
      if (validList) opts.set('list',validList);
      if (start && videoPattern.test(id)) opts.set('start',String(start));
      const canonical = videoPattern.test(id) ? `https://www.youtube.com/watch?v=${id}${validList?`&list=${validList}`:''}${start?`&t=${start}s`:''}` : `https://www.youtube.com/playlist?list=${validList}`;
      return {embed:`${embed}?${opts}`,canonical,start,kind:validList&&!videoPattern.test(id)?'playlist':path[0]==='shorts'?'short':'video'};
    } catch (_) {return null;}
  }
  function mount() {
    overlay=document.createElement('div');overlay.className='dl-video-theatre';overlay.id='dalpCourseVideoDialog';overlay.hidden=true;
    overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-labelledby','dl-video-title');
    overlay.innerHTML=`<div class="dl-video-shade" data-video-close="true"></div>
      <section class="dl-video-shell" aria-label="YouTube lesson player">
        <header class="dl-video-header"><div class="dl-video-brand"><span class="dl-video-brand-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M21 8.5a3 3 0 0 0-2.1-2.13C17.1 5.9 12 5.9 12 5.9s-5.1 0-6.9.47A3 3 0 0 0 3 8.5a31 31 0 0 0 0 7 3 3 0 0 0 2.1 2.13c1.8.47 6.9.47 6.9.47s5.1 0 6.9-.47A3 3 0 0 0 21 15.5a31 31 0 0 0 0-7ZM10 15V9l5 3-5 3Z"/></svg></span><span class="dl-video-header-copy"><span class="dl-video-eyebrow">DATALEARNING • VIDEO COMPANION</span><strong id="dl-video-title">Watch the lesson</strong></span></div>
          <button class="dl-video-close" type="button" data-video-close="true" aria-label="Close video player"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg></button>
        </header>
        <div class="dl-video-content"><div class="dl-video-screen"><iframe title="YouTube lesson player" loading="eager" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
          <div class="dl-video-description"><div><strong>Learn without leaving your lesson</strong><p>Playback is provided by YouTube. Some videos cannot play in embedded players because of creator, region, age or account restrictions. The YouTube link below always remains available.</p></div><div class="dl-video-commands"><button type="button" class="dl-video-fullscreen" aria-label="Expand player to fullscreen">⛶ Fullscreen</button><a class="dl-video-external" rel="noopener noreferrer" target="_blank">View on YouTube ↗</a></div></div>
          <form class="dl-video-switch-form"><label for="dl-video-url">Open another YouTube video, Short, livestream or playlist</label><div class="dl-video-switch-row"><input id="dl-video-url" type="url" inputmode="url" autocomplete="off" spellcheck="false" placeholder="Paste a YouTube link…" aria-describedby="dl-video-status"/><button type="submit">Play link <span aria-hidden="true">▶</span></button></div><p class="dl-video-status" id="dl-video-status" role="status" aria-live="polite"></p></form>
        </div>
      </section>`;
    document.body.append(overlay);
    frame=overlay.querySelector('iframe');heading=overlay.querySelector('#dl-video-title');externalLink=overlay.querySelector('.dl-video-external');address=overlay.querySelector('#dl-video-url');status=overlay.querySelector('#dl-video-status');
    overlay.addEventListener('click',event=>{
      if(event.target.closest('[data-video-close]')){close();return;}
      if(event.target.closest('.dl-video-fullscreen')){
        const surface=overlay.querySelector('.dl-video-screen');
        if(surface.requestFullscreen)surface.requestFullscreen().catch(()=>status.textContent='Fullscreen is not available in this browser.');
      }
    });
    overlay.querySelector('form').addEventListener('submit',event=>{
      event.preventDefault();const item=parseYouTube(address.value);
      if (!item){status.textContent='Use a valid public YouTube watch, share, Shorts, live, embed or playlist link.';return;}
      play(item,'Your YouTube video');address.value='';status.textContent='New video loaded. If embedding is blocked, use View on YouTube.';
    });
  }
  function play(item,label){
    heading.textContent=label||'Watch the lesson';externalLink.href=item.canonical;
    frame.title=heading.textContent+' — YouTube video';
    // Assign only a validated youtube-nocookie.com embed URL; no network request before click.
    frame.src=item.embed;
  }
  function open(anchor,item){
    if (!overlay)mount();
    if (!overlay.hidden)close(false);
    opener=anchor;previousOverflow=document.body.style.overflow;
    overlay.hidden=false;document.body.style.overflow='hidden';
    status.textContent='Tip: use the YouTube link if a video cannot be embedded.';
    play(item,anchor.getAttribute('data-video-title')||anchor.textContent.replace(/[↗▶↓]/g,'').trim()||'Watch the lesson');
    overlay.querySelector('.dl-video-close').focus();
  }
  function close(refocus=true){
    if(!overlay||overlay.hidden)return;
    if(document.fullscreenElement)document.exitFullscreen?.().catch(()=>{});
    frame.removeAttribute('src');overlay.hidden=true;document.body.style.overflow=previousOverflow;
    if(refocus&&opener?.isConnected)opener.focus();
  }
  document.addEventListener('click',event=>{
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const link=event.target.closest?.('a[href]');
    if(!link||link.closest('#dalpCourseVideoDialog'))return;
    const item=parseYouTube(link.getAttribute('href'));
    if(!item)return;
    event.preventDefault();open(link,item);
  });
  document.addEventListener('keydown',event=>{
    if(!overlay||overlay.hidden)return;
    if(event.key==='Escape'){event.preventDefault();close();return;}
    if(event.key!=='Tab')return;
    const focusable=[...overlay.querySelectorAll('button:not(:disabled),input:not(:disabled),a[href],iframe')].filter(e=>e.getClientRects().length);
    if(!focusable.length){event.preventDefault();return;}
    const first=focusable[0],last=focusable[focusable.length-1];
    if(event.shiftKey&&(document.activeElement===first||document.activeElement===overlay)){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
  window.addEventListener('pagehide',()=>close(false));
  // Testable parser, no direct access to the browsing environment or external services.
  window.DALP_PARSE_YOUTUBE=parseYouTube;
})();
