"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Limited Time Message — Condition 3: Ambiguous Temporal Bounding
 *
 * Thesis: M_urgency is the promotional text node and T_end the factual
 * backend expiration. The feature triggers if the interface maximises the
 * emotional arousal of the message while driving factual specificity to
 * zero, preventing rational schedule planning or comparison:
 *
 *   Specificity(M_urgency) ≈ 0  ∧  T_end ∉ DOM  =>  Urgency_perceived → Max
 *
 * Variant A (dark): “Sale ends soon!” with no expiration timestamp anywhere
 * in the DOM.
 * Variant B (benign): the same sale with a concrete deadline (Friday 23:59
 * CET), restoring the ability to plan.
 */

const VAGUE_ANSWERS = [
  "Very soon!",
  "We can't disclose the exact time.",
  "Soon. Act now to be safe.",
  "The offer ends “when supply runs out” — no date is published.",
];

export function LimitedTimeMessageCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [asked, setAsked] = React.useState(0);
  const [planned, setPlanned] = React.useState(false);

  const reset = () => {
    setAsked(0);
    setPlanned(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Specificity(M_urgency) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">≈ 0.00</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Specificity(M_urgency) — benign</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">1.00 (“Friday 23:59 CET”)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">T_end ∈ DOM (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">No — absent</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">T_end ∈ DOM (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">Fri 23:59 CET</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Urgency_perceived</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">→ Max</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Vague answers given</span>
        <span className="font-mono font-semibold tabular-nums">{asked}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Limited Time Message: Ambiguous Temporal Bounding"
      caption="Ambiguous Temporal Bounding — emotional arousal is maximised while factual specificity drops to ≈ 0, so no expiration timestamp exists in the DOM and rational schedule planning is impossible."
      auditorStats={stats}
      deltaNote="In Variant A the offer says only “ends soon” — Specificity(M) ≈ 0 and T_end never appears in the DOM, so the user cannot schedule or compare. Variant B states a concrete deadline (Friday 23:59 CET), restoring the ability to plan."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2.5 dark:border-emerald-500/30 dark:bg-emerald-500/10">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                Seasonal sale — ends Friday 23:59
              </div>
              <div className="mt-1 text-[10px] font-semibold text-foreground">40% off everything.</div>
              <div className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">
                Deadline: <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-300">Friday, 23:59 CET</span> — 2 days, 6 hours from now.
              </div>
            </div>

            <button
              onClick={() => setAsked((a) => a + 1)}
              className="mt-2.5 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              When exactly does it end?
            </button>

            {asked > 0 && (
              <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">Concrete answer:</span>{" "}
                <span className="text-muted-foreground">
                  Friday 23:59 CET. That timestamp exists in the DOM, so you can schedule
                  your purchase — and your comparison shopping — around a real constraint.
                </span>
              </div>
            )}

            <button
              onClick={() => setPlanned(true)}
              className="mt-2 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Plan my purchase
            </button>
          </div>

          {planned && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Planned against a real deadline
              </div>
              <p className="text-muted-foreground mt-0.5">
                T_end = Friday 23:59 CET is concrete and verifiable: compare prices today,
                buy before the deadline. Rational scheduling is possible.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="rounded-md bg-gradient-to-br from-rose-500 to-red-600 px-3 py-2.5 text-white">
            <div className="text-[10px] font-bold uppercase tracking-wider">Hurry — sale ends soon!</div>
            <div className="mt-1 text-[10px] font-semibold">40% off everything.</div>
            <div className="mt-0.5 text-[9px] leading-relaxed text-white/85">
              Don&rsquo;t risk missing out — the offer could disappear at any moment.
            </div>
          </div>

          <button
            onClick={() => setAsked((a) => a + 1)}
            className="mt-2.5 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            When exactly does it end?
          </button>

          {asked > 0 && (
            <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
              <span className="font-semibold text-amber-700 dark:text-amber-300">Answer:</span>{" "}
              <span className="text-muted-foreground">
                &ldquo;{VAGUE_ANSWERS[Math.min(asked - 1, VAGUE_ANSWERS.length - 1)]}&rdquo;
              </span>
            </div>
          )}

          <button
            onClick={() => setPlanned(true)}
            className="mt-2 w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Plan my purchase
          </button>
        </div>

        {planned && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Ambiguous temporal bounding triggered
            </div>
            <p className="text-muted-foreground">
              Specificity(M_urgency) ≈ 0 and T_end ∉ DOM — there is no timestamp anywhere
              in this interface. You cannot schedule, compare, or verify the claim, yet the
              message is engineered to maximise urgency: Urgency_perceived → Max.
            </p>
            <p className="text-muted-foreground">
              Ask as many times as you like — the answer stays vague, because the backend
              deadline is deliberately kept out of the DOM.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
