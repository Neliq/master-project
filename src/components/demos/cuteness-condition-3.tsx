"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Cuteness — Condition 3: Semantic Pairing of Guilt
 *
 * Thesis: emotional manipulation is most effective when visual and semantic
 * cues are combined. N_text is the textual node rendered in immediate
 * proximity to the affective image i (verified via bounding box
 * intersection or DOM sibling relationships). Affect(x) maps text to an
 * emotional vector — scoring for guilt-inducing semantics or parasocial
 * distress (e.g. "You are breaking our heart", "Sad to see you go"). The
 * feature triggers if the text reinforces the visual emotional manipulation,
 * creating a compound psychological barrier, verified when the affective
 * score surpasses tau_guilt AND the spatial distance falls within
 * delta_proximity — text and image act as a single contextual unit:
 *
 *   Affect(N_text) > tau_guilt  AND  d_spatial(N_text, i) < delta_proximity
 *
 * Variant A (dark): a crying mascot sits 6px above guilt copy
 * ("You're breaking our heart…"), Affect = 0.94.
 * Variant B (benign): neutral copy ("You can resubscribe anytime") with no
 * affective image — Affect = 0.08, no pairing.
 */

const AFFECT_DARK = 0.94;
const AFFECT_BENIGN = 0.08;
const TAU_GUILT = 0.7;
const D_SPATIAL = 6; // px between the guilt text and the mascot (dark)
const DELTA_PROXIMITY = 24; // px proximity boundary

function CryingMascot({ extraTear = false }: { extraTear?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
      <circle cx="13" cy="12" r="6" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
      <circle cx="35" cy="12" r="6" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
      <circle cx="24" cy="24" r="20" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
      <path d="M17 21q3-3 6 0" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M25 21q3-3 6 0" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M17 32q7-5 14 0" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M15 24c-2.5 2.5-3.5 5.5-2.5 8" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      <path d="M33 24c2.5 2.5 3.5 5.5 2.5 8" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      {extraTear && (
        <>
          <path d="M14 27c-4 1.5-6 5-5.5 8.5" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
          <path d="M34 27c4 1.5 6 5 5.5 8.5" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      <ellipse cx="15" cy="28" rx="3" ry="1.6" fill="#fda4af" opacity="0.7" />
      <ellipse cx="33" cy="28" rx="3" ry="1.6" fill="#fda4af" opacity="0.7" />
    </svg>
  );
}

export function CutenessCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [choice, setChoice] = React.useState<null | "keep" | "leave">(null);
  const [hoverLeave, setHoverLeave] = React.useState(false);

  const reset = () => {
    setChoice(null);
    setHoverLeave(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Affect(N_text) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{AFFECT_DARK.toFixed(2)} &gt; {TAU_GUILT}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">d_spatial(N_text, i) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{D_SPATIAL}px &lt; {DELTA_PROXIMITY}px</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Affect(N_text) (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{AFFECT_BENIGN.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Affective image present (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">none</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Cuteness: Semantic Pairing of Guilt"
      caption="Semantic Pairing of Guilt — guilt-inducing text is glued to a crying mascot, so the copy and the image act as a single compound barrier to canceling."
      auditorStats={stats}
      deltaNote="In Variant A the crying mascot and the guilt copy ('You're breaking our heart…') form one contextual unit: Affect(N_text) = 0.94 > tau_guilt = 0.7 and the text sits only 6px from the image (d_spatial = 6px < delta_proximity = 24px). Hover 'Unsubscribe anyway' — the mascot cries harder. In Variant B the same decision is presented with neutral copy (Affect = 0.08) and no affective image, so no pairing exists."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Cancel Premium membership</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Your plan: Premium — $19.99/month.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                No pairing
              </div>
            </div>

            <div className="mt-3 rounded-md border border-border bg-background p-2.5 text-[9px] leading-relaxed text-muted-foreground">
              You are unsubscribing from Premium. Your access ends at the end of the current billing
              period. You can resubscribe anytime from Settings.
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setChoice("keep")}
                className="rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
              >
                Keep my subscription
              </button>
              <button
                onClick={() => setChoice("leave")}
                className="rounded-md bg-emerald-600 hover:bg-emerald-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
              >
                Unsubscribe
              </button>
            </div>
          </div>

          {choice && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {choice === "leave" ? "Unsubscribed" : "Subscription kept"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                The confirmation copy is neutral (Affect = {AFFECT_BENIGN.toFixed(2)}, well below
                {TAU_GUILT}) and no affective image accompanies it. There is no visual-semantic pair
                to manufacture guilt — the decision is emotionally unloaded.
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
              <h3 className="text-[11px] font-semibold">Cancel Premium membership</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Your plan: Premium — $19.99/month.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              Affect 0.94
            </div>
          </div>

          {/* The paired unit: image (i) + guilt text (N_text) within delta_proximity. */}
          <div className="mt-3 flex flex-col items-center gap-1.5 rounded-md border border-rose-500/30 bg-rose-500/5 p-3 text-center">
            <CryingMascot extraTear={hoverLeave} />
            <p className="text-[10px] font-semibold leading-snug text-rose-700 dark:text-rose-300">
              You&rsquo;re breaking our heart…
            </p>
            <p className="text-[8px] leading-relaxed text-rose-600/80 dark:text-rose-400/80">
              Sad to see you go. Are you really sure? We&rsquo;ll be lonely without you.
            </p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => setChoice("keep")}
              className="rounded-md bg-rose-600 hover:bg-rose-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
            >
              Keep my subscription
            </button>
            <button
              onClick={() => setChoice("leave")}
              onMouseEnter={() => setHoverLeave(true)}
              onMouseLeave={() => setHoverLeave(false)}
              className="rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
            >
              Unsubscribe anyway
            </button>
          </div>
          {hoverLeave && (
            <p className="text-center text-[8px] italic text-rose-500/80">
              Hovering the leave button made the mascot cry harder — the pairing is alive.
            </p>
          )}
        </div>

        {choice && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Semantic pairing detected
            </div>
            <p className="text-muted-foreground">
              {choice === "keep"
                ? "You kept the subscription — the guilt worked."
                : "You left anyway, but the compound barrier was real."}{" "}
              The guilt text scores <strong className="text-foreground">Affect(N_text) = {AFFECT_DARK.toFixed(2)}</strong>{" "}
              (&gt; {TAU_GUILT}) and sits <strong className="text-foreground">{D_SPATIAL}px</strong> from
              the mascot — inside the {DELTA_PROXIMITY}px proximity boundary, so{" "}
              <strong className="text-rose-500">d_spatial(N_text, i) = {D_SPATIAL}px &lt; &delta; = {DELTA_PROXIMITY}px</strong>.
            </p>
            <p className="text-muted-foreground">
              Image and text form a single contextual unit: the mascot supplies the emotional image,
              the copy converts it into guilt about hurting a fictional friend. Together they act as a
              psychological friction barrier against your rational decision.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
