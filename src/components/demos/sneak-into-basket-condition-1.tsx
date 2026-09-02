"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { ShoppingCart, Headphones, X } from "lucide-react";

/*
 * Sneak Into Basket — Condition 1: Unprompted State Mutation
 *
 * Thesis: I_explicit is the set of items the user selected via direct DOM
 * interaction events E_user (clicks on "Add to Cart"); I_cart is the actual
 * set of items in the cart. The feature fires if the set difference between
 * the actual cart and the explicitly requested items is non-empty — proving
 * an unrequested item y was injected without a corresponding user event e:
 *
 *   (I_cart \ I_explicit ≠ ∅)  ∧  ∄ e ∈ E_user ⟹ Add(y)
 *
 * Variant A (dark): adding the headphones silently injects a warranty and
 * priority shipping into the cart — no user event added them.
 * Variant B (benign): the cart contains exactly what was added; the extras
 * exist only as explicit opt-in buttons.
 */

const HEADPHONES = { name: "AeroSound X9 Headphones", price: 129.99 };
const WARRANTY = { name: "2-Year Extended Warranty", price: 19.99 };
const SHIPPING = { name: "Priority Express Shipping", price: 8.99 };

const fmt = (n: number) => `$${n.toFixed(2)}`;

export function SneakIntoBasketCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [stageA, setStageA] = React.useState<"product" | "cart" | "review">("product");
  const [stageB, setStageB] = React.useState<"product" | "cart" | "review">("product");
  const [addedA, setAddedA] = React.useState(false); // headphones explicitly added
  const [addedB, setAddedB] = React.useState(false);
  const [injectedA, setInjectedA] = React.useState({ warranty: false, shipping: false }); // Variant A: system-injected
  const [optedInB, setOptedInB] = React.useState({ warranty: false, shipping: false }); // Variant B: user-clicked

  const reset = () => {
    setStageA("product");
    setStageB("product");
    setAddedA(false);
    setAddedB(false);
    setInjectedA({ warranty: false, shipping: false });
    setOptedInB({ warranty: false, shipping: false });
  };

  const injectedItemsA = [
    ...(injectedA.warranty ? [WARRANTY] : []),
    ...(injectedA.shipping ? [SHIPPING] : []),
  ];
  const optedItemsB = [
    ...(optedInB.warranty ? [WARRANTY] : []),
    ...(optedInB.shipping ? [SHIPPING] : []),
  ];
  const totalA = HEADPHONES.price + injectedItemsA.reduce((s, i) => s + i.price, 0);
  const totalB = HEADPHONES.price + optedItemsB.reduce((s, i) => s + i.price, 0);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">I_explicit (your Add events)</span>
        <span className="font-mono font-semibold tabular-nums">{addedA ? "{" + HEADPHONES.name + "}" : "∅"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">I_cart \ I_explicit — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">
          {injectedItemsA.length > 0 ? "{" + injectedItemsA.map((i) => i.name.split(" ")[0]).join(", ") + "}" : "∅"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">∃ e ∈ E_user : Add(y) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">none — no clicks</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Trigger — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{injectedItemsA.length > 0 ? "True" : "False"}</span>
      </div>
    </>
  ) : null;

  const productPage = (onAdd: () => void, accent: "rose" | "emerald") => (
    <div className="rounded-md border bg-background p-3">
      <div className="flex items-start gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${accent === "rose" ? "bg-red-500/10" : "bg-green-500/10"}`}>
          <Headphones className={`h-5 w-5 ${accent === "rose" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[11px] font-semibold">{HEADPHONES.name}</h3>
          <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">
            Over-ear, noise-cancelling, 40h battery. Free returns within 30 days.
          </p>
          <div className="mt-1 text-[10px] font-bold tabular-nums">{fmt(HEADPHONES.price)}</div>
        </div>
      </div>
      <button
        onClick={onAdd}
        className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-[10px] font-semibold text-white transition-colors cursor-pointer ${accent === "rose" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
      >
        <ShoppingCart className="h-3 w-3" /> Add to Cart
      </button>
    </div>
  );

  const lineItem = (name: string, price: number, extra?: React.ReactNode) => (
    <div className="flex items-center justify-between rounded-md border bg-background px-2.5 py-1.5">
      <div className="min-w-0">
        <div className="truncate text-[10px] font-medium">{name}</div>
        {extra}
      </div>
      <span className="ml-2 shrink-0 font-mono text-[10px] font-semibold tabular-nums">{fmt(price)}</span>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Sneak Into Basket: Unprompted State Mutation"
      userTitle="Northstar — Your cart"
      caption="Unprompted State Mutation — items land in your cart that you never added: the actual cart set differs from the set of items you explicitly requested."
      auditorStats={stats}
      deltaNote={`Both panels show the same product and the same Add to Cart button. In Variant A, clicking it silently injects a ${WARRANTY.name} (${fmt(WARRANTY.price)}) and ${SHIPPING.name} (${fmt(SHIPPING.price)}) — I_cart \\ I_explicit ≠ ∅ with no corresponding user event. In Variant B the cart holds exactly what you clicked; the same extras are offered as opt-in buttons you must click yourself.`}
      benign={
        <div className="space-y-3">
          {stageB === "product" &&
            productPage(() => {
              setAddedB(true);
              setStageB("cart");
            }, "emerald")}

          {stageB === "cart" && (
            <div className="rounded-md border bg-background p-2.5">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-[11px] font-semibold">Your cart</h3>
                <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[8px] font-bold text-green-600 dark:text-green-400">
                  {addedB ? 1 + optedItemsB.length : 0} item{addedB && optedItemsB.length === 0 ? "" : "s"}
                </span>
              </div>
              <div className="space-y-1.5">
                {addedB && lineItem(HEADPHONES.name, HEADPHONES.price, (
                  <div className="text-[8px] text-muted-foreground">selected in your cart</div>
                ))}
                {optedItemsB.map((item) => (
                  <React.Fragment key={item.name}>
                    {lineItem(item.name, item.price, (
                      <div className="text-[8px] text-muted-foreground">selected in your cart</div>
                    ))}
                  </React.Fragment>
                ))}
              </div>

              {/* Extras offered as explicit opt-ins — never pre-injected */}
              {addedB && (
                <div className="mt-2 space-y-1.5 border-t pt-2">
                  <div className="text-[8px] font-semibold uppercase tracking-wide text-muted-foreground">Optional extras — your choice</div>
                  {!optedInB.warranty && (
                    <button
                      onClick={() => setOptedInB((o) => ({ ...o, warranty: true }))}
                      className="flex w-full items-center justify-between rounded-md border border-green-500/40 bg-green-500/5 px-2.5 py-1.5 text-left transition-colors hover:bg-green-500/10 cursor-pointer"
                    >
                      <span className="text-[9px] font-medium">+ Add {WARRANTY.name} — {fmt(WARRANTY.price)}</span>
                      <span className="text-[8px] font-semibold text-green-600 dark:text-green-400">opt in</span>
                    </button>
                  )}
                  {!optedInB.shipping && (
                    <button
                      onClick={() => setOptedInB((o) => ({ ...o, shipping: true }))}
                      className="flex w-full items-center justify-between rounded-md border border-green-500/40 bg-green-500/5 px-2.5 py-1.5 text-left transition-colors hover:bg-green-500/10 cursor-pointer"
                    >
                      <span className="text-[9px] font-medium">+ Add {SHIPPING.name} — {fmt(SHIPPING.price)}</span>
                      <span className="text-[8px] font-semibold text-green-600 dark:text-green-400">opt in</span>
                    </button>
                  )}
                </div>
              )}

              <div className="mt-2 flex items-center justify-between border-t pt-2">
                <span className="text-[9px] font-medium">Total</span>
                <span className="font-mono text-[11px] font-bold tabular-nums text-green-600 dark:text-green-400">{fmt(totalB)}</span>
              </div>
              <button
                onClick={() => setStageB("review")}
                className="mt-2 w-full rounded-md bg-green-600 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-green-700 cursor-pointer"
              >
                Proceed to checkout
              </button>
            </div>
          )}

          {stageB === "review" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                I_cart = I_explicit — no mutation
              </div>
              <p className="text-muted-foreground">
                Every line item in this cart maps to an explicit Add event you triggered (E<sub>user</sub>).{" "}
                {optedItemsB.length > 0
                  ? `The ${optedItemsB.map((i) => i.name).join(" and ")} you see were added by your own click.`
                  : "The extras were offered as opt-in buttons and left in the shelf when you didn't click them."}{" "}
                I<sub>cart</sub> \ I<sub>explicit</sub> = ∅, so the trigger condition never fires.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {stageA === "product" &&
          productPage(() => {
            setAddedA(true);
            setInjectedA({ warranty: true, shipping: true });
            setStageA("cart");
          }, "rose")}

        {stageA === "cart" && (
          <div className="rounded-md border bg-background p-2.5">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[11px] font-semibold">Your cart</h3>
              <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[8px] font-bold text-red-600 dark:text-red-400">
                {addedA ? 1 + injectedItemsA.length : 0} item{addedA && injectedItemsA.length === 0 ? "" : "s"}
              </span>
            </div>
            <div className="space-y-1.5">
              {addedA && lineItem(HEADPHONES.name, HEADPHONES.price)}
              {/* Injected items rendered as ordinary cart lines — no indication they were added by the system */}
              {injectedA.warranty &&
                lineItem(WARRANTY.name, WARRANTY.price, (
                  <button
                    onClick={() => setInjectedA((i) => ({ ...i, warranty: false }))}
                    className="mt-0.5 flex items-center gap-0.5 text-[8px] text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground cursor-pointer"
                  >
                    <X className="h-2.5 w-2.5" /> Remove
                  </button>
                ))}
              {injectedA.shipping &&
                lineItem(SHIPPING.name, SHIPPING.price, (
                  <button
                    onClick={() => setInjectedA((i) => ({ ...i, shipping: false }))}
                    className="mt-0.5 flex items-center gap-0.5 text-[8px] text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground cursor-pointer"
                  >
                    <X className="h-2.5 w-2.5" /> Remove
                  </button>
                ))}
            </div>
            <div className="mt-2 flex items-center justify-between border-t pt-2">
              <span className="text-[9px] font-medium">Total</span>
              <span className="font-mono text-[11px] font-bold tabular-nums text-red-600 dark:text-red-400">{fmt(totalA)}</span>
            </div>
            <button
              onClick={() => setStageA("review")}
              className="mt-2 w-full rounded-md bg-red-600 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-red-700 cursor-pointer"
            >
              Proceed to checkout
            </button>

          </div>
        )}

        {stageA === "review" && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Added to your cart
            </div>
            <p className="text-muted-foreground">
              I<sub>cart</sub> \ I<sub>explicit</sub> ={" "}
              <strong className="text-red-500">
                {injectedItemsA.length > 0
                  ? `{${injectedItemsA.map((i) => i.name).join(", ")}} ≠ ∅`
                  : "∅ (you removed them)"}
              </strong>{" "}
              — and for every injected item y there is <strong className="text-foreground">no event e ∈ E</strong>
              <sub>user</sub> with Add(y). The system mutated your cart without your input, relying on status-quo bias
              and checkout-time fatigue to keep the unwanted lines in the total.{" "}
              {injectedItemsA.length === 0 && "You removed them yourself — the burden of vigilance was on you."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
