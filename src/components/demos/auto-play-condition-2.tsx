"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

const videos = [
  { id: 1, title: "Big Buck Bunny", src: "/sample.mp4", type: "video/mp4" },
  { id: 2, title: "Movie Clip", src: "/sample2.mp4", type: "video/mp4" },
  { id: 3, title: "Sample Clip", src: "/sample3.mp4", type: "video/mp4" },
];

export function AutoPlayCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const current = videos[currentIndex];
  const isLast = currentIndex === videos.length - 1;

  const reset = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Auto-start first video on mount
  React.useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.load();
      vid.play().catch(() => {});
    }
  }, [currentIndex]);

  const handleEnded = () => {
    // Auto-advance to next video
    if (!isLast) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Auto-advance on end</span>
        <span className="font-mono font-semibold">Enabled</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Video {currentIndex + 1} of {videos.length}</span>
        <span className="font-mono font-semibold">{current.title}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Auto-Play: Sequential Auto-Advance"
      caption="Sequential Auto-Advance — videos auto-advance to the next one when they end, with no way to stop the chain." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">

          {/* Video player with native controls */}
          <div className="overflow-hidden rounded-lg border border-foreground/10 bg-black">
            <video
              ref={videoRef}
              className="w-full aspect-video"
              controls
              muted
              onEnded={handleEnded}
              onPlay={handlePlay}
              onPause={handlePause}
            >
              <source src={current.src} type={current.type} />
            </video>
          </div>

          {/* Playlist / queue indicator */}
          <div className="mt-2 flex items-center gap-1">
            {videos.map((v, i) => (
              <div key={v.id} className={`flex-1 rounded py-1 text-center text-[8px] font-medium ${
                i === currentIndex
                  ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                  : i < currentIndex
                    ? "bg-foreground/10 text-muted-foreground/50 line-through"
                    : "bg-foreground/5 text-muted-foreground/40"
              }`}>
                {i < currentIndex ? "✓" : i === currentIndex ? "▶" : `${i + 1}`}
              </div>
            ))}
          </div>

          {/* Auto-advance notice */}
          {!isLast ? (
            <div className="mt-1 text-center text-[8px] text-muted-foreground/50">
              Next video will auto-play when this one ends
            </div>
          ) : (
            <div className="mt-1 text-center text-[8px] text-muted-foreground/50">
              Last video — playlist will end after this
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
