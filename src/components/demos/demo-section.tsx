"use client";

/**
 * DemoSection — client wrapper that mounts a pattern's interactive demo
 * with a view-mode toggle (user / auditor) and restart handling.
 *
 * The demo itself is mounted under a `key` derived from a restart counter;
 * flipping the key re-creates the demo subtree and wipes its internal
 * state, which is the simplest way to implement "Restart presentation"
 * for 62 different demos that each manage their own state.
 *
 * The toggle and the demo are rendered side-by-side in user mode and
 * stacked in auditor mode. The auditor-mode chrome (annotations, controls,
 * stats) is added by DemoShell itself.
 */

import * as React from "react";

import { getDemo } from "@/components/pattern-demo";
import { ViewModeToggle } from "@/components/demos/view-mode-toggle";
import { AUDITOR_ANNOTATIONS } from "@/lib/auditor-annotations";
import { cn } from "@/lib/utils";
import type { ViewMode } from "@/components/demos/demo-shell";

export function DemoSection({ slug }: { slug: string }) {
  const [mode, setMode] = React.useState<ViewMode>("user");
  const [restartKey, setRestartKey] = React.useState(0);

  const Demo = getDemo(slug);

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-3 rounded-md border px-3 py-2",
          mode === "auditor"
            ? "border-amber-500/40 bg-amber-500/5"
            : "border-foreground/10 bg-muted/20"
        )}
      >
        <p className="text-muted-foreground max-w-2xl text-xs leading-relaxed">
          <strong className="text-foreground">User view</strong> shows
          exactly what a real visitor would see on the site.{" "}
          <strong className="text-amber-700 dark:text-amber-300">
            Auditor view
          </strong>{" "}
          adds annotations, presentation controls (skip / restart), and live
          statistics — all of which are visually separated from the dark
          pattern itself.
        </p>
        <ViewModeToggle mode={mode} onChange={setMode} />
      </div>
      {Demo ? (
        <Demo
          key={restartKey}
          mode={mode}
          annotations={mode === "auditor" ? AUDITOR_ANNOTATIONS[slug] : []}
          onRestart={() => setRestartKey((k) => k + 1)}
        />
      ) : null}
    </div>
  );
}
