export const CIRCLES_DATA = [
  { name: "Vermelho", initialCost: 4, costMult: 1.20, baseSpeed: 0.200, color: "text-red-400" },
  { name: "Laranja", initialCost: 100, costMult: 1.24, baseSpeed: 0.100, color: "text-orange-400" },
  { name: "Amarelo", initialCost: 1000, costMult: 1.28, baseSpeed: 0.067, color: "text-yellow-400" },
  { name: "Verde", initialCost: 10000, costMult: 1.32, baseSpeed: 0.050, color: "text-emerald-400" },
  { name: "Turquesa", initialCost: 1e6, costMult: 1.36, baseSpeed: 0.040, color: "text-teal-400" },
  { name: "Ciano", initialCost: 1e9, costMult: 1.40, baseSpeed: 0.033, color: "text-cyan-400" },
  { name: "Azul", initialCost: 1e12, costMult: 1.44, baseSpeed: 0.029, color: "text-blue-400" },
  { name: "Roxo", initialCost: 1e15, costMult: 1.48, baseSpeed: 0.025, color: "text-purple-400" },
  { name: "Rosa", initialCost: 1e18, costMult: 1.52, baseSpeed: 0.022, color: "text-pink-400" },
  { name: "Branco", initialCost: 1e27, costMult: 1.56, baseSpeed: 0.020, color: "text-zinc-100" }
];

export const INFINITY_CHALLENGES = [
  { id: "ic1", name: "IC1: Velocidade Ionizada", penalty: "Promoções 2 e 4 desativadas", reward: "Promoções 2 e 4 mais fortes" },
  { id: "ic2", name: "IC2: Descida", penalty: "Poder de Ascensão dividido por 4", reward: "Poder de Ascensão x1.2" },
  { id: "ic3", name: "IC3: A Primeira Raiz", penalty: "Expoente comum reduzido em 0.4", reward: "Expoente comum +0.03" },
  { id: "ic4", name: "IC4: Subidas Íngremes", penalty: "Ganhos de Prestígio/Promoção ^0.4", reward: "+1 nível para todas promoções após Infinito" },
  { id: "ic5", name: "IC5: Demitido do Trabalho", penalty: "Promoções extremamente fracas", reward: "Promoções mais fortes" },
  { id: "ic6", name: "IC6: O Ralo", penalty: "Multiplicadores diminuem com o tempo", reward: "Geradores 2x mais potentes" },
  { id: "ic7", name: "IC7: Divisão Quadrática", penalty: "Mults divididos por tempo²", reward: "Mults multiplicados por tempo^0.2" },
  { id: "ic8", name: "IC8: Noscensões", penalty: "Ascensões completamente desativadas", reward: "Poder de Ascensão base +2" },
  { id: "ic9", name: "IC9: Isolacionismo", penalty: "Apenas 4 cores disponíveis", reward: "Ganho Duplo de Infinitos + Quebra" }
];

export const EC_LIST = [
  { id: "ec1", name: "EC1: Velocidade", penalty: "x1/20 a x1/1e236", reward: "Velocidade x2 a x500" },
  { id: "ec2", name: "EC2: Exp. Comum", penalty: "x0.5 a x0.001", reward: "Exp. Comum +0.03 a +0.30" },
  { id: "ec3", name: "EC3: Estrelas", penalty: "Desativadas (x0)", reward: "Base Estelar +1 a +50" },
  { id: "ec4", name: "EC4: Geradores", penalty: "Expoente /10 a /1e10", reward: "Expoente Gerador x1.03 a x1.25" },
  { id: "ec5", name: "EC5: Ascensão", penalty: "Poder ^0.10 a ^0.001", reward: "Poder de Ascensão x1.5 a x75" },
  { id: "ec6", name: "EC6: Promoções", penalty: "Desativadas (x0)", reward: "Bônus Prestígio x1.05 a x1.40" },
  { id: "ec7", name: "EC7: Laboratório", penalty: "Desativado (x0)", reward: "Níveis RP grátis +5 a +100" },
  { id: "ec8", name: "EC8: Ganho IP", penalty: "Ganho ^0.05 a ^0.001", reward: "Expoente IP ^1.02 a ^1.30" },
  { id: "ec9", name: "EC9: Sem G1-G10", penalty: "Geradores desativados", reward: "Expoente Gerador x1.1 a x1.7" },
  { id: "ec10", name: "EC10: Dilatação", penalty: "Debuffs severos (^3 a e1000)", reward: "Ganho DP x10 a x10.000.000" }
];

