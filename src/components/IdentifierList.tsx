"use client";

import { Copy, RefreshCw, Search, Check } from "lucide-react";
import { useClipboard } from "@/hooks/useClipboard";
import type { IdentifierType } from "@/types";

interface IdentifierListProps {
  identifiers: string[];
  type: IdentifierType;
  onInspect: (id: string) => void;
  onRegenerate: (index: number) => void;
}

export default function IdentifierList({
  identifiers,
  type,
  onInspect,
  onRegenerate,
}: IdentifierListProps) {
  const { copiedId, copy } = useClipboard();

  return (
    <div className="max-h-80 overflow-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {identifiers.map((id, index) => (
          <li
            key={`${id}-${index}`}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            <span className="w-8 shrink-0 text-xs text-gray-400">
              {index + 1}
            </span>
            <code className="min-w-0 flex-1 truncate font-mono text-xs text-gray-800 dark:text-gray-200">
              {id}
            </code>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                onClick={() => copy(id, id)}
                className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                aria-label={`Copy identifier ${index + 1}`}
              >
                {copiedId === id ? (
                  <Check className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => onInspect(id)}
                className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                aria-label={`Inspect identifier ${index + 1}`}
              >
                <Search className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onRegenerate(index)}
                className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                aria-label={`Regenerate identifier ${index + 1}`}
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
