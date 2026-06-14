"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function InformationWithoutContextCond1({
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
      title="Information Without Context: Unanchored Quantitative Metrics"
      caption="Unanchored Quantitative Metrics — price inflates step-by-step as fees are injected." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-2 font-medium">Unanchored Quantitative Metrics</div>
          <div className="flex items-end gap-1 h-16 mb-2">
            {fees.map((f, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="bg-amber-500 w-full rounded-t-sm" style={{height: (f.amount / total * 60) + "px"}} />
                <div className="text-[7px] mt-0.5">${f.amount}</div>
              </div>
            ))}
          </div>
          <div className="text-center text-[10px] font-medium">Total: ${total.toFixed(2)}</div>
        </div>
        {step < fees.length - 1 ? (
          <button onClick={() => setStep(s => s + 1)} className="bg-amber-500 hover:bg-amber-600 text-white w-full rounded-md py-2 text-xs font-medium">Continue</button>
        ) : (
          <div className="rounded-md border border-dashed p-2 text-center text-[10px] text-muted-foreground">
            ${(total - 9.99).toFixed(2)} in hidden fees
          </div>
        )}
      </div>
    </DemoShell>
  );
}
