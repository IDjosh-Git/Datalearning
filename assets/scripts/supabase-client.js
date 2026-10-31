
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

  if(configured && window.supabase){
    window.ZAH_DB.client = window.supabase.createClient(
      cfg.url,
      cfg.publishableKey,
      {
        auth:{
          persistSession:true,
          autoRefreshToken:true,
          detectSessionInUrl:true
        }
      }
    );
  }
})();
