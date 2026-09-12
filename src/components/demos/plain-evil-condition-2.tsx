"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Plain Evil (Theoretical Construct) — Condition 2: Visual Hostility
 * Density Index
 *
 * Thesis: the algorithm computes a compound hostility score H over the
 * entire viewport by aggregating visual-manipulation signals:
 * dark-pattern-classified bounding boxes, urgency-color palettes
 * (red/orange dominance), and below-threshold font sizes on
 * cancellation vectors. The feature triggers when the spatial density of
 * hostile visual markers exceeds a compound threshold:
 *
 *   H = sum_i [1_hostile(N_i) * w_i] / A_viewport > tau_hostility
 *
 * Variant A (dark): a cancellation gauntlet — every retention vector is
 * a big, urgent, red/orange element while the actual cancel path is an
 * 8px grey link (below-threshold font size on a cancellation vector).
 * Variant B (benign): the same facts (renewal date, price rise, all
 * retention options) rendered with neutral colors and equal-size,
 * equal-contrast buttons, so no hostile markers exist.
 */

const HOSTILE_WEIGHT = 8.0; // sum of 1_hostile * w_i
const AREA_VIEWPORT = 32; // normalized units
const H_INDEX = HOSTILE_WEIGHT / AREA_VIEWPORT; // 0.25
const TAU_HOSTILITY = 0.2;
const CANCEL_FONT_PX = 8; // below-threshold cancellation vector

type Decision = "keep" | "pause" | "downgrade" | "cancel" | null;

