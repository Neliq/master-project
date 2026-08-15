"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

const ROTATIONS_NEEDED = 3;
const DEGREES_NEEDED = ROTATIONS_NEEDED * 360; // 1080°

export function PullToRefreshCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [rotation, setRotation] = React.useState(0);
  const [unlocked, setUnlocked] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const lastXRef = React.useRef(0);
  const totalRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (unlocked) return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    lastXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || unlocked) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;

    if (deltaX > 0) {
      totalRef.current += deltaX * 1.2;
    } else {
      totalRef.current = Math.max(0, totalRef.current + deltaX * 0.15);
    }

    setRotation(totalRef.current);

    // Check unlock
    if (totalRef.current >= DEGREES_NEEDED) {
      setUnlocked(true);
      setIsDragging(false);
      totalRef.current = 0;
      setRotation(0);
    }
  };

  const handlePointerUp = (_e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    // Decay back to 0 if not enough rotation
    if (totalRef.current < DEGREES_NEEDED) {
      const start = totalRef.current;
      const startTime = performance.now();
      const duration = 400;

      const decay = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - (1 - t) * (1 - t);
        const current = Math.round(start * (1 - eased));
        totalRef.current = current;
        setRotation(current);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(decay);
        } else {
          totalRef.current = 0;
          setRotation(0);
        }
      };
      rafRef.current = requestAnimationFrame(decay);
    }
  };

  // Update progress display on each render
  const displayProgress = unlocked ? 1 : Math.min(Math.abs(totalRef.current) / DEGREES_NEEDED, 1);
  const rotationsDone = unlocked ? ROTATIONS_NEEDED : Math.abs(totalRef.current) / 360;

  const reset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setRotation(0);
    setUnlocked(false);
    setIsDragging(false);
    totalRef.current = 0;
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Free path available</span>
        <span className="font-mono font-semibold">No</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Kinesthetic investment</span>
        <span className="font-mono font-semibold">3 rotations</span>
      </div>
    </>
  ) : null;

  // 36 tick marks (one every 10 degrees)
  const ticks = Array.from({ length: 36 }, (_, i) => i);
  // 12 major marks (one every 30 degrees)
  const majors = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pull To Refresh (Variable-Reward Trap): Kinesthetic Resistance and Action Commitment"
      caption="Kinesthetic Resistance and Action Commitment — content is blocked without payment." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-1 font-medium">Kinesthetic Resistance and Action Commitment</div>

          {/* Vault content — faded when locked */}
          <div className="rounded-md border-pink-500/40 bg-pink-500/5 p-4 text-center" style={{ opacity: unlocked ? 1 : 0.15, transition: "opacity 0.6s" }}>
            <div className="text-2xl">{unlocked ? "🔓" : "🏦"}</div>
            <div className="mt-1 text-[10px]">{unlocked ? "Vault opened — secrets revealed!" : "Premium vault"}</div>
            {unlocked && (
              <div className="mt-2 rounded border border-pink-500/30 bg-pink-500/10 p-2 text-[10px]">
                🎉 You earned access through sheer physical commitment.<br/>
                Paywalls use this same friction to justify charging you.
              </div>
            )}
          </div>

          {/* The spinning wheel */}
          {!unlocked && (
            <div className="mt-3 flex flex-col items-center gap-2 select-none touch-none">
              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-[width] duration-75"
                  style={{
                    width: `${displayProgress * 100}%`,
                    background: "linear-gradient(90deg, rgb(236,72,153), rgb(34,197,94))",
                  }}
                />
              </div>
              <div className="text-[10px] text-muted-foreground">
                {rotationsDone.toFixed(1)} / {ROTATIONS_NEEDED} rotations — drag right to spin
              </div>

              {/* Wheel — uses pointer events for mouse + touch */}
              <div
                className="relative w-28 h-28 touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                style={{
                  cursor: unlocked ? "default" : isDragging ? "grabbing" : "grab",
                  touchAction: "none",
                }}
              >
                {/* The rotating wheel */}
                <div
                  className="relative w-full h-full rounded-full border-2 border-pink-500/40 bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-lg"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    willChange: "transform",
                  }}
                >
                  {/* Tick marks */}
                  {ticks.map((i) => (
                    <div
                      key={i}
                      className="absolute left-1/2 top-0 w-full h-full"
                      style={{ transform: `translateX(-50%) rotate(${i * 10}deg)` }}
                    >
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                        style={{
                          width: i % 3 === 0 ? "3px" : "1.5px",
                          height: i % 3 === 0 ? "8px" : "4px",
                          background: i % 3 === 0
                            ? "rgba(236,72,153,0.8)"
                            : "rgba(236,72,153,0.3)",
                        }}
                      />
                    </div>
                  ))}

                  {/* Number labels at major positions */}
                  {majors.map((deg) => (
                    <div
                      key={`label-${deg}`}
                      className="absolute left-1/2 top-0 w-full h-full"
                      style={{ transform: `translateX(-50%) rotate(${deg}deg)` }}
                    >
                      <div
                        className="absolute top-[-5px] left-1/2 -translate-x-1/2 text-[7px] font-mono"
                        style={{
                          color: "rgba(236,72,153,0.5)",
                          transform: `rotate(-${deg}deg)`,
                        }}
                      >
                        {deg === 0 ? "" : `${deg / 30}`}
                      </div>
                    </div>
                  ))}

                  {/* Center hub */}
                  <div className="absolute inset-4 rounded-full bg-zinc-800 border border-zinc-600 shadow-inner flex items-center justify-center">
                    <div className="flex gap-[2px]">
                      {Array.from({ length: 6 }, (_, i) => (
                        <div key={i} className="w-[2px] h-3 rounded-full" style={{
                          background: `rgba(255,255,255,${0.08 + i * 0.04})`,
                        }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Fixed pointer/notch at top — does not rotate */}
                <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 z-10">
                  <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-pink-500" />
                </div>

                {/* Glow when dragging */}
                {isDragging && (
                  <div className="absolute inset-[-4px] rounded-full border-2 border-pink-400/40 animate-pulse pointer-events-none" />
                )}
              </div>

              <div className="text-[9px] text-muted-foreground italic">
                Press and drag right — 3 full turns to crack the vault
              </div>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
