import React, { useState, useMemo } from "react";
import { 
  Trophy, Sparkles, Check, Settings, 
  Clock, GitBranch, Cpu, Info, 
  CheckCircle2, ArrowRight, Zap, Target, Lock, Filter,
  Layers, ChevronUp, Star, ShieldAlert
} from "lucide-react";
import { INFINITY_CHALLENGES } from "../../data/gameData";
import { useGame } from "../../context/GameContext";
import SubNavTabs from "../common/SubNavTabs";

// Definição estrutural dos nós da árvore (Base -> Topo conforme imagens do jogo)
const TREE_NODES = {
  "1;1": { id: "INF_1_1", label: "[1;1]", name: "Geração e Automação Infinita", cost: "1 IP", desc: "Multiplica geradores pelos Infinitos e desbloqueia autocompra de cores." },
  "2;1": { id: "INF_2_1", label: "[2;1]", name: "Potência da Caixa", cost: "1 IP", desc: "Bônus direto ao expoente geral de pontuação." },
  "2;2": { id: "INF_2_2", label: "[2;2]", name: "Automação de Ascensão", cost: "1 IP", desc: "Desbloqueia a auto ascensão de círculos." },
  "3;1": { id: "INF_3_1", label: "[3;1]", name: "Aceleração de Voltas", cost: "1 IP", desc: "Multiplica a velocidade de volta (laps/s) de todas as cores." },
  "4;1": { id: "INF_4_1", label: "[4;1]", name: "Velocidade Contínua", cost: "2 IP", desc: "Aumenta a velocidade de voltas com base no tempo." },
  "5;1": { id: "INF_5_1", label: "[5;1]", name: "Aumento de P.Mult", cost: "3 IP", desc: "P.Mult aumenta com base no tempo na corrida de Infinito." },
  "5;2": { id: "INF_5_2", label: "[5;2]", name: "Expoente Sólido", cost: "3 IP", desc: "Ganho de expoente multiplicado pelos Infinitos." },
  "5;3": { id: "INF_5_3", label: "[5;3]", name: "Auto Prestígio", cost: "3 IP", desc: "Desbloqueia a automação completa do Prestígio." },
  "6;1": { id: "INF_6_1", label: "[6;1]", name: "Ascensão Pesada", cost: "5 IP", desc: "+2 para o poder de ascensão base." },
  "6;2": { id: "INF_6_2", label: "[6;2]", name: "Ascensão por Infinitos", cost: "5 IP", desc: "Ascensões fortalecidas com base na contagem de Infinitos." },
  "7;1": { id: "INF_7_1", label: "[7;1]", name: "Desbloqueio de Desafios", cost: "10 IP", desc: "Desbloqueia os Desafios do Infinito (IC1 a IC9)." },
  "8;1": { id: "INF_8_1", label: "[8;1]", name: "Gerador 1 & Tempo", cost: "16 IP", desc: "G1 mais forte com base no tempo da run." },
  "8;2": { id: "INF_8_2", label: "[8;2]", name: "Gerador 1 & Potência", cost: "32 IP", desc: "G1 mais forte com base no total de GP." },
  "8;3": { id: "INF_8_3", name: "Gerador 1 Constante", label: "[8;3]", cost: "16 IP", desc: "G1 é 5 vezes mais forte." },
  "9;1": { id: "INF_9_1", label: "[9;1]", name: "Gerador 2 & Tempo", cost: "128 IP", desc: "G2 mais forte com base no tempo da run." },
  "9;2": { id: "INF_9_2", label: "[9;2]", name: "Gerador 2 Constante", cost: "128 IP", desc: "G2 é 3 vezes mais forte." },
  "10;1": { id: "INF_10_1", label: "[10;1]", name: "Auto Promoção", cost: "256 IP", desc: "Desbloqueia a automação de Promoções." },
  "11;1": { id: "INF_11_1", label: "[11;1]", name: "Geradores Básicos", cost: "300 IP", desc: "G1 mais forte com base no seu IP atual." },
  "11;2": { id: "INF_11_2", label: "[11;2]", name: "Geradores Médios", cost: "400 IP", desc: "G2 mais forte com base no seu IP atual." },
  "12;1": { id: "INF_12_1", label: "[12;1]", name: "Sinergia de Infinitos", cost: "512 IP", desc: "Infinitos impulsionam o Gerador 2." },
  "13;1": { id: "INF_13_1", label: "[13;1]", name: "Ascensão Bônus", cost: "600 IP", desc: "+1 para o poder de ascensão geral." },
  "14;1": { id: "INF_14_1", label: "[14;1]", name: "Poder de Promoção 1", cost: "1k IP", desc: "1ª Promoção mais forte com base em seu nível." },
  "14;2": { id: "INF_14_2", label: "[14;2]", name: "Eficiência GP", cost: "1k IP", desc: "Expoente de GP elevado para 0.75." },
  "15;1": { id: "INF_15_1", label: "[15;1]", name: "Auto Infinity", cost: "2.5k IP", desc: "Desbloqueia o reset automático de Infinito." },
  "15;2": { id: "INF_15_2", label: "[15;2]", name: "IP por Tempo de Desafio", cost: "2.5k IP", desc: "Ganha mais IP reduzindo o tempo somado dos Desafios." },
  "15;3": { id: "INF_15_3", label: "[15;3]", name: "G1 por Tempo de Desafio", cost: "2.5k IP", desc: "G1 mais forte com base no tempo de desafios." },
  "15;4": { id: "INF_15_4", label: "[15;4]", name: "G2 por Tempo de Desafio", cost: "2.5k IP", desc: "G2 mais forte com base no tempo de desafios." },
  "16;1": { id: "INF_16_1", label: "[16;1]", name: "IP por Infinitos", cost: "5k IP", desc: "Ganha mais IP com base no total de Infinitos." },
  "16;2": { id: "INF_16_2", label: "[16;2]", name: "AP por Infinitos", cost: "5k IP", desc: "Poder de Ascensão impulsionado por Infinitos." },
  "16;3": { id: "INF_16_3", label: "[16;3]", name: "Promo 4 por IC9", cost: "5k IP", desc: "4ª Promoção mais forte baseada no tempo do Desafio 9." },
  "17;1": { id: "INF_17_1", label: "[17;1]", name: "Gerador 3 & Infinitos", cost: "1M IP", desc: "G3 fortalecido pela contagem de Infinitos." },
  "17;2": { id: "INF_17_2", label: "[17;2]", name: "Infinitos por Desafios", cost: "2M IP", desc: "Ganha mais Infinitos com desafios mais rápidos." },
  "17;3": { id: "INF_17_3", label: "[17;3]", name: "Super Impulso G1", cost: "1M IP", desc: "Primeiro gerador fica 10 vezes mais forte." },
  "18;1": { id: "INF_18_1", label: "[18;1]", name: "Infinitos Passivos", cost: "2e11 IP", desc: "Ganha Infinitos continuamente com base no mais rápido." },
  "18;2": { id: "INF_18_2", label: "[18;2]", name: "G4 a partir de G3", cost: "1e11 IP", desc: "G4 mais forte com base em compras de G4." },
  "18;3": { id: "INF_18_3", label: "[18;3]", name: "G3 a partir de G2", cost: "1e11 IP", desc: "G3 mais forte com base em compras de G2." },
  "19;1": { id: "INF_19_1", label: "[19;1]", name: "Quase Um", cost: "1e12 IP", desc: "Expoente dos geradores elevado para 0.90." },
  "19;2": { id: "INF_19_2", label: "[19;2]", name: "Era da Inflação", cost: "3e12 IP", desc: "3ª Promoção fortalecida pelo multiplicador de GP." },
  "19;3": { id: "INF_19_3", label: "[19;3]", name: "Velocidade p/ Desafios", cost: "1e12 IP", desc: "Multiplica a velocidade de todas as voltas em 3x." },
  "20;1": { id: "INF_20_1", label: "[20;1]", name: "Rápido como Forte", cost: "1e21 IP", desc: "Geradores fortalecidos pelo seu Infinito mais rápido." },
  "20;2": { id: "INF_20_2", label: "[20;2]", name: "Expoente Dinâmico", cost: "1e27 IP", desc: "Expoente dos geradores escala com a quantidade de GP." },
  "21;1": { id: "INF_21_1", label: "[21;1]", name: "Estrela Cadente", cost: "1e33 IP", desc: "Desbloqueia a sub-aba de Estrelas e Poeira Estelar." }
};

