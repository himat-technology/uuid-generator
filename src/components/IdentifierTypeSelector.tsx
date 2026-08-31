"use client";

import { cn } from "@/lib/utils";
import type { IdentifierType } from "@/types";
import { Clock, Hash, Shuffle } from "lucide-react";

interface IdentifierTypeSelectorProps {
  value: IdentifierType;
  onChange: (type: IdentifierType) => void;
}

const types: {
  id: IdentifierType;
  label: string;
  description: string;
  icon: typeof Shuffle;
}[] = [
  {
    id: "uuid-v4",
    label: "UUID v4 — Random",
    description: "Generate cryptographically random UUID version 4 identifiers.",
    icon: Shuffle,
  },
  {
    id: "uuid-v7",
    label: "UUID v7 — Time-Sortable",
    description: "RFC 9562 time-sortable UUID with embedded Unix timestamp.",
    icon: Clock,
  },
  {
    id: "ulid",
    label: "ULID — Base32 Time-Sortable",
    description: "Lexicographically sortable 128-bit Base32 identifier.",
    icon: Hash,
  },
];

export default function IdentifierTypeSelector({
  value,
  onChange,
}: IdentifierTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
        Identifier Type
      </h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {types.map(({ id, label, description, icon: Icon }) => {
          const isSelected = value === id;
          return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "rounded-xl border p-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-brand-500",
              isSelected
                ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500 dark:border-brand-500 dark:bg-gray-800 dark:ring-brand-400"
                : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
            )}
            aria-pressed={isSelected}
          >
            <div className="flex items-center gap-2">
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isSelected
                    ? "text-brand-600 dark:text-brand-400"
                    : "text-gray-400 dark:text-gray-500"
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "text-sm font-semibold",
                  isSelected
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-900 dark:text-gray-100"
                )}
              >
                {label}
              </span>
            </div>
            <p
              className={cn(
                "mt-2 text-xs leading-relaxed",
                isSelected
                  ? "text-gray-600 dark:text-gray-300"
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              {description}
            </p>
          </button>
        );
        })}
      </div>
    </div>
  );
}
