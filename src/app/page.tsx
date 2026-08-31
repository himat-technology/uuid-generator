"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import PrivacyBadge from "@/components/PrivacyBadge";
import ToolTabs from "@/components/ToolTabs";
import GeneratorPanel from "@/components/GeneratorPanel";
import Inspector from "@/components/Inspector";
import HowToUse from "@/components/HowToUse";
import FeatureGrid from "@/components/FeatureGrid";
import PrivacySection from "@/components/PrivacySection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { useIdentifierGenerator } from "@/hooks/useIdentifierGenerator";
import type { TabId } from "@/types";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("generator");
  const [inspectValue, setInspectValue] = useState("");
  const generator = useIdentifierGenerator();

  const handleInspect = (id: string) => {
    setInspectValue(id);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-16">
        <Breadcrumb />
        <PrivacyBadge />

        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            UUID & ULID Generator
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
            Generate single or bulk random UUID v4, modern timestamp-sortable
            UUID v7, and Base32 ULIDs directly in your browser. Inspect
            existing identifiers and decode available creation timestamps with
            zero server transmission.
          </p>
        </div>

        <ToolTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8"
          >
            {activeTab === "generator" ? (
              <GeneratorPanel
                generator={generator}
                onInspect={handleInspect}
                onTabChange={setActiveTab}
              />
            ) : (
              <Inspector initialValue={inspectValue} />
            )}
          </div>
        </div>

        <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6">
          <HowToUse />
          <FeatureGrid />
          <PrivacySection />
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
}
