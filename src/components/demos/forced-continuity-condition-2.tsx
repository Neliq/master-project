"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Forced Continuity — Condition 2: Absence of Temporal Feedforward
 *
 * Thesis: W_renewal is the set of visual warning elements that should appear
 * prior to a renewal — banners, modal countdowns, prominent expiration
 * alerts. The feature triggers if the interface renders no visible renewal
 * warning within the fair-notice window τ_fair_notice (3–7 days before
 * expiry), or renders the warning below accessibility thresholds:
 *
 *   ∀ w ∈ W_renewal : Visible(w, t) = False  ∀ t ∈ [t_expiry − τ_fair_notice, t_expiry]
 *   ∨  A(w)/A_viewport < τ_min_visible  ∨  CR(w, L_bg) < 3.0
 *
 * Variant A (dark): the renewal date exists but is rendered as micro-text at
 * 7px with ~1.8:1 contrast — below the visibility and contrast thresholds,
 * so no effective warning is ever seen.
 * Variant B (benign): the same renewal is announced by a high-contrast amber
 * banner as soon as the fair-notice window opens.
 */

const PLAN_PRICE = "$14.99";
const NOTICE_DAYS = 7; // τ_fair_notice: 3–7 days before expiry

export function ForcedContinuityCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Shared countdown so both panels stay in sync.
  const [daysLeft, setDaysLeft] = React.useState(7);

  const inNoticeWindow = daysLeft <= NOTICE_DAYS && daysLeft > 0;

  const nextDay = () => setDaysLeft((d) => Math.max(0, d - 1));

  const reset = () => setDaysLeft(7);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Days to renewal</span>
        <span className="font-mono font-semibold tabular-nums">{daysLeft}d (τ_fair_notice: 3–7d)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Visible(w, t) in window (A)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">False — micro-text</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">CR(w, L_bg) (A)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">1.8 &lt; 3.0</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Visible(w, t) in window (B)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">True — banner, CR 7.4</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Forced Continuity: Absence of Temporal Feedforward"
      caption="Absence of Temporal Feedforward — no visible renewal warning appears inside the fair-notice window; the only notice is rendered below legibility thresholds."
      auditorStats={stats}
      deltaNote="Both panels show the same plan and the same countdown. In Variant A the renewal notice exists but is 7px at 1.8:1 contrast — below τ_min_visible and CR < 3.0, so Visible(w, t) = False across the whole fair-notice window. In Variant B a high-contrast banner appears the moment the window opens."
      benign={
        <div className="space-y-3">
          {/* Prominent renewal banner — Visible(w, t) = True */}
          {inNoticeWindow && (
            <div className="rounded-md border border-yellow-500/40 bg-yellow-500/15 p-3">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-yellow-700 dark:text-yellow-300">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <path d="M12 9v4m0 4h.01" />
                </svg>
                Renewal warning (w ∈ W_renewal)
              </div>
              <p className="text-[10px] font-medium text-foreground mt-1">
                Your Premium plan renews in <strong>{daysLeft} day{daysLeft === 1 ? "" : "s"}</strong> — {PLAN_PRICE}{" "}
                will be charged to •••• 4242.
              </p>
              <button
                onClick={() => {}}
                className="mt-2 rounded-md border border-yellow-500/50 bg-background px-3 py-1 text-[10px] font-medium text-yellow-700 dark:text-yellow-300 hover:bg-yellow-500/10 transition-colors cursor-pointer"
              >
                Manage subscription
              </button>
            </div>
          )}

          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Premium plan</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  {daysLeft === 0
                    ? "Your plan renewed today."
                    : `Renews in ${daysLeft} day${daysLeft === 1 ? "" : "s"}.`}
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Active
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-md border border-border bg-background px-3 py-2">
              <span className="text-[9px] text-muted-foreground">Visa •••• 4242</span>
              <span className="text-[10px] font-mono font-semibold tabular-nums">{PLAN_PRICE}/mo</span>
            </div>
          </div>

          <button
            onClick={nextDay}
            className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Advance one day (t → t+1)
          </button>

          {daysLeft === 0 && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Renewed — with feedforward
              </div>
              <p className="text-muted-foreground mt-0.5">
                You were warned every day of the fair-notice window: Visible(w, t) = True for all t ∈
                [t_expiry − 7d, t_expiry], at CR 7.4:1 and banner scale well above τ_min_visible.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Premium plan</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                {daysLeft === 0
                  ? "Your plan renewed today."
                  : `Renews in ${daysLeft} day${daysLeft === 1 ? "" : "s"}.`}
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
              Active
            </div>
          </div>

          {/* The only renewal notice: micro-text, low contrast, tiny area */}
          <div className="mt-2 rounded-md border border-border bg-background px-3 py-2">
            <span className="text-[7px] text-muted-foreground/40 leading-none">
              Renews in {daysLeft} days · {PLAN_PRICE}/month · •••• 4242
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between rounded-md border border-border bg-background px-3 py-2">
            <span className="text-[9px] text-muted-foreground">Visa •••• 4242</span>
            <span className="text-[10px] font-mono font-semibold tabular-nums">{PLAN_PRICE}/mo</span>
          </div>
        </div>

        <button
          onClick={nextDay}
          className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Advance one day (t → t+1)
        </button>

        {daysLeft === 0 && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Your plan renewed today
            </div>
            <p className="text-muted-foreground mt-0.5">
              The renewal notice existed the whole time, but at 7px with ~1.8:1 contrast its effective area was far
              below τ_min_visible: <strong className="text-foreground">A(w)/A_viewport ≈ 0.004</strong> and{" "}
              <strong className="text-foreground">CR(w, L_bg) = 1.8 &lt; 3.0</strong>.{" "}
              <strong className="text-foreground">∀ w ∈ W_renewal : Visible(w, t) = False</strong> for every t in the
              fair-notice window — {PLAN_PRICE} was charged with zero temporal feedforward.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
