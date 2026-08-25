import React from "react";
import { Search, X } from "lucide-react";

export default function SearchModal({ isOpen, onClose, searchQuery, setSearchQuery, searchResults, onSelectResult }) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-purple-400 shrink-0" />
          <input
            type="text"
            autoFocus
            aria-label="Campo de busca"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquise por qualquer nó, desafio, fórmula, macro ou arcano..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <button onClick={onClose} aria-label="Fechar modal de busca" className="text-zinc-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {searchResults.length === 0 ? (
            <div className="p-6 text-center text-xs text-zinc-500">Nenhum resultado encontrado.</div>
          ) : (
            searchResults.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onSelectResult(item.tabId)}
                className="w-full text-left p-3 rounded-xl hover:bg-zinc-800/80 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-sm font-semibold text-zinc-200 group-hover:text-purple-300">{item.title}</div>
                  <div className="text-[11px] text-zinc-500">{item.subtitle}</div>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                  {item.tabId}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}