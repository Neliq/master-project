"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Social Pyramid — Condition 1: Referral-Gated Progression
 *
 * Thesis: U_core is a locked core utility of the platform. R_user is the set of
 * new, unique accounts registered via the user's referral link, and k the
 * hardcoded recruitment threshold. The feature triggers if the system blocks
 * access to the utility until |R_user| >= k, compelling the user to either lose
 * access or broadcast their referral link indiscriminately:
 *
 *   Access(U_core) = Blocked  given  |R_user| < k
 *
 * Variant A (dark): exporting your own habit data is locked behind k = 3
 * successful referrals.
 * Variant B (benign): the export works immediately; inviting friends is a
 * plainly optional feature.
 */

const K_REFERRALS = 3;
const FRIEND_NAMES = ["Maya", "Jonas", "Priya", "Leo", "Ava"];

export function SocialPyramidCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [invites, setInvites] = React.useState(0);
  const [exportDone, setExportDone] = React.useState(false);
  const [blockedNotice, setBlockedNotice] = React.useState(false);

  const reset = () => {
    setInvites(0);
    setExportDone(false);
    setBlockedNotice(false);
  };

  const invite = () => setInvites((i) => Math.min(i + 1, FRIEND_NAMES.length));

  const locked = invites < K_REFERRALS;
  const remaining = Math.max(0, K_REFERRALS - invites);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|R_user| (referrals)</span>
        <span className="font-mono font-semibold tabular-nums">{invites}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">k (threshold)</span>
        <span className="font-mono font-semibold tabular-nums">{K_REFERRALS}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Access(U_core) (dark logic)</span>
        <span className={`font-mono font-semibold tabular-nums ${locked ? "text-rose-500" : "text-emerald-500"}`}>
          {locked ? "Blocked" : "Open"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">k − |R_user|</span>
        <span className="font-mono font-semibold tabular-nums">{remaining}</span>
      </div>
    </>
  ) : null;

  const exportButton = (accent: "rose" | "emerald") => (
    <button
      onClick={() => setExportDone(true)}
      className={`w-full rounded-md py-2 text-[10px] font-semibold transition-colors cursor-pointer ${
        accent === "rose"
          ? "bg-rose-600 hover:bg-rose-700 text-white"
          : "bg-emerald-600 hover:bg-emerald-700 text-white"
      }`}
    >
      Export data (CSV)
    </button>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Social Pyramid: Referral-Gated Progression"
      caption="Referral-Gated Progression — a core utility stays blocked until the user recruits k new accounts through their referral link, forcing them to pay with social capital."
      auditorStats={stats}
      deltaNote={`In Variant A Access(U_core) = Blocked while |R_user| < ${K_REFERRALS}: exporting your own data is impossible until you recruit ${K_REFERRALS} friends. In Variant B the same export works immediately and the invite mechanic is an optional extra that gates nothing.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-900/30">
                <svg className="h-4 w-4 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <path d="M7 10l5 5 5-5" />
                  <path d="M12 15V3" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">Export your habit data</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Download your full Focusly history as CSV. Works immediately — no strings attached.
                </p>
              </div>
            </div>
            <div className="mt-3">{exportButton("emerald")}</div>
          </div>

          <div className="rounded-md border border-border bg-background p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-muted-foreground">Invite friends — optional</span>
              <button
                onClick={invite}
                className="text-[8px] text-muted-foreground underline underline-offset-2 hover:text-foreground cursor-pointer"
              >
                Copy invite link
              </button>
            </div>
            <p className="mt-0.5 text-[8px] text-muted-foreground/50">
              {invites > 0 ? `✓ ${FRIEND_NAMES[invites - 1]} joined via your link — ` : ""}
              No feature depends on this number.
            </p>
          </div>

          {exportDone && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Access open
              </div>
              <p className="text-muted-foreground">
                Access(U_core) = Open regardless of |R_user| — the export worked with only{" "}
                <strong className="text-emerald-700 dark:text-emerald-300">{invites}</strong> referral
                {invites === 1 ? "" : "s"} on record, because recruitment was never a condition of use.
              </p>
            </div>
          )}
        </div>
      }
    >
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-rose-100 dark:bg-rose-900/30">
              <svg className="h-4 w-4 text-rose-600 dark:text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">Export your habit data</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Download your full Focusly history as CSV.
              </p>
            </div>
          </div>

          {locked ? (
            <div className="mt-3 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5">
              <div className="text-[9px] font-medium text-amber-700 dark:text-amber-300">
                🔒 Locked — invite {remaining} more friend{remaining === 1 ? "" : "s"} to unlock export
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all"
                    style={{ width: `${(invites / K_REFERRALS) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-[9px] tabular-nums text-muted-foreground">
                  {invites}/{K_REFERRALS}
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                <button
                  onClick={invite}
                  className="rounded-md bg-amber-500 hover:bg-amber-600 text-white py-1.5 text-[9px] font-semibold transition-colors cursor-pointer"
                >
                  Invite a friend
                </button>
                <button
                  onClick={() => setBlockedNotice(true)}
                  className="rounded-md border border-border bg-background text-muted-foreground py-1.5 text-[9px] font-medium cursor-pointer hover:text-foreground"
                >
                  Export data
                </button>
              </div>
              {invites > 0 && (
                <p className="mt-1.5 text-[8px] text-emerald-700 dark:text-emerald-300">
                  ✓ {FRIEND_NAMES[invites - 1]} registered via your link
                </p>
              )}
              {blockedNotice && (
                <p className="mt-1.5 text-[8px] text-rose-700 dark:text-rose-300">
                  Blocked: Access(U_core) = Blocked given |R_user| = {invites} &lt; k = {K_REFERRALS}.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-3">{exportButton("rose")}</div>
          )}
        </div>

        {exportDone && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Referral gating triggered
            </div>
            <p className="text-muted-foreground">
              Access(U_core) stayed <strong className="text-rose-500">Blocked</strong> while |R_user| ={" "}
              {invites} &lt; k = {K_REFERRALS}. Your own data was held hostage until you recruited{" "}
              {K_REFERRALS} people: the platform converted your social network into unpaid marketing —
              every friend you drag in grows the platform&rsquo;s user base, not your utility.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
