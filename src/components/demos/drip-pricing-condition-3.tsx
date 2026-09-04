"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Drip Pricing — Condition 3: Semantic Concealment of Mandatory Fee Disclosure
 *
 * Thesis: the algorithm scans the checkout flow for mandatory-fee descriptors
 * (“service fee”, “booking fee”, “convenience charge”) and evaluates whether
 * those terms appear in the initial price presentation or only at the final
 * confirmation step. The feature triggers if fee terminology is semantically
 * absent from all text above the fold on the initial pricing page but present
 * on the final checkout page:
 *
 *   T_initial ∩ K_fees = ∅  ∧  T_final ∩ K_fees ≠ ∅
 *
 * Variant A (dark): the landing page above the fold contains no fee words at
 * all; the fees only materialise at the final checkout step.
 * Variant B (benign): the fee terminology is present on the initial pricing
 * page from the start, so the intersection is never empty.
 */

const usd = (n: number) => `$${n.toFixed(2)}`;
const NIGHT_RATE = 19;
const NIGHTS = 3;
const FEES = [
  { label: "Reservation service fee", amount: 7.5 },
  { label: "Booking fee", amount: 4 },
  { label: "Convenience charge", amount: 2.25 },
];
const ROOM_TOTAL = NIGHT_RATE * NIGHTS;
const GRAND_TOTAL = ROOM_TOTAL + FEES.reduce((s, f) => s + f.amount, 0);

