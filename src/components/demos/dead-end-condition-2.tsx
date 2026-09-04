"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, Cookie, X } from "lucide-react";

/*
 * Dead End — Condition 2: Visual Absence of Dismissal Vectors
 *
 * Thesis: C_dismiss is the set of bounding boxes identified by the
 * vision-language model as close icons, dismissal vectors, or cancel/back
 * buttons. If the current interface state v_current is identified as an
 * overlay or modal (e.g. CSS z-index > 100), the feature triggers when the
 * set of dismissal objects is entirely empty — the visual means to escape
 * the interruption has been deliberately removed:
 *
 *   C_dismiss = ∅ ∧ IsOverlay(v_current) = True
 *
 * Variant A (dark): the cookie overlay has z-index 1000 and ships exactly
 * one button ("Accept all") — no close icon, no "Not now", and the backdrop
 * and Esc key lead nowhere. Variant B (benign): the same overlay adds a
 * close icon, a "Not now" link, and an "Essential only" rejection — so
 * dismissal takes one click and essential-only consent is always available.
 */

const Z_INDEX = 1000; // > 100 → structurally an overlay

type Stage = "open" | "accepted" | "dismissed" | "essential";

const pageBackdrop = (
  <div className="space-y-3 p-3">
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary">
          <Cookie className="size-3.5" />
        </div>
        <div>
          <div className="text-[10px] font-semibold">CloudPhoto</div>
          <div className="text-[8px] text-muted-foreground">Your memories, everywhere</div>
        </div>
      </div>
      <div className="rounded-full border border-border px-2 py-0.5 text-[8px] text-muted-foreground">Pro plan</div>
    </div>
    <div className="rounded-md border border-border bg-card p-2.5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-semibold">Recent uploads</div>
          <div className="mt-0.5 text-[8px] text-muted-foreground">12 new photos this week</div>
        </div>
        <span className="text-[8px] font-mono text-muted-foreground">2.4 GB / 100 GB</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-[18%] rounded-full bg-primary/70" />
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {['Lake morning', 'Family lunch', 'Weekend walk'].map((label) => (
          <div key={label} className="rounded border border-border bg-muted/40 p-2 text-center">
            <div className="mx-auto h-7 w-7 rounded bg-primary/15" />
            <div className="mt-1 truncate text-[7px] text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="flex items-center justify-between rounded-md border border-border bg-card px-2.5 py-2 text-[8px]">
      <span className="text-muted-foreground">Last synced just now</span>
      <span className="font-medium text-foreground">All devices connected</span>
    </div>
  </div>
);

export function DeadEndCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [stageA, setStageA] = React.useState<Stage>("open");
  const [attempts, setAttempts] = React.useState(0);
  const [stageB, setStageB] = React.useState<Stage>("open");


  const overlayCard = (
    accent: "rose" | "emerald",
    onAccept: () => void,
    onDismiss?: () => void,
    onReject?: () => void
  ) => (
    <div
      className={`w-full max-w-[240px] rounded-md border bg-card p-3 shadow-xl ${
        accent === "rose" ? "border-red-500/30" : "border-green-500/30"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Cookie className={`size-3.5 ${accent === "rose" ? "text-red-500" : "text-green-500"}`} />
          <h3 className="text-[11px] font-semibold">We use cookies</h3>
        </div>
        {onDismiss ? (
          <button
            onClick={onDismiss}
            aria-label="Close dialog"
            className="rounded p-0.5 text-muted-foreground/60 transition-colors hover:text-foreground cursor-pointer"
          >
            <X className="size-3.5" />
          </button>
        ) : null}
      </div>
      <p className="mt-1.5 text-[9px] leading-relaxed text-muted-foreground">
        We and our partners use cookies to store and access information on your device,
        personalise ads and content, and measure performance. By continuing you agree to
        this processing.
      </p>
      <button
        onClick={onAccept}
        className={`mt-2.5 w-full rounded-md py-1.5 text-[10px] font-semibold text-white transition-colors cursor-pointer ${
          accent === "rose" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        Accept all
      </button>
      {onReject ? (
        <button
          onClick={onReject}
          className="mt-1.5 w-full rounded-md border border-border bg-background py-1.5 text-[9px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
        >
          Essential only
        </button>
      ) : null}
      {onDismiss ? (
        <button
          onClick={onDismiss}
          className="mt-1.5 w-full text-center text-[9px] font-medium text-muted-foreground underline-offset-2 hover:underline cursor-pointer"
        >
          Not now
        </button>
      ) : null}
    </div>
  );

  return (
    <DemoShell mode={mode}
      title="Dead End: Visual Absence of Dismissal Vectors"
      userTitle="Cinder — Account notice"
      caption="Visual Absence of Dismissal Vectors — a structurally confirmed overlay whose dismissal set is empty, so the only way out of the interruption is compliance."
      deltaNote="Both variants show the same cookie overlay with the same copy and the same “Accept all” button. In Variant A the overlay contains zero dismissal objects (C_dismiss = ∅): no close icon, no “Not now”, and the backdrop/Esc lead nowhere. Variant B adds a close icon, a “Not now” link, and an “Essential only” rejection — escaping takes one click, and essential-only consent is always available."
      benign={
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-md border bg-foreground/5">
            {pageBackdrop}
            {stageB === "open" && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 p-4"
                style={{ zIndex: Z_INDEX }}
                onClick={() => setStageB("dismissed")}
              >
                {overlayCard(
                  "emerald",
                  () => setStageB("accepted"),
                  () => setStageB("dismissed"),
                  () => setStageB("essential")
                )}
              </div>
            )}
          </div>
          {stageB === "dismissed" && (
            <div className="rounded-md border border-border bg-background p-2.5 text-[9px] leading-relaxed">
              Dismissed — nothing was accepted. The close icon, the backdrop, or the
              “Not now” link got you out in one click.
            </div>
          )}
          {stageB === "essential" && (
            <div className="rounded-md border border-border bg-background p-2.5 text-[9px] leading-relaxed">
              Essential cookies only — personalisation and advertising cookies are off.
              The overlay offered a rejection option, so consent was never bundled with
              basic access.
            </div>
          )}
          {stageB === "accepted" && (
            <div className="rounded-md border border-border bg-background p-2.5 text-[9px] leading-relaxed">
              All cookies accepted — your choice, made while the dismiss and reject
              options were still on the table.
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-md border bg-foreground/5">
          {pageBackdrop}
          {stageA === "open" && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/50 p-4"
              style={{ zIndex: Z_INDEX }}
              onClick={() => setAttempts((a) => a + 1)}
            >
              {overlayCard("rose", () => setStageA("accepted"))}
            </div>
          )}
        </div>
        {stageA === "open" && attempts > 0 && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2 text-[9px] leading-relaxed text-yellow-700 dark:text-yellow-300">
            {attempts} dismissal attempt{attempts === 1 ? "" : "s"} — clicking the backdrop does
            nothing, there is no close icon, and Esc is ignored.{" "}
            <span className="font-mono text-foreground">C_dismiss = ∅</span>.
          </div>
        )}
        {stageA === "accepted" && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <AlertTriangle className="size-3" />
              Continue to manage cookies
            </div>
            <p className="text-muted-foreground">
              <span className="font-mono text-foreground">
                C_dismiss = ∅ ∧ IsOverlay(v_current) = True
              </span>{" "}
              (z-index {Z_INDEX} &gt; 100): the overlay&rsquo;s dismissal set was empty, so the
              interruption had no visual escape — only the compliance button.
            </p>
            <p className="text-muted-foreground">
              Your only way forward was “Accept all”. That is the Dead End mechanism:
              the modal demanded an explicit dismissal affordance, and the interface
              simply never rendered one.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
