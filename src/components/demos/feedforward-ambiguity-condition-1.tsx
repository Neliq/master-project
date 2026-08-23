"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Feedforward Ambiguity — Condition 1: Structural Ambiguity of Action-Outcome Mapping
 *
 * Thesis: the algorithm inspects interactive elements whose onclick, href,
 * or formaction targets resolve to state transitions whose semantics
 * conflict with the element's rendered label. Let Expect(L(N)) be the
 * outcome the label promises and Resolve(N) the actual structural target.
 * The feature triggers if their semantic divergence exceeds τ_feedforward:
 *
 *   ∃ N ∈ Interactive : Distance(Expect(L(N)), Resolve(N)) > τ_feedforward
 *
 * Variant A (dark): a "Continue" button whose formaction actually executes
 * SubmitOrder() — placing the order and charging the card.
 * Variant B (benign): the same button labelled with its real outcome.
 */

const TOTAL = "$89.00";
const TAU_FEEDFORWARD = 0.6;

type Step = "review" | "placed";

export function FeedforwardAmbiguityCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [step, setStep] = React.useState<Step>("review");

  const reset = () => setStep("review");

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Expect(L(N))</span>
        <span className="font-mono font-semibold tabular-nums">advance → next step</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Resolve(N) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">SubmitOrder() · charge {TOTAL}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Distance(Expect, Resolve)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">0.87 &gt; &tau;_feedforward ({TAU_FEEDFORWARD})</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Outcome domain</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">D_critical (finance)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Order placed?</span>
        <span className="font-mono font-semibold tabular-nums">{step === "placed" ? "Yes" : "No"}</span>
      </div>
    </>
  ) : null;

  const orderSummary = (promiseReview: boolean) => (
    <div className="mt-3 space-y-1.5 text-[9px] text-muted-foreground">
      <div className="flex justify-between"><span>Studio headphones</span><span className="font-mono">$59.00</span></div>
      <div className="flex justify-between"><span>Carry case</span><span className="font-mono">$25.00</span></div>
      <div className="flex justify-between"><span>Shipping</span><span className="font-mono text-green-600 dark:text-green-400">Free</span></div>
      <div className="flex justify-between border-t border-border pt-1.5 font-semibold text-foreground">
        <span>Total</span><span className="font-mono">{TOTAL}</span>
      </div>
      <p className="text-[8px] text-muted-foreground/60">
        {promiseReview
          ? "Non-refundable once placed. You can review the order again on the next screen."
          : "Non-refundable once placed."}
      </p>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Feedforward Ambiguity: Structural Ambiguity of Action-Outcome Mapping"
      caption="Structural Ambiguity of Action-Outcome Mapping — the 'Continue' button's label promises the next step, but its structural target resolves to submitting the non-refundable order."
      auditorStats={stats}
      deltaNote="In Variant A the 'Continue' button is structurally wired to SubmitOrder() — placing the order and charging $89.00 — and no further review step is promised anywhere, so the label's promise of progression diverges from the actual outcome. Variant B labels the same button 'Place order — $89.00' and explicitly promises a review step, so expectation and resolution match."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Order review</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">Step 2 of 2 — you are at the final confirmation.</p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Expect = Resolve
              </div>
            </div>
            {orderSummary(true)}
            {step === "review" && (
              <button
                onClick={() => setStep("placed")}
                className="mt-3 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Place order — {TOTAL}
              </button>
            )}
          </div>

          {step === "placed" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Order placed as advertised
              </div>
              <p className="text-muted-foreground mt-0.5">
                The button said &ldquo;Place order — {TOTAL}&rdquo; and that is exactly what happened. The feedforward
                cue told you the outcome before you clicked: Distance(Expect, Resolve) ≈ 0.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Order review</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">Step 2 of 3 — one more step after this one.</p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Expect ≠ Resolve
            </div>
          </div>
          {orderSummary(false)}
          {step === "review" && (
            <button
              onClick={() => setStep("placed")}
              className="mt-3 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Continue
            </button>
          )}
        </div>

        {step === "placed" && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Action-outcome mapping conflicted
            </div>
            <p className="text-muted-foreground">
              You clicked <strong className="text-red-500">“Continue”</strong> expecting to advance to the next step.
              But the button&rsquo;s structural target — its formaction — resolves to{" "}
              <strong className="text-foreground">SubmitOrder()</strong>: your order was placed and{" "}
              <strong className="text-foreground">{TOTAL}</strong> charged, non-refundably.
            </p>
            <p className="text-muted-foreground">
              Distance(Expect(&ldquo;Continue&rdquo;), SubmitOrder()) = <span className="font-mono text-red-500">0.87 &gt; &tau;_feedforward ({TAU_FEEDFORWARD})</span>.
              The label and the execution semantics diverge, and the outcome lives in a high-stakes financial domain.
            </p>
            <p className="text-muted-foreground">
              There was no next step. &ldquo;Continue&rdquo; was the final purchase action all along — feedforward
              stripped, commitment hidden.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
