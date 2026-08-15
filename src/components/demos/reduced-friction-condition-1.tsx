"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

interface Product {
  id: string;
  name: string;
  price: number;
  emoji: string;
}

const products: Product[] = [
  { id: "cloud", name: "Cloud Storage (1TB)", price: 9.99, emoji: "☁️" },
  { id: "vpn", name: "VPN Pro", price: 4.99, emoji: "🔒" },
  { id: "backup", name: "Auto Backup", price: 2.99, emoji: "💾" },
  { id: "antivirus", name: "Antivirus Shield", price: 6.99, emoji: "🛡️" },
];

export function ReducedFrictionCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [screen, setScreen] = React.useState<"list" | "confirmation">("list");
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [purchasedIds, setPurchasedIds] = React.useState<string[]>([]);

  const reset = () => {
    setScreen("list");
    setSelectedProduct(null);
    setPurchasedIds([]);
  };

  const handleBuy = (product: Product) => {
    // No confirmation — payment goes through instantly, then shows receipt
    setSelectedProduct(product);
    setPurchasedIds(prev => [...prev, product.id]);
    setScreen("confirmation");
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Confirmation steps removed</span>
        <span className="font-mono font-semibold">All (0 shown)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Items purchased</span>
        <span className="font-mono font-semibold">{purchasedIds.length}/{products.length}</span>
      </div>
    </>
  ) : null;

  if (screen === "confirmation" && selectedProduct) {
    return (
      <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
        title="Reduced Friction: Absence of Confirmation Interstitial"
        caption="Payment confirmation shown after charge — no review step before payment." auditorStats={stats}>
        <div className="space-y-3">
          <div className="rounded-md border bg-foreground/5 p-3 text-xs">

            {/* Confirmation screen */}
            <div className="rounded-xl border-2 border-green-500/40 bg-green-500/5 p-5 text-center shadow-lg">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-lg">
                ✓
              </div>
              <div className="text-sm font-bold text-green-600 dark:text-green-400">Payment Successful</div>
              <div className="mt-1 text-[10px] text-muted-foreground">
                {selectedProduct.emoji} {selectedProduct.name}
              </div>
              <div className="mt-2 font-mono text-lg font-bold">${selectedProduct.price.toFixed(2)}/mo</div>
              <div className="mt-1 text-[8px] text-muted-foreground/50">
                Charged to Visa •••• 4242
              </div>
            </div>

            <button onClick={() => setScreen("list")} className="mt-2 w-full rounded-md border border-foreground/10 bg-foreground/5 py-2 text-xs font-medium">
              Back to Store
            </button>
          </div>
        </div>
      </DemoShell>
    );
  }

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Reduced Friction: Absence of Confirmation Interstitial"
      caption="Absence of Confirmation Interstitial — clicking Buy charges your saved card instantly, no confirmation shown." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">

          {/* Saved card notice */}
          <div className="mb-2 flex items-center gap-1.5 rounded-md bg-foreground/5 px-2 py-1 text-[9px] text-muted-foreground">
            <span>💳</span>
            <span>Visa •••• 4242 saved</span>
          </div>

          {/* Product list */}
          <div className="space-y-1.5">
            {products.map(product => {
              const isPaid = purchasedIds.includes(product.id);
              return (
                <div key={product.id} className="flex items-center justify-between rounded-md border border-foreground/10 bg-foreground/5 px-2.5 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{product.emoji}</span>
                    <div>
                      <div className="font-medium">{product.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isPaid ? (
                      <>
                        <span className="font-mono font-semibold">${product.price.toFixed(2)}/mo</span>
                        <button
                          onClick={() => handleBuy(product)}
                          className="flex items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-[9px] font-semibold text-white transition-colors hover:bg-green-700"
                        >
                          🛒 Buy
                        </button>
                      </>
                    ) : (
                      <span className="flex items-center gap-1 rounded-md bg-green-500/10 px-2 py-1 text-[9px] font-semibold text-green-600 dark:text-green-400">
                        ✓ Purchased
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </DemoShell>
  );
}
