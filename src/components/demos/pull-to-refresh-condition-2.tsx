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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  // Shared feed payload.
  const [feedA, setFeedA] = React.useState<string[]>(() =>
    Array.from({ length: 3 }, (_, i) => postFor(i))
  );
  const [feedB, setFeedB] = React.useState<string[]>(() =>
    Array.from({ length: 3 }, (_, i) => postFor(i))
  );
  const [feedSeqA, setFeedSeqA] = React.useState(3);
  const [feedSeqB, setFeedSeqB] = React.useState(3);

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

  const appendNext = (side: "A" | "B") => {
    if (side === "A") {
      setFeedA((prev) => [...prev, postFor(feedSeqA)]);
      setFeedSeqA((s) => s + 1);
    } else {
      setFeedB((prev) => [...prev, postFor(feedSeqB)]);
      setFeedSeqB((s) => s + 1);
    }
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
        appendNext("A");
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
        appendNext("B");
      }
    }, 50);
    timersRef.current.push(iv);
  };


  return (
    <DemoShell mode={mode}
      title="Pull To Refresh (Variable-Reward Trap): Artificial Anticipation Injection"
      userTitle="Pulse — Your feed"
      caption="Artificial Anticipation Injection — the spinner's duration is decoupled from network latency and held past a psychological suspense threshold, manufacturing anticipation the backend never required."
      deltaNote="Variant A resolves the payload in ~0.2s but holds the spinner for a hardcoded 2.4s (Δt_animation ≫ Δt_network, above the 1.0–2.5s suspense threshold) — the refresh indicator itself shows the 2.4s target next to the actual payload time. Variant B shows the identical feed and payload, but the spinner lasts exactly as long as the network needs — no injected suspense."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">Pulse — your feed</h3>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
                {feedB.length} posts
              </span>
            </div>

            <div className="mt-2 h-44 space-y-1.5 overflow-y-auto rounded-md border bg-background p-2">
              {feedB.map((p, i) => (
                <div key={i} className="rounded border border-border bg-card px-2 py-1.5 text-[9px] leading-snug text-foreground/80">
                  {p}
                </div>
              ))}
            </div>

            {phaseB === "refreshing" ? (
              <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5">
                <div className="flex items-center gap-1.5 text-[9px] text-foreground">
                  <RefreshSpinner /> Refreshing — {Math.round(elapsedB)}ms
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${Math.min(100, (elapsedB / 500) * 100)}%` }}
                  />
                </div>
                <div className="mt-1 flex items-center justify-between text-[8px] text-muted-foreground">
                  <span>Updating your feed</span>
                  <span className="font-mono">finishing soon</span>
                </div>
              </div>
            ) : (
              <button
                onClick={refreshB}
                className="mt-2 w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Refresh feed
              </button>
            )}

            {phaseB === "done" && netB !== null && (
              <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                  <CheckCircle2 className="size-3" />
                  Feed updated
                </div>
                <p className="text-muted-foreground mt-0.5">
                  The latest posts arrived in {(netB / 1000).toFixed(2)}s and the update finished as soon
                  as they were ready.
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
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
              {feedA.length} posts
            </span>
          </div>

          <div className="mt-2 h-44 space-y-1.5 overflow-y-auto rounded-md border bg-background p-2">
            {feedA.map((p, i) => (
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
                  {payloadReadyA ? "posts ready" : "updating"}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
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
              className="mt-2 w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Refresh feed
            </button>
          )}

          {phaseA === "done" && netA !== null && (
            <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <AlertTriangle className="size-3" />
                Feed updated
              </div>
              <p className="text-muted-foreground">
                The latest posts were ready after {(netA / 1000).toFixed(2)}s, but the loading animation
                continued for a little longer before the feed settled.
              </p>
              <p className="text-muted-foreground">
                The extra {(ANIM_DELAY_A - netA).toFixed(0)}ms of spinning served no technical purpose —
                The update will appear shortly.
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
