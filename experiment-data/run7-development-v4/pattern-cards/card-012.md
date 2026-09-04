# Hidden Information [sneaking]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E3, E4, E6.

## 1. 1. Structural Burial in High-Density Text
Mechanism summary: Information is frequently hidden by drowning it in a high-density textual monolith designed to induce cognitive exhaustion.

FORMULA: |W(N_{\mathrm{document}})| > \tau_{\mathrm{fatigue}} \quad \land \quad P(t_{\mathrm{clause}}) = \mathrm{False}

## 2. 2. Typographical and Chromatic Camouflage
Mechanism summary: To quantify the visual suppression of essential terms, we identify$N_{\mathrm{critical}}$as a DOM node containing NLP-identified critical phrases (e.g., {“auto-renew”, “subscription”, “cancel at any time”}).

FORMULA: S_{\mathrm{font}}(N_{\mathrm{critical}}) < \tau_{\mathrm{min\_readable}} \quad \lor \quad \mathrm{CR}(N_{\mathrm{critical}}, L_{\mathrm{bg}}) < \tau_{\mathrm{wcag\_min}}

## 3. 3. Semantic Concealment of Adverse Terms
Mechanism summary: To establish a semantic baseline for Hidden Information, the algorithm searches for adverse disclosure terms—“fee,” “cancellation,” “auto-renew,” “liability”—and evaluates their visibility status.

FORMULA: K_{\mathrm{adverse}} \cap T_{\mathrm{DOM}} \neq \emptyset \quad \land \quad \mathrm{IsConcealed}(N_{\mathrm{adverse}}) = \mathrm{True}

