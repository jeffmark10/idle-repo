import React, { useState, useMemo } from "react";
import { 
  Terminal, Copy, CheckCheck, Star, 
  Search, Filter, Play, Plus, Trash2, 
  Settings, Info, Zap, Trophy, ShieldAlert, 
  Clock, ArrowRight, Sparkles, Sliders
} from "lucide-react";
import { MACROS_DATA } from "../../data/gameData";
import { useGame } from "../../context/GameContext";
import SubNavTabs from "../common/SubNavTabs";

export default function MacrosTab() {
  const { gameState, toggleFavoriteMacro } = useGame();
  const [subSection, setSubSection] = useState("presets");
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Estado do Gerador Customizado de Macros
  const [customSteps, setCustomSteps] = useState([
    { action: "buy_all", delay: 0.1 },
    { action: "promote_all", delay: 0.5 },
    { action: "prestige", delay: 1.0 },
    { action: "infinity", delay: 0 },
  ]);

  const favoriteMacros = gameState.favoriteMacros || [];

  const MACRO_SUBTABS = [
    { id: "overview", label: "0. O que são Macros?", icon: Info },
    { id: "presets", label: "1. Biblioteca de Presets", icon: Terminal, badge: `${MACROS_DATA.length}` },
    { id: "builder", label: "2. Construtor de Macros", icon: Sliders },
  ];

  const filteredMacros = useMemo(() => {
    return MACROS_DATA.filter((macro) => {
      const matchesSearch = 
        macro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        macro.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        macro.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        categoryFilter === "all" ? true :
        categoryFilter === "fav" ? favoriteMacros.includes(macro.id) :
        macro.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter, favoriteMacros]);

  const copyMacro = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const addCustomStep = (action = "buy_all") => {
    setCustomSteps(prev => [...prev, { action, delay: 0.2 }]);
  };

  const removeCustomStep = (index) => {
    setCustomSteps(prev => prev.filter((_, i) => i !== index));
  };

  const updateCustomStep = (index, field, value) => {
    setCustomSteps(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const generatedCustomCode = useMemo(() => {
    return customSteps
      .map(s => `${s.action}:${s.delay}`)
      .join(";");
  }, [customSteps]);

  const categories = [
    { id: "all", label: "Todos" },
    { id: "fav", label: "Favoritos ⭐" },
    { id: "Farm", label: "Farm" },
    { id: "Push", label: "Push" },
    { id: "Desafios", label: "Desafios" },
    { id: "Dilatação", label: "Dilatação" },
  ];

  return (
    <div className="space-y-6">
      {/* Menu Superior com Rolagem e Botões Laterais */}
      <SubNavTabs
        tabs={MACRO_SUBTABS}
        activeTab={subSection}
        onSelectTab={setSubSection}
        colorTheme="emerald"
      />

      {/* ========================================================================= */}
      {/* 0. O QUE SÃO MACROS? */}
      {/* ========================================================================= */}
      {subSection === "overview" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-zinc-900/80 to-zinc-950 border-2 border-emerald-500/30 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-emerald-500/20 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-black">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
                  Automação Avançada • Macro Builder
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Como Funcionam as Macros no Revolution Idle
                </h1>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
              As macros permitem automatizar sequências complexas de ações que as automações convencionais não cobrem sozinhas (como rotinas de reset em menos de 100ms para farm de $\Sigma$, trocas programadas de promoção ou ciclos para bater tempos mínimos em Desafios).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2">
              <strong className="text-emerald-300 font-mono text-xs flex items-center gap-1.5">
                <Play className="w-4 h-4 text-emerald-400" /> 1. Como Importar
              </strong>
              <p className="text-zinc-400 leading-relaxed">
                Copie a macro nesta aba, abra o menu de <strong>Automações & Macros</strong> dentro do jogo, selecione um slot vazio e cole a string clicando em "Import".
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2">
              <strong className="text-cyan-300 font-mono text-xs flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" /> 2. Tempos e Delays
              </strong>
              <p className="text-zinc-400 leading-relaxed">
                As macros executam em ciclos contínuos de 60 FPS. Um delay de <code>0</code> executa a cada frame (~16.6ms), enquanto delays acima de <code>0.1</code> garantem tempo para as cores acumularem pontuação.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2">
              <strong className="text-yellow-300 font-mono text-xs flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-yellow-400" /> 3. Evitar Travamentos
              </strong>
              <p className="text-zinc-400 leading-relaxed">
                Desative o <strong>Auto Infinity</strong> e <strong>Auto Eternity</strong> ao rodar macros específicas de push ou desafios longos para evitar resets indesejados antes da conclusão.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. BIBLIOTECA DE PRESETS */}
      {/* ========================================================================= */}
      {subSection === "presets" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-emerald-500/30 font-sans text-xs space-y-2 shadow-lg">
            <div className="flex items-center gap-2 font-mono text-emerald-400 font-bold">
              <Terminal className="w-4 h-4" />
              <span>Sobre esta Sub-Aba: Presets Testados e Prontos para Uso</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Filtre ou busque pela macro desejada abaixo. Clique em <strong>Copiar Macro</strong> para transferir o código diretamente para a área de transferência no formato aceito pelo jogo.
            </p>
          </div>

          {/* Barra de Busca e Filtros */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome, função ou camada..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 font-mono"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 font-mono text-xs scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-colors shrink-0 ${
                    categoryFilter === cat.id
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/40"
                      : "bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Macros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {filteredMacros.map((macro) => {
              const isFav = favoriteMacros.includes(macro.id);
              const isCopied = copiedId === macro.id;

              return (
                <div
                  key={macro.id}
                  className={`p-5 rounded-3xl border flex flex-col justify-between space-y-4 transition-all ${
                    isFav
                      ? "bg-emerald-950/20 border-emerald-500/50 shadow-lg shadow-emerald-950/20"
                      : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] text-emerald-400 font-bold">
                          {macro.category}
                        </span>
                        <h3 className="text-sm font-bold text-white mt-1.5">{macro.name}</h3>
                      </div>

                      <button
                        onClick={() => toggleFavoriteMacro(macro.id)}
                        className={`p-1.5 rounded-xl border transition-colors ${
                          isFav
                            ? "bg-amber-950/60 border-amber-500/40 text-amber-300"
                            : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${isFav ? "fill-amber-400 text-amber-400" : ""}`} />
                      </button>
                    </div>

                    <p className="text-zinc-400 font-sans text-xs leading-relaxed">
                      {macro.description}
                    </p>
                  </div>

                  {/* Bloco de Código da Macro */}
                  <div className="space-y-2">
                    <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300 overflow-x-auto select-all scrollbar-none font-mono">
                      {macro.code}
                    </div>

                    <button
                      onClick={() => copyMacro(macro.code, macro.id)}
                      className={`w-full py-2.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                        isCopied
                          ? "bg-emerald-600 text-white shadow-emerald-950/40"
                          : "bg-zinc-800 hover:bg-emerald-600 text-white"
                      }`}
                    >
                      {isCopied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{isCopied ? "Copiado para a Área de Transferência!" : "Copiar Macro"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CONSTRUTOR DE MACROS (CUSTOM BUILDER) */}
      {/* ========================================================================= */}
      {subSection === "builder" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-emerald-500/30 font-sans text-xs space-y-2 shadow-lg">
            <div className="flex items-center gap-2 font-mono text-emerald-400 font-bold">
              <Sliders className="w-4 h-4" />
              <span>Sobre esta Sub-Aba: Construtor Interativo de Sequências</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Monte uma sequência personalizada de ações com seus respectivos tempos de atraso (delays em segundos). A string gerada no topo pode ser copiada e importada instantaneamente no jogo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Lado Esquerdo: Editor de Passos */}
            <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                  <Sliders className="w-4 h-4 text-emerald-400" /> Sequência de Comandos
                </h3>
                <button
                  onClick={() => addCustomStep("buy_all")}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Ação
                </button>
              </div>

              <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                {customSteps.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3 font-mono text-xs">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="w-6 text-center font-bold text-zinc-500">{idx + 1}.</span>
                      <select
                        value={step.action}
                        onChange={(e) => updateCustomStep(idx, "action", e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="buy_all">Comprar Tudo (Cores)</option>
                        <option value="ascend_all">Ascender Todas as Cores</option>
                        <option value="prestige">Prestigiar</option>
                        <option value="promote_all">Promover (Todas 1-4)</option>
                        <option value="promote_1">Promover #1 (Mult Gain)</option>
                        <option value="promote_2">Promover #2 (Laps Speed)</option>
                        <option value="promote_3">Promover #3 (Asc. Power)</option>
                        <option value="promote_4">Promover #4 (Promo Power)</option>
                        <option value="infinity">Reset de Infinito</option>
                        <option value="eternity">Reset de Eternidade</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400 text-[11px]">Delay (s):</span>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={step.delay}
                        onChange={(e) => updateCustomStep(idx, "delay", parseFloat(e.target.value) || 0)}
                        className="w-16 bg-zinc-900 border border-zinc-700 rounded-xl px-2 py-1 text-xs text-center text-emerald-300 font-bold focus:outline-none"
                      />
                      <button
                        onClick={() => removeCustomStep(idx)}
                        className="p-1.5 rounded-lg bg-red-950/60 border border-red-500/30 text-red-300 hover:bg-red-900/60 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lado Direito: Preview da String Gerada */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-b from-emerald-950/40 via-zinc-900/70 to-zinc-950 border-2 border-emerald-500/30 shadow-2xl space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> Código Gerado
                </span>
                <span className="text-[10px] text-zinc-400">{customSteps.length} Ações</span>
              </div>

              <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800 text-[11px] text-emerald-300 break-all select-all min-h-[90px] font-mono leading-relaxed">
                {generatedCustomCode || "Nenhuma ação configurada."}
              </div>

              <button
                onClick={() => copyMacro(generatedCustomCode, "custom_builder")}
                disabled={customSteps.length === 0}
                className="w-full py-3 rounded-2xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40 disabled:opacity-30"
              >
                {copiedId === "custom_builder" ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId === "custom_builder" ? "String Copiada!" : "Copiar String Gerada"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}