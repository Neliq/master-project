"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Social Pyramid — Condition 2: Visual Prominence of Referral-Progress
 * Gamification
 *
 * Thesis: the algorithm scans for gamified progress indicators — progress bars,
 * tier-badges, referral counters — associated with invite-N-friends mechanics.
 * The feature triggers if such indicators occupy a viewport area fraction
 * exceeding τ_gamification, i.e. recruitment mechanics are visually elevated to
 * a core interface function rather than a secondary feature:
 *
 *   A(N_referral_progress) / A_viewport > τ_gamification
 *
 * Variant A (dark): a full-width gamified referral banner with progress bar,
 * tier badges, and a live counter dominates the app (0.55 of the viewport).
 * Variant B (benign): the same mechanic is one muted line under the content
 * (0.08 of the viewport), and copying the link changes nothing else.
 */

const AREA_DARK = "0.55";
const AREA_BENIGN = "0.08";
const TAU_GAMIFICATION = 0.3;

export function SocialPyramidCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [invites, setInvites] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const reset = () => {
    setInvites(0);
    setCopied(false);
  };

  const invite = () => setInvites((i) => Math.min(i + 1, 5));

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(N_ref) / A_viewport — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{AREA_DARK} (&gt; &tau;)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(N_ref) / A_viewport — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{AREA_BENIGN} (&le; &tau;)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&tau;_gamification</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_GAMIFICATION}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Gamified elements (dark)</span>
        <span className="font-mono font-semibold tabular-nums">7 (bar, badges ×3, counter, CTA ×2)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Gamified elements (benign)</span>
        <span className="font-mono font-semibold tabular-nums">1 (text link)</span>
      </div>
    </>
  ) : null;

  const contentCard = (
    <div className="rounded-md border bg-card p-3">
      <h3 className="text-[11px] font-semibold">Today&rsquo;s focus session</h3>
      <p className="text-[9px] text-muted-foreground mt-0.5">
        25-minute deep-work timer with your streaks and stats.
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <span className="rounded-full border border-border px-2 py-0.5 text-[8px] font-mono text-muted-foreground">
          Streak: 12 days
        </span>
        <span className="rounded-full border border-border px-2 py-0.5 text-[8px] font-mono text-muted-foreground">
          Focus: 9h 20m
        </span>
        <span className="rounded-full border border-border px-2 py-0.5 text-[8px] font-mono text-muted-foreground">
          Sessions: 214
        </span>
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Social Pyramid: Visual Prominence of Referral-Progress Gamification"
      caption="Visual Prominence of Referral-Progress Gamification — invite-N-friends progress indicators are scaled up until recruitment becomes the dominant visual event of the app."
      auditorStats={stats}
      deltaNote={`In Variant A the referral banner (progress bar, tier badges, counter, dual CTAs) occupies ${AREA_DARK} of the viewport — A(N_ref)/A_viewport > τ_gamification (${TAU_GAMIFICATION}). In Variant B the identical mechanic is a ${AREA_BENIGN} muted line with no fabricated activity counter, keeping it a secondary feature.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border border-border bg-background p-2 flex items-center justify-between">
            <span className="text-[8px] text-muted-foreground">
              Invite friends (optional)
            </span>
            <button
              onClick={() => setCopied(true)}
              className="text-[8px] text-muted-foreground underline underline-offset-2 hover:text-foreground cursor-pointer"
            >
              Copy link
            </button>
          </div>

          {copied && (
            <p className="text-[8px] text-muted-foreground">Link copied.</p>
          )}

          {contentCard}

          {copied && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Secondary by design
              </div>
              <p className="text-muted-foreground">
                A(N_referral_progress)/A_viewport ={" "}
                <strong className="text-green-700 dark:text-green-300">{AREA_BENIGN}</strong> &le;{" "}
                &tau;_gamification ({TAU_GAMIFICATION}) — the invite mechanic is a single muted line under
                the actual content. Recruitment stays a secondary feature, and the app&rsquo;s core
                utility dominates the screen.
              </p>
            </div>
          )}
        </div>
      }
    >
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border border-red-500/30    p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
              <span className="text-[11px] font-bold">Invite Friends</span>
            </div>
            <div className="flex gap-1">
              <span className="rounded-full border border-yellow-500/50 bg-yellow-500/10 px-1.5 py-0.5 text-[8px] font-mono font-semibold text-yellow-700 dark:text-yellow-300">
                Bronze
              </span>
              <span className="rounded-full border border-border px-1.5 py-0.5 text-[8px] font-mono text-muted-foreground">
                Silver
              </span>
              <span className="rounded-full border border-border px-1.5 py-0.5 text-[8px] font-mono text-muted-foreground">
                Gold
              </span>
            </div>
          </div>

          <div className="mt-2 text-center">
            <div className="text-[16px] font-black tabular-nums leading-none">
              {invites}
              <span className="text-[10px] font-medium text-muted-foreground">/2 friends</span>
            </div>
            <div className="mt-1 text-[8px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
              Unlock Silver in {Math.max(0, 2 - Math.min(invites, 2))} more!
            </div>
          </div>

          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full   transition-all"
              style={{ width: `${(Math.min(invites, 2) / 2) * 100}%` }}
            />
          </div>

          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <button
              onClick={() => {
                invite();
                setCopied(true);
              }}
              className="rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[9px] font-semibold transition-colors cursor-pointer"
            >
              Copy invite link
            </button>
            <button className="rounded-md border border-border bg-background py-1.5 text-[9px] font-medium text-muted-foreground hover:text-foreground cursor-pointer">
              Share on WhatsApp
            </button>
          </div>

          <p className="mt-1.5 text-center text-[8px] text-muted-foreground/60">
            Only {Math.max(0, 2 - Math.min(invites, 2))} friends away from exclusive rewards!
          </p>
        </div>

        <div className="rounded-md border border-border bg-muted/30 p-2 text-[8px] text-muted-foreground/60">
          <div className="h-1.5 w-2/3 rounded bg-muted" />
          <div className="mt-1 h-1.5 w-1/2 rounded bg-muted" />
          <div className="mt-1 h-1.5 w-3/4 rounded bg-muted" />
          <p className="mt-1.5">…and the actual app content, squeezed below the banner.</p>
        </div>

        {mode === "auditor" && copied && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Referral progress
            </div>
            <p className="text-muted-foreground">
              A(N_referral_progress)/A_viewport ={" "}
              <strong className="text-red-500">{AREA_DARK}</strong> &gt; &tau;_gamification (
              {TAU_GAMIFICATION}) — the progress bar, tier badges, live counter, and dual CTAs occupy
              more than half the viewport. Recruitment mechanics have been visually elevated to a core
              interface function: the app&rsquo;s own utility is what gets squeezed.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
