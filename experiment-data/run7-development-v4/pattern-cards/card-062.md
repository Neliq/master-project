# Auto-Play [attention-manipulation]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E5, E6.

## 1. 1. Autonomous Media Execution
Mechanism summary: To identify the removal of user-led intent, we define$M_{\mathrm{media}}$as a continuous audiovisual asset and$S_{\mathrm{play}}(M)$as its active playback state.

FORMULA: S_{\mathrm{play}}(M_{\mathrm{media}}) = \mathrm{True} \quad \text{given} \quad E_{\mathrm{intent}} = \emptyset \quad \land \quad \mathrm{Intersection}(M_{\mathrm{media}}, \mathrm{Viewport}) > \tau_{\mathrm{visible}}

## 2. 2. Affordance Suppression
Mechanism summary: The hostility of an auto-play system is exacerbated by inflating the friction required to regain control.

FORMULA: \mathrm{Visibility}(B_{\mathrm{cancel}}) \to 0 \quad \lor \quad \mathrm{Cost}(S_{\mathrm{play}} \to \mathrm{False}) \gg 1

## 3. 3. Semantic Framing of Auto-Play as Content Continuation
Mechanism summary: To establish a semantic baseline for Auto-Play, the algorithm inspects the labeling of the auto-play mechanism.

FORMULA: \mathrm{Frame}(T_{\mathrm{autoplay}}) \in \{\text{Continuation}, \text{Next}\} \quad \land \quad \neg\exists \text{``autoplay''} \in T_{\mathrm{visible}}

