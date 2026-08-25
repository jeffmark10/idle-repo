import React, { useState, useMemo } from "react";
import { 
  CircleDot, Calculator, Trophy, Gift, 
  ArrowUpCircle, ShoppingBag, Lightbulb, 
  Flag, Keyboard, Edit3, Zap, BookOpen, Layers
} from "lucide-react";
import StatCard from "../ui/StatCard";
import { CIRCLES_DATA, DAILY_REWARDS_DATA } from "../../data/gameData";
import { parseIncrementalNumber, formatScientific } from "../../utils/numberParser";
import { calculateLeaderboardScore } from "../../utils/leaderboardMath";

export default function RevolutionTab({ score, onScoreChange }) {
  const [subSection, setSubSection] = useState("overview");

  const parsedScore = useMemo(() => parseIncrementalNumber(score), [score]);
  
  // Controle de Nível de Promoção
  const [promoLevelInput, setPromoLevelInput] = useState("10");
  const parsedPromoLevel = useMemo(() => {
    const res = parseIncrementalNumber(promoLevelInput);
    return res.isValid ? Math.max(1, res.value) : 10;
  }, [promoLevelInput]);

  // Fórmulas de Prestígio (wiki.gg)
  const pMult = useMemo(() => {
    const s = parsedScore.value;
    if (s < 1e3) return 1;
    return 2.56 * Math.pow(Math.max(0, Math.log10(s / 1e3)), 2.25);
  }, [parsedScore.value]);

  const pExp = useMemo(() => {
    const s = parsedScore.value;
    if (s < 1e5) return 1;
    return 1 + Math.max(0, Math.log10(s / 1e5)) / 225;
  }, [parsedScore.value]);

  // Fórmulas de Promoção (wiki.gg)
  const promoXp = Math.floor(Math.pow(Math.max(0, pMult / 1000), 0.75));
  const p4 = 1 + 0.05 * Math.pow(parsedPromoLevel, 0.48);
  const p1 = p4 * (Math.floor(Math.pow(parsedPromoLevel, 1.5)) + 1);
  const p2 = p4 * (1 + Math.sqrt(parsedPromoLevel));
  const p3 = p4 * (10 + Math.pow(parsedPromoLevel, 0.82));

  // Sequência Diária (Streak)
  const [streakDay, setStreakDay] = useState(10);
  const streakBonus = Math.min(50, streakDay * 5);

  // Simulador de Leaderboard
  const [lbStats] = useState({
    maxExponent: 1.5,
    maxInfinites: 50,
    maxIP: 1e20,
    maxChallenges: 9,
    maxStars: 8,
    eternities: 100,
    maxEP: 1e10,
    maxAnimals: 20,
    maxLabLevel: 100,
    maxSupernova: 10,
    maxDP: 1e5,
    maxDTP: 13,
    maxUnities: 5,
    maxZodiacLevel: 50,
    maxTrialCount: 6,
    maxAttackLevel: 100
  });

  const calculatedLbScore = useMemo(() => {
    return calculateLeaderboardScore({
      ...lbStats,
      maxScore: parsedScore.value
    });
  }, [lbStats, parsedScore.value]);

  const updatePromoLevel = (val) => {
    setPromoLevelInput(String(val));
  };

  return (
    <div className="space-y-6">
      {/* Menu Superior de Sub-seções */}
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

      {/* ========================================================================= */}
      {/* SUB-SEÇÃO 1: VISÃO GERAL & GUIA DE INICIANTE */}
      {/* ========================================================================= */}
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
              Bem-vindo ao <strong>Revolution Idle</strong>! O início pode parecer lento, mas as mecânicas se abrem bastante conforme você avança. Seu primeiro Infinity exige <strong>1.79e308 de Pontuação</strong> e aproximadamente <strong>1e42 (1 TDC) de Prestígio</strong>.
            </p>

            {/* 4 Mecânicas Centrais */}
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
                  Reseta o círculo para o nível 5, concede +10 no nível máximo e multiplica o Mult Gain por 10x por padrão.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                <span className="text-orange-400 font-bold text-xs flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" /> Prestígio (1e10 Score)
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Redefine cores e ascensões, concedendo P.Mult (multiplicador estático) e P.Expoente (escala logarítmica potente).
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

          {/* Cards de Dicas Rápidas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 text-xs">
                <Lightbulb className="w-4 h-4" /> Conquista Grátis
              </div>
              <p className="text-[11px] font-sans text-zinc-300">
                Abra a aba "Créditos" para liberar a Conquista #005 ("Verifique o Dev") e ganhar bônus multiplicador imediato.
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
                <strong className="text-white">B</strong>: Compra Cores | <strong className="text-white">P</strong>: Prestígio | <strong className="text-white">1-4</strong>: Promoções. Ative a notação científica.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-purple-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-purple-400 text-xs">
                <ShoppingBag className="w-4 h-4" /> Compras na Loja
              </div>
              <p className="text-[11px] font-sans text-zinc-300">
                Bônus de loja são cosméticos/opcionais. Economize Almas e use TF 2x caso queira acelerar períodos de espera.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-SEÇÃO 2: CÍRCULOS & CALCULADOR DE PRESTÍGIO */}
      {/* ========================================================================= */}
      {subSection === "calculator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Tabela dos 10 Círculos */}
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

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1.5 text-xs text-zinc-300">
              <div className="font-bold text-white flex items-center gap-1.5">
                <ArrowUpCircle className="w-4 h-4 text-amber-400" /> Dicas de Ascensão Estratégica
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                Quando os círculos atingirem o nível máximo, considere esperar até que 1 ou 2 adicionais estejam prontos. Isso mantém a velocidade da corrida, já que círculos ascendidos resetam para o nível 5. A partir do nível 10 pós-ascensão, o crescimento acelera drasticamente.
              </p>
            </div>
          </div>

          {/* Calculador de Prestígio & Promoções Expandido */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-gradient-to-b from-orange-950/30 via-zinc-900/60 to-zinc-950 border-2 border-orange-500/40 shadow-2xl shadow-orange-950/30 space-y-5">
            <div className="flex items-center justify-between border-b border-orange-500/20 pb-3">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-orange-400" /> Calculador de Prestígio & Promoções
              </h2>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                Live Preview
              </span>
            </div>

            <div className="space-y-4 font-mono">
              {/* Pontuação Atual */}
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
                  onChange={(e) => onScoreChange(e.target.value)}
                  placeholder="Ex: 1e10, 500k, 1e42"
                  className={`w-full bg-zinc-900 border rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none ${
                    parsedScore.isValid ? "border-orange-500/40 focus:border-orange-400" : "border-red-500"
                  }`}
                />

                <div className="flex gap-1.5 flex-wrap pt-0.5">
                  {["1e10", "1e12", "1e15", "1e20", "1e30", "1e42", "1.79e308"].map((val) => (
                    <button
                      key={val}
                      onClick={() => onScoreChange(val)}
                      className="px-2 py-1 rounded-lg bg-zinc-900 hover:bg-orange-900/40 text-[10px] text-zinc-300 border border-zinc-800 transition-colors"
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cards de Resultados de Prestígio */}
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
                  <span className="text-[10px] text-zinc-300 font-bold uppercase block">EXP Promoção</span>
                  <strong className="text-xs sm:text-sm text-emerald-400 font-black">
                    +{formatScientific(promoXp)}
                  </strong>
                </div>
              </div>

              {/* Nível de Promoção (L) */}
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
                  placeholder="Ex: 10, 30, 75"
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

                <input
                  type="range"
                  min="1"
                  max={Math.max(75, Math.min(500, parsedPromoLevel > 75 ? parsedPromoLevel * 1.5 : 100))}
                  value={Math.min(500, parsedPromoLevel)}
                  onChange={(e) => updatePromoLevel(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-zinc-800 accent-orange-500 cursor-pointer mt-1"
                />
              </div>

              {/* Grid dos 4 Poderes */}
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

              {/* Rota Recomendada */}
              <div className="p-3 bg-gradient-to-br from-orange-950/60 via-amber-950/40 to-zinc-950 rounded-xl border border-orange-500/30 text-[11px] text-zinc-300 space-y-0.5 font-sans">
                <span className="font-extrabold text-orange-300 block">🎯 Rota Sugerida de Promoções:</span>
                <p className="text-zinc-400 font-mono text-[10px]">
                  #1 (Nv 3, 8, 20, 30 → 80) | #2 (Nv 10, 40) | #3 (Nv 30, 70) | #4 (Nv 50). Nivele todas em 75 antes do Infinito!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-SEÇÃO 3: RECOMPENSAS DIÁRIAS & TABELA DE LÍDERES */}
      {/* ========================================================================= */}
      {subSection === "rewards" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Recompensas Diárias (14 Dias) */}
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

          {/* Tabela de Líderes */}
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
              <div className="text-zinc-300 font-bold">Fatores que mais impulsionam o Ranking:</div>
              <div>• <strong>Score Máximo & Exp:</strong> (1 + log10(1 + log10(Score))) × Exp</div>
              <div>• <strong>Supernovas & Lab:</strong> (1 + SN/10)^0.6 × (1 + Lab/50)^0.35</div>
              <div>• <strong>Zodíaco & Ataques:</strong> (1 + ZodiacLv/100) × (1 + log10(1 + AttackLv))</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}