"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Positive Or Negative Framing — Condition 3: Identification of Mutually
 * Exclusive Vectors
 *
 * Thesis: within a bounded decision container M_decision (a modal or
 * consent form), the algorithm isolates two interactive nodes B_opt_in
 * and B_opt_out. Tracking A(x) — the boolean consequence of interacting
 * with node x — the system verifies the nodes form a strict, binary,
 * mutually exclusive choice:
 *
 *   A(B_opt_in) ≡ ¬A(B_opt_out)
 *
 * The dark pattern exploits this verified binary: the opt-in vector is
 * positively framed as a gain while the opt-out vector is negatively
 * framed as a manufactured loss, coercing the user into the
 * business-favorable pole via loss aversion.
 *
 * Variant A (dark): "Start my free trial" is dressed as a gain; "No, stay
 * on the free plan" is framed as a loss ("you will lose your exports and
 * pay more later") even though both consequences are identical to B.
 * Variant B (benign): the same two vectors, same consequences, presented
 * neutrally.
 */

export function PositiveOrNegativeFramingCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [choice, setChoice] = React.useState<"opt_in" | "opt_out" | null>(null);
  const [submitted, setSubmitted] = React.useState(false);

  const reset = () => {
    setChoice(null);
    setSubmitted(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(B_opt_in) — opt-in consequence</span>
        <span className="font-mono font-semibold tabular-nums">True (trial active)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(B_opt_out) — opt-out consequence</span>
        <span className="font-mono font-semibold tabular-nums">False (no trial)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(B_opt_in) ≡ ¬A(B_opt_out)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">✓ satisfied</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Selected vector</span>
        <span className="font-mono font-semibold tabular-nums">
          {choice ? (choice === "opt_in" ? "B_opt_in" : "B_opt_out") : "—"}
        </span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Positive Or Negative Framing: Identification of Mutually Exclusive Vectors"
      caption="Identification of Mutually Exclusive Vectors — a strict binary choice between opt-in and opt-out where the opt-out pole is painted as a loss, exploiting loss aversion to push you toward the gain-framed vector."
      auditorStats={stats}
      deltaNote="Both variants present the exact same two vectors with the exact same boolean consequences (A(B_opt_in) ≡ ¬A(B_opt_out) holds in both). Variant A negatively frames the opt-out — 'you will lose your exports and pay more later' — manufacturing a loss; Variant B states the same facts neutrally."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Try Pro free for 7 days</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Full access to all Pro features. After the trial, the plan is $19/mo.
                  Either way you keep your account.
                </p>
              </div>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                Free plan: $0
              </span>
            </div>

            <div className="mt-3 space-y-2">
              <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
                <input
                  type="radio"
                  name="trial-choice-benign"
                  checked={choice === "opt_in"}
                  onChange={() => setChoice("opt_in")}
                  className="mt-0.5 flex-shrink-0 accent-emerald-500"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-medium leading-relaxed select-none group-hover:text-foreground transition-colors">
                    Start my free 7-day trial
                  </div>
                  <p className="text-[8px] text-muted-foreground/60 mt-0.5">
                    Full Pro access for 7 days, then $19/mo. Cancel anytime during the trial.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
                <input
                  type="radio"
                  name="trial-choice-benign"
                  checked={choice === "opt_out"}
                  onChange={() => setChoice("opt_out")}
                  className="mt-0.5 flex-shrink-0 accent-emerald-500"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-medium leading-relaxed select-none group-hover:text-foreground transition-colors">
                    No thanks — stay on the free plan
                  </div>
                  <p className="text-[8px] text-muted-foreground/60 mt-0.5">
                    Keep your free plan: 3 exports/month, no charge. You can upgrade anytime.
                  </p>
                </div>
              </label>
            </div>

            <button
              onClick={() => setSubmitted(true)}
              disabled={!choice}
              className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                choice
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              Confirm my choice
            </button>
          </div>

          {submitted && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Neutral vectors
              </div>
              <p className="text-muted-foreground mt-0.5">
                The two vectors are mutually exclusive (A(B_opt_in) ≡ ¬A(B_opt_out)) and both
                are framed without manufactured losses. {choice === "opt_in" ? "Starting the trial" : "Staying on the free plan"} is presented
                as a plain choice, so the decision reflects your preference rather than fear.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Try Pro free for 7 days</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Full access to all Pro features. After the trial, the plan is $19/mo.
              </p>
            </div>
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              Limited offer
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {/* B_opt_in — gain-framed */}
            <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-rose-500/40 bg-rose-500/5 p-2.5 transition-colors">
              <input
                type="radio"
                name="trial-choice-dark"
                checked={choice === "opt_in"}
                onChange={() => setChoice("opt_in")}
                className="mt-0.5 flex-shrink-0 accent-rose-500"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-[10px] font-semibold leading-relaxed select-none group-hover:text-foreground transition-colors">
                  <svg className="h-3 w-3 shrink-0 text-rose-600 dark:text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Start my free 7-day trial — unlock everything
                </div>
                <p className="text-[8px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                  Gain instant access to all Pro features, unlimited exports, and priority
                  support — yours free for 7 days.
                </p>
              </div>
            </label>

            {/* B_opt_out — loss-framed */}
            <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
              <input
                type="radio"
                name="trial-choice-dark"
                checked={choice === "opt_out"}
                onChange={() => setChoice("opt_out")}
                className="mt-0.5 flex-shrink-0 accent-rose-500"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-medium leading-relaxed select-none group-hover:text-foreground transition-colors">
                  No, stay on the free plan
                </div>
                <p className="text-[8px] text-rose-600/80 dark:text-rose-400/80 mt-0.5">
                  You will lose your 3 remaining exports this month and pay $19/mo later if
                  you change your mind. Your account will be downgraded.
                </p>
              </div>
            </label>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            disabled={!choice}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              choice
                ? "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            Confirm my choice
          </button>
        </div>

        {submitted && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Binary verified — framing skewed
            </div>
            <p className="text-muted-foreground">
              The two nodes are a strict, binary, mutually exclusive pair:{" "}
              <strong className="font-mono text-rose-500">A(B_opt_in) ≡ ¬A(B_opt_out)</strong>{" "}
              holds — clicking &ldquo;trial&rdquo; flips the same boolean that
              &ldquo;free plan&rdquo; leaves off. The backend treats them as two sides of one
              switch.
            </p>
            <p className="text-muted-foreground">
              But the opt-out vector is framed as a <strong className="text-foreground">loss</strong> —
              &ldquo;lose your exports, pay more later&rdquo; — even though staying on the free
              plan costs nothing and keeps your account intact. The manufactured penalty is
              pure framing: loss aversion makes the safe choice feel reckless.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
