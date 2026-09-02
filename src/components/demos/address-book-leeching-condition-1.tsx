"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Address Book Leeching — Condition 1: Utility-Permission Decoupling
 *
 * Thesis: the application blocks initialization or core functionality until
 * a contact permission is granted, even though the advertised utility has
 * no functional dependency on contact data:
 *
 *   State(U_core) = Blocked given P_contacts = False  ∧  Dep(U_core, P_contacts) = ∅
 *
 * Variant A (dark): a flashlight app refuses to start until the user
 * surrenders address-book access — a permission with zero technical
 * dependency on the core utility.
 * Variant B (benign): the flashlight works immediately; the permission is
 * optional and honestly labelled.
 */

export function AddressBookLeechingCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [benignTorchOn, setBenignTorchOn] = React.useState(false);
  const [darkTorchOn, setDarkTorchOn] = React.useState(false);
  const [benignPermission, setBenignPermission] = React.useState<"undecided" | "granted" | "declined">("undecided");
  const [darkPermission, setDarkPermission] = React.useState<"undecided" | "granted" | "declined">("undecided");
  const [darkBlocked, setDarkBlocked] = React.useState(false);

  const reset = () => {
    setBenignTorchOn(false);
    setDarkTorchOn(false);
    setBenignPermission("undecided");
    setDarkPermission("undecided");
    setDarkBlocked(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Dep(U_core, P_contacts)</span>
        <span className="font-mono font-semibold tabular-nums">&empty; (no dependency)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">State(U_core) w/o P_contacts</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">Blocked (dark) / Running (benign)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Permission status</span>
        <span className="font-mono font-semibold tabular-nums">{darkPermission}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Torch powered</span>
        <span className="font-mono font-semibold tabular-nums">{darkTorchOn ? "On" : "Off"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Address Book Leeching: Utility-Permission Decoupling"
      userTitle="TorchMate — Flashlight"
      caption="Core functionality is gated behind a contact permission the utility does not technically need — the permission is a data harvest, not a feature."
      auditorStats={stats}
      deltaNote="In Variant A the flashlight is blocked until the address-book permission is granted, despite Dep(U_core, P_contacts) = ∅. In Variant B the identical utility runs without the permission, which is optional and clearly labelled."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">TorchMate — Flashlight</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  A local utility. Works entirely on your device.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                {benignTorchOn ? "On" : "Off"}
              </div>
            </div>

            <button
              onClick={() => setBenignTorchOn(!benignTorchOn)}
              className={`mt-3 w-full rounded-md py-2 text-[10px] font-medium transition-colors cursor-pointer ${
                benignTorchOn
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-600/15 hover:bg-green-600/25 text-green-700 dark:text-green-300 border border-green-500/30"
              }`}
            >
              {benignTorchOn ? "Switch off flashlight" : "Switch on flashlight"}
            </button>
          </div>

          {benignPermission === "undecided" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5">
              <div className="text-[10px] font-semibold">Allow TorchMate to access your contacts?</div>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                This is a data-access permission: it uploads your address book to our servers.
                You can keep using the flashlight without it.
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setBenignPermission("granted")}
                  className="flex-1 rounded-md border border-green-500/40 px-2 py-1.5 text-[9px] font-medium text-green-700 dark:text-green-300 hover:bg-green-500/10 transition-colors cursor-pointer"
                >
                  Allow access
                </button>
                <button
                  onClick={() => setBenignPermission("declined")}
                  className="flex-1 rounded-md bg-green-600 hover:bg-green-700 text-white px-2 py-1.5 text-[9px] font-medium transition-colors cursor-pointer"
                >
                  Not now
                </button>
              </div>
            </div>
          )}

          {benignPermission !== "undecided" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Utility decoupled from permission
              </div>
              <p className="text-muted-foreground mt-0.5">
                {benignPermission === "granted"
                  ? "You granted the permission, but note it was presented as an optional data-access request and the flashlight never required it."
                  : "You declined and the flashlight keeps working: State(U_core) = Running with P_contacts = False."}
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">TorchMate — Flashlight</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                A local utility. Works entirely on your device.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              {darkTorchOn ? "On" : "Off"}
            </div>
          </div>

          <button
            onClick={() => setDarkTorchOn(!darkTorchOn)}
            disabled={darkPermission !== "granted"}
            className={`mt-3 w-full rounded-md py-2 text-[10px] font-medium transition-colors ${
              darkPermission === "granted"
                ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
            >
            {darkTorchOn ? "Switch off flashlight" : "Switch on flashlight"}
            </button>

            {darkPermission !== "granted" && (
            <div className="mt-2 rounded-md border border-red-500/30 bg-red-500/5 p-2.5">
              <div className="text-[10px] font-semibold">TorchMate requires contact access to continue</div>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                To use the flashlight, please allow TorchMate to read your contacts.
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setDarkPermission("granted")}
                  className="flex-1 rounded-md bg-red-600 hover:bg-red-700 text-white px-2 py-1.5 text-[9px] font-medium transition-colors cursor-pointer"
                >
                  Allow contact access
                </button>
                <button
                  onClick={() => { setDarkPermission("declined"); setDarkBlocked(true); }}
                  className="flex-1 rounded-md border border-border px-2 py-1.5 text-[9px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Decline
                </button>
              </div>
            </div>
          )}
        </div>

        {mode === "user" && darkBlocked && (
          <div className="rounded-md border border-border bg-muted/30 p-2.5 text-[9px] leading-relaxed">
            <div className="font-semibold uppercase tracking-tight">Flashlight unavailable</div>
            <p className="mt-0.5 text-muted-foreground">
              Contact access is required before TorchMate can start. No contact data was shared.
            </p>
          </div>
        )}

        {mode === "auditor" && darkBlocked && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Forced permission gate
            </div>
            <p className="text-muted-foreground mt-0.5">
              Declining leaves you locked out of the flashlight:{" "}
              <strong className="text-red-500">State(U_core) = Blocked</strong> while{" "}
              <strong className="text-foreground">Dep(U_core, P_contacts) = &empty;</strong> — a
              flashlight has zero technical need for your address book. The app algorithmically
              blocks its core utility until you hand over P_contacts, coercing a harvest that
              serves no function of the advertised product.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
