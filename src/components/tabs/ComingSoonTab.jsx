import React from "react";
import { Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";

export default function ComingSoonTab() {
  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 via-zinc-900/80 to-zinc-950 border-2 border-amber-500/30 shadow-2xl space-y-4">
        <div className="flex items-center gap-3 border-b border-amber-500/20 pb-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-300 font-black text-lg">
            ☯
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
              Camada 5 de Prestígio • Desbloqueio em 1.08e2466 EP
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              Preparação para a Unidade (Unity)
            </h1>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
          Atingir <strong>1.08e2466 EP</strong> libera a Unidade. Ela reinicia o progresso de quase todas as camadas anteriores (incluindo Dilatação, Eternidade e Animais/AP), concedendo em troca bônus permanentes do Zodíaco.
        </p>

        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 font-mono text-xs text-amber-200 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span><strong>Regra de Ouro:</strong> Na sua primeira Unidade, escolha obrigatoriamente <strong>ÁRIES</strong>. Todos os outros signos tornam o recomeço muito mais difícil.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
        <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
          <strong className="text-emerald-400 font-mono text-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> O que PERSISTE através da Unidade
          </strong>
          <ul className="text-zinc-300 space-y-1 text-[11px] leading-relaxed">
            <li>• <strong>Conquistas:</strong> Todos os bônus e recompensas continuam ativos.</li>
            <li>• <strong>Compras da Soul Shop:</strong> Permanente.</li>
            <li>• <strong>Estatísticas e Recordes:</strong> Histórico de tempos mantido.</li>
          </ul>
        </div>

        <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
          <strong className="text-red-400 font-mono text-xs flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> O que é RESETADO
          </strong>
          <ul className="text-zinc-400 space-y-1 text-[11px] leading-relaxed">
            <li>• <strong>Pontos de Animal (AP):</strong> Resetados integralmente.</li>
            <li>• <strong>Dilatação:</strong> DP, Pontuação Máxima, Melhorias DU e Pontos DTP.</li>
            <li>• <strong>Eternidade:</strong> EP, Contagem Σ, Laboratório, Animais comprados e Supernovas.</li>
            <li>• <strong>Infinito e Revolução:</strong> IP, Geradores, Estrelas, Score e Círculos.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}