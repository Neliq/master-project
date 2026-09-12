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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [adStateA, setAdStateA] = React.useState<"idle" | "watching" | "done">("idle");
  const [adStateB, setAdStateB] = React.useState<"idle" | "watching" | "done">("idle");
  const [adLeftA, setAdLeftA] = React.useState(AD_SECONDS);
  const [adLeftB, setAdLeftB] = React.useState(AD_SECONDS);
  const [crateOpenedA, setCrateOpenedA] = React.useState(false);
  const [crateOpenedB, setCrateOpenedB] = React.useState(false);


  const watchingA = adStateA === "watching";
  const watchingB = adStateB === "watching";

  React.useEffect(() => {
    if (!watchingA) return;
    const id = window.setInterval(() => {
      setAdLeftA((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [watchingA]);

  React.useEffect(() => {
    if (!watchingB) return;
    const id = window.setInterval(() => {
      setAdLeftB((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [watchingB]);

  React.useEffect(() => {
    if (!(watchingA && adLeftA === 0)) return;
    // Deferred so the transition is not a synchronous setState in the effect body.
    const t = window.setTimeout(() => setAdStateA("done"), 250);
    return () => window.clearTimeout(t);
  }, [watchingA, adLeftA]);

  React.useEffect(() => {
    if (!(watchingB && adLeftB === 0)) return;
    const t = window.setTimeout(() => setAdStateB("done"), 250);
    return () => window.clearTimeout(t);
  }, [watchingB, adLeftB]);

  const renderItemReveal = (accent: "rose" | "emerald") => {
    const isDark = accent === "rose";
    return (
      <div data-dp-result className={`mt-2 rounded-md border p-2.5 text-[9px] leading-relaxed ${
        isDark ? "border-border/60 bg-muted/40" : "border-border/60 bg-muted/40"
      }`}>
        <div className={`flex items-center gap-1.5 font-semibold uppercase tracking-tight ${
          isDark ? "text-foreground" : "text-foreground"
        }`}>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {isDark ? <path d="M12 3l1.9 5.7L20 10l-5 4 1.5 7L12 17.5 7.5 21 9 14l-5-4 6.1-1.3L12 3z" /> : <path d="M20 6L9 17l-5-5" />}
          </svg>
          {isDark ? "Crate contents revealed" : "Crate contents revealed — as advertised"}
        </div>
        <div className="mt-1.5 rounded-md border border-border bg-background p-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted/40">
              <svg className="h-3.5 w-3.5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold">
                {isDark ? "★ LEGENDARY Ultra-Rare ★" : "Common sticker"} — Star
              </div>
              <div className="text-[8px] text-muted-foreground">
                Cosmetic item · No gameplay effect
              </div>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground mt-1.5">
          {isDark ? (
            <>The crate headline promised a legendary surprise, but the item is a Star Sticker. It changes
            your collection only; gameplay stats stay the same.</>
          ) : (
            <>The storefront described the sticker as cosmetic only, so the item matched the product
            description. Your collection has been updated without changing gameplay.</>
          )}
        </p>
      </div>
    );
  };

  const renderCratePanel = (accent: "rose" | "emerald") => {
    const isDark = accent === "rose";
    const panelAdState = isDark ? adStateA : adStateB;
    const panelAdLeft = isDark ? adLeftA : adLeftB;
    const panelCrateOpened = isDark ? crateOpenedA : crateOpenedB;
    const startWatching = () => {
      if (isDark) {
        setAdStateA("watching");
        setAdLeftA(AD_SECONDS);
      } else {
        setAdStateB("watching");
        setAdLeftB(AD_SECONDS);
      }
    };
    const openCrate = () => (isDark ? setCrateOpenedA(true) : setCrateOpenedB(true));
    return (
      <div className={`rounded-md border p-3 ${isDark ? "border-border/60 bg-muted/40" : "border-border/60 bg-muted/40"}`}>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h3 className={`text-[11px] font-bold ${isDark ? "text-foreground" : "text-foreground"}`}>
              {isDark ? "★ EXCLUSIVE ★ AMAZING ★ PREMIUM LEGENDARY CRATE" : "Common crate — 1 cosmetic sticker"}
            </h3>
            <p className={`text-[9px] mt-0.5 ${isDark ? "text-foreground/70" : "text-muted-foreground"}`}>
              {isDark
                ? "Contains legendary ultra-rare loot! 0.01% drop rate! Watch one ad to open it FREE!"
                : "Contains one cosmetic sticker (no gameplay effect). Watch one ad to open it free."}
            </p>
          </div>
          <div className={`text-[8px] font-mono font-bold uppercase tracking-wider rounded-full border px-2 py-0.5 shrink-0 ${
            isDark ? "text-foreground border-border/60" : "text-muted-foreground border-border"
          }`}>
            {isDark ? "Mythic" : "Common"}
          </div>
        </div>

        {panelAdState === "idle" && (
          <button
            onClick={startWatching}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
              isDark
                ? "bg-primary hover:bg-primary/80 text-primary-foreground"
                : "bg-primary hover:bg-primary/80 text-primary-foreground"
            }`}
          >
            Watch 1 ad to open ({AD_SECONDS}s)
          </button>
        )}

        {panelAdState === "watching" && (
          <div className="mt-3 rounded-md border border-border bg-card p-2">
            <div className="flex items-center justify-between text-[8px] font-mono tabular-nums text-muted-foreground">
              <span>Ad</span>
              <span className={isDark ? "text-foreground" : "text-foreground"}>0:0{Math.max(0, panelAdLeft)}</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${isDark ? "bg-primary" : "bg-primary"}`}
                style={{ width: `${((AD_SECONDS - panelAdLeft) / AD_SECONDS) * 100}%` }}
              />
            </div>
          </div>
        )}

        {panelAdState === "done" && !panelCrateOpened && (
          <button
            onClick={openCrate}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-bold transition-colors cursor-pointer ${
              isDark
                ? "bg-primary hover:bg-primary/80 text-primary-foreground"
                : "bg-primary hover:bg-primary/80 text-primary-foreground"
            }`}
          >
            Open crate
          </button>
        )}

        {panelCrateOpened && renderItemReveal(accent)}
      </div>
    );
  };

  return (
    <DemoShell mode={mode}
      title="Watch Ads To Unlock Features Or Get Rewards: Semantic Inflation of Reward Value"
      userTitle="Legendary crate"
      caption="Semantic Inflation of Reward Value — hyperbolic storefront language sells a reward whose real utility is zero."
      deltaNote="Both crates cost the same 4-second ad and contain the identical item — a cosmetic Star Sticker with zero gameplay impact. Variant A advertises it with superlatives ('LEGENDARY', 'EXCLUSIVE', 'AMAZING') and buries the 'cosmetic only' fine print; Variant B describes the sticker exactly as it is, so the hype-utility gap is zero."
      benign={
        <div className="space-y-3">{renderCratePanel("emerald")}</div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">{renderCratePanel("rose")}</div>
    </DemoShell>
  );
}
