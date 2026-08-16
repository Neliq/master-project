"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { Coins, CreditCard, ShoppingCart, Star, ArrowLeft, Check } from "lucide-react";

/*
 * Intermediate Currency — Condition 1: Interception of the Fiat Checkout Flow
 *
 * Thesis: V_product is the interface state showing a purchasable item and
 * E_purchase its "Buy" trigger. The feature fires if the targeted transition
 * edge systematically bypasses direct fiat payment, forcibly routing the user
 * away from the fiat checkout (V_checkout) and into the internal virtual-
 * currency exchange (V_exchange):
 *
 *   target(E_purchase) = V_exchange  ∧  target(E_purchase) ≠ V_checkout
 *
 * Variant A (dark): clicking "Buy" on the product page routes straight into
 * the coin top-up exchange; no fiat checkout is ever offered.
 * Variant B (benign): the identical product card routes the same action to a
 * normal fiat payment gateway.
 */

const PRODUCT_NAME = "Stellar Nova Bundle";
const PRICE_COINS = 1299;
const PRICE_USD = 40.79; // ≈ 1299 × $0.0314
const PACK_COINS = 1500;
const PACK_USD = 47.1;
const LEFTOVER = PACK_COINS - PRICE_COINS; // 201 unspendable coins

export function IntermediateCurrencyCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [step, setStep] = React.useState<"product" | "after" | "done">("product");

  const reset = () => setStep("product");

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Product cost</span>
        <span className="font-mono font-semibold tabular-nums">{PRICE_COINS.toLocaleString()} coins ≈ ${PRICE_USD.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">target(E_purchase) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">V_exchange (coin store)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">target(E_purchase) — benign</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">V_checkout (fiat)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Fiat checkout offered (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">Never</span>
      </div>
    </>
  ) : null;

  const productCard = (onBuy: () => void, accent: "rose" | "emerald", showFiat: boolean) => (
    <div className="rounded-md border bg-background overflow-hidden">
      <div className={`relative flex h-24 items-center justify-center bg-gradient-to-br ${accent === "rose" ? "from-rose-500/15 via-purple-500/15 to-indigo-500/15" : "from-emerald-500/15 via-teal-500/15 to-indigo-500/15"}`}>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br shadow ${accent === "rose" ? "from-rose-500 to-purple-600" : "from-emerald-500 to-teal-600"}`}>
          <Star className="h-6 w-6 text-white" />
        </div>
        <div className="absolute top-2 right-2 rounded-full bg-amber-500 px-2 py-0.5 text-[8px] font-bold text-white">
          PREMIUM
        </div>
      </div>
      <div className="p-3">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="text-[11px] font-semibold">{PRODUCT_NAME}</h3>
          <span className="shrink-0 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
            {PRICE_COINS.toLocaleString()} coins
          </span>
        </div>
        <p className="mb-3 text-[9px] leading-relaxed text-muted-foreground">
          Unlock exclusive in-game items, skins, and 500 bonus coins. Limited time offer for new players.
        </p>
        {showFiat && (
          <p className="mb-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-2 py-1 text-[8px] font-mono text-emerald-700 dark:text-emerald-300">
            Fiat equivalent: ${PRICE_USD.toFixed(2)} — charged in your currency
          </p>
        )}
        <button
          onClick={onBuy}
          className={`flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-[10px] font-semibold text-white transition-colors cursor-pointer ${accent === "rose" ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"}`}
        >
          <ShoppingCart className="h-3 w-3" />
          Buy Now &mdash; {showFiat ? `$${PRICE_USD.toFixed(2)}` : `${PRICE_COINS.toLocaleString()} coins`}
        </button>
        <p className="mt-2 text-center text-[8px] text-muted-foreground">by Stellar Games Inc.</p>
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Intermediate Currency: Interception of the Fiat Checkout Flow"
      caption="Interception of the Fiat Checkout Flow — the Buy action systematically bypasses the fiat payment gateway and is forcibly rerouted into the platform's virtual-currency exchange."
      auditorStats={stats}
      deltaNote={`Both panels show the identical product card and the identical Buy action. The only difference is the transition target and the price disclosure: in Variant A the product is priced only in coins (no fiat equivalent on the card) and the Buy action routes to the coin exchange (V_exchange — no fiat checkout is ever offered); in Variant B the card shows the fiat equivalent ($${PRICE_USD.toFixed(2)}) and routes straight to the fiat payment gateway (V_checkout).`}
      benign={
        <div className="space-y-3">
          {step === "product" && productCard(() => setStep("after"), "emerald", true)}

          {step === "after" && (
            <div className="rounded-md border bg-background overflow-hidden">
              <div className="p-3">
                <button
                  onClick={() => setStep("product")}
                  className="mb-3 flex items-center gap-1 text-[9px] text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  <ArrowLeft className="h-3 w-3" /> Back to store
                </button>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10">
                    <CreditCard className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-semibold">Secure fiat checkout</h3>
                    <p className="text-[9px] text-muted-foreground">V_checkout — pay with your card, no coins required.</p>
                  </div>
                </div>
                <div className="mb-3 space-y-1.5 rounded-md border bg-muted/30 p-2.5 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{PRODUCT_NAME}</span>
                    <span className="font-mono font-semibold tabular-nums">{PRICE_COINS.toLocaleString()} coins</span>
                  </div>
                  <div className="flex justify-between border-t pt-1">
                    <span className="font-medium">Total</span>
                    <span className="font-mono font-bold tabular-nums text-emerald-600 dark:text-emerald-400">${PRICE_USD.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mb-3 space-y-1.5">
                  <div className="rounded-md border bg-background px-2.5 py-1.5 text-[9px] font-mono text-muted-foreground">Card number&ensp;•••• •••• •••• 4242</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="rounded-md border bg-background px-2.5 py-1.5 text-[9px] font-mono text-muted-foreground">MM/YY&ensp;12/28</div>
                    <div className="rounded-md border bg-background px-2.5 py-1.5 text-[9px] font-mono text-muted-foreground">CVC&ensp;•••</div>
                  </div>
                </div>
                <button
                  onClick={() => setStep("done")}
                  className="w-full rounded-md bg-emerald-600 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-emerald-700 cursor-pointer"
                >
                  Pay ${PRICE_USD.toFixed(2)} now
                </button>
                <p className="mt-2 text-center text-[8px] text-muted-foreground">
                  Charged in your currency. No virtual-currency exchange in this flow.
                </p>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="space-y-2">
              <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <Check className="h-3 w-3" /> Direct fiat purchase
                </div>
                <p className="text-muted-foreground">
                  target(E<sub>purchase</sub>) = V<sub>checkout</sub>: your ${PRICE_USD.toFixed(2)} was charged directly to your card.
                  The product card disclosed the fiat equivalent up front, and no top-up screen or exchange rate was interposed
                  between your money and the product.
                </p>
              </div>
              <button onClick={reset} className="w-full rounded-md border py-1.5 text-[9px] font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
                Restart demo
              </button>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {step === "product" && productCard(() => setStep("after"), "rose", false)}

        {step === "after" && (
          <div className="rounded-md border bg-background overflow-hidden">
            <div className="p-3">
              <button
                onClick={() => setStep("product")}
                className="mb-3 flex items-center gap-1 text-[9px] text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                <ArrowLeft className="h-3 w-3" /> Back to store
              </button>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/10">
                  <Coins className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-[11px] font-semibold">Top up your wallet</h3>
                  <p className="text-[9px] text-muted-foreground">V_exchange — add coins to complete your purchase</p>
                </div>
              </div>
              <div className="mb-3 rounded-md border border-amber-500/30 bg-amber-500/5 p-2 text-[9px] leading-relaxed">
                <span className="font-semibold text-amber-700 dark:text-amber-300">{PRODUCT_NAME}</span>{" "}
                <span className="text-muted-foreground">costs <strong>{PRICE_COINS.toLocaleString()} coins</strong>. Your wallet is
                empty — you must buy coins before you can buy anything. Fiat payment is not accepted for in-game items.</span>
              </div>
              <div className="mb-3 rounded-md border bg-background p-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-semibold">{PACK_COINS.toLocaleString()} Coins</div>
                    <div className="text-[8px] text-muted-foreground">$ {PACK_USD.toFixed(2)} &middot; best value pack</div>
                  </div>
                  <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[8px] font-bold text-amber-600 dark:text-amber-400">+{(PACK_COINS - PRICE_COINS).toLocaleString()} extra</span>
                </div>
              </div>
              <button
                onClick={() => setStep("done")}
                className="w-full rounded-md bg-rose-600 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-rose-700 cursor-pointer"
              >
                Buy {PACK_COINS.toLocaleString()} Coins — ${PACK_USD.toFixed(2)}
              </button>
              <p className="mt-2 text-center text-[8px] leading-relaxed text-muted-foreground">
                Remaining balance stays in your wallet. Unused coins never expire.
              </p>
            </div>
          </div>
        )}

        {step === "done" && (
          <div className="space-y-2">
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Checkout flow intercepted
              </div>
              <p className="text-muted-foreground">
                target(E<sub>purchase</sub>) = V<sub>exchange</sub> <strong className="text-foreground">∧</strong>{" "}
                target(E<sub>purchase</sub>) ≠ V<sub>checkout</sub> — you clicked &ldquo;Buy&rdquo; and were routed straight into
                the coin storefront. You paid <strong className="text-rose-500">${PACK_USD.toFixed(2)}</strong> for{" "}
                {PACK_COINS.toLocaleString()} coins to buy a product priced at ${PRICE_USD.toFixed(2)}, and{" "}
                <strong className="text-foreground">{LEFTOVER.toLocaleString()} coins</strong> remain stranded in your wallet —
                an unspendable remainder that nudges you toward a future purchase.
              </p>
              <p className="text-muted-foreground">
                The fiat gateway was never presented. The interface decouples the perceived cost from the real financial
                impact: you paid in &ldquo;coins&rdquo;, not dollars.
              </p>
            </div>
            <button onClick={reset} className="w-full rounded-md border py-1.5 text-[9px] font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
              Restart demo
            </button>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
