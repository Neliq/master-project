# Infinite Scrolling [attention-manipulation]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E2, E4, E5, E6.

## 1. 1. Autonomous Content Injection
Mechanism summary: To identify the removal of explicit user choice, we define$Y_{\mathrm{viewport}}$as the bottom vertical coordinate of the user's current screen and$Y_{\mathrm{document\_end}}$as the absolute vertical coordinate of the content container's end.

FORMULA: Y_{\mathrm{document\_end}} - Y_{\mathrm{viewport}} \leq \tau_{\mathrm{trigger}} \quad \implies \quad E_{\mathrm{fetch}}() = \mathrm{True}

## 2. 2. The Unreachable Footer
Mechanism summary: A fundamental deceptive tactic involves the literal evasion of utility links.

FORMULA: v_{\mathrm{scroll}} > 0 \quad \implies \quad \frac{d}{dt} \mathrm{Pos}_{y}(N_{\mathrm{footer}}, t) \geq v_{\mathrm{scroll}}
GIVEN: \lim_{t \to \infty} d(Y_{\mathrm{viewport}}, \mathrm{Pos}_{y}(N_{\mathrm{footer}})) > 0

## 3. 3. Semantic Attenuation of Content Boundaries
Mechanism summary: To establish a semantic baseline for Infinite Scrolling, the algorithm detects the absence of pagination or content-termination language—“page 1 of N,” “end of results,” “no more items.” The feature triggers if a scrollable content feed lacks any semantic boundary marker within the rendered text, indicating that the interface deliberately removes linguistic 

FORMULA: \neg\exists n \in N_{\mathrm{feed}} : \mathrm{Match}(T(n), \mathrm{Pattern}_{\mathrm{boundary}}) = \mathrm{True}

