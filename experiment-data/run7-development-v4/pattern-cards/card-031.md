# Visual Prominence [misdirection]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E3, E4, E6.

## 1. 1. Structural Asymmetry in DOM Subtree Weight
Mechanism summary: To establish a structural baseline for Visual Prominence, the algorithm compares the DOM subtree complexity of the business-favorable action node$N_{\mathrm{favorable}}$against the median subtree of all other interactive siblings.

FORMULA: \frac{|\mathrm{Desc}(N_{\mathrm{favorable}})|}{\mathrm{median}_{s \in \mathrm{Siblings}(N_{\mathrm{favorable}})} |\mathrm{Desc}(s)|} > \tau_{\mathrm{subtree\_bloat}}

## 2. 2. Absolute Bounding Box Dominance
Mechanism summary: To quantify this absolute dominance, we define$N_{\mathrm{favorable}}$as the DOM node representing the business-favorable action.

FORMULA: \frac{A(N_{\mathrm{favorable}})}{A(E_{\mathrm{baseline}})} > \tau_{\mathrm{area}}

## 3. 3. Semantic Neutrality of Dominant Action Labels
Mechanism summary: To establish a semantic baseline for Visual Prominence, the algorithm computes the NLP sentiment and coercion scores of the text label on the visually dominant business-favorable action button$N_{\mathrm{favorable}}$.

FORMULA: |\mathrm{Sent}(L(N_{\mathrm{favorable}}))| > 0.5 \quad \lor \quad L(N_{\mathrm{favorable}}) \cap D_{\mathrm{coercion}} \neq \emptyset

