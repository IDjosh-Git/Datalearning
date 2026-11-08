/* DataLearning profile editor — Supabase Auth metadata and RLS-protected avatar storage. */
(()=>{'use strict';
 const $=id=>document.getElementById(id), client=()=>window.ZAH_DB?.client;
 let user=null,avatarPath='',previewUrl='',working=false;
 const status=(id,msg,kind='')=>{const el=$(id);if(!el)return;el.textContent=msg;el.dataset.kind=kind;};
 const disable=(id,v)=>{const btn=$(id);if(btn)btn.disabled=v};
 const initials=name=>(String(name||'DL').trim().split(/\s+/).slice(0,2).map(x=>x.charAt(0)).join('').toUpperCase()||'DL');
 function setPhoto(src){const img=$('profileAvatarImg'),initial=$('profileInitials');if(src){img.src=src;img.hidden=false;initial.hidden=true;img.onerror=()=>{img.hidden=true;initial.hidden=false}}else{img.removeAttribute('src');img.hidden=true;initial.hidden=false}}
 function updateIdentity(){if(!user)return;const meta=user.user_metadata||{};const name=String(meta.full_name||meta.name||user.email?.split('@')[0]||'Learner').trim();
  $('profileDisplayName').textContent=name;$('profileDisplayEmail').textContent=user.email||'';$('profileInitials').textContent=initials(name);
  $('profileCurrentEmail').value=user.email||'';$('profileAccountStatus').textContent='Signed in and secure';
  window.dispatchEvent(new Event('dalp:profile-updated'));
 }
 function fill(){if(!user)return;const m=user.user_metadata||{};
  $('profileFullName').value=m.full_name||m.name||'';
  $('profileHeadline').value=m.dalp_headline||'';$('profilePhone').value=m.dalp_phone||'';
  $('profileLocation').value=m.dalp_location||'';$('profileGoal').value=m.dalp_goal||'';
  $('profileBio').value=m.dalp_bio||'';
  avatarPath=m.dalp_avatar_path||'';
 }
 async function verify(){const db=client();if(!db){status('profileSaveStatus','Could not connect to DataLearning. Refresh and try again.','error');return null}
  try{const {data:session,error:sessionError}=await db.auth.getSession();if(sessionError)throw sessionError;
   if(!session?.session){location.replace('auth.html?return='+encodeURIComponent('profile.html'));return null}
   const {data,error}=await db.auth.getUser();if(error)throw error;
   if(!data?.user||data.user.is_anonymous){location.replace('auth.html?return='+encodeURIComponent('profile.html'));return null}
   return data.user;
  }catch(e){status('profileSaveStatus','Unable to verify your session. Check your connection and refresh.','error');console.warn('Profile authentication:',e);return null}
 }
 async function readPhoto(){
  if(!user)return;
  const helper=window.DALP_PROFILE_PHOTO;
  if(!helper)return;
  const url=await helper.signedUrl(user);
  if(url)setPhoto(url);else setPhoto(null);
 }
 function compress(input){return new Promise((resolve,reject)=>{
  if(!['image/jpeg','image/png','image/webp'].includes(input.type))return reject(new Error('Choose a JPG, PNG, or WebP photo.'));
  if(input.size>5*1024*1024)return reject(new Error('Choose a photo smaller than 5 MB.'));
  if(!input.size)return reject(new Error('This photo appears to be empty.'));
  const source=URL.createObjectURL(input);const im=new Image();
  im.onerror=()=>{URL.revokeObjectURL(source);reject(new Error('The image could not be opened. Please try another photo.'))};
  im.onload=()=>{try{
   const size=Math.min(1,640/Math.max(im.naturalWidth,im.naturalHeight));const w=Math.max(1,Math.round(im.naturalWidth*size)),h=Math.max(1,Math.round(im.naturalHeight*size));
   const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
   const context=canvas.getContext('2d');if(!context)throw new Error('Image processing is unavailable on this device.');
   context.fillStyle='#fff';context.fillRect(0,0,w,h);context.drawImage(im,0,0,w,h);
   const save=blob=>{URL.revokeObjectURL(source);if(!blob)return reject(new Error('Could not prepare your photo.'));
     if(blob.size>2*1024*1024)return reject(new Error('The photo is too large after resizing. Please use a smaller image.'));
     resolve(blob)};
   canvas.toBlob(save,'image/webp',.84);
  }catch(error){URL.revokeObjectURL(source);reject(error)}};
  im.src=source;
 })}
 async function uploadPhoto(file){if(!user||working)return;working=true;disable('removeProfilePhoto',true);
  status('photoStatus','Preparing a smaller, private profile photo…');
  let provisional='';let old=avatarPath;
  try{
   const blob=await compress(file);
   const path=user.id+'/avatar-'+Date.now()+'-'+Math.random().toString(36).slice(2,8)+'.webp';
   const db=client();const {error:uploadError}=await db.storage.from('datalearning-avatars').upload(path,blob,{contentType:'image/webp',upsert:false,cacheControl:'3600'});
   if(uploadError)throw uploadError;
   provisional=path;
   const {data,error}=await db.auth.updateUser({data:{dalp_avatar_path:path}});
   if(error)throw error;
   user=data?.user||{...user,user_metadata:{...(user.user_metadata||{}),dalp_avatar_path:path}};
   avatarPath=path;provisional='';
   if(old&&window.DALP_PROFILE_PHOTO?.goodPath(old,user.id)&&old!==path){void db.storage.from('datalearning-avatars').remove([old]).catch(()=>{});}
   await readPhoto();status('photoStatus','Your photo was saved and is visible in the navigation.','success');window.dispatchEvent(new Event('dalp:profile-updated'));
  }catch(error){console.warn('Profile photo upload:',error);
   status('photoStatus',/Bucket not found|not found/i.test(String(error.message||''))?'Photo storage has not been enabled yet. Run the included Supabase avatar setup first.':(error?.message||'Photo upload failed. Please try again.'),'error');
   if(provisional)void client().storage.from('datalearning-avatars').remove([provisional]).catch(()=>{});
  }finally{working=false;disable('removeProfilePhoto',false);$('profilePhotoFile').value=''}
 }
 async function removePhoto(){if(!user||!avatarPath||working)return;
  working=true;disable('removeProfilePhoto',true);
  try{const old=avatarPath,db=client();const {data,error}=await db.auth.updateUser({data:{dalp_avatar_path:''}});if(error)throw error;
   user=data?.user||user;avatarPath='';setPhoto(null);status('photoStatus','Your photo was removed.','success');window.dispatchEvent(new Event('dalp:profile-updated'));
   if(window.DALP_PROFILE_PHOTO?.goodPath(old,user.id)){const {error:deleteError}=await db.storage.from('datalearning-avatars').remove([old]);if(deleteError)console.warn('Old profile photo cleanup:',deleteError)}
  }catch(error){status('photoStatus',error.message||'Could not remove photo. Please retry.','error')}finally{working=false;disable('removeProfilePhoto',false)}
 }
 async function saveDetails(event){event.preventDefault();if(!user)return;
  const name=$('profileFullName').value.trim().replace(/\s+/g,' ');
  if(name.length<2){status('profileSaveStatus','Please enter your full name (at least 2 characters).','error');$('profileFullName').focus();return;}
  const values={full_name:name,dalp_headline:$('profileHeadline').value.trim(),dalp_phone:$('profilePhone').value.trim(),
   dalp_location:$('profileLocation').value.trim(),dalp_goal:$('profileGoal').value,dalp_bio:$('profileBio').value.trim()};
  disable('saveProfileBtn',true);status('profileSaveStatus','Saving your profile…');
  try{
   const db=client();const {data,error}=await db.auth.updateUser({data:values});if(error)throw error;user=data?.user||{...user,user_metadata:{...user.user_metadata,...values}};
   // Existing learner_profiles remains compatible with the app's progress dashboard and RLS.
   const {error:profileError}=await db.from('learner_profiles').update({full_name:name}).eq('user_id',user.id);
   if(profileError)console.warn('Public learning profile name sync:',profileError);
   updateIdentity();status('profileSaveStatus',profileError?'Profile saved. Your learning directory will synchronize separately.':'Profile saved successfully.','success');
  }catch(error){console.warn('Profile save:',error);status('profileSaveStatus',error.message||'Unable to save details. Please retry.','error')}
  finally{disable('saveProfileBtn',false)}
 }
 async function emailUpdate(event){event.preventDefault();if(!user)return;const email=$('profileNewEmail').value.trim().toLowerCase();
  if(!email||email===user.email){status('profileEmailStatus','Enter a new email address.','error');return}
  disable('profileEmailBtn',true);status('profileEmailStatus','Sending confirmation…');
  try{const {error}=await client().auth.updateUser({email});if(error)throw error;
   status('profileEmailStatus','Check your current and/or new email inbox to confirm the change. Your displayed email will update after confirmation.','success');$('profileNewEmail').value='';
  }catch(error){status('profileEmailStatus',error.message||'Email update could not start.','error')}finally{disable('profileEmailBtn',false)}
 }
 async function passwordUpdate(event){event.preventDefault();if(!user)return;
  const password=$('profilePassword').value,confirmation=$('profilePasswordConfirm').value;
  if(password.length<8){status('profilePasswordStatus','Use at least 8 characters.','error');return}
  if(password!==confirmation){status('profilePasswordStatus','Passwords do not match.','error');return}
  disable('profilePasswordBtn',true);status('profilePasswordStatus','Updating password…');
  try{const {error}=await client().auth.updateUser({password});if(error)throw error;status('profilePasswordStatus','Password updated. Use the new password next time you sign in.','success');$('profilePassword').value='';$('profilePasswordConfirm').value='';
  }catch(error){status('profilePasswordStatus',error.message||'Password update failed.','error')}finally{disable('profilePasswordBtn',false)}
 }
 async function init(){
  $('profilePhotoTrigger').addEventListener('click',()=>$('profilePhotoFile').click());
  $('profilePhotoFile').addEventListener('change',event=>{const file=event.target.files?.[0];if(file)void uploadPhoto(file)});
  $('removeProfilePhoto').addEventListener('click',()=>void removePhoto());
  $('profileDetailsForm').addEventListener('submit',saveDetails);
  $('profileEmailForm').addEventListener('submit',emailUpdate);
  $('profilePasswordForm').addEventListener('submit',passwordUpdate);
  user=await verify();if(!user)return;
  fill();updateIdentity();await readPhoto();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else void init();
})();
