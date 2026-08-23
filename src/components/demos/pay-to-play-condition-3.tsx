"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Pay-To-Play — Condition 3: Semantic Framing of Payment as Unlock
 *
 * Thesis: the algorithm inspects the lexical framing of payment prompts.
 * The feature triggers if the interface frames a required payment as an
 * "unlock," "discovery," or "enhancement" rather than as a purchase or
 * transaction, using semantic reframing to dissociate the monetary cost
 * from the action and reduce spending inhibition:
 *
 *   Frame(T_payment) ∈ {Unlock, Discover, Enhance} ∧ Frame(T_payment) ≠ Transaction
 *
 * Variant A (dark): the same $4.99 purchase is framed as "Unlock the
 * Ancient Chest" — the price is buried in fine print, never labelled a
 * purchase.
 * Variant B (benign): identical offer, framed transparently as a
 * transaction: "Buy the Ancient Chest — $4.99 one-time purchase."
 */

const PRICE = "$4.99";

export function PayToPlayCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [purchased, setPurchased] = React.useState(false);

  const reset = () => setPurchased(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Frame(T_payment) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">&ldquo;Unlock&rdquo;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Frame(T_payment) (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">Transaction</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Price prominence (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">fine print</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Purchased?</span>
        <span className="font-mono font-semibold tabular-nums">{purchased ? "Yes" : "No"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pay-To-Play: Semantic Framing of Payment as Unlock"
      caption="Semantic Framing of Payment as Unlock — a required payment is dressed up as an 'unlock' instead of a purchase, dissociating the money from the action."
      auditorStats={stats}
      deltaNote="Both variants sell the identical Ancient Chest for $4.99. Variant A frames the payment as 'Unlock the Ancient Chest' (Frame ∈ {Unlock, Discover, Enhance}) with the price in fine print. Variant B frames the identical offer as a transaction — 'Buy the Ancient Chest' — with the price on the button, so spending inhibition stays intact."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                <svg className="h-4.5 w-4.5 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">The Ancient Chest</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Legendary loot: 500 gems, a rare sword skin, and the Crown of Ember.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Item shop
              </div>
            </div>

            {!purchased ? (
              <>
                <div className="mt-3 rounded-md border border-green-500/30 bg-green-500/5 p-2.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Buy the Ancient Chest</span>
                    <span className="font-mono font-semibold tabular-nums text-green-600 dark:text-green-400">{PRICE} one-time</span>
                  </div>
                  <p className="text-[8px] text-muted-foreground mt-0.5">
                    One-time purchase. Charged to your payment method on file. No recurring fees.
                  </p>
                </div>
                <button
                  onClick={() => setPurchased(true)}
                  className="mt-2 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  Purchase — {PRICE}
                </button>
              </>
            ) : (
              <div className="mt-3 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] text-green-700 dark:text-green-300 flex items-center gap-1.5">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Purchase complete — the chest is in your inventory.
              </div>
            )}
          </div>

          {purchased && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Transaction framing
              </div>
              <p className="text-muted-foreground mt-0.5">
                Frame(T_payment) = Transaction. The button said &ldquo;Purchase — {PRICE}&rdquo; and the
                fine print confirmed a one-time charge. The cost was never dissociated from the
                action, so the purchase was an informed decision.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
              <svg className="h-4.5 w-4.5 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">Mysterious Ancient Chest</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                A legendary chest lies sealed beneath the Ember Temple. Only the worthy may open it.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Discover
            </div>
          </div>

          {!purchased ? (
            <>
              <button
                onClick={() => setPurchased(true)}
                className="mt-3 w-full rounded-md     text-white py-2.5 text-[11px] font-bold transition-colors cursor-pointer"
              >
                ✨ Unlock the Ancient Chest
              </button>
              <p className="text-[8px] text-muted-foreground/60 mt-1.5 text-center">
                A small one-time fee applies. Unlock to enhance your journey.
              </p>
              <p className="text-[7px] text-muted-foreground/40 mt-0.5 text-center">
                {PRICE} — charged to your payment method on file.
              </p>
            </>
          ) : (
            <div className="mt-3 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] text-yellow-700 dark:text-yellow-300 flex items-center gap-1.5">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Chest unlocked! Your journey is enhanced.
            </div>
          )}
        </div>

        {mode === "auditor" && purchased && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Episode unlocked
            </div>
            <p className="text-muted-foreground">
              Frame(T_payment) = <strong className="text-red-500">&ldquo;Unlock&rdquo;</strong> ∈
              {" "}{"{Unlock, Discover, Enhance}"} and Frame ≠ Transaction. You just paid{" "}
              <strong className="text-foreground">{PRICE}</strong> — the price was buried in 7-px fine
              print under an &ldquo;Unlock&rdquo; button, never once labelled a purchase or transaction.
              The semantic reframing dissociates the monetary cost from the action, lowering spending
              inhibition: it feels like a reward, not a payment.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
