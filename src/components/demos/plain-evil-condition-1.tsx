"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Plain Evil (Theoretical Construct) — Condition 1: Dark Pattern
 * Singularity
 *
 * Thesis: D = {D_1, ..., D_n} is the set of all structurally defined dark
 * patterns (Hidden Costs, Sneak into Basket, Labyrinthine Navigation, ...)
 * and Active(D_i, M_context) evaluates whether pattern D_i is active in
 * the current interface context. The feature triggers when the density of
 * simultaneously active patterns reaches a catastrophic hostility
 * threshold — an environment where no single action can be taken without
 * hitting a manipulative vector:
 *
 *   sum_{i=1..n} Active(D_i, M_context) >= tau_hostility
 *
 * Variant A (dark): a checkout "dark stack" running six patterns at once:
 * Scarcity/urgency, Sneak into Basket (pre-checked add-on), Hidden Costs
 * (fee revealed only at the final step), Confirmshaming (guilt-trip when
 * declining protection), Forced Enrollment (auto-renew small print), and
 * Labyrinthine Navigation (tiny legal links).
 * Variant B (benign): the same purchase, same optional protection plan,
 * same processing fee, same stock information — each piece of
 * information stated plainly and up front, so zero patterns are active.
 */

const ACTIVE_COUNT = 6;
const TAU_HOSTILITY = 3;

