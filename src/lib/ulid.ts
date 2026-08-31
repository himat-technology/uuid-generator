const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const ENCODING_MAP: Record<string, number> = {};
for (let i = 0; i < ENCODING.length; i++) {
  ENCODING_MAP[ENCODING[i]] = i;
  ENCODING_MAP[ENCODING[i].toLowerCase()] = i;
}

const ULID_REGEX = /^[0-9A-HJKMNP-TV-Z]{26}$/i;

let lastUlidTimestamp = -1;
let lastUlidRandom: Uint8Array | null = null;

function encodeBase32(value: bigint, length: number): string {
  let result = "";
  for (let i = length - 1; i >= 0; i--) {
    const shift = BigInt(i * 5);
    const index = Number((value >> shift) & BigInt(0x1f));
    result += ENCODING[index];
  }
  return result;
}

function incrementRandom(random: Uint8Array): void {
  for (let i = 9; i >= 0; i--) {
    random[i] = (random[i] + 1) & 0xff;
    if (random[i] !== 0) break;
  }
}

export function generateULID(timestamp?: number): string {
  const now = timestamp ?? Date.now();
  const ts = BigInt(now) & BigInt("0xFFFFFFFFFFFF");

  const random = new Uint8Array(10);
  crypto.getRandomValues(random);

  if (now === lastUlidTimestamp && lastUlidRandom) {
    incrementRandom(random);
    for (let i = 0; i < 10; i++) {
      if (random[i] < lastUlidRandom[i]) {
        random[i] = lastUlidRandom[i];
      }
    }
  }

  lastUlidTimestamp = now;
  lastUlidRandom = new Uint8Array(random);

  const timePart = encodeBase32(ts, 10);

  const randomValue =
    (BigInt(random[0]) << BigInt(72)) |
    (BigInt(random[1]) << BigInt(64)) |
    (BigInt(random[2]) << BigInt(56)) |
    (BigInt(random[3]) << BigInt(48)) |
    (BigInt(random[4]) << BigInt(40)) |
    (BigInt(random[5]) << BigInt(32)) |
    (BigInt(random[6]) << BigInt(24)) |
    (BigInt(random[7]) << BigInt(16)) |
    (BigInt(random[8]) << BigInt(8)) |
    BigInt(random[9]);

  const randomPart = encodeBase32(randomValue, 16);

  return timePart + randomPart;
}

export function generateULIDBatch(count: number): string[] {
  const results: string[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < count; i++) {
    let ulid: string;
    let attempts = 0;
    do {
      ulid = generateULID();
      attempts++;
    } while (seen.has(ulid) && attempts < 100);

    seen.add(ulid);
    results.push(ulid);
  }

  return results;
}

export function normalizeULID(input: string): string | null {
  const trimmed = input.trim().toUpperCase();
  if (!ULID_REGEX.test(trimmed)) return null;
  return trimmed;
}

export function validateULID(input: string): boolean {
  return normalizeULID(input) !== null;
}

export function decodeULIDTimestamp(ulid: string): number | null {
  const normalized = normalizeULID(ulid);
  if (!normalized) return null;

  const timePart = normalized.slice(0, 10);
  let timestamp = BigInt(0);

  for (const char of timePart) {
    const value = ENCODING_MAP[char];
    if (value === undefined) return null;
    timestamp = (timestamp << BigInt(5)) | BigInt(value);
  }

  return Number(timestamp);
}

export function extractULIDTimestamp(ulid: string): number | null {
  return decodeULIDTimestamp(ulid);
}

export function resetULIDSequence(): void {
  lastUlidTimestamp = -1;
  lastUlidRandom = null;
}
