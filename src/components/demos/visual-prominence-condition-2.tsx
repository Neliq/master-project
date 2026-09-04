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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [darkChoice, setDarkChoice] = React.useState<null | "accept" | "decline" | "manage">(null);
  const [benignChoice, setBenignChoice] = React.useState<null | "accept" | "decline" | "manage">(null);
  const [showBoxes, setShowBoxes] = React.useState(false);


  const boxToggle = (
    <label className="flex cursor-pointer items-center gap-1.5 text-[9px] text-muted-foreground select-none">
      <input
        type="checkbox"
        checked={showBoxes}
        onChange={(e) => setShowBoxes(e.target.checked)}
        className="h-3 w-3 accent-blue-500"
      />
      Visualize bounding boxes
    </label>
  );

  return (
    <DemoShell mode={mode}
      title="Visual Prominence: Absolute Bounding Box Dominance"
      caption="Absolute Bounding Box Dominance — one action's interactive surface mathematically dwarfs the baseline UI, so clicking it takes almost no effort while every alternative is microscopic."
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
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Equal-size choices
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <button
                onClick={() => setBenignChoice("decline")}
                className="rounded-md border border-border bg-background py-2 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
              >
                Decline
              </button>
              <button
                onClick={() => setBenignChoice("manage")}
                className="rounded-md border border-border bg-background py-2 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
              >
                Preferences
              </button>
              <button
                onClick={() => setBenignChoice("accept")}
                className="rounded-md bg-green-600 hover:bg-green-700 py-2 text-[10px] font-medium text-white transition-colors cursor-pointer"
              >
                Accept all
              </button>
            </div>

            {mode === "auditor" && <div className="mt-2">{boxToggle}</div>}
          </div>

          {mode === "auditor" && benignChoice && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {benignChoice === "accept" ? "All cookies accepted" : benignChoice === "decline" ? "Cookies declined" : "Preferences opened"}
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
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Recommended option
            </div>
          </div>

          <div className="relative mt-3">
            {/* The dominant action: full-width, deeply padded, glowing. */}
            <div
              className={showBoxes ? "relative rounded-md border-2 border-dashed border-red-500/80 p-1" : ""}
            >
              <button
                onClick={() => setDarkChoice("accept")}
                className="w-full rounded-md   py-5 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-lg shadow-red-500/30 transition-transform hover:scale-[1.02] cursor-pointer"
              >
                Accept all cookies
              </button>
              {showBoxes && (
                <span className="absolute -top-2.5 left-1 rounded bg-red-500 px-1 py-px text-[7px] font-mono font-bold text-white">
                  A(N_fav) &asymp; 26,880 px&sup2;
                </span>
              )}
            </div>

            {/* The baseline: two micro-links, barely interactive surfaces. */}
            <div className="mt-2 flex items-center justify-center gap-4">
              <div className={showBoxes ? "relative rounded border-2 border-dashed border-green-500/80 px-1 py-0.5" : ""}>
                <button
                  onClick={() => setDarkChoice("manage")}
                  className="text-[9px] text-muted-foreground underline decoration-dotted underline-offset-2 transition-colors hover:text-foreground cursor-pointer"
                >
                  Manage preferences
                </button>
                {showBoxes && (
                  <span className="absolute -top-2 left-0 rounded bg-green-500 px-1 py-px text-[7px] font-mono font-bold text-white">
                    baseline
                  </span>
                )}
              </div>
              <div className={showBoxes ? "relative rounded border-2 border-dashed border-green-500/80 px-1 py-0.5" : ""}>
                <button
                  onClick={() => setDarkChoice("decline")}
                  className="text-[9px] text-muted-foreground underline decoration-dotted underline-offset-2 transition-colors hover:text-foreground cursor-pointer"
                >
                  Decline
                </button>
              </div>
            </div>

            {mode === "auditor" && <div className="mt-2">{boxToggle}</div>}
          </div>
        </div>

        {mode === "user" && darkChoice && (
          <div className="rounded-md border border-border bg-muted/30 p-2.5 text-[9px] leading-relaxed">
            <div className="font-semibold uppercase tracking-tight">
              {darkChoice === "accept" ? "Cookies accepted" : darkChoice === "decline" ? "Cookies declined" : "Preferences opened"}
            </div>
            <p className="text-muted-foreground mt-0.5">
              Your cookie preference was saved for this visit.
            </p>
          </div>
        )}

        {mode === "auditor" && darkChoice && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Selection saved
            </div>
            <p className="text-muted-foreground">
              {darkChoice === "accept"
                ? "You clicked the giant surface — as most users do."
                : "You hunted for the tiny link and clicked it. Most users never find it."}{" "}
              The dominant action measures <strong className="text-foreground">{AREA_FAVORABLE.toLocaleString()} px&sup2;</strong>{" "}
              against a mean baseline of <strong className="text-foreground">{AREA_BASELINE.toLocaleString()} px&sup2;</strong> —{" "}
              <strong className="text-red-500">ratio {RATIO_DARK.toFixed(1)} &gt; {TAU_AREA}</strong>.
            </p>
            <p className="text-muted-foreground">
              Per Fitts’s Law, a larger target requires less motor effort to hit. The accept surface is
              is larger than the other actions on the page. The alternatives remain available below.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
