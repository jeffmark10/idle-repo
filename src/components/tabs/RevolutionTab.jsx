import React, { useState, useMemo } from "react";
import { 
  CircleDot, Calculator, Trophy, Gift, 
  ArrowUpCircle, ShoppingBag, Lightbulb, 
  Flag, Keyboard, Edit3, Zap, BookOpen 
} from "lucide-react";
import StatCard from "../ui/StatCard";
import { CIRCLES_DATA, DAILY_REWARDS_DATA } from "../../data/gameData";
import { PRESTIGE_FORMULAS } from "../../data/gameEngine";
import { parseIncrementalNumber, formatScientific } from "../../utils/numberParser";
import { calculateLeaderboardScore } from "../../utils/leaderboardMath";
import { useGame } from "../../context/GameContext";

export default function RevolutionTab() {
  const { gameState, updateStat } = useGame();
  const [subSection, setSubSection] = useState("overview");

  const score = gameState.stats.score;
  const parsedScore = useMemo(() => parseIncrementalNumber(score), [score]);
  
  // Controle de Nível de Promoção
  const promoLevel = gameState.stats.promoLevel;
  const [promoLevelInput, setPromoLevelInput] = useState(String(promoLevel));

  const parsedPromoLevel = useMemo(() => {
    const res = parseIncrementalNumber(promoLevelInput);
    return res.isValid ? Math.max(1, res.value) : promoLevel;
  }, [promoLevelInput, promoLevel]);

  // Fórmulas Centrais
  const pMult = useMemo(() => PRESTIGE_FORMULAS.calcPMult(parsedScore.value), [parsedScore.value]);
  const pExp = useMemo(() => PRESTIGE_FORMULAS.calcPExp(parsedScore.value), [parsedScore.value]);
  const promoXp = useMemo(() => PRESTIGE_FORMULAS.calcPromoXP(pMult), [pMult]);
  const { p1, p2, p3, p4 } = useMemo(() => PRESTIGE_FORMULAS.calcPromoPowers(parsedPromoLevel), [parsedPromoLevel]);

  // Sequência Diária (Streak)
  const [streakDay, setStreakDay] = useState(10);
  const streakBonus = Math.min(50, streakDay * 5);

  const calculatedLbScore = useMemo(() => {
    return calculateLeaderboardScore({
      maxScore: parsedScore.value,
      maxExponent: pExp,
      maxInfinites: 0,
      maxIP: 0,
      maxChallenges: 0,
      maxStars: 0,
      eternities: 0,
      maxEP: 0,
      maxAnimals: 0,
      maxLabLevel: 0,
      maxSupernova: 0,
      maxDP: 0,
      maxDTP: 0,
      maxUnities: 0,
      maxZodiacLevel: 0,
      maxTrialCount: 0,
      maxAttackLevel: 0
    });
  }, [parsedScore.value, pExp]);

  const handleScoreChange = (val) => {
    updateStat("score", val);
  };

  const updatePromoLevel = (val) => {
    const clean = String(val);
    setPromoLevelInput(clean);
    const parsed = parseIncrementalNumber(clean);
    if (parsed.isValid) {
      updateStat("promoLevel", parsed.value);
    }
  };

  return (
    <div className="space-y-6">
      {/* Menu Superior */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-x-auto scrollbar-none font-mono text-xs">
        {[
          { id: "overview", label: "1. Visão Geral & Guia", icon: BookOpen },
          { id: "calculator", label: "2. Círculos & Calculador de Prestígio", icon: Calculator },
          { id: "rewards", label: "3. Recompensas & Tabela de Líderes", icon: Gift },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = subSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubSection(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all shrink-0 flex items-center gap-2 ${
                isActive
                  ? "bg-red-600 text-white shadow-md shadow-red-900/30"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. VISÃO GERAL */}
      {subSection === "overview" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-red-950/40 via-zinc-900/70 to-zinc-950 border-2 border-red-500/30 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-red-500/20 pb-3">
              <div>
                <span className="text-xs font-mono uppercase text-red-400 font-bold tracking-wider">
                  Guia do Iniciante • Começando
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Primeiros Passos no Revolution Idle
                </h1>
              </div>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 w-fit">
                1º Infinito: ~12h
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Bem-vindo ao <strong>Revolution Idle</strong>! O início pode parecer gradual, mas as mecânicas se expandem conforme você avança. Seu primeiro Infinity exige <strong>1.79e308 de Pontuação</strong> e aproximadamente <strong>1e42 (1 TDC) de Prestígio</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                <span className="text-red-400 font-bold text-xs flex items-center gap-1.5">
                  <CircleDot className="w-3.5 h-3.5" /> Cores (Círculos)
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  10 círculos de produção. Vermelho é o mais rápido e Branco o mais lento. Desbloqueie novas cores comprando 5 níveis da anterior.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                <span className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
                  <ArrowUpCircle className="w-3.5 h-3.5" /> Ascensões
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Reseta o círculo para o nível 5, concede +10 no nível máximo e multiplica o Mult Gain por 10x.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                <span className="text-orange-400 font-bold text-xs flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" /> Prestígio (1e10 Score)
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Redefine cores e ascensões, concedendo P.Mult (multiplicador total) e P.Expoente (escala exponencial).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                <span className="text-purple-400 font-bold text-xs flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Promoções (1k P.Mult)
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Reseta tudo por bônus permanentes em 4 categorias essenciais (Mult Gain, Voltas/s, Ascensão e Poder).
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 text-xs">
                <Lightbulb className="w-4 h-4" /> Conquista Grátis
              </div>
              <p className="text-[11px] font-sans text-zinc-300">
                Abra a aba "Créditos" para liberar a Conquista #005 ("Verifique o Dev") e ganhar bônus multiplicador.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30 text-blue-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-blue-400 text-xs">
                <Flag className="w-4 h-4 text-blue-400" /> Ponto de Controle
              </div>
              <p className="text-[11px] font-sans text-zinc-300">
                Faça o 1º Prestígio em 10x-20x P.Mult. Nos seguintes, busque saltos multiplicadores de 100x a 1000x.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-xs">
                <Keyboard className="w-4 h-4 text-emerald-400" /> Atalhos Úteis
              </div>
              <p className="text-[11px] font-sans text-zinc-400">
                <strong className="text-white">B</strong>: Compra Cores | <strong className="text-white">P</strong>: Prestígio | <strong className="text-white">1-4</strong>: Promoções.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-purple-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-purple-400 text-xs">
                <ShoppingBag className="w-4 h-4" /> Compras na Loja
              </div>
              <p className="text-[11px] font-sans text-zinc-300">
                Bônus de loja são opcionais. Guarde Almas para cosméticos e use TF 2x caso queira acelerar esperas.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. CALCULADOR DE PRESTÍGIO */}
      {subSection === "calculator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <CircleDot className="w-4 h-4 text-red-400" /> Tabela dos 10 Círculos de Produção
              </h2>
              <span className="text-[11px] font-mono text-zinc-500">Ordem: Vermelho → Branco</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300 font-mono">
                <thead className="border-b border-zinc-800 text-zinc-400 uppercase">
                  <tr>
                    <th className="py-2">Cor</th>
                    <th className="py-2">Custo Inicial</th>
                    <th className="py-2">Mult. Custo</th>
                    <th className="py-2">Voltas/s Base</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {CIRCLES_DATA.map((c) => (
                    <tr key={c.name} className="hover:bg-zinc-800/30 transition-colors">
                      <td className={`py-2 font-bold ${c.color}`}>{c.name}</td>
                      <td className="py-2 text-zinc-300">{formatScientific(c.initialCost)} ⵙ</td>
                      <td className="py-2 text-zinc-400">+{c.costMult.toFixed(2)}x</td>
                      <td className="py-2 text-emerald-400">+{c.baseSpeed.toFixed(3)}/s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-3xl bg-gradient-to-b from-orange-950/30 via-zinc-900/60 to-zinc-950 border-2 border-orange-500/40 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-orange-500/20 pb-3">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-orange-400" /> Calculador de Prestígio & Promoções
              </h2>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                Sincronizado
              </span>
            </div>

            <div className="space-y-4 font-mono">
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2.5">
                <div className="flex justify-between items-center text-xs text-zinc-300">
                  <label htmlFor="revScoreInputEl" className="font-bold flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-orange-400" /> Pontuação Atual (Score ⵙ):
                  </label>
                  <span className="text-xs text-zinc-400 font-sans">
                    Valor: <strong className="text-orange-300 font-mono">{formatScientific(parsedScore.value)} ⵙ</strong>
                  </span>
                </div>

                <input
                  id="revScoreInputEl"
                  type="text"
                  value={score}
                  onChange={(e) => handleScoreChange(e.target.value)}
                  placeholder="Ex: 1e10, 500k, 1e42"
                  className={`w-full bg-zinc-900 border rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none ${
                    parsedScore.isValid ? "border-orange-500/40 focus:border-orange-400" : "border-red-500"
                  }`}
                />

                <div className="flex gap-1.5 flex-wrap pt-0.5">
                  {["1e10", "1e12", "1e15", "1e20", "1e30", "1e42", "1.79e308"].map((val) => (
                    <button
                      key={val}
                      onClick={() => handleScoreChange(val)}
                      className="px-2 py-1 rounded-lg bg-zinc-900 hover:bg-orange-900/40 text-[10px] text-zinc-300 border border-zinc-800 transition-colors"
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-2xl bg-zinc-950 border border-orange-500/30 text-center space-y-0.5">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase block">P.Mult</span>
                  <strong className="text-xs sm:text-sm text-orange-400 font-black">
                    x{formatScientific(pMult)}
                  </strong>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-950 border border-amber-500/30 text-center space-y-0.5">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase block">P.Expoente</span>
                  <strong className="text-xs sm:text-sm text-amber-300 font-black">
                    ^{pExp.toFixed(4)}
                  </strong>
                </div>

                <div className="p-3 rounded-2xl bg-orange-950/40 border-2 border-emerald-500/50 text-center space-y-0.5">
                  <span className="text-[10px] text-zinc-300 font-bold uppercase block">EXP Promo</span>
                  <strong className="text-xs sm:text-sm text-emerald-400 font-black">
                    +{formatScientific(promoXp)}
                  </strong>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2.5">
                <div className="flex justify-between items-center text-xs text-zinc-300">
                  <label htmlFor="promoLevelInputEl" className="font-bold flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-orange-400" /> Nível da Promoção (L):
                  </label>
                  <span className="text-sm text-orange-300 font-extrabold bg-orange-950/60 px-2.5 py-0.5 rounded-lg border border-orange-500/40">
                    Nv. {parsedPromoLevel}
                  </span>
                </div>

                <input
                  id="promoLevelInputEl"
                  type="text"
                  value={promoLevelInput}
                  onChange={(e) => updatePromoLevel(e.target.value)}
                  className="w-full bg-zinc-900 border border-orange-500/40 rounded-xl px-3 py-2 text-sm text-white font-mono focus:border-orange-400 focus:outline-none"
                />

                <div className="flex gap-1.5 flex-wrap pt-0.5">
                  {[1, 3, 8, 10, 20, 30, 40, 50, 70, 75, 100].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => updatePromoLevel(lvl)}
                      className="px-2 py-1 rounded-lg bg-zinc-900 hover:bg-orange-900/40 text-[10px] text-zinc-300 border border-zinc-800 transition-colors"
                    >
                      Nv {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 font-bold block">P1 (Ganho Mult)</span>
                  <strong className="text-xs sm:text-sm text-orange-300 font-extrabold">+{p1.toFixed(2)}x</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 font-bold block">P2 (Voltas/s)</span>
                  <strong className="text-xs sm:text-sm text-orange-300 font-extrabold">+{p2.toFixed(2)}x</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 font-bold block">P3 (Ascensão)</span>
                  <strong className="text-xs sm:text-sm text-orange-300 font-extrabold">+{p3.toFixed(2)}x</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 font-bold block">P4 (Potência)</span>
                  <strong className="text-xs sm:text-sm text-orange-300 font-extrabold">+{p4.toFixed(2)}x</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. RECOMPENSAS & RANKING */}
      {subSection === "rewards" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Gift className="w-4 h-4 text-purple-400" /> Recompensas Diárias (Ciclo de 14 Dias)
              </h2>
              <span className="text-[11px] font-mono text-purple-300 bg-purple-950/40 px-2.5 py-0.5 rounded border border-purple-500/30">
                Média: ~232 Almas/dia
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Sequência Ativa: <strong className="text-purple-300">{streakDay} dias</strong></span>
                <span className="text-emerald-400 font-bold">Bônus: +{streakBonus}% em Almas</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={streakDay}
                onChange={(e) => setStreakDay(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-zinc-800 accent-purple-500 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs max-h-64 overflow-y-auto pr-1">
              {DAILY_REWARDS_DATA.map((r) => {
                const isSouls = r.type === "souls";
                const rawAmount = parseInt(r.reward.replace(/\D/g, ""), 10) || 0;
                const boostedAmount = isSouls ? Math.round(rawAmount * (1 + streakBonus / 100)) : 0;

                return (
                  <div key={r.day} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
                    <div className="text-[10px] text-zinc-500">Dia {r.day}</div>
                    <div className={`font-bold text-[11px] mt-1 ${isSouls ? "text-purple-300" : "text-cyan-300"}`}>
                      {isSouls && streakBonus > 0 ? `+${boostedAmount} Almas` : r.reward}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" /> Pontuação de Classificação (Ranking)
              </h2>
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                Desbloqueio: 1M Score
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border-2 border-yellow-500/30 flex items-center justify-between font-mono">
              <span className="text-xs text-zinc-400 font-bold">Pontuação de Ranking Calculada:</span>
              <strong className="text-lg text-yellow-400 font-black">
                {formatScientific(calculatedLbScore)}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 space-y-1.5 leading-relaxed font-mono">
              <div className="text-zinc-300 font-bold">Fatores que impulsionam o Ranking:</div>
              <div>• <strong>Score & Exp:</strong> (1 + log10(1 + log10(Score))) × Exp</div>
              <div>• <strong>Supernovas & Lab:</strong> (1 + SN/10)^0.6 × (1 + Lab/50)^0.35</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}