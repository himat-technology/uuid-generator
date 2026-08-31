import { useState, useCallback } from "react";
import type {
  FormatOptions,
  GenerationResult,
  GenerationStats,
  IdentifierType,
  OutputWrapper,
} from "@/types";

import { generateBatch, computeStats } from "@/lib/inspector";
import { formatOutput as formatOutputFn } from "@/lib/formatter";

export function useIdentifierGenerator() {
  const [identifierType, setIdentifierType] = useState<IdentifierType>("uuid-v4");
  const [quantity, setQuantity] = useState(5);
  const [outputWrapper, setOutputWrapper] = useState<OutputWrapper>("plain");
  const [formatOptions, setFormatOptions] = useState<FormatOptions>({
    uppercase: false,
    hyphens: true,
  });
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [stats, setStats] = useState<GenerationStats | null>(null);

  const getFormattedOutput = useCallback(
    (identifiers: string[], type: IdentifierType) => {
      return formatOutputFn(identifiers, type, outputWrapper, formatOptions);
    },
    [outputWrapper, formatOptions]
  );

  const generate = useCallback(() => {
    const generationResult = generateBatch(identifierType, quantity);
    const output = getFormattedOutput(
      generationResult.identifiers,
      generationResult.type
    );
    const generationStats = computeStats(
      generationResult.identifiers,
      generationResult.type,
      generationResult.generationTimeMs,
      output
    );

    setResult(generationResult);
    setStats(generationStats);
    return generationResult;
  }, [identifierType, quantity, getFormattedOutput]);

  const regenerateSingle = useCallback(
    (index: number) => {
      if (!result) return;
      const single = generateBatch(identifierType, 1);
      const newIdentifiers = [...result.identifiers];
      newIdentifiers[index] = single.identifiers[0];

      const newResult: GenerationResult = {
        ...result,
        identifiers: newIdentifiers,
      };
      const output = getFormattedOutput(newIdentifiers, identifierType);
      const newStats = computeStats(
        newIdentifiers,
        identifierType,
        result.generationTimeMs,
        output
      );

      setResult(newResult);
      setStats(newStats);
    },
    [result, identifierType, getFormattedOutput]
  );

  const formattedOutput = result
    ? getFormattedOutput(result.identifiers, result.type)
    : "";

  return {
    identifierType,
    setIdentifierType,
    quantity,
    setQuantity,
    outputWrapper,
    setOutputWrapper,
    formatOptions,
    setFormatOptions,
    result,
    stats,
    formattedOutput,
    generate,
    regenerateSingle,
  };
}
