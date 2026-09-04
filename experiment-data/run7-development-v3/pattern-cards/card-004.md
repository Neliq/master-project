# Privacy Maze [obstruction]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E5, E6.

## 1. 1. Asymmetrical Path Depth
Mechanism summary: To model the structural friction of the consent architecture, we represent the interface as a directed graph$G = (V, E)$, where$V$encapsulates the interface states and$E$signifies user interaction events, such as clicks.

FORMULA: d(v_{\mathrm{start}}, v_{\mathrm{reject\_all}}) > d(v_{\mathrm{start}}, v_{\mathrm{accept\_all}}) \quad \lor \quad d(v_{\mathrm{start}}, v_{\mathrm{reject\_all}}) > \tau_{\mathrm{depth}}

## 2. 2. Visual Prominence Disparity
Mechanism summary: Beyond structural depth, the interface often weaponizes visual hierarchy to suppress user agency.

FORMULA: \frac{P(B_{\mathrm{accept}})}{P(B_{\mathrm{manage}})} > \delta_{\mathrm{contrast}}

## 3. 3. Semantic Obfuscation of Privacy-Related Terminology
Mechanism summary: To establish a semantic baseline for Privacy Maze, the algorithm measures the FKGL readability and lexical complexity of text nodes within privacy-settings pages.

FORMULA: \mathrm{FKGL}(T_{\mathrm{privacy}}) > 14 \quad \lor \quad \frac{|\mathrm{Unique}(T_{\mathrm{privacy}})|}{|T_{\mathrm{privacy}}|} > \tau_{\mathrm{obfuscation}}