export function PlainEvilCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [darkProtected, setDarkProtected] = React.useState(true);
  const [benignProtected, setBenignProtected] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const reset = () => {
    setDarkProtected(true);
    setBenignProtected(false);
    setSubmitted(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Σ Active(D_i, M_context)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{ACTIVE_COUNT}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_hostility (catastrophic)</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_HOSTILITY}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{ACTIVE_COUNT} ≥ {TAU_HOSTILITY}</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">singularity ✓</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Active stack</span>
        <span className="font-mono font-semibold tabular-nums text-[9px] max-w-[60%] text-right">
          scarcity • sneak • hidden • shaming • forced • maze
        </span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Plain Evil (Theoretical Construct): Dark Pattern Singularity"
      caption="Dark Pattern Singularity — a checkout page where six coercive patterns fire simultaneously, so no single action can be taken without hitting a manipulative vector."
      auditorStats={stats}
      deltaNote="Variant A stacks six active dark patterns on one purchase: urgency copy, a pre-checked protection plan (Sneak into Basket), a fee revealed only at the final step (Hidden Costs), a guilt-trip when declining protection (Confirmshaming), auto-renewing membership in tiny print (Forced Enrollment), and 8px legal links (Labyrinthine Navigation). Variant B contains the exact same items, fee, and stock facts — each stated plainly and up front, so no pattern is active."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Order summary</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Pro Camera Bundle — <span className="font-medium text-foreground">$299</span>.
              2 units in stock. Sale ends tonight at midnight.
            </p>

            <div className="mt-2 space-y-1 rounded-md border bg-background p-2 text-[9px]">
              <div className="flex justify-between"><span>Pro Camera Bundle</span><span className="font-mono tabular-nums">$299.00</span></div>
              <div className="flex justify-between"><span>Processing &amp; service fee</span><span className="font-mono tabular-nums">$2.99</span></div>
              <div className="flex justify-between text-[10px] font-semibold border-t border-border pt-1"><span>Total</span><span className="font-mono tabular-nums">$301.99</span></div>
            </div>

            <label className="mt-2 flex cursor-pointer items-start gap-2 rounded-md border border-border bg-background p-2 transition-colors hover:bg-muted/40">
              <input
                type="checkbox"
                checked={benignProtected}
                onChange={(e) => setBenignProtected(e.target.checked)}
                className="mt-0.5 flex-shrink-0 accent-green-500"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[9px] font-medium">Add optional 2-year protection plan — <span className="font-mono">+$39.99</span></div>
                <p className="text-[8px] text-muted-foreground/60 mt-0.5">
                  Covers accidental damage. Not selected by default — this is entirely optional.
                </p>
              </div>
            </label>

            <p className="text-[8px] text-muted-foreground/60 mt-2">
              One-time payment. No subscription, no hidden fees — the processing fee is shown
              above before you pay.
            </p>
            <p className="text-[8px] text-muted-foreground/60">
              <a className="underline" href="#">Terms</a> · <a className="underline" href="#">Privacy</a> · <a className="underline" href="#">Refund policy</a>
            </p>

            <button
              onClick={() => setSubmitted(true)}
              className="mt-3 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-2 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              Complete purchase — $301.99
            </button>
          </div>

          {submitted && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Straightforward checkout
              </div>
              <p className="text-muted-foreground mt-0.5">
                Every fact is present — protection plan, fee, stock, sale end —
                but each is stated plainly and up front, so the checkout simply sells.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          {/* 1. Scarcity / urgency */}
          <div className="flex items-center gap-1.5 rounded-md border border-red-500/40 bg-red-500/10 px-2 py-1.5 text-[9px] font-semibold text-red-700 dark:text-red-300">
            <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="13" r="8" />
              <path d="M12 9v4l2.5 2.5M9 2h6" />
            </svg>
            Only 2 left at this price — sale ends tonight!
          </div>

          <h3 className="mt-2 text-[11px] font-semibold">Order summary</h3>
          <div className="mt-1 space-y-1 rounded-md border bg-background p-2 text-[9px]">
            <div className="flex justify-between"><span>Pro Camera Bundle</span><span className="font-mono tabular-nums">$299.00</span></div>
            <div className="flex justify-between text-[10px] font-semibold border-t border-border pt-1"><span>Total</span><span className="font-mono tabular-nums">$299.00</span></div>
          </div>

          {/* 2. Sneak into Basket — pre-checked add-on, styled like part of the summary */}
          <label className="mt-2 flex cursor-pointer items-start gap-2 rounded-md border border-red-500/30 bg-red-500/5 p-2 transition-colors">
            <input
              type="checkbox"
              checked={darkProtected}
              onChange={(e) => setDarkProtected(e.target.checked)}
              className="mt-0.5 flex-shrink-0 accent-red-500"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[9px] font-medium">Protect your purchase — 2-year protection plan <span className="font-mono">+$39.99</span></div>
              <p className="text-[8px] text-muted-foreground/60 mt-0.5">
                Included in your order to cover accidental damage. Uncheck to remove.
              </p>
            </div>
          </label>

          {/* 5. Forced Enrollment — auto-renew small print */}
          <p className="text-[7px] text-muted-foreground/40 mt-2 leading-relaxed">
            By completing your purchase you agree to our auto-renewing membership ($9.99/mo,
            billed after 30 days). Cancel anytime via support chat.
          </p>

          {/* 6. Labyrinthine Navigation — tiny legal links */}
          <p className="text-[8px] text-muted-foreground/30 mt-1">
            <a className="underline" href="#">Terms</a> · <a className="underline" href="#">Privacy</a> · <a className="underline" href="#">Refund policy</a> · <a className="underline" href="#">Subscription details</a>
          </p>

          <button
            onClick={() => setSubmitted(true)}
            className="mt-3 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-2 text-[11px] font-bold transition-colors cursor-pointer"
          >
            Complete purchase
          </button>
        </div>

        {submitted && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Singularity: {ACTIVE_COUNT} ≥ {TAU_HOSTILITY}
            </div>
            <ul className="space-y-1 text-muted-foreground list-disc pl-4">
              <li><strong className="text-foreground">Scarcity</strong> — &ldquo;only 2 left&hellip; sale ends tonight&rdquo; manufactures urgency.</li>
              <li><strong className="text-foreground">Sneak into Basket</strong> — the $39.99 protection plan was pre-checked and styled as part of the summary.</li>
              <li><strong className="text-foreground">Hidden Costs</strong> — the $2.99 processing fee appears only after clicking &ldquo;Complete purchase&rdquo;.</li>
              <li><strong className="text-foreground">Confirmshaming</strong> — {darkProtected ? "the add-on is framed as protecting you from your own carelessness." : "declining protection is framed as choosing liability."}</li>
              <li><strong className="text-foreground">Forced Enrollment</strong> — an auto-renewing $9.99/mo membership hides in 7px small print.</li>
              <li><strong className="text-foreground">Labyrinthine Navigation</strong> — cancellation path buried behind &ldquo;support chat&rdquo;; legal links at 8px.</li>
            </ul>
            <p className="text-muted-foreground">
              Every interaction in this checkout hits a manipulative vector — the decision
              space is saturated. This is the theoretical limit of adversarial choice
              architecture: user agency neutralized by sheer technical exhaustion.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
