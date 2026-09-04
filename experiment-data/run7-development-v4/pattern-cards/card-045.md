# Complex Language [interface-interference]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E3, E6.

## 1. 1. Structural Nesting Depth of Legal/Technical Text Nodes
Mechanism summary: To establish a structural baseline for Complex Language, the algorithm measures the DOM nesting depth and text-node length distribution within legal or terms-of-service containers$C_{\mathrm{legal}}$.

FORMULA: D_{\mathrm{DOM}}(N_{\mathrm{complex}}) > \tau_{\mathrm{legal\_depth}} \quad \lor \quad \frac{1}{|N_{\mathrm{complex}}|} \sum_{n} |\mathrm{text}(n)| > \tau_{\mathrm{clause\_length}}

## 2. 2. Visual Density of Legalese Text Blocks
Mechanism summary: To establish a visual baseline for Complex Language, the algorithm identifies text nodes flagged by FKGL analysis as exceeding a 12th-grade reading level and evaluates their visual presentation.

FORMULA: \frac{\mathrm{fontSize}(N_{\mathrm{complex}})}{S_{\mathrm{base}}} < \tau_{\mathrm{shrink}} \quad \land \quad \mathrm{FKGL}(N_{\mathrm{complex}}) > 12

## 3. 3. Exceedance of Baseline Readability Indices
Mechanism summary: To quantify the mismatch between user literacy and interface complexity, we identify$N_{\mathrm{text}}$as a DOM node containing a disclosure or policy paragraph.

FORMULA: \mathrm{FKGL}(N_{\mathrm{text}}) > \tau_{\mathrm{education\_limit}}

