"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Forced Registration — Condition 1: Absolute State Blocking
 *
 * Thesis: S_intent is the initial user state (viewing a cart), S_terminal the
 * desired completion state (order confirmed), and S_auth a state requiring
 * explicit user registration and authentication. The feature triggers if the
 * system algorithmically blocks ALL direct transition paths from intent to
 * completion, routing every possible interaction graph through the
 * authentication node:
 *
 *   ∀π ∈ Paths(S_intent → S_terminal) : S_auth ∈ π
 *
 * Variant A (dark): the checkout flow has no guest option at all — every path
 * from cart to order-confirmed passes through the registration form (S_auth).
 * Variant B (benign): a direct guest-checkout path exists (S_auth ∉ π).
 */

type Stage = "cart" | "auth" | "done";

export function ForcedRegistrationCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [stageA, setStageA] = React.useState<Stage>("cart");
  const [emailA, setEmailA] = React.useState("");
  const [passwordA, setPasswordA] = React.useState("");
  const [stageB, setStageB] = React.useState<Stage>("cart");
  const [emailB, setEmailB] = React.useState("");
  const [passwordB, setPasswordB] = React.useState("");


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
          <div className="text-[9px] text-muted-foreground">$89.00 — one-time purchase, no subscription</div>
        </div>
      </div>
      <div className="mt-2 space-y-1 border-t border-border pt-2 text-[9px] text-muted-foreground">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-mono tabular-nums">$89.00</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-mono tabular-nums">Free</span>
        </div>
        <div className="flex justify-between font-medium text-foreground">
          <span>Total</span>
          <span className="font-mono tabular-nums">$89.00</span>
        </div>
      </div>
    </div>
  );

  type RegistrationFormProps = {
    accent: "rose" | "emerald";
    email: string;
    password: string;
    onEmailChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onSubmit: () => void;
  };

  const registrationForm = ({
    accent,
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onSubmit,
  }: RegistrationFormProps) => (
    <div className="rounded-md border bg-card p-3">
      <h3 className="text-[11px] font-semibold">Create your account</h3>
      <p className="text-[9px] text-muted-foreground mt-0.5">
        Almost done! An account is required to complete this one-time purchase.
      </p>
      <div className="mt-2.5 space-y-2">
        <label className="block text-[9px] font-medium text-muted-foreground">
          Email address
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-md border bg-background px-2 py-1.5 text-[10px] placeholder:text-muted-foreground/40 focus:outline-none"
          />
        </label>
        <label className="block text-[9px] font-medium text-muted-foreground">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="At least 8 characters"
            className="mt-1 w-full rounded-md border bg-background px-2 py-1.5 text-[10px] placeholder:text-muted-foreground/40 focus:outline-none"
          />
        </label>
        <button
          onClick={onSubmit}
          className={`w-full rounded-md py-2 text-[10px] font-semibold transition-colors cursor-pointer ${
            accent === "rose"
              ? "bg-primary hover:bg-primary/80 text-primary-foreground"
              : "bg-primary hover:bg-primary/80 text-primary-foreground"
          }`}
        >
          Create account &amp; place order
        </button>
        <p className="text-[8px] text-muted-foreground/50">
          By creating an account you agree to marketing emails, data retention, and our terms.
        </p>
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode}
      title="Forced Registration: Absolute State Blocking"
      userTitle="Northstar — Browse catalog"
      caption="Absolute State Blocking — every path from intent (cart) to completion (order confirmed) is routed through the registration node, so a one-time purchase cannot finish without creating an account."
      deltaNote="In Variant A every transition path from cart to confirmation passes through the registration form (S_auth ∈ π for all π) — no guest option exists. In Variant B a direct guest-checkout path exists (S_auth ∉ π), so the same order completes in one click without an account."
      benign={
        <div className="space-y-3">
          {cartSummary}

          {stageB === "cart" && (
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => setStageB("done")}
                className="w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-2 text-[10px] font-semibold transition-colors cursor-pointer"
              >
                Checkout as guest
              </button>
              <button
                onClick={() => setStageB("auth")}
                className="w-full rounded-md border border-border bg-background hover:bg-muted text-foreground py-2 text-[10px] font-semibold transition-colors cursor-pointer"
              >
                Create account
              </button>
            </div>
          )}

          {stageB === "auth" && registrationForm({
            accent: "emerald",
            email: emailB,
            password: passwordB,
            onEmailChange: setEmailB,
            onPasswordChange: setPasswordB,
            onSubmit: () => setStageB("done"),
          })}

          {stageB === "done" && (
            <>
              <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px]">
                <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Order confirmed
                </div>
                <p className="text-muted-foreground mt-0.5">
                  Thank you! Your headphones are on the way — no account was required.
                </p>
              </div>
              <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Direct path exists
                </div>
                <p className="text-muted-foreground">
                  There is a path &pi; with S_auth &notin; &pi;: &ldquo;Checkout as guest&rdquo; reaches
                  S_terminal directly. Registration stays available for users who want it — it is never
                  a toll on a one-time purchase.
                </p>
              </div>
            </>
          )}
        </div>
      }
    >
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {cartSummary}

        {stageA === "cart" && (
          <button
            onClick={() => setStageA("auth")}
            className="w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-2 text-[10px] font-semibold transition-colors cursor-pointer"
          >
            Proceed to checkout
          </button>
        )}

        {stageA === "auth" && (
          <div className="rounded-md border border-border/60 bg-muted/40 p-2 text-[9px] text-foreground">
            <strong>No guest checkout exists.</strong> Creating an account is required before the order
            can be completed.
          </div>
        )}

        {stageA === "auth" && registrationForm({
          accent: "rose",
          email: emailA,
          password: passwordA,
          onEmailChange: setEmailA,
          onPasswordChange: setPasswordA,
          onSubmit: () => setStageA("done"),
        })}

        {stageA === "done" && (
          <>
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px]">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Order confirmed
              </div>
              <p className="text-muted-foreground mt-0.5">
                Thank you, {emailA || "new customer"}! Your headphones are on the way.
              </p>
            </div>
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Account step used for checkout
              </div>
              <p className="text-muted-foreground">
                The account step was required before your order could be confirmed. A one-time $89 purchase
                made leaving the cart feel costly, so the checkout flow asked for an email address, a password,
                and marketing consent before completing the order.
              </p>
            </div>
          </>
        )}
      </div>
    </DemoShell>
  );
}
