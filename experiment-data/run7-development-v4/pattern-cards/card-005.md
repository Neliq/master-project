# Labyrinthine Navigation [obstruction]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E3, E6.

## 1. 1. Excessive Navigational Depth
Mechanism summary: To evaluate the structural burden of the interface, we model the application's architecture as a directed graph$G = (V, E)$.

FORMULA: d(v_{\mathrm{home}}, v_{\mathrm{target}}) > \tau_{\mathrm{depth}}

## 2. 2. Visual Nesting Depth of Navigation Elements
Mechanism summary: To establish a visual baseline for Labyrinthine Navigation, the algorithm computes the rendered indentation depth$D_{\mathrm{render}}(N)$of each navigational menu node, measured as the cumulative CSS padding-left or margin-left in viewport-relative units.

FORMULA: \max_{n \in N_{\mathrm{nav}}} D_{\mathrm{render}}(n) > \tau_{\mathrm{nesting}}

## 3. 3. Semantic Obfuscation
Mechanism summary: When humans navigate a graph, they rely on the semantic relevance of local links to estimate their proximity to a global target, a process governed by information scent.

FORMULA: \exists e_i \in P : \mathrm{Sim}(L(e_i), \mathrm{Topic}(v_{\mathrm{target}})) < \tau_{\mathrm{semantic}}

