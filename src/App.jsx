"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Trash2 } from "lucide-react";
import Navbar from "./components/Navbar";
import Toast from "./components/ui/Toast";
import Modal from "./components/ui/Modal";
import SearchModal from "./components/SearchModal";

// Subcomponentes de Abas
import RevolutionTab from "./components/tabs/RevolutionTab";
import InfinityTab from "./components/tabs/InfinityTab";
import EternityTab from "./components/tabs/EternityTab";
import DilationTab from "./components/tabs/DilationTab";
import UnityTab from "./components/tabs/UnityTab";
import MineralsTab from "./components/tabs/MineralsTab";
import TarotTab from "./components/tabs/TarotTab";
import PlagueTab from "./components/tabs/PlagueTab";
import SingularityTab from "./components/tabs/SingularityTab";
import MacrosTab from "./components/tabs/MacrosTab";

// Hooks, Dados e Utilitários
import { TABS_CONFIG } from "./data/tabsConfig";
import { INFINITY_CHALLENGES, EC_LIST, ARCANES_DATA, INITIAL_SINGULARITY_NODES, CIRCLES_DATA, PLANET_PRESETS, MACROS_LIST } from "./data/gameData";
import { usePersistedState } from "./hooks/usePersistedState";
import { useTarotCooldowns } from "./hooks/useTarotCooldowns";
import { usePlagueSimulation } from "./hooks/usePlagueSimulation";

const TASKS_STORAGE_KEY = "ri_full_tasks";

