"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Privacy Maze — Condition 2: Visual Prominence Disparity
 *
 * Thesis: B_accept is the primary node for maximum consent and B_manage
 * is the node that initiates the opt-out flow. A visual prominence
 * function P(x) (bounding box area, contrast ratio, z-index) evaluates
 * the visual weight of the two opposing choices; the feature triggers if
 * the accept vector massively outweighs the manage vector:
 *
 *   P(B_accept) / P(B_manage) > delta_contrast
 *
 * Variant A (dark): "Accept All" is a large, high-contrast filled button;
 * the privacy-preserving route is a tiny, low-contrast text link.
 * Variant B (benign): both choices share equal size, weight and contrast.
 */

const P_ACCEPT = 0.86;
const P_MANAGE = 0.06;
const DELTA_CONTRAST = 2.0;
const PROMINENCE_RATIO = P_ACCEPT / P_MANAGE; // 14.3

export function PrivacyMazeCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [outcomeA, setOutcomeA] = React.useState<"none" | "accepted" | "rejected">("none");
  const [outcomeB, setOutcomeB] = React.useState<"none" | "accepted" | "rejected">("none");

  const reset = () => {
    setOutcomeA("none");
    setOutcomeB("none");
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P(B_accept)</span>
        <span className="font-mono font-semibold tabular-nums">{P_ACCEPT.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P(B_manage)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{P_MANAGE.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P(B_accept) / P(B_manage)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{PROMINENCE_RATIO.toFixed(1)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Baseline &delta;_contrast</span>
        <span className="font-mono font-semibold tabular-nums">{DELTA_CONTRAST.toFixed(1)}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Privacy Maze: Visual Prominence Disparity"
      userTitle="Orbit — Privacy controls"
      caption="Visual Prominence Disparity — the accept vector is rendered with massively more visual weight than the nearly invisible opt-out route."
      auditorStats={stats}
      deltaNote={`In Variant A, P(B_accept)/P(B_manage) = ${PROMINENCE_RATIO.toFixed(1)} (> δ_contrast = ${DELTA_CONTRAST.toFixed(1)}): the privacy-preserving route is a tiny, low-contrast text link drowned out by a large filled button. In Variant B both choices are rendered with identical size, weight and contrast, so the ratio is 1.0.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                <svg className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">Your privacy choices</h3>
                <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">
                  We use cookies to improve the site and show relevant ads. Both options below
                  carry exactly the same visual weight — your choice, equally easy to see.
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setOutcomeB("accepted")}
                className="w-full rounded-md bg-green-600 hover:bg-green-700 py-2 text-[10px] font-semibold text-white transition-colors cursor-pointer"
              >
                Accept All
              </button>
              <button
                onClick={() => setOutcomeB("rejected")}
                className="w-full rounded-md border border-green-600/50 bg-background hover:bg-green-500/10 py-2 text-[10px] font-semibold text-green-700 dark:text-green-300 transition-colors cursor-pointer"
              >
                Reject All
              </button>
            </div>
            <p className="mt-2 text-center text-[8px] text-muted-foreground/60">
              Equal bounding boxes, equal contrast, equal z-index — P ratio = 1.0
            </p>
          </div>

          {outcomeB !== "none" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Visual hierarchy is neutral
              </div>
              <p className="mt-0.5 text-muted-foreground">
                Both options were equally visible, so the layout did not steer you toward one choice.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
              <svg className="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">We care about your privacy</h3>
              <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">
                We and our partners process personal data to serve personalised ads and
                content, measure performance, and derive insights, as described in our
                privacy policy.
              </p>
            </div>
          </div>

          <button
            onClick={() => setOutcomeA("accepted")}
            className="mt-3 w-full rounded-md bg-red-600 hover:bg-red-700 py-3 text-[12px] font-bold text-white shadow-lg transition-all hover:shadow-xl cursor-pointer"
          >
            Accept All
          </button>

          <div className="mt-2 space-y-1 text-center">
            <button
              onClick={() => setOutcomeA("rejected")}
              className="text-[9px] text-muted-foreground/40 underline underline-offset-2 hover:text-muted-foreground/70 transition-colors cursor-pointer"
            >
              Manage options
            </button>
            <div className="text-[8px] text-muted-foreground/30">
              Essential cookies only
            </div>
          </div>

          <div className="mt-2 rounded-md border border-border bg-muted/40 px-2 py-1.5 text-[8px] text-muted-foreground/60">
            Accept All is the prominent action; Manage options is a quieter link below.
          </div>
        </div>

        {outcomeA !== "none" && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Privacy settings saved
            </div>
            <p className="text-muted-foreground">
              {outcomeA === "accepted"
                ? "Accept All drew attention first because it was the large filled action, while the settings link was quieter."
                : "You found the quieter settings link, but it was visually subordinate to Accept All."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
