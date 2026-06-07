"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Plain Evil (Theoretical Construct) pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function PlainEvilDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // The theoretical "Plain Evil" pattern is a predicate over the
  // absence of all mitigations. The demo shows the formal check.
  const mitigations = { consent: false, clarity: false, reversibility: false, alignment: false };
  const count = Object.values(mitigations).filter(Boolean).length;
  const isPlainEvil = count === 0;
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Plain Evil (Theoretical Construct)"
      caption="Plain Evil is the formal limit case of a dark pattern with zero mitigations applied. Toggle each mitigation to remove the predicate."
      hint="Toggle each of the four mitigations. The Plain Evil predicate inverts when any mitigation is present."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="text-muted-foreground text-[10px]">Mitigations present</div>
          <div className="font-mono text-3xl font-semibold tabular-nums">{count} / 4</div>
          <div className="space-y-1">
            {Object.keys(mitigations).map((k) => (
              <label key={k} className="flex items-center gap-2 text-[10px]">
                <input
                  type="checkbox"
                  checked={mitigations[k as keyof typeof mitigations]}
                  onChange={(e) => mitigations[k as keyof typeof mitigations] = e.target.checked}
                />
                <code className="bg-muted/40 rounded px-1.5 py-0.5">{k}</code>
              </label>
            ))}
          </div>
        </div>
        <div className={`rounded-md border px-3 py-2 text-[10px] ${
          isPlainEvil
            ? "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300"
            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        }`}>
          <code className="font-mono">PlainEvil(p) ≡ |M| = 0</code> — currently <span className="font-semibold">{isPlainEvil ? "true" : "false"}</span>
        </div>
      </div>
    </DemoShell>
  );
}

