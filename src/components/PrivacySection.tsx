import { Lock, ShieldCheck } from "lucide-react";

export default function PrivacySection() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-gradient-to-br from-brand-50 to-white p-6 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            100% Browser-Local Generation
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
            All identifiers are generated entirely inside your browser using
            native Web Crypto APIs — including{" "}
            <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-100">
              crypto.getRandomValues()
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-100">
              crypto.randomUUID()
            </code>
            .
          </p>
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-700 dark:bg-green-950/60">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-green-700 dark:text-green-400" />
            <p className="text-sm text-green-800 dark:text-green-200">
              Generated UUIDs, ULIDs, database keys, and inspected identifiers
              are never uploaded, stored, or transmitted to any server. No
              generated identifiers are sent to any server.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
