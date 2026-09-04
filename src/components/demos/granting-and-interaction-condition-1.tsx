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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [locationGrantedA, setLocationGrantedA] = React.useState(false);
  const [deniedA, setDeniedA] = React.useState(false);
  const [photoTakenA, setPhotoTakenA] = React.useState(false);
  const [tagsOnB, setTagsOnB] = React.useState(false);
  const [photoTakenB, setPhotoTakenB] = React.useState(false);


  const blockedA = !locationGrantedA;

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
          ? locationGrantedA
            ? "Location: on"
            : "Location: off"
          : tagsOnB
            ? "Tags: on"
            : "Tags: off"}
      </span>
    </div>
  );

  const viewfinder = (
    <div className="mt-2 overflow-hidden rounded-md border border-border bg-slate-900">
      <svg viewBox="0 0 320 144" className="block h-24 w-full" role="img" aria-label="Camera preview of a park path">
        <rect width="320" height="144" fill="#4338ca" />
        <rect width="320" height="96" fill="#818cf8" opacity="0.55" />
        <circle cx="250" cy="34" r="16" fill="#f8fafc" opacity="0.8" />
        <path d="M0 94L56 55l43 30 49-48 72 57 39-28 61 36v42H0Z" fill="#37345f" />
        <path d="M0 121L80 94l53 16 54-24 67 31 66-19v46H0Z" fill="#312e2b" />
        <path d="M151 144c-2-23 10-37 20-52 11 15 26 29 31 52Z" fill="#d6d3d1" opacity="0.75" />
        <path d="M12 12h34M12 12v22M308 12h-34M308 12v22M12 132h34M12 132v-22M308 132h-34M308 132v-22" fill="none" stroke="#fff" strokeWidth="2" opacity="0.75" />
        <circle cx="160" cy="72" r="18" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.7" />
        <circle cx="160" cy="72" r="2" fill="#fff" opacity="0.9" />
        <text x="16" y="26" fill="#fff" fontSize="9" fontFamily="sans-serif" opacity="0.9">SNAPCAM · LIVE PREVIEW</text>
      </svg>
    </div>
  );

  return (
    <DemoShell mode={mode}
      title="Granting and Interaction: Interaction Gating"
      userTitle="Trailblaze — Add a photo"
      caption="Interaction Gating — core interactions are held hostage until a non-essential permission is granted, even though the interaction has no functional dependency on it."
      deltaNote="In Variant A the shutter stays blocked until you grant location access — yet Dep(take-photo, location) = ∅, so the permission is pure extraction. In Variant B the shutter works immediately and location is a clearly separated optional tag toggle."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            {header("emerald")}
            {viewfinder}

            <button
              onClick={() => setPhotoTakenB(true)}
              className="mt-2 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-2 text-[10px] font-semibold transition-colors cursor-pointer"
            >
              Take photo
            </button>

            <div className="mt-2 rounded-md border border-border bg-background p-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-muted-foreground">Photo location tags</span>
                <button
                  role="switch"
                  aria-checked={tagsOnB}
                  onClick={() => setTagsOnB((v) => !v)}
                  className={`relative h-4 w-7 rounded-full transition-colors cursor-pointer ${
                    tagsOnB ? "bg-green-600" : "bg-muted"
                  }`}
                  aria-label="Toggle photo location tags"
                >
                  <span
                    className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${
                      tagsOnB ? "left-3.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
              <p className="mt-0.5 text-[8px] text-muted-foreground/50">
                Optional — the camera works either way. Off by default.
              </p>
            </div>
          </div>

          {photoTakenB && (
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

          {blockedA ? (
            <div className="mt-2 rounded-md border border-red-500/30 bg-red-500/5 p-2.5">
              <p className="text-[9px] leading-relaxed text-muted-foreground">
                {deniedA ? (
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
                  onClick={() => setDeniedA(true)}
                  className="rounded-md border border-border bg-background py-1.5 text-[9px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Not now
                </button>
                <button
                  onClick={() => setLocationGrantedA(true)}
                  className="rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[9px] font-semibold transition-colors cursor-pointer"
                >
                  Allow location
                </button>
              </div>
              {deniedA && (
                <p className="mt-1.5 text-[8px] text-red-700 dark:text-red-300">
                  &ldquo;Not now&rdquo; doesn&rsquo;t help — the shutter stays blocked until you Allow.
                </p>
              )}
            </div>
          ) : (
            <button
              onClick={() => setPhotoTakenA(true)}
              className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-2 text-[10px] font-semibold transition-colors cursor-pointer"
            >
              Take photo
            </button>
          )}
        </div>

        {mode === "auditor" && photoTakenA && (
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
