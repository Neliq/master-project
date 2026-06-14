"use client";

import * as React from "react";
import { ShoppingCart, Trash2, Shield, Check, ArrowLeft } from "lucide-react";

export function SneakIntoBasketCond2({
  mode = "user",
  annotations = [],
  onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [step, setStep] = React.useState<"basket" | "checkout" | "done">("basket");
  const [warrantyChecked, setWarrantyChecked] = React.useState(true);
  const reset = () => { setStep("basket"); setWarrantyChecked(true); };

  const items = [
    { name: "Wireless Mouse", price: 29.99, qty: 1 },
    { name: "USB-C Hub 7-in-1", price: 44.99, qty: 1 },
  ];
  const warrantyPrice = 14.99;
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + (warrantyChecked ? warrantyPrice : 0);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Items in basket</span>
        <span className="font-mono font-semibold">{items.length}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Items at checkout</span>
        <span className="font-mono font-semibold text-pink-500">{items.length + 1}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Sneaked item</span>
        <span className="font-mono font-semibold text-pink-500">Extended Warranty</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Pre-checked</span>
        <span className="font-mono font-semibold text-red-500">Yes</span>
      </div>
    </>
  ) : null;

  /* ── Done screen ── */
  if (step === "done") {
    return (
      <div className="rounded-lg border bg-background overflow-hidden">
        <div className="p-4 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-sm font-semibold">Order Placed!</h3>
          <p className="text-[10px] text-muted-foreground">
            You were charged ${total.toFixed(2)}.
            {warrantyChecked && " This includes the Extended Warranty ($14.99)."}
          </p>
          <div className="bg-muted/50 rounded-md p-2 text-[10px] space-y-1">
            {items.map(i => (
              <div key={i.name} className="flex justify-between">
                <span className="text-muted-foreground">{i.name}</span>
                <span>${i.price.toFixed(2)}</span>
              </div>
            ))}
            {warrantyChecked && (
              <div className="flex justify-between text-pink-500">
                <span>Extended Warranty</span>
                <span>${warrantyPrice.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold border-t pt-1">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={reset}
            className="text-[10px] text-muted-foreground hover:text-foreground underline underline-offset-2"
          >
            Restart demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* ── Step 1: Basket ── */}
      {step === "basket" && (
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="p-3">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart className="w-4 h-4 text-foreground" />
              <h3 className="text-sm font-semibold">Your Basket ({items.length} items)</h3>
            </div>

            <div className="space-y-2 mb-3">
              {items.map(item => (
                <div key={item.name} className="flex items-center gap-3 p-2 rounded-md bg-muted/30">
                  <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center shrink-0">
                    <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium">{item.name}</div>
                    <div className="text-[9px] text-muted-foreground">Qty: {item.qty}</div>
                  </div>
                  <span className="text-xs font-semibold">${item.price.toFixed(2)}</span>
                  <button className="text-muted-foreground hover:text-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xs font-semibold border-t pt-2 mb-3">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => setStep("checkout")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2.5 text-xs font-semibold transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Checkout with sneaked item ── */}
      {step === "checkout" && (
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="p-3">
            <button
              onClick={() => setStep("basket")}
              className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground mb-3 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to basket
            </button>
            <h3 className="text-sm font-semibold mb-3">Checkout</h3>

            <div className="space-y-2 mb-3">
              {items.map(item => (
                <div key={item.name} className="flex items-center justify-between p-2 rounded-md bg-muted/30">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold">${item.price.toFixed(2)}</span>
                </div>
              ))}

              {/* Sneaked warranty item */}
              <div className="flex items-center justify-between p-2 rounded-md bg-pink-50 dark:bg-pink-500/5 border border-pink-200 dark:border-pink-500/20">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-pink-500" />
                  <div>
                    <span className="text-xs font-medium">Extended Warranty</span>
                    <div className="text-[9px] text-muted-foreground">12-month coverage</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">${warrantyPrice.toFixed(2)}</span>
                  <input
                    type="checkbox"
                    checked={warrantyChecked}
                    onChange={(e) => setWarrantyChecked(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-pink-300 text-pink-500 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1 text-[10px] border-t pt-2 mb-3">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {warrantyChecked && (
                <div className="flex justify-between text-pink-500">
                  <span>Extended Warranty</span>
                  <span>${warrantyPrice.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs font-bold border-t pt-1">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setStep("done")}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2.5 text-xs font-semibold transition-colors"
            >
              Pay ${total.toFixed(2)}
            </button>

            <p className="text-[8px] text-center text-muted-foreground mt-2">
              By placing this order you agree to the Terms of Service.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
