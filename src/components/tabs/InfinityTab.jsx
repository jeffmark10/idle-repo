import React, { useState, useMemo, useEffect } from "react";
import { 
  Trophy, Sparkles, Check, Settings, 
  Clock, GitBranch, Cpu, Edit3
} from "lucide-react";
import { INFINITY_CHALLENGES } from "../../data/gameData";
import { INFINITY_FORMULAS } from "../../data/gameEngine";
import { parseIncrementalNumber, formatScientific } from "../../utils/numberParser";
import { useGame } from "../../context/GameContext";

const INFINITY_TREE_PATH = [
  { step: 1, id: "INF_1_1", name: "[1;1] Autocompra de Cores", cost: "1 IP" },
  { step: 2, id: "INF_2_2", name: "[2;2] Autocompra de Ascensões", cost: "1 IP" },
  { step: 3, id: "INF_3_1", name: "[3;1] Aceleração de Voltas", cost: "1 IP" },
  { step: 4, id: "INF_4_1", name: "[4;1] Multiplicador de Velocidade", cost: "2 IP" },
  { step: 5, id: "INF_5_3", name: "[5;3] Auto Prestígio (0 - 1000 - 0)", cost: "3 IP" },
  { step: 6, id: "INF_5_2", name: "[5;2] Escalonamento de Multiplicador", cost: "3 IP" },
  { step: 7, id: "INF_6_1", name: "[6;1] Potência de Revolução", cost: "5 IP" },
  { step: 8, id: "INF_5_1", name: "[5;1] Aumento de P.Mult", cost: "3 IP" },
  { step: 9, id: "INF_6_2", name: "[6;2] Eficiência de Cores", cost: "5 IP" },
  { step: 10, id: "INF_2_1", name: "[2;1] Caixa de Expoente", cost: "1 IP" },
  { step: 11, id: "INF_7_1", name: "[7;1] Desbloqueio de Desafios (IC1-9)", cost: "10 IP" },
  { step: 12, id: "INF_8_3", name: "[8;3] Impulso de Ascensão", cost: "15 IP" },
  { step: 13, id: "INF_8_1", name: "[8;1] Poder de Prestígio II", cost: "15 IP" },
  { step: 14, id: "INF_8_2", name: "[8;2] Fluxo de Energia", cost: "15 IP" },
  { step: 15, id: "INF_9_2", name: "[9;2] Força de Promoção", cost: "25 IP" },
  { step: 16, id: "INF_9_1", name: "[9;1] Velocidade de Promoção", cost: "25 IP" },
  { step: 17, id: "INF_10_1", name: "[10;1] Auto Promoção", cost: "50 IP" },
  { step: 18, id: "INF_11_1", name: "[11;1] Escalonador IP Base", cost: "100 IP" },
  { step: 19, id: "INF_11_2", name: "[11;2] Renda de Geradores", cost: "100 IP" },
  { step: 20, id: "INF_12_1", name: "[12;1] Sinergia de Infinitos", cost: "250 IP" },
  { step: 21, id: "INF_13_1", name: "[13;1] Desbloqueio Coluna 14", cost: "500 IP" },
  { step: 22, id: "INF_14_1", name: "[14;1] Poder Atômico I", cost: "1k IP" },
  { step: 23, id: "INF_14_2", name: "[14;2] GP Expoente ^0.666 Booster", cost: "1k IP" },
  { step: 24, id: "INF_15_1", name: "[15;1] Auto Infinity", cost: "2.5k IP" },
  { step: 25, id: "INF_16_1", name: "[16;1] Multiplicador de Vácuo", cost: "10k IP" },
  { step: 26, id: "INF_15_2", name: "[15;2] Escala por Tempo de Desafio I", cost: "5k IP" },
  { step: 27, id: "INF_16_2", name: "[16;2] Escala por Tempo de Desafio II", cost: "10k IP" },
  { step: 28, id: "INF_15_3", name: "[15;3] Cartas de Desafio", cost: "5k IP" },
  { step: 29, id: "INF_15_4", name: "[15;4] Cartas Mágicas", cost: "5k IP" },
  { step: 30, id: "INF_16_3", name: "[16;3] Força de Desafio III", cost: "10k IP" },
  { step: 31, id: "INF_17_3", name: "[17;3] Horizonte de Eventos", cost: "50k IP" },
  { step: 32, id: "INF_17_2", name: "[17;2] Caixa Quântica", cost: "50k IP" },
  { step: 33, id: "INF_17_1", name: "[17;1] Vórtice Temporal (Marco e3080)", cost: "50k IP" },
  { step: 34, id: "INF_18_3", name: "[18;3] Rede de Plasma", cost: "250k IP" },
  { step: 35, id: "INF_18_2", name: "[18;2] Descarga Elétrica", cost: "250k IP" },
  { step: 36, id: "INF_18_1", name: "[18;1] Ganho Passivo de Infinitos", cost: "250k IP" },
  { step: 37, id: "INF_19_3", name: "[19;3] Prisma Cósmico (Reduz Desafios)", cost: "1M IP" },
  { step: 38, id: "INF_19_1", name: "[19;1] GP Booster Avançado", cost: "1M IP" },
  { step: 39, id: "INF_19_2", name: "[19;2] Coluna de Alta Tensão", cost: "1M IP" },
  { step: 40, id: "INF_20_1", name: "[20;1] Super Carga Cósmica", cost: "1e21 IP" },
  { step: 41, id: "INF_20_2", name: "[20;2] GP Booster Final", cost: "1e27 IP" }
];

