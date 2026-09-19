
(async function(){
  const a=document.getElementById('learnerAccountBtn');
  if(!a || !window.ZAH_DB) return;

  if(!window.ZAH_DB.configured){
    a.textContent='Sign In';
    a.href='../auth.html?return='+encodeURIComponent(location.href);
    return;
  }

  const u=await window.ZAH_DB.user();
  if(u){
    a.textContent='My Account';
    a.href='../account.html';
  }else{
    a.textContent='Sign In';
    a.href='../auth.html?return='+encodeURIComponent(location.href);
  }
})();
