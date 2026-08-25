import React, { useState, useMemo } from "react";
import { 
  Trophy, Sparkles, Check, Settings, 
  Clock, GitBranch, Cpu, Edit3
} from "lucide-react";
import StatCard from "../ui/StatCard";
import { INFINITY_CHALLENGES } from "../../data/gameData";
import { INFINITY_FORMULAS } from "../../data/gameEngine";
import { parseIncrementalNumber, formatScientific } from "../../utils/numberParser";
import { useGame } from "../../context/GameContext";

const INFINITY_TREE_PATH = [
  { step: 1, id: "[1;1]", name: "Autocompra de Cores", cost: "1 IP" },
  { step: 2, id: "[2;2]", name: "Autocompra de Ascensões", cost: "1 IP" },
  { step: 3, id: "[3;1]", name: "Aceleração de Voltas", cost: "1 IP" },
  { step: 4, id: "[4;1]", name: "Multiplicador de Velocidade", cost: "2 IP" },
  { step: 5, id: "[5;3]", name: "Auto Prestígio (0 - 1000 - 0)", cost: "3 IP" },
  { step: 6, id: "[5;2]", name: "Escalonamento de Multiplicador", cost: "3 IP" },
  { step: 7, id: "[6;1]", name: "Potência de Revolução", cost: "5 IP" },
  { step: 8, id: "[5;1]", name: "Aumento de P.Mult", cost: "3 IP" },
  { step: 9, id: "[6;2]", name: "Eficiência de Cores", cost: "5 IP" },
  { step: 10, id: "[2;1]", name: "Caixa de Expoente", cost: "1 IP" },
  { step: 11, id: "[7;1]", name: "Desbloqueio de Desafios (IC1-9)", cost: "10 IP" },
  { step: 12, id: "[8;3]", name: "Impulso de Ascensão", cost: "15 IP" },
  { step: 13, id: "[8;1]", name: "Poder de Prestígio II", cost: "15 IP" },
  { step: 14, id: "[8;2]", name: "Fluxo de Energia", cost: "15 IP" },
  { step: 15, id: "[9;2]", name: "Força de Promoção", cost: "25 IP" },
  { step: 16, id: "[9;1]", name: "Velocidade de Promoção", cost: "25 IP" },
  { step: 17, id: "[10;1]", name: "Auto Promoção", cost: "50 IP" },
  { step: 18, id: "[11;1]", name: "Escalonador IP Base", cost: "100 IP" },
  { step: 19, id: "[11;2]", name: "Renda de Geradores", cost: "100 IP" },
  { step: 20, id: "[12;1]", name: "Sinergia de Infinitos", cost: "250 IP" },
  { step: 21, id: "[13;1]", name: "Desbloqueio Coluna 14", cost: "500 IP" },
  { step: 22, id: "[14;1]", name: "Poder Atômico I", cost: "1k IP" },
  { step: 23, id: "[14;2]", name: "GP Expoente ^0.666 Booster", cost: "1k IP" },
  { step: 24, id: "[15;1]", name: "Auto Infinity", cost: "2.5k IP" },
  { step: 25, id: "[16;1]", name: "Multiplicador de Vácuo", cost: "10k IP" },
  { step: 26, id: "[15;2]", name: "Escala por Tempo de Desafio I", cost: "5k IP" },
  { step: 27, id: "[16;2]", name: "Escala por Tempo de Desafio II", cost: "10k IP" },
  { step: 28, id: "[15;3]", name: "Cartas de Desafio", cost: "5k IP" },
  { step: 29, id: "[15;4]", name: "Cartas Mágicas", cost: "5k IP" },
  { step: 30, id: "[16;3]", name: "Força de Desafio III", cost: "10k IP" },
  { step: 31, id: "[17;3]", name: "Horizonte de Eventos", cost: "50k IP" },
  { step: 32, id: "[17;2]", name: "Caixa Quântica", cost: "50k IP" },
  { step: 33, id: "[17;1]", name: "Vórtice Temporal (Marco e3080)", cost: "50k IP" },
  { step: 34, id: "[18;3]", name: "Rede de Plasma", cost: "250k IP" },
  { step: 35, id: "[18;2]", name: "Descarga Elétrica", cost: "250k IP" },
  { step: 36, id: "[18;1]", name: "Ganho Passivo de Infinitos", cost: "250k IP" },
  { step: 37, id: "[19;3]", name: "Prisma Cósmico (Reduz Desafios)", cost: "1M IP" },
  { step: 38, id: "[19;1]", name: "GP Booster Avançado", cost: "1M IP" },
  { step: 39, id: "[19;2]", name: "Coluna de Alta Tensão", cost: "1M IP" },
  { step: 40, id: "[20;1]", name: "Super Carga Cósmica", cost: "1e21 IP" },
  { step: 41, id: "[20;2]", name: "GP Booster Final", cost: "1e27 IP" }
];

