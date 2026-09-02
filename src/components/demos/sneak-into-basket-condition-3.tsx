"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { Headphones, HeartHandshake, CreditCard } from "lucide-react";

/*
 * Sneak Into Basket — Condition 3: Semantic Obscuration of Injected Line Items
 *
 * Thesis: N_injected is a surreptitiously added cart item; the algorithm
 * inspects its text content for disclosure language indicating optional
 * add-ons ("donation," "optional," "you may also like"). The feature fires
 * if the item's description semantically entails "optional add-on" but the
 * item was not preceded by an explicit user opt-in:
 *
 *   Entailment(T(N_injected), "optional add-on") = True
 *     ∧  UserConsented(N_injected) = False
 *
 * Variant A (dark): a $2.00 donation line is pre-checked into the order — its
 * own fine print says "optional donation" (the entailment fires) but no user
 * opt-in preceded it.
 * Variant B (benign): the identical donation is an unchecked, clearly-labeled
 * opt-in outside the base total — consent precedes inclusion.
 */

const HEADPHONES = { name: "AeroSound X9 Headphones", price: 129.99 };
const DONATION = { name: "Donation to Plant-a-Tree", price: 2.0 };
const DONATION_TEXT =
  "You may also like to round up your purchase. This optional donation supports reforestation projects.";

const fmt = (n: number) => `$${n.toFixed(2)}`;

