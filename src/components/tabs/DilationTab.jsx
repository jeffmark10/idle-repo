import React from "react";
import { RotateCcw } from "lucide-react";

export default function DilationTab({ treeState, onTreeChange, onResetTree, onCopyLoadout }) {
  const totalDtp = treeState.center + treeState.top.reduce((a, b) => a + b, 0) + treeState.middle.reduce((a, b) => a + b, 0) + treeState.bottom.reduce((a, b) => a + b, 0);
  const dtpCode = `C${treeState.center};T${treeState.top.join(",")};M${treeState.middle.join(",")};B${treeState.bottom.join(",")}`;

  return (
    <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-6">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3 font-mono text-xs">
        <span className="font-bold text-cyan-300">DTP Alocados: {totalDtp} / 65</span>
        <button onClick={onResetTree} className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1">
          <RotateCcw className="w-3 h-3" /> Zerar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-zinc-950 border border-red-500/30 space-y-2">
          <span className="font-bold text-red-400 block">Eixo Superior (Top 1-4)</span>
          <div className="grid grid-cols-4 gap-1">
            {treeState.top.map((v, i) => (
              <input
                key={i}
                type="number"
                min="0"
                max="5"
                value={v}
                onChange={(e) => {
                  const arr = [...treeState.top];
                  arr[i] = Math.min(5, Math.max(0, Number(e.target.value)));
                  onTreeChange({ ...treeState, top: arr });
                }}
                className="bg-zinc-900 border border-zinc-700 rounded text-center py-1 text-red-300 font-bold"
              />
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-950 border border-amber-500/30 space-y-2">
          <div className="flex justify-between items-center pb-1 border-b border-zinc-800">
            <span className="font-bold text-emerald-400">Centro (C1)</span>
            <input
              type="number"
              min="1"
              max="5"
              value={treeState.center}
              onChange={(e) => onTreeChange({ ...treeState, center: Math.min(5, Math.max(1, Number(e.target.value))) })}
              className="w-12 bg-zinc-900 border border-zinc-700 rounded text-center py-0.5 text-emerald-300 font-bold"
            />
          </div>
          <span className="font-bold text-amber-400 block">Eixo Central (Middle 1-4)</span>
          <div className="grid grid-cols-4 gap-1">
            {treeState.middle.map((v, i) => (
              <input
                key={i}
                type="number"
                min="0"
                max="5"
                value={v}
                onChange={(e) => {
                  const arr = [...treeState.middle];
                  arr[i] = Math.min(5, Math.max(0, Number(e.target.value)));
                  onTreeChange({ ...treeState, middle: arr });
                }}
                className="bg-zinc-900 border border-zinc-700 rounded text-center py-1 text-amber-300 font-bold"
              />
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-950 border border-blue-500/30 space-y-2">
          <span className="font-bold text-blue-400 block">Eixo Inferior (Bottom 1-4)</span>
          <div className="grid grid-cols-4 gap-1">
            {treeState.bottom.map((v, i) => (
              <input
                key={i}
                type="number"
                min="0"
                max="5"
                value={v}
                onChange={(e) => {
                  const arr = [...treeState.bottom];
                  arr[i] = Math.min(5, Math.max(0, Number(e.target.value)));
                  onTreeChange({ ...treeState, bottom: arr });
                }}
                className="bg-zinc-900 border border-zinc-700 rounded text-center py-1 text-blue-300 font-bold"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-zinc-950 border border-cyan-500/30 flex items-center justify-between gap-3">
        <div className="font-mono text-xs text-cyan-300">{dtpCode}</div>
        <button
          onClick={() => onCopyLoadout(dtpCode)}
          className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shrink-0"
        >
          Copiar Loadout
        </button>
      </div>
    </div>
  );
}