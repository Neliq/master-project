"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Pay To Avoid — Condition 1: Artificial State Degradation
 *
 * Thesis: the system suppresses the user's experience far below its
 * technical capacity by injecting deliberate friction elements
 * (watermarks, speed throttling) into the default state, then demands
 * payment solely to restore the baseline:
 *
 *   U_default = U_system − D_artificial  ∧  U_default ≪ U_system
 *
 * Variant A (dark): the free download is throttled to 40 KB/s, exports
 * are watermarked and an interstitial ad is queued. The $3.99/mo plan
 * is sold as *removing* that degradation — paying for the cessation of
 * algorithmic hostility.
 * Variant B (benign): the free tier runs at full capacity with no
 * watermark and no injected ads. The same $3.99/mo plan adds genuinely
 * new features (cloud storage, auto-sync) instead of restoring a broken
 * baseline.
 */

const U_SYSTEM = "18 MB/s";
const U_DEFAULT_DARK = "40 KB/s";

export function PayToAvoidCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [planA, setPlanA] = React.useState<"free" | "paid">("free");
  const [planB, setPlanB] = React.useState<"free" | "paid">("free");
  const [downloadingA, setDownloadingA] = React.useState(false);
  const [downloadingB, setDownloadingB] = React.useState(false);
  const [progressA, setProgressA] = React.useState(0);
  const [progressB, setProgressB] = React.useState(0);

  const reset = () => {
    setPlanA("free");
    setPlanB("free");
    setDownloadingA(false);
    setDownloadingB(false);
    setProgressA(0);
    setProgressB(0);
  };

  // Shared crawl: dark+free throttled, paid/benign fast. The interval is
  // variant-agnostic; the increment encodes the injected friction.
  React.useEffect(() => {
    if (!downloadingA && !downloadingB) return;
    const id = window.setInterval(() => {
      if (downloadingA) {
        setProgressA((p) => Math.min(100, p + (planA === "free" ? 0.8 : 8)));
      }
      if (downloadingB) {
        setProgressB((p) => Math.min(100, p + (planB === "free" ? 0.8 : 8)));
      }
    }, 300);
    return () => window.clearInterval(id);
  }, [downloadingA, downloadingB, planA, planB]);

  const darkDegraded = planA === "free";
  const ratio = planA === "free" ? 0.002 : 1.0;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">U_system (capacity)</span>
        <span className="font-mono font-semibold tabular-nums">{U_SYSTEM}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">U_default (free tier)</span>
        <span className={`font-mono font-semibold tabular-nums ${darkDegraded ? "text-red-500" : "text-green-500"}`}>
          {darkDegraded ? U_DEFAULT_DARK : U_SYSTEM}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">D_artificial</span>
        <span className={`font-mono font-semibold tabular-nums max-w-[55%] truncate text-right ${darkDegraded ? "text-red-500" : "text-green-500"}`}>
          {darkDegraded ? "{throttle, watermark, ad}" : "∅ (none)"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">U_default / U_system</span>
        <span className={`font-mono font-semibold tabular-nums ${darkDegraded ? "text-red-500" : "text-green-500"}`}>
          {ratio.toFixed(3)} {darkDegraded ? "(≪ 1)" : "(= 1)"}
        </span>
      </div>
    </>
  ) : null;

  const renderDownloadPanel = (accent: "rose" | "emerald") => {
    const isDark = accent === "rose";
    const plan = isDark ? planA : planB;
    const downloading = isDark ? downloadingA : downloadingB;
    const progress = isDark ? progressA : progressB;
    const setPlan = isDark ? setPlanA : setPlanB;
    const setDownloading = isDark ? setDownloadingA : setDownloadingB;
    const setProgress = isDark ? setProgressA : setProgressB;
    const degraded = isDark && plan === "free";
    return (
      <div className="rounded-md border bg-card p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[11px] font-semibold">SwiftDrop — city-map-project.zip</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              {isDark
                ? "Free plan: 40 KB/s, watermarked preview, 1 interstitial ad queued."
                : "Free plan: full speed, clean exports. Upgrade adds features, not fixes."}
            </p>
          </div>
          <div className={`text-[8px] font-mono font-semibold uppercase tracking-wider rounded-full border px-2 py-0.5 shrink-0 ${
            isDark
              ? "text-red-500 border-red-500/30"
              : "text-green-500 border-green-500/30"
          }`}>
            {plan === "paid" ? "Paid plan" : "Free plan"}
          </div>
        </div>

        {/* Preview with (dark-only) watermark */}
        <div className="relative mt-3 overflow-hidden rounded-md border border-border bg-muted aspect-video flex items-center justify-center">
        <svg viewBox="0 0 320 130" className="h-full w-full" role="img" aria-label="City map preview">
          <path d="M0 28h320M0 76h320M62 0v130M190 0v130" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="10" />
          <path d="M12 112C62 86 76 42 132 55s61 54 112 24 42-40 64-57" className="fill-none stroke-primary" strokeWidth="4" />
          <circle cx="132" cy="55" r="7" className="fill-primary" />
          <circle cx="245" cy="79" r="7" className="fill-emerald-500" />
        </svg>
        <div className="absolute bottom-2 left-2 rounded bg-background/85 px-1.5 py-0.5 text-[8px] font-semibold text-foreground">Downtown route · 12 stops</div>
          {degraded && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-[16px] font-black uppercase tracking-widest text-red-500/40 -rotate-12 select-none">
                SwiftDrop watermark
              </div>
            </div>
          )}
          {degraded && (
            <div className="absolute bottom-1 left-1 text-[8px] font-mono uppercase tracking-wider bg-red-500/15 text-red-600 dark:text-red-300 rounded px-1.5 py-0.5">
              non-removable watermark (free)
            </div>
          )}
        </div>

        {/* Download controls */}
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between text-[8px] font-mono tabular-nums text-muted-foreground">
            <span>{downloading ? (degraded ? "↓ 40 KB/s" : "↓ 18 MB/s") : "idle"}</span>
            <span className={degraded ? "text-red-500" : "text-green-500"}>{Math.floor(progress)}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-200 ${
                degraded ? "bg-red-500" : "bg-green-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setDownloading((d) => !d)}
              className={`flex-1 rounded-md py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
                isDark
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {downloading ? "Pause" : "Download (free plan)"}
            </button>
            {mode === "auditor" && (
              <button
                onClick={() => setProgress((p) => Math.min(100, p + 20))}
                disabled={!downloading || progress >= 100}
                className="rounded-md bg-muted hover:bg-muted/70 text-foreground/70 px-2 py-1.5 text-[9px] font-medium transition-colors cursor-pointer disabled:opacity-50"
              >
                Fast-forward +20%
              </button>
            )}
          </div>
          {degraded && (
            <div className="text-[8px] text-red-500/90 leading-relaxed">
              Free plan · Includes ads and standard download speeds
            </div>
          )}
          {!isDark && !degraded && (
            <div className="text-[8px] text-green-600 dark:text-green-400 leading-relaxed">
              The free download runs at the full available speed. It only stops when you pause it yourself.
            </div>
          )}
        </div>

        {/* Upgrade card */}
        <div className={`mt-3 rounded-md border p-2.5 ${isDark ? "border-yellow-500/30 bg-yellow-500/5" : "border-green-500/30 bg-green-500/5"}`}>
          <div className="text-[10px] font-semibold">
            {isDark ? "Remove engineered friction — $3.99/mo" : "Upgrade for extra features — $3.99/mo"}
          </div>
          <p className="text-[8px] text-muted-foreground mt-0.5 leading-relaxed">
            {isDark
              ? "Restore full 18 MB/s speed, remove watermarks, and stop the interstitial ad."
              : "2 TB cloud storage, auto-sync, and priority support. The free plan is not throttled or watermarked — nothing is taken away to sell you."}
          </p>
          <button
            onClick={() => setPlan("paid")}
            disabled={plan === "paid"}
            className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              plan === "paid"
                ? "bg-muted text-muted-foreground/50 cursor-default"
                : isDark
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer"
                  : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            }`}
          >
            {plan === "paid" ? "Upgrade applied ✓" : "Pay $3.99/mo"}
          </button>
        </div>

        {plan === "paid" && (
          <div className={`mt-2 rounded-md border p-2.5 text-[9px] leading-relaxed ${
            isDark ? "border-green-500/30 bg-green-500/5" : "border-green-500/30 bg-green-500/5"
          }`}>
            <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {isDark ? "Degradation removed — U_default restored" : "Features added — baseline untouched"}
            </div>
            <p className="text-muted-foreground mt-0.5">
              {isDark
                ? "The download now runs at full 18 MB/s with no watermark. The upgrade restores the experience shown in the preview."
                : "The free tier already ran at full speed. The upgrade adds cloud storage, auto-sync, and priority support."}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pay To Avoid: Artificial State Degradation"
      userTitle="SwiftDrop — Download"
      caption="Artificial State Degradation — the software is throttled and watermarked below its own capacity, and payment only restores the baseline."
      auditorStats={stats}
      deltaNote="Both variants offer the same $3.99/mo plan for the same app. Variant A first artificially degrades the free tier (40 KB/s throttle, watermark, queued ad) and sells the upgrade as removing that degradation — paying for the cessation of hostility. Variant B never degrades anything: the free tier runs at full capacity and the upgrade adds genuinely new features."
      benign={
        <div className="space-y-3">{renderDownloadPanel("emerald")}</div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">{renderDownloadPanel("rose")}</div>
    </DemoShell>
  );
}
