"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2, Play } from "lucide-react";

/*
 * Countdown On Ads — Condition 1: Temporal Gating of Navigational Agency
 *
 * Thesis: B_skip is the interactive node required to dismiss the advertisement
 * and t_active is the time elapsed since the ad entered the viewport. The
 * feature triggers if the system disables or intercepts every dismiss
 * interaction until the hardcoded mandatory wait τ_lock (e.g. 15 seconds) is
 * strictly met:
 *
 *   State(B_skip, t_active) = Disabled  given  t_active < τ_lock
 *
 * Variant A (dark): the skip button is visible but disabled for 15s — clicks
 * are intercepted — and at zero the interface chains a SECOND ad with a fresh
 * 10s lock before releasing the user.
 * Variant B (benign): the identical ad with no countdown — the skip button
 * is enabled from the very first second, explicitly marked “Skippable now”,
 * so dismissal happens the moment the user asks.
 */

const LOCK_1 = 15; // s — first mandatory wait (thesis: τ_lock, e.g. 15s)
const LOCK_2 = 10; // s — chained second lock in the aggressive variant

export function CountdownOnAdsCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // ── Variant A: dark flow (ad1 → ad2 → playing) ──
  const [phaseA, setPhaseA] = React.useState<"idle" | "ad" | "playing">("idle");
  const [tActiveA, setTActiveA] = React.useState(0);
  const [skipAttempts, setSkipAttempts] = React.useState(0);
  const [interceptedFlash, setInterceptedFlash] = React.useState(false);

  // ── Variant B: benign flow (ad → playing) ──
  const [phaseB, setPhaseB] = React.useState<"idle" | "ad" | "playing">("idle");
  const [tActiveB, setTActiveB] = React.useState(0);

  const timersRef = React.useRef<number[]>([]);

  React.useEffect(
    () => () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    },
    []
  );

  // Tick the A countdown only while the ad chain is active. The phase is
  // derived from tActiveA: 0–15s → ad 1, 15–25s → chained ad 2, ≥25s → free.
  React.useEffect(() => {
    if (phaseA !== "ad") return;
    const iv = window.setInterval(() => setTActiveA((t) => t + 1), 1000);
    return () => window.clearInterval(iv);
  }, [phaseA]);

  React.useEffect(() => {
    if (phaseB !== "ad") return;
    const iv = window.setInterval(() => setTActiveB((t) => t + 1), 1000);
    return () => window.clearInterval(iv);
  }, [phaseB]);

  const stepA = tActiveA < LOCK_1 ? 1 : tActiveA < LOCK_1 + LOCK_2 ? 2 : 3; // 3 = playing
  const remainingA = stepA === 1 ? LOCK_1 - tActiveA : stepA === 2 ? LOCK_1 + LOCK_2 - tActiveA : 0;
  const skipDisabledA = stepA === 1 || stepA === 2;

  const trySkipA = () => {
    if (!skipDisabledA) {
      setPhaseA("playing");
      return;
    }
    setSkipAttempts((n) => n + 1);
    setInterceptedFlash(true);
    timersRef.current.push(window.setTimeout(() => setInterceptedFlash(false), 1200));
  };

  const skipB = () => {
    setPhaseB("playing");
  };

  const playA = () => {
    setPhaseA("ad");
    setTActiveA(0);
    setSkipAttempts(0);
  };

  const playB = () => {
    setPhaseB("ad");
    setTActiveB(0);
  };

  const reset = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    setPhaseA("idle");
    setTActiveA(0);
    setSkipAttempts(0);
    setInterceptedFlash(false);
    setPhaseB("idle");
    setTActiveB(0);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_lock (mandatory wait)</span>
        <span className="font-mono font-semibold tabular-nums">{LOCK_1}s → chained {LOCK_2}s</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">t_active (time in ad, A)</span>
        <span className="font-mono font-semibold tabular-nums">{tActiveA}s</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">State(B_skip)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">Disabled (A) / Enabled (B)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Intercepted dismiss attempts</span>
        <span className="font-mono font-semibold tabular-nums">{skipAttempts}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Countdown On Ads: Temporal Gating of Navigational Agency"
      caption="Temporal Gating of Navigational Agency — the skip affordance stays disabled until the hardcoded wait elapses, intercepting every attempt to leave the ad."
      auditorStats={stats}
      deltaNote="Variant A keeps the skip button disabled for 15s (clicks are intercepted) and then chains a second ad with a fresh 10s lock instead of releasing you. Variant B shows the identical ad with no countdown — the skip button is enabled from the first second and explicitly marked “Skippable now”, so dismissal is available the moment the user asks."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Streamly — watch the video</h3>
            {phaseB === "idle" && (
              <button
                onClick={playB}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
              >
                <Play className="size-3" /> Play video
              </button>
            )}

            {phaseB === "ad" && (
              <div className="relative mt-2 overflow-hidden rounded-md border border-emerald-500/30">
                <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-4 text-white">
                  <div className="text-[8px] font-semibold uppercase tracking-widest opacity-80">
                    Sponsored
                  </div>
                  <div className="mt-1 text-[12px] font-bold leading-tight">
                    Aurora Trek — the light jacket for all seasons
                  </div>
                  <div className="mt-1 text-[9px] opacity-90">
                    Waterproof, windproof, packable. Free returns for 90 days.
                  </div>
                  <div className="mt-2 inline-block rounded bg-white/20 px-2 py-1 text-[9px] font-semibold">
                    Shop now
                  </div>
                </div>
                <div className="flex items-center justify-between bg-background px-2 py-1.5">
                  <span className="text-[9px] font-semibold text-emerald-700 dark:text-emerald-300">
                    Skippable now — no wait
                  </span>
                  <button
                    onClick={skipB}
                    className="rounded bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1 text-[9px] font-semibold text-white transition-colors cursor-pointer"
                  >
                    Skip ad
                  </button>
                </div>
              </div>
            )}

            {phaseB === "playing" && (
              <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <CheckCircle2 className="size-3" />
                  Video playing
                </div>
                <p className="text-muted-foreground mt-0.5">
                  You skipped at t_active = {tActiveB}s —{" "}
                  <span className="font-mono text-foreground">State(B_skip) = Enabled</span> from the very
                  first second. Dismissal required zero waiting.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Streamly — watch the video</h3>
          {phaseA === "idle" && (
            <button
              onClick={playA}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-rose-600 hover:bg-rose-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              <Play className="size-3" /> Play video
            </button>
          )}

          {phaseA === "ad" && (
            <div className="relative mt-2 overflow-hidden rounded-md border border-rose-500/30">
              <div className="bg-gradient-to-br from-rose-600 to-orange-700 p-4 text-white">
                <div className="text-[8px] font-semibold uppercase tracking-widest opacity-80">
                  Sponsored
                </div>
                {stepA === 1 ? (
                  <>
                    <div className="mt-1 text-[12px] font-bold leading-tight">
                      Aurora Trek — the light jacket for all seasons
                    </div>
                    <div className="mt-1 text-[9px] opacity-90">
                      Waterproof, windproof, packable. Free returns for 90 days.
                    </div>
                    <div className="mt-2 inline-block rounded bg-white/20 px-2 py-1 text-[9px] font-semibold">
                      Shop now
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-1 text-[12px] font-bold leading-tight">
                      One more thing before you continue…
                    </div>
                    <div className="mt-1 text-[9px] opacity-90">
                      Aurora Trek Insulated — the winter edition is here. 30% off this week only.
                    </div>
                    <div className="mt-2 inline-block rounded bg-white/20 px-2 py-1 text-[9px] font-semibold">
                      Explore the sale
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between bg-background px-2 py-1.5">
                <span className="font-mono text-[9px] text-muted-foreground">
                  {stepA === 1 ? `${remainingA}s` : stepA === 2 ? `${remainingA}s (2nd ad)` : ""}
                </span>
                <button
                  onClick={trySkipA}
                  disabled={skipDisabledA}
                  aria-disabled={skipDisabledA}
                  className={`rounded px-2.5 py-1 text-[9px] font-semibold transition-colors ${
                    skipDisabledA
                      ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                      : "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                  }`}
                >
                  {skipDisabledA ? `Skip in ${remainingA}s` : "Skip ad"}
                </button>
              </div>
              {interceptedFlash && (
                <div className="flex items-center gap-1 border-t border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[8px] font-semibold text-amber-700 dark:text-amber-300">
                  <AlertTriangle className="size-2.5" />
                  Interaction intercepted — B_skip is Disabled while t_active &lt; τ_lock
                </div>
              )}
            </div>
          )}

          {phaseA === "playing" && (
            <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <AlertTriangle className="size-3" />
                Temporal gating enforced
              </div>
              <p className="text-muted-foreground">
                For {tActiveA}s the skip node was locked:
                <span className="font-mono text-foreground"> State(B_skip, t_active) = Disabled</span> given{" "}
                <span className="font-mono text-foreground">t_active &lt; τ_lock</span> — all{" "}
                {skipAttempts} dismiss attempt{skipAttempts === 1 ? "" : "s"} were intercepted.
              </p>
              <p className="text-muted-foreground">
                And when the first {LOCK_1}s lock expired, the interface didn’t release you — it chained a
                second ad with a fresh {LOCK_2}s timer. Ad-exposure was prioritized over user-intent at
                every step.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
