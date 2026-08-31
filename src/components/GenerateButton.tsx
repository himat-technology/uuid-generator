"use client";

import { Sparkles } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  isGenerating?: boolean;
}

export default function GenerateButton({
  onClick,
  isGenerating = false,
}: GenerateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isGenerating}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-60 dark:focus:ring-offset-gray-950"
    >
      <Sparkles className="h-5 w-5" aria-hidden="true" />
      {isGenerating ? "Generating..." : "Generate New Batch"}
    </button>
  );
}
