# Feedforward Ambiguity [interface-interference]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E3, E5, E6.

## 1. 1. Structural Ambiguity of Action-Outcome Mapping
Mechanism summary: To establish a structural baseline for Feedforward Ambiguity, the algorithm inspects interactive elements whose onclick, href, or formaction targets resolve to URLs or state transitions with semantics that conflict with the element's rendered label.

FORMULA: \exists N \in \mathrm{Interactive} : \mathrm{Distance}(\mathrm{Expect}(L(N)), \mathrm{Resolve}(N)) > \tau_{\mathrm{feedforward}}

## 2. 2. Iconographic Entropy and Missing Affordances
Mechanism summary: Visual polysemy is frequently weaponized by removing textual anchors from interactive icons.

FORMULA: H(\mathrm{CV}_{\mathrm{class}}(N_{\mathrm{icon}})) > \tau_{\mathrm{entropy}} \quad \land \quad T_{\mathrm{hover}} = \emptyset

## 3. 3. Semantic Divergence of Action and Outcome
Mechanism summary: To identify deceptive labeling, we define$L(n)$as the text label of an interactive DOM node (e.g., “Next” or “I Agree”).

FORMULA: \mathrm{Sim}(\mathrm{Intent}_{\mathrm{NLP}}(L(n)), \mathrm{Outcome}_{\mathrm{System}}(n)) < \tau_{\mathrm{clarity}} \quad \land \quad \mathrm{Outcome}_{\mathrm{System}}(n) \in D_{\mathrm{critical}}

