/* One role-aware private navigation used by administrator and learner account pages. */
(()=>{'use strict';
 const current=document.body?.dataset.adminConsole;
 if(!current)return;
 const root=document.body;const main=document.querySelector('main');if(!main)return;
 const adminNav=[
  {caption:'ACADEMY MANAGEMENT',items:[['Overview','admin.html','overview','▦'],['Learners','admin.html#admin-learners','learners','♙'],['Course performance','admin.html#admin-courses','courses','◫']]},
  {caption:'REPORTS & ASSESSMENTS',items:[['Progress reports','progress.html','progress','↗'],['Review desk','reviewer.html','reviews','✓']]}
 ];
 const learnerNav=[{caption:'LEARNING',items:[['My Learning','account.html','account','◫'],['Browse courses','catalog.html','catalog','▤'],['Public dashboard','index.html','portal','⌂']]}];
 const adminPages=new Set(['overview','progress','reviews','connection','sync']);
 const shell=document.createElement('div');shell.className='ac-shell';
 const aside=document.createElement('aside');aside.className='ac-sidebar';aside.id='acSidebar';aside.setAttribute('aria-label','Private learning navigation');
 const branding=document.createElement('a');branding.className='ac-brand';branding.href='account.html';branding.innerHTML='<img src="assets/icons/da-logo.svg" alt="" width="38" height="38"><span><strong>Data Analysis Learning Path</strong><small>MY WORKSPACE</small></span>';
 aside.append(branding);
 const drawerClose=document.createElement('button');drawerClose.className='ac-drawer-close';drawerClose.type='button';drawerClose.setAttribute('aria-label','Close workspace navigation');drawerClose.textContent='✕';aside.append(drawerClose);
 const navEl=document.createElement('nav');navEl.className='ac-side-nav';navEl.setAttribute('aria-label','Private workspace sections');
 function appendGroup(group,adminOnly=false){const wrap=document.createElement('div');wrap.className='ac-nav-group';if(adminOnly){wrap.dataset.adminOnly='';wrap.hidden=true;}const heading=document.createElement('p');heading.className='ac-side-label';heading.textContent=group.caption;wrap.append(heading);group.items.forEach(([label,href,id,ico])=>{const a=document.createElement('a');a.className='ac-side-link';a.href=href;a.dataset.section=id;a.innerHTML='<span class="ac-side-icon" aria-hidden="true">'+ico+'</span><span class="ac-side-name"></span><span class="ac-side-arrow" aria-hidden="true">›</span>';a.querySelector('.ac-side-name').textContent=label;wrap.append(a)});navEl.append(wrap);}
 adminNav.forEach(group=>appendGroup(group,true));learnerNav.forEach(group=>appendGroup(group));
 // Diagnostic utilities are rarely used: keep direct access without cluttering primary navigation.
 const utilities=document.createElement('div');utilities.className='ac-nav-group ac-nav-utilities';utilities.dataset.adminOnly='';utilities.hidden=true;
 utilities.innerHTML='<details class="ac-utilities-details"><summary>Diagnostics</summary><div class="ac-utilities-links"><a class="ac-side-link" data-section="connection" href="connection-test.html"><span class="ac-side-icon" aria-hidden="true">⌁</span><span class="ac-side-name">Connection check</span></a><a class="ac-side-link" data-section="sync" href="sync-test.html"><span class="ac-side-icon" aria-hidden="true">◷</span><span class="ac-side-name">Progress check</span></a></div></details>';
 navEl.append(utilities);aside.append(navEl);
 const bottom=document.createElement('div');bottom.className='ac-side-bottom';bottom.innerHTML='<div class="ac-side-account"><span class="ac-avatar" aria-hidden="true">A</span><span><strong id="acUserName">My account</strong><small id="acUserEmail">Secure access</small></span></div>';aside.append(bottom);
 const logout=document.createElement('button');logout.className='ac-logout';logout.type='button';logout.textContent='⇥  Sign out';logout.addEventListener('click',async()=>{logout.disabled=true;logout.textContent='Signing out…';try{await window.DALP_SERVER_SESSION?.clear();await window.ZAH_DB?.client?.auth.signOut()}finally{location.replace('auth.html')}});bottom.append(logout);
 const backdrop=document.createElement('div');backdrop.className='ac-nav-overlay';backdrop.setAttribute('aria-hidden','true');
 const frame=document.createElement('div');frame.className='ac-main-frame';
 const header=document.createElement('header');header.className='ac-topbar';
 const mobileToggle=document.createElement('button');mobileToggle.type='button';mobileToggle.className='ac-mobile-menu';mobileToggle.setAttribute('aria-label','Open navigation');mobileToggle.setAttribute('aria-controls','acSidebar');mobileToggle.setAttribute('aria-expanded','false');mobileToggle.textContent='☰';
 const trail=document.createElement('div');trail.className='ac-breadcrumb';trail.innerHTML='<strong>'+({overview:'Overview',progress:'Progress reports',reviews:'Assessment desk',account:'My Learning',certificate:'Certificate',connection:'Connection check',sync:'Progress check'}[current]||'My Learning')+'</strong>';
 const right=document.createElement('div');right.className='ac-top-actions';right.innerHTML='<span class="ac-secure">Private workspace</span>';
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
 function updateActive(){const h=location.hash;const active=current==='overview'?(h==='#admin-learners'?'learners':h==='#admin-courses'?'courses':'overview'):current==='account'&&h==='#certificates'?'certificates':current==='certificate'?'account':current;navEl.querySelectorAll('.ac-side-link').forEach(a=>{const match=a.dataset.section===active;a.classList.toggle('ac-selected',match);if(match)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});}
 window.addEventListener('hashchange',updateActive);if(['connection','sync'].includes(current))utilities.querySelector('details').open=true;updateActive();
 function roleUpdate(){const admin=window.DALP_ROLE==='admin';navEl.querySelectorAll('[data-admin-only]').forEach(group=>group.hidden=!admin);if(adminPages.has(current)&&!admin){root.classList.remove('ac-menu-open');}right.querySelector('.ac-secure').textContent=admin?'Administrator':'Learner';branding.href=admin?'admin.html':'account.html';updateActive();}window.addEventListener('dalp:auth-ready',roleUpdate);roleUpdate();
 function identity(){const user=window.DALP_AUTH_USER;if(!user)return;const email=user.email||'Secure account',name=user.user_metadata?.full_name||email.split('@')[0]||'Administrator';bottom.querySelector('#acUserName').textContent=name;bottom.querySelector('#acUserEmail').textContent=email;const initial=name.trim().charAt(0).toUpperCase()||'A';bottom.querySelector('.ac-avatar').textContent=initial;}
 window.addEventListener('dalp:auth-ready',identity);identity();

})();
