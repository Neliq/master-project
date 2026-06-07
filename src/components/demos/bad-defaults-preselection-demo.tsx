"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Bad Defaults / Preselection pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function BadDefaultsPreselectionDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // 5 consent checkboxes, all pre-checked.
  const [boxes, setBoxes] = React.useState({ a: true, b: true, c: true, d: true, e: true });
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Bad Defaults / Preselection"
      caption="All consent checkboxes are pre-checked. The 'continue' button at the bottom assumes the user has reviewed and approved the settings."
      hint="The form is pre-filled. Toggle each box to opt out individually."
    >
      <div className="space-y-4">
        <div className="space-y-1">
          {([
            ["a", "Marketing emails"],
            ["b", "Third-party data sharing"],
            ["c", "Personalised ads"],
            ["d", "Analytics"],
            ["e", "Newsletter"],
          ] as const).map(([k, label]) => (
            <label key={k} className="bg-muted/40 flex items-center gap-2 rounded-md border px-3 py-2 text-xs">
              <input
                type="checkbox"
                checked={boxes[k]}
                onChange={(e) => setBoxes((b) => ({ ...b, [k]: e.target.checked }))}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <button className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium">
          Continue
        </button>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          Active consents: {Object.values(boxes).filter(Boolean).length} / 5 (all pre-checked)
        </div>
      </div>
    </DemoShell>
  );
}

