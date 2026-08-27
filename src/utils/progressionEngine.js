import { parseIncrementalNumber } from "./numberParser";

export function analyzeCurrentProgress(gameState) {
  const { stats, completedTasks, dilationTreeAllocations } = gameState;
  const parsedScore = parseIncrementalNumber(stats.score).value;
  const parsedIP = parseIncrementalNumber(stats.ip).value;

  const recommendations = [];

  // Diagnóstico Camada 1: Revolução
  if (parsedScore < 1.79e308 && stats.eternities === 1 && parsedIP === 0) {
    if (parsedScore < 1e10) {
      recommendations.push({
        priority: "ALTA",
        action: "Farming de Score",
        target: "Alcance 1e10 Score para desbloquear Prestígio.",
        reason: "O primeiro reset de Prestígio acelera o ganho base de multiplicadores."
      });
    } else if (stats.promoLevel < 75) {
      recommendations.push({
        priority: "MÉDIA",
        action: "Balanceamento de Promoções",
        target: "Equilibre Promoções na rota: #1 (80) -> #2 (40) -> #3 (70) -> #4 (50).",
        reason: "Necessário para atingir 1.79e308 de Score sem estagnação."
      });
    } else {
      recommendations.push({
        priority: "CRÍTICA",
        action: "Push para o 1º Infinito",
        target: "Junte 1e42 Prestígio e alcance 1.79e308 Score.",
        reason: "Libera a Camada de Infinito e os Geradores GP."
      });
    }
  }

  // Diagnóstico Camada 2: Infinito
  if (parsedIP > 0 && stats.eternities === 1) {
    const icDone = Object.keys(completedTasks).filter(k => k.startsWith("IC") && completedTasks[k]).length;
    if (icDone < 9) {
      recommendations.push({
        priority: "ALTA",
        action: "Completar Desafios do Infinito",
        target: `Completar próximo IC disponível (${icDone}/9 concluídos).`,
        reason: "Cada IC finalizado concede +1x IP global acumulativo."
      });
    }
  }

  // Diagnóstico Camada 3: Eternidade & Árvore
  if (stats.eternities >= 8) {
    const ecDone = Object.keys(completedTasks).filter(k => k.startsWith("EC") && completedTasks[k]).length;
    if (ecDone < 50) {
      recommendations.push({
        priority: "ALTA",
        action: "Completar Desafios da Eternidade",
        target: `Progredir nos 50 ECs (${ecDone}/50 finalizados).`,
        reason: "Necessário para desbloquear a Árvore de Dilatação e novas Supernovas."
      });
    }
  }

  return recommendations;
}