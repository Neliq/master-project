"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

/*
 * Pull To Refresh (Variable-Reward Trap) — Condition 2:
 * Artificial Anticipation Injection
 *
 * Thesis: the spinning indicator's duration is decoupled from technical
 * necessity. Δt_network is the time the backend actually needs to resolve the
 * payload; Δt_animation is the hardcoded minimum duration of the loading
 * indicator. The feature triggers if the interface holds the spinner past real
 * network latency, past a psychological suspense threshold τ_suspense
 * (typically 1.0–2.5 seconds):
 *
 *   Δt_animation ≫ Δt_network  ∧  Δt_animation ≥ τ_suspense
 *
 * Variant A (dark): the payload resolves in ~0.2s but the spinner is held for
 * a hardcoded 2.4s — anticipation is manufactured, not technical. The refresh
 * indicator itself shows the 2.4s target beside the actual payload time.
 * Variant B (benign): the identical feed and payload, but the spinner runs
 * only as long as the network actually takes.
 */

const ANIM_DELAY_A = 2400; // ms — hardcoded minimum spinner duration in A

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

export function PullToRefreshCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Shared feed payload.
  const [feed, setFeed] = React.useState<string[]>(() =>
    Array.from({ length: 3 }, (_, i) => postFor(i))
  );
  const [feedSeq, setFeedSeq] = React.useState(3);

  // Variant A timing.
  const [phaseA, setPhaseA] = React.useState<"idle" | "refreshing" | "done">("idle");
  const [elapsedA, setElapsedA] = React.useState(0);
  const [payloadReadyA, setPayloadReadyA] = React.useState(false);
  const [netA, setNetA] = React.useState<number | null>(null);
  const [netReadyMsA, setNetReadyMsA] = React.useState<number | null>(null);

  // Variant B timing.
  const [phaseB, setPhaseB] = React.useState<"idle" | "refreshing" | "done">("idle");
  const [elapsedB, setElapsedB] = React.useState(0);
  const [netB, setNetB] = React.useState<number | null>(null);

  const timersRef = React.useRef<number[]>([]);

  React.useEffect(
    () => () => {
      timersRef.current.forEach((id) => window.clearInterval(id));
    },
    []
  );

  const appendNext = () => {
    setFeed((prev) => [...prev, postFor(feedSeq)]);
    setFeedSeq((s) => s + 1);
  };

  const refreshA = () => {
    if (phaseA === "refreshing") return;
    const start = Date.now();
    const netDelay = 100 + Math.round(Math.random() * 150);
    setPhaseA("refreshing");
    setElapsedA(0);
    setPayloadReadyA(false);
    setNetReadyMsA(null);
    const iv = window.setInterval(() => {
      const elapsed = Date.now() - start;
      setElapsedA(Math.min(ANIM_DELAY_A, elapsed));
      if (elapsed >= netDelay) {
        setPayloadReadyA(true);
        setNetReadyMsA((prev) => (prev === null ? netDelay : prev));
      }
      if (elapsed >= ANIM_DELAY_A) {
        window.clearInterval(iv);
        setPhaseA("done");
        setNetA(netDelay);
        appendNext();
      }
    }, 50);
    timersRef.current.push(iv);
  };

  const refreshB = () => {
    if (phaseB === "refreshing") return;
    const start = Date.now();
    const netDelay = 250 + Math.round(Math.random() * 250);
    setPhaseB("refreshing");
    setElapsedB(0);
    const iv = window.setInterval(() => {
      const elapsed = Date.now() - start;
      setElapsedB(Math.min(netDelay, elapsed));
      if (elapsed >= netDelay) {
        window.clearInterval(iv);
        setPhaseB("done");
        setNetB(netDelay);
        appendNext();
      }
    }, 50);
    timersRef.current.push(iv);
  };

  const reset = () => {
    timersRef.current.forEach((id) => window.clearInterval(id));
    timersRef.current = [];
    setFeed(Array.from({ length: 3 }, (_, i) => postFor(i)));
    setFeedSeq(3);
    setPhaseA("idle");
    setElapsedA(0);
    setPayloadReadyA(false);
    setNetA(null);
    setNetReadyMsA(null);
    setPhaseB("idle");
    setElapsedB(0);
    setNetB(null);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δt_network (last fetch)</span>
        <span className="font-mono font-semibold tabular-nums">
          {netA !== null ? `${(netA / 1000).toFixed(2)}s` : "—"} (A) /{" "}
          {netB !== null ? `${(netB / 1000).toFixed(2)}s` : "—"} (B)
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δt_animation [A]</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">
          {(ANIM_DELAY_A / 1000).toFixed(2)}s — hardcoded
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δt_animation [B]</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">= Δt_network</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_suspense (threshold)</span>
        <span className="font-mono font-semibold tabular-nums">1.0–2.5s</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pull To Refresh (Variable-Reward Trap): Artificial Anticipation Injection"
      caption="Artificial Anticipation Injection — the spinner's duration is decoupled from network latency and held past a psychological suspense threshold, manufacturing anticipation the backend never required."
      auditorStats={stats}
      deltaNote="Variant A resolves the payload in ~0.2s but holds the spinner for a hardcoded 2.4s (Δt_animation ≫ Δt_network, above the 1.0–2.5s suspense threshold) — the refresh indicator itself shows the 2.4s target next to the actual payload time. Variant B shows the identical feed and payload, but the spinner lasts exactly as long as the network needs — no injected suspense."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">Pulse — your feed</h3>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                {feed.length} posts
              </span>
            </div>

            <div className="mt-2 h-44 space-y-1.5 overflow-y-auto rounded-md border bg-background p-2">
              {feed.map((p, i) => (
                <div key={i} className="rounded border border-border bg-card px-2 py-1.5 text-[9px] leading-snug text-foreground/80">
                  {p}
                </div>
              ))}
            </div>

            {phaseB === "refreshing" ? (
              <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5">
                <div className="flex items-center gap-1.5 text-[9px] text-emerald-700 dark:text-emerald-300">
                  <RefreshSpinner /> Refreshing — {Math.round(elapsedB)}ms
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${Math.min(100, (elapsedB / 500) * 100)}%` }}
                  />
                </div>
                <div className="mt-1 flex items-center justify-between text-[8px] text-muted-foreground">
                  <span>Δt_animation = Δt_network</span>
                  <span className="font-mono">spinner tracks the network</span>
                </div>
              </div>
            ) : (
              <button
                onClick={refreshB}
                className="mt-2 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Refresh feed
              </button>
            )}

            {phaseB === "done" && netB !== null && (
              <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <CheckCircle2 className="size-3" />
                  Animation tracks the network
                </div>
                <p className="text-muted-foreground mt-0.5">
                  The payload arrived in {(netB / 1000).toFixed(2)}s and the spinner stopped at the same
                  moment — <span className="font-mono text-foreground">Δt_animation = Δt_network</span>.
                  No suspense is injected beyond what the network actually needs.
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
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              {feed.length} posts
            </span>
          </div>

          <div className="mt-2 h-44 space-y-1.5 overflow-y-auto rounded-md border bg-background p-2">
            {feed.map((p, i) => (
              <div key={i} className="rounded border border-border bg-card px-2 py-1.5 text-[9px] leading-snug text-foreground/80">
                {p}
              </div>
            ))}
          </div>

          {phaseA === "refreshing" ? (
            <div className="mt-2 rounded-md border border-border bg-background p-2.5">
              <div className="flex items-center justify-between gap-2 text-[9px]">
                <span className="flex items-center gap-1.5 text-foreground">
                  <RefreshSpinner /> Refreshing — {Math.round(elapsedA)}ms of {ANIM_DELAY_A}ms
                </span>
                <span className="font-mono text-[8px] text-muted-foreground">
                  {payloadReadyA ? "payload ready" : "waiting on network"}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-rose-500 transition-all"
                  style={{ width: `${Math.min(100, (elapsedA / ANIM_DELAY_A) * 100)}%` }}
                />
              </div>
              {payloadReadyA && netReadyMsA !== null && (
                <div className="mt-1 text-[8px] text-muted-foreground">
                  Payload arrived in {netReadyMsA}ms — the spinner keeps running until{" "}
                  {ANIM_DELAY_A}ms.
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={refreshA}
              className="mt-2 w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Refresh feed
            </button>
          )}

          {phaseA === "done" && netA !== null && (
            <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <AlertTriangle className="size-3" />
                Anticipation injected
              </div>
              <p className="text-muted-foreground">
                The payload resolved in{" "}
                <span className="font-mono text-foreground">Δt_network = {(netA / 1000).toFixed(2)}s</span>,
                but the spinner was held for a hardcoded{" "}
                <span className="font-mono text-foreground">Δt_animation = {(ANIM_DELAY_A / 1000).toFixed(2)}s</span> —
                i.e. <span className="font-mono text-foreground">Δt_animation ≫ Δt_network</span> and
                <span className="font-mono text-foreground"> Δt_animation ≥ τ_suspense</span> (1.0–2.5s).
              </p>
              <p className="text-muted-foreground">
                The extra {(ANIM_DELAY_A - netA).toFixed(0)}ms of spinning served no technical purpose —
                the interface manufactured anticipation to maximize the dopamine spike before the reveal.
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
