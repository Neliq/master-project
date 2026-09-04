"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, Bell, CheckCircle2, Mail } from "lucide-react";

/*
 * Information Without Context — Condition 1: Structural Orphaned Nodes
 *
 * Thesis: a metric node N_metric (e.g. a badge displaying just "1") must
 * logically correspond to a descriptor node N_descriptor (e.g. "New
 * Messages"). The feature triggers if the metric is structurally orphaned —
 * the DOM/physical distance d(N_metric, N_descriptor) strictly exceeds the
 * cognitive association threshold τ_orphan, forcing the user to interact out
 * of uninformed exploratory compulsion:
 *
 *   d(N_metric, N_descriptor) > τ_orphan
 *
 * Variant A (dark): a bare red "1" badge floats on the inbox icon with no
 * descriptor anywhere in association range — you click to find out what it
 * means.
 * Variant B (benign): the badge sits adjacent to its descriptor "New
 * messages", so the metric is self-explanatory.
 */

const ORPHAN_THRESHOLD = 80; // τ_orphan, px
const DISTANCE_DARK = 112; // px between the badge and the separate inbox descriptor in A

export function InformationWithoutContextCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [clicked, setClicked] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Information Without Context: Structural Orphaned Nodes"
      caption="Structural Orphaned Nodes — the badge “1” floats on the inbox icon with no descriptor in cognitive association range, so the only way to learn its meaning is to click."
      deltaNote="In Variant A the metric node is orphaned: d(N_metric, N_descriptor) ≈ 260px far exceeds τ_orphan (80px), because the descriptor “New Messages” lives outside the badge&rsquo;s perceptual cluster — the click is pure uninformed compulsion. In Variant B the descriptor sits directly beside the badge, so d < τ_orphan and the number explains itself."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between rounded-md bg-background border border-border px-3 py-2.5">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                    <Mail className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  </div>
                  {/* N_metric adjacent to its descriptor — d < τ_orphan */}
                  <span className="absolute -top-1 -right-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-green-500 px-1 text-[8px] font-bold text-white">
                    1
                  </span>
                </div>
                <div className="text-[10px] font-medium">
                  New messages{" "}
                  <span className="text-muted-foreground font-normal">(descriptor present)</span>
                </div>
              </div>
              <button
                onClick={() => setClicked(true)}
                className="rounded-md bg-green-600 hover:bg-green-700 text-white px-2.5 py-1 text-[9px] font-medium transition-colors cursor-pointer"
              >
                Open inbox
              </button>
            </div>
          </div>

          {clicked && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <CheckCircle2 className="w-3 h-3" />
                1 new message — as advertised
              </div>
              <p className="text-muted-foreground mt-0.5">
                The badge and its descriptor sit side by side, so d(N_metric, N_descriptor) stays
                under τ_orphan: you knew what the “1” meant before you ever clicked.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between rounded-md bg-background border border-border px-3 py-2.5">
            <div className="relative flex h-7 w-7 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
              <Bell className="h-3.5 w-3.5 text-red-600 dark:text-red-400" aria-hidden="true" />
              {/* N_metric: the count is visible, but its meaning is not nearby. */}
              <span className="absolute -top-1 -right-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-red-500 px-1 text-[8px] font-bold text-white">
                1
              </span>
            </div>
            <button
              onClick={() => setClicked(true)}
              className="rounded-md bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 text-[9px] font-medium transition-colors cursor-pointer"
            >
              Open inbox
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[8px] text-muted-foreground">
            <div className="rounded-md border border-border bg-background px-2 py-2">Order history</div>
            <div className="rounded-md border border-border bg-background px-2 py-2">Saved items</div>
          </div>
          <div className="mt-6 rounded-md border border-dashed border-border/60 bg-background px-3 py-2 text-[9px] text-muted-foreground">
            <div className="font-medium text-foreground/80">New messages</div>
            <div className="mt-0.5">Open the inbox to review your latest account activity.</div>
          </div>
        </div>

        {mode === "auditor" && clicked && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <AlertTriangle className="w-3 h-3" />
              Notification details
            </div>
            <p className="text-muted-foreground">
              The badge showed a bare <strong className="text-foreground">“1”</strong> — no
              descriptor within reach, so you clicked on pure exploratory compulsion. Only after
              the click does the system reveal it meant{" "}
              <strong className="text-red-500">“1 unread message.”</strong>
            </p>
            <p className="text-muted-foreground">
              d(N_metric, N_descriptor) = {DISTANCE_DARK}px &gt; τ_orphan ({ORPHAN_THRESHOLD}px):
              the metric is structurally orphaned from its meaning, denying you the data needed to
              evaluate the alert before acting.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
