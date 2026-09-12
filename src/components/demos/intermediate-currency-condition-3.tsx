"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { Coins, CreditCard, Swords, Lock } from "lucide-react";

/*
 * Intermediate Currency — Condition 3: Lexical Tokenization mapped to Forced Exchange
 *
 * Thesis: C_virtual is a localized, non-standard token system and T_price(n)
 * the extracted price text of the item. The feature fires if the price is
 * strictly expressed in the virtual lexicon AND the system actively gates the
 * final transaction behind the prior execution of the exchange vector:
 *
 *   T_price(n) ∈ C_virtual  ∧  TransactionStatus(n) ⟹ Executed(E_exchange)
 *
 * Variant A (dark): the item is priced ONLY in gems (no fiat price anywhere),
 * and the Pay action stays locked until the user has executed the coin
 * exchange with fiat money.
 * Variant B (benign): the same item also carries a fiat price, and payment
 * never requires the exchange vector.
 */

const ITEM_NAME = "Mythic Sword of Dawn";
const PRICE_GEMS = 2500;
const PRICE_USD = 24.99;
const PACK_GEMS = 3000;
const PACK_USD = 29.99;
const START_BALANCE = 800;

export function IntermediateCurrencyCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [balanceA, setBalanceA] = React.useState(START_BALANCE);
  const [paidA, setPaidA] = React.useState(false);
  const [paidB, setPaidB] = React.useState(false);


  const enough = balanceA >= PRICE_GEMS;

  return (
    <DemoShell mode={mode}
      title="Intermediate Currency: Lexical Tokenization mapped to Forced Exchange"
      caption="Lexical Tokenization mapped to Forced Exchange — the price exists only in the virtual token lexicon, and the transaction cannot complete until you have first executed the coin exchange with real money."
      deltaNote={`Both panels show the same sword and the same gem balance. Variant A prices it strictly in the virtual lexicon ("${PRICE_GEMS.toLocaleString()} Gems") and keeps Pay locked until you execute the coin exchange; Variant B adds a fiat price ($${PRICE_USD.toFixed(2)}) and lets you pay directly — no exchange vector required.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-background overflow-hidden">
            <div className="relative flex h-24 items-center justify-center bg-gradient-to-br from-foreground via-primary to-primary">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-background/30 bg-background/15 shadow-lg rotate-[8deg]">
                <Swords className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-muted/40 px-2 py-0.5 text-[8px] font-bold text-foreground">
                <Coins className="h-2.5 w-2.5" /> {START_BALANCE.toLocaleString()} Gems
              </div>
            </div>
            <div className="p-3">
              <div className="mb-1 flex items-start justify-between gap-2">
                <h3 className="text-[11px] font-semibold">{ITEM_NAME}</h3>
                {/* Fiat price disclosed alongside the token price */}
                <span className="shrink-0 rounded-full bg-muted/40 px-2 py-0.5 text-[10px] font-bold text-foreground">
                  {PRICE_GEMS.toLocaleString()} Gems &middot; ${PRICE_USD.toFixed(2)}
                </span>
              </div>
              <p className="mb-3 text-[9px] leading-relaxed text-muted-foreground">
                A legendary blade forged from dawnlight. +45 attack, unique trail effect.
              </p>
              <button
                onClick={() => setPaidB(true)}
                disabled={paidB}
                className={`flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-[10px] font-semibold text-primary-foreground transition-colors ${
                  paidB ? "bg-muted text-muted-foreground/50 cursor-not-allowed" : "bg-primary hover:bg-primary/80 cursor-pointer"
                }`}
              >
                <CreditCard className="h-3 w-3" /> {paidB ? "Purchase complete" : `Pay $${PRICE_USD.toFixed(2)} (fiat)`}
              </button>
              <p className="mt-2 text-center text-[8px] text-muted-foreground">
                Your gem balance ({START_BALANCE.toLocaleString()}) is irrelevant here — you can pay with a card directly.
              </p>
            </div>
          </div>

          {paidB && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <CreditCard className="h-3 w-3" /> Fiat payment, no exchange executed
              </div>
              <p className="text-muted-foreground">
                T<sub>price</sub>(n) = &ldquo;{PRICE_GEMS.toLocaleString()} Gems &middot; ${PRICE_USD.toFixed(2)}&rdquo; — the
                price is not strictly in C<sub>virtual</sub>, and TransactionStatus(n) never implied Executed(E
                <sub>exchange</sub>). The transaction completed against your card in one step.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-background overflow-hidden">
          <div className="relative flex h-24 items-center justify-center bg-gradient-to-br from-foreground via-primary to-primary">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-background/30 bg-background/15 shadow-lg rotate-[8deg]">
              <Swords className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-muted/40 px-2 py-0.5 text-[8px] font-bold text-foreground">
              <Coins className="h-2.5 w-2.5" /> {balanceA.toLocaleString()} Gems
            </div>
          </div>
          <div className="p-3">
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3 className="text-[11px] font-semibold">{ITEM_NAME}</h3>
              {/* Strictly virtual lexicon — no fiat price anywhere on the page */}
              <span className="shrink-0 rounded-full bg-muted/40 px-2 py-0.5 text-[10px] font-bold text-foreground">
                {PRICE_GEMS.toLocaleString()} Gems
              </span>
            </div>
            <p className="mb-3 text-[9px] leading-relaxed text-muted-foreground">
              A legendary blade forged from dawnlight. +45 attack, unique trail effect.
            </p>

            {/* Pay action gated behind the exchange vector */}
            <button
              onClick={() => enough && setPaidA(true)}
              disabled={!enough}
              className={`flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-[10px] font-semibold transition-colors ${
                enough
                  ? "bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer"
                  : "bg-muted text-muted-foreground/50 cursor-not-allowed"
              }`}
            >
              {enough ? (
                <>Pay {PRICE_GEMS.toLocaleString()} Gems</>
              ) : (
                <>
                  <Lock className="h-3 w-3" /> Insufficient Gems — top up to continue
                </>
              )}
            </button>

            {/* The mandatory exchange vector (E_exchange) */}
            <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2">
              <div className="mb-1 flex items-center gap-1.5 text-[9px] font-semibold text-foreground">
                <Coins className="h-3 w-3" /> Exchange — the only way to pay
              </div>
              <button
                onClick={() => setBalanceA((b) => b + PACK_GEMS)}
                disabled={paidA}
                className={`w-full rounded-md py-1.5 text-[9px] font-semibold transition-colors ${
                  paidA
                    ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer"
                }`}
              >
                {paidA ? "Exchange already executed" : `Buy ${PACK_GEMS.toLocaleString()} Gems — $${PACK_USD.toFixed(2)}`}
              </button>
              <p className="mt-1 text-[7px] leading-relaxed text-muted-foreground">
                No card payments accepted for this item. Fiat money must first be converted into gems.
              </p>
            </div>
          </div>
        </div>

        {mode === "auditor" && paidA && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Forced exchange executed
            </div>
            <p className="text-muted-foreground">
              T<sub>price</sub>(n) = &ldquo;{PRICE_GEMS.toLocaleString()} Gems&rdquo; ∈ C<sub>virtual</sub> — no fiat price was
              shown for this item — <strong className="text-foreground">and</strong> TransactionStatus(n) ⟹ Executed(E
              <sub>exchange</sub>): the Pay button stayed locked until you bought {PACK_GEMS.toLocaleString()} Gems with
              ${PACK_USD.toFixed(2)} of real money. You paid ${PACK_USD.toFixed(2)} for a ${PRICE_USD.toFixed(2)} item and now
              carry {(balanceA - PRICE_GEMS).toLocaleString()} leftover Gems.
            </p>
            <p className="text-muted-foreground">
              Both conjuncts hold: the price lives only in the virtual lexicon, and the transaction is gated behind the
              prior execution of the exchange vector.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
