"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Pay-To-Play pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function PayToPlayDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // 0 lives, watch ad for +1 or pay $0.99.
  const [lives, setLives] = React.useState(0);
  const [coins, setCoins] = React.useState(50);
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Pay-To-Play"
      caption="Out of lives. The only ways to continue are: watch a 60-second ad (one life) or pay $0.99 (three lives). Free play is impossible."
      hint="Play. Spend lives. Notice the trade-off."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-center text-xs">
          <div className="text-muted-foreground text-[10px]">Lives</div>
          <div className="font-mono text-5xl font-semibold tabular-nums">{lives}</div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setLives((l) => Math.max(0, l - 1))}
            className="bg-foreground text-background rounded-md px-3 py-1.5 font-medium"
          >
            Play
          </button>
          <button
            onClick={() => setLives((l) => l + 1)}
            className="bg-amber-500 text-white rounded-md px-3 py-1.5 font-medium"
          >
            +1 life (watch 60s ad)
          </button>
          <button
            onClick={() => { setLives((l) => l + 3); setCoins((c) => Math.max(0, c - 99)); }}
            disabled={coins < 99}
            className="bg-amber-500 text-white rounded-md px-3 py-1.5 font-medium disabled:opacity-30"
          >
            +3 lives ($0.99)
          </button>
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          Wallet: {coins} coins
        </div>
      </div>
    </DemoShell>
  );
}

