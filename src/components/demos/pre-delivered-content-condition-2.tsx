"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { Download, Lock, Play } from "lucide-react";

/*
 * Pre-Delivered Content — Condition 2: Visual Density of Locked-Content Badges
 *
 * Thesis: the algorithm scans the rendered interface for locked-content
 * indicators — padlock icons, "Purchase to Unlock" overlays, greyed-out
 * premium tiles. The feature triggers if the volumetric density of
 * locked-versus-accessible content nodes exceeds a threshold:
 *
 *   |{n ∈ N : IsLocked(n)}| / |{n ∈ N : IsAccessible(n)}| > τ_locked_ratio
 *
 * Variant A (dark): 12 of 14 hub tiles are locked — padlocks over data
 * that is already on the user's disk — so locked nodes visually dominate
 * the interface (ratio 6.0 > τ).
 * Variant B (benign): the same 14 tiles, but only 2 are non-accessible,
 * and those two are genuinely not installed yet (downloadable, not
 * paywalled) — ratio 0.17 < τ.
 */

const HUB_ITEMS = [
  "Campaign: Core",
  "Campaign: Ember Sector",
  "4K Texture Pack",
  "Multiplayer Arena Maps",
  "Ship Skins: Neon",
  "Ship Skins: Retro",
  "Soundtrack",
  "Digital Art Book",
  "Expansion: Void Campaign",
  "Photo Mode",
  "Companion App",
  "Pilot Suit Pack",
  "Concept Art Gallery",
  "OST Remix Pack",
];

// Variant A: locked = 12 tiles, accessible = 2 (Campaign: Core, Photo Mode).
const DARK_LOCKED = new Set([1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13]);
// Variant B: genuinely absent from disk = 2 (4K Texture Pack, Void Campaign).
const BENIGN_LOCKED = new Set([2, 8]);

export function PreDeliveredContentCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [clicked, setClicked] = React.useState<string | null>(null);
  const [clicks, setClicks] = React.useState(0);

  const reset = () => {
    setClicked(null);
    setClicks(0);
  };

  const handleClick = (name: string, locked: boolean) => {
    setClicked(name);
    if (locked) setClicks((c) => c + 1);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|Locked| / |Accessible| (A)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">12 / 2</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Locked ratio (A)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">6.0 &gt; τ_locked_ratio</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Locked ratio (B)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">0.17 &lt; τ</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Locked tiles clicked</span>
        <span className="font-mono font-semibold tabular-nums">{clicks}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pre-Delivered Content: Visual Density of Locked-Content Badges"
      caption="Visual Density of Locked-Content Badges — locked-versus-accessible node density makes the interface visually dominated by assets the user already hosts but cannot access."
      auditorStats={stats}
      deltaNote="Variant A locks 12 of 14 tiles — padlocks on content already delivered to disk (ratio 6.0 > τ). Variant B leaves the same 14 tiles unlocked; only 2 are non-accessible, and those are genuinely absent from the device and downloadable (ratio 0.17 < τ)."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">Nebula Drift — Content Hub</h3>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                12 of 14 playable
              </span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Everything is installed and ready — except two add-ons that were never downloaded.
            </p>

            <div className="mt-3 grid grid-cols-3 gap-1.5">
              {HUB_ITEMS.map((name) => {
                const isLocked = BENIGN_LOCKED.has(HUB_ITEMS.indexOf(name));
                return (
                  <button
                    key={name}
                    onClick={() => handleClick(name, isLocked)}
                    className={`flex flex-col items-start gap-1 rounded-md border p-1.5 text-left transition-colors cursor-pointer ${
                      isLocked
                        ? "border-border bg-background hover:border-green-500/40"
                        : "border-green-500/20 bg-green-500/5 hover:border-green-500/40"
                    }`}
                  >
                    {isLocked ? (
                      <Download className="size-3 text-green-600 dark:text-green-400" />
                    ) : (
                      <Play className="size-3 text-green-600 dark:text-green-400" />
                    )}
                    <span className="text-[8px] leading-tight text-foreground/80">{name}</span>
                    <span className="text-[7px] font-mono uppercase tracking-wider text-muted-foreground/60">
                      {isLocked ? "Download" : "Ready"}
                    </span>
                  </button>
                );
              })}
            </div>

            {clicked && (
              <div className="mt-3 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {BENIGN_LOCKED.has(HUB_ITEMS.indexOf(clicked)) ? "Genuinely not installed" : "Ready to play"}
                </div>
                <p className="text-muted-foreground mt-0.5">
                  {BENIGN_LOCKED.has(HUB_ITEMS.indexOf(clicked))
                    ? `“${clicked}” is the only legitimate case for a lock: the data is truly absent from your device (IsLocal = False), so it is downloadable — not paywalled.`
                    : `“${clicked}” is installed and accessible — IsLocked(n) = False. No padlock decorates content you already own.`}
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[11px] font-semibold">Nebula Drift — Content Hub</h3>
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              12 locked
            </span>
          </div>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Padlocks cover most of the hub — every one of them sits on data already written to your disk during install.
          </p>

          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {HUB_ITEMS.map((name) => {
              const isLocked = DARK_LOCKED.has(HUB_ITEMS.indexOf(name));
              return (
                <button
                  key={name}
                  onClick={() => handleClick(name, isLocked)}
                  className={`flex flex-col items-start gap-1 rounded-md border p-1.5 text-left transition-colors cursor-pointer ${
                    isLocked
                      ? "border-red-500/25 bg-background hover:border-red-500/50"
                      : "border-border bg-background hover:border-foreground/40"
                  }`}
                >
                  {isLocked ? (
                    <Lock className="size-3 text-red-500" />
                  ) : (
                    <Play className="size-3 text-foreground/60" />
                  )}
                  <span className={`text-[8px] leading-tight ${isLocked ? "text-foreground/50" : "text-foreground/80"}`}>{name}</span>
                  <span className={`text-[7px] font-mono uppercase tracking-wider ${isLocked ? "text-red-500/80" : "text-muted-foreground/60"}`}>
                    {isLocked ? "Unlock — $7.99" : "Play"}
                  </span>
                </button>
              );
            })}
          </div>

          {clicked && (
            <div className="mt-3 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                {DARK_LOCKED.has(HUB_ITEMS.indexOf(clicked)) ? "Padlock over hosted data" : "Accessible node"}
              </div>
              <p className="text-muted-foreground">
                {DARK_LOCKED.has(HUB_ITEMS.indexOf(clicked))
                  ? `“${clicked}” is already in your install directory (IsLocal = True) — the padlock is a paywall over data you host. IsLocked(n) = True on 12 of 14 nodes, so the hub is visually dominated by locked content: 12/2 = 6.0 > τ_locked_ratio.`
                  : `“${clicked}” is one of only 2 accessible nodes — the lone islands of usable content in a sea of padlocks.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
