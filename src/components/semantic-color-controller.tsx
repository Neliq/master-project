"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  createRandomSemanticColorMap,
  isSemanticColorToken,
  isValidSemanticColor,
  parseStoredSemanticColors,
  sanitizeSemanticColorMap,
  SEMANTIC_COLOR_STORAGE_KEY,
  SEMANTIC_COLOR_TOKENS,
  type SemanticColorMap,
  type SemanticColorToken,
} from "@/lib/semantic-colors";

const FALLBACK_COLOR = "#000000";

type SemanticColorValues = Record<SemanticColorToken, string>;

type SemanticColorContextValue = {
  colors: SemanticColorValues;
  overrides: SemanticColorMap;
  ready: boolean;
  setColor: (token: SemanticColorToken, value: string) => void;
  shuffle: () => void;
  revert: () => void;
};

const SemanticColorContext = createContext<SemanticColorContextValue | null>(
  null
);

function createFallbackColors(): SemanticColorValues {
  return Object.fromEntries(
    SEMANTIC_COLOR_TOKENS.map(({ property }) => [property, FALLBACK_COLOR])
  ) as SemanticColorValues;
}

function parseRgbChannel(value: string): number | null {
  const channel = value.trim();
  const parsed = Number.parseFloat(channel);
  if (!Number.isFinite(parsed)) return null;

  if (channel.endsWith("%")) {
    return Math.round(Math.min(100, Math.max(0, parsed)) * 2.55);
  }
  return Math.round(Math.min(255, Math.max(0, parsed)));
}

function toHexChannel(channel: number): string {
  return Math.round(Math.min(1, Math.max(0, channel)) * 255)
    .toString(16)
    .padStart(2, "0");
}

function parseRgbColor(color: string): string | null {
  if (!/^rgba?\(/i.test(color)) return null;

  const channels = color
    .replace(/^rgba?\((.*)\)$/i, "$1")
    .split(/[,\s/]+/)
    .filter(Boolean)
    .slice(0, 3)
    .map(parseRgbChannel);
  if (channels.length !== 3 || channels.some((channel) => channel === null)) {
    return null;
  }

  return `#${channels
    .map((channel) => channel!.toString(16).padStart(2, "0"))
    .join("")}`;
}

function parseLabChannel(value: string, percentageScale: number): number | null {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) return null;
  return value.trim().endsWith("%") ? (parsed / 100) * percentageScale : parsed;
}

