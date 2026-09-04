# Forced Grace Period [obstruction]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E4, E5, E6.

## 1. 1. Temporal Discrepancy Extraction
Mechanism summary: To quantify the artificial delay imposed on the user, we define$T_{\mathrm{request}}$as the exact timestamp when the termination request is submitted.

FORMULA: T_{\mathrm{execute}} - T_{\mathrm{request}} \geq \Delta t_{\mathrm{min}}

## 2. 2. Visual Conspicuity of Cancellation Affordance
Mechanism summary: To establish a visual baseline for Forced Grace Period, the algorithm evaluates the rendered salience of the cancellation or opt-out vector during the mandatory waiting window.

FORMULA: \frac{S(N_{\mathrm{cancel}})}{S(N_{\mathrm{confirm}})} < \delta_{\mathrm{salience}}

## 3. 3. Semantic Proximity of Reversal
Mechanism summary: To identify whether this temporal delay is actively coupled with an entrapment mechanism, we establish$K_{\mathrm{revert}}$as a set of keywords indicating the cancellation of the deletion process (e.g., {“log in to cancel”, “reactivate”, “undo”}).

FORMULA: \min_{k \in K_{\mathrm{revert}}, e \in E_{\mathrm{time}}} d(k, e) < \tau_{\mathrm{words}}

