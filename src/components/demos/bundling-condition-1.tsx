"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Bundling — Condition 1: Inseparable Transactional Nodes
 *
 * Thesis: I_primary is the item the user intends to purchase, I_supp a
 * supplementary item (warranty, accessory, subscription). The feature
 * triggers if executing the primary purchase event E_purchase inevitably
 * stages both items in the cart, without offering any discrete event e
 * that adds the primary item alone:
 *
 *   E_purchase(I_primary) ⟹ {I_primary, I_supp} ⊆ C_state
 *   ∧ ∄ e : e(I_primary) ⟹ C_state = {I_primary}
 *
 * Variant A (dark): “Add to cart” on the camera also forces in a 2-year
 * warranty; the warranty checkbox is checked and disabled, so no discrete
 * event adds the camera alone.
 * Variant B (benign): the warranty is an independent, unchecked option —
 * adding the camera alone yields C_state = {Camera}.
 */

const usd = (n: number) => `$${n.toFixed(2)}`;
const CAMERA = { name: "Nova X100 Mirrorless Camera", price: 899 };
const WARRANTY = { name: "2-Year Extended Warranty", price: 49 };

export function BundlingCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [addedDark, setAddedDark] = React.useState(false);
  const [addedBenign, setAddedBenign] = React.useState(false);
  const [warrantyChecked, setWarrantyChecked] = React.useState(false);


  const renderPanel = (dark: boolean) => {
    const isAdded = dark ? addedDark : addedBenign;
    const darkCart = addedDark ? [CAMERA, WARRANTY] : [];
    const benignCart = addedBenign
      ? warrantyChecked
        ? [CAMERA, WARRANTY]
        : [CAMERA]
      : [];
    const cart = dark ? darkCart : benignCart;
    const subtotal = cart.reduce((s, i) => s + i.price, 0);

    return (
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${
                dark ? "bg-muted" : "bg-muted"
              }`}
            >
              <svg
                className={`h-5 w-5 ${dark ? "text-foreground" : "text-foreground"}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="6" y="5" width="12" height="14" rx="1.5" />
                <circle cx="10" cy="10" r="1.5" />
                <circle cx="14" cy="10" r="1.5" />
                <path d="M9 14h6" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">{CAMERA.name}</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                26MP APS-C sensor · 4K60 video · IBIS
              </p>
              <div className="mt-1 text-[11px] font-bold tabular-nums">{usd(CAMERA.price)}</div>
            </div>
          </div>

          <div className="mt-3 space-y-2 border-t border-border pt-2">
            <label
              className={`flex items-center justify-between gap-2 rounded-md border p-2 ${
                dark
                  ? "cursor-not-allowed border-border/60 bg-muted/40"
                  : "cursor-pointer border-border bg-background transition-colors hover:border-ring"
              }`}
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={dark ? true : warrantyChecked}
                  disabled={dark}
                  onChange={(e) => setWarrantyChecked(e.target.checked)}
                  className={`flex-shrink-0 ${dark ? "accent-primary" : "accent-primary"}`}
                />
                <span className="min-w-0">
                  <span className="block text-[10px] font-medium">{WARRANTY.name}</span>
                  <span className="block text-[8px] text-muted-foreground">
                    {dark ? "Included with this offer — cannot be removed" : "Optional add-on — you can decline it"}
                  </span>
                </span>
              </span>
              <span className="font-mono text-[10px] tabular-nums">{usd(WARRANTY.price)}</span>
            </label>

            <button
              onClick={() => (dark ? setAddedDark(true) : setAddedBenign(true))}
              className={`w-full cursor-pointer rounded-md py-1.5 text-[10px] font-medium text-primary-foreground transition-colors ${
                dark ? "bg-primary hover:bg-primary/80" : "bg-primary hover:bg-primary/80"
              }`}
            >
              {isAdded ? "Added to cart ✓" : "Add to cart"}
            </button>
          </div>
        </div>

        {isAdded ? (
          <div className="rounded-md border bg-background p-2.5">
            <div className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground">
              Cart
            </div>
            <div className="mt-1.5 space-y-1">
              {cart.map((i) => (
                <div key={i.name} className="flex items-center justify-between text-[9px]">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {i.name}
                  </span>
                  <span className="font-mono tabular-nums">{usd(i.price)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-border pt-1 text-[10px] font-semibold">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono tabular-nums">{usd(subtotal)}</span>
              </div>
            </div>
          </div>
        ) : null}

        {mode === "auditor" && isAdded && (dark ? (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-foreground">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Inseparable transactional nodes
              </div>
              <p className="text-muted-foreground mt-1">
                E_purchase(I_primary) ⟹{" "}
                <strong className="text-foreground">{"{Camera, Warranty}"} ⊆ C_state</strong> — the
                warranty checkbox is checked and disabled, so there is no discrete event e that adds
                the camera alone (∄ e). You paid{" "}
                <strong className="text-foreground">{usd(subtotal)}</strong> for an
                item you never chose.
              </p>
            </div>
          ) : (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-foreground">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Granular choice preserved
              </div>
              <p className="text-muted-foreground mt-1">
                A discrete event e exists: adding the camera alone yields C_state ={" "}
                <strong className="text-foreground">{"{Camera}"}</strong> for{" "}
                {usd(CAMERA.price)}. The warranty is an independent, unchecked option you can accept
                or decline.
              </p>
            </div>
          ))}
      </div>
    );
  };

  return (
    <DemoShell
      mode={mode}
      title="Bundling: Inseparable Transactional Nodes"
      caption="Inseparable Transactional Nodes — executing the primary purchase event inevitably stages both the primary and a supplementary item, with no discrete event to buy the primary item alone."
      deltaNote="Variant A forces the warranty into the cart with a checked-and-disabled checkbox, so adding the camera always yields {Camera, Warranty}. Variant B leaves the warranty as an independent, unchecked option — the camera alone is a discrete, purchasable event."
      benign={renderPanel(false)}
    >
      {renderPanel(true)}
    </DemoShell>
  );
}
