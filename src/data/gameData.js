export const CIRCLES_DATA = [
  { name: "Vermelho", initialCost: 10, costMult: 1.15, baseSpeed: 1.0, color: "text-red-400" },
  { name: "Laranja", initialCost: 100, costMult: 1.20, baseSpeed: 0.5, color: "text-orange-400" },
  { name: "Amarelo", initialCost: 1000, costMult: 1.25, baseSpeed: 0.25, color: "text-yellow-400" },
  { name: "Verde", initialCost: 1e4, costMult: 1.30, baseSpeed: 0.125, color: "text-green-400" },
  { name: "Turquesa", initialCost: 1e5, costMult: 1.35, baseSpeed: 0.062, color: "text-teal-400" },
  { name: "Ciano", initialCost: 1e6, costMult: 1.40, baseSpeed: 0.031, color: "text-cyan-400" },
  { name: "Azul", initialCost: 1e7, costMult: 1.45, baseSpeed: 0.015, color: "text-blue-400" },
  { name: "Roxo", initialCost: 1e8, costMult: 1.50, baseSpeed: 0.007, color: "text-purple-400" },
  { name: "Rosa", initialCost: 1e9, costMult: 1.55, baseSpeed: 0.003, color: "text-pink-400" },
  { name: "Branco", initialCost: 1e10, costMult: 1.60, baseSpeed: 0.001, color: "text-zinc-100" },
];

export const DAILY_REWARDS_DATA = [
  { day: 1, type: "souls", reward: "50 Almas" },
  { day: 2, type: "timeflux", reward: "15 min Time Flux" },
  { day: 3, type: "souls", reward: "75 Almas" },
  { day: 4, type: "souls", reward: "100 Almas" },
  { day: 5, type: "timeflux", reward: "30 min Time Flux" },
  { day: 6, type: "souls", reward: "150 Almas" },
  { day: 7, type: "souls", reward: "300 Almas" },
  { day: 8, type: "souls", reward: "100 Almas" },
  { day: 9, type: "timeflux", reward: "45 min Time Flux" },
  { day: 10, type: "souls", reward: "150 Almas" },
  { day: 11, type: "souls", reward: "200 Almas" },
  { day: 12, type: "timeflux", reward: "60 min Time Flux" },
  { day: 13, type: "souls", reward: "250 Almas" },
  { day: 14, type: "souls", reward: "500 Almas" },
];

export const INFINITY_CHALLENGES = [
  { id: "IC1", name: "IC1: Sem Promoções 2 e 4", penalty: "Promoções #2 e #4 desativadas", reward: "Promoções 2 e 4 mais fortes (+1x IP)", req: "Desbloqueio imediato em [7;1]" },
  { id: "IC2", name: "IC2: Poder de Ascensão Fraco", penalty: "Poder de ascensão dividido por 4", reward: "Poder de Ascensão x1.2 (+1x IP)", req: "Logo após IC1" },
  { id: "IC3", name: "IC3: Expoente Comum Reduzido", penalty: "Expoente Comum reduzido em 0.40", reward: "+0.03 ao Expoente Base (+1x IP)", req: "Coluna 8 completa + 2x G1" },
  { id: "IC4", name: "IC4: Prestígio e Promoções ^0.4", penalty: "Ganhos de Prestígio e Promoções elevados a ^0.40", reward: "+1 nível para todas as promoções pós-Infinito (+1x IP)", req: "1x G2 + Coluna 9 recomendada" },
  { id: "IC5", name: "IC5: Promoções Extremamente Fracas", penalty: "Promoções severamente enfraquecidas (x1.12 no Nv. 40)", reward: "Todas as promoções ligeiramente mais fortes (+1x IP)", req: "3x G1 + Logo após IC4" },
  { id: "IC6", name: "IC6: Multiplicadores em Queda Rápida", penalty: "Multiplicadores das cores decaem rapidamente", reward: "Todos os Geradores 2x mais fortes (+1x IP)", req: "Logo após IC5 (~4 min)" },
  { id: "IC7", name: "IC7: Penalidade por Tempo no Infinito", penalty: "Todos os mults divididos por (tempo no Infinito)²", reward: "Mults multiplicados por (tempo no Infinito)^0.2 (+1x IP)", req: "Coluna 13 completa + 3x G1" },
  { id: "IC8", name: "IC8: Ascensões Desativadas", penalty: "Ascensões completamente bloqueadas", reward: "+2 ao Poder de Ascensão Base (+1x IP)", req: "Coluna 14 completa + 4x G1" },
  { id: "IC9", name: "IC9: Apenas Quatro Cores", penalty: "Apenas Vermelho, Laranja, Amarelo e Verde disponíveis", reward: "Ganho de Infinitos em dobro (2x) + Desbloqueia Break Infinity!", req: "Logo após IC8 (~1 a 2h)" },
];