export function DripPricingCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [pageA, setPageA] = React.useState(0);
  const [pageB, setPageB] = React.useState(0);
  const [scannedA, setScannedA] = React.useState(false);
  const [scannedB, setScannedB] = React.useState(false);
  const [paidA, setPaidA] = React.useState(false);
  const [paidB, setPaidB] = React.useState(false);


  const feeList = (
    <div className="space-y-1">
      {FEES.map((f) => (
        <div key={f.label} className="flex items-center justify-between text-[9px]">
          <span className="text-muted-foreground">{f.label}</span>
          <span className="font-mono tabular-nums">{usd(f.amount)}</span>
        </div>
      ))}
      <div className="flex items-center justify-between border-t border-border pt-1.5 text-[10px] font-semibold">
        <span className="text-muted-foreground">Total for {NIGHTS} nights</span>
        <span className="font-mono tabular-nums">{usd(GRAND_TOTAL)}</span>
      </div>
    </div>
  );

  const scanResult = mode === "auditor" ? (
    <div className="space-y-1 rounded-md border bg-background p-2 font-mono text-[8px] leading-relaxed">
      <div className="font-bold uppercase tracking-wide text-muted-foreground">
        Semantic scan — K_fees = {"{service fee, booking fee, convenience charge}"}
      </div>
      <div className="text-muted-foreground">T_initial ∩ K_fees = ∅</div>
      <div className="text-muted-foreground">
        T_final ∩ K_fees = {"{reservation service fee, booking fee, convenience charge}"} ≠ ∅
      </div>
      <div className="text-red-500">⟹ trigger: T_initial ∩ K_fees = ∅ ∧ T_final ∩ K_fees ≠ ∅</div>
    </div>
  ) : (
    <div className="space-y-1 rounded-md border bg-background p-2 text-[8px] leading-relaxed">
      <div className="font-semibold text-foreground">Full price breakdown</div>
      <div className="text-muted-foreground">The final total includes the room rate, reservation service fee, booking fee, and convenience charge.</div>
      <div className="flex items-center justify-between border-t border-border pt-1 font-medium">
        <span>Total for {NIGHTS} nights</span>
        <span className="font-mono">{usd(GRAND_TOTAL)}</span>
      </div>
    </div>
  );

  const renderFlow = (dark: boolean) => {
    const page = dark ? pageA : pageB;
    const setPage = dark ? setPageA : setPageB;
    const scanned = dark ? scannedA : scannedB;
    const setScanned = dark ? setScannedA : setScannedB;
    const paid = dark ? paidA : paidB;
    const setPaid = dark ? setPaidA : setPaidB;

    return (
    <div className="space-y-3">
      {page === 0 ? (
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-[11px] font-semibold">Harborview Suites</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                ★ 4.8 · Waterfront · {NIGHTS} nights · 2 guests
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                <span className="rounded-full border border-border px-1.5 py-0.5 text-[8px] text-muted-foreground">
                  Free cancellation
                </span>
                <span className="rounded-full border border-border px-1.5 py-0.5 text-[8px] text-muted-foreground">
                  Breakfast included
                </span>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <div
                className={`text-[16px] font-bold tabular-nums ${
                  dark ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                }`}
              >
                {usd(NIGHT_RATE)}
              </div>
              <div className="text-[8px] uppercase tracking-wider text-muted-foreground">per night</div>
            </div>
          </div>

          {dark ? null : (
            <div className="mt-3 rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[9px] leading-relaxed">
              <strong className="text-green-700 dark:text-green-300">Total for {NIGHTS} nights: {usd(GRAND_TOTAL)}</strong>{" "}
              <span className="text-muted-foreground">
                — includes reservation service fee, booking fee and convenience charge.
              </span>
            </div>
          )}

          <button
            onClick={() => setPage(1)}
            className={`mt-3 w-full cursor-pointer rounded-md py-1.5 text-[10px] font-medium text-white transition-colors ${
              dark ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Continue to booking
          </button>
          <p className="text-[8px] text-muted-foreground/60 mt-1.5">
            {dark ? "All prices above the fold." : "Price summary shown above the fold, in full."}
          </p>
        </div>
      ) : (
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Review &amp; pay</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Harborview Suites · {NIGHTS} nights × {usd(NIGHT_RATE)} = {usd(ROOM_TOTAL)}
          </p>

          <div className="mt-2 border-t border-border pt-2">{feeList}</div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => setPage(0)}
              className="rounded-md border border-border px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Back
            </button>
            <button
              onClick={() => setPaid(true)}
              className={`flex-1 cursor-pointer rounded-md py-1.5 text-[10px] font-medium text-white transition-colors ${
                dark ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {paid ? "Paid" : `Pay ${usd(GRAND_TOTAL)}`}
            </button>
          </div>
        </div>
      )}

      {page === 1 ? (
        <button
          onClick={() => setScanned(true)}
          className="w-full cursor-pointer rounded-md border border-border bg-background py-1.5 text-[9px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {mode === "auditor" ? "Run semantic fee scan" : "View full price breakdown"}
        </button>
      ) : null}

      {scanned ? scanResult : null}

      {mode === "auditor" && paid && (dark ? (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-yellow-700 dark:text-yellow-300">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Mandatory fee disclosure concealed
            </div>
            <p className="text-muted-foreground mt-1">
              The words “service fee”, “booking fee” and “convenience charge” never appeared on the
              initial pricing page above the fold — they only materialised at the final checkout
              step, where you were already committed (sunk cost). You booked at{" "}
              <strong className="text-foreground">{usd(NIGHT_RATE)}/night</strong> but were billed{" "}
              <strong className="text-yellow-700 dark:text-yellow-300">{usd(GRAND_TOTAL)}</strong>.
            </p>
          </div>
        ) : (
          <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-green-700 dark:text-green-300">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Fee terminology visible from the start
            </div>
            <p className="text-muted-foreground mt-1">
              T_initial ∩ K_fees ≠ ∅ — the initial pricing page already named the reservation
              service fee, booking fee and convenience charge and quoted the full {usd(GRAND_TOTAL)}{" "}
              total above the fold. Nothing was added at checkout.
            </p>
          </div>
        ))}
      {mode !== "auditor" && paid && (
        <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
          <div className="font-semibold text-green-700 dark:text-green-300">Booking confirmed</div>
          <p className="mt-1 text-muted-foreground">Harborview Suites · {NIGHTS} nights · charged {usd(GRAND_TOTAL)}.</p>
        </div>
      )}
    </div>
  );
  };

  return (
    <DemoShell
      mode={mode}
      title="Drip Pricing, Hidden Costs, or Partitioned Pricing: Semantic Concealment of Mandatory Fee Disclosure"
      caption="Semantic Concealment of Mandatory Fee Disclosure — mandatory-fee terminology is absent from the initial pricing page above the fold and only appears on the final checkout page."
      deltaNote="Variant A keeps the initial pricing page free of any fee words (T_initial ∩ K_fees = ∅) and only introduces “service fee”, “booking fee” and “convenience charge” at the final step. Variant B names the same three fees on the initial page and quotes the full total above the fold, so the semantic concealment never occurs."
      benign={renderFlow(false)}
    >
      {renderFlow(true)}
    </DemoShell>
  );
}
