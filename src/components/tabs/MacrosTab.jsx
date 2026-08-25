import React, { useState, useMemo } from "react";
import { 
  Code, Copy, CheckCheck, Terminal, 
  Layers, Search, Zap,
  Compass, Flame, ShieldAlert, Cpu,
  ChevronDown, ChevronUp, Infinity as InfinityIcon
} from "lucide-react";

const ALL_MACROS = [
  // =========================================================================
  // 1. INFINITO
  // =========================================================================
  {
    id: "inf-basic-ic",
    category: "Infinito",
    name: "Sequência Rápida de Desafios do Infinito (IC 1 a 9)",
    req: "Desbloqueio de Desafios (Upgrade 7;1)",
    desc: "Executa os 9 Desafios do Infinito em sequência direta para reduzir o tempo somado total e acelerar multiplicadores de tempo.",
    preparations: "Quebre o Infinito, compre melhorias até a coluna 15 e execute para reduzir o tempo somado para < 4s.",
    code: `EnterIC(1, true)
EnterIC(2, true)
EnterIC(3, true)
EnterIC(4, true)
EnterIC(5, true)
EnterIC(6, true)
EnterIC(7, true)
EnterIC(8, true)
EnterIC(9, true)`
  },
  {
    id: "inf-star-destroyer",
    category: "Infinito",
    name: "Star Destroyer (Fix / Run ICs / Break)",
    req: "1ª a 2ª Estrela Desbloqueada",
    desc: "Conserta o Infinito temporariamente, limpa todos os ICs no menor tempo e reabre a quebra do Infinito para maximizar o ganho de IP.",
    preparations: "Execute após comprar colunas 16;x, 17;x ou ao adquirir novas Estrelas.",
    code: `BreakInfinity(false)
EnterIC(1, true)
EnterIC(2, true)
EnterIC(3, true)
EnterIC(4, true)
EnterIC(5, true)
EnterIC(6, true)
EnterIC(7, true)
EnterIC(8, true)
EnterIC(9, true)
BreakInfinity(true)`
  },
  {
    id: "inf-promo-cycle",
    category: "Infinito",
    name: "Ciclo de Promoções Manuais Rumo ao Infinito",
    req: "Transição Pré-Infinito / Quebra",
    desc: "Alterna Prestígio com subida controlada de níveis nas Promoções 2, 3, 1 e 0 antes do primeiro salto.",
    preparations: "Use quando a automação básica travar ou for muito lenta no final do primeiro ciclo.",
    code: `Repeat (2, false)
    Repeat (3, false)
        WaitForSeconds(2.0)
        Prestige()
    Promote(2)
    Repeat (3, false)
        WaitForSeconds(2.0)
        Prestige()
    Promote(3)
    Repeat (3, false)
        WaitForSeconds(2.0)
        Prestige()
    Promote(1)
    Repeat (3, false)
        WaitForSeconds(2.0)
        Prestige()
    Promote(0)
Repeat (3, false)
    WaitForSeconds(2.0)
    Prestige()
WaitForSeconds(3.0)
Infinite()`
  },

  // =========================================================================
  // 2. ETERNIDADE
  // =========================================================================
  {
    id: "et-auto-loop",
    category: "Eternidade",
    name: "Loop Automático de Farm de Eternidade (ET 16-34)",
    req: "16 Eternidades (Marcos 7, 8 e 9)",
    desc: "Executa ICs escalonados por limiar de IP e repete a cada 180s para permitir compras de melhorias e geradores.",
    preparations: "Desative após completar 3 ECs, pois os ICs passam a se manter entre resets.",
    code: `WaitUntil (IP >= 5.00)
BreakInfinity(false)
EnterIC(1, true)
EnterIC(2, true)
WaitUntil (IP >= 32.00)
EnterIC(3, true)
WaitUntil (IP >= 150.00)
EnterIC(4, true)
EnterIC(5, true)
EnterIC(6, true)
WaitUntil (IP >= 600.00)
EnterIC(7, true)
WaitUntil (IP >= 1100.00)
EnterIC(8, true)
EnterIC(9, true)
BreakInfinity(true)
RepeatUntil (IP == 0.00)
	if (IP <= 1.00e36)
		WaitForSeconds(180.0)
		BreakInfinity(true)
		EnterIC(1, true)
		EnterIC(2, true)
		EnterIC(3, true)
		EnterIC(4, true)
		EnterIC(5, true)
		EnterIC(6, true)
		EnterIC(7, true)
		EnterIC(8, true)
		EnterIC(9, true)
		BreakInfinity(true)`
  },

  // =========================================================================
  // 3. UNIDADE & PROVAS
  // =========================================================================
  {
    id: "post-it5",
    category: "Unidade",
    name: "Loop Pós-Insane Trial 5 (IT5)",
    req: "Completar IT5 (65 DTP)",
    desc: "Execução instantânea carregando loadout completo de 65 DTP.",
    preparations: "Configure o Loadout 2 com 65 DTP antes de executar.",
    code: `WaitUntil (DTP == 65.00)
LoadDT(2)
WaitUntil (EP == 0.00)`
  },
  {
    id: "post-it2",
    category: "Unidade",
    name: "Loop Pós-Insane Trial 2 (IT2)",
    req: "Completar IT2",
    desc: "Ciclos rápidos de dilatação e carregamento de DTU 65 DTP.",
    preparations: "Configure o preset 2 com sua build de DTP mais alta.",
    code: `WaitUntil (IP >= 1.80e308)
Eternate()
WaitForSeconds(0.5)

Repeat (3, false)
    Dilate(true)
    WaitForSeconds(0.5)
    Dilate(false)

LoadDT(2)

WaitUntil (EP == 0.00)`
  },
  {
    id: "post-1k-atk",
    category: "Unidade",
    name: "Macro Pós-1k Ataques (Farm Astral)",
    req: "~1000 Ataques / Loadouts 45 e 65 DTP",
    desc: "Completa ECs instantâneos, dilata e carrega DT1 e DT2 para farm massivo de Zodíacos.",
    preparations: "Configure LoadDT(1) com 45 DTP e LoadDT(2) com 65 DTP.",
    code: `WaitUntil (IP >= 1.80e308)
Eternate()
WaitForSeconds(0.5)
Repeat (9, false)
    EnterEC(0, 0, true)
Repeat (1, false)
    Dilate(true)
    WaitForSeconds(1.0)
    Dilate(false)
Repeat (5, false)
    EnterEC(0, 0, true)
WaitForSeconds(0.5)
Repeat (3, false)
    WaitForSeconds(1.0)
    LoadDT(1)
    LoadDT(2)
    Dilate(true)
    WaitForSeconds(1.0)
    Dilate(false)
WaitUntil (EP == 0.00)`
  },
  {
    id: "ht4-full-unity",
    category: "Unidade",
    name: "Full Unity 100% Automático (Pós-HT4)",
    req: "Completar Hard Trial 4 (HT4)",
    desc: "Automatiza a run inteira desde o reset de Unidade até a conclusão de todos os ECs e Árvore de Dilatação.",
    preparations: "Ajuste os tempos de espera caso sua máquina enfrente lag durante a transição.",
    code: `WaitUntil (IP >= 1.80e308)
Eternate()
Repeat (3, false)
    Dilate(true)
    WaitForSeconds(1.0)
    Dilate(false)
Repeat (14, false)
    EnterEC(0, 0, true)
Repeat (2, false)
    Dilate(true)
    WaitForSeconds(1.5)
    Dilate(false)
Repeat (5, false)
    EnterEC(0, 0, true)
Dilate(true)
WaitForSeconds(1.0)
Dilate(false)
LoadDT(0)
WaitForSeconds(1.0)
Dilate(true)
WaitForSeconds(2.0)
Dilate(false)
Repeat (4, false)
    WaitForSeconds(1.0)
    LoadDT(1)
    LoadDT(2)
    Dilate(true)
    WaitForSeconds(1.0)
    Dilate(false)
WaitUntil (EP == 0.00)`
  },
  {
    id: "fast-unity-farm",
    category: "Unidade",
    name: "Farm Rápido de Unidade & Zodíacos",
    req: "Auto Eternate em 1e2467 & Auto Unity Ativo",
    desc: "Loop de pulso mínimo para farming e venda de Zodíacos verdes.",
    preparations: "Configure o descarte automático de Zodíacos na loja do planeta.",
    code: `Infinite()
Eternate()
WaitUntil (EP == 0.00)`
  },

  // =========================================================================
  // 4. MINERAIS & PONTOS DE REFINO (RfP)
  // =========================================================================
  {
    id: "rfp-n32",
    category: "Minerais",
    name: "Farm de RfP Inicial (N32 / M114)",
    req: "Nó N32 desbloqueado (Conquista 291)",
    desc: "Ciclo de polimento duplo e refino com tempo de ~4 segundos por ciclo.",
    preparations: "Requer Conquista 291 para os blocos Polish/Refine.",
    code: `Repeat (3, false)
    WaitForSeconds(0.7)
    PolishPrestige()
WaitUntil (MaxMineralLevelThisRun >= 114)
RefinePrestige()
Restart()`
  },
  {
    id: "rfp-m130",
    category: "Minerais",
    name: "Farm de RfP Intermediário (M130)",
    req: "Nó N36 / Spawn em M130",
    desc: "Resolve a estagnação de Gold perto de M130.",
    preparations: "Aumente N36 se houver lentidão na compra de mineradores.",
    code: `Repeat (2, false)
    WaitForSeconds(0.7)
    PolishPrestige()
WaitUntil (MaxMineralLevelThisRun >= 130)
RefinePrestige()
Restart()`
  },
  {
    id: "rfp-n50",
    category: "Minerais",
    name: "Farm de RfP Turbinado (N50+ / M151)",
    req: "Nó N50+ / Spawn M151",
    desc: "Polimento ultra-rápido de 0.03s para alta taxa de RfP por minuto.",
    preparations: "Certifique-se de rodar o jogo a 60 FPS estáveis.",
    code: `Repeat (2, false)
    WaitForSeconds(0.03)
    PolishPrestige()
WaitUntil (MaxMineralLevelThisRun >= 151)
RefinePrestige()
Restart()`
  },
  {
    id: "rfp-n57",
    category: "Minerais",
    name: "Farm de RfP até N57 (M187)",
    req: "Nó N57 / Spawn M187",
    desc: "Loop de refino otimizado para a reta final de minerais básicos.",
    preparations: "Ative o autoclique de merge no minigame de minerais.",
    code: `Repeat (2, false)
    WaitForSeconds(0.03)
    PolishPrestige()
WaitUntil (MaxMineralLevelThisRun >= 187)
RefinePrestige()
Restart()`
  },
  {
    id: "rfp-m200",
    category: "Minerais",
    name: "Farm Longo de RfP para N60 (M200 / ~10h)",
    req: "Spawn M200 / PP >= 1e100",
    desc: "Grind de longa duração para destravamento do Nó N60.",
    preparations: "Deixe rodando em segundo plano ou durante a noite.",
    code: `WaitUntil (PPAfterPrestige >= 1.00e100)
PolishPrestige()
WaitUntil (MaxMineralLevelThisRun >= 200)
RefinePrestige()
Restart()`
  },
  {
    id: "rfp-vp-limit",
    category: "Minerais",
    name: "Refino Otimizado com Limitação de VP (M260)",
    req: "PP >= 1e400 / Spawn M260",
    desc: "Duplo polimento escalonado por limiar de PP para superar o gargalo de VP.",
    preparations: "Ajuste os valores de PP conforme seus multiplicadores de prestígio.",
    code: `WaitUntil (PPAfterPrestige >= 1.00e400)
PolishPrestige()
WaitUntil (PPAfterPrestige >= 1.00e600)
PolishPrestige()
WaitUntil (MaxMineralLevelThisRun >= 260)
RefinePrestige()
Restart()`
  },
  {
    id: "rfp-n69",
    category: "Minerais",
    name: "Refino de Endgame (Pós-N69 / M294)",
    req: "Nó N69 / PP >= 1e2400",
    desc: "Refino de máxima magnitude para minerais avançados.",
    preparations: "Requer árvore de minerais quase maximizada.",
    code: `WaitUntil (PPAfterPrestige >= 1.00e2400)
PolishPrestige()
WaitUntil (MaxMineralLevelThisRun >= 294)
RefinePrestige()
Restart()`
  },

  // =========================================================================
  // 5. TARÔ & ELEMENTOS
  // =========================================================================
  {
    id: "tarot-main",
    category: "Tarô & Elementos",
    name: "Loop Principal de Arcanas do Tarô",
    req: "Tarot Desbloqueado",
    desc: "Ativa todas as cartas Arcanas essenciais, spawna tarô e reinicia o loop.",
    preparations: "Certifique-se de que a velocidade de cooldown do Tarô suporte o ciclo.",
    code: `UseArcan(9)
UseArcan(0)
UseArcan(1)
UseArcan(7)
UseArcan(5)
UseArcan(17)
UseArcan(18)
UseArcan(21)
UseArcan(11)
UseArcan(12)
UseArcan(19)
TarotSpawn(3)
UseArcan(15)
Restart()`
  },
  {
    id: "tarot-tower-sm",
    category: "Tarô & Elementos",
    name: "Foco em Torre (Base de Minerais Especiais)",
    req: "Minerais Especiais (SM)",
    desc: "Uso concentrado das cartas 9, 16 e 21 para elevar a base dos SMs.",
    preparations: "Ideal para preparar o grid antes de fundir minerais raros.",
    code: `WaitForSeconds(1)
UseArcan(9)
UseArcan(16)
UseArcan(21)
WaitForSeconds(1)`
  },
  {
    id: "elements-cycle-4planets",
    category: "Tarô & Elementos",
    name: "Ciclagem Rápida dos 4 Elementos & Planetas",
    req: "4 Slots de Planetas",
    desc: "Alterna entre Terra, Fogo, Vento e Água a cada segundo.",
    preparations: "Configure os presets 0 a 3 na tela de planetas.",
    code: `Repeat (5, False)
    LoadPlanets(2)
    GenerateElement(Earth)
    WaitForSeconds(1)
    LoadPlanets(1)
    GenerateElement(Fire)
    WaitForSeconds(1)
    LoadPlanets(3)
    GenerateElement(Wind)
    WaitForSeconds(1)
    LoadPlanets(0)
    GenerateElement(Water)
    WaitForSeconds(1)`
  },

  // =========================================================================
  // 6. SINGULARIDADE & PRAGA
  // =========================================================================
  {
    id: "plague-pre-sing",
    category: "Singularidade",
    name: "Estágio de Praga (Pré-Singularidade)",
    req: "Camada da Praga Ativa",
    desc: "Cicla elementos, ativa Arcanos 17 e 20 e faz Flush de Minerais Especiais.",
    preparations: "Equipe o conjunto elemental com maior bônus de infecção.",
    code: `GenerateElement(Water)
GenerateElement(Water)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
GenerateElement(Fire)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
GenerateElement(Earth)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
GenerateElement(Wind)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)`
  },
  {
    id: "sing-early-s1-2",
    category: "Singularidade",
    name: "Primeiras Singularidades (S1 a S2)",
    req: "Singularidade 1-2 / Praga 5-12",
    desc: "Limpeza de minerais especiais (DeleteSM/FlushSM) e entrada automática em estágios da Praga.",
    preparations: "Após o estágio 5-12, remova a linha EnterPlagueStage para farmar no nível máximo.",
    code: `GenerateElement(Water)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    DeleteSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 20, 20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
    EnterPlagueStage(0, 0, False)
GenerateElement(Fire)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    DeleteSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 20, 20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
    EnterPlagueStage(0, 0, False)
GenerateElement(Earth)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    DeleteSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 20, 20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
    EnterPlagueStage(0, 0, False)
GenerateElement(Wind)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    DeleteSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 20, 20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
    EnterPlagueStage(0, 0, False)`
  },
  {
    id: "sing-mult-farm",
    category: "Singularidade",
    name: "Farm de Multiplicador de Singularidade (Pré-x100)",
    req: "Antes de desbloquear automação x100",
    desc: "Executa a ação de singularizar manualmente em cada elemento com Flush de SMs.",
    preparations: "Substitua pela automação nativa assim que atingir x100 de multiplicador.",
    code: `GenerateElement(Water)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    Singularize(0, 0, False)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
GenerateElement(Fire)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    Singularize(0, 0, False)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
GenerateElement(Earth)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    Singularize(0, 0, False)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
    Singularize(0, 0, False)
GenerateElement(Wind)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    Singularize(0, 0, False)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)`
  },
  {
    id: "sing-tree-farm",
    category: "Singularidade",
    name: "Compra de Nós da Árvore de Singularidade",
    req: "Árvore de Singularidade",
    desc: "Compra automática de nós da Árvore de Singularidade integrada à rotação elemental.",
    preparations: "Ajuste o número do nó no parâmetro BuySingTreeNode.",
    code: `GenerateElement(Water)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    BuySingTreeNode(5, True, False)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
GenerateElement(Fire)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    BuySingTreeNode(5, True, False)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
GenerateElement(Earth)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    BuySingTreeNode(5, True, False)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
GenerateElement(Wind)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    BuySingTreeNode(5, True, False)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)`
  }
];

