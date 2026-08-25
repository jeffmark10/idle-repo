import React from "react";
import { Search, Command, CheckCircle2, Trash2 } from "lucide-react";
import { TABS_CONFIG } from "../data/tabsConfig";

export default function Navbar({ activeTab, onSwitchTab, progressPct, completedCount, totalTasksCount, onOpenSearch, onOpenReset }) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="w-full bg-zinc-900 h-1">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-400 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-md shadow-purple-900/30">
            RI
          </div>
          <div>
            <span className="text-sm font-extrabold tracking-tight">Revolution Idle</span>
            <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
              Guia Interativo PT-BR
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            aria-label="Abrir busca global"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-mono transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Buscar</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-zinc-800 rounded border border-zinc-700">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{progressPct}% ({completedCount}/{totalTasksCount})</span>
          </div>

          <button
            onClick={onOpenReset}
            title="Resetar todo o progresso"
            aria-label="Resetar todo o progresso salvo"
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none">
          {TABS_CONFIG.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSwitchTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                }`}
              >
                <span className="font-mono">{tab.symbol}</span>
                <span className={isActive ? tab.color : ""}>{tab.label}</span>
                {tab.hasTimer && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Timer Ativo" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}