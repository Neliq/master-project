"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { Package, Truck, CheckCircle2, MapPin, Clock } from "lucide-react";

/**
 * Interactive demo for the Pre-Delivered Content pattern.
 *
 * A "mystery box" is silently added to the user's cart and progresses
 * through four real stages: pre-loaded → packed → on a truck → shipped.
 * Each stage is rendered as a real e-commerce screen. The cancel
 * option shrinks at each stage.
 *
 * Hand-built from the master thesis formal conditions.
 */

type Stage = "pre-loaded" | "packed" | "truck" | "shipped";

const STAGES: { id: Stage; label: string; sub: string; cancelFee: string; icon: React.ReactNode }[] = [
  {
    id: "pre-loaded",
    label: "Pre-loaded",
    sub: "Locked into your cart",
    cancelFee: "Free",
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: "packed",
    label: "Packed",
    sub: "Dispatched in 5 days",
    cancelFee: "Free (before dispatch)",
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: "truck",
    label: "On the truck",
    sub: "Out for delivery",
    cancelFee: "Restocking fee applies",
    icon: <Truck className="h-4 w-4" />,
  },
  {
    id: "shipped",
    label: "Shipped",
    sub: "24h return window after delivery",
    cancelFee: "Returns only",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
];

export function PreDeliveredContentDemo({
  mode = "user",
  annotations = [],
  onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [stageIdx, setStageIdx] = React.useState(0);
  const [cancelled, setCancelled] = React.useState(false);
  const current = STAGES[stageIdx];

  const isAuditor = mode === "auditor";
  const reset = () => {
    setStageIdx(0);
    setCancelled(false);
  };

  const auditorControls = isAuditor ? (
    <>
      <button
        onClick={() => setStageIdx(Math.min(STAGES.length - 1, stageIdx + 1))}
        disabled={stageIdx === STAGES.length - 1}
        className="bg-purple-500 hover:bg-purple-600 rounded-md px-2 py-1 text-xs font-medium text-white disabled:opacity-30"
      >
        Advance stage
      </button>
      <button
        onClick={reset}
        className="bg-purple-500 hover:bg-purple-600 rounded-md px-2 py-1 text-xs font-medium text-white"
      >
        Restart
      </button>
    </>
  ) : null;

  const auditorStats = isAuditor ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Current stage</span>
        <span className="font-mono font-semibold tabular-nums">
          {stageIdx + 1} / {STAGES.length}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Cancel fee</span>
        <span className="font-mono font-semibold">{current.cancelFee}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell
      mode={mode}
      annotations={annotations}
      onRestart={onRestart ?? reset}
      auditorControls={auditorControls}
      auditorStats={auditorStats}
      title="Pre-Delivered Content"
      caption='A "mystery box" was silently added to your cart at signup. By the time you notice, it is already on a truck. Watch the cancel window shrink at each stage.'
    >
      <div className="space-y-3">
        {/* The actual cart / product / shipping screens */}
        {current.id === "pre-loaded" && !cancelled && (
          <PreLoadedCart onAccept={() => setStageIdx(1)} onCancel={() => setCancelled(true)} />
        )}
        {current.id === "packed" && !cancelled && (
          <PackedScreen onAdvance={() => setStageIdx(2)} onCancel={() => setCancelled(true)} />
        )}
        {current.id === "truck" && !cancelled && (
          <TruckScreen onAdvance={() => setStageIdx(3)} onCancel={() => setCancelled(true)} />
        )}
        {current.id === "shipped" && !cancelled && <ShippedScreen />}

        {cancelled && (
          <div className="bg-emerald-500/10 border-emerald-500/30 space-y-1 rounded-md border p-3 text-[11px]">
            <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              Cancelled
            </div>
            <p className="text-muted-foreground text-[10px]">
              You cancelled before dispatch. No charge applied.
            </p>
            <button
              onClick={reset}
              className="bg-foreground text-background mt-2 w-full rounded-md px-3 py-1.5 text-xs font-medium"
            >
              Restart demo
            </button>
          </div>
        )}

        {/* The stage indicator — what a real e-commerce site would show */}
        <StageTracker currentIdx={stageIdx} cancelled={cancelled} />
      </div>
    </DemoShell>
  );
}

/* ------------------------------------------------------------------ */
/*  The four real-looking e-commerce screens                           */
/* ------------------------------------------------------------------ */

function PreLoadedCart({
  onAccept,
  onCancel,
}: {
  onAccept: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="bg-background space-y-3 rounded-md border p-4 text-xs">
      <h3 className="text-base font-semibold">Your cart</h3>
      <div className="divide-y rounded-md border">
        <CartItem
          name="Mystery box (pre-loaded)"
          subtitle="A surprise selection from our partners"
          price={19.99}
        />
      </div>
      <div className="bg-amber-500/10 border-amber-500/30 rounded-md border p-2 text-[10px]">
        ⚠ This item was added to your cart at sign-up. It will ship in 5 days
        unless you remove it now.
      </div>
      <div className="flex items-center justify-between text-sm font-semibold">
        <span>Total</span>
        <span className="font-mono tabular-nums">$19.99</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onAccept}
          className="bg-foreground text-background flex-1 rounded-md px-3 py-1.5 text-xs font-medium"
        >
          Keep the box
        </button>
        <button
          onClick={onCancel}
          className="bg-muted/60 flex-1 rounded-md border px-3 py-1.5 text-xs"
        >
          Remove it
        </button>
      </div>
    </div>
  );
}

