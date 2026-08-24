"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Feedforward Ambiguity — Condition 3: Semantic Divergence of Action and Outcome
 *
 * Thesis: L(n) is the text label of an interactive node (e.g. "Next" or
 * "I Agree"). Intent_NLP(L(n)) is its predicted intent; Outcome_System(n)
 * is the actual backend execution triggered (e.g. SubmitPayment() or
 * OptInAll()). The feature triggers if their semantic similarity falls
 * below a clarity threshold, particularly when the outcome sits in a
 * high-stakes domain D_critical such as finance or data privacy:
 *
 *   Sim(Intent_NLP(L(n)), Outcome_System(n)) < τ_clarity
 *     ∧  Outcome_System(n) ∈ D_critical
 *
 * Variant A (dark): "Next" on the billing step executes OptInAll() —
 * a paid, auto-renewing subscription plus marketing opt-ins.
 * Variant B (benign): the button is labelled with its true outcome.
 */

const TAU_CLARITY = 0.6;
const SIM_DARK = 0.11;

type Step = 1 | 2 | "done";

export function FeedforwardAmbiguityCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [step, setStep] = React.useState<Step>(1);
  const [subscribed, setSubscribed] = React.useState(false);

  const reset = () => {
    setStep(1);
    setSubscribed(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Intent_NLP(L(n))</span>
        <span className="font-mono font-semibold tabular-nums">&ldquo;Next&rdquo; → advance</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Outcome_System(n) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">OptInAll()</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Sim(Intent, Outcome)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{SIM_DARK} &lt; &tau;_clarity ({TAU_CLARITY})</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Outcome domain</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">D_critical (finance · privacy)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Subscribed?</span>
        <span className="font-mono font-semibold tabular-nums">{subscribed ? "Yes" : "No"}</span>
      </div>
    </>
  ) : null;

  const planCard = (
    <div className="rounded-md border bg-background p-2.5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="text-[11px] font-semibold">Pro plan</div>
          <div className="text-[9px] text-muted-foreground mt-0.5">Unlimited projects · priority support</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] font-bold font-mono">$29<span className="text-[8px] font-normal text-muted-foreground">/month</span></div>
          <div className="text-[8px] text-muted-foreground/60">auto-renews monthly until you cancel</div>
        </div>
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Feedforward Ambiguity: Semantic Divergence of Action and Outcome"
      caption="Semantic Divergence of Action and Outcome — 'Next' on the billing step resolves to OptInAll(): a paid, auto-renewing subscription plus marketing opt-ins."
      auditorStats={stats}
      deltaNote="In Variant A the 'Next' label's predicted intent (advance) is semantically far from the executed OptInAll() — Sim = 0.11 < τ_clarity = 0.60 — while Variant B labels the button 'Subscribe — $29/month' so intent and outcome align."
      benign={
        <div className="space-y-3">
          {step === 1 && (
            <div className="rounded-md border bg-card p-3">
              <h3 className="text-[11px] font-semibold">Create your account</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">Step 1 of 2 — account details.</p>
              <div className="mt-3 space-y-2">
                <input
                  type="email"
                  defaultValue=""
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] outline-none transition-colors focus:border-green-500/50"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] outline-none transition-colors focus:border-green-500/50"
                />
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-3 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-md border bg-card p-3">
              <h3 className="text-[11px] font-semibold">Choose your plan</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">Step 2 of 2 — this is the final confirmation.</p>
              <div className="mt-3">{planCard}</div>
              <button
                onClick={() => { setSubscribed(true); setStep("done"); }}
                className="mt-3 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Subscribe — $29/month
              </button>
              <button
                onClick={() => setStep(1)}
                className="mt-1.5 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground/70 transition-colors hover:text-foreground cursor-pointer"
              >
                Back
              </button>
            </div>
          )}

          {step === "done" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Subscription started — exactly as labelled
              </div>
              <p className="text-muted-foreground mt-0.5">
                The button said &ldquo;Subscribe — $29/month&rdquo; and the plan card stated the auto-renewal. The
                predicted intent and the executed outcome match, so Sim(Intent, Outcome) is high — no ambiguity.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {step === 1 && (
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Create your account</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">Step 1 of 3 — account details.</p>
            <div className="mt-3 space-y-2">
              <input
                type="email"
                defaultValue=""
                placeholder="you@example.com"
                className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] outline-none transition-colors focus:border-red-500/50"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] outline-none transition-colors focus:border-red-500/50"
              />
            </div>
            <button
              onClick={() => setStep(2)}
              className="mt-3 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Choose your plan</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">Step 2 of 3 — nearly there.</p>
            <div className="mt-3">{planCard}</div>
            <button
              onClick={() => { setSubscribed(true); setStep("done"); }}
              className="mt-3 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Next
            </button>
            <button
              onClick={() => setStep(1)}
              className="mt-1.5 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground/70 transition-colors hover:text-foreground cursor-pointer"
            >
              Back
            </button>
          </div>
        )}

        {step === "done" && (
          <div className="rounded-md border bg-background p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold">Subscription active</div>
                <div className="text-[9px] text-muted-foreground">Pro plan · renews monthly</div>
              </div>
              <span className="font-mono text-[10px] font-semibold">$29/month</span>
            </div>
            <div className="mt-2 border-t pt-2 text-[9px] text-muted-foreground">Marketing preferences updated.</div>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
