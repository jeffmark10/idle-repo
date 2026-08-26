import React, { useState, useMemo } from "react";
import { 
  Search, Trash2, AlertTriangle, Download, 
  Upload, Sparkles, CheckCircle2, X
} from "lucide-react";
import { useGame } from "./context/GameContext";
import { parseGameSaveString, exportUserGameState } from "./utils/saveImporter";

// Abas Ativas
import RevolutionTab from "./components/tabs/RevolutionTab";
import InfinityTab from "./components/tabs/InfinityTab";
import EternityTab from "./components/tabs/EternityTab";
import DilationTab from "./components/tabs/DilationTab";
import MacrosTab from "./components/tabs/MacrosTab";
import ComingSoonTab from "./components/tabs/ComingSoonTab";

export const TABS_CONFIG = [
  { id: "revo", label: "Revolução", icon: "ⵙ", layer: "Camada 1 • Base" },
  { id: "infinity", label: "Infinito", icon: "∞", layer: "Camada 2 • IP" },
  { id: "eternity", label: "Eternidade", icon: "⧖", layer: "Camada 3 • EP" },
  { id: "dilation", label: "Dilatação", icon: "◈", layer: "Camada 4 • DP" },
  { id: "macros", label: "Macros", icon: "⚙️", layer: "Utilitário" },
  { id: "unity", label: "Unidade", icon: "☯", layer: "Camada 5", comingSoon: true },
  { id: "minerals", label: "Minerais", icon: "◆", layer: "Minigame", comingSoon: true },
  { id: "tarot", label: "Tarô", icon: "🔮", layer: "Buffs", comingSoon: true },
  { id: "plague", label: "Praga", icon: "☣️", layer: "Evolução", comingSoon: true },
  { id: "singularity", label: "Singularidade", icon: "⚛", layer: "Endgame", comingSoon: true }
];

