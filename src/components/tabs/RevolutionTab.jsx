import React, { useState } from "react";
import { 
  CircleDot, Gift, ArrowUpCircle, ShoppingBag, 
  Lightbulb, Keyboard, Zap, Compass, CheckCircle2, 
  Sparkles, Flame, Calendar, RefreshCw, TrendingUp, 
  HelpCircle, Target, Clock, Info
} from "lucide-react";
import { CIRCLES_DATA, DAILY_REWARDS_DATA } from "../../data/gameData";
import { formatScientific } from "../../utils/numberParser";
import { useGame } from "../../context/GameContext";
import SubNavTabs from "../common/SubNavTabs";

export default function RevolutionTab() {
  const { gameState, updateStat } = useGame();
  const [subSection, setSubSection] = useState("circles");

  const streakDay = gameState.stats.streakDay ?? 10;
  const streakBonus = Math.min(50, streakDay * 5);

  const REVO_TABS = [
    { id: "circles", label: "1. Mecânicas Base & Círculos", icon: CircleDot },
    { id: "guide", label: "2. Roteiro Passo a Passo", icon: Compass },
    { id: "rewards", label: "3. Recompensas Diárias (14 Dias)", icon: Gift },
  ];

  return (
    <div className="space-y-6">
      {/* Menu Superior com Rolagem e Botões Laterais */}
      <SubNavTabs
        tabs={REVO_TABS}
        activeTab={subSection}
        onSelectTab={setSubSection}
        colorTheme="red"
      />

      {/* ========================================================================= */}
      {/* 1. MECÂNICAS BASE & CÍRCULOS (FUNDAMENTOS & REGRAS) */}
      {/* ========================================================================= */}
      {subSection === "circles" && (
        <div className="space-y-6">
          {/* Introdução da Sub-Aba 1 */}
          <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-red-500/30 font-sans text-xs space-y-2 shadow-lg">
            <div className="flex items-center gap-2 font-mono text-red-400 font-bold">
              <Info className="w-4 h-4" />
              <span>Sobre esta Sub-Aba: Fundamentos & Regras do Jogo</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Esta seção é o seu <strong>manual de consulta teórico</strong>. Aqui são explicadas as mecânicas elementares que regem a primeira camada: o funcionamento dos 10 círculos, o momento de realizar Ascensões, a lógica dos multiplicadores de Prestígio/Promoções e a tabela de custos de cada cor.
            </p>
          </div>

          {/* Banner Principal */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-red-950/40 via-zinc-900/80 to-zinc-950 border-2 border-red-500/30 shadow-2xl space-y-3">
            <div className="flex items-center gap-3 border-b border-red-500/20 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-red-950 border border-red-500/40 flex items-center justify-center text-red-400 font-black">
                <CircleDot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-red-400 font-bold tracking-wider">
                  Guia Oficial de Mecânicas • Revolução
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Mecânicas Básicas & Estratégias do Jogo
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
              Entenda os conceitos principais de <strong>Pontuação, Multiplicadores, Níveis, Ascensão, Prestígio e Promoções</strong>, além dos momentos ideais para executar cada ação.
            </p>
          </div>

          {/* Conceitos Fundamentais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans text-xs">
            {/* Pontuação */}
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
              <div className="flex items-center gap-2 font-mono">
                <div className="p-1.5 rounded-lg bg-red-950 border border-red-500/40 text-red-400 font-bold">
                  <CircleDot className="w-4 h-4" />
                </div>
                <strong className="text-sm font-bold text-white">Pontuação (Score ⵙ)</strong>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                É a <strong>moeda principal do jogo</strong>, utilizada por quase todas as mecânicas. Você ganha pontos cada vez que uma cor completa uma volta inteira (revolução).
              </p>
            </div>

            {/* Mult */}
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
              <div className="flex items-center gap-2 font-mono">
                <div className="p-1.5 rounded-lg bg-orange-950 border border-orange-500/40 text-orange-400 font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <strong className="text-sm font-bold text-white">Multiplicador (Mult)</strong>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Multiplica sua pontuação a cada revolução. Cada cor aumenta seu número próprio no topo da tela. O valor final recebido é o resultado da multiplicação de todas as cores combinadas.
              </p>
            </div>

            {/* Nível */}
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
              <div className="flex items-center gap-2 font-mono">
                <div className="p-1.5 rounded-lg bg-yellow-950 border border-yellow-500/40 text-yellow-400 font-bold">
                  <Zap className="w-4 h-4" />
                </div>
                <strong className="text-sm font-bold text-white">Nível dos Círculos</strong>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Cada cor possui seu próprio nível. Ao aumentá-lo usando pontos, você <strong>aumenta a velocidade de rotação (voltas/s)</strong> da cor correspondente e se aproxima das Ascensões.
              </p>
            </div>

            {/* Ascensão */}
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
              <div className="flex items-center gap-2 font-mono">
                <div className="p-1.5 rounded-lg bg-amber-950 border border-amber-500/40 text-amber-400 font-bold">
                  <ArrowUpCircle className="w-4 h-4" />
                </div>
                <strong className="text-sm font-bold text-white">Ascensão (Botão "A")</strong>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Ocorre ao atingir o nível máximo da cor. Ao clicar no <strong>"A"</strong>, o nível da cor é redefinido para 5, mas seu ganho de multiplicador por volta sobe em <strong>10x (Asc. Power)</strong> e o teto máximo de nível aumenta em +10.
              </p>
            </div>

            {/* Prestígio */}
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
              <div className="flex items-center gap-2 font-mono">
                <div className="p-1.5 rounded-lg bg-purple-950 border border-purple-500/40 text-purple-400 font-bold">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <strong className="text-sm font-bold text-white">Prestígio (1e10 Score)</strong>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Redefine a pontuação acumulada, níveis e ascensões de todas as cores. Em troca, concede <strong>P.Mult</strong> (multiplicador geral) e <strong>P.Expoente</strong> (potência exponencial sobre o ganho total).
              </p>
            </div>

            {/* Promoção */}
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
              <div className="flex items-center gap-2 font-mono">
                <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <strong className="text-sm font-bold text-white">Promoções (1k P.Mult)</strong>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Reseta todo o progresso (incluindo Prestígio) para conceder bônus permanentes em 4 áreas: <strong>#1 Ganho de Mult</strong>, <strong>#2 Velocidade de Voltas</strong>, <strong>#3 Poder de Ascensão</strong> e <strong>#4 Poder de Promoção</strong>.
              </p>
            </div>
          </div>

          {/* Estratégias & Regras de Decisão */}
          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-5 font-sans text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <HelpCircle className="w-4 h-4 text-red-400" /> Estratégias Práticas: Como e Quando Agir
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <strong className="text-red-300 font-mono text-xs block">🛒 Regras de Compra de Círculos</strong>
                <p className="text-zinc-400 leading-relaxed">
                  • <strong>Prioridade:</strong> Antes do primeiro infinito, priorize os círculos de menor custo (como Vermelho e Laranja), pois giram muito mais rápido.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  • <strong>Novos Círculos:</strong> Ao desbloquear um círculo novo, aguarde até que seus pontos ultrapassem o <strong>dobro do custo</strong> dele, já que novas cores começam muito lentas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <strong className="text-amber-300 font-mono text-xs block">⚡ Estratégia de Ascensão</strong>
                <p className="text-zinc-400 leading-relaxed">
                  • <strong>Por que ascender?</strong> Concede um salto de 10x no ganho daquela cor.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  • <strong>Quando ascender?</strong> Como o nível cai para 5, ascenda apenas quando tiver círculos rápidos de apoio ou aguarde 1 ou 2 cores adicionais ficarem prontas (com pontos de 1.000x a 10.000x acima do custo máximo).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <strong className="text-purple-300 font-mono text-xs block">🔄 Estratégia de Prestígio</strong>
                <p className="text-zinc-400 leading-relaxed">
                  • <strong>Por que prestigiar?</strong> Eleva o multiplicador e o expoente comum, acelerando a escalada de pontuação.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  • <strong>Quando prestigiar?</strong> Faça a 1ª vez em <strong>20x P.Mult</strong>. Nos seguintes, prestigie apenas quando o multiplicador for pelo menos <strong>100x maior</strong> que o atual.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <strong className="text-cyan-300 font-mono text-xs block">🌟 Estratégia de Promoções</strong>
                <p className="text-zinc-400 leading-relaxed">
                  • <strong>Quando promover?</strong> Aguarde atingir ganho <strong>x6</strong> no 1º promote. Promover cedo ou tarde demais reduz a eficiência dos ganhos.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  • <strong>Por que a Promoção 1 primeiro?</strong> O multiplicador é a base que sustenta o aumento da pontuação.
                </p>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-cyan-500/30 font-mono text-[11px] text-cyan-200 mt-1">
                  Ordem Inicial: <strong>1 → 2 → 1 → 3 → 4</strong><br />
                  Ordem Regular: <strong>1 → 2 → 3 → 4</strong><br />
                  Ordem com Automação: <strong>2 → 1 → 3 → 4</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela Técnica dos 10 Círculos */}
          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                  <CircleDot className="w-4 h-4 text-red-400" /> Tabela de Custos e Velocidades dos 10 Círculos
                </h3>
                <span className="text-[11px] font-mono text-zinc-500">Ordem de Desbloqueio: Vermelho (Rápido) → Branco (Lento)</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300 font-mono">
                <thead className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5">Cor</th>
                    <th className="py-2.5">Custo Inicial (Nível 0)</th>
                    <th className="py-2.5">Multiplicador de Custo</th>
                    <th className="py-2.5">Voltas/s Base</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {CIRCLES_DATA.map((c) => (
                    <tr key={c.name} className="hover:bg-zinc-800/30 transition-colors">
                      <td className={`py-2 font-bold ${c.color}`}>{c.name}</td>
                      <td className="py-2 text-zinc-300">{formatScientific(c.initialCost)} ⵙ</td>
                      <td className="py-2 text-zinc-400">+{c.costMult.toFixed(2)}x (+0.1 p/ Ascensão)</td>
                      <td className="py-2 text-emerald-400">+{c.baseSpeed.toFixed(3)}/s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ROTEIRO PASSO A PASSO (ROTEIRO ORGÂNICO & DIDÁTICO) */}
      {/* ========================================================================= */}
      {subSection === "guide" && (
        <div className="space-y-6">
          {/* Introdução da Sub-Aba 2 */}
          <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-red-500/30 font-sans text-xs space-y-2 shadow-lg">
            <div className="flex items-center gap-2 font-mono text-red-400 font-bold">
              <Compass className="w-4 h-4" />
              <span>Sobre esta Sub-Aba: O Guia Prático de Execução</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Esta seção é o seu <strong>mapa de progressão prática</strong>. Ela organiza a sua jornada desde a primeira rotação até o primeiro reset de Infinito (1.79e308 Score), dividida em 4 etapas sequenciais com metas exatas de quando realizar cada reset e quais níveis buscar em cada promoção.
            </p>
          </div>

          {/* Header do Roteiro */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-red-950/40 via-zinc-900/70 to-zinc-950 border-2 border-red-500/30 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-500/20 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-red-400 font-bold tracking-wider">
                  Trilha de Progressão • Pré-Infinito
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Roteiro Completo: O Caminho até o 1º Infinito
                </h1>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-3 py-1.5 rounded-full bg-red-950 border border-red-500/40 text-red-300 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Duração Média: ~12 Horas
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
              O início do <strong>Revolution Idle</strong> é sequencial e dividido em <strong>4 marcos naturais</strong>. Siga os passos na ordem abaixo para evitar travamentos e alcançar o limite de <strong>1.79e308 Score ⵙ</strong> com velocidade.
            </p>

            {/* Dica Rápida de Entrada */}
            <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-2xl flex items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-amber-200">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Primeiro Passo Gratuito:</strong> Abra a aba "Créditos" à direita no jogo para liberar a <strong>Conquista #005</strong> e ganhar +0.01x de bônus imediato.</span>
              </div>
            </div>
          </div>

          {/* Linha do Tempo Sequencial dos 4 Passos */}
          <div className="space-y-4 font-sans text-xs">
            {/* ETAPA 1 */}
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-950 border border-red-500/40 text-red-400 font-mono font-bold flex items-center justify-center text-sm shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">Etapa 1: A Rampa Inicial (0 a 10 Bilhões)</h3>
                    <span className="text-[11px] text-zinc-400 font-mono">Foco: Círculos Baratos, Níveis e Primeiras Ascensões</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 font-mono text-[11px] w-fit">
                  Alvo: 1e10 Score ⵙ
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1.5">
                  <strong className="text-zinc-200 flex items-center gap-1.5 font-mono text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Como Comprar Círculos:
                  </strong>
                  <p className="text-zinc-400 leading-relaxed">
                    Priorize sempre os círculos menores (Vermelho e Laranja). Desbloqueie uma nova cor comprando 5 níveis da anterior, mas só compre o primeiro nível da nova cor quando seu saldo for o <strong>dobro do preço dela</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1.5">
                  <strong className="text-zinc-200 flex items-center gap-1.5 font-mono text-xs">
                    <ArrowUpCircle className="w-3.5 h-3.5 text-amber-400" /> A Regra da Ascensão (Botão "A"):
                  </strong>
                  <p className="text-zinc-400 leading-relaxed">
                    Ascender multiplica o ganho por <strong>10x</strong>, mas reduz o nível da cor para 5. <strong>Não ascenda imediatamente se for sua única cor rápida:</strong> espere ter uma segunda cor pronta para não desacelerar sua produção.
                  </p>
                </div>
              </div>
            </div>

            {/* ETAPA 2 */}
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-950 border border-orange-500/40 text-orange-400 font-mono font-bold flex items-center justify-center text-sm shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">Etapa 2: A Escala de Prestígio (P.Mult)</h3>
                    <span className="text-[11px] text-zinc-400 font-mono">Foco: Multiplicadores em Ordens de Magnitude</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 font-mono text-[11px] w-fit">
                  Alvo: 1.000x P.Mult
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-zinc-300 leading-relaxed">
                  O Prestígio é desbloqueado em <strong>10 Bilhões (1e10 Score)</strong>. Como ele reinicia todas as cores e ascensões, só vale a pena resetar quando o retorno for expressivo.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                  <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                    <span className="text-orange-400 font-bold block">1º Prestígio</span>
                    <p className="text-zinc-400 font-sans text-[11px]">Faça assim que atingir entre <strong>10x e 20x P.Mult</strong>.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                    <span className="text-orange-400 font-bold block">Prestígios Seguintes</span>
                    <p className="text-zinc-400 font-sans text-[11px]">Espere saltos de <strong>100x a 1.000x</strong> (10x → 1k → 100k → 1M).</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-zinc-950 border border-orange-500/40 bg-orange-950/10 space-y-1">
                    <span className="text-orange-300 font-bold block">Gatilho de Transição</span>
                    <p className="text-zinc-400 font-sans text-[11px]">Ao bater <strong>1.000x P.Mult</strong>, pare e prepare seu 1º Promote.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ETAPA 3 */}
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-400 font-mono font-bold flex items-center justify-center text-sm shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">Etapa 3: O Motor de Promoções (1 a 4)</h3>
                    <span className="text-[11px] text-zinc-400 font-mono">Foco: Evolução Permanente em 4 Categorias</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 font-mono text-[11px] w-fit">
                  Alvo: Promoções Nível ~75
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-zinc-300 leading-relaxed">
                  As Promoções guardam bônus permanentes. O primeiro promote deve ser obrigatoriamente na <strong>Promoção #1 (Mult Gain)</strong> ao alcançar ganho de ~x6 (Nível 3). Em seguida, siga o fluxo recomendado:
                </p>

                <div className="p-4 rounded-2xl bg-zinc-950 border border-purple-500/30 space-y-2.5 font-mono text-xs">
                  <div className="text-purple-300 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Sequência de Níveis Recomendada:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px]">
                    <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                      <strong className="text-white block">#1 Mult Gain</strong>
                      <span className="text-zinc-400">Nv. 3 → 8 → 20 → 30 → 80</span>
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                      <strong className="text-white block">#2 Laps Speed</strong>
                      <span className="text-zinc-400">Nv. 10 → 40 (Final)</span>
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                      <strong className="text-white block">#3 Asc. Power</strong>
                      <span className="text-zinc-400">Nv. 30 → 70 (Final)</span>
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                      <strong className="text-white block">#4 Promo Power</strong>
                      <span className="text-purple-300">Nv. 50 (Multiplica as 3)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ETAPA 4 */}
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-mono font-bold flex items-center justify-center text-sm shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">Etapa 4: A Reta Final (O Primeiro Infinito)</h3>
                    <span className="text-[11px] text-zinc-400 font-mono">Foco: Prestígio Final de 1e42 e Salto para 1.79e308</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-bold w-fit">
                  Meta: 1.79e308 Score ⵙ
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1.5">
                  <strong className="text-zinc-200 flex items-center gap-1.5 font-mono text-xs">
                    <Target className="w-3.5 h-3.5 text-cyan-400" /> Checklist Antes do Salto:
                  </strong>
                  <ul className="text-zinc-400 space-y-1 text-[11px]">
                    <li>• Todas as 4 promoções por volta do nível <strong>75 a 80</strong>.</li>
                    <li>• Prestígio em cerca de <strong>1e42 (1 TDC) de P.Mult</strong>.</li>
                    <li>• Deixe todas as cores produzindo no nível máximo.</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-950 border border-cyan-500/30 space-y-1.5 bg-cyan-950/10">
                  <strong className="text-cyan-300 flex items-center gap-1.5 font-mono text-xs">
                    <Zap className="w-3.5 h-3.5 text-yellow-400" /> O Botão "Infinite":
                  </strong>
                  <p className="text-zinc-300 leading-relaxed text-[11px]">
                    Ao bater <strong>1.79e308 Score ⵙ</strong>, o botão de <strong>Infinity</strong> aparecerá. Clique nele para realizar seu primeiro reset maior, ganhar seu <strong>1º Ponto de Infinito (IP)</strong> e desbloquear a aba <strong>Infinito (Automações & Geradores)</strong>!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dicas de Atalhos e Configurações */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Keyboard className="w-3.5 h-3.5" /> Atalhos Essenciais
              </span>
              <p className="text-[11px] font-sans text-zinc-400">
                <strong className="text-white">B:</strong> Comprar Cores • <strong className="text-white">P:</strong> Prestigiar • <strong className="text-white">1-4:</strong> Promover.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Notação Científica
              </span>
              <p className="text-[11px] font-sans text-zinc-400">
                Ative a Notação Científica nas opções para ler números astronômicos (1e10, 1e42, 1e308) com precisão.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-purple-400 font-bold flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" /> Almas (Souls)
              </span>
              <p className="text-[11px] font-sans text-zinc-400">
                O jogo é 100% F2P. Guarde Almas para cosméticos ou use Time Flux 2x apenas se quiser acelerar esperas.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. CALENDÁRIO DE RECOMPENSAS DIÁRIAS */}
      {/* ========================================================================= */}
      {subSection === "rewards" && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Introdução da Sub-Aba 3 */}
          <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-purple-500/30 font-sans text-xs space-y-2 shadow-lg">
            <div className="flex items-center gap-2 font-mono text-purple-400 font-bold">
              <Calendar className="w-4 h-4" />
              <span>Sobre esta Sub-Aba: Sistema de Bônus Diário</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Esta seção gerencia as <strong>recompensas gratuitas do ciclo de 14 dias</strong>. Faça login diariamente para acumular Almas (Souls) e Time Flux. Ajuste o controle de sequência abaixo para simular o bônus de até +50% recebido em dias consecutivos.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-950/40 via-zinc-900/80 to-zinc-950 border-2 border-purple-500/30 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-purple-400 font-bold tracking-wider">
                    Ciclo Quinzenal • 14 Dias
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Calendário de Recompensas Diárias
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-200 font-mono text-xs w-fit">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Média: ~232 Almas / dia</span>
              </div>
            </div>

            {/* Slider de Sequência (Streak) */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3 font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  Sequência Consecutiva de Login: <strong className="text-purple-300">{streakDay} Dias</strong>
                </span>
                <span className="text-emerald-400 font-bold text-xs bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg w-fit">
                  Bônus Ativo: +{streakBonus}% em Almas
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="10"
                value={streakDay}
                onChange={(e) => updateStat("streakDay", Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-zinc-800 accent-purple-500 cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-zinc-500 font-mono pt-0.5">
                <span>0 Dias (+0%)</span>
                <span>5 Dias (+25%)</span>
                <span>10 Dias (Cap Máximo: +50%)</span>
              </div>
            </div>
          </div>

          {/* Grid de 14 Dias */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 font-mono">
            {DAILY_REWARDS_DATA.map((r) => {
              const isSouls = r.type === "souls";
              const rawAmount = parseInt(r.reward.replace(/\D/g, ""), 10) || 0;
              const boostedAmount = isSouls ? Math.round(rawAmount * (1 + streakBonus / 100)) : 0;
              const isGrandReward = r.day === 7 || r.day === 14;

              return (
                <div
                  key={r.day}
                  className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all duration-200 ${
                    isGrandReward
                      ? "bg-gradient-to-b from-purple-950/50 to-zinc-950 border-purple-500/50 shadow-lg shadow-purple-950/30"
                      : "bg-zinc-950 border-zinc-800/90 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">
                      Dia {r.day}
                    </span>
                    {isGrandReward && (
                      <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-amber-950 border border-amber-500/40 text-amber-300">
                        MARCO
                      </span>
                    )}
                  </div>

                  <div className="py-2">
                    <div className="text-xl mb-1">
                      {isSouls ? "🔮" : "⏳"}
                    </div>
                    <strong
                      className={`text-xs sm:text-sm font-black block leading-tight ${
                        isSouls ? "text-purple-300" : "text-cyan-300"
                      }`}
                    >
                      {isSouls && streakBonus > 0 ? `+${boostedAmount}` : r.reward}
                    </strong>
                    <span className="text-[9px] text-zinc-500 block mt-0.5 uppercase">
                      {isSouls ? "Almas (Souls)" : "Time Flux"}
                    </span>
                  </div>

                  {isSouls && streakBonus > 0 && (
                    <div className="pt-2 border-t border-zinc-800/80 text-[9px] text-emerald-400 font-bold flex items-center justify-between">
                      <span>Base: {rawAmount}</span>
                      <span>+{streakBonus}%</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}