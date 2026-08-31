"use client";

import IdentifierTypeSelector from "./IdentifierTypeSelector";
import QuantitySelector from "./QuantitySelector";
import FormatOptionsPanel from "./FormatOptions";
import GenerateButton from "./GenerateButton";
import OutputPanel from "./OutputPanel";
import Statistics from "./Statistics";
import type { TabId } from "@/types";
import { useIdentifierGenerator } from "@/hooks/useIdentifierGenerator";

interface GeneratorPanelProps {
  generator: ReturnType<typeof useIdentifierGenerator>;
  onInspect: (id: string) => void;
  onTabChange: (tab: TabId) => void;
}

export default function GeneratorPanel({
  generator,
  onInspect,
  onTabChange,
}: GeneratorPanelProps) {
  const handleInspect = (id: string) => {
    onInspect(id);
    onTabChange("inspector");
  };

  return (
    <div className="space-y-6">
      <IdentifierTypeSelector
        value={generator.identifierType}
        onChange={generator.setIdentifierType}
      />
      <QuantitySelector
        value={generator.quantity}
        onChange={generator.setQuantity}
      />
      <FormatOptionsPanel
        identifierType={generator.identifierType}
        outputWrapper={generator.outputWrapper}
        formatOptions={generator.formatOptions}
        onWrapperChange={generator.setOutputWrapper}
        onFormatChange={generator.setFormatOptions}
      />
      <GenerateButton onClick={generator.generate} />
      <OutputPanel
        result={generator.result}
        formattedOutput={generator.formattedOutput}
        onInspect={handleInspect}
        onRegenerate={generator.regenerateSingle}
      />
      <Statistics stats={generator.stats} />
    </div>
  );
}
