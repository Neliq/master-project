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
  const [darkInvites, setDarkInvites] = React.useState(0);
  const [benignInvites, setBenignInvites] = React.useState(0);
  const [darkExportDone, setDarkExportDone] = React.useState(false);
  const [benignExportDone, setBenignExportDone] = React.useState(false);
  const [darkBlockedNotice, setDarkBlockedNotice] = React.useState(false);
  const [benignLinkCopied, setBenignLinkCopied] = React.useState(false);

  const reset = () => {
    setDarkInvites(0);
    setBenignInvites(0);
    setDarkExportDone(false);
    setBenignExportDone(false);
    setDarkBlockedNotice(false);
    setBenignLinkCopied(false);
  };

  const invite = (dark: boolean) => {
    const setInvites = dark ? setDarkInvites : setBenignInvites;
    setInvites((i) => Math.min(i + 1, FRIEND_NAMES.length));
  };

  const copyInviteLink = () => {
    void navigator.clipboard?.writeText("https://focusly.example/join/demo").catch(() => undefined);
    setBenignLinkCopied(true);
  };

  const locked = darkInvites < K_REFERRALS;
  const remaining = Math.max(0, K_REFERRALS - darkInvites);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|R_user| (referrals)</span>
        <span className="font-mono font-semibold tabular-nums">{darkInvites}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">k (threshold)</span>
        <span className="font-mono font-semibold tabular-nums">{K_REFERRALS}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Access(U_core) (dark logic)</span>
        <span className={`font-mono font-semibold tabular-nums ${locked ? "text-red-500" : "text-green-500"}`}>
          {locked ? "Blocked" : "Open"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">k − |R_user|</span>
        <span className="font-mono font-semibold tabular-nums">{remaining}</span>
      </div>
    </>
  ) : null;

  const exportButton = (dark: boolean) => {
    const downloadExport = () => {
      const csv = "date,focus_minutes,session_type\n2026-09-01,25,deep work\n2026-09-02,40,planning\n";
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "focusly-habit-history.csv";
      link.click();
      URL.revokeObjectURL(url);
      (dark ? setDarkExportDone : setBenignExportDone)(true);
    };
    return (
      <button
        onClick={downloadExport}
        className={`w-full rounded-md py-2 text-[10px] font-semibold transition-colors cursor-pointer ${
          dark ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        Export data (CSV)
      </button>
    );
  };

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Social Pyramid: Referral-Gated Progression"
      userTitle="Focusly data export"
      caption="Referral-Gated Progression — a core utility stays blocked until the user recruits k new accounts through their referral link, forcing them to pay with social capital."
      auditorStats={stats}
      deltaNote={`In Variant A Access(U_core) = Blocked while |R_user| < ${K_REFERRALS}: exporting your own data is impossible until you recruit ${K_REFERRALS} friends. In Variant B the same export works immediately and the invite mechanic is an optional extra that gates nothing.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                <svg className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <div className="mt-3">{exportButton(false)}</div>
          </div>

          <div className="rounded-md border border-border bg-background p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-muted-foreground">Invite friends — optional</span>
              <button
                onClick={copyInviteLink}
                className="text-[8px] text-muted-foreground underline underline-offset-2 hover:text-foreground cursor-pointer"
              >
                {benignLinkCopied ? "Link copied" : "Copy invite link"}
              </button>
            </div>
            <p className="mt-0.5 text-[8px] text-muted-foreground/50">
              {benignLinkCopied ? "The link is ready to share. No referral is counted until someone joins." : "No feature depends on inviting friends."}
            </p>
          </div>

          {benignExportDone && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Access open
              </div>
              <p className="text-muted-foreground">
                Access(U_core) = Open regardless of |R_user| — the export worked with only{" "}
                <strong className="text-green-700 dark:text-green-300">{benignInvites}</strong> referral
                {benignInvites === 1 ? "" : "s"} on record, because recruitment was never a condition of use.
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
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
              <svg className="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <div className="mt-3 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5">
              <div className="text-[9px] font-medium text-yellow-700 dark:text-yellow-300">
                 Locked — invite {remaining} more friend{remaining === 1 ? "" : "s"} to unlock export
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-yellow-500 transition-all"
                    style={{ width: `${(darkInvites / K_REFERRALS) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-[9px] tabular-nums text-muted-foreground">
                  {darkInvites}/{K_REFERRALS}
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => invite(true)}
                  className="rounded-md bg-yellow-500 hover:bg-yellow-600 text-white py-1.5 text-[9px] font-semibold transition-colors cursor-pointer"
                >
                  Simulate a friend joining
                </button>
                <button
                  onClick={() => setDarkBlockedNotice(true)}
                  className="rounded-md border border-border bg-background text-muted-foreground py-1.5 text-[9px] font-medium cursor-pointer hover:text-foreground"
                >
                  Export data
                </button>
              </div>
              {darkInvites > 0 && (
                <p className="mt-1.5 text-[8px] text-green-700 dark:text-green-300">
                  ✓ {FRIEND_NAMES[darkInvites - 1]} registered via your link
                </p>
              )}
              {darkBlockedNotice && (
                <p className="mt-1.5 text-[8px] text-red-700 dark:text-red-300">
                  Blocked: Access(U_core) = Blocked given |R_user| = {darkInvites} &lt; k = {K_REFERRALS}.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-3">{exportButton(true)}</div>
          )}
        </div>

        {mode === "auditor" && darkExportDone && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Invite friends
            </div>
            <p className="text-muted-foreground">
              Access(U_core) stayed <strong className="text-red-500">Blocked</strong> while |R_user| ={" "}
              {darkInvites} &lt; k = {K_REFERRALS}. Your own data was held hostage until you recruited{" "}
              {K_REFERRALS} people: the platform converted your social network into unpaid marketing —
              every friend you drag in grows the platform&rsquo;s user base, not your utility.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
