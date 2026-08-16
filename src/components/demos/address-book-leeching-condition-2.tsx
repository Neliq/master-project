"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Address Book Leeching — Condition 2: Visual Prominence of the Invite-All Affordance
 *
 * Thesis: the collective-invite button (N_invite_all, e.g. "Invite All
 * Contacts") dominates the viewport, its bounding-box area exceeding the
 * skip/deselect affordance (N_skip) by a dominance ratio above a
 * threshold τ_invite_dominance:
 *
 *   A(N_invite_all) / A(N_skip) > τ_invite_dominance
 *
 * Variant A (dark): a giant full-width "Invite all 128 contacts" primary
 * button dwarfs a tiny, low-contrast skip link.
 * Variant B (benign): the collective-invite and skip affordances are
 * visually balanced, giving the user a fair exit.
 */

const NETWORK_SIZE = 128;
const DOMINANCE_DARK = 38.4;
const DOMINANCE_BENIGN = 1.0;
const TAU = 2.0;

export function AddressBookLeechingCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [invited, setInvited] = React.useState<"none" | "all" | "skipped">("none");

  const reset = () => setInvited("none");

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(N_invite_all) / A(N_skip)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{DOMINANCE_DARK} &gt; &tau; (dark) / {DOMINANCE_BENIGN} (benign)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&tau;_invite_dominance</span>
        <span className="font-mono font-semibold tabular-nums">{TAU}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Invite target</span>
        <span className="font-mono font-semibold tabular-nums">{NETWORK_SIZE} contacts</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Outcome</span>
        <span className="font-mono font-semibold tabular-nums">{invited}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Address Book Leeching: Visual Prominence of the Invite-All Affordance"
      caption="The collective &ldquo;invite all&rdquo; affordance visually dominates the skip affordance, pressuring users toward indiscriminate contact sharing."
      auditorStats={stats}
      deltaNote={`In Variant A the invite-all button dwarfs the skip link (area ratio ${DOMINANCE_DARK} > τ = ${TAU}). In Variant B both affordances are visually balanced (ratio ${DOMINANCE_BENIGN}) so skipping is as easy as inviting.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">You&rsquo;re in! Welcome to SnapGrid</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Invite friends from your address book — or skip and start using SnapGrid right away.
              Your choice, either way.
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setInvited("all")}
                className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-2.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors cursor-pointer"
              >
                Invite all {NETWORK_SIZE} contacts
              </button>
              <button
                onClick={() => setInvited("skipped")}
                className="rounded-md border border-border bg-background px-2 py-2.5 text-[10px] font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                Skip for now
              </button>
            </div>
            <p className="mt-2 text-[8px] text-muted-foreground/60">
              Both options are the same size. A(N_invite_all) / A(N_skip) = {DOMINANCE_BENIGN}.
            </p>
          </div>

          {invited !== "none" && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {invited === "all" ? "Invites sent" : "Skipped"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                {invited === "all"
                  ? `You chose the collective invite deliberately — ${NETWORK_SIZE} invites went out.`
                  : "Nothing was shared. The skip affordance was as easy to reach as the invite button, so your choice was unpressured."}
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">You&rsquo;re in! Welcome to SnapGrid</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Invite friends from your address book to make SnapGrid better for everyone.
          </p>

          <button
            onClick={() => setInvited("all")}
            className="mt-3 w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white px-4 py-4 text-[11px] font-bold shadow-lg shadow-rose-600/20 transition-colors cursor-pointer"
          >
            Invite all {NETWORK_SIZE} contacts
          </button>
          <button
            onClick={() => setInvited("skipped")}
            className="mt-1.5 w-full text-center text-[8px] text-muted-foreground/50 underline decoration-dotted underline-offset-2 hover:text-muted-foreground transition-colors cursor-pointer"
          >
            skip
          </button>
          <p className="mt-2 text-[8px] text-muted-foreground/60">
            A(N_invite_all) / A(N_skip) = {DOMINANCE_DARK} &gt; &tau; = {TAU} — the collective
            affordance owns the viewport.
          </p>
        </div>

        {invited !== "none" && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              {invited === "all" ? "Indiscriminate sharing" : "Tiny escape hatch"}
            </div>
            <p className="text-muted-foreground mt-0.5">
              {invited === "all"
                ? `The full-width, high-contrast button made "invite all ${NETWORK_SIZE}" the path of least resistance — its bounding-box area exceeded the skip link ${DOMINANCE_DARK}×, far past the τ_invite_dominance threshold, pressuring you toward sharing your entire address book.`
                : `You found the skip link — but at ${DOMINANCE_DARK}× the size difference, it existed as a mere formality. The interface steered every other user toward the collective invite.`}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
