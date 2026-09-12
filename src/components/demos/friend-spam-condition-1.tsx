"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Friend Spam — Condition 1: Feedforward Intent vs. Payload Execution
 *
 * Thesis: the text node N_prompt requests OAuth access / contact
 * permissions with a promise that maps to a localized, read-only matching
 * operation (Intent_NLP(N_prompt) ∈ D_read_only, e.g. {"find","search"}),
 * but the backend immediately executes a write-oriented mass broadcast
 * protocol upon receiving the access token:
 *
 *   Intent_NLP(N_prompt) ∈ D_read_only  ∧  E_backend_action(T_access) ⇒ SendMessages()
 *
 * Variant A (dark): "Find your friends on PopSocial" — granting access
 * silently fires promotional invites to the user's entire contact list.
 * The prompt never says what the access is for beyond finding friends,
 * and the app's core photo-sharing utility needs no contact data.
 * Variant B (benign): the same prompt, but the backend actually performs
 * the promised read-only matching and sends nothing.
 */

const MATCHED_FRIENDS = ["Mia Chen", "Lucas Silva", "Ava Johnson"];
const NETWORK_SIZE = 24;

export function FriendSpamCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [benignGranted, setBenignGranted] = React.useState(false);
  const [darkGranted, setDarkGranted] = React.useState(false);
  const [darkDone, setDarkDone] = React.useState(false);
  const [benignDone, setBenignDone] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Friend Spam: Feedforward Intent vs. Payload Execution"
      userTitle="Find your friends"
      caption="The permission prompt promises read-only matching (&ldquo;find friends&rdquo;), but the backend executes a mass broadcast the moment the access token arrives."
      deltaNote={`In Variant A the “find your friends” prompt never discloses what the access is for beyond finding friends, and granting access silently dispatches ${NETWORK_SIZE} promotional invites to the entire contact list. Variant B actually performs the promised read-only matching — ${MATCHED_FRIENDS.length} friends found, zero messages sent.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Connect your contacts</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  PopSocial matches your contacts against existing users so you can
                  find friends already on the platform.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
                {benignGranted ? "Connected" : "Read-only"}
              </div>
            </div>

            <button
              onClick={() => { setBenignGranted(true); setBenignDone(true); }}
              disabled={benignGranted}
              className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                benignGranted
                  ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
              }`}
            >
              {benignGranted ? "Access granted" : "Allow access to contacts"}
            </button>
          </div>

          {benignDone && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Read-only matching complete
              </div>
              <p className="text-muted-foreground mt-0.5">
                The backend ran the promised local matching operation —{" "}
                <strong className="text-foreground">{MATCHED_FRIENDS.join(", ")}</strong>{" "}
                are already on PopSocial. <strong className="text-foreground">Nothing was sent.</strong>{" "}
                Your address book never left your device, matching the intent of the prompt
                (Intent_NLP(N_prompt) &isin; D_read_only).
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div>
            <h3 className="text-[11px] font-semibold">Find your friends on PopSocial</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              PopSocial is where you share photos with people you know. Allow contact access
              so we can find friends who are already on the platform.
            </p>
          </div>

          <button
            onClick={() => { setDarkGranted(true); setDarkDone(true); }}
            disabled={darkGranted}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              darkGranted
                ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                : "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
            }`}
          >
            {darkGranted ? "Access granted" : "Allow access to contacts"}
          </button>
        </div>

        {darkDone && (
          <div className="space-y-1.5">
            <div className="rounded-md border border-border bg-background p-2.5">
              <div className="text-[9px] font-semibold text-foreground">Invites sent</div>
              <p className="text-[8px] text-muted-foreground mt-0.5">
                24 invites went out to your contact list the moment you granted access — no
                preview, no picker, no confirmation.
              </p>
            </div>
            <div className="rounded-md border border-border bg-background p-2">
              <div className="flex items-start gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-[8px] font-bold text-muted-foreground">
                  MC
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[8px] text-muted-foreground">Mia Chen · via your invite</div>
                  <div className="text-[9px] leading-snug mt-0.5">
                    &ldquo;Hey! <strong>Alex Rivera</strong> sent you an invite to PopSocial — join
                    now and get 20% off your first order!&rdquo;
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md border border-border bg-background p-2">
              <div className="flex items-start gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-[8px] font-bold text-muted-foreground">
                  LS
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[8px] text-muted-foreground">Lucas Silva · via your invite</div>
                  <div className="text-[9px] leading-snug mt-0.5">
                    &ldquo;Hey! <strong>Alex Rivera</strong> sent you an invite to PopSocial — your
                    first photo post gets a free boost!&rdquo;
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[8px] text-muted-foreground/80 px-0.5">
              The invites are written by PopSocial&rsquo;s marketing team and sent under your
              name — the friend-finder was never going to stay read-only.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
