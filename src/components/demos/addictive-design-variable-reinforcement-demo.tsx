"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { Bell, Heart, MessageCircle, Star, Trophy } from "lucide-react";

/**
 * Condition demo: Variable Ratio Reinforcement
 *
 * Simulates unpredictable notification patterns — like a slot machine,
 * you never know when the next "reward" will arrive.
 */

const NOTIFICATION_TYPES = [
  { icon: Heart, color: "text-pink-500", label: "liked your post" },
  { icon: MessageCircle, color: "text-blue-500", label: "commented on your photo" },
  { icon: Star, color: "text-amber-500", label: "added you to favourites" },
  { icon: Trophy, color: "text-emerald-500", label: "mentioned you in a story" },
];

const USERNAMES = [
  "alice_dev", "bob_design", "charlie_ux", "diana_ui", "eve_tech",
  "frank_code", "grace_api", "henry_web", "iris_data", "jack_ml",
];

export function VariableReinforcementDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  const [notifications, setNotifications] = React.useState<Array<{ id: number; user: string; type: typeof NOTIFICATION_TYPES[0]; time: string }>>([]);
  const [nextId, setNextId] = React.useState(1);
  const [totalReceived, setTotalReceived] = React.useState(0);
  const [checkCount, setCheckCount] = React.useState(0);
  const [showBadge, setShowBadge] = React.useState(false);

  const isAuditor = mode === "auditor";

  // Variable ratio schedule — unpredictable intervals
  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      // Variable delay: 1-6 seconds (unpredictable)
      const delay = 1000 + Math.random() * 5000;
      timeout = setTimeout(() => {
        const type = NOTIFICATION_TYPES[Math.floor(Math.random() * NOTIFICATION_TYPES.length)];
        const user = USERNAMES[Math.floor(Math.random() * USERNAMES.length)];
        const now = new Date();
        const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

        setNotifications((prev) => [
          { id: nextId, user, type, time },
          ...prev,
        ].slice(0, 10)); // Keep last 10
        setNextId((n) => n + 1);
        setTotalReceived((t) => t + 1);
        setShowBadge(true);
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => clearTimeout(timeout);
  }, [nextId]);

  const reset = () => {
    setNotifications([]);
    setNextId(1);
    setTotalReceived(0);
    setCheckCount(0);
    setShowBadge(false);
  };

  const handleCheck = () => {
    setCheckCount((c) => c + 1);
    setShowBadge(false);
  };

  const auditorStats = isAuditor ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Notifications received</span>
        <span className="font-mono font-semibold tabular-nums">{totalReceived}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Times user checked</span>
        <span className="font-mono font-semibold tabular-nums">{checkCount}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Compulsion ratio</span>
        <span className="font-mono font-semibold tabular-nums">
          {totalReceived > 0 ? `${((checkCount / totalReceived) * 100).toFixed(0)}%` : "—"}
        </span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell
      mode={mode}
      annotations={annotations}
      onRestart={onRestart ?? reset}
      auditorStats={auditorStats}
      title="Variable Ratio Reinforcement"
      caption="Notifications arrive at unpredictable intervals — like a slot machine, you never know when the next reward will come. This unpredictability keeps you checking."
    >
      <div className="space-y-3">
        {/* Notification bell with badge */}
        <button
          onClick={handleCheck}
          className="bg-foreground/5 hover:bg-foreground/10 relative w-full rounded-md border p-3 text-left transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="size-5 text-muted-foreground" />
              {showBadge && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full size-3 text-[8px] flex items-center justify-center font-bold animate-pulse" />
              )}
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium">Check for updates</div>
              <div className="text-muted-foreground text-[10px]">
                Tap to see what&apos;s new
              </div>
            </div>
            {showBadge && (
              <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-[9px] font-bold animate-bounce">
                NEW
              </span>
            )}
          </div>
        </button>

        {/* Notification feed */}
        <div className="h-48 overflow-y-auto space-y-1 rounded-md border bg-foreground/5 p-2">
          {notifications.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center text-[10px]">
              Waiting for notifications...
            </div>
          ) : (
            notifications.map((n) => {
              const Icon = n.type.icon;
              return (
                <div key={n.id} className="flex items-center gap-2 rounded-md bg-background border px-2 py-1.5 text-[10px] animate-in fade-in slide-in-from-top-2">
                  <Icon className={`size-3 shrink-0 ${n.type.color}`} />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium">@{n.user}</span>{" "}
                    <span className="text-muted-foreground">{n.type.label}</span>
                  </div>
                  <span className="text-muted-foreground shrink-0 text-[9px]">{n.time}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </DemoShell>
  );
}
