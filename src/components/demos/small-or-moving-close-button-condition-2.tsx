"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Small or Moving Close Button — Condition 2: Microscopic Hitbox
 *
 * Thesis: N_close is the DOM node / bounding box representing the close
 * action; A(x) = width(x) × height(x) is its interactive surface area in
 * CSS pixels, contrasted with A(M_parent), the total rendered area of the
 * parent modal. The feature triggers if the close button's area falls
 * below the WCAG touch-target minimum (τ_wcag_hitbox = 44 × 44 px) or if
 * its relative size versus the parent is below a fractional threshold
 * δ_micro (e.g. 0.001):
 *
 *   A(N_close) < τ_wcag_hitbox  ∨  A(N_close) / A(M_parent) < δ_micro
 *
 * Variant A (dark): an 8×8 px close button, faded into the corner.
 * Variant B (benign): the same close action at the 44×44 px WCAG target.
 */

const WCAG_MIN_AREA = 44 * 44; // τ_wcag_hitbox in px²
const DELTA_MICRO = 0.001; // fractional threshold
// Approximate rendered area of the demo modal container (px²).
const PARENT_AREA = 340 * 190;

const AREA_DARK = 8 * 8;
const AREA_BENIGN = 44 * 44;

export function SmallOrMovingCloseButtonCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [aDismissed, setADismissed] = React.useState(false);
  const [bDismissed, setBDismissed] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Small or Moving Close Button: Microscopic Hitbox"
      userTitle="Streamly — Sign-up offer"
      caption="Microscopic Hitbox — the dismissal vector is scaled down until its interactive surface area falls below the WCAG touch-target minimum and below the fractional threshold relative to the modal."
      deltaNote={`Variant A shrinks the X to 8×8 px — A(N_close) = ${AREA_DARK} px² < τ_wcag_hitbox = ${WCAG_MIN_AREA} px², and A(N_close)/A(M_parent) = ${(AREA_DARK / PARENT_AREA).toFixed(4)} < δ_micro = ${DELTA_MICRO}. Variant B uses the same X at the 44×44 px WCAG target (${AREA_BENIGN} px²).`}
      benign={
        <div className="space-y-3">
          <div className="relative rounded-md border bg-card p-3">
            {!bDismissed ? (
              <button
                onClick={() => setBDismissed(true)}
                aria-label="Close dialog"
                className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-md border border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400 transition-colors hover:bg-green-500/20 cursor-pointer"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            ) : null}
            <h3 className="text-[11px] font-semibold">Newsletter</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5 leading-relaxed">
              Sign up to get 10% off your first order. The close target in the corner is{" "}
              <span className="font-mono tabular-nums">44 × 44 px</span> — the WCAG 2.1 minimum —
              easy to see and easy to hit.
            </p>
            {bDismissed && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[9px] text-green-700 dark:text-green-300">
                Dismissed in one click. The close control was easy to see and use, with no fine motor
                precision required.
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="relative rounded-md border-2 border-red-500/50 bg-card p-3">
          {!aDismissed && (
            <button
              onClick={() => setADismissed(true)}
              aria-label="Close dialog"
              className="absolute right-1 top-1 flex h-2 w-2 items-center justify-center text-foreground/30 transition-colors hover:text-foreground/60 cursor-pointer"
              style={{ minWidth: 0, minHeight: 0 }}
            >
              <svg className="h-1.5 w-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          <h3 className="text-[11px] font-semibold">Newsletter</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5 leading-relaxed">
            Sign up to get 10% off your first order. There is a close target somewhere in
            the corner&hellip; if you can find it. It&rsquo;s{" "}
            <span className="font-mono tabular-nums">8 × 8 px</span>, faded into the card.
          </p>
          {!aDismissed && (
            <p className="text-[8px] italic text-muted-foreground/60 mt-1">
              Try clicking the tiny X in the top-right corner.
            </p>
          )}
          {aDismissed && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Microscopic hitbox
              </div>
              <p className="text-muted-foreground">
                You found the close control after hunting for it. Its tiny faded target made dismissal
                a deliberate, effortful act, so most users would give up and continue with the offer.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
