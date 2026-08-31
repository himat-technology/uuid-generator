import { Settings, Copy, Wand2 } from "lucide-react";

const steps = [
  {
    icon: Wand2,
    title: "Select Identifier Type & Quantity",
    description:
      "Choose UUID v4, UUID v7, or ULID, then select between 1 and 1,000 identifiers.",
  },
  {
    icon: Settings,
    title: "Configure Output",
    description:
      "Choose uppercase/lowercase, hyphens, and output format — JSON, CSV, plain text, or SQL.",
  },
  {
    icon: Copy,
    title: "Copy, Export or Inspect",
    description:
      "Copy generated identifiers, download as TXT or JSON, or inspect existing UUIDs and ULIDs.",
  },
];

export default function HowToUse() {
  return (
    <section>
      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
        How to Use
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                {i + 1}
              </span>
              <step.icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
