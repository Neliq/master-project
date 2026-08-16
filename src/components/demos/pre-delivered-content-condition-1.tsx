"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { Download, HardDrive, Lock } from "lucide-react";

/*
 * Pre-Delivered Content — Condition 1: Unconsented Local Storage Consumption
 *
 * Thesis: the provider covertly injects premium, locked assets into the
 * user's storage architecture without authorization, permanently consuming
 * capacity as a hidden cost of the baseline installation:
 *
 *   C_premium ⊆ S_local  given  E_consent = ∅  ∧  Size(C_premium) ≫ 0
 *
 * Variant A (dark): the installer silently pre-loads 5.0 GB of premium,
 * locked content onto the user's disk. No consent is ever requested
 * (E_consent = ∅), and the gigabytes are then paywalled.
 * Variant B (benign): pre-loading premium content requires an explicit
 * consent checkbox — unchecked by default — so nothing extra is written
 * to disk unless the user asks for it.
 */

const BASE_GAME_GB = 18.4;
const PREMIUM_GB = 5.0; // 3.2 GB 4K texture pack + 1.8 GB Void Campaign expansion
const FREE_BEFORE_GB = 120.0;

export function PreDeliveredContentCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [phase, setPhase] = React.useState<"idle" | "installing" | "done">("idle");
  const [consent, setConsent] = React.useState(false);
  const [unlocked, setUnlocked] = React.useState(false);

  const reset = () => {
    setPhase("idle");
    setConsent(false);
    setUnlocked(false);
  };

  React.useEffect(() => {
    if (phase !== "installing") return;
    const id = window.setTimeout(() => setPhase("done"), 1400);
    return () => window.clearTimeout(id);
  }, [phase]);

  // Variant A always absorbs the premium payload; Variant B only if consented.
  const darkFreeAfter = FREE_BEFORE_GB - BASE_GAME_GB - PREMIUM_GB;
  const benignFreeAfter = FREE_BEFORE_GB - BASE_GAME_GB - (consent ? PREMIUM_GB : 0);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Size(C_premium)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">5.0 GB ≫ 0</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">E_consent (A)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">∅ — never asked</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">E_consent (B)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{consent ? "explicit ✓" : "∅ (checkbox off)"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Free space after install (A)</span>
        <span className="font-mono font-semibold tabular-nums">{darkFreeAfter.toFixed(1)} GB</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pre-Delivered Content: Unconsented Local Storage Consumption"
      caption="Unconsented Local Storage Consumption — premium assets are forced onto the user's disk without any explicit consent request, permanently consuming capacity."
      auditorStats={stats}
      deltaNote="In Variant A the installer writes 5.0 GB of premium, locked content to the disk with E_consent = ∅, then paywalls it. In Variant B the same payload is only pre-loaded after an explicit, unchecked-by-default consent checkbox, so the user's favorable action (hosting nothing extra) is easy and fair."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-[11px] font-semibold">Nebula Drift: Commander&rsquo;s Edition</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Installer — {BASE_GAME_GB} GB base game
                </p>
              </div>
              <Download className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            </div>

            {/* Consent gate — the entire point of Variant B */}
            <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 flex-shrink-0 accent-emerald-500"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  Pre-load premium add-ons now (5.0 GB — 4K texture pack + Void Campaign expansion)
                </div>
                <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                  Off by default. These assets stay off your disk until you ask for them.
                </div>
              </div>
            </label>

            {/* Storage meter */}
            <div className="mt-3 flex items-center gap-2 text-[9px] text-muted-foreground">
              <HardDrive className="size-3 shrink-0" />
              <span>{FREE_BEFORE_GB.toFixed(1)} GB free</span>
              <span className="font-mono tabular-nums">→</span>
              <span className="font-mono font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
                {benignFreeAfter.toFixed(1)} GB free
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${((FREE_BEFORE_GB - benignFreeAfter) / FREE_BEFORE_GB) * 100}%` }}
              />
            </div>

            {phase === "idle" && (
              <button
                onClick={() => setPhase("installing")}
                className="mt-3 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Install game ({BASE_GAME_GB} GB)
              </button>
            )}
            {phase === "installing" && (
              <div className="mt-3 w-full rounded-md bg-muted py-1.5 text-center text-[10px] font-medium text-muted-foreground">
                <span className="inline-block animate-pulse">Writing files…</span>
              </div>
            )}
            {phase === "done" && (
              <div className="mt-3 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Install complete
                </div>
                <p className="text-muted-foreground mt-0.5">
                  {consent
                    ? `Base game + premium add-ons installed (${(BASE_GAME_GB + PREMIUM_GB).toFixed(1)} GB). The 5.0 GB of premium content was written only because you checked the box — E_consent = {explicit}.`
                    : `Base game installed (${BASE_GAME_GB} GB). No locked premium data exists on your disk — E_consent = ∅ and Size(C_premium) = 0.`}
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-[11px] font-semibold">Nebula Drift: Commander&rsquo;s Edition</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Installer — {BASE_GAME_GB} GB base game
              </p>
            </div>
            <Download className="size-3.5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          </div>

          {/* No consent gate exists here — nothing to toggle */}
          <div className="mt-3 rounded-md border border-border bg-background p-2.5 text-[9px] text-muted-foreground/70">
            <span className="text-[8px] uppercase tracking-wider font-semibold">End User License Agreement</span>
            <p className="mt-0.5">
              By installing, you agree that the installer may place optional premium content files on your device for faster access.
            </p>
            <p className="text-[8px] text-muted-foreground/40 mt-0.5">
              (There is no checkbox — the payload is written regardless.)
            </p>
          </div>

          {/* Storage meter */}
          <div className="mt-3 flex items-center gap-2 text-[9px] text-muted-foreground">
            <HardDrive className="size-3 shrink-0" />
            <span>{FREE_BEFORE_GB.toFixed(1)} GB free</span>
            <span className="font-mono tabular-nums">→</span>
            <span className="font-mono font-semibold tabular-nums text-rose-600 dark:text-rose-400">
              {darkFreeAfter.toFixed(1)} GB free
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-rose-500 transition-all duration-700"
              style={{ width: `${((FREE_BEFORE_GB - darkFreeAfter) / FREE_BEFORE_GB) * 100}%` }}
            />
          </div>

          {phase === "idle" && (
            <button
              onClick={() => setPhase("installing")}
              className="mt-3 w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Install game ({BASE_GAME_GB} GB)
            </button>
          )}
          {phase === "installing" && (
            <div className="mt-3 w-full rounded-md bg-muted py-1.5 text-center text-[10px] font-medium text-muted-foreground">
              <span className="inline-block animate-pulse">Writing files…</span>
            </div>
          )}
          {phase === "done" && (
            <>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-1.5">
                  <div className="flex items-center gap-1.5 text-[9px]">
                    <Lock className="size-3 text-rose-500" />
                    <span>4K Texture Pack</span>
                    <span className="text-muted-foreground font-mono">3.2 GB</span>
                  </div>
                  <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-1.5 py-0.5">Locked</span>
                </div>
                <div className="flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-1.5">
                  <div className="flex items-center gap-1.5 text-[9px]">
                    <Lock className="size-3 text-rose-500" />
                    <span>Expansion: Void Campaign</span>
                    <span className="text-muted-foreground font-mono">1.8 GB</span>
                  </div>
                  <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-1.5 py-0.5">Locked</span>
                </div>
              </div>
              <button
                onClick={() => setUnlocked(true)}
                className="mt-2 w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Unlock premium content — $9.99
              </button>
            </>
          )}
        </div>

        {phase === "done" && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Unconsented storage consumption
            </div>
            <p className="text-muted-foreground">
              <strong className="text-foreground">C_premium ⊆ S_local</strong> with <strong className="text-rose-500">E_consent = ∅</strong> — the
              installer wrote 5.0 GB of premium assets to your disk as part of the baseline install, with no consent request.
              Size(C_premium) = 5.0 GB ≫ 0: your storage was consumed as a hidden cost.
            </p>
            <p className="text-muted-foreground">
              {unlocked
                ? "You just paid $9.99 to unlock data that is already on your machine — the storage cost was extracted first, the payment second."
                : "Those gigabytes are now paywalled: the interface asks you to pay for access to data you were forced to host yourself."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
