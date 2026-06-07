"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Feedforward Ambiguity pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function FeedforwardAmbiguityDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // 3 documents, 1 click to agree to all. Show word count per doc.
  const docs = [
    { id: "tos", name: "Terms of service (TOS)", words: 4800, key: "Arbitration clause" },
    { id: "privacy", name: "Privacy policy", words: 3200, key: "Data retention" },
    { id: "community", name: "Community guidelines", words: 1900, key: "Content moderation" },
  ];
  const total = docs.reduce((s, d) => s + d.words, 0);
  const [agreed, setAgreed] = React.useState(false);
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Feedforward Ambiguity"
      caption="The 'I agree' button binds you to 3 documents totalling 9,900 words (~45 minutes of reading). There is no per-document opt-in. The 'key clause' is the part most users will miss."
      hint="Click 'I agree' to bind to all three. The 'key clause' is what most users will miss."
    >
      <div className="space-y-4">
        <div className="space-y-1">
          {docs.map((d) => (
            <div key={d.id} className="bg-muted/40 flex items-center justify-between rounded-md border px-3 py-2 text-xs">
              <div>
                <div className="font-medium">{d.name}</div>
                <div className="text-amber-700 dark:text-amber-300 text-[10px]">key clause: {d.key}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm tabular-nums">{d.words.toLocaleString()}</div>
                <div className="text-muted-foreground text-[10px]">words</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-foreground/5 flex items-center justify-between rounded-md border px-3 py-2 text-xs">
          <span className="text-muted-foreground">Total</span>
          <span className="font-mono text-2xl font-semibold tabular-nums">{total.toLocaleString()} words (~{Math.ceil(total / 220)} min)</span>
        </div>
        <button
          onClick={() => setAgreed(true)}
          className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium"
        >
          I agree
        </button>
        {agreed && (
          <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
            Bound to 3 documents. There was no per-document opt-in. The 'key clause' in each is the part most users will not have read.
          </div>
        )}
      </div>
    </DemoShell>
  );
}

