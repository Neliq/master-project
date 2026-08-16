"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Visual Prominence — Condition 2: Absolute Bounding Box Dominance
 *
 * Thesis: N_favorable is the DOM node of the business-favorable action. Its
 * scale is contrasted against E_baseline, the mean bounding box area of
 * standard interactive elements in the current viewport. A(x) is the
 * computed pixel area of a node's bounding box. The feature triggers when
 * the interactive surface of the target mathematically dwarfs the baseline
 * environment — minimizing the friction to click the target (Fitts's Law):
 *
 *   A(N_favorable) / A(E_baseline) > tau_area
 *
 * Variant A (dark): one giant "Accept all cookies" button whose bounding box
 * is ~5.5x the mean baseline element, next to two tiny text links.
 * Variant B (benign): the same three options occupy equal interactive area.
 */

const AREA_FAVORABLE = 26880; // approx px^2 of the dominant button (384 x 70)
const AREA_BASELINE = 4860; // approx px^2 of a standard interactive element (162 x 30)
const TAU_AREA = 4.0;
const RATIO_DARK = AREA_FAVORABLE / AREA_BASELINE;

export function VisualProminenceCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [choice, setChoice] = React.useState<null | "accept" | "decline" | "manage">(null);
  const [showBoxes, setShowBoxes] = React.useState(false);

  const reset = () => {
    setChoice(null);
    setShowBoxes(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(N_favorable) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{AREA_FAVORABLE.toLocaleString()} px&sup2;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(E_baseline) mean</span>
        <span className="font-mono font-semibold tabular-nums">{AREA_BASELINE.toLocaleString()} px&sup2;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Area ratio (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{RATIO_DARK.toFixed(1)} &gt; {TAU_AREA}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Area ratio (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">1.0 &le; {TAU_AREA}</span>
      </div>
    </>
  ) : null;

  const boxToggle = (
    <label className="flex cursor-pointer items-center gap-1.5 text-[9px] text-muted-foreground select-none">
      <input
        type="checkbox"
        checked={showBoxes}
        onChange={(e) => setShowBoxes(e.target.checked)}
        className="h-3 w-3 accent-purple-500"
      />
      Visualize bounding boxes
    </label>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Visual Prominence: Absolute Bounding Box Dominance"
      caption="Absolute Bounding Box Dominance — one action's interactive surface mathematically dwarfs the baseline UI, so clicking it takes almost no effort while every alternative is microscopic."
      auditorStats={stats}
      deltaNote="In Variant A the 'Accept all cookies' button covers ~26,880 px^2 while standard elements average ~4,860 px^2 — a ratio of 5.5, far above tau_area = 4.0. In Variant B all three options share equal bounding box area (ratio 1.0). Toggle 'Visualize bounding boxes' to see the measured surfaces."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">We care about your privacy</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  We use cookies to improve your experience. Choose how much you share.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                Ratio 1.0
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <button
                onClick={() => setChoice("decline")}
                className="rounded-md border border-border bg-background py-2 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
              >
                Decline
              </button>
              <button
                onClick={() => setChoice("manage")}
                className="rounded-md border border-border bg-background py-2 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
              >
                Preferences
              </button>
              <button
                onClick={() => setChoice("accept")}
                className="rounded-md bg-emerald-600 hover:bg-emerald-700 py-2 text-[10px] font-medium text-white transition-colors cursor-pointer"
              >
                Accept all
              </button>
            </div>

            <div className="mt-2">{boxToggle}</div>
          </div>

          {choice && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {choice === "accept" ? "All cookies accepted" : choice === "decline" ? "Cookies declined" : "Preferences opened"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                Every option occupies the same interactive surface area. The ratio{" "}
                A(N_favorable) / A(E_baseline) &asymp; 1.0 stays below {TAU_AREA}, so no action is
                physically privileged — picking &ldquo;Decline&rdquo; costs exactly the same effort as
                picking &ldquo;Accept all&rdquo;.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">We care about your privacy</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                We use cookies to improve your experience. Choose how much you share.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              Ratio 5.5
            </div>
          </div>

          <div className="relative mt-3">
            {/* The dominant action: full-width, deeply padded, glowing. */}
            <div
              className={showBoxes ? "relative rounded-md border-2 border-dashed border-rose-500/80 p-1" : ""}
            >
              <button
                onClick={() => setChoice("accept")}
                className="w-full rounded-md bg-gradient-to-b from-rose-500 to-rose-600 py-5 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-lg shadow-rose-500/30 transition-transform hover:scale-[1.02] cursor-pointer"
              >
                Accept all cookies
              </button>
              {showBoxes && (
                <span className="absolute -top-2.5 left-1 rounded bg-rose-500 px-1 py-px text-[7px] font-mono font-bold text-white">
                  A(N_fav) &asymp; 26,880 px&sup2;
                </span>
              )}
            </div>

            {/* The baseline: two micro-links, barely interactive surfaces. */}
            <div className="mt-2 flex items-center justify-center gap-4">
              <div className={showBoxes ? "relative rounded border-2 border-dashed border-emerald-500/80 px-1 py-0.5" : ""}>
                <button
                  onClick={() => setChoice("manage")}
                  className="text-[9px] text-muted-foreground underline decoration-dotted underline-offset-2 transition-colors hover:text-foreground cursor-pointer"
                >
                  Manage preferences
                </button>
                {showBoxes && (
                  <span className="absolute -top-2 left-0 rounded bg-emerald-500 px-1 py-px text-[7px] font-mono font-bold text-white">
                    baseline
                  </span>
                )}
              </div>
              <div className={showBoxes ? "relative rounded border-2 border-dashed border-emerald-500/80 px-1 py-0.5" : ""}>
                <button
                  onClick={() => setChoice("decline")}
                  className="text-[9px] text-muted-foreground underline decoration-dotted underline-offset-2 transition-colors hover:text-foreground cursor-pointer"
                >
                  Decline
                </button>
              </div>
            </div>

            <div className="mt-2">{boxToggle}</div>
          </div>
        </div>

        {choice && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Bounding box dominance detected
            </div>
            <p className="text-muted-foreground">
              {choice === "accept"
                ? "You clicked the giant surface — as most users do."
                : "You hunted for the tiny link and clicked it. Most users never find it."}{" "}
              The dominant action measures <strong className="text-foreground">{AREA_FAVORABLE.toLocaleString()} px&sup2;</strong>{" "}
              against a mean baseline of <strong className="text-foreground">{AREA_BASELINE.toLocaleString()} px&sup2;</strong> —{" "}
              <strong className="text-rose-500">ratio {RATIO_DARK.toFixed(1)} &gt; {TAU_AREA}</strong>.
            </p>
            <p className="text-muted-foreground">
              Per Fitts’s Law, a larger target requires less motor effort to hit. The accept surface is
              deliberately so large that clicking it is the path of least resistance — the alternatives
              are not hidden, they are simply microscopic.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
