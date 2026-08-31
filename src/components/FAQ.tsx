"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Is my generated UUID data sent to a server?",
    answer:
      "No. Everything is generated locally in your browser using the Web Crypto API. No identifiers, keys, or inspected values are ever transmitted to any server.",
  },
  {
    question: "What is the difference between UUID v4, UUID v7, and ULID?",
    answer:
      "UUID v4 uses purely random data. UUID v7 embeds a Unix timestamp for time-based sorting while maintaining UUID format. ULID is a compact 26-character Base32 identifier that is lexicographically sortable by creation time.",
  },
  {
    question: "Is UUID v7 sortable?",
    answer:
      "Yes. UUID v7 embeds a 48-bit Unix epoch timestamp in milliseconds, making identifiers generated at different times naturally sortable in chronological order.",
  },
  {
    question: "Can I generate UUIDs in bulk?",
    answer:
      "Yes. You can generate between 1 and 1,000 identifiers per batch with quick-select buttons for common quantities.",
  },
  {
    question: "How secure are the generated identifiers?",
    answer:
      "Identifiers use cryptographically secure browser randomness through crypto.getRandomValues() and crypto.randomUUID(), providing CSPRNG-quality entropy suitable for database keys and unique identifiers.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes. This tool is completely free with no login, backend, or account required. All processing happens in your browser.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 dark:divide-gray-700 dark:border-gray-800">
        {faqs.map((faq, index) => (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between px-5 py-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500"
              aria-expanded={openIndex === index}
            >
              <span className="pr-4 text-sm font-medium text-gray-900 dark:text-white">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-gray-400 transition-transform",
                  openIndex === index && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4">
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
