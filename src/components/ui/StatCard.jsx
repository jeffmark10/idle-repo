import React from "react";

export default function StatCard({ label, value, highlight = false, color = "text-zinc-200" }) {
  return (
    <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between font-mono text-xs">
      <span className="text-zinc-400">{label}:</span>
      <strong className={`text-sm ${highlight ? "text-emerald-400 font-bold" : color}`}>{value}</strong>
    </div>
  );
}