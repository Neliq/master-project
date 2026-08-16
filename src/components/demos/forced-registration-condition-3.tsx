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
const TAU_SENT = -0.3;

export function ForcedRegistrationCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [choice, setChoice] = React.useState<null | "guest" | "account">(null);

  const reset = () => setChoice(null);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Sent(L(N_guest)) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{SENT_DARK.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Sent(L(N_guest)) — benign</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">+{SENT_BENIGN.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Threshold &tau;_guest_sent</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_SENT.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Trigger (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{SENT_DARK.toFixed(2)} &lt; &tau; &rarr; yes</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Selected option</span>
        <span className="font-mono font-semibold tabular-nums">{choice ?? "—"}</span>
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
      title="Forced Registration: Semantic Framing of the Guest-Checkout Option"
      caption="Semantic Framing of the Guest-Checkout Option — the guest path is labelled with diminutive, deterring language that frames the privacy-respecting choice as a loss."
      auditorStats={stats}
      deltaNote={`In Variant A the guest option reads "Continue without benefits — you'll miss out" (Sent = ${SENT_DARK.toFixed(2)} < τ_guest_sent), framing the user-favorable choice as deprivation. In Variant B the same option is described neutrally (Sent = +${SENT_BENIGN.toFixed(2)}): "No account needed — you can create one later."`}
      benign={
        <div className="space-y-3">
          {cartSummary}

          <button
            onClick={() => setChoice("guest")}
            className="w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-[10px] font-semibold transition-colors cursor-pointer"
          >
            Checkout as guest
          </button>
          <p className="-mt-2 text-[8px] text-muted-foreground/60">
            No account needed — you can create one later if you like.
          </p>
          <button
            onClick={() => setChoice("account")}
            className="w-full rounded-md border border-border bg-background hover:bg-muted text-foreground py-2 text-[10px] font-semibold transition-colors cursor-pointer"
          >
            Create account (optional)
          </button>

          {choice && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Neutral framing
              </div>
              <p className="text-muted-foreground">
                Sent(L(N_guest)) = <strong className="text-emerald-700 dark:text-emerald-300">+{SENT_BENIGN.toFixed(2)}</strong>{" "}
                &ge; &tau;_guest_sent ({TAU_SENT.toFixed(2)}) — the guest label is a neutral description of
                what happens, not a list of what you lose. No sentiment pressure tilts the choice.
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
          onClick={() => setChoice("account")}
          className="w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-2.5 text-[11px] font-bold transition-colors cursor-pointer"
        >
          Create account &amp; check out
        </button>
        <p className="-mt-2 text-[8px] text-muted-foreground/60">
          Get member perks, faster delivery, and exclusive deals.
        </p>

        <div className="rounded-md border border-border bg-background p-2 text-center">
          <button
            onClick={() => setChoice("guest")}
            className="text-[9px] text-muted-foreground underline underline-offset-2 hover:text-foreground cursor-pointer"
          >
            Continue without benefits
          </button>
          <p className="mt-0.5 text-[8px] italic text-muted-foreground/50">
            Skip for now — you&rsquo;ll miss out on member perks, faster delivery, and exclusive deals.
          </p>
        </div>

        {choice && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Semantic framing triggered
            </div>
            {choice === "guest" ? (
              <p className="text-muted-foreground">
                You took the guest path despite the framing. Sent(L(N_guest)) ={" "}
                <strong className="text-rose-500">{SENT_DARK.toFixed(2)}</strong> &lt; &tau;_guest_sent
                ({TAU_SENT.toFixed(2)}) — the label semantically punishes the privacy-respecting choice:
                &ldquo;without benefits&rdquo;, &ldquo;you&rsquo;ll miss out&rdquo;. The user-favorable
                option is framed as a loss, so choosing it feels like a sacrifice.
              </p>
            ) : (
              <p className="text-muted-foreground">
                You picked the registration CTA — the framing worked. Note the asymmetry: registration
                promises gains (&ldquo;perks&rdquo;, &ldquo;deals&rdquo;), while the guest path is described
                as deprivation. The sentiment score of the guest label ({SENT_DARK.toFixed(2)}) sits far
                below the &tau;_guest_sent threshold of {TAU_SENT.toFixed(2)}.
              </p>
            )}
          </div>
        )}
      </div>
    </DemoShell>
  );
}
