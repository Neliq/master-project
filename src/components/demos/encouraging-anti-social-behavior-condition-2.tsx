"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Encouraging Anti-Social Behavior — Condition 2: Visual Framing of
 * Competitive Antagonism
 *
 * Thesis: the algorithm detects competitive-visualization layouts —
 * side-by-side scoreboards, "You vs. Them" splits, leaderboards with the
 * user's row highlighted in a confrontational color. The feature triggers
 * if the layout employs a binary oppositional split with the user's avatar
 * or score rendered in direct visual opposition to another entity:
 *
 *   LayoutType(C_container) = Competitive  AND  SplitRatio ~= 0.5
 *
 * Variant A (dark): a 50/50 "You vs. Alex" scoreboard is layered onto a
 * shared practice session — competition injected where the activity is
 * cooperative — rewarding defeating the other player.
 * Variant B (benign): the identical quiz uses a cooperative split — you
 * and Alex push one shared goal bar together.
 */

export function EncouragingAntiSocialBehaviorCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Shared progress: in A it fills YOUR bar against Alex's fixed score;
  // in B it fills the shared team bar toward the goal.
  const [progress, setProgress] = React.useState(0);
  const [done, setDone] = React.useState(false);

  const ALEX_SCORE = 70;

  const reset = () => {
    setProgress(0);
    setDone(false);
  };

  const answer = () => {
    setProgress((p) => {
      const next = Math.min(100, p + 9 + Math.floor(Math.random() * 6));
      if (next >= 100) setDone(true);
      return next;
    });
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">LayoutType(C_container)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">Competitive (dark)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">LayoutType(C_container)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">Cooperative (benign)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">SplitRatio (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">0.5 — binary opposition</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">SplitRatio (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">1.0 — single shared bar</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Encouraging Anti-Social Behavior: Visual Framing of Competitive Antagonism"
      caption="Visual Framing of Competitive Antagonism — a binary 50/50 'You vs. Them' split frames interaction as a zero-sum fight, conditioning users to see peers as opponents to defeat."
      auditorStats={stats}
      deltaNote="Both panels run the same quiz in the same shared practice session. Variant A splits the screen 50/50 into 'You vs. Alex' with your bar in confrontational red — even though the task is cooperative, the layout frames your study partner as a rival and rewards beating them. Variant B replaces the opposition with a single shared goal bar — you and Alex progress together, so success never requires defeating someone."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                You
              </div>
              <span className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground">+</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-[9px] font-bold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                Al
              </div>
              <h3 className="text-[11px] font-semibold ml-1">MathRush — team challenge</h3>
            </div>

            <div className="mt-3 rounded-md bg-background border border-border p-2.5">
              <div className="flex items-center justify-between text-[9px]">
                <span className="font-medium text-emerald-700 dark:text-emerald-300">Team progress</span>
                <span className="font-mono tabular-nums text-muted-foreground">{progress}%</span>
              </div>
              <div className="mt-1.5 h-2.5 w-full rounded-full bg-foreground/10">
                <div
                  className="h-2.5 rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1.5 text-[8px] text-muted-foreground">
                Reach 100% together — every answer by either of you helps the team.
              </p>
            </div>

            <button
              onClick={answer}
              disabled={done}
              className={`mt-2.5 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors ${
                done
                  ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              }`}
            >
              Answer a question
            </button>
          </div>

          {done && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Goal reached together
              </div>
              <p className="text-muted-foreground mt-0.5">
                &ldquo;You and Alex reached 100% together!&rdquo; The cooperative layout
                (SplitRatio = 1.0) never positions your avatar in opposition to Alex — progress is
                shared, so nothing here teaches you to defeat peers.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-[9px] font-bold text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
              You
            </div>
            <span className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground">vs.</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-[9px] font-bold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
              Al
            </div>
            <h3 className="text-[11px] font-semibold ml-1">MathRush — study group</h3>
          </div>

          <p className="mt-2 text-[8px] text-muted-foreground">
            You and Alex are practising the same deck in one shared session — the activity itself
            is cooperative.
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-md border border-rose-500/40 bg-rose-500/5 p-2">
              <div className="text-[8px] font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400">You</div>
              <div className="mt-1 font-mono text-[11px] font-bold tabular-nums text-rose-700 dark:text-rose-300">
                {progress}
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-foreground/10">
                <div className="h-1.5 rounded-full bg-rose-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="rounded-md border border-sky-500/40 bg-sky-500/5 p-2">
              <div className="text-[8px] font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400">Alex</div>
              <div className="mt-1 font-mono text-[11px] font-bold tabular-nums text-sky-700 dark:text-sky-300">
                {ALEX_SCORE}
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-foreground/10">
                <div className="h-1.5 rounded-full bg-sky-500" style={{ width: `${ALEX_SCORE}%` }} />
              </div>
            </div>
          </div>

          <p className="mt-2 text-[8px] text-muted-foreground">
            Same practice, same questions — yet the app turns the shared session into a duel:{" "}
            <span className="font-semibold text-rose-600 dark:text-rose-400">Beat Alex to win the crown!</span>{" "}
            The loser gets demoted a league.
          </p>

          <button
            onClick={answer}
            disabled={done}
            className={`mt-2.5 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors ${
              done
                ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                : "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
            }`}
          >
            Answer a question
          </button>
        </div>

        {done && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Binary oppositional split triggered
            </div>
            <p className="text-muted-foreground">
              The task itself is cooperative — you and Alex practise the same deck together — yet
              the interface renders <span className="font-mono">LayoutType(C_container) = Competitive</span>{" "}
              with <span className="font-mono">SplitRatio &asymp; 0.5</span>: your score sits in
              confrontational red, directly opposed to Alex&rsquo;s, and the reward is framed as
              beating them. Competition is injected where the activity never required it,
              conditioning you to see a study partner as a rival to defeat — that split is the
              dark pattern, not the quiz.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
