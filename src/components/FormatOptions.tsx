"use client";

import type { FormatOptions, IdentifierType, OutputWrapper } from "@/types";
import { OUTPUT_WRAPPER_LABELS } from "@/types";

interface FormatOptionsProps {
  identifierType: IdentifierType;
  outputWrapper: OutputWrapper;
  formatOptions: FormatOptions;
  onWrapperChange: (wrapper: OutputWrapper) => void;
  onFormatChange: (options: FormatOptions) => void;
}

const WRAPPERS: OutputWrapper[] = [
  "plain",
  "json",
  "csv",
  "sql-in",
  "sql-values",
];

export default function FormatOptionsPanel({
  identifierType,
  outputWrapper,
  formatOptions,
  onWrapperChange,
  onFormatChange,
}: FormatOptionsProps) {
  const isUUID = identifierType !== "ulid";

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
        Output Formatting
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="output-wrapper"
            className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-400"
          >
            Output Wrapper
          </label>
          <select
            id="output-wrapper"
            value={outputWrapper}
            onChange={(e) => onWrapperChange(e.target.value as OutputWrapper)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            {WRAPPERS.map((w) => (
              <option key={w} value={w}>
                {OUTPUT_WRAPPER_LABELS[w]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col justify-end gap-3">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={formatOptions.uppercase}
              onChange={(e) =>
                onFormatChange({ ...formatOptions, uppercase: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Uppercase Characters
            </span>
          </label>

          <label
            className={`flex items-center gap-2 ${
              isUUID ? "cursor-pointer" : "cursor-not-allowed opacity-50"
            }`}
          >
            <input
              type="checkbox"
              checked={formatOptions.hyphens}
              disabled={!isUUID}
              onChange={(e) =>
                onFormatChange({ ...formatOptions, hyphens: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 disabled:opacity-50"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Hyphen Separators
              {!isUUID && (
                <span className="ml-1 text-xs text-gray-400">(UUID only)</span>
              )}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
