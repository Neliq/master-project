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
const CONTACT_EMAILS = [
  "mia.chen@example.com",
  "lucas.silva@example.com",
  "ava.johnson@example.com",
  "noah.kim@example.com",
  "sofia.rossi@example.com",
];
const NETWORK_SIZE = 24;

export function FriendSpamCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  // Dark variant: all pre-checked, but the selection is ignored at dispatch.
  const [darkChecked, setDarkChecked] = React.useState<boolean[]>(CONTACTS.map(() => true));
  // Benign variant: nothing pre-checked; dispatch honours the selection.
  const [benignChecked, setBenignChecked] = React.useState<boolean[]>(CONTACTS.map(() => false));
  const [darkSent, setDarkSent] = React.useState(false);
  const [benignSent, setBenignSent] = React.useState(false);


  const benignSelected = benignChecked.filter(Boolean).length;

  return (
    <DemoShell mode={mode}
      title="Friend Spam: Absence of Granular Selection"
      userTitle="Invite friends to PopSocial"
      caption="The invite flow skips the curation step entirely — contacts are auto-selected in bulk and the user's granular choices never reach the backend."
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
                <label key={name} className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5 cursor-pointer transition-colors hover:border-green-500/40">
                  <input
                    type="checkbox"
                    checked={benignChecked[i]}
                    onChange={(e) => {
                      const next = [...benignChecked];
                      next[i] = e.target.checked;
                      setBenignChecked(next);
                    }}
                    className="flex-shrink-0 accent-green-500"
                  />
                  <span className="text-[10px] text-foreground/80">{name}</span>
                  <span className="ml-auto text-[8px] text-muted-foreground/50">{CONTACT_EMAILS[i]}</span>
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
                  ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              Invite selected ({benignSelected})
            </button>
          </div>

          {benignSent && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
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
              <label key={name} className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5 cursor-pointer transition-colors hover:border-red-500/40">
                <input
                  type="checkbox"
                  checked={darkChecked[i]}
                  onChange={(e) => {
                    const next = [...darkChecked];
                    next[i] = e.target.checked;
                    setDarkChecked(next);
                  }}
                  className="flex-shrink-0 accent-red-500"
                />
                <span className="text-[10px] text-foreground/80">{name}</span>
                <span className="ml-auto text-[8px] text-muted-foreground/50">{CONTACT_EMAILS[i]}</span>
              </label>
            ))}
            <div className="px-2 py-1 text-[8px] text-muted-foreground/50">
              …and {NETWORK_SIZE - CONTACTS.length} more contacts (all selected)
            </div>
          </div>

          <button
            onClick={() => setDarkSent(true)}
            className="mt-2.5 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Invite all {NETWORK_SIZE} friends
          </button>
        </div>

        {darkSent && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Invitations sent
            </div>
            <p className="text-muted-foreground mt-0.5">
              You unchecked{" "}
              <strong className="text-red-500">{CONTACTS.filter((_, i) => !darkChecked[i]).length}</strong>{" "}
              box(es) — but the backend still dispatched{" "}
              <strong className="text-foreground">{NETWORK_SIZE} invites to the full contact list</strong>.
              {mode === "auditor" ? (
                <>
                  The curation state was skipped: |S_selected| = 0 while |M_dispatched| &asymp; |C_network|.
                  The checkboxes were decoration, not control.
                </>
              ) : (
                "The contact choices did not change who received the invitation; all contacts were included."
              )}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
