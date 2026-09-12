"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2, Trash2, UserPlus } from "lucide-react";

/*
 * Immortal Accounts — Condition 2: Visual Accessibility of Offboarding Vectors
 *
 * Thesis: A(N_delete), the bounding-box area of the highest-ranked deletion
 * affordance, is compared against A(N_create), the mean area of the primary
 * creation-flow call-to-action buttons (e.g. "Sign Up"). The feature triggers
 * when the visual prominence of the exit vector is systematically demoted
 * below a fairness threshold, concealing the means of account termination
 * through visual subordination:
 *
 *   A(N_delete) / A(N_create) < tau_exit_visibility
 *
 * Variant A (dark): the "Delete account" affordance exists — but it is
 * rendered as an 8px, low-contrast text link whose bounding box is ~9% of
 * the "Sign up" CTA, so the exit vector is present yet visually invisible.
 * Variant B (benign): the identical affordance, same position and label,
 * rendered at full button size with equal area (ratio ≈ 1.0).
 */

// Primary creation-flow CTA ("Sign up") — the visual baseline.
const CREATE_W = 280;
const CREATE_H = 44;
const AREA_CREATE = CREATE_W * CREATE_H; // 12320 px²

// Highest-ranked deletion affordance in the dark variant: an 8px gray link.
const DELETE_W_DARK = 88;
const DELETE_H_DARK = 12;
const AREA_DELETE_DARK = DELETE_W_DARK * DELETE_H_DARK; // 1056 px²

const RATIO_DARK = AREA_DELETE_DARK / AREA_CREATE; // ≈ 0.086
const RATIO_BENIGN = 1.0; // full-size button: equal area
const TAU_EXIT_VISIBILITY = 0.25;

type Stage = "idle" | "confirm" | "deleted";

