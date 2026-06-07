"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Address Book Leeching pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function AddressBookLeechingDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // 5 sub-options all enabled by default; the user can opt out one at a time.
  const [opts, setOpts] = React.useState({ sync: true, invite: true, share: true, analytics: true, retain: true });
  const labels: { id: keyof typeof opts; text: string }[] = [
    { id: "sync", text: "Sync my address book with the service" },
    { id: "invite", text: "Auto-send invites to non-members" },
    { id: "share", text: "Share contact info with ad partners" },
    { id: "analytics", text: "Share contact info with analytics vendors" },
    { id: "retain", text: "Retain my data after account deletion" },
  ];
  const enabled = Object.values(opts).filter(Boolean).length;
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Address Book Leeching"
      caption="The 'sync contacts' button also enables (a) auto-sending invites to non-users, (b) sharing contact info with ad partners, (c) sharing with analytics, and (d) retaining data after deletion. All five are pre-checked. The progress bar makes the scope visible."
      hint="Toggle each option. The '1 click' cost is misleading — there are 5 sub-options."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Sync contacts (on)</span>
            <span className="font-mono text-base">{enabled} / 5</span>
          </div>
          <div className="bg-muted/40 h-2 overflow-hidden rounded">
            <div
              className="bg-foreground h-full transition-all"
              style={{ width: `${(enabled / 5) * 100}%` }}
            />
          </div>
          <div className="space-y-1">
            {labels.map((l) => (
              <label key={l.id} className="flex items-center gap-2 text-[10px]">
                <input
                  type="checkbox"
                  checked={opts[l.id]}
                  onChange={(e) => setOpts((o) => ({ ...o, [l.id]: e.target.checked }))}
                />
                {l.text}
              </label>
            ))}
          </div>
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          {5 - enabled} of 5 sub-options still on. Note: there is no 'reject all' button.
        </div>
      </div>
    </DemoShell>
  );
}

