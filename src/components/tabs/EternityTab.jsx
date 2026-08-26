import React, { useState, useMemo } from "react";
import { 
  Hourglass, Sparkles, Check, FlaskConical, 
  Compass, Trophy, Zap, Filter, Star, Info, 
  CheckCircle2, ArrowRight, ShieldAlert, Target, Clock, AlertTriangle
} from "lucide-react";
import { useGame } from "../../context/GameContext";
import SubNavTabs from "../common/SubNavTabs";

const ETERNITY_MILESTONES = [
  { id: "EM_1", eternities: 1, desc: "Desbloqueia a aba de Marcos da Eternidade e bônus estatísticos." },
  { id: "EM_2", eternities: 2, desc: "Mantém todas as automações compradas ativas permanentemente." },
  { id: "EM_3", eternities: 3, desc: "Desbloqueia o Zoológico da Eternidade (Animais & Desaceleração)." },
  { id: "EM_5", eternities: 5, desc: "Comprar níveis de círculos não consome mais pontuação." },
  { id: "EM_7", eternities: 7, desc: "Desbloqueia o Ajustador Automático de IP." },
  { id: "EM_8", eternities: 8, desc: "Desbloqueia os Desafios da Eternidade (EC1 a EC10)." },
  { id: "EM_12", eternities: 12, desc: "Desbloqueia automação para Upgrades de Infinito." },
  { id: "EM_14", eternities: 14, desc: "Desbloqueia automação para compra de Geradores." },
  { id: "EM_16", eternities: 16, desc: "Desbloqueia automação de Estrelas e Auto Eternity." },
  { id: "EM_32", eternities: 32, desc: "Quebra da Eternidade (remove o teto de 1.79e308 IP para gerar mais EP)." },
  { id: "EM_100", eternities: 100, desc: "x1.05 para IP ganho por Eternidade (Softcap em 1.000 Σ)." }
];

const ANIMAL_MILESTONES = [
  { id: "AM_1", count: 1, desc: "Desbloqueia a Desaceleração (Slowdown)." },
  { id: "AM_4", count: 4, desc: "Desbloqueia a Desaceleração Automática." },
  { id: "AM_7", count: 7, desc: "Desbloqueia o Laboratório (Lab: LP e RP)." },
  { id: "AM_10", count: 10, desc: "Promover não reseta mais nenhum progresso." },
  { id: "AM_20", count: 20, desc: "Gera 100% do IP de Infinitar por segundo (requer EC10)." },
  { id: "AM_48", count: 48, desc: "+10 níveis gratuitos para todas as melhorias de RP no Laboratório." },
  { id: "AM_81", count: 81, desc: "Desbloqueia a Dilatação (com todos os 81 Animais comprados)." }
];

const ANIMAL_PROGRESSION_PATH = [
  { step: "1º Bloco", desc: "[1;1] Gato → [1;5] Furão, [2;5] Chinchila, [2;4] Jerboa, [3;4] Pato" },
  { step: "2º Bloco", desc: "[2;1] Rato → [2;3] Porquinho-da-índia, [3;3] Galo, [4;3] Ovelha, [4;4] Vaca" },
  { step: "3º Bloco", desc: "[3;1] Galinha, [3;2] Pombo, [4;2] Cabra, [4;1] Porco" },
  { step: "4º Bloco", desc: "[3;5] Ganso, [4;5] Cavalo" },
  { step: "5º Bloco", desc: "[5;2] Sapo, [6;2] Girafa, [6;3] Leão, [5;1] Cobra, [6;4] Hipopótamo até [6;6] Elefante" },
  { step: "6º Bloco", desc: "[3;6] Faisão até [1;6] Esquilo" },
  { step: "7º Bloco", desc: "[6;7] Tamanduá / Formiga, [4;6] Touro, [5;3] Sapo Cururu" },
  { step: "8º Bloco", desc: "[1;7] Coelho, [6;8] Coala, [2;7] Rato Preto" },
  { step: "9º Bloco", desc: "[1;8] Ouriço até [4;8] Alpaca, [6;9] Pégaso ⭐" },
  { step: "Final", desc: "Após o Pégaso, compre os animais mais baratos restantes até completar 81." }
];

