import React, { useState, useMemo } from "react";
import { Search, Trash2, AlertTriangle, ShieldCheck } from "lucide-react";
import { useGame } from "./context/GameContext";

// Abas Ativas Principais
import RevolutionTab from "./components/tabs/RevolutionTab";
import InfinityTab from "./components/tabs/InfinityTab";
import EternityTab from "./components/tabs/EternityTab";
import DilationTab from "./components/tabs/DilationTab";
import MacrosTab from "./components/tabs/MacrosTab";

// Placeholder Padronizado para Abas Futuras
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
  const { gameState, setCurrentTab, resetAllData } = useGame();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);

  const activeTab = gameState.profile.currentTab;

  // Filtra apenas as abas ativas e relevantes pela busca
  const filteredNav = useMemo(() => {
    if (!searchQuery.trim()) return TABS_CONFIG;
    const query = searchQuery.toLowerCase();
    return TABS_CONFIG.filter(item => 
      item.label.toLowerCase().includes(query) ||
      item.layer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row font-sans selection:bg-purple-600 selection:text-white">
      {/* Sidebar Lateral */}
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

        {/* Barra de Busca */}
        <div className="p-3 border-b border-zinc-800/60">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar aba ou camada..."
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

        {/* Reset Global */}
        <div className="p-3 border-t border-zinc-800/80">
          <button
            onClick={() => setShowResetModal(true)}
            className="w-full px-3 py-2 rounded-xl bg-red-950/20 hover:bg-red-950/40 border border-red-500/30 text-red-300 font-mono text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Resetar Tudo</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo Central */}
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

      {/* Modal de Confirmação do Reset */}
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