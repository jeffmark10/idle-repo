export function parseIncrementalNumber(input) {
  if (typeof input === "number") return { value: isNaN(input) ? 0 : input, isValid: !isNaN(input) };
  if (!input || typeof input !== "string") return { value: 0, isValid: false };

  const clean = input.trim().toLowerCase().replace(",", ".");
  if (!clean) return { value: 0, isValid: false };

  const isNegative = clean.startsWith("-");
  const unsignedClean = isNegative ? clean.slice(1) : clean;

  if (unsignedClean.includes("e")) {
    const parts = unsignedClean.split("e");
    if (parts.length === 2) {
      const m = parseFloat(parts[0]);
      const exp = parseFloat(parts[1]);
      if (!isNaN(m) && !isNaN(exp)) {
        const val = exp > 308 ? Infinity : m * Math.pow(10, exp);
        return { value: isNegative ? -val : val, isValid: true };
      }
    }
  }

  const suffixes = { k: 1e3, m: 1e6, b: 1e9, t: 1e12, qa: 1e15, qi: 1e18 };
  const match = unsignedClean.match(/^([0-9.]+)\s*([a-z]+)?$/);
  if (!match) {
    const fallback = parseFloat(clean);
    return { value: isNaN(fallback) ? 0 : fallback, isValid: !isNaN(fallback) };
  }

  const val = parseFloat(match[1]);
  const suffix = match[2];
  if (isNaN(val)) return { value: 0, isValid: false };

  let finalValue = val;
  if (suffix) {
    if (suffixes[suffix]) finalValue = val * suffixes[suffix];
    else return { value: 0, isValid: false };
  }

  return { value: isNegative ? -finalValue : finalValue, isValid: true };
}

export function formatScientific(num) {
  if (num === Infinity || num === -Infinity || (typeof num === "number" && isNaN(num))) {
    return "∞ (Limite)";
  }
  if (!num) return "0";
  if (Math.abs(num) >= 1e6 || (Math.abs(num) > 0 && Math.abs(num) < 1e-3)) {
    return num.toExponential(2).replace("+", "");
  }
  return num.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}