// Configuração visual dos andares da árvore (Topo para a Base)
const TREE_TIERS = [
  { tier: "21", nodes: ["21;1"] },
  { tier: "20", nodes: ["20;1", "20;2"] },
  { tier: "19", nodes: ["19;1", "19;2", "19;3"] },
  { tier: "18", nodes: ["18;1", "18;2", "18;3"] },
  { tier: "17", nodes: ["17;1", "17;2", "17;3"] },
  { tier: "16", nodes: ["16;1", "16;2", "16;3"] },
  { tier: "15", nodes: ["15;1", "15;2", "15;3", "15;4"] },
  { tier: "14", nodes: ["14;1", "14;2"] },
  { tier: "13", nodes: ["13;1"] },
  { tier: "12", nodes: ["12;1"] },
  { tier: "11", nodes: ["11;1", "11;2"] },
  { tier: "10", nodes: ["10;1"] },
  { tier: "9", nodes: ["9;1", "9;2"] },
  { tier: "8", nodes: ["8;1", "8;2", "8;3"] },
  { tier: "7", nodes: ["7;1"] },
  { tier: "6", nodes: ["6;1", "6;2"] },
  { tier: "5", nodes: ["5;1", "5;2", "5;3"] },
  { tier: "4", nodes: ["4;1"] },
  { tier: "3", nodes: ["3;1"] },
  { tier: "2", nodes: ["2;1", "2;2"] },
  { tier: "1", nodes: ["1;1"] }
];

