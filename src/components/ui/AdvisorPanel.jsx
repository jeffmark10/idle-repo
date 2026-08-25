import React from "react";
import { useGame } from "../../context/GameContext";
import { analyzeCurrentProgress } from "../../utils/progressionEngine";
import { Lightbulb, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";

export default function AdvisorPanel() {
  const { gameState, executePrestigeReset } = useGame();
  const recommendations = analyzeCurrentProgress(gameState);

  return (
    <div className="p-5 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4 font-mono">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400 animate-pulse" />
          <h3 className="text-sm font-bold text-white font-sans">
            Guia de Decisão & Recomendações Automáticas
          </h3>
        </div>
        <span className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-950 text-zinc-400 border border-zinc-800">
          Camada: <strong className="text-purple-400 uppercase">{gameState.profile.currentLayer}</strong>
        </span>
      </div>

      <div className="space-y-2.5">
        {recommendations.length === 0 ? (
          <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800 text-xs text-zinc-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Progresso sincronizado! Siga farmando recursos para a próxima etapa.
          </div>
        ) : (
          recommendations.map((rec, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                rec.priority === "CRÍTICA"
                  ? "bg-red-950/20 border-red-500/40 text-red-200"
                  : rec.priority === "ALTA"
                  ? "bg-amber-950/20 border-amber-500/40 text-amber-200"
                  : "bg-zinc-950 border-zinc-800 text-zinc-300"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold">
                  <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px]">
                    {rec.priority}
                  </span>
                  <span>{rec.action}</span>
                </div>
                <p className="text-[11px] opacity-80 font-sans">{rec.target}</p>
              </div>
              <span className="text-[10px] text-zinc-400 font-sans shrink-0 max-w-xs">
                💡 {rec.reason}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}