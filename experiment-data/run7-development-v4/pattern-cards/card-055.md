# Automating The User Away [forced-action]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E3, E4, E5, E6.

## 1. 1. Autonomous Action Execution
Mechanism summary: To identify the removal of user-led intent, we define$A_{\mathrm{critical}}$as a primary, state-altering action (e.g., loading a new media asset or initiating a download).

FORMULA: A_{\mathrm{critical}} = \mathrm{Executed} \quad \text{given} \quad E_{\mathrm{user}} = \emptyset \quad \land \quad t \ge \tau_{\mathrm{system}}

## 2. 2. Omission of the Interrupt Vector
Mechanism summary: The hostility of an automated system is defined by the window of opportunity it grants the user to intervene.

FORMULA: B_{\mathrm{cancel}} \notin \mathrm{DOM}(t) \quad \lor \quad \Delta t_{\mathrm{warning}} < \tau_{\mathrm{reaction}}

## 3. 3. Semantic Speed of Consent-Timing Language
Mechanism summary: To establish a semantic baseline for Automating The User Away, the algorithm evaluates whether the interface provides semantically adequate processing time for consent decisions.

FORMULA: t_{\mathrm{window}} < 2.0 \quad \land \quad \mathrm{SemanticType}(T_{\mathrm{prompt}}) = \mathrm{TimedConsent}

