"use client";

import { cn } from "@/lib/utils";
import type { TabId } from "@/types";
import { Layers, Search } from "lucide-react";

interface ToolTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: typeof Layers }[] = [
  { id: "generator", label: "Generator & Converter", icon: Layers },
  { id: "inspector", label: "UUID / ULID Inspector", icon: Search },
];

export default function ToolTabs({ activeTab, onTabChange }: ToolTabsProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div
        role="tablist"
        aria-label="Tool sections"
        className="mt-6 flex gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-900"
      >
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeTab === id}
            aria-controls={`panel-${id}`}
            id={`tab-${id}`}
            type="button"
            onClick={() => onTabChange(id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brand-500",
              activeTab === id
                ? "bg-white text-brand-700 shadow-sm dark:bg-gray-800 dark:text-brand-300"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{id === "generator" ? "Generate" : "Inspect"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
