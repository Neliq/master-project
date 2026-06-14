"use client";

import * as React from "react";
import { Star, Download, ExternalLink, Shield } from "lucide-react";

export function DisguisedAdCond2({
  mode = "user",
  annotations = [],
  onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [clicked, setClicked] = React.useState(false);
  const reset = () => setClicked(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Disclosure label</span>
        <span className="font-mono font-semibold text-red-500">Grayed out, no bg</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">WCAG contrast</span>
        <span className="font-mono font-semibold text-red-500">~2.1:1</span>
      </div>
    </>
  ) : null;

  if (clicked) {
    return (
      <div className="rounded-lg border bg-background overflow-hidden">
        <div className="bg-amber-50 dark:bg-amber-500/5 border-b border-amber-200 dark:border-amber-500/20 px-3 py-1.5 flex items-center gap-1.5">
          <ExternalLink className="w-3 h-3 text-amber-600 shrink-0" />
          <span className="text-[9px] text-amber-700 dark:text-amber-400 truncate">
            ad.trackerexample.com/redirect?campaign=vpn-promo&amp;ref=appstore
          </span>
        </div>
        <div className="p-4 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto">
            <ExternalLink className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-sm font-semibold">Sponsored Offer</h3>
          <p className="text-[10px] text-muted-foreground">
            You&apos;ve been redirected to a third-party promotional page.
            This is not the app you were looking for.
          </p>
          <div className="bg-muted/50 rounded-md p-2 text-[10px] space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-500">⚠</span>
              <span>Redirected by ad network</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-red-500">✗</span>
              <span>No app download available here</span>
            </div>
          </div>
          <button
            onClick={reset}
            className="text-[10px] text-muted-foreground hover:text-foreground underline underline-offset-2"
          >
            ← Back to app store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-lg border bg-background overflow-hidden relative">
        {/* Barely visible disclosure */}
        <div className="absolute top-2 right-2 text-[7px] text-muted-foreground/40 rounded">
          advertisement
        </div>
        <div className="p-3 flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow shrink-0">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold">SecureVPN Pro</span>
              <span className="text-[8px] bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded-full font-medium">VERIFIED</span>
            </div>
            <div className="flex items-center gap-0.5 mt-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
              ))}
              <span className="text-[9px] text-muted-foreground ml-1">4.8 (12.4k)</span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5 truncate">
              Fast &amp; secure VPN with no logs policy. Free 7-day trial.
            </p>
          </div>
          <div className="flex flex-col items-center gap-1 shrink-0 mt-5">
            <button
              onClick={() => setClicked(true)}
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-3 py-1.5 text-[10px] font-semibold flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Visit
            </button>
            <span className="text-[8px] text-muted-foreground">42 MB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
