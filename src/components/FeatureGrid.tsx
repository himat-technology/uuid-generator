import {
  Shield,
  Layers,
  Hash,
  FileOutput,
  Search,
  Download,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Web Crypto Security",
    description:
      "Use browser-native cryptographically secure random generation.",
  },
  {
    icon: Layers,
    title: "UUID v4, v7 & ULID",
    description: "Support random and time-sortable identifier formats.",
  },
  {
    icon: Hash,
    title: "Bulk Generation",
    description: "Generate up to 1,000 identifiers in a single batch.",
  },
  {
    icon: FileOutput,
    title: "Flexible Formatting",
    description: "JSON, CSV, plain text, SQL IN, and SQL VALUES output.",
  },
  {
    icon: Search,
    title: "Built-in Inspector",
    description:
      "Inspect versions, variants, timestamps, and identifier structure.",
  },
  {
    icon: Download,
    title: "One-Click Export",
    description: "Copy or download generated results instantly.",
  },
];

export default function FeatureGrid() {
  return (
    <section>
      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
        Features
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <feature.icon className="mb-3 h-6 w-6 text-brand-600 dark:text-brand-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
