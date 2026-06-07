"use client";

/**
 * ViewModeToggle — small switch between "User view" and "Auditor view".
 *
 * Used by the DemoSection wrapper. In auditor mode the dark pattern
 * simulation is augmented with annotations, presentation controls, and
 * live statistics.
 */

import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ViewMode } from "./demo-shell";

export function ViewModeToggle({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (m: ViewMode) => void;
}) {
  return (
    <div
      role="group"
      aria-label="View mode"
      className="inline-flex items-center gap-0.5 rounded-md border bg-muted/30 p-0.5 text-xs"
    >
      <button
        type="button"
        onClick={() => onChange("user")}
        aria-pressed={mode === "user"}
        className={cn(
          "flex items-center gap-1.5 rounded-sm px-2.5 py-1 font-medium transition-colors",
          mode === "user"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <EyeOff className="size-3" />
        User view
      </button>
      <button
        type="button"
        onClick={() => onChange("auditor")}
        aria-pressed={mode === "auditor"}
        className={cn(
          "flex items-center gap-1.5 rounded-sm px-2.5 py-1 font-medium transition-colors",
          mode === "auditor"
            ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Eye className="size-3" />
        Auditor view
      </button>
    </div>
  );
}
