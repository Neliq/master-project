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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [daysLeftA, setDaysLeftA] = React.useState(7);
  const [daysLeftB, setDaysLeftB] = React.useState(7);
  const [manageOpened, setManageOpened] = React.useState(false);

  const inNoticeWindowB = daysLeftB <= NOTICE_DAYS && daysLeftB > 0;

  const nextDayA = () => setDaysLeftA((d) => Math.max(0, d - 1));
  const nextDayB = () => setDaysLeftB((d) => Math.max(0, d - 1));


  return (
    <DemoShell mode={mode}
      title="Forced Continuity: Absence of Temporal Feedforward"
      userTitle="Streamly — Trial details"
      caption="Absence of Temporal Feedforward — no visible renewal warning appears inside the fair-notice window; the only notice is rendered below legibility thresholds."
      deltaNote="Both panels show the same plan and the same countdown. In Variant A the renewal notice exists but is 7px at 1.8:1 contrast — below τ_min_visible and CR < 3.0, so Visible(w, t) = False across the whole fair-notice window. In Variant B a high-contrast banner appears the moment the window opens."
      benign={
        <div className="space-y-3">
          {/* Prominent renewal banner — Visible(w, t) = True */}
          {inNoticeWindowB && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-3">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <path d="M12 9v4m0 4h.01" />
                </svg>
                Renewal reminder
              </div>
              <p className="text-[10px] font-medium text-foreground mt-1">
                Your Premium plan renews in <strong>{daysLeftB} day{daysLeftB === 1 ? "" : "s"}</strong> — {PLAN_PRICE}{" "}
                will be charged to •••• 4242.
              </p>
              <button
                onClick={() => setManageOpened(true)}
                className="mt-2 rounded-md border border-border/60 bg-background px-3 py-1 text-[10px] font-medium text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
              >
                Manage subscription
              </button>
              {manageOpened && (
                <div className="mt-2 rounded-md border border-border bg-background p-2 text-[9px] text-muted-foreground">
                  Subscription settings are open. You can review the renewal date or update your plan before the charge.
                </div>
              )}
            </div>
          )}

          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Premium plan</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  {daysLeftB === 0
                    ? "Your plan renewed today."
                    : `Renews in ${daysLeftB} day${daysLeftB === 1 ? "" : "s"}.`}
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
                Active
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-md border border-border bg-background px-3 py-2">
              <span className="text-[9px] text-muted-foreground">Visa •••• 4242</span>
              <span className="text-[10px] font-mono font-semibold tabular-nums">{PLAN_PRICE}/mo</span>
            </div>
          </div>

          <button
            onClick={nextDayB}
            className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Preview the next day
          </button>

          {daysLeftB === 0 && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
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
                {daysLeftA === 0
                  ? "Your plan renewed today."
                  : `Renews in ${daysLeftA} day${daysLeftA === 1 ? "" : "s"}.`}
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
              Active
            </div>
          </div>

          {/* The only renewal notice: micro-text, low contrast, tiny area */}
          <div className="mt-2 rounded-md border border-border bg-background px-3 py-2">
            <span className="text-[7px] text-muted-foreground/40 leading-none">
              Renews in {daysLeftA} days · {PLAN_PRICE}/month · •••• 4242
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between rounded-md border border-border bg-background px-3 py-2">
            <span className="text-[9px] text-muted-foreground">Visa •••• 4242</span>
            <span className="text-[10px] font-mono font-semibold tabular-nums">{PLAN_PRICE}/mo</span>
          </div>
        </div>

        <button
          onClick={nextDayA}
          className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Advance one day (t → t+1)
        </button>

        {daysLeftA === 0 && (
          <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
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
