import { Shield } from "lucide-react";

export default function PrivacyBadge() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-medium text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
        <Shield className="h-4 w-4" aria-hidden="true" />
        <span>100% Browser-Local • Web Crypto CSPRNG</span>
      </div>
    </div>
  );
}
