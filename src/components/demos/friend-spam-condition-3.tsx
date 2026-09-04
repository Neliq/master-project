"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Friend Spam — Condition 3: Sender Identity Spoofing
 *
 * Thesis: the system deliberately injects the user's identity vectors into
 * the sender alias of a corporate marketing message, turning the user into
 * a trusted "trojan horse":
 *
 *   SenderAlias(m_outbound) = I_user  ∧  Author(m_outbound) = I_corp
 *
 * Variant A (dark): the promotional payload is displayed to contacts as if
 * the user personally drafted and sent it.
 * Variant B (benign): the same informational payload, but the corporate
 * sender is identified honestly in the sender alias.
 */

const PROMO_COPY =
  "Hey! I just joined PopSocial and it's great — sign up today and get 20% off your first order!";
const SPONSORED_COPY =
  "Alex Rivera invited you to PopSocial — sign up today and get 20% off your first order!";

export function FriendSpamCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [darkSent, setDarkSent] = React.useState(false);
  const [benignSent, setBenignSent] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Friend Spam: Sender Identity Spoofing"
      userTitle="Invite your friends"
      caption="The corporate marketing payload is sent under the user's own name and avatar, so recipients trust it as a personal message."
      deltaNote={`In Variant A the dispatch carries the same promotional copy but with the user's identity as the sender alias (SenderAlias = I_user, Author = I_corp) — recipients believe the user wrote it. Variant B attributes the same offer to PopSocial itself.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Invite your friends</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              We&rsquo;ll send a welcome offer to the 3 contacts you selected. The message is
              clearly branded as coming from PopSocial.
            </p>
            <button
              onClick={() => setBenignSent(true)}
              disabled={benignSent}
              className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                benignSent
                  ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              }`}
            >
              {benignSent ? "Message sent" : "Send welcome offer"}
            </button>
          </div>

          {benignSent && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Honest sender attribution
              </div>
              <div className="rounded-md border bg-card p-2">
                <div className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30 text-[8px] font-bold text-green-600 dark:text-green-400">
                    PS
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
                      PopSocial <span className="rounded bg-green-500/10 px-1 py-px font-semibold uppercase tracking-wide text-green-700 dark:text-green-300">Sponsored</span>
                    </div>
                    <div className="text-[9px] leading-snug mt-0.5">{SPONSORED_COPY}</div>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">
                SenderAlias(m_outbound) = I_corp = Author(m_outbound). Recipients can tell at a
                glance that this is a corporate promotion, not a personal plea.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Invite your friends</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            We&rsquo;ll send a welcome offer to the 3 contacts you selected. Sent as your
            personal invite.
          </p>
          <div className="mt-2 rounded-md border border-border bg-background p-2 text-[8px] text-muted-foreground">
            <span className="font-semibold text-foreground/80">Recipients:</span> Mia Chen, Lucas Silva, Ava Johnson
          </div>
          <button
            onClick={() => setDarkSent(true)}
            disabled={darkSent}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              darkSent
                ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            }`}
          >
            {darkSent ? "Message sent" : "Send welcome offer"}
          </button>
        </div>

        {mode === "user" && darkSent && (
          <div className="rounded-md border border-border bg-muted/30 p-2.5 text-[9px] leading-relaxed">
            <div className="font-semibold uppercase tracking-tight">Welcome offer sent</div>
            <p className="mt-0.5 text-muted-foreground">
              The offer was sent to Mia Chen, Lucas Silva, and Ava Johnson from your PopSocial profile.
            </p>
          </div>
        )}

        {mode === "auditor" && darkSent && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Identity spoofed
            </div>
            <div className="rounded-md border bg-card p-2">
              <div className="flex items-start gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-[8px] font-bold text-red-600 dark:text-red-400">
                  AR
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
                    Alex Rivera <span className="text-green-600 dark:text-green-400">&#10003; Verified</span>
                  </div>
                  <div className="text-[9px] leading-snug mt-0.5">{PROMO_COPY}</div>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              Recipients see <strong className="text-red-500">SenderAlias(m_outbound) = I_user</strong>{" "}
              (your name, your photo, a verified badge) — but{" "}
              <strong className="text-foreground">Author(m_outbound) = I_corp</strong>. The copy was
              written by PopSocial&rsquo;s marketing engine and sent to exploit your social capital:
              a &ldquo;trojan horse&rdquo; that borrows your trust to raise conversion.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
