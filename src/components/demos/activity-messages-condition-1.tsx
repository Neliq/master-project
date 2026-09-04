"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Activity Messages — Condition 1: Asynchronous Event Fabrication
 *
 * Thesis: E_real(t) is the set of genuine transactions in the database and
 * M_displayed(t) the activity message rendered on the client interface.
 * The feature triggers if the system algorithmically generates activity
 * pop-ups that have no structural mapping to the backend event log:
 *
 *   M_displayed(t) != ∅  ∧  M_displayed(t) ∉ E_real(t)
 *
 * Variant A (dark): a stream of "X just purchased this item" pop-ups pours
 * in while the backend transaction log stays empty — every message is a
 * narrative fabrication. Variant B (benign): each message carries a real
 * order id that exists in the visible backend log (M_displayed ⊆ E_real).
 */

const BUYERS = [
  { name: "Sarah", city: "New York", item: "Aurora Wireless Earbuds Pro" },
  { name: "Mike", city: "Berlin", item: "Aurora Wireless Earbuds Pro" },
  { name: "Anna", city: "Toronto", item: "Aurora Wireless Earbuds Pro" },
  { name: "Liam", city: "Dublin", item: "Aurora Wireless Earbuds Pro" },
  { name: "Priya", city: "Mumbai", item: "Aurora Wireless Earbuds Pro" },
];

type Event = {
  id: number;
  order: string;
  name: string;
  city: string;
  item: string;
  ts: string;
};

const REAL_EVENTS: Event[] = [
  { id: 1, order: "TX-74201", name: "Sarah", city: "New York", item: "Aurora Wireless Earbuds Pro", ts: "12:58" },
  { id: 2, order: "TX-74202", name: "Mike", city: "Berlin", item: "Aurora Wireless Earbuds Pro", ts: "12:51" },
  { id: 3, order: "TX-74203", name: "Anna", city: "Toronto", item: "Aurora Wireless Earbuds Pro", ts: "12:44" },
  { id: 4, order: "TX-74204", name: "Liam", city: "Dublin", item: "Aurora Wireless Earbuds Pro", ts: "12:37" },
  { id: 5, order: "TX-74205", name: "Priya", city: "Mumbai", item: "Aurora Wireless Earbuds Pro", ts: "12:31" },
];

