import { useState, useEffect } from "react";
import safeStorage from "../utils/safeStorage";

export function usePersistedState(key, initialValue) {
  const [state, setState] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    safeStorage.get(key).then((saved) => {
      if (saved !== null && saved !== undefined) {
        setState(saved);
      }
      setLoaded(true);
    });
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => {
      safeStorage.set(key, state);
    }, 400);
    return () => clearTimeout(timer);
  }, [key, state, loaded]);

  return [state, setState, loaded];
}