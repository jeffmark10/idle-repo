import React, { useState } from "react";
import { 
  Network, Sparkles, RefreshCw, Copy, 
  CheckCheck, Table, Compass, AlertCircle 
} from "lucide-react";
import { useGame } from "../../context/GameContext";

const DILATION_STEP_BY_STEP = [
  { dtp: 1, pick: "C1", code: "C1;T0,0,0,0;M0,0,0,0;B0,0,0,0", ap: "—", sn: "44", et: "50k" },
  { dtp: 2, pick: "M1", code: "C1;T0,0,0,0;M1,0,0,0;B0,0,0,0", ap: "6.5k", sn: "46", et: "—" },
  { dtp: 3, pick: "Respec", code: "C1;T1,1,0,0;M0,0,0,0;B0,0,0,0", ap: "—", sn: "—", et: "—" },
  { dtp: 4, pick: "T3", code: "C1;T1,1,1,0;M0,0,0,0;B0,0,0,0", ap: "—", sn: "—", et: "—" },
  { dtp: 5, pick: "T3", code: "C1;T1,1,2,0;M0,0,0,0;B0,0,0,0", ap: "10k", sn: "80", et: "—" },
  { dtp: 5, pick: "Respec", code: "C1;T0,0,0,0;M0,0,0,0;B1,1,2,0", ap: "—", sn: "—", et: "—" },
  { dtp: 6, pick: "Respec", code: "C1;T1,0,0,0;M0,0,0,0;B1,1,2,0", ap: "—", sn: "—", et: "—" },
  { dtp: 7, pick: "T2", code: "C1;T1,1,0,0;M0,0,0,0;B1,1,2,0", ap: "—", sn: "—", et: "—" },
  { dtp: 8, pick: "Respec SN", code: "C1;T1,1,5,0;M0,0,0,0;B0,0,0,0", ap: "—", sn: "105", et: "—" },
  { dtp: 8, pick: "Respec AP", code: "C1;T1,1,0,0;M0,0,0,0;B1,1,3,0", ap: "25k", sn: "—", et: "—" },
  { dtp: 9, pick: "B3", code: "C1;T1,1,0,0;M0,0,0,0;B1,1,4,0", ap: "—", sn: "—", et: "—" },
  { dtp: 10, pick: "B3", code: "C1;T1,1,0,0;M0,0,0,0;B1,1,5,0", ap: "—", sn: "—", et: "—" },
  { dtp: 11, pick: "M1", code: "C1;T1,1,0,0;M1,0,0,0;B1,1,5,0", ap: "30k", sn: "—", et: "—" },
  { dtp: 12, pick: "M1", code: "C1;T1,1,0,0;M3,0,0,0;B1,1,4,0", ap: "32k", sn: "—", et: "—" },
  { dtp: 12, pick: "Respec", code: "C5;T1,1,0,0;M0,0,0,0;B1,1,3,0", ap: "—", sn: "—", et: "—" },
  { dtp: 13, pick: "Farm ET", code: "C1;T0,0,0,0;M1,5,1,5;B0,0,0,0", ap: "—", sn: "—", et: "1e9" },
  { dtp: 13, pick: "Respec", code: "C5;T1,1,0,0;M0,0,0,0;B1,1,4,0", ap: "—", sn: "—", et: "—" },
  { dtp: 14, pick: "Respec", code: "C5;T1,1,1,1;M1,0,0,0;B1,1,1,1", ap: "38k", sn: "—", et: "—" },
  { dtp: 15, pick: "Respec", code: "C1;T1,1,1,5;M0,0,0,0;B1,5,0,0", ap: "44.5k", sn: "—", et: "—" },
  { dtp: 15, pick: "Respec", code: "C5;T1,1,1,1;M1,0,0,0;B1,1,2,1", ap: "—", sn: "—", et: "—" },
  { dtp: 16, pick: "Respec SN", code: "C1;T1,1,5,0;M0,0,0,0;B1,1,1,5", ap: "—", sn: "120", et: "—" },
  { dtp: 16, pick: "Respec AP", code: "C4;T0,0,0,0;M1,1,5,5;B0,0,0,0", ap: "130k", sn: "—", et: "—" },
  { dtp: 17, pick: "C1", code: "C5;T0,0,0,0;M1,1,5,5;B0,0,0,0", ap: "—", sn: "—", et: "—" },
  { dtp: 18, pick: "Respec AP", code: "C1;T1,1,1,5;M0,0,0,0;B4,5,0,0", ap: "60k", sn: "—", et: "—" },
  { dtp: 18, pick: "Respec SN", code: "C1;T1,1,5,2;M0,0,0,0;B1,1,1,5", ap: "—", sn: "128", et: "—" },
  { dtp: 18, pick: "Respec", code: "C5;T0,0,0,0;M2,1,5,5;B0,0,0,0", ap: "—", sn: "—", et: "—" },
  { dtp: 19, pick: "M1", code: "C5;T0,0,0,0;M3,1,5,5;B0,0,0,0", ap: "—", sn: "—", et: "—" },
  { dtp: 20, pick: "M1", code: "C5;T0,0,0,0;M4,1,5,5;B0,0,0,0", ap: "—", sn: "—", et: "—" },
  { dtp: 21, pick: "M1", code: "C5;T0,0,0,0;M5,1,5,5;B0,0,0,0", ap: "—", sn: "—", et: "—" },
  { dtp: 22, pick: "Respec SN", code: "C1;T1,1,5,5;M0,0,0,0;B1,2,1,5", ap: "—", sn: "149", et: "—" },
  { dtp: 22, pick: "Respec", code: "C4;T1,1,0,0;M5,1,5,5;B0,0,0,0", ap: "—", sn: "—", et: "—" },
  { dtp: 23, pick: "C1", code: "C5;T1,1,0,0;M5,1,5,5;B0,0,0,0", ap: "—", sn: "—", et: "—" },
  { dtp: 25, pick: "Respec", code: "C5;T0,0,0,0;M5,1,5,5;B1,1,2,0", ap: "216k", sn: "—", et: "—" },
  { dtp: 26, pick: "B3", code: "C5;T0,0,0,0;M5,1,5,5;B1,1,3,0", ap: "—", sn: "—", et: "—" },
  { dtp: 27, pick: "B3", code: "C5;T0,0,0,0;M5,1,5,5;B1,1,4,0", ap: "—", sn: "—", et: "—" },
  { dtp: 28, pick: "B3", code: "C5;T0,0,0,0;M5,1,5,5;B1,1,5,0", ap: "—", sn: "—", et: "—" },
  { dtp: 29, pick: "Respec", code: "C5;T1,1,0,0;M5,1,5,5;B1,1,4,0", ap: "221k", sn: "—", et: "—" },
  { dtp: 30, pick: "Respec", code: "C1;T1,1,1,5;M1,1,5,5;B1,2,1,5", ap: "250k", sn: "—", et: "—" },
  { dtp: 30, pick: "Respec", code: "C5;T1,1,0,0;M5,1,5,5;B1,1,5,0", ap: "—", sn: "—", et: "—" },
  { dtp: 31, pick: "Respec", code: "C5;T1,1,1,1;M5,1,5,5;B1,1,4,0", ap: "—", sn: "—", et: "—" },
  { dtp: 32, pick: "Respec", code: "C1;T1,1,1,5;M1,1,5,5;B1,4,1,5", ap: "283k", sn: "—", et: "—" },
  { dtp: 32, pick: "Respec", code: "C5;T1,1,1,1;M5,1,5,5;B1,1,5,0", ap: "—", sn: "—", et: "—" },
  { dtp: 33, pick: "T4", code: "C5;T1,1,1,2;M5,1,5,5;B1,1,5,0", ap: "—", sn: "—", et: "—" },
  { dtp: 34, pick: "T4", code: "C5;T1,1,1,3;M5,1,5,5;B1,1,5,0", ap: "—", sn: "—", et: "—" },
  { dtp: 35, pick: "T4", code: "C5;T1,1,1,4;M5,1,5,5;B1,1,5,0", ap: "—", sn: "—", et: "—" },
  { dtp: 36, pick: "T4", code: "C5;T1,1,1,5;M5,1,5,5;B1,1,5,0", ap: "—", sn: "—", et: "—" },
  { dtp: 37, pick: "Respec", code: "C1;T1,1,1,5;M1,1,5,5;B5,5,1,5", ap: "330k", sn: "—", et: "—" },
  { dtp: 37, pick: "Respec", code: "C5;T1,1,1,5;M5,1,5,5;B1,1,5,1", ap: "—", sn: "—", et: "—" },
  { dtp: 40, pick: "Respec", code: "C4;T1,1,1,5;M1,1,5,5;B5,5,1,5", ap: "—", sn: "—", et: "—" }
];

