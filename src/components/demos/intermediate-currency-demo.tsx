"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Intermediate Currency pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function IntermediateCurrencyDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // 100 coins = $1.27. The app sells coins in 500-coin packs.
  const [coins, setCoins] = React.useState(100);
  const usd = (coins / 100) * 1.27;
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Intermediate Currency"
      caption="The app uses 'coins' as an intermediate currency. 100 coins ≈ $1.27, but coins can only be purchased in 500-coin ($6.35) packs. The conversion is not 1:1 with USD."
      hint="Buy coins. Note the conversion."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-1 rounded-md border p-4 text-center">
          <div className="text-muted-foreground text-[10px]">Wallet</div>
          <div className="font-mono text-4xl font-semibold tabular-nums">{coins}</div>
          <div className="text-[10px]">coins ≈ <span className="font-mono">${usd.toFixed(2)}</span></div>
        </div>
        <div className="space-y-1">
          {[
            { coins: 500, usd: 6.35 },
            { coins: 1000, usd: 12.70 },
            { coins: 5000, usd: 63.50 },
          ].map((pack) => (
            <button
              key={pack.coins}
              onClick={() => setCoins((c) => c + pack.coins)}
              className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium"
            >
              +{pack.coins} coins — ${pack.usd.toFixed(2)}
            </button>
          ))}
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          Smallest pack: 500 coins ($6.35). You can&apos;t buy exactly 100 coins.
        </div>
      </div>
    </DemoShell>
  );
}

