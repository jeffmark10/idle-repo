import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const GameContext = createContext();
const STORAGE_KEY = "REVOLUTION_IDLE_GLOBAL_STATE_V3";

const INITIAL_STATE = {
  profile: {
    currentTab: "revolution",
    autoSave: true
  },
  stats: {
    score: "0",
    promoLevel: 1,
    streakDay: 10,
    ip: "0",
    ep: "0",
    dp: "0",
    eternities: 0,
    supernovas: 0,
    stars: 0,
    starBaseUpgrades: 0,
    ap: 0,
    animalsCount: 0,
    labRP: 0,
    lab: { base: 1, mult: 1, power: 1 }
  },
  completedTasks: {},
  dilationTreeAllocations: { "C-1": 1 },
  favoriteMacros: []
};

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState(() => {
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
          dilationTreeAllocations: { ...INITIAL_STATE.dilationTreeAllocations, ...parsed.dilationTreeAllocations },
          favoriteMacros: Array.isArray(parsed.favoriteMacros) ? parsed.favoriteMacros : []
        };
      } catch (e) {
        console.error("Erro ao carregar dados locais, restaurando padrão:", e);
      }
    }
    return INITIAL_STATE;
  });

  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    if (!gameState.profile.autoSave) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }, 400);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
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

  const toggleFavoriteMacro = (macroId) => {
    setGameState(prev => {
      const exists = prev.favoriteMacros.includes(macroId);
      return {
        ...prev,
        favoriteMacros: exists
          ? prev.favoriteMacros.filter(id => id !== macroId)
          : [...prev.favoriteMacros, macroId]
      };
    });
  };

  const updateDtpAllocation = (nodeId, delta) => {
    setGameState(prev => {
      const current = prev.dilationTreeAllocations[nodeId] || 0;
      const totalSpent = Object.values(prev.dilationTreeAllocations).reduce((a, b) => a + b, 0);

      // Trava no teto máximo de 65 DTPs
      if (delta > 0 && totalSpent >= 65) return prev;

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
    setGameState(INITIAL_STATE);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        updateStat,
        updateNestedStat,
        toggleTask,
        toggleFavoriteMacro,
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