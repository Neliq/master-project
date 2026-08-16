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
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [stage, setStage] = React.useState<Stage>("cart");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const reset = () => {
    setStage("cart");
    setEmail("");
    setPassword("");
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">S_intent</span>
        <span className="font-mono font-semibold tabular-nums">Cart (1 item)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">S_terminal</span>
        <span className="font-mono font-semibold tabular-nums">Order confirmed</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">∀π : S_auth ∈ π (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">True — no guest path</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Current stage</span>
        <span className="font-mono font-semibold tabular-nums">{stage}</span>
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

  const registrationForm = (accent: "rose" | "emerald") => (
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
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-md border bg-background px-2 py-1.5 text-[10px] placeholder:text-muted-foreground/40 focus:outline-none"
          />
        </label>
        <label className="block text-[9px] font-medium text-muted-foreground">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="mt-1 w-full rounded-md border bg-background px-2 py-1.5 text-[10px] placeholder:text-muted-foreground/40 focus:outline-none"
          />
        </label>
        <button
          onClick={() => setStage("done")}
          className={`w-full rounded-md py-2 text-[10px] font-semibold transition-colors cursor-pointer ${
            accent === "rose"
              ? "bg-rose-600 hover:bg-rose-700 text-white"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
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
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Forced Registration: Absolute State Blocking"
      caption="Absolute State Blocking — every path from intent (cart) to completion (order confirmed) is routed through the registration node, so a one-time purchase cannot finish without creating an account."
      auditorStats={stats}
      deltaNote="In Variant A every transition path from cart to confirmation passes through the registration form (S_auth ∈ π for all π) — no guest option exists. In Variant B a direct guest-checkout path exists (S_auth ∉ π), so the same order completes in one click without an account."
      benign={
        <div className="space-y-3">
          {cartSummary}

          {stage === "cart" && (
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => setStage("done")}
                className="w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-[10px] font-semibold transition-colors cursor-pointer"
              >
                Checkout as guest
              </button>
              <button
                onClick={() => setStage("auth")}
                className="w-full rounded-md border border-border bg-background hover:bg-muted text-foreground py-2 text-[10px] font-semibold transition-colors cursor-pointer"
              >
                Create account
              </button>
            </div>
          )}

          {stage === "auth" && registrationForm("emerald")}

          {stage === "done" && (
            <>
              <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px]">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Order confirmed
                </div>
                <p className="text-muted-foreground mt-0.5">
                  Thank you! Your headphones are on the way — no account was required.
                </p>
              </div>
              <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
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

        {stage === "cart" && (
          <button
            onClick={() => setStage("auth")}
            className="w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-2 text-[10px] font-semibold transition-colors cursor-pointer"
          >
            Proceed to checkout
          </button>
        )}

        {stage === "auth" && (
          <div className="rounded-md border border-rose-500/30 bg-rose-500/5 p-2 text-[9px] text-rose-700 dark:text-rose-300">
            <strong>No guest checkout exists.</strong> Every path to your order passes through account
            creation — S_auth is the only node on the graph.
          </div>
        )}

        {stage === "auth" && registrationForm("rose")}

        {stage === "done" && (
          <>
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px]">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Order confirmed
              </div>
              <p className="text-muted-foreground mt-0.5">
                Thank you, {email || "new customer"}! Your headphones are on the way.
              </p>
            </div>
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Absolute State Blocking triggered
              </div>
              <p className="text-muted-foreground">
                &forall;&pi; &isin; Paths(S_intent &rarr; S_terminal) : S_auth &isin; &pi; — the interface
                routed <em>every</em> possible path from your cart to the confirmation through the
                registration node. A one-time $89 purchase forced you to surrender an email address, a
                password, and consent to marketing: the sunk cost of the cart made abandoning the
                transaction feel costlier than the account.
              </p>
            </div>
          </>
        )}
      </div>
    </DemoShell>
  );
}
