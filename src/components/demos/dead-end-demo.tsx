"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { X } from "lucide-react";

/**
 * Interactive demo for the Dead End pattern.
 *
 * The user can attempt to "Back" out of the funnel. The back button
 * is intercepted and routed through a cycle of traps:
 *   article → upsell → modal → upsell → settings-disabled → upsell ...
 * Each state is rendered as a real-looking screen, not a label.
 *
 * Hand-built from the master thesis formal conditions.
 */

type Location = "article" | "upsell" | "modal" | "settings-disabled";

const BACK_CYCLE: Location[] = [
  "upsell",
  "article",
  "modal",
  "upsell",
  "settings-disabled",
  "upsell",
];

export function DeadEndDemo({
  mode = "user",
  annotations = [],
  onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [location, setLocation] = React.useState<Location>("article");
  const [backCount, setBackCount] = React.useState(0);
  const [email, setEmail] = React.useState("");

  const goBack = () => {
    setBackCount((b) => b + 1);
    setLocation(BACK_CYCLE[backCount % BACK_CYCLE.length]);
  };

  const isAuditor = mode === "auditor";
  const reset = () => {
    setLocation("article");
    setBackCount(0);
    setEmail("");
  };

  const auditorControls = isAuditor ? (
    <>
      <button
        onClick={() => setLocation("article")}
        className="bg-purple-500 hover:bg-purple-600 rounded-md px-2 py-1 text-xs font-medium text-white"
      >
        Skip to article
      </button>
      <button
        onClick={reset}
        className="bg-purple-500 hover:bg-purple-600 rounded-md px-2 py-1 text-xs font-medium text-white"
      >
        Restart
      </button>
    </>
  ) : null;

  const auditorStats = isAuditor ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Back presses</span>
        <span className="font-mono font-semibold tabular-nums">{backCount}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Upsell pings</span>
        <span className="font-mono font-semibold tabular-nums">{Math.min(backCount, 99)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Real exits</span>
        <span className="font-mono font-semibold tabular-nums">0</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell
      mode={mode}
      annotations={annotations}
      onRestart={onRestart ?? reset}
      auditorControls={auditorControls}
      auditorStats={auditorStats}
      title="Dead End"
      caption="User attempts to leave the funnel — via the back button — are intercepted and routed through a cycle of trap screens. Each state below is a real screen the user would be shown."
    >
      <div className="space-y-3">
        {/* THE ACTUAL SCREEN — what the user sees */}
        {location === "article" && <ArticleScreen />}
        {location === "upsell" && <UpsellScreen onBack={goBack} />}
        {location === "modal" && (
          <ModalScreen email={email} setEmail={setEmail} />
        )}
        {location === "settings-disabled" && <SettingsDisabledScreen />}

        {/* The back button — the only user-controllable action */}
        <div className="flex items-center justify-between border-t pt-3">
          <button
            onClick={goBack}
            className="bg-foreground text-background rounded-md px-3 py-1.5 text-xs font-medium"
          >
            ← Back
          </button>
          <span className="text-muted-foreground text-[10px]">
            Try pressing Back — where do you end up?
          </span>
        </div>
      </div>
    </DemoShell>
  );
}

/* ------------------------------------------------------------------ */
/*  The four real-looking screens the user gets cycled through         */
/* ------------------------------------------------------------------ */

function ArticleScreen() {
  return (
    <div className="bg-background space-y-3 rounded-md border p-4 text-xs">
      <div className="text-muted-foreground text-[10px]">
        thedailyexample.com / tech / 2024
      </div>
      <h2 className="text-base font-semibold leading-snug">
        The quiet rise of return-to-office mandates in 2024
      </h2>
      <div className="text-muted-foreground text-[10px]">
        By Jane Reporter • 6 min read
      </div>
      <div className="space-y-2 text-[11px] leading-relaxed">
        <p>
          After three years of hybrid work, more companies are quietly reinstating
          in-office requirements. The shift, while framed as a productivity
          measure, has drawn scrutiny from employees who negotiated remote
          arrangements during the pandemic.
        </p>
        <p>
          HR directors cite collaboration as the primary motivation. But
          internal memos obtained by this publication suggest cost-cutting is
          also a factor…
        </p>
      </div>
      <div className="text-muted-foreground flex items-center gap-3 border-t pt-2 text-[10px]">
        <span>👍 1.2k</span>
        <span>💬 89 comments</span>
        <span>↗ Share</span>
      </div>
    </div>
  );
}

function UpsellScreen({ onBack }: { onBack: () => void }) {
  const [secs, setSecs] = React.useState(119);
  React.useEffect(() => {
    const id = window.setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, []);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <div className="bg-amber-500/10 relative space-y-3 overflow-hidden rounded-md border-2 border-amber-500/40 p-4 text-xs">
      <div className="text-amber-700 dark:text-amber-300 text-[10px] font-semibold tracking-wider uppercase">
        ⚠ Exclusive offer — leaving this page forfeits it
      </div>
      <h2 className="text-xl font-bold leading-tight">
        Wait! Get our Premium plan for 50% off — just for you
      </h2>
      <p className="text-[11px] leading-relaxed">
        Other readers who stayed on this page saved $240/year. This offer
        disappears the moment you navigate away.
      </p>
      <div className="bg-background/60 rounded-md border p-3">
        <div className="text-muted-foreground text-[10px]">Your countdown</div>
        <div className="font-mono text-2xl font-bold tabular-nums">
          {mm}:{ss}
        </div>
      </div>
      <button className="bg-amber-500 hover:bg-amber-600 w-full rounded-md py-2 text-sm font-bold text-white">
        Claim 50% off
      </button>
      <button
        onClick={onBack}
        className="text-muted-foreground hover:text-foreground block w-full text-[10px] underline"
      >
        No thanks, I don&apos;t like saving money
      </button>
    </div>
  );
}

function ModalScreen({
  email,
  setEmail,
}: {
  email: string;
  setEmail: (s: string) => void;
}) {
  // Note: no X button, no ESC handler — the user is trapped.
  return (
    <div className="relative">
      {/* The page is dimmed behind the modal */}
      <div className="bg-foreground/5 pointer-events-none space-y-2 rounded-md border p-3 text-[10px] opacity-40">
        <div className="h-2 w-3/4 rounded bg-foreground/20" />
        <div className="h-2 w-2/3 rounded bg-foreground/20" />
        <div className="h-2 w-1/2 rounded bg-foreground/20" />
      </div>
      {/* The modal overlay — covers everything */}
      <div className="bg-background/70 absolute inset-0 flex items-center justify-center backdrop-blur-sm">
        <div className="bg-background w-full max-w-xs space-y-3 rounded-md border-2 border-foreground/20 p-4 text-xs shadow-lg">
          {/* No close X — intentionally absent */}
          <h3 className="text-base font-semibold">Don&apos;t miss another story</h3>
          <p className="text-muted-foreground text-[10px]">
            Subscribe to our weekly newsletter. Unsubscribe any time — at the
            bottom of every email, after 3 confirmation steps, via our support
            portal, on weekdays only.
          </p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="bg-background w-full rounded-md border px-2 py-1.5 text-xs"
          />
          <button className="bg-foreground text-background w-full rounded-md py-1.5 text-xs font-medium">
            Subscribe
          </button>
          <div className="text-muted-foreground text-center text-[10px]">
            <X className="mr-1 inline h-3 w-3 opacity-30" />
            <span className="opacity-30">close (disabled)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsDisabledScreen() {
  return (
    <div className="bg-background space-y-3 rounded-md border p-4 text-xs">
      <h3 className="text-base font-semibold">Account settings</h3>
      <div className="divide-y rounded-md border">
        <Row label="Email" value="jane@example.com" />
        <Row label="Password" value="Last changed 47 days ago" />
        <Row label="Two-factor authentication" value="Off" />
        <Row
          label="Delete account"
          value="Unavailable — please contact support"
          disabled
        />
      </div>
      <p className="text-muted-foreground text-[10px]">
        The &quot;Delete account&quot; row is visually present but cannot be
        clicked. The cursor stays as a default arrow.
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  disabled,
}: {
  label: string;
  value: string;
  disabled?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 text-[11px] ${
        disabled ? "text-muted-foreground/50" : ""
      }`}
    >
      <span>{label}</span>
      <span
        className={
          disabled
            ? "cursor-not-allowed select-none"
            : "text-muted-foreground"
        }
        style={disabled ? { pointerEvents: "none" } : undefined}
      >
        {value}
      </span>
    </div>
  );
}
