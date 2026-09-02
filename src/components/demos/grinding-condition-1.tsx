"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Grinding — Condition 1: Exponential Effort Scaling
 *
 * Thesis: E(L_i → L_{i+1}), the interaction effort required to transition
 * between progression states, is algorithmically scaled exponentially,
 * while the value gained V(L_{i+1}) grows only linearly:
 *
 *   E(L_i → L_{i+1}) ∝ c^i (c > 1)  ∧  V(L_{i+1}) ≈ V(L_i) + k
 *
 * Variant A (dark): each level requires 2^i forges and rewards a flat
 * +10 gold — a mathematical wall that exhausts the player's patience.
 * Variant B (benign): each level requires i+1 forges for the same +10
 * gold — effort and reward stay in proportion.
 */

const GOLD_PER_LEVEL = 10;

function stageProgress(
  actions: number,
  need: (stage: number) => number
): { stage: number; progress: number; required: number } {
  let remaining = actions;
  let stage = 0;
  let req = need(0);
  while (remaining >= req) {
    remaining -= req;
    stage += 1;
    req = need(stage);
  }
  return { stage, progress: remaining, required: req };
}

const needDark = (s: number) => Math.pow(2, s);
const needBenign = (s: number) => s + 1;

export function GrindingCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [actionsA, setActionsA] = React.useState(0);
  const [actionsB, setActionsB] = React.useState(0);

  const reset = () => {
    setActionsA(0);
    setActionsB(0);
  };

  const dark = stageProgress(actionsA, needDark);
  const benign = stageProgress(actionsB, needBenign);
  const revealedA = actionsA >= 15;
  const revealedB = actionsB >= 15;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{"E(L_i → L_{i+1}) (dark)"}</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{needDark(dark.stage)} forges</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{"E(L_i → L_{i+1}) (benign)"}</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{needBenign(benign.stage)} forges</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{"V(L_{i+1}) reward"}</span>
        <span className="font-mono font-semibold tabular-nums">+{GOLD_PER_LEVEL} gold (linear k)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">E/V ratio (dark)</span>
        <span className="font-mono font-semibold tabular-nums">{needDark(dark.stage)}/{GOLD_PER_LEVEL}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Grinding: Exponential Effort Scaling"
      userTitle="Forge Master"
      caption="Exponential Effort Scaling — every level demands exponentially more forges (c^i) while the reward stays a flat +10 gold, building a mathematical wall that exhausts the player."
      auditorStats={stats}
      deltaNote="Both variants run the same forge with the same action counter and the same +10 gold reward. Variant A needs 2^i forges per level (exponential), Variant B only i+1 (linear) — so after the same number of clicks, A's next level is far more expensive while the reward is identical."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Forge Master</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Forge swords to level up. Each level needs a few more — always fair.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Fair curve
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground">Level {benign.stage + 1}</span>
              <span className="font-mono tabular-nums">{benign.progress}/{benign.required} forges · +{GOLD_PER_LEVEL} gold</span>
            </div>
            <div
              role="progressbar"
              aria-label="Forge progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round((benign.progress / benign.required) * 100)}
              className="mt-1 bg-foreground/10 h-2.5 rounded-full overflow-hidden"
            >
              <div className="bg-green-500 h-full transition-all" style={{ width: `${Math.min(100, (benign.progress / benign.required) * 100)}%` }} />
            </div>
            <p className="text-[9px] text-muted-foreground mt-1.5">
              Gold earned so far: <span className="font-mono font-semibold tabular-nums text-green-600 dark:text-green-400">{benign.stage * GOLD_PER_LEVEL} </span>
            </p>

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setActionsB((a) => a + 1)}
                className="flex-1 rounded-md bg-green-600 hover:bg-green-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Forge a sword (+1)
              </button>
              <button
                onClick={() => setActionsB((a) => a + 5)}
                className="flex-1 rounded-md border border-green-500/40 text-green-700 dark:text-green-300 hover:bg-green-500/10 py-2 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Forge ×5
              </button>
            </div>
          </div>

          {revealedB && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Effort matches value
              </div>
              <p className="text-muted-foreground mt-0.5">
                After {actionsB} forges you are on level {benign.stage + 1}, needing just{" "}
                <span className="font-mono tabular-nums">{benign.required}</span> forges (E = i + 1, linear)
                for the same +{GOLD_PER_LEVEL} gold. Repetition exists, but it never becomes a
                mathematically enforced wall.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Forge Master</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Forge swords to level up. Keep forging. Keep forging…
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Grind
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Level {dark.stage + 1}</span>
            <span className="font-mono tabular-nums">{dark.progress}/{dark.required} forges · +{GOLD_PER_LEVEL} gold</span>
          </div>
          <div
            role="progressbar"
            aria-label="Forge progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round((dark.progress / dark.required) * 100)}
            className="mt-1 bg-foreground/10 h-2.5 rounded-full overflow-hidden"
          >
            <div className="bg-red-500 h-full transition-all" style={{ width: `${Math.min(100, (dark.progress / dark.required) * 100)}%` }} />
          </div>
          <p className="text-[9px] text-muted-foreground mt-1.5">
            Gold earned so far: <span className="font-mono font-semibold tabular-nums text-yellow-500">{dark.stage * GOLD_PER_LEVEL} </span>{" "}
            {dark.stage >= 3 && (
              <span className="text-red-500/80">— next level needs {needDark(dark.stage)} forges for the same {GOLD_PER_LEVEL} gold.</span>
            )}
          </p>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setActionsA((a) => a + 1)}
              className="flex-1 rounded-md bg-red-600 hover:bg-red-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Forge a sword (+1)
            </button>
            <button
              onClick={() => setActionsA((a) => a + 5)}
              className="flex-1 rounded-md border border-red-500/40 text-red-700 dark:text-red-300 hover:bg-red-500/10 py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Forge ×5
            </button>
          </div>
        </div>

        {mode === "auditor" && revealedA && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Continue playing
            </div>
            <p className="text-muted-foreground">
              After {actionsA} forges you are on level {dark.stage + 1} — and the next level needs{" "}
              <strong className="text-red-500">{needDark(dark.stage)} forges</strong> ({"E(L_i → L_{i+1})"} ∝ c^i,
              c = 2) for the same <strong className="text-foreground">+{GOLD_PER_LEVEL} gold</strong>{" "}
              ({"V(L_{i+1})"} ≈ V(L_i) + k, linear). The effort curve doubles every level while the reward
              barely moves — a wall designed to exhaust your patience until you pay to skip the tedium.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
