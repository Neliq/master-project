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
const ORDER_ID = "DF-20481";

type Step = "review" | "placed";

export function FeedforwardAmbiguityCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [step, setStep] = React.useState<Step>("review");
  const [charged, setCharged] = React.useState(false);


  const orderSummary = (promiseReview: boolean) => (
    <div className="mt-3 space-y-1.5 text-[9px] text-muted-foreground">
      <div className="flex justify-between"><span>Studio headphones</span><span className="font-mono">$59.00</span></div>
      <div className="flex justify-between"><span>Carry case</span><span className="font-mono">$25.00</span></div>
      <div className="flex justify-between"><span>Shipping</span><span className="font-mono text-foreground">Free</span></div>
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
    <DemoShell mode={mode}
      title="Feedforward Ambiguity: Structural Ambiguity of Action-Outcome Mapping"
      caption="Structural Ambiguity of Action-Outcome Mapping — the 'Continue' button's label promises the next step, but its structural target resolves to submitting the non-refundable order."
      deltaNote="In Variant A the 'Continue' button is structurally wired to SubmitOrder() — placing the order and charging $89.00 — and no further review step is promised anywhere, so the label's promise of progression diverges from the actual outcome. Variant B labels the same button 'Place order — $89.00' and explicitly promises a review step, so expectation and resolution match."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Order review</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">Step 2 of 2 — you are at the final confirmation.</p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
                Expect = Resolve
              </div>
            </div>
            {orderSummary(true)}
            {step === "review" && (
              <button
                onClick={() => setStep("placed")}
                className="mt-3 w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Place order — {TOTAL}
              </button>
            )}
          </div>

          {step === "placed" && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
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
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
              {mode === "auditor" ? "Expect ≠ Resolve" : "Order summary"}
            </div>
          </div>
          {orderSummary(false)}
          {step === "review" && (
            <button
              onClick={() => { setCharged(true); setStep("placed"); }}
              className="mt-3 w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Continue
            </button>
          )}
        </div>

        {step === "placed" && (
          <div className="rounded-md border bg-background p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold">Order confirmed</div>
                <div className="text-[9px] text-muted-foreground">Studio headphones · 1 item · Order {ORDER_ID}</div>
              </div>
              <span className="font-mono text-[10px] font-semibold">{TOTAL}</span>
            </div>
            <div className="mt-2 border-t pt-2 text-[9px] text-muted-foreground">Charged {charged ? TOTAL : "—"} · receipt sent to your account.</div>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
