# Reduced Friction [sneaking]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E3, E5, E6.

## 1. 1. Absence of Confirmation Interstitial
Mechanism summary: To identify the removal of critical decision boundaries, we define$S_{\mathrm{intent}}$as the state where the user views an offer and$S_{\mathrm{commit}}$as the final, irreversible transactional state (e.g., payment processed).

FORMULA: E_{\mathrm{click}}(S_{\mathrm{intent}}) \implies S_{\mathrm{commit}} \quad \land \quad S_{\mathrm{confirm}} \notin \mathrm{Path}(S_{\mathrm{intent}} \to S_{\mathrm{commit}})

## 2. 2. Visual Proximity of Destructive Actions to Neutral UI
Mechanism summary: To establish a visual baseline for Reduced Friction, the algorithm measures the spatial separation$d_{\mathrm{spatial}}(N_{\mathrm{destructive}}, N_{\mathrm{neutral}})$between a business-favorable destructive action (e.g., one-click purchase, irreversible delete) and adjacent neutral UI elements.

FORMULA: \min_{n \in N_{\mathrm{neutral}}} d_{\mathrm{spatial}}(N_{\mathrm{destructive}}, n) < \tau_{\mathrm{safety}}

## 3. 3. Semantic Absence of Confirmation Language
Mechanism summary: To establish a semantic baseline for Reduced Friction, the algorithm searches for confirmation-seeking or reversibility-assuring language preceding a high-commitment action—“Are you sure?,” “This cannot be undone,” “Confirm purchase.” The feature triggers if a one-click purchase, irreversible deletion, or subscription commitment is executed without any seman

FORMULA: \neg\exists n \in \mathrm{Path}(v_{\mathrm{pre}}, v_{\mathrm{commit}}) : \mathrm{Match}(T(n), \mathrm{Pattern}_{\mathrm{confirm}}) = \mathrm{True}