export const SPECIAL_ACHIEVEMENTS = [
  { id: "ACH_005", num: "005", name: "Confira o Desenvolvedor", desc: "Abra a aba 'Créditos' no menu lateral direito.", reward: "+0.01x Multiplicador Geral" },
  { id: "ACH_021", num: "021", name: "Você Não Precisa Disso", desc: "Faça uma Promoção sem realizar Prestígio entre elas.", reward: "+0.01x Multiplicador Geral" },
  { id: "ACH_025", num: "025", name: "Apenas Três", desc: "Faça Prestígio tendo comprado apenas Vermelho, Laranja e Amarelo.", reward: "+0.01x Multiplicador Geral" },
  { id: "ACH_026", num: "026", name: "Prestígio Fácil", desc: "Promova sem realizar nenhum Prestígio e sem nenhuma Ascensão.", reward: "+0.01x Multiplicador Geral" },
  { id: "ACH_029", num: "029", name: "Para Trás (Backwards)", desc: "Faça com que os multiplicadores fiquem na ordem: Branco > Rosa > Roxo > Azul > Ciano > Turquesa > Verde > Amarelo > Laranja (Sem Vermelho).", reward: "Base para a Conquista #140" },
  { id: "ACH_140", num: "140", name: "Agora Vale a Pena", desc: "Alavanque 1 ponto em cada um dos nós da Árvore de Dilatação (DTP 13).", reward: "+30% de poder para TOP-4, MID-4 e BOT-4" },
  { id: "ACH_200", num: "200", name: "Matemática Inversa", desc: "Tenha exatamente 1 nível de Base no Laboratório e o máximo de Power possível com Auto SN desligado.", reward: "+0.01x Multiplicador Geral" }
];

export const MACROS_DATA = [
  {
    id: "m_auto_ic",
    name: "Auto Infinity Challenges (IC1 a IC9)",
    category: "Eternidade & Infinito",
    req: "Eternidade 4-8 • Conquista #074 / #076",
    description: "Executa a sequência de quebra e limpeza automática de todos os 9 Desafios do Infinito em loop contínuo.",
    code: `WaitUntil (IP >= 1000)
if (IP >= 1000)
\tBreakInfinity(false)
\tRepeat (9, false)
\t\tEnterIC(0, true)
\tBreakInfinity(true)
\tWaitUntil (IP >= 100 Sx)
\tBreakInfinity(false)
\tEnterIC(1, true)
\tEnterIC(2, true)
\tEnterIC(3, true)
\tEnterIC(4, true)
\tEnterIC(5, true)
\tEnterIC(6, true)
\tEnterIC(7, true)
\tEnterIC(8, true)
\tEnterIC(9, true)
\tBreakInfinity(true)
\tWaitForSeconds(10.0)
\tWaitUntil (IP == 0.00 && Score == 0.00)
\tRestart()`
  },
  {
    id: "m_fast_et_farm",
    name: "Fast Eternity Farm (60 Σ/s)",
    category: "Eternidade & Infinito",
    req: "Eternidade 16+ • Auto Eternity em 1 EP",
    description: "Realiza resets imediatos a cada 17ms para farmar rapidamente de 50.000 a 10.000.000 de Eternidades (Σ).",
    code: `Infinite()
Eternate()
WaitUntil (EP == 0.00)`
  },
  {
    id: "m_post_easy_trials",
    name: "Loop Pós-Easy Trials (Rumo ao DTP)",
    category: "Unidade & Trials",
    req: "Conquista #170 • Auto Infinite e Auto Eternity Desligados",
    description: "Automatiza a subida desde o início de uma nova Unidade até a tela da Árvore de Dilatação (DTP).",
    code: `if (DP <= 1.00e100)
\tWaitForSeconds(0.2)
\tInfinite()
\tWaitForSeconds(1.0)
\tEternate()
\tif (EP >= 1.00e80)
\t\tRepeat (4, false)
\t\t\tEnterEC(0, 0, false)
\t\t\tWaitForSeconds(2.0)
\t\t\tExitEC()
if (AP > 100 && DP <= 1.00e1000)
\tDilate(true)
\tif (DP <= 5000)
\t\tWaitForSeconds(10.0)
\telse
\t\tWaitForSeconds(2.0)
\tDilate(false)
if (DP >= 1.00e800)
\tWaitForSeconds(50.0)
else if (DP >= 1.00e100)
\tWaitForSeconds(20.0)
else if (DP >= 1.00e33)
\tWaitForSeconds(5.0)
Eternate()`
  },
  {
    id: "m_full_unity",
    name: "Full Unity Loop (Farm de Ouro & Zodíacos)",
    category: "Unidade & Trials",
    req: "Pós-Hard Trials • Templates DT 0, 1 e 2 configurados",
    description: "Executa desafios de dilatação, carrega os presets da Árvore e maximiza a obtenção de Zodíacos de alta qualidade.",
    code: `Repeat (3, false)
\tWaitForSeconds(0.05)
\tInfinite()
\tWaitForSeconds(0.5)
\tEternate()
\tDilate(true)
Repeat (14, false)
\tEnterEC(0, 0, false)
\tWaitUntil (Score >= 1.00e1000 || EP == 0.00)
\tWaitForSeconds(0.05)
\tExitEC()
Repeat (4, false)
\tWaitForSeconds(0.05)
\tLoadDT(0)
\tLoadDT(1)
\tLoadDT(2)
\tDilate(true)
\tWaitForSeconds(0.5)
\tDilate(false)
WaitUntil (EP == 0.00)`
  },
  {
    id: "m_fast_sacrificing",
    name: "Fast Sacrificing (Ataque Nível 1000+)",
    category: "Unidade & Trials",
    req: "Ataque 1000+ • Auto Eternate em 1e2467 • Auto Unity Ativo",
    description: "Maximiza a eficiência de sacrifício para gerar Zodíacos de alta qualidade e poeira estelar (Astrodust).",
    code: `WaitForSeconds(0.051)
Infinite()
WaitForSeconds(0.017)
Eternate()
WaitForSeconds(0.017)
Dilate(true)
WaitForSeconds(0.034)
Dilate(false)
WaitUntil (EP == 0.00)`
  }
];