const ENDGAME_LOADOUTS = [
  { name: "Supernova Final", code: "C1;T1,1,5,5;M1,1,5,5;B5,5,1,5", desc: "Redução máxima do custo de pontuação das Supernovas." },
  { name: "Score / Animal Points", code: "C1;T1,1,1,5;M1,5,5,5;B5,5,1,5", desc: "Multiplicadores para compra em massa de AP no Zoológico." },
  { name: "Dilation Points (DP)", code: "C5;T1,1,1,5;M5,1,5,5;B1,1,5,5", desc: "Produção máxima de DP/s para compras na Árvore." },
  { name: "Final 57", code: "C5;T5,5,1,5;M5,1,5,5;B5,5,5,5", desc: "Build completa com todos os nós de maior magnitude ativados." }
];

const DILATION_TREE_UPGRADES = [
  { id: "C-1", name: "Centro (0)", branch: "Centro", max: 5, desc: "Desbloqueia os 3 ramos principais (Top, Mid, Bot)." },
  { id: "T-1", name: "Top 1 (Vermelho)", branch: "Topo", max: 5, desc: "Fortalece a Melhoria de Dilatação 1 (DU1)." },
  { id: "T-2", name: "Top 2 (Vermelho)", branch: "Topo", max: 5, desc: "Amplificador de Pontuação Máxima em Dilatação." },
  { id: "T-3", name: "Top 3 (Vermelho)", branch: "Topo", max: 5, desc: "Supernovas: Reduz o requisito de pontuação das Supernovas." },
  { id: "T-4", name: "Top 4 (Vermelho)", branch: "Topo", max: 5, desc: "Sinergia: Fortalece nós do Topo (+30% c/ Ach 29 e 140)." },
  { id: "M-1", name: "Mid 1 (Amarelo)", branch: "Meio", max: 5, desc: "Fortalece a Melhoria de Dilatação 2 (DU2 - Renda DP)." },
  { id: "M-2", name: "Mid 2 (Amarelo)", branch: "Meio", max: 5, desc: "Aceleração de Voltas durante a Dilatação." },
  { id: "M-3", name: "Mid 3 (Amarelo)", branch: "Meio", max: 5, desc: "Supernovas: Multiplica os bônus obtidos por Supernovas." },
  { id: "M-4", name: "Mid 4 (Amarelo)", branch: "Meio", max: 5, desc: "Sinergia: Fortalece nós do Meio (+30% c/ Ach 29 e 140)." },
  { id: "B-1", name: "Bot 1 (Azul)", branch: "Fundo", max: 5, desc: "Fortalece a Melhoria de Dilatação 3 (DU3 - Níveis RP)." },
  { id: "B-2", name: "Bot 2 (Azul)", branch: "Fundo", max: 5, desc: "Eficiência de Geradores (GP) sob Dilatação." },
  { id: "B-3", name: "Bot 3 (Azul)", branch: "Fundo", max: 5, desc: "Supernovas concedem muito mais AP (Pontos de Animais)." },
  { id: "B-4", name: "Bot 4 (Azul)", branch: "Fundo", max: 5, desc: "Sinergia: Fortalece nós do Fundo (+30% c/ Ach 29 e 140)." }
];

