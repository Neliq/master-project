"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Encouraging Anti-Social Behavior pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function EncouragingAntiSocialBehaviorDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // "Public" default, "private" requires 3 extra clicks.
  const [visibility, setVisibility] = React.useState<"public" | "private">("public");
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Encouraging Anti-Social Behavior"
      caption="The default visibility for new posts is 'public'. To make a post private, the user must click through 3 menus. Most users never bother."
      hint="Toggle to private — note how many clicks it takes."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="text-muted-foreground text-[10px]">New post visibility</div>
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => setVisibility("public")}
              className={`flex-1 rounded-md border px-3 py-2 font-medium ${
                visibility === "public" ? "border-foreground/30 bg-foreground text-background" : "border-foreground/10 bg-muted/40 text-muted-foreground"
              }`}
            >
              🌍 Public (default)
            </button>
            <button
              onClick={() => setVisibility("private")}
              className={`flex-1 rounded-md border px-3 py-2 text-[10px] font-medium ${
                visibility === "private" ? "border-foreground/30 bg-foreground text-background" : "border-foreground/10 bg-muted/40 text-muted-foreground"
              }`}
            >
              🔒 Private (3 clicks)
            </button>
          </div>
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          {visibility === "public"
            ? "Your post is visible to the public index."
            : "Privacy achieved, but only because you took the trouble."}
        </div>
      </div>
    </DemoShell>
  );
}

