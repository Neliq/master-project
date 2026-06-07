"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Forced Registration pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function ForcedRegistrationDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // A free download is gated behind full signup including phone.
  const [stage, setStage] = React.useState<"download" | "email" | "phone" | "done">("download");
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Forced Registration"
      caption="A 'free download' is gated behind account creation, which in turn requires a phone number. There is no skip button. The walkthrough shows the funnel."
      hint="Walk through the funnel. Notice no 'skip' option."
    >
      <div className="space-y-4">
        {(["download", "email", "phone", "done"] as const).map((s, i) => (
          <div
            key={s}
            className={`rounded-md border px-3 py-2 text-xs ${
              s === stage ? "border-foreground/30 bg-foreground text-background" : "border-foreground/10 bg-muted/30 text-muted-foreground"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium capitalize">{i + 1}. {s}</span>
              <span className="text-[10px]">{s === stage ? "Current" : s === "done" ? "—" : "Locked"}</span>
            </div>
          </div>
        ))}

        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          {stage === "download" && (
            <p className="text-[10px]">To download the free PDF, please create a free account.</p>
          )}
          {stage === "email" && (
            <input
              placeholder="you@example.com"
              className="bg-background w-full rounded-md border px-2 py-1.5 text-xs"
            />
          )}
          {stage === "phone" && (
            <div>
              <p className="text-amber-700 dark:text-amber-300 mb-1 text-[10px]">Phone number (required, no skip)</p>
              <input
                placeholder="+31 6 1234 5678"
                className="bg-background w-full rounded-md border px-2 py-1.5 text-xs"
              />
            </div>
          )}
          {stage === "done" && (
            <p className="text-[10px]">Account created. Your data is now on a marketing list.</p>
          )}

          <button
            disabled={stage === "done"}
            onClick={() => {
              if (stage === "download") setStage("email");
              else if (stage === "email") setStage("phone");
              else if (stage === "phone") setStage("done");
            }}
            className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium disabled:opacity-30"
          >
            {stage === "done" ? "Done" : "Next"}
          </button>
        </div>
      </div>
    </DemoShell>
  );
}

