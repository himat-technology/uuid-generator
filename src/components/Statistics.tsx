import type { GenerationStats } from "@/types";
import {
  formatBytes,
  formatGenerationTime,
  getIdentifierTypeLabel,
} from "@/lib/utils";
import { BarChart3 } from "lucide-react";

interface StatisticsProps {
  stats: GenerationStats | null;
}

export default function Statistics({ stats }: StatisticsProps) {
  if (!stats) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-3 flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-brand-600 dark:text-brand-400" />
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Statistics
        </h3>
      </div>
      <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Generated</dt>
          <dd className="font-medium text-gray-900 dark:text-white">
            {stats.count} identifiers
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Type</dt>
          <dd className="font-medium text-gray-900 dark:text-white">
            {getIdentifierTypeLabel(stats.type)}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Total Characters</dt>
          <dd className="font-medium text-gray-900 dark:text-white">
            {stats.totalCharacters.toLocaleString()}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Output Size</dt>
          <dd className="font-medium text-gray-900 dark:text-white">
            {formatBytes(stats.outputSizeBytes)}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Generation Time</dt>
          <dd className="font-medium text-gray-900 dark:text-white">
            {stats.count} {getIdentifierTypeLabel(stats.type)} generated in{" "}
            {formatGenerationTime(stats.generationTimeMs)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
