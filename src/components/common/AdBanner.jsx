import React, { useEffect } from "react";

export default function AdBanner({ 
  adSlot = "1234567890", 
  adFormat = "auto",
  fullWidthResponsive = true 
}) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("Erro ao carregar anúncio:", err);
    }
  }, []);

  return (
    <div className="my-6 p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 text-center font-mono">
      <span className="text-[10px] text-zinc-600 uppercase tracking-widest block mb-1">
        Publicidade
      </span>
      <div className="overflow-hidden min-h-[90px] flex items-center justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        />
      </div>
    </div>
  );
}