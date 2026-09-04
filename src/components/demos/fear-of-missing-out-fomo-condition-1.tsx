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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [secondsA, setSecondsA] = React.useState(DELTA_T);
  const [secondsB, setSecondsB] = React.useState(DELTA_T);
  const [sessionsA, setSessionsA] = React.useState(0);
  const [sessionsB, setSessionsB] = React.useState(0);
  const [resets, setResets] = React.useState(0);
  const [darkRevealed, setDarkRevealed] = React.useState(false);
  const [benignRevealed, setBenignRevealed] = React.useState(false);
  const [boughtA, setBoughtA] = React.useState(false);
  const [boughtB, setBoughtB] = React.useState(false);


  // One shared, genuinely-decrementing deadline (the "server-side" clock).
  React.useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsA((s) => (s > 0 ? s - 1 : 0));
      setSecondsB((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const startDarkSession = () => {
    setSessionsA((c) => c + 1);
    setResets((c) => c + 1);
    setSecondsA(DELTA_T); // T(s₁) ≈ Δt — deterministic reset
    setDarkRevealed(true);
  };

  const startBenignSession = () => {
    setSessionsB((c) => c + 1);
    setBenignRevealed(true); // timer untouched: T(s₁) = T(s₀) − elapsed
  };

  return (
    <DemoShell mode={mode}
      title="Fear Of Missing Out (FOMO): Artificial Temporal Scarcity"
      userTitle="AeroGlide X — Flash sale"
      caption="Artificial Temporal Scarcity — a countdown that deterministically resets its full duration on every new session instead of reflecting a genuine, universal deadline."
      deltaNote="Variant A’s “new session” button resets the shared countdown to a full 14:59 (T(s₁) ≈ Δt — fabricated urgency). Variant B’s identical button leaves the countdown untouched, so it continues from its current value like a real server-side deadline."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">AeroGlide X Wireless Headphones</h3>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Flash deal
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-md border border-green-500/30 bg-green-500/5 px-3 py-2">
              <Timer className="size-3.5 text-green-600 dark:text-green-400 shrink-0" />
              <div className="flex-1">
                <div className="text-[8px] uppercase tracking-wider text-muted-foreground">Shared global deadline</div>
                <div className="font-mono text-[16px] font-bold tabular-nums text-green-700 dark:text-green-300">
                  {fmt(secondsB)}
                </div>
              </div>
              <div className="text-right text-[8px] text-muted-foreground">
                <div>Session #{sessionsB}</div>
                <div className="font-mono">Deadline: {fmt(secondsB)}</div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
              <span className="line-through">$195</span>
              <span className="font-semibold text-foreground">$119</span>
            </div>

            <button
              onClick={() => setBoughtB(true)}
              disabled={boughtB}
              className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[10px] font-medium transition-colors ${
                boughtB
                  ? "bg-muted text-muted-foreground/60 cursor-default"
                  : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              }`}
            >
              <ShoppingCart className="size-3" />
              {boughtB ? "Order confirmed" : "Buy now — $119"}
            </button>

            <button
              onClick={startBenignSession}
              className="mt-1.5 flex w-full items-center justify-center gap-1.5 rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <RefreshCw className="size-3" />
              Simulate new session (clear cookies)
            </button>

            {benignRevealed && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Global deadline preserved
                </div>
                <p className="text-muted-foreground mt-0.5">
                  The countdown continued from its current value because the deadline is shared across
                  sessions. Starting over did not add time to the offer.
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
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Flash deal
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/5 px-3 py-2">
            <Timer className="size-3.5 text-red-600 dark:text-red-400 shrink-0 animate-pulse" />
            <div className="flex-1">
              <div className="text-[8px] uppercase tracking-wider text-muted-foreground">Deal ends in</div>
              <div className="font-mono text-[16px] font-bold tabular-nums text-red-700 dark:text-red-300">
                {fmt(secondsA)}
              </div>
            </div>
            <div className="text-right text-[8px] text-muted-foreground">
              <div>Session #{sessionsA}</div>
              <div className="font-mono">Deadline: {fmt(secondsA)}</div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
            <span className="line-through">$195</span>
            <span className="font-semibold text-foreground">$119</span>
            <span className="text-[8px] font-semibold uppercase tracking-wider text-red-500">Only today</span>
          </div>

          <button
            onClick={() => setBoughtA(true)}
            disabled={boughtA}
            className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[10px] font-medium transition-colors ${
              boughtA
                ? "bg-muted text-muted-foreground/60 cursor-default"
                : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            }`}
          >
            <ShoppingCart className="size-3" />
            {boughtA ? "Order confirmed" : "Buy now — $119"}
          </button>

          <button
            onClick={startDarkSession}
            className="mt-1.5 flex w-full items-center justify-center gap-1.5 rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <RefreshCw className="size-3" />
            Simulate new session (clear cookies)
          </button>

          {darkRevealed && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Limited-time offer
              </div>
              <p className="text-muted-foreground">
                After “starting a new session” the countdown returned to a full {fmt(DELTA_T)}. The offer
                timer is ready for another look, and this session has been restarted {resets} time{resets === 1 ? "" : "s"}.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
