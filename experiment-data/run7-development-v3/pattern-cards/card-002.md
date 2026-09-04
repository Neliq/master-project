# Dead End [obstruction]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E3, E4, E6.

## 1. 1. Topological Sink in the Navigational Graph
Mechanism summary: To model the interface as a directed graph$G = (V, E)$, we define$V$as the set of user interface states (such as pages or modals) and$E$as the available interactive transitions.

FORMULA: \forall e \in E_{\mathrm{out}}(v_{\mathrm{current}}), \text{target}(e) \in V_{\mathrm{forced}} \implies \text{No Escape Path}

## 2. 2. Visual Absence of Dismissal Vectors
Mechanism summary: Modals and overlays represent temporary interruptions in a user's workflow, demanding an explicit dismissal affordance to maintain usability and trust.

FORMULA: C_{\mathrm{dismiss}} = \emptyset \quad \land \quad \text{IsOverlay}(v_{\mathrm{current}}) = \mathrm{True}

## 3. 3. Semantic Coercion Density in Trapped States
Mechanism summary: To establish a semantic baseline for Dead End, the algorithm evaluates the NLP sentiment of all visible text within a navigational dead-end state$v_{\mathrm{trap}}$.

FORMULA: \frac{|\{\text{Imperative}(w) \lor \text{Urgency}(w) : w \in T(v_{\mathrm{trap}})\}|}{|T(v_{\mathrm{trap}})|} > \tau_{\mathrm{coercion}}

