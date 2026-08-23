"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Granting and Interaction — Condition 3: Semantic Scope Creep in Permission
 * Requests
 *
 * Thesis: the algorithm compares the initial permission-request text against
 * the actual permissions enumerated in the subsequent browser API call or
 * manifest. The feature triggers if the natural-language request mentions only
 * a subset of the permissions actually requested — e.g. asking to "access your
 * camera for video calls" while also requesting microphone and location
 * access — quantified as a semantic-disclosure gap Δ_perms:
 *
 *   |Perms_actual \ Perms_disclosed| > 0
 *
 * Variant A (dark): the request mentions only the camera; the manifest
 * enumerates camera + microphone + location. Δ_perms = 2 > 0.
 * Variant B (benign): the request names exactly the permissions the manifest
 * requests. Δ_perms = 0.
 */

const DISCLOSED_DARK = ["Camera"] as const;
const ACTUAL_DARK = ["Camera", "Microphone", "Location"] as const;
const DISCLOSED_BENIGN = ["Camera", "Microphone"] as const;
const ACTUAL_BENIGN = ["Camera", "Microphone"] as const;

const GAP_DARK = ACTUAL_DARK.length - DISCLOSED_DARK.length; // 2
const GAP_BENIGN = ACTUAL_BENIGN.length - DISCLOSED_BENIGN.length; // 0

type Stage = "idle" | "request" | "inCall";

function PermissionChips({ perms, accent }: { perms: readonly string[]; accent: "rose" | "emerald" }) {
  return (
    <div className="flex flex-wrap gap-1">
      {perms.map((p) => (
        <span
          key={p}
          className={`rounded-full border px-1.5 py-0.5 font-mono text-[8px] font-semibold ${
            accent === "rose"
              ? "border-red-500/40 bg-red-500/5 text-red-700 dark:text-red-300"
              : "border-green-500/40 bg-green-500/5 text-green-700 dark:text-green-300"
          }`}
        >
          {p}
        </span>
      ))}
    </div>
  );
}

