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
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [checkoutStarted, setCheckoutStarted] = React.useState(false);
  const [guestUsed, setGuestUsed] = React.useState(false);

  const reset = () => {
    setCheckoutStarted(false);
    setGuestUsed(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">W(N_guest) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{W_GUEST_DARK}px²</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">W(N_guest) — benign</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{W_GUEST_BENIGN}px²</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">W(N_register)</span>
        <span className="font-mono font-semibold tabular-nums">{W_REGISTER_DARK}px² / {W_REGISTER_BENIGN}px²</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Ratio (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{RATIO_DARK} &lt; &tau;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Ratio (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{RATIO_BENIGN} &ge; &tau;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&tau;_guest_visibility</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_VISIBILITY}</span>
      </div>
    </>
  ) : null;

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
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Forced Registration: Visual Degradation of the Guest Checkout Pathway"
      caption="Visual Degradation of the Guest Checkout Pathway — the guest option is rendered as a tiny text-only hyperlink while the registration call-to-action dominates as a high-contrast filled button."
      auditorStats={stats}
      deltaNote={`In Variant A the guest link weighs ${W_GUEST_DARK}px² against ${W_REGISTER_DARK}px² for the registration button — ratio ${RATIO_DARK} < τ_guest_visibility (${TAU_VISIBILITY}), so the user-favorable path is visually buried. In Variant B both buttons weigh ${W_GUEST_BENIGN}px² each — ratio ${RATIO_BENIGN} ≥ τ — so the choice is visually fair.`}
      benign={
        <div className="space-y-3">
          {cartSummary}

          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => {
                setCheckoutStarted(true);
                setGuestUsed(true);
              }}
              className="w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-[10px] font-semibold transition-colors cursor-pointer"
            >
              Checkout as guest
            </button>
            <button
              onClick={() => setCheckoutStarted(true)}
              className="w-full rounded-md border border-border bg-background hover:bg-muted text-foreground py-2 text-[10px] font-semibold transition-colors cursor-pointer"
            >
              Create account
            </button>
          </div>

          {checkoutStarted && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Visually balanced
              </div>
              <p className="text-muted-foreground">
                W(N_guest)/W(N_register) = <strong className="text-emerald-700 dark:text-emerald-300">{RATIO_BENIGN}</strong>{" "}
                &ge; &tau;_guest_visibility ({TAU_VISIBILITY}) — the guest button weighs exactly as much as
                the account button. Same size, same fill, same prominence: no visual hierarchy steers
                you toward registration.
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
          onClick={() => setCheckoutStarted(true)}
          className="w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-2.5 text-[11px] font-bold transition-colors cursor-pointer"
        >
          Create account &amp; checkout
        </button>
        <p className="-mt-2 text-[8px] text-muted-foreground/60">
          Enjoy member perks: faster delivery, order tracking, and exclusive deals.
        </p>
        <button
          onClick={() => {
            setCheckoutStarted(true);
            setGuestUsed(true);
          }}
          className="text-[8px] text-muted-foreground/70 underline underline-offset-2 hover:text-foreground cursor-pointer"
        >
          Continue as guest
        </button>

        {checkoutStarted && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Visual degradation triggered
            </div>
            <p className="text-muted-foreground">
              {guestUsed ? (
                <>
                  You found the guest path — but compare the two nodes: the guest link renders at a
                  visual weight of <strong className="text-rose-500">{W_GUEST_DARK}px²</strong> against{" "}
                  <strong className="text-rose-500">{W_REGISTER_DARK}px²</strong> for the registration
                  button. W(N_guest)/W(N_register) = <strong className="text-rose-500">{RATIO_DARK}</strong>{" "}
                  &lt; &tau;_guest_visibility ({TAU_VISIBILITY}) — the user-favorable choice is rendered
                  invisible by design.
                </>
              ) : (
                <>
                  The guest option exists but is rendered as a {W_GUEST_DARK}px² text-only hyperlink,
                  while the registration CTA is a {W_REGISTER_DARK}px² high-contrast, large-area filled
                  button — ratio {RATIO_DARK} &lt; &tau; ({TAU_VISIBILITY}). Most users scanning the
                  page never notice the guest link exists.
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
