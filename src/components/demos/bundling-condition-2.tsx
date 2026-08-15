"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

interface CartItem {
  id: string;
  name: string;
  price: number;
  removable: boolean;
  bundled: boolean;
}

export function BundlingCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const initialItems: CartItem[] = [
    { id: "headphones", name: "Wireless Headphones", price: 79.99, removable: true, bundled: false },
    { id: "warranty", name: "Extended Warranty (2yr)", price: 14.99, removable: true, bundled: true },
  ];

  const [items, setItems] = React.useState<CartItem[]>(initialItems);
  const [removedByUser, setRemovedByUser] = React.useState<string[]>([]);
  const [showWarning, setShowWarning] = React.useState(false);

  const reset = () => {
    setItems(initialItems);
    setRemovedByUser([]);
    setShowWarning(false);
  };

  const total = items.reduce((s, i) => s + i.price, 0);

  const handleRemove = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    if (item.bundled) {
      // Dark pattern: removing the bundled item also removes the primary item
      setShowWarning(true);
      setTimeout(() => {
        setItems([]);
        setRemovedByUser(["warranty", "headphones"]);
        setShowWarning(false);
      }, 600);
    } else {
      // Removing the primary item also removes the bundled item
      setItems([]);
      setRemovedByUser(["headphones", "warranty"]);
    }
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Remove(x) → also removes</span>
        <span className="font-mono font-semibold">warranty → headphones</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Bundling: Irreversible Set Addition"
      caption="Irreversible Set Addition — removing the bundled item silently removes the primary item too." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-2 font-medium">Shopping Cart</div>

          {items.length > 0 ? (
            <div className="space-y-1.5">
              {items.map(item => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between rounded-md border px-2.5 py-2 transition-all duration-300 ${
                    showWarning && item.bundled
                      ? "border-red-500/60 bg-red-500/10"
                      : "border-foreground/10 bg-foreground/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-sm">{item.id === "headphones" ? "🎧" : "🛡️"}</div>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      {item.bundled && (
                        <div className="text-[8px] text-muted-foreground/60">auto-added</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold">${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground/10 text-muted-foreground transition-colors hover:bg-red-500/20 hover:text-red-500"
                      aria-label={`Remove ${item.name}`}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-dashed p-4 text-center text-[10px] text-muted-foreground">
              {removedByUser.length > 0 && (
                <div className="text-red-400 dark:text-red-400">
                  Removing the warranty also removed your headphones.
                  <br />
                  <span className="font-medium">Both items were removed.</span>
                </div>
              )}
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-2 flex items-center justify-between rounded-md bg-foreground/10 px-2.5 py-1.5 font-semibold">
              <span>Total</span>
              <span className="font-mono">${total.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
