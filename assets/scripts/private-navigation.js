/* One role-aware private navigation used by administrator and learner account pages. */
(()=>{'use strict';
 const current=document.body?.dataset.adminConsole;
 if(!current)return;
 const root=document.body;const main=document.querySelector('main');if(!main)return;
 const icons={"overview": "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"/>", "learners": "<circle cx=\"9\" cy=\"8\" r=\"3\"/><path d=\"M3 20v-2c0-3 2.8-5 6-5s6 2 6 5v2\"/><path d=\"M16 5c2.4 0 4 1.6 4 3.5S18.5 12 16 12M18 14c2 .5 3 2 3 4v2\"/>", "courses": "<path d=\"M3 6l9-3 9 3v13l-9 3-9-3z\"/><path d=\"M12 3v19M3 6l9 3 9-3\"/>", "progress": "<path d=\"M4 20V12m5 8V7m5 13v-5m5 5V4\"/><path d=\"M2 21h20\"/>", "reviews": "<path d=\"M7 3h10l3 3v15H4V3h3Z\"/><path d=\"M8 11h8M8 15l2.5 2.5L16 12\"/>", "account": "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21v-2c0-4.5 3.5-6.5 8-6.5s8 2 8 6.5v2\"/>", "catalog": "<path d=\"M4 4h7c2 0 3 1 3 3v13c0-2-1-3-3-3H4zM20 4h-6v16c0-2 1-3 3-3h3z\"/>", "portal": "<path d=\"m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7\"/>", "connection": "<path d=\"M6 16a5 5 0 0 1 0-8l3 3m6 2 3 3a5 5 0 0 0 0-8M8 12l8 0\"/>", "sync": "<path d=\"M20 7a8 8 0 0 0-14-2L4 8m0-4v4h4M4 17a8 8 0 0 0 14 2l2-3m0 4v-4h-4\"/>"};
 const iconFor=id=>'<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+(icons[id]||icons.overview)+'</svg>';
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
 function appendGroup(group,adminOnly=false){const wrap=document.createElement('div');wrap.className='ac-nav-group';if(adminOnly){wrap.dataset.adminOnly='';wrap.hidden=true;}const heading=document.createElement('p');heading.className='ac-side-label';heading.textContent=group.caption;wrap.append(heading);group.items.forEach(([label,href,id,ico])=>{const a=document.createElement('a');a.className='ac-side-link';a.href=href;a.dataset.section=id;a.innerHTML='<span class="ac-side-icon" data-icon="'+id+'" aria-hidden="true">'+iconFor(id)+'</span><span class="ac-side-name"></span><span class="ac-side-arrow" aria-hidden="true">›</span>';a.querySelector('.ac-side-name').textContent=label;wrap.append(a)});navEl.append(wrap);}
 adminNav.forEach(group=>appendGroup(group,true));learnerNav.forEach(group=>appendGroup(group));
 // Diagnostic utilities are rarely used: keep direct access without cluttering primary navigation.
 const utilities=document.createElement('div');utilities.className='ac-nav-group ac-nav-utilities';utilities.dataset.adminOnly='';utilities.hidden=true;
 utilities.innerHTML=`<details class="ac-utilities-details"><summary>Diagnostics</summary><div class="ac-utilities-links"><a class="ac-side-link" data-section="connection" href="connection-test.html"><span class="ac-side-icon" data-icon="connection" aria-hidden="true">${iconFor("connection")}</span><span class="ac-side-name">Connection check</span></a><a class="ac-side-link" data-section="sync" href="sync-test.html"><span class="ac-side-icon" data-icon="sync" aria-hidden="true">${iconFor("sync")}</span><span class="ac-side-name">Progress check</span></a></div></details>`;
 navEl.append(utilities);aside.append(navEl);
 const bottom=document.createElement('div');bottom.className='ac-side-bottom';bottom.innerHTML='<div class="ac-side-account"><span class="ac-avatar" aria-hidden="true">A</span><span><strong id="acUserName">My account</strong><small id="acUserEmail">Secure access</small></span></div>';aside.append(bottom);
 const logout=document.createElement('button');logout.className='ac-logout';logout.type='button';logout.textContent='⇥  Sign out';logout.addEventListener('click',async()=>{logout.disabled=true;logout.textContent='Signing out…';try{await window.DALP_SERVER_SESSION?.clear();await window.ZAH_DB?.client?.auth.signOut()}finally{location.replace('auth.html')}});bottom.append(logout);
 const backdrop=document.createElement('div');backdrop.className='ac-nav-overlay';backdrop.setAttribute('aria-hidden','true');
 const frame=document.createElement('div');frame.className='ac-main-frame';
 const header=document.createElement('header');header.className='ac-topbar';
 const mobileToggle=document.createElement('button');mobileToggle.type='button';mobileToggle.className='ac-mobile-menu';mobileToggle.setAttribute('aria-label','Open navigation');mobileToggle.setAttribute('aria-controls','acSidebar');mobileToggle.setAttribute('aria-expanded','false');mobileToggle.textContent='☰';
 const trail=document.createElement('div');trail.className='ac-breadcrumb';trail.innerHTML='<strong>'+({overview:'Overview',progress:'Progress reports',reviews:'Assessment desk',account:'My Learning',certificate:'Certificate',connection:'Connection check',sync:'Progress check'}[current]||'My Learning')+'</strong>';
 const right=document.createElement('div');right.className='ac-top-actions';right.innerHTML='<a class="ac-top-shortcut" href="catalog.html">Course catalog</a><a class="ac-top-shortcut ac-top-practice" href="practice.html">Practice Arena <span aria-hidden="true">↗</span></a><span class="ac-secure">Private workspace</span>';
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
