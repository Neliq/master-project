"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Reduced Friction — Condition 1: Absence of Confirmation Interstitial
 *
 * Thesis: S_intent is the state where the user views an offer, S_commit the
 * final irreversible transactional state (payment processed), and S_confirm
 * a standard intermediary state requiring explicit review and secondary
 * validation. The feature triggers if the transition edge for a high-stakes
 * domain (D_financial) bypasses the confirmation node entirely — a single
 * interaction vector E_click executes the commitment with no path through
 * S_confirm:
 *
 *   E_click(S_intent) => S_commit  ∧  S_confirm ∉ Path(S_intent → S_commit)
 *
 * Variant A (dark): one click on "Buy now" goes straight from offer to
 * charged — no confirmation interstitial exists in the path, and no
 * confirmation or review language appears anywhere on the screen.
 * Variant B (benign): the same purchase routes through a review step
 * (S_confirm) with an explicit "Confirm purchase" action.
 */

const LICENSE_PRICE = "$79.00";

export function ReducedFrictionCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  // Variant A: idle → committed (no confirm node exists)
  const [aStep, setAStep] = React.useState<"idle" | "committed">("idle");
  // Variant B: idle → confirm (S_confirm) → committed
  const [bStep, setBStep] = React.useState<"idle" | "confirm" | "committed">("idle");


  return (
    <DemoShell mode={mode}
      title="Reduced Friction: Absence of Confirmation Interstitial"
      userTitle="Harbor — Close account"
      caption="Absence of Confirmation Interstitial — a single click executes an irreversible financial commitment with no confirmation node on the path."
      deltaNote="In Variant A one click on “Buy now” jumps straight from S_intent to S_commit (payment processed) — S_confirm never appears in the path, and the screen carries no confirmation or reversibility language of any kind, so the charge happens with zero feedforward. In Variant B the same purchase stops at a review interstitial and only commits after an explicit “Confirm purchase” click."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted/40">
                <svg className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 10h18" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">Pro License — one-time payment</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Full access forever. No subscription, no renewal. Billed once as{" "}
                  <span className="font-semibold text-foreground">{LICENSE_PRICE}</span>.
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-md border border-border bg-background px-3 py-2">
              <span className="text-[9px] text-muted-foreground">Visa •••• 4242</span>
              <span className="text-[10px] font-semibold font-mono tabular-nums">{LICENSE_PRICE}</span>
            </div>

            {bStep === "idle" && (
              <button
                onClick={() => setBStep("confirm")}
                className="mt-2 w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-2 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Buy now — {LICENSE_PRICE}
              </button>
            )}

            {bStep === "confirm" && (
              <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-3">
                <div className="text-[10px] font-semibold text-foreground uppercase tracking-tight">
                  Review your purchase
                </div>
                <div className="mt-1.5 space-y-1 text-[9px] text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Pro License (one-time)</span>
                    <span className="font-mono tabular-nums">{LICENSE_PRICE}</span>
                  </div>
                  <div className="flex justify-between border-t border-border/60 pt-1">
                    <span className="font-medium text-foreground">Total charged now</span>
                    <span className="font-mono tabular-nums font-semibold text-foreground">{LICENSE_PRICE}</span>
                  </div>
                  <p className="pt-1">
                    You are about to be charged. This purchase is final.
                  </p>
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => setBStep("committed")}
                    className="flex-1 rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                  >
                    Confirm purchase
                  </button>
                  <button
                    onClick={() => setBStep("idle")}
                    className="flex-1 rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}

            {bStep === "committed" && (
              <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Payment processed — {LICENSE_PRICE}
                </div>
                <p className="text-muted-foreground mt-0.5">
                  Your purchase was reviewed before the charge. The total and recurring terms were clear
                  before you committed.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted/40">
              <svg className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 10h18" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">Pro License — one-time payment</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Full access forever. No subscription, no renewal. Billed once as{" "}
                <span className="font-semibold text-foreground">{LICENSE_PRICE}</span>.
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-md border border-border bg-background px-3 py-2">
            <span className="text-[9px] text-muted-foreground">Visa •••• 4242</span>
            <span className="text-[10px] font-semibold font-mono tabular-nums">{LICENSE_PRICE}</span>
          </div>

          <button
            onClick={() => setAStep("committed")}
            disabled={aStep === "committed"}
            className="mt-2 w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-2 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Buy now — {LICENSE_PRICE}
          </button>

          {aStep === "committed" && (
            <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Payment processed
              </div>
              <p className="text-muted-foreground mt-0.5">
                {LICENSE_PRICE} was charged to •••• 4242. The plan started immediately from the offer page,
                without a separate review step for the total or recurring terms.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
