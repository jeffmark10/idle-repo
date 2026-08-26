import { parseIncrementalNumber } from "./numberParser";

export function parseGameSaveString(rawSave) {
  try {
    const trimmed = rawSave.trim();
    if (!trimmed) throw new Error("Texto do save está vazio.");

    // O jogo salva objetos codificados em Base64 ou JSON direto
    let decodedJson = "";
    try {
      decodedJson = atob(trimmed);
    } catch {
      decodedJson = trimmed;
    }

    const saveObj = JSON.parse(decodedJson);

    // Mapeamento dos campos do save oficial do Revolution Idle
    const extractedStats = {
      score: String(saveObj.score || saveObj.points || "0"),
      ip: String(saveObj.infinityPoints || saveObj.ip || "0"),
      ep: String(saveObj.eternityPoints || saveObj.ep || "0"),
      dp: String(saveObj.dilationPoints || saveObj.dp || "0"),
      eternities: Number(saveObj.eternities || 0),
      supernovas: Number(saveObj.supernovas || 0),
      stars: Number(saveObj.stars || 0),
      starBaseUpgrades: Number(saveObj.starBasePurchases || 0),
      promoLevel: Number(saveObj.promoLevel || 1)
    };

    const completedTasks = {};
    if (Array.isArray(saveObj.challengesCompleted)) {
      saveObj.challengesCompleted.forEach(c => {
        completedTasks[c] = true;
      });
    }

    return {
      success: true,
      stats: extractedStats,
      completedTasks
    };
  } catch (err) {
    return {
      success: false,
      error: "Formato de save inválido. Certifique-se de colar a string de exportação do jogo."
    };
  }
}

export function exportUserGameState(gameState) {
  try {
    const json = JSON.stringify(gameState);
    return btoa(json);
  } catch {
    return "";
  }
}