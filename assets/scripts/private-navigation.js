/* DataLearning | one compact, role-aware, accessible private workspace shell.
   Uses existing authentication, progress, profile and page controllers unchanged. */
(()=>{'use strict';
 const current=document.body?.dataset.adminConsole;
 if(!current)return;
 const root=document.body,main=document.querySelector('main');if(!main)return;
 const paths={dashboard:'account.html',academy:'index.html',courses:'index.html#zaDiscoverCards',practice:'practice.html',tools:'study-tools.html',tutor:'tutor.html',profile:'profile.html'};
 const icons={
  overview:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  appearance:'<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18c1.7 0 2.6-1.4 2.1-2.6-.4-1.1.3-2.1 1.7-2.1h1.7a4.5 4.5 0 0 0 4.5-4.5"/><circle cx="7.5" cy="11" r=".8"/><circle cx="11" cy="7.5" r=".8"/><circle cx="16" cy="8" r=".8"/>',
  courses:'<path d="M4 19.5V5a2 2 0 0 1 2-2h14v18H6a2 2 0 0 1 0-4h14"/><path d="M8 7h8m-8 4h6"/>',
  learners:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2M17 8h5m-2.5-2.5v5"/>',
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
  {caption:'ACADEMY',items:[['Learning Dashboard','account.html','account'],['Courses','index.html#zaDiscoverCards','catalog'],['Practice Arena','practice.html','practice'],['AI Tutor','tutor.html','tutor']]}
 ];
 const moreNav=[['Study Tools','study-tools.html','study'],['Study plan','learning-coach.html','study-plan'],['Learning Lab','learning-lab.html','lab'],['Capstone Studio','capstone.html','capstone'],['Certificates','account.html#certificates','certificate']];
 const adminNav=[
  {caption:'ADMINISTRATION',items:[['Admin overview','admin.html','overview'],['Learners & Progress','admin.html#admin-learners','learners'],['Courses analysis','admin.html#admin-courses','courses'],['Review desk','reviewer.html','reviews'],['Appearance','admin.html#admin-appearance','appearance']]}
 ];
 const adminMoreNav=[['Connection check','connection-test.html','connection'],['Progress sync','sync-test.html','sync']];
 const adminPages=new Set(['overview','reviews','connection','sync']);
 const adminWorkspace=adminPages.has(current);
 const shell=document.createElement('div');shell.className='ac-shell';
 const aside=document.createElement('aside');aside.className='ac-sidebar';aside.id='acSidebar';aside.setAttribute('aria-label',adminWorkspace?'Administration navigation':'Private learning navigation');
 const branding=document.createElement('a');branding.className='ac-brand';branding.href=adminWorkspace?'admin.html':paths.dashboard;
 branding.innerHTML='<img src="assets/icons/da-logo.svg" alt="" width="42" height="42"><span><strong>DataLearning</strong><small>'+(adminWorkspace?'ADMIN WORKSPACE':'LEARNING WORKSPACE')+'</small></span>';
 const drawerClose=document.createElement('button');drawerClose.className='ac-drawer-close';drawerClose.type='button';drawerClose.setAttribute('aria-label','Close workspace navigation');drawerClose.innerHTML='<span aria-hidden="true">&#215;</span><span class="ac-close-label">Close</span>';const drawerHeader=document.createElement('div');drawerHeader.className='ac-drawer-header';drawerHeader.append(branding,drawerClose);aside.append(drawerHeader);
 const navEl=document.createElement('nav');navEl.className='ac-side-nav';navEl.setAttribute('aria-label','Workspace sections');
 function navLink([label,href,id]){const a=document.createElement('a');a.className='ac-side-link';a.href=href;a.dataset.section=id;a.innerHTML='<span class="ac-side-icon">'+icon(icons[id]?id:'study')+'</span><span class="ac-side-name"></span>';a.querySelector('.ac-side-name').textContent=label;return a;}
 function appendGroup(group,adminOnly=false){const wrap=document.createElement('div');wrap.className='ac-nav-group';if(adminOnly){wrap.dataset.adminOnly='';wrap.hidden=true;}const heading=document.createElement('p');heading.className='ac-side-label';heading.textContent=group.caption;wrap.append(heading);group.items.forEach(item=>wrap.append(navLink(item)));navEl.append(wrap);}
 if(!adminWorkspace)learnerNav.forEach(group=>appendGroup(group));
 const extras=document.createElement('details');extras.className='ac-more-details';
 const moreSummary=document.createElement('summary');moreSummary.textContent='More learning tools';
 const extraLinks=document.createElement('div');extraLinks.className='ac-more-links';
 if(!adminWorkspace){moreNav.forEach(item=>extraLinks.append(navLink(item)));extras.append(moreSummary,extraLinks);navEl.append(extras);}
 adminNav.forEach(group=>appendGroup(group,true));
 if(adminWorkspace){const publicLink=navLink(['Browse public site','index.html','portal']);publicLink.classList.add('ac-academy-link','ac-admin-public-link');navEl.append(publicLink);}
 const adminTools=document.createElement('details');adminTools.className='ac-more-details ac-admin-more-details';adminTools.dataset.adminOnly='';adminTools.hidden=true;
 const adminSummary=document.createElement('summary');adminSummary.textContent='Reports & admin tools';
 const adminLinks=document.createElement('div');adminLinks.className='ac-more-links';
 adminMoreNav.forEach(item=>adminLinks.append(navLink(item)));adminTools.append(adminSummary,adminLinks);navEl.append(adminTools);
 
 aside.append(navEl);
 const bottom=document.createElement('div');bottom.className='ac-side-bottom';
 bottom.innerHTML=''; // Profile remains in the top bar; account identity lives above Sign out.
 const identityCard=document.createElement('section');identityCard.className='ac-side-identity';identityCard.setAttribute('aria-label','Signed-in account');
 const accountBadge=document.createElement('span');accountBadge.className='ac-identity-role';accountBadge.textContent='Checking account…';
 const accountEmail=document.createElement('span');accountEmail.className='ac-identity-email';accountEmail.textContent='Secure DataLearning account';
 identityCard.append(accountBadge,accountEmail);bottom.append(identityCard);
 const logout=document.createElement('button');logout.className='ac-logout';logout.type='button';logout.innerHTML='<span aria-hidden="true">↪</span> Sign out';
 logout.addEventListener('click',async()=>{logout.disabled=true;logout.textContent='Signing out…';try{await window.DALP_SERVER_SESSION?.clear();await window.ZAH_DB?.client?.auth.signOut()}finally{location.replace('/')}});
 bottom.append(logout);aside.append(bottom);
 // The learner dashboard is the navigation hub itself. Avoid a second sidebar navigator.
 // Keep account access and sign-out in the compact dashboard header.
 const compactDashboard=current==='account'||current==='profile';

 const backdrop=document.createElement('div');backdrop.className='ac-nav-overlay';backdrop.setAttribute('aria-hidden','true');
 const frame=document.createElement('div');frame.className='ac-main-frame';
 const header=document.createElement('header');header.className='ac-topbar';
 const mobileToggle=document.createElement('button');mobileToggle.type='button';mobileToggle.className='ac-mobile-menu';mobileToggle.setAttribute('aria-label','Open navigation');mobileToggle.setAttribute('aria-controls','acSidebar');mobileToggle.setAttribute('aria-expanded','false');mobileToggle.innerHTML='<span aria-hidden="true">☰</span>';
 const titles={overview:'Academy overview',progress:'Learners & Progress',reviews:'Assessment desk',account:'My dashboard',profile:'My profile',certificate:'My certificate',connection:'Connection test',sync:'Progress sync'};
 const trail=document.createElement('div');trail.className='ac-breadcrumb';trail.innerHTML='<span class="ac-breadcrumb-prefix">Workspace</span><span class="ac-crumb-divider" aria-hidden="true">/</span><strong>'+(titles[current]||'Learning Dashboard')+'</strong>';
 const right=document.createElement('div');right.className='ac-top-actions';
 right.innerHTML='<span class="ac-secure"><span class="ac-secure-dot" aria-hidden="true"></span> '+(adminWorkspace?'Admin workspace':'Learner space')+'</span>'; if(compactDashboard)right.replaceChildren(); // Keep the learner dashboard header minimal.
 if(compactDashboard){
  const home=document.createElement('a');home.href='index.html#zaDiscoverCards';home.className='ac-dashboard-quicklink';home.textContent='Courses';
  const menu=document.createElement('details');menu.className='ac-account-menu';
  const trigger=document.createElement('summary');trigger.className='ac-account-trigger';trigger.innerHTML='<span class="ac-account-avatar" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M5.5 20c.4-3.7 2.7-5.5 6.5-5.5s6.1 1.8 6.5 5.5"/></svg></span><span class="ac-account-copy"><span class="ac-account-overline">MY WORKSPACE</span><span class="ac-account-display">My account</span></span><span class="ac-account-chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>';trigger.setAttribute('aria-label','Account menu');
  const panel=document.createElement('div');panel.className='ac-account-panel';
  const heading=document.createElement('div');heading.className='ac-account-panel-heading';heading.innerHTML='<span class="ac-account-panel-eyebrow">YOUR WORKSPACE</span><strong>Account & learning</strong><small>Manage your profile and learning journey</small>';
  const profile=document.createElement('a');profile.href='profile.html';profile.textContent='My Profile';profile.dataset.menuIcon='profile';if(current==='profile')profile.setAttribute('aria-current','page');
  const progress=document.createElement('a');progress.href='account.html#course-progress-heading';progress.textContent='Learning Progress';progress.dataset.menuIcon='progress';
  logout.className='ac-account-signout';logout.textContent='Sign Out';logout.dataset.menuIcon='logout';
  panel.append(heading,profile,progress,logout);menu.append(trigger,panel);
  right.append(home,menu);
  const updateName=()=>{const user=window.DALP_AUTH_USER;const label=user?.user_metadata?.full_name||user?.user_metadata?.name||user?.email?.split('@')[0]||'My account';menu.querySelector('.ac-account-display').textContent=String(label).slice(0,32);heading.querySelector('strong').textContent=String(label).slice(0,48);};
  updateName();window.addEventListener('dalp:auth-change',updateName);document.addEventListener('dalp:auth-change',updateName);
  document.addEventListener('click',e=>{if(!menu.contains(e.target))menu.open=false;});
  menu.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.open=false;trigger.focus();}});
  // Position the account popover within the *visible* viewport, including narrow phones.
  const positionAccountPanel=()=>{
   if(!menu.open)return;
   const rect=trigger.getBoundingClientRect();
   const viewport=window.visualViewport;
   const viewLeft=viewport?.offsetLeft||0,viewTop=viewport?.offsetTop||0;
   const viewWidth=viewport?.width||window.innerWidth,viewHeight=viewport?.height||window.innerHeight;
   const margin=12,gap=8;
   const width=Math.max(0,Math.min(320,viewWidth-margin*2));
   const left=Math.max(viewLeft+margin,Math.min(rect.right-width,viewLeft+viewWidth-width-margin));
   const below=Math.max(0,viewTop+viewHeight-rect.bottom-gap-margin);
   const above=Math.max(0,rect.top-viewTop-gap-margin);
   const placeAbove=below<220&&above>below;
   const available=Math.max(0,placeAbove?above:below);
   panel.style.setProperty('--dl-menu-width',width+'px');
   panel.style.setProperty('--dl-menu-left',left+'px');
   panel.style.setProperty('--dl-menu-height',available+'px');
   panel.style.setProperty('--dl-menu-top',(placeAbove?Math.max(viewTop+margin,rect.top-gap-Math.min(panel.scrollHeight,available)):rect.bottom+gap)+'px');
  };
  document.addEventListener('pointerdown',event=>{if(menu.open&&!menu.contains(event.target))menu.open=false});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.open){menu.open=false;trigger.focus({preventScroll:true})}});
  menu.addEventListener('toggle',positionAccountPanel);
  window.addEventListener('resize',positionAccountPanel,{passive:true});
  window.addEventListener('scroll',positionAccountPanel,{passive:true,capture:true});
  window.visualViewport?.addEventListener('resize',positionAccountPanel,{passive:true});
  window.visualViewport?.addEventListener('scroll',positionAccountPanel,{passive:true});

  mobileToggle.remove();aside.remove();backdrop.remove();root.classList.add('ac-dashboard-no-sidebar');
 }

 header.append(...(compactDashboard?[]:[mobileToggle]),...(compactDashboard?[]:[trail]),right);
 const area=document.createElement('div');area.className='ac-page-area';
 main.parentNode.insertBefore(shell,main);if(compactDashboard)shell.append(frame);else shell.append(aside,backdrop,frame);frame.append(header,area);area.append(main);
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
 function adminViewForHash(hash){return hash==='#admin-courses'?'courses':hash==='#admin-learners'?'learners':hash==='#admin-appearance'?'appearance':'overview';}
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
  const active=current==='overview'?(h==='#admin-courses'?'courses':h==='#admin-learners'?'learners':h==='#admin-appearance'?'appearance':'overview'):current==='account'&&h==='#certificates'?'certificate':current;
  if(current==='overview')trail.querySelector('strong').textContent=({learners:'Learners & Progress',courses:'Courses analysis',appearance:'Appearance',overview:'Admin overview'})[active];
  navEl.querySelectorAll('.ac-side-link').forEach(a=>{const match=a.dataset.section===active;a.classList.toggle('ac-selected',match);if(match)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  if(extras.querySelector('.ac-selected'))extras.open=true;
  if(adminTools.querySelector('.ac-selected'))adminTools.open=true;

 }
 // The browser would normally scroll to an anchor buried below other sections;
 // navigate in-place instead and start each new view at its own top.
 function switchAdminView(){updateActive();if(current==='overview')requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'instant'}));}
 navEl.addEventListener('click',event=>{
  const anchor=event.target.closest('a[href]');if(current!=='overview'||!anchor)return;
  const target=new URL(anchor.href,location.href);
  if(target.pathname!==location.pathname||!['','#admin-courses','#admin-learners','#admin-appearance'].includes(target.hash))return;
  event.preventDefault();
  if(location.hash!==target.hash)history.pushState(null,'',target.hash||target.pathname+target.search);
  switchAdminView();
 });
 window.addEventListener('hashchange',switchAdminView);
 window.addEventListener('popstate',switchAdminView);
 if(['connection','sync'].includes(current))adminTools.open=true;
 updateActive();
 function roleUpdate(){const account=window.DALP_AUTH_USER;const menuName=document.querySelector('.ac-account-display');if(menuName){menuName.textContent=String(account?.user_metadata?.full_name||account?.user_metadata?.name||account?.email?.split('@')[0]||'My account').slice(0,32)}const admin=window.DALP_ROLE==='admin';navEl.querySelectorAll('[data-admin-only]').forEach(group=>group.hidden=!admin);if(adminPages.has(current)&&!admin)root.classList.remove('ac-menu-open');const secureLabel=right.querySelector('.ac-secure');if(secureLabel)secureLabel.lastChild.textContent=adminWorkspace?' Admin workspace':(admin?' Admin access':' Learner space');accountBadge.textContent=admin?'Administrator account':window.DALP_ROLE==='learner'?'Learner account':'Checking account…';accountBadge.classList.toggle('is-admin',admin);accountEmail.textContent=account?.email||'Email unavailable';accountEmail.title=account?.email||'';branding.href=adminWorkspace?'admin.html':'account.html';branding.querySelector('small').textContent=adminWorkspace?'ADMIN WORKSPACE':'LEARNING WORKSPACE';updateActive();}
 window.addEventListener('dalp:auth-ready',roleUpdate);roleUpdate();
 function identity(){ /* Top Profile control owns account name and photo. */ }
 window.addEventListener('dalp:auth-ready',identity);identity();
})();
