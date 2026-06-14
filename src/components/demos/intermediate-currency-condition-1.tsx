"use client";

import * as React from "react";
import { Coins, ArrowLeft, ShoppingCart, Star, Check } from "lucide-react";

const COIN_PRICE = 0.0314; // 1 coin = $0.0314

export function IntermediateCurrencyCond1({
  mode = "user",
  annotations = [],
  onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [step, setStep] = React.useState<"product" | "topup" | "done">("product");
  const [coinInput, setCoinInput] = React.useState("");
  const reset = () => { setStep("product"); setCoinInput(""); };

  const coinAmount = parseInt(coinInput, 10) || 0;
  const dollarAmount = coinAmount * COIN_PRICE;
  const valid = coinAmount > 0;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Product cost</span>
        <span className="font-mono font-semibold">1,299 coins</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Redirect target</span>
        <span className="font-mono font-semibold text-pink-500">Wallet top-up</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Direct fiat checkout</span>
        <span className="font-mono font-semibold text-red-500">Bypassed</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Exchange rate</span>
        <span className="font-mono font-semibold">1 coin = ${COIN_PRICE}</span>
      </div>
    </>
  ) : null;

  return (
    <div className="space-y-3">
      {/* ── Step 1: Product page ── */}
      {step === "product" && (
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="relative h-36 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Star className="w-10 h-10 text-white" />
            </div>
            <div className="absolute top-2 right-2 bg-pink-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
              PREMIUM
            </div>
          </div>
          <div className="p-3">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-sm font-semibold">Stellar Nova Bundle</h3>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-full shrink-0">
                1,299 coins
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground mb-3">
              Unlock exclusive in-game items, skins, and 500 bonus coins.
              Limited time offer for new players.
            </p>
            <button
              onClick={() => setStep("topup")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2.5 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Buy Now &mdash; 1,299 coins
            </button>
            <p className="text-[9px] text-center text-muted-foreground mt-2">
              by Stellar Games Inc.
            </p>
          </div>
        </div>
      )}

      {/* ── Step 2: Redirected to wallet top-up ── */}
      {step === "topup" && (
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="p-3">
            <button
              onClick={() => setStep("product")}
              className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground mb-3 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to store
            </button>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Coins className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Top Up Your Wallet</h3>
                <p className="text-[10px] text-muted-foreground">Add funds to complete your purchase</p>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-md p-2 mt-3 mb-3">
              <p className="text-[10px] text-amber-700 dark:text-amber-400">
                <span className="font-semibold">Stellar Nova Bundle</span> costs <span className="font-bold">1,299 coins</span>.
                Top up your wallet to continue.
              </p>
            </div>

            {/* Coin input */}
            <div className="space-y-2 mb-3">
              <label className="text-[10px] font-medium text-muted-foreground">
                How many coins do you want to add?
              </label>
              <div className="relative">
                <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                <input
                  type="number"
                  min={1}
                  value={coinInput}
                  onChange={(e) => setCoinInput(e.target.value)}
                  placeholder="e.g. 1299"
                  className="w-full rounded-lg border bg-background pl-9 pr-3 py-2.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-muted-foreground/50"
                />
              </div>

              {/* Live price calculation */}
              {coinAmount > 0 && (
                <div className="bg-muted/50 rounded-md p-2.5 space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Coins</span>
                    <span className="font-mono font-semibold">{coinAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-mono">1 coin = ${COIN_PRICE}</span>
                  </div>
                  <div className="flex justify-between text-[10px] border-t pt-1">
                    <span className="font-medium">You pay</span>
                    <span className="font-mono font-bold">${dollarAmount.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => valid && setStep("done")}
              disabled={!valid}
              className={`w-full rounded-lg py-2.5 text-xs font-semibold transition-colors ${
                valid
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {valid
                ? `Top Up ${coinAmount.toLocaleString()} Coins — $${dollarAmount.toFixed(2)}`
                : "Enter an amount"
              }
            </button>

            <p className="text-[8px] text-center text-muted-foreground mt-2 leading-relaxed">
              Remaining balance stays in your wallet. Unused coins never expire.
              <br />By continuing you agree to the Terms of Service.
            </p>
          </div>
        </div>
      )}

      {/* ── Step 3: Done ── */}
      {step === "done" && (
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="p-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-sm font-semibold">Payment Processed!</h3>
            <p className="text-[10px] text-muted-foreground">
              ${dollarAmount.toFixed(2)} has been added to your wallet.
              You now have {coinAmount.toLocaleString()} coins.
            </p>
            <div className="bg-muted/50 rounded-md p-2 text-[10px] space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stellar Nova Bundle</span>
                <span>1,299 coins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Remaining balance</span>
                <span>{(coinAmount - 1299).toLocaleString()} coins</span>
              </div>
            </div>
            <button
              onClick={reset}
              className="text-[10px] text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              Restart demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