const ETERNITY_CHALLENGES_DATA = [
  {
    num: 1,
    name: "EC1: Devagar como um Caracol",
    penalty: "Velocidade de volta reduzida",
    tiers: [
      { tier: 1, handicap: "/20", goal: "e30.000 Score", reward: "x2 Voltas/s", req: "[01/50] 14Σ, 8 AP" },
      { tier: 2, handicap: "/128", goal: "e30.000 Score", reward: "x4 Voltas/s", req: "[02/50] 33Σ, 13 AP" },
      { tier: 3, handicap: "/512", goal: "e30.000 Score", reward: "x7 Voltas/s", req: "[04/50] 18 AP" },
      { tier: 4, handicap: "/2.000", goal: "e30.000 Score", reward: "x12 Voltas/s", req: "[07/50] 30 AP, 26 RP" },
      { tier: 5, handicap: "/7.500", goal: "e30.000 Score", reward: "x20 Voltas/s", req: "[09/50] 52 AP, 51 RP, SN 2" }
    ]
  },
  {
    num: 2,
    name: "EC2: Expoente Comum Fraco",
    penalty: "Multiplicador do expoente reduzido",
    tiers: [
      { tier: 1, handicap: "x0.50", goal: "e150 Score", reward: "+0.03 Exp Comum", req: "[03/50] 34Σ, 14 AP" },
      { tier: 2, handicap: "x0.40", goal: "e142 Score", reward: "+0.05 Exp Comum", req: "[05/50] 19 AP, 15 RP" },
      { tier: 3, handicap: "x0.30", goal: "e240 Score", reward: "+0.07 Exp Comum", req: "[08/50] 24 AP, 31 RP" },
      { tier: 4, handicap: "x0.20", goal: "e13.000 Score", reward: "+0.10 Exp Comum", req: "[17/50] 126 AP, 152 RP, SN 6" },
      { tier: 5, handicap: "x0.10", goal: "e5.600 Score", reward: "+0.20 Exp Comum", req: "[20/50] 144 AP, 179 RP, SN 8" }
    ]
  },
  {
    num: 3,
    name: "EC3: Estrelas Desativadas",
    penalty: "Estrelas e Poeira Estelar desligadas (x0)",
    tiers: [
      { tier: 1, handicap: "Desativado", goal: "e12.000 Score", reward: "+1 Base Estelar", req: "[06/50] 21 AP, 15 RP" },
      { tier: 2, handicap: "Desativado", goal: "e18.000 Score", reward: "+3 Base Estelar", req: "[10/50] 52 AP, 52 RP, SN 2" },
      { tier: 3, handicap: "Desativado", goal: "e30.000 Score", reward: "+5 Base Estelar", req: "[11/50] 52 AP, 55 RP, SN 2" },
      { tier: 4, handicap: "Desativado", goal: "e40.000 Score", reward: "+10 Base Estelar", req: "[13/50] 56 AP, 58 RP, SN 2" },
      { tier: 5, handicap: "Desativado", goal: "e50.000 Score", reward: "+20 Base Estelar", req: "[15/50] 92 AP, 92 RP, SN 4" }
    ]
  },
  {
    num: 4,
    name: "EC4: Geradores Penalizados",
    penalty: "Expoente do gerador (GP) dividido",
    tiers: [
      { tier: 1, handicap: "/10", goal: "e15.000 Score", reward: "x1.03 Exp GP", req: "[12/50] 56 AP, 57 RP, SN 2" },
      { tier: 2, handicap: "/15", goal: "e25.000 Score", reward: "x1.05 Exp GP", req: "[14/50] 92 AP, 92 RP, SN 4" },
      { tier: 3, handicap: "/20", goal: "e50.000 Score", reward: "x1.07 Exp GP", req: "[19/50] 140 AP, 171 RP, SN 7" },
      { tier: 4, handicap: "/30", goal: "e60.000 Score", reward: "x1.10 Exp GP", req: "[23/50] 158 AP, 194 RP, SN 9" },
      { tier: 5, handicap: "/50", goal: "e70.000 Score", reward: "x1.15 Exp GP", req: "[24/50] 186 AP, 252 RP, SN 13" }
    ]
  },
  {
    num: 5,
    name: "EC5: Poder de Ascensão Fraco",
    penalty: "Ascension Power fracionário",
    tiers: [
      { tier: 1, handicap: "^0.10", goal: "e60.000 Score", reward: "x1.5 Poder Asc.", req: "[16/50] 116 AP, 130 RP, SN 5" },
      { tier: 2, handicap: "^0.07", goal: "e70.000 Score", reward: "x2.0 Poder Asc.", req: "[18/50] 140 AP, 170 RP, SN 7" },
      { tier: 3, handicap: "^0.05", goal: "e80.000 Score", reward: "x4.0 Poder Asc.", req: "[21/50] 144 AP, 183 RP, SN 8" },
      { tier: 4, handicap: "^0.03", goal: "e150.000 Score", reward: "x10 Poder Asc.", req: "[26/50] 216 AP, 287 RP, SN 16" },
      { tier: 5, handicap: "^0.01", goal: "e200.000 Score", reward: "x20 Poder Asc.", req: "[28/50] 256 AP, 333 RP, SN 21" }
    ]
  },
  {
    num: 6,
    name: "EC6: Sem Prestígio e Promoção",
    penalty: "Prestígio e Promoções desativados (x0)",
    tiers: [
      { tier: 1, handicap: "Desativado", goal: "e80.000 Score", reward: "x1.05 Bônus Prestígio", req: "[22/50] 158 AP, 190 RP, SN 9" },
      { tier: 2, handicap: "Desativado", goal: "e120.000 Score", reward: "x1.10 Bônus Prestígio", req: "[25/50] 216 AP, 285 RP, SN 16" },
      { tier: 3, handicap: "Desativado", goal: "e200.000 Score", reward: "x1.15 Bônus Prestígio", req: "[29/50] 256 AP, 338 RP, SN 21" },
      { tier: 4, handicap: "Desativado", goal: "e400.000 Score", reward: "x1.20 Bônus Prestígio", req: "[30/50] 550 AP, 481 RP, SN 24" },
      { tier: 5, handicap: "Desativado", goal: "e750.000 Score", reward: "x1.30 Bônus Prestígio", req: "[34/50] 650 AP, 540 RP, SN 27" }
    ]
  },
  {
    num: 7,
    name: "EC7: Laboratório Bloqueado",
    penalty: "Melhorias de RP sem efeito",
    tiers: [
      { tier: 1, handicap: "Desativado", goal: "e100.000 Score", reward: "+5 Níveis RP Livres", req: "[27/50] 236 AP, SN 19" },
      { tier: 2, handicap: "Desativado", goal: "e120.000 Score", reward: "+10 Níveis RP Livres", req: "[31/50] 650 AP, SN 26" },
      { tier: 3, handicap: "Desativado", goal: "e150.000 Score", reward: "+15 Níveis RP Livres", req: "[37/50] 716 AP, SN 27" },
      { tier: 4, handicap: "Desativado", goal: "e200.000 Score", reward: "+20 Níveis RP Livres", req: "[42/50] 1.454 AP, SN 34" },
      { tier: 5, handicap: "Desativado", goal: "e250.000 Score", reward: "+30 Níveis RP Livres", req: "[43/50] Pós-DU1 farm" }
    ]
  },
  {
    num: 8,
    name: "EC8: Ganho de IP Fracionário",
    penalty: "IP Ganho ^0.05 a ^0.01",
    tiers: [
      { tier: 1, handicap: "^0.05", goal: "e160.000 Score", reward: "^1.02 Mult IP", req: "[32/50] 650 AP, 539 RP, SN 26" },
      { tier: 2, handicap: "^0.04", goal: "e200.000 Score", reward: "^1.04 Mult IP", req: "[33/50] 650 AP, 539 RP, SN 26" },
      { tier: 3, handicap: "^0.03", goal: "e250.000 Score", reward: "^1.07 Mult IP", req: "[38/50] 716 AP, 550 RP, SN 27" },
      { tier: 4, handicap: "^0.02", goal: "e250.000 Score", reward: "^1.10 Mult IP", req: "[39/50] 1.072 AP, 720 RP, SN 33" },
      { tier: 5, handicap: "^0.01", goal: "e180.000 Score", reward: "^1.20 Mult IP", req: "[40/50] 1.072 AP, 720 RP, SN 33" }
    ]
  },
  {
    num: 9,
    name: "EC9: Sem Geradores (Dilatação)",
    penalty: "Geradores totalmente desativados",
    tiers: [
      { tier: 1, handicap: "Desativado", goal: "e210.000 Score", reward: "x1.10 Exp GP", req: "[35/50] 716 AP, 550 RP, SN 27" },
      { tier: 2, handicap: "Desativado", goal: "e225.000 Score", reward: "x1.20 Exp GP", req: "[36/50] 716 AP, 550 RP, SN 27" },
      { tier: 3, handicap: "Desativado", goal: "e300.000 Score", reward: "x1.30 Exp GP", req: "[41/50] 1.454 AP, 781 RP, SN 34" },
      { tier: 4, handicap: "Desativado", goal: "e450.000 Score", reward: "x1.40 Exp GP", req: "[44/50] Pós-EC 10-2" },
      { tier: 5, handicap: "Desativado", goal: "e700.000 Score", reward: "x1.50 Exp GP", req: "[45/50] Pós-EC 10-3" }
    ]
  },
  {
    num: 10,
    name: "EC10: Dilatação Tripla",
    penalty: "Preso sob todas as penalidades de Dilatação (^3)",
    tiers: [
      { tier: 1, handicap: "Dilatação ^3", goal: "1.000.000 Score", reward: "x10 Ganho de DP", req: "[46/50] ~150 DU1 (30 min)" },
      { tier: 2, handicap: "Dilatação ^3", goal: "1e10 Score", reward: "x50 Ganho de DP", req: "[47/50] 220-230 DU1 (10 min)" },
      { tier: 3, handicap: "Dilatação ^3", goal: "1e100 Score", reward: "x150 Ganho de DP", req: "[48/50] ~330 DU1 (20 min)" },
      { tier: 4, handicap: "Dilatação ^3", goal: "1e308 Score", reward: "x400 Ganho de DP", req: "[49/50] ~380 DU1 (20 min)" },
      { tier: 5, handicap: "Dilatação ^3", goal: "1e1.000 Score", reward: "x1.000 Ganho de DP", req: "[50/50] ~440 DU1 (20 min)" }
    ]
  }
];

