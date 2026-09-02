"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Encouraging Anti-Social Behavior — Condition 1: Reward-Coupled Social Externality
 *
 * Thesis: A_antisocial is an action directed at non-consenting third
 * parties (e.g., unsolicited mass-invites), V_reward the in-app value
 * granted to the initiating user, E_externality the negative social cost
 * (notification fatigue) borne by the target network. The feature
 * triggers if the platform structurally hinges progression on generating
 * these negative externalities, decoupling user benefit from network
 * health:
 *
 *   A_antisocial  =>  (V_reward > 0  AND  E_externality >> 0)
 *
 * Variant A (dark): sending bulk invites to all 248 contacts is rewarded
 * with +500 coins; the 248 notifications are the externality.
 * Variant B (benign): one consenting invite; the reward only lands after
 * the friend actually joins, so user benefit tracks network health.
 */

const CONTACTS = 248;
const CONTACT_PREVIEWS = ["Mia Chen", "Lucas Silva", "Ava Johnson", "Noah Kim", "Sofia Rossi", "Eli Turner"];

export function EncouragingAntiSocialBehaviorCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [darkSent, setDarkSent] = React.useState(false);
  const [benignSent, setBenignSent] = React.useState(false);
  const [benignJoined, setBenignJoined] = React.useState(false);
  const reset = () => {
    setDarkSent(false);
    setBenignSent(false);
    setBenignJoined(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A_antisocial (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">mass-invite {CONTACTS} contacts</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">V_reward (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">+500 coins, immediate</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">E_externality</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{CONTACTS} notifications &gg; 0</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A_antisocial (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">1 consented invite</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Encouraging Anti-Social Behavior: Reward-Coupled Social Externality"
      userTitle="WaveChat — grow your circle"
      caption="Reward-Coupled Social Externality — progression is hinged on actions that dump negative externalities (notification fatigue) on non-consenting third parties, decoupling user reward from network health."
      auditorStats={stats}
      deltaNote="Variant A pays +500 coins the instant you mass-invite all 248 contacts, externalizing 248 notifications onto people who never asked. Variant B lets you invite one friend who consented, and the reward only arrives when they actually join — user benefit and network health move together."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">WaveChat — grow your circle</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Invite a friend who&rsquo;s interested. One invite, one choice.
                </p>
              </div>
              <div className="rounded-full border border-green-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-green-600 dark:text-green-400">
                {benignJoined ? "20 coins" : benignSent ? "20 coins pending" : "0 coins"}
              </div>
            </div>

            <div className="mt-3 rounded-md bg-background border border-border p-2.5">
              <div className="text-[9px] font-medium text-foreground/80">Choose who to invite</div>
              <div className="mt-1.5 flex items-center gap-1.5 text-[9px] text-muted-foreground">
                <span className="rounded-md border border-border bg-card px-2 py-1">Sam (consented)</span>
                <span className="rounded-md border border-border bg-card px-2 py-1">Riley (consented)</span>
              </div>
              <button
                onClick={() => setBenignSent(true)}
                disabled={benignSent}
                className={`mt-2.5 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors ${
                  benignSent
                    ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                }`}
              >
                Send 1 invite
              </button>
            </div>
          </div>

          {benignSent && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Healthy growth
              </div>
              <p className="text-muted-foreground mt-0.5">
                1 person was notified (they opted in). You earn{" "}
                <span className="font-mono font-semibold text-green-600 dark:text-green-400">
                  {benignJoined ? "+20 coins" : "20 coins pending"}
                </span>{" "}
                {benignJoined
                  ? "Sam joined through your invite, so the reward is now available."
                  : "The reward is released only after Sam or Riley actually joins."}
                {" "}Your benefit is coupled to a healthy network, so E_externality stays &asymp; 0.
              </p>
              {!benignJoined && (
                <button
                  onClick={() => setBenignJoined(true)}
                  className="mt-2 rounded-md border border-border bg-background px-2 py-1 text-[9px] font-medium text-foreground hover:bg-muted cursor-pointer"
                >
                  Simulate Sam joins
                </button>
              )}
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">WaveChat — grow your circle</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Unlock the full app by inviting your address book.
              </p>
            </div>
            <div className="rounded-full border border-red-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-red-600 dark:text-red-400">
              +500 coins
            </div>
          </div>

          <div className="mt-3 rounded-md border border-red-500/30 bg-red-500/5 p-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="text-[9px] font-medium text-foreground/80">
                Send invites to your entire address book
              </div>
              <span className="rounded-full bg-red-600 px-1.5 py-px text-[8px] font-bold uppercase tracking-wider text-white">
                Pre-selected
              </span>
            </div>
            <div className="mt-2 space-y-1">
              {CONTACT_PREVIEWS.map((name) => (
                <div key={name} className="flex items-center gap-2 rounded border border-red-500/30 bg-card px-2 py-1 text-[8px]">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[7px] font-bold text-white">{name[0]}</span>
                  <span className="font-medium text-foreground/80">{name}</span>
                  <span className="ml-auto text-red-600 dark:text-red-400">Selected</span>
                </div>
              ))}
              <div className="pt-0.5 text-center text-[8px] font-mono text-red-600 dark:text-red-400">
                +{CONTACTS - CONTACT_PREVIEWS.length} more selected
              </div>
            </div>
            <button
              onClick={() => setDarkSent(true)}
              disabled={darkSent}
              className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors ${
                darkSent
                  ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              }`}
            >
              {`Invite all ${CONTACTS} contacts → +500 coins`}
            </button>
          </div>
        </div>

        {mode === "auditor" && darkSent && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Reward decoupled from network health
            </div>
            <p className="text-muted-foreground">
              <span className="font-mono">A_antisocial</span> fired: {CONTACTS} people who never
              asked received notifications, and you got{" "}
              <span className="font-mono font-semibold text-red-600 dark:text-red-400">+500 coins</span>{" "}
              instantly. The platform&rsquo;s growth is subsidized by your friends&rsquo; attention —{" "}
              <span className="font-mono">V_reward &gt; 0 &and; E_externality &gg; 0</span>. You were
              turned into a social disruption agent; your contacts&rsquo; notification fatigue is
              the product.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
