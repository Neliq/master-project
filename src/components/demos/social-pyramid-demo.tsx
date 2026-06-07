"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Social Pyramid pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function SocialPyramidDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // "Get matched with 5 friends" — pre-fills the invite form.
  const [invited, setInvited] = React.useState(0);
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Social Pyramid"
      caption="Onboarding offers 'get matched with 5 friends' as a perk. The form is pre-filled with 5 contact emails. The user is encouraged to spam their network for a small benefit."
      hint="Click 'Send invites' to send all 5."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="text-base font-medium">Get matched with friends</div>
          <p className="text-muted-foreground text-[10px]">Unlock 100 coins by inviting 5 friends.</p>
          <div className="space-y-1">
            {["alice@example.com", "bob@example.com", "carol@example.com", "dave@example.com", "eve@example.com"].map((email, i) => (
              <div key={i} className="bg-muted/40 flex items-center gap-2 rounded px-2 py-1 text-[10px]">
                <input type="checkbox" defaultChecked />
                <span className="font-mono">{email}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setInvited(5)}
            className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium"
          >
            Send invites
          </button>
        </div>
        {invited > 0 && (
          <div className="bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-md border px-3 py-2 text-[10px]">
            Sent {invited} invites. You earned 100 coins (≈ $0.10). Your friends got 5 emails.
          </div>
        )}
      </div>
    </DemoShell>
  );
}

