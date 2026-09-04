# Fear Of Missing Out (FOMO) [urgency]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E3, E4, E5, E6.

## 1. 1. Artificial Temporal Scarcity
Mechanism summary: To algorithmically detect fabricated temporal scarcity, we monitor a dynamic DOM node$N_{\mathrm{timer}}$that actively decrements a time value.

FORMULA: T(s_0) \approx \Delta t \quad \land \quad T(s_1) \approx \Delta t \quad \implies \quad \mathrm{Fabricated \: Urgency}

## 2. 2. Visual Pulsation Frequency of Urgency Indicators
Mechanism summary: To establish a visual baseline for Fear of Missing Out, the algorithm monitors the temporal update rate of urgency-signaling visual elements—including countdown timers, stock counters, and “selling fast” badges.

FORMULA: \min_{n \in N_{\mathrm{urgency}}} \Delta t_{\mathrm{refresh}}(n) < \tau_{\mathrm{pulsation}}

## 3. 3. Semantic Density of Scarcity and Urgency Lexemes
Mechanism summary: To establish a semantic baseline for Fear of Missing Out, the algorithm computes the frequency of temporally urgent and scarcity-signaling lexemes—“limited,” “only X left,” “selling fast,” “ends soon”—within the visible text of a product or offer page.

FORMULA: \frac{|\{w \in T : w \in L_{\mathrm{FOMO}}\}|}{|T|} \times 100 > \tau_{\mathrm{fomo}}

