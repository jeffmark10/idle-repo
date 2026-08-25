import React, { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

const STORAGE_KEY = "REVOLUTION_IDLE_USER_STATE_V1";

const INITIAL_STATE = {
  profile: {
    name: "Jogador",
    currentLayer: "revolution", // revolution | infinity | eternity | unity | plague
    autoSave: true
  },
  stats: {
    score: "1e10",
    ip: "0",
    ep: "0",
    dp: "0",
    eternities: 1,
    supernovas: 0,
    promoLevel: 10,
    stars: 1,
    starBaseUpgrades: 0,
    lab: { base: 1, mult: 1, power: 1 },
    rpAllocations: { ipGain: 0, ascPower: 0, starBase: 0, epGain: 0, genPower: 0, commonExp: 0 }
  },
  // Persistência da Praga e desbloqueios
  plague: {
    isActive: false,
    infectedColors: [],
    dnaPoints: 0,
    mutations: {}
  },
  completedTasks: {}, // { "IC1": true, "EC1-1": true, "ACH_005": true }
  dilationTreeAllocations: { "C-1": 1 },
  savedLoadouts: {}
};

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return { ...INITIAL_STATE, ...JSON.parse(saved) };
      } catch (e) {
        console.error("Falha ao carregar save:", e);
      }
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    if (gameState.profile.autoSave) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  // Atualização genérica de estado
  const updateStat = (category, field, value) => {
    setGameState((prev) => ({
      ...prev,
      [category]: typeof field === "object" 
        ? { ...prev[category], ...field }
        : { ...prev[category], [field]: value }
    }));
  };

  // Alternar conclusão de Checklist / Desafio
  const toggleTask = (taskId) => {
    setGameState((prev) => ({
      ...prev,
      completedTasks: {
        ...prev.completedTasks,
        [taskId]: !prev.completedTasks[taskId]
      }
    }));
  };

  // Motor de Reset com Cascata Hierárquica
  const executePrestigeReset = (layerType) => {
    setGameState((prev) => {
      const draft = structuredClone(prev);

      if (layerType === "prestige") {
        // Reseta círculos, mas mantém promoções e conquistas
        draft.stats.score = "0";
      } else if (layerType === "infinity") {
        // Reseta Revolução e Prestige
        draft.stats.score = "0";
        draft.stats.promoLevel = 1;
      } else if (layerType === "eternity") {
        // Reseta Infinity, Árvore de IP e Geradores (mantém marcos de ET e automações salvas)
        draft.stats.score = "0";
        draft.stats.ip = "0";
        draft.stats.stars = 1;
        draft.stats.starBaseUpgrades = 0;
        draft.stats.eternities += 1;
      }

      return draft;
    });
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        updateStat,
        toggleTask,
        executePrestigeReset
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame deve ser usado dentro de GameProvider");
  return context;
}