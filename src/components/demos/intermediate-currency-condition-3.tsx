"use client";

import * as React from "react";
import { Coins, ShoppingCart, AlertCircle, Check, Sparkles } from "lucide-react";

export function IntermediateCurrencyCond3({
  mode = "user",
  annotations = [],
  onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const [done, setDone] = React.useState(false);
  const reset = () => { setSelected(null); setDone(false); };

  const needed = 1200;
  const has = 100;
  const missing = needed - has;

  const bundles = [
    { coins: 500,  price: "$4.99",  tag: null },
    { coins: 1000, price: "$9.99",  tag: "Popular" },
    { coins: 2000, price: "$19.99", tag: "Best Value" },
  ];

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Coins needed</span>
        <span className="font-mono font-semibold">{missing.toLocaleString()}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Smallest bundle</span>
        <span className="font-mono font-semibold">500</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">500 covers</span>
        <span className="font-mono font-semibold text-red-500">45% of need</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Min purchase</span>
        <span className="font-mono font-semibold text-amber-500">1,000 (still short)</span>
      </div>
    </>
  ) : null;

  if (done) {
    return (
      <div className="rounded-lg border bg-background overflow-hidden">
        <div className="p-4 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-sm font-semibold">Coins Added!</h3>
          <p className="text-[10px] text-muted-foreground">
            You bought {selected!.toLocaleString()} coins for {bundles.find(b => b.coins === selected)!.price}.
          </p>
          <div className="bg-muted/50 rounded-md p-2 text-[10px] space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Previous balance</span>
              <span>{has.toLocaleString()} coins</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Added</span>
              <span>+{selected!.toLocaleString()} coins</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-1">
              <span>New balance</span>
              <span>{(has + selected!).toLocaleString()} coins</span>
            </div>
            <div className="flex justify-between text-amber-600">
              <span>Item cost</span>
              <span>-{needed.toLocaleString()} coins</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-1">
              <span>Remaining</span>
              <span>{(has + selected! - needed).toLocaleString()} coins</span>
            </div>
          </div>
          {selected! === 2000 && (
            <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-md p-2 text-[10px] text-amber-700 dark:text-amber-400">
              You have 900 leftover coins with nothing to spend them on.
              They&apos;ll sit in your wallet until they expire.
            </div>
          )}
          <button
            onClick={reset}
            className="text-[10px] text-muted-foreground hover:text-foreground underline underline-offset-2"
          >
            Restart demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* ── Insufficient balance card ── */}
      <div className="rounded-lg border bg-background overflow-hidden">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Insufficient Coins</h3>
              <p className="text-[10px] text-muted-foreground">You don&apos;t have enough to complete this purchase</p>
            </div>
          </div>

          {/* Balance breakdown */}
          <div className="bg-muted/50 rounded-md p-2.5 space-y-1.5 mb-3">
            <div className="flex justify-between text-[10px]">
              <span className="text-muted-foreground">Item cost</span>
              <span className="font-semibold">{needed.toLocaleString()} coins</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-muted-foreground">Your balance</span>
              <span>{has.toLocaleString()} coins</span>
            </div>
            <div className="flex justify-between text-[10px] border-t pt-1.5">
              <span className="font-medium text-red-600">You need</span>
              <span className="font-bold text-red-600">{missing.toLocaleString()} more coins</span>
            </div>
          </div>

          {/* Visual bar */}
          <div className="mb-1">
            <div className="flex items-center justify-between text-[9px] text-muted-foreground mb-1">
              <span>Your coins</span>
              <span>{has} / {needed}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-red-400 rounded-full transition-all"
                style={{ width: `${(has / needed) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Buy coins section ── */}
      <div className="rounded-lg border bg-background overflow-hidden">
        <div className="p-3">
          <div className="flex items-center gap-1.5 mb-3">
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            <h4 className="text-xs font-semibold">Buy Coins</h4>
            <span className="text-[9px] text-muted-foreground ml-auto">None match {missing.toLocaleString()}</span>
          </div>

          <div className="space-y-2">
            {bundles.map((b) => {
              const isSelected = selected === b.coins;
              const isEnough = b.coins >= missing;
              const leftover = isEnough ? b.coins - missing : 0;

              return (
                <button
                  key={b.coins}
                  onClick={() => setSelected(b.coins)}
                  className={`w-full rounded-lg border-2 p-2.5 flex items-center gap-3 transition-all text-left ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                      : "border-border hover:border-indigo-300 dark:hover:border-indigo-500/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected
                      ? "bg-indigo-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {isSelected ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Coins className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold">{b.coins.toLocaleString()} coins</span>
                      {b.tag && (
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
                          b.tag === "Best Value"
                            ? "bg-amber-500 text-white"
                            : "bg-indigo-500/10 text-indigo-600"
                        }`}>
                          {b.tag.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-muted-foreground">{b.price}</span>
                      {isEnough ? (
                        <span className="text-[9px] text-green-600">
                          ✓ enough &middot; {leftover.toLocaleString()} leftover
                        </span>
                      ) : (
                        <span className="text-[9px] text-red-500">
                          ✗ still {(missing - b.coins).toLocaleString()} short
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => selected && setDone(true)}
            disabled={!selected}
            className={`w-full rounded-lg py-2.5 text-xs font-semibold mt-3 transition-colors ${
              selected
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {selected
              ? `Buy ${selected.toLocaleString()} Coins for ${bundles.find(b => b.coins === selected)!.price}`
              : "Select a bundle"
            }
          </button>

          <p className="text-[8px] text-center text-muted-foreground mt-2 leading-relaxed">
            All bundles are non-refundable. Coins never expire.
            <br />No bundle matches your exact need — you&apos;ll always have leftover.
          </p>
        </div>
      </div>
    </div>
  );
}
