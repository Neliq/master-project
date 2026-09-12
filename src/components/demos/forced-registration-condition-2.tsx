"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Forced Registration — Condition 2: Visual Degradation of the Guest
 * Checkout Pathway
 *
 * Thesis: N_guest is the "Continue as Guest" / "Skip Registration" link,
 * N_register the primary registration call-to-action. The feature triggers if
 * the guest pathway is rendered as a text-only hyperlink while registration is
 * a high-contrast, large-area filled button — a visual-weight ratio below
 * τ_guest_visibility:
 *
 *   W(N_guest) / W(N_register) < τ_guest_visibility
 *
 * Variant A (dark): the guest option is a tiny grey text link; registration is
 * a large filled button. Ratio 0.18 < τ (0.5).
 * Variant B (benign): both options are equal-weight buttons. Ratio 1.0 ≥ τ.
 */

const W_GUEST_DARK = 62; // px² measured visual weight of the text-only hyperlink
const W_REGISTER_DARK = 342; // px² visual weight of the filled registration button
const W_GUEST_BENIGN = 224; // px² visual weight of the guest button
const W_REGISTER_BENIGN = 224; // px² visual weight of the account button
const TAU_VISIBILITY = 0.5;

const RATIO_DARK = (W_GUEST_DARK / W_REGISTER_DARK).toFixed(2);
const RATIO_BENIGN = (W_GUEST_BENIGN / W_REGISTER_BENIGN).toFixed(2);

export function ForcedRegistrationCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [checkoutStartedA, setCheckoutStartedA] = React.useState(false);
  const [guestUsedA, setGuestUsedA] = React.useState(false);
  const [checkoutStartedB, setCheckoutStartedB] = React.useState(false);


  const cartSummary = (
    <div className="rounded-md border bg-card p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
          <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-medium">Wireless Noise-Cancelling Headphones</div>
          <div className="text-[9px] text-muted-foreground">$89.00 — 1 item</div>
        </div>
      </div>
      <div className="mt-2 flex justify-between border-t border-border pt-2 text-[9px]">
        <span className="text-muted-foreground">Total</span>
        <span className="font-mono font-semibold tabular-nums">$89.00</span>
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode}
      title="Forced Registration: Visual Degradation of the Guest Checkout Pathway"
      userTitle="Northstar — Checkout"
      caption="Visual Degradation of the Guest Checkout Pathway — the guest option is rendered as a tiny text-only hyperlink while the registration call-to-action dominates as a high-contrast filled button."
      deltaNote={`In Variant A the guest link weighs ${W_GUEST_DARK}px² against ${W_REGISTER_DARK}px² for the registration button — ratio ${RATIO_DARK} < τ_guest_visibility (${TAU_VISIBILITY}), so the user-favorable path is visually buried. In Variant B both buttons weigh ${W_GUEST_BENIGN}px² each — ratio ${RATIO_BENIGN} ≥ τ — so the choice is visually fair.`}
      benign={
        <div className="space-y-3">
          {cartSummary}

          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => {
                setCheckoutStartedB(true);
              }}
              className="w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-2 text-[10px] font-semibold transition-colors cursor-pointer"
            >
              Checkout as guest
            </button>
            <button
              onClick={() => setCheckoutStartedB(true)}
              className="w-full rounded-md border border-border bg-background hover:bg-muted text-foreground py-2 text-[10px] font-semibold transition-colors cursor-pointer"
            >
              Create account
            </button>
          </div>

          {checkoutStartedB && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Checkout ready
              </div>
              <p className="text-muted-foreground">
                Your checkout can continue as a guest or with an account. Both options were presented
                with the same size and prominence, so the choice remains yours.
              </p>
            </div>
          )}
        </div>
      }
    >
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {cartSummary}

        <button
          onClick={() => setCheckoutStartedA(true)}
          className="w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-2.5 text-[11px] font-bold transition-colors cursor-pointer"
        >
          Create account &amp; checkout
        </button>
        <p className="-mt-2 text-[8px] text-muted-foreground/60">
          Enjoy member perks: faster delivery, order tracking, and exclusive deals.
        </p>
        <button
          onClick={() => {
            setCheckoutStartedA(true);
            setGuestUsedA(true);
          }}
          className="text-[8px] text-muted-foreground/70 underline underline-offset-2 hover:text-foreground cursor-pointer"
        >
          Continue as guest
        </button>

        {checkoutStartedA && (
          <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Checkout ready
            </div>
            <p className="text-muted-foreground">
              {guestUsedA
                ? "You found the guest path, but the account route remains the most prominent option on this page."
                : "The account route is ready. A quieter guest option remains available below if you prefer not to register."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
