import React, { useState, useMemo } from "react";
import { 
  Network, RefreshCw, Copy, CheckCheck, Table, AlertTriangle, 
  Search, Zap, Layers, Info, CheckCircle2
} from "lucide-react";
import { useGame } from "../../context/GameContext";
import { 
  DILATION_STEP_BY_STEP, 
  ENDGAME_LOADOUTS, 
  DILATION_TREE_UPGRADES_DICT 
} from "../../data/dilationData";
import SubNavTabs from "../common/SubNavTabs";

export default function DilationTab() {
  const { gameState, updateDtpAllocation, applyDtpPreset, respecDilationTree } = useGame();
  const [subSection, setSubSection] = useState("tree");
  const [copiedCode, setCopiedCode] = useState("");
  const [copiedCurrentTree, setCopiedCurrentTree] = useState(false);
  const [tableSearch, setTableSearch] = useState("");

  const dtpAllocations = gameState.dilationTreeAllocations;
  const totalDtpSpent = Object.values(dtpAllocations).reduce((a, b) => a + b, 0);
  const isOverLimit = totalDtpSpent > 65;

  const currentTreeCode = useMemo(() => {
    const c = dtpAllocations["C-1"] || 0;
    const t = [1, 2, 3, 4].map(i => dtpAllocations[`T-${i}`] || 0).join(",");
    const m = [1, 2, 3, 4].map(i => dtpAllocations[`M-${i}`] || 0).join(",");
    const b = [1, 2, 3, 4].map(i => dtpAllocations[`B-${i}`] || 0).join(",");
    return `C${c};T${t};M${m};B${b}`;
  }, [dtpAllocations]);

  const filteredSteps = useMemo(() => {
    if (!tableSearch.trim()) return DILATION_STEP_BY_STEP;
    const q = tableSearch.toLowerCase();
    return DILATION_STEP_BY_STEP.filter(s => 
      s.dtp.toString().includes(q) ||
      s.pick.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.ap.toLowerCase().includes(q)
    );
  }, [tableSearch]);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const copyCurrentTreeToClipboard = () => {
    navigator.clipboard.writeText(currentTreeCode);
    setCopiedCurrentTree(true);
    setTimeout(() => setCopiedCurrentTree(false), 2000);
  };

  const renderNode = (id) => {
    const node = DILATION_TREE_UPGRADES_DICT[id];
    if (!node) {
      return (
        <div className="rounded-xl border border-dashed border-zinc-900/60 bg-zinc-950/20 flex items-center justify-center text-[9px] text-zinc-800 font-mono select-none">
          --
        </div>
      );
    }

    const current = dtpAllocations[id] || 0;
    const colorStyles = {
      emerald: "border-emerald-500/50 bg-emerald-950/30 text-emerald-300",
      red: "border-red-500/50 bg-red-950/30 text-red-300",
      yellow: "border-yellow-500/50 bg-yellow-950/30 text-yellow-300",
      blue: "border-blue-500/50 bg-blue-950/30 text-blue-300"
    }[node.color];

    const btnStyles = {
      emerald: "bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border-emerald-500/40",
      red: "bg-red-600/30 hover:bg-red-600/50 text-red-200 border-red-500/40",
      yellow: "bg-yellow-600/30 hover:bg-yellow-600/50 text-yellow-200 border-yellow-500/40",
      blue: "bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border-blue-500/40"
    }[node.color];

    return (
      <div className={`p-1.5 rounded-xl border flex flex-col justify-between shadow transition-all font-mono text-xs ${colorStyles}`}>
        <div className="flex items-center justify-between gap-1">
          <strong className="text-[10px] sm:text-[11px] font-black tracking-wider leading-none truncate">{node.name}</strong>
          <span className="px-1 py-0.2 rounded bg-zinc-950/90 border border-zinc-700 text-[9px] font-bold shrink-0">
            {current}/{node.max}
          </span>
        </div>

        <div className="flex gap-1 pt-1 mt-auto">
          <button
            onClick={() => updateDtpAllocation(id, -1)}
            disabled={current === 0}
            className="w-5 h-5 rounded bg-zinc-950/80 hover:bg-zinc-800 disabled:opacity-25 border border-zinc-700 text-white font-bold flex items-center justify-center transition-colors text-[10px]"
          >
            -
          </button>
          <button
            onClick={() => updateDtpAllocation(id, 1)}
            disabled={current >= node.max}
            className={`flex-1 h-5 rounded border font-bold disabled:opacity-25 flex items-center justify-center transition-colors text-[9px] ${btnStyles}`}
          >
            +1 DTP
          </button>
        </div>
      </div>
    );
  };

  const DILATION_TABS = [
    { id: "overview", label: "0. O que é a Dilatação?", icon: Info },
    { id: "tree", label: "1. Árvore Espacial & Builds (DTP 1 a 48)", icon: Network, badge: `${totalDtpSpent}/65 DTP` },
    { id: "guide", label: "2. Roteiro Pré-Árvore (Início até DTP 1)", icon: Zap },
    { id: "unity_prep", label: "3. Rumo à Unidade (DTP 40+ & Unity)", icon: Layers },
  ];

  return (
    <div className="space-y-6">
      <SubNavTabs
        tabs={DILATION_TABS}
        activeTab={subSection}
        onSelectTab={setSubSection}
        colorTheme="cyan"
      />

      {/* 0. O QUE É A DILATAÇÃO? */}
      {subSection === "overview" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-zinc-900/80 to-zinc-950 border-2 border-cyan-500/30 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-black text-lg">
                ◈
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                  Camada 4 de Prestígio • Desbloqueio com todos os 81 Animais
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Bem-vindo à Dilatação Temporal
                </h1>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
              Desbloqueada no Marco 7 de Animais (81 Animais comprados), a <strong>Dilatação</strong> introduz severas penalidades globais à sua corrida. Seu objetivo dentro da Dilatação é empurrar o <strong>Max Score</strong> o mais alto possível, pois ele determina sua <strong>Renda Passiva de Pontos de Dilatação (DP/s)</strong>, que continuará gerando mesmo fora da Dilatação para a compra das 9 Melhorias de Dilatação (DU).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-zinc-950/90 border border-red-500/30 space-y-1">
                <span className="text-red-400 font-bold block">Penalidades Base:</span>
                <p className="text-zinc-400 font-sans text-[11px] leading-relaxed">
                  • Expoente Comum: ÷25<br />
                  • Exp. Gerador: ÷1.000<br />
                  • Exp. Estrelas: ÷100<br />
                  • Poder de Ascensão: ^0.10<br />
                  • Velocidade de Voltas: ^0.10 e depois ÷10<br />
                  • Ganho de IP: ^0.01
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950/90 border border-cyan-500/30 space-y-1">
                <span className="text-cyan-300 font-bold block">O Papel do DU1 & DU2:</span>
                <p className="text-zinc-400 font-sans text-[11px] leading-relaxed">
                  • <strong>DU1 (Suavizador):</strong> Reduz todas as penalidades em 0.03 por nível (Prioridade máxima durante corridas em Dilatação).<br />
                  • <strong>DU2 (Renda DP):</strong> Multiplica sua renda de DP/s em x1.05 por nível (Compre durante farms de EP/SN).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950/90 border border-emerald-500/30 space-y-1">
                <span className="text-emerald-300 font-bold block">Meta da Fase:</span>
                <p className="text-zinc-400 font-sans text-[11px] leading-relaxed">
                  Completar todos os 50 Desafios da Eternidade (incluindo EC10-1 a EC10-5) e acumular <strong>1e27 DP</strong> para comprar o primeiro ponto da Árvore de Dilatação (<strong>1 DTP</strong>).
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3 font-sans text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <Layers className="w-4 h-4 text-cyan-400" /> As 9 Melhorias de Dilatação (DU1 a DU9) & Regras de Compra
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                <strong className="text-cyan-300 block text-xs">DU1 & DU2 (Fundamentais)</strong>
                <p className="text-zinc-400 font-sans text-[11px]">DU1 suaviza as penalidades (-0.03/nv). DU2 multiplica o ganho passivo de DP/s (x1.05/nv). Mantenha DU2 com cerca de metade do nível de DU1.</p>
              </div>
              <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                <strong className="text-emerald-300 block text-xs">DU3 a DU6 (Apoio a Score/Lab)</strong>
                <p className="text-zinc-400 font-sans text-[11px]">Concedem níveis livres de RP (+3/nv), expoente comum (x1.001/nv) e geradores (+0.01/nv). Compre quando custarem ~1/3 de DU1.</p>
              </div>
              <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                <strong className="text-purple-300 block text-xs">DU7 a DU9 (Secundários/Finais)</strong>
                <p className="text-zinc-400 font-sans text-[11px]">Aumentam ganho de EP (x10/nv), Ascensão (+1.00/nv) e Poder do Lab (+0.01/nv). DU7 deve ser comprado logo antes de terminar runs de EP/Supernova.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. ÁRVORE ESPACIAL & BUILDS */}
      {subSection === "tree" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-zinc-900/70 to-zinc-950 border-2 border-cyan-500/30 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                  Camada 4 • Dilatação & Árvore Espacial de Habilidades (DTP)
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                  Árvore de Dilatação & Rota de Progressão
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono px-3.5 py-1.5 rounded-full border font-bold ${
                  isOverLimit 
                    ? "bg-red-950 border-red-500 text-red-300 animate-pulse" 
                    : "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                }`}>
                  DTP Alocado: {totalDtpSpent}/65
                </span>
              </div>
            </div>

            {isOverLimit && (
              <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-2xl flex items-center gap-2 text-xs text-red-200 font-mono">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>Atenção: Você alocou mais de 65 DTP ({totalDtpSpent} DTP). O jogo aceita no máximo 65 pontos alocados simultâneos.</span>
              </div>
            )}

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
              Desbloqueada após completar todos os <strong>50 Desafios da Eternidade</strong> e obter todos os <strong>81 Animais</strong>. Alterne os presets de pontos de DTP abaixo conforme seu foco de farm até atingir <strong>1.08e2466 EP</strong> para desbloquear a <strong>Unidade (Unity)</strong>.
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono font-bold text-cyan-300 block">Loadouts Finais Rápidos:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 font-mono text-xs">
                {ENDGAME_LOADOUTS.map((p) => (
                  <div key={p.name} className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-2">
                    <div>
                      <strong className="text-cyan-300 block text-xs">{p.name}</strong>
                      <span className="text-[10px] text-zinc-500 font-sans">{p.desc}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-800/60">
                      <button
                        onClick={() => applyDtpPreset(p.code)}
                        className="px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-200 text-[10px] font-bold transition-colors"
                      >
                        Carregar
                      </button>
                      <button
                        onClick={() => copyToClipboard(p.code, p.name)}
                        className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        {copiedCode === p.name ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        {copiedCode === p.name ? "Copiado" : "Copiar"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 p-4 sm:p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-2.5">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Network className="w-4 h-4 text-cyan-400" /> Alocador Espacial da Árvore
                  </h3>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    C: Verde | T: Cima | B: Baixo | M: Meio
                  </span>
                </div>
                
                <button
                  onClick={respecDilationTree}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono text-xs flex items-center gap-1.5 transition-colors font-bold self-start sm:self-auto"
                >
                  <RefreshCw className="w-3 h-3" /> Respec
                </button>
              </div>

              <div className="overflow-x-auto pb-1">
                <div className="min-w-[480px] grid grid-cols-5 gap-1.5 p-2.5 rounded-2xl bg-zinc-950/90 border border-zinc-800/80">
                  {renderNode("C-1")}
                  {renderNode("T-1")}
                  {renderNode("T-2")}
                  {renderNode("T-3")}
                  {renderNode("T-4")}

                  {renderNode("B-1")}
                  {renderNode("M-1")}
                  {renderNode(null)}
                  {renderNode(null)}
                  {renderNode(null)}

                  {renderNode("B-2")}
                  {renderNode(null)}
                  {renderNode("M-2")}
                  {renderNode(null)}
                  {renderNode(null)}

                  {renderNode("B-3")}
                  {renderNode(null)}
                  {renderNode(null)}
                  {renderNode("M-3")}
                  {renderNode(null)}

                  {renderNode("B-4")}
                  {renderNode(null)}
                  {renderNode(null)}
                  {renderNode(null)}
                  {renderNode("M-4")}
                </div>
              </div>

              <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between gap-2 font-mono text-xs">
                <div className="overflow-hidden truncate flex-1">
                  <span className="text-zinc-500 text-[10px] block leading-none mb-0.5">String da Árvore Atual:</span>
                  <strong className="text-cyan-300 text-[11px] select-all truncate block">{currentTreeCode}</strong>
                </div>

                <button
                  onClick={copyCurrentTreeToClipboard}
                  className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-bold text-[11px] flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copiedCurrentTree ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCurrentTree ? "Copiado!" : "Copiar"}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 p-4 sm:p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-2.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Table className="w-4 h-4 text-cyan-400" /> Builds (DTP 1 a 48)
                </h3>
                <div className="relative w-full sm:w-40">
                  <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                    placeholder="Filtrar..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-7 pr-2 py-1 text-[11px] text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 font-mono"
                  />
                </div>
              </div>

              <div className="overflow-x-auto flex-1 max-h-[360px] scrollbar-thin scrollbar-thumb-zinc-800">
                <table className="w-full text-left font-mono text-xs text-zinc-300">
                  <thead className="border-b border-zinc-800 text-zinc-500 uppercase text-[10px]">
                    <tr>
                      <th className="py-1.5">DTP</th>
                      <th className="py-1.5">Ação</th>
                      <th className="py-1.5">Alvos</th>
                      <th className="py-1.5 text-right">Aplicar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {filteredSteps.map((row, idx) => (
                      <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="py-1.5 font-bold text-cyan-400">{row.dtp}</td>
                        <td className="py-1.5 text-zinc-200 font-sans text-[11px]">{row.pick}</td>
                        <td className="py-1.5 text-[10px] text-zinc-400">
                          {row.sn !== "—" && <span className="text-amber-300 block">SN: {row.sn}</span>}
                          {row.ap !== "—" && <span className="text-purple-300 block">AP: {row.ap}</span>}
                          {row.et !== "—" && <span className="text-indigo-300 block">Σ: {row.et}</span>}
                          {row.sn === "—" && row.ap === "—" && row.et === "—" && <span>—</span>}
                        </td>
                        <td className="py-1.5 text-right">
                          <button
                            onClick={() => applyDtpPreset(row.code)}
                            className="px-2 py-1 rounded bg-zinc-950 hover:bg-cyan-950 border border-zinc-800 hover:border-cyan-500/40 text-cyan-300 text-[10px] font-bold transition-colors"
                          >
                            Usar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ROTEIRO PRÉ-ÁRVORE */}
      {subSection === "guide" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
            {/* FASE 1 */}
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between font-mono">
                <span className="px-2.5 py-1 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold text-xs">
                  Fase 1: Primeiras Corridas (10-15 min)
                </span>
                <span className="text-zinc-500 text-[10px]">Meta: 1e30 Score</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                • Coloque <strong>100% dos RPs no Lab #6 (Common Exponent)</strong>.<br />
                • Desligue o Auto Eternity e entre na Dilatação por 10 a 15 min até atingir ~1e30-e40 Score.<br />
                • Saia da Dilatação para começar a gerar renda passiva (~2.00 DP/s). Farme 100k Eternidades enquanto compra DU2.
              </p>
            </div>

            {/* FASE 2 */}
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between font-mono">
                <span className="px-2.5 py-1 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold text-xs">
                  Fase 2: Estrela em Dilatação (2e33 IP)
                </span>
                <span className="text-zinc-500 text-[10px]">Meta: 1ª Estrela</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                • Alterne entre corridas normais de EP (para comprar DU2) e corridas em Dilatação (para comprar DU1).<br />
                • Ao atingir 2e33 IP dentro da Dilatação, compre a 1ª Estrela ⭐. A partir daqui, seus geradores ganham relevância e você pode investir em Lab 5.
              </p>
            </div>

            {/* FASE 3 */}
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between font-mono">
                <span className="px-2.5 py-1 rounded-xl bg-yellow-950 border border-yellow-500/40 text-yellow-300 font-bold text-xs">
                  Fase 3: O Desafio EC10 (Multiplicadores de DP)
                </span>
                <span className="text-yellow-400 text-[10px]">Crítico</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                • Cada dificuldade do EC10 multiplica sua renda de DP/s (x10, x50, x150, x400, x1.000).<br />
                • <strong>EC10-1:</strong> DU1 ~150-160 (Meta: 1.000.000 Score bruto).<br />
                • <strong>EC10-2 a 5:</strong> DU1 ~220, ~330, ~380 e ~457. Use 100% de Lab 6 para todas as dificuldades do EC10!
              </p>
            </div>

            {/* FASE 4 */}
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between font-mono">
                <span className="px-2.5 py-1 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold text-xs">
                  Fase 4: Reta Final rumo ao 1º DTP (1e27 DP)
                </span>
                <span className="text-emerald-400 text-[10px]">1 DTP</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                • Após vencer EC10-5, atinja ~e300k de Max Score e nivele DU2 até o nível 276 (~1e24 DP/s).<br />
                • Pare de gastar DP e aguarde cerca de 15 a 20 minutos até acumular <strong>1e27 DP</strong> para comprar o <strong>DTP 1</strong> e ativar a Árvore de Dilatação!
              </p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3 font-mono text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Requisitos Recomendados para o 1º DTP:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-2 text-center">
              <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">DU1</span>
                <strong className="text-cyan-300">580</strong>
              </div>
              <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">DU2</span>
                <strong className="text-cyan-300">276</strong>
              </div>
              <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">DU3</span>
                <strong className="text-zinc-300">170</strong>
              </div>
              <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">DU4</span>
                <strong className="text-zinc-300">124</strong>
              </div>
              <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">DU5</span>
                <strong className="text-zinc-300">93</strong>
              </div>
              <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">DU6</span>
                <strong className="text-zinc-300">75</strong>
              </div>
              <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">DU7</span>
                <strong className="text-zinc-300">58</strong>
              </div>
              <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">DU8</span>
                <strong className="text-zinc-300">48</strong>
              </div>
              <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">DU9</span>
                <strong className="text-zinc-300">31</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. RUMO À UNIDADE */}
      {subSection === "unity_prep" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/40 via-zinc-900/70 to-zinc-950 border-2 border-purple-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Checklist Obrigatório Antes de Unir (Unity)
              </h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-950 border border-purple-500/40 text-purple-300 font-bold">
                Meta: 1.08e2466 EP
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans text-xs">
              <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                <strong className="text-white block font-mono">✓ Meta de EP Atingida</strong>
                <p className="text-zinc-400">1.08e2466 EP acumulado (vem naturalmente das corridas longas de AP no DTP 40+).</p>
              </div>

              <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                <strong className="text-white block font-mono">✓ DTP 40+ Recomendado</strong>
                <p className="text-zinc-400">Unir abaixo de DTP 40 torna a recuperação pós-Unity muito mais lenta.</p>
              </div>

              <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                <strong className="text-white block font-mono">✓ Supernova 154+</strong>
                <p className="text-zinc-400">Níveis altos de Supernova proporcionam bônus melhores na transição.</p>
              </div>

              <div className="p-3.5 bg-zinc-950 rounded-2xl border border-amber-500/40 bg-amber-950/10 space-y-1">
                <strong className="text-amber-300 block font-mono">🔥 1º Zodíaco OBRIGATÓRIO: ÁRIES!</strong>
                <p className="text-zinc-300">Na 1ª Unidade, escolha exclusivamente <strong>ÁRIES</strong>. Ele garante bônus de Mult Gain e Common Exp essenciais para o recomeço.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
            <div className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-2">
              <strong className="text-cyan-300 font-mono text-xs block">🧱 A Parede do DTP 16</strong>
              <p className="text-zinc-400 leading-relaxed">
                No DTP 13, pegue a Conquista #140 (1 ponto em cada nó). Isso aumenta TOP-4, MID-4 e BOT-4 em +30%. Sem isso, você ficará travado no DTP 16.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-2">
              <strong className="text-amber-300 font-mono text-xs block">🏰 A Grande Muralha do DTP 40</strong>
              <p className="text-zinc-400 leading-relaxed">
                Do DTP 40 ao DTP 48, cada ponto requer corridas de horas ou dias (ex: DTP 42 requer 24h para SN 156 e 400k+ AP). Seja paciente e faça corridas curtas de DP entre os resets.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}