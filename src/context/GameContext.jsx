import React, { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

const STORAGE_KEY = "REVOLUTION_IDLE_GLOBAL_STATE_V3";

const LEGACY_STORAGE_KEYS = [
  "REVOLUTION_IDLE_USER_STATE_V1",
  "REVOLUTION_IDLE_GLOBAL_STATE_V2",
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

// Estado Inicial Limpo (Sem código de Praga/Tarô/Minerais/Singularidade)
const INITIAL_STATE = {
  profile: {
    currentTab: "revo",
    autoSave: true
  },
  stats: {
    score: "0",
    promoLevel: 1,
    ip: "0",
    ep: "0",
    dp: "0",
    eternities: 0,
    supernovas: 0,
    stars: 0,
    starBaseUpgrades: 0,
    lab: { base: 1, mult: 1, power: 1 },
    rpAllocations: {
      ipGain: 0,
      ascPower: 0,
      starBase: 0,
      epGain: 0,
      genPower: 0,
      commonExp: 0
    }
  },
  completedTasks: {},
  dilationTreeAllocations: { "C-1": 1 },
  savedLoadouts: {}
};

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState(() => {
    LEGACY_STORAGE_KEYS.forEach(k => localStorage.removeItem(k));

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

  useEffect(() => {
    if (gameState.profile.autoSave) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  const updateStat = (key, value) => {
    setGameState(prev => ({
      ...prev,
      stats: { ...prev.stats, [key]: value }
    }));
  };

  const updateNestedStat = (category, key, value) => {
    setGameState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [category]: { ...prev.stats[category], [key]: value }
      }
    }));
  };

  const toggleTask = (taskId) => {
    setGameState(prev => ({
      ...prev,
      completedTasks: { ...prev.completedTasks, [taskId]: !prev.completedTasks[taskId] }
    }));
  };

  const updateDtpAllocation = (nodeId, delta) => {
    setGameState(prev => {
      const current = prev.dilationTreeAllocations[nodeId] || 0;
      const next = Math.max(0, Math.min(5, current + delta));
      return {
        ...prev,
        dilationTreeAllocations: { ...prev.dilationTreeAllocations, [nodeId]: next }
      };
    });
  };

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

  const respecDilationTree = () => {
    setGameState(prev => ({
      ...prev,
      dilationTreeAllocations: { "C-1": 1 }
    }));
  };

  const setCurrentTab = (tabId) => {
    setGameState(prev => ({
      ...prev,
      profile: { ...prev.profile, currentTab: tabId }
    }));
  };

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