export function ImmortalAccountsCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [stageA, setStageA] = React.useState<Stage>("idle");
  const [createdA, setCreatedA] = React.useState(false);
  const [stageB, setStageB] = React.useState<Stage>("idle");
  const [createdB, setCreatedB] = React.useState(false);


  const confirmModal = (
    onCancel: () => void,
    onConfirm: () => void,
    accent: "rose" | "emerald"
  ) => (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-foreground/50 p-4">
      <div className="w-full max-w-[240px] rounded-md border bg-card p-3 shadow-xl">
        <h4 className="text-[11px] font-semibold">Delete your account?</h4>
        <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">
          This permanently removes your photos, albums, and profile. This action cannot be undone.
        </p>
        <div className="mt-2.5 space-y-1.5">
          <button
            onClick={onCancel}
            className={`w-full rounded-md py-1.5 text-[10px] font-medium text-primary-foreground transition-colors cursor-pointer ${
              accent === "rose"
                ? "bg-primary hover:bg-primary/80"
                : "bg-primary hover:bg-primary/80"
            }`}
          >
            Keep my account
          </button>
          <button
            onClick={onConfirm}
            className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
          >
            Delete my account
          </button>
        </div>
      </div>
    </div>
  );

  const settingsCard = (
    accent: "rose" | "emerald",
    deleteButton: React.ReactNode,
    stage: Stage,
    onOpen: () => void,
    onKeep: () => void,
    onConfirm: () => void,
    onCreated: () => void,
    created: boolean
  ) => (
    <div className="relative rounded-md border bg-card p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[11px] font-semibold">Account settings</h3>
          <p className="mt-0.5 text-[9px] text-muted-foreground">
            CloudPhoto · Free plan · maya@example.com
          </p>
        </div>
        <span className={`rounded-full border px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider shrink-0 ${
          accent === "rose"
            ? "border-border/60 text-foreground"
            : "border-border/60 text-foreground"
        }`}>
          {created ? "Account created" : "2.0 / 2.0 GB used"}
        </span>
      </div>

      <div className="mt-3 space-y-1.5 text-[9px] text-muted-foreground">
        <div className="flex justify-between rounded border border-border bg-background px-2 py-1.5">
          <span>Email address</span><span className="font-mono text-foreground/70">maya@example.com</span>
        </div>
        <div className="flex justify-between rounded border border-border bg-background px-2 py-1.5">
          <span>Membership</span><span className="font-mono text-foreground/70">Free tier</span>
        </div>
      </div>

      {/* Creation-flow baseline — the onboarding counterpart (e.g. “Sign Up”). */}
      <div className="mt-3 rounded-md border border-border bg-background p-2">
        <button
          onClick={onCreated}
          className={`flex w-full items-center justify-center gap-1.5 rounded-md py-2.5 text-[10px] font-bold text-primary-foreground transition-colors cursor-pointer ${
            accent === "rose" ? "bg-primary hover:bg-primary/80" : "bg-primary hover:bg-primary/80"
          }`}
        >
          <UserPlus className="size-3.5" />
          Sign up — create a new account
        </button>
        <p className="mt-1 text-center text-[7px] text-muted-foreground/50">
          A(N_create) = {AREA_CREATE} px² — one click, instant
        </p>
      </div>

      {/* Offboarding vector — the exit affordance under test. */}
      <div className="mt-3 border-t border-border pt-2">
        {stage !== "deleted" ? (
          deleteButton
        ) : (
          <div className={`rounded-md border p-2 text-center text-[9px] font-medium ${
            accent === "rose"
              ? "border-border/60 bg-muted/40 text-foreground"
              : "border-border/60 bg-muted/40 text-foreground"
          }`}>
            Account deleted
          </div>
        )}
      </div>

      {stage === "confirm" && confirmModal(onKeep, onConfirm, accent)}
    </div>
  );

  return (
    <DemoShell mode={mode}
      title="Immortal Accounts: Visual Accessibility of Offboarding Vectors"
      userTitle="Harbor — Create account"
      caption="Visual Accessibility of Offboarding Vectors — the account-deletion affordance is rendered with visual prominence far below its onboarding counterpart, so the exit is present yet engineered to be missed."
      deltaNote="Both variants ship the same “Delete account” affordance at the same position with the same label. In Variant A it renders as an 8px low-contrast text link (A(N_delete) = 1056 px² — 9% of the 12320 px² “Sign up” CTA), pushing the ratio to 0.086, below the fairness threshold τ_exit_visibility = 0.25. In Variant B the affordance is a full-size button with equal area, so the ratio is 1.0."
      benign={
        <div className="space-y-3">
          {settingsCard(
            "emerald",
            <button
              onClick={() => setStageB("confirm")}
              className="flex w-full items-center justify-center gap-1.5 rounded-md border border-border/60 bg-muted/40 py-2 text-[10px] font-semibold text-foreground transition-colors hover:bg-muted/60 cursor-pointer"
            >
              <Trash2 className="size-3.5" />
              Delete account
            </button>,
            stageB,
            () => setStageB("confirm"),
            () => setStageB("idle"),
            () => setStageB("deleted"),
            () => setCreatedB(true),
            createdB
          )}
          {stageB === "deleted" && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <CheckCircle2 className="size-3" />
                Visual parity — no trigger
              </div>
              <p className="text-muted-foreground mt-0.5">
                A(N_delete) = {AREA_CREATE} px² = A(N_create), so the ratio is{" "}
                <span className="font-mono text-foreground">{RATIO_BENIGN.toFixed(2)} ≥ {TAU_EXIT_VISIBILITY}</span>.
                The exit vector carries the same bounding-box area, contrast, and weight as the
                creation flow — nothing was visually demoted.
              </p>
            </div>
          )}
          {createdB && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2 text-[9px] text-foreground">
              <strong>Sign-up completed in one click.</strong> Now compare the effort required to
              leave: the “Delete account” button above is exactly as large as this CTA.
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {settingsCard(
          "rose",
          <div className="text-center">
            <button
              onClick={() => setStageA("confirm")}
              className="text-[8px] font-normal text-muted-foreground/40 underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:text-foreground cursor-pointer"
            >
              Delete account
            </button>
            <p className="mt-0.5 text-[7px] text-muted-foreground/30">
              A(N_delete) = {AREA_DELETE_DARK} px² ({DELETE_W_DARK}×{DELETE_H_DARK})
            </p>
          </div>,
          stageA,
          () => setStageA("confirm"),
          () => setStageA("idle"),
          () => setStageA("deleted"),
          () => setCreatedA(true),
          createdA
        )}
        {stageA === "deleted" && (
          <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
              <AlertTriangle className="size-3" />
              Account deletion
            </div>
            <p className="text-muted-foreground">
              You deleted your account — but the only affordance was an 8px gray link.{" "}
              <span className="font-mono text-foreground">
                A(N_delete)/A(N_create) = {RATIO_DARK.toFixed(3)} &lt; {TAU_EXIT_VISIBILITY}
              </span>{" "}
              (&tau;<sub>exit_visibility</sub>): the exit vector was rendered at ~9% of the
              “Sign up” CTA&rsquo;s bounding-box area with low contrast and thin weight.
            </p>
            <p className="text-muted-foreground">
              You can delete your account from this page.
              This is the Immortal Accounts mechanism: not removing the exit, but demoting it.
            </p>
          </div>
        )}
        {mode === "auditor" && createdA && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2 text-[9px] text-yellow-700 dark:text-yellow-300">
            <strong>Sign-up took one click.</strong> Leaving takes hunting through 8px gray text —
            the asymmetry the heuristic measures is exactly the one you just felt.
          </div>
        )}
      </div>
    </DemoShell>
  );
}
