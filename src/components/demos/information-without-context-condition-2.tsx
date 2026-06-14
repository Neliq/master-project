"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function InformationWithoutContextCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const reset = () => {};

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Disclosure legibility</span>
        <span className="font-mono font-semibold">Below WCAG min</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Information Without Context: Temporal and Spatial Ambiguity of Claims"
      caption="Temporal and Spatial Ambiguity of Claims — critical info hidden through extreme typographic camouflage." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-1 font-medium">Temporal and Spatial Ambiguity of Claims</div>
          <p className="text-[11px]">Subscribe now. Cancel anytime.</p>
          <p className="mt-2 leading-relaxed" style={{fontSize: "6px", opacity: 0.2}}>
            By subscribing you agree to our Terms. Your subscription automatically
            renews unless cancelled 24 hours before period end. Non-refundable.
          </p>
          <button className="bg-foreground text-background mt-2 w-full rounded-md py-1.5 text-[10px] font-medium">
            Subscribe Now
          </button>
        </div>
      </div>
    </DemoShell>
  );
}
