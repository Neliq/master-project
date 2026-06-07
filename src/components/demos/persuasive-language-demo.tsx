"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Persuasive Language pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function PersuasiveLanguageDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Three pairs of the same offer with different verbs.
  const [picks, setPicks] = React.useState<{ [k: string]: "positive" | "negative" | null }>({});
  const pairs = [
    { id: "a", pos: "Save 10% — earn $12", neg: "Pay 10% extra — lose $12", price: 107.88 },
    { id: "b", pos: "Free for the first month", neg: "Charge starts next month", price: 0 },
    { id: "c", pos: "Unlock 100 coins", neg: "Miss out on 100 coins", price: 9.99 },
  ];
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Persuasive Language"
      caption="The same offer is paired with positive and negative framings. The loss-framed version is rejected more often, even though the price is identical."
      hint="Pick one from each pair. Notice how often the positive frame wins."
    >
      <div className="space-y-3">
        {pairs.map((p) => (
          <div key={p.id} className="space-y-1">
            <div className="text-muted-foreground text-[10px]">Offer #{p.id} — ${p.price.toFixed(2)}</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPicks((pk) => ({ ...pk, [p.id]: "positive" }))}
                className={`rounded-md border p-2 text-left text-[10px] transition-colors ${
                  picks[p.id] === "positive"
                    ? "border-emerald-500 bg-emerald-500/20"
                    : "border-foreground/10 bg-muted/30 hover:bg-muted/50"
                }`}
              >
                {p.pos}
              </button>
              <button
                onClick={() => setPicks((pk) => ({ ...pk, [p.id]: "negative" }))}
                className={`rounded-md border p-2 text-left text-[10px] transition-colors ${
                  picks[p.id] === "negative"
                    ? "border-red-500 bg-red-500/20"
                    : "border-foreground/10 bg-muted/30 hover:bg-muted/50"
                }`}
              >
                {p.neg}
              </button>
            </div>
          </div>
        ))}
        {Object.values(picks).filter(Boolean).length > 0 && (
          <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
            Positive frames picked: {Object.values(picks).filter((p) => p === "positive").length}/
            {Object.values(picks).filter(Boolean).length} (loss aversion is real)
          </div>
        )}
      </div>
    </DemoShell>
  );
}

