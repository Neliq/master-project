"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function ComplexLanguageCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [sent, setSent] = React.useState(false);
  const reset = () => setSent(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Messages sent without consent</span>
        <span className="font-mono font-semibold">{sent ? "47" : "0"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Complex Language: Syntactic Bloat and Clause Chaining"
      caption="Syntactic Bloat and Clause Chaining — messages appear to come from the user without consent." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-1 font-medium">Syntactic Bloat and Clause Chaining</div>
          <p className="text-muted-foreground text-[10px]">Find friends already on the platform.</p>
          <button onClick={() => setSent(true)} className="bg-foreground text-background mt-2 w-full rounded-md py-2 text-[10px] font-medium">
            {sent ? "Invites sent" : "Send invites"}
          </button>
        </div>
        {sent && (
          <div className="rounded-md border border-pink-500/30 bg-pink-500/5 p-3 text-[10px]">
            <div className="font-medium text-pink-700 dark:text-pink-300">47 invites sent as you!</div>
            <div className="text-muted-foreground mt-1">Messages appear to come from YOUR account.</div>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
