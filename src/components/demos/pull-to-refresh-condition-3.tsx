"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2, Info, Sparkles } from "lucide-react";

/*
 * Pull To Refresh (Variable-Reward Trap) — Condition 3:
 * Semantic Variability of Refresh-Outcome Messaging
 *
 * Thesis: the algorithm monitors the textual content of refresh-feedback
 * messages over k consecutive refreshes. The feature triggers if the semantic
 * content follows a variable-ratio schedule — novel, high-valence content on
 * an unpredictable subset of refreshes — quantified by a semantic-novelty
 * variance exceeding a slot-machine threshold:
 *
 *   σ²({Novelty(T_i) : i = 1 … k}) > τ_slot_machine
 *
 * Variant A (dark): outcomes are drawn from a variable-ratio schedule — mostly
 * mundane, occasionally a high-valence surprise — so the variance stays above
 * the slot-machine threshold and the user keeps pulling.
 * Variant B (benign): the identical feed, but every refresh returns the same
 * deterministic outcome — variance collapses to zero, no reward loop.
 */

const K = 8; // window of consecutive refresh actions
const TAU_SLOT_MACHINE = 0.15; // novelty-variance threshold

const MUNDANE = [
  { title: "No new notifications", body: "Your feed is up to date.", valence: 0 },
  { title: "3 new posts", body: "From accounts you follow — nothing urgent.", valence: 0 },
  { title: "Still up to date", body: "Nothing changed since your last refresh.", valence: 0 },
  { title: "Quiet hour", body: "No activity in the last few minutes.", valence: 0 },
];

const HIGH_VALENCE = [
  { title: "Maya replied to your story", body: "She shared a note about this morning's walk.", valence: 1 },
  { title: "Your photo was featured", body: "People in your network are reacting to it now.", valence: 1 },
  { title: "Seven-day streak complete", body: "Your week of check-ins is now in your activity history.", valence: 1 },
];

const A_OUTCOMES = [
  MUNDANE[0], MUNDANE[1], HIGH_VALENCE[0], MUNDANE[2],
  MUNDANE[3], HIGH_VALENCE[1], MUNDANE[0], HIGH_VALENCE[2],
];

function variance(nums: number[]): number {
  if (nums.length < 2) return 0;
  const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
  return nums.reduce((a, b) => a + (b - mean) ** 2, 0) / nums.length;
}

