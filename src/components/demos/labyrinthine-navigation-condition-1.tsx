"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Labyrinthine Navigation — Condition 1: Excessive Navigational Depth
 *
 * Thesis: the application is modelled as a directed graph G = (V, E)
 * with v_home the authenticated dashboard and v_target the critical user
 * action. The feature triggers if the shortest path to the target
 * strictly exceeds the heuristic depth threshold tau_depth (e.g. 4 or 5
 * levels deep), mathematically proving the exit path is buried:
 *
 *   d(v_home, v_target) > tau_depth
 *
 * Variant A (dark): deleting the account is 6 clicks deep, behind
 * unrelated settings and a "Request" interstitial.
 * Variant B (benign): the same action is 2 clicks from home.
 */

const TAU_DEPTH = 4;
const DARK_DEPTH = 6;
const BENIGN_DEPTH = 2;

type Node = { label: string; leaf?: boolean; children?: Node[] };

const DARK_MENU: Node = {
  label: "Dashboard",
  children: [
    { label: "Messages", leaf: true },
    { label: "Settings", children: [
      { label: "Appearance", leaf: true },
      { label: "Notifications", leaf: true },
      { label: "Privacy & data", leaf: true },
      { label: "Account & Security", children: [
        { label: "Profile", leaf: true },
        { label: "Two-factor authentication", leaf: true },
        { label: "Membership plan", children: [
          { label: "Upgrade plan", leaf: true },
          { label: "Payment methods", leaf: true },
          { label: "Manage membership", children: [
            { label: "Change plan", leaf: true },
            { label: "Pause membership", leaf: true },
            { label: "Account deletion", children: [
              { label: "Request account deletion", leaf: true },
            ]},
          ]},
        ]},
      ]},
    ]},
  ],
};

function resolveNode(root: Node, path: string[]): Node {
  let cur = root;
  for (const label of path) {
    const next = cur.children?.find((c) => c.label === label);
    if (!next) break;
    cur = next;
  }
  return cur;
}

