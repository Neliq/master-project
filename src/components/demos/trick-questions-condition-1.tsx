"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Trick Questions — Condition 1: Structural Label-Input Semantic Mismatch
 *
 * Thesis: the algorithm examines <input>/<select>/<button> elements for a
 * mismatch between their structural aria-label or associated <label> text
 * and the NLP-inferred action semantics. The feature triggers if a form
 * element's programmatic label (L_aria) maps to one action (e.g. "Opt out")
 * while its visual label text (L_visual) maps to its semantic opposite
 * (e.g. "Stay subscribed"), creating a structural double-bind.
 *
 *   SemanticDist(L_aria(N), L_visual(N)) > tau_label_mismatch
 *
 * Variant A (dark): the visible label says "keep me subscribed" but the
 * programmatic label behind the control says "opt me out".
 * Variant B (benign): both labels agree.
 */

const VISUAL_LABEL = "Keep me subscribed to the weekly newsletter";
const ARIA_LABEL_DARK = "Opt me out of the newsletter";
const ARIA_LABEL_BENIGN = "Keep me subscribed to the weekly newsletter";

export function TrickQuestionsCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [checked, setChecked] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const reset = () => {
    setChecked(false);
    setSaved(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Visual label (L_visual)</span>
        <span className="font-mono font-semibold tabular-nums max-w-[55%] truncate text-right">{VISUAL_LABEL}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Programmatic label (L_aria)</span>
        <span className="font-mono font-semibold tabular-nums max-w-[55%] truncate text-right text-rose-500">{ARIA_LABEL_DARK}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">SemanticDist(L_aria, L_visual)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">1.0 &gt; &tau;</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Trick Questions: Structural Label-Input Semantic Mismatch"
      caption="Structural Label-Input Semantic Mismatch — the visible label and the programmatic label of the same control say opposite things."
      auditorStats={stats}
      deltaNote="In Variant A the visible label ('keep me subscribed') and the programmatic label ('opt me out') are semantic opposites, so checking the box unsubscribes you. In Variant B both labels agree and the box does exactly what it says."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Newsletter subscription</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  You are currently subscribed. Manage your preference below.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                Subscribed
              </div>
            </div>

            <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="mt-0.5 flex-shrink-0 accent-emerald-500"
                aria-label={ARIA_LABEL_BENIGN}
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  {VISUAL_LABEL}
                </div>
                <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                  Check the box to confirm your subscription preference.
                </div>
              </div>
            </label>

            <button
              onClick={() => setSaved(true)}
              className="mt-2 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Save preferences
            </button>
          </div>

          {saved && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Preference saved
              </div>
              <p className="text-muted-foreground mt-0.5">
                The visible label and the programmatic label agree, so{" "}
                {checked ? "you remain subscribed exactly as the box says." : "your subscription status is unchanged — unchecking means you opted out, as labelled."}
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
              <h3 className="text-[11px] font-semibold">Newsletter subscription</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                You are currently subscribed. Manage your preference below.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
              Subscribed
            </div>
          </div>

          <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-0.5 flex-shrink-0 accent-rose-500"
              aria-label={ARIA_LABEL_DARK}
            />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                {VISUAL_LABEL}
              </div>
              <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                Check the box to confirm your subscription preference.
              </div>
            </div>
          </label>

          <button
            onClick={() => setSaved(true)}
            className="mt-2 w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Save preferences
          </button>
        </div>

        {saved && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Structural double-bind triggered
            </div>
            <p className="text-muted-foreground">
              You read <strong className="text-foreground">“{VISUAL_LABEL}”</strong> and checked the
              box — that looks like confirming your subscription. But the control&rsquo;s programmatic
              label is <strong className="text-rose-500">“{ARIA_LABEL_DARK}”</strong>, so the action
              executed was the semantic opposite: {checked ? "you have been UNSUBSCRIBED from the newsletter." : "the setting is interpreted as an opt-out request."}
            </p>
            <p className="text-muted-foreground">
              A screen reader or an automated agent reads L_aria, not the painted text — the two
              disagree, so humans and machines are told different stories about the same control.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
