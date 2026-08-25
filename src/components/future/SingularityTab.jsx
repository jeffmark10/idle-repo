import React, { useMemo } from "react";
import { ArrowUpCircle } from "lucide-react";
import StatCard from "../ui/StatCard";
import { formatScientific } from "../../utils/numberParser";

export default function SingularityTab({ nodes, onUpgradeNode, onAscendNode }) {
  const totalAtomsMultiplier = useMemo(() => {
    return nodes.reduce((acc, n) => {
      const ascMult = Math.pow(2.5, n.asc);
      return acc + n.level * n.baseBonus * ascMult;
    }, 0);
  }, [nodes]);

  return (
    <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4 font-mono text-xs">
      <StatCard label="Bônus Atômico Total Acumulado" value={`+${formatScientific(totalAtomsMultiplier)}%`} highlight={true} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {nodes.map((node) => {
          const isMax = node.level === 10;
          const currentBonus = node.level * node.baseBonus * Math.pow(2.5, node.asc);

          return (
            <div key={node.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="flex justify-between text-zinc-400 text-[10px]">
                  <span>Nó #{node.id}</span>
                  <span className="text-violet-300 font-bold">
                    Nv {node.level}/10 {node.asc > 0 ? `(Asc ${node.asc})` : ""}
                  </span>
                </div>
                <div className="font-bold text-sm text-white font-sans mt-0.5">{node.name}</div>
                <div className="text-[11px] text-zinc-400 font-sans mt-1">{node.desc}</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">
                  Bônus Atual: +{formatScientific(currentBonus)}%
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  disabled={isMax}
                  onClick={() => onUpgradeNode(node.id)}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                    isMax ? "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed" : "bg-violet-600 text-white"
                  }`}
                >
                  {isMax ? "Máximo" : "Subir Nível"}
                </button>
                {isMax && (
                  <button
                    onClick={() => onAscendNode(node.id)}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500 font-bold flex items-center gap-1"
                  >
                    <ArrowUpCircle className="w-3.5 h-3.5" /> Ascender
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}