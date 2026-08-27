// src/utils/leaderboardMath.js

/**
 * Fórmula Oficial da Tabela de Líderes (wiki.gg)
 * Score = [Parte 1 (Camadas 1-4)]^0.35 * [Parte 2 (Camadas 5-8)]
 */
export function calculateLeaderboardScore(stats) {
  const lg = (val) => Math.max(0, Math.log10(Math.max(1, val)));

  const {
    maxScore = 1e10,
    maxExponent = 1,
    maxInfinites = 1,
    maxIP = 1,
    maxChallenges = 0,
    maxStars = 0,
    eternities = 0,
    maxEP = 1,
    maxAnimals = 0,
    maxLabLevel = 0,
    maxSupernova = 0,
    maxDP = 1,
    maxDTP = 0,
    maxUnities = 0,
    maxZodiacLevel = 1,
    maxTrialCount = 0,
    maxAttackLevel = 1
  } = stats;

  // Parte 1 (Camadas Iniciais até Dilatação)
  const p1 =
    (1 + lg(1 + lg(maxScore))) *
    maxExponent *
    (1 + lg(1 + maxInfinites)) *
    (1 + lg(1 + lg(1 + maxIP))) *
    (1 + maxChallenges / 10) *
    Math.pow(1 + maxStars / 8, 0.3) *
    Math.pow(1 + lg(1 + eternities), 0.25) *
    (1 + lg(1 + lg(1 + maxEP))) *
    (1 + maxAnimals / 9) *
    Math.pow(1 + maxLabLevel / 50, 0.35) *
    Math.pow(1 + maxSupernova / 10, 0.6) *
    (1 + lg(1 + lg(1 + maxDP))) *
    Math.pow(1 + maxDTP / 8, 0.8);

  // Parte 2 (Unidade até Ataques/Zodíaco)
  const p2 =
    (1 + lg(1 + maxUnities)) *
    (1 + maxZodiacLevel / 100) *
    (1 + maxTrialCount / 10) *
    (1 + lg(1 + maxAttackLevel));

  return Math.pow(p1, 0.35) * p2;
}