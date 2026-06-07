"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Conflicting Information pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function ConflictingInformationDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Three sources of price for the same SKU. None match.
  const [tries, setTries] = React.useState(0);
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Conflicting Information"
      caption="The same SKU is priced at $9.99 on the product card, $14.99 in the cart, and $19.99 in the order summary. There is no reconciliation page; the user must navigate the discrepancy themselves."
      hint="Compare the three sources. Click 'Try to reconcile' to see what happens."
    >
      <div className="space-y-4">
        {[
          { src: "Product page", price: 9.99, note: "Shown in search results" },
          { src: "Cart", price: 14.99, note: "+ regional surcharge" },
          { src: "Order summary", price: 19.99, note: "+ handling + service" },
        ].map((row, i) => (
          <div key={i} className="bg-foreground/5 space-y-1 rounded-md border p-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-base font-medium">{row.src}</span>
              <span className="font-mono text-2xl font-semibold tabular-nums">${row.price.toFixed(2)}</span>
            </div>
            <div className="text-muted-foreground text-[10px]">{row.note}</div>
          </div>
        ))}
        <button
          onClick={() => setTries((t) => t + 1)}
          className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium"
        >
          Try to reconcile ({tries} {tries === 1 ? "attempt" : "attempts"})
        </button>
        {tries > 0 && (
          <div className="bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300 rounded-md border px-3 py-2 text-[10px]">
            {tries < 3
              ? `No reconciliation page. Attempt ${tries}: same three prices shown.`
              : "No reconciliation page exists. The three prices are by design — the highest one is what you'll be charged."}
          </div>
        )}
      </div>
    </DemoShell>
  );
}