export function PullToRefreshCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [historyA, setHistoryA] = React.useState<number[]>([]);
  const [historyB, setHistoryB] = React.useState<number[]>([]);
  const [outcomeA, setOutcomeA] = React.useState<{ title: string; body: string; valence: number } | null>(null);
  const [outcomeB, setOutcomeB] = React.useState<{ title: string; body: string; valence: number } | null>(null);
  const [refreshingA, setRefreshingA] = React.useState(false);
  const [refreshingB, setRefreshingB] = React.useState(false);
  const [refreshesA, setRefreshesA] = React.useState(0);

  const timersRef = React.useRef<number[]>([]);

  React.useEffect(
    () => () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    },
    []
  );

  const refreshA = () => {
    if (refreshingA) return;
    setRefreshingA(true);
    timersRef.current.push(
      window.setTimeout(() => {
        const pick = A_OUTCOMES[historyA.length % A_OUTCOMES.length];
        setOutcomeA(pick);
        setHistoryA((prev) => [...prev, pick.valence].slice(-K));
        setRefreshesA((n) => n + 1);
        setRefreshingA(false);
      }, 500)
    );
  };

  // Deterministic outcome: identical message on every single refresh.
  const refreshB = () => {
    if (refreshingB) return;
    setRefreshingB(true);
    timersRef.current.push(
      window.setTimeout(() => {
        const pick = MUNDANE[0];
        setOutcomeB(pick);
        setHistoryB((prev) => [...prev, pick.valence].slice(-K));
        setRefreshingB(false);
      }, 500)
    );
  };


  const varA = variance(historyA);
  const varB = variance(historyB);
  const hitsA = historyA.filter((v) => v === 1).length;

  return (
    <DemoShell mode={mode}
      title="Pull To Refresh (Variable-Reward Trap): Semantic Variability of Refresh-Outcome Messaging"
      userTitle="Nest — Your network"
      caption="Semantic Variability of Refresh-Outcome Messaging — refresh feedback follows a variable-ratio schedule, with novel high-valence surprises arriving on an unpredictable subset of pulls."
      deltaNote="Variant A draws each outcome from a variable-ratio schedule: mostly mundane messages with high-valence surprises on an unpredictable ~25% of refreshes, keeping the novelty variance above τ_slot_machine. Variant B returns the identical feed with a deterministic outcome every time, so the variance collapses to zero and no reward loop forms."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">Nest — your network</h3>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
                Deterministic
              </span>
            </div>

            <div className="mt-2 min-h-[72px] rounded-md border border-border/60 bg-muted/40 p-2.5">
              {outcomeB ? (
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-foreground">
                    <Info className="size-3 text-foreground" />
                    {outcomeB.title}
                  </div>
                  <p className="mt-0.5 text-[9px] text-muted-foreground">{outcomeB.body}</p>
                </div>
              ) : (
                <p className="text-[9px] text-muted-foreground">
                  Pull to refresh a few times — you’ll get the same message every single time.
                </p>
              )}
            </div>

            <button
              onClick={refreshB}
              disabled={refreshingB}
              className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors ${
                refreshingB
                  ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
              }`}
            >
              {refreshingB ? "Refreshing…" : "Pull to refresh"}
            </button>
            <p className="mt-1 text-center text-[8px] text-muted-foreground">
              Refresh #{historyB.length} — outcome identical to all previous ones.
            </p>

            {historyB.length >= 3 && (
              <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                  <CheckCircle2 className="size-3" />
                  No variable reward
                </div>
                <p className="text-muted-foreground mt-0.5">
                  Every refresh returned the same semantic content, so
                  <span className="font-mono text-foreground"> σ²({`{Novelty(T_i) : i = 1 … k}`}) = {varB.toFixed(3)}</span> —
                  far below <span className="font-mono text-foreground">τ_slot_machine</span>. There is no
                  unpredictable payoff, so nothing conditions the user to keep pulling.
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
            <h3 className="text-[11px] font-semibold">Nest — your network</h3>
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
              Surprise drops
            </span>
          </div>

          <div className="mt-2 min-h-[72px] rounded-md border border-border/60 bg-muted/40 p-2.5">
            {outcomeA ? (
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-foreground">
                  {outcomeA.valence === 1 ? (
                    <Sparkles className="size-3 text-foreground" />
                  ) : (
                    <Info className="size-3 text-muted-foreground" />
                  )}
                  {outcomeA.title}
                </div>
                <p className="mt-0.5 text-[9px] text-muted-foreground">{outcomeA.body}</p>
              </div>
            ) : (
              <p className="text-[9px] text-muted-foreground">
                Pull to refresh a few times. Most pulls give you nothing special — but some… surprise you.
              </p>
            )}
          </div>

          <button
            onClick={refreshA}
            disabled={refreshingA}
            className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors ${
              refreshingA
                ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                : "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
            }`}
          >
            {refreshingA ? "Refreshing…" : "Pull to refresh"}
          </button>
          <p className="mt-1 text-center text-[8px] text-muted-foreground">
            Refresh #{historyA.length} — will this be the one that pays off?
          </p>

          {mode === "auditor" && refreshesA >= 6 && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <AlertTriangle className="size-3" />
                Feed refreshed
              </div>
              <p className="text-muted-foreground">
                Over the last {Math.min(historyA.length, K)} refreshes the semantic-novelty variance is
                <span className="font-mono text-foreground"> σ² = {varA.toFixed(3)} &gt; τ_slot_machine ({TAU_SLOT_MACHINE})</span>,
                with high-valence outcomes landing on an unpredictable subset ({hitsA} of{" "}
                {Math.min(historyA.length, K)}) — a variable-ratio reinforcement schedule.
              </p>
              <p className="text-muted-foreground">
                You can’t predict whether the next pull yields a social reward, mundane content, or
                nothing — exactly the uncertainty that drives compulsive re-checking.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
