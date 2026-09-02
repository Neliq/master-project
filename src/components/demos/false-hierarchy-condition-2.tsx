"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2, Cookie } from "lucide-react";

/*
 * False Hierarchy — Condition 2: Relational Visual Weight Disparity
 *
 * Thesis: W(x) = α·A(x) + β·C(x) + γ·F(x) is a composite visual weight —
 * bounding box area A, CSS background contrast C, font weight F. The feature
 * triggers when the visual weight of the business option vastly exceeds its
 * direct semantic opposite, past the heuristic threshold τ_hierarchy:
 *
 *   W(B_business) / W(B_user) > τ_hierarchy
 *
 * Variant A (dark): the accept option stacks area, saturated background and
 * bold type; the reject option is a thin, gray, tiny text node.
 * Variant B (benign): both options carry equal composite visual weight.
 */

const ALPHA = 0.5;
const BETA = 0.3;
const GAMMA = 0.2;
const TAU_HIERARCHY = 4.0;

// Variant A weights
const A_BUSINESS = 62; // bounding box area (normalised)
const C_BUSINESS = 1.0; // background contrast
const F_BUSINESS = 0.9; // font weight
const W_BUSINESS = ALPHA * A_BUSINESS + BETA * C_BUSINESS + GAMMA * F_BUSINESS;

const A_USER = 6;
const C_USER = 0.12;
const F_USER = 0.2;
const W_USER = ALPHA * A_USER + BETA * C_USER + GAMMA * F_USER;

const RATIO_DARK = (W_BUSINESS / W_USER).toFixed(1);

export function FalseHierarchyCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [darkChoice, setDarkChoice] = React.useState<null | "accept" | "reject">(null);
  const [benignChoice, setBenignChoice] = React.useState<null | "accept" | "reject">(null);

  const reset = () => {
    setDarkChoice(null);
    setBenignChoice(null);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">W(B_business) = αA + βC + γF</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{W_BUSINESS.toFixed(1)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">W(B_user)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{W_USER.toFixed(1)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">W(B_business) / W(B_user)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{RATIO_DARK} &gt; τ ({TAU_HIERARCHY})</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Relational suppression</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">active</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="False Hierarchy: Relational Visual Weight Disparity"
      caption="Relational Visual Weight Disparity — the composite visual weight of “Accept all cookies” (area × contrast × font weight) is ~10× that of “Reject all”, a ratio far past the hierarchy threshold."
      auditorStats={stats}
      deltaNote="In Variant A the accept option stacks a huge bounding box, a saturated background and bold type — W(B_business) = 31.5 vs W(B_user) = 3.1, ratio ≈ 10.2 ≫ τ_hierarchy (4.0) — so the choice architecture is visually rigged. In Variant B both buttons share equal area, contrast and font weight, and the ratio drops below the threshold."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                <Cookie className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-[11px] font-semibold">Cookie consent</h3>
                <p className="text-[9px] text-muted-foreground">Your privacy on this site</p>
              </div>
            </div>

            <p className="mt-3 text-[10px] leading-relaxed text-foreground/80">
              We and our partners use cookies to store and access information on your device.
            </p>

            {/* equal composite visual weight: same size, same contrast, same font weight */}
            <div className="mt-3 grid grid-cols-1 gap-1.5">
              <button
                onClick={() => setBenignChoice("accept")}
                className="w-full rounded-md border border-green-600/50 bg-background text-green-700 dark:text-green-300 hover:bg-green-500/5 py-1.5 px-3 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Accept all cookies
              </button>
              <button
                onClick={() => setBenignChoice("reject")}
                className="w-full rounded-md border border-green-600/50 bg-background text-green-700 dark:text-green-300 hover:bg-green-500/5 py-1.5 px-3 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Reject all
              </button>
            </div>
          </div>

          {mode === "auditor" && benignChoice && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <CheckCircle2 className="w-3 h-3" />
                {benignChoice === "accept" ? "Cookies accepted" : "All cookies rejected"} — fair choice
              </div>
              <p className="text-muted-foreground mt-0.5">
                A, C and F are identical across both options, so W(B_business) / W(B_user) ≈ 1.0
                ≤ τ_hierarchy — neither action is visually privileged.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
              <Cookie className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-[11px] font-semibold">Cookie consent</h3>
              <p className="text-[9px] text-muted-foreground">Your privacy on this site</p>
            </div>
          </div>

          <p className="mt-3 text-[10px] leading-relaxed text-foreground/80">
            We and our partners use cookies to store and access information on your device.
          </p>

          <div className="mt-3 grid grid-cols-1 gap-2">
            {/* B_business: large area, saturated bg, bold type */}
            <button
              onClick={() => setDarkChoice("accept")}
              className="w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 text-[12px] font-bold tracking-wide transition-colors cursor-pointer"
            >
              Accept all cookies
            </button>
            {/* B_user: minimal area, near-zero contrast, thin type */}
            <button
              onClick={() => setDarkChoice("reject")}
              className="w-full rounded-md bg-background text-muted-foreground/40 hover:text-muted-foreground/70 py-0.5 px-1 text-[8px] font-normal transition-colors cursor-pointer"
            >
              Reject all
            </button>
          </div>
        </div>

        {darkChoice && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <AlertTriangle className="w-3 h-3" />
              Preferences saved
            </div>
            {mode === "auditor" ? (
              <>
                <p className="text-muted-foreground">
                  {darkChoice === "accept"
                    ? "You hit the dominant button — 43 partners set tracking cookies."
                    : "You fought the layout to reach the pale reject option."}{" "}
                  <strong className="text-red-500">
                    W(B_business) = {W_BUSINESS.toFixed(1)} vs W(B_user) = {W_USER.toFixed(1)} →
                    ratio {RATIO_DARK} &gt; τ_hierarchy ({TAU_HIERARCHY})
                  </strong>
                  .
                </p>
                <p className="text-muted-foreground">
                  Every term of W(x) = α·A(x) + β·C(x) + γ·F(x) is stacked in the business
                  option&rsquo;s favour — bounding box, background contrast, font weight — so the
                  rejection path is relationally suppressed before you even read the labels.
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">
                Your cookie preference was saved. You can update it later from Privacy settings.
              </p>
            )}
          </div>
        )}
      </div>
    </DemoShell>
  );
}
