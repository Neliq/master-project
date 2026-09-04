"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Forced Continuity — Condition 1: Time-Triggered Silent State Mutation
 *
 * Thesis: t_expiry is the timestamp when the promotional period concludes;
 * S_account(t) transitions from S_trial to S_premium, and E_charge executes
 * a transaction against a cached payment token T_payment. The feature
 * triggers if the system runs the state transition and the charge purely off
 * the temporal threshold, without demanding explicit, contemporary user
 * confirmation (Consent_explicit) at the point of conversion:
 *
 *   t >= t_expiry  =>  S_account(t) -> S_premium ∧ E_charge(T_payment) = True
 *   given Consent_explicit(t) = False
 *
 * Variant A (dark): when the trial clock crosses t_expiry, the account
 * silently mutates to premium and $14.99 is charged to the cached token —
 * no consent is ever requested.
 * Variant B (benign): before expiry the trial shows a renewal reminder and
 * a one-click cancel; at t_expiry the system stops and asks for explicit
 * contemporary consent before any charge fires.
 */

const TRIAL_DAYS = 7;
const PLAN_PRICE = "$14.99";

export function ForcedContinuityCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [daysLeftA, setDaysLeftA] = React.useState(TRIAL_DAYS);
  const [daysLeftB, setDaysLeftB] = React.useState(TRIAL_DAYS);
  // Variant B: what the user decided when asked for consent.
  const [bChoice, setBChoice] = React.useState<null | "continue" | "cancel">(null);

  const trialEndedA = daysLeftA <= 0;
  const trialEndedB = daysLeftB <= 0;

  const advanceToExpiryA = () => setDaysLeftA(0);
  const advanceToExpiryB = () => setDaysLeftB(0);


  return (
    <DemoShell mode={mode}
      title="Forced Continuity: Time-Triggered Silent State Mutation"
      userTitle="Streamly — Membership"
      caption="Time-Triggered Silent State Mutation — the trial-to-paid transition fires purely off the clock, with no contemporary consent at the point of conversion."
      deltaNote="Both variants share the same 7-day clock. When it crosses t_expiry, Variant A silently mutates the trial into premium and charges the cached token — no prompt anywhere. Variant B shows a renewal reminder and a one-click cancel before expiry, then halts at t_expiry and asks for explicit consent before any charge fires."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Premium — free trial</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  {trialEndedB
                    ? "Your trial period has concluded."
                    : `${daysLeftB} day${daysLeftB === 1 ? "" : "s"} of free trial remaining.`}
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                {bChoice === "cancel" ? "cancelled" : trialEndedB && bChoice === "continue" ? "premium" : "trial"}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-md border border-border bg-background px-3 py-2">
              <span className="text-[9px] text-muted-foreground">Cached token T_payment — Visa •••• 4242</span>
              <span className="text-[10px] font-mono font-semibold tabular-nums">{PLAN_PRICE}/mo</span>
            </div>

            {!trialEndedB && bChoice === null && (
              <div className="mt-2 rounded-md border border-border bg-background p-2.5 text-[9px] leading-relaxed">
                <span className="font-semibold text-foreground">Renewal reminder:</span>{" "}
                <span className="text-muted-foreground">
                  your free trial ends in {daysLeftB} day{daysLeftB === 1 ? "" : "s"}. After it ends,
                  {PLAN_PRICE}/mo will be charged to •••• 4242 unless you cancel before then.
                </span>
              </div>
            )}

            {!trialEndedB && bChoice === null && (
              <button
                onClick={advanceToExpiryB}
                className="mt-2 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Skip ahead — advance to t_expiry
              </button>
            )}

            {!trialEndedB && bChoice === null && (
              <button
                onClick={() => setBChoice("cancel")}
                className="mt-2 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Cancel trial — nothing will be charged
              </button>
            )}

            {trialEndedB && bChoice === null && (
              <div className="mt-2 rounded-md border border-border bg-background p-3">
                <div className="text-[10px] font-semibold text-foreground">Your free trial has ended</div>
                <p className="text-[9px] text-muted-foreground mt-1">
                  Continue with Premium at {PLAN_PRICE}/month, charged to •••• 4242? Nothing is
                  charged until you confirm.
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => setBChoice("continue")}
                    className="flex-1 rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                  >
                    Yes — charge me {PLAN_PRICE}/mo
                  </button>
                  <button
                    onClick={() => setBChoice("cancel")}
                    className="flex-1 rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    No — cancel my subscription
                  </button>
                </div>
              </div>
            )}

            {bChoice === "continue" && (
              <div className="mt-2 rounded-md border border-border bg-background p-2.5 text-[9px] leading-relaxed">
                <div className="font-semibold text-foreground">Premium active — {PLAN_PRICE}/mo</div>
                <p className="text-muted-foreground mt-0.5">
                  {PLAN_PRICE} was charged to •••• 4242 after you confirmed at the prompt. The
                  renewal reminder and the confirm step were both shown before any charge.
                </p>
              </div>
            )}

            {bChoice === "cancel" && (
              <div className="mt-2 rounded-md border border-border bg-background p-2.5 text-[9px] leading-relaxed">
                <div className="font-semibold text-foreground">Cancelled — nothing charged</div>
                <p className="text-muted-foreground mt-0.5">
                  Your trial was cancelled and the cached card was never charged.
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
              <h3 className="text-[11px] font-semibold">Premium — free trial</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                {trialEndedA
                  ? "Your trial period has concluded."
                  : `${daysLeftA} day${daysLeftA === 1 ? "" : "s"} of free trial remaining.`}
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider rounded-full border px-2 py-0.5 shrink-0 text-red-500 border-red-500/30">
              {trialEndedA ? "S_premium" : "S_trial"}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-md border border-border bg-background px-3 py-2">
            <span className="text-[9px] text-muted-foreground">Cached token T_payment — Visa •••• 4242</span>
            <span className="text-[10px] font-mono font-semibold tabular-nums">{PLAN_PRICE}/mo</span>
          </div>

          {!trialEndedA && (
            <button
              onClick={advanceToExpiryA}
              className="mt-2 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Skip ahead — advance to t_expiry
            </button>
          )}

          {trialEndedA && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Your Premium plan is now active
              </div>
              <p className="text-muted-foreground mt-0.5">
                t ≥ t_expiry fired <strong className="text-foreground">S_account(t): S_trial → S_premium</strong> and{" "}
                <strong className="text-foreground">E_charge(T_payment) = True</strong> — {PLAN_PRICE} was taken from
                the cached card •••• 4242. No prompt, no email warning, no consent dialog:{" "}
                <strong className="text-foreground">Consent_explicit(t) = False</strong>. The charge is technically
                authorized by the pre-auth token but practically forgotten.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
