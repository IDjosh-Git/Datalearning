/* Private profile image display; client-side metadata only, no privileged credentials. */
(()=>{'use strict';
 const BUCKET='datalearning-avatars';
 const goodPath=(path,id)=>typeof path==='string'&&typeof id==='string'&&path.startsWith(id+'/')&&!path.includes('..')&&path.length<240;
 const initial=user=>{const name=(user?.user_metadata?.full_name||user?.email?.split('@')[0]||'Learner').trim();return name.split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()||'DL'};
 async function signedUrl(user){
  const client=window.ZAH_DB?.client,path=user?.user_metadata?.dalp_avatar_path;
  if(!client||!user?.id||!goodPath(path,user.id))return null;
  try{const {data,error}=await client.storage.from(BUCKET).createSignedUrl(path,600);if(error)throw error;return data?.signedUrl||null;}catch(error){console.warn('Avatar not accessible',error);return null}
 }
 function bind(node,user,url){if(!node||!user)return;
  const initials=node.querySelector('[data-profile-initial]');if(initials)initials.textContent=initial(user);
  let img=node.querySelector('img[data-profile-image]');if(url){if(!img){img=document.createElement('img');img.dataset.profileImage='';img.alt='';img.decoding='async';node.append(img)}img.src=url;img.hidden=false;if(initials)initials.hidden=true;img.onerror=()=>{img.hidden=true;if(initials)initials.hidden=false};}
  else{if(img)img.hidden=true;if(initials)initials.hidden=false}
 }
 window.DALP_PROFILE_PHOTO={BUCKET,goodPath,initial,signedUrl,bind};
})();