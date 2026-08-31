"use client";

import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
} from "lucide-react";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";

const SOCIAL_ICONS = {
  Facebook,
  LinkedIn: Linkedin,
  Instagram,
  GitHub: Github,
} as const;

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {SITE.name}
            </p>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Generate and inspect UUID v4, UUID v7, and ULID identifiers
              entirely in your browser. 100% private — no server required.
            </p>
            <a
              href={SITE.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              View Live Demo
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
              Built by
            </p>
            <a
              href={SITE.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-base font-bold text-gray-900 transition-colors hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
            >
              {SITE.company}
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Modern web tools and developer utilities crafted for performance,
              privacy, and great UX.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
              Connect With Us
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = SOCIAL_ICONS[link.name as keyof typeof SOCIAL_ICONS];
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="group flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-600 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-brand-700 dark:hover:bg-brand-950 dark:hover:text-brand-400"
                  >
                    <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-gray-800 sm:flex-row">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-left">
            © {new Date().getFullYear()}{" "}
            <a
              href={SITE.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-700 hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400"
            >
              {SITE.company}
            </a>
            . All rights reserved.
          </p>
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 sm:text-right">
            Built with Next.js, TypeScript & Web Crypto API
          </p>
        </div>
      </div>
    </footer>
  );
}
