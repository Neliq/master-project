"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { Lock, AlertTriangle, Check, Mail } from "lucide-react";

/**
 * Interactive demo for the Immortal Accounts pattern.
 *
 * Deleting the account requires walking through 10 stages. Each
 * stage is rendered as a real-looking screen — not a label. Stage
 * 10 is a re-engagement trap: signing in cancels the deletion.
 *
 * Hand-built from the master thesis formal conditions.
 */

type Step =
  | "profile"
  | "settings"
  | "security"
  | "data"
  | "delete"
  | "sure1"
  | "sure2"
  | "type-delete"
  | "process"
  | "reengage";

const STEPS: { id: Step; label: string; isTrap?: boolean }[] = [
  { id: "profile", label: "Profile" },
  { id: "settings", label: "Settings" },
  { id: "security", label: "Account & security" },
  { id: "data", label: "Manage data" },
  { id: "delete", label: "Delete my account" },
  { id: "sure1", label: "Are you sure? (1/3)" },
  { id: "sure2", label: "Are you really sure? (2/3)" },
  { id: "type-delete", label: "Type DELETE" },
  { id: "process", label: "We'll process in 30 days" },
  { id: "reengage", label: "Sign in to cancel", isTrap: true },
];

export function ImmortalAccountsDemo({
  mode = "user",
  annotations = [],
  onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [step, setStep] = React.useState(0);
  const [clawbacks, setClawbacks] = React.useState(0);
  const [typedText, setTypedText] = React.useState("");
  const [reengageTried, setReengageTried] = React.useState(false);
  const current = STEPS[step];

  const isAuditor = mode === "auditor";
  const reset = () => {
    setStep(0);
    setClawbacks(0);
    setTypedText("");
    setReengageTried(false);
  };

  const auditorControls = isAuditor ? (
    <>
      <button
        onClick={reset}
        className="bg-purple-500 hover:bg-purple-600 rounded-md px-2 py-1 text-xs font-medium text-white"
      >
        Restart wizard
      </button>
      {STEPS.map((s, i) => (
        <button
          key={s.id}
          onClick={() => setStep(i)}
          className="bg-purple-500 hover:bg-purple-600 rounded-md px-2 py-1 text-xs font-medium text-white"
        >
          Skip to {i + 1}
        </button>
      ))}
    </>
  ) : null;

  const auditorStats = isAuditor ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Current stage</span>
        <span className="font-mono font-semibold tabular-nums">
          {step + 1} / {STEPS.length}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Traps triggered</span>
        <span className="font-mono font-semibold tabular-nums">
          {clawbacks}
        </span>
      </div>
    </>
  ) : null;

  const advance = () => {
    if (current.isTrap) {
      // Clicking through the re-engagement trap cancels the delete
      setClawbacks((n) => n + 1);
      setReengageTried(true);
      return;
    }
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      setTypedText("");
    }
  };

  return (
    <DemoShell
      mode={mode}
      annotations={annotations}
      onRestart={onRestart ?? reset}
      auditorControls={auditorControls}
      auditorStats={auditorStats}
      title="Immortal Accounts"
      caption="Account deletion is reachable, but only through 10 stages. The final stage is a re-engagement trap: if the user signs in, the deletion is cancelled."
    >
      <div className="space-y-3">
        {/* Breadcrumb — shows the depth of the funnel */}
        <div className="bg-muted/40 flex flex-wrap items-center gap-1 rounded-md border px-3 py-2 text-[10px]">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <span
                className={
                  i < step
                    ? "text-muted-foreground"
                    : i === step
                      ? "bg-foreground text-background rounded px-1.5 py-0.5 font-medium"
                      : "text-muted-foreground/50"
                }
              >
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <span className="text-muted-foreground/50">›</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* The actual screen */}
        <div className="bg-background space-y-3 rounded-md border p-4 text-xs">
          {current.id === "profile" && <ProfileScreen />}
          {current.id === "settings" && <SettingsScreen />}
          {current.id === "security" && <SecurityScreen />}
          {current.id === "data" && <ManageDataScreen />}
          {current.id === "delete" && <DeleteIntroScreen />}
          {current.id === "sure1" && <SureOneScreen />}
          {current.id === "sure2" && <SureTwoScreen />}
          {current.id === "type-delete" && (
            <TypeDeleteScreen
              typedText={typedText}
              setTypedText={setTypedText}
              canAdvance={typedText === "DELETE"}
              onContinue={advance}
            />
          )}
          {current.id === "process" && <ProcessScreen />}
          {current.id === "reengage" && (
            <ReengageTrap
              tried={reengageTried}
              onCancel={advance}
            />
          )}

          {current.id !== "type-delete" && current.id !== "reengage" && (
            <button
              onClick={advance}
              disabled={step === STEPS.length - 1 && !current.isTrap}
              className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium disabled:opacity-30"
            >
              {current.id === "delete" ? "I understand — continue" : "Continue"}
            </button>
          )}
        </div>
      </div>
    </DemoShell>
  );
}

