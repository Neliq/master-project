"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Drip Pricing — Condition 2: Visual Disparity of Cost Partitioning
 *
 * Thesis: even when partitioned fees are technically disclosed on the same
 * page, their impact is minimised through visual suppression. V(x) is the
 * computed visual prominence of node x (bounding-box area, font size, font
 * weight, contrast ratio). The feature triggers when the base price node
 * dominates the fee node beyond the deceptive heuristic threshold:
 *
 *   V(N_base) / V(N_fee) > τ_prominence
 *
 * Variant A (dark): the base price is 20px bold while the fee line is 8px
 * at ~1.9:1 contrast — the prominence ratio is ≈ 6.4.
 * Variant B (benign): fees are rendered at the same size, weight and
 * contrast as the base price, so the ratio collapses to ≈ 1.
 */

const usd = (n: number) => `$${n.toFixed(2)}`;
const BASE_PRICE = 49; // N_base — the advertised ticket price
const PROCESSING_FEE = 6.5;
const SERVICE_CHARGE = 3.25;
const TOTAL_PRICE = BASE_PRICE + PROCESSING_FEE + SERVICE_CHARGE; // what is actually charged
const PROMINENCE_RATIO = 6.4; // V(N_base) / V(N_fee) on the dark variant

export function DripPricingCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [paid, setPaid] = React.useState(false);
  const [highlighted, setHighlighted] = React.useState(false);

  const reset = () => {
    setPaid(false);
    setHighlighted(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">S_font(N_base) vs S_font(N_fee)</span>
        <span className="font-mono font-semibold tabular-nums">20px / 8px</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">CR(N_fee, L_bg)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">≈ 1.9:1 (&lt; 4.5:1)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">V(N_base)/V(N_fee)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">
          {PROMINENCE_RATIO} &gt; τ (1.5)
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Advertised vs charged</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">
          {usd(BASE_PRICE)} → {usd(TOTAL_PRICE)}
        </span>
      </div>
    </>
  ) : null;

  const renderPanel = (dark: boolean) => (
    <div className="space-y-3">
      <div className="rounded-md border bg-card p-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
              dark ? "bg-rose-100 dark:bg-rose-900/30" : "bg-emerald-100 dark:bg-emerald-900/30"
            }`}
          >
            <svg
              className={`h-4 w-4 ${dark ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 10h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
              <path d="M8 14h5" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[11px] font-semibold">Jazz Night at the Blue Room</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Fri 21:00 · Balcony seating · e-ticket
            </p>
          </div>
        </div>

        {/* N_base — the advertised base price */}
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <div
              className={`font-bold tabular-nums ${
                dark ? "text-[20px] text-rose-600 dark:text-rose-400" : "text-[14px] text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {usd(BASE_PRICE)}
            </div>
            <div className="text-[8px] uppercase tracking-wider text-muted-foreground">
              per ticket
            </div>
          </div>
          {!dark ? (
            <div className="text-right">
              <div className="text-[8px] uppercase tracking-wider text-muted-foreground">
                all-inclusive
              </div>
              <div className="text-[14px] font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                {usd(TOTAL_PRICE)}
              </div>
            </div>
          ) : null}
        </div>

        {/* N_fee — the partitioned fee node */}
        <div className="mt-2 border-t border-border pt-2">
          {dark ? (
            <button
              onClick={() => setHighlighted(true)}
              className={`cursor-pointer text-[8px] transition-all hover:underline ${
                highlighted ? "rounded px-1 ring-2 ring-rose-500/60" : ""
              }`}
              style={{ color: "rgb(185 185 185)" }}
            >
              processing fee {usd(PROCESSING_FEE)} · service charge {usd(SERVICE_CHARGE)}
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-x-1.5 text-[10px] font-medium">
              <span>processing fee {usd(PROCESSING_FEE)}</span>
              <span className="text-muted-foreground">·</span>
              <span>service charge {usd(SERVICE_CHARGE)}</span>
              <span className="text-muted-foreground">·</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                total {usd(TOTAL_PRICE)}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setPaid(true)}
          className={`mt-3 w-full cursor-pointer rounded-md py-1.5 text-[10px] font-medium text-white transition-colors ${
            dark ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {dark ? "Book ticket" : `Book ticket — ${usd(TOTAL_PRICE)} total`}
        </button>
      </div>

      {paid &&
        (dark ? (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-amber-700 dark:text-amber-300">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Visual disparity of cost partitioning
            </div>
            <p className="text-muted-foreground mt-1">
              You were charged <strong className="text-foreground">{usd(TOTAL_PRICE)}</strong>, but the
              page advertised the ticket at <strong className="text-foreground">{usd(BASE_PRICE)}</strong>.
              The only mention of the fees is an 8px line at ≈1.9:1 contrast — measured
              V(N_base)/V(N_fee) = <strong className="text-amber-700 dark:text-amber-300">{PROMINENCE_RATIO}</strong>{" "}
              &gt; τ_prominence. Click the fee line in the card to highlight the suppressed node.
            </p>
            <p className="text-muted-foreground mt-1">
              The fees are “disclosed” on the same page, yet their impact is minimised by visual
              suppression — the partitioned-pricing effect keeps your encoded memory of the total at
              $49.00.
            </p>
          </div>
        ) : (
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-emerald-700 dark:text-emerald-300">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Fees at full prominence
            </div>
            <p className="text-muted-foreground mt-1">
              You paid {usd(TOTAL_PRICE)} — the exact total shown before you clicked. The fee node is
              rendered at the same size, weight and contrast as the base price, so
              V(N_base)/V(N_fee) ≈ 1.0 and no suppression threshold is crossed.
            </p>
          </div>
        ))}
    </div>
  );

  return (
    <DemoShell
      mode={mode}
      annotations={annotations}
      onRestart={onRestart ?? reset}
      title="Drip Pricing, Hidden Costs, or Partitioned Pricing: Visual Disparity of Cost Partitioning"
      caption="Visual Disparity of Cost Partitioning — partitioned fees are disclosed on the same page but rendered with a severe visual deficiency compared to the base price, pushing the prominence ratio beyond the threshold."
      auditorStats={stats}
      deltaNote={`Variant A renders the fees at 8px with ≈1.9:1 contrast while the base price is 20px bold (V ratio ${PROMINENCE_RATIO} > τ), so the true charge of ${usd(TOTAL_PRICE)} is invisible until payment. Variant B shows the same fees at the same size and contrast as the base price — the total ${usd(TOTAL_PRICE)} is legible before committing.`}
      benign={renderPanel(false)}
    >
      {renderPanel(true)}
    </DemoShell>
  );
}
