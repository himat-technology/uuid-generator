import type {
  DetectedType,
  GenerationResult,
  GenerationStats,
  IdentifierType,
  InspectionResult,
} from "@/types";
import { generateUUIDv4 } from "./uuid";
import { generateUUIDv7Batch } from "./uuidV7";
import { generateULIDBatch } from "./ulid";
import {
  extractUUIDVersion,
  extractUUIDVariant,
  normalizeUUID,
  validateUUID,
} from "./uuid";
import {
  decodeULIDTimestamp,
  normalizeULID,
  validateULID,
} from "./ulid";
import { extractUUIDv7Timestamp } from "./uuidV7";

export function generateBatch(
  type: IdentifierType,
  count: number
): GenerationResult {
  const start = performance.now();
  let identifiers: string[];

  switch (type) {
    case "uuid-v4": {
      const seen = new Set<string>();
      identifiers = [];
      for (let i = 0; i < count; i++) {
        let uuid: string;
        do {
          uuid = generateUUIDv4();
        } while (seen.has(uuid));
        seen.add(uuid);
        identifiers.push(uuid);
      }
      break;
    }
    case "uuid-v7":
      identifiers = generateUUIDv7Batch(count);
      break;
    case "ulid":
      identifiers = generateULIDBatch(count);
      break;
  }

  const generationTimeMs = performance.now() - start;

  return {
    identifiers,
    type,
    count: identifiers.length,
    generationTimeMs,
  };
}

export function detectIdentifierType(input: string): DetectedType {
  const trimmed = input.trim();

  if (validateULID(trimmed)) {
    return "ulid";
  }

  if (validateUUID(trimmed)) {
    const version = extractUUIDVersion(trimmed);
    if (version === null) return "uuid-unknown";
    switch (version) {
      case 1:
        return "uuid-v1";
      case 2:
        return "uuid-v2";
      case 3:
        return "uuid-v3";
      case 4:
        return "uuid-v4";
      case 5:
        return "uuid-v5";
      case 6:
        return "uuid-v6";
      case 7:
        return "uuid-v7";
      case 8:
        return "uuid-v8";
      default:
        return "uuid-unknown";
    }
  }

  return "invalid";
}

export function inspectIdentifier(input: string): InspectionResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      valid: false,
      error: "Please enter a UUID or ULID to inspect.",
    };
  }

  const detectedType = detectIdentifierType(trimmed);

  if (detectedType === "ulid") {
    const normalized = normalizeULID(trimmed)!;
    const timestamp = decodeULIDTimestamp(normalized)!;

    return {
      valid: true,
      type: "ulid",
      detectedType: "ulid",
      normalized,
      timestamp,
      length: normalized.length,
      timestampBits: 48,
      randomnessBits: 80,
    };
  }

  if (detectedType !== "invalid") {
    const normalized = normalizeUUID(trimmed)!;
    const version = extractUUIDVersion(normalized)!;
    const variant = extractUUIDVariant(normalized);
    const hasTimestamp = version === 7;
    const timestamp = hasTimestamp
      ? extractUUIDv7Timestamp(normalized)
      : null;

    return {
      valid: true,
      type: "uuid",
      detectedType,
      normalized,
      version,
      variant,
      timestamp,
      hasTimestamp,
    };
  }

  return {
    valid: false,
    error:
      "This identifier is not a valid UUID or ULID. Check the format and try again.",
  };
}

export function computeStats(
  identifiers: string[],
  type: IdentifierType,
  generationTimeMs: number,
  output: string
): GenerationStats {
  const totalCharacters = output.length;
  const outputSizeBytes = new Blob([output]).size;

  return {
    count: identifiers.length,
    type,
    totalCharacters,
    outputSizeBytes,
    generationTimeMs,
  };
}
