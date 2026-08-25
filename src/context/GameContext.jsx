import React, { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

const STORAGE_KEY = "REVOLUTION_IDLE_GLOBAL_STATE_V2";

// Lista de chaves legadas a serem purgadas do localStorage
const LEGACY_STORAGE_KEYS = [
  "REVOLUTION_IDLE_USER_STATE_V1",
  "rev_score",
  "checkedTasks",
  "sim_mineralGrid",
  "sim_planetPreset",
  "sim_node1Lvl",
  "sim_singNodes",
  "pigCount",
  "pipTotal",
  "erList",
  "infProgress"
];

const INITIAL_STATE = {
  profile: {
    currentTab: "revo", // revo | infinity | eternity | dilation | macros | unity | minerals | tarot | plague | singularity
    searchQuery: "",
    autoSave: true
  },
  stats: {
    score: "1e10",
    promoLevel: 10,
    ip: "0",
    ep: "0",
    dp: "0",
    eternities: 1,
    supernovas: 0,
    stars: 1,
    starBaseUpgrades: 0,
    lab: { base: 10, mult: 10, power: 10 },
    rpAllocations: {
      ipGain: 0,
      ascPower: 0,
      starBase: 0,
      epGain: 0,
      genPower: 0,
      commonExp: 0
    }
  },
  completedTasks: {}, // Armazena ICs ("IC1"), ECs ("EC1-1"), Conquistas ("ACH_005")
  dilationTreeAllocations: { "C-1": 1 },
  savedLoadouts: {}
};

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState(() => {
    // 1. Limpeza de chaves legadas isoladas
    LEGACY_STORAGE_KEYS.forEach(k => localStorage.removeItem(k));

    // 2. Carregamento do estado unificado
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_STATE,
          ...parsed,
          profile: { ...INITIAL_STATE.profile, ...parsed.profile },
          stats: { ...INITIAL_STATE.stats, ...parsed.stats },
          completedTasks: { ...parsed.completedTasks },
          dilationTreeAllocations: { ...INITIAL_STATE.dilationTreeAllocations, ...parsed.dilationTreeAllocations }
        };
      } catch (e) {
        console.error("Erro ao carregar dados locais, restaurando padrão:", e);
      }
    }
    return INITIAL_STATE;
  });

  // Persistência automática no localStorage
  useEffect(() => {
    if (gameState.profile.autoSave) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  // Atualizador Atômico de Estatísticas
  const updateStat = (key, value) => {
    setGameState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [key]: value
      }
    }));
  };

  // Atualizador de Objetos Aninhados (ex: Lab)
  const updateNestedStat = (category, key, value) => {
    setGameState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [category]: {
          ...prev.stats[category],
          [key]: value
        }
      }
    }));
  };

  // Alternar conclusão de tarefas/desafios
  const toggleTask = (taskId) => {
    setGameState(prev => ({
      ...prev,
      completedTasks: {
        ...prev.completedTasks,
        [taskId]: !prev.completedTasks[taskId]
      }
    }));
  };

  // Alocação de DTP na Árvore de Dilatação
  const updateDtpAllocation = (nodeId, delta) => {
    setGameState(prev => {
      const current = prev.dilationTreeAllocations[nodeId] || 0;
      const next = Math.max(0, Math.min(5, current + delta));
      return {
        ...prev,
        dilationTreeAllocations: {
          ...prev.dilationTreeAllocations,
          [nodeId]: next
        }
      };
    });
  };

  // Aplicar Preset de Dilatação
  const applyDtpPreset = (presetCode) => {
    const parts = presetCode.split(";");
    const newAlloc = {};
    parts.forEach(p => {
      const type = p[0];
      const rest = p.substring(1);
      if (type === "C") {
        newAlloc["C-1"] = parseInt(rest, 10) || 0;
      } else {
        const nums = rest.split(",").map(n => parseInt(n, 10) || 0);
        nums.forEach((val, idx) => {
          newAlloc[`${type}-${idx + 1}`] = val;
        });
      }
    });

    setGameState(prev => ({
      ...prev,
      dilationTreeAllocations: newAlloc
    }));
  };

  // Respec da Árvore de Dilatação
  const respecDilationTree = () => {
    setGameState(prev => ({
      ...prev,
      dilationTreeAllocations: { "C-1": 1 }
    }));
  };

  // Mudança de Aba Ativa
  const setCurrentTab = (tabId) => {
    setGameState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        currentTab: tabId
      }
    }));
  };

  // RESET GLOBAL COMPLETO (Purga 100% do estado e storage)
  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    LEGACY_STORAGE_KEYS.forEach(k => localStorage.removeItem(k));
    setGameState(INITIAL_STATE);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        updateStat,
        updateNestedStat,
        toggleTask,
        updateDtpAllocation,
        applyDtpPreset,
        respecDilationTree,
        setCurrentTab,
        resetAllData
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame deve ser utilizado dentro de um GameProvider.");
  }
  return context;
}