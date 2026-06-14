"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function PressuredSellingCond2({
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
      title="Pressured Selling: High-Arousal Lexical Density"
      caption="High-Arousal Lexical Density — price inflates step-by-step as fees are injected." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-2 font-medium">High-Arousal Lexical Density</div>
          <div className="rounded-md border p-2 text-center mb-2">
            <div className="text-lg font-bold">$9.99</div>
            <div className="text-muted-foreground text-[9px]">Base price</div>
          </div>
          {step > 0 && <div className="text-[10px] text-amber-600">+ $3.50 service fee</div>}
          {step > 1 && <div className="text-[10px] text-amber-600">+ $1.99 processing fee</div>}
          {step > 2 && <div className="text-[10px] text-amber-600">+ $2.00 convenience fee</div>}
        </div>
        {step < 3 ? (
          <button onClick={() => setStep(s => s + 1)} className="bg-slate-600 hover:bg-slate-700 text-white w-full rounded-md py-2 text-xs font-medium">
            Reveal next fee
          </button>
        ) : (
          <div className="rounded-md border border-dashed p-2 text-center text-[10px] text-muted-foreground">
            Total: ${(9.99 + 3.50 + 1.99 + 2.00).toFixed(2)}
          </div>
        )}
      </div>
    </DemoShell>
  );
}
