import React, { useState } from "react";
import { 
  RotateCw, Infinity as InfinityIcon, Hourglass, 
  Sparkles, Terminal, BookOpen, Menu, X, Shield, 
  ExternalLink, Layers
} from "lucide-react";

import RevolutionTab from "./components/tabs/RevolutionTab";
import InfinityTab from "./components/tabs/InfinityTab";
import EternityTab from "./components/tabs/EternityTab";
import DilationTab from "./components/tabs/DilationTab";
import MacrosTab from "./components/tabs/MacrosTab";
import ComingSoonTab from "./components/tabs/ComingSoonTab";
import AdBanner from "./components/common/AdBanner";
import { GameProvider } from "./context/GameContext";

const MAIN_LAYERS = [
  { id: "revolution", label: "Revolução", shortLabel: "Revo", icon: RotateCw, color: "text-red-400", activeBg: "bg-red-600 text-white" },
  { id: "infinity", label: "Infinito", shortLabel: "Inf", icon: InfinityIcon, color: "text-purple-400", activeBg: "bg-purple-600 text-white" },
  { id: "eternity", label: "Eternidade", shortLabel: "Etern", icon: Hourglass, color: "text-indigo-400", activeBg: "bg-indigo-600 text-white" },
  { id: "dilation", label: "Dilatação", shortLabel: "Dilat", icon: Sparkles, color: "text-cyan-400", activeBg: "bg-cyan-600 text-white" },
  { id: "unity", label: "Unidade", shortLabel: "Unity", icon: Layers, color: "text-amber-400", activeBg: "bg-amber-600 text-white", comingSoon: true },
  { id: "macros", label: "Macros", shortLabel: "Macros", icon: Terminal, color: "text-emerald-400", activeBg: "bg-emerald-600 text-white" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("revolution");

  return (
    <GameProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans pb-24 md:pb-8">
        {/* Top Header Compacto */}
        <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-3 py-2.5 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center font-black text-purple-300 text-sm shadow-inner">
                R
              </div>
              <div>
                <h1 className="text-xs sm:text-sm font-black tracking-wide text-white uppercase leading-none">
                  Revolution Idle
                </h1>
                <span className="text-[10px] font-mono text-zinc-500 block mt-0.5">
                  Companion & Guia
                </span>
              </div>
            </div>

            {/* Navegação Desktop (Topo) */}
            <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1 rounded-2xl border border-zinc-800 font-mono text-xs">
              {MAIN_LAYERS.map((layer) => {
                const Icon = layer.icon;
                const isActive = activeTab === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveTab(layer.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                      isActive ? layer.activeBg : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{layer.label}</span>
                  </button>
                );
              })}
            </nav>

            <span className="text-[10px] font-mono px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
              v1.055
            </span>
          </div>
        </header>

        {/* Conteúdo Principal com Container Responsivo */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6">
          {activeTab === "revolution" && <RevolutionTab />}
          {activeTab === "infinity" && <InfinityTab />}
          {activeTab === "eternity" && <EternityTab />}
          {activeTab === "dilation" && <DilationTab />}
          {activeTab === "macros" && <MacrosTab />}
          {activeTab === "unity" && (
            <ComingSoonTab 
              icon="☯" 
              title="Unidade (Unity)" 
              layerNumber="Camada 5 • Zodíacos & Planetas" 
            />
          )}

          {/* Anúncio Discreto no Rodapé do Conteúdo */}
          <AdBanner adSlot="1234567890" />
        </main>

        {/* Barra de Navegação Inferior Fixa para Mobile (Thumb-Friendly) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800/90 px-1 py-1.5 flex items-center justify-around shadow-2xl">
          {MAIN_LAYERS.map((layer) => {
            const Icon = layer.icon;
            const isActive = activeTab === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveTab(layer.id)}
                className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
                  isActive
                    ? `${layer.color} font-black scale-105`
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? "bg-zinc-900 border border-zinc-700" : ""}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono mt-0.5 leading-none">
                  {layer.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </GameProvider>
  );
}