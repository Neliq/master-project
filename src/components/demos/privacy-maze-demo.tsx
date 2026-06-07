"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Privacy Maze pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function PrivacyMazeDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // A long, deeply-nested settings tree.
  // Count clicks to "Delete my data" vs the "easy way" claim.
  const [depth, setDepth] = React.useState(0);
  const [claimedEasy, setClaimedEasy] = React.useState(true);
  const path = ["Settings", "Account", "Privacy & data", "Manage my data", "Delete my data", "Type DELETE to confirm"];
  const current = path[Math.min(depth, path.length - 1)];

  const isAuditor = mode === "auditor";
  const reset = () => {
    setDepth(0);
    setClaimedEasy(true);
  };

  const auditorControls = isAuditor ? (
    <>
      <button
        onClick={() => setDepth(0)}
        className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        Restart path
      </button>
      <button
        onClick={() => setClaimedEasy((e) => !e)}
        className="bg-purple-500/80 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        Toggle marketing claim
      </button>
    </>
  ) : null;

  const auditorStats = isAuditor ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Path depth</span>
        <span className="font-mono font-semibold tabular-nums">
          {depth} / {path.length - 1}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Marketing claim</span>
        <span className="font-mono font-semibold tabular-nums">
          {claimedEasy ? '"1 click delete"' : '"manage your data"'}
        </span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset} auditorControls={auditorControls} auditorStats={auditorStats} title="Privacy Maze"
      caption="The homepage advertises 'Delete your data in 1 click!', but the actual path is 6 nested menus. Each sub-menu resets the user's progress if they accidentally hit Back."
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-1 text-[10px]">
          {path.map((p, i) => (
            <React.Fragment key={i}>
              <span
                className={
                  i < depth
                    ? "bg-foreground/20 rounded px-1.5 py-0.5"
                    : i === depth
                    ? "bg-foreground text-background rounded px-1.5 py-0.5"
                    : "text-muted-foreground/50"
                }
              >
                {p}
              </span>
              {i < path.length - 1 && <span className="text-muted-foreground">›</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="text-base font-medium">{current}</div>
          <p className="text-muted-foreground text-[10px]">
            {current === "Delete my data"
              ? "Type DELETE to confirm. You will receive a confirmation email within 30 days. Within those 30 days, logging in cancels the deletion."
              : "This screen is required to comply with our policy."}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setDepth((d) => Math.min(d + 1, path.length - 1))}
              className="bg-foreground text-background rounded-md px-3 py-1.5 text-xs font-medium"
            >
              Next
            </button>
            <button
              onClick={() => setClaimedEasy((e) => !e)}
              className="bg-amber-500 text-white rounded-md px-3 py-1.5 text-xs font-medium"
            >
              Easy way: {claimedEasy ? "1 click" : "?"}
            </button>
          </div>
        </div>

        {depth === path.length - 1 && claimedEasy && (
          <div className="bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300 rounded-md border px-3 py-2 text-[10px]">
            You took {path.length} clicks. The home page still claims "1-click delete".
          </div>
        )}
      </div>
    </DemoShell>
  );
}
