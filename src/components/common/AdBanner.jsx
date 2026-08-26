import React from "react";

export default function AdBanner({ 
  adSlot = "", 
  adClient = "" 
}) {
  // Se ainda não houver credenciais reais configuradas, não renderiza caixas vazias
  if (!adSlot || !adClient) {
    return null;
  }

  return (
    <div className="my-6 p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 text-center font-mono">
      <span className="text-[10px] text-zinc-600 uppercase tracking-widest block mb-1">
        Publicidade
      </span>
      <div className="overflow-hidden min-h-[90px] flex items-center justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}