export function GrantingAndInteractionCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [aStage, setAStage] = React.useState<Stage>("idle");
  const [bStage, setBStage] = React.useState<Stage>("idle");

  const reset = () => {
    setAStage("idle");
    setBStage("idle");
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Perms_disclosed (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{DISCLOSED_DARK.join(", ")}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Perms_actual (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{ACTUAL_DARK.join(", ")}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&Delta;_perms (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">|{ACTUAL_DARK.length} &minus; {DISCLOSED_DARK.length}| = {GAP_DARK} (&gt; 0)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&Delta;_perms (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{GAP_BENIGN} (= 0)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Call state</span>
        <span className="font-mono font-semibold tabular-nums">{aStage === "inCall" || bStage === "inCall" ? "in call" : "idle"}</span>
      </div>
    </>
  ) : null;

  const appHeader = (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-[11px] font-semibold">MeetNow</h3>
        <p className="text-[9px] text-muted-foreground mt-0.5">Team standup · 10:30 · 6 participants</p>
      </div>
      <span className="shrink-0 rounded-full border border-border px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
        v2.4.1
      </span>
    </div>
  );

  const joinButton = (accent: "rose" | "emerald") => (
    <button
      onClick={() => (accent === "rose" ? setAStage("request") : setBStage("request"))}
      className={`mt-2 w-full rounded-md py-2 text-[10px] font-semibold transition-colors cursor-pointer ${
        accent === "rose"
          ? "bg-red-600 hover:bg-red-700 text-white"
          : "bg-green-600 hover:bg-green-700 text-white"
      }`}
    >
      Join video call
    </button>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Granting and Interaction: Semantic Scope Creep in Permission Requests"
      caption="Semantic Scope Creep in Permission Requests — the natural-language request names fewer permissions than the browser API actually requests, so consent is granted for more than was disclosed."
      auditorStats={stats}
      deltaNote={`In Variant A the request sentence mentions only the camera and states no purpose, while the app-manifest block right beneath it enumerates ${ACTUAL_DARK.join(", ")} — so Δ_perms = ${GAP_DARK} > 0 is observable on the prompt itself. In Variant B the request names exactly what the manifest requests (${ACTUAL_BENIGN.join(", ")}), so Δ_perms = ${GAP_BENIGN} and consent is fully informed.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            {appHeader}

            {bStage === "idle" && (
              <>
                <div className="mt-2 flex h-20 items-center justify-center rounded-md border bg-muted/40">
                  <svg className="h-6 w-6 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" />
                  </svg>
                </div>
                {joinButton("emerald")}
              </>
            )}

            {bStage === "request" && (
              <div className="mt-2 rounded-md border border-border bg-background p-2.5">
                <p className="text-[9px] leading-relaxed text-muted-foreground">
                  To join this call, MeetNow needs your{" "}
                  <strong className="text-foreground">camera and microphone</strong>. Location is
                  optional — share it during the call if you want.
                </p>
                <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setBStage("idle")}
                    className="rounded-md border border-border bg-background py-1.5 text-[9px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Not now
                  </button>
                  <button
                    onClick={() => setBStage("inCall")}
                    className="rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[9px] font-semibold transition-colors cursor-pointer"
                  >
                    Allow camera &amp; microphone
                  </button>
                </div>
              </div>
            )}

            {bStage === "inCall" && (
              <div className="mt-2 flex h-20 items-center justify-center rounded-md border border-green-500/30 bg-green-500/5">
                <span className="text-[9px] font-medium text-green-700 dark:text-green-300">
                  You&rsquo;re in the call — camera &amp; mic active
                </span>
              </div>
            )}
          </div>

          {bStage === "inCall" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Full disclosure — &Delta;_perms = {GAP_BENIGN}
              </div>
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">Requested text disclosed</p>
                <div className="mt-1"><PermissionChips perms={DISCLOSED_BENIGN} accent="emerald" /></div>
              </div>
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">Manifest / API call</p>
                <div className="mt-1"><PermissionChips perms={ACTUAL_BENIGN} accent="emerald" /></div>
              </div>
              <p className="text-muted-foreground">
                Perms_disclosed = Perms_actual — every permission enumerated in the manifest was named in
                the request. |Perms_actual \ Perms_disclosed| = {GAP_BENIGN}, so consent was informed.
              </p>
            </div>
          )}
        </div>
      }
    >
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          {appHeader}

          {aStage === "idle" && (
            <>
              <div className="mt-2 flex h-20 items-center justify-center rounded-md border bg-muted/40">
                <svg className="h-6 w-6 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" />
                </svg>
              </div>
              {joinButton("rose")}
            </>
          )}

          {aStage === "request" && (
            <div className="mt-2 rounded-md border border-red-500/30 bg-red-500/5 p-2.5">
              <p className="text-[9px] leading-relaxed text-muted-foreground">
                &ldquo;MeetNow&rdquo; would like to{" "}
                <strong className="text-foreground">access your camera</strong>.
              </p>
              <div className="mt-1.5 rounded-md border border-border bg-background px-2 py-1.5">
                <p className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">
                  App manifest — permissions requested
                </p>
                <div className="mt-1"><PermissionChips perms={ACTUAL_DARK} accent="rose" /></div>
              </div>
              <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setAStage("idle")}
                  className="rounded-md border border-border bg-background py-1.5 text-[9px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Don&rsquo;t Allow
                </button>
                <button
                  onClick={() => setAStage("inCall")}
                  className="rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[9px] font-semibold transition-colors cursor-pointer"
                >
                  Allow
                </button>
              </div>
            </div>
          )}

          {aStage === "inCall" && (
            <div className="mt-2 flex h-20 items-center justify-center rounded-md border border-red-500/30 bg-red-500/5">
              <span className="text-[9px] font-medium text-red-700 dark:text-red-300">
                You&rsquo;re in the call — camera, mic &amp; location active
              </span>
            </div>
          )}
        </div>

        {aStage === "inCall" && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Permissions updated
            </div>
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">Request text mentioned</p>
              <div className="mt-1"><PermissionChips perms={DISCLOSED_DARK} accent="rose" /></div>
            </div>
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">Manifest / API call actually requested</p>
              <div className="mt-1"><PermissionChips perms={ACTUAL_DARK} accent="rose" /></div>
            </div>
            <p className="text-muted-foreground">
              The natural-language request disclosed only the camera, but the browser API call enumerated{" "}
              <strong className="text-red-500">{ACTUAL_DARK.join(", ")}</strong>. |Perms_actual \ Perms_disclosed|
              = {GAP_DARK} &gt; 0 — the semantic-disclosure gap means you consented to microphone and
              location access without ever being told they were being requested.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
