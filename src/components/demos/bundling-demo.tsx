"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Bundling pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function BundlingDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Three items, three prices, one bundle. The bundle is highlighted.
  const items = [
    { id: 1, name: "Notebook", price: 12 },
    { id: 2, name: "Pen set", price: 8 },
    { id: 3, name: "Stickers", price: 4 },
  ];
  const [purchaseMode, setPurchaseMode] = React.useState<"bundle" | "individual">("bundle");
  const bundlePrice = 24;
  const individualTotal = items.reduce((s, i) => s + i.price, 0);

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Bundling"
      caption="Three items can be bought separately for $24 total. The UI presents them only as a 'premium bundle' for $24, with a faint greyed-out option to buy individually."
      hint="Compare the bundle price to the individual prices."
    >
      <div className="space-y-4">
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setPurchaseMode("bundle")}
            className={`flex-1 rounded-md border px-3 py-2 text-xs font-medium ${
              purchaseMode === "bundle"
                ? "border-foreground/30 bg-foreground text-background"
                : "border-foreground/10 bg-muted/40 text-muted-foreground"
            }`}
          >
            Premium bundle
            <div className="font-mono text-base">$24</div>
          </button>
          <button
            onClick={() => setPurchaseMode("individual")}
            className={`flex-1 rounded-md border px-3 py-2 text-[10px] font-medium ${
              purchaseMode === "individual"
                ? "border-foreground/30 bg-foreground text-background"
                : "border-foreground/10 bg-muted/30 text-muted-foreground/60"
            }`}
          >
            Buy individually
            <div className="font-mono text-base">${individualTotal}</div>
          </button>
        </div>

        <div className="space-y-1">
          {items.map((it) => (
            <div key={it.id} className="bg-muted/40 flex items-center justify-between rounded-md border px-3 py-2 text-xs">
              <span className={purchaseMode === "bundle" ? "line-through opacity-60" : ""}>{it.name}</span>
              <span className="font-mono tabular-nums">${it.price}</span>
            </div>
          ))}
        </div>

        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          "Bundle" is a $0 saving; the highlighted style nudges you to skip the comparison.
        </div>
      </div>
    </DemoShell>
  );
}

