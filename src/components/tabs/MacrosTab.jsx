import React, { useState, useMemo } from "react";
import { 
  Terminal, Copy, CheckCheck, Star, 
  Search, Zap, Trophy, Sparkles, BookOpen, Code2
} from "lucide-react";
import { MACROS_DATA } from "../../data/gameData";
import { useGame } from "../../context/GameContext";
import SubNavTabs from "../common/SubNavTabs";

export default function MacrosTab() {
  const { gameState, toggleFavoriteMacro } = useGame();
  const [subSection, setSubSection] = useState("all");
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const favoriteMacros = gameState.favoriteMacros || [];

  const MACRO_SUBTABS = [
    { id: "all", label: "Todas as Macros", icon: Terminal, badge: `${MACROS_DATA.length}` },
    { id: "fav", label: "Favoritas ⭐", icon: Star, badge: `${favoriteMacros.length}` },
    { id: "Eternidade & Infinito", label: "Eternidade & Infinito", icon: Zap },
    { id: "Unidade & Trials", label: "Unidade & Trials", icon: Trophy },
    { id: "guide", label: "Guia de Sintaxe", icon: BookOpen },
  ];

  const filteredMacros = useMemo(() => {
    return MACROS_DATA.filter((macro) => {
      const matchesSearch = 
        macro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        macro.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        macro.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        macro.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab = 
        subSection === "all" ? true :
        subSection === "fav" ? favoriteMacros.includes(macro.id) :
        subSection === "guide" ? false :
        macro.category === subSection;

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, subSection, favoriteMacros]);

  const copyMacro = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <SubNavTabs
        tabs={MACRO_SUBTABS}
        activeTab={subSection}
        onSelectTab={setSubSection}
        colorTheme="emerald"
      />

      {/* GUIA DE SINTAXE OFICIAL */}
      {subSection === "guide" && (
        <div className="space-y-6 font-sans text-xs">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-zinc-900/80 to-zinc-950 border-2 border-emerald-500/30 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-emerald-500/20 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-black">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
                  Documentação do Macro Builder Oficial
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Sintaxe Oficial e Comandos Válidos
                </h1>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed max-w-4xl">
              As macros no Revolution Idle são inseridas diretamente no <strong>Macro Builder</strong> dentro do jogo. Todas as funções usam sintaxe C-style/Python simples. Basta copiar qualquer código desta aba e clicar no botão <strong>"Import"</strong> no jogo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-3 font-mono">
              <strong className="text-emerald-300 block text-xs font-bold">Comandos de Resets & Desafios:</strong>
              <div className="space-y-1 text-zinc-300 text-[11px]">
                <div>• <code>Infinite()</code>: Executa reset de Infinito.</div>
                <div>• <code>Eternate()</code>: Executa reset de Eternidade.</div>
                <div>• <code>Dilate(true/false)</code>: Entra ou sai da Dilatação.</div>
                <div>• <code>BreakInfinity(true/false)</code>: Quebra ou fixa o limite de Infinito.</div>
                <div>• <code>EnterIC(num, bool)</code>: Entra no Desafio de Infinito (0 a 9).</div>
                <div>• <code>EnterEC(num, diff, bool)</code>: Entra no Desafio de Eternidade.</div>
                <div>• <code>ExitEC()</code>: Sai do Desafio de Eternidade atual.</div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-3 font-mono">
              <strong className="text-cyan-300 block text-xs font-bold">Comandos de Controle & Condições:</strong>
              <div className="space-y-1 text-zinc-300 text-[11px]">
                <div>• <code>WaitForSeconds(tempo)</code>: Pausa a execução em segundos.</div>
                <div>• <code>WaitUntil(condição)</code>: Espera até a condição ser verdadeira.</div>
                <div>• <code>Repeat(vezes, loop)</code>: Repete o bloco indentado.</div>
                <div>• <code>LoadDT(slot)</code>: Carrega o preset 0, 1 ou 2 da Árvore de Dilatação.</div>
                <div>• <code>Restart()</code>: Reinicia a macro do início em loop.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LISTA DE MACROS */}
      {subSection !== "guide" && (
        <div className="space-y-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar macro por nome, comando (ex: LoadDT, BreakInfinity) ou categoria..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-mono text-xs">
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
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] text-emerald-400 font-bold">
                            {macro.category}
                          </span>
                          {macro.req && (
                            <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-400">
                              {macro.req}
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-white mt-1.5">{macro.name}</h3>
                      </div>

                      <button
                        onClick={() => toggleFavoriteMacro(macro.id)}
                        className={`p-1.5 rounded-xl border transition-colors shrink-0 ${
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

                  <div className="space-y-2">
                    <pre className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-[11px] text-emerald-300 overflow-x-auto select-all scrollbar-thin scrollbar-thumb-zinc-800 font-mono leading-relaxed max-h-48">
                      {macro.code}
                    </pre>

                    <button
                      onClick={() => copyMacro(macro.code, macro.id)}
                      className={`w-full py-2.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                        isCopied
                          ? "bg-emerald-600 text-white shadow-emerald-950/40"
                          : "bg-zinc-800 hover:bg-emerald-600 text-white"
                      }`}
                    >
                      {isCopied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{isCopied ? "Código Copiado!" : "Copiar Macro para o Jogo"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredMacros.length === 0 && (
            <div className="p-12 text-center rounded-3xl bg-zinc-900/30 border border-zinc-800 space-y-2 font-mono text-xs text-zinc-500">
              <Code2 className="w-8 h-8 mx-auto text-zinc-600 opacity-60" />
              <p>Nenhuma macro encontrada para os filtros selecionados.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}