export function ActivityMessagesCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [verifiedA, setVerifiedA] = React.useState(false);
  const [verifiedB, setVerifiedB] = React.useState(false);
  const counter = React.useRef(0);

  // Shared event stream: every 2.8s one new "purchase" arrives.
  React.useEffect(() => {
    const id = window.setInterval(() => {
      const src = BUYERS[counter.current % BUYERS.length];
      counter.current += 1;
      const ev: Event = {
        id: counter.current,
        order: `TX-${48200 + counter.current}`,
        name: src.name,
        city: src.city,
        item: src.item,
        ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      };
      setEvents((prev) => [...prev.slice(-4), ev]);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);


  const toastRow = (ev: Event, dark: boolean) => (
    <div
      key={ev.id}
      className={`flex items-start gap-2 rounded-md border p-2 text-[9px] leading-snug ${
        dark
          ? "border-red-500/30 bg-red-500/5"
          : "border-green-500/30 bg-green-500/5"
      }`}
    >
      <svg
        className={`mt-0.5 h-3 w-3 shrink-0 ${dark ? "text-red-500" : "text-green-500"}`}
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      >
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      </svg>
      <div className="min-w-0">
        {dark ? (
          <p className="text-foreground/85">
            <strong>{ev.name} from {ev.city}</strong> just purchased <strong>{ev.item}</strong>
          </p>
        ) : (
          <p className="text-foreground/85">
            <strong>{ev.name}</strong> ({ev.city}) purchased <strong>{ev.item}</strong>{" "}
            <span className="font-mono text-green-600 dark:text-green-400">· {ev.order} · {ev.ts}</span>
          </p>
        )}
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode}
      title="Activity Messages: Asynchronous Event Fabrication"
      caption="Asynchronous Event Fabrication — purchase pop-ups stream in continuously, but none of them maps to a real transaction in the backend event log."
      deltaNote="Both panels stream the same names, cities and products. In Variant A the pop-ups carry no order id and the backend log stays empty (M_displayed ∉ E_real — fabricated). In Variant B every message references a real order id that is present in the visible backend log (M_displayed ⊆ E_real)."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Aurora Wireless Earbuds Pro</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Live purchase activity is shown below. Each message references a real order in the event log.
            </p>
          </div>

          <div className="space-y-1.5">
            {events.length === 0 && (
              <p className="text-[9px] text-muted-foreground/70 italic">
                Waiting for the next real transaction…
              </p>
            )}
            {REAL_EVENTS.slice(0, events.length).map((ev) => toastRow(ev, false))}
          </div>

          <div className="rounded-md border border-border bg-background p-2.5">
            <div className="flex items-center justify-between text-[9px]">
              <span className="font-mono text-muted-foreground">Backend event log — E_real(t)</span>
              <span className="font-mono font-semibold tabular-nums text-green-500">{events.length} entr{events.length === 1 ? "y" : "ies"}</span>
            </div>
            <ul className="mt-1.5 space-y-1">
              {REAL_EVENTS.slice(0, events.length).map((ev) => (
                <li key={ev.id} className="flex items-center justify-between font-mono text-[8px] text-muted-foreground">
                  <span className="truncate">{ev.order} · {ev.name}</span>
                  <span className="tabular-nums">{ev.ts}</span>
                </li>
              ))}
              {events.length === 0 && <li className="text-[8px] text-muted-foreground/60 italic">No transactions yet.</li>}
            </ul>
          </div>

          <button
            onClick={() => setVerifiedB(true)}
            className="w-full rounded-md border border-green-500/40 bg-green-500/10 py-1.5 text-[10px] font-medium text-green-700 dark:text-green-300 hover:bg-green-500/20 transition-colors cursor-pointer"
          >
            {mode === "auditor" ? "Verify against backend" : "Check recent purchases"}
          </button>

          {mode === "auditor" && verifiedB && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Messages map to real events
              </div>
              <p className="text-muted-foreground mt-0.5">
                Every displayed message has a structural mapping to the backend event log: M_displayed(t) ⊆ E_real(t).
                The social proof is genuine, so the herd-behaviour heuristic is fed real information.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Aurora Wireless Earbuds Pro</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Others are buying right now. Act fast before they sell out!
          </p>
        </div>

        <div className="space-y-1.5">
          {events.length === 0 && (
            <p className="text-[9px] text-muted-foreground/70 italic">
              Waiting for the next “purchase”…
            </p>
          )}
          {events.map((ev) => toastRow(ev, true))}
        </div>

        <div className="rounded-md border border-border bg-background p-2.5">
          <div className="flex items-center justify-between text-[9px]">
            <span className="font-mono text-muted-foreground">Backend event log — E_real(t)</span>
            <span className="font-mono font-semibold tabular-nums text-red-500">0 entries</span>
          </div>
          <p className="mt-1.5 text-[8px] italic text-muted-foreground/60">
            Querying transactions for this product… no records found.
          </p>
        </div>

        <button
          onClick={() => setVerifiedA(true)}
          className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          {mode === "auditor" ? "Verify against backend" : "Check recent purchases"}
        </button>

        {mode === "auditor" && verifiedA && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              New activity
            </div>
            <p className="text-muted-foreground">
              The stream shows <strong className="text-foreground">{events.length} message{events.length === 1 ? "" : "s"}</strong> of the form
              “Sarah from New York just purchased this item” — M_displayed(t) ≠ ∅ — yet the backend event log E_real(t)
              contains <strong className="text-red-500">zero matching transactions</strong>.
            </p>
            <p className="text-muted-foreground">
              Because M_displayed(t) ∉ E_real(t), every pop-up is algorithmically generated with no structural mapping to
              real events: a narrative fabrication intended to mimic high demand and inflate perceived desirability.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
