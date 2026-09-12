"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { CheckCircle2, Download, FolderOpen } from "lucide-react";

/*
 * Pre-Delivered Content — Condition 3: Semantic Framing of Local Assets
 * as Purchase Opportunities
 *
 * Thesis: the algorithm compares the semantic framing of content items
 * already present on the user's storage device. The feature triggers if
 * locally stored assets are described as "unlockable," "premium," or
 * "downloadable" when the download has already occurred:
 *
 *   Frame(T_asset) = Purchaseable  ∧  IsLocal(A_asset) = True
 *
 * Variant A (dark): the library frames on-disk assets as "Download" /
 * "Unlock premium" purchase opportunities even though every byte already
 * lives in the install folder.
 * Variant B (benign): the same assets are labelled "Installed — Ready to
 * play"; nothing is reframed as a purchase.
 */

const ASSETS = [
  { name: "4K Texture Pack", size: "4.2 GB", path: "…/NebulaDrift/data/textures_4k/" },
  { name: "Void Campaign Expansion", size: "1.8 GB", path: "…/NebulaDrift/data/campaign_void/" },
  { name: "OST & Art Book", size: "2.4 GB", path: "…/NebulaDrift/media/ost_artbook/" },
];

export function PreDeliveredContentCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [clickedA, setClickedA] = React.useState<number | null>(null);
  const [clickedB, setClickedB] = React.useState<number | null>(null);


  return (
    <DemoShell mode={mode}
      title="Pre-Delivered Content: Semantic Framing of Local Assets as Purchase Opportunities"
      userTitle="PixelQuest — Game library"
      caption="Semantic Framing of Local Assets as Purchase Opportunities — already-downloaded content is semantically reframed as downloadable or unlockable, turning a consumed storage cost into a purchase opportunity."
      deltaNote="Variant A labels on-disk assets “Download” / “Unlock premium” — Frame(T_asset) = Purchaseable while IsLocal(A_asset) = True. Variant B labels the identical assets “Installed — Ready to play”, so the completed download is presented as completed."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">Nebula Drift — Library</h3>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
                All installed
              </span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Every asset below was delivered with your purchase and is already on this device.
            </p>

            <div className="mt-3 space-y-1.5">
              {ASSETS.map((a, i) => (
                <button
                  key={a.name}
                  onClick={() => setClickedB(i)}
                  className="w-full rounded-md border border-border/60 bg-muted/40 p-2 text-left transition-colors hover:border-border/60 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[10px] font-medium text-foreground/90">{a.name}</div>
                      <div className="mt-0.5 flex items-center gap-1 text-[8px] text-muted-foreground/60 font-mono">
                        <FolderOpen className="size-2.5 shrink-0" />
                        {a.path}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 rounded-full border border-border/60 bg-muted/40 px-2 py-0.5">
                      <CheckCircle2 className="size-3 text-foreground" />
                      <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground">
                        Installed
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {clickedB !== null && (
              <div className="mt-3 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                  <CheckCircle2 className="size-3" />
                  Already local
                </div>
                <p className="text-muted-foreground mt-0.5">
                  “{ASSETS[clickedB].name}” ({ASSETS[clickedB].size}) is at {ASSETS[clickedB].path} — IsLocal(A_asset) = True and
                  Frame(T_asset) = “Installed”. Nothing to download, nothing to buy.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[11px] font-semibold">Nebula Drift — Library</h3>
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
              3 downloads available
            </span>
          </div>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Premium add-ons are ready to download — grab them before they&rsquo;re gone.
          </p>

          <div className="mt-3 space-y-1.5">
            {ASSETS.map((a, i) => (
              <button
                key={a.name}
                onClick={() => setClickedA(i)}
                className="w-full rounded-md border border-border bg-background p-2 text-left transition-colors hover:border-border/60 cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[10px] font-medium text-foreground/90">{a.name}</div>
                    <div className="mt-0.5 flex items-center gap-1 text-[8px] text-muted-foreground/60 font-mono">
                      <FolderOpen className="size-2.5 shrink-0" />
                      {a.path}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 rounded-full border border-border/60 bg-muted/40 px-2 py-0.5">
                    <Download className="size-3 text-foreground" />
                    <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground">
                      Download
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <p className="mt-2 text-[8px] text-muted-foreground/50">
            Tap any row to see what the client is really asking for.
          </p>

          {clickedA !== null && (
            <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Reframed download
              </div>
              <p className="text-muted-foreground">
                The button says <strong className="text-foreground">“Download”</strong> but &ldquo;{ASSETS[clickedA].name}&rdquo; ({ASSETS[clickedA].size})
                is already sitting at <span className="font-mono">{ASSETS[clickedA].path}</span>. IsLocal(A_asset) = True, yet
                Frame(T_asset) = “Purchaseable” — the transfer already happened during install; the label merely
                reframes an already-consumed storage cost as a purchase opportunity.
              </p>
              <p className="text-muted-foreground">
                Pressing it would reveal a $9.99 “unlock premium” checkout for bytes that never left your machine.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
