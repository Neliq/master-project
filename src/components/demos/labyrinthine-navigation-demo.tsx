"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { Search, Mail, Home, MessageCircle, ChevronRight } from "lucide-react";

/**
 * Interactive demo for the Labyrinthine Navigation pattern.
 *
 * The user navigates a help center that loops between the same three
 * pages. Each page is rendered as a real-looking screen with its own
 * content, so the user experiences the cycle, not just a label.
 *
 * Hand-built from the master thesis formal conditions.
 */

type Page = "Help home" | "Contact us" | "Email support" | "FAQ";

const NEXT: Record<Page, Page> = {
  "Help home": "Contact us",
  "Contact us": "Email support",
  "Email support": "Help home",
  FAQ: "Contact us",
};

export function LabyrinthineNavigationDemo({
  mode = "user",
  annotations = [],
  onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [where, setWhere] = React.useState<Page>("Help home");
  const [history, setHistory] = React.useState<Page[]>(["Help home"]);

  const go = (target: Page) => {
    setWhere(target);
    setHistory((h) => [...h, target]);
  };

  const isAuditor = mode === "auditor";
  const reset = () => {
    setWhere("Help home");
    setHistory(["Help home"]);
  };

  const auditorControls = isAuditor ? (
    <>
      {(["Help home", "Contact us", "Email support", "FAQ"] as Page[]).map(
        (p) => (
          <button
            key={p}
            onClick={() => go(p)}
            className="bg-purple-500 hover:bg-purple-600 rounded-md px-2 py-1 text-xs font-medium text-white"
          >
            Jump to {p}
          </button>
        ),
      )}
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
        <span className="text-muted-foreground">Steps in loop</span>
        <span className="font-mono font-semibold tabular-nums">
          {history.length - 1}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Distinct pages</span>
        <span className="font-mono font-semibold tabular-nums">
          {new Set(history).size}
        </span>
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
      title="Labyrinthine Navigation"
      caption="A help center where every link leads to another page in the same three-page loop. Click through to experience the cycle yourself — the trail of your clicks is shown below."
    >
      <div className="space-y-3">
        {/* The actual help-center screen */}
        {where === "Help home" && <HelpHome onGo={go} />}
        {where === "Contact us" && <ContactUs onGo={go} />}
        {where === "Email support" && <EmailSupport onGo={go} />}
        {where === "FAQ" && <FAQ onGo={go} />}

        {/* The breadcrumb trail — proves the loop visually */}
        <div className="bg-muted/40 rounded-md border p-3 text-[10px]">
          <div className="text-muted-foreground mb-1">Your breadcrumb trail</div>
          <div className="flex flex-wrap items-center gap-1">
            {history.map((h, i) => (
              <React.Fragment key={i}>
                <span
                  className={
                    i === history.length - 1
                      ? "font-semibold"
                      : "text-muted-foreground"
                  }
                >
                  {h}
                </span>
                {i < history.length - 1 && (
                  <ChevronRight className="text-muted-foreground h-3 w-3" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </DemoShell>
  );
}

/* ------------------------------------------------------------------ */
/*  The four real-looking help-center pages                            */
/* ------------------------------------------------------------------ */

function PageFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background space-y-3 rounded-md border p-4 text-xs">
      <div className="text-muted-foreground flex items-center gap-2 text-[10px]">
        <Home className="h-3 w-3" />
        <span>Help Center / {title}</span>
      </div>
      <h2 className="text-base font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function HelpHome({ onGo }: { onGo: (p: Page) => void }) {
  return (
    <PageFrame title="Help home">
      <p className="text-muted-foreground text-[10px]">
        Need help? Try one of the options below.
      </p>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onGo("Contact us")}
          className="bg-muted/40 hover:bg-muted/60 rounded-md border p-3 text-left text-[11px] font-medium"
        >
          <MessageCircle className="mb-1 h-4 w-4" />
          Contact us
          <div className="text-muted-foreground text-[10px]">
            Chat with our team
          </div>
        </button>
        <button
          onClick={() => onGo("Email support")}
          className="bg-muted/40 hover:bg-muted/60 rounded-md border p-3 text-left text-[11px] font-medium"
        >
          <Mail className="mb-1 h-4 w-4" />
          Email support
          <div className="text-muted-foreground text-[10px]">
            Open a ticket
          </div>
        </button>
        <button
          onClick={() => onGo("FAQ")}
          className="bg-muted/40 hover:bg-muted/60 rounded-md border p-3 text-left text-[11px] font-medium"
        >
          <Search className="mb-1 h-4 w-4" />
          Browse FAQ
          <div className="text-muted-foreground text-[10px]">
            Search articles
          </div>
        </button>
        <button
          onClick={() => onGo("Contact us")}
          className="bg-muted/40 hover:bg-muted/60 rounded-md border p-3 text-left text-[11px] font-medium"
        >
          <Home className="mb-1 h-4 w-4" />
          Account help
          <div className="text-muted-foreground text-[10px]">
            Login &amp; settings
          </div>
        </button>
      </div>
    </PageFrame>
  );
}

function ContactUs({ onGo }: { onGo: (p: Page) => void }) {
  return (
    <PageFrame title="Contact us">
      <p className="text-muted-foreground text-[10px]">
        Average response time: 6 business days.
      </p>
      <div className="space-y-2">
        <input
          placeholder="Your email"
          className="bg-background w-full rounded-md border px-2 py-1.5 text-xs"
        />
        <textarea
          placeholder="How can we help?"
          rows={3}
          className="bg-background w-full rounded-md border px-2 py-1.5 text-xs"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onGo("Email support")}
          className="bg-foreground text-background flex-1 rounded-md px-3 py-1.5 text-xs font-medium"
        >
          Send (this will create a ticket)
        </button>
        <button
          onClick={() => onGo("Help home")}
          className="bg-muted/60 rounded-md border px-3 py-1.5 text-xs"
        >
          Back
        </button>
      </div>
    </PageFrame>
  );
}

function EmailSupport({ onGo }: { onGo: (p: Page) => void }) {
  return (
    <PageFrame title="Email support">
      <p className="text-muted-foreground text-[10px]">
        Our support team will reply by email. Please allow 3–6 business days.
      </p>
      <div className="bg-muted/40 space-y-1 rounded-md border p-3 text-[10px]">
        <div className="font-semibold">Before you continue:</div>
        <ul className="text-muted-foreground list-inside list-disc space-y-0.5">
          <li>Have your order number ready</li>
          <li>Include screenshots if relevant</li>
          <li>Do not include payment information</li>
        </ul>
      </div>
      <button
        onClick={() => onGo("Help home")}
        className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium"
      >
        Continue to email form
      </button>
    </PageFrame>
  );
}

function FAQ({ onGo }: { onGo: (p: Page) => void }) {
  return (
    <PageFrame title="Frequently asked questions">
      <div className="space-y-1">
        {[
          "How do I reset my password?",
          "Where can I find my invoices?",
          "How do I delete my account?",
        ].map((q) => (
          <button
            key={q}
            onClick={() => onGo("Contact us")}
            className="bg-muted/40 hover:bg-muted/60 block w-full rounded-md border px-2 py-1.5 text-left text-[10px]"
          >
            {q} →
          </button>
        ))}
      </div>
      <p className="text-muted-foreground text-[10px]">
        Every FAQ answer redirects to the Contact us page.
      </p>
    </PageFrame>
  );
}
