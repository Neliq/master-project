"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Countdown Timer — Condition 2: Cognitive Compression
 *
 * Thesis: Delta t_timer is the duration of the countdown and
 * tau_deliberation the baseline threshold required for a human to process
 * terms and evaluate alternatives. The feature triggers if the system
 * deliberately configures the window shorter than the deliberation
 * requirement, enforcing an impulsive, under-informed transaction:
 *
 *   Delta t_timer < tau_deliberation  ⟹  Probability(Rational_Evaluation) → 0
 *
 * Variant A (dark): a 15-second window to read the terms and decide —
 * the order is auto-confirmed when the clock hits zero, before a human
 * could deliberate. Variant B (benign): a 90-second window (≥ threshold),
 * and nothing is auto-confirmed; you decide at your own pace.
 */

const ITEM_NAME = "ProStream Annual Plan";
const TERMS = [
  "1. Renews automatically at $49.00/month after the first year.",
  "2. You can cancel at any time in Settings — no phone call needed.",
  "3. No refunds for partial months once the renewal charge is made.",
];

const TAU_DELIBERATION = 60; // seconds a human needs to process terms
const TIMER_A_S = 15; // Δt_timer — deliberately below the threshold
const TIMER_B_S = 90; // Δt_timer — at or above the threshold

function fmt(s: number): string {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function CountdownTimerCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [secondsA, setSecondsA] = React.useState(TIMER_A_S);
  const [secondsB, setSecondsB] = React.useState(TIMER_B_S);
  const [confirmedAOverride, setConfirmedAOverride] = React.useState(false);
  const [confirmedBOverride, setConfirmedBOverride] = React.useState(false);

  // One shared ticker keeps both countdowns in sync.
  React.useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsA((s) => (s > 0 ? s - 1 : 0));
      setSecondsB((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Variant A: the compressed window auto-confirms the order at zero.
  // Derived from the timer state (no effect needed).
  const confirmedA = secondsA === 0 || confirmedAOverride;
  const confirmedB = secondsB === 0 || confirmedBOverride;

  const reset = () => {
    setSecondsA(TIMER_A_S);
    setSecondsB(TIMER_B_S);
    setConfirmedAOverride(false);
    setConfirmedBOverride(false);
  };

  const expiredA = secondsA === 0;
  const expiredB = secondsB === 0;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&Delta;t_timer — Variant A</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{TIMER_A_S}s &lt; &tau; = {TAU_DELIBERATION}s</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&Delta;t_timer — Variant B</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{TIMER_B_S}s &ge; &tau; = {TAU_DELIBERATION}s</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&tau;_deliberation (baseline)</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_DELIBERATION}s</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P(Rational_Evaluation)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">&rarr; 0 (A) / &asymp; 1 (B)</span>
      </div>
    </>
  ) : null;

  const termsCard = (
    <div className="rounded-md border border-border bg-background p-2.5">
      <div className="flex items-center justify-between text-[9px]">
        <span className="font-mono font-medium text-muted-foreground">Terms &amp; conditions — read before deciding</span>
        <span className="font-mono font-semibold tabular-nums text-muted-foreground">~{TAU_DELIBERATION}s reading time</span>
      </div>
      <ul className="mt-1.5 space-y-1">
        {TERMS.map((t) => (
          <li key={t} className="text-[8px] leading-snug text-muted-foreground">{t}</li>
        ))}
      </ul>
    </div>
  );

  const timerBadge = (time: string, tone: "rose" | "emerald") => (
    <div className={`flex items-center justify-between rounded-md border px-2.5 py-2 ${
      tone === "rose" ? "border-red-500/40 bg-red-500/10" : "border-green-500/40 bg-green-500/10"
    }`}>
      <span className="text-[9px] font-medium text-muted-foreground">
        {tone === "rose" ? "Time left to confirm — the order auto-confirms at 00:00" : "Time left to confirm — nothing auto-confirms"}
      </span>
      <span className={`font-mono text-[12px] font-bold tabular-nums tracking-wider ${
        tone === "rose" ? "text-red-600 dark:text-red-300" : "text-green-600 dark:text-green-300"
      }`}>
        {time}
      </span>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Countdown Timer: Cognitive Compression"
      caption="Cognitive Compression — the decision window is deliberately shorter than the time a human needs to read the terms, driving the probability of rational evaluation toward zero."
      auditorStats={stats}
      deltaNote={`The terms are identical in both panels. Variant A squeezes the decision into ${TIMER_A_S}s (Δt_timer = ${TIMER_A_S}s < τ_deliberation = ${TAU_DELIBERATION}s) and auto-confirms the order at zero. Variant B gives ${TIMER_B_S}s (≥ the deliberation threshold) and never auto-confirms — the rational-evaluation path stays open.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">{ITEM_NAME}</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              First year <span className="font-bold text-green-600 dark:text-green-400">$99</span>, then $49/month.
              Take the time you need — the offer stands while the window above remains open.
            </p>
          </div>

          {termsCard}
          {timerBadge(fmt(secondsB), "emerald")}

          <button
            onClick={() => setConfirmedBOverride(true)}
            disabled={confirmedB}
            className={`w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              confirmedB
                ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            }`}
          >
            {confirmedB ? "Confirmed ✓" : "I have read the terms — confirm purchase"}
          </button>

          {expiredB && !confirmedB && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Window closed, nothing happened
              </div>
              <p className="text-muted-foreground mt-0.5">
                The countdown reached zero without any action — no auto-confirmation, no surprise charge. Deliberation
                was never compressed out of the transaction.
              </p>
            </div>
          )}

          {mode === "auditor" && confirmedB && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <p className="text-muted-foreground">
                With &Delta;t_timer = {TIMER_B_S}s &ge; &tau;_deliberation = {TAU_DELIBERATION}s, Probability(Rational_Evaluation) stayed
                high — you read the terms and confirmed deliberately.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">{ITEM_NAME}</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            First year <span className="font-bold text-red-600 dark:text-red-400">$99</span>, then $49/month.
            Hurry — the discounted price is only guaranteed while the timer runs!
          </p>
        </div>

        {termsCard}
        {timerBadge(fmt(secondsA), "rose")}

        <button
          onClick={() => setConfirmedAOverride(true)}
          disabled={expiredA || confirmedA}
          className={`w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
            expiredA || confirmedA
              ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          }`}
        >
          {expiredA ? "Auto-confirmed at 00:00" : confirmedA ? "Confirmed ✓" : "Confirm purchase now"}
        </button>

        {mode === "auditor" && confirmedA && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Order confirmed
            </div>
            <p className="text-muted-foreground">
              {expiredA
                ? `The window was ${TIMER_A_S}s — far below the ${TAU_DELIBERATION}s deliberation threshold. When it hit zero, your order was auto-confirmed: Probability(Rational_Evaluation) → 0, because the terms could not physically be processed in time.`
                : `You confirmed manually — but with only ${TIMER_A_S}s on the clock, the terms card (~${TAU_DELIBERATION}s of reading) could not be processed before the deadline loomed. The window was deliberately configured below &tau;_deliberation.`}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