export default function InfinityTab() {
  const { gameState, updateStat, toggleTask } = useGame();
  const [subPage, setSubPage] = useState("start");

  const starCount = gameState.stats.stars;
  const starBasePurchases = gameState.stats.starBaseUpgrades;
  const checkedTasks = gameState.completedTasks;

  const [starCountInput, setStarCountInput] = useState(String(starCount));
  const [starBaseInput, setStarBaseInput] = useState(String(starBasePurchases));

  useEffect(() => {
    setStarCountInput(String(starCount));
  }, [starCount]);

  useEffect(() => {
    setStarBaseInput(String(starBasePurchases));
  }, [starBasePurchases]);

  const parsedStarCount = useMemo(() => {
    const res = parseIncrementalNumber(starCountInput);
    return res.isValid ? Math.max(0, res.value) : Number(starCount) || 0;
  }, [starCountInput, starCount]);

  const parsedStarBase = useMemo(() => {
    const res = parseIncrementalNumber(starBaseInput);
    return res.isValid ? Math.max(0, res.value) : Number(starBasePurchases) || 0;
  }, [starBaseInput, starBasePurchases]);

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

      {subPage === "start" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30">
            <span className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">Infinity • Página 1 de 4</span>
            <h2 className="text-xl font-bold text-white mt-1">Primeiro Infinito & Rota Ótima da Árvore</h2>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              O primeiro Infinito exige <strong>1.79e308 de Pontuação (Score ⵙ)</strong> e cerca de <strong>1e42 (1 TDC) de Prestígio</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-purple-400" /> Checklist da Árvore de Upgrades (1 a 41)
              </h3>
              <div className="max-h-96 overflow-y-auto space-y-1.5 pr-1 font-mono text-xs">
                {INFINITY_TREE_PATH.map((u) => {
                  const isChecked = !!checkedTasks[u.id];
                  return (
                    <button
                      key={u.step}
                      role="checkbox"
                      aria-checked={isChecked}
                      onClick={() => toggleTask(u.id)}
                      className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-colors text-left ${
                        isChecked 
                          ? "bg-purple-950/30 border-purple-500/40 text-zinc-400" 
                          : "bg-zinc-950 border-zinc-800/80 text-zinc-200 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                          isChecked ? "bg-purple-600 border-purple-500 text-white" : "border-zinc-700 bg-zinc-900"
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className={`w-5 text-center font-bold text-[11px] ${isChecked ? "text-purple-400" : "text-zinc-500"}`}>
                          {u.step}
                        </span>
                        <span className={`font-sans text-[11px] ${isChecked ? "line-through opacity-70" : ""}`}>
                          {u.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono">{u.cost}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4 text-xs text-zinc-300">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" /> Como Funcionam os Geradores (GP)
              </h3>
              <p className="text-zinc-400 leading-relaxed font-sans">
                O <strong>Gerador 1 (G1)</strong> produz Potência do Gerador (GP), elevado a <strong>^0.666 (2/3)</strong>:
              </p>

              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 font-mono text-[11px] space-y-1 text-zinc-300">
                <div>• GP = 16 → 16^0.666 ≈ <strong>6.35x de Multiplicador</strong></div>
                <div>• Cada compra de gerador multiplica seu intervalo em <strong>2x</strong>.</div>
                <div>• Limite máximo do Multiplicador de Geradores: <strong>1e1.000</strong>.</div>
              </div>
            </div>
          </div>
        </div>
      )}

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

                  <input
                    type="range"
                    min="0"
                    max={Math.max(100, Math.min(1000, parsedStarCount > 100 ? parsedStarCount * 1.5 : 100))}
                    value={Math.min(1000, parsedStarCount)}
                    onChange={(e) => updateStarCount(Number(e.target.value))}
                    className="w-full h-2 rounded-lg bg-zinc-800 accent-purple-500 cursor-pointer mt-1"
                  />
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

                  <input
                    type="range"
                    min="0"
                    max={Math.max(50, Math.min(500, parsedStarBase > 50 ? parsedStarBase * 1.5 : 50))}
                    value={Math.min(500, parsedStarBase)}
                    onChange={(e) => updateStarBase(Number(e.target.value))}
                    className="w-full h-2 rounded-lg bg-zinc-800 accent-purple-500 cursor-pointer mt-1"
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