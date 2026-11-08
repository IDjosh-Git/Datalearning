/* One role-aware private navigation used by administrator and learner account pages. */
(()=>{'use strict';
 const current=document.body?.dataset.adminConsole;
 if(!current)return;
 const root=document.body;const main=document.querySelector('main');if(!main)return;
 const icons={
  overview:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  learners:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8a4 4 0 0 1 0 8m3 5v-2a4 4 0 0 0-3-3.87"/>',
  courses:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 16v-3m4 3V8m4 8v-5"/>',
  capstones:'<path d="m12 2 2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2Z"/><path d="m19 17 .8 1.7L21.5 19.5l-1.7.8L19 22l-.8-1.7-1.7-.8 1.7-.8L19 17Z"/>',
  progress:'<path d="M3 17.5 9 11l4 3 8-9"/><path d="M16 5h5v5"/><path d="M3 21h18"/>',
  reviews:'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8m-8 4h5m-5 5 2 2 4-4"/>',
  profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  account:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  catalog:'<path d="M4 19.5V5a2 2 0 0 1 2-2h14v18H6a2 2 0 0 1 0-4h14"/><path d="M8 7h8m-8 4h6"/>',
  portal:'<path d="m3 10 9-7 9 7v11H3V10Z"/><path d="M9 21v-7h6v7"/>',
  practice:'<path d="m8 8-4 4 4 4m8-8 4 4-4 4M14 4l-4 16"/>',
  studio:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 9v12M13 13h5m-5 4h3"/>',
  study:'<path d="M4 6h16M4 12h10M4 18h7"/><path d="m16 17 2 2 4-5"/>',
  tutor:'<path d="M12 3 14 9l6 2-6 2-2 6-2-6-6-2 6-2 2-6Z"/><path d="M19 18v4m-2-2h4"/>',
  certificate:'<circle cx="12" cy="8" r="5"/><path d="m8 13-1 8 5-2.5 5 2.5-1-8"/>',
  capstone:'<path d="m12 2 9 5-9 5-9-5 9-5ZM5 11v6c4.5 3 9.5 3 14 0v-6"/>'
 };
 const icon=id=>'<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">'+(icons[id]||icons.overview)+'</svg>';
 const adminNav=[
  {caption:'MANAGE ACADEMY',items:[['Overview','admin.html','overview','▦'],['Learner directory','admin.html#admin-learners','learners','♙'],['Course analytics','admin.html#admin-courses','courses','◫'],['Capstone hub','admin.html#admin-assessments','capstones','✧']]},
  {caption:'REVIEWS & INSIGHTS',items:[['Progress reports','progress.html','progress','↗'],['Assessment desk','reviewer.html','reviews','✓']]}
 ];
 const learnerNav=[
  {caption:'MY LEARNING',items:[
    ['My dashboard','account.html','account'],['Edit my profile','profile.html','profile'],['Learning overview','overview.html','overview'],['My study plan','learning-lab.html#study-plan','study'],['Browse courses','catalog.html','catalog'],
    ['Practice Arena','practice.html','practice'],['Practice Studio','studio.html','studio'],['AI Learning Tutor','tutor.html','tutor']]},
  {caption:'ACHIEVEMENTS',items:[['Capstone Studio','capstone.html','capstone'],['Certificates','account.html#certificates','certificate']]},
  {caption:'PLATFORM',items:[['Discover new skills','index.html','portal']]}
 ];
 const adminPages=new Set(['overview','progress','reviews','connection','sync']);
 const shell=document.createElement('div');shell.className='ac-shell';
 const aside=document.createElement('aside');aside.className='ac-sidebar';aside.id='acSidebar';aside.setAttribute('aria-label','Private learning navigation');
 const branding=document.createElement('a');branding.className='ac-brand';branding.href='account.html';branding.innerHTML='<img src="assets/icons/da-logo.svg" alt="" width="38" height="38"><span><strong>DataLearning</strong><small>MY WORKSPACE</small></span>';
 aside.append(branding);
 const drawerClose=document.createElement('button');drawerClose.className='ac-drawer-close';drawerClose.type='button';drawerClose.setAttribute('aria-label','Close workspace navigation');drawerClose.textContent='✕';aside.append(drawerClose);
 const navEl=document.createElement('nav');navEl.className='ac-side-nav';navEl.setAttribute('aria-label','Private workspace sections');
 function appendGroup(group,adminOnly=false){const wrap=document.createElement('div');wrap.className='ac-nav-group';if(adminOnly){wrap.dataset.adminOnly='';wrap.hidden=true;}const heading=document.createElement('p');heading.className='ac-side-label';heading.textContent=group.caption;wrap.append(heading);group.items.forEach(([label,href,id,ico])=>{const a=document.createElement('a');a.className='ac-side-link';a.href=href;a.dataset.section=id;a.innerHTML='<span class="ac-side-icon" aria-hidden="true">'+icon(id)+'</span><span class="ac-side-name"></span><span class="ac-side-arrow" aria-hidden="true">›</span>';a.querySelector('.ac-side-name').textContent=label;wrap.append(a)});navEl.append(wrap);}
 adminNav.forEach(group=>appendGroup(group,true));learnerNav.forEach(group=>appendGroup(group));
 // Diagnostic utilities are rarely used: keep direct access without cluttering primary navigation.
 const utilities=document.createElement('div');utilities.className='ac-nav-group ac-nav-utilities';utilities.dataset.adminOnly='';utilities.hidden=true;
 utilities.innerHTML='<details class="ac-utilities-details"><summary>Diagnostics</summary><div class="ac-utilities-links"><a class="ac-side-link" data-section="connection" href="connection-test.html"><span class="ac-side-icon" aria-hidden="true">⌁</span><span class="ac-side-name">Connection check</span></a><a class="ac-side-link" data-section="sync" href="sync-test.html"><span class="ac-side-icon" aria-hidden="true">◷</span><span class="ac-side-name">Progress check</span></a></div></details>';
 navEl.append(utilities);aside.append(navEl);
 const bottom=document.createElement('div');bottom.className='ac-side-bottom';bottom.innerHTML='<div class="ac-side-account"><span class="ac-avatar" aria-hidden="true">A</span><span><strong id="acUserName">My account</strong><small id="acUserEmail">Secure access</small></span></div>';aside.append(bottom);
 const logout=document.createElement('button');logout.className='ac-logout';logout.type='button';logout.innerHTML='<span aria-hidden="true">⇥</span> Sign out';logout.addEventListener('click',async()=>{logout.disabled=true;logout.textContent='Signing out…';try{await window.DALP_SERVER_SESSION?.clear();await window.ZAH_DB?.client?.auth.signOut()}finally{location.replace('auth.html')}});bottom.append(logout);
 const backdrop=document.createElement('div');backdrop.className='ac-nav-overlay';backdrop.setAttribute('aria-hidden','true');
 const frame=document.createElement('div');frame.className='ac-main-frame';
 const header=document.createElement('header');header.className='ac-topbar';
 const mobileToggle=document.createElement('button');mobileToggle.type='button';mobileToggle.className='ac-mobile-menu';mobileToggle.setAttribute('aria-label','Open navigation');mobileToggle.setAttribute('aria-controls','acSidebar');mobileToggle.setAttribute('aria-expanded','false');mobileToggle.textContent='☰';
 const trail=document.createElement('div');trail.className='ac-breadcrumb';trail.innerHTML='<span class="ac-topbar-mark" aria-hidden="true">✦</span><span class="ac-breadcrumb-prefix">DataLearning /</span><strong>'+({overview:'Overview',progress:'Progress reports',reviews:'Assessment desk',account:'My Learning',profile:'Edit profile',certificate:'Certificate',connection:'Connection check',sync:'Progress check'}[current]||'My Learning')+'</strong>';
 const right=document.createElement('div');right.className='ac-top-actions';right.innerHTML='<span class="ac-secure"><span class="ac-secure-dot" aria-hidden="true"></span> Private workspace</span><a class="ac-topbar-link" data-learner-shortcut href="catalog.html">Explore courses <span aria-hidden="true">↗</span></a><a class="ac-topbar-link" data-admin-shortcut hidden href="reviewer.html">Assessment desk <span aria-hidden="true">↗</span></a>';
 header.append(mobileToggle,trail,right);
 const area=document.createElement('div');area.className='ac-page-area';
 main.parentNode.insertBefore(shell,main);shell.append(aside,backdrop,frame);frame.append(header,area);area.append(main);
 root.classList.add('ac-ready');
 let drawerPreviousFocus=null;
 function closeMenu(){const wasOpen=root.classList.contains('ac-menu-open');root.classList.remove('ac-menu-open');mobileToggle.setAttribute('aria-expanded','false');mobileToggle.setAttribute('aria-label','Open navigation');aside.inert=!bp.matches;if(wasOpen&&drawerPreviousFocus?.isConnected)drawerPreviousFocus.focus({preventScroll:true});drawerPreviousFocus=null;}
 function openMenu(){drawerPreviousFocus=document.activeElement;aside.inert=false;root.classList.add('ac-menu-open');mobileToggle.setAttribute('aria-expanded','true');mobileToggle.setAttribute('aria-label','Close navigation');drawerClose.focus({preventScroll:true});} 
 mobileToggle.addEventListener('click',()=>root.classList.contains('ac-menu-open')?closeMenu():openMenu());backdrop.addEventListener('click',closeMenu);drawerClose.addEventListener('click',closeMenu);
 navEl.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
 document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&root.classList.contains('ac-menu-open'))closeMenu();
 if(e.key==='Tab'&&root.classList.contains('ac-menu-open')){const items=[...aside.querySelectorAll('a[href],button:not([disabled])')].filter(el=>el.getClientRects().length);if(!items.length)return;const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
});

 // One navigation: sidebar on desktop, accessible drawer on phones/tablets.
 const bp=window.matchMedia('(min-width: 1025px)');aside.inert=!bp.matches;bp.addEventListener?.('change',()=>{if(bp.matches)closeMenu();else if(!root.classList.contains('ac-menu-open'))aside.inert=true});
 function updateActive(){const h=location.hash;const active=current==='overview'?(h==='#admin-learners'?'learners':h==='#admin-courses'?'courses':h==='#admin-assessments'?'capstones':'overview'):current==='account'&&h==='#certificates'?'certificate':current==='certificate'?'certificate':current;navEl.querySelectorAll('.ac-side-link').forEach(a=>{const match=a.dataset.section===active;a.classList.toggle('ac-selected',match);if(match)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});}
 window.addEventListener('hashchange',updateActive);if(['connection','sync'].includes(current))utilities.querySelector('details').open=true;updateActive();
 function roleUpdate(){const admin=window.DALP_ROLE==='admin';navEl.querySelectorAll('[data-admin-only]').forEach(group=>group.hidden=!admin);if(adminPages.has(current)&&!admin){root.classList.remove('ac-menu-open');}right.querySelector('.ac-secure').textContent=admin?'Administrator':'Learner';branding.href=admin?'admin.html':'account.html';branding.querySelector('small').textContent=admin?'ADMIN CONSOLE':'MY WORKSPACE';const learnerShortcut=right.querySelector('[data-learner-shortcut]');if(learnerShortcut)learnerShortcut.hidden=admin;
 const shortcut=right.querySelector('[data-admin-shortcut]');shortcut.hidden=!admin;if(admin){shortcut.href=current==='reviews'?'admin.html':'reviewer.html';shortcut.innerHTML=current==='reviews'?'Academy dashboard <span aria-hidden="true">↗</span>':'Assessment desk <span aria-hidden="true">↗</span>';}updateActive();}window.addEventListener('dalp:auth-ready',roleUpdate);roleUpdate();
 function identity(){const user=window.DALP_AUTH_USER;if(!user)return;const email=user.email||'Secure account',name=user.user_metadata?.full_name||email.split('@')[0]||'Administrator';bottom.querySelector('#acUserName').textContent=name;bottom.querySelector('#acUserEmail').textContent=email;const initial=name.trim().charAt(0).toUpperCase()||'A';bottom.querySelector('.ac-avatar').textContent=initial;}
 window.addEventListener('dalp:auth-ready',identity);identity();

})();
