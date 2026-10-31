/* Consistent, role-aware learning workspace navigation. No external services required. */
(()=>{'use strict';
if(document.body.hasAttribute('data-admin-console')||document.body.classList.contains('auth-page')||/^(verify|connection-test|sync-test)\.html$/.test(location.pathname.split('/').pop()))return;
const onCourse=location.pathname.includes('/courses/'),root=onCourse?'../':'';
const page=location.pathname.split('/').pop()||'index.html';
const links=[['Dashboard','index.html','index'],['Courses','index.html#courses','course'],['Practice Arena','practice.html','practice'],['AI Tutor','tutor.html','tutor'],['Lab','learning-lab.html','learning-lab'],['Library','reference.html','reference'],['Progress','account.html','account']];
const extra=[['Practice Arena','practice.html'],['Practice Studio','studio.html'],['Learning Lab','learning-lab.html'],['Prompt library','prompt-library.html'],['Capstone studio','capstone.html'],['Study notes & references','reference.html'],['Introduction course','courses/introduction.html'],['Excel course','courses/excel.html'],['SQL course','courses/sql.html'],['Power BI course','courses/powerbi.html'],['Python course','courses/python.html'],['AI Integration course','courses/ai.html']];
const active=onCourse?'course':page==='index.html'?'index':page==='admin.html'?'admin':page.replace('.html','');
const iconSearch='<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg>';
const bar=document.createElement('header');bar.className='dl-shell';bar.setAttribute('aria-label','Global learning workspace');
bar.innerHTML='<div class="dl-shell-inner"><a class="dl-shell-brand" href="'+root+'index.html"><img src="'+root+'assets/da-logo.svg" width="39" height="39" alt=""><span><b>Data Analysis</b><small>Learning Path</small></span></a><nav id="dlPrimaryNav" class="dl-shell-nav" aria-label="Primary navigation"></nav><div class="dl-shell-actions"><button id="dlSearchBtn" class="dl-shell-search" type="button" aria-label="Search and jump to a course or tool">'+iconSearch+'<span>Quick find</span><kbd>Ctrl K</kbd></button><a class="dl-shell-avatar" href="'+root+'account.html" title="My profile" aria-label="My account">ME</a><button class="dl-shell-menu" id="dlMenuBtn" aria-expanded="false" aria-controls="dlPrimaryNav" aria-label="Open navigation" type="button">☰</button></div></div>';
const overlay=document.createElement('div');overlay.className='dl-shell-overlay';overlay.hidden=true;
const command=document.createElement('div');command.className='dl-command';command.hidden=true;command.setAttribute('role','dialog');command.setAttribute('aria-modal','true');command.setAttribute('aria-label','Quick find');command.innerHTML='<div class="dl-command-card"><div class="dl-command-top">'+iconSearch+'<input type="search" id="dlQuickInput" placeholder="Search courses, lessons and tools" aria-label="Search destinations"><button type="button" class="dl-command-close" id="dlQuickClose" aria-label="Close quick find">ESC</button></div><div class="dl-command-items" id="dlQuickItems"></div><div class="dl-command-foot">Choose a result to open it. Tip: use Ctrl+K (or ⌘K) anywhere.</div></div>';
document.body.prepend(bar,overlay,command);document.body.classList.add('dl-workspace');
const nav=bar.querySelector('#dlPrimaryNav');const navParent=nav.parentNode;const navNext=nav.nextSibling;const menu=bar.querySelector('#dlMenuBtn');const input=command.querySelector('#dlQuickInput');const results=command.querySelector('#dlQuickItems');let restoreFocus=null;
function renderNav(){
 nav.replaceChildren();
 const head=document.createElement('div');head.className='dl-drawer-head';head.innerHTML='<span><strong>Explore learning</strong><small>Choose where to go</small></span><button class="dl-drawer-close" type="button" aria-label="Close navigation">✕</button>';
 head.querySelector('button').addEventListener('click',closeMenu);nav.append(head);
 const section=text=>{const p=document.createElement('p');p.className='dl-nav-section';p.textContent=text;nav.append(p)};
 const link=(label,url,id,extra=false)=>{const a=document.createElement('a');a.href=root+url;a.textContent=label;if(extra)a.classList.add('dl-nav-extra');if(id===active)a.setAttribute('aria-current','page');nav.append(a)};
 section('Main navigation');for(const [label,url,id] of links)link(label,url,id);
 section('Courses');for(const [label,url] of [['Introduction','courses/introduction.html'],['Excel','courses/excel.html'],['SQL','courses/sql.html'],['Power BI','courses/powerbi.html'],['Python','courses/python.html'],['AI Integration','courses/ai.html']])link(label,url,null,true);
 section('More tools');for(const [label,url] of [['Practice Studio','studio.html'],['Prompt library','prompt-library.html'],['Capstone studio','capstone.html']])link(label,url,null,true);
 if(window.DALP_ROLE==='admin'){section('Administrator');link('Admin dashboard','admin.html',null,true);link('Progress reports','progress.html',null,true);link('Assessment desk','reviewer.html',null,true)}
} 
let drawerPreviousFocus=null;
function closeMenu(){const wasOpen=nav.classList.contains('is-open');nav.classList.remove('is-open');if(nav.parentNode!==navParent)navParent.insertBefore(nav,navNext);document.body.classList.remove('dl-drawer-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');overlay.hidden=true;if(wasOpen&&drawerPreviousFocus?.isConnected)drawerPreviousFocus.focus({preventScroll:true});drawerPreviousFocus=null}
function toggleMenu(){const shouldOpen=!nav.classList.contains('is-open');if(!shouldOpen){closeMenu();return}drawerPreviousFocus=document.activeElement;if(innerWidth<=950)document.body.appendChild(nav);nav.classList.add('is-open');document.body.classList.add('dl-drawer-open');menu.setAttribute('aria-expanded','true');menu.setAttribute('aria-label','Close navigation');overlay.hidden=false;nav.querySelector('.dl-drawer-close')?.focus({preventScroll:true})}

function destinationList(){return [...links.map(x=>[x[0],x[1]]),...extra,...(window.DALP_ROLE==='admin'?[['Admin dashboard','admin.html'],['Instructor reviewer desk','reviewer.html'],['Learner analytics','progress.html']]:[])];}
function renderSearch(){const query=input.value.toLowerCase().trim(),found=destinationList().filter(([name])=>!query||name.toLowerCase().includes(query)).slice(0,12);results.replaceChildren();if(!found.length){const p=document.createElement('p');p.textContent='No matching destination. Try Excel, SQL, Tutor, or Practice.';results.append(p)}for(const [name,url] of found){const a=document.createElement('a');a.href=root+url;a.textContent=name;const span=document.createElement('span');span.textContent='Open →';a.append(span);results.append(a)}}
function openSearch(){closeMenu();restoreFocus=document.activeElement;command.hidden=false;input.value='';renderSearch();input.focus()}
function closeSearch(){command.hidden=true;restoreFocus?.focus?.()}
bar.querySelector('#dlSearchBtn').addEventListener('click',openSearch);menu.addEventListener('click',toggleMenu);overlay.addEventListener('click',closeMenu);nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});command.querySelector('#dlQuickClose').addEventListener('click',closeSearch);command.addEventListener('click',e=>{if(e.target===command)closeSearch()});input.addEventListener('input',renderSearch);input.addEventListener('keydown',e=>{if(e.key==='Enter'){const a=results.querySelector('a');if(a)location.href=a.href;}});
document.addEventListener('keydown',e=>{
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();command.hidden?openSearch():closeSearch()}
 else if(e.key==='Escape'){if(!command.hidden)closeSearch();else closeMenu()}
 else if(e.key==='Tab'&&nav.classList.contains('is-open')){
  const items=[...nav.querySelectorAll('a[href],button:not([disabled])')].filter(el=>el.getClientRects().length);if(!items.length)return;
  const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
 }
});
window.addEventListener('resize',()=>{if(innerWidth>950)closeMenu()},{passive:true});
window.addEventListener('dalp:auth-ready',()=>{renderNav();updateIdentity()});
function updateIdentity(){const u=window.DALP_AUTH_USER;const nm=u?.user_metadata?.full_name||u?.email?.split('@')[0]||'Learner';bar.querySelector('.dl-shell-avatar').textContent=nm.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0].toUpperCase()).join('')||'ME';bar.querySelector('.dl-shell-avatar').title=nm+(window.DALP_ROLE==='admin'?' • Administrator':' • Learner');}
if(onCourse&&window.DALP_AUTH_USER?.id){try{localStorage.setItem('dalp-last-course:'+window.DALP_AUTH_USER.id,page.replace('.html',''))}catch(_){}}

