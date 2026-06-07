"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Customisation (Interface Nesting) pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function CustomisationDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // A customiser where save button requires 4 "I accept" checkboxes
  // that look already-checked but aren't (low contrast, almost transparent).
  const [boxes, setBoxes] = React.useState({ analytics: false, partner: false, marketing: false, location: false });
  const allChecked = Object.values(boxes).every(Boolean);
  const [saved, setSaved] = React.useState(false);

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Customisation (Interface Nesting)"
      caption="The customiser has 4 'I consent to…' checkboxes that look almost identical to the styled UI. The 'Save' button is greyed out until all 4 are checked, but the checked state has very low contrast."
      hint="The checkboxes are intentionally hard to spot. Hover them to find them."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="text-base font-medium">Save your preferences</div>
          <p className="text-muted-foreground text-[10px]">Check all four to enable the save button.</p>
          <div className="space-y-1">
            {(["analytics", "partner", "marketing", "location"] as const).map((k) => (
              <label
                key={k}
                className="bg-muted/20 hover:bg-muted/40 flex items-center gap-2 rounded border border-dashed px-2 py-1.5 text-[10px]"
              >
                <input
                  type="checkbox"
                  checked={boxes[k]}
                  onChange={(e) => setBoxes((b) => ({ ...b, [k]: e.target.checked }))}
                  className="size-3"
                />
                <span className="text-muted-foreground">I consent to {k} data processing</span>
              </label>
            ))}
          </div>
        </div>

        <button
          disabled={!allChecked || saved}
          onClick={() => setSaved(true)}
          className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium disabled:opacity-30"
        >
          {saved ? "Preferences saved" : "Save preferences"}
        </button>

        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          {allChecked ? "All 4 consents given. Your data is now shared with 3rd parties." : `${4 - Object.values(boxes).filter(Boolean).length} of 4 consents still required.`}
        </div>
      </div>
    </DemoShell>
  );
}

