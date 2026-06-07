"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Friend Spam pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function FriendSpamDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Address-book import is followed by a "share with 30 contacts" CTA.
  const [imported, setImported] = React.useState(false);
  const [shared, setShared] = React.useState(false);
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Friend Spam"
      caption="Address book import is positioned as 'finding your friends on the app', but the next step is a pre-checked 'invite your contacts' form."
      hint="Walk through the two-step. The invite form is pre-checked."
    >
      <div className="space-y-4">
        <button
          disabled={imported}
          onClick={() => setImported(true)}
          className="bg-foreground text-background w-full rounded-md px-3 py-2 text-xs font-medium disabled:opacity-30"
        >
          {imported ? "Contacts imported" : "Find friends (import contacts)"}
        </button>

        {imported && (
          <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
            <div className="text-base font-medium">Invite your contacts</div>
            <p className="text-muted-foreground text-[10px]">30 contacts found. The default is to send an invite to ALL of them.</p>
            <label className="flex items-center gap-2 text-[10px]">
              <input type="checkbox" defaultChecked />
              <span>Send invite to all 30 contacts (pre-checked)</span>
            </label>
            <button
              onClick={() => setShared(true)}
              className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium"
            >
              Confirm
            </button>
          </div>
        )}

        {shared && (
          <div className="bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300 rounded-md border px-3 py-2 text-[10px]">
            30 invites sent from your account. Your contacts will see this as spam.
          </div>
        )}
      </div>
    </DemoShell>
  );
}

