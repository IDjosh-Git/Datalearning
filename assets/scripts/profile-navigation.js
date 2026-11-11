/* One account-status control across public and protected pages. No auth-required navigation queries. */
(()=>{'use strict';
 const run=()=>{
  const pub=document.querySelector('.dalp-global-header[data-public-nav] .dalp-global-inner');
  const priv=document.querySelector('.ac-topbar .ac-top-actions');
  const host=priv||pub;if(!host)return;
  if(host.querySelector('.dl-profile-control'))return;
  const base=location.pathname.includes('/courses/')?'../':'';
  const isPrivate=!!priv;
  const node=document.createElement('div');node.className='dl-profile-control';
  node.innerHTML='<a class="dl-profile-button" href="'+base+'profile.html" aria-label="Open your DataLearning profile"><span class="dl-profile-avatar"><span data-profile-initial>↗</span></span><span class="dl-profile-button-copy"><strong data-profile-label>Profile</strong><small data-profile-state>My account</small></span><span class="dl-profile-live" aria-hidden="true"></span></a>';
  const toggle=document.querySelector('.dalp-global-toggle');
  if(pub&&toggle)pub.insertBefore(node,toggle);else host.append(node);
  const link=node.querySelector('a');
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
   link.href=base+(signed?'profile.html':'auth.html');link.setAttribute('aria-label',signed?'Open your DataLearning profile':'Sign in to DataLearning');
   node.querySelector('[data-profile-label]').textContent=signed?'Profile':'Sign in';
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