import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";

export default function SubNavTabs({ 
  tabs = [], 
  activeTab, 
  onSelectTab, 
  colorTheme = "purple" // "red" | "purple" | "indigo" | "cyan"
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [tabs]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 220;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const activeStyles = {
    red: "bg-red-600 text-white shadow-md shadow-red-900/40",
    purple: "bg-purple-600 text-white shadow-md shadow-purple-900/40",
    indigo: "bg-indigo-600 text-white shadow-md shadow-indigo-900/40",
    cyan: "bg-cyan-600 text-white shadow-md shadow-cyan-900/40",
  }[colorTheme] || "bg-purple-600 text-white";

  const activeBadgeStyles = {
    red: "bg-red-950/90 text-red-200 border-red-400/30",
    purple: "bg-purple-950/90 text-purple-200 border-purple-400/30",
    indigo: "bg-indigo-950/90 text-indigo-200 border-indigo-400/30",
    cyan: "bg-cyan-950/90 text-cyan-200 border-cyan-400/30",
  }[colorTheme] || "bg-purple-950/90 text-purple-200";

  return (
    <div className="relative flex items-center group w-full">
      {/* Botão de Rolar para a Esquerda */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          aria-label="Rolar para a esquerda"
          className="absolute left-0 z-20 h-full px-1.5 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent flex items-center justify-center text-zinc-300 hover:text-white transition-opacity"
        >
          <div className="p-1 rounded-lg bg-zinc-900 border border-zinc-700 shadow-md">
            <ChevronLeft className="w-4 h-4" />
          </div>
        </button>
      )}

      {/* Barra Rolável das Sub-Abas */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900/70 border border-zinc-800/90 overflow-x-auto scroll-smooth w-full font-mono text-xs no-scrollbar select-none"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none",  // IE 10+
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                onSelectTab(tab.id);
              }}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all shrink-0 flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? activeStyles
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              {tab.locked ? (
                <Lock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              ) : (
                Icon && <Icon className="w-3.5 h-3.5 shrink-0" />
              )}
              <span>{tab.label}</span>

              {tab.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-md border shrink-0 ${
                    isActive
                      ? activeBadgeStyles
                      : "bg-zinc-950 text-zinc-400 border-zinc-800"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Botão de Rolar para a Direita */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          aria-label="Rolar para a direita"
          className="absolute right-0 z-20 h-full px-1.5 bg-gradient-to-l from-zinc-950 via-zinc-950/90 to-transparent flex items-center justify-center text-zinc-300 hover:text-white transition-opacity"
        >
          <div className="p-1 rounded-lg bg-zinc-900 border border-zinc-700 shadow-md">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      )}
    </div>
  );
}