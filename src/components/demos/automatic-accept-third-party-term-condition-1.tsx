"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Automatic Accept Third Party Term — Condition 1: Bundled Transitive Consent
 *
 * Thesis: the interface algorithmically fuses the primary terms with an
 * array of third-party agreements, so affirmatively interacting with the
 * primary consent node forces acceptance of the entire third-party array —
 * with no individual decoupling toggles in the DOM:
 *
 *   Accept(T_primary) ⇒ ∀ t_i ∈ T_third_party: Accept(t_i) = True
 *   given  ∄ Toggle(t_i) ∈ DOM
 *
 * Variant A (dark): one checkbox, one button — six partner agreements are
 * silently bound with no per-partner toggles anywhere.
 * Variant B (benign): the same six partners each get their own labelled
 * toggle, and only the checked ones are bound.
 */

const PARTNERS = [
  "DataBridge Analytics",
  "AdVantage Network",
  "Pulse Metrics",
  "RetailSense Partners",
  "CloudSync Ads",
  "InsightLoop Data",
];

export function AutomaticAcceptThirdPartyTermCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [accepted, setAccepted] = React.useState(false);
  const [partners, setPartners] = React.useState<boolean[]>(PARTNERS.map(() => false));
  const [created, setCreated] = React.useState(false);

  const reset = () => {
    setAccepted(false);
    setPartners(PARTNERS.map(() => false));
    setCreated(false);
  };

  const boundCount = partners.filter(Boolean).length;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|T_third_party|</span>
        <span className="font-mono font-semibold tabular-nums">{PARTNERS.length} agreements</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Toggles in DOM</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">0 (dark) / {PARTNERS.length} (benign)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Accept(T_primary) &rArr; &forall;t_i</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">True (dark) / per-toggle (benign)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Entities bound</span>
        <span className="font-mono font-semibold tabular-nums">{created ? (mode === "auditor" ? `${PARTNERS.length} (dark) / ${boundCount} (benign)` : "—") : "—"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Automatic Accept Third Party Term: Bundled Transitive Consent"
      caption="One indivisible &ldquo;I accept&rdquo; node fuses the primary terms with every third-party agreement — no individual toggles exist in the DOM."
      auditorStats={stats}
      deltaNote={`In Variant A checking the primary box and clicking create binds all ${PARTNERS.length} partner agreements at once (∄ Toggle(t_i) ∈ DOM). Variant B renders each partner with its own labelled toggle, and only the ${boundCount} you checked are bound.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Create your ChatLoop account</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Each agreement is separate — accept the ones you want, decline the rest.
            </p>

            <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-0.5 flex-shrink-0 accent-emerald-500"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  I accept the ChatLoop Terms of Service &amp; Privacy Policy
                </div>
                <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                  Required to create an account. Covers only ChatLoop itself.
                </div>
              </div>
            </label>

            <div className="mt-2.5 rounded-md border border-border bg-background p-2.5">
              <div className="text-[9px] font-semibold text-muted-foreground">
                Optional partner agreements — {boundCount} of {PARTNERS.length} selected
              </div>
              <div className="mt-1.5 space-y-1">
                {PARTNERS.map((name, i) => (
                  <label key={name} className="flex items-center gap-2 cursor-pointer rounded px-1 py-0.5 hover:bg-muted/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={partners[i]}
                      onChange={(e) => {
                        const next = [...partners];
                        next[i] = e.target.checked;
                        setPartners(next);
                      }}
                      className="flex-shrink-0 accent-emerald-500"
                    />
                    <span className="text-[9px] text-foreground/80">{name}</span>
                    <span className="ml-auto text-[8px] text-muted-foreground/50">view terms</span>
                  </label>
                ))}
              </div>
              <p className="mt-1.5 text-[8px] text-muted-foreground/50">
                Each partner is bound only if you explicitly tick its box.
              </p>
            </div>

            <button
              onClick={() => setCreated(true)}
              disabled={!accepted}
              className={`mt-2.5 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                accepted
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              Create account
            </button>
          </div>

          {created && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Granular consent
              </div>
              <p className="text-muted-foreground mt-0.5">
                You bound ChatLoop plus <strong className="text-foreground">{boundCount} partner
                agreement(s)</strong> — exactly the ones you toggled. Every t_i had its own
                Toggle(t_i) in the DOM, so consent stayed transitive only to what you chose.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Create your ChatLoop account</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            One quick step and you&rsquo;re in.
          </p>

          <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 flex-shrink-0 accent-rose-500"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                I accept the ChatLoop Terms of Service &amp; Privacy Policy
              </div>
              <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                By continuing, you also agree to the policies of our partners.
              </div>
            </div>
          </label>

          <button
            onClick={() => setCreated(true)}
            disabled={!accepted}
            className={`mt-2.5 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              accepted
                ? "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            Create account
          </button>
        </div>

        {created && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Bundled transitive consent
            </div>
            <p className="text-muted-foreground mt-0.5">
              Your single checkmark triggered{" "}
              <strong className="text-rose-500">Accept(T_primary) &rArr; &forall;t_i &isin;
              T_third_party: Accept(t_i) = True</strong> — all{" "}
              <strong className="text-foreground">{PARTNERS.length} partner agreements</strong>{" "}
              ({PARTNERS.slice(0, 3).join(", ")}, and {PARTNERS.length - 3} more) were bound to you
              in that one click. There were no decoupling toggles anywhere in the DOM
              (&nexists; Toggle(t_i)), so you could neither see nor decline any of them individually.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
