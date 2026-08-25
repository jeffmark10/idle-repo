import React, { useState } from "react";
import { 
  Hourglass, Sparkles, Check, 
  FlaskConical, Compass, Trophy, Zap 
} from "lucide-react";
import { formatScientific } from "../../utils/numberParser";
import { useGame } from "../../context/GameContext";

const ETERNITY_MILESTONES = [
  { eternities: 1, desc: "Desbloqueia a aba de Marcos da Eternidade e bônus estatísticos." },
  { eternities: 2, desc: "A partir desta Eternidade, mantém todas as Automações ativas." },
  { eternities: 3, desc: "Desbloqueia o Zoológico da Eternidade (Animais & Desaceleração)." },
  { eternities: 5, desc: "Comprar círculos (revoluções) não consome mais pontuação." },
  { eternities: 7, desc: "Desbloqueia o Ajustador Automático de IP." },
  { eternities: 8, desc: "Desbloqueia os Desafios da Eternidade (EC1 a EC10)." },
  { eternities: 12, desc: "Desbloqueia Automação para Upgrades de Infinito." },
  { eternities: 14, desc: "Desbloqueia Automação para Geradores." },
  { eternities: 16, desc: "Desbloqueia Automação de Estrelas/Poeira Estelar e Auto Eternity." },
  { eternities: 32, desc: "Quebra a Eternidade (Remove o teto de 1.79e308 IP para gerar mais EP)." },
  { eternities: 100, desc: "x1.05 para IP ganho por Eternidade (Softcap em 1.000 Σ)." }
];

