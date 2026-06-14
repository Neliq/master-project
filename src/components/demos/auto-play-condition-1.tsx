"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function AutoPlayCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [items, setItems] = React.useState([
    {label: "Analytics", checked: true}, {label: "Marketing", checked: true},
    {label: "Third-party sharing", checked: true}, {label: "Essential only", checked: true},
  ]);
  const reset = () => setItems([
    {label: "Analytics", checked: true}, {label: "Marketing", checked: true},
    {label: "Third-party sharing", checked: true}, {label: "Essential only", checked: true},
  ]);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Pre-checked (favorable)</span>
        <span className="font-mono font-semibold">3 of 4</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Auto-Play: Autonomous Media Execution"
      caption="Autonomous Media Execution — privacy-sensitive options pre-checked, exploiting inertia." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-2 font-medium">Autonomous Media Execution — Preferences</div>
          <div className="space-y-2">
            {items.map((item, i) => (
              <label key={i} className="flex items-center justify-between border-t py-2">
                <span className="text-[11px]">{item.label}</span>
                <span className={`text-[10px] font-medium ${item.checked ? "text-teal-700 dark:text-teal-300" : "text-muted-foreground"}`}>
                  {item.checked ? "ON" : "OFF"}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
