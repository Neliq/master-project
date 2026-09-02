"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Immortal Accounts — Condition 3: Absolute Absence of Deletion Vectors
 *
 * Thesis: K_del is the semantic set of account-termination keywords
 * ({"delete account", "deactivate", "close account", "remove profile"}) and
 * T_DOM is the collection of all visible text nodes in the account settings
 * and profile sub-pages. The feature triggers if the intersection is empty:
 *
 *   K_del ∩ T_DOM = ∅
 *
 * Variant A (dark): the settings page ships zero termination keywords — only
 * euphemisms like "data retention" and "marketing preferences", and the
 * settings search returns "no results" for every exit keyword. Variant B
 * (benign): a plainly labelled "Delete account" control exists, so the
 * intersection is non-empty.
 */

const KEYWORDS = ["delete account", "deactivate", "close account", "remove profile"];

export function ImmortalAccountsCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [tabA, setTabA] = React.useState<"profile" | "privacy" | "data">("privacy");
  const [queryA, setQueryA] = React.useState("");
  const [scannedA, setScannedA] = React.useState(false);
  const [tabB, setTabB] = React.useState<"profile" | "privacy" | "data">("privacy");
  const [queryB, setQueryB] = React.useState("");
  const [scannedB, setScannedB] = React.useState(false);

  const reset = () => {
    setTabA("privacy");
    setQueryA("");
    setScannedA(false);
    setTabB("privacy");
    setQueryB("");
    setScannedB(false);
  };

  // Variant A has no termination text anywhere; Variant B renders one "Delete account" node.
  const hitsBenign = queryB.trim().length > 0 && KEYWORDS.some((k) => k.includes(queryB.trim().toLowerCase())) ? 1 : 0;
  const queryNoResultsA = queryA.trim().length > 0;
  const queryNoResultsB = queryB.trim().length > 0;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">K_del keywords</span>
        <span className="font-mono font-semibold tabular-nums">{KEYWORDS.length}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Visible text nodes |T_DOM|</span>
        <span className="font-mono font-semibold tabular-nums">14</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">K_del &cap; T_DOM (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">&empty; (0 nodes)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">K_del &cap; T_DOM (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">&ne; &empty; (1 node)</span>
      </div>
    </>
  ) : null;

  const tabs = (selectedTab: "profile" | "privacy" | "data", setSelectedTab: (tab: "profile" | "privacy" | "data") => void) => (
    <div className="flex gap-1 rounded-md border border-border bg-muted/40 p-1">
      {(["profile", "privacy", "data"] as const).map((t) => (
        <button
          key={t}
          onClick={() => setSelectedTab(t)}
          className={`flex-1 rounded px-2 py-1 text-[9px] font-medium capitalize transition-colors cursor-pointer ${
            selectedTab === t ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t === "data" ? "Data & storage" : t}
        </button>
      ))}
    </div>
  );

  const privacyDark = (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-2">
        <div>
          <div className="text-[10px] font-medium">Download my data</div>
          <div className="text-[8px] text-muted-foreground/60">Export a copy of everything we store.</div>
        </div>
        <span className="font-mono text-[8px] text-muted-foreground">ZIP</span>
      </div>
      <div className="flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-2">
        <div>
          <div className="text-[10px] font-medium">Marketing preferences</div>
          <div className="text-[8px] text-muted-foreground/60">Emails, notifications and offers.</div>
        </div>
        <span className="font-mono text-[8px] text-muted-foreground">ON</span>
      </div>
      <div className="flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-2">
        <div>
          <div className="text-[10px] font-medium">Data retention period</div>
          <div className="text-[8px] text-muted-foreground/60">How long we keep your profile.</div>
        </div>
        <span className="font-mono text-[8px] text-muted-foreground">10 yrs</span>
      </div>
    </div>
  );

  const privacyBenign = (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between rounded-md border border-red-500/30 bg-red-500/5 px-2.5 py-2">
        <div>
          <div className="text-[10px] font-medium text-red-600 dark:text-red-400">Delete account</div>
          <div className="text-[8px] text-muted-foreground/60">Permanently remove your account and all data.</div>
        </div>
        <span className="font-mono text-[8px] text-red-500">K_del &cap; T_DOM</span>
      </div>
      <div className="flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-2">
        <div>
          <div className="text-[10px] font-medium">Download my data</div>
          <div className="text-[8px] text-muted-foreground/60">Export a copy of everything we store.</div>
        </div>
        <span className="font-mono text-[8px] text-muted-foreground">ZIP</span>
      </div>
      <div className="flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-2">
        <div>
          <div className="text-[10px] font-medium">Marketing preferences</div>
          <div className="text-[8px] text-muted-foreground/60">Emails, notifications and offers.</div>
        </div>
        <span className="font-mono text-[8px] text-muted-foreground">ON</span>
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Immortal Accounts: Absolute Absence of Deletion Vectors"
      userTitle="Harbor — Privacy settings"
      caption="Absolute Absence of Deletion Vectors — the settings sub-pages contain no termination keywords at all (K_del ∩ T_DOM = ∅), so the interface offers no structural exit affordance."
      auditorStats={stats}
      deltaNote={`In Variant A none of K_del = {${KEYWORDS.join(", ")}} appears anywhere in the visible settings DOM — even the search box returns "no results" — so K_del ∩ T_DOM = ∅ and the feature triggers. In Variant B the same settings page renders a plainly labelled "Delete account" node, making the intersection non-empty.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Settings</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">Manage your account, privacy and data.</p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Exit found
              </div>
            </div>
            <div className="relative mt-3">
              <svg className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                value={queryB}
                onChange={(e) => setQueryB(e.target.value)}
                placeholder="Search settings…"
                className="w-full rounded-md border border-border bg-background py-1.5 pl-7 pr-2 text-[10px] placeholder:text-muted-foreground/50"
              />
            </div>
            {queryNoResultsB ? (
              <div className={`mt-2 rounded-md border p-2 text-[9px] ${
                hitsBenign > 0
                  ? "border-green-500/30 bg-green-500/5"
                  : "border-border bg-background"
              }`}>
                {hitsBenign > 0 ? (
                  <>
                    <span className="font-semibold text-green-700 dark:text-green-300">{hitsBenign} result for &ldquo;{queryB}&rdquo;</span>
                    <span className="text-muted-foreground"> — Delete account (Account &gt; Privacy).</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">No results for &ldquo;{queryB}&rdquo; — nothing matched in Settings, Privacy or Data.</span>
                )}
              </div>
            ) : null}
            <div className="mt-3">{tabs(tabB, setTabB)}</div>
            <div className="mt-3">{privacyBenign}</div>
          </div>
          <button
            onClick={() => setScannedB(true)}
            className="w-full rounded-md border border-green-500/40 bg-green-500/5 text-green-700 dark:text-green-300 py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Scan settings DOM for exit keywords
          </button>
          {scannedB ? (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Exit vector present
              </div>
              <p className="text-muted-foreground mt-0.5">
                K_del &cap; T_DOM = {"{delete account}"} &ne; &empty; — the keyword &ldquo;delete account&rdquo; is rendered
                in the settings DOM, so a structural exit affordance exists.
              </p>
            </div>
          ) : null}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Settings</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">Manage your account, privacy and data.</p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              No exit
            </div>
          </div>
          <div className="relative mt-3">
            <svg className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              value={queryA}
              onChange={(e) => setQueryA(e.target.value)}
              placeholder="Search settings…"
              className="w-full rounded-md border border-border bg-background py-1.5 pl-7 pr-2 text-[10px] placeholder:text-muted-foreground/50"
            />
          </div>
          {queryNoResultsA ? (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2 text-[9px]">
              <span className="font-semibold text-yellow-700 dark:text-yellow-300">No results for &ldquo;{queryA}&rdquo;</span>
              <span className="text-muted-foreground"> — nothing matched in Settings, Privacy or Data.</span>
            </div>
          ) : null}
          <div className="mt-3">{tabs(tabA, setTabA)}</div>
          <div className="mt-3">{privacyDark}</div>
        </div>
        <button
          onClick={() => setScannedA(true)}
          className="w-full rounded-md border border-red-500/40 bg-red-500/5 text-red-700 dark:text-red-300 py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
        >
          Scan settings DOM for exit keywords
        </button>
        {scannedA ? (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Triggered: K_del &cap; T_DOM = &empty;
            </div>
            <p className="text-muted-foreground mt-0.5">
              Scan of all visible text nodes found <strong className="text-foreground">0</strong> occurrences of any
              termination keyword: {KEYWORDS.map((k) => `"${k}"`).join(", ")} all return zero hits. Only euphemisms
              (&ldquo;data retention&rdquo;, &ldquo;marketing preferences&rdquo;) are rendered — the interface offers no
              structural exit affordance, so the account is effectively immortal.
            </p>
          </div>
        ) : null}
      </div>
    </DemoShell>
  );
}