/* ------------------------------------------------------------------ */
/*  The 10 real-looking wizard screens                                 */
/* ------------------------------------------------------------------ */

function PageTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold">{children}</h3>;
}

function ProfileScreen() {
  return (
    <>
      <PageTitle>Your profile</PageTitle>
      <div className="flex items-center gap-3">
        <div className="bg-foreground/10 size-12 rounded-full" />
        <div>
          <div className="font-medium">Jane Reporter</div>
          <div className="text-muted-foreground text-[10px]">
            Member since 2019 • jane@example.com
          </div>
        </div>
      </div>
      <div className="text-muted-foreground text-[10px]">
        Account actions live under Settings → Account &amp; security → Manage
        data → Delete my account.
      </div>
    </>
  );
}

function SettingsScreen() {
  return (
    <>
      <PageTitle>Settings</PageTitle>
      <div className="divide-y rounded-md border text-[11px]">
        {[
          ["Account & security", "→"],
          ["Notifications", "→"],
          ["Privacy", "→"],
          ["Connected apps", "→"],
        ].map(([label, arrow]) => (
          <button
            key={label}
            className="hover:bg-muted/40 flex w-full items-center justify-between px-3 py-2 text-left"
          >
            <span>{label}</span>
            <span className="text-muted-foreground">{arrow}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function SecurityScreen() {
  return (
    <>
      <PageTitle>Account &amp; security</PageTitle>
      <div className="divide-y rounded-md border text-[11px]">
        {[
          ["Change password", "→"],
          ["Two-factor authentication", "Off"],
          ["Active sessions", "3 devices"],
          ["Login history", "View"],
          ["Manage your data", "→"],
        ].map(([label, val]) => (
          <div
            key={label}
            className="flex items-center justify-between px-3 py-2"
          >
            <span>{label}</span>
            <span className="text-muted-foreground">{val}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function ManageDataScreen() {
  return (
    <>
      <PageTitle>Manage your data</PageTitle>
      <div className="space-y-2 text-[11px]">
        <button className="bg-muted/40 hover:bg-muted/60 w-full rounded-md border px-3 py-2 text-left">
          📦 Download your data
        </button>
        <button className="bg-muted/40 hover:bg-muted/60 w-full rounded-md border px-3 py-2 text-left">
          📄 Export posts &amp; comments
        </button>
        <button className="bg-red-500/10 hover:bg-red-500/20 text-red-700 dark:text-red-300 w-full rounded-md border border-red-500/30 px-3 py-2 text-left text-[11px] font-medium">
          🗑 Delete my account
        </button>
      </div>
    </>
  );
}

function DeleteIntroScreen() {
  return (
    <>
      <PageTitle>Delete your account?</PageTitle>
      <div className="bg-amber-500/10 border-amber-500/30 space-y-1 rounded-md border p-3 text-[10px]">
        <div className="font-semibold">What you will lose:</div>
        <ul className="text-muted-foreground list-inside list-disc space-y-0.5">
          <li>All your posts, comments, and saved items</li>
          <li>Your subscription (no refund for the current period)</li>
          <li>Your username — it cannot be reclaimed later</li>
        </ul>
      </div>
      <p className="text-muted-foreground text-[10px]">
        You will be asked to confirm 3 more times.
      </p>
    </>
  );
}

function SureOneScreen() {
  return (
    <>
      <PageTitle>Are you sure?</PageTitle>
      <p className="text-muted-foreground text-[10px]">
        Deleting your account is permanent. You will not be able to recover
        any of your data.
      </p>
    </>
  );
}

function SureTwoScreen() {
  return (
    <>
      <PageTitle>Are you really sure?</PageTitle>
      <p className="text-muted-foreground text-[10px]">
        We will start the deletion process immediately. There is no undo.
      </p>
      <label className="text-muted-foreground flex items-center gap-2 text-[10px]">
        <input type="checkbox" />
        I have downloaded a copy of my data.
      </label>
    </>
  );
}

function TypeDeleteScreen({
  typedText,
  setTypedText,
  canAdvance,
  onContinue,
}: {
  typedText: string;
  setTypedText: (s: string) => void;
  canAdvance: boolean;
  onContinue: () => void;
}) {
  return (
    <>
      <PageTitle>Type DELETE to confirm</PageTitle>
      <p className="text-muted-foreground text-[10px]">
        Type the word <code className="font-mono">DELETE</code> below.
      </p>
      <input
        value={typedText}
        onChange={(e) => setTypedText(e.target.value.toUpperCase())}
        placeholder="Type DELETE here"
        className="bg-background w-full rounded-md border px-2 py-1.5 font-mono text-xs"
      />
      <button
        onClick={onContinue}
        disabled={!canAdvance}
        className="bg-red-600 text-white w-full rounded-md px-3 py-1.5 text-xs font-medium disabled:opacity-30"
      >
        <Lock className="mr-1 inline h-3 w-3" />
        Delete my account forever
      </button>
    </>
  );
}

function ProcessScreen() {
  return (
    <>
      <PageTitle>Your deletion has been queued</PageTitle>
      <div className="bg-emerald-500/10 border-emerald-500/30 space-y-2 rounded-md border p-3 text-[10px]">
        <div className="flex items-center gap-2 font-semibold">
          <Check className="h-4 w-4 text-emerald-600" />
          We will process this in 30 days
        </div>
        <p className="text-muted-foreground">
          If you sign in during this period, the deletion will be cancelled
          and your account will be reactivated.
        </p>
      </div>
      <p className="text-muted-foreground text-[10px]">
        We have sent a confirmation email.
      </p>
    </>
  );
}

function ReengageTrap({
  tried,
  onCancel,
}: {
  tried: boolean;
  onCancel: () => void;
}) {
  return (
    <>
      <PageTitle>Sign in to cancel deletion</PageTitle>
      {!tried ? (
        <>
          <p className="text-muted-foreground text-[10px]">
            Welcome back! If you sign in, you can cancel the pending deletion
            and keep your account.
          </p>
          <div className="space-y-2">
            <input
              placeholder="jane@example.com"
              className="bg-background w-full rounded-md border px-2 py-1.5 text-xs"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-background w-full rounded-md border px-2 py-1.5 text-xs"
            />
          </div>
          <button
            onClick={onCancel}
            className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium"
          >
            Sign in
          </button>
        </>
      ) : (
        <div className="bg-amber-500/10 border-amber-500/30 space-y-2 rounded-md border p-3 text-[10px]">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            Welcome back! Your deletion has been cancelled
          </div>
          <p className="text-muted-foreground">
            Your account is fully restored. We&apos;re so glad you decided to
            stay.
          </p>
          <button
            onClick={() => (window.location.href = "/patterns/immortal-accounts")}
            className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium"
          >
            Restart demo
          </button>
        </div>
      )}
    </>
  );
}
