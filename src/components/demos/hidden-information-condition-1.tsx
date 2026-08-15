"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function HiddenInformationCond1({
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
        <span className="text-muted-foreground">Auto-renewal font size</span>
        <span className="font-mono font-semibold">5px (below WCAG min)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Contrast ratio</span>
        <span className="font-mono font-semibold">1.2:1 (invisible)</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Hidden Information: Typographical and Chromatic Camouflage"
      caption="Typographical and Chromatic Camouflage — auto-renewal terms hidden through extreme typographic camouflage." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">

          {/* Subscription card */}
          <div className="rounded-xl border-2 border-purple-500/40 bg-purple-500/5 p-5 text-center shadow-lg">
            <div className="text-xs font-bold uppercase tracking-wide text-purple-600 dark:text-purple-400">Pro Plan</div>
            <div className="mt-1 text-[10px] text-muted-foreground">Full access to all features</div>

            <div className="mt-3 text-4xl font-extrabold tracking-tight">$9.99<span className="text-sm font-normal">/mo</span></div>

            {/* Camouflaged auto-renewal terms — nearly invisible */}
            <p style={{ fontSize: "5px", opacity: 0.08, lineHeight: 1.6, letterSpacing: "0.02em" }}
               className="mt-2 text-foreground">
              Your subscription will automatically renew each month at $9.99
              unless cancelled at least 24 hours before the current billing
              period ends. By subscribing you agree to our Terms of Service
              and Privacy Policy. No refunds for partial billing periods.
            </p>

            <button className="mt-3 w-full rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white">
              Subscribe Now
            </button>
          </div>

          {/* Fake "cancel anytime" to make it feel safe */}
          <div className="mt-2 text-center text-[9px] text-muted-foreground/60">
            Cancel anytime · No commitment
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
