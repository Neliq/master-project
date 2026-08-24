"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Pressured Selling — Condition 2: Localized Temporal or Visual Constraints
 *
 * Thesis: T_offer is a dynamic temporal node (countdown timer) bound to the
 * secondary offer I_secondary inside the modal, with Δt_offer the total
 * duration of the countdown. V_animations is the set of CSS properties tied
 * to high-stress visual stimuli (blinking text, shaking elements, flashing
 * backgrounds). The feature triggers if the timer is extremely short
 * (e.g. under τ_panic_duration = 5 minutes) or paired with aggressive
 * attention-hijacking animations:
 *
 *   Δt_offer < τ_panic_duration  ∨  (CSS(M_upsell) ∩ V_animations ≠ ∅)
 *
 * Variant A (dark): a 0:59 countdown with blinking "HURRY!" text and a
 * shaking card — the offer actually expires when the timer hits zero.
 * Variant B (benign): the same offer with no timer and no animation — the
 * price is simply guaranteed for the next 30 days.
 */

const PANIC_SECONDS = 59; // Δt_offer
const TAU_PANIC_SECONDS = 300; // τ_panic_duration = 5 min

export function PressuredSellingCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [offerOpen, setOfferOpen] = React.useState(true);
  const [decision, setDecision] = React.useState<null | "accepted" | "declined">(null);
  const [secondsLeft, setSecondsLeft] = React.useState(PANIC_SECONDS);

  const reset = () => {
    setOfferOpen(true);
    setDecision(null);
    setSecondsLeft(PANIC_SECONDS);
  };

  // The synthetic countdown only ticks while the modal is open and undecided.
  React.useEffect(() => {
    if (!offerOpen || decision !== null) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [offerOpen, decision]);

  const expired = secondsLeft === 0 && decision === null;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δt_offer (countdown)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">
          {secondsLeft}s
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_panic_duration</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_PANIC_SECONDS}s (5 min)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δt_offer &lt; τ_panic_duration</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">True</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">CSS(M_upsell) ∩ V_animations</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{'{blink, shake} ≠ ∅'}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pressured Selling: Localized Temporal or Visual Constraints"
      caption="Localized Temporal or Visual Constraints — a sub-five-minute countdown and aggressive animations manufacture urgency around the secondary offer."
      auditorStats={stats}
      deltaNote="In Variant A the offer carries a 0:59 countdown (Δt_offer = 59s < τ_panic_duration = 300s) plus blinking and shaking animations, and the offer genuinely expires. In Variant B the identical offer has no timer and no animation — the price is simply guaranteed for 30 days."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Protect your purchase</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5 leading-relaxed">
                  Add a <strong>2-Year Extended Care Plan</strong> for{" "}
                  <span className="font-mono tabular-nums">$19.99</span> one-time.
                </p>
              </div>
              <div className="shrink-0 rounded-full border border-green-500/30 px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                No timer
              </div>
            </div>

            <div className="mt-2.5 rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[9px] leading-relaxed text-green-700 dark:text-green-300">
              <strong>Price guaranteed for the next 30 days.</strong> You can decide now, or come
              back later — the offer will still be here.
            </div>

            {decision === null ? (
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDecision("accepted")}
                  className="rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  Add for $19.99
                </button>
                <button
                  onClick={() => setDecision("declined")}
                  className="rounded-md border border-border bg-background hover:bg-muted py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  No thanks
                </button>
              </div>
            ) : (
              <div className="mt-2.5 rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[9px] text-green-700 dark:text-green-300">
                {decision === "accepted"
                  ? "Protection plan added to your order — calmly, at your own pace."
                  : "Offer declined. No urgency, no deadline — the choice was easy."}
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div
          className="rounded-md border-2 border-red-500/50 bg-card p-3"
          style={expired ? undefined : { animation: "dp-shake 0.5s linear infinite" }}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Protect your purchase</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5 leading-relaxed">
                Add a <strong>2-Year Extended Care Plan</strong> for{" "}
                <span className="font-mono tabular-nums">$19.99</span> one-time.
              </p>
            </div>
            <div
              className="shrink-0 rounded-md border-2 border-red-500 bg-red-500/10 px-2 py-1 text-center"
              style={{ animation: expired ? undefined : "dp-blink 0.6s linear infinite" }}
            >
              <div className="font-mono text-[12px] font-bold tabular-nums text-red-600 dark:text-red-400 leading-none">
                {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}
              </div>
              <div className="text-[7px] font-bold uppercase tracking-widest text-red-500/80 mt-0.5">
                left!
              </div>
            </div>
          </div>

          {expired ? (
            <div className="mt-2.5 rounded-md border border-red-500/40 bg-red-500/5 p-2 text-[9px] leading-relaxed text-red-700 dark:text-red-300">
              <strong>Offer expired.</strong> The countdown hit zero while you were deciding.
              The $19.99 price is gone — refresh the page to see it &ldquo;restock&rdquo; at $39.99.
            </div>
          ) : (
            <>
              <div
                className="mt-2.5 rounded-md border border-red-500/40 bg-red-500/5 p-2 text-[9px] leading-relaxed text-red-700 dark:text-red-300"
                style={{ animation: "dp-blink 0.8s linear infinite" }}
              >
                <strong>HURRY!</strong> Only {Math.max(secondsLeft, 0)} seconds left at this price!
              </div>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDecision("accepted")}
                  className="rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  Add for $19.99
                </button>
                <button
                  onClick={() => setDecision("declined")}
                  className="rounded-md border border-border bg-background hover:bg-muted py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  No thanks
                </button>
              </div>
              <p className="text-[8px] text-muted-foreground/60 mt-2 text-center">
                Offer expires in 59 seconds
              </p>
            </>
          )}
        </div>

        {decision !== null && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Offer ends soon
            </div>
            <p className="text-muted-foreground">
              The blinking countdown and shaking card are{" "}
              <strong className="text-foreground">CSS(M_upsell) ∩ V_animations ≠ ∅</strong>{" "}
              — attention-hijacking stimuli designed to make you decide before the
              timer drains. The deadline is manufactured: the price was never
              actually time-limited.
            </p>
          </div>
        )}

        <style>{`
          @keyframes dp-shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-2px); }
            40% { transform: translateX(2px); }
            60% { transform: translateX(-2px); }
            80% { transform: translateX(2px); }
          }
          @keyframes dp-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.25; }
          }
        `}</style>
      </div>
    </DemoShell>
  );
}
