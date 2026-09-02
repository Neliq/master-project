"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Reduced Friction — Condition 2: Visual Proximity of Destructive Actions to
 * Neutral UI
 *
 * Thesis: the algorithm measures the spatial separation
 * d_spatial(N_destructive, N_neutral) between a business-favorable destructive
 * action (e.g. one-click purchase, irreversible delete) and adjacent neutral
 * UI elements. The feature triggers if the destructive action sits within a
 * safety-margin radius τ_safety of routine controls, exploiting muscle memory
 * to induce accidental commitment:
 *
 *   min_{n ∈ N_neutral} d_spatial(N_destructive, n) < τ_safety
 *
 * Variant A (dark): "Delete account" is styled identically to "Save changes"
 * and placed directly beside it — the destructive action is inside the
 * muscle-memory radius, and clicking it deletes irreversibly with no
 * confirmation.
 * Variant B (benign): the destructive action is moved to a visually distinct
 * danger zone, far from the neutral controls, and gated behind a confirm step.
 */

export function ReducedFrictionCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Variant A
  const [aSaved, setASaved] = React.useState(false);
  const [aDeleted, setADeleted] = React.useState(false);
  // Variant B: idle → confirm → deleted
  const [bStep, setBStep] = React.useState<"idle" | "confirm" | "deleted">("idle");
  const [bSaved, setBSaved] = React.useState(false);

  const reset = () => {
    setASaved(false);
    setADeleted(false);
    setBStep("idle");
    setBSaved(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">d_spatial(delete, save) (A)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">8px &lt; τ_safety</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">d_spatial(delete, save) (B)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">64px &ge; τ_safety</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Visual weight (A)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">identical — muscle memory</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Confirmation node (B)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">present</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Reduced Friction: Visual Proximity of Destructive Actions to Neutral UI"
      userTitle="Harbor — Account settings"
      caption="Visual Proximity of Destructive Actions to Neutral UI — an irreversible action placed inside the safety-margin radius of routine controls invites accidental commitment."
      auditorStats={stats}
      deltaNote="In Variant A “Delete account” shares the styling and position of “Save changes” (d_spatial = 8px < τ_safety), so muscle memory can land on an irreversible delete. In Variant B the delete is moved into a separate danger zone with distinct styling and a confirm step."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Account settings</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">Manage your profile details.</p>

            <div className="mt-3 space-y-2">
              <div>
                <label htmlFor="reduced-friction-display-name-b" className="text-[9px] font-medium text-muted-foreground">Display name</label>
                <input
                  id="reduced-friction-display-name-b"
                  defaultValue="Alex Rivera"
                  className="mt-0.5 w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-green-500/40"
                />
              </div>
              <div>
                <label htmlFor="reduced-friction-email-b" className="text-[9px] font-medium text-muted-foreground">Email</label>
                <input
                  id="reduced-friction-email-b"
                  defaultValue="alex@example.com"
                  className="mt-0.5 w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-green-500/40"
                />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <button
                onClick={() => setBSaved(true)}
                className="rounded-md bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Save changes
              </button>
              {bSaved && (
                <span className="text-[9px] font-medium text-green-600 dark:text-green-400">
                  Saved ✓
                </span>
              )}
            </div>

            {/* Danger zone: separated, distinct styling, confirm step */}
            <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/5 p-3">
              <div className="text-[9px] font-semibold uppercase tracking-wider text-red-700 dark:text-red-300">
                Danger zone
              </div>
              <p className="text-[8px] text-muted-foreground mt-0.5">
                Deleting your account is irreversible. This action cannot be undone.
              </p>
              {bStep === "idle" && (
                <button
                  onClick={() => setBStep("confirm")}
                  className="mt-2 rounded-md border border-red-500/50 bg-background text-red-600 hover:bg-red-500/10 dark:text-red-400 px-3 py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  Delete account
                </button>
              )}
              {bStep === "confirm" && (
                <div className="mt-2 rounded-md border border-red-500/40 bg-background p-2.5">
                  <p className="text-[9px] text-foreground">
                    Are you sure? Your account and all data will be permanently erased. This cannot be undone.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => setBStep("deleted")}
                      className="flex-1 rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                    >
                      Confirm deletion
                    </button>
                    <button
                      onClick={() => setBStep("idle")}
                      className="flex-1 rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      Keep account
                    </button>
                  </div>
                </div>
              )}
              {bStep === "deleted" && (
                <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[9px] text-green-700 dark:text-green-300">
                  <strong>Delete executed only after explicit confirmation</strong> — the destructive action sat
                  64px away from the neutral controls, in a clearly marked danger zone.
                </div>
              )}
            </div>
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Account settings</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">Manage your profile details.</p>

          <div className="mt-3 space-y-2">
            <div>
              <label htmlFor="reduced-friction-display-name-a" className="text-[9px] font-medium text-muted-foreground">Display name</label>
              <input
                id="reduced-friction-display-name-a"
                defaultValue="Alex Rivera"
                className="mt-0.5 w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-red-500/40"
              />
            </div>
            <div>
              <label htmlFor="reduced-friction-email-a" className="text-[9px] font-medium text-muted-foreground">Email</label>
              <input
                id="reduced-friction-email-a"
                defaultValue="alex@example.com"
                className="mt-0.5 w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-red-500/40"
              />
            </div>
          </div>

          {aDeleted ? (
            <div className="mt-3 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Account deleted — irreversible
              </div>
              <p className="text-muted-foreground mt-0.5">
                The item was deleted immediately. You can restore it from Trash.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-3 flex items-center gap-1.5">
                {/* Neutral control and destructive action share styling and sit adjacent */}
                <button
                  onClick={() => setASaved(true)}
                  className="flex-1 rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  Save changes
                </button>
                <button
                  onClick={() => setADeleted(true)}
                  className="flex-1 rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  Delete account
                </button>
              </div>
              <p className="text-[8px] text-muted-foreground/50 mt-1.5 text-center">
                {aSaved
                  ? "Settings saved. Notice how “Delete account” looks and sits exactly like “Save changes” — 8px apart."
                  : "Both buttons are identical in weight and sit side by side — the delete is inside the safety-margin radius."}
              </p>
            </>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