export default function App() {
  const { gameState, setCurrentTab, resetAllData, setGameState } = useGame();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveStringInput, setSaveStringInput] = useState("");
  const [saveFeedback, setSaveFeedback] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const activeTab = gameState.profile.currentTab;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  // Cálculo da Porcentagem de Progresso Global (Total = 9 ICs + 50 ECs + 41 DTUs + Estrelas)
  const progressMetrics = useMemo(() => {
    const tasks = gameState.completedTasks || {};
    const icDone = Object.keys(tasks).filter(k => k.startsWith("IC") && tasks[k]).length;
    const ecDone = Object.keys(tasks).filter(k => k.startsWith("EC") && tasks[k]).length;
    const treeDone = Object.keys(tasks).filter(k => k.startsWith("INF_") && tasks[k]).length;
    
    const totalAchieved = icDone + ecDone + treeDone;
    const maxMilestones = 9 + 50 + 41; // 100 marcos principais
    const percentage = Math.min(100, Math.round((totalAchieved / maxMilestones) * 100));

    return { icDone, ecDone, treeDone, percentage };
  }, [gameState.completedTasks]);

  const filteredNav = useMemo(() => {
    if (!searchQuery.trim()) return TABS_CONFIG;
    const query = searchQuery.toLowerCase();
    return TABS_CONFIG.filter(item => 
      item.label.toLowerCase().includes(query) ||
      item.layer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleImportSave = () => {
    const result = parseGameSaveString(saveStringInput);
    if (!result.success) {
      setSaveFeedback(result.error);
      return;
    }

    setGameState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        ...result.stats
      },
      completedTasks: {
        ...prev.completedTasks,
        ...result.completedTasks
      }
    }));

    setSaveFeedback("Save importado com sucesso!");
    showToast("Dados do save sincronizados!");
    setTimeout(() => {
      setShowSaveModal(false);
      setSaveFeedback("");
      setSaveStringInput("");
    }, 1200);
  };

  const handleExportSave = () => {
    const exported = exportUserGameState(gameState);
    navigator.clipboard.writeText(exported);
    setSaveFeedback("Save exportado e copiado para a área de transferência!");
    showToast("Save copiado!");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row font-sans selection:bg-purple-600 selection:text-white relative">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-black text-sm">
              RI
            </div>
            <div>
              <h1 className="text-xs font-bold text-white tracking-wide">Revolution Idle</h1>
              <span className="text-[10px] text-zinc-500 font-mono">Guia & Companion PT-BR</span>
            </div>
          </div>
        </div>

        {/* Barra de Progresso Global */}
        <div className="p-3 border-b border-zinc-800/60 font-mono text-xs space-y-1.5 bg-zinc-900/30">
          <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold">
            <span>PROGRESSO TOTAL</span>
            <span className="text-purple-300">{progressMetrics.percentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressMetrics.percentage}%` }}
            />
          </div>
        </div>

        {/* Busca */}
        <div className="p-3 border-b border-zinc-800/60">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar aba..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/50 font-mono"
            />
          </div>
        </div>

        {/* Navegação */}
        <nav className="p-2 space-y-1 overflow-y-auto flex-1 font-mono text-xs">
          {filteredNav.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all ${
                  isActive
                    ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-950/40"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base shrink-0">{item.icon}</span>
                  <div>
                    <div className="leading-none">{item.label}</div>
                    <div className={`text-[9px] mt-0.5 ${isActive ? "text-purple-200" : "text-zinc-500"}`}>
                      {item.layer}
                    </div>
                  </div>
                </div>

                {item.comingSoon && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300">
                    Em breve
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Rodapé: Save & Reset */}
        <div className="p-3 border-t border-zinc-800/80 space-y-2">
          <button
            onClick={() => setShowSaveModal(true)}
            className="w-full px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Importar / Exportar</span>
          </button>

          <button
            onClick={() => setShowResetModal(true)}
            className="w-full px-3 py-2 rounded-xl bg-red-950/20 hover:bg-red-950/40 border border-red-500/30 text-red-300 font-mono text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Resetar Tudo</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
        {activeTab === "revo" && <RevolutionTab />}
        {activeTab === "infinity" && <InfinityTab />}
        {activeTab === "eternity" && <EternityTab />}
        {activeTab === "dilation" && <DilationTab />}
        {activeTab === "macros" && <MacrosTab />}

        {/* Telas Em Breve */}
        {activeTab === "unity" && <ComingSoonTab icon="☯" title="Unidade (Unity)" layerNumber="Camada 5 de Reset" />}
        {activeTab === "minerals" && <ComingSoonTab icon="◆" title="Minerais" layerNumber="Minigame de Merge & Coleta" />}
        {activeTab === "tarot" && <ComingSoonTab icon="🔮" title="Tarô" layerNumber="Sistema de Cartas & Cooldowns" />}
        {activeTab === "plague" && <ComingSoonTab icon="☣️" title="Praga" layerNumber="Evolução, Pips & Síntese" />}
        {activeTab === "singularity" && <ComingSoonTab icon="⚛" title="Singularidade" layerNumber="Endgame & Nós Quânticos" />}
      </main>

      {/* Toast Notifier Flutuante */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-zinc-900 border border-purple-500/50 shadow-2xl text-xs font-mono text-white flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal de Save */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-zinc-900 border-2 border-cyan-500/40 rounded-3xl p-6 space-y-4 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-cyan-400" /> Gerenciador de Save
              </h3>
              <button onClick={() => setShowSaveModal(false)} className="text-zinc-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
              Cole a string de exportação do jogo *Revolution Idle* para sincronizar automaticamente seu progresso ou exporte seu save atual do guia.
            </p>

            <textarea
              rows={4}
              value={saveStringInput}
              onChange={(e) => setSaveStringInput(e.target.value)}
              placeholder="Cole a string do save do jogo aqui..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-[11px] text-white focus:outline-none focus:border-cyan-500/50"
            />

            {saveFeedback && (
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-cyan-300">
                {saveFeedback}
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleImportSave}
                className="flex-1 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold transition-colors"
              >
                Importar Save
              </button>
              <button
                onClick={handleExportSave}
                className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold transition-colors"
              >
                Exportar Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Reset Total */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-sm w-full bg-zinc-900 border-2 border-red-500/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white">Resetar Todos os Dados?</h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Esta ação apagará <strong>permanentemente</strong> todos os estados persistidos de Revolução, Infinito, Eternidade e Dilatação.
              </p>
            </div>

            <div className="flex gap-2 font-mono text-xs pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  resetAllData();
                  setShowResetModal(false);
                  showToast("Todos os dados foram resetados!");
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}