"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function AutoPlayCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [hasInteracted, setHasInteracted] = React.useState(false);

  const reset = () => {
    setHasInteracted(false);
    videoRef.current?.play();
  };

  // Auto-play on mount
  React.useEffect(() => {
    videoRef.current?.play().catch(() => {
      // Autoplay blocked — user needs to interact first
      setHasInteracted(true);
    });
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Autoplay policy</span>
        <span className="font-mono font-semibold">muted + loop</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">User intent required</span>
        <span className="font-mono font-semibold">None</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Auto-Play: Autonomous Media Execution"
      caption="Autonomous Media Execution — video starts playing immediately on page load without user interaction." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">

          {/* Video player */}
          <div className="relative overflow-hidden rounded-lg border border-foreground/10 bg-black">
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              muted
              loop
              playsInline
              preload="auto"
              onClick={handleVideoClick}
            >
              <source src="/sample.mp4" type="video/mp4" />
            </video>

            {/* Mute indicator */}
            <div className="absolute top-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[8px] text-white/70">
              🔇 Muted
            </div>

            {/* Click hint */}
            {hasInteracted && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded bg-black/60 px-2 py-0.5 text-[8px] text-white/70">
                Click to play
              </div>
            )}
          </div>

          {/* Autoplay notice */}
          <div className="mt-2 text-center text-[8px] text-muted-foreground/50">
            This video plays automatically. No user action was required.
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
