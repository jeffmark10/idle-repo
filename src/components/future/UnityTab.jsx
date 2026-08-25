import React, { useMemo } from "react";
import { Dices, Orbit } from "lucide-react";
import StatCard from "../ui/StatCard";
import { PLANET_PRESETS } from "../../data/gameData";
import { parseIncrementalNumber } from "../../utils/numberParser";

export default function UnityTab({ luckInput, onLuckChange, selectedPreset, onPresetChange }) {
  const parsedLuck = useMemo(() => parseIncrementalNumber(luckInput), [luckInput]);
  const zLuck = useMemo(() => {
    const l = parsedLuck.value;
    return l < 18 ? Math.max(1, l) : Math.pow(l / 18, 0.3) * 18;
  }, [parsedLuck.value]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-5 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Dices className="w-4 h-4 text-amber-400" /> Sorte Zodiacal (Softcap $\ge 18$)
        </h2>
        <div>
          <label htmlFor="luckInputVal" className="text-xs text-zinc-400 font-mono block">
            Sorte Bruta do Jogador:
          </label>
          <input
            id="luckInputVal"
            type="text"
            value={luckInput}
            onChange={(e) => onLuckChange(e.target.value)}
            className={`w-full mt-1 bg-zinc-950 border rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none ${
              parsedLuck.isValid ? "border-zinc-700 focus:border-amber-400" : "border-red-500"
            }`}
          />
        </div>
        <StatCard label="Sorte Efetiva" value={zLuck.toFixed(2)} color="text-amber-300" />
      </div>

      <div className="lg:col-span-7 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4">
        <div className="flex justify-between items-center">
          <label htmlFor="planetPresetSelect" className="text-sm font-bold text-white flex items-center gap-2">
            <Orbit className="w-4 h-4 text-amber-400" /> Presets Oficiais de Planetas
          </label>
          <select
            id="planetPresetSelect"
            value={selectedPreset}
            onChange={(e) => onPresetChange(Number(e.target.value))}
            className="bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white p-1.5 font-mono"
          >
            {PLANET_PRESETS.map((p, i) => (
              <option key={i} value={i}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 font-mono text-xs">
          {Object.entries(PLANET_PRESETS[selectedPreset].planets).map(([planet, sign]) => (
            <div key={planet} className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
              <div className="text-[10px] text-zinc-400">{planet}</div>
              <div className="font-bold text-amber-300 mt-0.5">{sign}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}