import React from "react";
import { Sparkles, Clock, Compass } from "lucide-react";

export default function ComingSoonTab({ 
  icon = "✦", 
  title = "Em Breve", 
  layerNumber = "Camada Futura" 
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-900/40 border-2 border-zinc-800 text-center space-y-5 shadow-2xl">
        <div className="w-16 h-16 rounded-3xl bg-zinc-950 border border-zinc-700 flex items-center justify-center text-3xl mx-auto shadow-inner text-purple-400">
          {icon}
        </div>

        <div className="space-y-1 font-mono">
          <span className="text-xs uppercase text-zinc-500 font-bold tracking-wider">
            {layerNumber}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {title}
          </h2>
        </div>

        <p className="text-xs text-zinc-400 font-sans leading-relaxed">
          Esta camada e seus simuladores dedicados estão atualmente em fase de refinamento de dados e serão adicionados nas próximas atualizações do guia.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400">
          <Clock className="w-3.5 h-3.5 text-purple-400" />
          <span>Conteúdo em desenvolvimento</span>
        </div>
      </div>
    </div>
  );
}