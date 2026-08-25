# 🌌 Revolution Idle: Guia Interativo & Ferramenta Companion (PT-BR)

Uma aplicação web interativa, modular e completa construída em **React** e **Tailwind CSS**, projetada para auxiliar jogadores do jogo incremental **Revolution Idle** em todas as camadas de progressão: **Revolução**, **Infinito**, **Eternidade** e automações via **Macros**.

---

## 🚀 Funcionalidades Principais

### 🌀 Camada 1: Revolução (Pré-Infinito)
* **Guia para Iniciantes:** Passo a passo detalhado para alcançar o 1º Infinito (~12h de gameplay).
* **Tabela dos 10 Círculos:** Métricas de custo inicial, multiplicadores e voltas por segundo (Vermelho ao Branco).
* **Calculador de Prestígio & Promoções:** Simulação em tempo real com entrada manual e suporte a notação científica (ex: `1e10`, `1e42`).
* **Calendário Diário:** Projeção de recompensas e multiplicador de sequência (*Streak*) de Almas.
* **Simulador de Leaderboard:** Estimativa de pontuação global baseada em estatísticas do jogo.

### ∞ Camada 2: Infinito
* **Rota da Árvore de Upgrades (1 a 41):** Ordem sequencial ideal de compra.
* **Geradores & GP:** Fórmulas de produção em cadeia ($G1 \rightarrow G5$).
* **Setup de Automações & Conquista #029:** Guia milimétrico passo a passo para a conquista "Ao Contrário".
* **Desafios do Infinito (IC1 a IC9):** Roteiro recomendado e checklist interativo.
* **Simulador de Poeira Estelar (SD):** Sliders dinâmicos e campos manuais sem limite para cálculo de SD e multiplicador de geradores.

### ⧖ Camada 3: Eternidade
* **Marcos da Eternidade:** Tabela dos 11 marcos por quantidade de Eternidades ($\Sigma$) e os 6 bônus escaláveis.
* **Zoológico & Rota 9x9:** Caminho ótimo de compra de 81 animais (do Gato ao Pégaso) e mecânica de Desaceleração (*Slowdown*).
* **Laboratório (LP & RP):** Simulador de produção de LP/s $\left((\text{Base} \times \text{Mult})^{\text{Poder}}\right)$ e priorização de Upgrades de Pesquisa ($1:2$ / $1:3$).
* **Matriz dos 50 Desafios da Eternidade (EC1 a EC10):** Checklist com as 5 dificuldades de cada desafio, penalidades e metas.
* **Árvore de Dilatação (DT / DTP):** Alocador interativo de 13 nós com presets prontos (DP Farm, Supernovas, Eternidades, AP Farm) e roteiro sequencial de DTP 1 a 40+.

### ⚙️ Construtor de Macros
* **Scripts Prontos:** Macros para redução de tempo dos Desafios do Infinito (semi-manual e 100% automático com 1 clique para copiar).
* **Documentação de Sintaxe:** Guia de comandos oficiais (`EnterIC`, `WaitUntil`, `WaitForSeconds`, `BreakInfinity`).
* **Editor de Rascunho:** Bloco de notas integrado para testar scripts antes de usá-los no jogo.

---

## 🛠️ Tecnologias Utilizadas

* **[React](https://react.dev/):** Biblioteca base para a interface de usuário reativa e componentizada.
* **[Vite](https://vitejs.dev/):** Build tool ultrarrápida para desenvolvimento front-end.
* **[Tailwind CSS](https://tailwindcss.com/):** Estilização utilitária com tema escuro personalizado (*Dark Idle Game Aesthetic*).
* **[Lucide React](https://lucide.dev/):** Pacote de ícones modernos e consistentes.

---

## 📦 Como Instalar e Rodar Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 18.x ou superior)
* Gerenciador de pacotes `npm`, `yarn` ou `pnpm`

📜 Licença e Créditos
Este é um projeto feito por fãs para a comunidade de Revolution Idle.

Fórmulas e estratégias baseadas nas documentações e roteiros da comunidade oficial no Discord e Wiki oficial.
