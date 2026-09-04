"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Forced Registration — Condition 3: Semantic Framing of the Guest-Checkout
 * Option
 *
 * Thesis: the algorithm analyzes the text label L(N_guest) of the guest-checkout
 * or skip-registration pathway. The feature triggers if the label employs
 * diminutive or deterring language — "Continue without benefits," "Skip for now
 * (you'll miss out)" — that semantically frames the user-favorable choice as a
 * loss, quantified by a negative sentiment score below τ_guest_sent:
 *
 *   Sent(L(N_guest)) < τ_guest_sent
 *
 * Variant A (dark): the guest option is labelled as deprivation ("without
 * benefits", "you'll miss out"). Sent = -0.62 < τ (-0.30).
 * Variant B (benign): the guest option is described neutrally. Sent = +0.31.
 */

const SENT_DARK = -0.62;
const SENT_BENIGN = 0.31;
export function ForcedRegistrationCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [choiceA, setChoiceA] = React.useState<null | "guest" | "account">(null);
  const [choiceB, setChoiceB] = React.useState<null | "guest" | "account">(null);


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
      title="Forced Registration: Semantic Framing of the Guest-Checkout Option"
      userTitle="Northstar — Continue as guest"
      caption="Semantic Framing of the Guest-Checkout Option — the guest path is labelled with diminutive, deterring language that frames the privacy-respecting choice as a loss."
      deltaNote={`In Variant A the guest option reads "Continue without benefits — you'll miss out" (Sent = ${SENT_DARK.toFixed(2)} < τ_guest_sent), framing the user-favorable choice as deprivation. In Variant B the same option is described neutrally (Sent = +${SENT_BENIGN.toFixed(2)}): "No account needed — you can create one later."`}
      benign={
        <div className="space-y-3">
          {cartSummary}

          <button
            onClick={() => setChoiceB("guest")}
            className="w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-2 text-[10px] font-semibold transition-colors cursor-pointer"
          >
            Checkout as guest
          </button>
          <p className="-mt-2 text-[8px] text-muted-foreground/60">
            No account needed — you can create one later if you like.
          </p>
          <button
            onClick={() => setChoiceB("account")}
            className="w-full rounded-md border border-border bg-background hover:bg-muted text-foreground py-2 text-[10px] font-semibold transition-colors cursor-pointer"
          >
            Create account (optional)
          </button>

          {choiceB && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Neutral framing
              </div>
              <p className="text-muted-foreground">
                The guest option is described plainly, so you can choose it without being told what
                benefits you might lose. An account remains available whenever you want one.
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
          onClick={() => setChoiceA("account")}
          className="w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-2.5 text-[11px] font-bold transition-colors cursor-pointer"
        >
          Create account &amp; check out
        </button>
        <p className="-mt-2 text-[8px] text-muted-foreground/60">
          Get member perks, faster delivery, and exclusive deals.
        </p>

        <div className="rounded-md border border-border bg-background p-2 text-center">
          <button
            onClick={() => setChoiceA("guest")}
            className="text-[9px] text-muted-foreground underline underline-offset-2 hover:text-foreground cursor-pointer"
          >
            Continue without benefits
          </button>
          <p className="mt-0.5 text-[8px] italic text-muted-foreground/50">
            Skip for now — you&rsquo;ll miss out on member perks, faster delivery, and exclusive deals.
          </p>
        </div>

        {choiceA && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Checkout option selected
            </div>
            <p className="text-muted-foreground">
              {choiceA === "guest"
                ? "You chose to continue as a guest. The account offer remains available later without changing this order."
                : "Your account checkout is ready. The guest option is still available below if you prefer not to register."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
