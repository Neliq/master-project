"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Drip Pricing — Condition 1: Sequential Price Inflation
 *
 * Thesis: the checkout flow is a sequence of user states S = (s_0 … s_n),
 * where s_0 is the initial product page and s_n the payment confirmation.
 * P(s_i) is the displayed price at state s_i and I_added is the value of
 * explicitly selected optional items. The feature triggers when the final
 * price strictly exceeds the advertised price by more than the explicitly
 * added items:
 *
 *   P(s_n) > P(s_0) + I_added  ⟹  P_dripped > 0
 *
 * Variant A (dark): a low base fare is advertised at s_0 and mandatory
 * fees are dripped in across the states, so P grows at every step.
 * Variant B (benign): the all-inclusive total is shown from s_0 onward and
 * P is constant across the whole flow.
 */

const BASE_PRICE = 129; // P(s_0) — the advertised fare
const FEES = [
  { label: "Booking fee", amount: 14.99, step: 1 },
  { label: "Convenience fee", amount: 9.5, step: 2 },
  { label: "Taxes & surcharges", amount: 12.4, step: 2 },
];
const STEPS = ["Select fare", "Passenger details", "Payment", "Confirmation"];

const usd = (n: number) => `$${n.toFixed(2)}`;
const TOTAL_PRICE = BASE_PRICE + FEES.reduce((s, f) => s + f.amount, 0); // P(s_n)
const DRIPPED = TOTAL_PRICE - BASE_PRICE; // P_dripped with I_added = 0

function priceAtStep(step: number, dark: boolean): number {
  if (!dark) return TOTAL_PRICE;
  return BASE_PRICE + FEES.filter((f) => f.step <= step).reduce((s, f) => s + f.amount, 0);
}

function feesAtStep(step: number, dark: boolean) {
  return FEES.filter((f) => (dark ? f.step <= step : true));
}

export function DripPricingCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [step, setStep] = React.useState(0);
  const [confirmed, setConfirmed] = React.useState(false);

  const reset = () => {
    setStep(0);
    setConfirmed(false);
  };

  const next = () => {
    if (step >= STEPS.length - 1) setConfirmed(true);
    else setStep((s) => s + 1);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P(s₀) advertised fare</span>
        <span className="font-mono font-semibold tabular-nums">{usd(BASE_PRICE)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P at current state (dark)</span>
        <span className="font-mono font-semibold tabular-nums">{usd(priceAtStep(step, true))}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P(s_n) final total</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{usd(TOTAL_PRICE)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">I_added (optional items)</span>
        <span className="font-mono font-semibold tabular-nums">$0.00</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P_dripped = P(s_n) − P(s₀)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{usd(DRIPPED)} &gt; 0</span>
      </div>
    </>
  ) : null;

  const renderFlow = (dark: boolean) => {
    const price = priceAtStep(step, dark);
    const fees = feesAtStep(step, dark);
    return (
      <div className="space-y-3">
        {/* state stepper s_0 … s_n */}
        <div className="flex items-start gap-1.5">
          {STEPS.map((label, i) => (
            <div key={label} className="min-w-0 flex-1">
              <div
                className={`h-1 rounded-full ${
                  i <= step ? (dark ? "bg-rose-500" : "bg-emerald-500") : "bg-muted"
                }`}
              />
              <div
                className={`mt-1 truncate text-[8px] ${
                  i === step ? "font-semibold text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-[11px] font-semibold">Round-trip to Berlin</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Economy · 2 passengers · 14–17 Aug
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div
                className={`text-[8px] uppercase tracking-wider ${
                  dark
                    ? "text-muted-foreground"
                    : "font-semibold text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {dark ? "advertised from" : "all-inclusive total"}
              </div>
              <div
                className={`text-[15px] font-bold tabular-nums ${
                  dark ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {usd(price)}
              </div>
            </div>
          </div>

          {/* fee ledger — grows state by state in the dark variant */}
          <div className="mt-3 space-y-1 border-t border-border pt-2">
            {fees.length === 0 ? (
              <p className="text-[9px] italic text-muted-foreground/60">
                No additional charges listed.
              </p>
            ) : null}
            {fees.map((f) => (
              <div key={f.label} className="flex items-center justify-between text-[9px]">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  {dark && step === f.step ? (
                    <span className="rounded bg-rose-500/10 px-1 py-px font-mono text-[7px] font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">
                      new
                    </span>
                  ) : null}
                  {f.label}
                </span>
                <span className="font-mono tabular-nums text-foreground">{usd(f.amount)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-border pt-1.5 text-[10px] font-semibold">
              <span className="text-muted-foreground">Total at this state</span>
              <span
                className={`font-mono tabular-nums ${
                  dark ? "text-foreground" : "text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {usd(price)}
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="rounded-md border border-border px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>
            <button
              onClick={next}
              className={`flex-1 cursor-pointer rounded-md py-1.5 text-[10px] font-medium text-white transition-colors ${
                dark ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {step < STEPS.length - 1 ? "Continue" : confirmed ? "Paid" : `Pay ${usd(price)}`}
            </button>
          </div>
        </div>

        {confirmed &&
          (dark ? (
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-amber-700 dark:text-amber-300">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Sequential price inflation detected
              </div>
              <p className="text-muted-foreground mt-1">
                You paid <strong className="text-foreground">{usd(TOTAL_PRICE)}</strong> for a flight
                advertised at <strong className="text-foreground">{usd(BASE_PRICE)}</strong>. Check the
                trigger: P(s_n) = {usd(TOTAL_PRICE)} &gt; P(s₀) + I_added = {usd(BASE_PRICE)} + $0.00
                ⟹ P_dripped = <strong className="text-amber-700 dark:text-amber-300">{usd(DRIPPED)}</strong>{" "}
                &gt; 0.
              </p>
              <p className="text-muted-foreground mt-1">
                The booking fee, convenience fee and taxes were dripped in one state at a time — each
                “new” fee appeared only after you had already invested more of the flow (sunk cost
                fallacy), and the partitioned fees kept your encoded memory of the total low.
              </p>
            </div>
          ) : (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-emerald-700 dark:text-emerald-300">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Price constant across all states
              </div>
              <p className="text-muted-foreground mt-1">
                The all-inclusive total of{" "}
                <strong className="text-emerald-700 dark:text-emerald-300">{usd(TOTAL_PRICE)}</strong>{" "}
                was shown from s₀ onward, so P(s_i) never changed: P(s_n) = P(s₀) and P_dripped =
                $0.00.
              </p>
            </div>
          ))}
      </div>
    );
  };

  return (
    <DemoShell
      mode={mode}
      annotations={annotations}
      onRestart={onRestart ?? reset}
      title="Drip Pricing, Hidden Costs, or Partitioned Pricing: Sequential Price Inflation"
      caption="Sequential Price Inflation — the checkout flow is tracked as a sequence of states and the feature triggers when the final price P(s_n) exceeds the advertised P(s_0) by more than the explicitly added items."
      auditorStats={stats}
      deltaNote={`Variant A drips three mandatory fees in across the checkout states, so the final total ${usd(TOTAL_PRICE)} exceeds the advertised fare by ${usd(DRIPPED)} (P_dripped > 0). Variant B shows the same all-inclusive total ${usd(TOTAL_PRICE)} from s₀ onward — the price never moves.`}
      benign={renderFlow(false)}
    >
      {renderFlow(true)}
    </DemoShell>
  );
}
