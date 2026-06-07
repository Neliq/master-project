"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Reference Pricing pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function ReferencePricingDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // "Was $199" — but the product was never actually sold at that price.
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Reference Pricing"
      caption="The product page shows 'Was $199' crossed out, 'Now $99'. The 'was' price was never actually charged; it exists only to anchor the discount."
      hint="Walk the price history. The 'was' price was never the actual price."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-1 rounded-md border p-4 text-center">
          <div className="text-base font-medium">Premium widget</div>
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-mono text-base text-muted-foreground line-through">$199</span>
            <span className="font-mono text-3xl font-semibold tabular-nums">$99</span>
          </div>
          <div className="text-amber-700 dark:text-amber-300 text-[10px]">Save $100 (50% off!)</div>
        </div>
        <div className="space-y-1">
          <div className="bg-muted/40 flex items-center justify-between rounded-md border px-3 py-2 text-[10px]">
            <span>1 month ago</span>
            <span className="font-mono">$99</span>
          </div>
          <div className="bg-muted/40 flex items-center justify-between rounded-md border px-3 py-2 text-[10px]">
            <span>3 months ago</span>
            <span className="font-mono">$99</span>
          </div>
          <div className="bg-muted/40 flex items-center justify-between rounded-md border px-3 py-2 text-[10px]">
            <span>1 year ago</span>
            <span className="font-mono">$99</span>
          </div>
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          Historical price is always $99. The &quot;was $199&quot; exists only to create a discount frame.
        </div>
      </div>
    </DemoShell>
  );
}

