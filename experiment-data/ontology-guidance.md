# Ontology Application Protocol (Condition 1 — guidance)

This document operationalizes the formal ontology (ontology-part-1..4.md). The
ontology defines WHAT each deceptive pattern is; this protocol defines HOW to
verify it from a DOM trace, HOW to avoid false accusations, and HOW to
calibrate confidence. Follow it for every instance, in order.

---

## 1. The multi-state audit procedure

Each instance file contains the interface at several interaction states
(s0 = initial render, s1..sN = after successive activations). Treat the
sequence as the evidence record:

1. Read ALL states before judging. Never judge from s0 alone.
2. List the state transitions you can observe (what changed between s_i and
   s_{i+1}? what appeared, disappeared, or mutated?).
3. For each transition, ask: does it INSTANTIATE one of the ontology's
   conditions, or does it REFUTE one?
4. Run the six cross-state operators (below) — they are the highest-yield
   checks for this corpus.
5. Only then map findings onto ontology conditions and reach a verdict.

## 2. The six cross-state operators

O1 — **Timer integrity**: does a countdown/deadline reset, restart, or change
    between states (or would it survive a reload)? A stateless timer that
    rebinds to the same value is fake urgency (Countdown Timer / FOMO /
    Limited Time Message / Countdown On Ads). A real deadline is anchored to a
    concrete date/time and advances monotonically.

O2 — **Inventory integrity**: does stock/availability change across states
    without any corresponding transaction (purchase, reservation) in the DOM?
    Low Stock / High Demand / Fabricated Activity: a counter that jumps
    3→5→1→4 with zero user purchases is fabricated scarcity.

O3 — **Opt-out survival**: is the decline/dismiss/opt-out affordance present
    in s0 but removed, degraded, or pushed behind more steps in sN?
    (False Hierarchy, Dead End, Privacy Maze, Confirmshaming, Immortal
    Accounts: check EVERY state — a buried-in-sN opt-out is a violation.)

O4 — **Fee disclosure timing**: when does a cost first appear in the trace?
    If a fee/renewal/charge appears only after the user has committed
    (post-checkout state), that is Drip Pricing / Hidden Information /
    Forced Continuity. If it is disclosed at normal prominence BEFORE
    commitment, it is not.

O5 — **Consent pre-state**: are checkboxes/consent controls already in their
    "granted" state at s0 with no user event (and no "change" affordance)?
    Bad Defaults / Privacy Zuckering / Sneak Into Basket: a pre-checked box
    with no toggling path is a violation; a pre-checked box WITH a visible,
    equal-weight uncheck is borderline (weigh disclosure).

O6 — **Control availability**: is a control (close button, cancel, pause,
    skip) present in ANY state? A pattern that requires the user to exit
    (countdown-on-ad, forced grace period) must show the exit affordance;
    if it is absent from every state, note it as strong evidence.

## 3. Escape clauses — do NOT fire the pattern when

E1 — **Relative scale**: sizes/contrast must be judged RELATIVE to the other
    controls in the same interface, not against fixed absolute thresholds.
    A 24px close button on a miniature demo whose other controls are 20px is
    NOT a violation; a 24px close button beside a 200px accept button IS.

E2 — **Disclosure present**: a fee, renewal, or condition disclosed at normal
    prominence (visible text, not collapsed/hover-only/scrollbox-buried)
    before commitment is NOT hidden information.

E3 — **Honest qualifier**: a statistic with a unit AND a denominator
    ("98% of 12 reviews", "4.8/5 from 1,203 ratings") is not
    information-without-context. An UNqualified claim ("98% of customers",
    "millions trust us") is.

E4 — **Real deadline**: a specific, concrete deadline (date/time or
    countdown anchored to a real event) is not fake urgency. Vague
    "limited time" with no deadline, no timer, and no removal mechanism IS
    (Limited Time Message #3).

E5 — **Unobservable mechanism**: if the deception mechanism is event wiring,
    animation, or behaviour that the DOM trace CANNOT show (e.g., two
    semantically identical controls whose handlers differ), do NOT infer
    deception from identical text. Classify on what IS observable and cap
    confidence at 0.6. Absence of evidence is not evidence.

E6 — **One-sided narrative**: a stat that LOOKS unqualified but is qualified
    anywhere in the visible text (tooltip counts as visible only if it is in
    the DOM) — check all states before firing.

## 4. Verdict rule

- DECEPTIVE: at least one ontology condition fires with OBSERVED evidence
  (state transition, DOM attribute, text) — cite condition + evidence state.
- BENIGN: no condition fires, OR an escape clause (E1–E6) applies — cite the
  failed checks.
- If evidence is partial (mechanism unobservable, single state), verdict by
  preponderance with confidence ≤ 0.6. Never exceed 0.95 without
  multi-state corroboration.

## 5. Confidence calibration

- 0.90–0.95: condition fires with cross-state corroboration (e.g., O1 timer
  reset AND O3 opt-out removal).
- 0.75–0.89: condition fires on single-state evidence, or two weaker signals.
- 0.60–0.74: pattern plausible but evidence partial; use escape-clause review.
- < 0.60: insufficient evidence — judge on the balance but flag uncertainty.

---

## Worked example A (deceptive)

*Skyline Travel — flight booking.* s0: product page "Warsaw → Lisbon, $89"
with a banner "3 seats left!" and a countdown "Offer ends in 04:59". s1 (after
clicking "Book"): seat selection; the countdown now shows 04:59 again
(O1 reset — it rebinds per session). s2 (after "Continue"): payment page;
a pre-checked box "Add trip insurance $24.99" is checked with no user event
(O5), and a line "Cancel anytime" links to a settings page that does not
appear in any state. Verdict: DECEPTIVE — Countdown Timer #1 (stateless
reset, O1), Bad Defaults #1 (pre-checked, O5), Forced Continuity #2 (cancel
path absent from trace, O6). Confidence 0.93.

## Worked example B (benign)

*PulseFit — fitness trial.* s0: "7-day free trial, then $9.99/month" shown in
full-size text above the signup button; a visible "You can cancel in Settings
→ Subscription at any time." line; no timer, no stock counter. s1: payment
form with "First 7 days free — renews at $9.99/month" repeated at normal
size; checkbox "I agree to the terms (incl. renewal)" is UNCHECKED and
opt-in. s2: confirmation shows "Trial started — renews on 2026-09-01; cancel
any time". Verdict: BENIGN — Forced Continuity #2 fails (disclosure present,
E2), Bad Defaults #1 fails (unchecked, O5 negative), no timer to reset (O1
negative). Confidence 0.92.

---
*This protocol does not add or change any pattern definition in the ontology;
it specifies verification procedure and evidence rules only.*
