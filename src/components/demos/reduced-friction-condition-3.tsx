"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

interface CookieCategory {
  id: string;
  label: string;
  description: string;
  required: boolean;
  checked: boolean;
}

const defaultCategories: CookieCategory[] = [
  { id: "essential", label: "Strictly Necessary", description: "Required for the website to function", required: true, checked: true },
  { id: "analytics", label: "Performance & Analytics", description: "Helps us understand how visitors interact", required: false, checked: true },
  { id: "marketing", label: "Marketing & Advertising", description: "Used to deliver relevant ads and campaigns", required: false, checked: true },
  { id: "thirdparty", label: "Third-Party Data Sharing", description: "Allows sharing data with partner companies", required: false, checked: true },
  { id: "personalization", label: "Personalization", description: "Remember your preferences and settings", required: false, checked: true },
];

export function ReducedFrictionCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [categories, setCategories] = React.useState(defaultCategories);
  const [accepted, setAccepted] = React.useState(false);

  const reset = () => {
    setCategories(defaultCategories);
    setAccepted(false);
  };

  const toggle = (id: string) => {
    setCategories(prev =>
      prev.map(c => c.id === id ? { ...c, checked: !c.checked } : c)
    );
  };

  const handleAcceptAll = () => setAccepted(true);
  const handleSavePreferences = () => setAccepted(true);

  const checkedCount = categories.filter(c => c.checked).length;
  const optionalChecked = categories.filter(c => !c.required && c.checked).length;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Pre-checked (opt-out)</span>
        <span className="font-mono font-semibold">{optionalChecked} of {categories.length - 1} optional</span>
      </div>
    </>
  ) : null;

  if (accepted) {
    return (
      <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
        title="Reduced Friction: Pre-authorized State Exploitation"
        caption="Pre-authorized State Exploitation — privacy-sensitive options pre-checked, exploiting user inertia." auditorStats={stats}>
        <div className="space-y-3">
          <div className="rounded-md border bg-foreground/5 p-3 text-xs">
            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4 text-center">
              <div className="text-sm font-bold text-green-600 dark:text-green-400">Preferences Saved</div>
              <div className="mt-1 text-[10px] text-muted-foreground">
                {checkedCount} of {categories.length} categories enabled
              </div>
              <div className="mt-2 space-y-0.5 text-left text-[9px] text-muted-foreground">
                {categories.map(c => (
                  <div key={c.id} className="flex items-center justify-between border-t border-foreground/5 py-1">
                    <span>{c.label}</span>
                    <span className={c.checked ? "font-medium text-green-600 dark:text-green-400" : "text-muted-foreground/50"}>
                      {c.checked ? "ON" : "OFF"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DemoShell>
    );
  }

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Reduced Friction: Pre-authorized State Exploitation"
      caption="Pre-authorized State Exploitation — privacy-sensitive options pre-checked, exploiting user inertia." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">

          {/* Cookie banner */}
          <div className="rounded-lg border border-foreground/15 bg-foreground/[0.03] shadow-sm">
            <div className="px-3 py-2.5 border-b border-foreground/10">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">🍪</span>
                <span className="font-semibold text-[11px]">Cookie Preferences</span>
              </div>
              <p className="mt-1 text-[9px] text-muted-foreground leading-relaxed">
                We use cookies to enhance your experience. By clicking "Accept All",
                you consent to our use of cookies as described in our Cookie Policy.
              </p>
            </div>

            {/* Toggle switches */}
            <div className="px-3 py-2 space-y-0">
              {categories.map((cat, i) => (
                <div key={cat.id} className={`flex items-center justify-between py-2 ${i < categories.length - 1 ? "border-b border-foreground/5" : ""}`}>
                  <div className="flex-1 mr-2">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-medium">{cat.label}</span>
                      {cat.required && (
                        <span className="text-[7px] rounded bg-foreground/10 px-1 py-0.5 text-muted-foreground/60">Required</span>
                      )}
                    </div>
                    <div className="text-[8px] text-muted-foreground/60 mt-0.5">{cat.description}</div>
                  </div>
                  <button
                    onClick={() => !cat.required && toggle(cat.id)}
                    disabled={cat.required}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                      cat.checked ? "bg-green-500" : "bg-foreground/20"
                    } ${cat.required ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                      cat.checked ? "translate-x-4.5" : "translate-x-0.5"
                    }`} />
                  </button>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="px-3 py-2.5 border-t border-foreground/10 flex gap-2">
              <button onClick={handleSavePreferences}
                className="flex-1 rounded-md border border-foreground/15 py-2 text-[10px] font-medium text-muted-foreground hover:bg-foreground/5">
                Save Preferences
              </button>
              <button onClick={handleAcceptAll}
                className="flex-1 rounded-md bg-green-600 py-2 text-[10px] font-semibold text-white hover:bg-green-700">
                Accept All
              </button>
            </div>
          </div>

        </div>
      </div>
    </DemoShell>
  );
}
