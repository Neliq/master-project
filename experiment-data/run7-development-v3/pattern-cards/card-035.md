# Choice Overload [misdirection]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E3, E6.

## 1. 1. Excessive Element Quantization
Mechanism summary: To quantify the cognitive burden of an interface, we define$C_{\mathrm{choices}} = \{c_1, c_2, \dots, c_n\}$as the set of distinct, actionable input nodes (e.g., vendor checkboxes or cookie toggles) rendered within a singular decision context$M_{\mathrm{decision}}$.

FORMULA: |C_{\mathrm{choices}}| > \tau_{\mathrm{overload}}

## 2. 2. Visual Density of Interactive Decision Elements
Mechanism summary: To establish a visual baseline for Choice Overload, the algorithm computes the spatial density$\rho$of interactive elements within the primary decision viewport.

FORMULA: \rho = \frac{n_{\mathrm{interactive}}}{A_{\mathrm{viewport}}} > \tau_{\mathrm{density}}

## 3. 3. Semantic Similarity Collapse Among Options
Mechanism summary: To establish a semantic baseline for Choice Overload, the algorithm computes pairwise semantic similarity among all option descriptions within a decision container using LLM-generated semantic embeddings.

FORMULA: \frac{1}{|C|(|C|-1)} \sum_{i \neq j} \mathrm{sim}(T_i, T_j) > \tau_{\mathrm{similarity}}

