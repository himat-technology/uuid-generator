import { ChevronRight, Home } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <li>
          <a
            href={SITE.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-colors hover:text-brand-600 dark:hover:text-brand-400"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{SITE.company}</span>
          </a>
        </li>
        <li>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </li>
        <li>
          <a
            href={`${SITE.companyUrl}/free-tools`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
          >
            Free Tools
          </a>
        </li>
        <li>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </li>
        <li className="font-medium text-gray-900 dark:text-white" aria-current="page">
          UUID Generator
        </li>
      </ol>
    </nav>
  );
}
