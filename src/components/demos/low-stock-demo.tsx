"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Low Stock pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function LowStockDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // "Only 2 left in stock!" — refreshing the page resets it to 2.
  const [stock, setStock] = React.useState(2);
  const [claimed, setClaimed] = React.useState(2);
  const [cartAdds, setCartAdds] = React.useState(0);

  const isAuditor = mode === "auditor";
  const refresh = () => {
    setClaimed(2);
    setStock(2);
  };
  const reset = () => {
    setStock(2);
    setClaimed(2);
    setCartAdds(0);
  };

  const auditorControls = isAuditor ? (
    <>
      <button
        onClick={refresh}
        className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        Simulate page refresh
      </button>
      <button
        onClick={reset}
        className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        Restart
      </button>
    </>
  ) : null;

  const auditorStats = isAuditor ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Real stock</span>
        <span className="font-mono font-semibold tabular-nums">{stock}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Claimed stock</span>
        <span className="font-mono font-semibold tabular-nums">{claimed}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Cart adds</span>
        <span className="font-mono font-semibold tabular-nums">{cartAdds}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset} auditorControls={auditorControls} auditorStats={auditorStats} title="Low Stock"
      caption="The product page insists 'Only 2 left!'. Adding to cart does not decrement the public stock count, and refreshing the page resets it back to 2."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Limited-edition mug</span>
            <span className="bg-red-500/20 text-red-700 dark:text-red-300 rounded px-2 py-0.5 text-[10px] font-medium">
              ⚠ Only {claimed} left
            </span>
          </div>
          <div className="font-mono text-2xl font-semibold tabular-nums">$24.00</div>
          <button
            onClick={() => { setStock((s) => s + 1); setCartAdds((c) => c + 1); }}
            className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium"
          >
            Add to cart
          </button>
        </div>
      </div>
    </DemoShell>
  );
}
