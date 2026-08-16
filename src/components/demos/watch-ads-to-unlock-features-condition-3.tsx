"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Watch Ads To Unlock Features Or Get Rewards — Condition 3:
 * Semantic Inflation of Reward Value
 *
 * Thesis: the algorithm compares the semantic framing of the advertised
 * reward against its actual in-application utility. The feature triggers
 * if the descriptive language uses superlative or hyperbolic modifiers
 * ("amazing", "exclusive", "premium") while the actual reward has an
 * objectively quantifiable low value (e.g. a cosmetic item with zero
 * functional impact), quantified as a hype-utility divergence:
 *
 *   Hyperbole(T_reward) − Utility(R_actual) > τ_hype_gap
 *
 * Variant A (dark): the crate is advertised as "LEGENDARY", "EXCLUSIVE",
 * "AMAZING" with an "ultra-rare loot" claim; opening it yields a single
 * cosmetic sticker with zero gameplay impact, and the "cosmetic only"
 * fine print is buried.
 * Variant B (benign): the identical crate and item, described exactly as
 * they are: one cosmetic sticker, no gameplay effect.
 */

const AD_SECONDS = 4;

export function WatchAdsToUnlockFeaturesCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [adState, setAdState] = React.useState<"idle" | "watching" | "done">("idle");
  const [adLeft, setAdLeft] = React.useState(AD_SECONDS);
  const [crateOpened, setCrateOpened] = React.useState(false);

  const reset = () => {
    setAdState("idle");
    setAdLeft(AD_SECONDS);
    setCrateOpened(false);
  };

  const watching = adState === "watching";

  React.useEffect(() => {
    if (!watching) return;
    const id = window.setInterval(() => {
      setAdLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [watching]);

  React.useEffect(() => {
    if (!(watching && adLeft === 0)) return;
    // Deferred so the transition is not a synchronous setState in the effect body.
    const t = window.setTimeout(() => setAdState("done"), 250);
    return () => window.clearTimeout(t);
  }, [watching, adLeft]);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Hyperbole(T_reward)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">0.95</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Utility(R_actual)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">0.00 (cosmetic)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Hype gap</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">0.95 &gt; τ_hype_gap</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_hype_gap</span>
        <span className="font-mono font-semibold tabular-nums">0.30</span>
      </div>
    </>
  ) : null;

  const renderItemReveal = (accent: "rose" | "emerald") => {
    const isDark = accent === "rose";
    return (
      <div className={`mt-2 rounded-md border p-2.5 text-[9px] leading-relaxed ${
        isDark ? "border-amber-500/30 bg-amber-500/5" : "border-emerald-500/30 bg-emerald-500/5"
      }`}>
        <div className={`flex items-center gap-1.5 font-semibold uppercase tracking-tight ${
          isDark ? "text-amber-700 dark:text-amber-300" : "text-emerald-700 dark:text-emerald-300"
        }`}>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {isDark ? <path d="M12 3l1.9 5.7L20 10l-5 4 1.5 7L12 17.5 7.5 21 9 14l-5-4 6.1-1.3L12 3z" /> : <path d="M20 6L9 17l-5-5" />}
          </svg>
          {isDark ? "Crate contents revealed" : "Crate contents revealed — as advertised"}
        </div>
        <div className="mt-1.5 rounded-md border border-border bg-background p-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-amber-100 dark:bg-amber-900/30">
              <svg className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold">
                {isDark ? "★ LEGENDARY Ultra-Rare ★" : "Common sticker"} — Star
              </div>
              <div className="text-[8px] text-muted-foreground">
                Cosmetic item · Functional impact: <span className="font-mono">0</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground mt-1.5">
          {isDark ? (
            <>The crate promised <strong className="text-foreground">“legendary”, “exclusive”, “amazing”</strong> loot —
            the item is a sticker with zero gameplay effect. The fine print (“cosmetic only”) was
            deliberately buried. Hyperbole(T_reward) = 0.95 vs Utility(R_actual) = 0.00: the hype gap
            of 0.95 far exceeds τ_hype_gap (0.30).</>
          ) : (
            <>The storefront described the sticker exactly as it is — cosmetic only, no gameplay
            effect — so the item matched its description. Hyperbole(T_reward) = 0.00, gap = 0.00 ≤ τ.</>
          )}
        </p>
      </div>
    );
  };

  const renderCratePanel = (accent: "rose" | "emerald") => {
    const isDark = accent === "rose";
    return (
      <div className={`rounded-md border p-3 ${isDark ? "border-amber-500/40 bg-amber-500/5" : "border-emerald-500/30 bg-emerald-500/5"}`}>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h3 className={`text-[11px] font-bold ${isDark ? "text-amber-700 dark:text-amber-300" : "text-foreground"}`}>
              {isDark ? "★ EXCLUSIVE ★ AMAZING ★ PREMIUM LEGENDARY CRATE" : "Common crate — 1 cosmetic sticker"}
            </h3>
            <p className={`text-[9px] mt-0.5 ${isDark ? "text-amber-700/70 dark:text-amber-200/70" : "text-muted-foreground"}`}>
              {isDark
                ? "Contains legendary ultra-rare loot! 0.01% drop rate! Watch one ad to open it FREE!"
                : "Contains one cosmetic sticker (no gameplay effect). Watch one ad to open it free."}
            </p>
          </div>
          <div className={`text-[8px] font-mono font-bold uppercase tracking-wider rounded-full border px-2 py-0.5 shrink-0 ${
            isDark ? "text-amber-600 dark:text-amber-300 border-amber-500/40" : "text-muted-foreground border-border"
          }`}>
            {isDark ? "Mythic" : "Common"}
          </div>
        </div>

        {adState === "idle" && (
          <button
            onClick={() => {
              setAdState("watching");
              setAdLeft(AD_SECONDS);
            }}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
              isDark
                ? "bg-amber-500 hover:bg-amber-600 text-white"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            Watch 1 ad to open ({AD_SECONDS}s)
          </button>
        )}

        {watching && (
          <div className="mt-3 rounded-md border border-border bg-card p-2">
            <div className="flex items-center justify-between text-[8px] font-mono tabular-nums text-muted-foreground">
              <span>Ad</span>
              <span className={isDark ? "text-amber-500" : "text-emerald-500"}>0:0{Math.max(0, adLeft)}</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${isDark ? "bg-amber-500" : "bg-emerald-500"}`}
                style={{ width: `${((AD_SECONDS - adLeft) / AD_SECONDS) * 100}%` }}
              />
            </div>
          </div>
        )}

        {adState === "done" && !crateOpened && (
          <button
            onClick={() => setCrateOpened(true)}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-bold transition-colors cursor-pointer ${
              isDark
                ? "bg-amber-500 hover:bg-amber-600 text-white"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            Open crate
          </button>
        )}

        {crateOpened && renderItemReveal(accent)}
      </div>
    );
  };

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Watch Ads To Unlock Features Or Get Rewards: Semantic Inflation of Reward Value"
      caption="Semantic Inflation of Reward Value — hyperbolic storefront language sells a reward whose real utility is zero."
      auditorStats={stats}
      deltaNote="Both crates cost the same 4-second ad and contain the identical item — a cosmetic Star Sticker with zero gameplay impact. Variant A advertises it with superlatives ('LEGENDARY', 'EXCLUSIVE', 'AMAZING') and buries the 'cosmetic only' fine print; Variant B describes the sticker exactly as it is, so the hype-utility gap is zero."
      benign={
        <div className="space-y-3">{renderCratePanel("emerald")}</div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">{renderCratePanel("rose")}</div>
    </DemoShell>
  );
}
