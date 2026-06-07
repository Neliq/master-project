"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Hidden Information pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function HiddenInformationDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Settings rows with disclosure arrows that show details on click.
  const [open, setOpen] = React.useState<Record<string, boolean>>({});
  const rows = [
    { id: "renewal", label: "Auto-renewal", detail: "Subscription auto-renews at $14.99/mo." },
    { id: "share", label: "Data sharing", detail: "Account info shared with 12 ad partners." },
    { id: "fee", label: "Cancellation fee", detail: "$9.99 fee applies for cancellations within 30 days." },
    { id: "limit", label: "Account limits", detail: "Max 3 devices, max 5 users, max 100 GB." },
  ];
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Hidden Information"
      caption="Important disclosures are hidden behind small disclosure arrows. Users who don't click each row miss the auto-renewal, data sharing, and fee details."
      hint="Click each row to expand. Note which one is most consequential."
    >
      <div className="space-y-4">
        <div className="space-y-1">
          {rows.map((r) => (
            <button
              key={r.id}
              onClick={() => setOpen((o) => ({ ...o, [r.id]: !o[r.id] }))}
              className="bg-muted/40 hover:bg-muted/60 w-full rounded-md border px-3 py-2 text-left text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{r.label}</span>
                <span className="text-muted-foreground text-[10px]">{open[r.id] ? "▼" : "▶"}</span>
              </div>
              {open[r.id] && (
                <div className="text-amber-700 dark:text-amber-300 mt-1 text-[10px]">{r.detail}</div>
              )}
            </button>
          ))}
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          Disclosed: {Object.values(open).filter(Boolean).length} / {rows.length}
        </div>
      </div>
    </DemoShell>
  );
}

