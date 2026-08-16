"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Positive Or Negative Framing — Condition 2: Visual Weight Asymmetry
 * Between Framing Poles
 *
 * Thesis: paired interface segments present the same information under a
 * gain frame (F_gain) and a loss frame (F_loss). Visual weight W is the
 * product of bounding box area and contrast ratio. The feature triggers
 * if the weight is asymmetrically distributed, with one pole rendered at
 * a multiplier exceeding tau_frame_asymmetry:
 *
 *   max(W(F_gain)/W(F_loss), W(F_loss)/W(F_gain)) > tau_frame_asymmetry
 *
 * Variant A (dark): the gain pole ("Renew at $29/mo — save 40%") is a
 * huge, high-contrast primary button while the loss pole ("Cancel") is a
 * tiny, low-contrast text link. Same decision, wildly unequal visual
 * weight — loss aversion is amplified by the layout itself.
 * Variant B (benign): both poles are equal-size, equal-contrast buttons
 * carrying the same information, so weight stays balanced.
 */

const W_GAIN = 60480; // area 8640 px² × contrast 7.0
const W_LOSS = 5280; // area 2400 px² × contrast 2.2
const RATIO = W_GAIN / W_LOSS; // ≈ 11.45
const TAU = 3.0;

export function PositiveOrNegativeFramingCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [decision, setDecision] = React.useState<"keep" | "cancel" | null>(null);
  const [submitted, setSubmitted] = React.useState(false);

  const reset = () => {
    setDecision(null);
    setSubmitted(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">W(F_gain) = area × contrast</span>
        <span className="font-mono font-semibold tabular-nums">{W_GAIN.toLocaleString()}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">W(F_loss) = area × contrast</span>
        <span className="font-mono font-semibold tabular-nums">{W_LOSS.toLocaleString()}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">max(W_gain/W_loss, W_loss/W_gain)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">
          {RATIO.toFixed(1)}× &gt; {TAU.toFixed(1)}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Your decision</span>
        <span className="font-mono font-semibold tabular-nums">
          {decision ? (decision === "keep" ? "Keep (gain pole)" : "Cancel (loss pole)") : "—"}
        </span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Positive Or Negative Framing: Visual Weight Asymmetry Between Framing Poles"
      caption="Visual Weight Asymmetry Between Framing Poles — the gain-framed renewal is a giant high-contrast button while the loss-framed cancellation is a whisper of grey text; the same decision rendered at wildly different visual weights."
      auditorStats={stats}
      deltaNote="Variant A renders the gain pole at 11.5× the visual weight (area × contrast) of the loss pole, pushing the ratio past tau_frame_asymmetry. Variant B keeps both poles as equal-size, equal-contrast buttons with the exact same information, so the decision is presented without a visual thumb on the scale."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Your Premium plan is renewing</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Renewal is due in 3 days. Renew now at the discounted rate of{" "}
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">$29/mo (save 40%)</span>;
              the standard rate after renewal is $49/mo.
            </p>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                onClick={() => setDecision("keep")}
                className={`rounded-md py-2 text-[10px] font-medium transition-colors cursor-pointer ${
                  decision === "keep"
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600/20 border border-emerald-500/40"
                }`}
              >
                Renew at $29/mo (save 40%)
              </button>
              <button
                onClick={() => setDecision("cancel")}
                className={`rounded-md py-2 text-[10px] font-medium transition-colors cursor-pointer ${
                  decision === "cancel"
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600/20 border border-emerald-500/40"
                }`}
              >
                Cancel my subscription
              </button>
            </div>

            <p className="text-[8px] text-muted-foreground/60 mt-2">
              Cancelling removes access to your 240 documents and offline sync when the current
              period ends.
            </p>

            <button
              onClick={() => setSubmitted(true)}
              disabled={!decision}
              className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                decision
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              Confirm my decision
            </button>
          </div>

          {submitted && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Balanced framing
              </div>
              <p className="text-muted-foreground mt-0.5">
                Both poles carry identical bounding-box areas and contrast ratios, so
                W(F_gain) / W(F_loss) ≈ 1 — far below the asymmetry threshold. The renewal
                decision rests on the information, not on the layout.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Your Premium plan is renewing</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Renewal is due in 3 days. Renew now at the discounted rate of{" "}
            <span className="font-semibold text-rose-600 dark:text-rose-400">$29/mo (save 40%)</span>;
            the standard rate after renewal is $49/mo.
          </p>

          {/* Gain pole — large bounding box, high contrast */}
          <button
            onClick={() => setDecision("keep")}
            className={`mt-3 w-full rounded-md py-3.5 text-[12px] font-bold tracking-wide transition-colors cursor-pointer shadow-lg ${
              decision === "keep"
                ? "bg-rose-600 text-white"
                : "bg-rose-600 text-white hover:bg-rose-700"
            }`}
          >
            Renew at $29/mo — save 40% now
          </button>

          {/* Loss pole — tiny bounding box, low contrast */}
          <div className="mt-4 text-center">
            <button
              onClick={() => setDecision("cancel")}
              className={`text-[8px] transition-colors cursor-pointer ${
                decision === "cancel"
                  ? "text-rose-500 font-semibold"
                  : "text-muted-foreground/40 hover:text-muted-foreground underline"
              }`}
            >
              Cancel my subscription
            </button>
            <p className="text-[7px] text-muted-foreground/40 mt-1">
              You will lose access to your 240 documents and offline sync.
            </p>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            disabled={!decision}
            className={`mt-4 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              decision
                ? "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            Confirm my decision
          </button>
        </div>

        {submitted && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Visual weight asymmetry triggered
            </div>
            <p className="text-muted-foreground">
              The gain pole is a full-width, high-contrast button while the loss pole is a
              8px grey link:{" "}
              <strong className="font-mono text-rose-500">
                W(F_gain) = {W_GAIN.toLocaleString()}, W(F_loss) = {W_LOSS.toLocaleString()}, ratio {RATIO.toFixed(1)}×
              </strong>{" "}
              — far past <span className="font-mono">τ_frame_asymmetry = {TAU.toFixed(1)}</span>.
            </p>
            <p className="text-muted-foreground">
              Visual weight is the product of bounding box area and contrast ratio. Because
              loss aversion makes the tiny, grey &ldquo;cancel&rdquo; feel like a dangerous
              edge, the layout nudges you toward renewal without changing a single word of
              the offer.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
