"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { Download, ExternalLink, FileDown, Globe, ShieldCheck } from "lucide-react";

/*
 * Disguised Ad — Condition 1: Cross-Origin Action Masking
 *
 * Thesis: B_action is a node styled as a primary action button whose label
 * matches a high-intent native task (e.g. "Download"). The feature fires if
 * the button masquerades as a native function but its resolved destination
 * domain differs from the host web application's domain:
 *
 *   B_action ≠ ∅  ∧  D_target(B_action) ≠ D_host
 *
 * Variant A (dark): the prominent "Download Now" button routes to an external
 * advertising domain (a sponsored installer); the real download is a small
 * gray link.
 * Variant B (benign): the same prominent button routes to the host domain —
 * it is the real download.
 */

const APP_NAME = "FileVault Pro";
const HOST = "filevaultpro.io";
const AD_DOMAIN = "offers.northstar-security.com";

export function DisguisedAdCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [clicked, setClicked] = React.useState<null | "big" | "direct">(null);

  const reset = () => setClicked(null);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">B_action (primary-styled)</span>
        <span className="font-mono font-semibold tabular-nums">&ldquo;Download Now&rdquo;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">D_host</span>
        <span className="font-mono font-semibold tabular-nums">{HOST}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">D_target(B_action) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{AD_DOMAIN} (external ad network)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">D_target ≠ D_host — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">True</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Disguised Ad: Cross-Origin Action Masking"
      caption="Cross-Origin Action Masking — a visually prominent button labeled like a native task (Download) structurally routes you to an external advertising domain instead of the host application."
      auditorStats={stats}
      deltaNote={`The page layout, the product, and the button label ("Download Now") are identical in both panels. The only difference is the resolved href: in Variant A the button targets ${AD_DOMAIN} — an external ad domain, so D_target ≠ D_host and the feature triggers; in Variant B the same button targets ${HOST} — the real download.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-background overflow-hidden">
            <div className="flex items-center gap-2 border-b bg-green-500/5 px-3 py-1.5">
              <Globe className="h-3 w-3 text-green-600 dark:text-green-400" />
              <span className="font-mono text-[8px] text-muted-foreground">{HOST}</span>
              <span className="ml-auto rounded-full bg-green-500/15 px-1.5 py-0.5 text-[7px] font-bold text-green-600 dark:text-green-400">
                D_host
              </span>
            </div>
            <div className="p-3">
              <h3 className="text-[11px] font-semibold">{APP_NAME}</h3>
              <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">
                AES-256 file encryption for your whole drive. Version 2026.1.4 · 32.4 MB signed installer · free for personal use.
              </p>
              <div className="mt-3 flex flex-col gap-1.5">
                <a
                  href={`https://${HOST}/download/filevault-pro-2026.exe`}
                  onClick={(event) => { event.preventDefault(); setClicked("big"); }}
                  className="flex w-full items-center justify-center gap-1.5 rounded-md bg-green-600 py-2.5 text-[10px] font-bold text-white transition-colors hover:bg-green-700 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" /> Download Now
                </a>
                <p className="text-center text-[7px] font-mono text-green-600/70 dark:text-green-400/70">
                  Download source: {HOST} · 32.4 MB · SHA-256 verified
                </p>
              </div>
            </div>
          </div>

          {clicked === "big" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <ShieldCheck className="h-3 w-3" /> Native download — D_target = D_host
              </div>
              <p className="text-muted-foreground">
                B<sub>action</sub> = &ldquo;Download Now&rdquo; and D<sub>target</sub>(B<sub>action</sub>) = {HOST} = D
                <sub>host</sub>. The button does exactly what it advertises: it is the genuine download, same origin.
              </p>
            </div>
          )}
          {clicked === "direct" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] text-muted-foreground">
              The direct link also resolves to {HOST} — same origin. Every download path on this page is legitimate.
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-background overflow-hidden">
          <div className="flex items-center gap-2 border-b bg-red-500/5 px-3 py-1.5">
            <Globe className="h-3 w-3 text-red-600 dark:text-red-400" />
            <span className="font-mono text-[8px] text-muted-foreground">{HOST}</span>
            <span className="ml-auto rounded-full bg-red-500/15 px-1.5 py-0.5 text-[7px] font-bold text-red-600 dark:text-red-400">
              D_host
            </span>
          </div>
          <div className="p-3">
            <h3 className="text-[11px] font-semibold">{APP_NAME}</h3>
            <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">
              AES-256 file encryption for your whole drive. Version 2026.1.4 · 32.4 MB signed installer · free for personal use.
            </p>
            <div className="mt-3 flex flex-col gap-1.5">
              {/* B_action: primary-styled button, label matches native "Download" task */}
              <a
                href={`https://${AD_DOMAIN}/sponsored/installer.exe`}
                onClick={(event) => { event.preventDefault(); setClicked("big"); }}
                className="flex w-full items-center justify-center gap-1.5 rounded-md bg-green-600 py-2.5 text-[10px] font-bold text-white transition-colors hover:bg-green-700 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" /> Download Now
              </a>
              <p className="text-center text-[7px] font-mono text-red-600/70 dark:text-red-400/70">
                Download source: {AD_DOMAIN} · sponsored installer
              </p>
              {/* The real download, demoted to a small gray link */}
              <a
                href={`https://${HOST}/download/filevault-pro-2026.exe`}
                onClick={(event) => { event.preventDefault(); setClicked("direct"); }}
                className="flex items-center justify-center gap-1 text-[9px] text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground cursor-pointer"
              >
                <FileDown className="h-3 w-3" /> Direct download (32 MB)
              </a>
            </div>
          </div>
        </div>

        {clicked === "big" && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <ExternalLink className="h-3 w-3" /> Download started
            </div>
            <p className="text-muted-foreground">
              B<sub>action</sub> = &ldquo;Download Now&rdquo; ≠ ∅, and D<sub>target</sub>(B<sub>action</sub>) ={" "}
              <strong className="text-red-500">{AD_DOMAIN}</strong> ≠ D<sub>host</sub> ({HOST}). The button was styled and
              labeled as the native download action, but it routes you to an external advertising network — a sponsored
              installer, not {APP_NAME}. The genuine file is buried in the small gray &ldquo;Direct download&rdquo; link
              below.
            </p>
            <p className="text-muted-foreground">
              Your functional intent (download the app) was intercepted by an ad that visually is the app&rsquo;s primary
              action.
            </p>
          </div>
        )}
        {clicked === "direct" && (
          <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
              <ShieldCheck className="h-3 w-3" /> Real download located
            </div>
            <p className="text-muted-foreground">
              The direct link resolves to {HOST} = D<sub>host</sub>. Note how much harder it was to find than the fake
              primary button — that demotion is the point of the pattern.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