// Compact-first navigation. The same destinations remain available in the full More menu.
const tabBar=document.createElement('nav');
tabBar.className='dl-mobile-tabs';
tabBar.setAttribute('aria-label','Mobile learning navigation');
const tabItems=[
 ['Home',root+'index.html','home','<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>'],
 ['Courses',root+'index.html#courses','courses','<path d="M3 5.5c4.4-1.2 6.6-.8 9 1v14c-2.4-1.8-4.6-2.2-9-1zM21 5.5c-4.4-1.2-6.6-.8-9 1v14c2.4-1.8 4.6-2.2 9-1z"/>'],
 ['Practice',root+'practice.html','practice','<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h5M8 16h3"/>'],
 ['Tutor',root+'tutor.html','tutor','<path d="M4 5h16v12H9l-5 4z"/><path d="M8 10h8M8 13h5"/>']
];
const svgPath=d=>'<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>';
const mobileActive=onCourse||page==='index.html'&&location.hash==='#courses'?'courses':page==='index.html'?'home':page==='practice.html'?'practice':page==='tutor.html'?'tutor':'more';
for(const [label,url,key,path] of tabItems){const link=document.createElement('a');link.href=url;link.className='dl-tab'+(mobileActive===key?' is-active':'');if(mobileActive===key)link.setAttribute('aria-current','page');link.innerHTML=svgPath(path)+'<span>'+label+'</span>';tabBar.append(link)}
const more=document.createElement('button');more.type='button';more.className='dl-tab'+(mobileActive==='more'?' is-active':'');more.setAttribute('aria-label','More learning destinations');more.setAttribute('aria-controls','dlPrimaryNav');more.setAttribute('aria-expanded','false');more.innerHTML=svgPath('<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>')+'<span>More</span>';tabBar.append(more);
more.addEventListener('click',()=>{toggleMenu();more.setAttribute('aria-expanded',menu.getAttribute('aria-expanded'))});
// Move potentially destructive course actions behind a deliberate compact-screen option.
if(onCourse){
 const courseActions=document.querySelector('.course-top-actions');
 if(courseActions && !courseActions.querySelector('.dl-course-actions-toggle')){
  const actionToggle=document.createElement('button');actionToggle.type='button';actionToggle.className='dl-course-actions-toggle';actionToggle.textContent='Options';actionToggle.setAttribute('aria-expanded','false');
  courseActions.prepend(actionToggle);
  actionToggle.addEventListener('click',()=>{const expanded=courseActions.classList.toggle('dl-options-open');actionToggle.setAttribute('aria-expanded',String(expanded));actionToggle.textContent=expanded?'Close options':'Options'});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&courseActions.classList.contains('dl-options-open')){courseActions.classList.remove('dl-options-open');actionToggle.setAttribute('aria-expanded','false');actionToggle.textContent='Options'}});
 }
}

// Keep the two accessible menu triggers in sync across breakpoints.
const mobileObserver=new MutationObserver(()=>more.setAttribute('aria-expanded',menu.getAttribute('aria-expanded')));
mobileObserver.observe(menu,{attributes:true,attributeFilter:['aria-expanded']});
document.body.append(tabBar);

renderNav();updateIdentity();
})();
