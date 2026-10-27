/* v16 consolidated appearance controller; unique in-flow control on every page. */
(()=>{'use strict';
const KEY='dalp-theme';
let lastMode=null,writeHandle=0;
const moon='<svg class="theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>';
const sun='<svg class="theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
const saved=()=>{try{return localStorage.getItem(KEY)}catch{return null}};
const preference=()=>{const value=saved();return value==='light'||value==='dark'?value:(matchMedia?.('(prefers-color-scheme: dark)').matches?'dark':'light')};
function apply(mode){if(mode===lastMode)return;lastMode=mode;const dark=mode==='dark';document.documentElement.dataset.theme=dark?'dark':'light';document.documentElement.classList.toggle('dark',dark);document.documentElement.classList.toggle('light',!dark);document.documentElement.style.colorScheme=dark?'dark':'light';document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#0F172A':'#F8FAFC');document.querySelectorAll('.dlp-theme-control').forEach(b=>{b.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');b.title=dark?'Switch to light mode':'Switch to dark mode';b.setAttribute('aria-pressed',String(dark));const label=b.querySelector('.dlp-theme-caption');if(label)label.textContent=dark?'Light mode':'Dark mode'})}
// Paint the correct palette before DOMContentLoaded; never show a floating theme button.
apply(preference());
function init(){
 document.querySelectorAll('.lp-theme-btn,.dlp-theme-control').forEach(n=>n.remove());
 const b=document.createElement('button');b.type='button';b.id='dalpThemeToggle';b.className='dlp-theme-control dlp-theme-in-header';b.innerHTML=moon+sun+'<span class="dlp-theme-caption">Appearance</span>';
 b.addEventListener('click',()=>{
  const mode=document.documentElement.dataset.theme==='dark'?'light':'dark';
  // Switch in this event turn; writing storage in a later task avoids delaying the paint.
  apply(mode);
  if(writeHandle)clearTimeout(writeHandle);
  writeHandle=setTimeout(()=>{writeHandle=0;try{localStorage.setItem(KEY,mode)}catch{}},0);
 });
 let home=document.querySelector('.dl-shell-actions');let before=home?.querySelector('.dl-shell-avatar')||null;
 if(!home){home=document.querySelector('.ac-top-actions');before=home?.querySelector('.ac-top-user')||null}
 if(!home){home=document.querySelector('.auth-top-actions');before=null}
 if(home){home.insertBefore(b,before)}
 else{
  // For independent utility screens use a real layout row, not absolute/fixed positioning.
  const row=document.createElement('div');row.className='dlp-appearance-row';row.setAttribute('aria-label','Application toolbar');
  const brand=document.createElement('a');brand.className='dlp-appearance-brand';brand.href=location.pathname.includes('/courses/')?'../index.html':'index.html';brand.innerHTML='<span class="dlp-appearance-mark" aria-hidden="true">◈</span><span>Data Analysis <strong>Learning Path</strong></span>';
  row.append(brand,b);document.body.prepend(row);b.classList.remove('dlp-theme-in-header');b.classList.add('dlp-theme-in-row');
 }
 lastMode=null;apply(preference());
 window.addEventListener('storage',e=>{if(e.key===KEY)apply(preference())});
 try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(!saved())apply(preference())})}catch{}
}
// Keep the first frame transition-free; user-initiated theme switches still animate.
const markPainted=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.add('dlp-theme-ready')));
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{init();markPainted()},{once:true});else{init();markPainted()};
})();