export default function App() {
  const [activeTab, setActiveTab] = useState("revolution");
  const [toastMessage, setToastMessage] = useState(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Sincronização com hash da URL
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && TABS_CONFIG.some((t) => t.id === hash)) setActiveTab(hash);
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") window.location.hash = tabId;
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Checklist persistente
  const [checkedTasks, setCheckedTasks] = usePersistedState(TASKS_STORAGE_KEY, {});
  const toggleCheck = (id) => setCheckedTasks((prev) => ({ ...prev, [id]: !prev[id] }));

  // Estados persistentes das simulações
  const [revScore, setRevScore] = usePersistedState("sim_revScore", "1e10");
  const [starCount, setStarCount] = usePersistedState("sim_starCount", 5);
  const [starBasePurchases, setStarBasePurchases] = usePersistedState("sim_starBase", 2);
  const [snCount, setSnCount] = usePersistedState("sim_snCount", 10);
  const [treeState, setTreeState] = usePersistedState("sim_dtpTree", { center: 1, top: [1, 1, 0, 0], middle: [1, 1, 0, 0], bottom: [0, 0, 0, 0] });
  const [luckInput, setLuckInput] = usePersistedState("sim_luckInput", "25");
  const [selectedPreset, setSelectedPreset] = usePersistedState("sim_planetPreset", 0);
  const [mineralGrid, setMineralGrid] = usePersistedState("sim_mineralGrid", [1, 1, 2, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [node1Lvl, setNode1Lvl] = usePersistedState("sim_node1Lvl", 5);
  const [nodes, setNodes] = usePersistedState("sim_singNodes", INITIAL_SINGULARITY_NODES.map((n) => ({ ...n, level: 0, asc: 0 })));

  // Timers isolados em hooks
  const { cooldowns, gameSpeed, setGameSpeed, castArcane } = useTarotCooldowns(activeTab);
  const { pigCount, pipTotal, erList, infProgress, synthesizeEr } = usePlagueSimulation(activeTab);

  // Lógica de minerais
  const handleSpawnMineral = () => {
    const emp = mineralGrid.indexOf(0);
    if (emp !== -1) {
      const g = [...mineralGrid];
      g[emp] = 1;
      setMineralGrid(g);
    }
  };

  const handleMergeCascading = () => {
    let gridCopy = [...mineralGrid];
    let changed = true;
    while (changed) {
      changed = false;
      for (let i = 0; i < gridCopy.length; i++) {
        if (gridCopy[i] === 0) continue;
        for (let j = i + 1; j < gridCopy.length; j++) {
          if (gridCopy[i] === gridCopy[j] && gridCopy[i] > 0) {
            gridCopy[i] += 1;
            gridCopy[j] = 0;
            changed = true;
            break;
          }
        }
        if (changed) break;
      }
    }
    setMineralGrid(gridCopy);
    showToast("Fusão em cascata concluída!");
  };

  // Reset total
  const executeFullReset = () => {
    setCheckedTasks({});
    setResetConfirmOpen(false);
    showToast("Progresso resetado!");
  };

  // Progresso
  const totalTasksCount = INFINITY_CHALLENGES.length + EC_LIST.length;
  const completedCount = Object.values(checkedTasks).filter(Boolean).length;
  const progressPct = totalTasksCount > 0 ? Math.min(100, Math.round((completedCount / totalTasksCount) * 100)) : 0;
  const currentTabConfig = TABS_CONFIG.find((t) => t.id === activeTab) || TABS_CONFIG[0];

  // Busca global expandida
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const list = [];
    INFINITY_CHALLENGES.forEach((ic) => ic.name.toLowerCase().includes(q) && list.push({ title: ic.name, subtitle: ic.penalty, tabId: "infinity" }));
    EC_LIST.forEach((ec) => ec.name.toLowerCase().includes(q) && list.push({ title: ec.name, subtitle: ec.reward, tabId: "eternity" }));
    ARCANES_DATA.forEach((arc) => arc.name.toLowerCase().includes(q) && list.push({ title: arc.name, subtitle: arc.effect, tabId: "tarot" }));
    INITIAL_SINGULARITY_NODES.forEach((sn) => sn.name.toLowerCase().includes(q) && list.push({ title: `Nó #${sn.id}: ${sn.name}`, subtitle: sn.desc, tabId: "singularity" }));
    CIRCLES_DATA.forEach((c) => c.name.toLowerCase().includes(q) && list.push({ title: `Círculo ${c.name}`, subtitle: `Custo: ${c.initialCost} ⵙ`, tabId: "revolution" }));
    PLANET_PRESETS.forEach((p) => p.name.toLowerCase().includes(q) && list.push({ title: `Preset: ${p.name}`, subtitle: "Preset de Zodíaco", tabId: "unity" }));
    MACROS_LIST.forEach((m) => m.title.toLowerCase().includes(q) && list.push({ title: m.title, subtitle: m.desc, tabId: "macros" }));
    return list;
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-purple-500 selection:text-white pb-16">
      <Toast message={toastMessage} />

      <Navbar
        activeTab={activeTab}
        onSwitchTab={switchTab}
        progressPct={progressPct}
        completedCount={completedCount}
        totalTasksCount={totalTasksCount}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenReset={() => setResetConfirmOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-mono">{currentTabConfig.symbol}</span>
            <div>
              <h1 className="text-lg font-bold text-white leading-none">{currentTabConfig.label}</h1>
              <span className="text-[11px] text-zinc-400 font-mono mt-0.5 block">
                {currentTabConfig.stageNum !== null ? `Camada ${currentTabConfig.stageNum} de 8 • ${currentTabConfig.phase}` : currentTabConfig.phase}
              </span>
            </div>
          </div>
        </div>

        {activeTab === "revolution" && <RevolutionTab score={revScore} onScoreChange={setRevScore} />}
        {activeTab === "infinity" && (
          <InfinityTab
            checkedTasks={checkedTasks}
            onToggleCheck={toggleCheck}
            starCount={starCount}
            onStarCountChange={setStarCount}
            starBasePurchases={starBasePurchases}
            onStarBasePurchasesChange={setStarBasePurchases}
          />
        )}
        {activeTab === "eternity" && (
          <EternityTab
            checkedTasks={checkedTasks}
            onToggleCheck={toggleCheck}
            snCount={snCount}
            onSnCountChange={setSnCount}
          />
        )}
        {activeTab === "dilation" && (
          <DilationTab
            treeState={treeState}
            onTreeChange={setTreeState}
            onResetTree={() => setTreeState({ center: 1, top: [0, 0, 0, 0], middle: [0, 0, 0, 0], bottom: [0, 0, 0, 0] })}
            onCopyLoadout={(code) => { navigator.clipboard.writeText(code); showToast("DTP Loadout copiado!"); }}
          />
        )}
        {activeTab === "unity" && (
          <UnityTab
            luckInput={luckInput}
            onLuckChange={setLuckInput}
            selectedPreset={selectedPreset}
            onPresetChange={setSelectedPreset}
          />
        )}
        {activeTab === "minerals" && (
          <MineralsTab
            mineralGrid={mineralGrid}
            onSpawn={handleSpawnMineral}
            onMergeCascading={handleMergeCascading}
            node1Lvl={node1Lvl}
            onNode1Change={setNode1Lvl}
          />
        )}
        {activeTab === "tarot" && (
          <TarotTab
            cooldowns={cooldowns}
            gameSpeed={gameSpeed}
            onGameSpeedChange={setGameSpeed}
            onCastArcane={(id, cd, name) => { castArcane(id, cd); showToast(`Arcano ${name} conjurado!`); }}
          />
        )}
        {activeTab === "plague" && (
          <PlagueTab
            pigCount={pigCount}
            pipTotal={pipTotal}
            erList={erList}
            infProgress={infProgress}
            onSynthesizeEr={() => { if (synthesizeEr()) showToast("Nova cepa sintetizada!"); }}
          />
        )}
        {activeTab === "singularity" && (
          <SingularityTab
            nodes={nodes}
            onUpgradeNode={(id) => setNodes((prev) => prev.map((n) => (n.id === id && n.level < 10 ? { ...n, level: n.level + 1 } : n)))}
            onAscendNode={(id) => { setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, level: 1, asc: n.asc + 1 } : n))); showToast(`Nó #${id} Ascendido!`); }}
          />
        )}
        {activeTab === "macros" && (
          <MacrosTab
            onCopyMacro={(code, title) => { navigator.clipboard.writeText(code); showToast(`Macro "${title}" copiada!`); }}
          />
        )}
      </main>

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        onSelectResult={(tabId) => { switchTab(tabId); setSearchModalOpen(false); setSearchQuery(""); }}
      />

      <Modal isOpen={resetConfirmOpen} onClose={() => setResetConfirmOpen(false)} title="Confirmar Reset Geral">
        <div className="space-y-4">
          <p className="text-xs text-zinc-400 leading-relaxed">
            Deseja realmente apagar todo o checklist de desafios concluídos e o progresso salvo?
          </p>
          <div className="flex gap-2 justify-end pt-2">
            <button
              onClick={() => setResetConfirmOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            >
              Cancelar
            </button>
            <button
              onClick={executeFullReset}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-900/30"
            >
              Sim, Resetar Tudo
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}