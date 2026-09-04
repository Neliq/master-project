# Bundling [sneaking]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E3, E5, E6.

## 1. 1. Inseparable Transactional Nodes
Mechanism summary: To detect this artificial fusion, we define$I_{\mathrm{primary}}$as the digital good or service the user explicitly intends to purchase, and$I_{\mathrm{supp}}$as a supplementary item (such as an extended warranty, a mandatory accessory, or a secondary subscription).

FORMULA: E_{\mathrm{purchase}}(I_{\mathrm{primary}}) \implies \{I_{\mathrm{primary}}, I_{\mathrm{supp}}\} \subseteq C_{\mathrm{state}} \quad \land \quad \nexists e : e(I_{\mathrm{primary}}) \implies C_{\mathrm{state}} = \{I_{\mathrm{primary}}\}

## 2. 2. Visual Obscuration of Individual Component Pricing
Mechanism summary: To establish a visual baseline for Bundling, the algorithm inspects the rendered pricing breakdown within a bundle offer container$C_{\mathrm{bundle}}$.

FORMULA: \frac{\sum_{n \in N_{\mathrm{components}}} A(n)}{A(C_{\mathrm{bundle}})} < \tau_{\mathrm{breakdown}}

## 3. 3. Semantic Suppression of Individual Item Descriptions
Mechanism summary: To establish a semantic baseline for Bundling, the algorithm compares the average text length and descriptive granularity of individual item descriptions within a bundle against equivalent standalone product descriptions on the same site.

FORMULA: \frac{H(T_{\mathrm{bundled}})}{H(T_{\mathrm{standalone}})} < \tau_{\mathrm{description}}

