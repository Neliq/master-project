"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Disguised Ad pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function DisguisedAdDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // 2 organic + 1 sponsored, styled identically. User must spot.
  const [revealed, setRevealed] = React.useState<boolean[]>([false, false, false]);
  const items = [
    { id: 0, title: "How to cook pasta perfectly", source: "Real recipe site", sponsored: false },
    { id: 1, title: "The kitchen gadget that changed my life", source: "Sponsored", sponsored: true },
    { id: 2, title: "Why our city's pizza is underrated", source: "Local blog", sponsored: false },
  ];
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Disguised Ad"
      caption="Three article cards styled identically. One is a sponsored post. Tap each to reveal the source."
      hint="Try to guess which is the ad before revealing."
    >
      <div className="space-y-4">
        <div className="space-y-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setRevealed((r) => { const n = [...r]; n[item.id] = true; return n; })}
              className="bg-muted/40 hover:bg-muted/60 w-full rounded-md border p-3 text-left text-xs"
            >
              <div className="text-sm font-medium">{item.title}</div>
              <div className="text-muted-foreground text-[10px]">
                {revealed[item.id] ? (
                  <span className={item.sponsored ? "text-amber-700 dark:text-amber-300 font-semibold" : ""}>
                    {item.source} {item.sponsored && "— paid placement"}
                  </span>
                ) : (
                  "Tap to reveal source"
                )}
              </div>
            </button>
          ))}
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          The sponsored card is visually identical to the organic ones. There's no disclosure until you tap.
        </div>
      </div>
    </DemoShell>
  );
}

