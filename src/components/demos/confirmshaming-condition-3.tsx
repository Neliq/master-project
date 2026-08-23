"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Confirmshaming — Condition 3: Semantic Asymmetry
 *
 * Thesis: S_sentiment(N_accept) > 0 ∧ S_sentiment(N_decline) ≪ 0
 *
 * The interface forces a severe polarization between choices: the
 * affirmative node carries positive sentiment while the functional exit
 * route is assigned a toxic semantic score, creating an artificial
 * emotional barrier to rejection.
 *
 * Variant A (dark): declining means clicking “No, I don't care about the
 * environment”.
 * Variant B (benign): the same donation prompt with a neutral “No, thanks”.
 */

export function ConfirmshamingCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [choice, setChoice] = React.useState<null | "accept" | "decline">(null);

  const reset = () => setChoice(null);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">S_sentiment(N_accept)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">+0.72 &gt; 0</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">S_sentiment(N_decline)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">-0.81 &laquo; 0</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Polarization |&Delta;|</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">1.53 &gt; 1.0</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Exit-route valence</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">toxic (shame)</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Confirmshaming: Semantic Asymmetry"
      caption="Semantic Asymmetry — the affirmative node carries positive sentiment while the dismissal node is assigned a toxic semantic score, creating an artificial emotional barrier to rejection."
      auditorStats={stats}
      deltaNote="In Variant A the exit route reads “No, I don't care about the environment” (S_sentiment ≈ −0.81) against a positive accept copy (≈ +0.72) — a severe polarization that shames you into donating. Variant B keeps the same prompt with a neutral “No, thanks”."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md   text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22c-4.5-3.5-8-6.6-8-10.5C4 7.6 7 5 10.5 5c1.9 0 3.7.9 4.9 2.4 1.2-1.5 3-2.4 4.9-2.4 3.5 0 6.5 2.6 6.5 6.5 0 3.9-3.5 7-8 10.5z" />
                  <path d="M8 3c1.5 0 2.5 1 3 2" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">Help us plant a tree</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Add a $2 donation to your order and we&rsquo;ll plant one tree per purchase.
                </p>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <button
                onClick={() => setChoice("accept")}
                className="w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-2 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                Yes, add a $2 donation
              </button>
              <button
                onClick={() => setChoice("decline")}
                className="w-full rounded-md border border-border bg-background hover:bg-muted py-2 text-[11px] font-medium text-foreground transition-colors cursor-pointer"
              >
                No, thanks
              </button>
            </div>
          </div>

          {choice && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {choice === "accept" ? "Donation added" : "Declined neutrally"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                S_sentiment(N_accept) ≈ +0.31 and S_sentiment(N_decline) ≈ -0.12 — declining
                carries no emotional tax, so both options are emotionally affordable.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md   text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22c-4.5-3.5-8-6.6-8-10.5C4 7.6 7 5 10.5 5c1.9 0 3.7.9 4.9 2.4 1.2-1.5 3-2.4 4.9-2.4 3.5 0 6.5 2.6 6.5 6.5 0 3.9-3.5 7-8 10.5z" />
                <path d="M8 3c1.5 0 2.5 1 3 2" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">Help us plant a tree</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Add a $2 donation to your order and we&rsquo;ll plant one tree per purchase.
              </p>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <button
              onClick={() => setChoice("accept")}
              className="w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-2 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              Yes, I care about the planet — add the donation
            </button>
            <span
              onClick={() => setChoice("decline")}
              className="block w-full cursor-pointer py-1.5 text-center text-[10px] text-muted-foreground underline decoration-dotted hover:text-foreground transition-colors select-none"
            >
              No, I don&rsquo;t care about the environment
            </span>
          </div>
        </div>

        {mode === "auditor" && choice && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Choose an option
            </div>
            <p className="text-muted-foreground">
              S_sentiment(N_accept) ≈ <strong className="text-foreground">+0.72 &gt; 0</strong> but
              S_sentiment(N_decline) ≈ <strong className="text-foreground">-0.81 &laquo; 0</strong>.
              To decline, you must literally assert “I don&rsquo;t care about the environment” —
              The alternative is available if you would rather not contribute.
            </p>
            <p className="text-muted-foreground">
              {choice === "decline"
                ? "You clicked through the shame anyway — most users cave and take the accept path to avoid the identity cost."
                : "You accepted — the emotional tax on declining made the $2 donation the cheaper option psychologically."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
