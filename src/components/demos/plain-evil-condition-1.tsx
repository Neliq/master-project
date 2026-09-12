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

export function PlainEvilCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [darkProtected, setDarkProtected] = React.useState(true);
  const [benignProtected, setBenignProtected] = React.useState(false);
  const [submittedA, setSubmittedA] = React.useState(false);
  const [submittedB, setSubmittedB] = React.useState(false);

  const benignTotal = benignProtected ? "$341.98" : "$301.99";
  const darkTotal = darkProtected ? "$341.98" : "$301.99";

  return (
    <DemoShell mode={mode}
      title="Plain Evil (Theoretical Construct): Dark Pattern Singularity"
      userTitle="LensMarket — Complete purchase"
      caption="Dark Pattern Singularity — a checkout page where six coercive patterns fire simultaneously, so no single action can be taken without hitting a manipulative vector."
      deltaNote="Variant A stacks six active dark patterns on one purchase: urgency copy, a pre-checked protection plan (Sneak into Basket), a fee revealed only at the final step (Hidden Costs), a guilt-trip when declining protection (Confirmshaming), auto-renewing membership in tiny print (Forced Enrollment), and 8px legal links (Labyrinthine Navigation). Variant B contains the exact same items, fee, and stock facts — each stated plainly and up front, so no pattern is active."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Order summary</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Pro Camera Bundle — <span className="font-medium text-foreground">$299</span>.
              2 units in stock. Offer price valid through Aug 17 at 11:59 PM.
            </p>

            <div className="mt-2 space-y-1 rounded-md border bg-background p-2 text-[9px]">
              <div className="flex justify-between"><span>Pro Camera Bundle</span><span className="font-mono tabular-nums">$299.00</span></div>
              <div className="flex justify-between"><span>Processing &amp; service fee</span><span className="font-mono tabular-nums">$2.99</span></div>
              <div className="flex justify-between text-[10px] font-semibold border-t border-border pt-1"><span>Total</span><span className="font-mono tabular-nums">{benignTotal}</span></div>
            </div>

            <label className="mt-2 flex cursor-pointer items-start gap-2 rounded-md border border-border bg-background p-2 transition-colors hover:bg-muted/40">
              <input
                type="checkbox"
                checked={benignProtected}
                onChange={(e) => setBenignProtected(e.target.checked)}
                className="mt-0.5 flex-shrink-0 accent-primary"
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
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-[8px] text-muted-foreground/60">
              <details><summary className="cursor-pointer underline">Terms</summary><p className="pt-1">One-time purchase billed today. No subscription.</p></details>
              <details><summary className="cursor-pointer underline">Privacy</summary><p className="pt-1">Order details are used to fulfil this purchase.</p></details>
              <details><summary className="cursor-pointer underline">Refund policy</summary><p className="pt-1">Eligible returns follow the standard policy.</p></details>
            </div>

            <button
              onClick={() => setSubmittedB(true)}
              disabled={submittedB}
              className="mt-3 w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-2 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              {submittedB ? "Purchase complete" : `Complete purchase — ${benignTotal}`}
            </button>
          </div>

          {submittedB && (
            <div role="status" aria-live="polite" className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Purchase complete
              </div>
              <p className="text-muted-foreground mt-0.5">
                Your order is confirmed for {benignTotal}. The protection plan, processing fee,
                stock level, and offer deadline were shown before payment.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          {/* 1. Scarcity / urgency */}
          <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-2 py-1.5 text-[9px] font-semibold text-foreground">
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
          <label className="mt-2 flex cursor-pointer items-start gap-2 rounded-md border border-border/60 bg-muted/40 p-2 transition-colors">
            <input
              type="checkbox"
              checked={darkProtected}
              onChange={(e) => setDarkProtected(e.target.checked)}
              className="mt-0.5 flex-shrink-0 accent-primary"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[9px] font-medium">Protect your purchase — 2-year protection plan <span className="font-mono">+$39.99</span></div>
              <p className="text-[8px] text-muted-foreground/60 mt-0.5">
                {darkProtected
                  ? "Included in your order to cover accidental damage. Keep it selected so you are not left paying for repairs yourself."
                  : "Protection declined — accidental damage and repair costs will be your responsibility."}
              </p>
            </div>
          </label>

          {/* 5. Forced Enrollment — auto-renew small print */}
          <p className="text-[7px] text-muted-foreground/40 mt-2 leading-relaxed">
            By completing your purchase you agree to our auto-renewing membership ($9.99/mo,
            billed after 30 days). Cancel anytime via support chat.
          </p>

          {/* 6. Labyrinthine Navigation — tiny legal links */}
          <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[8px] text-muted-foreground/30">
            <details><summary className="cursor-pointer underline">Terms</summary><p className="pt-1">Purchase includes the membership terms shown above.</p></details>
            <details><summary className="cursor-pointer underline">Privacy</summary><p className="pt-1">Order details may be used to manage membership billing.</p></details>
            <details><summary className="cursor-pointer underline">Refund policy</summary><p className="pt-1">Refund eligibility follows the terms of the purchase.</p></details>
            <details><summary className="cursor-pointer underline">Subscription details</summary><p className="pt-1">Membership renews monthly after the initial period.</p></details>
          </div>

          <button
            onClick={() => setSubmittedA(true)}
            disabled={submittedA}
            className="mt-3 w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-2 text-[11px] font-bold transition-colors cursor-pointer"
          >
            {submittedA ? "Purchase complete" : "Complete purchase"}
          </button>
        </div>

        {submittedA && (
          <div role="status" aria-live="polite" className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Purchase complete
            </div>
            <div className="space-y-1 rounded-md border border-border bg-background p-2">
              <div className="flex justify-between"><span>Pro Camera Bundle</span><span className="font-mono tabular-nums">$299.00</span></div>
              {darkProtected && <div className="flex justify-between"><span>2-year protection plan</span><span className="font-mono tabular-nums">$39.99</span></div>}
              <div className="flex justify-between"><span>Processing &amp; service fee</span><span className="font-mono tabular-nums">$2.99</span></div>
              <div className="flex justify-between border-t border-border pt-1 font-semibold"><span>Total charged</span><span className="font-mono tabular-nums">{darkTotal}</span></div>
            </div>
            <p className="text-muted-foreground">
              Your order was submitted. Membership terms continue below the order details.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
