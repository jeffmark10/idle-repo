import React from "react";
import { formatScientific } from "../../utils/numberParser";

export default function PlagueTab({ pigCount, pipTotal, erList, infProgress, onSynthesizeEr }) {
  return (
    <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-6">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3 font-mono text-xs">
        <span className="text-zinc-400">PIG: <strong className="text-white">{pigCount}</strong></span>
        <span className="text-rose-400 font-bold">PIP: {formatScientific(pipTotal)}</span>
      </div>

      <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 font-mono text-xs">
        <div className="flex justify-between">
          <span className="text-zinc-300 font-bold">Infectando População...</span>
          <span className="text-rose-400 font-bold">{infProgress.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-600 to-amber-500 transition-all duration-300"
            style={{ width: `${infProgress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase font-mono text-zinc-400">Cepas de ER</span>
          <button
            disabled={pipTotal < 200}
            onClick={onSynthesizeEr}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
              pipTotal >= 200 ? "bg-rose-600 text-white" : "bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800"
            }`}
          >
            + Sintetizar ER (200 PIP)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          {erList.map((er, idx) => (
            <div key={er.id} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <div className="font-bold text-white">Cepa #{idx + 1} (Nv {er.level})</div>
              <div className="text-[11px] text-zinc-400">Poder: <strong className="text-rose-300">{er.power}</strong></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}