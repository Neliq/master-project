export const SEMANTIC_COLOR_STORAGE_KEY = "dark-pattern-lab:semantic-colors:v1";

const SEMANTIC_COLOR_HEX_PATTERN = /^#[0-9a-f]{6}$/i;

export const SEMANTIC_COLOR_TOKENS = [
  { property: "--background", label: "Background", group: "Core interface" },
  { property: "--foreground", label: "Foreground", group: "Core interface" },
  { property: "--card", label: "Card", group: "Core interface" },
  {
    property: "--card-foreground",
    label: "Card foreground",
    group: "Core interface",
  },
  { property: "--popover", label: "Popover", group: "Core interface" },
  {
    property: "--popover-foreground",
    label: "Popover foreground",
    group: "Core interface",
  },
  { property: "--primary", label: "Primary", group: "Core interface" },
  {
    property: "--primary-foreground",
    label: "Primary foreground",
    group: "Core interface",
  },
  { property: "--secondary", label: "Secondary", group: "Core interface" },
  {
    property: "--secondary-foreground",
    label: "Secondary foreground",
    group: "Core interface",
  },
  { property: "--muted", label: "Muted", group: "Core interface" },
  {
    property: "--muted-foreground",
    label: "Muted foreground",
    group: "Core interface",
  },
  { property: "--accent", label: "Accent", group: "Core interface" },
  {
    property: "--accent-foreground",
    label: "Accent foreground",
    group: "Core interface",
  },
  { property: "--destructive", label: "Destructive", group: "Core interface" },
  { property: "--border", label: "Border", group: "Core interface" },
  { property: "--input", label: "Input", group: "Core interface" },
  { property: "--ring", label: "Ring", group: "Core interface" },
  { property: "--chart-1", label: "Chart 1", group: "Charts" },
  { property: "--chart-2", label: "Chart 2", group: "Charts" },
  { property: "--chart-3", label: "Chart 3", group: "Charts" },
  { property: "--chart-4", label: "Chart 4", group: "Charts" },
  { property: "--chart-5", label: "Chart 5", group: "Charts" },
  { property: "--sidebar", label: "Sidebar", group: "Sidebar" },
  {
    property: "--sidebar-foreground",
    label: "Sidebar foreground",
    group: "Sidebar",
  },
  {
    property: "--sidebar-primary",
    label: "Sidebar primary",
    group: "Sidebar",
  },
  {
    property: "--sidebar-primary-foreground",
    label: "Sidebar primary foreground",
    group: "Sidebar",
  },
  {
    property: "--sidebar-accent",
    label: "Sidebar accent",
    group: "Sidebar",
  },
  {
    property: "--sidebar-accent-foreground",
    label: "Sidebar accent foreground",
    group: "Sidebar",
  },
  { property: "--sidebar-border", label: "Sidebar border", group: "Sidebar" },
  { property: "--sidebar-ring", label: "Sidebar ring", group: "Sidebar" },
] as const;

export type SemanticColorToken = (typeof SEMANTIC_COLOR_TOKENS)[number]["property"];
export type SemanticColorMap = Partial<Record<SemanticColorToken, string>>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isSemanticColorToken(value: unknown): value is SemanticColorToken {
  return (
    typeof value === "string" &&
    SEMANTIC_COLOR_TOKENS.some((token) => token.property === value)
  );
}

export function isValidSemanticColor(value: unknown): value is string {
  return typeof value === "string" && SEMANTIC_COLOR_HEX_PATTERN.test(value);
}

export function sanitizeSemanticColorMap(input: unknown): SemanticColorMap {
  if (!isRecord(input)) return {};

  const safeColors: SemanticColorMap = {};
  for (const { property } of SEMANTIC_COLOR_TOKENS) {
    const value = input[property];
    if (isValidSemanticColor(value)) {
      safeColors[property] = value.toLowerCase();
    }
  }
  return safeColors;
}

export function parseStoredSemanticColors(rawValue: string | null): SemanticColorMap {
  if (!rawValue) return {};

  try {
    return sanitizeSemanticColorMap(JSON.parse(rawValue) as unknown);
  } catch {
    return {};
  }
}

export function createRandomSemanticColorMap(): SemanticColorMap {
  const colors: SemanticColorMap = {};

  for (const { property } of SEMANTIC_COLOR_TOKENS) {
    const bytes = new Uint8Array(3);
    if (typeof globalThis.crypto?.getRandomValues === "function") {
      globalThis.crypto.getRandomValues(bytes);
    } else {
      bytes[0] = Math.floor(Math.random() * 256);
      bytes[1] = Math.floor(Math.random() * 256);
      bytes[2] = Math.floor(Math.random() * 256);
    }

    colors[property] = `#${Array.from(bytes, (byte) =>
      byte.toString(16).padStart(2, "0")
    ).join("")}`;
  }

  return colors;
}
