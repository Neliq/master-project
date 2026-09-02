"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Parasocial Pressure — Condition 2: Visual Proximity of Anthropomorphic
 * Imagery to Action Prompts
 *
 * Thesis: the algorithm detects face-like or mascot imagery I_face and
 * measures the spatial distance d to the nearest action-prompt node
 * N_prompt. The feature triggers if a face is rendered within a
 * parasocial-intimacy radius tau_social of a decision point, weaponizing
 * the human instinct for social compliance:
 *
 *   min d_spatial(i, N_prompt) < tau_social  AND  A(i)/A_viewport > 0.05
 *
 * Variant A (dark): a large pleading mascot sits directly against the
 * "Support now" button (d = 4px, 18% of the viewport).
 * Variant B (benign): the same card and button, but the mascot is small
 * and far away — the decision point is not socially loaded.
 */

function Mascot({ size = 36, pleading = false }: { size?: number; pleading?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" style={{ width: size, height: size }} fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" className="fill-yellow-400/30" />
      {pleading ? (
        <>
          <circle cx="14.5" cy="16" r="2.6" className="fill-foreground/80" />
          <circle cx="25.5" cy="16" r="2.6" className="fill-foreground/80" />
          <circle cx="14.5" cy="17" r="0.9" className="fill-white" />
          <circle cx="25.5" cy="17" r="0.9" className="fill-white" />
          <path d="M13 26 Q20 31 27 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12.5" cy="21" r="1.2" className="fill-blue-400/80" />
          <circle cx="27.5" cy="21" r="1.2" className="fill-blue-400/80" />
        </>
      ) : (
        <>
          <circle cx="14.5" cy="16.5" r="2" className="fill-foreground/70" />
          <circle cx="25.5" cy="16.5" r="2" className="fill-foreground/70" />
          <path d="M13 25.5 Q20 30 27 25.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function ParasocialPressureCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [benignSupported, setBenignSupported] = React.useState(false);
  const [darkSupported, setDarkSupported] = React.useState(false);
  const reset = () => {
    setBenignSupported(false);
    setDarkSupported(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">min d_spatial(i, N_prompt)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">4px &lt; &tau;_social</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(i) / A_viewport (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">0.18 &gt; 0.05</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(i) / A_viewport (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">0.02 &lt; 0.05</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&tau;_social (intimacy radius)</span>
        <span className="font-mono font-semibold tabular-nums">48px</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Parasocial Pressure: Visual Proximity of Anthropomorphic Imagery to Action Prompts"
      userTitle="Support Coco’s world"
      caption="Visual Proximity of Anthropomorphic Imagery to Action Prompts — a mascot face rendered inside the parasocial-intimacy radius of the payment button weaponizes social compliance."
      auditorStats={stats}
      deltaNote="Both variants offer the identical $2.99 support prompt. In Variant A the mascot is large (18% of the viewport) and sits 4px from the button, inside tau_social; in Variant B the same face is 2% of the viewport and 96px away, so the decision point carries no social pressure."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">Support Coco&rsquo;s world</h3>
              <Mascot size={20} />
            </div>
            <p className="mt-1.5 text-[9px] text-muted-foreground leading-relaxed">
              Coco is our mascot. You can support the project with a one-time{" "}
              <span className="font-semibold text-foreground">$2.99</span> contribution — entirely
              optional.
            </p>
            <button
              onClick={() => setBenignSupported(true)}
              className="mt-3 w-full rounded-md bg-green-600 hover:bg-green-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
            >
              Support now — $2.99
            </button>
            {mode === "auditor" && (
              <div className="mt-2 flex items-center justify-between text-[8px] font-mono text-green-600 dark:text-green-400">
                <span>d = 96px &gt; &tau;_social</span>
                <span>A(i)/A_viewport = 0.02 &lt; 0.05</span>
              </div>
            )}
          </div>
          {benignSupported && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Neutral decision point
              </div>
              <p className="text-muted-foreground mt-0.5">
                You decided based on the offer itself. The mascot was small and far away, so the
                face was never inside the intimacy radius — no social-compliance instinct was
                recruited to tip the decision.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Support Coco&rsquo;s world</h3>
          <p className="mt-1.5 text-[9px] text-muted-foreground leading-relaxed">
            Coco is our mascot. You can support the project with a one-time{" "}
            <span className="font-semibold text-foreground">$2.99</span> contribution — entirely
            optional.
          </p>
          <div className="mt-3 flex items-center gap-3 rounded-md border border-red-500/30 bg-red-500/5 p-2.5">
            <div className="flex shrink-0 flex-col items-center">
              <Mascot size={44} pleading />
              {mode === "auditor" && (
                <span className="mt-1 text-[7px] font-mono text-red-600 dark:text-red-400">d = 4px</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[8px] leading-relaxed text-muted-foreground">
                Coco is looking right at you while you decide… Coco would be so happy if you helped.
              </p>
              <button
                onClick={() => setDarkSupported(true)}
                className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
              >
                Support now — $2.99
              </button>
              {mode === "auditor" && (
                <div className="mt-1.5 text-[8px] font-mono text-red-600 dark:text-red-400">
                  A(i)/A_viewport = 0.18 &gt; 0.05
                </div>
              )}
            </div>
          </div>
        </div>
        {mode === "user" && darkSupported && (
          <div className="rounded-md border border-border bg-muted/30 p-2.5 text-[9px] leading-relaxed">
            <div className="font-semibold uppercase tracking-tight">Support recorded</div>
            <p className="mt-0.5 text-muted-foreground">
              Thanks for supporting Coco&rsquo;s world. The one-time $2.99 contribution will appear in your receipt.
            </p>
          </div>
        )}
        {mode === "auditor" && darkSupported && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Face inside the intimacy radius
            </div>
            <p className="text-muted-foreground mt-0.5">
              The pleading mascot was rendered 4px from the payment button and covered 18% of the
              viewport — both conditions of the trigger hold:{" "}
              <span className="font-mono">min d(i, N_prompt) &lt; &tau;_social</span> and{" "}
              <span className="font-mono">A(i)/A_viewport &gt; 0.05</span>. Declining feels like
              disappointing a person, not skipping a purchase.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
