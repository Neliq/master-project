"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Automating The User Away — Condition 1: Autonomous Action Execution
 *
 * Thesis: the system executes a primary, state-altering action entirely
 * independent of user intent, relying solely on an internal temporal or
 * state-based threshold τ_system:
 *
 *   A_critical = Executed  given  E_user = ∅ ∧ t ≥ τ_system
 *
 * Variant A (dark): two seconds after Episode 1 ends, Episode 2
 * auto-starts — no user click, no on-screen toggle or stop control
 * anywhere in the player. The system acts; the user must actively
 * interrupt. The queue is framed as plain "up next" continuity, with
 * no disclosure that the next episode will play on its own.
 * Variant B (benign): playback stops at the end of Episode 1 and waits
 * for an explicit Play click — E_user is always required.
 */

const EPISODES = ["Episode 1 — The Signal", "Episode 2 — The Return"];
const TAU_SYSTEM = 2;

export function AutomatingTheUserAwayCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [videoIdxA, setVideoIdxA] = React.useState(0);
  const [videoIdxB, setVideoIdxB] = React.useState(0);
  const [phaseA, setPhaseA] = React.useState<"ready" | "playing" | "ended">("ready");
  const [phaseB, setPhaseB] = React.useState<"ready" | "playing" | "ended">("ready");
  const [progressA, setProgressA] = React.useState(0);
  const [progressB, setProgressB] = React.useState(0);
  const [autoCountdownA, setAutoCountdownA] = React.useState(TAU_SYSTEM);
  const [autoStartedA, setAutoStartedA] = React.useState(false);
  const [logA, setLogA] = React.useState<string[]>([
    "Queue loaded.",
  ]);
  const [logB, setLogB] = React.useState<string[]>([
    "Queue loaded.",
  ]);

  const reset = () => {
    setVideoIdxA(0);
    setVideoIdxB(0);
    setPhaseA("ready");
    setPhaseB("ready");
    setProgressA(0);
    setProgressB(0);
    setAutoCountdownA(TAU_SYSTEM);
    setAutoStartedA(false);
    setLogA(["Queue loaded."]);
    setLogB(["Queue loaded."]);
  };

  const pushLog = (
    setLog: React.Dispatch<React.SetStateAction<string[]>>,
    entry: string,
  ) => setLog((l) => [entry, ...l].slice(0, 4));

  // Episode playback (simulated), isolated per variant.
  React.useEffect(() => {
    if (phaseA !== "playing") return;
    const id = window.setInterval(() => {
      setProgressA((p) => {
        const next = Math.min(100, p + 25); // 4 ticks × 1s
        if (next >= 100) setPhaseA("ended");
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [phaseA, videoIdxA]);

  React.useEffect(() => {
    if (phaseB !== "playing") return;
    const id = window.setInterval(() => {
      setProgressB((p) => {
        const next = Math.min(100, p + 25); // 4 ticks × 1s
        if (next >= 100) setPhaseB("ended");
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [phaseB, videoIdxB]);

  // Dark variant: autonomous execution after τ_system once the episode ends.
  React.useEffect(() => {
    if (phaseA !== "ended" || videoIdxA >= EPISODES.length - 1) return;
    let first = true;
    const id = window.setInterval(() => {
      if (first) {
        setAutoCountdownA(TAU_SYSTEM);
        first = false;
      }
      setAutoCountdownA((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          setAutoStartedA(true);
          setVideoIdxA((i) => i + 1);
          setProgressA(0);
          setPhaseA("playing");
          pushLog(setLogA, "Now playing: Episode 2 — The Return.");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [phaseA, videoIdxA]);

  const startPlayback = (v: "dark" | "benign") => {
    if (v === "dark") {
      setProgressA(0);
      setPhaseA("playing");
      pushLog(setLogA, `User clicked Play on ${EPISODES[videoIdxA]}.`);
      return;
    }
    setProgressB(0);
    setPhaseB("playing");
    pushLog(setLogB, `User clicked Play on ${EPISODES[videoIdxB]}.`);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A_critical (state-altering action)</span>
        <span className="font-mono font-semibold tabular-nums max-w-[55%] truncate text-right">Load Episode 2</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">E_user (explicit interaction)</span>
        <span className={`font-mono font-semibold tabular-nums ${autoStartedA ? "text-red-500" : "text-green-500"}`}>
          {autoStartedA ? "∅ (none)" : "required"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_system (internal threshold)</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_SYSTEM}.0s (dark)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Auto-advance</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">
          system-controlled
        </span>
      </div>
    </>
  ) : null;

  const renderPlayer = (isDark: boolean) => {
    const videoIdx = isDark ? videoIdxA : videoIdxB;
    const phase = isDark ? phaseA : phaseB;
    const progress = isDark ? progressA : progressB;
    const autoCountdown = isDark ? autoCountdownA : TAU_SYSTEM;
    const autoStarted = isDark && autoStartedA;
    const log = isDark ? logA : logB;
    const variant = isDark ? "dark" : "benign";

    return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[11px] font-semibold">Watchlist — night mode</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            {isDark
              ? "Up next: Episode 2 — The Return."
              : "Autoplay next: OFF — playback stops and waits for you."}
          </p>
        </div>
        <div className={`text-[8px] font-mono font-semibold uppercase tracking-wider rounded-full border px-2 py-0.5 shrink-0 ${
          isDark ? "text-red-500 border-red-500/30" : "text-green-500 border-green-500/30"
        }`}>
          {isDark ? "Autonomous" : "User-driven"}
        </div>
      </div>

      {/* Fake video surface */}
      <div className="relative mt-3 aspect-video overflow-hidden rounded-md border border-border bg-muted flex items-center justify-center">
        <div className="text-[10px] font-semibold text-muted-foreground">
          {phase === "playing" ? `Now playing — ${EPISODES[videoIdx]}` : EPISODES[videoIdx]}
        </div>
        {phase === "ended" && variant === "dark" && videoIdx === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-card rounded-md border border-red-500/40 px-4 py-2.5 text-center">
              <div className="text-[10px] font-semibold text-red-500">
                Up next — Episode 2 starts in {autoCountdown}s
              </div>
              <div className="text-[8px] text-muted-foreground mt-0.5">
                Episode 2 — The Return
              </div>
            </div>
          </div>
        )}
        {phase === "playing" && (
          <div className="absolute bottom-1.5 left-1.5 right-1.5">
            <div className="h-1 w-full rounded-full bg-black/40 overflow-hidden">
              <div className={`h-full rounded-full ${isDark ? "bg-red-500" : "bg-green-500"}`} style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-3">
        {phase === "ready" && (
          <button
            onClick={() => startPlayback(isDark ? "dark" : "benign")}
            className={`w-full rounded-md py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
              isDark
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            ▶ Play {EPISODES[videoIdx]}
          </button>
        )}
        {phase === "playing" && (
          <div className={`w-full rounded-md py-1.5 text-center text-[10px] font-medium ${
            isDark ? "bg-red-500/10 text-red-700 dark:text-red-300" : "bg-green-500/10 text-green-700 dark:text-green-300"
          }`}>
            Playing… {Math.floor(progress)}%
          </div>
        )}
        {phase === "ended" && videoIdx >= EPISODES.length - 1 && (
          <div className="text-[9px] text-muted-foreground text-center py-1">End of queue.</div>
        )}
        {phase === "ended" && variant === "benign" && videoIdx === 0 && (
          <div className="space-y-1.5">
            <div className="rounded-md border border-border bg-background p-2 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[9px] font-semibold">Next up — {EPISODES[1]}</div>
                <div className="text-[8px] text-muted-foreground">Playback stopped. Nothing starts without you.</div>
              </div>
              <button
                onClick={() => startPlayback("benign")}
                className="shrink-0 rounded-md bg-green-600 hover:bg-green-700 text-white px-2.5 py-1 text-[9px] font-medium transition-colors cursor-pointer"
              >
                ▶ Play
              </button>
            </div>
          </div>
        )}
        {phase === "ended" && variant === "dark" && autoStarted && videoIdx === 1 && (
          <div className="text-[9px] text-red-500/90 text-center py-1">
            Episode 2 is already playing — you never clicked anything.
          </div>
        )}
      </div>

      {/* Event log */}
      <div className="mt-3 rounded-md border border-border bg-background p-2 space-y-1">
        <div className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground">Event log</div>
        {log.map((entry, i) => (
          <div key={i} className={`text-[8px] leading-relaxed ${i === 0 ? "text-foreground/80" : "text-muted-foreground/70"}`}>
            {entry}
          </div>
        ))}
      </div>

      {autoStarted && isDark && (
        <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
          <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 9v4m0 4h.01" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            Autonomous action executed
          </div>
          <p className="text-muted-foreground mt-0.5">
            Episode 2 loaded on the system timer ({TAU_SYSTEM}s after Episode 1 ended), not
            because you asked. Nothing on this screen offers a stop or a toggle — the
            interface shifted from user-initiated action to system-initiated action that
            you must actively interrupt.
          </p>
        </div>
      )}
    </div>
    );
  };

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Automating The User Away: Autonomous Action Execution"
      userTitle="Streamly — Up next"
      caption="Autonomous Action Execution — the next video starts on a system timer, with no user input and no interruption affordance on screen."
      auditorStats={stats}
      deltaNote="Both variants play the same two episodes. Variant A frames Episode 2 as simply “up next” and auto-starts it two seconds after Episode 1 ends — no user interaction, no on-screen toggle, and no disclosure that the queue runs itself. Variant B stops at the end of Episode 1 and waits for an explicit Play click."
      benign={
        <div className="space-y-3">{renderPlayer(false)}</div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">{renderPlayer(true)}</div>
    </DemoShell>
  );
}
