import type { GenerationStats, IdentifierType } from "@/types";
import { IDENTIFIER_TYPE_LABELS } from "@/types";

export function clampQuantity(value: number): number {
  if (isNaN(value) || value < 1) return 1;
  if (value > 1000) return 1000;
  return Math.floor(value);
}

export function parseQuantityInput(value: string): number {
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return 1;
  return clampQuantity(parsed);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatGenerationTime(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(0)} µs`;
  if (ms < 1000) return `${ms.toFixed(1)} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}

export function formatStatsLine(stats: GenerationStats): string {
  const typeLabel = IDENTIFIER_TYPE_LABELS[stats.type];
  return `${stats.count} ${typeLabel} generated in ${formatGenerationTime(stats.generationTimeMs)}`;
}

export function formatTimestamp(ms: number): {
  unix: string;
  iso: string;
  local: string;
} {
  const date = new Date(ms);
  return {
    unix: ms.toString(),
    iso: date.toISOString(),
    local: date.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),
  };
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getIdentifierTypeLabel(type: IdentifierType): string {
  return IDENTIFIER_TYPE_LABELS[type];
}
