import React from "react";
import { ARCANES_DATA } from "../../data/gameData";

export default function TarotTab({ cooldowns, gameSpeed, onGameSpeedChange, onCastArcane }) {
  return (
    <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-6">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3 font-mono text-xs">
        <span className="font-bold text-white">Arcanos Maiores (Recarga em tempo real)</span>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">Velocidade:</span>
          {[1, 5, 20].map((s) => (
            <button
              key={s}
              onClick={() => onGameSpeedChange(s)}
              className={`px-2 py-0.5 rounded border ${
                gameSpeed === s ? "bg-indigo-600 text-white border-indigo-400" : "bg-zinc-950 text-zinc-400 border-zinc-800"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
        {ARCANES_DATA.map((arc) => {
          const cd = cooldowns[arc.id] || 0;
          const isReady = cd === 0;
          return (
            <div key={arc.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="flex justify-between text-zinc-400 text-[10px]">
                  <span>#{arc.id}</span>
                  <span className={isReady ? "text-emerald-400 font-bold" : "text-amber-400"}>{isReady ? "Pronto" : `${cd}s`}</span>
                </div>
                <div className="font-bold text-sm text-white font-sans mt-0.5">{arc.name}</div>
                <div className="text-[11px] text-zinc-400 font-sans mt-1">{arc.effect}</div>
              </div>
              <button
                disabled={!isReady}
                onClick={() => onCastArcane(arc.id, arc.baseCd, arc.name)}
                className={`mt-3 py-1.5 rounded-lg font-bold transition-all ${
                  isReady
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/30"
                    : "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
                }`}
              >
                {isReady ? "Conjurar" : "Recarregando..."}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}