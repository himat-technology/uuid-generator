"use client";

import { clampQuantity, parseQuantityInput } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (quantity: number) => void;
}

const QUICK_OPTIONS = [1, 5, 25, 100];

export default function QuantitySelector({
  value,
  onChange,
}: QuantitySelectorProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseQuantityInput(e.target.value);
    onChange(parsed);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
        Quantity
      </h3>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="number"
          min={1}
          max={1000}
          value={value}
          onChange={handleInputChange}
          onBlur={() => onChange(clampQuantity(value))}
          className="w-24 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          aria-label="Number of identifiers to generate"
        />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          (1–1,000)
        </span>
        <div className="flex gap-2">
          {QUICK_OPTIONS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                value === n
                  ? "border-brand-500 bg-brand-50 text-brand-800 dark:border-brand-500 dark:bg-gray-800 dark:text-brand-200"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
              aria-pressed={value === n}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
