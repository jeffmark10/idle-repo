import React, { useState } from "react";
import { 
  Code, Copy, CheckCheck, Terminal, 
  Play, BookOpen, AlertCircle, Sparkles 
} from "lucide-react";

const MACRO_TEMPLATES = [
  {
    id: "ic-semi",
    name: "Desafios Infinitos (Semi-Manual)",
    req: "4 Eternidades (ET)",
    purpose: "Redução do tempo somado dos Desafios do Infinito (IC1-9)",
    code: `EnterIC(1, true)
EnterIC(2, true)
EnterIC(3, true)
EnterIC(4, true)
EnterIC(5, true)
EnterIC(6, true)
EnterIC(7, true)
EnterIC(8, true)
EnterIC(9, true)`
  },
  {
    id: "ic-auto",
    name: "Desafios Infinitos (100% Automático)",
    req: "14 Eternidades (ET)",
    purpose: "Execução contínua em loop para runs de farm de Eternidade (desative após 3 ECs)",
    code: `WaitUntil (IP >= 1000)
Repeat (9, false)
    EnterIC(0, true)
WaitForSeconds(1.0)
EnterIC(1, true)
EnterIC(2, true)
EnterIC(3, true)
EnterIC(4, true)
EnterIC(5, true)
EnterIC(6, true)
EnterIC(7, true)
EnterIC(8, true)
EnterIC(9, true)
BreakInfinity(true)
WaitUntil (IP == 0.00)`
  },
  {
    id: "slowdown-push",
    name: "Alternador de Desaceleração (Slowdown)",
    req: "10 Animais / 5 ECs",
    purpose: "Alterna marchas de Slowdown para impulsionar o ganho de IP em runs longas",
    code: `WaitUntil (Score >= 1e10000)
SetSlowdown(10)
WaitForSeconds(5.0)
ResetSlowdown()`
  }
];

export default function MacrosTab() {
  const [copiedId, setCopiedId] = useState("");
  const [customMacro, setCustomMacro] = useState("");

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Hero / Introdução */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-zinc-900/70 to-zinc-950 border-2 border-emerald-500/30 shadow-2xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-3">
          <div>
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
              Construtor de Macros • Desbloqueio: 1ª Eternidade
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              Modelos de Automação e Macros Prontos
            </h1>
          </div>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 w-fit">
            Área de colagem: Canto inferior direito do jogo
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          A função de <strong>Macros</strong> permite programar sequências de comandos para otimizar runs de desafios, trocas de marcha de desaceleração e loops contínuos de IP. Copie os modelos abaixo ou monte seu script customizado.
        </p>
      </div>

      {/* Grid de Modelos Prontos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-400" /> Scripts Prontos para Copiar e Colar
          </h2>

          <div className="space-y-3">
            {MACRO_TEMPLATES.map((m) => {
              const isCopied = copiedId === m.id;
              return (
                <div key={m.id} className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <strong className="text-sm text-zinc-200 block">{m.name}</strong>
                      <span className="text-[11px] font-mono text-emerald-400">Requisito: {m.req}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(m.code, m.id)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-emerald-950/60 border border-zinc-700 hover:border-emerald-500/40 text-zinc-200 font-mono text-xs flex items-center gap-1.5 transition-colors"
                    >
                      {isCopied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {isCopied ? "Copiado!" : "Copiar Macro"}
                    </button>
                  </div>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">{m.purpose}</p>

                  <pre className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-emerald-300 overflow-x-auto">
                    {m.code}
                  </pre>
                </div>
              );
            })}
          </div>
        </div>

        {/* Editor de Teste / Referência Rápida */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" /> Sintaxe Oficial e Comandos
          </h2>

          <div className="space-y-2.5 font-mono text-xs text-zinc-300">
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-0.5">
              <span className="text-cyan-400 font-bold block">EnterIC(número, boolean)</span>
              <p className="text-[11px] text-zinc-400 font-sans">Entra no Desafio do Infinito especificado (1 a 9). 0 sai do desafio.</p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-0.5">
              <span className="text-cyan-400 font-bold block">WaitUntil (condição)</span>
              <p className="text-[11px] text-zinc-400 font-sans">Pausa o script até que uma variável seja atingida (ex: <code>IP &gt;= 1000</code>).</p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-0.5">
              <span className="text-cyan-400 font-bold block">WaitForSeconds(segundos)</span>
              <p className="text-[11px] text-zinc-400 font-sans">Aguarda o tempo determinado em segundos antes do próximo comando.</p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-0.5">
              <span className="text-cyan-400 font-bold block">BreakInfinity(boolean)</span>
              <p className="text-[11px] text-zinc-400 font-sans">Quebra ou restaura o limite do Infinito automaticamente.</p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="customMacroArea" className="text-xs font-mono text-zinc-400 block font-bold">
              Bloco de Notas de Macro Pessoal:
            </label>
            <textarea
              id="customMacroArea"
              rows={5}
              value={customMacro}
              onChange={(e) => setCustomMacro(e.target.value)}
              placeholder="// Digite ou teste comandos aqui antes de colar no jogo..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}