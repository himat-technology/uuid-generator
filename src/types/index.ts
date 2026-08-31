export type IdentifierType = "uuid-v4" | "uuid-v7" | "ulid";

export type OutputWrapper =
  | "plain"
  | "json"
  | "csv"
  | "sql-in"
  | "sql-values";

export type TabId = "generator" | "inspector";

export interface FormatOptions {
  uppercase: boolean;
  hyphens: boolean;
}

export interface GenerationResult {
  identifiers: string[];
  type: IdentifierType;
  count: number;
  generationTimeMs: number;
}

export interface GenerationStats {
  count: number;
  type: IdentifierType;
  totalCharacters: number;
  outputSizeBytes: number;
  generationTimeMs: number;
}

export type UUIDVariant =
  | "RFC 4122"
  | "Microsoft GUID"
  | "Reserved"
  | "Unknown";

export type DetectedType =
  | "uuid-v1"
  | "uuid-v2"
  | "uuid-v3"
  | "uuid-v4"
  | "uuid-v5"
  | "uuid-v6"
  | "uuid-v7"
  | "uuid-v8"
  | "uuid-unknown"
  | "ulid"
  | "invalid";

export interface UUIDInspectionResult {
  valid: true;
  type: "uuid";
  detectedType: DetectedType;
  normalized: string;
  version: number;
  variant: UUIDVariant;
  timestamp: number | null;
  hasTimestamp: boolean;
}

export interface ULIDInspectionResult {
  valid: true;
  type: "ulid";
  detectedType: "ulid";
  normalized: string;
  timestamp: number;
  length: number;
  timestampBits: number;
  randomnessBits: number;
}

export interface InvalidInspectionResult {
  valid: false;
  error: string;
}

export type InspectionResult =
  | UUIDInspectionResult
  | ULIDInspectionResult
  | InvalidInspectionResult;

export const IDENTIFIER_TYPE_LABELS: Record<IdentifierType, string> = {
  "uuid-v4": "UUID v4",
  "uuid-v7": "UUID v7",
  ulid: "ULID",
};

export const OUTPUT_WRAPPER_LABELS: Record<OutputWrapper, string> = {
  plain: "Plain Lines",
  json: "JSON Array",
  csv: "CSV",
  "sql-in": "SQL IN Clause",
  "sql-values": "SQL VALUES",
};
