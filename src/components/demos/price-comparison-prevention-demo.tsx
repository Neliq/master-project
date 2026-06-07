"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Price Comparison Prevention pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function PriceComparisonPreventionDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Search results show different prices per result, but the
  // "compare" button is greyed and the price links redirect to "sale".
  const results = [
    { name: "Hotel A", price: 89, onSale: true },
    { name: "Hotel A (alt)", price: 119, onSale: false },
    { name: "Hotel B", price: 99, onSale: true },
  ];
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Price Comparison Prevention"
      caption="The search result page is optimised to make the cheapest option the only visible one, while the 'compare prices' button is rendered but disabled. Clicking a result re-routes you to a 'sale' page with the same listing."
      hint="Hover over each result to see the redirect trap."
    >
      <div className="space-y-4">
        <div className="space-y-1">
          {results.map((r, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="bg-muted/40 flex items-center justify-between rounded-md border px-3 py-2 text-xs"
            >
              <div>
                <div className="font-medium">{r.name}</div>
                {hovered === i && (
                  <div className="text-amber-700 dark:text-amber-300 text-[10px]">
                    → redirects to "Exclusive sale" (price {r.onSale ? "+$30" : "unchanged"})
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="font-mono text-base font-semibold tabular-nums">${r.price}</div>
                {r.onSale && <div className="text-emerald-600 text-[10px]">On sale</div>}
              </div>
            </div>
          ))}
        </div>

        <button
          disabled
          className="bg-muted/40 text-muted-foreground w-full cursor-not-allowed rounded-md border border-dashed px-3 py-1.5 text-xs font-medium"
        >
          Compare prices (disabled)
        </button>
      </div>
    </DemoShell>
  );
}

