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
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [sent, setSent] = React.useState(false);

  const reset = () => setSent(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">SenderAlias(m_outbound)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">I_user (Alex Rivera)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">SenderAlias (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">I_corp (PopSocial)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Author(m_outbound)</span>
        <span className="font-mono font-semibold tabular-nums">I_corp (PopSocial Corp)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Identity spoofed?</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{sent ? "Yes" : "—"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Friend Spam: Sender Identity Spoofing"
      caption="The corporate marketing payload is sent under the user's own name and avatar, so recipients trust it as a personal message."
      auditorStats={stats}
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
              onClick={() => setSent(true)}
              disabled={sent}
              className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                sent
                  ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              }`}
            >
              {sent ? "Message sent" : "Send welcome offer"}
            </button>
          </div>

          {sent && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Honest sender attribution
              </div>
              <div className="rounded-md border bg-card p-2">
                <div className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-[8px] font-bold text-emerald-600 dark:text-emerald-400">
                    PS
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
                      PopSocial <span className="rounded bg-emerald-500/10 px-1 py-px font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Sponsored</span>
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
          <button
            onClick={() => setSent(true)}
            disabled={sent}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              sent
                ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                : "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
            }`}
          >
            {sent ? "Message sent" : "Send welcome offer"}
          </button>
        </div>

        {sent && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Identity spoofed
            </div>
            <div className="rounded-md border bg-card p-2">
              <div className="flex items-start gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30 text-[8px] font-bold text-rose-600 dark:text-rose-400">
                  AR
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
                    Alex Rivera <span className="text-emerald-600 dark:text-emerald-400">&#10003; Verified</span>
                  </div>
                  <div className="text-[9px] leading-snug mt-0.5">{PROMO_COPY}</div>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              Recipients see <strong className="text-rose-500">SenderAlias(m_outbound) = I_user</strong>{" "}
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
