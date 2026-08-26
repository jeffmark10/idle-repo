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

// Biblioteca Expandida de Macros do Jogo (24 Presets)
export const MACROS_DATA = [
  // ==========================================
  // CATEGORIA: FARM (Infinito, IP, EP e Σ)
  // ==========================================
  {
    id: "m_fast_et_60fps",
    name: "Fast Eternity Farm (60 Σ/s - Max Speed)",
    category: "Farm",
    description: "Executa resets no limite de 17ms (60 FPS). Requer Auto Eternity configurado para 1 EP e 0s.",
    code: "buy_all:0;prestige:0;eternity:0.017"
  },
  {
    id: "m_fast_et_stable",
    name: "Eternity Farm Seguro (Para Mobile / Menos Lag)",
    category: "Farm",
    description: "Taxa estável de 30 Σ/s (~33ms) para aparelhos móveis sem perdas de frame.",
    code: "buy_all:0.033;prestige:0;eternity:0.033"
  },
  {
    id: "m_ip_speed_farm",
    name: "IP Quick Burst Farm (0.5s - 1s)",
    category: "Farm",
    description: "Acumula IP com ciclos atômicos de compra e reset de Infinito para subir a Coluna 11-16 rapidamente.",
    code: "buy_all:0.05;ascend_all:0.1;promote_1:0.1;promote_2:0.1;infinity:0.5"
  },
  {
    id: "m_ep_grind_fast",
    name: "EP Fast Cycle Grind (3s a 5s)",
    category: "Farm",
    description: "Farm de Pontos de Eternidade (EP) em corridas ultra-curtas para comprar melhorias de LP no Laboratório.",
    code: "buy_all:0.1;promote_all:0.2;prestige:0.5;eternity:3.0"
  },
  {
    id: "m_stardust_farm",
    name: "Stardust / Poeira Estelar Booster",
    category: "Farm",
    description: "Ciclo com pausas para permitir que os multiplicadores de Estrelas atinjam pico de produção de SD.",
    code: "buy_all:0.2;ascend_all:0.4;promote_all:0.8;prestige:1.5;infinity:0"
  },

  // ==========================================
  // CATEGORIA: PUSH (Score, Supernovas e Long Runs)
  // ==========================================
  {
    id: "m_sn_score_push",
    name: "Supernova Score Push (Long Run)",
    category: "Push",
    description: "Maximiza Score com pausas calculadas para crescimento exponencial de GP. Use com Auto Eternity desligado.",
    code: "buy_all:0.2;ascend_all:0.5;promote_all:1.0;prestige:2.0"
  },
  {
    id: "m_ip_ep_standard_push",
    name: "Standard IP/EP Balanced Push",
    category: "Push",
    description: "Ciclo balanceado de 1 a 3 minutos para quebrar novos tetos de IP e EP.",
    code: "buy_all:0.1;promote_all:0.5;prestige:1.0;infinity:0"
  },
  {
    id: "m_score_build_1_4",
    name: "Push com Ratio de Lab 1:4 (Gen Power : Common)",
    category: "Push",
    description: "Configurado para corridas de 10 a 30 minutos em busca de novos marcos de Supernovas.",
    code: "buy_all:0.25;promote_1:0.5;promote_2:0.5;promote_3:0.5;promote_4:1.0;prestige:3.0"
  },
  {
    id: "m_pre_eternity_push",
    name: "Rumo ao 1º Eternate (Push 1.79e308 IP)",
    category: "Push",
    description: "Alavanca compras de cores lentas e geradores altos para alcançar o limite de quebra de Eternidade.",
    code: "buy_all:0.1;ascend_all:0.3;promote_all:0.6;prestige:1.2"
  },

  // ==========================================
  // CATEGORIA: DESAFIOS (IC1-9 e EC1-10)
  // ==========================================
  {
    id: "m_ic_speedrun",
    name: "Limpeza Rápida de ICs (IC1 a IC9)",
    category: "Desafios",
    description: "Executa compras atômicas sem esperas para vencer os Desafios do Infinito em menos de 10 segundos.",
    code: "buy_all:0.05;ascend_all:0.1;promote_1:0.2;promote_2:0.2;prestige:0.5"
  },
  {
    id: "m_ec1_speed",
    name: "EC1: Devagar como um Caracol",
    category: "Desafios",
    description: "Foca em subidas rápidas de promoção para compensar a forte penalidade de velocidade de voltas.",
    code: "buy_all:0.1;promote_2:0.2;promote_1:0.4;promote_3:0.6;prestige:1.0"
  },
  {
    id: "m_ec2_common_exp",
    name: "EC2: Expoente Comum Fraco",
    category: "Desafios",
    description: "Otimiza ganho multiplicativo para sobrepujar a penalidade exponencial.",
    code: "buy_all:0.1;promote_1:0.2;promote_4:0.5;prestige:0.8"
  },
  {
    id: "m_ec3_no_stars",
    name: "EC3: Sem Estrelas (Puro Gerador)",
    category: "Desafios",
    description: "Prioriza promoções #1 e #2 e prestígios curtos para acelerar os geradores sem auxílio de poeira estelar.",
    code: "buy_all:0.05;ascend_all:0.15;promote_all:0.3;prestige:0.6"
  },
  {
    id: "m_ec6_no_prestige_promote",
    name: "EC6: Sem Prestígio e Sem Promoção",
    category: "Desafios",
    description: "Compre apenas círculos e ascensões contínuas sem tentar acionar comandos bloqueados.",
    code: "buy_all:0.02;ascend_all:0.05"
  },
  {
    id: "m_ec9_ec10_common_only",
    name: "EC9 & EC10: 100% Common Exponent Focus",
    category: "Desafios",
    description: "Adaptação para desafios onde os geradores estão desligados ou sob penalidade tripla de Dilatação.",
    code: "buy_all:0.15;promote_all:0.3;ascend_all:0.4;prestige:1.0"
  },

  // ==========================================
  // CATEGORIA: DILATAÇÃO & UNITY
  // ==========================================
  {
    id: "m_dilation_first_runs",
    name: "Primeiras Corridas de Dilatação (10 min DP)",
    category: "Dilatação",
    description: "Entrada em Dilatação com pausas para atingir ~1e30 Score e ativar a renda inicial de DP/s.",
    code: "buy_all:0.2;ascend_all:0.4;promote_2:0.8;promote_1:1.0;prestige:2.0"
  },
  {
    id: "m_dilation_dp_farm",
    name: "Dilation Points Maximizer (DU1 & DU2 Focus)",
    category: "Dilatação",
    description: "Mantém a produção de Max Score estável dentro da Dilatação para farm de DP/s.",
    code: "buy_all:0.1;ascend_all:0.2;promote_2:0.5;promote_1:1.0"
  },
  {
    id: "m_dilation_ap_run",
    name: "Long AP Farming Run (DTP 14 a 40+)",
    category: "Dilatação",
    description: "Desliga resets automáticos para corridas de horas focadas em acumular milhões de AP para o Zodíaco.",
    code: "buy_all:0.5;ascend_all:1.0;promote_all:2.0;prestige:5.0"
  },
  {
    id: "m_dtp16_wall_breaker",
    name: "DTP 16 Wall Breaker",
    category: "Dilatação",
    description: "Sincronia de compras de cores e promoções focadas no eixo central da árvore de dilatação.",
    code: "buy_all:0.1;promote_1:0.3;promote_2:0.3;promote_3:0.3;promote_4:0.6;prestige:1.5"
  },
  {
    id: "m_unity_final_push",
    name: "Unity Final Push (1.08e2466 EP)",
    category: "Dilatação",
    description: "Macro para o empurrão final de EP com Árvore de Dilatação DTP 40+ configurada.",
    code: "buy_all:0.2;ascend_all:0.5;promote_all:1.0;prestige:2.5"
  },

  // ==========================================
  // CATEGORIA: CONQUISTAS ESPECIAIS
  // ==========================================
  {
    id: "m_ach_29",
    name: "Conquista #029: Backwards (Ao Contrário)",
    category: "Desafios",
    description: "Configura os níveis fixos de compra para fazer Branco > Rosa > Roxo > Azul > etc.",
    code: "buy_red:5;buy_orange:12;buy_yellow:19;buy_green:41;buy_turquoise:52;buy_cyan:63;buy_blue:74;buy_purple:85;buy_pink:100;buy_white:max"
  },
  {
    id: "m_ach_no_ascension",
    name: "Conquista de Velocidade Sem Ascensão",
    category: "Desafios",
    description: "Compre apenas níveis sem apertar o botão A para desbloquear conquistas de restrição de ascensão.",
    code: "buy_all:0.05;promote_all:0.2;prestige:0.5"
  },
  {
    id: "m_ach_promo_balance",
    name: "Conquista de Equilíbrio das Promoções",
    category: "Desafios",
    description: "Sobe exatamente 1 nível por vez em cada uma das 4 promoções de forma estritamente rotativa.",
    code: "promote_1:0.1;promote_2:0.1;promote_3:0.1;promote_4:0.1;buy_all:0.2"
  },
  {
    id: "m_idle_sleep_farm",
    name: "Overnight Idle Farm (Farm Noturno Seguro)",
    category: "Farm",
    description: "Ciclo com prestígios espaçados para deixar rodando à noite sem sobrecarregar a CPU.",
    code: "buy_all:0.5;ascend_all:1.0;promote_all:2.0;prestige:5.0;infinity:0"
  }
];