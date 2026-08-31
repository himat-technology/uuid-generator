"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { inspectIdentifier } from "@/lib/inspector";
import type { InspectionResult } from "@/types";
import TimestampCard from "./TimestampCard";

interface InspectorProps {
  initialValue?: string;
}

export default function Inspector({ initialValue = "" }: InspectorProps) {
  const [input, setInput] = useState(initialValue);
  const [result, setResult] = useState<InspectionResult | null>(null);

  useEffect(() => {
    if (initialValue) {
      setInput(initialValue);
      setResult(inspectIdentifier(initialValue));
    }
  }, [initialValue]);

  const handleInspect = () => {
    setResult(inspectIdentifier(input));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleInspect();
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="inspector-input"
          className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
        >
          Paste a UUID or ULID
        </label>
        <div className="flex gap-2">
          <input
            id="inspector-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. 018f3a2e-7b4c-7000-8000-123456789abc or 01ARZ3NDEKTSV4RRFFQ69G5FAV"
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 font-mono text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            aria-describedby="inspector-hint"
          />
          <button
            type="button"
            onClick={handleInspect}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <Search className="h-4 w-4" />
            Inspect
          </button>
        </div>
        <p id="inspector-hint" className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
          Supports hyphenated and non-hyphenated UUIDs, and Crockford Base32 ULIDs.
        </p>
      </div>

      {result && !result.valid && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
        >
          {result.error}
        </div>
      )}

      {result && result.valid && result.type === "uuid" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              UUID Details
            </h4>
            <dl className="space-y-2 text-sm">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                <dt className="w-28 shrink-0 font-medium text-gray-500 dark:text-gray-400">
                  Identifier
                </dt>
                <dd className="break-all font-mono text-gray-900 dark:text-gray-100">
                  {result.normalized}
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                <dt className="w-28 shrink-0 font-medium text-gray-500 dark:text-gray-400">
                  UUID Version
                </dt>
                <dd className="text-gray-900 dark:text-gray-100">
                  Version {result.version}
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                <dt className="w-28 shrink-0 font-medium text-gray-500 dark:text-gray-400">
                  Variant
                </dt>
                <dd className="text-gray-900 dark:text-gray-100">
                  {result.variant}
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                <dt className="w-28 shrink-0 font-medium text-gray-500 dark:text-gray-400">
                  Type
                </dt>
                <dd className="text-gray-900 dark:text-gray-100">
                  {result.detectedType.replace("uuid-", "UUID v").toUpperCase().replace("UUID V", "UUID v")}
                </dd>
              </div>
            </dl>
          </div>

          {result.hasTimestamp && result.timestamp !== null ? (
            <TimestampCard timestamp={result.timestamp} />
          ) : (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
              UUID v{result.version} does not contain a creation timestamp.
            </div>
          )}
        </div>
      )}

      {result && result.valid && result.type === "ulid" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              ULID Details
            </h4>
            <dl className="space-y-2 text-sm">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                <dt className="w-36 shrink-0 font-medium text-gray-500 dark:text-gray-400">
                  Identifier
                </dt>
                <dd className="break-all font-mono text-gray-900 dark:text-gray-100">
                  {result.normalized}
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                <dt className="w-36 shrink-0 font-medium text-gray-500 dark:text-gray-400">
                  Length
                </dt>
                <dd className="text-gray-900 dark:text-gray-100">
                  {result.length} characters
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                <dt className="w-36 shrink-0 font-medium text-gray-500 dark:text-gray-400">
                  Timestamp Bits
                </dt>
                <dd className="text-gray-900 dark:text-gray-100">
                  {result.timestampBits}-bit
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                <dt className="w-36 shrink-0 font-medium text-gray-500 dark:text-gray-400">
                  Randomness Bits
                </dt>
                <dd className="text-gray-900 dark:text-gray-100">
                  {result.randomnessBits}-bit
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                <dt className="w-36 shrink-0 font-medium text-gray-500 dark:text-gray-400">
                  Structure
                </dt>
                <dd className="text-gray-900 dark:text-gray-100">
                  48-bit timestamp + 80-bit randomness = 128 bits total
                </dd>
              </div>
            </dl>
          </div>

          <TimestampCard timestamp={result.timestamp} />
        </div>
      )}
    </div>
  );
}