export default function DilationTab() {
  const { gameState, updateDtpAllocation, applyDtpPreset, respecDilationTree } = useGame();
  const [copiedCode, setCopiedCode] = useState("");

  const dtpAllocations = gameState.dilationTreeAllocations;
  const totalDtpSpent = Object.values(dtpAllocations).reduce((a, b) => a + b, 0);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-zinc-900/70 to-zinc-950 border-2 border-cyan-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-4">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
              Camada 4 • Dilatação & Árvore de Habilidades (DTP)
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
              Árvore de Dilatação & Rota de Progressão
            </h1>
          </div>
          <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold w-fit">
            DTP Alocado: {totalDtpSpent}/65
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
          Desbloqueada após completar todos os <strong>50 Desafios da Eternidade</strong> e obter todos os <strong>81 Animais</strong>. O objetivo desta camada é alocar <strong>DTP</strong> para atingir <strong>1.08e2466 EP</strong> e desbloquear a <strong>Unidade (Unity)</strong>.
        </p>

        {/* Loadouts Finais */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-mono font-bold text-cyan-300 block">Loadouts Finais Rápidos:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 font-mono text-xs">
            {ENDGAME_LOADOUTS.map((p) => (
              <div key={p.name} className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-2">
                <div>
                  <strong className="text-cyan-300 block text-xs">{p.name}</strong>
                  <span className="text-[10px] text-zinc-500 font-sans">{p.desc}</span>
                </div>
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-800/60">
                  <button
                    onClick={() => applyDtpPreset(p.code)}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-200 text-[10px] font-bold transition-colors"
                  >
                    Carregar
                  </button>
                  <button
                    onClick={() => copyToClipboard(p.code, p.name)}
                    className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copiedCode === p.name ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedCode === p.name ? "Copiado" : "Copiar"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabela Passo a Passo Oficial (DTP 1 a 40+) */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Table className="w-4 h-4 text-cyan-400" /> Tabela Sequencial de Builds (DTP 1 a 40+)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-zinc-300">
            <thead className="border-b border-zinc-800 text-zinc-500 uppercase text-[10px]">
              <tr>
                <th className="py-2.5">DTP</th>
                <th className="py-2.5">Ação / Foco</th>
                <th className="py-2.5">Código do Loadout</th>
                <th className="py-2.5">Alvo AP</th>
                <th className="py-2.5">Alvo SN</th>
                <th className="py-2.5">Alvo Σ</th>
                <th className="py-2.5 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {DILATION_STEP_BY_STEP.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-2 font-bold text-cyan-400">{row.dtp}</td>
                  <td className="py-2 text-zinc-200 font-sans">{row.pick}</td>
                  <td className="py-2 text-zinc-400 text-[11px]">{row.code}</td>
                  <td className="py-2 text-purple-300">{row.ap}</td>
                  <td className="py-2 text-amber-300">{row.sn}</td>
                  <td className="py-2 text-indigo-300">{row.et}</td>
                  <td className="py-2 text-right">
                    <button
                      onClick={() => applyDtpPreset(row.code)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-950 hover:bg-cyan-950 border border-zinc-800 hover:border-cyan-500/40 text-cyan-300 text-[10px] font-bold transition-colors"
                    >
                      Usar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid Interativo de Upgrades da Árvore de Dilatação */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Network className="w-4 h-4 text-cyan-400" /> Alocador Interativo de DTP (13 DTUs)
          </h3>
          <button
            onClick={respecDilationTree}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono text-xs flex items-center gap-1.5 transition-colors font-bold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Respec DTP
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {DILATION_TREE_UPGRADES.map((dtu) => {
            const current = dtpAllocations[dtu.id] || 0;
            return (
              <div key={dtu.id} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-zinc-200 block">{dtu.name}</strong>
                    <span className="text-[10px] text-zinc-500 font-sans">{dtu.branch}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
                    {current}/{dtu.max}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">{dtu.desc}</p>
                <div className="flex gap-1.5 pt-1">
                  <button
                    onClick={() => updateDtpAllocation(dtu.id, -1)}
                    className="w-8 h-7 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateDtpAllocation(dtu.id, 1)}
                    className="flex-1 h-7 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/40 text-cyan-200 font-bold flex items-center justify-center transition-colors"
                  >
                    +1 DTP
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}