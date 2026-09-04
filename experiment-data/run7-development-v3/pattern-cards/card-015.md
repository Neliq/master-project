# Privacy Zuckering [sneaking]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E3, E6.

## 1. 1. Bundled Consent and Granularity Violation
Mechanism summary: To identify the forced fusion of data categories, we define$D_{\mathrm{essential}}$as the subset of user data required to operate the core service and$D_{\mathrm{monetization}}$as data used strictly for profiling or third-party brokerage.

FORMULA: T_{\mathrm{accept}} = \mathrm{True} \quad \implies \quad (\mathrm{Access}(D_{\mathrm{essential}}) = \mathrm{True} \quad \land \quad \mathrm{Access}(D_{\mathrm{monetization}}) = \mathrm{True})
GIVEN: \nexists t_{\mathrm{alt}} : (t_{\mathrm{alt}} \implies \mathrm{Access}(D_{\mathrm{essential}}) \land \neg \mathrm{Access}(D_{\mathrm{monetization}}))

## 2. 2. Visual Asymmetry Between Privacy-Invasive and Privacy-Preserving Options
Mechanism summary: To establish a visual baseline for Privacy Zuckering, the algorithm compares the visual weight of user-facing privacy choices.

FORMULA: \frac{W(N_{\mathrm{invasive}})}{W(N_{\mathrm{preserving}})} > \tau_{\mathrm{privacy\_skew}}

## 3. 3. Semantic Ambiguity of Third-Party Entities
Mechanism summary: Deceptive interfaces often mask the scale of data distribution using linguistic \"umbrellas\".

FORMULA: |E_{\mathrm{actual}}| \gg 1 \quad \land \quad \mathrm{Specificity}(N_{\mathrm{disclosure}}) < \tau_{\mathrm{vague}}

