
(function(){
  const cfg = window.ZAH_SUPABASE || {};
  const configured =
    cfg.url &&
    cfg.publishableKey &&
    !cfg.url.includes("YOUR_SUPABASE") &&
    !cfg.publishableKey.includes("YOUR_SUPABASE");

  window.ZAH_DB = {
    configured,
    client: null,
    async user(){
      if(!this.configured || !this.client) return null;
      const { data } = await this.client.auth.getUser();
      return data?.user || null;
    }
  };

  // Only a real authenticated DataLearning session can register an app user.
  // Merely creating a Supabase Auth account or opening a public page anonymously
  // never adds a learner. The RPC derives identity from a verified JWT.
  let lastUsageId='',lastUsageAt=0;
  window.DALP_APP_USAGE = {
    async record(event = 'use') {
      if (!window.ZAH_DB.client || !['use', 'sign_in'].includes(event)) return false;
      try {
        const client = window.ZAH_DB.client;
        const { data: verified, error: verifyError } = await client.auth.getUser();
        if (verifyError || !verified?.user?.id || verified.user.is_anonymous) return false;
        if (event === 'use') {
          if(lastUsageId===verified.user.id && Date.now()-lastUsageAt<300000)return true;
        }
        const { data, error } = await client.rpc('record_datalearning_use', { p_event: event });
        if (error) throw error;
        if (data === true) {
          lastUsageId=verified.user.id;lastUsageAt=Date.now();
        }
        return data === true;
      } catch (error) {
        // Migration may not yet have been applied. Tracking must never block a learner.
        if (!window.DALP_APP_USAGE_WARNING_SHOWN) {
          window.DALP_APP_USAGE_WARNING_SHOWN = true;
          console.info('DataLearning activity tracking unavailable until the database migration is applied.');
        }
        return false;
      }
    }
  };

  if(configured && window.supabase){
    window.ZAH_DB.client = window.supabase.createClient(
      cfg.url,
      cfg.publishableKey,
      {
        auth:{
          persistSession:false,
          autoRefreshToken:true,
          detectSessionInUrl:true
        }
      }
    );
    window.DALP_AUTH_RESTORE=(async()=>{try{return await window.DALP_SERVER_SESSION?.restore?.()||false;}catch{return false}})();
    const registerActualVisit = () => { Promise.resolve(window.DALP_AUTH_RESTORE).then(()=>window.DALP_APP_USAGE.record('use')); }; 
    if (document.readyState === 'loading')
      document.addEventListener('DOMContentLoaded', registerActualVisit, { once: true });
    else registerActualVisit();
  }
})();
