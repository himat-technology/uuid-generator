import { generateUUIDv4 } from "./uuid";

let lastTimestamp = -1;
let sequenceCounter = 0;

function resetSequenceIfNewMs(timestamp: number): void {
  if (timestamp !== lastTimestamp) {
    lastTimestamp = timestamp;
    sequenceCounter = 0;
  } else {
    sequenceCounter = (sequenceCounter + 1) & 0x0fff;
  }
}

export function generateUUIDv7(timestamp?: number): string {
  const now = timestamp ?? Date.now();
  resetSequenceIfNewMs(now);

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  const ts = BigInt(now) & BigInt("0xFFFFFFFFFFFF");

  bytes[0] = Number((ts >> BigInt(40)) & BigInt(0xff));
  bytes[1] = Number((ts >> BigInt(32)) & BigInt(0xff));
  bytes[2] = Number((ts >> BigInt(24)) & BigInt(0xff));
  bytes[3] = Number((ts >> BigInt(16)) & BigInt(0xff));
  bytes[4] = Number((ts >> BigInt(8)) & BigInt(0xff));
  bytes[5] = Number(ts & BigInt(0xff));

  bytes[6] = 0x70 | ((sequenceCounter >> 8) & 0x0f);
  bytes[7] = sequenceCounter & 0xff;

  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function generateUUIDv7Batch(count: number): string[] {
  const results: string[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < count; i++) {
    let uuid: string;
    let attempts = 0;
    do {
      uuid = generateUUIDv7();
      attempts++;
    } while (seen.has(uuid) && attempts < 100);

    seen.add(uuid);
    results.push(uuid);
  }

  return results;
}

export function extractUUIDv7Timestamp(uuid: string): number | null {
  const normalized = uuid.trim().toLowerCase();
  const hex = normalized.replace(/-/g, "");
  if (hex.length !== 32) return null;

  const version = parseInt(hex.charAt(12), 16);
  if (version !== 7) return null;

  const tsHex = hex.slice(0, 12);
  const timestamp = parseInt(tsHex, 16);
  return timestamp;
}

export function resetUUIDv7Sequence(): void {
  lastTimestamp = -1;
  sequenceCounter = 0;
}

export { generateUUIDv4 };