const ANIMAL_MILESTONES = [
  { count: 1, desc: "Desbloqueia a Desaceleração (Slowdown)." },
  { count: 4, desc: "Desbloqueia a Desaceleração Automática." },
  { count: 7, desc: "Desbloqueia o Laboratório (Lab: LP e RP)." },
  { count: 10, desc: "Promover não reseta mais nada." },
  { count: 20, desc: "Gera 100% do IP de Infinitar por segundo (requer EC10)." },
  { count: 48, desc: "+10 níveis gratuitos para todas as melhorias de RP no Laboratório." },
  { count: 81, desc: "Desbloqueia a Dilatação (com todos os 81 Animais comprados)." }
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
  const { gameState, toggleTask, updateNestedStat } = useGame();
  const [subPage, setSubPage] = useState("milestones");

  const lab = gameState.stats.lab;
  const completedTasks = gameState.completedTasks;

  const lpBaseVal = 1 + lab.base * 0.20;
  const lpMultVal = 1 + lab.mult * 0.50;
  const lpPowerVal = 1 + lab.power * 0.01;
  const lpPerSecond = Math.pow(lpBaseVal * lpMultVal, lpPowerVal);

  const totalEcCompleted = Object.keys(completedTasks).filter(
    k => k.startsWith("EC") && completedTasks[k]
  ).length;

  return (
    <div className="space-y-6">
      {/* Menu Superior de 4 Subpáginas */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-x-auto scrollbar-none font-mono text-xs">
        {[
          { id: "milestones", label: "1. Marcos & Bônus (Σ)", icon: Hourglass },
          { id: "zoo", label: "2. Zoológico & Builds (AP)", icon: Sparkles },
          { id: "lab", label: "3. Laboratório (LP/RP)", icon: FlaskConical },
          { id: "challenges", label: "4. Desafios Eternos (50 ECs)", icon: Trophy },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = subPage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubPage(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all shrink-0 flex items-center gap-2 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/30"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. MARCOS & BÔNUS */}
      {subPage === "milestones" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-zinc-900/70 to-zinc-950 border-2 border-indigo-500/30 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-500/20 pb-3">
              <div>
                <span className="text-xs font-mono uppercase text-indigo-400 font-bold tracking-wider">
                  Eternidade • Camada 3 de Reset
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Marcos da Eternidade & Bônus Permanentes
                </h1>
              </div>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 w-fit">
                Desbloqueio: 1.79e308 IP
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Ao alcançar <strong>1.79e308 IP</strong>, você ganha a opção de <strong>Eternar (Eternate)</strong>. Isso concede <strong>Pontos de Eternidade (EP)</strong>, acumula <strong>Eternidades (Σ)</strong> e ativa 6 bônus estatísticos permanentes.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1 font-mono text-xs">
              <div className="p-3 bg-zinc-950/80 rounded-2xl border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 uppercase block">Mult Gain</span>
                <strong className="text-indigo-300 text-sm">x2.00 Base</strong>
              </div>
              <div className="p-3 bg-zinc-950/80 rounded-2xl border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 uppercase block">Velocidade</span>
                <strong className="text-indigo-300 text-sm">x2.00 Base</strong>
              </div>
              <div className="p-3 bg-zinc-950/80 rounded-2xl border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 uppercase block">Asc. Power</span>
                <strong className="text-indigo-300 text-sm">x1.10 Base</strong>
              </div>
              <div className="p-3 bg-zinc-950/80 rounded-2xl border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 uppercase block">Ganho Infinito</span>
                <strong className="text-indigo-300 text-sm">x2.00 Base</strong>
              </div>
              <div className="p-3 bg-zinc-950/80 rounded-2xl border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 uppercase block">GP Geradores</span>
                <strong className="text-indigo-300 text-sm">x2.14 Base</strong>
              </div>
              <div className="p-3 bg-zinc-950/80 rounded-2xl border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 uppercase block">Poeira Estelar</span>
                <strong className="text-indigo-300 text-sm">x10.0 Base</strong>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Hourglass className="w-4 h-4 text-indigo-400" /> Todos os Marcos por Eternidades (Σ)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-mono text-xs">
              {ETERNITY_MILESTONES.map((m) => (
                <div key={m.eternities} className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-xl bg-indigo-950 border border-indigo-500/40 text-indigo-300 font-bold shrink-0">
                    {m.eternities} Σ
                  </span>
                  <span className="text-zinc-300 font-sans text-xs leading-relaxed pt-0.5">{m.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. ZOOLÓGICO & BUILDS (AP) */}
      {subPage === "zoo" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/40 via-zinc-900/70 to-zinc-950 border-2 border-purple-500/30 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-3">
              <div>
                <span className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">
                  Zoológico da Eternidade • Marco 3 Σ
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Pontos de Animais (AP) & Estratégia de Builds
                </h1>
              </div>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">
                81 Animais no Total (1.524 AP)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              O Zoológico é uma grade <strong>9x9</strong> onde você compra animais adjacentes usando <strong>Animal Points (AP)</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 font-mono text-xs">
              <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 text-center">
                <span className="text-zinc-500 text-[10px] block">1 AP por EP:</span>
                <strong className="text-purple-300 text-sm">2 EP Inicial</strong>
              </div>
              <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 text-center">
                <span className="text-zinc-500 text-[10px] block">1 AP por IP:</span>
                <strong className="text-purple-300 text-sm">1e300 IP Inicial</strong>
              </div>
              <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 text-center">
                <span className="text-zinc-500 text-[10px] block">1 AP por Score:</span>
                <strong className="text-purple-300 text-sm">1e30000 ⵙ Inicial</strong>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3 font-sans text-xs">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-purple-400" /> Roteiro Recomendado de Builds de Animais
                </h3>

                <div className="space-y-2">
                  <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                    <span className="text-purple-300 font-bold font-mono block">1. Início Estável (Pré-EC):</span>
                    <p className="text-zinc-300">🐱 Gato (1;1) → 🐶 Cachorro (1;2) → 🦜 Papagaio (1;3) → 🐭 Rato (2;1).</p>
                  </div>

                  <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                    <span className="text-emerald-400 font-bold font-mono block">2. Build de IP / Farm (Pós EC 1-1):</span>
                    <p className="text-zinc-300">Gato (1;1) • Cachorro (1;2) • Papagaio (1;3) • Peixe (1;4) • Furão (1;5) • Chinchila (2;5) • Jerboa (2;4).</p>
                  </div>

                  <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                    <span className="text-amber-400 font-bold font-mono block">3. Build de Score / Desafios:</span>
                    <p className="text-zinc-300">Gato (1;1) • Cachorro (1;2) • Hamster (2;2) • Porquinho-da-Índia (2;3) • Galo (3;3) • Ovelha (4;3) • Pato (3;4) • Cavalo (4;5).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3 font-sans text-xs text-zinc-300">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> Desaceleração & Ajustador de IP
                </h3>
                <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1.5">
                  <span className="text-amber-300 font-bold font-mono block">• Desacelerar (Slowdown):</span>
                  <p className="text-zinc-400">Divide a velocidade de volta por 10 em troca de <strong>+1 Ascensão Bônus</strong> para todas as cores.</p>
                </div>

                <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1.5">
                  <span className="text-cyan-300 font-bold font-mono block">• Ajustador de IP (7 Σ):</span>
                  <p className="text-zinc-400">Multiplica o IP da última run pelo fator configurado para novo limite de reset automático (padrão: <strong>1k</strong>).</p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Marcos de Animais
                </h3>
                <div className="space-y-1.5 font-mono text-xs max-h-52 overflow-y-auto pr-1">
                  {ANIMAL_MILESTONES.map((am) => (
                    <div key={am.count} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded-lg bg-purple-950 border border-purple-500/40 text-purple-300 font-bold shrink-0 text-[11px]">
                        {am.count}
                      </span>
                      <span className="text-zinc-300 font-sans text-xs">{am.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. LABORATÓRIO (LP/RP) */}
      {subPage === "lab" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-zinc-900/70 to-zinc-950 border-2 border-emerald-500/30 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-3">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
                  Laboratório • Marco 7 Animais
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Pontos de Laboratório (LP) & Pesquisa (RP)
                </h1>
              </div>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 w-fit">
                LP/s = (Base × Mult)^Poder
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              O Laboratório converte EP em <strong>Pontos de Pesquisa (RP)</strong> conforme você enche o frasco com LP/s. Aloque seus RPs preferencialmente na proporção <strong>1:2 ou 1:3</strong> entre <em>LAB 5 (Expoente de Poder dos Geradores)</em> e <em>LAB 6 (Expoente Comum)</em>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-emerald-400" /> Simulador de Geração de LP/s
              </h3>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Nível de Base (+0.20/nv):</span>
                    <span className="text-emerald-400 font-bold">{lab.base}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={lab.base}
                    onChange={(e) => updateNestedStat("lab", "base", Number(e.target.value))}
                    className="w-full h-2 rounded-lg bg-zinc-800 accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Nível de Mult (+0.50/nv):</span>
                    <span className="text-emerald-400 font-bold">{lab.mult}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={lab.mult}
                    onChange={(e) => updateNestedStat("lab", "mult", Number(e.target.value))}
                    className="w-full h-2 rounded-lg bg-zinc-800 accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Nível de Poder (+0.01/nv):</span>
                    <span className="text-emerald-400 font-bold">{lab.power}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={lab.power}
                    onChange={(e) => updateNestedStat("lab", "power", Number(e.target.value))}
                    className="w-full h-2 rounded-lg bg-zinc-800 accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-500/30 flex items-center justify-between font-mono">
                <span className="text-xs text-zinc-400 font-bold">Produção Estimada de LP:</span>
                <strong className="text-lg text-emerald-400 font-black">
                  {formatScientific(lpPerSecond)} LP/s
                </strong>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-cyan-400" /> Os 6 Upgrades de Pesquisa (RP)
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex justify-between">
                  <span className="text-zinc-300">LAB 1: IP Ganho</span>
                  <strong className="text-cyan-400">x4 por nível</strong>
                </div>
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex justify-between">
                  <span className="text-zinc-300">LAB 2: Poder de Ascensão</span>
                  <strong className="text-cyan-400">*(1 + n*0.25)</strong>
                </div>
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex justify-between">
                  <span className="text-zinc-300">LAB 3: Base Estelar Mult</span>
                  <strong className="text-cyan-400">*(1 + n*0.15)</strong>
                </div>
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex justify-between">
                  <span className="text-zinc-300">LAB 4: EP Ganho</span>
                  <strong className="text-cyan-400">*(1 + n*0.50)</strong>
                </div>
                <div className="p-3 bg-zinc-950 rounded-xl border border-emerald-500/40 flex justify-between bg-emerald-950/20">
                  <span className="text-emerald-300 font-bold">LAB 5: Exp. Poder Gerador (Prioridade)</span>
                  <strong className="text-emerald-400">+0.02 / nível</strong>
                </div>
                <div className="p-3 bg-zinc-950 rounded-xl border border-emerald-500/40 flex justify-between bg-emerald-950/20">
                  <span className="text-emerald-300 font-bold">LAB 6: Expoente Comum (Prioridade)</span>
                  <strong className="text-emerald-400">+0.01 / nível (Softcap: 500)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. OS 50 DESAFIOS DA ETERNIDADE (EC 1-1 A EC 10-5) */}
      {subPage === "challenges" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-yellow-950/40 via-zinc-900/70 to-zinc-950 border-2 border-yellow-500/30 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-yellow-500/20 pb-3">
              <div>
                <span className="text-xs font-mono uppercase text-yellow-400 font-bold tracking-wider">
                  Desafios da Eternidade • 50 Desafios Totais (10 ECs × 5 Dificuldades)
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Matriz Completa dos 50 Desafios da Eternidade
                </h1>
              </div>
              <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 font-bold w-fit">
                Progresso Geral: {totalEcCompleted}/50 Concluídos
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Existem <strong>10 Desafios da Eternidade</strong>, cada um contendo <strong>5 níveis de dificuldade</strong>. Cada vitória concede <strong>+1 AP gratuito</strong>. Complete 8 desafios para desbloquear <strong>Supernova</strong> e todos os 50 para liberar a <strong>Árvore de Dilatação</strong>.
            </p>
          </div>

          {/* Grid dos 10 Desafios com 5 Níveis Cada */}
          <div className="space-y-4">
            {ETERNITY_CHALLENGES_DATA.map((ec) => {
              const completedCountForThisEc = ec.tiers.filter(t => !!completedTasks[`EC${ec.num}-${t.tier}`]).length;

              return (
                <div key={ec.num} className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-2.5">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-400" /> {ec.name}
                      </h3>
                      <span className="text-[11px] text-zinc-400 font-sans">Penalidade Base: {ec.penalty}</span>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-zinc-950 text-yellow-300 border border-zinc-800 font-bold self-start sm:self-auto">
                      Dificuldades: {completedCountForThisEc}/5
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 font-mono text-xs">
                    {ec.tiers.map((t) => {
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
      )}
    </div>
  );
}