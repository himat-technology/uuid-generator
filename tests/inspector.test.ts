import { describe, it, expect } from "vitest";
import {
  detectIdentifierType,
  inspectIdentifier,
} from "@/lib/inspector";
import { generateUUIDv4 } from "@/lib/uuid";
import { generateUUIDv7 } from "@/lib/uuidV7";
import { generateULID } from "@/lib/ulid";

describe("Inspector", () => {
  it("detects UUID v4", () => {
    const uuid = generateUUIDv4();
    expect(detectIdentifierType(uuid)).toBe("uuid-v4");
  });

  it("detects UUID v7", () => {
    const uuid = generateUUIDv7();
    expect(detectIdentifierType(uuid)).toBe("uuid-v7");
  });

  it("detects ULID", () => {
    const ulid = generateULID();
    expect(detectIdentifierType(ulid)).toBe("ulid");
  });

  it("detects invalid identifiers", () => {
    expect(detectIdentifierType("not-valid")).toBe("invalid");
  });

  it("inspects UUID v4 without timestamp", () => {
    const uuid = generateUUIDv4();
    const result = inspectIdentifier(uuid);
    expect(result.valid).toBe(true);
    if (result.valid && result.type === "uuid") {
      expect(result.version).toBe(4);
      expect(result.hasTimestamp).toBe(false);
      expect(result.timestamp).toBeNull();
    }
  });

  it("inspects UUID v7 with timestamp", () => {
    const uuid = generateUUIDv7(1700000000000);
    const result = inspectIdentifier(uuid);
    expect(result.valid).toBe(true);
    if (result.valid && result.type === "uuid") {
      expect(result.version).toBe(7);
      expect(result.hasTimestamp).toBe(true);
      expect(result.timestamp).toBe(1700000000000);
    }
  });

  it("inspects ULID with timestamp", () => {
    const ulid = generateULID(1700000000000);
    const result = inspectIdentifier(ulid);
    expect(result.valid).toBe(true);
    if (result.valid && result.type === "ulid") {
      expect(result.timestamp).toBe(1700000000000);
      expect(result.length).toBe(26);
    }
  });

  it("returns error for invalid input", () => {
    const result = inspectIdentifier("bad-input");
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toContain("not a valid UUID or ULID");
    }
  });

  it("returns error for empty input", () => {
    const result = inspectIdentifier("");
    expect(result.valid).toBe(false);
  });
});
