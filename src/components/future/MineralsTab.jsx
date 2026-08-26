import React, { useMemo } from "react";
import { Gem } from "lucide-react";
import StatCard from "../ui/StatCard";
import { formatScientific } from "../../utils/numberParser";

export default function MineralsTab({ mineralGrid, onSpawn, onMergeCascading, node1Lvl, onNode1Change }) {
  const gridVpPerSec = useMemo(() => {
    return mineralGrid.reduce((acc, lvl) => {
      if (lvl === 0) return acc;
      return acc + 0.01 * Math.pow(3 + node1Lvl, lvl - 1) * 1000;
    }, 0);
  }, [mineralGrid, node1Lvl]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-6 bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800 space-y-4">
        <div className="grid grid-cols-4 gap-2 aspect-square max-w-xs mx-auto">
          {mineralGrid.map((lvl, idx) => (
            <div
              key={idx}
              className={`rounded-xl border flex flex-col items-center justify-center font-mono ${
                lvl > 0 ? "bg-emerald-950/40 border-emerald-500/50" : "bg-zinc-950 border-zinc-800/80 border-dashed"
              }`}
            >
              {lvl > 0 ? <span className="text-xs font-bold text-emerald-300">Nv {lvl}</span> : <span className="text-zinc-700 text-xs">-</span>}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onSpawn}
            className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
          >
            Gerar Nv 1
          </button>
          <button
            onClick={onMergeCascading}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-bold"
          >
            Fundir Tudo (Cascata)
          </button>
        </div>
      </div>

      <div className="lg:col-span-6 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4 font-mono text-xs">
        <h2 className="text-sm font-bold text-white font-sans flex items-center gap-2">
          <Gem className="w-4 h-4 text-emerald-400" /> Parâmetros de Refino
        </h2>
        <div>
          <div className="flex justify-between text-zinc-400">
            <label htmlFor="node1Slider">Nó #1 (+3 base/nv):</label>
            <span>{node1Lvl}</span>
          </div>
          <input
            id="node1Slider"
            type="range"
            min="0"
            max="25"
            value={node1Lvl}
            onChange={(e) => onNode1Change(Number(e.target.value))}
            className="w-full mt-1 accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-zinc-400 mt-0.5">
            <span>0</span>
            <span>25</span>
          </div>
        </div>
        <StatCard label="Rendimento da Grade" value={`+${formatScientific(gridVpPerSec)} PV/s`} highlight={true} />
      </div>
    </div>
  );
}