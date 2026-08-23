"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

/*
 * Pull To Refresh (Variable-Reward Trap) — Condition 1:
 * Kinesthetic Resistance and Action Commitment
 *
 * Thesis: the user must apply deliberate tension against simulated elastic
 * friction R_elastic(ΔY) — a programmed friction function that non-linearly
 * slows visual displacement — until the displacement threshold τ_commit is
 * reached and the lever "snaps", releasing the refresh event E_refresh:
 *
 *   ΔY_touch(t) ≥ τ_commit  ∧  R_elastic > 0  ⟹  E_refresh() = True
 *
 * Variant A (dark): a lever-style pull. Hold to pull; resistance grows as the
 * pull deepens, and releasing before τ_commit snaps the lever back with no
 * refresh. Only sustained physical effort past the threshold triggers it.
 * Variant B (benign): the identical feed and payload through a plain Refresh
 * button — one tap fires the refresh, no threshold, no lever mechanics.
 */

const TAU_COMMIT = 80; // px — commitment threshold (thesis: τ_commit)

const POSTS = [
  "Morning run along the canal — 8 km done.",
  "Finally finished the shelf I've been building.",
  "This café's flat white is dangerously good.",
  "New plant on the windowsill. Name pending.",
  "Read 60 pages before the alarm even rang.",
  "The fog over the bay this morning was unreal.",
];

function postFor(i: number): string {
  return POSTS[i % POSTS.length];
}

