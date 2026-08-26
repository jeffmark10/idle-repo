import { useState, useEffect, useRef } from "react";

export function useTarotCooldowns(activeTab) {
  const [cooldowns, setCooldowns] = useState({});
  const [gameSpeed, setGameSpeed] = useState(1);
  const gameSpeedRef = useRef(gameSpeed);
  gameSpeedRef.current = gameSpeed;

  useEffect(() => {
    if (activeTab !== "tarot") return;

    const timer = setInterval(() => {
      setCooldowns((prev) => {
        let hasChanges = false;
        const next = {};
        for (const id in prev) {
          const val = prev[id] - gameSpeedRef.current;
          if (val > 0) {
            next[id] = val;
            hasChanges = true;
          } else {
            hasChanges = true;
          }
        }
        return hasChanges ? next : prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTab]);

  const castArcane = (id, baseCd) => {
    setCooldowns((prev) => ({ ...prev, [id]: baseCd }));
  };

  return { cooldowns, gameSpeed, setGameSpeed, castArcane };
}