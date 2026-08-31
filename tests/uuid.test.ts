import { describe, it, expect } from "vitest";
import {
  generateUUIDv4,
  validateUUID,
  normalizeUUID,
  extractUUIDVersion,
  extractUUIDVariant,
} from "@/lib/uuid";

const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe("UUID v4", () => {
  it("generates correct UUID format", () => {
    const uuid = generateUUIDv4();
    expect(uuid).toMatch(UUID_V4_REGEX);
  });

  it("has version 4", () => {
    const uuid = generateUUIDv4();
    expect(extractUUIDVersion(uuid)).toBe(4);
  });

  it("has RFC 4122 variant", () => {
    const uuid = generateUUIDv4();
    expect(extractUUIDVariant(uuid)).toBe("RFC 4122");
  });

  it("generates unique values in a batch", () => {
    const batch = new Set<string>();
    for (let i = 0; i < 100; i++) {
      batch.add(generateUUIDv4());
    }
    expect(batch.size).toBe(100);
  });

  it("validates correct UUIDs", () => {
    expect(validateUUID("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
    expect(validateUUID("550e8400e29b41d4a716446655440000")).toBe(true);
  });

  it("rejects invalid UUIDs", () => {
    expect(validateUUID("not-a-uuid")).toBe(false);
    expect(validateUUID("")).toBe(false);
  });

  it("normalizes UUIDs", () => {
    const normalized = normalizeUUID("550E8400-E29B-41D4-A716-446655440000");
    expect(normalized).toBe("550e8400-e29b-41d4-a716-446655440000");
  });
});
