/* Registration, sign-in, recovery, and sign-out using the existing Supabase project. */
(function(){
  'use strict';
  const $=id=>document.getElementById(id), db=()=>window.ZAH_DB?.client;
  const panels={login:'loginPanel',create:'signupPanel',forgot:'forgotPanel',reset:'resetPanel'};
  const text={
    login:['Welcome back','Sign in to pick up exactly where you left off.'],
    create:['Create your account','Start your learning journey and keep all your progress together.'],
    forgot:['Reset your password','We’ll email a secure link to help you regain access.'],
    reset:['Choose a new password','Create a new password to secure your learner account.']
  };
  const landing=new URL('index.html',location.href);
  function destination(){
    try{
      const val=new URLSearchParams(location.search).get('return');if(!val)return landing.href;
      const u=new URL(val,location.href),base=landing.pathname.slice(0,-'index.html'.length);
      if(u.origin!==location.origin||!u.pathname.startsWith(base)||u.pathname.endsWith('/auth.html'))return landing.href;
      return u.href;
    }catch(_){return landing.href}
  }
  function nextAuthUrl(mode){
    const url=new URL('auth.html',location.href);
    const dest=new URL(destination());
    url.searchParams.set('return',dest.pathname+dest.search+dest.hash);
    if(mode)url.searchParams.set('mode',mode);
    return url.href;
  }
  function setMode(mode){
    if(!panels[mode])mode='login';
    Object.entries(panels).forEach(([k,id])=>$(id).hidden=k!==mode);
    $('authTabs').hidden=mode==='forgot'||mode==='reset';
    ['signInTab','createTab'].forEach((id,i)=>{$(id).classList.toggle('active',(i===0?mode==='login':mode==='create'));$(id).setAttribute('aria-selected',String(i===0?mode==='login':mode==='create'))});
    $('authTitle').textContent=text[mode][0];$('authSubtitle').textContent=text[mode][1];
    document.body.dataset.authMode=mode;
  }
  function message(id,text,kind='warn'){
    const el=$(id);el.hidden=false;el.textContent=text;el.className='auth-msg '+kind;el.style.display='block';
  }
  function clearMessage(id){const e=$(id);e.hidden=true;e.style.display='none';e.textContent=''}
  function busy(button,flag,label){button.disabled=flag;button.textContent=flag?button.dataset.busyText:label}
  function errorText(e){
    const m=e?.message||'We couldn’t complete that request. Please try again.';
    if(/invalid login credentials/i.test(m))return 'Email or password is incorrect. Try again, or reset your password.';
    if(/email not confirmed/i.test(m))return 'Please confirm your email using the link we sent you, then sign in.';
    if(/rate limit/i.test(m))return 'Too many attempts. Please try again a little later.';
    return m;
  }
  const emailOk=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  let completing=false;
  async function enter(user,msgId){
    if(completing)return;
    completing=true;
    const el=msgId?$(msgId):null;
    if(el)message(msgId,'Signed in. Preparing your personal learning space…','success');
    try{
      window.DALP_AUTH_GATE?.prepareWorkspace(user);
      // Recovery is best-effort. Pages repeat cloud sync after navigation.
      if(window.ZAHProgressCloud?.recoverCurrentDevice){
        await Promise.race([
          window.ZAHProgressCloud.recoverCurrentDevice(user).catch(e=>console.warn('Progress sync will retry on learning page',e)),
          new Promise(resolve=>setTimeout(resolve,4500))
        ]);
      }
    }catch(e){console.warn('Post-login preparation will retry',e)}
    location.replace(destination());
  }
  const dbReady=()=>{
    if(db())return true;
    message('configWarn','Sign-in service is unavailable. Check your connection and the Supabase configuration, then reload this page.');
    return false;
  };
  $('signInTab').addEventListener('click',()=>setMode('login'));
  $('createTab').addEventListener('click',()=>setMode('create'));
  document.querySelectorAll('button[data-auth-mode]').forEach(btn=>btn.addEventListener('click',()=>setMode(btn.dataset.authMode)));
  document.querySelectorAll('[data-password-toggle]').forEach(btn=>btn.addEventListener('click',()=>{
    const input=$(btn.dataset.passwordToggle),visible=input.type==='text';input.type=visible?'password':'text';btn.textContent=visible?'Show':'Hide';btn.setAttribute('aria-label',(visible?'Show':'Hide')+' password');
  }));
  $('loginForm').addEventListener('submit',async e=>{
    e.preventDefault();clearMessage('loginMsg');if(!dbReady())return;
    const email=$('loginEmail').value.trim(),password=$('loginPassword').value;
    if(!emailOk(email)||!password){message('loginMsg','Enter a valid email address and password.');return;}
    const button=$('loginBtn');busy(button,true,'Sign in');
    try{
      const {data,error}=await db().auth.signInWithPassword({email,password});
      if(error)throw error;
      if(!data?.user||!data?.session)throw new Error('Sign-in could not be confirmed. Please try again.');
      await enter(data.user,'loginMsg');
    }catch(error){message('loginMsg',errorText(error));busy(button,false,'Sign in')}
  });
  $('signupForm').addEventListener('submit',async e=>{
    e.preventDefault();clearMessage('signupMsg');if(!dbReady())return;
    const full_name=$('fullName').value.trim(),email=$('signupEmail').value.trim(),password=$('signupPassword').value,confirmation=$('signupConfirm').value;
    if(full_name.length<2){message('signupMsg','Enter your full name to create an account.');return;}
    if(!emailOk(email)){message('signupMsg','Enter a valid email address.');return;}
    if(password.length<8){message('signupMsg','Choose a password with at least 8 characters.');return;}
    if(password!==confirmation){message('signupMsg','The passwords do not match.');return;}
    const button=$('signupBtn');busy(button,true,'Create account');
    try{
      const {data,error}=await db().auth.signUp({email,password,options:{data:{full_name},emailRedirectTo:nextAuthUrl()}});
      if(error)throw error;
      // When confirmations are disabled, Supabase can create an active session.
      // Still require explicit sign-in after creating a password account.
      if(data?.session){await db().auth.signOut({scope:'local'});}
      $('loginEmail').value=email;
      setMode('login');
      message('loginMsg',data?.session?'Account created! Sign in with the email and password you just chose.':'Account request received. Check your email for the verification link, then return to sign in.','success');
      $('loginEmail').focus();
    }catch(error){message('signupMsg',errorText(error))}
    finally{busy(button,false,'Create account')}
  });
  $('forgotForm').addEventListener('submit',async e=>{
    e.preventDefault();clearMessage('forgotMsg');if(!dbReady())return;
    const email=$('forgotEmail').value.trim();
    if(!emailOk(email)){message('forgotMsg','Enter the email address linked to your account.');return;}
    const button=$('forgotBtn');busy(button,true,'Send reset link');
    try{
      const {error}=await db().auth.resetPasswordForEmail(email,{redirectTo:nextAuthUrl('reset')});
      if(error)throw error;
      message('forgotMsg','If this address has an account, we’ll send a password-reset link. Check your inbox and spam folder.','success');
    }catch(error){message('forgotMsg',errorText(error))}
    finally{busy(button,false,'Send reset link')}
  });
  $('resetForm').addEventListener('submit',async e=>{
    e.preventDefault();clearMessage('resetMsg');if(!dbReady())return;
    const password=$('newPassword').value,confirm=$('confirmNewPassword').value;
    if(password.length<8){message('resetMsg','Use at least 8 characters.');return;}
    if(password!==confirm){message('resetMsg','The passwords do not match.');return;}
    const button=$('resetBtn');busy(button,true,'Update password');
    try{
      const {data,error:sErr}=await db().auth.getSession();
      if(sErr||!data.session)throw new Error('Your reset link has expired. Request another link.');
      const {error}=await db().auth.updateUser({password});
      if(error)throw error;
      await db().auth.signOut({scope:'local'});
      setMode('login');
      message('loginMsg','Your password has been updated. Sign in with your new password.','success');
    }catch(error){message('resetMsg',errorText(error))}
    finally{busy(button,false,'Update password')}
  });
  const googleEnabled=Boolean(window.DALP_AUTH_OPTIONS?.googleOAuthEnabled);
  document.querySelectorAll('.auth-google').forEach(button=>{
    button.hidden=!googleEnabled;
    if(button.tagName!=='BUTTON')return;
    button.addEventListener('click',async()=>{
      if(!dbReady())return;
      button.disabled=true;
      const {error}=await db().auth.signInWithOAuth({provider:'google',options:{redirectTo:nextAuthUrl()}});
      if(error){message(document.body.dataset.authMode==='create'?'signupMsg':'loginMsg',errorText(error));button.disabled=false}
    });
  });
  const mode=new URLSearchParams(location.search).get('mode');
  const resetCallback=mode==='reset' || /(?:^|[&#])type=recovery(?:&|$)/.test(location.hash);
  setMode(resetCallback?'reset':mode==='create'?'create':'login');
  (async()=>{
    if(!dbReady())return;
    db().auth.onAuthStateChange((event)=>{if(event==='PASSWORD_RECOVERY'){setMode('reset')}});
    try{
      const {data,error}=await db().auth.getUser();
      if(error && !/session missing/i.test(error.message||''))console.info('No confirmed user session yet',error.message);
      if(data?.user && !resetCallback){await enter(data.user,null)}
      if(resetCallback && !data?.user){setMode('forgot');message('forgotMsg','The password-reset link is missing or has expired. Request a new link.');}
    }catch(e){console.warn('Session check failed',e)}
  })();
})();