export function PullToRefreshCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Shared feed: both panels show the same payload in the same order.
  const [feed, setFeed] = React.useState<string[]>(() =>
    Array.from({ length: 3 }, (_, i) => postFor(i))
  );
  const [feedSeq, setFeedSeq] = React.useState(3);
  const [refreshCount, setRefreshCount] = React.useState(0);
  const [committedA, setCommittedA] = React.useState(false);

  // Variant A lever mechanics (local to A).
  const [pull, setPull] = React.useState(0);
  const [pulling, setPulling] = React.useState(false);
  const [refreshingA, setRefreshingA] = React.useState(false);
  const pullRef = React.useRef(0);

  const timersRef = React.useRef<number[]>([]);

  React.useEffect(
    () => () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    },
    []
  );

  // Elastic friction: while held, displacement grows but decelerates
  // non-linearly (R_elastic > 0) — sustained effort is required.
  React.useEffect(() => {
    if (!pulling) return;
    const iv = window.setInterval(() => {
      pullRef.current = Math.min(130, pullRef.current + Math.max(2, 7 - pullRef.current / 20));
      setPull(pullRef.current);
    }, 60);
    return () => window.clearInterval(iv);
  }, [pulling]);

  const appendNext = () => {
    setFeed((prev) => [...prev, postFor(feedSeq)]);
    setFeedSeq((s) => s + 1);
    setRefreshCount((n) => n + 1);
  };

  const startPull = () => {
    if (refreshingA || pull > 0) return;
    setPulling(true);
  };

  const releasePull = () => {
    if (!pulling) return;
    setPulling(false);
    if (pullRef.current >= TAU_COMMIT) {
      // Threshold reached — the lever "snaps" and E_refresh() fires.
      setRefreshingA(true);
      setCommittedA(true);
      timersRef.current.push(
        window.setTimeout(() => {
          appendNext();
          pullRef.current = 0;
          setPull(0);
          setRefreshingA(false);
        }, 700)
      );
    } else {
      // Released too early — silent elastic snap-back, no refresh and no explanation.
      pullRef.current = 0;
      setPull(0);
    }
  };

  const refreshB = () => {
    if (refreshingA) return;
    setRefreshingA(true);
    timersRef.current.push(
      window.setTimeout(() => {
        appendNext();
        setRefreshingA(false);
      }, 400)
    );
  };

  const reset = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    pullRef.current = 0;
    setFeed(Array.from({ length: 3 }, (_, i) => postFor(i)));
    setFeedSeq(3);
    setRefreshCount(0);
    setCommittedA(false);
    setPull(0);
    setPulling(false);
    setRefreshingA(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">ΔY_touch (current pull)</span>
        <span className="font-mono font-semibold tabular-nums">{pull}px</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_commit (snap threshold)</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_COMMIT}px</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">R_elastic(ΔY) friction</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">&gt; 0 — non-linear (A) / = 0 (B)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">E_refresh()</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">needs ΔY ≥ τ_commit (A) / fires on tap (B)</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pull To Refresh (Variable-Reward Trap): Kinesthetic Resistance and Action Commitment"
      caption="Kinesthetic Resistance and Action Commitment — pulling must overcome non-linear elastic friction and cross the commitment threshold before the lever snaps and the refresh fires."
      auditorStats={stats}
      deltaNote="Variant A demands sustained physical effort against a hidden commitment threshold: the pull builds non-linear elastic resistance, but the threshold, the progress and the payoff are never disclosed — release too early and the gesture silently snaps back with nothing. Variant B delivers the identical feed payload through a plain Refresh button — one tap, no threshold, no lever physics."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">Pulse — your feed</h3>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                {feed.length} posts
              </span>
            </div>

            <div className="mt-2 h-48 space-y-1.5 overflow-y-auto rounded-md border bg-background p-2">
              {feed.map((p, i) => (
                <div key={i} className="rounded border border-border bg-card px-2 py-1.5 text-[9px] leading-snug text-foreground/80">
                  {p}
                </div>
              ))}
              {refreshingA && (
                <div className="flex items-center gap-1.5 rounded border border-green-500/30 bg-green-500/5 px-2 py-1.5 text-[9px] text-green-700 dark:text-green-300">
                  <RefreshSpinner /> Refreshing…
                </div>
              )}
            </div>

            <button
              onClick={refreshB}
              disabled={refreshingA}
              className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors ${
                refreshingA
                  ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              }`}
            >
              {refreshingA ? "Refreshing…" : "Refresh feed"}
            </button>
            <p className="mt-1 text-center text-[8px] text-muted-foreground">
              One tap — no resistance, no threshold.
            </p>

            {refreshCount >= 1 && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <CheckCircle2 className="size-3" />
                  No action commitment
                </div>
                <p className="text-muted-foreground mt-0.5">
                  The refresh fired the moment you tapped — no elastic resistance
                  (<span className="font-mono text-foreground">R_elastic = 0</span>) and no commitment
                  threshold. The user’s intent maps 1:1 to the action.
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
            <h3 className="text-[11px] font-semibold">Pulse — your feed</h3>
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              {feed.length} posts
            </span>
          </div>

          <div className="mt-2 h-48 space-y-1.5 overflow-y-auto rounded-md border bg-background p-2">
            {feed.map((p, i) => (
              <div key={i} className="rounded border border-border bg-card px-2 py-1.5 text-[9px] leading-snug text-foreground/80">
                {p}
              </div>
            ))}
            {refreshingA && (
              <div className="flex items-center gap-1.5 rounded border border-red-500/30 bg-red-500/5 px-2 py-1.5 text-[9px] text-red-600 dark:text-red-300">
                <RefreshSpinner /> Refreshing…
              </div>
            )}
          </div>

          {/* Lever mechanics — threshold, resistance and payoff are NOT disclosed */}
          <div className="mt-2 rounded-md border border-border bg-background p-2">
            <button
              onPointerDown={startPull}
              onPointerUp={releasePull}
              onPointerLeave={releasePull}
              disabled={refreshingA}
              className={`mt-1.5 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors select-none touch-none ${
                refreshingA
                  ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                  : pulling
                    ? "bg-red-700 text-white cursor-grabbing"
                    : "bg-red-600 hover:bg-red-700 text-white cursor-grab"
              }`}
            >
              {refreshingA
                ? "Refreshing…"
                : pulling
                  ? "Holding — keep pulling…"
                  : "Hold to pull down"}
            </button>
            <p className="mt-1 text-center text-[8px] text-muted-foreground">
              Pull down to load new posts.
            </p>
          </div>

          {committedA && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <AlertTriangle className="size-3" />
                Action commitment enforced
              </div>
              <p className="text-muted-foreground">
                The refresh only fired once
                <span className="font-mono text-foreground"> ΔY_touch(t) ≥ τ_commit</span> (80px) was met
                with <span className="font-mono text-foreground">R_elastic &gt; 0</span> — the friction
                function decelerated the pull, demanding sustained physical investment before the lever
                “snapped” and <span className="font-mono text-foreground">E_refresh() = True</span>.
              </p>
              <p className="text-muted-foreground">
                Every premature release cost the user effort with zero payoff — a high-engagement
                commitment ritual built around a single data-fetch action.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}

function RefreshSpinner() {
  return (
    <svg className="size-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
