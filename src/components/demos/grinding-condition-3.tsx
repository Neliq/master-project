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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [clicksA, setClicksA] = React.useState(0);
  const [clicksB, setClicksB] = React.useState(0);


  const revealedA = clicksA >= 25;
  const revealedB = clicksB >= 25;
  const crossedA = crossedMilestones(MILESTONES_DARK, clicksA);
  const crossedB = crossedMilestones(
    Array.from({ length: 10 }, (_, i) => (i + 1) * PRAISE_EVERY),
    clicksB
  );
  const praiseA = crossedA.length > 0 ? PRAISE_LINES[Math.min(crossedA.length - 1, PRAISE_LINES.length - 1)] : null;
  const praiseB = crossedB.length > 0 ? `Great job! Milestone #${crossedB[crossedB.length - 1]} — steady progress.` : null;

  const gapsA = crossedA.slice(1).map((m, i) => m - crossedA[i]);

  return (
    <DemoShell mode={mode}
      title="Grinding: Semantic Attenuation of Progress-Milestone Language"
      userTitle="Kelp Farm"
      caption="Semantic Attenuation of Progress-Milestone Language — 'Great job!' appears at exponentially widening intervals, so praise fades precisely as the grind grows."
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
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
                Steady praise
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground">Kelp harvested</span>
              <span className="font-mono tabular-nums">{clicksB} bundles</span>
            </div>

            {praiseB && (
              <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2 text-[9px] text-foreground flex items-center gap-1.5">
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
                onClick={() => setClicksB((c) => c + 1)}
                className="flex-1 rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-2 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Harvest kelp (+1)
              </button>
              <button
                onClick={() => setClicksB((c) => c + 5)}
                className="flex-1 rounded-md border border-border/60 text-foreground hover:bg-muted/60 py-2 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Harvest ×5
              </button>
            </div>
          </div>

          {revealedB && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Reinforcement matches effort
              </div>
              <p className="text-muted-foreground mt-0.5">
                After {clicksB} actions you received <strong className="text-foreground">{crossedB.length} praises</strong>,
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
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
              Praise fades
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Kelp harvested</span>
            <span className="font-mono tabular-nums">{clicksA} bundles</span>
          </div>

          {praiseA && (
            <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2 text-[9px] text-foreground flex items-center gap-1.5">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              {praiseA}
            </div>
          )}

          <p className="text-[9px] text-muted-foreground mt-1.5">
            Praise milestones so far: <span className="font-mono tabular-nums">#{crossedA.join(", #") || "—"}</span>{" "}
            {crossedA.length >= 2 && (
              <>— the next encouragement arrives after more harvesting.</>
            )}
          </p>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setClicksA((c) => c + 1)}
              className="flex-1 rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Harvest kelp (+1)
            </button>
            <button
              onClick={() => setClicksA((c) => c + 5)}
              className="flex-1 rounded-md border border-border/60 text-foreground hover:bg-muted/60 py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Harvest ×5
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
              Progress updated
            </div>
            <p className="text-muted-foreground">
              After {clicksA} actions you received only <strong className="text-red-500">{crossedA.length} praises</strong>,
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
