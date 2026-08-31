import type { FormatOptions, IdentifierType, OutputWrapper } from "@/types";

export function formatIdentifier(
  id: string,
  type: IdentifierType,
  options: FormatOptions
): string {
  if (type === "ulid") {
    return options.uppercase ? id.toUpperCase() : id.toLowerCase();
  }

  let formatted = id.toLowerCase();
  if (!options.hyphens) {
    formatted = formatted.replace(/-/g, "");
  }
  return options.uppercase ? formatted.toUpperCase() : formatted;
}

export function formatOutput(
  identifiers: string[],
  type: IdentifierType,
  wrapper: OutputWrapper,
  options: FormatOptions
): string {
  const formatted = identifiers.map((id) =>
    formatIdentifier(id, type, options)
  );

  switch (wrapper) {
    case "plain":
      return formatted.join("\n");
    case "json":
      return JSON.stringify(formatted, null, 2);
    case "csv":
      return formatted.join(",");
    case "sql-in":
      return `IN (${formatted.map((id) => `'${id}'`).join(",")})`;
    case "sql-values":
      return `VALUES ${formatted.map((id) => `('${id}')`).join(", ")}`;
  }
}
