"use client";

import * as React from "react";
import { ShoppingCart, ArrowLeft, Check, Truck } from "lucide-react";

export function SneakIntoBasketCond3({
  mode = "user",
  annotations = [],
  onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [step, setStep] = React.useState<"checkout" | "confirm" | "done">("checkout");
  const reset = () => setStep("checkout");

  const items = [
    { name: "Wireless Mouse", price: 29.99, qty: 1 },
    { name: "USB-C Hub 7-in-1", price: 44.99, qty: 1 },
  ];
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipmentFee = 7.99;
  const total = subtotal + shipmentFee;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Displayed total</span>
        <span className="font-mono font-semibold">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Actual total</span>
        <span className="font-mono font-semibold text-red-500">${total.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Hidden fee</span>
        <span className="font-mono font-semibold text-pink-500">+${shipmentFee} shipment</span>
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
          <h3 className="text-sm font-semibold">Order Confirmed!</h3>
          <p className="text-[10px] text-muted-foreground">
            You were charged ${total.toFixed(2)} including shipment.
          </p>
          <div className="bg-muted/50 rounded-md p-2 text-[10px] space-y-1">
            {items.map(i => (
              <div key={i.name} className="flex justify-between">
                <span className="text-muted-foreground">{i.name}</span>
                <span>${i.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between text-muted-foreground">
              <span>Shipment</span>
              <span>${shipmentFee.toFixed(2)}</span>
            </div>
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
      {/* ── Step 1: Checkout — shows only subtotal ── */}
      {step === "checkout" && (
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="p-3">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart className="w-4 h-4 text-foreground" />
              <h3 className="text-sm font-semibold">Checkout</h3>
            </div>

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
            </div>

            {/* Subtotal — no shipment fee shown */}
            <div className="flex justify-between text-xs font-semibold border-t pt-2 mb-3">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => setStep("confirm")}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2.5 text-xs font-semibold transition-colors"
            >
              Pay ${subtotal.toFixed(2)}
            </button>

            <p className="text-[8px] text-center text-muted-foreground mt-2">
              By placing this order you agree to the Terms of Service.
            </p>
          </div>
        </div>
      )}

      {/* ── Step 2: Confirm — shipment fee appears ── */}
      {step === "confirm" && (
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="p-3">
            <button
              onClick={() => setStep("checkout")}
              className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground mb-3 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to checkout
            </button>
            <h3 className="text-sm font-semibold mb-3">Order Summary</h3>

            <div className="space-y-2 mb-3">
              {items.map(item => (
                <div key={item.name} className="flex items-center justify-between p-2 rounded-md bg-muted/30">
                  <span className="text-xs">{item.name}</span>
                  <span className="text-xs font-semibold">${item.price.toFixed(2)}</span>
                </div>
              ))}

              {/* Shipment fee — appears here */}
              <div className="flex items-center justify-between p-2 rounded-md bg-pink-50 dark:bg-pink-500/5 border border-pink-200 dark:border-pink-500/20">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-pink-500" />
                  <span className="text-xs font-medium">Shipment Fee</span>
                </div>
                <span className="text-xs font-semibold text-pink-500">${shipmentFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-1 text-[10px] border-t pt-2 mb-3">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-pink-500">
                <span>Shipment</span>
                <span>+${shipmentFee.toFixed(2)}</span>
              </div>
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
              Shipment fee added at final confirmation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
