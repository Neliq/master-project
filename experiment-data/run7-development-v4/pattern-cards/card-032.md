# Persuasive Language [misdirection]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E3, E5, E6.

## 1. 1. Structural Density of Event Listeners on Coercive Text Nodes
Mechanism summary: To establish a structural baseline for Persuasive Language, the algorithm examines the DOM event-registration map for nodes classified as containing manipulative or coercive text.

FORMULA: \frac{|E(N_{\mathrm{coercive}})|}{|E(N_{\mathrm{neutral}})|} > \tau_{\mathrm{listener\_skew}}

## 2. 2. Visual Emphasis Asymmetry on Coercive Text
Mechanism summary: To establish a visual baseline for Persuasive Language, the algorithm evaluates whether emotionally manipulative text nodes receive disproportionate typographic emphasis.

FORMULA: \frac{\mathrm{fontWeight}(N_{\mathrm{coercive}})}{\mathrm{fontWeight}(N_{\mathrm{neutral}})} > \tau_{\mathrm{emphasis}} \quad \lor \quad \frac{A(N_{\mathrm{coercive}})}{A(N_{\mathrm{neutral}})} > \tau_{\mathrm{emphasis}}

## 3. 3. Truth-Conditional Satisfiability
Mechanism summary: To distinguish this pattern from outright deception, we analyze distinct semantic text nodes,$t_1$and$t_2$, within the same informational container.

FORMULA: \mathrm{Sem}(t_1) \land \mathrm{Sem}(t_2) \implies \mathrm{Satisfiable}

