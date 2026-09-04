# Pre-Delivered Content [sneaking]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E6.

## 1. 1. Unconsented Local Storage Consumption
Mechanism summary: To quantify the unauthorized appropriation of user hardware, we define$S_{\mathrm{local}}$as the user's physical storage environment and$C_{\mathrm{premium}}$as the set of high-capacity assets intended for future monetization.

FORMULA: C_{\mathrm{premium}} \subseteq S_{\mathrm{local}} \quad \text{given} \quad E_{\mathrm{consent}} = \emptyset \quad \land \quad \mathrm{Size}(C_{\mathrm{premium}}) \gg 0

## 2. 2. Visual Density of Locked-Content Badges
Mechanism summary: To establish a visual baseline for Pre-Delivered Content, the algorithm scans the rendered interface for locked-content indicators—padlock icons, “Purchase to Unlock” overlays, or greyed-out premium feature tiles.

FORMULA: \frac{|\{n \in N : \mathrm{IsLocked}(n)\}|}{|\{n \in N : \mathrm{IsAccessible}(n)\}|} > \tau_{\mathrm{locked\_ratio}}

## 3. 3. Semantic Framing of Local Assets as Purchase Opportunities
Mechanism summary: To establish a semantic baseline for Pre-Delivered Content, the algorithm compares the semantic framing of content items already present on the user's storage device.

FORMULA: \mathrm{Frame}(T_{\mathrm{asset}}) = \mathrm{Purchaseable} \quad \land \quad \mathrm{IsLocal}(A_{\mathrm{asset}}) = \mathrm{True}

