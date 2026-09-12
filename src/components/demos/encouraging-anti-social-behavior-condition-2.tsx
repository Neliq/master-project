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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [darkProgress, setDarkProgress] = React.useState(0);
  const [benignProgress, setBenignProgress] = React.useState(0);
  const darkDone = darkProgress >= 100;
  const benignDone = benignProgress >= 100;

  const ALEX_SCORE = 70;


  const answer = (dark: boolean) => {
    const setProgress = dark ? setDarkProgress : setBenignProgress;
    setProgress((p) => Math.min(100, p + 10));
  };

  return (
    <DemoShell mode={mode}
      title="Encouraging Anti-Social Behavior: Visual Framing of Competitive Antagonism"
      userTitle="MathRush — study group"
      caption="Visual Framing of Competitive Antagonism — a binary 50/50 'You vs. Them' split frames interaction as a zero-sum fight, conditioning users to see peers as opponents to defeat."
      deltaNote="Both panels run the same quiz in the same shared practice session. Variant A splits the screen 50/50 into 'You vs. Alex' with your bar in confrontational red — even though the task is cooperative, the layout frames your study partner as a rival and rewards beating them. Variant B replaces the opposition with a single shared goal bar — you and Alex progress together, so success never requires defeating someone."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[9px] font-bold text-foreground">
                You
              </div>
              <span className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground">+</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[9px] font-bold text-foreground">
                Al
              </div>
              <h3 className="text-[11px] font-semibold ml-1">MathRush — team challenge</h3>
            </div>

            <div className="mt-3 rounded-md bg-background border border-border p-2.5">
              <div className="rounded-md border border-border bg-card p-2 text-[9px] leading-relaxed">
                <span className="font-medium">Practice question:</span> What is 7 × 8?{" "}
                <span className="text-muted-foreground">Answer: 56</span>
              </div>
              <div className="flex items-center justify-between text-[9px]">
                <span className="font-medium text-foreground">Team progress</span>
                <span className="font-mono tabular-nums text-muted-foreground">{benignProgress}%</span>
              </div>
              <div
                role="progressbar"
                aria-label="Team practice progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={benignProgress}
                className="mt-1.5 h-2.5 w-full rounded-full bg-foreground/10"
              >
                <div
                  className="h-2.5 rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${benignProgress}%` }}
                />
              </div>
              <p className="mt-1.5 text-[8px] text-muted-foreground">
                Reach 100% together — every answer by either of you helps the team.
              </p>
            </div>

            <button
              onClick={() => answer(false)}
              disabled={benignDone}
              className={`mt-2.5 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors ${
                benignDone
                  ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
              }`}
            >
              Answer a question
            </button>
          </div>

          {benignDone && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
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
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[9px] font-bold text-foreground">
              You
            </div>
            <span className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground">vs.</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[9px] font-bold text-foreground">
              Al
            </div>
            <h3 className="text-[11px] font-semibold ml-1">MathRush — study group</h3>
          </div>

          <p className="mt-2 text-[8px] text-muted-foreground">
            You and Alex are practising the same deck in one shared session — the activity itself
            is cooperative.
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-md border border-border/60 bg-muted/40 p-2">
              <div className="text-[8px] font-mono uppercase tracking-wider text-foreground">You</div>
              <div className="mt-1 font-mono text-[11px] font-bold tabular-nums text-foreground">
                {darkProgress}
              </div>
              <div
                role="progressbar"
                aria-label="Your competitive practice progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={darkProgress}
                className="mt-1 h-1.5 w-full rounded-full bg-foreground/10"
              >
                <div className="h-1.5 rounded-full bg-primary transition-all duration-500" style={{ width: `${darkProgress}%` }} />
              </div>
            </div>
            <div className="rounded-md border border-border/60 bg-muted/40 p-2">
              <div className="text-[8px] font-mono uppercase tracking-wider text-foreground">Alex</div>
              <div className="mt-1 font-mono text-[11px] font-bold tabular-nums text-foreground">
                {ALEX_SCORE}
              </div>
              <div
                role="progressbar"
                aria-label="Alex competitive practice progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={ALEX_SCORE}
                className="mt-1 h-1.5 w-full rounded-full bg-foreground/10"
              >
                <div className="h-1.5 rounded-full bg-primary" style={{ width: `${ALEX_SCORE}%` }} />
              </div>
            </div>
          </div>

          <p className="mt-2 text-[8px] text-muted-foreground">
            Same practice, same questions — yet the app turns the shared session into a duel:{" "}
            <span className="font-semibold text-foreground">Beat Alex to win the crown!</span>{" "}
            The loser gets demoted a league.
          </p>

          <div className="mt-3 rounded-md border border-border bg-background p-2.5 text-[9px] leading-relaxed">
            <span className="font-medium">Practice question:</span> What is 7 × 8?{" "}
            <span className="text-muted-foreground">Answer: 56</span>
          </div>

          <button
            onClick={() => answer(true)}
            disabled={darkDone}
            className={`mt-2.5 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors ${
              darkDone
                ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                : "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
            }`}
          >
            Answer a question
          </button>
        </div>

        {mode === "auditor" && darkDone && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Pick a side
            </div>
            <p className="text-muted-foreground">
              The task itself is cooperative — you and Alex practise the same deck together — yet
              the interface renders <span className="font-mono">LayoutType(C_container) = Competitive</span>{" "}
              with <span className="font-mono">SplitRatio &asymp; 0.5</span>: your score sits in
              confrontational red, directly opposed to Alex&rsquo;s, and the reward is framed as
              beating them. Competition is injected where the activity never required it,
              conditioning you to see a study partner as a rival to defeat.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
