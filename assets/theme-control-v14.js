/* Accessible three-way appearance control, retaining the project's existing storage key. */
(()=>{'use strict';
 const KEY='dalp-theme';
 const media=window.matchMedia?.('(prefers-color-scheme: dark)');
 const read=()=>{try{const x=localStorage.getItem(KEY);return ['light','dark','system'].includes(x)?x:'system';}catch{return 'system';}};
 function setTheme(preference,persist=false){
  const pref=['light','dark','system'].includes(preference)?preference:'system';
  const dark=pref==='dark'||(pref==='system'&&!!media?.matches);
  const root=document.documentElement;
  root.dataset.theme=dark?'dark':'light';root.dataset.themePreference=pref;
  root.classList.toggle('dark',dark);root.classList.toggle('light',!dark);
  root.style.colorScheme=dark?'dark':'light';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#09090b':'#f8fafc');
  document.querySelectorAll('.dlp-theme-select').forEach(select=>{if(select.value!==pref)select.value=pref;});
  if(persist){try{localStorage.setItem(KEY,pref);}catch{}}
 }
 // Reapply after legacy theme scripts have loaded; the prepaint script already handles the first frame.
 setTheme(read());
 function init(){
  document.querySelectorAll('.lp-theme-btn,.dlp-theme-control,.dlp-theme-wrap,.dlp-appearance-row').forEach(el=>el.remove());
  const group=document.createElement('div');group.className='dlp-theme-wrap';group.setAttribute('role','group');group.setAttribute('aria-label','Appearance');
  const label=document.createElement('label');label.htmlFor='dalpThemeSelect';label.className='dlp-theme-label';label.textContent='Theme';
  const select=document.createElement('select');select.id='dalpThemeSelect';select.className='dlp-theme-select';select.name='dalp-theme-choice';select.title='Choose light, dark or system appearance';
  [['system','System'],['light','Light'],['dark','Dark']].forEach(([value,text])=>select.add(new Option(text,value)));
  select.addEventListener('change',()=>setTheme(select.value,true));
  group.append(label,select);
  let host=document.querySelector('.dl-shell-actions')||document.querySelector('.ac-top-actions')||document.querySelector('.auth-top-actions');
  const before=host?.querySelector('.dl-shell-avatar,.ac-top-user')||null;
  if(host)host.insertBefore(group,before);
  else{
   host=document.createElement('div');host.className='dlp-appearance-row';host.setAttribute('aria-label','Appearance toolbar');
   const brand=document.createElement('a');brand.className='dlp-appearance-brand';brand.href=location.pathname.includes('/courses/')?'../index.html':'index.html';brand.textContent='Data Analysis Learning Path';
   host.append(brand,group);
   const nav=document.querySelector('.nav-shell .nav-inner,.course-top,.top,.ps-heading,.auth-topbar');
   if(nav)nav.append(group); // Avoid fixed-position controls that obscure content.
   else document.body.prepend(host);
  }
  setTheme(read());
  window.addEventListener('storage',e=>{if(e.key===KEY)setTheme(read());});
  media?.addEventListener?.('change',()=>{if(read()==='system')setTheme('system');});
  requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.add('dlp-theme-ready')));
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