export default function EternityTab() {
  const { gameState, toggleTask } = useGame();
  const [subSection, setSubSection] = useState("overview");
  const [challengeFilter, setChallengeFilter] = useState("all");

  const completedTasks = gameState.completedTasks || {};

  const totalEmCompleted = useMemo(() => {
    return ETERNITY_MILESTONES.filter(m => !!completedTasks[m.id]).length;
  }, [completedTasks]);

  const totalAmCompleted = useMemo(() => {
    return ANIMAL_MILESTONES.filter(m => !!completedTasks[m.id]).length;
  }, [completedTasks]);

  const totalEcCompleted = useMemo(() => {
    return Object.keys(completedTasks).filter(k => k.startsWith("EC") && completedTasks[k]).length;
  }, [completedTasks]);

  const ETERNITY_TABS = [
    { id: "overview", label: "0. O que é a Eternidade?", icon: Info },
    { id: "milestones", label: "1. Marcos (Σ)", icon: Hourglass, badge: `${totalEmCompleted}/11` },
    { id: "zoo", label: "2. Zoológico (81 Animais)", icon: Sparkles, badge: `${totalAmCompleted}/7` },
    { id: "lab", label: "3. Laboratório & Ratios", icon: FlaskConical },
    { id: "supernova", label: "4. Supernova", icon: Star },
    { id: "challenges", label: "5. Desafios (50 ECs)", icon: Trophy, badge: `${totalEcCompleted}/50` },
  ];

  return (
    <div className="space-y-6">
      {/* Menu Superior com Rolagem e Botões Laterais */}
      <SubNavTabs
        tabs={ETERNITY_TABS}
        activeTab={subSection}
        onSelectTab={setSubSection}
        colorTheme="indigo"
      />

      {/* ========================================================================= */}
      {/* 0. O QUE É A ETERNIDADE? */}
      {/* ========================================================================= */}
      {subSection === "overview" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-zinc-900/80 to-zinc-950 border-2 border-indigo-500/30 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-indigo-500/20 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-black text-lg">
                ⧖
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-indigo-400 font-bold tracking-wider">
                  Camada 3 de Prestígio • Desbloqueio em 1.79e308 IP
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Guia Estrutural: A Era da Eternidade
                </h1>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
              Ao atingir <strong>1.79e308 IP</strong>, surge o botão <strong>"Eternate"</strong>. O reset maior zera seus Pontos de Infinito, Geradores e Upgrades do Infinito, mas concede <strong>Eternidades (Σ)</strong> e <strong>Pontos de Eternidade (EP)</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-sans text-xs">
              <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-1.5">
                <strong className="text-indigo-300 font-mono text-sm flex items-center gap-1.5">
                  ⧖ Contagem de Eternidades (Σ)
                </strong>
                <p className="text-zinc-400 leading-relaxed">
                  Concede multiplicadores permanentes (Voltas/s, Ganho de IP, Poder de Geradores) e ativa marcos automáticos como manutenção de automações e auto-eternidade.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-1.5">
                <strong className="text-purple-300 font-mono text-sm flex items-center gap-1.5">
                  ✨ Pontos de Eternidade (EP)
                </strong>
                <p className="text-zinc-400 leading-relaxed">
                  Moeda principal de compras. Usada para expandir o Laboratório (LP/s) e comprar Animal Points (AP) no Zoológico.
                </p>
              </div>
            </div>
          </div>

          {/* Loop de Gameplay da Eternidade */}
          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4 font-sans text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <Compass className="w-4 h-4 text-indigo-400" /> O Ciclo de Gameplay Estratégico (Gameplay Loop)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-cyan-400 font-bold text-xs block">1. Farm Rápido de EP</span>
                <p className="text-zinc-400 font-sans text-[11px]">Auto Eternity ligado (0.5s a 3s), alvo em 1 EP. Farme EP para crescer o Lab e comprar Animais.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-amber-400 font-bold text-xs block">2. Long Runs de Score</span>
                <p className="text-zinc-400 font-sans text-[11px]">Respec Lab para Score (1 Gen Power : 4 Common Exp). Auto Eternity desligado (10-30 min) para bater Supernovas e comprar AP com Score.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-purple-400 font-bold text-xs block">3. Comprar Animais</span>
                <p className="text-zinc-400 font-sans text-[11px]">Gaste AP acumulado na grade do Zoológico seguindo a trilha recomendada até liberar marcos de automação.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-yellow-400 font-bold text-xs block">4. Vencer Desafios (ECs)</span>
                <p className="text-zinc-400 font-sans text-[11px]">Alterne entre os 50 Desafios da Eternidade sempre que os bônus acumulados permitirem vitórias rápidas (&lt; 5 min).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. MARCOS & BÔNUS (Σ) */}
      {/* ========================================================================= */}
      {subSection === "milestones" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-indigo-500/30 font-sans text-xs space-y-2 shadow-lg">
            <div className="flex items-center gap-2 font-mono text-indigo-400 font-bold">
              <Info className="w-4 h-4" />
              <span>Sobre esta Sub-Aba: Marcos Automáticos por Total de Eternidades</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Marque os marcos conforme alcança a quantidade necessária de Eternidades ($ \Sigma $). O jogo desbloqueia qualidade de vida imediata no início e escala até bônus massivos em 100 $ \Sigma $.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 font-mono text-xs">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Hourglass className="w-4 h-4 text-indigo-400" /> Checklist dos 11 Marcos de Eternidade (Σ)
              </span>
              <span className="text-indigo-300 font-bold">
                {totalEmCompleted}/11 Concluídos
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-mono text-xs">
              {ETERNITY_MILESTONES.map((m) => {
                const isDone = !!completedTasks[m.id];
                return (
                  <button
                    key={m.id}
                    role="checkbox"
                    aria-checked={isDone}
                    onClick={() => toggleTask(m.id)}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all text-left ${
                      isDone
                        ? "bg-indigo-950/30 border-indigo-500/40 text-zinc-400"
                        : "bg-zinc-950 border-zinc-800 text-zinc-200 hover:border-zinc-700"
                    }`}
                  >
                    <div className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center border shrink-0 ${
                      isDone ? "bg-indigo-600 border-indigo-500 text-white" : "border-zinc-700 bg-zinc-900"
                    }`}>
                      {isDone && <Check className="w-3 h-3" />}
                    </div>

                    <div className="space-y-0.5 overflow-hidden">
                      <span className={`font-bold text-xs block ${isDone ? "text-indigo-300 line-through" : "text-white"}`}>
                        {m.eternities} Σ
                      </span>
                      <span className="font-sans text-xs leading-relaxed text-zinc-400 block">{m.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ZOOLÓGICO & ANIMAIS (AP) */}
      {/* ========================================================================= */}
      {subSection === "zoo" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-purple-500/30 font-sans text-xs space-y-2 shadow-lg">
            <div className="flex items-center gap-2 font-mono text-purple-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Sobre esta Sub-Aba: Grade do Zoológico & 81 Animais</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              O Zoológico é uma grade 9x9 desbloqueada em 3 $ \Sigma $. Você adquire Animal Points (AP) em Desafios, Supernovas ou trocando Score/IP/EP antes dos resets de Eternidade. Completar os 81 animais desbloqueia a <strong>Dilatação</strong>.
            </p>
          </div>

          {/* Roteiro e Marcos de Animais */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Rota de Compra Recomendada */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3 font-sans text-xs">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                  <Compass className="w-4 h-4 text-purple-400" /> Ordem Recomendada de Desbloqueio dos Animais
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Você começa no <strong>[1;1] Gato</strong> e pode comprar animais adjacentes. Siga os blocos abaixo para focar nos nós mais potentes antes de comprar animais secundários:
                </p>
                <div className="space-y-1.5 font-mono text-[11px] max-h-80 overflow-y-auto pr-1">
                  {ANIMAL_PROGRESSION_PATH.map((p, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-2">
                      <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30 text-purple-300 font-bold shrink-0">
                        {p.step}
                      </span>
                      <span className="text-zinc-300 font-sans">{p.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Checklist dos 7 Marcos de Animais */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" /> Marcos de Animais
                  </h3>
                  <span className="text-purple-300 font-bold">{totalAmCompleted}/7</span>
                </div>

                <div className="space-y-2">
                  {ANIMAL_MILESTONES.map((am) => {
                    const isDone = !!completedTasks[am.id];
                    return (
                      <button
                        key={am.id}
                        role="checkbox"
                        aria-checked={isDone}
                        onClick={() => toggleTask(am.id)}
                        className={`w-full p-2.5 rounded-xl border flex items-center justify-between gap-2 text-left transition-all ${
                          isDone 
                            ? "bg-purple-950/30 border-purple-500/40 text-zinc-400" 
                            : "bg-zinc-950 border-zinc-800 text-zinc-200 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                            isDone ? "bg-purple-600 border-purple-500 text-white" : "border-zinc-700 bg-zinc-900"
                          }`}>
                            {isDone && <Check className="w-3 h-3" />}
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold shrink-0 ${
                            isDone ? "bg-purple-900/60 text-purple-300" : "bg-zinc-900 text-zinc-400"
                          }`}>
                            {am.count} Animais
                          </span>
                          <span className="text-xs font-sans truncate">{am.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. LABORATÓRIO & ESTRATÉGIAS DE RATIOS */}
      {/* ========================================================================= */}
      {subSection === "lab" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-emerald-500/30 font-sans text-xs space-y-2 shadow-lg">
            <div className="flex items-center gap-2 font-mono text-emerald-400 font-bold">
              <FlaskConical className="w-4 h-4" />
              <span>Sobre esta Sub-Aba: Funcionamento do Laboratório & Melhores Ratios</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Desbloqueado com 7 Animais, o Laboratório compra 3 melhorias com EP para gerar <strong>LP/s = (Base × Mult)^Poder</strong>. A cada frasco cheio, você ganha <strong>1 Ponto de Pesquisa (RP)</strong>. É possível fazer Respec a qualquer momento (ao custo de um reset de Eternidade).
            </p>
          </div>

          {/* Guia de Upgrades do Laboratório */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start font-sans text-xs">
            {/* Os 6 Upgrades Explicados */}
            <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                <FlaskConical className="w-4 h-4 text-cyan-400" /> Os 6 Upgrades de Pesquisa (RP)
              </h3>
              <div className="space-y-2 font-mono text-xs">
                <div className="p-2.5 bg-zinc-950 rounded-xl border border-emerald-500/40 flex justify-between">
                  <span className="text-emerald-300 font-bold">#1 IP Gain</span>
                  <span className="text-zinc-300">x4 por nível • <strong className="text-emerald-400">Essencial p/ IP Farm</strong></span>
                </div>
                <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 flex justify-between opacity-60">
                  <span className="text-zinc-400">#2 Ascension Power</span>
                  <span className="text-zinc-500">*(1 + n*0.25) • Não recomendado</span>
                </div>
                <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 flex justify-between opacity-60">
                  <span className="text-zinc-400">#3 Star Base Mult</span>
                  <span className="text-zinc-500">*(1 + n*0.15) • Não recomendado</span>
                </div>
                <div className="p-2.5 bg-zinc-950 rounded-xl border border-emerald-500/40 flex justify-between">
                  <span className="text-emerald-300 font-bold">#4 EP Gain</span>
                  <span className="text-zinc-300">*(1 + n*0.50) • <strong className="text-emerald-400">Essencial p/ EP Farm</strong></span>
                </div>
                <div className="p-2.5 bg-zinc-950 rounded-xl border border-emerald-500/40 flex justify-between">
                  <span className="text-emerald-300 font-bold">#5 Gen. Power Exponent</span>
                  <span className="text-zinc-300">+0.02 por nível • <strong className="text-emerald-400">Crítico p/ Score/SN</strong></span>
                </div>
                <div className="p-2.5 bg-zinc-950 rounded-xl border border-emerald-500/40 flex justify-between">
                  <span className="text-emerald-300 font-bold">#6 Common Exponent</span>
                  <span className="text-zinc-300">+0.01 por nível • <strong className="text-emerald-400">Crítico p/ Score/SN (Cap: 500)</strong></span>
                </div>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                💡 <strong>Regra de Ouro:</strong> Invista apenas nos upgrades <strong>#1, #4, #5 e #6</strong>. Ignore completamente #2 e #3 (exceto para as conquistas #089, #090 e #093 com 10 pontos em cada).
              </p>
            </div>

            {/* As 3 Estratégias de Ratios */}
            <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                <Target className="w-4 h-4 text-emerald-400" /> Estratégias e Ratios de Pesquisa
              </h3>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                  <strong className="text-cyan-300 block">Estratégia 1: Farm de IP/EP (Início do Lab)</strong>
                  <p className="text-zinc-400 font-sans text-[11px]">
                    Primeiros 6 RP no <strong>#4 EP Gain</strong>. Depois, ratio 2:1 (#1 IP : #4 EP) até 16 pontos em EP. A partir daí, 100% no #1 IP.
                  </p>
                </div>

                <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                  <strong className="text-amber-300 block">Estratégia 2: Score / Supernova Push</strong>
                  <p className="text-zinc-400 font-sans text-[11px]">
                    Ratio <strong>1:4</strong> (1 ponto no <strong>#5 Gen Power</strong> para cada 4 pontos no <strong>#6 Common Exp</strong>). Use para corridas longas de 10-30 min.
                  </p>
                </div>

                <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                  <strong className="text-purple-300 block">Estratégia 3: Específica para EC9 e EC10</strong>
                  <p className="text-zinc-400 font-sans text-[11px]">
                    <strong>100% no #6 Common Exponent</strong> (como os geradores estão desligados, #5 não surte efeito).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SUPERNOVA */}
      {/* ========================================================================= */}
      {subSection === "supernova" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-amber-500/30 font-sans text-xs space-y-2 shadow-lg">
            <div className="flex items-center gap-2 font-mono text-amber-400 font-bold">
              <Star className="w-4 h-4" />
              <span>Sobre esta Sub-Aba: Supernovas & Bônus Cósmicos</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Desbloqueadas com <strong>8 Desafios da Eternidade (ECs)</strong> concluídos, as Supernovas ocorrem ao atingir patamares massivos de pontuação. Cada Supernova reinicia a corrida da Eternidade, mas fornece 5 multiplicadores globais permanentes e concede AP extra.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Eternity Reward</span>
              <strong className="text-amber-300 text-sm font-black">+1.5x / SN</strong>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Star Base Mult</span>
              <strong className="text-amber-300 text-sm font-black">+0.10x / SN</strong>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-500/40 text-center space-y-1 bg-emerald-950/10">
              <span className="text-[10px] text-emerald-400 uppercase font-bold block">Lab Base (+Lab)</span>
              <strong className="text-emerald-300 text-sm font-black">+20% / SN</strong>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">EP Gain Mult</span>
              <strong className="text-amber-300 text-sm font-black">+2.0x / SN</strong>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-purple-500/40 text-center space-y-1 bg-purple-950/10">
              <span className="text-[10px] text-purple-400 uppercase font-bold block">+Animal Points</span>
              <strong className="text-purple-300 text-sm font-black">+5 AP / SN</strong>
            </div>
          </div>

          {/* Dicas Estruturais de Supernova */}
          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3 font-sans text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <Compass className="w-4 h-4 text-amber-400" /> Estratégia de Execução de Supernova
            </h3>
            <ul className="text-zinc-400 space-y-1.5 leading-relaxed">
              <li>• <strong>Vá para a Supernova o mais rápido possível:</strong> Os bônus acumulados superam amplamente o custo de reiniciar a corrida.</li>
              <li>• <strong>Configuração do Lab:</strong> Use sempre o ratio de Score (1:4 de #5:#6).</li>
              <li>• <strong>Automações:</strong> Desligue o Auto Eternity e Auto Infinity para corridas longas de 10-30 minutos e ative a Desaceleração manual nos momentos finais.</li>
              <li>• <strong>Marco de 30 ECs:</strong> A cada 4 Supernovas, você ganha +1 nível gratuito em todas as melhorias de RP.</li>
            </ul>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. OS 50 DESAFIOS DA ETERNIDADE (EC 1-1 A EC 10-5) */}
      {/* ========================================================================= */}
      {subSection === "challenges" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-yellow-500/30 font-sans text-xs space-y-2 shadow-lg">
            <div className="flex items-center gap-2 font-mono text-yellow-400 font-bold">
              <Trophy className="w-4 h-4" />
              <span>Sobre esta Sub-Aba: Matriz dos 50 Desafios da Eternidade</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Desbloqueados em 8 Eternidades, os 10 Desafios possuem 5 dificuldades cada (total de 50). Cada vitória concede <strong>+1 AP</strong> e multiplicadores permanentes. Complete os 50 para abrir a <strong>Árvore de Dilatação</strong>.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <span className="text-sm font-bold text-white font-mono">
                Progresso: {totalEcCompleted}/50 Concluídos (+{totalEcCompleted} AP Concedidos)
              </span>

              <div className="flex items-center gap-2 font-mono text-xs">
                <Filter className="w-3.5 h-3.5 text-zinc-400" />
                {[
                  { id: "all", label: "Todos (50)" },
                  { id: "pending", label: "Pendentes" },
                  { id: "completed", label: "Concluídos" }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setChallengeFilter(f.id)}
                    className={`px-3 py-1 rounded-xl transition-colors font-bold ${
                      challengeFilter === f.id
                        ? "bg-yellow-600 text-white"
                        : "bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {ETERNITY_CHALLENGES_DATA.map((ec) => {
                const matchingTiers = ec.tiers.filter(t => {
                  const isDone = !!completedTasks[`EC${ec.num}-${t.tier}`];
                  if (challengeFilter === "pending") return !isDone;
                  if (challengeFilter === "completed") return isDone;
                  return true;
                });

                if (matchingTiers.length === 0) return null;

                const completedCountForThisEc = ec.tiers.filter(t => !!completedTasks[`EC${ec.num}-${t.tier}`]).length;

                return (
                  <div key={ec.num} className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-2.5">
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                          <Trophy className="w-4 h-4 text-yellow-400" /> {ec.name}
                        </h3>
                        <span className="text-[11px] text-zinc-400 font-sans">Penalidade Base: {ec.penalty}</span>
                      </div>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-zinc-950 text-yellow-300 border border-zinc-800 font-bold self-start sm:self-auto">
                        Dificuldades: {completedCountForThisEc}/5
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 font-mono text-xs">
                      {matchingTiers.map((t) => {
                        const key = `EC${ec.num}-${t.tier}`;
                        const isDone = !!completedTasks[key];

                        return (
                          <button
                            key={t.tier}
                            role="checkbox"
                            aria-checked={isDone}
                            onClick={() => toggleTask(key)}
                            className={`p-3 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all focus:outline-none ${
                              isDone
                                ? "bg-yellow-950/30 border-yellow-500/40 text-zinc-400"
                                : "bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-200"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`font-bold text-xs ${isDone ? "text-yellow-400 line-through" : "text-white"}`}>
                                Nível {t.tier}
                              </span>
                              <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                                isDone ? "bg-yellow-600 border-yellow-500 text-white" : "border-zinc-700 bg-zinc-900"
                              }`}>
                                {isDone && <Check className="w-3 h-3" />}
                              </div>
                            </div>

                            <div className="text-[10px] space-y-0.5">
                              <div className="text-red-400">Pena: {t.handicap}</div>
                              <div className="text-zinc-400">Meta: {t.goal}</div>
                              <div className="text-emerald-400 font-bold">Bônus: {t.reward}</div>
                              <div className="text-[9px] text-zinc-400 font-sans pt-0.5">{t.req}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}