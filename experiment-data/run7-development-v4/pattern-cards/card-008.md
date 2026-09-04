# Disguised Ad [sneaking]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E5, E6.

## 1. 1. Cross-Origin Action Masking
Mechanism summary: The most adversarial variant of this pattern occurs when an ad intercepts a user's functional intent.

FORMULA: B_{\mathrm{action}} \neq \emptyset \quad \land \quad D_{\mathrm{target}}(B_{\mathrm{action}}) \neq D_{\mathrm{host}}

## 2. 2. Morphological Similarity
Mechanism summary: To quantify visual mimicry, we define$V_{\mathrm{native}}$as the set of visual feature vectors (encompassing computed background color, typography, border radius, and aspect ratio) extracted from legitimate, primary action nodes on the page via image analysis.

FORMULA: \max_{v_i \in V_{\mathrm{native}}} \mathrm{sim}(v_{\mathrm{ad}}, v_i) > \tau_{\mathrm{blend}}

## 3. 3. Semantic Mimicry of Native Action Labels
Mechanism summary: To establish a semantic baseline for Disguised Ad, the algorithm compares the text label of third-party advertising nodes$N_{\mathrm{ad}}$against a corpus of native functional labels$L_{\mathrm{native}}$(e.g., “Download,” “Next,” “Play”).

FORMULA: \max_{\ell \in L_{\mathrm{native}}} \mathrm{sim}(L(N_{\mathrm{ad}}), \ell) > \tau_{\mathrm{masquerade}}

