import { describe, it, expect, beforeEach } from "vitest";
import {
  generateULID,
  generateULIDBatch,
  validateULID,
  normalizeULID,
  decodeULIDTimestamp,
  resetULIDSequence,
} from "@/lib/ulid";

const ULID_REGEX = /^[0-9A-HJKMNP-TV-Z]{26}$/;

describe("ULID", () => {
  beforeEach(() => {
    resetULIDSequence();
  });

  it("generates exactly 26 characters", () => {
    const ulid = generateULID();
    expect(ulid).toHaveLength(26);
  });

  it("uses valid Base32 characters", () => {
    const ulid = generateULID();
    expect(ulid).toMatch(ULID_REGEX);
  });

  it("extracts timestamp correctly", () => {
    const ts = 1700000000000;
    const ulid = generateULID(ts);
    const extracted = decodeULIDTimestamp(ulid);
    expect(extracted).toBe(ts);
  });

  it("is sortable by timestamp", () => {
    const ulids = [generateULID(1000), generateULID(2000), generateULID(3000)];
    const sorted = [...ulids].sort();
    expect(sorted).toEqual(ulids);
  });

  it("validates correct ULIDs", () => {
    const ulid = generateULID();
    expect(validateULID(ulid)).toBe(true);
    expect(validateULID(ulid.toLowerCase())).toBe(true);
  });

  it("rejects invalid ULIDs", () => {
    expect(validateULID("too-short")).toBe(false);
    expect(validateULID("")).toBe(false);
    expect(validateULID("01ARZ3NDEKTSV4RRFFQ69G5FAV!")).toBe(false);
  });

  it("normalizes to uppercase", () => {
    const ulid = generateULID();
    expect(normalizeULID(ulid.toLowerCase())).toBe(ulid);
  });

  it("generates unique batch values", () => {
    const batch = generateULIDBatch(50);
    const unique = new Set(batch);
    expect(unique.size).toBe(50);
  });
});
