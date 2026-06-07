"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Granting and Interaction pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function GrantingAndInteractionDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Sign in form grants notifications, location, contacts by default.
  const [perms, setPerms] = React.useState({ notifications: true, location: true, contacts: true });
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Granting and Interaction"
      caption="The 'sign in with email' form also grants notifications, location, and contacts by default. The user only wanted to sign in."
      hint="The 3 permissions are pre-checked. Try to sign in without granting them."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="text-base font-medium">Sign in with email</div>
          <input
            placeholder="you@example.com"
            className="bg-background w-full rounded-md border px-2 py-1.5 text-xs"
          />
          <div className="space-y-1">
            {([
              ["notifications", "Push notifications"],
              ["location", "Location access"],
              ["contacts", "Read your contacts"],
            ] as const).map(([k, label]) => (
              <label key={k} className="flex items-center gap-2 text-[10px]">
                <input
                  type="checkbox"
                  checked={perms[k]}
                  onChange={(e) => setPerms((p) => ({ ...p, [k]: e.target.checked }))}
                />
                {label}
              </label>
            ))}
          </div>
          <button className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium">
            Sign in
          </button>
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          Granted: {Object.values(perms).filter(Boolean).length} / 3 permissions — just to read an email.
        </div>
      </div>
    </DemoShell>
  );
}

