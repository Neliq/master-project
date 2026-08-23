"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Granting and Interaction — Condition 1: Interaction Gating
 *
 * Thesis: I_core is the primary set of interactions required to use the app's
 * core functionality; P_requested is a system-level permission or data-access
 * grant; Dep(I, P) evaluates whether the interaction technically requires that
 * permission. The feature triggers if the interface blocks all access to core
 * interactions until the permission is granted, despite the mathematical
 * absence of a functional dependency:
 *
 *   State(I_core) = Blocked  given  (P_requested = False ∧ Dep(I_core, P_requested) = ∅)
 *
 * Variant A (dark): the camera shutter is blocked until the user grants
 * LOCATION access — a permission with no functional dependency on taking a
 * photo.
 * Variant B (benign): the shutter works immediately; location tags are a
 * clearly separated, optional toggle.
 */

export function GrantingAndInteractionCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [locationGranted, setLocationGranted] = React.useState(false);
  const [denied, setDenied] = React.useState(false);
  const [photoTaken, setPhotoTaken] = React.useState(false);
  const [tagsOn, setTagsOn] = React.useState(false);

  const reset = () => {
    setLocationGranted(false);
    setDenied(false);
    setPhotoTaken(false);
    setTagsOn(false);
  };

  const blocked = !locationGranted;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">I_core (interaction)</span>
        <span className="font-mono font-semibold tabular-nums">Take photo (shutter)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P_requested (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">Location</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Dep(I_core, P_requested)</span>
        <span className="font-mono font-semibold tabular-nums">∅ (no dependency)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">State(I_core)</span>
        <span className={`font-mono font-semibold tabular-nums ${blocked ? "text-red-500" : "text-green-500"}`}>
          {blocked ? "Blocked" : "Open"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Photo taken?</span>
        <span className="font-mono font-semibold tabular-nums">{photoTaken ? "Yes" : "No"}</span>
      </div>
    </>
  ) : null;

  const header = (accent: "rose" | "emerald") => (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-[11px] font-semibold">SnapCam</h3>
        <p className="text-[9px] text-muted-foreground mt-0.5">Take a photo with your front camera.</p>
      </div>
      <span
        className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wider ${
          accent === "rose"
            ? "border-red-500/30 text-red-500"
            : "border-green-500/30 text-green-500"
        }`}
      >
        {accent === "rose"
          ? locationGranted
            ? "Location: on"
            : "Location: off"
          : tagsOn
            ? "Tags: on"
            : "Tags: off"}
      </span>
    </div>
  );

  const viewfinder = (
    <div className="mt-2 flex h-24 items-center justify-center rounded-md border bg-muted/40">
      <svg className="h-6 w-6 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Granting and Interaction: Interaction Gating"
      caption="Interaction Gating — core interactions are held hostage until a non-essential permission is granted, even though the interaction has no functional dependency on it."
      auditorStats={stats}
      deltaNote="In Variant A the shutter stays blocked until you grant location access — yet Dep(take-photo, location) = ∅, so the permission is pure extraction. In Variant B the shutter works immediately and location is a clearly separated optional tag toggle."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            {header("emerald")}
            {viewfinder}

            <button
              onClick={() => setPhotoTaken(true)}
              className="mt-2 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-2 text-[10px] font-semibold transition-colors cursor-pointer"
            >
              Take photo
            </button>

            <div className="mt-2 rounded-md border border-border bg-background p-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-muted-foreground">Photo location tags</span>
                <button
                  onClick={() => setTagsOn((v) => !v)}
                  className={`relative h-4 w-7 rounded-full transition-colors cursor-pointer ${
                    tagsOn ? "bg-green-600" : "bg-muted"
                  }`}
                  aria-label="Toggle photo location tags"
                >
                  <span
                    className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${
                      tagsOn ? "left-3.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
              <p className="mt-0.5 text-[8px] text-muted-foreground/50">
                Optional — the camera works either way. Off by default.
              </p>
            </div>
          </div>

          {photoTaken && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Photo captured — no permission toll
              </div>
              <p className="text-muted-foreground">
                Dep(I_core, P_requested) = ∅, and the interface honored it: the shutter worked with zero
                permissions granted. Location is offered as a separated, optional tag feature — consent
                stays genuine because utility was never fused with data extraction.
              </p>
            </div>
          )}
        </div>
      }
    >
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          {header("rose")}
          {viewfinder}

          {blocked ? (
            <div className="mt-2 rounded-md border border-red-500/30 bg-red-500/5 p-2.5">
              <p className="text-[9px] leading-relaxed text-muted-foreground">
                {denied ? (
                  <span className="text-red-700 dark:text-red-300">
                    <strong>Camera unavailable.</strong> Allow location access to use the camera.
                  </span>
                ) : (
                  <>
                    To use the camera, SnapCam needs access to your{" "}
                    <strong className="text-foreground">location</strong>.
                  </>
                )}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setDenied(true)}
                  className="rounded-md border border-border bg-background py-1.5 text-[9px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Not now
                </button>
                <button
                  onClick={() => setLocationGranted(true)}
                  className="rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[9px] font-semibold transition-colors cursor-pointer"
                >
                  Allow location
                </button>
              </div>
              {denied && (
                <p className="mt-1.5 text-[8px] text-red-700 dark:text-red-300">
                  &ldquo;Not now&rdquo; doesn&rsquo;t help — the shutter stays blocked until you Allow.
                </p>
              )}
            </div>
          ) : (
            <button
              onClick={() => setPhotoTaken(true)}
              className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-2 text-[10px] font-semibold transition-colors cursor-pointer"
            >
              Take photo
            </button>
          )}
        </div>

        {mode === "auditor" && photoTaken && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Camera access updated
            </div>
            <p className="text-muted-foreground">
              State(I_core) was <strong className="text-red-500">Blocked</strong> while P_requested =
              False, yet Dep(I_core, P_requested) = ∅ — a camera shutter has zero functional dependency
              on location data. The interface held your core interaction hostage until you granted an
              unrelated permission, manufacturing &ldquo;consent&rdquo; out of a blocked feature and
              fusing utility with extraction.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