function PackedScreen({
  onAdvance,
  onCancel,
}: {
  onAdvance: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="bg-background space-y-3 rounded-md border p-4 text-xs">
      <div className="flex items-center gap-2">
        <Package className="h-5 w-5" />
        <h3 className="text-base font-semibold">Your order is packed</h3>
      </div>
      <div className="bg-muted/40 space-y-1 rounded-md border p-3 text-[11px]">
        <div className="flex justify-between">
          <span>Tracking number</span>
          <span className="font-mono">RCK-2024-04812</span>
        </div>
        <div className="flex justify-between">
          <span>Carrier</span>
          <span>FastShip Express</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated dispatch</span>
          <span>In 3–5 days</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="bg-foreground text-background flex-1 rounded-md px-3 py-1.5 text-xs font-medium"
        >
          Cancel before dispatch
        </button>
        <button
          onClick={onAdvance}
          className="bg-muted/60 rounded-md border px-3 py-1.5 text-xs"
        >
          Let it ship
        </button>
      </div>
    </div>
  );
}

function TruckScreen({
  onAdvance,
  onCancel,
}: {
  onAdvance: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="bg-background space-y-3 rounded-md border p-4 text-xs">
      <div className="flex items-center gap-2">
        <Truck className="h-5 w-5" />
        <h3 className="text-base font-semibold">Out for delivery</h3>
      </div>
      <div className="bg-amber-500/10 border-amber-500/30 space-y-1 rounded-md border p-3 text-[10px]">
        <div className="flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-300">
          <Clock className="h-3 w-3" />
          Return window closing
        </div>
        <p className="text-muted-foreground">
          Your package is on the truck. A restocking fee of $4.99 will apply
          if you cancel now.
        </p>
      </div>
      <div className="bg-muted/40 space-y-1 rounded-md border p-3 text-[11px]">
        <div className="flex items-center gap-1 text-[10px]">
          <MapPin className="h-3 w-3" />
          Current location
        </div>
        <div className="font-mono">Depot 12 — 3.4 km from your address</div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="bg-amber-500 text-white flex-1 rounded-md px-3 py-1.5 text-xs font-medium"
        >
          Cancel (restocking fee $4.99)
        </button>
        <button
          onClick={onAdvance}
          className="bg-muted/60 rounded-md border px-3 py-1.5 text-xs"
        >
          Accept delivery
        </button>
      </div>
    </div>
  );
}

function ShippedScreen() {
  return (
    <div className="bg-background space-y-3 rounded-md border p-4 text-xs">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        <h3 className="text-base font-semibold">Delivered</h3>
      </div>
      <p className="text-muted-foreground text-[10px]">
        Your mystery box has been delivered. You have a 24-hour return window
        starting from delivery confirmation.
      </p>
      <div className="bg-muted/40 space-y-1 rounded-md border p-3 text-[11px]">
        <div className="flex justify-between">
          <span>Delivered at</span>
          <span>Today, 14:23</span>
        </div>
        <div className="flex justify-between">
          <span>Return window closes</span>
          <span className="font-mono text-amber-700 dark:text-amber-300">14:23 tomorrow</span>
        </div>
      </div>
      <button
        disabled
        className="bg-muted/40 text-muted-foreground w-full cursor-not-allowed rounded-md border border-dashed px-3 py-1.5 text-xs"
      >
        Cancel (no longer possible)
      </button>
    </div>
  );
}

function CartItem({
  name,
  subtitle,
  price,
}: {
  name: string;
  subtitle: string;
  price: number;
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 text-[11px]">
      <div className="bg-foreground/10 size-12 rounded" />
      <div className="flex-1">
        <div className="font-medium">{name}</div>
        <div className="text-muted-foreground text-[10px]">{subtitle}</div>
      </div>
      <div className="font-mono font-semibold tabular-nums">
        ${price.toFixed(2)}
      </div>
    </div>
  );
}

function StageTracker({
  currentIdx,
  cancelled,
}: {
  currentIdx: number;
  cancelled: boolean;
}) {
  return (
    <div className="bg-muted/40 rounded-md border p-3">
      <div className="text-muted-foreground mb-2 text-[10px]">Order progress</div>
      <div className="flex items-center gap-1">
        {STAGES.map((s, i) => (
          <React.Fragment key={s.id}>
            <div
              className={`flex flex-1 items-center gap-1 rounded-md border px-2 py-1 text-[10px] ${
                cancelled
                  ? "border-foreground/10 bg-background text-muted-foreground"
                  : i < currentIdx
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : i === currentIdx
                      ? "border-foreground/30 bg-foreground text-background font-medium"
                      : "border-foreground/10 bg-background text-muted-foreground"
              }`}
            >
              {s.icon}
              <span className="truncate">{s.label}</span>
            </div>
            {i < STAGES.length - 1 && (
              <span className="text-muted-foreground">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
