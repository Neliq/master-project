"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { RefreshCw, ShoppingCart, Timer } from "lucide-react";

/*
 * Fear Of Missing Out (FOMO) — Condition 1: Artificial Temporal Scarcity
 *
 * Thesis: capture the parsed remaining time T(s_i) at a given session load
 * state s_i and compare across two independent, sequential sessions s_0
 * and s_1 (e.g. clearing cookies / incognito). The feature triggers if the
 * countdown fails to maintain a global server-side state and
 * deterministically resets its duration Δt on every new session:
 *
 *   T(s_0) ≈ Δt  ∧  T(s_1) ≈ Δt  ⟹  Fabricated Urgency
 *
 * Variant A (dark): the "new session" button resets the shared countdown
 * to a full 14:59 — the deadline is per-session, never global.
 * Variant B (benign): a new session does NOT touch the countdown — it
 * continues from its current value, reflecting a universal server-side
 * deadline. Both panels share the same live timer, so the divergence is
 * visible in real time.
 */

const DELTA_T = 14 * 60 + 59; // 14:59 — the "offer duration" Δt

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function FearOfMissingOutFomoCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [secondsLeft, setSecondsLeft] = React.useState(DELTA_T);
  const [sessions, setSessions] = React.useState(0);
  const [resets, setResets] = React.useState(0);
  const [darkRevealed, setDarkRevealed] = React.useState(false);
  const [benignRevealed, setBenignRevealed] = React.useState(false);
  const [bought, setBought] = React.useState(false);

  const reset = () => {
    setSecondsLeft(DELTA_T);
    setSessions(0);
    setResets(0);
    setDarkRevealed(false);
    setBenignRevealed(false);
    setBought(false);
  };

  // One shared, genuinely-decrementing deadline (the "server-side" clock).
  React.useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const startDarkSession = () => {
    setSessions((c) => c + 1);
    setResets((c) => c + 1);
    setSecondsLeft(DELTA_T); // T(s₁) ≈ Δt — deterministic reset
    setDarkRevealed(true);
  };

  const startBenignSession = () => {
    setSessions((c) => c + 1);
    setBenignRevealed(true); // timer untouched: T(s₁) = T(s₀) − elapsed
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δ t (offer duration)</span>
        <span className="font-mono font-semibold tabular-nums">14:59 (899 s)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">T(s₀) at load</span>
        <span className="font-mono font-semibold tabular-nums">≈ Δ t</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">T(s₁) after new session (A)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{resets > 0 ? `≈ Δ t — reset ×${resets}` : "—"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Sessions simulated</span>
        <span className="font-mono font-semibold tabular-nums">{sessions}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Fear Of Missing Out (FOMO): Artificial Temporal Scarcity"
      caption="Artificial Temporal Scarcity — a countdown that deterministically resets its full duration on every new session instead of reflecting a genuine, universal deadline."
      auditorStats={stats}
      deltaNote="Variant A’s “new session” button resets the shared countdown to a full 14:59 (T(s₁) ≈ Δt — fabricated urgency). Variant B’s identical button leaves the countdown untouched, so it continues from its current value like a real server-side deadline."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">AeroGlide X Wireless Headphones</h3>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                Flash deal
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-3 py-2">
              <Timer className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="flex-1">
                <div className="text-[8px] uppercase tracking-wider text-muted-foreground">Shared global deadline</div>
                <div className="font-mono text-[16px] font-bold tabular-nums text-emerald-700 dark:text-emerald-300">
                  {fmt(secondsLeft)}
                </div>
              </div>
              <div className="text-right text-[8px] text-muted-foreground">
                <div>Session #{sessions}</div>
                <div className="font-mono">T(s) = {fmt(secondsLeft)}</div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
              <span className="line-through">$195</span>
              <span className="font-semibold text-foreground">$119</span>
            </div>

            <button
              onClick={() => setBought(true)}
              disabled={bought}
              className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[10px] font-medium transition-colors ${
                bought
                  ? "bg-muted text-muted-foreground/60 cursor-default"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              }`}
            >
              <ShoppingCart className="size-3" />
              {bought ? "Order confirmed" : "Buy now — $119"}
            </button>

            <button
              onClick={startBenignSession}
              className="mt-1.5 flex w-full items-center justify-center gap-1.5 rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <RefreshCw className="size-3" />
              Simulate new session (clear cookies)
            </button>

            {benignRevealed && (
              <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Global deadline preserved
                </div>
                <p className="text-muted-foreground mt-0.5">
                  T(s₁) = T(s₀) − elapsed: the countdown continued from its current value because it reflects a
                  server-side, universal deadline. New sessions cannot restart it.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[11px] font-semibold">AeroGlide X Wireless Headphones</h3>
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              Flash deal
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-md border border-rose-500/30 bg-rose-500/5 px-3 py-2">
            <Timer className="size-3.5 text-rose-600 dark:text-rose-400 shrink-0 animate-pulse" />
            <div className="flex-1">
              <div className="text-[8px] uppercase tracking-wider text-muted-foreground">Deal ends in</div>
              <div className="font-mono text-[16px] font-bold tabular-nums text-rose-700 dark:text-rose-300">
                {fmt(secondsLeft)}
              </div>
            </div>
            <div className="text-right text-[8px] text-muted-foreground">
              <div>Session #{sessions}</div>
              <div className="font-mono">T(s) = {fmt(secondsLeft)}</div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
            <span className="line-through">$195</span>
            <span className="font-semibold text-foreground">$119</span>
            <span className="text-[8px] font-semibold uppercase tracking-wider text-rose-500">Only today</span>
          </div>

          <button
            onClick={() => setBought(true)}
            disabled={bought}
            className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[10px] font-medium transition-colors ${
              bought
                ? "bg-muted text-muted-foreground/60 cursor-default"
                : "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
            }`}
          >
            <ShoppingCart className="size-3" />
            {bought ? "Order confirmed" : "Buy now — $119"}
          </button>

          <button
            onClick={startDarkSession}
            className="mt-1.5 flex w-full items-center justify-center gap-1.5 rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <RefreshCw className="size-3" />
            Simulate new session (clear cookies)
          </button>

          {darkRevealed && (
            <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Fabricated urgency
              </div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">T(s₀) ≈ Δ t</strong> and <strong className="text-foreground">T(s₁) ≈ Δ t</strong> — after
                “clearing cookies” the countdown is back at a full {fmt(DELTA_T)}. A genuine deadline is global:
                every session must show the same remaining time. Here the timer has no server-side state and
                resets deterministically per session ({resets} reset{resets === 1 ? "" : "s"} so far).
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