const CATEGORIES = [
  { id: "all", label: "Todas", icon: Layers },
  { id: "Infinito", label: "Infinito", icon: InfinityIcon },
  { id: "Eternidade", label: "Eternidade", icon: Zap },
  { id: "Unidade", label: "Unidade & Provas", icon: Compass },
  { id: "Minerais", label: "Minerais & RfP", icon: Cpu },
  { id: "Tarô & Elementos", label: "Tarô & Elementos", icon: Flame },
  { id: "Singularidade", label: "Singularidade & Praga", icon: ShieldAlert }
];

export default function MacrosTab() {
  const [copiedId, setCopiedId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [scratchpad, setScratchpad] = useState("");
  
  // Estado que gerencia quais accordions estão abertos
  const [expandedMacros, setExpandedMacros] = useState({});

  const toggleAccordion = (id) => {
    setExpandedMacros(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopy = (e, code, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const filteredMacros = useMemo(() => {
    return ALL_MACROS.filter(m => {
      const matchCat = selectedCategory === "all" || m.category === selectedCategory;
      const matchSearch = searchTerm === "" || 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.code.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-zinc-900/70 to-zinc-950 border-2 border-emerald-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
          <div>
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
              Automação Oficial • Scripts & Modelos
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Biblioteca de Macros do Revolution Idle
            </h1>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 w-fit">
            Área de Colagem: Canto Inferior Direito do Jogo
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
          Clique no menu de qualquer macro para expandir e visualizar o script completo, instruções de preparo e copiar diretamente para o jogo.
        </p>

        {/* Barra de Filtros e Busca */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar macro por nome, comando ou requisito..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 font-mono"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-mono text-xs">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 rounded-xl shrink-0 flex items-center gap-1.5 transition-all font-bold ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/40"
                      : "bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid de Macros & Referência de Sintaxe */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lista de Accordions */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
            <span>Mostrando <strong>{filteredMacros.length}</strong> macros</span>
            <span>Categoria: <strong className="text-emerald-400">{selectedCategory}</strong></span>
          </div>

          {filteredMacros.length === 0 ? (
            <div className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 text-center text-zinc-400 font-mono text-xs">
              Nenhuma macro encontrada para os filtros selecionados.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMacros.map((macro) => {
                const isOpen = !!expandedMacros[macro.id];
                const isCopied = copiedId === macro.id;

                return (
                  <div 
                    key={macro.id} 
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen 
                        ? "bg-zinc-900/70 border-emerald-500/40 shadow-lg shadow-emerald-950/20" 
                        : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    {/* Cabeçalho Clicável do Accordion */}
                    <div 
                      onClick={() => toggleAccordion(macro.id)}
                      className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl border transition-colors ${
                          isOpen 
                            ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-400" 
                            : "bg-zinc-950 border-zinc-800 text-zinc-400"
                        }`}>
                          <Code className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-emerald-400 font-bold uppercase">
                              {macro.category}
                            </span>
                            <strong className="text-sm font-bold text-white">{macro.name}</strong>
                          </div>
                          <span className="text-[11px] font-mono text-zinc-400 block mt-0.5">
                            Requisito: <strong className="text-zinc-300">{macro.req}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleCopy(e, macro.code, macro.id)}
                          className={`px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 transition-all shrink-0 font-bold ${
                            isCopied
                              ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40"
                              : "bg-zinc-950 hover:bg-emerald-950/60 border border-zinc-700 hover:border-emerald-500/40 text-zinc-200"
                          }`}
                        >
                          {isCopied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="hidden sm:inline">{isCopied ? "Copiado!" : "Copiar"}</span>
                        </button>
                        
                        <div className="text-zinc-400 p-1">
                          {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Conteúdo Escondido / Revelado */}
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 space-y-3.5 border-t border-zinc-800/60 pt-3">
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          {macro.desc}
                        </p>

                        {macro.preparations && (
                          <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800/80 text-[11px] text-zinc-400 space-y-1 font-sans">
                            <strong className="text-amber-300 font-mono block">💡 Instruções / Preparativos:</strong>
                            <p>{macro.preparations}</p>
                          </div>
                        )}

                        <div className="relative">
                          <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/90 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed max-h-64 scrollbar-thin scrollbar-thumb-zinc-800">
                            {macro.code}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Painel Lateral: Referência de Comandos & Rascunho */}
        <div className="lg:col-span-4 space-y-5">
          {/* Documentação de Comandos */}
          <div className="p-5 sm:p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" /> Sintaxe Oficial do Jogo
            </h3>

            <div className="space-y-2 text-zinc-300">
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-cyan-400 font-bold block">EnterIC(num, bool)</span>
                <p className="text-[11px] text-zinc-400 font-sans">Entra no Desafio Infinito (1 a 9). 0 cancela.</p>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-cyan-400 font-bold block">BreakInfinity(bool)</span>
                <p className="text-[11px] text-zinc-400 font-sans">true quebra o limite; false conserta o limite do Infinito.</p>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-cyan-400 font-bold block">EnterEC(num, dif, bool)</span>
                <p className="text-[11px] text-zinc-400 font-sans">Entra no Desafio da Eternidade na dificuldade indicada.</p>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-cyan-400 font-bold block">Dilate(bool)</span>
                <p className="text-[11px] text-zinc-400 font-sans">true entra em Dilatação; false sai e coleta DP.</p>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-cyan-400 font-bold block">LoadDT(index)</span>
                <p className="text-[11px] text-zinc-400 font-sans">Carrega o loadout da Árvore de Dilatação (0, 1 ou 2).</p>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-cyan-400 font-bold block">PolishPrestige() / RefinePrestige()</span>
                <p className="text-[11px] text-zinc-400 font-sans">Comandos para ciclos rápidos de minerais e RfP.</p>
              </div>
            </div>
          </div>

          {/* Rascunho / Editor Pessoal */}
          <div className="p-5 sm:p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3 font-mono">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" /> Bloco de Rascunho
            </h3>
            <textarea
              rows={6}
              value={scratchpad}
              onChange={(e) => setScratchpad(e.target.value)}
              placeholder="// Edite ou monte seu script customizado aqui..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-500/50"
            />
            {scratchpad && (
              <button
                onClick={(e) => handleCopy(e, scratchpad, "scratch")}
                className="w-full py-2 rounded-xl bg-zinc-950 hover:bg-emerald-950 border border-zinc-700 text-zinc-300 text-xs font-bold transition-colors"
              >
                {copiedId === "scratch" ? "Copiado!" : "Copiar Rascunho"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}