export const PLANET_PRESETS = [
  {
    name: "Full Peixes (Qualidade)",
    planets: { Sol: "Peixes", Mercúrio: "Peixes", Vênus: "Peixes", Lua: "Peixes", Marte: "Peixes", Júpiter: "Peixes", Saturno: "Peixes", Urano: "Peixes", Netuno: "Peixes", Plutão: "Peixes", Quíron: "Peixes", "Fortune Pars": "Peixes" }
  },
  {
    name: "Farm de Ouro & Ataque",
    planets: { Sol: "Leão", Mercúrio: "Áries", Vênus: "Áries", Lua: "Áries", Marte: "Áries", Júpiter: "Áries", Saturno: "Leão", Urano: "Áries", Netuno: "Leão", Plutão: "Áries", Quíron: "Áries", "Fortune Pars": "Áries" }
  },
  {
    name: "Fogo: Pós-Etéreos (+1000)",
    planets: { Sol: "Sagitário", Mercúrio: "Áries", Vênus: "Sagitário", Lua: "Leão", Marte: "Áries", Júpiter: "Leão", Saturno: "Leão", Urano: "Áries", Netuno: "Leão", Plutão: "Áries", Quíron: "Áries", "Fortune Pars": "Áries" }
  },
  {
    name: "Vento: 12x Gêmeos",
    planets: { Sol: "Gêmeos", Mercúrio: "Gêmeos", Vênus: "Gêmeos", Lua: "Gêmeos", Marte: "Gêmeos", Júpiter: "Gêmeos", Saturno: "Gêmeos", Urano: "Gêmeos", Netuno: "Gêmeos", Plutão: "Gêmeos", Quíron: "Gêmeos", "Fortune Pars": "Gêmeos" }
  }
];

export const ARCANES_DATA = [
  { id: 0, name: "O Louco", baseCd: 180, effect: "Gera Gema Negra Nv 3+" },
  { id: 1, name: "O Mago", baseCd: 240, effect: "+3600s de produção do elemento ativo" },
  { id: 5, name: "O Hierofante", baseCd: 390, effect: "+1 Nível para todos os minerais comuns" },
  { id: 7, name: "O Carro", baseCd: 720, effect: "-1000 no Fator de Custo de SM" },
  { id: 9, name: "O Eremita", baseCd: 600, effect: "Multiplica outros Arcanos em 1.050x por 3m" },
  { id: 14, name: "A Temperança", baseCd: 120, effect: "Gera 3 Signos cósmicos na Fortuna Pars" },
  { id: 15, name: "O Diabo", baseCd: 60, effect: "66% chance de buff permanente em recursos" },
  { id: 17, name: "A Estrela", baseCd: 120, effect: "Multiplica Sorte pelo total de estrelas" }
];

export const INITIAL_SINGULARITY_NODES = [
  { id: 1, name: "Multiplicador Atômico", baseBonus: 15, desc: "+15% Átomos/seg por nível" },
  { id: 2, name: "Eficiência de Refino", baseBonus: 20, desc: "+20% ganho de RfP base" },
  { id: 3, name: "Potência de Casas", baseBonus: 25, desc: "+25% eficácia nas 12 Casas" },
  { id: 4, name: "Escalonador Cósmico", baseBonus: 10, desc: "-10% custo de nós anteriores" },
  { id: 5, name: "Poder de Singularidade", baseBonus: 50, desc: "+50% Mult por Singularidade" },
  { id: 6, name: "Densidade de Essência", baseBonus: 30, desc: "+30% EV e PV da Praga" }
];

export const MACROS_LIST = [
  {
    title: "Autocast Seguro de Tarô",
    desc: "Aciona os Arcanos em repetição sem risco de ativar a Morte prematuramente.",
    code: `Repetir(0, Verdadeiro)\nUseArcan(0)\nUseArcan(15)\nUseArcan(5)\nUseArcan(7)\nUseArcan(3)\nUseArcan(6)`
  },
  {
    title: "Loop de Unidade Automático (#1)",
    desc: "Automatiza cadeia de resets de Infinito, Eternidade e Dilatação até a conclusão dos ECs.",
    code: `WaitForSeconds(2.0)\nInfinite()\nEternate()\nWaitForSeconds(1.0)\nEternate()\nEnterEC(8, 2, true)\nEnterEC(8, 3, true)\nEnterEC(9, 1, true)\nEnterEC(9, 2, true)\nEnterEC(9, 3, true)\nEnterEC(8, 4, true)\nEnterEC(8, 5, true)\nEnterEC(7, 3, true)\nEnterEC(7, 4, true)\nEnterEC(7, 5, true)\nDilate(true)\nWaitUntil(Score >= 1.00e9)\nDilate(false)\nDilate(true)\nWaitForSeconds(2.0)\nDilate(false)\nEnterEC(9, 4, true)\nEnterEC(9, 5, true)\nEnterEC(10, 1, true)\nEnterEC(10, 2, true)\nEnterEC(10, 3, true)\nEnterEC(10, 4, true)\nEnterEC(10, 5, true)\nGoToMacro(0)`
  }
];

export const DAILY_REWARDS_DATA = [
  { day: 1, reward: "+15:00 Fluxo Temporal (TF)", type: "tf" },
  { day: 2, reward: "+200 Almas", type: "souls" },
  { day: 3, reward: "+15:00 Fluxo Temporal (TF)", type: "tf" },
  { day: 4, reward: "+250 Almas", type: "souls" },
  { day: 5, reward: "+20:00 Fluxo Temporal (TF)", type: "tf" },
  { day: 6, reward: "+250 Almas", type: "souls" },
  { day: 7, reward: "+500 Almas", type: "souls" },
  { day: 8, reward: "+25:00 Fluxo Temporal (TF)", type: "tf" },
  { day: 9, reward: "+250 Almas", type: "souls" },
  { day: 10, reward: "+25:00 Fluxo Temporal (TF)", type: "tf" },
  { day: 11, reward: "+300 Almas", type: "souls" },
  { day: 12, reward: "+30:00 Fluxo Temporal (TF)", type: "tf" },
  { day: 13, reward: "+500 Almas", type: "souls" },
  { day: 14, reward: "+1.000 Almas", type: "souls" }
];