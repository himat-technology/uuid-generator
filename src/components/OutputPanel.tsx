"use client";

import { useState } from "react";
import { Copy, Download, FileJson, Check } from "lucide-react";
import { useClipboard } from "@/hooks/useClipboard";
import { downloadText, downloadJSON } from "@/lib/download";
import { IDENTIFIER_TYPE_LABELS } from "@/types";
import type { GenerationResult } from "@/types";
import IdentifierList from "./IdentifierList";

interface OutputPanelProps {
  result: GenerationResult | null;
  formattedOutput: string;
  onInspect: (id: string) => void;
  onRegenerate: (index: number) => void;
}

export default function OutputPanel({
  result,
  formattedOutput,
  onInspect,
  onRegenerate,
}: OutputPanelProps) {
  const { copied, copy } = useClipboard();
  const [showList, setShowList] = useState(false);

  if (!result) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900/50">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Click &ldquo;Generate New Batch&rdquo; to create identifiers.
        </p>
      </div>
    );
  }

  const typeLabel = IDENTIFIER_TYPE_LABELS[result.type];

  const handleCopy = () => copy(formattedOutput);
  const handleDownloadTxt = () => downloadText(formattedOutput, "uuid-output.txt");
  const handleDownloadJson = () => {
    const jsonContent = JSON.stringify(
      result.identifiers.map((id) => id),
      null,
      2
    );
    downloadJSON(jsonContent, "uuid-output.json");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Generated {result.count} items ({typeLabel})
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Copy output to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleDownloadTxt}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <Download className="h-4 w-4" />
            Download TXT
          </button>
          <button
            type="button"
            onClick={handleDownloadJson}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <FileJson className="h-4 w-4" />
            Download JSON
          </button>
        </div>
      </div>

      <div className="relative">
        <pre
          className="max-h-64 overflow-auto rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-xs leading-relaxed text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          aria-label="Generated identifiers output"
        >
          {formattedOutput}
        </pre>
      </div>

      {result.count <= 100 && (
        <button
          type="button"
          onClick={() => setShowList(!showList)}
          className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
        >
          {showList ? "Hide" : "Show"} individual identifiers ({result.count})
        </button>
      )}

      {showList && result.count <= 100 && (
        <IdentifierList
          identifiers={result.identifiers}
          type={result.type}
          onInspect={onInspect}
          onRegenerate={onRegenerate}
        />
      )}
    </div>
  );
}
