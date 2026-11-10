/* DataLearning | one compact, role-aware, accessible private workspace shell.
   Uses existing authentication, progress, profile and page controllers unchanged. */
(()=>{'use strict';
 const current=document.body?.dataset.adminConsole;
 if(!current)return;
 const root=document.body,main=document.querySelector('main');if(!main)return;
 const paths={dashboard:'account.html',academy:'index.html',courses:'catalog.html',practice:'practice.html',tools:'study-tools.html',tutor:'tutor.html',profile:'profile.html'};
 const icons={
  overview:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  learners:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8a4 4 0 0 1 0 8m3 5v-2a4 4 0 0 0-3-3.87"/>',
  courses:'<path d="M4 19.5V5a2 2 0 0 1 2-2h14v18H6a2 2 0 0 1 0-4h14"/><path d="M8 7h8m-8 4h6"/>',
  progress:'<path d="M3 17.5 9 11l4 3 8-9"/><path d="M16 5h5v5M3 21h18"/>',
  reviews:'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8m-8 4h5m-5 5 2 2 4-4"/>',
  profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  account:'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 16v-4m4 4V8m4 8v-6"/>',
  catalog:'<path d="M4 19.5V5a2 2 0 0 1 2-2h14v18H6a2 2 0 0 1 0-4h14"/><path d="M8 7h8m-8 4h6"/>',
  portal:'<path d="m3 10 9-7 9 7v11H3V10Z"/><path d="M9 21v-7h6v7"/>',
  practice:'<path d="m8 8-4 4 4 4m8-8 4 4-4 4M14 4l-4 16"/>',
  studio:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 9v12M13 13h5m-5 4h3"/>',
  study:'<path d="M4 6h16M4 12h10M4 18h7"/><path d="m16 17 2 2 4-5"/>',
  'study-plan':'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18m-14 5h4m-4 3h7"/>',
  lab:'<path d="M9 3h6m-5 0v7l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M8 16h8"/>',
  connection:'<path d="M6 8a6 6 0 0 1 11-2m1 10a6 6 0 0 1-11 2"/><path d="m17 3 1 3 3-1M7 21l-1-3-3 1"/><circle cx="12" cy="12" r="2"/>',
  sync:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.8 9A7 7 0 0 1 18 7l2 5M4 12l2 5a7 7 0 0 0 12-2"/>',
  tutor:'<path d="M12 3 14 9l6 2-6 2-2 6-2-6-6-2 6-2 2-6Z"/><path d="M19 18v4m-2-2h4"/>',
  certificate:'<circle cx="12" cy="8" r="5"/><path d="m8 13-1 8 5-2.5 5 2.5-1-8"/>',
  capstone:'<path d="m12 2 9 5-9 5-9-5 9-5ZM5 11v6c4.5 3 9.5 3 14 0v-6"/>'
 };
 const icon=id=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+(icons[id]||icons.overview)+'</svg>';
 // Four high-frequency Academy destinations; additional tools are collapsed.
 // Academy remains available to every signed-in learner, including administrators.
 // Administration only appears after the server-backed site_admins role is verified.
 const learnerNav=[
  {caption:'ACADEMY',items:[['My dashboard','account.html','account'],['Explore courses','catalog.html','catalog'],['Practice Arena','practice.html','practice'],['AI Tutor','tutor.html','tutor']]}
 ];
 const moreNav=[['Study Tools','study-tools.html','study'],['Study plan','learning-coach.html','study-plan'],['Practice Studio','studio.html','studio'],['Learning Lab','learning-lab.html','lab'],['Capstone Studio','capstone.html','capstone'],['Certificates','account.html#certificates','certificate']];
 const adminNav=[
  {caption:'ADMINISTRATION',items:[['Admin overview','admin.html','overview'],['Student management','admin.html#admin-learners','learners'],['Review desk','reviewer.html','reviews']]}
 ];
 const adminMoreNav=[['Courses analysis','admin.html#admin-courses','courses'],['Progress reports','progress.html','progress'],['Connection check','connection-test.html','connection'],['Progress sync','sync-test.html','sync']];
 const adminPages=new Set(['overview','progress','reviews','connection','sync']);
 const shell=document.createElement('div');shell.className='ac-shell';
 const aside=document.createElement('aside');aside.className='ac-sidebar';aside.id='acSidebar';aside.setAttribute('aria-label','Private learning navigation');
 const branding=document.createElement('a');branding.className='ac-brand';branding.href=paths.dashboard;
 branding.innerHTML='<img src="assets/icons/da-logo.svg" alt="" width="42" height="42"><span><strong>DataLearning</strong><small>LEARNING WORKSPACE</small></span>';
 aside.append(branding);
 const drawerClose=document.createElement('button');drawerClose.className='ac-drawer-close';drawerClose.type='button';drawerClose.setAttribute('aria-label','Close workspace navigation');drawerClose.textContent='×';aside.append(drawerClose);
 const navEl=document.createElement('nav');navEl.className='ac-side-nav';navEl.setAttribute('aria-label','Workspace sections');
 function navLink([label,href,id]){const a=document.createElement('a');a.className='ac-side-link';a.href=href;a.dataset.section=id;a.innerHTML='<span class="ac-side-icon">'+icon(icons[id]?id:'study')+'</span><span class="ac-side-name"></span>';a.querySelector('.ac-side-name').textContent=label;return a;}
 function appendGroup(group,adminOnly=false){const wrap=document.createElement('div');wrap.className='ac-nav-group';if(adminOnly){wrap.dataset.adminOnly='';wrap.hidden=true;}const heading=document.createElement('p');heading.className='ac-side-label';heading.textContent=group.caption;wrap.append(heading);group.items.forEach(item=>wrap.append(navLink(item)));navEl.append(wrap);}
 learnerNav.forEach(group=>appendGroup(group));
 const extras=document.createElement('details');extras.className='ac-more-details';
 const moreSummary=document.createElement('summary');moreSummary.textContent='More learning tools';
 const extraLinks=document.createElement('div');extraLinks.className='ac-more-links';
 moreNav.forEach(item=>extraLinks.append(navLink(item)));extras.append(moreSummary,extraLinks);navEl.append(extras);
 adminNav.forEach(group=>appendGroup(group,true));
 const adminTools=document.createElement('details');adminTools.className='ac-more-details ac-admin-more-details';adminTools.dataset.adminOnly='';adminTools.hidden=true;
 const adminSummary=document.createElement('summary');adminSummary.textContent='Reports & admin tools';
 const adminLinks=document.createElement('div');adminLinks.className='ac-more-links';
 adminMoreNav.forEach(item=>adminLinks.append(navLink(item)));adminTools.append(adminSummary,adminLinks);navEl.append(adminTools);
 const academyLink=navLink(['Back to public academy','index.html','portal']);academyLink.classList.add('ac-academy-link');navEl.append(academyLink);
 aside.append(navEl);
 const bottom=document.createElement('div');bottom.className='ac-side-bottom';
 bottom.innerHTML='<a class="ac-side-account" href="profile.html" title="Edit your learner profile"><span class="ac-avatar" aria-hidden="true">A</span><span class="ac-account-copy"><strong id="acUserName">My account</strong><small id="acUserEmail">Manage profile</small></span><span class="ac-account-chevron" aria-hidden="true">›</span></a>';
 const logout=document.createElement('button');logout.className='ac-logout';logout.type='button';logout.innerHTML='<span aria-hidden="true">↪</span> Sign out';
 logout.addEventListener('click',async()=>{logout.disabled=true;logout.textContent='Signing out…';try{await window.DALP_SERVER_SESSION?.clear();await window.ZAH_DB?.client?.auth.signOut()}finally{location.replace('auth.html')}});
 bottom.append(logout);aside.append(bottom);
 const backdrop=document.createElement('div');backdrop.className='ac-nav-overlay';backdrop.setAttribute('aria-hidden','true');
 const frame=document.createElement('div');frame.className='ac-main-frame';
 const header=document.createElement('header');header.className='ac-topbar';
 const mobileToggle=document.createElement('button');mobileToggle.type='button';mobileToggle.className='ac-mobile-menu';mobileToggle.setAttribute('aria-label','Open navigation');mobileToggle.setAttribute('aria-controls','acSidebar');mobileToggle.setAttribute('aria-expanded','false');mobileToggle.innerHTML='<span aria-hidden="true">☰</span>';
 const titles={overview:'Academy overview',progress:'Progress reports',reviews:'Assessment desk',account:'My dashboard',profile:'My profile',certificate:'My certificate',connection:'Connection test',sync:'Progress sync'};
 const trail=document.createElement('div');trail.className='ac-breadcrumb';trail.innerHTML='<span class="ac-breadcrumb-prefix">Workspace</span><span class="ac-crumb-divider" aria-hidden="true">/</span><strong>'+(titles[current]||'My learning')+'</strong>';
 const right=document.createElement('div');right.className='ac-top-actions';
 right.innerHTML='<span class="ac-secure"><span class="ac-secure-dot" aria-hidden="true"></span> Learner space</span><a class="ac-topbar-link" data-learner-shortcut href="catalog.html">Browse courses <span aria-hidden="true">↗</span></a><a class="ac-topbar-link" data-admin-shortcut href="reviewer.html" hidden>Review desk <span aria-hidden="true">↗</span></a>';
 header.append(mobileToggle,trail,right);
 const area=document.createElement('div');area.className='ac-page-area';
 main.parentNode.insertBefore(shell,main);shell.append(aside,backdrop,frame);frame.append(header,area);area.append(main);
 root.classList.add('ac-ready');
 const bp=window.matchMedia('(min-width: 1025px)');let drawerPreviousFocus=null;
 function closeMenu(){const wasOpen=root.classList.contains('ac-menu-open');root.classList.remove('ac-menu-open');mobileToggle.setAttribute('aria-expanded','false');mobileToggle.setAttribute('aria-label','Open navigation');aside.inert=!bp.matches;if(wasOpen&&drawerPreviousFocus?.isConnected)drawerPreviousFocus.focus({preventScroll:true});drawerPreviousFocus=null;}
 function openMenu(){drawerPreviousFocus=document.activeElement;aside.inert=false;root.classList.add('ac-menu-open');mobileToggle.setAttribute('aria-expanded','true');mobileToggle.setAttribute('aria-label','Close navigation');drawerClose.focus({preventScroll:true});}
 mobileToggle.addEventListener('click',()=>root.classList.contains('ac-menu-open')?closeMenu():openMenu());backdrop.addEventListener('click',closeMenu);drawerClose.addEventListener('click',closeMenu);
 navEl.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&root.classList.contains('ac-menu-open'))closeMenu();if(e.key==='Tab'&&root.classList.contains('ac-menu-open')){const items=[...aside.querySelectorAll('a[href],button:not([disabled]),summary')].filter(el=>el.getClientRects().length);if(!items.length)return;const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
 aside.inert=!bp.matches;bp.addEventListener?.('change',()=>{if(bp.matches)closeMenu();else if(!root.classList.contains('ac-menu-open'))aside.inert=true});
 // Admin overview, course analysis and learner management are exclusive views,
 // not three consecutive anchor sections. No content is recreated and no data is lost.
 function adminViewForHash(hash){return hash==='#admin-courses'?'courses':hash==='#admin-learners'?'learners':'overview';}
 let lastAdminView=null;
 function showAdminView(){
  if(current!=='overview')return;
  const next=adminViewForHash(location.hash);
  const changed=lastAdminView!==next;
  root.dataset.adminView=next;
  main.querySelectorAll('[data-admin-panel]').forEach(panel=>{
   const active=panel.dataset.adminPanel===next;
   panel.toggleAttribute('data-active',active);
   panel.setAttribute('aria-hidden',String(!active));
   if('inert' in panel)panel.inert=!active;
  });
  if(changed){
   // A learner record is a true modal only in the directory, never a persistent overlay.
   const dialog=document.getElementById('adminLearnerDetail');
   const shade=document.getElementById('adminDetailBackdrop');
   if(dialog)dialog.hidden=true;
   if(shade)shade.hidden=true;
   root.classList.remove('ac-detail-open');
  }
  lastAdminView=next;
 }
 function updateActive(){
  showAdminView();
  const h=location.hash;
  const active=current==='overview'?(h==='#admin-learners'?'learners':h==='#admin-courses'?'courses':'overview'):current==='account'&&h==='#certificates'?'certificate':current;
  if(current==='overview')trail.querySelector('strong').textContent=({learners:'Student management',courses:'Courses analysis',overview:'Admin overview'})[active];
  navEl.querySelectorAll('.ac-side-link').forEach(a=>{const match=a.dataset.section===active;a.classList.toggle('ac-selected',match);if(match)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  if(extras.querySelector('.ac-selected'))extras.open=true;
  if(adminTools.querySelector('.ac-selected'))adminTools.open=true;
  bottom.querySelector('.ac-side-account')?.classList.toggle('ac-selected',current==='profile');
 }
 // The browser would normally scroll to an anchor buried below other sections;
 // navigate in-place instead and start each new view at its own top.
 function switchAdminView(){updateActive();if(current==='overview')requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'instant'}));}
 navEl.addEventListener('click',event=>{
  const anchor=event.target.closest('a[href]');if(current!=='overview'||!anchor)return;
  const target=new URL(anchor.href,location.href);
  if(target.pathname!==location.pathname||!['','#admin-courses','#admin-learners'].includes(target.hash))return;
  event.preventDefault();
  if(location.hash!==target.hash)history.pushState(null,'',target.hash||target.pathname+target.search);
  switchAdminView();
 });
 window.addEventListener('hashchange',switchAdminView);
 window.addEventListener('popstate',switchAdminView);
 if(['connection','sync','progress'].includes(current))adminTools.open=true;
 updateActive();
 function roleUpdate(){const admin=window.DALP_ROLE==='admin';navEl.querySelectorAll('[data-admin-only]').forEach(group=>group.hidden=!admin);if(adminPages.has(current)&&!admin)root.classList.remove('ac-menu-open');right.querySelector('.ac-secure').lastChild.textContent=admin?' Admin access':' Learner space';branding.href=admin?'admin.html':'account.html';branding.querySelector('small').textContent=admin?'ADMIN WORKSPACE':'LEARNING WORKSPACE';const learnerShortcut=right.querySelector('[data-learner-shortcut]');if(learnerShortcut)learnerShortcut.hidden=admin;const shortcut=right.querySelector('[data-admin-shortcut]');shortcut.hidden=!admin;if(admin){shortcut.href=current==='reviews'?'admin.html':'reviewer.html';shortcut.innerHTML=current==='reviews'?'Academy overview <span aria-hidden="true">↗</span>':'Review desk <span aria-hidden="true">↗</span>';}updateActive();}
 window.addEventListener('dalp:auth-ready',roleUpdate);roleUpdate();
 function identity(){const user=window.DALP_AUTH_USER;if(!user)return;const email=user.email||'Secure account',name=user.user_metadata?.full_name||email.split('@')[0]||'Learner';bottom.querySelector('#acUserName').textContent=name;bottom.querySelector('#acUserEmail').textContent=email;const initial=name.trim().charAt(0).toUpperCase()||'A';bottom.querySelector('.ac-avatar').textContent=initial;}
 window.addEventListener('dalp:auth-ready',identity);identity();
})();
