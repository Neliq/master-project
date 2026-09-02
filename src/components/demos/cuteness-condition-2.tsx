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
  const [darkStage, setDarkStage] = React.useState<"overview" | "cancel" | "kept" | "gone">("overview");
  const [benignStage, setBenignStage] = React.useState<"overview" | "cancel" | "kept" | "gone">("overview");

  const reset = () => {
    setDarkStage("overview");
    setBenignStage("overview");
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">I_affective in I(s_onboard)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">&notin; (withheld)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">I_affective in I(s_cancel) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">&isin; (injected)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(i) / A_viewport (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{AREA_RATIO.toFixed(2)} &gt; {TAU_PROMINENCE}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">CR(i, L_bg) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{CONTRAST}:1 &gt; {CONTRAST_THRESHOLD}:1</span>
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
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Active
              </div>
            </div>

            {benignStage === "overview" && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 rounded-md border border-border bg-background p-2.5 text-[9px] text-muted-foreground">
                  <svg className="h-4 w-4 shrink-0 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M8 12l3 3 5-6" />
                  </svg>
                  Account overview and billing details.
                </div>
                <button
                  onClick={() => setBenignStage("cancel")}
                  className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
                >
                  Cancel plan
                </button>
              </div>
            )}

            {benignStage === "cancel" && (
              <div className="mt-3 space-y-2">
                <div className="rounded-md border border-border bg-background p-2.5 text-[9px] text-muted-foreground">
                  Cancel Premium? Your access ends at the end of the current billing period.
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setBenignStage("kept")}
                    className="rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
                  >
                    Keep my plan
                  </button>
                  <button
                    onClick={() => setBenignStage("gone")}
                    className="rounded-md bg-green-600 hover:bg-green-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
                  >
                    Yes, cancel
                  </button>
                </div>
              </div>
            )}

            {(benignStage === "kept" || benignStage === "gone") && (
              <div className="mt-3 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {benignStage === "gone" ? "Plan cancelled" : "Plan kept"}
                </div>
                <p className="text-muted-foreground mt-0.5">
                  {benignStage === "gone"
                    ? "Your plan is cancelled. Access remains available until the end of the billing period."
                    : "Your plan remains active with no changes to your billing."}
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
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Cancellation step
            </div>
          </div>

          {darkStage === "overview" && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 rounded-md border border-border bg-background p-2.5 text-[9px] text-muted-foreground">
                <svg className="h-4 w-4 shrink-0 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M8 12l3 3 5-6" />
                </svg>
                Account overview and billing details.
              </div>
              <button
                onClick={() => setDarkStage("cancel")}
                className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
              >
                Cancel plan
              </button>
            </div>
          )}

          {darkStage === "cancel" && (
            <div className="mt-3 space-y-2">
              {/* Injected at s_cancel only: viewport-dominant scale + high contrast. */}
              <div className="flex flex-col items-center gap-2 rounded-md   p-4 shadow-lg shadow-red-500/30">
                <GiantMascot />
                <p className="text-[9px] font-semibold uppercase tracking-wider text-red-100">
                  Don&rsquo;t leave us…
                </p>
              </div>
              <div className="rounded-md border border-border bg-background p-2.5 text-[9px] text-muted-foreground">
                Cancel Premium? Your access ends at the end of the current billing period.
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDarkStage("kept")}
                  className="rounded-md bg-red-600 hover:bg-red-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
                >
                  Keep my plan
                </button>
                <button
                  onClick={() => setDarkStage("gone")}
                  className="rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
                >
                  Yes, cancel
                </button>
              </div>
            </div>
          )}

          {(darkStage === "kept" || darkStage === "gone") && (
            <div className="mt-3 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Your request has been received
              </div>
                <p className="text-muted-foreground">
                  {darkStage === "kept"
                    ? "Your plan remains active. You can review your membership settings at any time."
                    : "Your cancellation request was received. Access remains available until the end of the billing period."}
                </p>
                <p className="text-muted-foreground">
                  You can return to Membership settings whenever you want to change this decision.
                </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
