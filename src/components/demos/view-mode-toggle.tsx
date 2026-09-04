"use client";

/**
 * ViewModeToggle — small switch between "User view" and "Auditor view".
 *
 * Used by the DemoSection wrapper. In auditor mode the dark pattern
 * simulation is augmented with annotations and presentation controls.
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
      className="inline-flex items-center gap-0 border border-[#0000f2]/40 bg-white p-0 text-xs"
    >
      <button
        type="button"
        onClick={() => onChange("user")}
        aria-pressed={mode === "user"}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 font-semibold transition-colors",
          mode === "user"
            ? "bg-[#0000f2] text-white"
            : "text-[#0000f2]/65 hover:bg-[#0000f2]/10 hover:text-[#0000f2]"
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
          "flex items-center gap-1.5 px-3 py-1.5 font-semibold transition-colors",
          mode === "auditor"
            ? "bg-[#0000f2] text-white"
            : "text-[#0000f2]/65 hover:bg-[#0000f2]/10 hover:text-[#0000f2]"
        )}
      >
        <Eye className="size-3" />
        Auditor view
      </button>
    </div>
  );
}
