import React from "react";
import { Construction, Sparkles, Clock, ArrowRight } from "lucide-react";

export default function ComingSoonTab({ 
  icon = "🚧", 
  title = "Em Breve", 
  layerNumber = "",
  description = "Esta parte do guia e seus respectivos simuladores serão adicionados na próxima atualização." 
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full p-8 rounded-3xl bg-gradient-to-b from-zinc-900/80 via-zinc-900/40 to-zinc-950 border border-zinc-800 text-center space-y-5 shadow-2xl relative overflow-hidden">
        {/* Glow de Fundo */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-600/10 blur-3xl pointer-events-none rounded-full" />

        {/* Ícone de Destaque */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-4xl shadow-inner relative">
          <span>{icon}</span>
          <div className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-amber-950 border border-amber-500/40 text-amber-400">
            <Construction className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Textos Informativos */}
        <div className="space-y-2">
          {layerNumber && (
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
              {layerNumber}
            </span>
          )}
          <h2 className="text-2xl font-black text-white tracking-tight">{title}</h2>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-xs mx-auto">
            {description}
          </p>
        </div>

        {/* Badge de Status */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/30 border border-amber-500/30 text-amber-300 font-mono text-[11px]">
          <Clock className="w-3.5 h-3.5" />
          <span>Fase de Desenvolvimento Ativa</span>
        </div>

        {/* Roadmap Preview */}
        <div className="pt-4 border-t border-zinc-800/80 text-left font-mono text-[11px] text-zinc-400 space-y-2">
          <div className="text-zinc-300 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Progresso Atual da Aplicação:
          </div>
          <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800/80 space-y-1 text-[10px]">
            <div className="text-emerald-400 font-bold">✓ 1. Revolução (Estável)</div>
            <div className="text-emerald-400 font-bold">✓ 2. Infinito & Desafios (Estável)</div>
            <div className="text-emerald-400 font-bold">✓ 3. Eternidade & Laboratório (Estável)</div>
            <div className="text-cyan-400 font-bold">✓ 4. Dilatação & Árvore (Estável)</div>
            <div className="text-zinc-500">○ 5. {title} (Próxima Versão)</div>
          </div>
        </div>
      </div>
    </div>
  );
}