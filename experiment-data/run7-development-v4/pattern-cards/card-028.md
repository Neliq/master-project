# Conflicting Information [misdirection]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E3, E6.

## 1. 1. Structural Proximity of Contradictory Factual Nodes
Mechanism summary: To establish a structural baseline for Conflicting Information, the algorithm inspects the DOM tree for sibling or nested text nodes containing propositions whose logical intersection is null.

FORMULA: \exists t_1, t_2 \in \mathrm{Descendants}(C) : \mathrm{Prop}(t_1) \land \mathrm{Prop}(t_2) \implies \bot \quad \land \quad d_{\mathrm{DOM}}(t_1, t_2) < \tau_{\mathrm{proximity}}

## 2. 2. Semantic-Visual Mismatch
Mechanism summary: Interfaces frequently weaponize established design heuristics to create deceptive feedforward cues.

FORMULA: \mathrm{Intent}(L(B)) \cap \mathrm{Affordance}(C(B)) = \emptyset \quad \implies \quad \mathrm{Contradiction}

## 3. 3. Mutually Exclusive Factual Claims
Mechanism summary: To identify explicit structural deception, we define$N_{\mathrm{container}}$as a parent DOM node representing a single informational context (e.g., a pricing tier card or a modal window), containing distinct text nodes such as$t_1$and$t_2$.

FORMULA: \exists t_1, t_2 \in N_{\mathrm{container}} : \mathrm{Sem}(t_1) \land \mathrm{Sem}(t_2) \implies \mathrm{Unsatisfiable}

