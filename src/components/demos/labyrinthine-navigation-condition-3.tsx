"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Labyrinthine Navigation — Condition 3: Semantic Obfuscation
 *
 * Thesis: P = (e_1, ..., e_k) is the sequence of interaction edges
 * required to reach v_target. Each edge label L(e_i) is compared against
 * Topic(v_target), the core semantic vector of the destination. The
 * feature triggers if any intermediate label deliberately lacks semantic
 * correlation with the target action — the similarity score drops below
 * the required threshold tau_semantic, destroying information scent:
 *
 *   exists e_i in P : Sim(L(e_i), Topic(v_target)) < tau_semantic
 *
 * Variant A (dark): the road to "delete my account" runs through labels
 * like "Storage management" and "Usage & diagnostics" that say nothing
 * about deletion, so the user must guess the pathway.
 * Variant B (benign): every label on the path is semantically on-topic.
 */

const TAU_SEMANTIC = 0.5;

interface Edge {
  label: string;
  sim: number;
  target?: boolean;
}

const DARK_PATH: Edge[] = [
  { label: "More options", sim: 0.23 },
  { label: "Usage & diagnostics", sim: 0.18 },
  { label: "System resources", sim: 0.14 },
  { label: "Legal & compliance", sim: 0.31 },
  { label: "Storage management", sim: 0.12 },
  { label: "Account lifecycle", sim: 0.41 },
  { label: "Terminate account", sim: 0.96, target: true },
];

const BENIGN_PATH: Edge[] = [
  { label: "Settings", sim: 0.91 },
  { label: "Account", sim: 0.88 },
  { label: "Delete account", sim: 0.97, target: true },
];

