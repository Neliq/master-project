# Playing By Appointment [forced-action]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E3, E4, E5, E6.

## 1. 1. Temporal Gating
Mechanism summary: To identify the removal of user-paced progression, we define$A_{\mathrm{core}}$as a primary interaction and$C_{\mathrm{energy}}(t)$as the user's available stamina or action currency.

FORMULA: \mathrm{State}(A_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{until} \quad t \ge t_{\mathrm{depletion}} + \tau_{\mathrm{refill}}

## 2. 2. Visual Prominence of Temporal-Gating Indicators
Mechanism summary: To establish a visual baseline for Playing By Appointment, the algorithm identifies countdown timers, “available at” labels, and time-window restrictions$N_{\mathrm{temporal}}$that gate content access.

FORMULA: \frac{A(N_{\mathrm{temporal}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{appointment}} \quad \lor \quad \mathrm{Saturation}(N_{\mathrm{temporal}}) > 0.8

## 3. 3. Semantic Urgency Encoding in Temporal-Gating Messages
Mechanism summary: To establish a semantic baseline for Playing By Appointment, the algorithm analyzes the sentiment and urgency scores of time-gating messages—“Come back at 3 PM,” “New content drops in 2 hours.” The feature triggers if temporal-gate messages carry an urgency sentiment score exceeding$\tau_{\mathrm{appointment\_urgency}}$while also embedding scarcity language 

FORMULA: \mathrm{Urgency}(T_{\mathrm{temporal}}) > \tau_{\mathrm{appointment\_urgency}} \quad \land \quad T_{\mathrm{temporal}} \cap L_{\mathrm{scarcity}} \neq \emptyset

