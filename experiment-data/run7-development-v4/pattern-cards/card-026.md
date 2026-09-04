# Price Comparison Prevention [misdirection]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E5, E6.

## 1. 1. Fiat Decoupling
Mechanism summary: To detect the artificial severing of a price from its real-world value, we define$T_{\mathrm{price}}(n)$as the extracted textual value representing the cost within a product node$n$.

FORMULA: T_{\mathrm{price}}(n) \neq \emptyset \quad \land \quad F_{\mathrm{convert}}(T_{\mathrm{price}}(n)) = \emptyset

## 2. 2. Visual Suppression of Unit-Price Information
Mechanism summary: To establish a visual baseline for Price Comparison Prevention, the algorithm extracts all rendered price-related text nodes and segments them into headline prices$N_{\mathrm{headline}}$and unit prices$N_{\mathrm{unit}}$(e.g., price-per-liter, price-per-gram).

FORMULA: \frac{\mathrm{fontSize}(N_{\mathrm{unit}})}{\mathrm{fontSize}(N_{\mathrm{headline}})} < \tau_{\mathrm{suppress}} \quad \lor \quad \frac{\mathrm{CR}(N_{\mathrm{unit}}, L_{\mathrm{bg}})}{\mathrm{CR}(N_{\mathrm{headline}}, L_{\mathrm{bg}})} < \tau_{\mathrm{suppress}}

## 3. 3. Semantic Omission of Comparison-Relevant Qualifiers
Mechanism summary: To establish a semantic baseline for Price Comparison Prevention, the algorithm parses all price-adjacent text nodes for the presence of standardized unit-price qualifiers—“per liter,” “per oz,” “per 100g.” Let$Q_{\mathrm{standard}}$be the set of expected unit-price qualifiers for the product category and$Q_{\mathrm{rendered}}$be those actually present in th

FORMULA: Q_{\mathrm{standard}} \cap Q_{\mathrm{rendered}} = \emptyset

