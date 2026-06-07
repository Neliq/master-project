"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Drip Pricing, Hidden Costs, or Partitioned Pricing pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function DripPricingDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Each checkout step adds a fee.
  const stages = ["Product", "Shipping", "Service fee", "Tax", "Checkout"];
  const fees = [0, 4.99, 3.99, 2.50, 0];
  const base = 49.99;
  const total = base + fees.slice(0, stages.indexOf("Checkout") + 1).reduce((s, f) => s + f, 0);
  const [step, setStep] = React.useState(0);
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Drip Pricing"
      caption="The base price is $49.99. As the user advances through checkout, fees appear one at a time — $4.99 shipping, $3.99 service fee, $2.50 tax — so each addition feels small relative to the running total."
      hint="Walk through the steps and watch the total."
    >
      <div className="space-y-4">
        <div className="bg-muted/40 flex flex-wrap items-center gap-1 text-[10px]">
          {stages.map((s, i) => (
            <React.Fragment key={i}>
              <span
                className={`rounded px-2 py-0.5 ${
                  i === step
                    ? "bg-foreground text-background"
                    : i < step
                    ? "bg-foreground/20 text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {s}
              </span>
              {i < stages.length - 1 && <span className="text-muted-foreground">→</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="bg-foreground/5 space-y-1 rounded-md border p-3 text-xs">
          <div className="flex justify-between"><span>Base price</span><span className="font-mono">$49.99</span></div>
          {fees.slice(1, step + 1).map((f, i) => (
            <div key={i} className="text-amber-700 dark:text-amber-300 flex justify-between text-[10px]">
              <span>{stages[i + 1]}</span>
              <span className="font-mono">+${f.toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-1 flex justify-between border-t pt-1 text-base font-semibold">
            <span>Total</span><span className="font-mono tabular-nums">${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex gap-2 text-xs">
          <button
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="bg-muted/60 text-foreground rounded-md border px-3 py-1.5 font-medium disabled:opacity-30"
          >
            Back
          </button>
          <button
            disabled={step === stages.length - 1}
            onClick={() => setStep((s) => Math.min(stages.length - 1, s + 1))}
            className="bg-foreground text-background rounded-md px-3 py-1.5 font-medium disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>
    </DemoShell>
  );
}

