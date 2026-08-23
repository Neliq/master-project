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
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [decision, setDecision] = React.useState<Decision>(null);
  const [submitted, setSubmitted] = React.useState(false);

  const reset = () => {
    setDecision(null);
    setSubmitted(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Σ 1_hostile(N_i)·w_i</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{HOSTILE_WEIGHT.toFixed(1)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A_viewport</span>
        <span className="font-mono font-semibold tabular-nums">{AREA_VIEWPORT} u²</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">H = Σw / A</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">
          {H_INDEX.toFixed(2)} &gt; {TAU_HOSTILITY.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Cancel vector font size</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{CANCEL_FONT_PX}px (&lt; 12px)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Your decision</span>
        <span className="font-mono font-semibold tabular-nums">{decision ?? "—"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Plain Evil (Theoretical Construct): Visual Hostility Density Index"
      caption="Visual Hostility Density Index — a cancellation page where every retention vector screams in red and orange while the cancel path shrinks to an 8px grey whisper, saturating the viewport with hostile visual markers."
      auditorStats={stats}
      deltaNote="Both variants communicate the same facts: renewal in 2 days, price rising from $59 to $99/yr, and the availability of keep / pause / downgrade / cancel. Variant A renders them as a hostile gauntlet — urgency banners in red/orange, oversized retention buttons, and an 8px cancel link (H = 0.25 > tau). Variant B uses neutral colors and four equal-size, equal-contrast buttons, so no hostile markers exist (H ≈ 0)."
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
                onClick={() => setDecision("keep")}
                className={`rounded-md border py-2 text-[10px] font-medium transition-colors cursor-pointer ${
                  decision === "keep"
                    ? "border-green-500 bg-green-600 text-white"
                    : "border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-300 hover:bg-green-500/20"
                }`}
              >
                Keep my plan
              </button>
              <button
                onClick={() => setDecision("pause")}
                className={`rounded-md border py-2 text-[10px] font-medium transition-colors cursor-pointer ${
                  decision === "pause"
                    ? "border-green-500 bg-green-600 text-white"
                    : "border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-300 hover:bg-green-500/20"
                }`}
              >
                Pause for 1 month
              </button>
              <button
                onClick={() => setDecision("downgrade")}
                className={`rounded-md border py-2 text-[10px] font-medium transition-colors cursor-pointer ${
                  decision === "downgrade"
                    ? "border-green-500 bg-green-600 text-white"
                    : "border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-300 hover:bg-green-500/20"
                }`}
              >
                Downgrade to Basic
              </button>
              <button
                onClick={() => setDecision("cancel")}
                className={`rounded-md border py-2 text-[10px] font-medium transition-colors cursor-pointer ${
                  decision === "cancel"
                    ? "border-green-500 bg-green-600 text-white"
                    : "border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-300 hover:bg-green-500/20"
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
              onClick={() => setSubmitted(true)}
              disabled={!decision}
              className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                decision
                  ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              Confirm
            </button>
          </div>

          {submitted && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                No hostile markers
              </div>
              <p className="text-muted-foreground mt-0.5">
                Neutral colors, equal buttons, normal-size text: the viewport contains no
                urgency palettes and no below-threshold cancellation vectors, so H stays at
                0. The retention decision is yours to make without visual pressure.
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
            <div className="flex items-center gap-1.5 rounded-md border border-yellow-500/50 bg-yellow-500/15 px-2 py-1.5 text-[9px] font-bold text-yellow-700 dark:text-yellow-300">
              <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Last chance to keep your 40% discount!
            </div>
            <div className="flex items-center gap-1.5 rounded-md border border-red-500/50 bg-red-500/15 px-2 py-1.5 text-[9px] font-bold text-red-700 dark:text-red-300">
              <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 9v4m0 4h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
              </svg>
              Your plan renews in 2 days — price rises to $99/yr!
            </div>
            <div className="flex items-center gap-1.5 justify-center rounded-md border border-red-500/40 bg-red-500/10 px-2 py-1 font-mono text-[10px] font-bold text-red-600 dark:text-red-400">
              RENEWS IN 47:59
            </div>
          </div>

          {/* Retention vectors — big, bright, urgent */}
          <div className="mt-2 space-y-1.5">
            <button
              onClick={() => setDecision("keep")}
              className={`w-full rounded-md py-2.5 text-[11px] font-bold transition-colors cursor-pointer ${
                decision === "keep" ? "bg-yellow-600 text-white" : "bg-yellow-500 hover:bg-yellow-600 text-white"
              }`}
            >
              Keep my plan &amp; discount
            </button>
            <button
              onClick={() => setDecision("pause")}
              className={`w-full rounded-md py-2 text-[10px] font-semibold transition-colors cursor-pointer ${
                decision === "pause" ? "bg-red-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              Pause for 1 month
            </button>
            <button
              onClick={() => setDecision("downgrade")}
              className={`w-full rounded-md py-2 text-[10px] font-medium transition-colors cursor-pointer ${
                decision === "downgrade" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Downgrade to Basic
            </button>
          </div>

          {/* Cancellation vector — below-threshold font size, low contrast */}
          <div className="mt-3 text-center">
            <button
              onClick={() => setDecision("cancel")}
              className={`text-[8px] transition-colors cursor-pointer ${
                decision === "cancel"
                  ? "text-red-500 font-semibold"
                  : "text-muted-foreground/40 hover:text-muted-foreground underline"
              }`}
            >
              Cancel my subscription
            </button>
            <p className="text-[7px] text-muted-foreground/40 mt-1">
              You will lose access to your premium features immediately after renewal.
            </p>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            disabled={!decision}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              decision
                ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            Confirm
          </button>
        </div>

        {mode === "auditor" && submitted && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Review your order
            </div>
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
          </div>
        )}
      </div>
    </DemoShell>
  );
}
