"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the False Hierarchy pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function FalseHierarchyDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // The "default" button is huge, the "advanced" link is tiny.
  const [chosen, setChosen] = React.useState<"default" | "advanced" | null>(null);

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="False Hierarchy"
      caption="One action is presented with a giant CTA; the alternative is a small greyed text link. Both lead to the same outcome but the 'default' routes through a 5-step setup wizard."
      hint="Compare the button size of the two options."
    >
      <div className="space-y-4">
        <div className="space-y-3">
          <button
            onClick={() => setChosen("default")}
            className={`flex w-full items-center justify-between rounded-md px-6 py-6 text-base font-semibold transition-colors ${
              chosen === "default" ? "bg-foreground text-background" : "bg-foreground/90 text-background hover:bg-foreground"
            }`}
          >
            <span>Use recommended settings</span>
            <span className="text-[10px] opacity-80">Recommended</span>
          </button>
          <div className="text-right text-[10px]">
            <button
              onClick={() => setChosen("advanced")}
              className={`underline ${
                chosen === "advanced" ? "text-foreground font-semibold" : "text-muted-foreground/60 hover:text-muted-foreground"
              }`}
            >
              Configure manually
            </button>
          </div>
        </div>

        {chosen && (
          <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
            {chosen === "default"
              ? "You were sent through a 5-step wizard. The advanced link would have skipped all of them."
              : "You skipped 5 steps. The default button has the same final result."}
          </div>
        )}
      </div>
    </DemoShell>
  );
}

