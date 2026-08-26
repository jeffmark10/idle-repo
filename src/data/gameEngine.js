import { parseIncrementalNumber } from "../utils/numberParser";

// ==========================================
// 1. REVOLUTION / PRE-INFINITY
// ==========================================
export const PRESTIGE_FORMULAS = {
  calcPMult: (scoreVal) => {
    if (scoreVal < 1e3) return 1;
    return 2.56 * Math.pow(Math.max(0, Math.log10(scoreVal / 1e3)), 2.25);
  },
  calcPExp: (scoreVal) => {
    if (scoreVal < 1e5) return 1;
    return 1 + Math.max(0, Math.log10(scoreVal / 1e5)) / 225;
  },
  calcPromoXP: (pMult) => {
    return Math.floor(Math.pow(Math.max(0, pMult / 1000), 0.75));
  },
  calcPromoPowers: (level) => {
    const l = Math.max(1, Number(level) || 1);
    const p4 = 1 + 0.05 * Math.pow(l, 0.48);
    const p1 = p4 * (Math.floor(Math.pow(l, 1.5)) + 1);
    const p2 = p4 * (1 + Math.sqrt(l));
    const p3 = p4 * (10 + Math.pow(l, 0.82));
    return { p1, p2, p3, p4 };
  }
};

// ==========================================
// 2. INFINITY LAYER
// ==========================================
export const INFINITY_FORMULAS = {
  calcStardust: (stars, baseUpgrades) => {
    const s = Math.max(0, Number(stars) || 0);
    const b = Math.max(0, Number(baseUpgrades) || 0);
    const base = 2.75 + 0.275 * b;
    const exp = 0.50; // 0.45 + 0.05 * 1
    
    // Cálculo seguro para grandes expoentes
    const stardustGain = s > 600 ? Infinity : 0.05 * Math.pow(base, s);
    const genMult = stardustGain === Infinity ? Infinity : Math.pow(stardustGain, exp);
    return { base, exp, stardustGain, genMult };
  },
  calcGeneratorPower: (gp, boosterUpgrade = false) => {
    const powerExp = boosterUpgrade ? 0.75 : 0.666;
    return Math.pow(Math.max(1, gp), powerExp);
  }
};

// ==========================================
// 3. ETERNITY LAYER
// ==========================================
export const ETERNITY_FORMULAS = {
  calcLabProduction: (baseLv, multLv, powerLv) => {
    const base = 1 + (Number(baseLv) || 0) * 0.20;
    const mult = 1 + (Number(multLv) || 0) * 0.50;
    const power = 1 + (Number(powerLv) || 0) * 0.01;
    return Math.pow(base * mult, power);
  },
  calcEternityMultipliers: (eternitiesCount) => {
    const et = Math.max(1, Number(eternitiesCount) || 1);
    return {
      multGain: et < 20 ? 1 + et : Math.pow(1 + et / 21, 0.1) * 21,
      lapSpeed: et < 20 ? 1 + et : Math.pow(1 + et / 21, 0.1) * 21,
      ascPower: et < 20 ? 1 + et / 10 : Math.pow(1 + et / 103, 0.3) * 3,
      infGain: et < 20 ? Math.floor(Math.pow(1 + et, 1.2)) : Math.floor(Math.pow(Math.pow(1 + et, 1.2) / 211.5, 0.1) * 211.5),
      gpPower: et < 20 ? Math.pow(et + 1, 1.1) : Math.pow(Math.pow(et + 1, 1.1) / 211.3, 0.1) * 211.3,
      stardustGain: et < 10 ? 10 * et : Math.pow(et, 10)
    };
  }
};