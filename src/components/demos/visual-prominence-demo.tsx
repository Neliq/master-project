"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Visual Prominence pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function VisualProminenceDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Five plans; the "premium" plan is 5x the surface area. Hover
  // each to see the surface area calculation.
  const [hover, setHover] = React.useState<string | null>(null);
  const plans = [
    { id: "basic", name: "Basic", w: 60, h: 60, price: 9.99 },
    { id: "plus", name: "Plus", w: 90, h: 90, price: 9.99 },
    { id: "premium", name: "Premium", w: 200, h: 200, price: 9.99 },
    { id: "pro", name: "Pro", w: 80, h: 80, price: 9.99 },
    { id: "team", name: "Team", w: 75, h: 75, price: 9.99 },
  ];
  const premium = plans.find((p) => p.id === "premium")!;
  const others = plans.filter((p) => p.id !== "premium");
  const othersAvg = others.reduce((s, p) => s + p.w * p.h, 0) / others.length;
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Visual Prominence"
      caption="All five plans are $9.99. The 'premium' plan is rendered 5× the surface area of the others. Surface area is a measurable nudge."
      hint="Hover each card. Compare the surface area (w×h) numbers."
    >
      <div className="space-y-4">
        <div className="flex items-end justify-center gap-2">
          {plans.map((p) => (
            <button
              key={p.id}
              onMouseEnter={() => setHover(p.id)}
              onMouseLeave={() => setHover(null)}
              style={{ width: p.w, height: p.h }}
              className={`rounded-md border px-1 text-[9px] font-medium transition-all ${
                p.id === "premium"
                  ? "border-amber-500 bg-foreground text-background"
                  : "border-foreground/10 bg-muted/30 text-muted-foreground"
              }`}
            >
              <div className="leading-none">{p.name}</div>
              <div className="font-mono">${p.price}</div>
            </button>
          ))}
        </div>
        {hover && (
          <div className="bg-foreground/5 rounded-md border px-3 py-2 text-[10px]">
            <div className="text-muted-foreground">Surface area</div>
            <div className="font-mono">
              {plans.find((p) => p.id === hover)?.name}: {(plans.find((p) => p.id === hover)!.w * plans.find((p) => p.id === hover)!.h).toLocaleString()} px²
            </div>
          </div>
        )}
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          Premium: {(premium.w * premium.h).toLocaleString()} px² — others avg: {othersAvg.toFixed(0)} px² ({(premium.w * premium.h / othersAvg).toFixed(1)}× larger)
        </div>
      </div>
    </DemoShell>
  );
}

