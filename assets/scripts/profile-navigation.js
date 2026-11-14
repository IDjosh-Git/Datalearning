/* One account-status control across public and protected pages. No auth-required navigation queries. */
(()=>{'use strict';
 const run=()=>{
  const pub=document.querySelector('.dalp-global-header[data-public-nav] .dalp-global-inner');
  const priv=document.querySelector('.ac-topbar .ac-top-actions');
  // Private workspace account controls are owned by private-navigation.js.
  // Admin pages intentionally have no profile shortcut in the top bar.
  if(priv)return;
  const host=pub;if(!host)return;
  if(host.querySelector('.dl-profile-control'))return;
  const base=location.pathname.includes('/courses/')?'../':'';
  const isPrivate=!!priv;
  const node=document.createElement('div');node.className='dl-profile-control';
  node.innerHTML='<button class="dl-profile-button" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="dlPublicProfileMenu"><span class="dl-profile-avatar"><span data-profile-initial>↗</span></span><span class="dl-profile-button-copy"><strong data-profile-label>Profile</strong><small data-profile-state>My account</small></span><span class="dl-profile-live" aria-hidden="true"></span><span aria-hidden="true">⌄</span></button><div class="dl-public-profile-menu" id="dlPublicProfileMenu" hidden><div class="dl-public-profile-head"><strong data-menu-name>My workspace</strong><small>Account &amp; learning</small></div><a href="'+base+'profile.html"><span aria-hidden="true">◉</span> My Profile</a><a href="'+base+'account.html#progress"><span aria-hidden="true">◫</span> Learning Progress</a><button type="button" data-profile-signout><span aria-hidden="true">⇥</span> Sign Out</button></div>';
  const toggle=document.querySelector('.dalp-global-toggle');
  if(pub&&toggle)pub.insertBefore(node,toggle);else host.append(node);
  const link=node.querySelector('.dl-profile-button');
  const menu=node.querySelector('.dl-public-profile-menu');
  const close=()=>{menu.hidden=true;link.setAttribute('aria-expanded','false')};
  link.addEventListener('click',()=>{if(!node.classList.contains('dl-profile-signed')){location.href=base+'auth.html';return}const open=menu.hidden;menu.hidden=!open;link.setAttribute('aria-expanded',String(open))});
  document.addEventListener('click',e=>{if(!node.contains(e.target))close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){close();link.focus()}});
  node.querySelector('[data-profile-signout]').addEventListener('click',async()=>{close();try{await window.ZAH_DB?.client?.auth.signOut()}finally{location.href=base+'index.html'}});
  let currentUser=null;
  const sync=async()=>{
   if(!window.DALP_AUTH_USER)return;
   const client=window.ZAH_DB?.client;
   if(!client){node.classList.add('dl-profile-guest');return}
   // Reuse the identity already verified by the app-wide sign-in gate. Do not
   // let a transient browser session lookup turn an authenticated header into Sign in.
   const user=window.DALP_AUTH_USER;
   currentUser=user;
   const signed=!!user&&!user.is_anonymous;
   node.classList.toggle('dl-profile-signed',signed);node.classList.toggle('dl-profile-guest',!signed);
   link.setAttribute('aria-label',signed?'Open account menu':'Sign in to DataLearning');if(!signed)close();
   node.querySelector('[data-profile-label]').textContent=signed?(user.user_metadata?.full_name||user.email?.split('@')[0]||'My account'):'Sign in';node.querySelector('[data-menu-name]').textContent=signed?(user.user_metadata?.full_name||user.email?.split('@')[0]||'My workspace'):'My workspace';
   node.querySelector('[data-profile-state]').textContent=signed?'Edit details':'Sign in required';
   const avatar=node.querySelector('.dl-profile-avatar');
   if(window.DALP_PROFILE_PHOTO){const url=signed?await window.DALP_PROFILE_PHOTO.signedUrl(user):null;
      if(currentUser?.id!==user?.id)return;
      if(signed)window.DALP_PROFILE_PHOTO.bind(avatar,user,url);
      else {avatar.textContent='↗';}
   }
  };
  // On protected pages, an un-restored Supabase session is not a signed-out
  // visitor. Keep the link within the app until the verified gate is ready.
  void Promise.resolve(window.DALP_AUTH_GATE?.whenReady).then(sync);
  window.addEventListener('dalp:auth-ready',sync);
  window.ZAH_DB?.client?.auth.onAuthStateChange(()=>{setTimeout(sync,0)});
  window.addEventListener('dalp:profile-updated',sync);
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();