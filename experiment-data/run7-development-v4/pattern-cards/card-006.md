# Customisation (Interface Nesting) [obstruction]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E6.

## 1. 1. Path Depth Asymmetry
Mechanism summary: To quantify the structural hurdle of reaching a user-favorable state, we model the interface as a state transition graph$G = (V, E)$.

FORMULA: d(S_0, S_{\mathrm{accept\_all}}) = 1 \quad \land \quad d(S_0, S_{\mathrm{reject\_all}}) \ge 2

## 2. 2. Visual Indentation Depth of Privacy Controls
Mechanism summary: To establish a visual baseline for Customisation Interface Nesting, the algorithm traverses the rendered privacy-settings subtree and measures the cumulative horizontal offset of each toggle from the root settings container.

FORMULA: \frac{1}{|N_{\mathrm{privacy}}|} \sum_{n \in N_{\mathrm{privacy}}} \mathrm{offsetX}(n) > \tau_{\mathrm{indent}}

## 3. 3. Semantic Obfuscation of Privacy Toggle Labels
Mechanism summary: To establish a semantic baseline for Customisation Interface Nesting, the algorithm evaluates the FKGL readability and technical-jargon density of labels describing privacy-relevant toggles.

FORMULA: \frac{|\{w \in L(N_{\mathrm{privacy}}) : w \in D_{\mathrm{jargon}}\}|}{|L(N_{\mathrm{privacy}})|} > \tau_{\mathrm{jargon}}

