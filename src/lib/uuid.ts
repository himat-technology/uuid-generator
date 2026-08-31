const UUID_REGEX =
  /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;

const UUID_NO_HYPHEN_REGEX = /^[0-9a-f]{32}$/i;

export function generateUUIDv4(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function normalizeUUID(input: string): string | null {
  const trimmed = input.trim();
  if (UUID_REGEX.test(trimmed)) {
    const hex = trimmed.replace(/-/g, "").toLowerCase();
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }
  if (UUID_NO_HYPHEN_REGEX.test(trimmed)) {
    const hex = trimmed.toLowerCase();
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }
  return null;
}

export function validateUUID(input: string): boolean {
  return normalizeUUID(input) !== null;
}

export function extractUUIDVersion(uuid: string): number | null {
  const normalized = normalizeUUID(uuid);
  if (!normalized) return null;
  const parts = normalized.split("-");
  const versionNibble = parseInt(parts[2].charAt(0), 16);
  return versionNibble;
}

export function extractUUIDVariant(uuid: string): import("@/types").UUIDVariant {
  const normalized = normalizeUUID(uuid);
  if (!normalized) return "Unknown";

  const parts = normalized.split("-");
  const variantByte = parseInt(parts[3].charAt(0), 16);

  switch (variantByte) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      return "Reserved";
    case 8:
    case 9:
    case 10:
    case 11:
      return "RFC 4122";
    case 12:
    case 13:
      return "Microsoft GUID";
    case 14:
    case 15:
      return "Reserved";
    default:
      return "Unknown";
  }
}

export function uuidToBytes(uuid: string): Uint8Array | null {
  const normalized = normalizeUUID(uuid);
  if (!normalized) return null;
  const hex = normalized.replace(/-/g, "");
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}
