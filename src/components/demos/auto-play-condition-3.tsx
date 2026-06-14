"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function AutoPlayCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [path, setPath] = React.useState(["Home"]);
  const reset = () => setPath(["Home"]);
  const menus: Record<string, string[]> = {"Home": ["Settings","Profile","Help"], "Settings": ["Account","Privacy"], "Account": ["Delete account"], "Privacy": ["Cookies","Data sharing"], "Profile": ["Edit","Avatar"]};
  const current = path[path.length - 1];
  const options = menus[current] || [];

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Navigation depth</span>
        <span className="font-mono font-semibold">{path.length} levels</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Auto-Play: Affordance Suppression"
      caption="Affordance Suppression — navigating to the target requires excessive depth." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="text-muted-foreground mb-2 text-[9px]">{path.join(" → ")}</div>
          <div className="mb-2 font-medium">{current}</div>
          {options.map(label => (
            <button key={label} onClick={() => setPath(p => [...p, label])}
              className="hover:bg-foreground/5 mb-1 w-full rounded-md border p-2 text-left text-[10px]">
              {">"} {label}
            </button>
          ))}
          {path.length > 3 && (
            <div className="text-muted-foreground mt-2 border-t pt-2 text-[9px]">
              {path.length} levels deep. Target not visible.
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
