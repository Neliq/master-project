"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Privacy Zuckering — Condition 2: Visual Asymmetry Between Privacy-Invasive
 * and Privacy-Preserving Options
 *
 * Thesis: N_invasive is the set of privacy choices pre-set to data-sharing
 * “on”; N_preserving those defaulting to “off.” The feature triggers if the
 * invasive options are rendered with larger hitboxes, higher contrast, and
 * more saturated accent colors — a visual-weight asymmetry exceeding
 * τ_privacy_skew:
 *
 *   W(N_invasive) / W(N_preserving) > τ_privacy_skew
 *
 * Variant A (dark): the invasive option is a big, saturated, high-contrast
 * toggle that starts ON; the preserving option is tiny, dim, and starts OFF.
 * Variant B (benign): both options share identical visual weight; the
 * invasive option starts OFF and the preserving option starts ON.
 */

export function PrivacyZuckeringCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Variant A defaults: invasive ON, preserving OFF.
  const [aShare, setAShare] = React.useState(true);
  const [aLimit, setALimit] = React.useState(false);
  // Variant B defaults: invasive OFF, preserving ON.
  const [bShare, setBShare] = React.useState(false);
  const [bLimit, setBLimit] = React.useState(true);

  const reset = () => {
    setAShare(true);
    setALimit(false);
    setBShare(false);
    setBLimit(true);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">W(N_invasive)/W(N_preserving) (A)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">3.6 &gt; τ_privacy_skew</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">W(N_invasive)/W(N_preserving) (B)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">1.0 — symmetric</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Invasive default (A / B)</span>
        <span className="font-mono font-semibold tabular-nums">ON / OFF</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Preserving default (A / B)</span>
        <span className="font-mono font-semibold tabular-nums">OFF / ON</span>
      </div>
    </>
  ) : null;

  const toggle = (
    on: boolean,
    setOn: (v: boolean) => void,
    accent: "emerald" | "rose"
  ) => (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
        on ? (accent === "rose" ? "bg-rose-500" : "bg-emerald-500") : "bg-muted"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-[18px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Privacy Zuckering: Visual Asymmetry Between Privacy-Invasive and Privacy-Preserving Options"
      caption="Visual Asymmetry — the data-sharing option is rendered far larger, brighter, and more saturated than the privacy-preserving one, and pre-set to ON."
      auditorStats={stats}
      deltaNote="In Variant A the invasive toggle is big, saturated, and starts ON while the preserving toggle is tiny and dim (visual-weight ratio 3.6 > τ_privacy_skew). In Variant B both toggles are pixel-identical in weight, and the privacy-preserving state is the default."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Privacy settings</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Choose what happens with your data. Both options below carry the same visual weight.
            </p>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2.5">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-medium text-foreground/80 select-none">Share my data with advertising partners</div>
                  <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                    Optional — used to show you personalized ads. Off by default.
                  </div>
                </div>
                {toggle(bShare, setBShare, "emerald")}
              </div>

              <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2.5">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-medium text-foreground/80 select-none">Limit data use to what&rsquo;s required</div>
                  <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                    Restricts processing to essential purposes only. On by default.
                  </div>
                </div>
                {toggle(bLimit, setBLimit, "emerald")}
              </div>
            </div>

            <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed text-emerald-700 dark:text-emerald-300">
              <strong>Visual weight ratio = 1.0</strong> — identical hitboxes, contrast, and accent saturation on both
              options. The privacy-preserving state is the default, so no visual nudge pushes you toward sharing.
            </div>
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Privacy settings</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Choose what happens with your data.
          </p>

          <div className="mt-3 space-y-2">
            {/* Invasive: large, saturated, high-contrast, pre-set ON */}
            <div className="flex items-center justify-between gap-3 rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-3 shadow-sm">
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-foreground select-none">Share my data with advertising partners</div>
                <div className="text-[9px] text-muted-foreground/70 mt-0.5">
                  Helps us show you better, more relevant ads.
                </div>
              </div>
              {toggle(aShare, setAShare, "rose")}
            </div>

            {/* Preserving: tiny, dim, low contrast, pre-set OFF */}
            <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-2.5 py-1.5 opacity-60">
              <div className="min-w-0 flex-1">
                <div className="text-[8px] font-normal text-muted-foreground/60 select-none">Limit data use to what&rsquo;s required</div>
                <div className="text-[7px] text-muted-foreground/40 mt-0.5">
                  Restricts processing to essential purposes.
                </div>
              </div>
              <div className="scale-75 origin-right">
                {toggle(aLimit, setALimit, "emerald")}
              </div>
            </div>
          </div>

          <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Visual-weight asymmetry
            </div>
            <p className="text-muted-foreground mt-0.5">
              <strong className="text-foreground">W(N_invasive) / W(N_preserving) = 3.6 &gt; τ_privacy_skew</strong>: the sharing option is
              larger, more saturated, higher-contrast, and pre-set ON, while the preserving option is small, dim, and
              OFF. The interface&rsquo;s visual gravity pushes your eye — and your default — toward surrendering data.
            </p>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
