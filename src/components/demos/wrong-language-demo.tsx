"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Wrong Language pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function WrongLanguageDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Three language variants on the same banner. The decline is
  // always in dashed border; the accept is always the prominent one.
  const langs = [
    { code: "no", title: "Vi bruker informasjonskapsler", accept: "Godta alle", decline: "Avslå" },
    { code: "jp", title: "クッキーについて", accept: "すべて受託する", decline: "拒否する" },
    { code: "tr", title: "Çerez politikası", accept: "Tümünü kabul et", decline: "Reddetmek" },
  ];
  const [idx, setIdx] = React.useState(0);
  const [accountLang] = React.useState("English");
  const L = langs[idx];
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Wrong Language"
      caption="Your account is set to English, but the cookie consent prompt is rendered in a different language each time you load the page. The decline button is always rendered with a dashed border to suggest it is 'broken'."
      hint="Cycle the language. The decline button is always styled the same way."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-3 rounded-md border p-4 text-xs">
          <div className="text-muted-foreground text-[10px]">Account language: {accountLang}</div>
          <div className="text-base font-semibold">{L.title}</div>
          <p className="text-[10px] leading-relaxed">
            {L.code === "no" && "Vi bruker informasjonskapsler for å forbedre opplevelsen din."}
            {L.code === "jp" && "サイトを利用するため、クッキーを使用します。"}
            {L.code === "tr" && "Deneyiminizi geliştirmek için çerezleri kullanıyoruz."}
          </p>
          <div className="flex gap-2">
            <button className="bg-foreground text-background flex-1 rounded-md px-3 py-1.5 text-xs font-medium">
              {L.accept}
            </button>
            <button className="bg-muted/40 text-muted-foreground flex-1 rounded-md border border-dashed px-3 py-1.5 text-[10px]">
              {L.decline}
            </button>
          </div>
        </div>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setIdx((i) => (i + 1) % langs.length)}
            className="bg-foreground text-background flex-1 rounded-md px-3 py-1.5 font-medium"
          >
            Reload page (try another language)
          </button>
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          The decline button is always styled with a dashed border — to suggest it is broken or unavailable.
        </div>
      </div>
    </DemoShell>
  );
}

