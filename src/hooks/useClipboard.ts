import { useState, useCallback } from "react";
import { copyToClipboard } from "@/lib/download";

export function useClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string, id?: string) => {
      const success = await copyToClipboard(text);
      if (success) {
        setCopied(true);
        if (id) setCopiedId(id);
        setTimeout(() => {
          setCopied(false);
          setCopiedId(null);
        }, resetDelay);
      }
      return success;
    },
    [resetDelay]
  );

  return { copied, copiedId, copy };
}
