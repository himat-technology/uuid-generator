import { describe, it, expect, beforeEach } from "vitest";
import {
  generateUUIDv7,
  generateUUIDv7Batch,
  extractUUIDv7Timestamp,
  resetUUIDv7Sequence,
} from "@/lib/uuidV7";
import { extractUUIDVersion, extractUUIDVariant } from "@/lib/uuid";

const UUID_V7_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe("UUID v7", () => {
  beforeEach(() => {
    resetUUIDv7Sequence();
  });

  it("generates correct UUID format", () => {
    const uuid = generateUUIDv7();
    expect(uuid).toMatch(UUID_V7_REGEX);
  });

  it("has version 7", () => {
    const uuid = generateUUIDv7();
    expect(extractUUIDVersion(uuid)).toBe(7);
  });

  it("has RFC 4122 variant", () => {
    const uuid = generateUUIDv7();
    expect(extractUUIDVariant(uuid)).toBe("RFC 4122");
  });

  it("embeds the provided timestamp", () => {
    const ts = 1700000000000;
    const uuid = generateUUIDv7(ts);
    const extracted = extractUUIDv7Timestamp(uuid);
    expect(extracted).toBe(ts);
  });

  it("extracts current timestamp", () => {
    const before = Date.now();
    const uuid = generateUUIDv7();
    const after = Date.now();
    const extracted = extractUUIDv7Timestamp(uuid)!;
    expect(extracted).toBeGreaterThanOrEqual(before);
    expect(extracted).toBeLessThanOrEqual(after);
  });

  it("is sortable for sequential timestamps", () => {
    const uuids = [
      generateUUIDv7(1000),
      generateUUIDv7(2000),
      generateUUIDv7(3000),
    ];
    const sorted = [...uuids].sort();
    expect(sorted).toEqual(uuids);
  });

  it("generates unique batch values", () => {
    const batch = generateUUIDv7Batch(50);
    const unique = new Set(batch);
    expect(unique.size).toBe(50);
  });
});
