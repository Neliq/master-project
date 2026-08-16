"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Auto-Play — Condition 3: Semantic Framing of Auto-Play as Content
 * Continuation
 *
 * Thesis: the algorithm inspects the labeling of the auto-play mechanism.
 * The feature triggers if the interface semantically frames automatic
 * content playback as a "next episode", "continue watching", or "up next"
 * feature without an explicit "autoplay enabled" disclosure, reframing an
 * automatic action as user-initiated continuity:
 *
 *   Frame(T_autoplay) in {Continuation, Next}
 *   AND NOT exists "autoplay" in T_visible
 *
 * Variant A (dark): "Up Next: Episode 4" auto-advances with a countdown,
 * and the word "autoplay" appears nowhere in the visible text.
 * Variant B (benign): the same end screen discloses the automation — an
 * "Autoplay: ON" toggle and a plain-language explanation.
 */

const COUNTDOWN_MAX = 5;

export function AutoPlayCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Dark panel: autoplay is always on and never disclosed.
  const [autoA, setAutoA] = React.useState(true);
  // Benign panel: autoplay is explicit and user-controllable.
  const [autoB, setAutoB] = React.useState(true);
  const [countA, setCountA] = React.useState(COUNTDOWN_MAX);
  const [countB, setCountB] = React.useState(COUNTDOWN_MAX);
  const [startedA, setStartedA] = React.useState(false);
  const [startedB, setStartedB] = React.useState(false);

  const reset = () => {
    setAutoA(true);
    setAutoB(true);
    setCountA(COUNTDOWN_MAX);
    setCountB(COUNTDOWN_MAX);
    setStartedA(false);
    setStartedB(false);
  };

  React.useEffect(() => {
    if (!autoA || startedA) return;
    const id = window.setInterval(() => {
      setCountA((c) => {
        if (c <= 1) {
          setStartedA(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [autoA, startedA]);

  React.useEffect(() => {
    if (!autoB || startedB) return;
    const id = window.setInterval(() => {
      setCountB((c) => {
        if (c <= 1) {
          setStartedB(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [autoB, startedB]);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Frame(T_autoplay)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{"{ Continuation, Next }"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Frame(T_autoplay)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">explicit disclosure</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&not;&exist; &ldquo;autoplay&rdquo; in T_visible</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">True — word absent</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&not;&exist; &ldquo;autoplay&rdquo; in T_visible</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">False — disclosed</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Auto-Play: Semantic Framing of Auto-Play as Content Continuation"
      caption="Semantic Framing of Auto-Play as Content Continuation — automatic playback is labeled 'Up Next' or 'Continue watching' with no 'autoplay' disclosure, reframing a system action as user-initiated continuity."
      auditorStats={stats}
      deltaNote="Variant A frames the auto-advance as 'Up Next' with a countdown and never prints the word 'autoplay' — the automation masquerades as continuity. Variant B keeps the identical end screen but adds an 'Autoplay: ON' toggle and a sentence that names autoplay explicitly, so the automatic behavior is disclosed and controllable."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">Streamly — end of episode</h3>
              <span className="rounded-full border border-emerald-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                Autoplay: {autoB ? "ON" : "OFF"}
              </span>
            </div>

            <div className="mt-2 rounded-md border border-border bg-background p-2.5">
              <div className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground">
                You finished Episode 3
              </div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold text-foreground/85">Episode 4 — The Reveal</div>
                  <div className="text-[8px] text-muted-foreground">
                    {startedB
                      ? "Now playing (autoplay)."
                      : autoB
                        ? `Autoplay is enabled — starting in ${countB}s`
                        : "Autoplay is off — episodes play only when you press play."}
                  </div>
                </div>
                {!startedB && !autoB && (
                  <button
                    onClick={() => setStartedB(true)}
                    className="shrink-0 rounded bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1 text-[9px] font-semibold text-white transition-colors cursor-pointer"
                  >
                    Play now
                  </button>
                )}
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2">
              <div>
                <div className="text-[9px] font-medium text-foreground/85">Autoplay</div>
                <div className="text-[8px] text-muted-foreground">
                  Autoplay is enabled — the next episode will play automatically.
                </div>
              </div>
              <button
                onClick={() => { setAutoB((v) => !v); setCountB(COUNTDOWN_MAX); setStartedB(false); }}
                role="switch"
                aria-checked={autoB}
                className={`relative h-4 w-7 shrink-0 rounded-full transition-colors cursor-pointer ${
                  autoB ? "bg-emerald-500" : "bg-foreground/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${
                    autoB ? "left-3.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[11px] font-semibold">Streamly — end of episode</h3>
            <span className="rounded-full border border-rose-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-rose-600 dark:text-rose-400">
              Up next
            </span>
          </div>

          <div className="mt-2 rounded-md border border-rose-500/30 bg-rose-500/5 p-2.5">
            <div className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground">
              Continue watching
            </div>
            <div className="mt-1 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[10px] font-semibold text-foreground/85">Episode 4 — The Reveal</div>
                <div className="text-[8px] text-muted-foreground">
                  {startedA
                    ? "Now playing."
                    : `Up next — starting in ${countA}s`}
                </div>
              </div>
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-rose-500" fill="currentColor">
                <path d="M4 5v14l13-7L4 5z" />
              </svg>
            </div>
          </div>

          <p className="mt-2 text-[8px] text-muted-foreground/60">
            Nothing here says &ldquo;autoplay.&rdquo; The word appears nowhere on this screen —
            the automatic start is framed purely as your seamless viewing experience.
          </p>
          {startedA && (
            <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Framed as continuity, not automation
              </div>
              <p className="text-muted-foreground">
                The countdown said &ldquo;Up next&rdquo; and &ldquo;Continue watching&rdquo; —{" "}
                <span className="font-mono">Frame(T_autoplay) &isin; {"{Continuation, Next}"}</span>{" "}
                while <span className="font-mono">&not;&exist; &ldquo;autoplay&rdquo; &isin; T_visible</span>.
                You were never told the system was auto-advancing, so the automatic action felt
                like your own continuity.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