function labToHex(color: string): string | null {
  if (!/^lab\(/i.test(color)) return null;

  const channels = color
    .replace(/^lab\((.*)\)$/i, "$1")
    .split(/[,\s/]+/)
    .filter(Boolean)
    .slice(0, 3);
  if (channels.length !== 3) return null;

  const lightness = parseLabChannel(channels[0], 100);
  const a = parseLabChannel(channels[1], 125);
  const b = parseLabChannel(channels[2], 125);
  if (lightness === null || a === null || b === null) return null;

  const epsilon = 216 / 24389;
  const kappa = 24389 / 27;
  const fy = (lightness + 16) / 116;
  const fx = fy + a / 500;
  const fz = fy - b / 200;
  const labInverse = (value: number) =>
    value ** 3 > epsilon ? value ** 3 : (116 * value - 16) / kappa;

  const x50 = 0.96422 * labInverse(fx);
  const y50 = 1 * labInverse(fy);
  const z50 = 0.82521 * labInverse(fz);

  const x = 0.9555766 * x50 - 0.0230393 * y50 + 0.0631636 * z50;
  const y = -0.0282895 * x50 + 1.0099416 * y50 + 0.0210077 * z50;
  const z = 0.0122982 * x50 - 0.020483 * y50 + 1.3299098 * z50;

  const red = 3.2406 * x - 1.5372 * y - 0.4986 * z;
  const green = -0.9689 * x + 1.8758 * y + 0.0415 * z;
  const blue = 0.0557 * x - 0.204 * y + 1.057 * z;
  const gamma = (channel: number) =>
    channel <= 0.0031308
      ? 12.92 * channel
      : 1.055 * channel ** (1 / 2.4) - 0.055;

  return `#${toHexChannel(gamma(red))}${toHexChannel(gamma(green))}${toHexChannel(gamma(blue))}`;
}

function cssColorToHex(value: string): string | null {
  if (isValidSemanticColor(value)) return value.toLowerCase();
  if (!value || !document.body) return null;

  const probe = document.createElement("span");
  probe.style.color = value;
  if (!probe.style.color) return null;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  document.body.append(probe);

  const computedColor = window.getComputedStyle(probe).color;
  probe.remove();

  return parseRgbColor(computedColor) ?? labToHex(computedColor);
}

function readEffectiveColors(): SemanticColorValues {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const colors = Object.fromEntries(
    SEMANTIC_COLOR_TOKENS.map(({ property }) => {
      const value = rootStyles.getPropertyValue(property).trim();
      return [property, cssColorToHex(value) ?? FALLBACK_COLOR];
    })
  );
  return colors as SemanticColorValues;
}

function applySemanticColorOverrides(overrides: SemanticColorMap) {
  const rootStyle = document.documentElement.style;

  for (const { property } of SEMANTIC_COLOR_TOKENS) {
    const value = overrides[property];
    if (isValidSemanticColor(value)) {
      rootStyle.setProperty(property, value);
    } else {
      rootStyle.removeProperty(property);
    }
  }
}

function readStoredColors(): SemanticColorMap {
  try {
    return parseStoredSemanticColors(
      window.localStorage.getItem(SEMANTIC_COLOR_STORAGE_KEY)
    );
  } catch {
    return {};
  }
}

function persistColors(colors: SemanticColorMap) {
  try {
    window.localStorage.setItem(
      SEMANTIC_COLOR_STORAGE_KEY,
      JSON.stringify(sanitizeSemanticColorMap(colors))
    );
  } catch {
    // The live DOM update remains useful when storage is blocked or full.
  }
}

export function SemanticColorController({ children }: { children: ReactNode }) {
  const [colors, setColors] = useState<SemanticColorValues>(createFallbackColors);
  const [overrides, setOverrides] = useState<SemanticColorMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const storedColors = readStoredColors();
    applySemanticColorOverrides(storedColors);
    const effectiveColors = readEffectiveColors();

    queueMicrotask(() => {
      if (cancelled) return;
      setOverrides(storedColors);
      setColors(effectiveColors);
      setReady(true);
    });

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== SEMANTIC_COLOR_STORAGE_KEY) {
        return;
      }

      const nextColors = event.key === null ? {} : parseStoredSemanticColors(event.newValue);
      applySemanticColorOverrides(nextColors);
      setOverrides(nextColors);
      setColors(readEffectiveColors());
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const setColor = useCallback(
    (token: SemanticColorToken, value: string) => {
      if (!isSemanticColorToken(token) || !isValidSemanticColor(value)) return;

      const nextColors = sanitizeSemanticColorMap({
        ...overrides,
        [token]: value,
      });
      applySemanticColorOverrides(nextColors);
      setOverrides(nextColors);
      setColors((currentColors) => ({ ...currentColors, [token]: value }));
      persistColors(nextColors);
    },
    [overrides]
  );

  const shuffle = useCallback(() => {
    const nextColors = createRandomSemanticColorMap();
    applySemanticColorOverrides(nextColors);
    setOverrides(nextColors);
    setColors((currentColors) => ({ ...currentColors, ...nextColors } as SemanticColorValues));
    persistColors(nextColors);
  }, []);

  const revert = useCallback(() => {
    applySemanticColorOverrides({});
    setOverrides({});
    setColors(readEffectiveColors());

    try {
      window.localStorage.removeItem(SEMANTIC_COLOR_STORAGE_KEY);
    } catch {
      // Reverting the live DOM does not depend on localStorage availability.
    }
  }, []);

  const contextValue = useMemo(
    () => ({ colors, overrides, ready, setColor, shuffle, revert }),
    [colors, overrides, ready, setColor, shuffle, revert]
  );

  return (
    <SemanticColorContext.Provider value={contextValue}>
      {children}
    </SemanticColorContext.Provider>
  );
}

export function useSemanticColors(): SemanticColorContextValue {
  const context = useContext(SemanticColorContext);
  if (!context) {
    throw new Error(
      "useSemanticColors must be used inside SemanticColorController"
    );
  }
  return context;
}
