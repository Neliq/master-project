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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [step, setStep] = React.useState<"product" | "after" | "done">("product");

  const reset = () => setStep("product");

  const productCard = (onBuy: () => void, accent: "rose" | "emerald", showFiat: boolean) => (
    <div className="rounded-md border bg-background overflow-hidden">
      <div className={`relative flex h-24 items-center justify-center ${accent === "rose" ? "bg-gradient-to-br from-primary via-primary to-primary" : "bg-gradient-to-br from-primary via-primary to-primary"}`}>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg border border-background/30 bg-background/15 shadow-lg ${accent === "rose" ? "rotate-[-8deg]" : "rotate-[8deg]"}`}>
          <Star className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="absolute top-2 right-2 rounded-full bg-primary px-2 py-0.5 text-[8px] font-bold text-primary-foreground">
          PREMIUM
        </div>
      </div>
      <div className="p-3">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="text-[11px] font-semibold">{PRODUCT_NAME}</h3>
          <span className="shrink-0 rounded-full bg-muted/40 px-2 py-0.5 text-[10px] font-bold text-foreground">
            {PRICE_COINS.toLocaleString()} coins
          </span>
        </div>
        <p className="mb-3 text-[9px] leading-relaxed text-muted-foreground">
          Unlock exclusive in-game items, skins, and 500 bonus coins. Limited time offer for new players.
        </p>
        {showFiat && (
          <p className="mb-2 rounded-md border border-border/60 bg-muted/40 px-2 py-1 text-[8px] font-mono text-foreground">
            Fiat equivalent: ${PRICE_USD.toFixed(2)} — charged in your currency
          </p>
        )}
        <button
          onClick={onBuy}
          className={`flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-[10px] font-semibold text-primary-foreground transition-colors cursor-pointer ${accent === "rose" ? "bg-primary hover:bg-primary/80" : "bg-primary hover:bg-primary/80"}`}
        >
          <ShoppingCart className="h-3 w-3" />
          Buy Now &mdash; {showFiat ? `$${PRICE_USD.toFixed(2)}` : `${PRICE_COINS.toLocaleString()} coins`}
        </button>
        <p className="mt-2 text-center text-[8px] text-muted-foreground">by Stellar Games Inc.</p>
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode}
      title="Intermediate Currency: Interception of the Fiat Checkout Flow"
      caption="Interception of the Fiat Checkout Flow — the Buy action systematically bypasses the fiat payment gateway and is forcibly rerouted into the platform's virtual-currency exchange."
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
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted/40">
                    <CreditCard className="h-3.5 w-3.5 text-foreground" />
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
                    <span className="font-mono font-bold tabular-nums text-foreground">${PRICE_USD.toFixed(2)}</span>
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
                  className="w-full rounded-md bg-primary py-2 text-[10px] font-semibold text-primary-foreground transition-colors hover:bg-primary/80 cursor-pointer"
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
              <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
                <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
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
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted/40">
                  <Coins className="h-3.5 w-3.5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-[11px] font-semibold">Top up your wallet</h3>
                  <p className="text-[9px] text-muted-foreground">Add coins to your wallet to complete this purchase</p>
                </div>
              </div>
              <div className="mb-3 rounded-md border border-border/60 bg-muted/40 p-2 text-[9px] leading-relaxed">
                <span className="font-semibold text-foreground">{PRODUCT_NAME}</span>{" "}
                <span className="text-muted-foreground">costs <strong>{PRICE_COINS.toLocaleString()} coins</strong>. Your wallet is
                empty — you must buy coins before you can buy anything. Fiat payment is not accepted for in-game items.</span>
              </div>
              <div className="mb-3 rounded-md border bg-background p-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-semibold">{PACK_COINS.toLocaleString()} Coins</div>
                    <div className="text-[8px] text-muted-foreground">$ {PACK_USD.toFixed(2)} &middot; best value pack</div>
                  </div>
                  <span className="rounded-full bg-muted/40 px-2 py-0.5 text-[8px] font-bold text-foreground">+{(PACK_COINS - PRICE_COINS).toLocaleString()} extra</span>
                </div>
              </div>
              <button
                onClick={() => setStep("done")}
                className="w-full rounded-md bg-primary py-2 text-[10px] font-semibold text-primary-foreground transition-colors hover:bg-primary/80 cursor-pointer"
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
            <div className="rounded-md border bg-background p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold">Wallet updated</div>
                  <div className="text-[9px] text-muted-foreground">{PACK_COINS.toLocaleString()} coins added</div>
                </div>
                <Coins className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 flex items-center justify-between border-t pt-2 text-[9px]">
                <span className="text-muted-foreground">Available balance</span>
                <span className="font-mono font-semibold">{LEFTOVER.toLocaleString()} coins</span>
              </div>
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
