import { describe, it, expect } from "vitest";
import { generateUUIDv4, validateUUID, extractUUIDVersion, extractUUIDVariant } from "@/lib/uuid";
import { generateUUIDv7, generateUUIDv7Batch, extractUUIDv7Timestamp } from "@/lib/uuidV7";
import { generateULID, generateULIDBatch, validateULID, decodeULIDTimestamp } from "@/lib/ulid";
import { generateBatch, inspectIdentifier } from "@/lib/inspector";
import { formatOutput } from "@/lib/formatter";

describe("Integration — full feature smoke test", () => {
  it("UUID v4 generation and validation", () => {
    const v4 = generateUUIDv4();
    expect(validateUUID(v4)).toBe(true);
    expect(extractUUIDVersion(v4)).toBe(4);
    expect(extractUUIDVariant(v4)).toBe("RFC 4122");
  });

  it("UUID v7 generation, timestamp, sortability", () => {
    const v7 = generateUUIDv7(1700000000000);
    expect(validateUUID(v7)).toBe(true);
    expect(extractUUIDVersion(v7)).toBe(7);
    expect(extractUUIDv7Timestamp(v7)).toBe(1700000000000);

    const batch = generateUUIDv7Batch(100);
    expect(new Set(batch).size).toBe(100);

    const sorted = [generateUUIDv7(1000), generateUUIDv7(2000), generateUUIDv7(3000)];
    expect([...sorted].sort()).toEqual(sorted);
  });

  it("ULID generation and timestamp", () => {
    const ulid = generateULID(1700000000000);
    expect(ulid).toHaveLength(26);
    expect(validateULID(ulid)).toBe(true);
    expect(decodeULIDTimestamp(ulid)).toBe(1700000000000);

    const batch = generateULIDBatch(100);
    expect(new Set(batch).size).toBe(100);
  });

  it("bulk generation up to 1000 with uniqueness", () => {
    for (const type of ["uuid-v4", "uuid-v7", "ulid"] as const) {
      const batch = generateBatch(type, 1000);
      expect(batch.count).toBe(1000);
      expect(new Set(batch.identifiers).size).toBe(1000);
      expect(batch.generationTimeMs).toBeLessThan(5000);
    }
  });

  it("all output formats work", () => {
    const ids = generateBatch("uuid-v4", 3).identifiers;
    const fmt = { uppercase: true, hyphens: false };

    expect(formatOutput(ids, "uuid-v4", "plain", fmt).split("\n")).toHaveLength(3);
    expect(JSON.parse(formatOutput(ids, "uuid-v4", "json", fmt))).toHaveLength(3);
    expect(formatOutput(ids, "uuid-v4", "csv", fmt).split(",")).toHaveLength(3);
    expect(formatOutput(ids, "uuid-v4", "sql-in", fmt)).toMatch(/^IN \(/);
    expect(formatOutput(ids, "uuid-v4", "sql-values", fmt)).toMatch(/^VALUES /);
    expect(formatOutput(ids, "uuid-v4", "plain", fmt)).not.toContain("-");
  });

  it("inspector handles all types and errors", () => {
    const v4 = generateUUIDv4();
    const v7 = generateUUIDv7(1700000000000);
    const ulid = generateULID(1700000000000);

    const v4r = inspectIdentifier(v4);
    expect(v4r.valid).toBe(true);
    if (v4r.valid) expect(v4r.type).toBe("uuid");

    const v7r = inspectIdentifier(v7);
    expect(v7r.valid).toBe(true);
    if (v7r.valid && v7r.type === "uuid") expect(v7r.hasTimestamp).toBe(true);

    const ulidr = inspectIdentifier(ulid);
    expect(ulidr.valid).toBe(true);
    if (ulidr.valid) expect(ulidr.type).toBe("ulid");

    const bad = inspectIdentifier("not-valid-id");
    expect(bad.valid).toBe(false);
  });
});
