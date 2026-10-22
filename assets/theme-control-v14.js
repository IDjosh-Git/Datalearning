/* Reliable, accessible theme switcher for all learning and admin screens. */
(()=>{'use strict';
const STORE='dalp-theme';
const moon='<svg class="theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>';
const sun='<svg class="theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
const read=()=>{try{return localStorage.getItem(STORE)}catch{return null}};
const preferred=()=>read()==='light'||read()==='dark'?read():(window.matchMedia?.('(prefers-color-scheme: dark)').matches?'dark':'light');
const set=t=>{const dark=t==='dark';document.documentElement.setAttribute('data-theme',dark?'dark':'light');document.documentElement.style.colorScheme=dark?'dark':'light';const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=dark?'#10202e':'#f6f8fb';document.querySelectorAll('.dlp-theme-control').forEach(b=>{b.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');b.setAttribute('title',dark?'Switch to light mode':'Switch to dark mode');b.setAttribute('aria-pressed',String(dark));const caption=b.querySelector('.dlp-theme-caption');if(caption)caption.textContent=dark?'Light mode':'Dark mode'});};
const button=()=>{const b=document.createElement('button');b.type='button';b.className='dlp-theme-control';b.id='dalpThemeToggle';b.setAttribute('aria-label','Toggle color theme');b.innerHTML=moon+sun+'<span class="dlp-theme-caption">Theme</span>';b.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem(STORE,next)}catch{}set(next)});return b};
function init(){
  // Old theme buttons were often inserted into a navigation bar hidden on mobile.
  // Remove them rather than leaving keyboard-focusable invisible duplicates.
  document.querySelectorAll('.lp-theme-btn').forEach(b=>b.remove());
  let anchor=document.querySelector('.dl-shell-actions');let next=document.querySelector('.dl-shell-avatar');
  if(!anchor){anchor=document.querySelector('.ac-top-actions');next=anchor?.querySelector('.ac-top-user')||null}
  if(!anchor){anchor=document.querySelector('.auth-top-actions');next=null}
  if(!anchor){anchor=document.querySelector('.cert-view-header,.verify-header');next=null}
  if(!anchor){anchor=document.querySelector('.top');next=null}
  if(!anchor){anchor=document.querySelector('.nav-inner');next=anchor?.querySelector('.nav-toggle')||null}
  if(!anchor){anchor=document.querySelector('.ps-header,.ps-top,.studio-head,.page-header,.app .topbar');next=null}
  const b=button();
  if(anchor){b.classList.add('dlp-theme-in-header');anchor.insertBefore(b,next)}
  else{b.classList.add('dlp-theme-floating');document.body.appendChild(b)}
  set(preferred());
  // A few legacy layouts hide/reflow their original header at unusual viewport sizes.
  // Keep exactly one operable theme switch, even when that header disappears.
  function ensureReachable(){
    const el=document.getElementById('dalpThemeToggle');
    if(!el)return;
    const r=el.getBoundingClientRect();
    const hasBox=r.width>=30&&r.height>=30;
    const onScreen=r.right<=innerWidth+1&&r.left>=-1&&r.top>=-1&&r.top<innerHeight;
    let ancestor=el.parentElement,visible=hasBox&&onScreen;
    while(visible&&ancestor&&ancestor!==document.body){
      const style=getComputedStyle(ancestor);
      if(style.display==='none'||style.visibility==='hidden'||style.opacity==='0')visible=false;
      ancestor=ancestor.parentElement;
    }
    if(!visible){
      el.classList.remove('dlp-theme-in-header');
      el.classList.add('dlp-theme-floating');
      document.body.appendChild(el);
    }
  }
  requestAnimationFrame(ensureReachable);
  window.addEventListener('resize',()=>requestAnimationFrame(ensureReachable),{passive:true});
  window.addEventListener('pageshow',()=>requestAnimationFrame(ensureReachable));
  window.addEventListener('storage',e=>{if(e.key===STORE)set(preferred())});
  try{const media=matchMedia('(prefers-color-scheme: dark)');media.addEventListener?.('change',()=>{if(!read())set(preferred())})}catch{}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
