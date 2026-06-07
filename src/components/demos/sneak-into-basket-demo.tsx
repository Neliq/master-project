"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Sneak Into Basket pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function SneakIntoBasketDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Clicking "Buy now" silently adds a warranty line item.
  const [cart, setCart] = React.useState<{ id: number; name: string; price: number; qty: number }[]>([]);
  const [stages, setStages] = React.useState(0);
  const base = { id: 1, name: "Premium headphones", price: 49.99, qty: 1 };
  const add = () => {
    if (cart.find((c) => c.id === 1)) {
      setCart((c) => [...c, { id: 2, name: "Extended warranty", price: 9.99, qty: 1 }]);
    } else {
      setCart([base]);
    }
    setStages((s) => s + 1);
  };

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Sneak Into Basket"
      caption="The 'Buy now' button adds a $9.99 extended warranty to the cart before showing the receipt. The line item appears as a pre-checked add-on with no separate consent."
      hint="Click 'Buy now' and watch the cart total jump."
    >
      <div className="space-y-4">
        <button
          onClick={add}
          className="bg-foreground text-background w-full rounded-md px-3 py-2 text-base font-medium"
        >
          Buy now — $49.99
        </button>

        <div className="space-y-1">
          {cart.length === 0 && (
            <div className="text-muted-foreground rounded-md border border-dashed px-3 py-4 text-center text-[10px]">
              Cart is empty.
            </div>
          )}
          {cart.map((item) => (
            <div key={item.id} className="bg-muted/40 flex items-center justify-between rounded-md border px-3 py-2 text-xs">
              <span>{item.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-semibold tabular-nums">${item.price.toFixed(2)}</span>
                <button
                  onClick={() => setCart((c) => c.filter((x) => x.id !== item.id))}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-foreground/5 flex items-center justify-between rounded-md border px-3 py-2 text-xs">
          <span className="text-muted-foreground">Total</span>
          <span className="font-mono text-2xl font-semibold tabular-nums">
            ${cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}
          </span>
        </div>

        {cart.length > 1 && (
          <div className="bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300 rounded-md border px-3 py-2 text-[10px]">
            The "+$9.99" line was added silently. Click × to remove it.
          </div>
        )}
      </div>
    </DemoShell>
  );
}

