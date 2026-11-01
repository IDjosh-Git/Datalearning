/* Shared administration workspace: one navigation architecture for all admin pages. */
(()=>{'use strict';
 const current=document.body?.dataset.adminConsole;
 if(!current)return;
 const root=document.body;const main=document.querySelector('main');if(!main)return;
 const nav=[
  {caption:'WORKSPACE',items:[['Overview','admin.html','overview','▦'],['Learners','admin.html#admin-learners','learners','♙'],['Course performance','admin.html#admin-courses','courses','◫']]},
  {caption:'LEARNER SUCCESS',items:[['Progress reports','progress.html','progress','↗'],['Assessment desk','reviewer.html','reviews','✓']]},
  {caption:'MY WORKSPACE',items:[['Learner experience','index.html','portal','▣'],['My account','account.html','account','⚙']]}
 ];
 const shell=document.createElement('div');shell.className='ac-shell';
 const aside=document.createElement('aside');aside.className='ac-sidebar';aside.id='acSidebar';aside.setAttribute('aria-label','Administration navigation');
 const branding=document.createElement('a');branding.className='ac-brand';branding.href='admin.html';branding.innerHTML='<img src="assets/icons/da-logo.svg" alt="" width="38" height="38"><span><strong>Data Analysis Learning Path</strong><small>ADMIN CONSOLE</small></span>';
 aside.append(branding);
 const drawerClose=document.createElement('button');drawerClose.className='ac-drawer-close';drawerClose.type='button';drawerClose.setAttribute('aria-label','Close administrator navigation');drawerClose.textContent='✕';aside.append(drawerClose);
 const navEl=document.createElement('nav');navEl.className='ac-side-nav';navEl.setAttribute('aria-label','Administrator sections');
 nav.forEach(group=>{const heading=document.createElement('p');heading.className='ac-side-label';heading.textContent=group.caption;navEl.append(heading);group.items.forEach(([label,href,id,ico])=>{const a=document.createElement('a');a.className='ac-side-link';a.href=href;a.dataset.section=id;a.innerHTML='<span class="ac-side-icon" aria-hidden="true">'+ico+'</span><span class="ac-side-name"></span><span class="ac-side-arrow" aria-hidden="true">›</span>';a.querySelector('.ac-side-name').textContent=label;navEl.append(a)})});aside.append(navEl);
 const bottom=document.createElement('div');bottom.className='ac-side-bottom';bottom.innerHTML='<a href="account.html" class="ac-side-account"><span class="ac-avatar" aria-hidden="true">A</span><span><strong id="acUserName">Administrator</strong><small id="acUserEmail">Secure access</small></span></a>';aside.append(bottom);
 const logout=document.createElement('button');logout.className='ac-logout';logout.type='button';logout.textContent='⇥  Sign out';logout.addEventListener('click',async()=>{logout.disabled=true;logout.textContent='Signing out…';try{await window.DALP_SERVER_SESSION?.clear();await window.ZAH_DB?.client?.auth.signOut()}finally{location.replace('auth.html')}});bottom.append(logout);
 const backdrop=document.createElement('div');backdrop.className='ac-nav-overlay';backdrop.setAttribute('aria-hidden','true');
 const frame=document.createElement('div');frame.className='ac-main-frame';
 const header=document.createElement('header');header.className='ac-topbar';
 const mobileToggle=document.createElement('button');mobileToggle.type='button';mobileToggle.className='ac-mobile-menu';mobileToggle.setAttribute('aria-label','Open navigation');mobileToggle.setAttribute('aria-controls','acSidebar');mobileToggle.setAttribute('aria-expanded','false');mobileToggle.textContent='☰';
 const trail=document.createElement('div');trail.className='ac-breadcrumb';trail.innerHTML='<span>Admin workspace</span><span aria-hidden="true">/</span><strong>'+({overview:'Overview',progress:'Progress reports',reviews:'Assessment desk'}[current]||'Overview')+'</strong>';
 const right=document.createElement('div');right.className='ac-top-actions';right.innerHTML='<span class="ac-secure"><i></i> Protected workspace</span><a class="ac-top-portal" href="index.html">View learner portal <span aria-hidden="true">↗</span></a><a class="ac-top-user" aria-label="My account" href="account.html">Account</a>';
 header.append(mobileToggle,trail,right);
 const area=document.createElement('div');area.className='ac-page-area';
 main.parentNode.insertBefore(shell,main);shell.append(aside,backdrop,frame);frame.append(header,area);area.append(main);
 root.classList.add('ac-ready');
 let previouslyFocused=null;let drawerPreviousFocus=null;
 function closeMenu(){const wasOpen=root.classList.contains('ac-menu-open');root.classList.remove('ac-menu-open');mobileToggle.setAttribute('aria-expanded','false');mobileToggle.setAttribute('aria-label','Open navigation');if(wasOpen&&drawerPreviousFocus?.isConnected)drawerPreviousFocus.focus({preventScroll:true});drawerPreviousFocus=null;}
 function openMenu(){drawerPreviousFocus=document.activeElement;root.classList.add('ac-menu-open');mobileToggle.setAttribute('aria-expanded','true');mobileToggle.setAttribute('aria-label','Close navigation');drawerClose.focus({preventScroll:true});} 
 mobileToggle.addEventListener('click',()=>root.classList.contains('ac-menu-open')?closeMenu():openMenu());backdrop.addEventListener('click',closeMenu);drawerClose.addEventListener('click',closeMenu);
 navEl.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
 document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&root.classList.contains('ac-menu-open'))closeMenu();
 if(e.key==='Tab'&&root.classList.contains('ac-menu-open')){const items=[...aside.querySelectorAll('a[href],button:not([disabled])')].filter(el=>el.getClientRects().length);if(!items.length)return;const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
});

 // Mobile admin essentials are always one tap away. The full sidebar remains in More.
 const quickNav=document.createElement('nav');quickNav.className='ac-mobile-tabs';quickNav.setAttribute('aria-label','Mobile administration navigation');
 const adminItems=[['Overview','admin.html','overview','▦'],['Learners','admin.html#admin-learners','learners','♙'],['Progress','progress.html','progress','◫'],['Reviews','reviewer.html','reviews','✓']];
 for(const [label,href,id,icon] of adminItems){const a=document.createElement('a');a.href=href;a.className='ac-mobile-tab';a.dataset.tab=id;a.innerHTML='<span aria-hidden="true">'+icon+'</span><small>'+label+'</small>';quickNav.append(a)}
 const moreAdmin=document.createElement('button');moreAdmin.type='button';moreAdmin.className='ac-mobile-tab';moreAdmin.setAttribute('aria-controls','acSidebar');moreAdmin.setAttribute('aria-expanded','false');moreAdmin.innerHTML='<span aria-hidden="true">☰</span><small>More</small>';quickNav.append(moreAdmin);
 moreAdmin.addEventListener('click',()=>{root.classList.contains('ac-menu-open')?closeMenu():openMenu();moreAdmin.setAttribute('aria-expanded',String(root.classList.contains('ac-menu-open')))});
 const mobileNavObserver=new MutationObserver(()=>moreAdmin.setAttribute('aria-expanded',String(root.classList.contains('ac-menu-open'))));mobileNavObserver.observe(root,{attributes:true,attributeFilter:['class']});
 root.append(quickNav);
 function selectMobile(){const hash=location.hash;const active=current==='overview'?(hash==='#admin-learners'?'learners':'overview'):current==='reviews'?'reviews':'progress';quickNav.querySelectorAll('a').forEach(a=>{const chosen=a.dataset.tab===active;a.classList.toggle('is-active',chosen);if(chosen)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}
 window.addEventListener('hashchange',selectMobile);selectMobile();

 const bp=window.matchMedia('(min-width: 1025px)');bp.addEventListener?.('change',()=>{if(bp.matches)closeMenu()});
 function updateActive(){const h=location.hash;const active=current==='overview'?(h==='#admin-learners'?'learners':h==='#admin-courses'?'courses':'overview'):current;navEl.querySelectorAll('.ac-side-link').forEach(a=>{const match=a.dataset.section===active;a.classList.toggle('ac-selected',match);if(match)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});}
 window.addEventListener('hashchange',updateActive);updateActive();
 function identity(){const user=window.DALP_AUTH_USER;if(!user)return;const email=user.email||'Secure account',name=user.user_metadata?.full_name||email.split('@')[0]||'Administrator';bottom.querySelector('#acUserName').textContent=name;bottom.querySelector('#acUserEmail').textContent=email;const initial=name.trim().charAt(0).toUpperCase()||'A';bottom.querySelector('.ac-avatar').textContent=initial;right.querySelector('.ac-top-user').textContent='Account';}
 window.addEventListener('dalp:auth-ready',identity);identity();
 // Detail sheet works with the existing page scripts, but offers an accessible overlay.
 const dialog=document.getElementById('adminLearnerDetail'),shade=document.getElementById('adminDetailBackdrop');
 if(dialog&&shade){
  const observer=new MutationObserver(()=>{const open=!dialog.hidden;shade.hidden=!open;root.classList.toggle('ac-detail-open',open);if(open){if(!previouslyFocused)previouslyFocused=document.activeElement;dialog.focus({preventScroll:true})}else if(previouslyFocused){previouslyFocused.focus?.({preventScroll:true});previouslyFocused=null;}});
  observer.observe(dialog,{attributes:true,attributeFilter:['hidden']});
  shade.addEventListener('click',()=>{dialog.hidden=true});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog.hidden){dialog.hidden=true;}if(e.key==='Tab'&&!dialog.hidden){const focusable=[...dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled])')].filter(el=>el.getClientRects().length);if(!focusable.length){e.preventDefault();return;}if(e.shiftKey&&document.activeElement===focusable[0]){focusable.at(-1).focus();e.preventDefault()}else if(!e.shiftKey&&document.activeElement===focusable.at(-1)){focusable[0].focus();e.preventDefault();}}});
 }
})();
