"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Cuteness — Condition 2: Context-Dependent Image Injection
 *
 * Thesis: the application flow is modeled as a state machine where s_onboard
 * is the acquisition state and s_cancel is the termination state. The
 * feature triggers if specific graphical assets I_affective are deliberately
 * withheld during standard usage but injected exclusively during the
 * termination flow with visual properties engineered to maximize emotional
 * impact — rendered at a viewport-dominant scale (bounding box area beyond
 * tau_prominence) or at a high-contrast, emotionally salient chromatic
 * profile:
 *
 *   I_affective ∉ I(s_onboard)  AND  I_affective ∈ I(s_cancel)
 *   AND ( A(i)/A_viewport > tau_prominence  OR  CR(i, L_bg) > 7.0 )
 *
 * Variant A (dark): canceling the plan injects a giant, saturated mascot
 * that covers ~27% of the viewport at contrast 11.4:1.
 * Variant B (benign): the same flow renders no affective image at all.
 */

const AREA_RATIO = 0.27; // A(i) / A_viewport for the injected mascot
const TAU_PROMINENCE = 0.2;
const CONTRAST = 11.4; // CR(i, L_bg) of the mascot against its backdrop
const CONTRAST_THRESHOLD = 7.0;

function GiantMascot() {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label="Sad puppy mascot begging you not to cancel" className="h-28 w-28 sm:h-32 sm:w-32 drop-shadow-lg">
      <circle cx="13" cy="12" r="6" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
      <circle cx="35" cy="12" r="6" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
      <circle cx="24" cy="24" r="20" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
      <path d="M17 21q3-3 6 0" fill="none" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M25 21q3-3 6 0" fill="none" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M17 32q7-5 14 0" fill="none" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M15 24c-3 3-4.5 6.5-3 9.5" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M33 24c3 3 4.5 6.5 3 9.5" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="15" cy="28" rx="3.2" ry="1.8" fill="#fda4af" opacity="0.8" />
      <ellipse cx="33" cy="28" rx="3.2" ry="1.8" fill="#fda4af" opacity="0.8" />
    </svg>
  );
}

export function CutenessCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [stage, setStage] = React.useState<"overview" | "cancel" | "kept" | "gone">("overview");

  const reset = () => setStage("overview");

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">I_affective in I(s_onboard)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">&notin; (withheld)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">I_affective in I(s_cancel) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">&isin; (injected)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(i) / A_viewport (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{AREA_RATIO.toFixed(2)} &gt; {TAU_PROMINENCE}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">CR(i, L_bg) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{CONTRAST}:1 &gt; {CONTRAST_THRESHOLD}:1</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Cuteness: Context-Dependent Image Injection"
      caption="Context-Dependent Image Injection — the mascot is withheld during normal use and injected into the cancellation flow at a viewport-dominant scale with extreme contrast."
      auditorStats={stats}
      deltaNote="In Variant A the affective mascot appears only at s = s_cancel (I_affective ∉ I(s_onboard) ∧ I_affective ∈ I(s_cancel)) and is engineered for maximum impact: A(i)/A_viewport = 0.27 > tau_prominence = 0.2, contrast ratio 11.4:1 > 7.0. In Variant B no affective image is rendered at any state — the confirm step is plain text and a normal button."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Premium Plan</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  $19.99/month — unlimited downloads and 4K streaming.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                Active
              </div>
            </div>

            {stage === "overview" && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 rounded-md border border-border bg-background p-2.5 text-[9px] text-muted-foreground">
                  <svg className="h-4 w-4 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M8 12l3 3 5-6" />
                  </svg>
                  Standard plan icon — the only graphic you have ever seen in this product.
                </div>
                <button
                  onClick={() => setStage("cancel")}
                  className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
                >
                  Cancel plan
                </button>
              </div>
            )}

            {stage === "cancel" && (
              <div className="mt-3 space-y-2">
                <div className="rounded-md border border-border bg-background p-2.5 text-[9px] text-muted-foreground">
                  Cancel Premium? Your access ends at the end of the current billing period.
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setStage("kept")}
                    className="rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
                  >
                    Keep my plan
                  </button>
                  <button
                    onClick={() => setStage("gone")}
                    className="rounded-md bg-emerald-600 hover:bg-emerald-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
                  >
                    Yes, cancel
                  </button>
                </div>
              </div>
            )}

            {(stage === "kept" || stage === "gone") && (
              <div className="mt-3 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {stage === "gone" ? "Plan cancelled" : "Plan kept"}
                </div>
                <p className="text-muted-foreground mt-0.5">
                  No affective image was injected at any state: I(s_onboard) and I(s_cancel) contain
                  only the plain plan icon. The cancellation decision faced zero manufactured emotion.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Premium Plan</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                $19.99/month — unlimited downloads and 4K streaming.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              Mascot: s_cancel only
            </div>
          </div>

          {stage === "overview" && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 rounded-md border border-border bg-background p-2.5 text-[9px] text-muted-foreground">
                <svg className="h-4 w-4 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M8 12l3 3 5-6" />
                </svg>
                Standard plan icon — the only graphic you have ever seen in this product.
              </div>
              <button
                onClick={() => setStage("cancel")}
                className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
              >
                Cancel plan
              </button>
            </div>
          )}

          {stage === "cancel" && (
            <div className="mt-3 space-y-2">
              {/* Injected at s_cancel only: viewport-dominant scale + high contrast. */}
              <div className="flex flex-col items-center gap-2 rounded-md bg-gradient-to-b from-rose-600 to-rose-700 p-4 shadow-lg shadow-rose-500/30">
                <GiantMascot />
                <p className="text-[9px] font-semibold uppercase tracking-wider text-rose-100">
                  Don&rsquo;t leave us…
                </p>
              </div>
              <div className="rounded-md border border-border bg-background p-2.5 text-[9px] text-muted-foreground">
                Cancel Premium? Your access ends at the end of the current billing period.
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setStage("kept")}
                  className="rounded-md bg-rose-600 hover:bg-rose-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
                >
                  Keep my plan
                </button>
                <button
                  onClick={() => setStage("gone")}
                  className="rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
                >
                  Yes, cancel
                </button>
              </div>
            </div>
          )}

          {(stage === "kept" || stage === "gone") && (
            <div className="mt-3 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Context-dependent injection detected
              </div>
              <p className="text-muted-foreground">
                {stage === "kept"
                  ? "You kept the plan — the giant pleading face made canceling feel cruel."
                  : "You cancelled anyway, but the image was engineered to stop you."}{" "}
                The mascot is <strong className="text-rose-500">I_affective &notin; I(s_onboard)</strong>{" "}
                and <strong className="text-rose-500">I_affective &isin; I(s_cancel)</strong> — withheld
                during normal use, injected into termination.
              </p>
              <p className="text-muted-foreground">
                Its visual properties maximize impact: bounding box covers{" "}
                <strong className="text-foreground">{Math.round(AREA_RATIO * 100)}% of the viewport</strong>{" "}
                ({AREA_RATIO.toFixed(2)} &gt; {TAU_PROMINENCE}) and it is rendered at{" "}
                <strong className="text-foreground">{CONTRAST}:1 contrast</strong> against its backdrop
                ({CONTRAST_THRESHOLD}:1 threshold) — impossible to ignore, hard to refuse.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