export default function InfinityTab() {
  const { gameState, toggleTask } = useGame();
  const [subSection, setSubSection] = useState("overview");
  const [selectedNodeKey, setSelectedNodeKey] = useState("1;1");
  const [challengeFilter, setChallengeFilter] = useState("all");

  const checkedTasks = gameState.completedTasks || {};

  const totalTreeCompleted = useMemo(() => {
    return Object.keys(checkedTasks).filter(k => k.startsWith("INF_") && checkedTasks[k]).length;
  }, [checkedTasks]);

  const totalIcCompleted = useMemo(() => {
    return Object.keys(checkedTasks).filter(k => k.startsWith("IC") && checkedTasks[k]).length;
  }, [checkedTasks]);

  const activeNode = TREE_NODES[selectedNodeKey] || TREE_NODES["1;1"];

  const INFINITY_TABS = [
    { id: "overview", label: "0. O que é o Infinito?", icon: Info },
    { id: "tree", label: "1. Árvore de Melhorias", icon: GitBranch, badge: `${totalTreeCompleted}/41` },
    { id: "generators", label: "2. Geradores (GP)", icon: Cpu },
    { id: "challenges", label: "3. Desafios (IC1 a IC9)", icon: Trophy, badge: `${totalIcCompleted}/9` },
    { id: "stars", label: "4. Estrelas & Poeira Estelar", icon: Sparkles },
  ];

  return (
    <div className="space-y-6">
      {/* Menu Superior da Camada de Infinito */}
      <SubNavTabs
        tabs={INFINITY_TABS}
        activeTab={subSection}
        onSelectTab={setSubSection}
        colorTheme="purple"
      />

      {/* ========================================================================= */}
      {/* 0. O QUE É O INFINITO? */}
      {/* ========================================================================= */}
      {subSection === "overview" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-950/40 via-zinc-900/80 to-zinc-950 border-2 border-purple-500/30 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-purple-500/20 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-300 font-black text-lg">
                ∞
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">
                  Camada 2 de Prestígio • Desbloqueio em 1.79e308 Score
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Bem-vindo à Camada do Infinito
                </h1>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
              Ao atingir o limite clássico de ponto flutuante (1.79e308 Score ⵙ), o jogo permite realizar o reset de <strong>Infinito</strong>. Isso zera seu Score, Prestígio e Promoções, concedendo duas moedas principais:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-sans text-xs">
              <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-1.5">
                <strong className="text-purple-300 font-mono text-sm flex items-center gap-1.5">
                  ∞ Contagem de Infinitos
                </strong>
                <p className="text-zinc-400 leading-relaxed">
                  Registra quantas vezes você realizou o reset. Vários upgrades da árvore aumentam seus multiplicadores com base diretamente neste número total acumulado.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-1.5">
                <strong className="text-yellow-300 font-mono text-sm flex items-center gap-1.5">
                  ✨ Pontos de Infinito (IP)
                </strong>
                <p className="text-zinc-400 leading-relaxed">
                  A moeda de troca da camada. Usada para comprar os 41 upgrades da Árvore de Habilidades, desbloquear Geradores e, posteriormente, adquirir Estrelas.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2">
              <strong className="text-emerald-300 font-mono text-xs flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-emerald-400" /> 1. Automação Plena
              </strong>
              <p className="text-zinc-400 leading-relaxed">
                O foco da fase inicial é desbloquear a autocompra de cores (1:1), auto ascensão (2:2), auto prestígio (5:3) e auto promoções (10:1), tornando suas corridas 100% automáticas.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2">
              <strong className="text-cyan-300 font-mono text-xs flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" /> 2. Potência dos Geradores
              </strong>
              <p className="text-zinc-400 leading-relaxed">
                Você desbloqueia até 10 geradores que produzem GP em cascata, multiplicando exponencialmente o ganho de multiplicador de todas as cores.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2">
              <strong className="text-yellow-300 font-mono text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-yellow-400" /> 3. Quebra do Limite & Estrelas
              </strong>
              <p className="text-zinc-400 leading-relaxed">
                Após vencer os 9 Desafios, você quebra o Infinito. Isso remove o teto de 1.79e308, escala seus ganhos a cada 1e308 adicionais e abre caminho para as Estrelas rumo à <strong>Eternidade</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. ÁRVORE DE MELHORIAS */}
      {/* ========================================================================= */}
      {subSection === "tree" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                  <GitBranch className="w-4 h-4 text-purple-400" /> Árvore de Upgrades do Infinito
                </h3>
                <span className="text-[11px] text-zinc-400 font-sans">
                  Clique no nó para inspecionar e marcar sua compra
                </span>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-950 border border-purple-500/40 text-purple-300 font-bold">
                {totalTreeCompleted}/41 Comprados
              </span>
            </div>

            <div className="p-4 rounded-3xl bg-[#120824] border border-purple-900/50 max-h-[580px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-900/60 space-y-4">
              {TREE_TIERS.map((tierData) => (
                <div key={tierData.tier} className="flex flex-col items-center">
                  <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                    {tierData.nodes.map((nodeKey) => {
                      const node = TREE_NODES[nodeKey];
                      const isPurchased = !!checkedTasks[node.id];
                      const isSelected = selectedNodeKey === nodeKey;

                      return (
                        <button
                          key={nodeKey}
                          onClick={() => setSelectedNodeKey(nodeKey)}
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex flex-col items-center justify-center p-1 transition-all relative ${
                            isSelected
                              ? "border-yellow-400 shadow-lg shadow-yellow-500/30 scale-105 z-10"
                              : isPurchased
                              ? "border-purple-400 bg-purple-900/50 text-purple-200"
                              : "border-purple-800/80 bg-purple-950/40 text-purple-400 hover:border-purple-600"
                          }`}
                        >
                          <span className="text-[10px] sm:text-[11px] font-mono font-black block leading-none">
                            {node.label}
                          </span>
                          <span className="text-[8px] sm:text-[9px] font-sans text-center line-clamp-2 mt-1 leading-tight opacity-90">
                            {node.name}
                          </span>
                          {isPurchased && (
                            <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {tierData.tier !== "1" && (
                    <div className="w-0.5 h-3 bg-purple-800/60 my-0.5" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-b from-purple-950/50 via-zinc-900/70 to-zinc-950 border-2 border-purple-500/40 shadow-2xl space-y-5 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <span className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                {activeNode.label} {activeNode.name}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-purple-500/40 text-purple-300 font-bold">
                Custo: {activeNode.cost}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-2 font-sans text-xs">
              <strong className="text-zinc-200 block font-mono">Descrição do Efeito:</strong>
              <p className="text-zinc-400 leading-relaxed">{activeNode.desc}</p>
            </div>

            <button
              onClick={() => toggleTask(activeNode.id)}
              className={`w-full py-3 rounded-2xl font-bold font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                checkedTasks[activeNode.id]
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-950/40"
                  : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-950/40"
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{checkedTasks[activeNode.id] ? "Marcado como Comprado!" : "Marcar como Comprado"}</span>
            </button>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 space-y-1.5 leading-relaxed font-sans">
              <div className="font-mono text-purple-300 font-bold">💡 Dica de Progressão:</div>
              <div>• Compre na ordem numérica das colunas (Col 1 até Col 21).</div>
              <div>• Ao chegar em <strong>[7;1]</strong>, alterne entre compras e a conclusão dos Desafios do Infinito.</div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. GERADORES */}
      {/* ========================================================================= */}
      {subSection === "generators" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-zinc-900/80 to-zinc-950 border-2 border-cyan-500/30 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-black">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                  Potência do Gerador • G1 a G10
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Como Funcionam os Geradores de Infinito
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
              Os Geradores produzem <strong>Generator Power (GP)</strong> em cascata: o Gerador 10 produz G9, G9 produz G8, e assim sucessivamente até o Gerador 1, que gera a Potência Total diretamente aplicada como multiplicador sobre todas as cores.
            </p>

            <div className="p-4 rounded-2xl bg-zinc-950/90 border border-cyan-500/30 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-cyan-200">
              <span>Fórmula Padrão: <strong>Multiplicador = GP ^ 0.666 (2/3)</strong></span>
              <span className="text-[11px] text-zinc-400 font-sans">Cada compra multiplica a produção daquele tier por 2x</span>
            </div>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {[
              { tier: 1, name: "Gerador 1 (G1)", desc: "Produz Generator Power (GP) direto para multiplicar o ganho das cores.", cost: "10 IP base" },
              { tier: 2, name: "Gerador 2 (G2)", desc: "Produz unidades de Gerador 1 (G1) continuamente.", cost: "100 IP base" },
              { tier: 3, name: "Gerador 3 (G3)", desc: "Produz unidades de Gerador 2 (G2).", cost: "1k IP base" },
              { tier: 4, name: "Gerador 4 (G4)", desc: "Produz unidades de Gerador 3 (G3).", cost: "10k IP base" },
              { tier: 5, name: "Gerador 5 (G5)", desc: "Produz unidades de Gerador 4 (G4).", cost: "100k IP base" },
              { tier: 6, name: "Gerador 6 (G6)", desc: "Produz unidades de Gerador 5 (G5).", cost: "1M IP base" },
              { tier: 7, name: "Gerador 7 (G7)", desc: "Produz unidades de Gerador 6 (G6).", cost: "10M IP base" },
              { tier: 8, name: "Gerador 8 (G8)", desc: "Produz unidades de Gerador 7 (G7).", cost: "100M IP base" },
              { tier: 9, name: "Gerador 9 (G9)", desc: "Produz unidades de Gerador 8 (G8).", cost: "1B IP base" },
              { tier: 10, name: "Gerador 10 (G10)", desc: "Produz unidades de Gerador 9 (G9) — Tier mais alto.", cost: "10B IP base" }
            ].map((g) => (
              <div key={g.tier} className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center font-bold text-cyan-400 text-xs shrink-0">
                    {g.tier}
                  </span>
                  <div>
                    <strong className="text-white text-xs">{g.name}</strong>
                    <p className="text-[11px] text-zinc-400 font-sans">{g.desc}</p>
                  </div>
                </div>
                <span className="text-[11px] text-zinc-500 font-mono self-start sm:self-auto">{g.cost}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DESAFIOS */}
      {/* ========================================================================= */}
      {subSection === "challenges" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-yellow-950/40 via-zinc-900/80 to-zinc-950 border-2 border-yellow-500/30 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-yellow-500/20 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-yellow-950 border border-yellow-500/40 flex items-center justify-center text-yellow-300 font-black">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-yellow-400 font-bold tracking-wider">
                  Desbloqueio em Upgrade [7;1]
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Desafios do Infinito (IC1 a IC9)
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
              Cada desafio concluído concede um bônus específico e adiciona <strong>+1x permanente ao seu multiplicador de ganho de IP</strong> (+10x com todos concluídos). Completar todos os 9 permite <strong>Quebrar o Infinito</strong>.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
              <span className="text-sm font-bold text-white font-mono">
                Progresso: {totalIcCompleted}/9 Desafios Concluídos
              </span>

              <div className="flex items-center gap-1.5 font-mono text-xs">
                <Filter className="w-3.5 h-3.5 text-zinc-400" />
                {[
                  { id: "all", label: "Todos (9)" },
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

            <div className="space-y-3">
              {INFINITY_CHALLENGES.filter(ic => {
                const isDone = !!checkedTasks[ic.id];
                if (challengeFilter === "pending") return !isDone;
                if (challengeFilter === "completed") return isDone;
                return true;
              }).map((ic) => {
                const isDone = !!checkedTasks[ic.id];
                return (
                  <button
                    key={ic.id}
                    role="checkbox"
                    aria-checked={isDone}
                    onClick={() => toggleTask(ic.id)}
                    className={`w-full text-left p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all focus:outline-none ${
                      isDone
                        ? "bg-yellow-950/30 border-yellow-500/40 text-zinc-400"
                        : "bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 mt-0.5 rounded-lg flex items-center justify-center border shrink-0 ${
                        isDone ? "bg-yellow-600 border-yellow-500 text-white" : "border-zinc-700 bg-zinc-900"
                      }`}>
                        {isDone && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-0.5">
                        <div className={`font-bold text-sm ${isDone ? "line-through opacity-70" : "text-white"}`}>
                          {ic.name}
                        </div>
                        <div className="text-xs text-red-400 font-mono">Penalidade: {ic.penalty}</div>
                        <div className="text-xs text-emerald-400 font-mono">Recompensa: {ic.reward}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-400 border border-zinc-800 shrink-0">
                      {isDone ? "✓ Concluído" : "○ Pendente"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. ESTRELAS & POEIRA ESTELAR */}
      {/* ========================================================================= */}
      {subSection === "stars" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-950/40 via-zinc-900/80 to-zinc-950 border-2 border-purple-500/30 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-purple-500/20 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-yellow-300 font-black">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">
                  Última Sub-Aba do Infinito • Upgrade [21;1]
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Estrelas & Poeira Estelar (Stardust)
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
              Desbloqueadas com <strong>1e33 IP</strong>, as Estrelas geram <strong>Poeira Estelar (Stardust)</strong> continuamente, que multiplica o poder de todos os geradores e abre a transição para <strong>1.79e308 IP (Eternidade)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
            {/* Como Funcionam as Estrelas */}
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-3">
              <strong className="text-yellow-300 font-mono text-sm block">⭐ Atualizações de Estrelas</strong>
              <p className="text-zinc-400 leading-relaxed">
                • <strong>Comprar Estrelas:</strong> Aumenta a taxa de geração base de Poeira Estelar.<br />
                • <strong>Base de Estrelas:</strong> Inicia em 2.75 e sobe +0.275 por compra.<br />
                • <strong>Expoente de Estrelas:</strong> Aumenta a conversão de Poeira Estelar em multiplicador de Geradores.
              </p>
            </div>

            {/* As 4 Melhorias de Poeira Estelar */}
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-3">
              <strong className="text-purple-300 font-mono text-sm block">✨ As 4 Melhorias de Poeira Estelar (Ordem de Compra)</strong>
              <div className="space-y-1.5 font-mono text-[11px] text-zinc-300">
                <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800">
                  <strong>1. [1;1] p/ Geradores:</strong> Faz o upgrade [1;1] aplicar em G2, G3... até G10 (Prioridade máxima).
                </div>
                <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800">
                  <strong>2. [2;1] Potência da Caixa:</strong> +0.01 ao expoente da pontuação (máx +0.50).
                </div>
                <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800">
                  <strong>3. Ganho de Infinito:</strong> Multiplica o ganho de IP (+1x por nível).
                </div>
                <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800">
                  <strong>4. [18;1] Velocidade:</strong> Torna o ganho passivo 1.05x mais rápido.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}