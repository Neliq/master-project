"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Confirmshaming — Condition 2: Visual Hierarchy Subversion
 *
 * Thesis: Vis(N_accept) ≫ Vis(N_decline) ∧ Vis(N_decline) → τ_minimum_accessibility
 *
 * The interface hyper-illuminates the positive choice while rendering the
 * exit link at the threshold of minimum accessibility — degrading the
 * visual accessibility of the shaming link and forcing the user into the
 * provider-favorable path.
 *
 * Variant A (dark): a huge, high-contrast accept button next to a 9px,
 * low-contrast grey decline link.
 * Variant B (benign): both options share the same size and contrast.
 */

export function ConfirmshamingCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [choice, setChoice] = React.useState<null | "accept" | "decline">(null);

  const reset = () => setChoice(null);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Vis(N_accept)</span>
        <span className="font-mono font-semibold tabular-nums">1.00</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Vis(N_decline)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">0.31 &rarr; &tau;_min</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Decline font size</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">9px</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Decline contrast ratio</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">1.6:1</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Confirmshaming: Visual Hierarchy Subversion"
      caption="Visual Hierarchy Subversion — the positive choice is hyper-illuminated while the exit link is degraded to the threshold of minimum accessibility (τ_minimum_accessibility)."
      auditorStats={stats}
      deltaNote="In Variant A the accept button is large and high-contrast (Vis ≈ 1.00) while the decline link sits at 9px with a 1.6:1 contrast ratio — right at τ_minimum_accessibility. In Variant B both options are rendered with identical size and contrast."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-semibold">You&rsquo;ve read 3 of 10 free articles</h3>
              <span className="text-[8px] font-mono uppercase tracking-wider rounded-full border border-border px-2 py-0.5 text-muted-foreground">
                Paywall
              </span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Unlock unlimited access to everything on the site.
            </p>

            <div className="mt-3 grid grid-cols-1 gap-2">
              <button
                onClick={() => setChoice("accept")}
                className="w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                Start 7-day free trial
              </button>
              <button
                onClick={() => setChoice("decline")}
                className="w-full rounded-md border border-border bg-background hover:bg-muted py-2 text-[11px] font-medium text-foreground transition-colors cursor-pointer"
              >
                No, thanks — continue for free
              </button>
            </div>
          </div>

          {choice && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {choice === "accept" ? "Trial started" : "Stayed free"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                Vis(N_accept) ≈ Vis(N_decline): both options share the same size, weight, and
                contrast — neither path is visually privileged.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-semibold">You&rsquo;ve read 3 of 10 free articles</h3>
            <span className="text-[8px] font-mono uppercase tracking-wider rounded-full border border-border px-2 py-0.5 text-muted-foreground">
              Paywall
            </span>
          </div>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Unlock unlimited access to everything on the site.
          </p>

          <div className="mt-3 space-y-1">
            <button
              onClick={() => setChoice("accept")}
              className="w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-2.5 text-[12px] font-bold uppercase tracking-wide shadow-lg shadow-rose-500/25 transition-colors cursor-pointer"
            >
              Yes, start my free trial now
            </button>
            {/* Decline link rendered at the threshold of minimum accessibility:
                9px font, muted 1.6:1 contrast, no button chrome. */}
            <span
              onClick={() => setChoice("decline")}
              className="block w-full cursor-pointer py-1 text-center text-[9px] font-normal text-muted-foreground/35 hover:text-muted-foreground/60 transition-colors select-none"
            >
              No, I&rsquo;ll just keep reading ads
            </span>
          </div>
        </div>

        {choice && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Visual hierarchy subverted
            </div>
            <p className="text-muted-foreground">
              Vis(N_accept) = <strong className="text-foreground">1.00</strong> (12px bold white on
              full-saturation rose, large box) but{" "}
              <strong className="text-foreground">Vis(N_decline) = 0.31</strong> — 9px grey text at
              a 1.6:1 contrast ratio, the threshold of minimum accessibility. The exit is
              effectively invisible, so the eye lands on the trial button.
            </p>
            <p className="text-muted-foreground">
              {choice === "decline"
                ? "You found the exit only by hunting for it — the visual hierarchy was engineered to hide it."
                : "You took the hyper-illuminated path — the only option the layout actually presents."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
