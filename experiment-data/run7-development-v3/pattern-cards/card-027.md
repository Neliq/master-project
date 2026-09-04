# Reference Pricing [misdirection]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E3, E6.

## 1. 1. Mathematical Exaggeration of Discount
Mechanism summary: Deceptive platforms frequently utilize extreme, mathematically improbable discounts to short-circuit rational evaluation and induce urgency.

FORMULA: \Delta_{\mathrm{pct}} = \frac{P_{\mathrm{ref}} - P_{\mathrm{cur}}}{P_{\mathrm{ref}}} \quad \implies \quad \Delta_{\mathrm{pct}} > \tau_{\mathrm{unrealistic}}

## 2. 2. Visual Salience of Reference-Price Strikethrough
Mechanism summary: To establish a visual baseline for Reference Pricing, the algorithm extracts the strikethrough or “was” price node$N_{\mathrm{ref}}$and its accompanying current-price node$N_{\mathrm{current}}$.

FORMULA: \mathrm{CR}(N_{\mathrm{ref}}, L_{\mathrm{bg}}) < \tau_{\mathrm{ref\_cr}} \quad \land \quad \frac{\mathrm{fontSize}(N_{\mathrm{current}})}{\mathrm{fontSize}(N_{\mathrm{ref}})} > \tau_{\mathrm{size\_skew}}

## 3. 3. Dual-Pricing Co-occurrence and Anchoring
Mechanism summary: To mathematically capture this visual anchoring, we identify$N_{\mathrm{cur}}$as the primary DOM node displaying the current selling price$P_{\mathrm{cur}}$, and$N_{\mathrm{ref}}$as an adjacent node displaying a secondary, higher reference price$P_{\mathrm{ref}}$.

FORMULA: P_{\mathrm{ref}} > P_{\mathrm{cur}} \quad \land \quad \mathrm{CSS}(N_{\mathrm{ref}}) \cap S_{\mathrm{strike}} \neq \emptyset

