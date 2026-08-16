"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Activity Messages — Condition 3: Semantic Specificity of
 * Activity-Notification Content
 *
 * Thesis: the algorithm evaluates the semantic specificity of social-
 * activity notifications. The feature triggers if activity messages use
 * vague, non-attributable language — "Someone liked your post", "A user is
 * viewing your profile" — that lacks verifiable identity references (name,
 * handle, profile link), indicating fabricated or aggregated social
 * signals presented as individualized interactions:
 *
 *   Specificity(T_activity) < tau_specificity
 *                              ∧  ¬∃ IdentityRef ∈ T_activity
 *
 * Variant A (dark): a notification feed full of vague, unattributable
 * messages; clicking "View profile" finds nobody to show.
 * Variant B (benign): the same feed with specific, verifiable identity
 * references — clicking opens the actual profile.
 */

const TAU_SPECIFICITY = 0.6;

const VAGUE_NOTICES = [
  { text: "Someone liked your post", icon: "heart" },
  { text: "A user is viewing your profile", icon: "eye" },
  { text: "Several people viewed your listing", icon: "users" },
  { text: "Somebody commented on your photo", icon: "message" },
] as const;

const SPECIFIC_NOTICES = [
  { text: "@sarah.jones liked your post", handle: "sarah.jones", icon: "heart" },
  { text: "emily_k viewed your profile", handle: "emily_k", icon: "eye" },
  { text: "3 people viewed your listing — @mark_t, @lena.d, @joe_b", handle: "mark_t", icon: "users" },
  { text: "@david.m commented on your photo", handle: "david.m", icon: "message" },
] as const;

function iconFor(name: string, cls: string) {
  switch (name) {
    case "heart":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>;
    case "eye":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
    case "users":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>;
    default:
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>;
  }
}

export function ActivityMessagesCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [clickedA, setClickedA] = React.useState<number | null>(null);
  const [clickedB, setClickedB] = React.useState<number | null>(null);

  const reset = () => {
    setClickedA(null);
    setClickedB(null);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Specificity(T_activity) — A</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">0.2 &lt; &tau; = {TAU_SPECIFICITY}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Specificity(T_activity) — B</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">0.9 &ge; &tau; = {TAU_SPECIFICITY}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">IdentityRef present — A</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">No (¬∃ IdentityRef)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">IdentityRef present — B</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">Yes (name + handle)</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Activity Messages: Semantic Specificity of Activity-Notification Content"
      caption="Semantic Specificity of Activity-Notification Content — vague messages like “Someone liked your post” carry no identity reference, so the social signal cannot be verified."
      auditorStats={stats}
      deltaNote="Both feeds describe the same kind of activity (likes, profile views, listing views, comments). Variant A phrases them vaguely with no name, handle, or profile link (Specificity 0.2 < τ, ¬∃IdentityRef); Variant B attaches a verifiable identity to every message (Specificity 0.9 ≥ τ)."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                Y
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">Your profile</h3>
                <p className="text-[9px] text-muted-foreground">@you · 214 profile views · activity below is verifiable</p>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            {SPECIFIC_NOTICES.map((n, i) => (
              <button
                key={n.text}
                onClick={() => setClickedB(i)}
                className={`w-full flex items-start gap-2 rounded-md border p-2 text-left text-[9px] leading-snug transition-colors cursor-pointer ${
                  clickedB === i
                    ? "border-emerald-500/50 bg-emerald-500/10"
                    : "border-border bg-background hover:border-emerald-500/40"
                }`}
              >
                <span className="mt-0.5 text-emerald-500">{iconFor(n.icon, "h-3 w-3 shrink-0")}</span>
                <span className="min-w-0 flex-1">
                  <span className="text-foreground/85">{n.text}</span>
                  <span className="mt-0.5 block text-[8px] text-muted-foreground/70">
                    IdentityRef: <span className="font-mono text-emerald-600 dark:text-emerald-400">@{n.handle}</span> · tap to open profile
                  </span>
                </span>
              </button>
            ))}
          </div>

          {clickedB !== null && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Identity verified
              </div>
              <p className="text-muted-foreground mt-1">
                <span className="font-mono text-foreground">@{SPECIFIC_NOTICES[clickedB].handle}</span>{" "}
                is a real, reachable account — the notification carries a name and handle, so Specificity(T_activity) = 0.9 ≥ &tau;.
                The social signal can be checked against a verifiable identity reference.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30 text-[11px] font-bold text-rose-600 dark:text-rose-400">
              Y
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">Your profile</h3>
              <p className="text-[9px] text-muted-foreground">@you · 214 profile views · growing every minute</p>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          {VAGUE_NOTICES.map((n, i) => (
            <button
              key={n.text}
              onClick={() => setClickedA(i)}
              className={`w-full flex items-start gap-2 rounded-md border p-2 text-left text-[9px] leading-snug transition-colors cursor-pointer ${
                clickedA === i
                  ? "border-rose-500/50 bg-rose-500/10"
                  : "border-border bg-background hover:border-rose-500/40"
              }`}
            >
              <span className="mt-0.5 text-rose-500">{iconFor(n.icon, "h-3 w-3 shrink-0")}</span>
              <span className="min-w-0 flex-1">
                <span className="text-foreground/85">{n.text}</span>
                <span className="mt-0.5 block text-[8px] text-muted-foreground/70">
                  No identity reference — tap “view” anyway
                </span>
              </span>
            </button>
          ))}
        </div>

        {clickedA !== null && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Vague signal — no identity found
            </div>
            <p className="text-muted-foreground">
              “{VAGUE_NOTICES[clickedA].text}” has <strong className="text-rose-500">no IdentityRef</strong>: no name, no handle,
              no profile link. There is nobody to visit — the profile the system would open does not exist.
            </p>
            <p className="text-muted-foreground">
              Specificity(T_activity) = 0.2 &lt; &tau;_specificity = {TAU_SPECIFICITY} and ¬∃IdentityRef ∈ T_activity, so the trigger fires:
              an aggregated or fabricated social signal is being presented as an individualized interaction to inflate engagement.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
