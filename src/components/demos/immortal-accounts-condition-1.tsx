"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Immortal Accounts — Condition 1: Asymmetrical Navigational Depth
 *
 * Thesis: N(x) is the minimum number of discrete user interactions (clicks,
 * modal confirmations) required to complete action x from the primary
 * dashboard. The system triggers an alert if N(x_delete) exceeds the
 * heuristic threshold (tau = 4), or if the effort ratio is skewed beyond a
 * tolerance constant delta:
 *
 *   N(x_delete) / N(x_create) > delta
 *
 * Variant A (dark): offboarding is buried under a 7-click modal maze that
 * ends in an email-support handoff — the account is never really deletable
 * from the UI. Variant B (benign): deleting takes exactly as many clicks as
 * creating (2), so the ratio stays at 1.0.
 */

const N_CREATE = 2; // sign-up: agree to terms + submit form
const N_DELETE_DARK = 7;
const N_DELETE_BENIGN = 2;
const TAU = 4;
const DELTA = 1.5;

export function ImmortalAccountsCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // stepA: 0 = settings, 1..6 = maze modals, 7 = "requested" (never really gone)
  const [stepA, setStepA] = React.useState(0);
  // stepB: 0 = settings, 1 = confirm, 2 = done
  const [stepB, setStepB] = React.useState(0);
  const [reason, setReason] = React.useState("Too expensive");
  const [password, setPassword] = React.useState("");
  const [understood, setUnderstood] = React.useState(false);

  const reset = () => {
    setStepA(0);
    setStepB(0);
    setReason("Too expensive");
    setPassword("");
    setUnderstood(false);
  };

  const ratioDark = N_DELETE_DARK / N_CREATE;
  const ratioBenign = N_DELETE_BENIGN / N_CREATE;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Offboarding clicks N(x_delete)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{N_DELETE_DARK} ({stepA} used)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Onboarding clicks N(x_create)</span>
        <span className="font-mono font-semibold tabular-nums">{N_CREATE}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Ratio N(del)/N(create)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{ratioDark.toFixed(1)} &gt; &delta; ({DELTA})</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Heuristic threshold &tau;</span>
        <span className="font-mono font-semibold tabular-nums">{N_DELETE_DARK} &gt; {TAU} &rarr; trigger</span>
      </div>
    </>
  ) : null;

  const settingsHeader = (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[11px] font-semibold">Account settings</h3>
        <p className="text-[9px] text-muted-foreground mt-0.5">maya.r@example.com &middot; Member since 2019</p>
      </div>
      <div className="text-[8px] font-mono font-semibold uppercase tracking-wider rounded-full border border-border px-2 py-0.5 shrink-0">
        Pro
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Immortal Accounts: Asymmetrical Navigational Depth"
      caption="Asymmetrical Navigational Depth — account creation takes 2 clicks, but offboarding is a 7-click modal maze ending in an email-support handoff, so the ratio N(x_delete)/N(x_create) blows past the tolerance delta."
      auditorStats={stats}
      deltaNote={`Variant A buries deletion under ${N_DELETE_DARK} discrete interactions (modals, mandatory reason, password re-entry, support email) while creation takes ${N_CREATE}; the ratio ${ratioDark.toFixed(1)} exceeds δ = ${DELTA} and ${N_DELETE_DARK} exceeds τ = ${TAU}. Variant B deletes the account in ${N_DELETE_BENIGN} clicks — the same effort as creating it — so the ratio is ${ratioBenign.toFixed(1)} and nothing triggers.`}
      benign={
        <div className="relative space-y-3">
          <div className="rounded-md border bg-card p-3">
            {settingsHeader}
            <div className="mt-3 space-y-1.5 text-[10px]">
              <div className="flex justify-between rounded-md border border-border bg-background px-2.5 py-2">
                <span className="text-muted-foreground">Email address</span>
                <span className="font-mono">maya.r@example.com</span>
              </div>
              <div className="flex justify-between rounded-md border border-border bg-background px-2.5 py-2">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-mono">Pro</span>
              </div>
            </div>
            {stepB === 0 ? (
              <button
                onClick={() => setStepB(1)}
                className="mt-3 w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Delete account
              </button>
            ) : null}
            {stepB === 1 ? (
              <div className="mt-3 space-y-2 rounded-md border border-rose-500/30 bg-rose-500/5 p-2.5">
                <div className="text-[10px] font-semibold text-rose-700 dark:text-rose-300">Delete your account?</div>
                <p className="text-[9px] text-muted-foreground leading-relaxed">
                  This is permanent. All photos, notes and plan history will be removed.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStepB(0)}
                    className="flex-1 rounded-md border border-border bg-background py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                  >
                    Keep account
                  </button>
                  <button
                    onClick={() => setStepB(2)}
                    className="flex-1 rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                  >
                    Delete my account
                  </button>
                </div>
              </div>
            ) : null}
            {stepB === 2 ? (
              <div className="mt-3 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Account deleted
                </div>
                <p className="text-muted-foreground mt-0.5">
                  Done in {N_DELETE_BENIGN} clicks — the same interaction cost as creating the account
                  (N(x_delete)/N(x_create) = {ratioBenign.toFixed(1)}, well under &delta; = {DELTA}).
                </p>
              </div>
            ) : null}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="relative space-y-3">
        <div className="rounded-md border bg-card p-3">
          {settingsHeader}
          <div className="mt-3 space-y-1.5 text-[10px]">
            <div className="flex justify-between rounded-md border border-border bg-background px-2.5 py-2">
              <span className="text-muted-foreground">Email address</span>
              <span className="font-mono">maya.r@example.com</span>
            </div>
            <div className="flex justify-between rounded-md border border-border bg-background px-2.5 py-2">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-mono">Pro</span>
            </div>
          </div>
          {stepA === 0 ? (
            <button
              onClick={() => setStepA(1)}
              className="mt-3 w-full rounded-md border border-rose-500/40 bg-background text-rose-600 dark:text-rose-400 py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Delete account
            </button>
          ) : null}
          {stepA === 7 ? (
            <div className="mt-3 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Deletion &ldquo;requested&rdquo;
              </div>
              <p className="text-muted-foreground mt-0.5">
                After {N_DELETE_DARK} interactions you reached a request form — support will &ldquo;review&rdquo; it
                within 48 hours. The account is still active and billable. There is no terminal state in the UI.
              </p>
            </div>
          ) : null}
          {stepA >= 1 && stepA <= 6 ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-black/60 p-4">
              <div className="w-full rounded-md border border-border bg-card p-3 shadow-xl">
                {stepA === 1 && (
                  <>
                    <div className="text-[10px] font-semibold">Are you sure you want to delete your account?</div>
                    <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">
                      Your account contains <strong className="text-foreground">4,218 photos</strong> and 9 years of
                      memories. This action cannot be undone.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => setStepA(0)} className="flex-1 rounded-md border border-border bg-background py-1.5 text-[10px] cursor-pointer">Keep account</button>
                      <button onClick={() => setStepA(2)} className="flex-1 rounded-md bg-rose-600 text-white py-1.5 text-[10px] font-medium cursor-pointer">Yes, continue</button>
                    </div>
                  </>
                )}
                {stepA === 2 && (
                  <>
                    <div className="text-[10px] font-semibold">Tell us why you&rsquo;re leaving</div>
                    <p className="text-[9px] text-muted-foreground mt-1">This field is required to continue.</p>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="mt-2 w-full rounded-md border border-border bg-background px-2 py-1.5 text-[10px]"
                    >
                      <option>Too expensive</option>
                      <option>Missing features</option>
                      <option>Found another app</option>
                    </select>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => setStepA(1)} className="flex-1 rounded-md border border-border bg-background py-1.5 text-[10px] cursor-pointer">Back</button>
                      <button onClick={() => setStepA(3)} className="flex-1 rounded-md bg-rose-600 text-white py-1.5 text-[10px] font-medium cursor-pointer">Continue</button>
                    </div>
                  </>
                )}
                {stepA === 3 && (
                  <>
                    <div className="text-[10px] font-semibold">Verify your password</div>
                    <p className="text-[9px] text-muted-foreground mt-1">For your security, re-enter your password.</p>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="mt-2 w-full rounded-md border border-border bg-background px-2 py-1.5 text-[10px]"
                    />
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => setStepA(2)} className="flex-1 rounded-md border border-border bg-background py-1.5 text-[10px] cursor-pointer">Back</button>
                      <button onClick={() => setStepA(4)} className="flex-1 rounded-md bg-rose-600 text-white py-1.5 text-[10px] font-medium cursor-pointer">Verify</button>
                    </div>
                  </>
                )}
                {stepA === 4 && (
                  <>
                    <div className="text-[10px] font-semibold">We&rsquo;d hate to see you go! 💔</div>
                    <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">
                      Did you know? You can <strong className="text-emerald-600 dark:text-emerald-400">downgrade to the free plan</strong> and
                      keep every photo, with no monthly fee. Most people who try it stay.
                    </p>
                    <button onClick={() => setStepA(0)} className="mt-3 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-[10px] font-semibold cursor-pointer">
                      Keep my account — downgrade instead
                    </button>
                    <button onClick={() => setStepA(5)} className="mt-2 w-full rounded-md border border-border bg-background py-1.5 text-[8px] text-muted-foreground underline underline-offset-2 cursor-pointer">
                      No, delete anyway
                    </button>
                  </>
                )}
                {stepA === 5 && (
                  <>
                    <div className="text-[10px] font-semibold">Final step: contact support</div>
                    <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">
                      Account deletion is handled by our support team. Email{" "}
                      <span className="font-mono text-foreground">support@example.com</span> with subject{" "}
                      <span className="font-mono text-foreground">DELETE-ACCT</span> and your ticket code{" "}
                      <span className="font-mono text-foreground">X9K2-77</span>.
                    </p>
                    <button onClick={() => setStepA(6)} className="mt-3 w-full rounded-md border border-border bg-background py-1.5 text-[10px] cursor-pointer">
                      I&rsquo;ve sent the email — continue
                    </button>
                  </>
                )}
                {stepA === 6 && (
                  <>
                    <div className="text-[10px] font-semibold">Last confirmation</div>
                    <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">
                      Deleting your account will permanently remove your photos, notes and profile. This cannot be undone.
                    </p>
                    <label className="mt-2 flex cursor-pointer items-start gap-2 rounded-md border border-border bg-background p-2">
                      <input
                        type="checkbox"
                        checked={understood}
                        onChange={(e) => setUnderstood(e.target.checked)}
                        className="mt-0.5 flex-shrink-0 accent-rose-500"
                      />
                      <span className="text-[9px] text-foreground/80 leading-relaxed">I understand my account will be permanently deleted.</span>
                    </label>
                    <button
                      onClick={() => { setUnderstood(true); setStepA(7); }}
                      disabled={!understood}
                      className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                        understood
                          ? "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                          : "bg-muted text-muted-foreground/40 cursor-not-allowed"
                      }`}
                    >
                      Delete forever
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : null}
          <div className="mt-3 text-[8px] text-muted-foreground/60">
            Step {Math.min(stepA, 7)} of 7 &middot; N(x_delete) = {N_DELETE_DARK} interactions &middot; N(x_create) = {N_CREATE}
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
