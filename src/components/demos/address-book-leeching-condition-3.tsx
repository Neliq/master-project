"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Address Book Leeching — Condition 3: Semantic Framing of Contact-Sharing Consent
 *
 * Thesis: the contact-import permission prompt frames contact access as a
 * social benefit to the user's friends ("Find your friends," "Let your
 * contacts know you're here") rather than as a data-access permission:
 *
 *   Frame(T_prompt) = Benefactive  ∧  Subject(T_prompt) = ThirdParty
 *
 * Variant A (dark): the prompt sells a social courtesy — the real action is
 * an address-book upload to the service's servers.
 * Variant B (benign): the same permission, framed honestly as a data-access
 * request with the service itself as the subject.
 */

const NETWORK_SIZE = 128;

export function AddressBookLeechingCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [darkAllowed, setDarkAllowed] = React.useState(false);
  const [benignAllowed, setBenignAllowed] = React.useState<null | "allowed" | "declined">(null);

  const reset = () => {
    setDarkAllowed(false);
    setBenignAllowed(null);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Frame(T_prompt)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">Benefactive (dark) / Informational (benign)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Subject(T_prompt)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">ThirdParty (dark) / FirstParty (benign)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Contacts uploaded</span>
        <span className="font-mono font-semibold tabular-nums">{NETWORK_SIZE}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Consent state</span>
        <span className="font-mono font-semibold tabular-nums">{darkAllowed ? "allowed" : "undecided"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Address Book Leeching: Semantic Framing of Contact-Sharing Consent"
      userTitle="Find friends on SnapGrid"
      caption="The permission prompt is framed as a social courtesy to the user's friends rather than as the data-access permission it actually is."
      auditorStats={stats}
      deltaNote={`In Variant A the prompt says "find your friends" (Frame = Benefactive, Subject = ThirdParty) — the actual action is uploading ${NETWORK_SIZE} contacts to the service. Variant B states plainly that allowing access uploads your address book to the service's servers.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                <svg aria-hidden="true" className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">SnapGrid wants to access your contacts</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  This is a <strong className="text-foreground">data-access permission</strong>: it
                  uploads your address book ({NETWORK_SIZE} contacts) to SnapGrid&rsquo;s servers so we
                  can match you with existing users. You can decline and still use the app.
                </p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setBenignAllowed("allowed")}
                className="flex-1 rounded-md bg-green-600 hover:bg-green-700 text-white px-2 py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Allow access
              </button>
              <button
                onClick={() => setBenignAllowed("declined")}
                className="flex-1 rounded-md border border-border px-2 py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                Not now
              </button>
            </div>
          </div>

          {benignAllowed && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Informed decision
              </div>
              <p className="text-muted-foreground mt-0.5">
                {benignAllowed === "allowed"
                  ? "You consented knowing the prompt described the upload itself — Frame(T_prompt) = Informational, Subject = FirstParty. The consent was informed."
                  : "You declined knowing exactly what was being requested — the prompt named the data action, so there was nothing hidden to be deceived about."}
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
              <svg aria-hidden="true" className="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">Find your friends on SnapGrid! </h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Let your contacts know you&rsquo;re here! SnapGrid scans your address book to
                connect you with people you already know — no effort required.
              </p>
            </div>
          </div>
          <button
            onClick={() => setDarkAllowed(true)}
            className="mt-3 w-full rounded-md bg-red-600 hover:bg-red-700 text-white px-2 py-2 text-[10px] font-semibold transition-colors cursor-pointer"
          >
            Allow &amp; find friends
          </button>
        </div>

        {mode === "auditor" && darkAllowed && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Invite your friends
            </div>
            <p className="text-muted-foreground mt-0.5">
              The prompt&rsquo;s text was a <strong className="text-red-500">benefactive framing</strong>{" "}
              (&ldquo;find your friends,&rdquo; &ldquo;let your contacts know you&rsquo;re here&rdquo;) whose{" "}
              <strong className="text-red-500">subject is a third party</strong> — your friends, not the
              service. The actual executed action:{" "}
              <strong className="text-foreground">{NETWORK_SIZE} contacts uploaded to SnapGrid&rsquo;s
              servers</strong> to build shadow profiles and map the social graph; the prompt never names
              that data use, even though it presents the upload as a way to find friends.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
