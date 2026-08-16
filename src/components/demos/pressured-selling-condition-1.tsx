"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Pressured Selling — Condition 1: Transactional Flow Interruption
 *
 * Thesis: S_checkout is the linear sequence of user states required to
 * complete a purchase; B_proceed is the primary action node moving the user
 * to the final payment state s_final. M_upsell is an unexpected modal window
 * containing a secondary product offer I_secondary. The feature triggers if
 * interacting with B_proceed intercepts the standard flow and injects the
 * upsell modal into the DOM, leaving s_final unreachable until a secondary
 * decision is made:
 *
 *   Click(B_proceed) => Visibility(M_upsell) = True  ∧  s_final ∉ S_current
 *
 * Variant A (dark): "Proceed to payment" is hijacked — the upsell modal
 * appears and the checkout is disabled until the offer is accepted/declined.
 * Variant B (benign): the same click proceeds straight to payment.
 */

function CartSummary() {
  return (
    <div className="space-y-1.5 text-[10px]">
      <div className="flex items-center justify-between">
        <span className="text-foreground/80">Wireless Earbuds Pro</span>
        <span className="font-mono tabular-nums">$89.00</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-foreground/80">Standard shipping</span>
        <span className="font-mono tabular-nums">$0.00</span>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-1.5 font-semibold">
        <span>Total</span>
        <span className="font-mono tabular-nums">$89.00</span>
      </div>
    </div>
  );
}

function PaymentConfirmed() {
  return (
    <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3 text-[9px] leading-relaxed">
      <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        Payment complete — s_final reached
      </div>
      <p className="text-muted-foreground mt-0.5">
        Order #48213 confirmed. The checkout flow was not interrupted by any
        secondary offer.
      </p>
    </div>
  );
}

export function PressuredSellingCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [stage, setStage] = React.useState<"cart" | "payment">("cart");
  const [upsellOpen, setUpsellOpen] = React.useState(false);
  const [upsellDecision, setUpsellDecision] = React.useState<null | "accepted" | "declined">(null);

  const reset = () => {
    setStage("cart");
    setUpsellOpen(false);
    setUpsellDecision(null);
  };

  // B_proceed click in Variant A: injects M_upsell, checkout stays blocked.
  const proceedDark = () => setUpsellOpen(true);
  // B_proceed click in Variant B: straight to payment, no interception.
  const proceedBenign = () => setStage("payment");

  const resolveUpsell = (decision: "accepted" | "declined") => {
    setUpsellDecision(decision);
    setUpsellOpen(false);
    setStage("payment");
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Click(B_proceed) ⇒ Visibility(M_upsell)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">
          {upsellOpen ? "True (injected)" : stage === "cart" ? "—" : "False"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">s_final ∈ S_current</span>
        <span className="font-mono font-semibold tabular-nums">{stage === "payment" ? "True" : "False"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Upsell decision</span>
        <span className="font-mono font-semibold tabular-nums">{upsellDecision ?? "pending"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pressured Selling: Transactional Flow Interruption"
      caption="Transactional Flow Interruption — clicking the primary checkout action injects an unexpected upsell modal, and the final payment state stays unreachable until a secondary decision is made."
      auditorStats={stats}
      deltaNote="In Variant A, clicking “Proceed to payment” fires Click(B_proceed) ⇒ Visibility(M_upsell) = True: an upsell modal is force-injected and s_final leaves S_current until you decide. In Variant B the identical click goes straight to payment — no modal, no blocked flow."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Checkout</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">One item in your cart.</p>
            <div className="mt-2">
              <CartSummary />
            </div>
            {stage === "cart" ? (
              <button
                onClick={proceedBenign}
                className="mt-3 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Proceed to payment
              </button>
            ) : (
              <div className="mt-3">
                <PaymentConfirmed />
              </div>
            )}
          </div>
          {stage === "payment" && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                No interception
              </div>
              <p className="text-muted-foreground mt-0.5">
                The click on B_proceed advanced the flow to s_final directly.
                No M_upsell was injected into the DOM.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Checkout</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">One item in your cart.</p>
          <div className="mt-2">
            <CartSummary />
          </div>
          {stage === "cart" ? (
            <button
              onClick={proceedDark}
              className="mt-3 w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Proceed to payment
            </button>
          ) : (
            <div className="mt-3">
              <PaymentConfirmed />
            </div>
          )}
        </div>

        {upsellOpen && stage === "cart" && (
          <div className="rounded-md border-2 border-rose-500/50 bg-card shadow-lg p-3 relative">
            <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4m0 4h.01" />
              </svg>
              M_upsell injected — checkout paused
            </div>
            <h4 className="text-[11px] font-semibold mt-1.5">Wait! Don&rsquo;t leave without this!</h4>
            <p className="text-[9px] text-muted-foreground mt-0.5 leading-relaxed">
              Add <strong className="text-rose-600 dark:text-rose-400">SpeedShip 1-Click Express</strong>{" "}
              (<span className="font-mono tabular-nums">$2.99/mo</span>) and your order ships first, always.
              This is the secondary offer <span className="font-mono">I_secondary</span>.
            </p>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <button
                onClick={() => resolveUpsell("accepted")}
                className="rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Yes, add it
              </button>
              <button
                onClick={() => resolveUpsell("declined")}
                className="rounded-md border border-border bg-background hover:bg-muted py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                No thanks
              </button>
            </div>
            <p className="text-[8px] text-muted-foreground/60 mt-2 text-center">
              Payment is disabled until you decide — s_final ∉ S_current.
            </p>
          </div>
        )}

        {upsellDecision && stage === "payment" && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Flow was commandeered
            </div>
            <p className="text-muted-foreground">
              Your click on B_proceed triggered{" "}
              <strong className="text-foreground">Click(B_proceed) ⇒ Visibility(M_upsell) = True</strong> —
              the modal was force-injected before s_final. You could not pay until you
              {upsellDecision === "accepted" ? " accepted the $2.99/mo upsell." : " declined the upsell."}{" "}
              Every checkout is a hostage negotiation: a secondary decision must be made first.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
