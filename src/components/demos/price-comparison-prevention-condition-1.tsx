"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Price Comparison Prevention — Condition 1: Fiat Decoupling
 *
 * Thesis: T_price(n) is the extracted textual cost within a product node n
 * and F_convert(x) normalises a value into a standard fiat currency. The
 * feature triggers if the interface presents a cost but mathematically
 * prevents evaluation of its real-world equivalent:
 *
 *   T_price(n) ≠ ∅  ∧  F_convert(T_price(n)) = ∅
 *
 * Variant A (dark): the product is priced in proprietary "Coins" and the
 * conversion function resolves to the empty set — the real cost is
 * unknowable, and copy/paste of the price is blocked for external search.
 * Variant B (benign): the same product is priced in PLN with a working
 * fiat conversion.
 */

export function PriceComparisonPreventionCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [darkConvert, setDarkConvert] = React.useState<"idle" | "failed">("idle");
  const [benignConvert, setBenignConvert] = React.useState<"idle" | "done">("idle");
  const [copyAttempts, setCopyAttempts] = React.useState(0);

  const reset = () => {
    setDarkConvert("idle");
    setBenignConvert("idle");
    setCopyAttempts(0);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">T_price(n)</span>
        <span className="font-mono font-semibold tabular-nums">“2,990 Coins” ≠ ∅</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">F_convert(T_price) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">∅ (null set)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">F_convert(T_price) — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">PLN 149 → USD 38</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Cross-market evaluation</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">blocked</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Copy attempts blocked (dark)</span>
        <span className="font-mono font-semibold tabular-nums">{copyAttempts}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Price Comparison Prevention: Fiat Decoupling"
      caption="Fiat Decoupling — the price node is non-empty, but the conversion function resolves to the empty set, so the cost cannot be evaluated against any real-world currency."
      auditorStats={stats}
      deltaNote="Variant A prices the product in proprietary “Coins” with no fiat mapping in the DOM — F_convert(T_price) = ∅ — so the true cost is unknowable and copying the price is blocked. Variant B prices the identical product in PLN and converts to other fiat currencies on demand."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">CloudNimbus Pro</div>
                <div className="text-[11px] font-semibold mt-0.5">Annual plan — billed yearly</div>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Fiat price
              </div>
            </div>

            <div className="mt-2.5 rounded-md border bg-background p-2.5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[15px] font-bold tabular-nums">PLN 149.00</span>
                <span className="text-[9px] text-muted-foreground">/ year, VAT incl.</span>
              </div>
              <div className="text-[9px] text-muted-foreground mt-0.5">
                Priced directly in fiat — comparable against any other store in any currency.
              </div>
            </div>

            <button
              onClick={() => setBenignConvert("done")}
              className="mt-2.5 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Convert to USD / EUR
            </button>

            {benignConvert === "done" && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed font-mono">
                <div className="font-semibold text-green-700 dark:text-green-300">
                  F_convert(149.00 PLN) = {`{ USD 38.11, EUR 34.90 }`} ≠ ∅
                </div>
                <p className="text-muted-foreground mt-1">
                  The conversion is defined in the DOM, so you can evaluate the real-world
                  equivalent and compare across markets.
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
            <div>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">CloudNimbus Pro</div>
              <div className="text-[11px] font-semibold mt-0.5">Annual plan — billed yearly</div>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Coin price
            </div>
          </div>

          <div className="mt-2.5 rounded-md border bg-background p-2.5">
            <div className="flex items-baseline gap-1.5 select-none">
              <span className="text-[15px] font-bold tabular-nums">2,990 Coins</span>
              <span className="text-[9px] text-muted-foreground">/ year</span>
            </div>
            <div className="text-[9px] text-muted-foreground mt-0.5">
              Coins are the only currency accepted in this store. What they are worth in
              real money is never stated.
            </div>
          </div>

          <button
            onClick={() => setDarkConvert("failed")}
            className="mt-2.5 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            What&rsquo;s that in PLN?
          </button>

          {darkConvert === "failed" && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed font-mono">
              <div className="font-semibold text-yellow-700 dark:text-yellow-300">F_convert(2,990 Coins) = ∅</div>
              <p className="text-muted-foreground mt-1">
                No fiat mapping exists in the DOM. 2,990 Coins cannot be expressed in PLN,
                USD, EUR or any standard currency — cross-market comparison is blocked.
              </p>
            </div>
          )}

          <button
            onClick={() => setCopyAttempts((c) => c + 1)}
            className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Copy price to compare elsewhere
          </button>

          {copyAttempts > 0 && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
              <p className="text-muted-foreground">
                Copy blocked — text selection and the clipboard are disabled on the price
                node, so the product identifier cannot be extracted for an external search.
                The epistemic obstruction is structural, not accidental.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
