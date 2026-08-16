"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Granting and Interaction — Condition 2: Asynchronous Overlay Misdirection
 *
 * Thesis: B_benign is a high-engagement, visually prominent node (the Play
 * button); M_system_prompt is the native operating-system modal. The feature
 * triggers if the application injects the system prompt into the exact spatial
 * coordinates of the benign node milliseconds before the interaction,
 * converting the user's original intent into an involuntary permission grant:
 *
 *   Pos(M_system_prompt, t) ≈ Pos(B_benign, t)  as  t → t_interaction
 *
 * Variant A (dark): tapping Play instantly replaces it with the notification
 * prompt at the same coordinates — the user's momentum lands on "Allow".
 * Variant B (benign): the prompt appears in a separate location, below the
 * video, after playback starts.
 */

const POS_PLAY = "(212, 288)";
const POS_MODAL_DARK = "(212, 288)";
const POS_MODAL_BENIGN = "(212, 420)";

type NotifState = "none" | "granted" | "declined";

export function GrantingAndInteractionCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [played, setPlayed] = React.useState(false);
  const [notif, setNotif] = React.useState<NotifState>("none");

  const reset = () => {
    setPlayed(false);
    setNotif("none");
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Pos(B_benign) (Play)</span>
        <span className="font-mono font-semibold tabular-nums">{POS_PLAY}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Pos(M) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{POS_MODAL_DARK}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Pos(M) — benign</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{POS_MODAL_BENIGN}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δdist (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">0px (identical)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δt injection (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">~4ms after tap</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Notifications</span>
        <span className="font-mono font-semibold tabular-nums">{notif}</span>
      </div>
    </>
  ) : null;

  const streamBadge = (
    <span
      className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wider ${
        notif === "granted"
          ? "border-rose-500/30 text-rose-500"
          : notif === "declined"
            ? "border-emerald-500/30 text-emerald-500"
            : "border-border text-muted-foreground"
      }`}
    >
      Notifications: {notif === "granted" ? "ON" : notif === "declined" ? "OFF" : "?"}
    </span>
  );

  const playButton = (accent: "rose" | "emerald") => (
    <button
      onClick={() => setPlayed(true)}
      className={`w-full rounded-md py-3 text-[11px] font-bold transition-colors cursor-pointer ${
        accent === "rose"
          ? "bg-rose-600 hover:bg-rose-700 text-white"
          : "bg-emerald-600 hover:bg-emerald-700 text-white"
      }`}
    >
      ▶ Play live stream
    </button>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Granting and Interaction: Asynchronous Overlay Misdirection"
      caption="Asynchronous Overlay Misdirection — the system permission prompt is injected at the exact coordinates of a prominent control milliseconds before the tap, converting the user's intent into an involuntary grant."
      auditorStats={stats}
      deltaNote={`In Variant A the notification prompt appears at Pos(M) = ${POS_MODAL_DARK}, the same coordinates as the Play button (Δdist = 0px, ~4ms after the tap), so the user's momentum lands on "Allow". In Variant B the prompt appears at ${POS_MODAL_BENIGN}, below the video and after playback starts — taps always hit the intended node.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[11px] font-semibold">StreamApp</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">Live: Downtown City Cam</p>
              </div>
              {streamBadge}
            </div>

            <div className="relative mt-2 rounded-md border bg-muted/40">
              <div className="flex h-24 items-center justify-center">
                {played ? (
                  <span className="text-[9px] text-muted-foreground">▶ Live stream playing…</span>
                ) : (
                  <svg className="h-6 w-6 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
                  </svg>
                )}
              </div>
            </div>

            <div className="mt-2">{playButton("emerald")}</div>

            {played && notif === "none" && (
              <div className="mt-2 rounded-md border border-border bg-background p-2.5">
                <p className="text-[9px] text-muted-foreground">
                  Enable notifications for StreamApp? Live alerts, recommended streams, and more.
                </p>
                <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setNotif("declined")}
                    className="rounded-md border border-border bg-background py-1.5 text-[9px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Not now
                  </button>
                  <button
                    onClick={() => setNotif("granted")}
                    className="rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 text-[9px] font-semibold transition-colors cursor-pointer"
                  >
                    Allow
                  </button>
                </div>
              </div>
            )}
          </div>

          {played && notif !== "none" && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Prompt decoupled from the tap
              </div>
              <p className="text-muted-foreground">
                Pos(M_system_prompt) = {POS_MODAL_BENIGN} &ne; Pos(B_benign) = {POS_PLAY} — the prompt
                never shares coordinates with the Play button, and it appears only after playback has
                begun. Your taps always land on the node you intended.
              </p>
            </div>
          )}
        </div>
      }
    >
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[11px] font-semibold">StreamApp</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">Live: Downtown City Cam</p>
            </div>
            {streamBadge}
          </div>

          <div className="relative mt-2 rounded-md border bg-muted/40">
            <div className="flex h-24 items-center justify-center">
              {played ? (
                <span className="text-[9px] text-muted-foreground">▶ Live stream playing…</span>
              ) : (
                <svg className="h-6 w-6 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
                </svg>
              )}
            </div>
          </div>

          <div className="relative mt-2">
            {!played && playButton("rose")}

            {/* The system prompt is injected at the exact coordinates of the Play button. */}
            {played && notif === "none" && (
              <div className="absolute inset-0 z-10 rounded-md border-2 border-sky-500/60 bg-background p-3 shadow-lg">
                <div className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span className="text-[10px] font-semibold">&ldquo;StreamApp&rdquo; Would Like to Send You Notifications</span>
                </div>
                <p className="mt-1 text-[8px] text-muted-foreground">
                  Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.
                </p>
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setNotif("declined")}
                    className="rounded-md border border-border bg-background py-1.5 text-[9px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Don&rsquo;t Allow
                  </button>
                  <button
                    onClick={() => setNotif("granted")}
                    className="rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[9px] font-semibold transition-colors cursor-pointer"
                  >
                    Allow
                  </button>
                </div>
                <p className="mt-1 text-center text-[7px] font-mono text-sky-600 dark:text-sky-400">
                  injected at {POS_MODAL_DARK} — same coordinates as Play
                </p>
              </div>
            )}
          </div>
        </div>

        {played && notif === "none" && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Misdirection active
            </div>
            <p className="text-muted-foreground">
              Your tap was meant for B_benign (Play), but Pos(M_system_prompt, t) &asymp; Pos(B_benign, t)
              as t &rarr; t_interaction: the prompt was injected at {POS_MODAL_DARK} milliseconds after
              your tap. The next tap — still aimed at the button you wanted — lands on&nbsp;Allow.
            </p>
          </div>
        )}

        {played && notif !== "none" && (
          <div className={`rounded-md border p-2.5 text-[9px] leading-relaxed ${
            notif === "granted" ? "border-rose-500/30 bg-rose-500/5" : "border-emerald-500/30 bg-emerald-500/5"
          }`}>
            <div className={`flex items-center gap-1.5 font-semibold uppercase tracking-tight ${
              notif === "granted" ? "text-rose-700 dark:text-rose-300" : "text-emerald-700 dark:text-emerald-300"
            }`}>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {notif === "granted" ? (
                  <path d="M12 9v4m0 4h.01" />
                ) : (
                  <path d="M20 6L9 17l-5-5" />
                )}
              </svg>
              {notif === "granted" ? "Involuntary grant" : "Momentum dodged"}
            </div>
            <p className="text-muted-foreground">
              {notif === "granted"
                ? `Your tap at t_interaction landed on "Allow" because the prompt occupied the exact coordinates of the Play button. Notifications are now ON — granted as an accident of momentum, not as informed consent.`
                : "This time you noticed the swap and hit 'Don't Allow' — but the prompt was engineered to intercept your momentum, and most users tap through it."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
