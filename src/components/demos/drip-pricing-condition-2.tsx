"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function DripPricingCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [step, setStep] = React.useState(0);
  const reset = () => setStep(0);
  const fees = [{label: "Base", amount: 9.99}, {label: "+ Service", amount: 3.50}, {label: "+ Processing", amount: 1.99}, {label: "+ Convenience", amount: 2.00}];
  const shown = fees.slice(0, step + 1);
  const total = shown.reduce((s, f) => s + f.amount, 0);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Base → final</span>
        <span className="font-mono font-semibold">$9.99 → ${total.toFixed(2)}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Drip Pricing, Hidden Costs, or Partitioned Pricing: Late-Stage Injection of Mandatory Fees"
      caption="Late-Stage Injection of Mandatory Fees — price inflates step-by-step as fees are injected." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-2 font-medium">Late-Stage Injection of Mandatory Fees — Checkout</div>
          {shown.map((f, i) => (
            <div key={i} className="flex items-center justify-between border-t border-dashed py-1.5">
              <span>{f.label}</span>
              <span className="font-mono tabular-nums">${f.amount.toFixed(2)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between border-t pt-1.5 font-medium">
            <span>Total</span>
            <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
          </div>
        </div>
        {step < fees.length - 1 ? (
          <button onClick={() => setStep(s => s + 1)} className="bg-red-500 hover:bg-red-600 text-white w-full rounded-md py-2 text-xs font-medium">
            Continue (more fees)
          </button>
        ) : (
          <div className="rounded-md border border-dashed p-2 text-center text-[10px] text-muted-foreground">
            Final price ${total.toFixed(2)} (${((total / 9.99 - 1) * 100).toFixed(0)}% higher than advertised)
          </div>
        )}
      </div>
    </DemoShell>
  );
}
