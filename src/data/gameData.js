// Data dos 10 Círculos da Revolução
export const CIRCLES_DATA = [
  { name: "Vermelho", initialCost: 10, costMult: 1.15, baseSpeed: 1.0 },
  { name: "Laranja", initialCost: 100, costMult: 1.20, baseSpeed: 0.5 },
  { name: "Amarelo", initialCost: 1000, costMult: 1.25, baseSpeed: 0.25 },
  { name: "Verde", initialCost: 1e4, costMult: 1.30, baseSpeed: 0.125 },
  { name: "Turquesa", initialCost: 1e5, costMult: 1.35, baseSpeed: 0.062 },
  { name: "Ciano", initialCost: 1e6, costMult: 1.40, baseSpeed: 0.031 },
  { name: "Azul", initialCost: 1e7, costMult: 1.45, baseSpeed: 0.015 },
  { name: "Roxo", initialCost: 1e8, costMult: 1.50, baseSpeed: 0.007 },
  { name: "Rosa", initialCost: 1e9, costMult: 1.55, baseSpeed: 0.003 },
  { name: "Branco", initialCost: 1e10, costMult: 1.60, baseSpeed: 0.001 },
];

// Calendário de 14 Dias de Recompensas
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

// Desafios do Infinito (IC1 a IC9)
export const INFINITY_CHALLENGES = [
  { id: "IC1", name: "IC1: Sem Promoção 1", penalty: "Promoção #1 desativada", reward: "Multiplicador de Voltas x2" },
  { id: "IC2", name: "IC2: Custo Elevado", penalty: "Custo dos círculos escala muito mais rápido", reward: "Ganho de IP x1.5" },
  { id: "IC3", name: "IC3: Sem Prestígio", penalty: "O botão de Prestígio é desativado", reward: "Ganho de P.Mult x2" },
  { id: "IC4", name: "IC4: Círculos Lentificados", penalty: "Velocidade de voltas de todos os círculos /10", reward: "Ganho de GP x2" },
  { id: "IC5", name: "IC5: Ascensão Fraca", penalty: "Poder de ascensão reduzido", reward: "Poder de Ascensão +1" },
  { id: "IC6", name: "IC6: Apenas Vermelho", penalty: "Apenas o círculo vermelho produz pontos", reward: "Velocidade do Vermelho x5" },
  { id: "IC7", name: "IC7: Sem Promoções", penalty: "Todas as 4 promoções desativadas", reward: "Bônus Geral de Promoções +25%" },
  { id: "IC8", name: "IC8: Sem Geradores", penalty: "Geradores de GP desativados", reward: "Potência dos Geradores +50%" },
  { id: "IC9", name: "IC9: Círculos ao Contrário", penalty: "A ordem de velocidade e custo é invertida", reward: "Desbloqueia o Break Infinity" },
];

// Biblioteca Oficial de Macros (Sintaxe Oficial do Jogo)
export const MACROS_DATA = [
  // ==========================================
  // 1. ETERNIDADE & INFINITO
  // ==========================================
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

  // ==========================================
  // 2. UNIDADE & TRIALS
  // ==========================================
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
    WaitForSeconds(0.05)
    Infinite()
    WaitForSeconds(0.5)
    Eternate()
    Dilate(true)
Repeat (14, false)
    EnterEC(0, 0, false)
    WaitUntil (Score >= 1.00e1000 || EP == 0.00)
    WaitForSeconds(0.05)
    ExitEC()
Repeat (4, false)
    WaitForSeconds(0.05)
    LoadDT(0)
    LoadDT(1)
    LoadDT(2)
    Dilate(true)
    WaitForSeconds(0.5)
    Dilate(false)
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
  },
  {
    id: "m_insane_trial_4",
    name: "Pós-#4 Insane Trial Loop",
    category: "Unidade & Trials",
    req: "Insane Trial #4 Concluído",
    description: "Aproveita o desbloqueio automático dos 50 ECs para farmar Zodíacos instantaneamente no DTP 65.",
    code: `WaitUntil (DTP == 65.00)
LoadDT(0)
WaitUntil (DTP == 0.00)
Restart()`
  },

  // ==========================================
  // 3. MINERAIS & ELEMENTOS
  // ==========================================
  {
    id: "m_rfp_refine",
    name: "Refine Points (RfP) Farm Loop",
    category: "Minerais & Elementos",
    req: "Aba de Minerais Desbloqueada",
    description: "Automatiza a sequência de Polish e Refine Prestige para maximizar o ganho de Pontos de Refino por minuto.",
    code: `WaitForSeconds(1.0)
PolishPrestige()
WaitForSeconds(1.0)
PolishPrestige()
WaitForSeconds(6.0)
RefinePrestige()
Restart()`
  },
  {
    id: "m_elements_cycling",
    name: "Ciclo de Elementos & Presets de Planetas",
    category: "Minerais & Elementos",
    req: "Elementos Desbloqueados",
    description: "Alterna automaticamente entre Água, Fogo, Terra e Vento equipando as composições planetárias ideais.",
    code: `LoadPlanets(4)
GenerateElement(Water)
WaitForSeconds(10.0)
LoadPlanets(1)
GenerateElement(Fire)
WaitForSeconds(10.0)
LoadPlanets(2)
GenerateElement(Earth)
WaitForSeconds(10.0)
LoadPlanets(3)
GenerateElement(Wind)
WaitForSeconds(10.0)
LoadPlanets(4)
GenerateElement(Water)`
  },

  // ==========================================
  // 4. SINGULARIDADE
  // ==========================================
  {
    id: "m_plague_stage",
    name: "Pre-Singularity (Plague Stage Cycle)",
    category: "Singularidade",
    req: "Estágio da Peste (Plague)",
    description: "Cicla elementos, conjura arcanos #17/#20 e realiza a limpeza de Minerais Especiais (FlushSM).",
    code: `GenerateElement(Water)
GenerateElement(Water)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
GenerateElement(Fire)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
GenerateElement(Earth)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
GenerateElement(Wind)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)`
  },
  {
    id: "m_early_singularities",
    name: "Early Singularities Push (S1 - S2)",
    category: "Singularidade",
    req: "Singularidades 1 e 2",
    description: "Executa todo o ciclo de avanço de estágio na Peste, exclusão e flush de minerais especiais.",
    code: `GenerateElement(Water)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    DeleteSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 20, 20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
    EnterPlagueStage(0, 0, False)
GenerateElement(Fire)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    DeleteSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 20, 20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
    EnterPlagueStage(0, 0, False)
GenerateElement(Earth)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    DeleteSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 20, 20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
    EnterPlagueStage(0, 0, False)
GenerateElement(Wind)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    DeleteSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 20, 20)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
    EnterPlagueStage(0, 0, False)`
  },
  {
    id: "m_sing_tree_farm",
    name: "Singularity Tree Node Auto-Buy",
    category: "Singularidade",
    req: "Árvore de Singularidade Desbloqueada",
    description: "Compra nós da árvore de singularidade enquanto mantém o ciclo dos 4 elementos e arcanos ativos.",
    code: `GenerateElement(Water)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    BuySingTreeNode(5, True, False)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
GenerateElement(Fire)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    BuySingTreeNode(5, True, False)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
GenerateElement(Earth)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    BuySingTreeNode(5, True, False)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)
GenerateElement(Wind)
Repeat (60, False)
    UseArcan(17)
    UseArcan(20)
    BuySingTreeNode(5, True, False)
    FlushSM([Red,Blue,Green,Pink,Yellow,Orange,Darkpurple,Lightblue,White,Black], 3)`
  }
];