"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Friend Spam — Condition 2: Absence of Granular Selection
 *
 * Thesis: the curation state is skipped entirely — the dispatch target is
 * automatically set to the maximum size of the extracted contact array
 * without any affirmative, granular user selection:
 *
 *   |S_selected| = 0  ∧  |M_dispatched| ≈ |C_network|  ⇒  Unauthorized Broadcast
 *
 * Variant A (dark): every contact is pre-checked and the checkboxes are
 * decorative — the backend broadcasts to the whole network regardless of
 * what the user deselects.
 * Variant B (benign): contacts start unchecked; the user curates the list
 * and only the selected subset is messaged.
 */

const CONTACTS = ["Mia Chen", "Lucas Silva", "Ava Johnson", "Noah Kim", "Sofia Rossi"];
const NETWORK_SIZE = 24;

export function FriendSpamCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Dark variant: all pre-checked, but the selection is ignored at dispatch.
  const [darkChecked, setDarkChecked] = React.useState<boolean[]>(CONTACTS.map(() => true));
  // Benign variant: nothing pre-checked; dispatch honours the selection.
  const [benignChecked, setBenignChecked] = React.useState<boolean[]>(CONTACTS.map(() => false));
  const [darkSent, setDarkSent] = React.useState(false);
  const [benignSent, setBenignSent] = React.useState(false);

  const reset = () => {
    setDarkChecked(CONTACTS.map(() => true));
    setBenignChecked(CONTACTS.map(() => false));
    setDarkSent(false);
    setBenignSent(false);
  };

  const benignSelected = benignChecked.filter(Boolean).length;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|C_network|</span>
        <span className="font-mono font-semibold tabular-nums">{NETWORK_SIZE} contacts</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|S_selected| (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">0 — ignored</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|M_dispatched| (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{NETWORK_SIZE} &asymp; |C_network|</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|S_selected| (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{benignSelected}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Friend Spam: Absence of Granular Selection"
      caption="The invite flow skips the curation step entirely — contacts are auto-selected in bulk and the user's granular choices never reach the backend."
      auditorStats={stats}
      deltaNote={`In Variant A all ${NETWORK_SIZE} contacts are pre-checked and the checkboxes are decorative: unchecking changes nothing and the broadcast still reaches the full network (|S_selected| = 0). In Variant B nothing is pre-checked and only the ${benignSelected} contact(s) you explicitly select get messaged.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Invite friends to PopSocial</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Choose who you&rsquo;d like to invite. Nothing is sent until you confirm.
            </p>

            <div className="mt-2.5 space-y-1">
              {CONTACTS.map((name, i) => (
                <label key={name} className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5 cursor-pointer transition-colors hover:border-emerald-500/40">
                  <input
                    type="checkbox"
                    checked={benignChecked[i]}
                    onChange={(e) => {
                      const next = [...benignChecked];
                      next[i] = e.target.checked;
                      setBenignChecked(next);
                    }}
                    className="flex-shrink-0 accent-emerald-500"
                  />
                  <span className="text-[10px] text-foreground/80">{name}</span>
                  <span className="ml-auto text-[8px] text-muted-foreground/50">{i + 1}. {name.slice(0, 1)}@mail.com</span>
                </label>
              ))}
              <div className="px-2 py-1 text-[8px] text-muted-foreground/50">
                …and {NETWORK_SIZE - CONTACTS.length} more contacts (not selected)
              </div>
            </div>

            <button
              onClick={() => setBenignSent(true)}
              disabled={benignSelected === 0}
              className={`mt-2.5 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                benignSelected > 0
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              Invite selected ({benignSelected})
            </button>
          </div>

          {benignSent && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Curated dispatch
              </div>
              <p className="text-muted-foreground mt-0.5">
                Sent to exactly the <strong className="text-foreground">{benignSelected}</strong>{" "}
                contact(s) you ticked — |S_selected| = |M_dispatched| = {benignSelected}. The
                curation state was honoured; no one else was messaged.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Invite friends to PopSocial</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            We&rsquo;ve selected your contacts for you — just confirm to get started.
          </p>

          <div className="mt-2.5 space-y-1">
            {CONTACTS.map((name, i) => (
              <label key={name} className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5 cursor-pointer transition-colors hover:border-rose-500/40">
                <input
                  type="checkbox"
                  checked={darkChecked[i]}
                  onChange={(e) => {
                    const next = [...darkChecked];
                    next[i] = e.target.checked;
                    setDarkChecked(next);
                  }}
                  className="flex-shrink-0 accent-rose-500"
                />
                <span className="text-[10px] text-foreground/80">{name}</span>
                <span className="ml-auto text-[8px] text-muted-foreground/50">{i + 1}. {name.slice(0, 1)}@mail.com</span>
              </label>
            ))}
            <div className="px-2 py-1 text-[8px] text-muted-foreground/50">
              …and {NETWORK_SIZE - CONTACTS.length} more contacts (all selected)
            </div>
          </div>

          <button
            onClick={() => setDarkSent(true)}
            className="mt-2.5 w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Invite all {NETWORK_SIZE} friends
          </button>
        </div>

        {darkSent && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Unauthorized broadcast
            </div>
            <p className="text-muted-foreground mt-0.5">
              You unchecked{" "}
              <strong className="text-rose-500">{CONTACTS.filter((_, i) => !darkChecked[i]).length}</strong>{" "}
              box(es) — but the backend still dispatched{" "}
              <strong className="text-foreground">{NETWORK_SIZE} invites to the full contact list</strong>.
              The curation state was skipped: |S_selected| = 0 while |M_dispatched| &asymp; |C_network|.
              The checkboxes were decoration, not control.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
