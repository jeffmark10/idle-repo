const safeStorage = {
  async get(key) {
    try {
      if (typeof window !== "undefined" && window.storage && typeof window.storage.get === "function") {
        const res = await window.storage.get(key);
        return res && res.value ? JSON.parse(res.value) : null;
      }
      if (typeof window !== "undefined" && window.localStorage) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }
    } catch (e) {
      console.warn(`Storage inacessível para get(${key}):`, e);
    }
    return null;
  },
  async set(key, value) {
    try {
      const serialized = JSON.stringify(value);
      if (typeof window !== "undefined" && window.storage && typeof window.storage.set === "function") {
        await window.storage.set(key, serialized);
        return;
      }
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, serialized);
      }
    } catch (e) {
      console.warn(`Storage inacessível para set(${key}):`, e);
    }
  },
  async remove(key) {
    try {
      if (typeof window !== "undefined" && window.storage && typeof window.storage.delete === "function") {
        await window.storage.delete(key);
      }
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn(`Storage inacessível para remove(${key}):`, e);
    }
  }
};

export default safeStorage;