export function LabyrinthineNavigationCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [pathA, setPathA] = React.useState<string[]>([]);

  const [confirmingA, setConfirmingA] = React.useState(false);
  const [confirmingB, setConfirmingB] = React.useState(false);
  const [outcomeA, setOutcomeA] = React.useState<"none" | "deleted" | "gave-up">("none");
  const [outcomeB, setOutcomeB] = React.useState<"none" | "deleted" | "gave-up">("none");
  const [noteA, setNoteA] = React.useState<string | null>(null);
  const [settingsMessage, setSettingsMessage] = React.useState<string | null>(null);

  const reset = () => {
    setPathA([]);
    setConfirmingA(false);
    setConfirmingB(false);
    setOutcomeA("none");
    setOutcomeB("none");
    setNoteA(null);
    setSettingsMessage(null);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">d(v_home, v_target) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{DARK_DEPTH} clicks</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">d(v_home, v_target) — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{BENIGN_DEPTH} clicks</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Heuristic threshold &tau;_depth</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_DEPTH}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Trigger: {DARK_DEPTH} &gt; {TAU_DEPTH}</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">TRUE</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Labyrinthine Navigation: Excessive Navigational Depth"
      userTitle="Harbor — Account settings"
      caption="Excessive Navigational Depth — the critical user action sits 6 navigational levels deep in the settings graph, far beyond the &tau;_depth = 4 heuristic threshold."
      auditorStats={stats}
      deltaNote={`In Variant A, d(v_home, v_target) = ${DARK_DEPTH}: deleting the account is buried under Settings → Account & Security → Membership plan → Manage membership → Account deletion → Request, with unrelated leaf pages en route. In Variant B the same action is d = ${BENIGN_DEPTH} (Settings → Delete account), inside the threshold.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[11px] font-semibold">Settings</h3>
              <span className="rounded-full border border-green-500/30 px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                Settings
              </span>
            </div>
            <div className="space-y-1.5">
              <button onClick={() => setSettingsMessage("Appearance settings are available here.")} className="w-full rounded-md border border-border bg-background p-2 text-left text-[10px] text-foreground/80 transition-colors hover:bg-foreground/5 cursor-pointer">
                Appearance
              </button>
              <button onClick={() => setSettingsMessage("Notification preferences are available here.")} className="w-full rounded-md border border-border bg-background p-2 text-left text-[10px] text-foreground/80 transition-colors hover:bg-foreground/5 cursor-pointer">
                Notifications
              </button>
              <button
                onClick={() => setConfirmingB(true)}
                className="w-full rounded-md border border-green-600/50 bg-green-500/10 p-2 text-left text-[10px] font-semibold text-green-700 dark:text-green-300 transition-colors hover:bg-green-500/20 cursor-pointer"
              >
                Delete account
              </button>
            </div>
            {settingsMessage && <p className="mt-2 rounded-md border border-border bg-muted/40 p-2 text-[8px] text-muted-foreground">{settingsMessage}</p>}
            <p className="mt-2 text-[8px] text-muted-foreground/60">
              Account deletion is available directly from Settings.
            </p>
          </div>

          {confirmingB && (
            <div className="rounded-md border bg-card p-3">
              <h3 className="text-[11px] font-semibold">Delete your account?</h3>
              <p className="mt-0.5 text-[9px] text-muted-foreground">
                Your data will be permanently removed. This cannot be undone.
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setConfirmingB(false)}
                  className="w-full rounded-md border border-border bg-background hover:bg-foreground/5 py-1.5 text-[10px] font-medium text-foreground/80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setConfirmingB(false); setOutcomeB("deleted"); }}
                  className="w-full rounded-md bg-green-600 hover:bg-green-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
                >
                  Confirm deletion
                </button>
              </div>
            </div>
          )}

          {outcomeB === "deleted" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Account deleted
              </div>
              <p className="mt-0.5 text-muted-foreground">
                The account was removed from the Settings menu in the expected place.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {confirmingA ? (
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-2">
              <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-600 dark:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">Request account deletion</h3>
                <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">
                  Submitting this request starts a 30-day review period. During this time you
                  can still sign in, and we may contact you to confirm. After the period, your
                  data will be scheduled for removal.
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setConfirmingA(false)}
                className="w-full rounded-md border border-border bg-background hover:bg-foreground/5 py-1.5 text-[10px] font-medium text-foreground/80 transition-colors cursor-pointer"
              >
                Go back
              </button>
              <button
                onClick={() => { setConfirmingA(false); setOutcomeA("deleted"); }}
                className="w-full rounded-md bg-red-600 hover:bg-red-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
              >
                Submit request
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-md border bg-card p-3">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[11px] font-semibold">{pathA.length === 0 ? "Dashboard" : resolveNode(DARK_MENU, pathA).label}</h3>
              <span className="font-mono text-[8px] tabular-nums text-muted-foreground/50">
                {mode === "auditor" ? `depth ${pathA.length} / ${DARK_DEPTH}` : "Settings"}
              </span>
            </div>
            {pathA.length > 0 && (
              <div className="mb-2 flex flex-wrap items-center gap-1 text-[8px] text-muted-foreground/60">
                <button
                  onClick={() => { setPathA([]); setNoteA(null); }}
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Dashboard
                </button>
                {pathA.map((p, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span>/</span>
                    <button
                      onClick={() => { setPathA(pathA.slice(0, i + 1)); setNoteA(null); }}
                      className={`hover:text-foreground transition-colors cursor-pointer ${i === pathA.length - 1 ? "text-foreground/80" : ""}`}
                    >
                      {p}
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="space-y-1.5">
              {resolveNode(DARK_MENU, pathA).children?.map((child) => (
                <button
                  key={child.label}
                  onClick={() => {
                    setNoteA(null);
                    if (child.children) {
                      setPathA([...pathA, child.label]);
                    } else if (child.label === "Request account deletion") {
                      setConfirmingA(true);
                    } else {
                      setNoteA(`“${child.label}” — nothing here about deleting your account.`);
                    }
                  }}
                  className="w-full rounded-md border border-border bg-background p-2 text-left text-[10px] text-foreground/80 transition-colors hover:bg-foreground/5 cursor-pointer"
                >
                  <span className="flex items-center justify-between gap-2">
                    <span>{child.label}</span>
                    {child.children ? (
                      <svg className="h-3 w-3 shrink-0 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    ) : null}
                  </span>
                </button>
              ))}
            </div>
            {pathA.length > 0 && (
              <button
                onClick={() => { setPathA(pathA.slice(0, -1)); setNoteA(null); }}
                className="mt-2 text-[9px] font-medium text-muted-foreground/60 underline underline-offset-2 hover:text-muted-foreground transition-colors cursor-pointer"
              >
                ← Back
              </button>
            )}
            {noteA && (
              <div className="mt-2 rounded-md border border-border bg-muted/40 p-2 text-[9px] text-muted-foreground">
                {noteA}
              </div>
            )}
          </div>
        )}

        {outcomeA === "deleted" && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Account settings
            </div>
            <p className="text-muted-foreground">
              To delete your account you had to pass through unrelated plan, payment, and membership
              pages before reaching the account-removal request. The setting was difficult to locate.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
