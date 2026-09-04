"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Bundling — Condition 2: Visual Obscuration of Individual Component Pricing
 *
 * Thesis: within a bundle offer container C_bundle, let N_components be the
 * set of individually priced sub-items. The feature triggers if the
 * aggregate visual area devoted to individual-component prices is less than
 * a fraction τ_breakdown of the total bundle card area, i.e. the interface
 * visually suppresses the decomposition that would enable rational
 * comparison:
 *
 *   Σ A(n) / A(C_bundle) < τ_breakdown
 *
 * Variant A (dark): the bundle card shows one large bundle total and the item
 * names only — the per-component prices are never rendered, so the
 * component-price area is a tiny fraction of the card.
 * Variant B (benign): the same card carries an itemised breakdown table at
 * full visual weight, so the ratio is far above the threshold.
 */

const usd = (n: number) => `$${n.toFixed(2)}`;
const COMPONENTS = [
  { name: "Nova X100 Camera", price: 899 },
  { name: "50mm f/1.8 Prime Lens", price: 349 },
  { name: "Hard Case", price: 49 },
];
const BUNDLE_PRICE = 1199;
const SUM_PRICES = COMPONENTS.reduce((s, c) => s + c.price, 0); // $1,297
const SAVINGS = SUM_PRICES - BUNDLE_PRICE;

export function BundlingCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [addedDark, setAddedDark] = React.useState(false);
  const [addedBenign, setAddedBenign] = React.useState(false);


  const renderPanel = (dark: boolean) => {
    const isAdded = dark ? addedDark : addedBenign;
    const setAdded = dark ? setAddedDark : setAddedBenign;
    return (
    <div className="space-y-3">
      <div className="rounded-md border bg-card p-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
              dark ? "bg-red-100 dark:bg-red-900/30" : "bg-green-100 dark:bg-green-900/30"
            }`}
          >
            <svg
              className={`h-4 w-4 ${dark ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 8l-9-5-9 5 9 5 9-5z" />
              <path d="M3 8v8l9 5 9-5V8" />
              <path d="M12 13v8" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[11px] font-semibold">Creator Bundle</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              {COMPONENTS.map((c) => c.name).join(" + ")}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2 border-t border-border pt-2">
          <div>
            <div
              className={`text-[16px] font-bold tabular-nums ${
                dark ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
              }`}
            >
              {usd(BUNDLE_PRICE)}
            </div>
            <div className="text-[8px] uppercase tracking-wider text-muted-foreground">
              bundle total
            </div>
          </div>
          {!dark ? (
            <div className="rounded bg-green-500/10 px-1.5 py-0.5 text-[8px] font-semibold text-green-700 dark:text-green-300">
              You save {usd(SAVINGS)}
            </div>
          ) : null}
        </div>

        {/* component pricing area — the variable that the ratio measures */}
        <div className="mt-2">
          {dark ? (
            <div className="space-y-1.5">
              {COMPONENTS.map((c) => (
                <div key={c.name} className="text-[9px] text-muted-foreground">
                  {c.name}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1 rounded-md border bg-background p-2">
              {COMPONENTS.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-[9px]">
                  <span className="text-muted-foreground">{c.name}</span>
                  <span className="font-mono tabular-nums">{usd(c.price)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-border pt-1 text-[9px] font-semibold">
                <span className="text-muted-foreground">If bought separately</span>
                <span className="font-mono tabular-nums">{usd(SUM_PRICES)}</span>
              </div>
              <div className="flex items-center justify-between text-[9px] font-semibold text-green-600 dark:text-green-400">
                <span>Bundle price</span>
                <span className="font-mono tabular-nums">{usd(BUNDLE_PRICE)}</span>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => (dark ? setAddedDark(true) : setAddedBenign(true))}
          className={`mt-3 w-full cursor-pointer rounded-md py-1.5 text-[10px] font-medium text-white transition-colors ${
            dark ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isAdded ? "Added to cart ✓" : "Add bundle to cart"}
        </button>

        {isAdded && (
          <div className="mt-2 rounded-md border border-border bg-muted/30 p-2 text-[9px]">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium">Creator Bundle in cart</span>
              <span className="font-mono tabular-nums">{usd(BUNDLE_PRICE)}</span>
            </div>
            <button
              type="button"
              onClick={() => setAdded(false)}
              className="mt-1.5 text-[8px] text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Remove bundle
            </button>
          </div>
        )}
      </div>

      {mode === "auditor" && isAdded && (dark ? (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-yellow-700 dark:text-yellow-300">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Component pricing visually obscured
            </div>
            <p className="text-muted-foreground mt-1">
              You paid <strong className="text-foreground">{usd(BUNDLE_PRICE)}</strong> without ever
              seeing the individual component prices — no breakdown was rendered at all
              (ΣA(n)/A(C_bundle) ≈ 0% &lt; τ_breakdown = 30%). The items are worth{" "}
              <strong className="text-yellow-700 dark:text-yellow-300">{usd(SUM_PRICES)}</strong>{" "}
              separately, but there was nothing to compare at the point of decision.
            </p>
          </div>
        ) : (
          <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-green-700 dark:text-green-300">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Itemised breakdown at full weight
            </div>
            <p className="text-muted-foreground mt-1">
              The breakdown table dominated the card (ΣA(n)/A(C_bundle) ≈ 62%), so you could compare
              {usd(SUM_PRICES)} of separate purchases against the {usd(BUNDLE_PRICE)} bundle and see
              the {usd(SAVINGS)} saving before deciding.
            </p>
          </div>
        ))}
    </div>
    );
  };

  return (
    <DemoShell
      mode={mode}
      title="Bundling: Visual Obscuration of Individual Component Pricing"
      caption="Visual Obscuration of Individual Component Pricing — the aggregate visual area devoted to individual-component prices inside the bundle card falls below the breakdown threshold, suppressing the decomposition that enables rational comparison."
      deltaNote="Variant A shows only the bundle total and the item names — the per-component prices are never rendered (≈0% of the card area, below τ_breakdown). Variant B renders the same itemised table at full visual weight (≈62%), so the $1,297 sum of separate purchases is directly comparable to the $1,199 bundle."
      benign={renderPanel(false)}
    >
      {renderPanel(true)}
    </DemoShell>
  );
}
