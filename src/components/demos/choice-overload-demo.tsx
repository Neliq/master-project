"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Choice Overload pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function ChoiceOverloadDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // 12 plans + 3 filter dimensions. Toggle 'show only best value' to
  // see the actual count of comparable plans.
  const [filter, setFilter] = React.useState(false);
  const all = Array.from({ length: 12 }, (_, i) => ({
    name: `Plan ${i + 1}`,
    price: 5 + i * 1.5,
    devices: 1 + (i % 5),
    storage: 10 + i * 5,
  }));
  const highlighted = 7;
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Choice Overload"
      caption="12 plans. Toggle the 'show best value' filter to see how many options are actually comparable. Most users give up and pick the highlighted (most expensive) one."
      hint="Try the filter. The 'best value' count is much smaller than 12."
    >
      <div className="space-y-4">
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setFilter(false)}
            className={`flex-1 rounded-md border px-3 py-1.5 font-medium ${
              !filter ? "border-foreground/30 bg-foreground text-background" : "border-foreground/10 bg-muted/40 text-muted-foreground"
            }`}
          >
            All ({all.length})
          </button>
          <button
            onClick={() => setFilter(true)}
            className={`flex-1 rounded-md border px-3 py-1.5 font-medium ${
              filter ? "border-foreground/30 bg-foreground text-background" : "border-foreground/10 bg-muted/40 text-muted-foreground"
            }`}
          >
            Best value ({all.filter((p) => p.price < 12).length})
          </button>
        </div>
        <div className="grid max-h-56 grid-cols-3 gap-1 overflow-y-auto">
          {(filter ? all.filter((p) => p.price < 12) : all).map((p, i) => (
            <div
              key={p.name}
              className={`rounded border px-2 py-1.5 text-[10px] ${
                !filter && i + 1 === highlighted
                  ? "border-amber-500 bg-amber-500/10"
                  : "border-foreground/10 bg-muted/30"
              }`}
            >
              <div className="font-medium">{p.name}</div>
              <div className="font-mono text-sm">${p.price.toFixed(2)}</div>
              <div className="text-muted-foreground">{p.devices} dev / {p.storage} GB</div>
            </div>
          ))}
        </div>
        {!filter && (
          <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
            Plan 8 is highlighted with a yellow border — it is the most expensive option.
          </div>
        )}
        {filter && (
          <div className="bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-md border px-3 py-2 text-[10px]">
            {all.filter((p) => p.price < 12).length} comparable plans when filtered. The other {12 - all.filter((p) => p.price < 12).length} are bloat.
          </div>
        )}
      </div>
    </DemoShell>
  );
}