export function PlainEvilCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [decisionA, setDecisionA] = React.useState<Decision>(null);
  const [decisionB, setDecisionB] = React.useState<Decision>(null);
  const [submittedA, setSubmittedA] = React.useState(false);
  const [submittedB, setSubmittedB] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Plain Evil (Theoretical Construct): Visual Hostility Density Index"
      userTitle="CloudPhoto — Manage subscription"
      caption="Visual Hostility Density Index — a cancellation page where every retention vector screams in red and orange while the cancel path shrinks to an 8px grey whisper, saturating the viewport with hostile visual markers."
      deltaNote="Both variants communicate the same facts: renewal in 2 days, price rising from $59 to $99/yr, and the availability of keep / pause / downgrade / cancel. Variant A renders them as a hostile gauntlet — urgency banners in red/orange, oversized retention buttons, and an 8px cancel link (H = 0.25 > tau). Variant B uses neutral colors and four equal-size, equal-contrast buttons, so no hostile markers exist (H ≈ 0). The displayed values are illustrative Variant-A inputs; the benign zero baseline is a qualitative comparison rather than a live DOM measurement."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Manage your subscription</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Your plan renews on <span className="font-medium text-foreground">Aug 17</span>.
              Current rate: $59/yr. Standard rate from renewal: $99/yr. You can keep your
              plan, pause it, downgrade, or cancel.
            </p>

            <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              <button
                aria-pressed={decisionB === "keep"}
                onClick={() => setDecisionB("keep")}
                className={`rounded-md border py-2 text-[12px] font-medium transition-colors cursor-pointer ${
                  decisionB === "keep"
                    ? "border-border bg-primary text-primary-foreground"
                    : "border-border/60 bg-muted/40 text-foreground hover:bg-muted/60"
                }`}
              >
                Keep my plan
              </button>
              <button
                aria-pressed={decisionB === "pause"}
                onClick={() => setDecisionB("pause")}
                className={`rounded-md border py-2 text-[12px] font-medium transition-colors cursor-pointer ${
                  decisionB === "pause"
                    ? "border-border bg-primary text-primary-foreground"
                    : "border-border/60 bg-muted/40 text-foreground hover:bg-muted/60"
                }`}
              >
                Pause for 1 month
              </button>
              <button
                aria-pressed={decisionB === "downgrade"}
                onClick={() => setDecisionB("downgrade")}
                className={`rounded-md border py-2 text-[12px] font-medium transition-colors cursor-pointer ${
                  decisionB === "downgrade"
                    ? "border-border bg-primary text-primary-foreground"
                    : "border-border/60 bg-muted/40 text-foreground hover:bg-muted/60"
                }`}
              >
                Downgrade to Basic
              </button>
              <button
                aria-pressed={decisionB === "cancel"}
                onClick={() => setDecisionB("cancel")}
                className={`rounded-md border py-2 text-[12px] font-medium transition-colors cursor-pointer ${
                  decisionB === "cancel"
                    ? "border-border bg-primary text-primary-foreground"
                    : "border-border/60 bg-muted/40 text-foreground hover:bg-muted/60"
                }`}
              >
                Cancel my subscription
              </button>
            </div>

            <p className="text-[8px] text-muted-foreground/60 mt-2">
              All four options are equally easy to reach. Cancelling takes effect at the end
              of your current period.
            </p>

            <button
              onClick={() => setSubmittedB(true)}
              disabled={!decisionB || submittedB}
              className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                decisionB
                  ? "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              {submittedB ? "Saved" : "Confirm"}
            </button>
          </div>

          {submittedB && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Preferences saved
              </div>
              <p className="text-muted-foreground mt-0.5">
                Your subscription preference was saved. Each option was presented with the same size,
                contrast, and wording, so the decision remained yours to make.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          {/* Urgency-color palette: red/orange dominance */}
          <div className="space-y-1.5">
            <div data-dp-color-signal className="flex items-center gap-1.5 rounded-md border border-orange-500/50 bg-orange-500/15 px-2 py-1.5 text-[9px] font-bold text-orange-700 dark:text-orange-300">
              <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Last chance to keep your 40% discount!
            </div>
            <div data-dp-color-signal className="flex items-center gap-1.5 rounded-md border border-red-500/50 bg-red-500/15 px-2 py-1.5 text-[9px] font-bold text-red-700 dark:text-red-300">
              <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 9v4m0 4h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
              </svg>
              Your plan renews in 2 days — price rises to $99/yr!
            </div>
            <div data-dp-color-signal className="flex items-center gap-1.5 justify-center rounded-md border border-red-500/40 bg-red-500/10 px-2 py-1 font-mono text-[10px] font-bold text-red-600 dark:text-red-400">
              RENEWAL: AUG 17 AT 11:59 PM
            </div>
          </div>

          {/* Retention vectors — big, bright, urgent */}
          <div className="mt-2 space-y-1.5">
            <button
              data-dp-color-signal
              aria-pressed={decisionA === "keep"}
              onClick={() => setDecisionA("keep")}
              className={`w-full rounded-md py-2.5 text-[11px] font-bold transition-colors cursor-pointer ${
                decisionA === "keep" ? "bg-orange-600 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              Keep my plan &amp; discount
            </button>
            <button
              data-dp-color-signal
              aria-pressed={decisionA === "pause"}
              onClick={() => setDecisionA("pause")}
              className={`w-full rounded-md py-2 text-[10px] font-semibold transition-colors cursor-pointer ${
                decisionA === "pause" ? "bg-red-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              Pause for 1 month
            </button>
            <button
              aria-pressed={decisionA === "downgrade"}
              onClick={() => setDecisionA("downgrade")}
              className={`w-full rounded-md py-2 text-[10px] font-medium transition-colors cursor-pointer ${
                decisionA === "downgrade" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Downgrade to Basic
            </button>
          </div>

          {/* Cancellation vector — below-threshold font size, low contrast */}
          <div className="mt-3 text-center">
            <button
              onClick={() => setDecisionA("cancel")}
              aria-pressed={decisionA === "cancel"}
              className={`text-[8px] transition-colors cursor-pointer ${
                decisionA === "cancel"
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground/40 hover:text-muted-foreground underline"
              }`}
            >
              Cancel my subscription
            </button>
            <p className="text-[7px] text-muted-foreground/40 mt-1">
              You will keep access through the current billing period after cancellation.
            </p>
          </div>

          <button
            data-dp-color-signal
            onClick={() => setSubmittedA(true)}
            disabled={!decisionA || submittedA}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              decisionA
                ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            {submittedA ? "Saved" : "Confirm"}
          </button>
        </div>

        {submittedA && (
          <div role="status" aria-live="polite" className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Subscription preference saved
            </div>
            {mode === "auditor" ? (
              <>
                <p className="text-muted-foreground">
                  <strong className="font-mono text-red-500">
                    H = {HOSTILE_WEIGHT.toFixed(1)} / {AREA_VIEWPORT} = {H_INDEX.toFixed(2)} &gt; τ_hostility = {TAU_HOSTILITY.toFixed(2)}
                  </strong>{" "}
                  — urgency banners (weighted red/orange markers), the bright retention buttons,
                  and the below-threshold <strong className="font-mono">{CANCEL_FONT_PX}px</strong>{" "}
                  cancellation vector saturate the viewport with hostile visual markers.
                </p>
                <p className="text-muted-foreground">
                  Every pixel of urgency argues against the exit: the eye is dragged to
                  countdowns and discounts while the actual cancel path is engineered to be
                  missed. Visual hostility density is how the interface wins the attrition war
                  without a single honest sentence.
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">Your subscription preference was saved for the current billing period.</p>
            )}
          </div>
        )}
      </div>
    </DemoShell>
  );
}
