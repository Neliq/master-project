"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Trick Questions pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function TrickQuestionsDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Three double-negatives, each pre-checked. Toggle each and watch
  // the live state string change.
  const [opts, setOpts] = React.useState({ a: true, b: true, c: true });
  const labels: { id: keyof typeof opts; text: string; inState: string }[] = [
    { id: "a", text: "Uncheck the box to OPT OUT of receiving marketing emails", inState: "marketing: " },
    { id: "b", text: "Leave UNCHECKED if you DO NOT want to share data with partners", inState: "partners: " },
    { id: "c", text: "Uncheck to NOT receive our weekly newsletter", inState: "newsletter: " },
  ];
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Trick Questions"
      caption="Each of the three options is phrased as a double negative. The user has to parse 'uncheck to opt out' carefully — most users skim and leave the boxes checked (opted in)."
      hint="Read each label carefully. Toggle each box and watch the state below."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="text-base font-medium">Email preferences</div>
          {labels.map((l) => (
            <label key={l.id} className="bg-muted/40 flex items-center gap-2 rounded border px-2 py-2 text-[10px]">
              <input
                type="checkbox"
                checked={opts[l.id]}
                onChange={(e) => setOpts((o) => ({ ...o, [l.id]: e.target.checked }))}
              />
              <span className="leading-snug">{l.text}</span>
            </label>
          ))}
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 space-y-1 rounded-md border p-3 text-[10px]">
          <div className="text-amber-700 dark:text-amber-300 font-medium">Live state</div>
          {labels.map((l) => (
            <div key={l.id} className="font-mono">
              {l.inState}{opts[l.id] ? "subscribed" : "opted out"}
            </div>
          ))}
        </div>
      </div>
    </DemoShell>
  );
}

