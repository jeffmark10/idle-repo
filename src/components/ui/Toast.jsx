import React from "react";
import { Check } from "lucide-react";

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 p-3.5 rounded-xl bg-purple-600 text-white font-semibold text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
      <Check className="w-4 h-4" />
      <span>{message}</span>
    </div>
  );
}