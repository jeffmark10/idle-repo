import { useState, useEffect, useRef } from "react";

export function usePlagueSimulation(activeTab) {
  const [pigCount, setPigCount] = useState(5);
  const [pipTotal, setPipTotal] = useState(1000);
  const [erList, setErList] = useState([{ id: 1, level: 5, power: 120 }]);
  const [infProgress, setInfProgress] = useState(0);

  const pigRef = useRef(pigCount);
  pigRef.current = pigCount;
  const erListRef = useRef(erList);
  erListRef.current = erList;

  useEffect(() => {
    if (activeTab !== "plague") return;

    const timer = setInterval(() => {
      setPipTotal((p) => p + pigRef.current * 2);
      setInfProgress((prev) => {
        if (prev >= 100) {
          setPigCount((p) => p + 2);
          return 0;
        }
        const pwr = erListRef.current.reduce((acc, e) => acc + e.power, 10);
        return Math.min(100, prev + pwr * 0.05);
      });
    }, 500);

    return () => clearInterval(timer);
  }, [activeTab]);

  const synthesizeEr = () => {
    if (pipTotal < 200) return false;
    setPipTotal((p) => p - 200);
    setErList((prev) => [
      ...prev,
      { id: Date.now(), level: prev.length + 1, power: 120 * (prev.length + 1) }
    ]);
    return true;
  };

  return { pigCount, pipTotal, erList, infProgress, synthesizeEr };
}