export default function InfinityTab() {
  const { gameState, updateStat, toggleTask } = useGame();
  const [subPage, setSubPage] = useState("start");

  const starCount = gameState.stats.stars;
  const starBasePurchases = gameState.stats.starBaseUpgrades;
  const checkedTasks = gameState.completedTasks;

  const [starCountInput, setStarCountInput] = useState(String(starCount));
  const [starBaseInput, setStarBaseInput] = useState(String(starBasePurchases));

  const parsedStarCount = useMemo(() => {
    const res = parseIncrementalNumber(starCountInput);
    return res.isValid ? Math.max(0, res.value) : Number(starCount) || 0;
  }, [starCountInput, starCount]);

  const parsedStarBase = useMemo(() => {
    const res = parseIncrementalNumber(starBaseInput);
    return res.isValid ? Math.max(0, res.value) : Number(starBasePurchases) || 0;
  }, [starBaseInput, starBasePurchases]);

  // Fórmulas Centrais de Poeira Estelar
  const { base: starBase, stardustGain, genMult: generatorMult } = useMemo(() => {
    return INFINITY_FORMULAS.calcStardust(parsedStarCount, parsedStarBase);
  }, [parsedStarCount, parsedStarBase]);

  const updateStarCount = (val) => {
    const clean = String(val);
    setStarCountInput(clean);
    const parsed = parseIncrementalNumber(clean);
    if (parsed.isValid) {
      updateStat("stars", parsed.value);
    }
  };

  const updateStarBase = (val) => {
    const clean = String(val);
    setStarBaseInput(clean);
    const parsed = parseIncrementalNumber(clean);
    if (parsed.isValid) {
      updateStat("starBaseUpgrades", parsed.value);
    }
  };

  return (
    <div className="space-y-6">
      {/* Menu Superior de Subpáginas */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-x-auto scrollbar-none font-mono text-xs">
        {[
          { id: "start", label: "1. Começando & Rota de Upgrades", icon: GitBranch },
          { id: "post", label: "2. Automação & Conquista #029", icon: Settings },
          { id: "challenges", label: "3. Desafios (IC1 a IC9)", icon: Trophy },
          { id: "break", label: "4. Quebra, Long Runs & Estrelas", icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = subPage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubPage(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all shrink-0 flex items-center gap-2 ${
                isActive
                  ? "bg-purple-600 text-white shadow-md shadow-purple-900/30"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. COMEÇANDO & ROTA */}
      {subPage === "start" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30">
            <span className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">Infinity • Página 1 de 4</span>
            <h2 className="text-xl font-bold text-white mt-1">Primeiro Infinito & Rota Ótima da Árvore</h2>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              O primeiro Infinito exige <strong>1.79e308 de Pontuação (Score ⵙ)</strong> e cerca de <strong>1e42 (1 TDC) de Prestígio</strong> antes do salto final.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-purple-400" /> Ordem Sequencial da Árvore de Upgrades (1 a 41)
              </h3>
              <div className="max-h-96 overflow-y-auto space-y-1.5 pr-1 font-mono text-xs">
                {INFINITY_TREE_PATH.map((u) => (
                  <div key={u.step} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-purple-950 border border-purple-500/40 text-purple-300 font-bold text-center leading-6 text-[11px]">
                        {u.step}
                      </span>
                      <strong className="text-zinc-200">{u.id}</strong>
                      <span className="text-zinc-400 font-sans text-[11px]">{u.name}</span>
                    </div>
                    <span className="text-[11px] text-zinc-500">{u.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4 text-xs text-zinc-300">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" /> Como Funcionam os Geradores (GP)
              </h3>
              <p className="text-zinc-400 leading-relaxed font-sans">
                O <strong>Gerador 1 (G1)</strong> produz Potência do Gerador (GP), que por padrão é elevado a <strong>^0.666 (2/3)</strong> e multiplica o ganho de todas as cores:
              </p>

              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 font-mono text-[11px] space-y-1 text-zinc-300">
                <div>• GP = 16 → 16^0.666 ≈ <strong>6.35x de Multiplicador</strong></div>
                <div>• Se o ganho base era 30 Red Mult: 30 × 6.35 ≈ <strong>190 Mult</strong></div>
                <div>• Cada compra de gerador multiplica seu intervalo em <strong>2x</strong>.</div>
                <div>• Limite máximo do Multiplicador de Geradores: <strong>1e1.000</strong>.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. AUTOMAÇÃO & CONQUISTA #029 */}
      {subPage === "post" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30">
            <span className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">Infinity • Página 2 de 4</span>
            <h2 className="text-xl font-bold text-white mt-1">Configuração de Automação & Conquista #029</h2>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Configure suas automações para loops limpos e siga o passo a passo milimétrico para desbloquear a Conquista #029 ("Ao Contrário").
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-emerald-400" /> Configuração Oficial de Automações
              </h3>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">Autocompra e Ascensões:</span>
                  <span className="text-zinc-300">Tudo ativado em 100%.</span>
                </div>

                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">Automatizar Prestígio:</span>
                  <span className="text-zinc-300">Sequência: <strong>0 - 1000 - 0</strong> (ou 1e6 nas runs longas)</span>
                </div>

                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
                  <span className="text-emerald-400 font-bold block">Automatizar Promover (Ordem Exata):</span>
                  <div className="space-y-1 text-zinc-300">
                    <div>#1 Promoção 2 (Voltas/s): <strong>+60 Nv. | 0 s</strong></div>
                    <div>#2 Promoção 1 (Mult Gain): <strong>+60 Nv. | 0 s</strong></div>
                    <div>#3 Promoção 3 (Ascensão): <strong>+60 Nv. | 0 s</strong></div>
                    <div>#4 Promoção 4 (Poder): <strong>+60 Nv. | 0 s</strong></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" /> Guia Exato da Conquista #029
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-500/40 text-amber-300">
                  Crítica p/ Mid-Game
                </span>
              </div>

              <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-xs text-amber-200 space-y-1">
                <strong>Requisitos Obrigatórios:</strong>
                <div>• Cerca de 3e8 (300M) de Prestígio e Promover 2 com 3x de voltas.</div>
                <div>• <strong>Desligue TODAS as automações</strong> (apenas o Branco pode ficar ligado).</div>
                <div>• Compre devagar para <strong>NÃO ultrapassar</strong> nenhum nível alvo e <strong>NÃO ascenda o Rosa</strong>.</div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs text-zinc-300">
                  <thead className="border-b border-zinc-800 text-zinc-500 uppercase">
                    <tr>
                      <th className="py-1.5">Cor</th>
                      <th className="py-1.5">Nível Alvo Exato</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    <tr><td className="py-1 text-red-400 font-bold">Vermelho</td><td>5</td></tr>
                    <tr><td className="py-1 text-orange-400 font-bold">Laranja</td><td>12</td></tr>
                    <tr><td className="py-1 text-yellow-400 font-bold">Amarelo</td><td>19</td></tr>
                    <tr><td className="py-1 text-emerald-400 font-bold">Verde</td><td>41</td></tr>
                    <tr><td className="py-1 text-teal-400 font-bold">Turquesa</td><td>52</td></tr>
                    <tr><td className="py-1 text-cyan-400 font-bold">Ciano</td><td>63</td></tr>
                    <tr><td className="py-1 text-blue-400 font-bold">Azul</td><td>74</td></tr>
                    <tr><td className="py-1 text-purple-400 font-bold">Roxo</td><td>85</td></tr>
                    <tr><td className="py-1 text-pink-400 font-bold">Rosa</td><td>100 (⚠️ NÃO ascender!)</td></tr>
                    <tr><td className="py-1 text-white font-bold">Branco</td><td>Máximo Possível</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. DESAFIOS (IC1 A IC9) */}
      {subPage === "challenges" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30">
            <span className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">Infinity • Página 3 de 4</span>
            <h2 className="text-xl font-bold text-white mt-1">Desafios do Infinito (IC1 a IC9)</h2>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Os desafios são liberados após comprar o upgrade <strong>7;1</strong> da árvore. Cada desafio concluído concede <strong>+1x no ganho total de IP</strong> (+10x no total).
            </p>
          </div>

          <div className="space-y-3">
            {INFINITY_CHALLENGES.map((ic) => {
              const isDone = !!checkedTasks[ic.id];
              return (
                <button
                  key={ic.id}
                  role="checkbox"
                  aria-checked={isDone}
                  onClick={() => toggleTask(ic.id)}
                  className={`w-full text-left p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all focus:outline-none ${
                    isDone
                      ? "bg-purple-950/30 border-purple-500/40 text-zinc-400"
                      : "bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center border shrink-0 ${
                      isDone ? "bg-purple-600 border-purple-500 text-white" : "border-zinc-700 bg-zinc-900"
                    }`}>
                      {isDone && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className={`font-bold text-sm ${isDone ? "line-through opacity-70" : "text-white"}`}>
                        {ic.name}
                      </div>
                      <div className="text-xs text-red-400/90 mt-0.5">Penalidade: {ic.penalty}</div>
                      <div className="text-xs text-emerald-400">Recompensa: {ic.reward}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 shrink-0">
                    {isDone ? "Concluído" : "Pendente"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. POEIRA ESTELAR & SIMULADOR */}
      {subPage === "break" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30">
            <span className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">
              Infinity • Página 4 de 4
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              Quebrando o Infinito, Long Runs & Estrelas
            </h2>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Ao atingir <strong>1e3080 de Score</strong>, a barra de 10x IP enche. A cada <strong>1e308 adicional</strong>, todo o ganho de IP da run é multiplicado por 10x.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" /> Roteiro de Long Runs
                </h3>
                <div className="space-y-1.5 font-mono text-[11px] text-zinc-300">
                  <div>• Rumo à Coluna 17: Soma dos desafios &lt; 5 min. Auto Prestígio em 1e6.</div>
                  <div>• Coluna 18: Soma dos desafios ~40s. Farm de 500B (5e11) IP.</div>
                  <div>• Coluna 19 & G5: Soma dos desafios &lt; 30s. Runs longas de 5T a 20T IP.</div>
                  <div>• 1ª Estrela ⭐: Junte exatamente 2e33 (2 Dc) IP antes de resetar.</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-b from-purple-950/30 via-zinc-900/60 to-zinc-950 border-2 border-purple-500/40 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" /> Simulador de Poeira Estelar
                </h3>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  SD Real-Time
                </span>
              </div>

              <div className="space-y-5 font-mono">
                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
                  <div className="flex justify-between items-center text-xs sm:text-sm text-zinc-300">
                    <label htmlFor="starCountInputEl" className="font-bold flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5 text-purple-400" /> Estrelas Compradas:
                    </label>
                    <span className="text-xs text-zinc-400 font-sans">
                      Valor: <strong className="text-purple-300 font-mono">{formatScientific(parsedStarCount)}</strong>
                    </span>
                  </div>

                  <input
                    id="starCountInputEl"
                    type="text"
                    value={starCountInput}
                    onChange={(e) => updateStarCount(e.target.value)}
                    className="w-full bg-zinc-900 border border-purple-500/40 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none"
                  />

                  <div className="flex gap-1.5 flex-wrap pt-1">
                    {[1, 5, 10, 20, 50, 100, 500, "1k"].map((v) => (
                      <button
                        key={v}
                        onClick={() => updateStarCount(v === "1k" ? 1000 : v)}
                        className="px-2 py-1 rounded-lg bg-zinc-900 hover:bg-purple-900/40 text-[10px] text-zinc-300 border border-zinc-800 transition-colors"
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
                  <div className="flex justify-between items-center text-xs sm:text-sm text-zinc-300">
                    <label htmlFor="starBaseInputEl" className="font-bold flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5 text-purple-400" /> Upgrades de Base (+0.275/nv):
                    </label>
                    <span className="text-xs text-zinc-400 font-sans">
                      Base: <strong className="text-purple-300 font-mono">{starBase.toFixed(3)}</strong>
                    </span>
                  </div>

                  <input
                    id="starBaseInputEl"
                    type="text"
                    value={starBaseInput}
                    onChange={(e) => updateStarBase(e.target.value)}
                    className="w-full bg-zinc-900 border border-purple-500/40 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 font-mono">
                <div className="p-4 rounded-2xl bg-zinc-950 border border-purple-500/30 flex items-center justify-between shadow-inner">
                  <span className="text-xs sm:text-sm text-zinc-400 font-bold">Ganho de SD Estimado:</span>
                  <strong className="text-base sm:text-xl text-purple-300 font-black">
                    {formatScientific(stardustGain)}
                  </strong>
                </div>
                <div className="p-4 rounded-2xl bg-purple-950/40 border-2 border-emerald-500/50 flex items-center justify-between shadow-lg shadow-emerald-950/20">
                  <span className="text-xs sm:text-sm text-zinc-200 font-bold">Mult. Geradores (GP):</span>
                  <strong className="text-lg sm:text-2xl text-emerald-400 font-black">
                    x{formatScientific(generatorMult)}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}