export function SneakIntoBasketCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Variant A: pre-checked at mount — the user never consented
  const [donationA, setDonationA] = React.useState(true);
  const [paidA, setPaidA] = React.useState(false);
  // Variant B: unchecked at mount — explicit opt-in only
  const [donationB, setDonationB] = React.useState(false);
  const [paidB, setPaidB] = React.useState(false);

  const reset = () => {
    setDonationA(true);
    setPaidA(false);
    setDonationB(false);
    setPaidB(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Disclosure language in line text</span>
        <span className="font-mono font-semibold tabular-nums">&ldquo;optional donation&rdquo;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Entailment(T, &ldquo;optional add-on&rdquo;)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">True</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">UserConsented — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">False (pre-checked for you)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">UserConsented — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{donationB ? "True (you checked)" : "False (you declined)"}</span>
      </div>
    </>
  ) : null;

  const donationLine = (
    name: string,
    price: number,
    checked: boolean,
    onToggle: (v: boolean) => void,
    accent: "rose" | "emerald",
    tiny: boolean
  ) => (
    <div className={`rounded-md border p-2 ${accent === "rose" ? "border-border bg-background" : "border-green-500/30 bg-green-500/5"}`}>
      <label className="flex cursor-pointer items-start gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onToggle(e.target.checked)}
          className={`mt-0.5 flex-shrink-0 ${accent === "rose" ? "accent-red-500" : "accent-green-500"}`}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[10px] font-medium">{name}</span>
            <span className="shrink-0 font-mono text-[10px] font-semibold tabular-nums">{fmt(price)}</span>
          </div>
          <p className={`mt-0.5 leading-relaxed text-muted-foreground ${tiny ? "text-[7px]" : "text-[8px]"}`}>
            {DONATION_TEXT}
          </p>
        </div>
      </label>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Sneak Into Basket: Semantic Obscuration of Injected Line Items"
      userTitle="Northstar — Checkout"
      caption="Semantic Obscuration of Injected Line Items — the added line's own text reveals its optional add-on nature (“optional donation”), yet it was included in the order without any explicit user opt-in."
      auditorStats={stats}
      deltaNote={`Both panels present the identical order and the identical "optional donation" line. In Variant A the box is pre-checked and the $2.00 silently folded into the total — Entailment = True but UserConsented = False. In Variant B the same line is an unchecked, clearly-labeled opt-in outside the base total — consent precedes inclusion.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-background overflow-hidden">
            <div className="flex items-center gap-2 border-b bg-green-500/5 px-3 py-1.5">
              <span className="text-[8px] font-semibold uppercase tracking-wide text-green-700 dark:text-green-300">
                Checkout
              </span>
              <span className="ml-auto text-[7px] text-muted-foreground">step 3 of 3 · review</span>
            </div>
            <div className="p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-semibold">Order summary</span>
                <span className="text-[8px] text-muted-foreground">1 item</span>
              </div>
              <div className="flex items-center justify-between rounded-md border bg-background px-2.5 py-1.5">
                <span className="flex items-center gap-2 text-[10px] font-medium">
                  <Headphones className="h-3 w-3 text-muted-foreground" /> {HEADPHONES.name}
                </span>
                <span className="font-mono text-[10px] font-semibold tabular-nums">{fmt(HEADPHONES.price)}</span>
              </div>

              {/* Donation offered as explicit opt-in — NOT part of the base order */}
              <div className="mt-2">
                {donationLine(DONATION.name, DONATION.price, donationB, setDonationB, "emerald", false)}
              </div>

              <div className="mt-2 flex items-center justify-between border-t pt-2">
                <span className="text-[9px] font-medium">Total</span>
                <span className="font-mono text-[11px] font-bold tabular-nums text-green-600 dark:text-green-400">
                  {fmt(HEADPHONES.price + (donationB ? DONATION.price : 0))}
                </span>
              </div>
              {donationB && (
                <p className="mt-1 text-[7px] text-muted-foreground">
                  includes {fmt(DONATION.price)} donation — added only because you checked the box
                </p>
              )}
              <button
                onClick={() => setPaidB(true)}
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md bg-green-600 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-green-700 cursor-pointer"
              >
                <CreditCard className="h-3 w-3" /> Pay {fmt(HEADPHONES.price + (donationB ? DONATION.price : 0))}
              </button>
            </div>
          </div>

          {mode === "auditor" && paidB && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <HeartHandshake className="h-3 w-3" /> Consent preceded inclusion
              </div>
              <p className="text-muted-foreground">
                The line&rsquo;s text still entails &ldquo;optional add-on&rdquo; — but UserConsented(N<sub>injected</sub>) ={" "}
                <strong className="text-green-700 dark:text-green-300">{donationB ? "True" : "False"}</strong>{" "}
                {donationB
                  ? `— you ticked the box yourself, so the ${fmt(DONATION.price)} you paid was an informed choice.`
                  : "— you left it unchecked and paid the base price. The disclosure language here is a genuine choice, not camouflage."}
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-background overflow-hidden">
          <div className="flex items-center gap-2 border-b bg-red-500/5 px-3 py-1.5">
            <span className="text-[8px] font-semibold uppercase tracking-wide text-red-700 dark:text-red-300">
              Checkout
            </span>
            <span className="ml-auto text-[7px] text-muted-foreground">step 3 of 3 · review</span>
          </div>
          <div className="p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold">Order summary</span>
              <span className="text-[8px] text-muted-foreground">{donationA ? 2 : 1} item{donationA ? "s" : ""}</span>
            </div>
            <div className="flex items-center justify-between rounded-md border bg-background px-2.5 py-1.5">
              <span className="flex items-center gap-2 text-[10px] font-medium">
                <Headphones className="h-3 w-3 text-muted-foreground" /> {HEADPHONES.name}
              </span>
              <span className="font-mono text-[10px] font-semibold tabular-nums">{fmt(HEADPHONES.price)}</span>
            </div>

            {/* Injected line: pre-checked, fine print only discloses optionality */}
            <div className="mt-2">
              {donationLine(DONATION.name, DONATION.price, donationA, setDonationA, "rose", true)}
            </div>

            <div className="mt-2 flex items-center justify-between border-t pt-2">
              <span className="text-[9px] font-medium">Total</span>
              <span className="font-mono text-[11px] font-bold tabular-nums text-red-600 dark:text-red-400">
                {fmt(HEADPHONES.price + (donationA ? DONATION.price : 0))}
              </span>
            </div>
            {donationA && (
              <p className="mt-1 text-[7px] text-muted-foreground/60">
                includes {fmt(DONATION.price)} donation — pre-selected for you
              </p>
            )}
            <button
              onClick={() => setPaidA(true)}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md bg-red-600 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-red-700 cursor-pointer"
            >
              <CreditCard className="h-3 w-3" /> Pay {fmt(HEADPHONES.price + (donationA ? DONATION.price : 0))}
            </button>
          </div>
        </div>

        {mode === "auditor" && paidA && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Added to your order
            </div>
            <p className="text-muted-foreground">
              Entailment(T(N<sub>injected</sub>), &ldquo;optional add-on&rdquo;) ={" "}
              <strong className="text-red-500">True</strong> — the line&rsquo;s own description says &ldquo;This{" "}
              <em>optional</em> donation&hellip;&rdquo; — yet UserConsented(N<sub>injected</sub>) ={" "}
              <strong className="text-foreground">False</strong>: the box was checked for you at mount and{" "}
              {fmt(DONATION.price)} was folded into the total before you ever saw it.
            </p>
            <p className="text-muted-foreground">
              {donationA
                ? `You paid ${fmt(HEADPHONES.price + DONATION.price)}. The disclosure language exists — buried in 7px fine print — but it never preceded your consent, so the trigger condition is satisfied.`
                : "You happened to uncheck the box — but the system bet on most users paying the extra $2 without reading the fine print."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
