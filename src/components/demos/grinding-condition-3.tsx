"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Grinding — Condition 3: Semantic Attenuation of Progress-Milestone Language
 *
 * Thesis: the semantic content of progress-feedback messages is monitored
 * over a grinding session of n actions. The feature triggers if
 * milestone-acknowledgment language ("Great job!", "You're halfway
 * there!") appears at exponentially increasing action intervals — the
 * semantic reinforcement schedule decays while the action requirement
 * grows, described by a widening gap function:
 *
 *   Δa_i = Pos(Milestone_i) − Pos(Milestone_{i−1})  ∧  dΔa/di > 0
 *
 * Variant A (dark): praise fires at action #3, #8, #20, #50… — the gaps
 * (5, 12, 30, …) widen, so reinforcement fades exactly when the grind
 * grows.
 * Variant B (benign): praise fires every 5 actions — gaps stay constant,
 * reinforcement tracks the work.
 */

const MILESTONES_DARK = [3, 8, 20, 50, 120];
const PRAISE_EVERY = 5;

const PRAISE_LINES = [
  "Great job! You're on a roll!",
  "You're on fire — keep going!",
  "Almost there…",
  "Nobody grinds like you!",
  "So close now — one more push!",
];

function crossedMilestones(milestones: number[], clicks: number): number[] {
  return milestones.filter((m) => m <= clicks);
}

export function GrindingCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [clicks, setClicks] = React.useState(0);

  const reset = () => setClicks(0);

  const revealed = clicks >= 25;
  const crossedA = crossedMilestones(MILESTONES_DARK, clicks);
  const crossedB = crossedMilestones(
    Array.from({ length: 10 }, (_, i) => (i + 1) * PRAISE_EVERY),
    clicks
  );
  const praiseA = crossedA.length > 0 ? PRAISE_LINES[Math.min(crossedA.length - 1, PRAISE_LINES.length - 1)] : null;
  const praiseB = crossedB.length > 0 ? `Great job! Milestone #${crossedB[crossedB.length - 1]} — steady progress.` : null;

  const gapsA = crossedA.slice(1).map((m, i) => m - crossedA[i]);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Milestone positions (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">#{crossedA.join(", #") || "—"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Gaps Δa_i (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{gapsA.join(", ") || "—"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">dΔa/di (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">&gt; 0 (widening)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Praise fired (A / B)</span>
        <span className="font-mono font-semibold tabular-nums">{crossedA.length} / {crossedB.length}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Grinding: Semantic Attenuation of Progress-Milestone Language"
      caption="Semantic Attenuation of Progress-Milestone Language — 'Great job!' appears at exponentially widening intervals, so praise fades precisely as the grind grows."
      auditorStats={stats}
      deltaNote="Both variants run the same kelp grind with the same action counter. Variant A celebrates milestones at action #3, #8, #20, #50… (gaps 5, 12, 30 — dΔa/di > 0): praise hooks you early, then starves you as the work doubles. Variant B celebrates every 5 actions (gaps constant), so reinforcement tracks the effort honestly."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Kelp Farm</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Harvest kelp bundles. Encouragement arrives on a steady schedule.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                Steady praise
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground">Kelp harvested</span>
              <span className="font-mono tabular-nums">{clicks} bundles</span>
            </div>

            {praiseB && (
              <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2 text-[9px] text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {praiseB}
              </div>
            )}

            <p className="text-[9px] text-muted-foreground mt-1.5">
              Praise milestones so far: <span className="font-mono tabular-nums">#{crossedB.join(", #") || "—"}</span>{" "}
              — every {PRAISE_EVERY} actions, gaps constant.
            </p>

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setClicks((c) => c + 1)}
                className="flex-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Harvest kelp (+1)
              </button>
              <button
                onClick={() => setClicks((c) => c + 5)}
                className="flex-1 rounded-md border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 py-2 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Harvest ×5
              </button>
            </div>
          </div>

          {revealed && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Reinforcement matches effort
              </div>
              <p className="text-muted-foreground mt-0.5">
                After {clicks} actions you received <strong className="text-foreground">{crossedB.length} praises</strong>,
                one every {PRAISE_EVERY} actions — Δa_i is constant, so dΔa/di = 0. Encouragement never
                deserts you mid-grind.
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
              <h3 className="text-[11px] font-semibold">Kelp Farm</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Harvest kelp bundles. The system cheers you on — sometimes.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              Praise fades
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Kelp harvested</span>
            <span className="font-mono tabular-nums">{clicks} bundles</span>
          </div>

          {praiseA && (
            <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2 text-[9px] text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              {praiseA}
            </div>
          )}

          <p className="text-[9px] text-muted-foreground mt-1.5">
            Praise milestones so far: <span className="font-mono tabular-nums">#{crossedA.join(", #") || "—"}</span>{" "}
            {crossedA.length >= 2 && (
              <>— gaps widening: <span className="font-mono tabular-nums">{gapsA.join(", ")}</span></>
            )}
          </p>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setClicks((c) => c + 1)}
              className="flex-1 rounded-md bg-rose-600 hover:bg-rose-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Harvest kelp (+1)
            </button>
            <button
              onClick={() => setClicks((c) => c + 5)}
              className="flex-1 rounded-md border border-rose-500/40 text-rose-700 dark:text-rose-300 hover:bg-rose-500/10 py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Harvest ×5
            </button>
          </div>
        </div>

        {revealed && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Semantic attenuation triggered
            </div>
            <p className="text-muted-foreground">
              After {clicks} actions you received only <strong className="text-rose-500">{crossedA.length} praises</strong>,
              at actions <span className="font-mono tabular-nums">#{crossedA.join(", #")}</span>. The gaps grow{" "}
              <span className="font-mono tabular-nums">({gapsA.join(", ")}{gapsA.length >= 2 ? ", …" : ""})</span> —
              Δa_i = Pos(Milestone_i) − Pos(Milestone_{"{i−1}"}) with dΔa/di &gt; 0. The praise hooks you early
              and then starves you exactly as the required work doubles: the semantic reinforcement
              schedule decays while the action requirement grows.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
