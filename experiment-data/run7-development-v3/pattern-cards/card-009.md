# Sneak Into Basket [sneaking]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E5, E6.

## 1. 1. Unprompted State Mutation
Mechanism summary: To formalize this unauthorized injection, we define$I_{\mathrm{explicit}}$as the set of product items the user has actively selected via direct DOM interaction events$E_{\mathrm{user}}$(e.g., explicit clicks on “Add to Cart” buttons).

FORMULA: (I_{\mathrm{cart}} \setminus I_{\mathrm{explicit}} \neq \emptyset) \quad \land \quad \nexists e \in E_{\mathrm{user}} \implies \mathrm{Add}(y)

## 2. 2. Visual Indistinguishability of Surcharged Items
Mechanism summary: To establish a visual baseline for Sneak Into Basket, the algorithm compares the visual feature vectors of cart line items explicitly selected by the user ($V_{\mathrm{user}}$) against those surreptitiously injected by the system ($V_{\mathrm{injected}}$).

FORMULA: \min_{v_u \in V_{\mathrm{user}}} \|v_{\mathrm{injected}} - v_u\|_2 < \tau_{\mathrm{camouflage}}

## 3. 3. Semantic Obscuration of Injected Line Items
Mechanism summary: To establish a semantic baseline for Sneak Into Basket, the algorithm inspects the text content of cart line items for disclosure language indicating optional add-ons—“donation,” “optional,” “you may also like.” The feature triggers if a surreptitiously added item$N_{\mathrm{injected}}$carries a text description whose semantic content reveals its add-on natu

FORMULA: \mathrm{Entailment}(T(N_{\mathrm{injected}}), \text{``optional add-on''}) = \mathrm{True} \quad \land \quad \mathrm{UserConsented}(N_{\mathrm{injected}}) = \mathrm{False}