export function LabyrinthineNavigationCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [darkStep, setDarkStep] = React.useState(0);
  const [benignStep, setBenignStep] = React.useState(0);
  const [confirming, setConfirming] = React.useState(false);
  const [outcome, setOutcome] = React.useState<"none" | "deleted">("none");

  const reset = () => {
    setDarkStep(0);
    setBenignStep(0);
    setConfirming(false);
    setOutcome("none");
  };

  const minDarkSim = Math.min(...DARK_PATH.filter((e) => !e.target).map((e) => e.sim));
  const minBenignSim = Math.min(...BENIGN_PATH.filter((e) => !e.target).map((e) => e.sim));

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">min Sim(L(e_i), Topic(v_target)) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{minDarkSim.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">min Sim — benign</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{minBenignSim.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Required threshold &tau;_semantic</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_SEMANTIC.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Trigger: {minDarkSim.toFixed(2)} &lt; {TAU_SEMANTIC.toFixed(2)}</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">TRUE</span>
      </div>
    </>
  ) : null;

  const renderPath = (path: Edge[], step: number, accent: "rose" | "emerald") => {
    const current = path[Math.min(step, path.length - 1)];
    return (
      <div className="rounded-md border bg-card p-3">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-[11px] font-semibold">
            {current.target ? current.label : current.label}
          </h3>
          <span className="rounded-full border border-border px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-muted-foreground">
            step {step + 1} / {path.length}
          </span>
        </div>
        <div className="mb-2 flex flex-wrap items-center gap-1 text-[8px] text-muted-foreground/60">
          <span>Home</span>
          {path.slice(0, Math.min(step + 1, path.length)).map((e, i) => (
            <span key={i} className="flex items-center gap-1">
              <span>→</span>
              <span className={i === Math.min(step, path.length - 1) ? "text-foreground/80" : ""}>{e.label}</span>
            </span>
          ))}
        </div>
        {current.target ? (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2 text-[9px] text-muted-foreground">
            {step + 1 === path.length
              ? "You reached the destination. Confirm below."
              : "Destination reached — this is v_target."}
          </div>
        ) : (
          <div className="space-y-1.5">
            {path.slice(step).map((e, i) => (
              <button
                key={e.label}
                onClick={() => {
                  if (i === 0) {
                    if (e.target) setConfirming(true);
                    else if (accent === "rose") setDarkStep((s) => s + 1);
                    else setBenignStep((s) => s + 1);
                  }
                }}
                className={`w-full rounded-md border p-2 text-left text-[10px] transition-colors cursor-pointer ${
                  accent === "rose"
                    ? "border-border bg-background text-foreground/80 hover:bg-foreground/5"
                    : "border-border bg-background text-foreground/80 hover:bg-foreground/5"
                }`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate">{e.label}</span>
                  <span className={`shrink-0 font-mono text-[8px] tabular-nums ${
                    e.sim < TAU_SEMANTIC ? "text-rose-500" : "text-emerald-600 dark:text-emerald-400"
                  }`}>
                    Sim {e.sim.toFixed(2)}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Labyrinthine Navigation: Semantic Obfuscation"
      caption="Semantic Obfuscation — the labels along the exit path share almost no semantic overlap with the goal, so information scent collapses and the user must guess the way."
      auditorStats={stats}
      deltaNote={`In Variant A every intermediate label fails the scent test — the minimum similarity to Topic(v_target) is ${minDarkSim.toFixed(2)} < τ_semantic = ${TAU_SEMANTIC.toFixed(2)} (“Storage management” says nothing about deletion). In Variant B the same path is labelled plainly, with a minimum similarity of ${minBenignSim.toFixed(2)}.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border border-emerald-500/40 bg-emerald-500/5 p-2 text-[9px] text-muted-foreground">
            <strong className="text-foreground">Your goal:</strong> delete your account — follow
            the menu.
          </div>
          {renderPath(BENIGN_PATH, benignStep, "emerald")}
          {confirming && (
            <div className="rounded-md border bg-card p-3">
              <h3 className="text-[11px] font-semibold">Delete your account?</h3>
              <p className="mt-0.5 text-[9px] text-muted-foreground">
                All data will be permanently removed. This cannot be undone.
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setConfirming(false)}
                  className="w-full rounded-md border border-border bg-background hover:bg-foreground/5 py-1.5 text-[10px] font-medium text-foreground/80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setConfirming(false); setOutcome("deleted"); }}
                  className="w-full rounded-md bg-emerald-600 hover:bg-emerald-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
                >
                  Confirm deletion
                </button>
              </div>
            </div>
          )}
          {outcome === "deleted" && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Account deleted
              </div>
              <p className="mt-0.5 text-muted-foreground">
                Every label on the path (Settings, Account, Delete account) was semantically
                on-topic — min Sim = {minBenignSim.toFixed(2)} &ge; &tau;_semantic = {TAU_SEMANTIC.toFixed(2)}.
                No guessing required.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border border-rose-500/40 bg-rose-500/5 p-2 text-[9px] text-muted-foreground">
          <strong className="text-foreground">Your goal:</strong> delete your account — find the
          way through the menu.
        </div>
        {renderPath(DARK_PATH, darkStep, "rose")}
        {confirming && (
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-2">
              <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">Terminate account</h3>
                <p className="mt-0.5 text-[9px] text-muted-foreground">
                  You found it — under a label nobody would guess. Confirm to proceed.
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setConfirming(false)}
                className="w-full rounded-md border border-border bg-background hover:bg-foreground/5 py-1.5 text-[10px] font-medium text-foreground/80 transition-colors cursor-pointer"
              >
                Go back
              </button>
              <button
                onClick={() => { setConfirming(false); setOutcome("deleted"); }}
                className="w-full rounded-md bg-rose-600 hover:bg-rose-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
        {outcome === "deleted" && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Semantic obfuscation triggered
            </div>
            <p className="text-muted-foreground">
              Every intermediate label undercut the information scent: “Usage &amp; diagnostics”
              Sim {DARK_PATH[1].sim.toFixed(2)}, “System resources” Sim {DARK_PATH[2].sim.toFixed(2)}, “Storage
              management” Sim {DARK_PATH[4].sim.toFixed(2)} — all below &tau;_semantic = {TAU_SEMANTIC.toFixed(2)}.
              None of them whisper “account deletion”, so you were forced to guess the pathway,
              exactly as the pattern intends. Only the final edge (“Terminate account”, Sim{" "}
              {DARK_PATH[6].sim.toFixed(2)}) is on-topic — too late to help.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
