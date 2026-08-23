"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Wrong Language — Condition 3: Localized Linguistic Discrepancy
 *
 * Thesis: L_session is the primary language of the browsing session
 * (from the <html lang="..."> attribute). The feature triggers if the
 * detected language of a critical DOM node — high-stakes interactive
 * elements or legal disclosures — deviates from the session language
 * with confidence above a reliability threshold:
 *
 *   Lang(N_critical) ≠ L_session  ∧  Confidence(Lang(N_critical)) > τ_lang_id
 *
 * Variant A (dark): on an English checkout (html lang="en"), the legal
 * consent checkbox and its terms deviate to Spanish.
 * Variant B (benign): the same critical node stays in the session language.
 */

const SESSION_LANG_ATTR = "en";
const TERMS_DARK_TITLE = "Términos y Condiciones";
const CHECKBOX_LABEL_DARK = "Acepto los Términos y Condiciones y la Política de Privacidad";
const TERMS_TEXT_DARK =
  "Al continuar, usted acepta los Términos y Condiciones de Compra y la Política de Privacidad de Acme Store. Sus datos personales serán procesados conforme a la legislación aplicable para la gestión del pedido y la mejora del servicio. Podrá ejercer sus derechos de acceso, rectificación y supresión en cualquier momento.";

const CHECKBOX_LABEL_BENIGN = "I accept the Terms & Conditions and the Privacy Policy";
const TERMS_TEXT_BENIGN =
  "By continuing you accept the Purchase Terms & Conditions and the Acme Store Privacy Policy. Your personal data will be processed in line with applicable law to manage your order and improve our service. You can exercise your rights of access, correction and erasure at any time.";

export function WrongLanguageCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [agreed, setAgreed] = React.useState(false);
  const [showTerms, setShowTerms] = React.useState(false);
  const [placed, setPlaced] = React.useState(false);

  const reset = () => {
    setAgreed(false);
    setShowTerms(false);
    setPlaced(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">L_session (html lang)</span>
        <span className="font-mono font-semibold tabular-nums">en</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Lang(N_critical) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">es</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Confidence</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">0.99 &gt; &tau;_lang_id (0.90)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Consent given?</span>
        <span className="font-mono font-semibold tabular-nums">{agreed ? "Yes" : "No"}</span>
      </div>
    </>
  ) : null;

  const checkout = (dark: boolean) => (
    <div className="rounded-md border bg-card p-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-[11px] font-semibold">Checkout — order summary</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">Acme Store · 2 items · Free shipping</p>
        </div>
        <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
          html lang=&ldquo;{SESSION_LANG_ATTR}&rdquo;
        </div>
      </div>

      <div className="mt-3 space-y-1.5 text-[9px] text-muted-foreground">
        <div className="flex justify-between"><span>Wireless headphones</span><span className="font-mono">$129.00</span></div>
        <div className="flex justify-between"><span>USB-C charger</span><span className="font-mono">$19.00</span></div>
        <div className="flex justify-between border-t border-border pt-1.5 font-semibold text-foreground">
          <span>Total</span><span className="font-mono">$148.00</span>
        </div>
      </div>

      <button
        onClick={() => setShowTerms(!showTerms)}
        className="mt-3 text-[9px] font-medium underline-offset-2 hover:underline transition-colors cursor-pointer text-foreground/70 hover:text-foreground"
      >
        {dark ? TERMS_DARK_TITLE : "Terms & Conditions"}
      </button>
      {showTerms && (
        <div className="mt-1.5 rounded-md border bg-background p-2 text-[9px] leading-relaxed text-muted-foreground">
          {dark ? TERMS_TEXT_DARK : TERMS_TEXT_BENIGN}
        </div>
      )}

      <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className={`mt-0.5 flex-shrink-0 ${dark ? "accent-red-500" : "accent-green-500"}`}
        />
        <span className="min-w-0 flex-1 text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
          {dark ? CHECKBOX_LABEL_DARK : CHECKBOX_LABEL_BENIGN}
        </span>
      </label>

      <button
        onClick={() => setPlaced(true)}
        disabled={!agreed}
        className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
          agreed
            ? dark
              ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            : "bg-muted text-muted-foreground/40 cursor-not-allowed"
        }`}
      >
        Place order — $148.00
      </button>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Wrong Language: Localized Linguistic Discrepancy"
      caption="Localized Linguistic Discrepancy — the session language is English, but the critical legal consent node deviates to another language with high identification confidence."
      auditorStats={stats}
      deltaNote="In Variant A the consent checkbox — the critical legal node — is rendered in Spanish while the session language is English (Lang(N_critical) = es ≠ L_session, confidence 0.99 > τ_lang_id). Variant B renders the same node in the session language."
      benign={
        <div className="space-y-3">
          {checkout(false)}
          {mode === "auditor" && placed && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Order placed
              </div>
              <p className="text-muted-foreground mt-0.5">
                The critical node was rendered in the session language: Lang(N_critical) = en = L_session. You read the
                checkbox before agreeing, so the consent you gave was informed.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {checkout(true)}
        {mode === "auditor" && placed && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Order placed
            </div>
            <p className="text-muted-foreground mt-0.5">
              {agreed ? "Your order has been placed." : "Your order was not placed."}{" "}
              You can review your order details from your account.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
