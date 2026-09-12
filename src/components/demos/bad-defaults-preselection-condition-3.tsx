"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Bad Defaults / Preselection — Condition 3: Semantic Intent of the Default Action
 *
 * Thesis: not all defaults are malicious (defaulting to the cheapest
 * shipping tier is user-favorable), so we evaluate L(c) — the text label
 * structurally bound to the pre-selected node c (often via the HTML `for`
 * attribute). An NLP classifier Intent(x) maps the label text x to a
 * consequence domain D ∈ {D_privacy_loss, D_financial_cost,
 * D_marketing_opt_in}. The feature triggers if the pre-selected node maps
 * to a provider-favorable domain, actively penalizing the user by default:
 *
 *   Intent(L(c)) ∈ {D_privacy_loss, D_financial_cost, D_marketing_opt_in}
 *
 * Variant A (dark): the pre-checked defaults are provider-favorable across
 * all three domains — privacy loss, financial cost, marketing opt-in.
 * Variant B (benign): defaults are user-favorable — cheapest shipping tier,
 * no marketing, no data sharing.
 */

export function BadDefaultsPreselectionCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  // Variant A: provider-favorable defaults.
  const [aProtection, setAProtection] = React.useState(true); // D_financial_cost
  const [aOffers, setAOffers] = React.useState(true); // D_marketing_opt_in
  const [aData, setAData] = React.useState(true); // D_privacy_loss
  const [aSubmitted, setASubmitted] = React.useState(false);
  // Variant B: user-favorable defaults.
  const [bExpress, setBExpress] = React.useState(false); // cheapest tier = user-favorable
  const [bAlerts, setBAlerts] = React.useState(true); // user-favorable (security)
  const [bSubmitted, setBSubmitted] = React.useState(false);


  const aDomains = [
    aProtection ? "D_financial_cost" : null,
    aOffers ? "D_marketing_opt_in" : null,
    aData ? "D_privacy_loss" : null,
  ].filter(Boolean);

  return (
    <DemoShell mode={mode}
      title="Bad Defaults / Preselection: Semantic Intent of the Default Action"
      caption="Semantic Intent of the Default Action — the pre-selected defaults map to provider-favorable consequence domains: financial cost, marketing opt-in, and privacy loss."
      deltaNote="Variant A pre-checks a paid protection plan (Intent(L(c)) ∈ D_financial_cost), partner offers (D_marketing_opt_in) and data sharing (D_privacy_loss) — every default penalizes the user. Variant B defaults to the user-favorable side: cheapest shipping tier, no marketing, no data sharing."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Checkout</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Defaults that work for you, not against you.
            </p>
            <div className="mt-2.5 space-y-2">
              <div className="rounded-md border border-border bg-background p-2.5">
                <div className="text-[9px] font-medium text-muted-foreground mb-1">Delivery speed</div>
                <label className="flex items-center gap-2 cursor-pointer group rounded border border-border/60 bg-muted/40 px-2 py-1.5 transition-colors">
                  <input
                    type="radio"
                    name="b-shipping"
                    checked={!bExpress}
                    onChange={() => setBExpress(false)}
                    className="accent-primary flex-shrink-0"
                  />
                  <span className="text-[10px] text-foreground/80 select-none group-hover:text-foreground transition-colors">
                    Standard — <span className="font-mono tabular-nums">$0.00</span> (default:
                    cheapest tier, user-favorable)
                  </span>
                </label>
                <label className="mt-1 flex items-center gap-2 cursor-pointer group rounded px-2 py-1.5 transition-colors hover:bg-muted/60">
                  <input
                    type="radio"
                    name="b-shipping"
                    checked={bExpress}
                    onChange={() => setBExpress(true)}
                    className="accent-primary flex-shrink-0"
                  />
                  <span className="text-[10px] text-foreground/80 select-none group-hover:text-foreground transition-colors">
                    Express — <span className="font-mono tabular-nums">+$9.99</span>
                  </span>
                </label>
              </div>
              <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border/60 bg-muted/40 p-2.5 transition-colors">
                <input
                  type="checkbox"
                  checked={bAlerts}
                  onChange={(e) => setBAlerts(e.target.checked)}
                  className="mt-0.5 flex-shrink-0 accent-primary"
                />
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  Security alerts about my account
                </div>
              </label>
            </div>
            <button
              onClick={() => setBSubmitted(true)}
              className="mt-2.5 w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Place order
            </button>
            {bSubmitted && (
              <div className="mt-2.5 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  User-favorable defaults
                </div>
                <p className="text-muted-foreground mt-0.5">
                  <strong className="text-foreground">Intent(L(c)) ∉ provider domains</strong> —
                  the default is the cheapest shipping tier ({bExpress ? "but you chose Express" : "Standard $0.00"}), no
                  marketing opt-in, no data sharing, only a user-favorable security alert.
                  Passive compliance helps you here.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border-2 border-border/60 bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[11px] font-semibold">Checkout</h3>
            <div className="shrink-0 rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground">
              Recommended extras
            </div>
          </div>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            A few optional extras are selected for your review. Change anything you do not need.
          </p>
          <div className="mt-2.5 space-y-2">
            <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border/60 bg-muted/40 p-2.5 transition-colors">
              <input
                type="checkbox"
                checked={aProtection}
                onChange={(e) => setAProtection(e.target.checked)}
                className="mt-0.5 flex-shrink-0 accent-primary"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  Add Protection Plan — <span className="font-mono tabular-nums">$4.99/mo</span>,
                  auto-renews
                </div>
                <div className="text-[8px] text-muted-foreground/60 mt-0.5">
                  {mode === "auditor" ? "Intent(L(c)) → D_financial_cost" : "Optional protection plan"}
                </div>
              </div>
            </label>
            <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border/60 bg-muted/40 p-2.5 transition-colors">
              <input
                type="checkbox"
                checked={aOffers}
                onChange={(e) => setAOffers(e.target.checked)}
                className="mt-0.5 flex-shrink-0 accent-primary"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  Send me offers from our partners
                </div>
                <div className="text-[8px] text-muted-foreground/60 mt-0.5">
                  {mode === "auditor" ? "Intent(L(c)) → D_marketing_opt_in" : "Partner offers preference"}
                </div>
              </div>
            </label>
            <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border/60 bg-muted/40 p-2.5 transition-colors">
              <input
                type="checkbox"
                checked={aData}
                onChange={(e) => setAData(e.target.checked)}
                className="mt-0.5 flex-shrink-0 accent-primary"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  Share my purchase data with third parties
                </div>
                <div className="text-[8px] text-muted-foreground/60 mt-0.5">
                  {mode === "auditor" ? "Intent(L(c)) → D_privacy_loss" : "Data-sharing preference"}
                </div>
              </div>
            </label>
          </div>
          <button
            onClick={() => setASubmitted(true)}
            className="mt-2.5 w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Place order
          </button>
          {aSubmitted && (
            <div className="mt-2.5 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                {mode === "auditor" ? "Intent classification: provider domains" : "Order preferences saved"}
              </div>
              {mode === "auditor" ? (
                <p className="text-muted-foreground">
                  <strong className="text-foreground">
                    Intent(L(c)) ∈ {"{D_financial_cost, D_marketing_opt_in, D_privacy_loss}"}
                  </strong>{" "}
                  — NLP mapped each pre-selected label to a provider-favorable consequence
                  domain:
                  {aDomains.length
                    ? " " + aDomains.map((d) => <span key={d} className="font-mono text-foreground">{d}</span>).reduce<React.ReactNode[]>((acc, el, i) => (i === 0 ? [el] : [...acc, <span key={`sep-${i}`}>, </span>, el]), [])
                    : " none (you unchecked them all)"}
                  . Passive compliance = the user pays, subscribes, and shares by default.
                </p>
              ) : (
                <p className="text-muted-foreground">
                  The order preferences selected on this page are now attached to your account. Review them in Settings whenever you need to make a change.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
