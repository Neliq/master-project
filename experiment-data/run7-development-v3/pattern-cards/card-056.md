# Parasocial Pressure [forced-action]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E6.

## 1. 1. Manufactured Livelihood Dependency
Mechanism summary: A fundamental deceptive tactic involves framing transactions as acute rescues of a creator's well-being rather than commercial exchanges.

FORMULA: T_{\mathrm{fiat}} = 0 \implies \mathrm{State}(I_{\mathrm{creator}}) \to \mathrm{Failure} \quad \text{asserted within} \quad M_{\mathrm{pitch}}

## 2. 2. Visual Proximity of Anthropomorphic Imagery to Action Prompts
Mechanism summary: To establish a visual baseline for Parasocial Pressure, the algorithm detects face-like or mascot imagery$I_{\mathrm{face}}$(via the vision-language model's face detection or anthropomorphic classification) and measures the spatial distance$d$to the nearest action-prompt node$N_{\mathrm{prompt}}$.

FORMULA: \min_{i \in I_{\mathrm{face}}} d_{\mathrm{spatial}}(i, N_{\mathrm{prompt}}) < \tau_{\mathrm{social}} \quad \land \quad \frac{A(i)}{A_{\mathrm{viewport}}} > 0.05

## 3. 3. Emotional Asymmetry
Mechanism summary: To identify the weaponization of artificial guilt, we define$A_{\mathrm{mascot}}$as the representation of the parasocial entity and$E_{\mathrm{user}}$as the user's intent to disengage or decline an offer.

FORMULA: E_{\mathrm{user}} = \mathrm{Refusal} \implies \frac{d}{dt} V_{\mathrm{emotion}}(A_{\mathrm{mascot}}) \to -1

