import { describe, it, expect } from "vitest";
import { formatOutput, formatIdentifier } from "@/lib/formatter";

const ids = [
  "550e8400-e29b-41d4-a716-446655440000",
  "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
];

const options = { uppercase: false, hyphens: true };
const upperOptions = { uppercase: true, hyphens: true };
const noHyphenOptions = { uppercase: false, hyphens: false };

describe("Formatter", () => {
  it("formats plain lines", () => {
    const output = formatOutput(ids, "uuid-v4", "plain", options);
    expect(output).toBe(ids.join("\n"));
  });

  it("formats JSON array", () => {
    const output = formatOutput(ids, "uuid-v4", "json", options);
    const parsed = JSON.parse(output);
    expect(parsed).toEqual(ids);
  });

  it("formats CSV", () => {
    const output = formatOutput(ids, "uuid-v4", "csv", options);
    expect(output).toBe(ids.join(","));
  });

  it("formats SQL IN clause", () => {
    const output = formatOutput(ids, "uuid-v4", "sql-in", options);
    expect(output).toBe(
      `IN ('${ids[0]}','${ids[1]}')`
    );
  });

  it("formats SQL VALUES", () => {
    const output = formatOutput(ids, "uuid-v4", "sql-values", options);
    expect(output).toBe(
      `VALUES ('${ids[0]}'), ('${ids[1]}')`
    );
  });

  it("applies uppercase formatting", () => {
    const formatted = formatIdentifier(ids[0], "uuid-v4", upperOptions);
    expect(formatted).toBe(ids[0].toUpperCase());
  });

  it("removes hyphens when disabled", () => {
    const formatted = formatIdentifier(ids[0], "uuid-v4", noHyphenOptions);
    expect(formatted).toBe(ids[0].replace(/-/g, ""));
  });

  it("formats ULID uppercase", () => {
    const ulid = "01arz3ndektsv4rrffq69g5fav";
    const formatted = formatIdentifier(ulid, "ulid", upperOptions);
    expect(formatted).toBe(ulid.toUpperCase());
  });
});
